

function sum (num1, num2, num3) {
    return num1 + num2 + num3;
}
var arr = new Array(3).fill(0)
let i = 0;
function curry (func) {
    /* Write Code Here */  
    return function (num) {
        arr[i] = num;
        i++
        console.log(typeof num != "function")
        if (i <= 2&&typeof num != "function") return curry(func)
        if(i == 3||typeof num == "function") {
            return(sum(...arr))
        }
    };
}
const pipe = (fns) => x => x.reduce((v, fn) => fn(v), x)
let curriedSum = curry(sum);
let res = curriedSum(1)(2)
console.log(res)
// var _case = "curriedSum(1, 2, 3)";
// res = eval(_case);
// print(res);