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

webpack其实是一个按序加载而gulp等传统则是看到啥加载啥

## WebPack构建原理

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