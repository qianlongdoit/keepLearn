## http的缓存
客户端在首次请求资源的时候根据响应头来决定是否缓存资源。  
客户端再次请求资源的时候，如果命中了缓存资源，会去查看上次缓存的缓存策略，来判断是否读取本地的资源还是  
和服务器协商缓存。

## 什么时候触发强缓存或者协商缓存？
强缓存与 expires 和cache-control

### expires
http1.0中的表示资源过期时间的header，是一个绝对时间，判断对比标准是本地时间。
`Expires: Wed, 11 May 2018 07:20:00 GMT`

### Cache-Control
http1.1出现，优先级比expires高，是相对时间
`Cache-Control: max-age=315300000`
其他字段：
+ Cache-Control: public     所有用户缓存，包括CDN中间代理商  
+ Cache-Control: private    浏览才可以缓存，其他中继服务器不允许缓存
+ Cache-Control: no-cache   可以缓存在本地，每次命中缓存后，先与服务器通信看看是否过期
+ Cache-Control: no-store   不产生任何缓存

## 缓存协商
缓存过期或者`Cache-Control: no-cache`的时候，客户端与服务器进行协商缓存。
如果缓存与服务端最新版本是一致的，那么服务器换返回304 Not Modified，如果过期，则返回200.

### Last-Modified/If-Modified-Since
客户端第一次请求资源的时候，服务器会返回一个最新的修改时间 `Last-Modified: XXX`  
客户端下次请求数据的时候，会带上服务器的修改时间，在请求头会有这样的字段 `If-Modified-Since: XXX`  
服务器根据此对比资源是否是最新的，来返回200或者304

### ETag/If-None-Match
ETag也是判断缓存的，只不过是根据内容摘要判断的，流程与 `Last-Modified`一样


## 浏览器缓存机制
+ Service Worker
+ Memory Cache
+ Disk Cache
+ Push Cache

### Service Worker


### Memory Cache
内存中的缓存，主要包括样式、脚本、图片等。一旦关闭tab页就释放了。读取效率高，但是内存有限。
使用 preloader 指令，一边解析js/css 一边下载资源，这些也是放在了 memory cache中的
```html
<link rel="prefetch" href="/images/big.jpeg">
```
`memory cache`不关心 Cache-Control 的字段值(除非 no-store)，
对url、Content-Type CORS校验

### Disk Cache
一般大文件、内存使用率高的时候会被丢进硬盘缓存。  
相同url的资源一旦被缓存起来，就不会再次请求数据。

### Push Cache



