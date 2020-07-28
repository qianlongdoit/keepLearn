## 浏览器的EventLoop
 + [例子](https://github.com/YvetteLau/Blog/issues/4)

### 浏览器的线程
+ GUI渲染线程： 负责HTML CSS的解析，重绘、回流等工作 
+ JS解析线程：解析和执行JS，比如v8引擎
+ 定时器线程: setTimeout
+ 事件触发线程: addEventListener
+ http线程: 异步的http请求

### 事件循环 浏览器渲染进阶（浏览器阻塞会影响什么）
`GUI渲染和JS解析线程是互斥的`（因为js可以操作DOM）
通俗点说就是script脚本执行的时候会阻塞DON树的解析、渲染，延迟DOMContentLoaded事件的触发

 
CSS的加载不会阻塞DOM树的解析
阻塞DOM树的渲染
阻塞JS语句执行，影响DOMContentLoaded的触发

### 执行过程
执行一次宏观任务，清空所有微观任务

- 执行macro-task
- 执行micro-task
- 执行GUI
- 执行worker相关任务

例子
```js
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0)
// Promise1，setTimeout1，Promise2，setTimeout2
```


## node环境的 Event Loop
node10之前：执行一次宏观任务，执行一个微观任务
node10之后：与浏览器保持一致

其次，node的微观任务在各个阶段之间执行






















