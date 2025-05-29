// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration: 500,
    interval: 5000,
    navigation: { type: 'dots'},
    paginationPosition: 'bottom',
    swiperList: [
      {
        value: '/static/images/act01.jpg',
        ariaLabel: '图片1',
      },
      {
        value: '/static/images/act02.jpg',
        ariaLabel: '图片2',
      },
      {
        value: `/static/images/act03.jpg`,
        ariaLabel: '图片3',
      },
      {
        value: `/static/images/act04.jpg`,
        ariaLabel: '图片4',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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