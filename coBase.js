function co(gen){
    var ctx = this; // 
    return new Promise(function(resolve,reject){
        if(typeof gen === 'function') gen.call(ctx) // 
        if(!gen || typeof gen.next() !== 'function') return resolve(gen)
        onFulfilled();
        function onFulfilled(res){
            var ret ;
            try {
                ret = gen.next(res)
            }catch(e){
                return reject(e)
            }
            next(ret)
        }
        function next(ret){
            if(ret.done) return resolve(ret.value)
            var value = toPromise.call(ctx,ret.value);
            if(value && isPromise(value)) return value.then(onFulfilled,onRejected)
            return onRejected(
                new TypeError(
                    '错误提示码'
                )
            )
        }
    })
}
