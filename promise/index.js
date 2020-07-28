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
                this.status = FULFILLED;
                this.value = value;

                setTimeout(() => {
                    this.onFulfilled.forEach(fn => {
                        fn(this.value)
                    })
                });
            }
        };

        let reject = (reason) => {
            if (this.status !== PENDING) {
                this.status = REJECTED;
                this.reason = reason;

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

    then = (onFulfilled, onReject) => {
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
        onReject = typeof onReject === "function" ? onFulfilled : reason => {throw reason};


        let promise = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let returnVal = onFulfilled(this.value);
                        this.resolvePromise(promise, returnVal, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                })
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let returnVal = onReject(this.reason);
                        this.resolvePromise(promise, returnVal, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            } else if (this.status === PENDING) {
                this.onFulfilled.push((value) => {
                    setTimeout(() => {
                        try {
                            let returnVal = onFulfilled(this.value);
                            this.resolvePromise(promise, returnVal, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    })

                });
                this.onRejected.push((value) => {
                    setTimeout(() => {
                        try {
                            let returnVal = onReject(this.value);
                            this.resolvePromise(promise, returnVal, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    })
                });
            }
        });

        return promise;
    }

    resolvePromise = (p, value, resolve, reject) => {
        if (p === value) {
            reject(new TypeError('Chaining circle'));
        }

        if (value && ['object', 'function'].includes(typeof value)) {
            let done = false;
            try {
                let then = value.then;

                if (typeof then === "function") {
                    then.call(value, (fulfilled) => {
                        if (done) return;
                        done = true;
                        this.resolvePromise(p, fulfilled, resolve, reject);
                    }, (failed) => {
                        if (done) return;
                        done = true;

                        reject(failed)
                    });


                } else {
                    if (done) return;
                    done = true;
                    resolve(value)
                }

            } catch (e) {
                if (done) return;
                done = true;
                reject(e)
            }
        } else {
            resolve(value);
        }
    }
}

// promise-test 测试钩子
MyPromise.deferred  = function() {
    const defer = {}
    defer.promise = new MyPromise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}

try {
    module.exports = MyPromise
} catch (e) {
}