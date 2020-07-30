## React 的diff是如何从 O(n^3)改进到 O(n) 的
+ 比较根节点
+ 比较组件 不一样会 删除组件重新创建
+ 比较相同组件内部 仅仅更新属性（classname）

## diff算法的改进
同层级间的最小更新的操作数，如何取得最优解？  
类似LeetCode上的最小编辑距离。
这个算法是如何得出来的，可以参考下面这篇文章。
[NervJS-diff 算法原理概述](https://github.com/NervJS/nerv/issues/3)