### __proto__ 和 prototype
+ prototype 是函数才有的属性
+ __proto__ 

### __proto__
+ 是对象才有的属性，每个浏览器的实现中叫法不一样
+ 对象都是由函数生成
+ 对象的__proto__的值为构造函数的 prototype 属性

### prototype
+ 是函数才有的属性
+ 函数也是对象
```javascript
function fn() {
  
}

fn.__proto__ === Function.prototype; //true
Function.__proto__ === Function.prototype; //true
Object.__proto__ === Function.prototype; //true
```
#### prototype 是什么（对象）
一般函数的默认prototype是一个类型为 object 的对象，有两个属性`constructor`和`__proto__`。  
`constructor` 指向函数自身;  
`__proto__` 指向Object.prototype;  
上述说明了一般函数的prototype是由Object生成的  

##### 不一般的函数是什么？
Object 和 Function  

#### Object
Object.prototype 不止上面提到的两个属性constructor, 缺少__proto__属性
 Object.prototype.__proto__ 是null  

#### Function
Function.prototype 是 native code  
我们知道 Function.prototype 是一个对象，那么这个对象的__proto__是什么呢？  
```javascript
Function.prototype // 打印出来发现和 Object.prototype 很相似

Function.prototype.__proto__ === Object.prototype // true
```
