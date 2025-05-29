// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      opacity: 0,
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      // 获取导航栏高度
      
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
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
          this.getTabBar().init();
      }
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

  },
  // onPageScroll(e) {
  //     clearTimeout(this.scrollTimer);
  //     this.scollArr = Array.isArray(this.scollArr) ? this.scollArr : []; //记录滚动坐标
  //     this.scollArr.push(e.scrollTop);
  //     if (this.scollArr.length > 2) {
  //         this.direction = (this.scollArr[this.scollArr.length - 1] - this.scollArr[0]) > 0 ? 1 : -1; //1向下滚动  -1向上滚动
  //     }
  //     this.scrollTimer = setTimeout(() => {//延迟清除记录
  //         this.scollArr = [];
  //     }, 100)
  // }, 
  onPageScroll(e) {
      clearTimeout(this.scrollTimer);
      this.scollArr = Array.isArray(this.scollArr) ? this.scollArr : []; //记录滚动坐标
      this.scollArr.push(e.scrollTop);
      if (this.scollArr.length > 2) {
          this.direction = (this.scollArr[this.scollArr.length - 1] - this.scollArr[0]) > 0 ? -1 : 1; //1向下滚动  -1向上滚动
      }
      this.scrollTimer = setTimeout(() => {//延迟清除记录
          this.scollArr = [];
      }, 100)

      const scrollTop = e.scrollTop;
      
      // 向下滑动的阈值
      const bthreshold = 84;
      // 设置透明度变化阈值
      const threshold = 256;
      if(this.direction < 0 && scrollTop < bthreshold){
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


})
