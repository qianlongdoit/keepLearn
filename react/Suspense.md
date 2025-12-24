### Suspense
Suspense 是依赖 React 的 Fiber 架构实现的下面的机制：**暂停渲染**、**等待异步资源**、**恢复渲染**。

### Suspense的核心机制
#### 协作式暂停
React的渲染过程分收集阶段：收集构建Fiber对象，手机副作用，更新 WorkInProgress 树。
提交阶段： 将收集到的副作用一次性全部更新，这个阶段不可以暂停打断。
Suspense在渲染收集阶段是可中断的，当Suspense包裹的组件此时抛出一个Promise，React会捕获这个Promise，并标记当前组件为【暂停状态】，
然后退出渲染阶段，不会进入提交阶段。

#### Thenable 对象 
Suspense生效的前提是接收到了一个有then()方法的对象，最常见是Promise


### 简易版本的Suspense例子
```javascript
// 1. 定义缓存层：存储异步资源的状态（Promise/数据/错误）
const resourceCache = new Map();

// 2. 封装异步请求函数，返回一个「资源对象」
function fetchData(key, fetchFn) {
  if (!resourceCache.has(key)) {
    // 初始状态：存储请求的 Promise
    const promise = fetchFn().then((data) => {
      // 请求成功：更新缓存为「数据」
      resourceCache.set(key, { data, status: 'resolved' });
    }).catch((error) => {
      // 请求失败：更新缓存为「错误」
      resourceCache.set(key, { error, status: 'rejected' });
      throw error; // 抛出普通错误，由 Error Boundary 处理
    });
    resourceCache.set(key, { promise, status: 'pending' });
  }

  const resource = resourceCache.get(key);
  // 3. 关键：若资源未就绪，抛出 Promise
  if (resource.status === 'pending') {
    throw resource.promise;
  }
  // 4. 资源就绪，返回数据
  if (resource.status === 'resolved') {
    return resource.data;
  }
  // 5. 资源失败，抛出错误
  throw resource.error;
}

// 6. 业务组件：渲染时调用 fetchData，可能抛出 Promise
function DataComponent() {
  const data = fetchData('user', () => fetch('/api/user').then(res => res.json()));
  return <div>{data.name}</div>;
}

// 7. 使用 Suspense 包裹，处理暂停状态
function App() {
  return (
    <ErrorBoundary fallback={<div>请求失败</div>}>
      <Suspense fallback={<div>加载中...</div>}>
        <DataComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### QA
1. 如果Suspense包裹的组件永远不返回Promise，是不是就等于没生效
```text
1. 包裹的组件不抛出Promise，那么确实不会触发暂停渲染；
2. 如果包裹的组件的子组件或子树返回了Promise，那么依然会被React捕获，造成意外的生效了
```
