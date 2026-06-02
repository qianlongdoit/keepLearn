
### js
Promise((res, rej) => res(2)).then(res => 2).then((res2) => res2?)

---


### 浏览器


---

### 工程化


---

### 框架通用

* MVC / MVP / MVVM
* 组件化理解
* 单向数据流
* 响应式原理
* 虚拟DOM
* diff 算法
* key 的作用
* 状态管理思想
* 父子组件通信
* 兄弟组件通信
* 跨层级通信
* 插槽 / children
* 受控组件和非受控组件
* SSR / CSR / SSG 区别
* hydration 是什么
* 为什么需要服务端渲染
* 首屏优化方案
* 权限路由
* 动态路由
* keep-alive / 缓存组件
* 表单方案
* 错误边界
* hooks / 组合式函数设计思想
* 高阶组件、render props、hooks 演进

---

### React


---

### Vue

* Vue2 和 Vue3 区别
* 响应式原理 defineProperty / Proxy
* computed 和 watch 区别
* watch 和 watchEffect 区别
* ref 和 reactive 区别
* nextTick
* v-if 和 v-show 区别
* v-model 原理
* key 在 Vue 中的作用
* 生命周期
* 组件通信
* 插槽
* keep-alive
* 路由守卫
* Vue-router 原理
* pinia / vuex 区别
* diff 算法
* 为什么数组修改有时不更新（Vue2）
* Composition API 优势
* setup 执行时机
* defineProps / defineEmits / defineExpose

---

### 性能优化

* 首屏优化
* 白屏时间
* 资源压缩
* 图片优化
* 雪碧图 / base64 / 字体图标
* 懒加载
* 路由懒加载
* 组件懒加载
* 防抖节流
* 减少回流重绘
* 减少大对象、大列表渲染
* 虚拟列表
* 长任务拆分
* CDN
* 浏览器缓存
* SSR优化
* 骨架屏
* 预加载 preload / prefetch
* tree shaking
* gzip / brotli
* 服务端压缩
* 代码分包策略
* React / Vue 中如何做性能分析
* 性能监控埋点

---

### 安全

* XSS
* CSRF
* 点击劫持
* SQL注入（了解即可，偏后端）
* token泄露风险
* 敏感信息存储位置
* CSP
* sameSite cookie
* HTTPS 中间人攻击
* 前端如何做输入校验
* 文件上传安全问题

---

### 数据结构与算法（面试常考基础）

* 数组
* 链表
* 栈
* 队列
* 哈希表
* 树
* 二叉树遍历
* 深度优先、广度优先
* 排序：冒泡 / 选择 / 插入 / 快排
* 二分查找
* 去重
* 扁平化
* 最长公共前缀
* 括号匹配
* LRU 思想
* 时间复杂度、空间复杂度

---

### 业务场景题

* 大文件上传怎么做
* 页面白屏怎么排查
* 页面卡顿怎么排查
* 如何设计一个通用请求库
* 如何封装组件库
* 如何做权限控制
* 如何做埋点系统
* 如何做错误监控
* 如何做性能监控
* 如何实现一个拖拽
* 如何实现无限滚动
* 如何实现虚拟列表
* 如何做登录态续期
* 如何保证接口幂等
* 如何处理重复请求
* 如何取消请求
* 如何做表单校验
* 如何设计主题切换
* 如何实现国际化
* 如何做多端适配
* 如何做可访问性优化

---

### 手写题

* 手写防抖
* 手写节流
* 手写深拷贝
* 手写 Promise.all
* 手写 Promise.race
* 手写 call / apply / bind
* 手写 new
* 手写 instanceof
* 手写 Object.create
* 手写发布订阅
* 手写事件总线
* 手写数组扁平化
* 手写去重
* 手写柯里化
* 手写 compose
* 手写 sleep
* 手写并发控制
* 手写简易路由
* 手写 lazyMan
* 手写模板字符串替换

---

### 你这份清单里，最明显遗漏的点

你原来的内容里，比较缺这几块：

1. **HTML / DOM / 事件机制**
   很多前端面试不会只问 JS 和 CSS，DOM、事件流、事件委托非常高频。

2. **网络基础没有展开**
   你只写了 https 缓存，但实际高频是：
   强缓存/协商缓存、跨域、HTTP1/2/3、TCP、输入URL全过程。

3. **框架题几乎没有**
   如果你投的是中级以上前端，React/Vue 基本一定会问。

4. **工程化可以更系统**
   不只是 webpack 和 vite，对应还会问：
   loader/plugin、tree-shaking、code split、babel、HMR。

5. **性能和安全要单独成块**
   这是面试官特别喜欢从业务角度追问的部分。

6. **手写题和场景题最好独立整理**
   因为真实面试里，这两类经常直接决定表现。

---

### 更适合背诵的“高频优先版”

如果你最近就在密集面试，建议优先刷这 30 个：

* 事件循环
* Promise 相关方法
* 闭包
* this 指向
* 原型链
* 深浅拷贝
* 防抖节流
* call apply bind
* new 做了什么
* instanceof 原理
* 事件委托
* 宏任务微任务
* 浏览器渲染流程
* 回流重绘
* 输入 URL 到页面展示
* 强缓存协商缓存
* 跨域
* XSS / CSRF
* flex 布局
* BFC
* 居中方案
* Vue/React 响应式原理
* diff 算法
* key 的作用
* 组件通信
* webpack 与 vite 区别
* tree shaking
* 路由原理
* 首屏优化
* 页面性能排查

---


* **A级：必须会，能讲原理，能举例，最好能手写**
* **B级：知道概念，能回答常见追问**
* **C级：了解即可，防止完全没听过**

