# 奈雪的茶小程序项目概览 (IFLOW上下文)

## 项目概述

这是一个仿制“奈雪的茶”微信小程序的项目，旨在作为大作业完成。该项目使用原生微信小程序框架开发，并集成了 TDesign 组件库。项目严格遵守以下限制：

1.  不使用内联 `style` 属性。
2.  不编写自定义样式，所有样式均来自 `/style/tailwind.wxss` 文件。
3.  不使用额外的 UI 组件库，仅使用 `tdesign-miniprogram`。

项目结构清晰，包含页面、组件、静态资源和工具函数。

## 核心技术

*   **微信小程序原生框架**: 使用 `.wxml`, `.wxss`, `.js`, `.json` 文件构建页面和组件。
*   **TDesign**: 用于部分 UI 组件 (版本 ^1.8.6)。
*   **Tailwind CSS (定制)**: 所有自定义样式均通过 `/style/tailwind.wxss` 提供，该文件包含了大量预定义的类（如 `text-primary`, `bg-success`, `w-full`, `h-screen`, `flex`, `justify-center` 等），模拟 Tailwind CSS 的使用方式。
*   **Node.js**: 项目依赖通过 `package.json` 管理 (npm 版本 9.6.7, node 版本 18.17.0)。

## 项目结构

*   `app.json`: 小程序全局配置，定义了页面路径、窗口表现、tabBar 等。
*   `app.js`: 小程序逻辑入口文件。
*   `app.wxss`: 全局样式文件。
*   `pages/`: 存放所有页面，每个页面为一个文件夹，包含 `.js`, `.wxml`, `.wxss`, `.json` 四个文件。
    *   `index/`: 首页，包含轮播图和主要功能入口。
    *   `order/`: 点餐页面。
    *   `ofg/`: 订单页面。
    *   `mine/`: 我的页面。
    *   `secondPages/`: 二级页面，包含各种详情页和功能页。
*   `components/`: 存放所有自定义组件，例如 `Card`, `activeCard`, `product` 等。
*   `static/`: 存放静态资源，如图片 (`images/`, `swipers/`), 图标 (`icons/`), 字体 (`fonts/`)。
*   `style/`: 存放全局样式文件 `tailwind.wxss`。
*   `utils/`: 存放工具函数，如网络请求、配置、用户信息处理等。
*   `miniprogram_npm/`: 存放通过 npm 安装的第三方包，如 `tdesign-miniprogram`。

## 关键文件分析

*   **`README.MD`**: 明确了项目为大作业，以及开发限制。
*   **`package.json`**: 定义了项目依赖 `tdesign-miniprogram`。
*   **`app.json`**: 定义了小程序的页面路由和 tabBar。首页为 `pages/index/index`，Tab 包含首页、点餐、订单、我的。
*   **`style/tailwind.wxss`**: 项目自定义样式的唯一来源，提供了一套类似 Tailwind 的工具类。
*   **`pages/index/index`**: 小程序首页，主要由一个全屏轮播图 (`swiper`) 和一个 `Card` 组件构成。
*   **`components/Card/Card`**: 首页核心组件，展示了用户信息入口、奈雪券入口、自取/外卖入口以及多个功能快捷入口（如储值有礼、加入会员群、成为合伙人等）。

## 开发与运行

1.  **环境要求**:
    *   Node.js 版本 18.17.0
    *   npm 版本 9.6.7
    *   微信开发者工具
2.  **安装依赖**: 在项目根目录下运行 `npm install`。
3.  **运行项目**: 在微信开发者工具中打开项目目录即可预览。
4.  **构建项目**: 使用微信开发者工具进行构建和上传。

## 开发规范

*   **样式**: 严格遵守不使用内联 `style` 和不编写自定义样式的规则，统一使用 `/style/tailwind.wxss` 中的类。
*   **组件**: 优先使用 `tdesign-miniprogram` 组件，自定义组件存放于 `components/` 目录。
*   **页面**: 页面逻辑写在对应 `.js` 文件中，结构写在 `.wxml` 中，样式引用 `tailwind.wxss`。