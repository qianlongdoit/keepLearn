## http2相对于http1.x有什么新特性？

### 头部压缩
服务端和客户端都会使用"首部表"来存储之前发送的数据，每次只发送差异部分。从而减少头部的信息量

### 服务器推送
服务端可以在发送HTML文件的时候主动推送其他资源，而不是等待浏览器解析到相应的位置才来发起请求。  
当然这些也遵循同源策略，客户端可以选择是否接受这些资源。

### 多路复用
http1.x中如果想并发多个请求，必须要使用多个TCP连接，一般浏览器会对并发TCP连接做限制。

http2中：
+ 同域名的通信可以在单个连接上完成
+ 单个连接可以承载任意数量的双休数据流(任意数量的静态资源的加载)
+ 数据流可以单个发送，也可以多个帧，顺序可以乱序，帧首部有标识顺序