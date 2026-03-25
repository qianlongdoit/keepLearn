### 什么是cookie？
cookie是服务端发送到客户端浏览器保存在本地的一小段文本数据，浏览器会在后续同域请求中自动携带该信息，实现状态的保存。

### cookie有哪些基础属性
1. httpOnly：禁止js读取
2. Secure：仅在https加密传输中才携带cookie
3. SameSite：禁止跨站请求携带cookie。（Strict：严格，仅同域、Lax：宽松，部分跨站、None：无限制）
4. Domain+Path：限制cookie的作用域防止跨域泄漏。（制定域名以及路径）
5. Expires/Max-age：设置过期时间。

### SameSite的属性
+ Strict 仅允许同站请求携带cookie，任何跨站请求（链接、表单、ajax）都不携带
+ Lax 允许部分安全的跨站请求携带。比如Get请求的跳转链接、表单提交，禁止ajax提交
+ None 不限制。必须设置 Secure，否则浏览会忽视该配置。（适用于广告、iframe等场景）

### cookie存在哪些安全风险
cookie的安全问题主要源于存储方式、传输方式、访问权限。
1. xss 跨站脚本攻击。如果未设置httpOnly，攻击者可以通过js读取cookie，窃取登录态等信息；
2. csrf 跨站伪造请求。攻击者诱导用户点击恶意链接，利用用户的登录态发起请求，主要点在跨站，攻击者不需要窃取cookie；
3. Cookie劫持，如果http明文传输，可能被窃取
4. 跨域泄漏。未严格显示path和domain导致cookie被废目标网站窃取


### 相关问题

Q1: 把登录态存在 Cookie 里，并设置了 HttpOnly，是不是就完全安全了？
httpOnly防止XSS读取cookie，但是浏览器还是会自动携带cookie。


Q2: 既然 HttpOnly 防不了某些攻击，那如何防 CSRF？
+ 设置Samesite：限制跨站请求携带cookie
+ 请求中携带Token，服务端校验
+ 校验Referer/Origin


Q3:SameSite=Lax 到底做了什么？为什么它不能完全防 CSRF？
 Lax允许部分安全的跨站请求携带cookie。比如Get请求的跳转链接、表单提交，但是ajax不携带。如果攻击者伪造了一个图片链接，此时get访问仍然会携带cookie。

Q4: 为什么浏览器要默认把 SameSite 从 None 改成 Lax？（Chrome 的策略变化）
因为历史的网站大量没有csrf防护，自动携带cookie安全性太低了，默认帮开发者兜底。
 设置成None不设置Secure，浏览器会忽视该配置。Lax可以防范部分csrf问题，也一定程度上保持了用户的体验

Q5:设计一个“银行级别”的登录态方案（重点）：
要求：
防 XSS
防 CSRF
防 Session 劫持
支持多端登录
不要只说技术点，要说：
Cookie 怎么配
Token 怎么设计
后端怎么校验
 
+ Cookie：HttpOnly Secure SameSite
+ Session：短期session，登陆后更新
+ XSS：输入过滤
+ 风控：IP/设备/行为分析

Q6: 如果攻击者已经拿到了你的 Cookie（比如通过抓包），你还能怎么防？
 异常设备、ip访问之前先要通过验证，如果已经确定被泄漏了，让session失效，需要重新登录

Q7: token 放在 Cookie + HttpOnly 和 放在 localStorage，本质区别是什么？
token放在cookie：会有csrf的风险，因为cookie会自动携带。但是httpOnly可以防止js读取
token放在localStorage：阻止了自动携带，但是js可以读取，可能被XSS攻击


Q8：CSRF Token 为什么不能放在 Cookie？
cookie会在访问的过程中携带，有csrf的风险。正确做法是放在header或者reqbody



