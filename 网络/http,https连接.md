
## tcp的3次握手四次挥手

### 三次握手：
0.     client              server
1.              ->                  (server知道client有发送能力)
2.              <-                  (client知道server有发送与接收的能力，此时client的接收能力未知)
3.              ->                  (server知道client有接收信号的能力)

为什么三次？
为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。
什么叫已失效的报文？
“已失效的连接请求报文段”的产生在这样一种情况下：client发出的第一个连接请求报文段并没有丢失，而是在某个网
络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达server。本来这是一个早已失效的报文段。但
server收到此失效的连接请求报文段后，就误认为是client再次发出的一个新的连接请求。于是就向client发出确认
报文段，同意建立连接。假设不采用“三次握手”，那么只要server发出确认，新的连接就建立了。由于现在client并没
有发出建立连接的请求，因此不会理睬server的确认，也不会向server发送数据。但server却以为新的运输连接已经建
立，并一直等待client发来数据。这样，server的很多资源就白白浪费掉了。采用“三次握手”的办法可以防止上述现象
发生。例如刚才那种情况，client不会向server的确认发出确认。server由于收不到确认，就知道client并没有要求
建立连接。”

### 四次挥手：
0.      client              server
1.           FIN->                  (client发送关闭数据通道请求，等待关闭发送，接收正常)
2.              <-ACK               (确认收到请求关闭数据通道的请求，此期间可以继续发送数据)
3.              <-FIN               (server发送关闭数据通道请求，等待关闭数据发送)
4.           ACK->                  (确认收到了请求关闭的请求，等待2msl---2倍的最长报文时间，关闭连接)

## https是如何保证安全的？
先说现有原理：
+ 正常通信内容是经过对称加密的，对称加密解密都是一个key，公开的算法
+ 发起连接的时候如何交换key来保证没人劫持？  
  (已知非对称加密的密钥不同，公钥可以解开私钥加密的信息，公钥加密的信息只能私钥解)
+ 那么我们将对称加密的key使用非对称加密的方式传输。
+ 但是引入了新的问题。客户端索要公钥时，服务端发给了客户端，但是被中间人截获了,替换成自己的公钥。  
  那么中间人就可以解密客户端发送的信息。发送给客户端任然使用服务端的公钥加密。
  这样客户端与服务端的交流信息，对于中间人来说就是透明的了。
+ 所以现在需要解决中间人的信任问题。 我们引入了证书机构CA(Certificate Authority)
+ 服务端发送加密key的公钥时，会发送自己的证书。
+ 证书的内容我们分2部分看。  
  主体信息：版本、序列号、签名算法、颁发者、有效期、(保证未被篡改的)公钥等
  数字签名：待验证部分  
+ 接收方在获得了证书的时候，先对内容按照签名算法进行一次哈希映射。再对这段签名信息进行一次非对称解密。  
  (解密的公钥存放在计算机本地)这时候解密出来的信息与数字签名进行对比，如果这个完全一致，那么认为这个证书是可靠的  
  这个公钥也是可靠的。
+ 这种情况，如果想继续中间人攻击，那么生成数字签名的私钥没有获取，是无法在偷换掉公钥的情况下生成对应的数字签名的。  
  这一步在客户端验证就无法通过。
+ 如果证书有效，接下来客户端会校验域名是否符合。