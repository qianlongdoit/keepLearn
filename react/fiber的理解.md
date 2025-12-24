## React Fiber 架构
在React 16引入的新的协调引擎，目的是为了增强React在动画、布局和手势领域的适用性。  
核心特性是任务拆分，将渲染任务拆分成多个微任务，进行任务调度，中断更新量大的渲染
+ 每个微任务可以暂停、恢复、终止
+ 不同任务单元可以分配优先级
+ 父子组件重用已完成的工作

### Fiber数据结构
每个Fiber节点都是一个JavaScript对象，包含了组件的类型、状态、DOM节点信息。主要属性有：
+ type：组件类型（FC组件、Class组件、Host Component
+ key: 组件的key
+ stateNode：组件的实例（Class组件）或者DOM节点（Host Component）
+ child: 下一个子节点
+ sibling: 下一个兄弟节点
+ return: 父节点
+ pendingProps: 新的props
+ memoizedProps: 上一次渲染的props
+ memoizedState: 上一次的渲染state
+ effectTag: 标记需要执行的effect
+ nextEffect: 下个有副作用的节点
+ alternate: 指向当前节点在另外一棵树上的对应节点

### 双缓存技术
React会在内存中构建两棵Fiber树：Current 和 WorkInProgress。Current是当前屏幕上展示的内容，WorkInProgress 是在内存中构建的树，当
WorkInProgress 构建完成渲染到屏幕上的时候，两棵树进行交换。

### 渲染阶段、提交截断
#### 渲染阶段（可中断）
+ 遍历组件树，为每个组件创建Fiber，构建 WorkInProgress 树
+ 计算节点的副作用（更新、删除、插入
+ 为每个副作用构建链表结构，方便在提交截断进行遍历

#### 提交阶段（不可中断）
+ 将渲染阶段收集到的副作用一次性更新，执行DOM
+ 这个阶段必须同步进行，不能中断，否则UI不一致

### 定义任务优先级
```javascript
const PriorityLevels = {
  ImmediatePriority: 1,    // 同步任务
  UserBlockingPriority: 2, // 用户交互
  NormalPriority: 3,       // 普通更新
  LowPriority: 4,          // 可延迟的更新
  IdlePriority: 5,         // 空闲时执行
};
```

### 时间切片 Time Slicing

