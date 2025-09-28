// components/top/top.js
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
    menuButtonInfo: null,
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
      // console.log(e.currentTarget.dataset.current);
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
    onPageScroll(e) {
      clearTimeout(this.scrollTimer);
      this.scollArr = Array.isArray(this.scollArr) ? this.scollArr : []; //记录滚动坐标
      this.scollArr.push(e.scrollTop);
      if (this.scollArr.length > 2) {
        this.direction = (this.scollArr[this.scollArr.length - 1] - this.scollArr[0]) > 0 ? -1 : 1; //1向下滚动  -1向上滚动
      }
      this.scrollTimer = setTimeout(() => { //延迟清除记录
        this.scollArr = [];
      }, 100)

      const scrollTop = e.scrollTop;

      // 向下滑动的阈值
      const bthreshold = 84;
      // 设置透明度变化阈值
      const threshold = 256;
      if (this.direction < 0 && scrollTop < bthreshold) {
        opacity = 0;
        isFixed = false
        this.setData({
          opacity,
          isFixed
        });
        return
      }
      // 计算透明度
      let opacity = scrollTop / threshold;
      opacity = opacity > 1 ? 1 : opacity;

      // 设置吸顶效果
      let isFixed = scrollTop >= threshold;

      // console.log(scrollTop + ' ' + isFixed);
      this.setData({
        opacity,
        isFixed
      });
    },
  },

  /**
   * 组件生命周期函数 - 在组件实例进入页面节点树时执行
   */
  attached() {
    // 获取胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuButtonInfo
    });
  }
})