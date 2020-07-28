/**
 * Created by doit on 2020/3/21.
 */


/**手写一个 new
 *
 */


function Car(color, name) {
    this.color = color;

    // return {name: name};

    // return 'new car';
}

Car.prototype.start = function () {
    console.log(this.color + ' car start');
};


// var car = new Car('black');
//
// console.log(car.color);
// car.start();

function _new() {
    var obj = {};

    var proto = [].shift.call(arguments);

    obj.__proto__ = proto.prototype;

    var result = proto.apply(obj, arguments);

    console.log(typeof result);

    return result instanceof Object ? result : obj;

}

var myCar =  _new(Car, 'red', 'BMW');

console.log(myCar.color);
console.log(myCar.name);
myCar.start()