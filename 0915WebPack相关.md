## WebPack相关

### 打包的目的

减少HTTP请求数量，让页面加载和显示更快的在开发后完成合并就是**打包**，其实vue的build就是基于这个的。

`vue-cli`是基于`nodejs+webpack`封装的命令行工具。你可以理解为汇集了各种命令的 bash，或者bat。

用vue-cli执行build，实际上是webpack做的。原本需要自己配置webpack的相关配置，被cli简化了。并且按照vue的用户习惯整理了一套构建和目录规范。

## WebPack和Grunt以及Gulp相比有什么特性

Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack可以替代Gulp/Grunt类的工具。

Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。

以gulp为代表的传统打包最大的问题是解决不了按需打包，就更别说按需加载了，因为传统的打包思路是`遍历源文件 => 匹配规则 => 打包/处理`，也就是说只要被规则命中了，即便是程序用不到的模块也会被无脑打包，根本原因是**按需**这个事无法被规则描述，只能被程序逻辑描述。

webpack的打包思路就是从程序逻辑入手：`入口文件 => 分析代码 => 找出依赖 => 打包`，这样代码里不出现的模块就不可能被打进包里，甚至还可以实现按需加载，这就是webpack最有价值的地方。

### 总结一下

webpack其实是一个按序加载而gulp等传统则是看到啥加载啥。

webpack是基于入口的。而grant则是基于任务和流

## WebPack构建原理的

<img src="https://img.alicdn.com/tps/TB1GVGFNXXXXXaTapXXXXXXXXXX-4436-4244.jpg" alt="img" style="zoom:200%;" />

1. **初始化参数**：解析 Webpack 配置参数，合并 Shell 传入和 `webpack.config.js`

2. **开始编译**初始化注册所有配置的插件，插件监听 Webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 `run` 方法开始执行编译。

+ webpack **插件**是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 属性的 JavaScript 对象。`apply` 属性会被 webpack compiler 调用，并且 compiler 对象可在**整个**编译生命周期访问。
+ （这个时候已经开始监听文件是否产生变化了）在run之前
+ run之后构建一个complation.一是负责组织整个打包过程，包含了每个构建环节及输出环节所对应的方法，他也会包含所有的module

3. **确定入口**从配置文件（ `webpack.config.js` ）中指定的 `entry` 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去。

   + 这个就是一个make阶段。或者叫他addEntry

4. **编译模块**递归中根据**文件类型**和 **loader** 配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。

   大概分为两步一是根据模块的类型获取对应的模块工厂并创建模块，二是构建模块。

   + resolve部分负责解析loader模块的路径（例如css-loader这个loader的模块路径是什么）；
   + factory负责来基于resolve钩子的返回值来创建`NormalModule`实例。

5. **完成模块编译并输出**递归完后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据 `entry` 配置生成代码块 `chunk` 。

6. **输出完成**输出所有的 `chunk` 到文件系统。

### 一个Chunk是一些模块的封装单元。Chunk在构建完成就呈现为bundle。 

## 有哪些常见的Loader？他们是解决什么问题的？

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试。在打包后代码会挤在一排，变量名也会只剩下a,b,c、**sourcemap就是这样的一个将打包后的代码和原先代码连接起来的**
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
  + 负责加载CSS。
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
  + 负责将CSS挂载到页面上
- eslint-loader：通过 ESLint 检查 JavaScript 代码

### 总结一下loader

加载和解析非JS的文件。

### plugin插件

插件更多的是扩展webpack的功能。他是一个类主要是有一个**apply**方法。这个apply方法，这个方法的形参是一个**compiler**。且需要补充的是这个**apply方法**会被全局的webpack compiler所调用。然后这个compiler有暴露了很多的钩子

#### 有点忘了的钩子的概念

他是在系统的某个时刻会被自动调用，其函数名是被事先决定的。而开发者可以决定的函数体或者说一个回调。

#### 来看段代码

