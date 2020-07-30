/**
 * Created by doit on 2020/7/30.
 */

/**防抖
 * 比如远程搜索框(在这个函数fn，N秒内没有触发的时候才会执行)
 *
 * @param fn
 * @param delay
 * @return {Function}
 */
function debounce (fn, delay) {
    let timer = null;
    return (...arg) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arg);
        }, delay)
    }
}

export default debounce