
* React 组件通信
* setState / useState 是同步还是异步
* React批量更新
* React事件机制
* 受控组件、非受控组件
* useEffect 和 useLayoutEffect 区别
* useMemo / useCallback 区别
* useRef 作用
* useReducer 使用场景
* React Fiber
* React diff
* key 为什么不能乱用 index

* React 性能优化

* memo / PureComponent

* Redux 原理
 单向数据流
 Action -> Dispatch Action -> Reducer(change data) -> New State -> View Update
 通过connect方法将 store 的 state 映射为组件的 props。
 connect 会根据 store 的订阅方法，每次变更的时候重新调用 mapStateToProps，更新 props 的值
 connect 返回一个新的组件，这个组件会包装原始组件



* Redux toolkit
* React-router 原理

* hooks 为什么不能写在条件判断里
 react hooks 每次都是按照相同的顺序调用，通过调用顺序区分不同的hook实例

* 闭包陷阱
* React18 并发特性基础理解
* Suspense
* 状态提升
* 自定义 hooks

* Context 使用与性能问题
 每次Provider 或者 value 更新的时候，所有使用该 context的组件会重新渲染，频繁更新会有性能问题
 应该使用 usememo 或者 useCallback