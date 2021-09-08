
var p1 = new Promise(function(resolve, reject){
    reject(2)
}).then((res)=>{
    // console.log(p1)
}).catch(err =>{
    console.log(p1)
})
console.log(p1)