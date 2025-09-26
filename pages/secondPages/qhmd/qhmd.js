// pages/secondPages/qhmd/qhmd.js

const iconPath = '/static/icons/qhmd-pos.png'

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
      name: '呼和浩特诺和木勒凯德店', // 店面名称
      desc: '内蒙古自治区呼和浩特市玉泉区鄂尔多斯大街金宇新天地A座凯德广场01-15F', // 店面详细地址
      time: '营业时间10：00-22：00',
      len: '距离5.7km', // 随便填
      latitude: 40.79705293133108, // 纬度
      longitude: 111.67282647537724, // 经度
    }, {
      id: '2', // 唯一id
      name: '呼和浩特振华广场店', // 店面名称
      desc: '内蒙古自治区呼和浩特市回民区锡林郭勒北路37号振华购物广场第一层1-28', // 店面详细地址
      time: '营业时间8：00-22：00',
      len: '距离8.1km', // 随便填
      latitude: 40.816376230476806, // 纬度
      longitude: 111.66094342239353, // 经度
    }, {
      id: '3', // 唯一id
      name: '呼和浩特新华广场店', // 店面名称
      desc: '内蒙古自治区呼和浩特市回民区中山西路街道新华大街68号负一层A01', // 店面详细地址
      time: '营业时间10：00-21：00',
      len: '距离8.4km', // 随便填
      latitude: 40.818616780081584, // 纬度
      longitude: 111.66016581598456, // 经度
    }, {
      id: '4', // 唯一id
      name: '呼和浩特中商世界里店', // 店面名称
      desc: '内蒙古自治区呼和浩特市赛罕区大学东街万正广场1~2号楼裙楼1层1007铺位', // 店面详细地址
      time: '营业时间9：00-21：30',
      len: '距离9.4km', // 随便填
      latitude: 40.82170457961786, // 纬度
      longitude: 111.74381685664082, // 经度
    }, {
      id: '5', // 唯一id
      name: '呼和浩特摩尔城店', // 店面名称
      desc: '内蒙古自治区呼和浩特市赛罕区新华东街62号摩尔城A座F01', // 店面详细地址
      time: '营业时间9：00-21：00',
      len: '距离9.4km', // 随便填
      latitude: 40.82890384420435, // 纬度
      longitude: 111.70375511392137, // 经度
    }, {
      id: '6', // 唯一id
      name: '呼和浩特新城王府井如意小镇店', // 店面名称
      desc: '内蒙古自治区呼和浩特市新城区机场北辅路水岸小镇H区（火车东站南侧）王府井奥莱如意小镇1F奈雪的茶', // 店面详细地址
      time: '营业时间9：00-21：30',
      len: '距离12.6km', // 随便填
      latitude: 40.844100787274044, // 纬度
      longitude: 111.7589794621939, // 经度
    }],

    /**
     * 地图组件中心位置
     */
    latitude: 23.099994, // 纬度
    longitude: 113.324520, // 经度

    /**
     * 地图上标记的店面，长度应与list的长度一致
     */
    markers: [],
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
      current,
      latitude: this.data.markers[current].latitude,
      longitude: this.data.markers[current].longitude,
    })
  },

  /**
   * 去下单
   */
  handleOk(e) {
    const current = e.currentTarget.dataset.current
    const obj = this.data.list[current]
    
    // 存储选中的门店信息到本地存储
    wx.setStorageSync('okQhmd', obj)
    
    // 如果是从收藏页进入，直接跳转到点餐页面并携带门店信息
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    if (prevPage && prevPage.route === 'pages/secondPages/phb/phb') {
      wx.switchTab({
        url: '/pages/order/order'
      })
    } else {
      // 否则返回上一页
      wx.navigateBack()
    }
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
    const markers = this.data.list.map(item => {
      return {
        id: Number(item.id),
        latitude: item.latitude,
        longitude: item.longitude,
        name: item.name,
        width: 86 / 2,
        height: 120 / 2,
        iconPath,
      }
    })
    this.setData({
      markers,
      latitude: markers[0].latitude,
      longitude: markers[0].longitude,
    })
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