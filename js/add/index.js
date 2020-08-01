/**
 * Created by doit on 2020/3/20.
 */


/**实现 sum 函数
 *
 * sum(1)(2)(3) == 6; // true
 * sum(1, 2, 3) == 6; // true
 *
 */



function add(a) {
    function _sum(b) {
        a = a + b;
        return _sum
    }

    _sum.toString = function () {
        return a;
    }

    return _sum;
}

console.log(add(1)(2)(3));
