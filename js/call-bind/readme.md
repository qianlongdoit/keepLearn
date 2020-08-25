## call, bind,apply的实现

call，bind，apply是改变了this的指向，即调用者发生了变化，这个是核心。

```js
// call
Function.prototype.myCall = function (context, ...rest) {
    context = typeof context === "object" ? context : window;
    let key = Symbol();

    context[key] = this;
    const res = context[key](...rest);
    delete context[key];

    return res;
}

// bind
Function.prototype.myBind = function (context, ...args) {
    context = typeof context === "object" ? context : window;

    return () => {
        this.call(context, ...args);
    }
}

function test() {
    console.log(this.name);
}

let obj = {name: 'jack'};

test.myCall(obj);
```
