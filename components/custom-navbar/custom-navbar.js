// components/custom-navbar/custom-navbar.js
const navInfo = require('../../utils/navInfo.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    okQhmd: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    storeName: '店名',
    len: 5.7,
    visible: false,
    content: ['加入门店会员群,领18元新人礼', '限时饮品烘焙2件八折', '小程序下单满赠周边活动'],
    current: 0,
    // 导航栏相关信息
    statusBarHeight: navInfo.statusBarHeight,
    menuButtonHeight: navInfo.menuButtonHeight,
    menuButtonTop: navInfo.menuButtonTop,
    menuButtonRight: 10, // 胶囊按钮右边距，默认10px
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateToPage() {
      wx.navigateTo({
        url: '/pages/secondPages/search/search',
      })
    },
    
    handleToggleCurrent(e) {
      const current = e.currentTarget.dataset.current
      this.setData({
        current
      })
    },
    
    handlePopShow() {
      this.setData({
        visible: true
      });
    },
    
    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
  }
})