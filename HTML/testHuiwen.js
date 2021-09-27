let arr = "abbbbdad"
let func = function (str){
    let len = str.length -1
    let start = 0;
    let res;
    let resL;
    while(start < len){
        if(str[start] != str[len]){
            start++
        }
        else{
            let flag = true;
            for(let i = start;i<len;i++){
                if(str[start] != str[len + start -i ]) {flag = false;break};
            }
            if(flag) {res = start,resL = len - start}
        }
        if(res) break;
    }
    return res;
}
function promiseAll(promises) {
    if (!Array.isArray(promises)) {
        throw new Error("promises must be an array")
    }
    return new Promise(function (resolve, reject) {

        let promsieNum = promises.length;
        let resolvedCount = 0;
        let resolveValues = new Array(promsieNum);
        for (let i = 0; i < promsieNum; i++) {
            Promise.resolve(promises[i].then(function (value) {
                resolveValues[i] = value;
                resolvedCount++;
                if (resolvedCount === promsieNum) {
                    return resolve(resolveValues)
                }
            }, function (reason) {
                return reject(reason);
            }))

        }
    })
}

Promise.resolve(Promise.then(()=>{
    console.log(2)
}))
