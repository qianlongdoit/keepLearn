/**
 * Created by doit on 2020/3/18.
 */

/**实现 deepClone
 *
 * 目前只考虑基本类型 array object function string number boolean null undefined
 *
 * 注意点：
 * 1.引用丢失；
 * 2.循环引用；
 * 3.递归爆栈；
 *
 * 问题1、2可以一起解决，用一个map存放引用数据，在递归的过程中，如果发现这个值已经被复制过了，那么
 * 直接取值就可以了。
 * (为什么用WeakMap的 key-value 对，而不是直接一个数组存放这个唯一的值呢？因为这样会导致引用丢失)
 *
 * @param obj
 * @param uniqueValue
 */
function deepClone(obj, uniqueValue = new WeakMap()) {
    if (isSimpleType(obj)) return obj;
    if (uniqueValue.has(obj)) {
        return uniqueValue.get(obj);
    }

    let copy = Array.isArray(obj) ? [] : {};
    uniqueValue.set(obj, copy);

    for (let attr in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, attr)) {
            copy[attr] = deepClone(obj[attr], uniqueValue);
        }
    }

    return copy;
}

function isSimpleType(obj) {
    return [
        '[object Undefined]',
        '[object Number]',
        '[object String]',
        '[object Null]',
        '[object Boolean]',
    ].includes(Object.prototype.toString.call(obj));
}

module.exports = deepClone;