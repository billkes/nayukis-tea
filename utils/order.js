const { BASE_URL } = require('./config');
const { processOrderProducts } = require('./mock');

/**
 * 创建订单
 * @param {Object} orderData - 订单数据
 * @param {string} token - 用户token
 * @returns {Promise} - 返回Promise对象
 */
const createOrder = (orderData, token) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}/api/pay/create`,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'X-Auth-Token': token
      },
      data: orderData,
      success: (res) => {
        if (res.statusCode === 200 && res.data.success) {
          resolve(res.data.data);
        } else {
          console.error('创建订单失败', res.data);
          reject(res.data);
        }
      },
      fail: (err) => {
        console.error('请求创建订单接口失败', JSON.stringify(err));
        reject(err);
      }
    });
  });
};

/**
 * 发起支付
 * @param {Object} paymentData - 支付数据
 * @returns {Promise} - 返回Promise对象
 */
const requestPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...paymentData,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        console.error('支付失败', err);
        reject(err);
      }
    });
  });
};

/**
 * 完整的支付流程
 * @param {Object} orderData - 订单数据
 * @param {String} token - 用户token
 * @returns {Promise} - 返回Promise对象
 */
const processPayment = (orderData, token) => {
  return new Promise((resolve, reject) => {
    // 显示加载中
    wx.showLoading({
      title: '正在创建订单...',
    });
    
    // 创建订单
    wx.request({
      url: `${BASE_URL}/api/pay/create`,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'X-Auth-Token': token
      },
      data: orderData,
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 200 && res.data.success) {
          // 检查支付参数是否完整
          const payParams = res.data.data.payParams;
          if (!payParams || !payParams.paySign) {
            console.error('支付参数不完整:', payParams);
            reject({
              message: '支付参数错误',
              data: res.data
            });
            return;
          }
          
          // 调用支付接口
          wx.requestPayment({
            ...payParams,
            success: () => {
              console.log('支付成功');
              resolve({
                success: true,
                orderId: orderData.orderId,
                message: '支付成功'
              });
            },
            fail: (err) => {
              console.log('支付失败或取消', err);
              if (err.errMsg && err.errMsg.indexOf('cancel') > -1) {
                reject({
                  success: false,
                  cancelled: true,
                  message: '已取消支付',
                  error: err
                });
              } else {
                reject({
                  success: false,
                  cancelled: false,
                  message: '支付失败',
                  error: err
                });
              }
            }
          });
        } else {
          console.error('订单创建失败:', res.data);
          reject({
            success: false,
            message: res.data.message || '创建订单失败',
            data: res.data
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('请求创建订单接口失败:', err);
        reject({
          success: false,
          message: '网络错误',
          error: err
        });
      }
    });
  });
};

/**
 * 获取用户订单列表
 * @param {String} openid - 用户openid
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页数量
 * @param {String} token - 用户token
 * @returns {Promise} - 返回Promise对象
 */
const getUserOrders = (openid, page = 1, pageSize = 10, token) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
    });
    
    wx.request({
      url: `${BASE_URL}/api/pay/user-orders`,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'X-Auth-Token': token
      },
      data: {
        openid,
        page,
        pageSize
      },
      success: (res) => {
        wx.hideLoading();
        
        if (res.statusCode === 200 && res.data.success) {
          // 获取订单数组，兼容不同的返回结构
          let orders = [];
          if (Array.isArray(res.data.data)) {
            orders = res.data.data;
          } else if (res.data.data && Array.isArray(res.data.data.orders)) {
            orders = res.data.data.orders;
          } else if (res.data.data && res.data.data.list && Array.isArray(res.data.data.list)) {
            orders = res.data.data.list;
          } else if (res.data.data && typeof res.data.data === 'object') {
            // 尝试从对象中提取订单数据
            const possibleOrderData = res.data.data;
            if (possibleOrderData.orderId) {
              // 单个订单对象
              orders = [possibleOrderData];
            } else {
              // 尝试从对象的属性中查找数组
              const arrayProps = Object.keys(possibleOrderData).filter(key => 
                Array.isArray(possibleOrderData[key]) && possibleOrderData[key].length > 0
              );
              
              if (arrayProps.length > 0) {
                orders = possibleOrderData[arrayProps[0]];
              } else {
                console.error('无法解析订单数据结构:', res.data.data);
                orders = [];
              }
            }
          } else {
            console.error('无法解析订单数据结构:', res.data.data);
            orders = [];
          }
          
          // 基础数据处理，不包含状态文本和样式
          const processedOrders = orders.map(order => {
            // 确保订单ID存在
            const orderId = order.orderId || order.order_id || order.id || '';
            
            // 格式化创建时间
            let createdAt;
            if (order.createdAt) {
              createdAt = new Date(order.createdAt);
            } else if (order.create_time) {
              createdAt = new Date(order.create_time);
            } else {
              createdAt = new Date();
            }
            
            const formattedTime = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')} ${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')}`;
            
            // 确保商品数组存在并使用映射表对齐数据
            const products = order.products || order.items || [];
            const alignedProducts = processOrderProducts(products);
            
            return {
              ...order,
              orderId,
              products: alignedProducts,
              formattedTime
            };
          });
          
          resolve({
            orders: processedOrders,
            hasMore: orders.length === pageSize,
            page: page + 1
          });
        } else {
          console.error('获取订单列表失败:', res.data);
          reject({
            message: res.data.message || '获取订单列表失败',
            data: res.data
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('请求订单列表接口失败:', err);
        reject({
          message: '网络错误',
          error: err
        });
      }
    });
  });
};

