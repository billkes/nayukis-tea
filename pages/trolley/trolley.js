Page({
  data: {
    dineInSelected: true, // 默认选中店内堂食
    takeAwaySelected: false,
    selectedPickupTimeIndex: 0, // 取餐时间默认选中索引
    pickupTimeOptions: ['立即取餐', '18:00~20:00', '20:00~22:00'], // 取餐时间选项
    orderData: {
      orderId: "order" + Date.now(),
      amount: 0.01,
      description: "订单order" + Date.now() +"支付",
      openid: "oLdZf7Hckxk3Udup67UOZRmcl8WA",
      products: [
        {
          id: "01",
          name: "滇西树番茄双抗小红瓶",
          aa1:"每日500蔬果瓶",
          aa2:"维C快充",
          text:"云南山野|提亮之酸",
          price: 19,
          image: "/static/images/zxs.jpg",
          quantity: 1
        },
        {
          id: "02",
          name: "奈雪瘦瘦小绿瓶",
          aa1:"每日500蔬果瓶",
          aa2:"瘦瘦轻盈",
          text:"膳食纤维 | 超级食材羽衣&橙",
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
    cartItems: [],
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,
    pickupTime: '立即取餐',
    dineInOrTakeAway: 'dineIn',
    cupMessage: '',
    cartItems: [
      {
        id: '01',
        name: '奈雪畅畅小绿瓶',
        image: '/static/images/aaa.jpg',
        selection: '冰/不另外加糖/中杯500ml/限量方形杯/默认',
        quantity: 1,
        totalPrice: 19
      }
    ],
    recommendedProducts: [
      {
        id: '02',
        name: '松松咸蛋黄嘟嘟',
        image: '/static/images/bbb.jpg',
        originalPrice: 13.8,
        currentPrice: 13
      },
      {
        id: '03',
        name: '南瓜嘟嘟',
        image: '/static/images/ccc.jpg',
        originalPrice: 13.8,
        currentPrice: 13
      },
      {
        id: '04',
        name: '256层焦糖蛋挞',
        image: '/static/images/ddd.jpg',
        originalPrice: 10,
        currentPrice: 9
      }
    ]
  },
  handleRecommendedProductChange(e) {
    const selectedId = e.detail.value;
    console.log('选中的精选搭配商品id:', selectedId);
    // 这里可添加进一步逻辑，如计算总价时考虑选中的搭配商品等
  },
  handlePickupTimeChange(e) {
    const selectedIndex = e.detail.value;
    this.setData({
      selectedPickupTimeIndex: selectedIndex
    });
  },
  handleDineTakeawayChange(e) {
    const value = e.detail.value;
    if (value === 'dineIn') {
      this.setData({
        dineInSelected: true,
        takeAwaySelected: false
      });
    } else {
      this.setData({
        dineInSelected: false,
        takeAwaySelected: true
      });
    }
  },
  handleTimePickerChange(e) {
    const selectedIndex = e.detail.value;
    this.setData({
      selectedTimeIndex: selectedIndex
    });
    // 这里可以添加进一步的逻辑，比如将选择的时间保存到订单数据中
  },
  goToCustomizeMessage() {
    // 跳转到杯贴留言定制页面
    wx.navigateTo({
      url: '/pages/cup-message-customize/cup-message-customize'
    });
  },
  goToRecharge() {
    // 跳转到储值页面
    wx.navigateTo({
      url: '/pages/recharge/recharge'
    });
  },
  goToPayment() {
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/payment/payment'
    });
  },
  onShow() {
    const cartItems = wx.getStorageSync('shoppingCart') || [];
    this.setData({ cartItems });
  },
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
  loadCartItems() {
    const cartItems = wx.getStorageSync('shoppingCart') || [];
    
    // 计算总价
    const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
    this.setData({
      cartItems,
      totalPrice
    });
  },

  // 计算总价和优惠
  calculateTotal(cartItems) {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const discount = totalPrice >= 30 ? 5 : 0; // 示例优惠规则
    const finalPrice = totalPrice - discount;

    this.setData({
      cartItems,
      totalPrice,
      discount,
      finalPrice
    });
  },

  // 减少商品数量
  decreaseQuantity(e) {
    const index = e.currentTarget.dataset.index;
    let cartItems = [...this.data.cartItems];
    
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
      cartItems[index].totalPrice = cartItems[index].price * cartItems[index].quantity;
      wx.setStorageSync('shoppingCart', cartItems);
      this.calculateTotal(cartItems);
    } else {
      // 数量为1时，直接删除商品
      this.removeItem(index);
    }
  },

  // 增加商品数量
  increaseQuantity(e) {
    const index = e.currentTarget.dataset.index;
    let cartItems = [...this.data.cartItems];
    
    cartItems[index].quantity += 1;
    cartItems[index].totalPrice = cartItems[index].price * cartItems[index].quantity;
    wx.setStorageSync('shoppingCart', cartItems);
    this.calculateTotal(cartItems);
  },

  // 删除商品
  removeItem(index) {
    let cartItems = [...this.data.cartItems];
    cartItems.splice(index, 1);
    wx.setStorageSync('shoppingCart', cartItems);
    this.calculateTotal(cartItems);
  }
});