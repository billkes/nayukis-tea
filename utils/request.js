const { BASE_URL } = require('./config');

/**
 * 网络请求封装
 * @param {Object} options - 请求参数
 * @returns {Promise} Promise对象
 */
const request = (options) => {
    return new Promise((resolve, reject) => {
        // 确保baseUrl存在
        if (!BASE_URL) {
            reject(new Error('baseUrl未配置'));
            return;
        }

        // 构建完整URL
        const url = options.url.startsWith('http') 
            ? options.url 
            : `${BASE_URL}${options.url}`;

        // 显示加载提示
        if (options.showLoading !== false) {
            wx.showLoading({
                title: '加载中'
            });
        }

        // 合并请求配置
        const requestOptions = {
            url: url,
            method: options.method || 'GET',
            data: options.data || {},
            header: {
                'content-type': 'application/json',
                ...options.header
            },
            success: (res) => {
                // 请求成功
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data);
                } else {
                    // 处理业务错误
                    reject(res);
                }
            },
            fail: (err) => {
                // 处理网络错误
                console.error('请求失败：', err);
                reject(err);
            },
            complete: () => {
                if (options.showLoading !== false) {
                    wx.hideLoading();
                }
            }
        };

        // 发起请求
        wx.request(requestOptions);
    });
};

// 封装常用请求方法
const http = {
    // GET 请求
    get: (url, data = {}, header = {}) => {
        return request({ url, method: 'GET', data, header });
    },

    // POST 请求
    post: (url, data = {}, header = {}) => {
        return request({ url, method: 'POST', data, header });
    },

    // PUT 请求
    put: (url, data = {}, header = {}) => {
        return request({ url, method: 'PUT', data, header });
    },

    // DELETE 请求
    delete: (url, data = {}, header = {}) => {
        return request({ url, method: 'DELETE', data, header });
    }
};

// 导出请求方法
module.exports = {
    request,
    http
}; 