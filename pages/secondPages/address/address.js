// pages/secondPages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 编辑该地址
   */
  handleEdit(e) {
    const {
      current
    } = e.currentTarget.dataset
    const obj = this.data.list[current];
    console.log(current, e, obj);
    wx.navigateTo({
      url: '/pages/secondPages/editAddress/editAddress?id=' + obj.id,
    })
  },

  /**
   * 选择地址
   */
  handleSelectAddress(e) {
    const {
      current
    } = e.currentTarget.dataset
    const obj = this.data.list[current];
    console.log(current, e, obj);
    // 选择此地址已根据门店繁忙度及距离为你综合匹配...
    // 抱歉，目前该地址附件没有可配送的门店，暂时无法配送

    // 判断定位

    wx.showModal({
      title: '温馨提示',
      content: '抱歉，目前该地址附件没有可配送的门店，暂时无法配送',
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {

        }
      }
    })
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
    // 获取本地的地址
    const list = wx.getStorageSync('addressList') || []
    this.setData({
      list
    })
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