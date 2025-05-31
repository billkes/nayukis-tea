// pages/secondPages/editAddress/editAddress.js

/**
 * 以最简单的方式构建用户信息
 */
const defautlUserinfo = {
  id: '1234',
  name: '张三', // 昵称
  date: '2025-05-30', // 生日
  sex: '1',
}

const {
  getNewId
} = require('../../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sexIndex: -1,
    sexObjectArray: [{
        label: '男士',
        value: '1'
      },
      {
        label: '女士',
        value: '0'
      },
    ],
    userinfo: {},
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
    this.data.userinfo[fkey] = value
    this.setData({
      userinfo: this.data.userinfo
    })
  },

  /**
   * 性别选择器
   */
  handlePickerChange(e) {
    console.log('性别选择器', 'handlePickerChange', e);
    this.setData({
      sexIndex: e.detail.value
    })
  },

  /**
   * 选择一张图片上传
   */
  handleUploadImage() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath)
        console.log(res.tempFiles[0].size)

        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something 更改头像


          }
        })
      }
    })
  },

  /**
   * 日期选择
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.userinfo.date = e.detail.value
    this.setData({
      userinfo: this.data.userinfo
    })
  },

  /**
   * 验证表单
   */
  verifyForm() {
    if (!this.data.userinfo.name) {
      wx.showToast({
        title: '请填写昵称',
        icon: 'error'
      })
      return false
    }
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
      ...this.data.userinfo
    }
    console.log(formData);
    // 存储数据
    wx.setStorageSync('userinfoData', formData)
    // 返回
    wx.showToast({
      title: '保存成功',
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
    const userinfo = wx.getStorageSync('userinfoData') || defautlUserinfo
    this.setData({
      userinfo,
      sexIndex: userinfo.sex == '1' ? 0 : 1
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