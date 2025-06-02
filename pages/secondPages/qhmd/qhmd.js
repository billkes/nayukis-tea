// pages/secondPages/qhmd/qhmd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeList: [],
    listObj: {},
    tabValue: 0,
    current: 0,

    /**
     * 此处id必须不重复
     */
    list: [{
      id: '1', // 唯一id
      name: '北京烤鸭店', // 店面名称
      desc: '这是一段描述这是一段描述这是一段描述这是一段描述', // 店面详细地址
      len: '5.7' // 随便填
    }],

    /**
     * 地图组件中心位置
     */
    latitude: 23.099994, // 纬度
    longitude: 113.324520, // 经度

    /**
     * 地图上标记的店面，长度应与list的长度一致
     */
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: '北京烤鸭店',
      iconPath: '/static/icons/qhmd-pos.png',
    }],
  },

  /**
   * 切换收藏
   */
  handleToggleList(e) {
    // console.log(e.currentTarget.dataset.id);
    const id = e.currentTarget.dataset.id
    const obj = this.data.list.find(o => o.id === id)
    const likeList = this.data.likeList
    const listObj = this.data.listObj
    const index = likeList.findIndex(o => o.id === obj.id)
    // 如果存在则代表 取消收藏
    if (index !== -1) {
      likeList.splice(index, 1)
      listObj[obj.id] = undefined
      wx.showToast({
        title: '取消成功',
        icon: 'none'
      })
    } else {
      this.data.likeList.push(obj)
      listObj[obj.id] = true
      wx.showToast({
        title: '收藏成功',
        icon: 'none'
      })
    }
    wx.setStorageSync('qhmdLikeList', likeList)
    this.setData({
      likeList,
      listObj
    })
  },

  /**
   * 标签卡切换
   */
  onTabsChange(event) {
    // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    const value = event.detail.value
    this.setData({
      tabValue: Number(value)
    })
  },

  /**
   * 店面列表选中
   */
  handleSelect(e) {
    // console.log(e.currentTarget.dataset.current);
    const current = e.currentTarget.dataset.current
    this.setData({
      current
    })
  },

  /**
   * 去下单
   */
  handleOk(e) {
    // console.log(e.currentTarget.dataset.current);
    const current = e.currentTarget.dataset.current
    const obj = this.data.list[current]
    wx.setStorageSync('okQhmd', obj)
    wx.navigateBack()
  },

  /**
   * 以下几个方法都是wx官方示例
   */
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const likeList = wx.getStorageSync('qhmdLikeList') || []
    const listObj = {}
    likeList.forEach((element) => {
      listObj[element.id] = true
    });
    this.setData({
      likeList,
      listObj
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.mapCtx = wx.createMapContext('myMap')

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