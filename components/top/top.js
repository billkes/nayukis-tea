// components/top/top.js
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
    storeName: '店名',
    len: 5.7,
    visible: true,
    content: ['加入门店会员群,领18元新人礼', '限时饮品烘焙2件八折', '小程序下单满赠周边活动'],
  },

  /**
   * 组件的方法列表
   */
  methods: {

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
  }
})