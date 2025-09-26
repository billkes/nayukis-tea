// const image = '/static/icons/customer-fill.png';
const items = new Array(12).fill().map((_, index) => ({
  label: index % 3 === 2 ? '111' : '222'
  // image: image,
}));
const orderUtils = require('../../utils/order.js');
const {
  BASE_URL
} = require('../../utils/config');
// 节流函数
function throttle(fn, delay) {
  let timer = null;
  let last = 0;

  return function (...args) {
    const now = Date.now();

    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, delay);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    okQhmd: {},
    topNodeHeight: 0,
    photoNodeHeight: 0,
    categories: [],
    orderData: {
      orderId: "order" + Date.now(),
      amount: 0.01,
      description: "订单order" + Date.now() + "支付",
      openid: "oLdZf7Hckxk3Udup67UOZRmcl8WA",
      products: [{
          id: "01",
          name: "滇西树番茄双抗小红瓶",
          aa1: "每日500蔬果瓶",
          aa2: "维C快充",
          text: "云南山野|提亮之酸",
          price: 19,
          image: "/static/images/zxs.jpg",
          quantity: 1
        },
        {
          id: "02",
          name: "奈雪瘦瘦小绿瓶",
          aa1: "每日500蔬果瓶",
          aa2: "瘦瘦轻盈",
          text: "膳食纤维 | 超级食材羽衣&橙",
          price: 19,
          image: "/static/images/qwe.jpg",
          quantity: 1
        },

      ],
      metadata: {
        source: "miniprogram",
        clientTime: (new Date()).toUTCString(),
        orderTitle: "订单(2件商品)"
      }
    },
    token: '',
    isCreatingOrder: false,
    formattedTime: '',
    showPaymentSuccess: false,

    barStyle: `
    --td-side-bar-active-color:#45cd00;
    --td-side-bar-font-size:12px;
    --td-side-bar-width:190rpx;
    --td-side-bar-border-radius:0px;
    --td-side-bar-item-height:50rpx;
    `,

    sideBarIndex: 0,
    scrollTop: 0,
    categories: [{
        image1: "/static/images/sg.jpg",
        label: '每日蔬果瓶',
        title: '每日蔬果瓶',
        badgeProps: {},
        items: [{
            id: "01",
            name: "奈雪畅畅小绿瓶",
            aa1: "每日500蔬果瓶",
            aa2: "轻松顺畅",
            text: "潮汕油柑 | 香蜜杨桃 | 羽衣甘蓝",
            price: 19,
            image: "/static/images/a.jpg",
            type1: "限量方形杯",
            type2: "常规杯",

          },
          {
            id: "02",
            name: "奈雪瘦瘦小绿瓶",
            aa1: "每日500蔬果瓶",
            aa2: "瘦瘦轻盈",
            text: "膳食纤维 | 超级食材羽衣&橙",
            price: 19,
            image: "/static/images/qwe.jpg"
          },
          {
            id: "03",
            name: "滇西树番茄双抗小红瓶",
            aa1: "每日500蔬果瓶",
            aa2: "维C快充",
            text: "云南山野 | 提亮之酸",
            price: 19,
            image: "/static/images/y.jpg"
          }
        ]
      },
      {
        label: '山野宝藏茶',
        title: '山野宝藏茶',
        badgeProps: {},
        items: [{
            id: "01",
            name: "茉莉初雪奶茶",
            aa1: "招牌奶茶",
            aa2: "金奖茶茉莉初雪",
            text: "0奶精 | 0香精 | 鲜果八窨",
            price: 16,
            image: "/static/images/d.jpg"
          },
          {
            id: "02",
            name: "金色山脉珍珠奶茶",
            aa1: "滇红蜜香",
            aa2: "手熬黑糖珍珠",
            text: "古树金芽|红茶雅韵",
            price: 16,
            image: "/static/images/e.jpg"
          }
        ],
      },
      {
        label: '热饮推荐',
        title: '热饮推荐',
        badgeProps: {},
        items: [{
            id: "01",
            name: "茉莉初雪奶茶",
            aa1: "招牌奶茶",
            aa2: "金奖茶茉莉初雪",
            text: "0奶精 | 0香精 | 鲜果八窨",
            price: 16,
            image: "/static/images/d.jpg"
          },
          {
            id: "02",
            name: "金色山脉珍珠奶茶",
            aa1: "滇红蜜香",
            aa2: "手熬黑糖珍珠",
            text: "古树金芽|红茶雅韵",
            price: 16,
            image: "/static/images/e.jpg"
          },
          {
            id: "03",
            name: "森林观音",
            aa1: "花香环绕",
            aa2: "一口奔赴自然",
            text: "花香环绕 | 回甘悠长",
            price: 9,
            image: "/static/images/f.jpg"
          },
          {
            id: "04",
            name: "奈雪茉莉初雪",
            aa1: "白毫绿茶",
            aa2: "五星金茶奖",
            text: "0香精鲜花八窨",
            price: 11,
            image: "/static/images/g.jpg"
          }
        ],
      },
      {
        label: '霸气鲜果茶',
        title: '霸气鲜果茶',
        badgeProps: {},
        items: [{
            id: "01",
            name: "霸气芝士葡萄",
            aa1: "葡萄肉多多",
            text: "清爽葡萄|清盈芝士",
            price: 19,
            image: "/static/images/b.jpg"
          },
          {
            id: "02",
            name: "霸气橙子",
            aa1: "奈雪首创",
            aa2: "金奖茶茉莉初雪",
            text: "奈雪首款招牌鲜果茶",
            price: 19,
            image: "/static/images/c.jpg"
          }
        ],
      },
      {
        label: '无糖纯茶',
        title: '无糖纯茶',
        badgeProps: {},
        items: [{
            id: "03",
            name: "森林观音",
            aa1: "花香环绕",
            aa2: "一口奔赴自然",
            text: "花香环绕 | 回甘悠长",
            price: 9,
            image: "/static/images/f.jpg"
          },
          {
            id: "04",
            name: "奈雪茉莉初雪",
            aa1: "白毫绿茶",
            aa2: "五星金茶奖",
            text: "0香精鲜花八窨",
            price: 11,
            image: "/static/images/g.jpg"
          }
        ],
      },
      {
        label: '限定联名',
        title: '限定联名',
        badgeProps: {},
        items: [{
            id: "01",
            name: "小王子心意守护杯",
            aa1: "395ml",
            aa2: "不锈钢杯",
            text: "松弛女孩, 快乐喝水",
            price: 40.8,
            image: "/static/images/w.jpg"
          },
          {
            id: "02",
            name: "Green系列双杯套餐",
            aa1: "限定周边",
            aa2: "桌面软绒绿意",
            text: "奈雪green系列饮品",
            price: 39,
            image: "/static/images/v.jpg"
          }
        ],
      },
      {
        label: '软欧面包',
        title: '软欧面包',
        badgeProps: {},
        items: [{
            id: "01",
            name: "蛋黄芋泥双料包",
            aa1: "禾木灰腌制咸鸭蛋",
            text: "咸蛋黄&芋泥,香甜又软糯",
            price: 10.8,
            image: "/static/images/h.jpg"
          },
          {
            id: "02",
            name: "海苔松松卷",
            aa1: "手工卷制",
            aa2: "饱满松松",
            text: "奶香浓郁,咸甜交织",
            price: 9.8,
            image: "/static/images/i.jpg"
          },
          {
            id: "03",
            name: "肠仔包",
            aa1: "动物黄油",
            aa2: "爆汁肉肠",
            text: "真肉肠.不添加淀粉",
            price: 12.8,
            image: "/static/images/j.jpg"
          }
        ],
      },
      {
        label: '蛋糕甜点',
        title: '蛋糕甜点',
        badgeProps: {},
        items: [{
            id: "01",
            name: "巧克力甜甜圈",
            aa1: "纯可可脂巧克力",
            text: "53%黑巧克力+草莓巧克力",
            price: 9.8,
            image: "/static/images/k.jpg"
          },
          {
            id: "02",
            name: "奥利奥布蕾小贝(单个)",
            aa1: "超浓可可",
            text: "布蕾夹心,入口即化",
            price: 8.8,
            image: "/static/images/l.jpg"
          }
        ],
      },
      {
        label: '零食/茶叶',
        title: '零食/茶叶',
        badgeProps: {},
        items: [{
            id: "01",
            name: "芝士酥条",
            text: "芝香酥脆,咬一口嘎嘣脆",
            price: 12,
            image: "/static/images/m.jpg"
          },
          {
            id: "02",
            name: "蛋仔饼",
            aa1: "新西兰动物黄油",
            text: "儿时熟悉的那口酥脆蛋香饼",
            price: 12,
            image: "/static/images/n.jpg"
          }, {
            id: "03",
            name: "茉莉初雪(花茶袋泡茶)",
            text: "新鲜茉莉花香 | 传统窨制工艺",
            price: 19.9,
            image: "/static/images/p.jpg"
          }, {
            id: "04",
            name: "鸭屎香单丛(袋泡茶）",
            text: "花香野韵 | 久泡依然甘香",
            price: 19.9,
            image: "/static/images/o.jpg"
          }
        ],
      },
      {
        label: '打包袋',
        title: '打包袋',
        badgeProps: {},
        items: [{
            id: "01",
            name: "大保温袋",
            text: "可用于4杯饮品打包使用",
            price: 4,
            image: "/static/images/q.jpg"
          },
          {
            id: "02",
            name: "小保温袋",
            text: "可用于2杯饮品打包使用",
            price: 2,
            image: "/static/images/r.jpg"
          }
        ],
      },
      {
        label: '加料专区',
        title: '加料专区',
        badgeProps: {},
        items: [{
            id: "01",
            name: "芝士(分装)",
            text: "特制芝士 | 奶香十足",
            price: 5,
            image: "/static/images/s.jpg"
          },
          {
            id: "02",
            name: "西米(分装)",
            text: "弹滑软糯",
            price: 3,
            image: "/static/images/t.jpg"
          }
        ],
      },
      {
        label: '绿色奈雪',
        title: '绿色奈雪',
        badgeProps: {},
        items: [{
            id: "01",
            name: "绿色地球, 美好行动",
            price: 0,
            image: "/static/images/x.jpg"
          },
          {
            id: "02",
            name: "单杯打包袋（可降解）",
            price: 0.1,
            image: "/static/images/z.jpg"
          }
        ],
      },

    ],
    navbarHeight: 300
  },

  sectionTops: [], // 存储每个section的顶部位置

  onLoad(options) {
    // 监听页面就绪
    const categories = wx.setStorageSync('categories');
    this.setData({
      categories
    });



    this.observePageReady();
    // 获取用户token和openid
    const token = wx.getStorageSync('token');
    const openid = wx.getStorageSync('openid');

    // 格式化时间显示
    const clientTime = this.data.orderData.metadata.clientTime;
    const date = new Date(clientTime);
    const formattedTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    this.setData({
      token,
      'orderData.openid': openid || this.data.orderData.openid,
      formattedTime
    });
    const query = wx.createSelectorQuery().in(this);
    const {
      sideBarIndex
    } = this.data;
    query.selectAll('.title').boundingClientRect();
    query.select('.custom-navbar').boundingClientRect();
    query.exec((res) => {
      // const [rects, { height: navbarHeight }] = res;
      // this.offsetTopList = rects.map((item) => item.top - navbarHeight);
      // this.setData({ navbarHeight, scrollTop: this.offsetTopList[sideBarIndex] });
    });
  },
  navigateToPage() {
    wx.navigateTo({
      url: '/pages/secondPages/search/search',
    });
  },
  onSideBarChange(e) {
    const {
      value
    } = e.detail;
    this.setData({
      sideBarIndex: value,
      scrollTop: this.offsetTopList[value]
    });

  },
  onScroll(e) {
    const {
      scrollTop
    } = e.detail;
    const threshold = 50; // 下一个标题与顶部的距离

    if (scrollTop < threshold) {
      this.setData({
        sideBarIndex: 0
      });
      return;
    }

    const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

    if (index > -1) {
      this.setData({
        sideBarIndex: index
      });
    }
  },
  handleGoto(e) {
    // console.log(e);
    const id = e.currentTarget.dataset.uid
    wx.navigateTo({
      url: '/pages/secondPages/menu/menu?id=' + id,
    })
  },
  getProductList: function () {
    wx.request({
      url: 'https://your-api.com/products',
      success: (res) => {
        this.setData({
          products: res.data.products
        });
      }
    });
  },

  /**
   * 提供给photo组件调用的方法
   */
  handleGotoType: function (e) {
    // console.log('提供给photo组件调用的方法handleGotoType', e);
    const top = -this.data.topNodeHeight
    console.log(top);
    wx.pageScrollTo({
      selector: '#main-node',
      offsetTop: top,
      duration: 300
    })


  },

  /**
   * 创建订单并发起支付
   */
  createOrder() {
    if (this.data.isCreatingOrder) {
      return;
    }

    if (!this.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    this.setData({
      isCreatingOrder: true
    });

    // 更新订单的时间戳
    const orderData = this.data.orderData;
    orderData.metadata.clientTime = new Date().toISOString();

    // 调用支付流程
    orderUtils.processPayment(orderData, this.data.token)
      .then(result => {
        console.log('支付成功:', result);
        // 显示支付成功对话框
        this.setData({
          showPaymentSuccess: true
        });
      })
      .catch(error => {
        console.log('支付失败:', error);
        if (error.cancelled) {
          wx.showToast({
            title: '已取消支付',
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: error.message || '支付失败',
            icon: 'error'
          });
        }
      })
      .finally(() => {
        // 支付完成后的清理工作
        this.setData({
          isCreatingOrder: false
        });
        // 跳转到订单列表页
        setTimeout(() => {
          wx.reLaunch({
            url: `/pages/ofg/ofg`
          });
        }, 1500);
      });
  },
  /**
   * 关闭支付成功提示
   */
  closePaymentSuccess() {
    this.setData({
      showPaymentSuccess: false
    });
  },


  // 监听页面就绪
  observePageReady() {
    const observer = wx.createIntersectionObserver(this);
    observer.relativeToViewport().observe('.section', (res) => {
      // 页面出现第一个section时开始获取位置
      if (res.intersectionRatio > 0) {
        observer.disconnect();
        this.getSectionTops();
      }
    });
  },

  getSectionTops() {
    const query = wx.createSelectorQuery().in(this);
    // 同时获取scroll-view和section的位置信息
    query.select('.scroll-view').boundingClientRect();
    query.selectAll('.section').boundingClientRect();

    query.exec((res) => {
      if (!res[0] || !res[1]) return;

      const scrollViewTop = res[0].top;
      const sections = res[1];

      // 计算每个section相对于scroll-view的位置
      this.sectionTops = sections.map(section => section.top - scrollViewTop);

      // 初始化滚动位置
      this.setData({
        scrollTop: this.sectionTops[0]
      });
    });
  },

  onSideBarChange(e) {
    const {
      value
    } = e.detail;

    if (this.sectionTops[value] !== undefined) {
      this.setData({
        sideBarIndex: value,
        scrollTop: this.sectionTops[value]
      });
    }
  },

  onScroll: throttle(function (e) {
    const {
      scrollTop
    } = e.detail;

    // 找到最接近当前滚动位置的section
    let minDiff = Infinity;
    let activeIndex = 0;

    this.sectionTops.forEach((top, index) => {
      const diff = Math.abs(scrollTop - top);
      if (diff < minDiff) {
        minDiff = diff;
        activeIndex = index;
      }
    });

    // 更新侧边栏状态
    if (this.data.sideBarIndex !== activeIndex) {
      this.setData({
        sideBarIndex: activeIndex
      });
    }
  }, 100),

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.createSelectorQuery()
      .select('#photo-node').boundingClientRect()
      .select('#top-node').boundingClientRect()
      .exec((r) => {
        console.log('节点', r);
        if (Array.isArray(r) && r.length === 2) {
          console.log(r);
          this.setData({
            photoNodeHeight: r[0].height,
            topNodeHeight: r[1].height
          })
        }

      })
  },

  onPageScroll(e) {
    // console.log(e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const okQhmd = wx.getStorageSync('okQhmd') || {}
    this.setData({
      okQhmd
    })
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
});