// pages/drinkDetail/drinkDetail.js
const navInfo = require('../../../utils/navInfo'); // 引入导航信息工具

Page({
  data: {
    navInfo: {}, // 导航信息
    drinkId: '', // 当前饮品ID
    drinkInfo: {}, // 当前饮品信息
    selectedSize: '500ml',
    selectedTemp: 'ice',
    selectedTea: 'forest',
    selectedtheme: 'xl',
    selectedtaste: 'mr',
    selectedsweet: 'blwjt',
    selectedTopping: null,
    basePrice: 0, // 基础价格（从饮品数据中获取）
    sizePrice: 0, // 杯型加价
    toppingPrice: 0, // 加料加价
    totalPrice: 0, // 总价
    currentSelection: '', // 当前选择描述
    quantity: 1, // 商品数量
    minQuantity: 1, // 最小数量
    maxQuantity: 99
  },

  onLoad: function (options) {
    const drinkId = options.id || '02';
    if (!drinkId) {
      wx.showToast({
        title: '饮品ID缺失',
        icon: 'none'
      });
      wx.navigateBack();
      return;
    }

    // 设置导航信息
    this.setData({
      navInfo: navInfo,
      drinkId
    });
    this.loadDrinkData(drinkId);

    // 新增：检查购物车中是否已有该商品
    this.checkExistingInCart();
  },
  checkExistingInCart() {
    const cartItems = wx.getStorageSync('shoppingCart') || [];
    const selectionHash = this.generateSelectionHash(); // 生成当前配置的哈希值

    // 查找相同商品和配置
    const existingItem = cartItems.find(
      item => item.id === this.data.drinkId && item.selectionHash === selectionHash
    );

    if (existingItem) {
      // 商品已存在，使用购物车中的实际数量
      this.setData({
        quantity: existingItem.quantity
      });
    } else {
      // 商品不存在，重置为默认数量
      this.setData({
        quantity: this.data.minQuantity
      });
    }
  },

  // 生成配置哈希值（根据实际配置项调整）
  generateSelectionHash() {
    return [
      this.data.selectedTemp || '',
      this.data.selectedsweet || '',
      this.data.selectedSize || '',
      this.data.selectedTopping || '',
      this.data.selectedTea || '',
      this.data.selectedtheme || '',
      this.data.selectedtaste || ''
    ].join('-');
  },
  loadDrinkData: function (drinkId) {
    // 模拟从服务器获取饮品数据
    const mockDrinkData = this.getMockDrinkData();

    // 检查饮品是否存在
    if (!mockDrinkData[drinkId]) {
      wx.showToast({
        title: '饮品不存在',
        icon: 'none'
      });
      wx.navigateBack();
      return;
    }

    // 设置饮品信息和基础价格
    const drinkInfo = mockDrinkData[drinkId];
    this.setData({
      drinkInfo: drinkInfo,
      basePrice: drinkInfo.basePrice,
      // 初始化价格
      totalPrice: drinkInfo.basePrice
    });

    // 更新页面标题
    wx.setNavigationBarTitle({
      title: drinkInfo.name
    });

    // 初始化选择描述
    this.updateSelection();
  },

  // 模拟饮品数据（实际项目中应替换为API请求）
  getMockDrinkData: function () {
    return {
      '01': {
        id: '01',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '02': {
        id: '02',
        name: '霸气柠檬茶',
        desc: '新鲜柠檬 清爽解腻',
        basePrice: 16,
        image: 'https://picsum.photos/400/200?food=lemon',
        sweetness: '甜度',
        sweetnessDesc: '可选正常糖/少糖/微糖/无糖',
        sizeOptions: [{
            value: '500ml',
            text: '中杯500ml',
            price: 0
          },
          {
            value: '650ml',
            text: '大杯650ml',
            price: 3
          }
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰沙'
          },
          {
            value: 'no_ice',
            text: '去冰'
          },
          {
            value: 'hot',
            text: '热饮'
          }
        ],
        teaOptions: [{
            value: 'green',
            text: '绿妍茶底'
          },
          {
            value: 'black',
            text: '红茶茶底'
          }
        ],
        toppingOptions: [{
            value: 'jelly',
            text: '加椰果',
            price: 2
          },
          {
            value: 'bubble',
            text: '加珍珠',
            price: 3
          }
        ]
      },
      '03': {
        id: '03',
        name: '霸气芒果',
        desc: '新鲜芒果 果肉饱满',
        basePrice: 22,
        image: 'https://picsum.photos/400/200?food=mango',
        sweetness: '甜度',
        sweetnessDesc: '可选正常糖/少糖/微糖/无糖',
        sizeOptions: [{
            value: '500ml',
            text: '中杯500ml',
            price: 0
          },
          {
            value: '650ml',
            text: '大杯650ml',
            price: 5
          }
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰沙'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        teaOptions: [{
            value: 'green',
            text: '绿妍茶底'
          },
          {
            value: 'jasmine',
            text: '茉莉茶底'
          }
        ],
        toppingOptions: [{
            value: 'mango',
            text: '加芒果果肉',
            price: 5
          },
          {
            value: 'pudding',
            text: '加布丁',
            price: 3
          }
        ]
      },
      '04': {
        id: '04',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '05': {
        id: '05',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '06': {
        id: '06',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '07': {
        id: '07',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '08': {
        id: '08',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '09': {
        id: '09',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '10': {
        id: '10',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '11': {
        id: '11',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '12': {
        id: '12',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '13': {
        id: '13',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '14': {
        id: '14',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '15': {
        id: '15',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '16': {
        id: '16',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '17': {
        id: '17',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '18': {
        id: '18',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '19': {
        id: '19',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '20': {
        id: '20',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '21': {
        id: '21',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '22': {
        id: '22',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '23': {
        id: '23',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '24': {
        id: '24',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '25': {
        id: '25',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '26': {
        id: '26',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '27': {
        id: '27',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '28': {
        id: '28',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '29': {
        id: '29',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
      '30': {
        id: '30',
        name: '奈雪畅畅小绿瓶',
        desc: '每日500蔬果瓶 轻松顺畅',
        basePrice: 19,
        image: '/static/images/aaa.jpg',
        themeOptions: [{
            value: 'xl',
            text: '限量方形杯',
            price: 0
          },
          {
            value: 'cg',
            text: '常规杯',
            price: 0
          },
        ],
        sizeOptions: [{
          value: '500ml',
          text: '中杯500ml',
          price: 0
        }, ],
        tasteOptions: [{
            value: 'mr',
            text: '默认',
            price: 0
          },
          {
            value: 'ysj',
            text: '加益生菌',
            price: 0
          },
        ],
        tempOptions: [{
            value: 'ice',
            text: '冰'
          },
          {
            value: 'no_ice',
            text: '去冰'
          }
        ],
        sweetOptions: [{
          value: 'blwjt',
          text: '不另外加糖'
        }],
      },
    };
  },

  // 选择杯型
  selectSize: function (e) {
    const size = e.currentTarget.dataset.size;
    const price = parseInt(e.currentTarget.dataset.price) || 0;
    this.setData({
      selectedSize: size,
      sizePrice: price
    });
    this.calculateTotal();
    this.updateSelection();
  },

  // 选择主题杯
  selectTheme: function (e) {
    this.setData({
      selectedtheme: e.currentTarget.dataset.theme
    });
    this.updateSelection();
  },

  // 选择温度
  selectTemp: function (e) {
    this.setData({
      selectedTemp: e.currentTarget.dataset.temp
    });
    this.updateSelection();
  },

  // 选择甜度
  selectSweet: function (e) {
    this.setData({
      selectedsweet: e.currentTarget.dataset.sweet
    });
    this.updateSelection();
  },

  // 选择口味
  selectTaste: function (e) {
    this.setData({
      selectedtaste: e.currentTarget.dataset.taste
    });
    this.updateSelection();
  },

  // 选择茶底
  selectTea: function (e) {
    this.setData({
      selectedTea: e.currentTarget.dataset.tea
    });
    this.updateSelection();
  },

  // 选择加料
  selectTopping: function (e) {
    const topping = e.currentTarget.dataset.topping;
    const price = parseInt(e.currentTarget.dataset.price) || 0;

    // 如果当前已选该加料，则取消选择；否则选择该加料
    const isSelected = this.data.selectedTopping === topping;
    this.setData({
      selectedTopping: isSelected ? null : topping,
      toppingPrice: isSelected ? 0 : price
    });

    this.calculateTotal();
    this.updateSelection();
  },

  calculateTotal: function () {
    const total = (this.data.basePrice || 0) +
      (this.data.sizePrice || 0) +
      (this.data.toppingPrice || 0);
    this.setData({
      totalPrice: total
    });
  },

  // 更新选择描述
  updateSelection: function () {
    let selection = '';

    // 添加温度（如果有配置）
    if (this.data.drinkInfo.tempOptions && this.data.drinkInfo.tempOptions.length > 0) {
      const tempOption = this.data.drinkInfo.tempOptions.find(
        option => option.value === this.data.selectedTemp
      );
      if (tempOption) {
        selection += `${tempOption.text}/`;
      }
    }

    // 添加甜度（如果有配置）
    if (this.data.drinkInfo.sweetOptions && this.data.drinkInfo.sweetOptions.length > 0) {
      const sweetOption = this.data.drinkInfo.sweetOptions.find(
        option => option.value === this.data.selectedsweet
      );
      if (sweetOption) {
        selection += `${sweetOption.text}/`;
      }
    }

    // 添加甜度信息（如果有）
    if (this.data.drinkInfo.sweetness) {
      selection += `${this.data.drinkInfo.sweetness}/`;
    }

    // 添加茶底（仅当选择的不是"去茶底"时）
    if (this.data.drinkInfo.teaOptions && this.data.drinkInfo.teaOptions.length > 0) {
      const teaOption = this.data.drinkInfo.teaOptions.find(
        option => option.value === this.data.selectedTea
      );
      // 仅当选择的茶底存在且不是"去茶底"时添加
      if (teaOption && teaOption.value !== 'no_tea') {
        selection += `${teaOption.text}/`;
      }
    }

    // 添加杯型（如果有配置）
    if (this.data.drinkInfo.sizeOptions && this.data.drinkInfo.sizeOptions.length > 0) {
      const sizeOption = this.data.drinkInfo.sizeOptions.find(
        option => option.value === this.data.selectedSize
      );
      if (sizeOption) {
        selection += `${sizeOption.text}/`;
      }
    }

    // 添加主题杯（如果有配置）
    if (this.data.drinkInfo.themeOptions && this.data.drinkInfo.themeOptions.length > 0) {
      const themeOption = this.data.drinkInfo.themeOptions.find(
        option => option.value === this.data.selectedtheme
      );
      if (themeOption) {
        selection += `${themeOption.text}/`;
      }
    }

    // 添加口味（如果有配置）
    if (this.data.drinkInfo.tasteOptions && this.data.drinkInfo.tasteOptions.length > 0) {
      const tasteOption = this.data.drinkInfo.tasteOptions.find(
        option => option.value === this.data.selectedtaste
      );
      if (tasteOption) {
        selection += `${tasteOption.text}/`;
      }
    }

    // 添加加料（如果有选择）
    if (this.data.selectedTopping && this.data.drinkInfo.toppingOptions) {
      const toppingOption = this.data.drinkInfo.toppingOptions.find(
        option => option.value === this.data.selectedTopping
      );
      if (toppingOption) {
        selection += `加${toppingOption.text}/`;
      }
    }

    // 移除末尾的斜杠（如果有）
    if (selection.endsWith('/')) {
      selection = selection.slice(0, -1);
    }

    this.setData({
      currentSelection: selection
    });
  },

  // 减少商品数量（直接修改购物车）
  decreaseQuantity() {
    const cartItems = wx.getStorageSync('shoppingCart') || [];
    const selectionHash = this.generateSelectionHash();

    // 查找购物车中的商品
    const index = cartItems.findIndex(
      item => item.id === this.data.drinkId && item.selectionHash === selectionHash
    );

    if (index === -1) return; // 商品不存在，不处理

    if (cartItems[index].quantity > this.data.minQuantity) {
      // 减少数量并更新总价
      cartItems[index].quantity -= 1;
      cartItems[index].totalPrice = cartItems[index].price * cartItems[index].quantity;

      wx.setStorageSync('shoppingCart', cartItems);
      this.setData({
        quantity: cartItems[index].quantity
      });
    } else {
      // 数量为1时，移除商品
      this.removeFromCart();
    }
  },

  // 增加商品数量（直接修改购物车）
  increaseQuantity() {
    const cartItems = wx.getStorageSync('shoppingCart') || [];
    const selectionHash = this.generateSelectionHash();

    // 查找购物车中的商品
    const index = cartItems.findIndex(
      item => item.id === this.data.drinkId && item.selectionHash === selectionHash
    );

    if (index === -1) {
      // 商品不存在，添加到购物车
      this.addToCart();
    } else if (cartItems[index].quantity < this.data.maxQuantity) {
      // 增加数量并更新总价
      cartItems[index].quantity += 1;
      cartItems[index].totalPrice = cartItems[index].price * cartItems[index].quantity;

      wx.setStorageSync('shoppingCart', cartItems);
      this.setData({
        quantity: cartItems[index].quantity
      });
    } else {
      wx.showToast({
        title: `最多只能选择${this.data.maxQuantity}件`,
        icon: 'none'
      });
    }
  },


  addToCart() {
    // 确保价格计算正确
    this.calculateTotal();
    
    const cartItems = wx.getStorageSync('shoppingCart') || [];
    const selectionHash = this.generateSelectionHash();

    // 准备商品数据
    const cartItem = {
      id: this.data.drinkId,
      name: this.data.drinkInfo.name,
      image: this.data.drinkInfo.image,
      selection: this.data.currentSelection,
      selectionHash: selectionHash,
      price: this.data.totalPrice,
      quantity: this.data.quantity,
      totalPrice: this.data.totalPrice * this.data.quantity
    };

    // 查找相同配置的商品
    const index = cartItems.findIndex(
      item => item.id === cartItem.id && item.selectionHash === cartItem.selectionHash
    );

    if (index !== -1) {
      // 已存在，更新数量和总价
      cartItems[index].quantity += cartItem.quantity;
      cartItems[index].totalPrice = cartItems[index].price * cartItems[index].quantity;
    } else {
      // 不存在，添加新商品
      cartItems.push(cartItem);
    }

    wx.setStorageSync('shoppingCart', cartItems);
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
    
    // 延迟跳转到购物车页面
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/trolley/trolley',
      })
    }, 1000);
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  }

});