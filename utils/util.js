const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const getNewId = () => {
  // 获取当前时间戳
  const timestamp = Date.now();
  // 生成一个随机数，范围为 1000 到 9999
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  // 将时间戳和随机数组合起来，形成一个唯一的 ID
  const newId = `${timestamp}${randomNum}`;
  return newId;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  getNewId
}