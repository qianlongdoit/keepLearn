/**
 * Created by doit on 2020/3/22.
 */

/**尾递归 tail recursion：
 * 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
 * 递归非常耗用内存，容易发生Stack Overflow错误。
 * 但是对于尾递归来说，只存在一个调用帧，所以永远也不会发生Stack Overflow错误
 *
 * 尾调优化只有在严格模式下开启，正常模式是无效的
 *
 *
 */