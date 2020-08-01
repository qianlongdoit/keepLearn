/**
 * Created by doit on 2020/7/28.
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class MyPromise {
    constructor(fn) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilled = [];
        this.onRejected = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;

                setTimeout(() => {
                    this.onFulfilled.forEach(fn => fn(this.value))
                })
            }
        };

        let reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;

                setTimeout(() => {
                    this.onRejected.forEach(fn => fn(this.reason))
                })
            }
        };

        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then = (onFulFiled, onRejected) => {
        onFulFiled = typeof onFulFiled === "function" ? onFulFiled : value => value;
        onRejected = typeof onRejected === "function" ? onRejected : reason => {
            throw reason
        };

        let res = new MyPromise((resolve, reject) => {
            if (this.status === PENDING) {
                this.onFulfilled.push(() => {
                    this.handle(onFulFiled, this.value, resolve, reject);
                    // setTimeout(() => {
                    //     let value = onFulFiled(this.value);
                    //     if (value instanceof MyPromise) {
                    //         value.then(resolve, reject);
                    //     } else {
                    //         resolve(value);
                    //     }
                    // })
                });
                this.onRejected.push(() => {
                    this.handle(onRejected, this.reason, resolve, reject);
                    // setTimeout(() => {
                    //     let value = onRejected(this.reason);
                    //
                    //     if (value instanceof MyPromise) {
                    //         value.then(resolve, reject)
                    //     } else {
                    //         reject(this.reason);
                    //     }
                    // })
                });
            } else if (this.status === FULFILLED) {
                this.handle(onFulFiled, this.value, resolve, reject);
                // setTimeout(() => {
                //     let value = onFulFiled(this.value);
                //     if (value instanceof MyPromise) {
                //         value.then(resolve, reject);
                //     } else {
                //         resolve(value);
                //     }
                // })
            } else if (this.status === REJECTED) {
                this.handle(onRejected, this.reason, resolve, reject);
                // setTimeout(() => {
                //     let value = onRejected(this.reason);
                //
                //     if (value instanceof MyPromise) {
                //         value.then(resolve, reject)
                //     } else {
                //         reject(this.reason);
                //     }
                // })
            }
        });

        return res;
    }

    handle = (doResolve, value, resolve, reject) => {
        setTimeout(() => {
            let res = doResolve(value);
            let finished = false;

            if (res instanceof MyPromise) {
                // res.then(resolve, reject);
                res.then(onFulfilled => {
                    if (finished) return;
                    finished = true;
                    resolve(onFulfilled);
                }, onReject => {
                    if (finished) return;
                    finished = true;
                    reject(onReject);
                })
            } else {
                reject(value => {
                    if (finished) return;
                    finished = true;
                    reject(value)
                });
            }
        })
    }
}

// promise-test 测试钩子
MyPromise.deferred = function () {
    const defer = {}
    defer.promise = new MyPromise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}

module.exports = MyPromise