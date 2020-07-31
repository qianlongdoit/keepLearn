## react 生命周期函数
***在挂载阶段调用顺序***

### constructor
构造函数，可以用来初始化一些数据

###  (新)static getDerivedStateFormProps (props, state) {}
顾名思义，从props获取派生的state。
此方法在组件实例化之后以及重新渲染的时候进行调用，改方法返回一个对象用来更新state。
返回null，则表示不需要更新。
好处是什么？
静态方法：无法使用this，也就是纯函数，无法写出有副作用的代码
与willReceiveProps相比，不需要处理prevProps为空的时候。

### (不建议)componentWillMount
即将被弃用
执行于render之前，在该函数里面能做的事情，都可以在constructor里面做。
服务端的componentWillMount会执行，这样可能导致内存泄露；

这个周期函数的意义是什么？
不在此函数里面异步的获取数据是因为，React总是在componentWillMount后执行render。
这样如果componentWillMount触发的数据不可用，那么render的时候数据也是不可用的，仍然显示的是加载状态。
这样的做法和在componentDidMount里面执行，并没有明显的区别。

### render
在componentWillMount、componentWillReceiveProps之后执行

### componentDidMount
可以在此生命周期内进行setState()。此时会触发额外的渲染，但是渲染会发生在浏览器更新屏幕之前。
这样保证了即使触发了两次render()，用户也不会看到中间的状态
并不会在render结束后立即执行，而是等待所有子组件都render结束后才调用
有一个经典的例子可以看一下，如下结构的组件
componentWillMount、componentDidMount的触发顺序是怎么样的？
```jsx harmony
//example
    <A>
        <B>
            <C/>
        </B>
    </A>
```
componentWillMount触发的顺序是 A -> B -> C
componentDidMount触发顺序为 C -> B -> A

***更新数据的时候调用顺序***

### static getDerivedStateFormProps

### shouldComponentUpdate
决策componentWillUpdate、componentDidUpdate、render是否重新触发

### render

### getSnapShotBeforeUpdate (prevProps, prevState) {}
在更新前获取快照
此方法在提交到DOM节点之前调用，
可以使组件在更改前获取一些信息，比如滚动位置
该函数的返回值会作为componentDidUpdate的第三个参数

### componentDidUpdate(prevProps, prevState, snapshot)
更新后立即进行调用，首次渲染时不会触发
snapshot来自于 getSnapShotBeforeUpdate 的返回值

### (不建议)componentWillUpdate(nextProps, nextState)
接收到新的 state props 时触发

### (不建议)componentWillReceiveProps
mounted的组件在接收到新的props的时候触发


## React为什么要废除一些生命周期
+ `componentWillMount` 服务端会执行可能导致内存泄露，此生命周期里面执行的函数都可以在constructor  
里面做
+ `componentWillUpdate` `componentWillReceiveProps`都容易写出有副作用的函数，导致复杂性增加出bug


   