// components/Card/Card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 跳转小程序
     */
    handleTransOtherWx() {
      wx.showModal({
        content: '即将打开"奈雪的茶合伙人"小程序',
        confirmText: '允许',
        complete: (res) => {
          if (res.cancel) {

          }

          if (res.confirm) {

          }
        }
      })
    },

  }
})