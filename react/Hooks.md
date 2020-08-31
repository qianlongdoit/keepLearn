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

1. 只在React函数组件、自定义Hook中中调用Hook

2. 不要在条件语句、循环、嵌套函数中调用Hook（确保你在React函数的最顶层调用他们）

   

**为什么不要在条件语句、循环语句等情况里面调用Hook？**

官方解释：由于可以多次调用同一个Hook，React 依靠调用的顺序保证了每次的state和Hook对应上。

如果是在条件语句或者循环中进行调用的话，Hook的顺序就是不确定的，无法保证state和Hook正确的关联上。

### TODO react内部是如何让每次的hook调用正确的关联上state的？（链表结构？）



<h2>内置Hooks</h2>

+ [useState](#useState)

+ [useEffect](#useEffect)

+ [useContext](#useContext)

+ [useCallback](#useCallBack)

+ [useMemo](#useMemo)

+ [useRef](#useRef)

+ [useReducer](#useReducer)

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
  
  如果setState后的返回值与当前state完全相同，随后的渲染被跳过。
  
  如果 initialState需要复杂的计算得出，那么可以在useState里面**传递函数**，函数的返回值就是初始的state。
  
  这个函数只会在初始渲染的时候被调用（称为**惰性初始state**）。
  
  
  
  <h2>useEffect</h2>
  
  ```js
  useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
      // 清除订阅
      subscription.unsubscribe();
    };
  }, [dependences]);
  ```
  
  effect 全称叫做 sideEffect，副作用。命名的意思是，我们如果希望做一些带有副作用代码的函数，可以使用这个。
  
  所谓的副作用有这些常见场景：修改dom、添加订阅、记录日志、添加定时器等。这些事情函数主体内（React的渲染阶段）是不被允许的。因为这样破坏了UI的一致性，容易产生BUG。
  
  
  
  **何时执行** 在浏览器完成布局、绘制，effect传入的函数会延迟调用。
  
  为什么选择这个阶段？ 可以不阻塞浏览器更新屏幕的操作。
  
  如果需要在浏览器下次绘制前进行执行，可以使用[useLayoutEffect](#useLayoutEffect)
  
  
  
  **依赖项** 第二个参数，是一个数组，传入依赖项。这些依赖项如果变化了，那么函数会重新执行。
  
  当然每次执行effect的时候，会清除上一次effect。当你传递了一个**空数组**的时候，那么这个effect只会在组件创建和销毁的时候执行，因为这个等同于，不依赖任何 props 和 state，所以永远不会重复执行。
  
  
  
  如果你在effect函数中使用了外部的变量，那么一定要把这个**外部变量放到依赖项中**，否则可能每次渲染的时候，取到的变量的值可能是旧变量。比如看下面的例子：
  
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
  
  如果我们想每次取到的都是最新的值的话，这时候可以采用函数式更新。
  
  ```js
  setCount(c => c + 1);
  ```
  
  这样作为函数，每次拿到的值都是最新的了。
  
  但是在更复杂的state更新场景中，建议使用`useReducer Hook`
  
  
  
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
  a === b;  // false
  ```
  
  在react中，我们会经常写出这样的 `inline callback`，这样每次更新的时候，两个引用是不一样的。会造成父组件如果重新渲染，那么引用这个方法的子组件必定会重新渲染。
  
  可以参考这个[例子](https://codesandbox.io/s/usecallback1-forked-s4e7t?file=/src/App.js)进行验证。
  
  **适用场景**
  
  
  
  
  
  
  
  <h2>useMemo</h2>
  
  
  
  
  
  <h2>useRef</h2>
  
  
  
  
  
  <h2>useReducer</h2>
  
  
  
  
  
  

