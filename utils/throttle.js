/**
 * Created by doit on 2020/7/30.
 */

function throttle(fn, delay) {
    let done = false;
    return (...arg) => {
        if (done) return;
        done = true;
        setTimeout(() => {
            fn.apply(this, arg);
            done = false;
        }, delay)
    }
}

export default throttle