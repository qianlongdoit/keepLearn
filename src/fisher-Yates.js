function shuffle(arr) {
    for (let i = arr.length; i; i--) {
        let pre = Math.floor(Math.random() * i);
        [arr[i - 1], arr[pre]] = [arr[pre], arr[i - 1]];
    }

    return arr
}

var test = [1,2,3,4,5];

console.log(shuffle(test));