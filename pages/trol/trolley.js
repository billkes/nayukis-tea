const orderUtils = require('../../utils/order.js');
const { BASE_URL } = require('../../utils/config');

Page({
  data: {
    cartItems: [],//购物车商品列表：存储从本地存储中读取的商品信息
    array: ['立即取餐', '15分钟后', '30分钟后'],
    index: 0,
    //老师的支付代码开始
    orderData: {
      orderId: "order" + Date.now(),
      amount: 0.01,
      description: "订单order" + Date.now() +"支付",//订单描述
      openid: "oLdZf7MmXd3A026N3oIA_M_J2seg",
      products: [],
      metadata: {
        source: "miniprogram",
        clientTime: (new Date()).toUTCString(),//记录客户端生成订单的时间，将当前的时间转换成全球统一的时间基准的字符串
        orderTitle: "订单(3件商品)"
      }
    },
    token: '',
    isCreatingOrder: false,
    formattedTime: '',//格式化后的订单时间，"2025-05-20 16:30:00"
    showPaymentSuccess: false
    //老师的支付代码结束
  },

  onShow() {
    // 每次页面显示时刷新购物车数据
    this.loadCartItems();
  },

  //Storage获取数据
  loadCartItems() {
    try{
      const cartItems = wx.getStorageSync('shoppingCart') || [];
      const products = wx.getStorageSync('welfareProducts') || [];
      console.log('cartItems:',cartItems);
      console.log('products:',products);
      this.setData({cartItems,products});
    }catch(e){
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      });
    }
  },
  //取餐时间
  onPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  //老师的支付代码开始
  onLoad(options) {    
    // 获取用户token和openid
    const token = wx.getStorageSync('token');
    const openid = wx.getStorageSync('openid');
    
    // 格式化时间显示
    const clientTime = this.data.orderData.metadata.clientTime;
    const date = new Date(clientTime);//将一个表示时间的字符串（clientTime）解析为 JavaScript 的日期对象
    const formattedTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    
    this.setData({
      token,
      'orderData.openid': openid || this.data.orderData.openid,
      formattedTime
    });
  },

  /**
   * 创建订单并发起支付
   */
  createOrder() {
    if (this.data.isCreatingOrder) {
      return;
    }
    
    if (!this.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      isCreatingOrder: true
    });
    
    // 更新订单的时间戳，避免使用页面加载时的旧时间
    const orderData = this.data.orderData;
    orderData.metadata.clientTime = new Date().toISOString();
    //动态添加商品信息
    //const products = wx.getStorageSync('welfareProducts') || [];
    //orderData.products = products;
    
    // 调用支付流程
    orderUtils.processPayment(orderData, this.data.token)
      .then(result => {
        console.log('支付成功:', result);
        // 显示支付成功对话框
        this.setData({
          showPaymentSuccess: true
        });
      })
      .catch(error => {
        console.log('支付失败:', error);
        if (error.cancelled) {
          wx.showToast({
            title: '已取消支付',
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: error.message || '支付失败',
            icon: 'error'
          });
        }
      })
      .finally(() => {
        // 支付完成后的清理工作
        this.setData({
          isCreatingOrder: false
        });
        // 跳转到订单列表页
        setTimeout(() => {
          wx.reLaunch({
            url: `/pages/ofg/ofg`
          });
        }, 1500);
      });
  },
  /**
   * 关闭支付成功提示
   */
  closePaymentSuccess() {
    this.setData({
      showPaymentSuccess: false
    });
  }
  //老师的支付代码结束
});    