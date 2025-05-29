// pages/ofg/ofg.js
const orderUtil = require("../../utils/order");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    token:'',
    orderlist:{},
    list:[{
      title:"当前订单",
      data:[{
        name:"振华店",
        status:1 //0 已完成(历史订单) 1 未完成（当前订单）
      }]
    },{
      title:"历史订单",
      data:[{
        name:"凯德店",
        status:0 //0 已完成(历史订单) 1 未完成（当前订单）
      },{
        name:"海亮店",
        status:0 //0 已完成(历史订单) 1 未完成（当前订单）
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const openid=wx.getStorageSync('openid');
    const token =wx.getStorageSync('token');
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
    orderUtil.getUserOrders(this.data.openid, 1, 10, this.data.token).then(result =>{
      this.setData({
        orderlist: result
      })
      wx.setStorageSync('orderlist', result)
    }).catch(err =>{
      console.error('接口请求异常')
    }).finally(()=>{
      console.log('finally')
    })
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