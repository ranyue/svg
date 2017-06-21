var fs = require('fs')

var readFile = function(fileName){
    return new Promise(function(resolve,reject){
        fs.readFile(fileName,function(err,data){
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

var gen = function *(){
    var f1 = yield readFile('/etc/fatab')
    var f2 = yield readFile('/etc/shells')
    console.log(f1.toString())
     console.log(f1.toString())
}

var g =gen()

g.next().value.then(function(data){
    g.next(data).value(function(data){
        g.next(data)
    })
})

function run(gen){
    var g = gen()
    function next(data){
        var result = g.next(data) // *函数执行一步，
        if(result.done){
            return    result.value //判读done的值，如果内部所有步骤执行完毕， 则函数返回value 值
        }
        result.value.then(function(data){ // 否则继续执行 此时的value 是一个promise 可以直接.then 执行 
            next(data)  // 得到promise 执行的结果 data，把data 带入下一个generator 执行，data 的值会赋值给f1  
        })
    }
    next();
}
run(gen)