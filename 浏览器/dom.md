* DOM事件流
 捕获：根结点向下传播
 抵达：抵达目标元素
 冒泡：目标元素向上冒泡到达根元素

* 事件捕获、冒泡

* 事件委托
 通常在冒泡阶段实现，因为捕获阶段还没抵达目标元素

* addEventListener 第三个参数
 useCapture 是否在捕获阶段触发

* 阻止冒泡、阻止默认行为
* DOM常用操作
* document.querySelector 和 getElementById 区别
  getbyid 查找更快
* innerHTML / innerText / textContent 区别
* data-* 属性
* localStorage / sessionStorage / cookie 区别
* cookie 的属性：expires / max-age / domain / path / secure / httpOnly / sameSite

* 跨标签页通信
* WebSocket
* postMessage

* IntersectionObserver
异步监听元素与视口（viewport）或另一个元素交叉的情况的 API。通常用于实现懒加载、无限滚动、可见性检测

* MutationObserver
 异步监听DOM元素变化，依赖浏览器的事件机制
