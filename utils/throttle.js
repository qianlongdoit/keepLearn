/**
 * Created by doit on 2020/7/30.
 */

function throttle(fn, delay) {
    let done = false;
    return (...arg) => {
        if (done) return;
        setTimeout(() => {
            fn.apply(this, arg);
            done = true;
        }, delay)
    }
}

export default throttle