// pages/order-detail/order-detail.js
const orderUtil = require("../../utils/order");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderDetail: {},
    token: '',
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const orderId = options.orderId || '';
    const token = wx.getStorageSync('token');
    
    this.setData({
      orderId,
      token
    });

    if (orderId && token) {
      this.fetchOrderDetail();
    }
  },

  /**
   * 获取订单详情
   */
  fetchOrderDetail() {
    const { orderId, token } = this.data;
    
    orderUtil.getOrderDetail(orderId, token).then(result => {
      this.setData({
        orderDetail: result,
        loading: false
      });
    }).catch(err => {
      console.error('获取订单详情失败', err);
      wx.showToast({
        title: '获取订单详情失败',
        icon: 'none'
      });
      this.setData({
        loading: false
      });
    });
  },

  /**
   * 申请退款
   */
  handleRefund() {
    const { orderDetail, token } = this.data;
    
    if (orderDetail.status === 'REFUND') {
      wx.showToast({
        title: '该订单已退款',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '申请退款',
      content: '确定要申请退款吗？',
      success: (res) => {
        if (res.confirm) {
          const openid = wx.getStorageSync('openid');
          orderUtil.refundOrder(orderDetail.orderId, orderDetail.amount, openid, token)
            .then(result => {
              wx.showToast({
                title: '退款申请成功',
                icon: 'success'
              });
              // 重新获取订单详情
              this.fetchOrderDetail();
            })
            .catch(err => {
              wx.showToast({
                title: err.message || '退款申请失败',
                icon: 'none'
              });
            });
        }
      }
    });
  },

  /**
   * 返回上一页
   */
  handleBack() {
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时重新获取订单详情
    if (this.data.orderId && this.data.token) {
      this.fetchOrderDetail();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.fetchOrderDetail().then(() => {
      wx.stopPullDownRefresh();
    });
  }
});