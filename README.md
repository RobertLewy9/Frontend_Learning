# Studying Notions (front-end-practice)



## 目录结构

```
front-end-practice/
├── assets/   静态资源（图片、视频）
├── css/      样式文件
├── html/     练习页面，按学习顺序编号
└── js/       脚本文件
```

## 命名规范

| 类型 | 规范 | 示例 |
| --- | --- | --- |
| 目录 | 全小写 | `assets/` `css/` `html/` `js/` |
| 页面 | `NN.主题.html`，两位序号按学习顺序递增 | `06.css选择器.html` |
| 脚本（页面依赖） | `NN.知识点.js`，序号与所属页面一致 | `16.表格增删改查-DOM.js` |
| 脚本（独立笔记） | `知识点.js`，不带序号 | `核心概念-作用域-闭包-原型链.js` |
| 样式 | 全小写 | `style.css` |

新增练习时，请沿用 `NN.主题.html` 的编号方式接着往后排，保证目录始终按学习顺序排列。

## 页面索引

| 序号 | 文件 | 内容 | 依赖 |
| --- | --- | --- | --- |
| 01 | `html/01.常见文本标签.html` | 标题、段落、列表、表格标签 | — |
| 02 | `html/02.HTML属性.html` | `a` / `img` 标签及属性 | `assets/aminos.png` `assets/dej.jpg` |
| 03 | `html/03.HTML区块.html` | `div` 与 `span` 区块元素 | — |
| 04 | `html/04.HTML表单.html` | `form` 各类表单控件 | — |
| 05 | `html/05.css导入方式.html` | CSS 的三种引入方式 | `css/style.css` |
| 06 | `html/06.css选择器.html` | 基础选择器、伪类、伪元素 | — |
| 07 | `html/07.css常用属性.html` | `display`、`font` 等常用属性 | `assets/aminos.png` |
| 08 | `html/08.css盒子属性.html` | 盒模型：border / padding / margin | — |
| 09 | `html/09.css浮动.html` | `float` 浮动与清除浮动 | — |
| 10 | `html/10.css定位.html` | relative / absolute / fixed 定位 | — |
| 11 | `html/11.js导入方式.html` | `script` 的三种引入方式 | `js/11.JS引入方式-外部脚本.js` |
| 12 | `html/12.js基本语法.html` | 变量声明与循环 | — |
| 13 | `html/13.js函数.html` | 函数定义与返回值 | — |
| 14 | `html/14.js事件.html` | click / focus / blur 事件 | — |
| 15 | `html/15.dom.html` | DOM 查找元素与修改内容 | — |
| 16 | `html/16.表格增删改查.html` | 表格行的新增 / 编辑 / 删除 | `js/16.表格增删改查-DOM.js` |
| 17 | `html/17.移动端布局.html` | rem 屏幕适配 | — |
| 18 | `html/18.flex弹性布局.html` | flex 弹性布局 | — |
| 19 | `html/19.父相子绝.html` | 父相对 + 子绝对的角标定位 | `assets/dej.jpg` |
| 20 | `html/20.几个属性的区别.html` | hidden/collapse、inline 对比、Flex 对比 Grid | — |
| 21 | `html/21.Script的async.html` | `async` 异步加载，不阻塞渲染 | `js/21.async异步加载-模拟第三方脚本.js` |
| 22 | `html/22.Script的defer.html` | `defer` 延迟并按顺序执行 | `js/22.defer-1-定义函数.js` `js/22.defer-2-调用函数.js` |
| 23 | `html/23.复制粘贴.html` | Clipboard API / execCommand / 图片复制 | `js/23.剪贴板-三种复制方案.js` |
| 24 | `html/24.拖拽方块演示.html` | 鼠标拖拽（内联脚本） | — |

## 脚本索引

带序号的脚本是被页面 `<script src>` 引用的；不带序号的是独立笔记，直接在浏览器控制台里运行。

| 文件 | 知识点 | 被引用 |
| --- | --- | --- |
| `js/11.JS引入方式-外部脚本.js` | 用 `script` 标签引入外部 JS 文件 | `html/11.js导入方式.html` |
| `js/16.表格增删改查-DOM.js` | DOM 操作表格：新增 / 编辑 / 删除行 | `html/16.表格增删改查.html` |
| `js/21.async异步加载-模拟第三方脚本.js` | `async` 异步加载，不阻塞页面渲染 | `html/21.Script的async.html` |
| `js/22.defer-1-定义函数.js` | `defer` 按书写顺序执行（第 1 个） | `html/22.Script的defer.html` |
| `js/22.defer-2-调用函数.js` | `defer` 按书写顺序执行（第 2 个，调用前一个文件里的函数） | `html/22.Script的defer.html` |
| `js/23.剪贴板-三种复制方案.js` | Clipboard API / execCommand / 图片 Blob 复制 | `html/23.复制粘贴.html` |
| `js/核心概念-作用域-闭包-原型链.js` | 作用域、闭包、原型链、async/await、事件循环 | 独立笔记 |
| `js/异步练习-缓存-发布订阅-事件循环-节流.js` | 异步缓存、EventEmitter 发布订阅、事件循环输出顺序、节流 | 独立笔记 |
| `js/Promise练习-封装fetch请求.js` | Promise、async/await、用 Promise 封装 fetch | 独立笔记 |

## 整理说明

1. 根目录散落的媒体文件统一收进 `assets/`。
2. 目录 `HTML/` 改为小写 `html/`，与 `css/`、`js/` 保持一致。
3. 未编号的 6 个页面补上 `19`-`24` 编号；其余页面序号补零为两位，使排序在任何环境下都正确。
4. 页面序号与资源引用路径同步修正。
5. JS 文件按知识点命名：页面依赖的带上页面序号（`NN.知识点.js`），独立笔记不带序号（`知识点.js`），并同步更新了 5 个页面中的 `<script src>`。

## 待处理

- `js/Promise练习-封装fetch请求.js` 里 `getData` 被声明了两次，后一个会覆盖前一个，导致开头那段 `Promise.resolve('hello')` 的示例成了死代码；另外 `fetch("/api/user")` 需要后端才能跑通。建议删掉重复声明或补一个 mock。
- `js/11.JS引入方式-外部脚本.js` 只定义了 `hello()` 但没有调用，页面控制台不会看到它的输出，可考虑在文件末尾加一行 `hello();`。
- `assets/video.mp4` 没有被任何页面引用，可考虑删除或补一个 `<video>` 练习页。
- `html/02.HTML属性.html` 中的 `amino.png`、`de.jpg` 是有意为之的“图片加载失败”示例，请勿补文件。
- `html/16.表格增删改查.html` 第 5 行 `viewport` 的 `meta` 标签后残留了一个 `-->`，建议删除。
