/**
 * Created by doit on 2020/3/18.
 */

/**用 Class 实现 EventEmitter，要求拥有以下的方法
 * on(event, listener)：为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
 * emit(event, [arg1], [arg2])： 按监听器的顺序执行执行每个监听器
 * addListener(event, listener)：on的同名函数（alias）
 * once(event, listener): 和on类似，但只触发一次，随后便解除事件监听
 * removeListener(event, listener)： 移除指定事件的某个监听回调
 * removeAllListeners([event])：移除指定事件的所有监听回调
 * setMaxListeners(n)：用于提高监听器的默认限制的数量。（默认10监听回调个产生警告）
 * listeners(event)： 返回指定事件的监听器数组。
 */


class EventEmiter {
    constructor () {
        this.listeners = {};
        this.maxListeners = 10;
    }

    on(event, cb) {
        let listeners = this.listeners;

        if (listeners[event] && listeners[event].length >= this.maxListeners) {
            throw console.error('监听器的最大数量是%d,您已超出限制', this.maxListeners);
        }

        if (!listeners[event].includes(cb)) {
            listeners[event].push(cb);
        }
    }

    addListener(event, cb) {
        this.on(event, cb)
    }

    emit(event, ...args) {
        this.listeners[event].forEach(l => l(args));
    }

    once(event, listener) {
        let _this = this;
        function removeOnEmie() {
            let args = Array.prototype.slice.call(arguments);
            listener.apply(null, args);
            _this.removeAllListeners(event, listener);
        }

        this.on(event, removeOnEmie);
    }

    removeListener(event, listener) {
        let listeners = this.listeners;

        let index = listeners[event].findIndex(l =>  l === listener);
        this.listeners[event].splice(index, 1);
    }

    removeAllListeners(event) {
        this.listeners[event] = [];
    }

    setMaxListeners(num) {
        this.maxListeners = num;
    }
}