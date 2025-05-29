// components/photo/photo.js
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
    opacity: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoType(e) {
      const {
        type,
      } = e.currentTarget.dataset
      // console.log(type);
      this.triggerEvent('handleGotoType', {
        type
      })
    },
  }
})