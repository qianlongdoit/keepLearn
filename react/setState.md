## React中setState是异步还是同步的？

### 结论
+ `setState`只有在合成事件和钩子函数中是异步的，  
  原生事件和 setTimeout 中是同步的   
+ 代码是同步的，由于合成事件、钩子函数的执行在 state 更新之前，所以这时候获取值，没法拿到最新的值
+ `setState`的批量更新也是在合成事件和钩子函数中。    
  原生事件、setTimeout 是不会批量更新。  
  多次set同一个值，取最后一次；  
  多次set不同值，更新时候批量更新；  
  
### 结合例子理解
```jsx harmony
class App extends React.Component {
  state = { val: 0 }
  componentDidMount() {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)
    setTimeout(_ => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val)
    }, 0)
  }
  render() {
    return <div>{this.state.val}</div>
  }
}
```
钩子函数中多次set同一个值，无法获取最新的值，故前两次为 0 0；  
setTimeout 可以拿到最新的值，而且是同步的，故后两次值为 2 3；

### 合成事件的setState

### 生命周期的setState

### 原生事件的setState

### setTimeout中的setState
无论是在合成事件还是生命周期里面使用`setTimeout`都是能拿到最新的值，
这是因为 setState 最后会走到一个 try finally 里面去，try 里面的任务被EventLoop放到
任务队列里面去了，finally 里面的代码会先执行，`isBatchingUpdates`变为了变成了false
```js
function interactiveUpdates$1(fn, a, b) {
  if (isBatchingInteractiveUpdates) {
    return fn(a, b);
  }
  // If there are any pending interactive updates, synchronously flush them.
  // This needs to happen before we read any handlers, because the effect of
  // the previous event may influence which handlers are called during
  // this event.
  if (!isBatchingUpdates && !isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
    // Synchronously flush pending interactive updates.
    performWork(lowestPendingInteractiveExpirationTime, false, null);
    lowestPendingInteractiveExpirationTime = NoWork;
  }
  var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingInteractiveUpdates = true;
  isBatchingUpdates = true;  // 把requestWork中的isBatchingUpdates标识改为true
  try {
    return fn(a, b);
  } finally {
    isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}
```


### 参考
+ [React中setState是异步还是同步的](https://www.cxymsg.com/guide/setState.html#%E4%BA%94%E3%80%81setstate%E4%B8%AD%E7%9A%84%E6%89%B9%E9%87%8F%E6%9B%B4%E6%96%B0)