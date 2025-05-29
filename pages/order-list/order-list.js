// pages/order-list/order-list.js
const orderUtil =require("../../utils/order");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    token:'',
    orderlist:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   const openid = wx.getStorageSync('openid');
   const token = wx.getStorageSync('token');
   const orderlist =wx.getStorageSync('orderlist')
   if(openid && token){
     this.setData({
       openid,
       token
     })
     if(Object.keys(orderlist).length == 0){
      this.fetchUserOrders()
     }
     this.setData({
       orderlist
     })
     
   }
  },
  fetchUserOrders(){
   orderUtil.getUserOrders(this.data.openid,1,10,this.data.token).then(result=>{
    this.setData({
      orderlist:result
    })
    wx.setStorageSync('orderlist', result)
   }).catch(err => {
     console.error('接口请求异常')
   }).finally(()=>{
     console.log('finally')
   })
  },
  //测试开始
  handleRefund(e) {
    const orderId = e.currentTarget.dataset.id;
    const amount = e.currentTarget.dataset.amount;

    console.log(`退款请求出发，订单ID：${orderId}，金额：${amount}`);

    //确认是否要退款
    wx.showModal({
      title: '申请退款',
      content: `确定要申请退款吗？退款金额：￥${amount}`,
      confirmText: '确定退款',
      confirmColor: '#aff4d4f',
      success: (res) => {
        if (res.confirm) {
          this._refundOrderViaAPI(orderId, amount);
        }
      }
    });
  },
  _refundOrderViaAPI(orderId, amount) {
    const app = getApp();
    const apiBaseUrl = 'https://adaa-110-16-109-248.ngrok-free.app';
    const openid = wx.getStorageSync('openid');

    if (!openid) {
      console.error('申请退款失败：未找到用户openid');
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    //显示加载提示
    wx.showLoading({
      title: '申请退款中...',
      mask: true
    });

    wx.request({
      url: 'https://adaa-110-16-109-248.ngrok-free.app/api/pay/refund',
      method: 'POST',
      data: {
        orderId,
        openid,
        amount,
        reason: '用户申请退款'
      },
      success: (res) => {
        wx.hideLoading();
        if(res.statusCode === 200 && res.data.success) {
          console.log('退款申请成功', res.data);

          //存储退款信息，准备显示弹窗
          this.setData({
            showRefundSuccess: true,
            currentOrderId: orderId,
            refundInfo: res.data.data 
          });
          this._fetchOrderList();
        }else{
          console.error('退款申请失败：', res.data);

          wx.showModal({
            title: '退款失败',
            content: res.data.message || '退款申请失败，请稍后再试',
            showCancel: false
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('请求退款接口失败：', err);

        wx.showModal({
          title: '网络错误',
          content: '网络请求失败，请检查网络连接后重试',
          showCancel: false
        })
      }
    })
  },
  _fetchOrderList() {
    orderUtil.getUserOrders(this.data.openid, 1, 10, this.data.token).then(result => {
      // 更新订单列表数据
      this.setData({
        orderlist: result
      });
      
      // 存储更新后的订单列表到本地缓存
      wx.setStorageSync('orderlist', result);
      
      
      // 停止下拉刷新（如果正在刷新）
      wx.stopPullDownRefresh();
      
      console.log('订单列表已更新');
    }).catch(err => {
      console.error('获取订单列表失败:', err);
      wx.showToast({
        title: '刷新订单失败，请稍后再试',
        icon: 'none'
      });
    }).finally(() => {
      // 隐藏加载提示
      wx.hideLoading();
    });
  },
  //测试结束
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})