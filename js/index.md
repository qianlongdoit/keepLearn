* 深拷贝、浅拷贝区别
 浅拷贝：只拷贝第一层。常见浅拷贝：Object.assign(), Array.slice(), Array.From()
 深拷贝：递归拷贝所有层.

* JSON.stringfy 进行深拷贝问题
 循环引用，（weakMap解决）
 丢失function、undefined、symbol、正则
 ```javascript

* 手写深拷贝
function deepClone(obj, map = new WeakMap()) {
    if (obj === null || typeof obj !== ""object) return obj;

    if (map.has(obj)) return map.get(obj);

    const result = Array.isArray(obj) ? [] : {};
    map.set(obj, result)

    for(let key in obj) {
        result[key] = deepClone(obj[key], map);
    }

    return result
}
 ```

* 事件循环
  同步代码执行完后，先清空微任务队列，再执行宏任务，如此循环。
  宏任务：定时器系列、I/O、UI render
  微任务：Promise.then、Promise.catch、Promise.finally、queueMicrotask、MutationObserver

* requestAnimationFrame
  浏览器提供的动画API，在下一次重绘前执行，适合做高性能动画，和屏幕刷新率同步，一般60fps

* Promise.all / race / allSettled / any
  all 全部成功才resolve
  race 谁先用谁
  allSettled 不管成功失败，全都返回
  any 只有有一个成功就返回

* async、await、import 返回类型
 async 返回Promise
 await 返回Promise.then
 import 顶层的import是静态导入，直接拿到模块的导出。import()是动态导入，返回Promise

* call apply bind
* 原型链、继承
  
* hash 路由 history 路由区别
 hash路由是#后面的定义，不利于seo
 history路由是通过pushState,replaceState来操作记录的，不会触发页面的刷新

* 数据类型

* null 和 undefined 区别
 null 对象
 undefined 为定义，初始值

* == 和 === 区别
* let / const / var 区别
* 暂时性死区
* 闭包
* this 指向

* 箭头函数和普通函数区别
  this的绑定

* new 做了什么
* instanceof 原理
* typeof 和 Object.prototype.toString
* 作用域、作用域链
* 执行上下文
  
* 垃圾回收机制
 引用计数：引用次数为0，则被回收
 现代浏览器（标记清楚+标记整理）：新生代、老生代。大多数对象存活周期很短，少数对象一直存在，如果不加区分一起扫描非常低效，每次把活着的对象复制走，清空整块内存（比如，没活过一次内存清理年龄+1）

* 防抖、节流
  防抖：远程搜索
  节流：滚动窗口，resize

* 数组常用方法 map / filter / reduce
* for...in 和 for...of 区别
* Set / Map / WeakSet / WeakMap
* Object.defineProperty 和 Proxy
* Reflect 作用
* 发布订阅、观察者模式
* 柯里化
* 函数组合
* 高阶函数
* 面向对象和函数式理解
  
* 模块化 CommonJS / ES Module 区别
 commonJs node服务端，同步加载，被缓存，require每次返回同一个对象
 ES module 现代浏览器，静态的，每次编译就明确了依赖关系，支持tree shaking

* import 和 require 区别
  require 同步加载模块，相同的模块会被缓存
  import 静态加载，编译的时候就解析依赖关系。动态import可以异步加载

* script defer / async 区别
 defer 延迟执行，等页面加载后（DOMContentLoaded），所有脚本按书写顺序依次执行
 async 异步加载，加载完立刻执行，不管页面是否解析完成（适用于统计、上报

* 迭代器、生成器
* Symbol
* BigInt
* 手写 Promise
* 手写 call / apply / bind
* 手写 new
* 手写 instanceof

* 手写防抖节流
