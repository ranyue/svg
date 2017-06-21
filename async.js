function timeOut(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms)
    })
}

async function asyncPrint(value,ms){
    await timeOut(ms);
    console.log(value)
}

asyncPrint('hello World',2000)



async function dbFuc(db){
    let docs = [{},{},{}];
    let promises = docs.map((doc)=>db.post(doc))
    let results =await Promise.all(promises)
    console.log(results)

}