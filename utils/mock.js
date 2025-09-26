/**
 * 商品数据映射表
 * 用于确保订单页展示的商品名、价格、图片与点餐页所选一致
 */

const productMapping = {
  // 每日蔬果瓶系列
  '01': {
    id: '01',
    name: '奈雪畅畅小绿瓶',
    aa1: '每日500蔬果瓶',
    aa2: '轻松顺畅',
    text: '潮汕油柑 | 香蜜杨桃 | 羽衣甘蓝',
    price: 19,
    image: '/static/images/a.jpg',
    type1: '限量方形杯',
    type2: '常规杯'
  },
  '02': {
    id: '02',
    name: '奈雪瘦瘦小绿瓶',
    aa1: '每日500蔬果瓶',
    aa2: '瘦瘦轻盈',
    text: '膳食纤维 | 超级食材羽衣&橙',
    price: 19,
    image: '/static/images/qwe.jpg'
  },
  '03': {
    id: '03',
    name: '滇西树番茄双抗小红瓶',
    aa1: '每日500蔬果瓶',
    aa2: '维C快充',
    text: '云南山野 | 提亮之酸',
    price: 19,
    image: '/static/images/y.jpg'
  },
  
  // 山野宝藏茶系列
  '04': {
    id: '04',
    name: '茉莉初雪奶茶',
    aa1: '招牌奶茶',
    aa2: '金奖茶茉莉初雪',
    text: '0奶精 | 0香精 | 鲜果八窨',
    price: 16,
    image: '/static/images/d.jpg'
  },
  '05': {
    id: '05',
    name: '金色山脉珍珠奶茶',
    aa1: '滇红蜜香',
    aa2: '手熬黑糖珍珠',
    text: '古树金芽|红茶雅韵',
    price: 16,
    image: '/static/images/e.jpg'
  },
  
  // 热饮推荐系列
  '06': {
    id: '06',
    name: '森林观音',
    aa1: '花香环绕',
    aa2: '一口奔赴自然',
    text: '花香环绕 | 回甘悠长',
    price: 9,
    image: '/static/images/f.jpg'
  },
  '07': {
    id: '07',
    name: '奈雪茉莉初雪',
    aa1: '白毫绿茶',
    aa2: '五星金茶奖',
    text: '0香精鲜花八窨',
    price: 11,
    image: '/static/images/g.jpg'
  },
  
  // 霸气鲜果茶系列
  '08': {
    id: '08',
    name: '霸气芝士葡萄',
    aa1: '葡萄肉多多',
    text: '清爽葡萄|清盈芝士',
    price: 19,
    image: '/static/images/b.jpg'
  },
  '09': {
    id: '09',
    name: '霸气橙子',
    aa1: '奈雪首创',
    aa2: '金奖茶茉莉初雪',
    text: '奈雪首款招牌鲜果茶',
    price: 19,
    image: '/static/images/c.jpg'
  },
  
  // 限定联名系列
  '10': {
    id: '10',
    name: '小王子心意守护杯',
    aa1: '395ml',
    aa2: '不锈钢杯',
    text: '松弛女孩, 快乐喝水',
    price: 40.8,
    image: '/static/images/w.jpg'
  },
  '11': {
    id: '11',
    name: 'Green系列双杯套餐',
    aa1: '限定周边',
    aa2: '桌面软绒绿意',
    text: '奈雪green系列饮品',
    price: 39,
    image: '/static/images/v.jpg'
  },
  
  // 软欧面包系列
  '12': {
    id: '12',
    name: '蛋黄芋泥双料包',
    aa1: '禾木灰腌制咸鸭蛋',
    text: '咸蛋黄&芋泥,香甜又软糯',
    price: 10.8,
    image: '/static/images/h.jpg'
  },
  '13': {
    id: '13',
    name: '海苔松松卷',
    aa1: '手工卷制',
    aa2: '饱满松松',
    text: '奶香浓郁,咸甜交织',
    price: 9.8,
    image: '/static/images/i.jpg'
  },
  '14': {
    id: '14',
    name: '肠仔包',
    aa1: '动物黄油',
    aa2: '爆汁肉肠',
    text: '真肉肠.不添加淀粉',
    price: 12.8,
    image: '/static/images/j.jpg'
  },
  
  // 蛋糕甜点系列
  '15': {
    id: '15',
    name: '巧克力甜甜圈',
    aa1: '纯可可脂巧克力',
    text: '53%黑巧克力+草莓巧克力',
    price: 9.8,
    image: '/static/images/k.jpg'
  },
  '16': {
    id: '16',
    name: '奥利奥布蕾小贝(单个)',
    aa1: '超浓可可',
    text: '布蕾夹心,入口即化',
    price: 8.8,
    image: '/static/images/l.jpg'
  },
  
  // 零食/茶叶系列
  '17': {
    id: '17',
    name: '芝士酥条',
    text: '芝香酥脆,咬一口嘎嘣脆',
    price: 12,
    image: '/static/images/m.jpg'
  },
  '18': {
    id: '18',
    name: '蛋仔饼',
    aa1: '新西兰动物黄油',
    text: '儿时熟悉的那口酥脆蛋香饼',
    price: 12,
    image: '/static/images/n.jpg'
  },
  '19': {
    id: '19',
    name: '茉莉初雪(花茶袋泡茶)',
    text: '新鲜茉莉花香 | 传统窨制工艺',
    price: 19.9,
    image: '/static/images/p.jpg'
  },
  '20': {
    id: '20',
    name: '鸭屎香单丛(袋泡茶）',
    text: '花香野韵 | 久泡依然甘香',
    price: 19.9,
    image: '/static/images/o.jpg'
  },
  
  // 打包袋系列
  '21': {
    id: '21',
    name: '大保温袋',
    text: '可用于4杯饮品打包使用',
    price: 4,
    image: '/static/images/q.jpg'
  },
  '22': {
    id: '22',
    name: '小保温袋',
    text: '可用于2杯饮品打包使用',
    price: 2,
    image: '/static/images/r.jpg'
  },
  
  // 加料专区
  '23': {
    id: '23',
    name: '芝士(分装)',
    text: '特制芝士 | 奶香十足',
    price: 5,
    image: '/static/images/s.jpg'
  },
  '24': {
    id: '24',
    name: '西米(分装)',
    text: '弹滑软糯',
    price: 3,
    image: '/static/images/t.jpg'
  }
};

