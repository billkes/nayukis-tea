/**
 * 订单编号生成工具
 * 用于生成规范格式的订单编号
 */

/**
 * 生成订单编号
 * 格式：NS + 年月日 + 6位随机数
 * 示例：NS20250625123456
 * @returns {string} 订单编号
 */
const generateOrderId = () => {
  // 获取当前日期
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  // 生成6位随机数
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  // 组合成订单编号
  return `NS${year}${month}${day}${randomNum}`;
};

/**
 * 从订单编号中提取日期信息
 * @param {string} orderId - 订单编号
 * @returns {Object|null} 包含年月日信息的对象
 */
const extractDateFromOrderId = (orderId) => {
  if (!orderId || typeof orderId !== 'string' || orderId.length < 10) {
    return null;
  }
  
  // 去掉前缀 "NS"
  const dateStr = orderId.substring(2, 10);
  
  if (dateStr.length !== 8) {
    return null;
  }
  
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6));
  const day = parseInt(dateStr.substring(6, 8));
  
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }
  
  return {
    year,
    month,
    day,
    formatted: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  };
};

/**
 * 验证订单编号格式
 * @param {string} orderId - 订单编号
 * @returns {boolean} 是否为有效格式
 */
const validateOrderId = (orderId) => {
  if (!orderId || typeof orderId !== 'string') {
    return false;
  }
  
  // 正则表达式匹配：NS + 8位日期 + 6位数字
  const regex = /^NS\d{8}\d{6}$/;
  return regex.test(orderId);
};

module.exports = {
  generateOrderId,
  extractDateFromOrderId,
  validateOrderId
};