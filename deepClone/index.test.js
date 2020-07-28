/**
 * Created by doit on 2020/3/18.
 */

const deepClone = require('./index');

var eg = {a: 5};

var obj = {
    // a: null,
    // b: undefined,
    // c: false,
    // d: 1,
    // e: 'aaaa',
    // f: ['a', undefined, false, {a: 1}],
    // g: {a: [1, 2]},
    h: eg,
    i: eg,
    // h: b
};

// var b = {
//     loop: obj,
// };
//
// obj.m = b;

// console.log(deepClone);

let clone = deepClone(obj);

console.log(clone);
console.log(clone.h === clone.i);
// console.log(obj.h === obj.i);


// console.log(obj, b);