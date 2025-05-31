// pages/secondPages/huiyuanqun/huiyuanqun.js

const {
  qrcode
} = require('../../../static/images/qrcode')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterList: [],
    list: [
      '门店1',
      '门店2',
      '门店3',
      '门店4',
      '门店5',
      '门店6',
    ],
    keyword: '',
    isFocus: false,
    cityVisible: false,
    cityValue: [],
    cityText: '',
    citys: [{
        label: '北京市',
        value: '北京市',
        tag: '合'
      },
      {
        label: '上海市',
        value: '上海市',
        tag: '合'
      },
      {
        label: '广州市',
        value: '广州市'
      },
      {
        label: '深圳市',
        value: '深圳市'
      },
      {
        label: '成都市',
        value: '成都市'
      },
    ],
  },

  formatter(item) {
    const {
      value,
      label
    } = item;
    if (value === '北京市') {
      return {
        value,
        label: label.substring(0, 2),
      };
    }
    return item;
  },

  onColumnChange(e) {
    console.log('picker pick:', e);
  },

  onPickerChange(e) {
    const {
      key
    } = e.currentTarget.dataset;
    const {
      value
    } = e.detail;

    console.log('picker change:', e.detail);
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: value.join(' '),
    });
  },

  onPickerCancel(e) {
    const {
      key
    } = e.currentTarget.dataset;
    console.log(e, '取消');
    console.log('picker1 cancel:');
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onCityPicker() {
    this.setData({
      cityVisible: true
    });
  },

  onSeasonPicker() {
    this.setData({
      dateVisible: true
    });
  },
  /**
   * 切换城市
   */
  handleToggleCity() {
    // console.log('切换城市');
    this.setData({
      cityVisible: true
    });
  },

  /**
   * 选中门店
   */
  handleItemClick(e) {
    // console.log(e.currentTarget.dataset.keyword);
    const keyword = e.currentTarget.dataset.keyword
    this.setData({
      keyword
    })
  },
  /**
   * 输入
   */
  handleInput(e) {
    // console.log(e.detail.value);
    const keyword = e.detail.value
    const filterList = this.data.list.filter(o => o.includes(keyword))
    this.setData({
      keyword,
      filterList
    })
  },
  /**
   * 聚焦
   */
  handleFocus() {
    // console.log('handleFocus');
    this.setData({
      isFocus: true
    })
  },
  /**
   * 失去焦点
   */
  handleBlur() {
    // console.log('handleBlur');
    this.setData({
      isFocus: false
    })
  },

  /**
   * 点击预览图片
   */
  previewImage() {
    wx.previewImage({
      urls: [qrcode],
      current: qrcode,
      showmenu: true,
      success: () => {
        console.log('success');
      },
      fail: (e) => {
        console.log('fail', e);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      filterList: this.data.list
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