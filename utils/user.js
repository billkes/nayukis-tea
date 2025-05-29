const { BASE_URL } = require('./config');

const fetchUserInfo = (token) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${BASE_URL}/user/info`,
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'X-Auth-Token': token
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data.success) {
                    const userInfo = res.data.data;
                    // 如果有本地缓存的微信用户信息，优先使用其头像和昵称
                    const wxUserInfo = wx.getStorageSync('wxUserInfo');
                    if (wxUserInfo) {
                        userInfo.avatarUrl = wxUserInfo.avatarUrl || userInfo.avatarUrl;
                        userInfo.nickName = wxUserInfo.nickName || userInfo.nickName;
                    }
                    console.log('------***------', userInfo);
                    resolve(userInfo);
                } else {
                    console.error('获取用户信息失败', res.data);
                    // 可能是token已失效，清除登录状态
                    if (res.statusCode === 401) {
                        console.log('登录凭证已失效，清除本地存储');
                        // clearLoginStatus();
                    }
                    reject(res.data);
                }
            },
            fail: (err) => {
                console.error('请求用户信息失败', JSON.stringify(err));
                reject(err);
            }
        });
    });
}

// 清除登录状态
const clearLoginStatus = () => {
    wx.removeStorageSync('token');
    wx.removeStorageSync('openid');
    wx.removeStorageSync('tokenExpireTime');
    // 不清除userInfo，因为它包含微信授权获取的信息
    // 它是用户授权获取的，应当保留
}

module.exports = {
    fetchUserInfo,
    clearLoginStatus
}