// 获取系统信息
const systemInfo = wx.getWindowInfo()

// 获取胶囊按钮位置信息
const menuButtonInfo = wx.getMenuButtonBoundingClientRect()

// 计算导航栏总高度（状态栏 + 导航栏）
const navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height

module.exports = {
  statusBarHeight: systemInfo.statusBarHeight, // 状态栏高度
  menuButtonHeight: menuButtonInfo.height, // 胶囊按钮高度
  menuButtonTop: menuButtonInfo.top, // 胶囊按钮上边距
  navBarHeight // 整个导航栏高度
}