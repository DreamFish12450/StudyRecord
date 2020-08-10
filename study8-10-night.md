# VUE一些基本概念

## 模板引擎

VUE中最重要的一个东西就是模板引擎。也就是常用的template。这里的template会将VUE中的`{{}}`和一些比如`v-if`等的指令解析成某种特定格式的代码。

JS中也有一个模板字符串的说法就是使用<font color = 'blue'>``</font>。

个人感觉其实也是通过其内置的代码做一次解析。

我们在 Vue 里渲染一块内容，一般会有以下流程（可以根据前面几篇的生命树再做了解）：

1. 解析语法生成 AST。
2. 根据 AST 结果，完成 data 数据初始化。
3.  根据 AST 结果和 data 数据绑定情况，生成虚拟 DOM。
4. 将虚拟 DOM 生成真正的 DOM 插入到页面中，此时页面会被渲染。

`AST`是啥呢？

`AST`是一种抽象语法树。DOM树其实就是一种

## 渲染的大概步骤

1. 捕获特定语法
    1. 语法分析。会在这一步进行一个上下文的结构的审查
    2. 语义分析。语义分析的任务是对结构上正确的源程序进行上下文有关性质的审查，进行类型审查。语义分析是审查源程序有无语义错误，为代码生成阶段收集类型信息，一般类型检查也会在这个过程中进行。在 Vue 框架中，例如我们绑定了某个不存在的变量或者事件，又或者是使用了某个未定义的自定义组件等，都会在这个阶段进行报错提示。
    3. 生成对应AST树。这里就是进行一定的解析
2. DOM 元素捕获

## VUE中的DOM diff

