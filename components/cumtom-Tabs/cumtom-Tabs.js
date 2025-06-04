// components/cumtom-Tabs/cumtom-Tabs.js

const {
  refundOrder
} = require('../../utils/order')
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    arrayList: {
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusDict: {
      REFUND: '退款成功',
      NOTPAY: '未支付',
      SUCCESS: '支付成功',
    },
    subTabs: [{
        label: '全部',
        value: 'all'
      },
      {
        label: '自取',
        value: 'pickup'
      },
      {
        label: '外卖',
        value: 'delivery'
      },
    ],
    currentSubTab: 'all', // 默认选中的子选项卡
    barStyle: `
    --td-tab-item-active-color:#000000;
    `,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTK(e) {
      console.log('开始退款', this.data.arrayList, e.currentTarget.dataset.order);
      const id = e.currentTarget.dataset.order
      const item = this.data.arrayList.orders.find(o => o.id === id)
      console.log(item);
      const orderId = item.orderId
      const amount = item.amount
      const openid = wx.getStorageSync('openid')
      const token = wx.getStorageSync('token')
      if (!openid || !token) {
        wx.showToast({
          title: '请先登陆',
          icon: 'error'
        })
        return
      }
      refundOrder(orderId, amount, openid, token).then(res => {
        // console.log(res.success);
        if (res.success) {
          wx.showToast({
            title: '退款成功',
            success: () => {
              this.triggerEvent('fetchUserOrders')
            }
          })
        } else {
          wx.showToast({
            title: '退款失败',
            icon: 'error'
          })
        }
      })
    },
    onSubTabClick(e) {
      const value = e.currentTarget.dataset.value;
      this.setData({
        currentSubTab: value
      });
    }
  },
})