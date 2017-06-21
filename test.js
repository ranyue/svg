function testPromise() {
    const label = 'Promise';
    console.time(label);
    new Promise((resolve, reject) => {
        try{
            console.log(a)
            resolve('aaa')
        }catch(e){
            reject(e);
        } 
    }).then((e) => {
        console.log(e)
        console.timeEnd(label);
    })
    .catch(e=>{
        console.log(e,'catch')
    });
}
testPromise()