[参考链接](https://github.com/answershuto/learnVue/blob/master/docs/VirtualDOM%E4%B8%8Ediff(Vue%E5%AE%9E%E7%8E%B0).MarkDown)

### 前置知识

#### VUE的响应式系统

[参考链接](https://juejin.im/post/6844904178918096903)



[参考链接]()

*使用订阅者模式，达成声明式编程的目的。* 其实就是当检测到数据变化时视图会自动变化

第一个链接讲的非常好。这里只对概念做一点摘记

首先是`Dep`。他是一个存放所有`Watcher`(通知者或者订阅者)。Dep中有两个简单的方法一个是`addSub()`也就是增加Watcher。另外一个是`notify`也就是通知所有的观察者。

然后使用了闭包。这个闭包中只有一个`dep`存放所有的Watcher。而这个闭包中有`get`和`set`两个方法。

`get`用来增加Watcher。`set`用来判断新值是否与原来一样。若一样直接return不一样则通知所有的`watcher`

然后要将其绑定到data的每一个对象中。这时候，就需要用到` observer() `函数了

在具体实现的时候。每个VUE实例都会使用`render`。这个render会调用data的get方法。所以也就实现了`VUE实例(组件)`实现了一个Watcher。

>也就是为什么 Watcher 类的构造函数里面要执行 Dep.target = this; 的操作，也就是将 Dep.target 指向在当前 Vue实例中生成的 Watcher 对象；而我们留下的第二个问题，也就是为什么 dep.addSub(Dep.target); 添加的订阅者是 Dep.target, 其实也就是当前 Vue 实例中生成的 Watcher 对象。</br>
但是这时 data 中的每个属性的订阅者其实还没有添加，所以我们要跑一次 render function 来获取一次数据，也就是调用 data 每个属性的 get 方法。

#### Symbol()

>symbol 是一种基本数据类型 （primitive data type）。Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，*因为它不支持语法："new Symbol()"*。
<br>
每个从Symbol()返回的symbol值都是`唯一的`

首先每个symbol都是唯一的。值相等也没用。使用这一点可在多个库修改对象的key时。能解决其命名冲突的问题。

还有一个关键是`会暴露几个内建的成员对象`。所以他可以当做对象的key值。且这个key值一般是隐藏的。也就是传说中的私有属性。
其无法通过`Object.keys()`访问。但是可以通过`Reflect.ownKeys()`来访问到对象的key和value。

#### 再谈VNode

[参考链接](http://hcysun.me/vue-design/zh/vnode.html#%E7%94%A8-vnode-%E6%8F%8F%E8%BF%B0%E7%9C%9F%E5%AE%9E-dom)

Vnode有多重要。首先组件的产出是他。render渲染的也是他。
其所拥有的属性
>tag: 当前节点的标签名<br>
>data: 当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型<br>
>children: 当前节点的子节点，是一个数组<br>
>text: 当前节点的文本<br>
>elm: 当前虚拟节点对应的真实dom节点<br>
>ns: 当前节点的名字空间<br>
context: 当前节点的编译作用域<br>
functionalContext: 函数化组件作用域<br>
key: 节点的key属性，被当作节点的标志，用以优化<br>
componentOptions: 组件的option选项<br>
componentInstance: 当前节点对应的组件的实例<br>
parent: 当前节点的父节点<br>
raw: 简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false<br>
isStatic: 是否为静态节点<br>
isRootInsert: 是否作为跟节点插入<br>
isComment: 是否为注释节点<br>
isCloned: 是否为克隆节点<br>
isOnce: 是否有v-once指令<br>
那么什么叫做相等，或者说怎么来判断是否相等呢。


<br>
<br><br>
<div align=center>
    <img src="http://hcysun.me/vue-design/assets/img/vnode-types.7d99313d.png">
</div>
<div  align=center>
    <span  size = 5>VNode类型</span>
</div>

Fragment和Portal都是对抽象类型的渲染。首先对`Fragment`来做一定的解释。字面意思其是对片的一种渲染。比如许多`<td>`

##### Fragment

而又众所周知的是tag属性值是一种唯一标识。所以即使有多个根元素也不能写多个`<td>`。取而代之的是一种抽象类型Fragment。(举一个教程中的例子)

```
const Fragment = Symbol()
const fragmentVNode = {
    tag: Fragment,
    data: null,
    children:[
        {
            tag: 'td',
            data: null
        },
        {
            tag: 'td',
            data: null
        },
                {
            tag: 'td',
            data: null
        }
    ]
}
```

从上面的例子可以发现所有的td都被写在children中

##### Portal

>一句话：它允许你把内容渲染到任何地方。其应用场景是，假设你要实现一个蒙层组件 `<Overlay/>`，要求是该组件的 `z-index` 的层级最高，这样无论在哪里使用都希望它能够遮住全部内容，你可能会将其用在任何你需要蒙层的地方。

还是教程中的例子

```VUE
\\编写template模板是这么写的
<template>
  <Portal target="#app-root">
    <div class="overlay"></div>
  </Portal>
</template>
```

实际上他是将内容渲染到id为`app-root`的元素下

##### 注释类型

在HTML的DOM中注释通过`Comment`类型显示。
>`Comment`类型与`Text`类型继承自相同的基类，Comment类型是Text类型的`子类`，Comment对象具有除`splitText()`方法外的所有字符串操作方法。与Text类型一样，我们可以使用nodeValue或data属性获取注释的内容。

>一个Comment类型的节点具有以下特征：
+ nodeType值为8
+ nodeName值为"#comment"
+ nodeValue值是注释的内容
+ parentNode是一个Document或Element类型。*且这个父节点必须在`<html></html>`中*
+ 没有子节点

#### flag标记

`flag`是一种用来区别`VNode的类型`且是VUE2中优化虚拟DOM的方法。他是在VNode`创建时就表明类型`

那么如何去区别类型呢。再再再次使用教程中的原句

>比如在 Vue2 中区分 VNode 是 html 元素还是组件亦或是普通文本，是这样做的：
>1. 拿到 VNode 后先尝试把它当作组件去处理，如果成功地创建了组件，那说明该 VNode 就是组件的 VNode
>2. 如果没能成功地创建组件，则检查 vnode.tag 是否有定义，如果有定义则当作普通标签处理
>3. 如果 vnode.tag 没有定义则检查是否是注释节点
>4. 如果不是注释节点，则会把它当作文本节点对待

##### VNode的data属性

其有着诸如`class`,`style`,甚至是一些`事件`比如on等。

其是一种`AOT(运行前编译)`
~~终于可以递归回去了~~


## 视图的修改

>Vue通过数据绑定来修改视图，当某个数据被修改的时候，set方法会让闭包中的Dep调用notify通知所有订阅者Watcher，Watcher通过get方法执行vm._update(vm._render(), hydrating)。

而这个_update又会调用_patch_(补丁)来对新旧两个数进行比较。区别于react中的`采用先序深度优先遍历的`。VUE中的是逐层比较的。也就是`同层比较`的。

当`oldVnode`与`vnode`在`sameVnode`的时候才会进行`patchVnode`，也就是新旧VNode节点判定为同一节点的时候才会进行patchVnode这个过程，否则就是创建新的DOM，移除旧的DOM。

怎么样的节点算sameVnode呢？
>判断两个VNode节点是否是同一个节点，需要满足以下条件
  `key`相同
 ` tag`（当前节点的标签名）相同
  `isComment`（是否为注释节点）相同
  是否`data`（当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息）`都有定义`
  当标签是`<input>`的时候，type必须相同.

patchVNode的过程

>1. 如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），那么只需要替换`elm`以及`componentInstance`即可。
>2. 新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个`updateChildren`也是diff的核心。
>3. 如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。
>4. 当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。
>5.当新老节点都无子节点的时候，只是文本的替换。

`updateChildren`见[参考链接](https://github.com/answershuto/learnVue/blob/master/docs/VirtualDOM%E4%B8%8Ediff(Vue%E5%AE%9E%E7%8E%B0).MarkDown)

## TODO 静态节点VUE中的KEY到底干啥用。DOM操作