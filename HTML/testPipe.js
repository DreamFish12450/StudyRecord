const square = v => v * v
const double = v => v * 2
const addOne = v => v + 1

//x代表这个函数的第二个参数。fn(v)则是循环这个调用
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v),x))
const res = pipe(square, double, addOne)(4)
console.log(res)