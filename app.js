// app.js
App({
  onLaunch() {
    this.checkLoginStatus();
  },
  checkLoginStatus: function () {
    const openid = wx.getStorageSync('openid');
    const token = wx.getStorageSync('token');
    if (!openid || !token) {
      //登录
      wx.login({
        success: (res) => {
          //发送res.code 到后台换取 openId, sessionKey, unionId
          // console.log("onLaunch", res);
          this.loginWithCode(res.code);
        }
      })
    }
  },
  loginWithCode: function (code) {
    // 请求我自己的服务器 --用code换openid
    // 保存openid
    const requsetUrl = "https://adaa-110-16-109-248.ngrok-free.app/user/login";
    wx.request({
      url: requsetUrl,
      data: {
        code
      },
      method: 'POST',
      success: (res) => {
        //console.log(res);
        if (res.statusCode == 200 && res.data.success) {
          const {
            openid,
            token
          } = res.data.data;
          wx.setStorageSync('openid', openid);
          wx.setStorageSync('token', token);
        }
        wx.showToast({
          title: '登录成功',
        });
      },
      fail: (err) => {
        //console.error(err);
        console.error("【登录失败】");
      },
      complete: () => {

      }
    })
  }
})