/**
 * 申请退款
 * @param {String} orderId - 订单ID
 * @param {Number} amount - 退款金额
 * @param {String} openid - 用户openid
 * @param {String} token - 用户token
 * @returns {Promise} - 返回Promise对象
 */
const refundOrder = (orderId, amount, openid, token) => {
  return new Promise((resolve, reject) => {
    if (!orderId) {
      reject({
        message: '订单ID不能为空'
      });
      return;
    }
    
    wx.showLoading({
      title: '申请退款中...',
    });
    
    // 准备退款数据
    const refundData = {
      orderId: orderId,
      openid: openid,
      amount: amount,
      refundReason: '用户申请退款',
      metadata: {
        source: "miniprogram",
        clientTime: new Date().toISOString()
      }
    };
    wx.request({
      url: `${BASE_URL}/api/pay/refund`,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'X-Auth-Token': token
      },
      data: refundData,
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 200 && res.data.success) {
          resolve({
            success: true,
            orderId: orderId,
            message: '退款申请成功',
            data: res.data.data
          });
        } else {
          reject({
            success: false,
            message: res.data.message || '退款申请失败',
            data: res.data
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('请求退款接口失败:', err);
        reject({
          success: false,
          message: '网络错误',
          error: err
        });
      }
    });
  });
};

/**
 * 获取订单详情
 * @param {String} orderId - 订单ID
 * @param {String} token - 用户token
 * @returns {Promise} - 返回Promise对象
 */
const getOrderDetail = (orderId, token) => {
  return new Promise((resolve, reject) => {
    if (!orderId) {
      reject({
        message: '订单ID不能为空'
      });
      return;
    }
    
    wx.showLoading({
      title: '加载中...',
    });
    
    wx.request({
      url: `${BASE_URL}/api/pay/order-detail`,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'X-Auth-Token': token
      },
      data: {
        orderId: orderId
      },
      success: (res) => {
        wx.hideLoading();
        
        if (res.statusCode === 200 && res.data.success) {
          // 处理订单数据
          const order = res.data.data;
          
          // 确保订单ID存在
          const orderId = order.orderId || order.order_id || order.id || '';
          
          // 格式化创建时间
          let createdAt;
          if (order.createdAt) {
            createdAt = new Date(order.createdAt);
          } else if (order.create_time) {
            createdAt = new Date(order.create_time);
          } else {
            createdAt = new Date();
          }
          
          const formattedTime = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')} ${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')}`;
          
          // 确保商品数组存在并使用映射表对齐数据
          const products = order.products || order.items || [];
          const alignedProducts = processOrderProducts(products);
          
          const processedOrder = {
            ...order,
            orderId,
            products: alignedProducts,
            formattedTime
          };
          
          resolve(processedOrder);
        } else {
          console.error('获取订单详情失败:', res.data);
          reject({
            message: res.data.message || '获取订单详情失败',
            data: res.data
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('请求订单详情接口失败:', err);
        reject({
          message: '网络错误',
          error: err
        });
      }
    });
  });
};

module.exports = {
  createOrder,
  requestPayment,
  processPayment,
  getUserOrders,
  refundOrder,
  getOrderDetail
};
