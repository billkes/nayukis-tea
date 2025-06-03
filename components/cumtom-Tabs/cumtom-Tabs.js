// components/cumtom-Tabs/cumtom-Tabs.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    arrayList: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
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
    onSubTabClick(e) {
      const value = e.currentTarget.dataset.value;
      this.setData({
        currentSubTab: value
      });
    }
  },
})