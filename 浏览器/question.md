1. class的public private 属性 方法；
2. class的static中 this指向？
+  如何取消promise，promise A+规范
4. 事件循环


### defer async
+ 正常: HTML parsing -> js download -> js execution -> HTML parsing
+ async: HTML parsing
                      -> (once download completed)js execution -> HTML parsing
          js download 
下载完就执行，
```html
<script type="module" src="./foo.js"></script>
```
对于`type="module"`的脚本，都是defer方式加载的
多个async的加载顺序无法保证  
          
+ defer:  HTML parsing && js download -> js execution
等待DOM生成，其他脚本执行完成后才开始执行
多个defer是顺序加载

### window.onload 与 DOMContentLoaded的区别
+ 解析HTML结构。
+ 加载外部脚本和样式表文件。
+ 解析并执行脚本代码。//js之类的
+ DOM树构建完成。//DOMContentLoaded
+ 加载图片、视频等外部文件。
+ 页面加载完毕。//load

### readyState
有一些情况我们无法确定页面上是否已经加载完毕，比如一个带有 async 的外部脚本的加载和执行是异步
的 **（译注：执行不是异步的 -_-）** 。在不同的网络状况下，脚本有可能是在页面加载完毕
后执行也有可能是在页面加载完毕前执行，我们无法确定。所以我们需要知道页面加载的状况。
document.readyState 属性给了我们加载的信息，有三个可能的值：

loading 加载 —— document仍在加载。
interactive 互动 —— 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
complete —— 文档和所有子资源已完成加载。状态表示 load 事件即将被触发






### shadowEqual实现
   React为什么要废除一些生命周期
   模块的原理
   Fiber架构理解
   性能优化
   HTTP2核心特性
   

   redux的工作原理
   
   
   面试的评价，给一点建议
   