/**
 * Created by doit on 2020/7/16.
 */



let asyncFun = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({'status': 'success'})
        }, 1000);
    });
}



let aaa = async () => {
    let res = await asyncFun();

    console.log(res);
}

aaa()