/**
 * 根据商品ID获取商品信息
 * @param {string} productId - 商品ID
 * @returns {Object|null} 商品信息对象
 */
const getProductById = (productId) => {
  return productMapping[productId] || null;
};

/**
 * 根据商品ID数组获取商品信息数组
 * @param {Array} productIds - 商品ID数组
 * @returns {Array} 商品信息数组
 */
const getProductsByIds = (productIds) => {
  return productIds.map(id => getProductById(id)).filter(product => product !== null);
};

/**
 * 处理订单商品数据，确保与商品映射表一致
 * @param {Array} orderProducts - 订单中的商品数组
 * @returns {Array} 处理后的商品数组
 */
const processOrderProducts = (orderProducts) => {
  if (!Array.isArray(orderProducts)) {
    return [];
  }
  
  return orderProducts.map(orderProduct => {
    const mappedProduct = getProductById(orderProduct.id);
    if (mappedProduct) {
      // 使用映射表的数据，但保留订单中的数量和其他订单特定信息
      return {
        ...mappedProduct,
        quantity: orderProduct.quantity || 1,
        // 保留订单中可能存在的其他字段
        ...orderProduct
      };
    }
    // 如果没有找到映射，使用原始数据
    return orderProduct;
  });
};

module.exports = {
  productMapping,
  getProductById,
  getProductsByIds,
  processOrderProducts
};