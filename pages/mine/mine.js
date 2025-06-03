// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration: 500,
    interval: 5000,
    navigation: {
      type: 'dots'
    },
    paginationPosition: 'bottom',
    current: 0,
    xxCurrent: 0,
    levelList: [{
      icon: '/static/icons/l1.jpg',
      label: '好奇者',
      color: '#b16cbd'
    }, {
      icon: '/static/icons/l2.jpg',
      label: '冒险家',
      color: '#d96033'
    }, {
      icon: '/static/icons/l3.jpg',
      label: '探索家',
      color: '#718b05'
    }, {
      icon: '/static/icons/l4.jpg',
      label: '环球家',
      color: '#5e90d2'
    }, {
      icon: '/static/icons/l5.jpg',
      label: '梦想家',
      color: '#e2bf9d'
    }, {
      icon: '/static/icons/l6.jpg',
      label: '好奇者',
      color: '#f6e4a4'
    }],
    level: 1,
    swiperList: [{
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
    xxShow: false,
  },

  handleOpen() {
    this.setData({
      xxShow: true
    })
  },

  handleSelect() {
    this.setData({
      xxShow: false
    })
  },

  handleSwiperChange(e) {
    // console.log(e.detail.current);
    const current = e.detail.current
    this.setData({
      current
    })
  },

  handleXXChange(e) {
    // console.log(e.detail.current);
    const xxCurrent = e.detail.current
    this.setData({
      xxCurrent: xxCurrent

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