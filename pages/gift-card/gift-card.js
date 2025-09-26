// pages/gift-card/gift-card.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    giftCards: [
      {
        id: '1',
        name: '奈雪礼品卡',
        description: '心意之选，送礼佳品',
        price: 100,
        image: '/static/images/gift-card-1.jpg',
        validDays: 365
      },
      {
        id: '2',
        name: '节日限定卡',
        description: '特别设计，限量发售',
        price: 200,
        image: '/static/images/gift-card-2.jpg',
        validDays: 365
      },
      {
        id: '3',
        name: '定制礼品卡',
        description: '专属定制，独特心意',
        price: 300,
        image: '/static/images/gift-card-3.jpg',
        validDays: 365
      },
      {
        id: '4',
        name: '商务礼品卡',
        description: '商务馈赠，体面之选',
        price: 500,
        image: '/static/images/gift-card-4.jpg',
        validDays: 365
      }
    ],
    currentTab: 'buy' // buy: 购买礼品卡, my: 我的礼品卡
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查是否有tab参数
    const tab = options.tab || 'buy';
    this.setData({
      currentTab: tab
    });
  },

  /**
   * 切换标签页
   */
  handleTabChange(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
  },

  /**
   * 购买礼品卡
   */
  handleBuyCard(e) {
    const card = e.currentTarget.dataset.card;
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  /**
   * 查看礼品卡详情
   */
  handleViewCard(e) {
    const card = e.currentTarget.dataset.card;
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
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
});