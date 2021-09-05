class _Promise {
    constructor(executor) {
        // 校验executor
        if (typeof executor !== "function") {
            throw new Error(`Promise resolver ${executor} is not a function!`);
        };

        this.value = undefined; //终值=>resolve的值
        this.reason = undefined;//拒因=>reject的值
        this.state = "pending";//状态

        this.onFulfilledCallbacks = [];// 成功回调
        this.onRejectedCallbacks = [];// 失败回调
        //原来的resovle函数的作用是将value转换为一个promise对象，然后去执行他的then
        const resolve = (value) => {
            // 成功后的一系列操作（状态的改变，成功回调的执行）
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                //如果这个队列为空什么都不会做，而只有then会忘这里推对象
                this.onFulfilledCallbacks.forEach(fn => fn(this.value));
            };
        };
        const reject = (reason) => {
            // 失败后的一系列操作（状态的改变，成功回调的执行）
            if (this.state === "pending") {
                this.state = "rejected";
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn(this.reason));
            }
        };
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then (onFulfilled, onRejected) {
        console.log(this.state)
        // onFulfilled未传值或传的值不是function的时候
        // 自动把onFulfilled变成一个函数
        if (typeof onFulfilled !== "function") {
            onFulfilled = value => value;
        };

        //onRejected未传值或传的值不是function的时候
        //自动把onFulfilled变成一个函数，并抛出错误
        if (typeof onRejected !== "function") {
            onRejected = reason => { throw reason }
        };

        const promise2 = new _Promise((resolve, reject) => {
            //如果then内返回了一个promise
            if (this.state === "pending") {
                
                this.onFulfilledCallbacks.push(
                    (value) => {
                        setTimeout(() => {
                            const x = onFulfilled(value);
                            //如果这玩意是个promise需要继续执行
                            resolve(x);
                        })
                    }
                );
                this.onRejectedCallbacks.push(
                    (reason) => {
                        setTimeout(() => {
                            const x = onRejected(reason);
                            reject(x);
                        })
                    }
                );

            };
            //当上面的执行完之后，其实是单纯推了个东西进去,如果return yi
            if (this.state === "fulfilled") {
                // 
                setTimeout(() => {

                    const x = onFulfilled(this.value);
                    
                    resolve(x);
                });
            };

            if (this.state === "rejected") {
                setTimeout(() => {
                    const x = onRejected(this.reason);
                    reject(x);
                });
            };
        });

        return promise2;
    }
    all(promises){
        let res = []
        let len = promises.length
        if(len){
            return new _Promise((resolve, reject)=>{
                for(let i = 0;i<len;i++){
                    let promise = promises[i]
                    promise.then((response)=>{
                        res.push(response)
                        if(res.length == len)
                        resolve(res)
                    }),error => {
                        reject(error)
                    }
                    
                }
            })
            
        }
        
    }
    race(promises){
        let res = []
        let len = promises.length
        if(len){
            return new _Promise((resolve, reject)=>{
                for(let i = 0;i<len;i++){
                    let promise = promises[i]
                    promise.then((response)=>{
                        resolve(res)
                    }),error => {
                        reject(error)
                    }
                    
                }
            })
            
        }
    }

};
//下面这段代码的执行顺序大概是先进入父的fulfilled语句，然后在里面创建了一个状态为pending的子Promise,然后再将这个promise往下传
new _Promise((resolve, reject) => {
    resolve(3);
}).then((value) =>{
    return  new _Promise((resolve,reject)=>{
       resolve(99)
    })
} )
    .then(value => console.log("value", value))

