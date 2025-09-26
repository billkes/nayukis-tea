// pages/sign-in/sign-in.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentMonth: '',
    currentDay: '',
    days: [],
    signedDays: [],
    naixueCoins: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initCalendar();
  },

  /**
   * 初始化日历
   */
  initCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // 获取当月第一天是星期几（0-6，0代表周日）
    const firstDay = new Date(year, month - 1, 1).getDay();
    // 获取当月天数
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // 生成日历数组
    const days = [];
    
    // 添加前面的空白天数
    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: '',
        isCurrentMonth: false,
        isToday: false,
        isSigned: false
      });
    }
    
    // 添加当月天数
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: i === day,
        isSigned: i < day // 模拟：今天之前的日期都算已签到
      });
    }
    
    this.setData({
      currentMonth: `${year}年${month}月`,
      currentDay: day,
      days: days,
      signedDays: Array.from({length: day - 1}, (_, i) => i + 1), // 模拟已签到日期
      naixueCoins: (day - 1) * 10 // 模拟奈雪币数量
    });
  },

  /**
   * 签到
   */
  handleSignIn() {
    const { currentDay, signedDays } = this.data;
    
    // 检查今天是否已签到
    if (signedDays.includes(currentDay)) {
      wx.showToast({
        title: '今日已签到',
        icon: 'none'
      });
      return;
    }
    
    // 添加签到
    const newSignedDays = [...signedDays, currentDay];
    const newNaixueCoins = this.data.naixueCoins + 10;
    
    // 更新日历中今天的签到状态
    const newDays = this.data.days.map(day => {
      if (day.day === currentDay) {
        return { ...day, isSigned: true };
      }
      return day;
    });
    
    this.setData({
      signedDays: newSignedDays,
      naixueCoins: newNaixueCoins,
      days: newDays
    });
    
    wx.showToast({
      title: '签到成功，获得10奈雪币',
      icon: 'success'
    });
  },

  /**
   * 返回上一页
   */
  handleBack() {
    wx.navigateBack();
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
});