```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  // 构造器参数，用于传递options
  constructor(options) {
    console.log("current plugin option is" + JSON.stringify(options))
  }
  // apply 方法是一个插件所必须的
  apply(compiler) {
    // compiler 继承自 tapable
    // tapable  提供了多种 hooks  https://github.com/webpack/tapable#hook-types
    // run      是 AsyncSeriesHook实例 [tapable提供的多种hooks的一种]
      
    //compiler.hooks可以获取所有的钩子。run能够制定一个具体的构造和生命周期中的钩子类似
    //compilation只代表着当前的一个编译对象
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('webpack 构建过程开始！');
    });
  }
}
```

## compilation

它也具有compiler的同样的方法和特性。Compilation 模块会被 Compiler 用来创建新的编译（或新的构建）。Compiler可以理解为整个webpack生命周期都存在的编译[构建]对象，但是**Compliation只代表着某一次的编译[构建]对象。**

compilation对象包含了当前的模块资源，编译生成资源，变化的文件等。在开发模式下，当检测到一个文件变化，就有一个compilation被创建。compilation对象也提供了很多回调供plugin进行扩展，也可以通过compilation获取到compiler对象。

### 一些经常用的插件

### defineplugin

存储全局变量的插件。在

## hmr

热更新的插件，可以检测到所有的变化

### BabelMinifyWebpackPlugin

主要是用于一些由webpack模块生成的文件进行更新

### UglifyjsWebpackPlugin

是用来做混淆和优化代码的，可以选择那些代码进行优化

## 热更新的原理的一些简单分析

1. 启动本地服务

   1. 启动`webpack`，生成`compiler`实例。`compiler`上有很多方法，比如可以启动 `webpack` 所有**编译**工作，以及**监听**本地文件的变化。
   2. 使用`express`框架启动本地`server`，让浏览器可以请求本地的**静态资源**。

2. 获取`websocket`客户端代码路径，另一个是根据配置获取`webpack`热更新代码路径。

3. 然后在第一次的编译结束后就会执行`_sendStats`方法通过`websocket`给浏览器发送通知，`ok`和`hash`事件，这样浏览器就可以拿到最新的`hash`值了

4. 首先的话他也是一个观察者模式。`webpack-dev-middleware`会监听文件的变化

   + `webpack-dev-middleware`与`webpack-dev-server`后者只负责启动服务和一些前置的准备。而中间件会负责本地文件的编译和输出还有监听。
     1. 调用了`compiler.watch`方法。在这里会对文件进行重新的**编译**
     2. 执行setFs方法，将编译后的文件**打包到内存**中来获得更快的访问速度

5. 然后是会去监听webpack的编译结束。更2中的类似

6. 浏览器要接收到这个事件了

   热更新检查事件是调用`reloadApp`方法。比较奇怪的是，这个方法又利用`node.js`的`EventEmitter`，发出`webpackHotUpdate`消息。webpack`监听到了`webpackHotUpdate事件。**然后执行 moudle.hot.check**

7. 真正的热更新的准备阶段
   + 通过jsonp的形式获取更新的可以直接执行的代码

8. 使用hotapply来更新所有的模块
   + 删除过期的
   + 加薪的模块添加到modules中去
   + 通过__webpack_require__执行相关模块的代码

## VUE中的按需加载

一般都是通过现成的组件库中的一些插件。是在babelrc进行配置。

也就是说这些插件是用于转义代码时进行的。举个例子现在的antd和element-ui都有提供

```
{
  "plugins": [xxx,
    ["component", {
      libraryName: "antd",
      style: true,
    }, "antd"]
}
```

其实在用的时候就是一个按需导入，也就是通过花括号实现。

### .babelrc

除了删除的plugin的配置还有一个preset。这个就是告诉Babel要转换的源码使用了哪些新的语法特性（比如es6->es5他多了一个箭头函数的语法，所以要把他补进去)，presets是一组Plugins的集合。

最牛逼的应该就是一个`env`配置。根据目标环境选择不支持的新特性来将源代码转译成新的代码

```js
{
  "presets": ['env']
}
```

他也可以进行一些简单的配置