/**
 * Created by doit on 2020/7/21.
 */

let obj = {};

Object.defineProperty(obj, 'name', {
    value: 10,
    writable: false
});

obj.name = 1;
// console.log(obj.name);

// console.log(Object.keys(obj));

function add(a, b = 5) {
    b = b ?? 5
    return a + b;
}

console.log(add(1, null));

