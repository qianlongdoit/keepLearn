### 概要

+ [为什么引入Hook](#为什么引入Hook)
+ [Hooks的使用规则](#Hooks的使用规则)
+ [内置Hooks](#内置Hooks)，区别是什么
+ 自定义Hooks



<h2>为什么引入Hook</h2>

之前react有两种类型的组件： class 和 function。

相比较function组件，class组件的优势：

+ 可以访问到组件实例，ref等
+ 有自己的状态

缺点：

+ this指向需要显示的绑定
+ 大型组件难以拆分、重构，也很难测试
+ 组件逻辑难以复用（如果使用 render props 或者 HOC 会形成组件的嵌套地狱）
+ 一个业务逻辑分散在不同的生命周期函数中，导致逻辑重复（同样的逻辑会在 didMount didUpdate中分别写一遍）
+ 类字段编译后比较沉重，难以压缩

Hooks的出现是为了解决这些缺点，因此Hooks的目标是：

+ 去掉class
+ 取消生命周期的困扰
+ 便捷的复用方法
+ 具有class的能力



<h2>Hooks的使用规则</h2>

1. 只在React函数组件、自定义Hook中调用Hook
2. 不要在条件语句、循环、嵌套函数中调用Hook（确保你在React函数的最顶层调用他们）
3. `Hook`函数以`use`开头，便于`eslint`做检查



**为什么不要在条件语句、循环语句等情况里面调用Hook？**

官方解释：由于可以多次调用同一个Hook，React 依靠调用的顺序保证了每次的state和Hook对应上。

如果是在条件语句或者循环中进行调用的话，Hook的顺序就是不确定的，无法保证state和Hook正确的关联上。

**TODO react内部是如何让每次的hook调用正确的关联上state的？（链表、数组结构？）**



<h2>内置Hooks</h2>

+ [useState](#useState)
+ [useEffect](#useEffect)
+ [useLayoutEffect](#useLayoutEffect)
+ [useReducer](#useReducer)
+ [useCallback](#useCallBack)
+ [useMemo](#useMemo)
+ [useRef](#useRef)
+ [useContext](#useContext)




<h2>useState</h2>

  ```js
const [state, setState] = useState(initialState);
//  传入函数
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
  ```

输入一个初始状态，返回一个state，以及更新state的函数。

如果setState后的返回值与当前state完全相同，随后的**渲染被跳过**。

如果 initialState需要复杂的计算得出，那么可以在useState里面**传递函数**，函数的返回值就是初始的state。

这个函数只会在初始渲染的时候被调用（称为**惰性初始state**）。



**每次 Render 都有自己的 Props 与 State**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

hooks没有双向绑定，也没有使用`Proxy`，而是闭包实现的。每次 `render`的时候，`count`的值都是固定的，有地方称之为 函数组件的 `Capture Value`特性。

**需要注意点：**

+ 为什么我的state不是最新的值？ [在线demo](https://codesandbox.io/s/hooks-usestate-zj1cy?file=/src/App.js)
+ 如何拿到最新的值？（使用`useEffect`）

+ React Hooks只能用于函数组件，而每一次函数组件被渲染，都是一个全新的开始
+ 每一个全新的开始，所有的局部变量全都重来，"全体失忆"，只有`Hooks`函数有记忆



<h2>useEffect</h2>

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
      // 清除订阅
      subscription.unsubscribe();
  };
}, [deps]);
```

effect 全称叫做 sideEffect，副作用。命名的意思是，我们如果希望做一些带有副作用代码的函数，可以使用这个。

所谓的副作用有这些常见场景：修改dom、添加订阅、记录日志、添加定时器等。这些事情函数主体内（React的渲染阶段）是不被允许的。因为这样破坏了UI的一致性，容易产生BUG。

  

**何时执行** 在浏览器完成布局、绘制，effect传入的函数会延迟调用。

为什么选择这个阶段？ 可以不阻塞浏览器更新屏幕的操作。

如果需要在浏览器下次绘制前进行执行，可以使用[useLayoutEffect](#useLayoutEffect)

  

**依赖项** 第二个参数，是一个数组，传入依赖项。这些依赖项如果变化了，那么函数会重新执行。

当然每次执行effect的时候，会清除上一次effect。当你传递了一个**空数组**的时候，那么这个effect只会在组件创建和销毁的时候执行，因为这个等同于，不依赖任何 props 和 state，所以永远不会重复执行。

  

如果你在effect函数中使用了外部的变量，那么一定要把这个**外部变量放到依赖项中（hooks 返回的 setXXX可以省略）**，否则可能每次渲染的时候，取到的变量的值可能是旧变量。比如看下面的例子：

  ```jsx
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(count + 1); // 这个 effect 依赖于 `count` state
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
}
  ```

这个例子里面count初始值为0，定时器以后每次执行，都是`setCount(0 + 1)`，里面取到的count永远都是0；

但是这种情况下，把依赖放到第二个参数里面，又会每次重置定时器。这并不是我们想要的结果。

如果我们想每次取到的都是最新的值的话，有两种方法：

+ 使用函数式更新  <code>setCount(c => c + 1); //函数式更新</code>
+ 外部变量放入依赖项


这样作为函数式更新，每次拿到的值都是最新的了。[在线demo](https://codesandbox.io/s/hooks-useeffect-nnzky?file=/src/App.js:353-358)



**外部变量放入依赖项** 会有什么问题？

1. `count`值的确实是最新的了。
2. 每次`render`会 **销毁/产生** 新的定时器 （不必要的性能开销）。
3. 由问题2我们可推断出定时不准确了（why？）。



#### 场景更复杂一点？

在 `useEffect `中增加一个新的依赖 `step`（每次递增的步长），那么又回到开始的问题了，定时器会被重置。这种场景下，我们该如何解决呢？

+ 使用`useReducer`
+ 使用`useCallback` ?




<h2>useLayoutEffect</h2>

与`useEffect`使用方法一致，区别是调用时机不一样，会阻塞浏览器屏幕的更新。

**简化的大致流程：**

1. react 在 diff 后进入 commit 阶段
2. commit 前，react 把使用了 Effect 的组件，放入一个调度队列中供后续使用
3. 按虚拟DOM对真实DOM进行修改（JS线程和渲染线程互斥，所以浏览器此时还没有立刻渲染到屏幕上）
4. 这时候执行  `componentDidMount`、`componentDidUpdate` 以及 `useLayoutEffect(create, deps)`的`create`函数
5. commit 结束后，react **让出线程**（`React` 如何做到正确的时候让出队列？），等待浏览器执行 `reflow` `repaint`等工作
6. 当浏览器空闲下来了，js接管了线程，react开始执行步骤2中的调度队列（`useEffect(create, deps)` 产生的函数）的任务。



如果把修改`DOM`的操作放在 `useEffect`里面，这个操作会在浏览器渲染完成后执行，此时的修改会再次触发浏览器的回流、重绘，增加了不必要的性能开销。

千言万语不如一个[验证阻塞demo](https://codesandbox.io/s/hooks-uselayouteffect-ijz13?file=/src/App.js)

**适用场景：**

+ 官方推荐，优先使用`useEffect`，在出现问题的时候再使用`useLayouEffect`
+ 调整布局，防止出现页面布局抖动等



<h2>useReducer</h2>

官方定义为`useState`的替代方案。

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
// 参数解释
// reducer: (state, action) => newState
// initialArg: 初始值
// init: 类似useState里面的惰性初始state，state的值会被设置成为 init(initialArg)
```

**适用场景：** 

  + state 逻辑复杂，多种子值的时候
  + 当前 state 的值依赖之前的 state

下面看看如何将使用`reducer` 处理上面的`useEffect`多依赖的场景，

```jsx
const initialState = {count: 0, step: 1};

function reducer(state, action) {
    const {count, step} = state;
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: count + step
            };
        case 'decrement':
            return {
                ...state,
                count: count - step
            };
        case 'addStep':
            return {
                ...state,
                step: action.step
            };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {count, step} = state;

    useEffect(() => {
        let timer = setInterval(() => {
            dispatch({type: 'increment'})
        }, 1000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <>
            Count: {count}
            <input
                type="num"
                value={step}
                onChange={(e) => dispatch({type: 'addStep', step: +e.target.value})}
            />
        </>
    );
}
```

[查看在线demo](https://codesandbox.io/s/hooks-reducer-s3mjo?file=/src/App.js)



  <h2>useCallBack</h2>

  输入一个函数、依赖数组，返回一个`memoized`（计算机科学中使用 `memoized` 而不是`memorized`）

  的回调函数，这个函数只有在依赖项变化的时候才会**更新**。

  这个**更新**的意思是在依赖项没有变化的时候，会一直保持着这个函数的引用。

```js
const memoizedCallback = useCallback(
    () => {
        doSomething(a, b);
    },
    [a, b],
);
```

  为什么要这么做呢？

  ```js
const a = () => {};
const b = () => {};
a === b;  // ??
  ```

在react中，我们会经常写出这样的 `inline callback`，这样每次更新的时候，两个引用是不一样的。会造成父组件如果重新渲染，那么引用这个方法的子组件必定会重新渲染。

可以参考这个[例子](https://codesandbox.io/s/usecallback1-forked-s4e7t?file=/src/App.js)进行理解。



  **适用场景**

  如果这个`callback`的依赖项里面有一个经常变化的`state`，那么这个缓存就失效了。

一般配合`React.memo` 或者 `useMemo`使用，查看可**以优化但没必要**的[优化demo](https://codesandbox.io/s/hooks-reactmemo-usecallback-1wkos?file=/src/App.js)

  **解决方案：**

  1. 把这个依赖用ref存起来，让后把这个ref放到依赖数组里面去。

  2. 把这个`callback`用`ref`存起来，返回一个永远不变的“跳板”函数，来执行这个函数。

     ```js
     function useCallback(callback) {
       const callbackHolder = useRef();
     
       useLayoutEffect(() => {
         callbackHolder.current = callback;
       });
     
       return useMemo(
         () =>  (...args) => (0, ref.current)(...args),
         []
       );
     }
     ```

  3. 使用`Reducer` ，React 保证了`dispatch`是稳定的，会自带`memoize`

  

  <h2>useMemo</h2>

和 `useCallBack `类似，传入一个函数，和一个依赖项，返回一个 `memoized` 的值。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

原来的 React.memo 也提供了类似的作用

  ```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

不同的是，该函数会在**渲染阶段的时候执行**（因为最后一次的render并不意味着拿到的是最新的值）。

不要在这个函数里面进行副作用操作，这个是 `useEffect`的适用范围。

与 `useEffect `不同的是，如果依赖项为空，则每次都重新计算新的值。



  <h2>useRef</h2>

`useRef`返回一个可变的`ref`对象，可以传入一个初始化的值。返回的`ref`在组件的整个生命周期内保持不变。

  ```js
const ref = useRef(initialValue);
// 访问实例
// ref.current
  ```

类似`class`组件里面的`ref`保存DOM，不过范围更广，可以保存任何值，这个api创建了一个js对象`{current: ...}`，然后每次都是返回同一个 `ref` 对象。



<h2>useContext</h2>

接受一个 context 对象（`React.createContext` 的返回值），返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的`Context.Provider` 的 value prop决定

```jsx
// 第一步：创建context
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 第二步：使用 Provider 提供 ThemeContext 的值，Provider所包含的子树都可以直接访问ThemeContext的值
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// Toolbar 组件并不需要透传 ThemeContext
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  // 第三步：使用共享 Context
  const theme = useContext(ThemeContext);
  render() {
    return <Button theme={theme} />;
  }
}
```

  

  

### 参考

[精读《useEffect 完全指南》](https://github.com/dt-fe/weekly/blob/master/96.精读《useEffect 完全指南》.md)

[这可能是最通俗的 React Fiber(时间分片) 打开方式](https://juejin.im/post/6844903975112671239)

[聊聊 useCallback](https://zhuanlan.zhihu.com/p/56975681)

[深入理解 React useLayoutEffect 和 useEffect 的执行时机](https://www.cnblogs.com/iheyunfei/p/13065047.html)