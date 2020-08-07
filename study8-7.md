# 主要是关于路由的懒加载

## 先将懒加载

懒加载的实质是使用了Promise来达到了异步的功能。

那么先来了解一下JavaScript中的异步。众所周知JS的运行环境是单线程的所以不存在着同时运行多个方法的情况。所以引入了异步的机制

### 常用的异步编程模式

>回调函数:即f1,f2两个函数，f2要等待f1执行结果后执行，即 f1(f2)</br>
>事件驱动的方式:f1.on('done', f2);  （JQ写法，f1完成时，trigger("done")则执行f2）</br>
>发布-订阅 模式</br>
>Promise对象实现

### 什么是Promise(来自阮一峰的es6教程)

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 `resolved`（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的

且需要注意的是Promise对象一经创建就立即执行。

------

#### resolve 或者reject后仍会执行Promise函数后面的部分
```
new Promise((resolve,reject)=>{
    resolve(1)
    console.log(222)
}).then(
    commit =>{
        console.log(typeof(commit)) //这玩意是个number
        console.log(commit)
    }
)
//最后是先输出222再输出1
```

then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

#### then方法的规则

+ then方法下一次的输入需要上一次的输出
+ 如果一个promise执行完后 返回的还是一个promise，会把这个 promise 的执行结果，传递给下一次then中。(也就是说then是可以一直使用链式下去的)
+ 如果then中返回的不是Promise对象而是一个普通值，则会将这个结果作为下次then的成功的结果
+ 如果当前then中失败了 会走下一个then的失败。需要注意的是这个error不能被捕获只能通过catch
+ 如果返回的是undefined 不管当前是成功还是失败 都会走下一次的成功
+ catch是错误没有处理的情况下才会走
+ then中不写方法则值会穿透，传入下一个then中
+ then中不能写reject等

#### promise不处理错误的机制

如果在promise里面发生了错误。但不去捕获他里面能够照常运行。指的是不会退出进程
```
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```
正确的一般的写法
```
const tempFunction = ()=>{
    return new Promise((resolve,reject)=>{
        resolve(x+2)
    })
}
tempFunction().then(
    suc =>{
        console.log(success)
    }
)
tempFunction().catch(
    err =>{
        console.log("its error")
    }
)
```

### promise在Vue中的应用

```
routes:[
    path:'/',
    name:'HelloWorld',
    component:resolve=>require(['@/component/HelloWorld'],resolve)
]
```

这里用了ES6的Require再提一嘴

## JavaScript中的导入模块

### AMD与CMD规范
[参考链接](https://www.cnblogs.com/libin-1/p/7127481.html)

AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；

先来瞅瞅里面的模块怎么写

```
//module.js
define(function(){
    const add = (x,y)=>{
        return x+y;
    }
    return{
        add:add
    };
})
//模块的使用，
require([module],callback)//是不是和上面的很像
```

需要注意的是在使用时add和module的加载不是同时的。

-----------

而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。

```
//define(id?, dependencies?, factory)
//id:字符串，模块名称(可选)
//dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式
//factory: 工厂方法，返回一个模块函数
define('hello', ['jquery'], function(require, exports, module) {
 
    // 模块代码
 
});
```

### ES6的规范

export有两种模块导出方式：`命名式导出`（名称导出）和`默认导出`（定义式导出）(VUE中常见的export default)，命名式导出每个模块可以多个，而默认导出每个模块仅一个。

#### 命名式导出

其里面需要注意的是一个解构的用法

比如`export{a}`实际上是`export{a:a}`

### 默认导出

常见的就是

```
export default function()//导出函数
export default class()//导出类

```

### 两者的一起使用

```
const D = 123
export default D;
export {D as default}
```

## 路由元信息

在定义路由的时候可以配置`meta`字段

```
const router = new VueRouter({
    routes: [
        path: '/foo',
        component:Foo,
        meta: {
            requiredAuths:true
        }
    ]
})
```
那么他的用处是什么呢按照官方给的例子是可以做简单的`登录验证`


leiletuziteng