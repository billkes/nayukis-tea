// pages/secondPages/editAddress/editAddress.js

const {
  getNewId
} = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    consignee: '', // 收货人
    sex: '', // 0 女 1男
    phone: '', // 手机
    deliveryAddress: '这是一个默认收获地址', // 收获地址
    houseNumber: '', // 门牌号
    label: '', // 标签
    isDefault: '', // 是否默认 1-true
  },

  /**
   * 输入框专用双向绑定
   */
  handleInputChange(e) {
    // console.log(e);
    const {
      fkey
    } = e.currentTarget.dataset
    const value = e.detail.value
    this.setData({
      [fkey]: value
    })
  },

  /**
   * 验证表单
   */
  verifyForm() {
    if (!this.data.consignee) {
      wx.showToast({
        title: '请填写收货人',
        icon: 'error'
      })
      return false
    }
    if (!this.data.deliveryAddress) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'error'
      })
      return false
    }
    // if (!this.data.sex) {
    //   wx.showToast({
    //     title: '请选择性别',
    //     icon: 'error'
    //   })
    //   return false
    // }
    if (!this.data.phone) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'error'
      })
      return false
    }
    if (!this.data.houseNumber) {
      wx.showToast({
        title: '请填写门牌号',
        icon: 'error'
      })
      return false
    }
    // 不必填
    // if (!this.data.label) {
    //   wx.showToast({
    //     title: '请填写标签',
    //     icon: 'error'
    //   })
    //   return false
    // }
    // 不必填
    // if (!this.data.isDefault) {
    //   wx.showToast({
    //     title: '请选择是否默认地址',
    //     icon: 'error'
    //   })
    //   return false
    // }
    return true
  },

  /**
   * 表单提交
   */
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    // 验证表单
    if (!this.verifyForm()) {
      return
    }

    // 构造数据
    const formData = {
      ...e.detail.value,
      sex: this.data.sex,
      deliveryAddress: this.data.deliveryAddress,
      label: this.data.label,
      id: this.data.id || getNewId()
    }
    console.log(formData);
    // 获取数据
    const list = wx.getStorageSync('addressList') || []
    console.log(list);
    // 插入或更新数据
    const objIndex = list.findIndex(o => o.id === formData.id)
    if (objIndex !== -1) {
      list[objIndex] = formData
    } else {
      list.push(formData)
    }
    // 存储数据
    wx.setStorageSync('addressList', list)
    // 返回
    wx.showToast({
      title: '保存chengg',
      icon: 'success',
      success: () => {
        wx.navigateBack()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    /**
     * 如有id则为编辑
     * 反之新增
     */
    if (options.id) {
      // 1. 获取本地地址别表 拿到对应地址 把值替换
      // 获取本地的地址
      const list = wx.getStorageSync('addressList') || []
      const obj = list.find(o => o.id === options.id)
      if (obj) {
        for (const key in obj) {
          this.setData({
            [key]: obj[key]
          })
        }
      } else {
        wx.showToast({
          title: '获取失败',
          icon: 'error'
        })
      }
    }
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