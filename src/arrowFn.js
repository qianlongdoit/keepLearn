class Test {
    name = '111'

    sayHi = () => {
        console.log(this.name)
    }

    whichThis = () => {
        let obj = {
            name: 'jack',
            sayHi: () => {
                console.log(this.name)
            }
        }
    }
}

let obj = {
    name: 'jack',
    sayHi: () => {
        console.log(this)
    }
}


// obj.sayHi();


export default Test