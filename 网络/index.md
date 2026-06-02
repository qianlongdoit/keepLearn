
* http 和 https 区别
* TCP / UDP 区别
* 三次握手、四次挥手
* 输入URL到页面渲染发生了什么
* DNS解析过程
* CDN作用

* https缓存
* 强缓存、协商缓存

* Cache-Control / Expires / ETag / Last-Modified
* HTTP常见状态码

* GET 和 POST 区别

* POST 一定比 GET 安全吗
 只能说相对，主要看是否 **https**


* HTTP1.1 / HTTP2 / HTTP3 区别
  http1 不支持并发请求，容易导致阻塞
  http2 头部压缩、连接复用，多个请求可以一个连接并行处理
  http3


* 长连接和短连接
 短连接 每次新建tcp连接
 长连接 一次建立可以发送多次请求、响应节约开销

* 队头阻塞


* 跨域
* CORS
* 预检请求 OPTIONS
* JSONP 原理与局限
* 代理转发
* websocket 和 http 区别
* 前端安全：XSS / CSRF / 点击劫持
* 如何防止 XSS / CSRF
* 同源策略

* 断点续传、分片上传
* 鉴权：cookie、session、token、JWT
* 为什么 token 常配合 refresh token