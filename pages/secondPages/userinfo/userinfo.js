// pages/secondPages/editAddress/editAddress.js

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
    id: '',
    date: '',
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
    this.setData({
      date: e.detail.value
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
    // 登录后就会存在用户信息


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