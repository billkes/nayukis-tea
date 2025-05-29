// components/search/search.js
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
    value: '',
    actionText: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeHandle(e) {
      const { value } = e.detail;
      this.setData({
        value,
      });
    },

    focusHandle() {
      this.setData({
        actionText: '取消',
      });
    },

    blurHandle() {
      this.setData({
        actionText: '',
      });
    },

    actionHandle() {
      this.setData({
        value: '',
        actionText: '',
      });
    },
  },
})