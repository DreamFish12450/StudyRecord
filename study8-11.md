# 静态节点VUE中的KEY到底干啥用。DOM操作.

## 先讲DOM操作。

虚拟DOM到真实DOM的话。主要是通过虚拟DOM的钩子函数。VUE为平台提供了适配层。

## VUE中的key

首先从前面几篇中get到了vue中响应式更新时。判断的是否为同一个节点。有一个依据时根据key来判断。常见的v-for中就是用key来进行一个标记的。*同时一般在v-for中如果有元素的内容的变化一般不推荐用index作为key*。因为如果删除一个元素会导致后面所有的index都发生变化。都会再次进行渲染。

同时需要的注意的是VUE虽然是响应式更新的但如果一个obj未绑定进data（可能表述不太清楚，就是因为响应式更新归根结底监听的是`data的对象`。再通过`set`来判断是否一致）。同时如果其为数组的话VUE是无法监听到数组内容发生变化的。只能监听到那几个方法。在Vue.js中，对Array的变化侦测是通过拦截原型的方式实现的。也就通过对`push`，`pop`，`shift`，`unshift`，`splice`，`sort`，`reverse`，`fill`，`copyWithin`去改变数组自身内容的方法做拦截。
demo如下
```vue
//父组件
<template>
  <div id="app">
    <Button color="red" v-bind:sonArr="parnetArr">我是插槽的值</Button>
    <button @click="changeVal()">测试传递</button>
  </div>
</template>
export default {
  props: {
    text1: 'print prop'
  },
  name: 'App',
  components: {
    Button,
  },
  data () {
    return {
      parnetArr: [
        1, 2, 3, 4
      ]
    }
  },
  methods: {
    changeVal () {
      this.parnetArr.forEach((num, index) => {
        this.parnetArr[index] = this.parnetArr[index] + 2
        //解决方案用this.$set
        //this.$set(this.parentArr,index,this.parnetArr[index] + 2)
      })
      console.log(
        this.parnetArr
      )
      console.log(this.text1)
    }
  }
}
</script>

```
```
//子组件
<template>
  <button class="btn" :style="{color:color}" @click="greet()">
    <slot/> <!-- 插槽 -->
  </button>
</template>

<script>
import 'jquery'
export default {
  // 传入子组件的参数写到props
  props: {
    sonArr: {
      type: Array,
      default: () => { return [9, 8, 7, 6] }
    }
  },
  methods: {
    greet: function (event) {
      console.log(111)
      console.log(this.sonArr)
      // console.log($(this).text())
    }
  }
```
言归正传除了使用上面的`vm.$set`和`vm.$forceUpdate`之外还有其他的方法嘛。竟然在介绍key。那就是当我们想让这个组件重新渲染时其实只要修改他的key值就行了。而这个key值一般也绑定在他的`父组件`上

### 使子组件强制进行更新。讲到这个又不得不提一嘴父子组件

#### 父子组件的通信
[参考链接](https://juejin.im/post/6844903700243316749)
##### Prop的单向通信

`Prop可以实现父组件向子组件的单向通信`。也可以将他理解为存储变量的一个地方。那么我们又知道vue中的`data`也是用来存储数据的。两者有什么区别和特点呢。

>1. data中一般存放的是比较私有的数据，而prop则存放的是偏向公有的数据。即上面所述的父子通信也被存储在这里。一般来说都是父组件的data的值传到子组件的prop中<br>
>2. 两者都可以直接通过this.变量名来访问。举个例子

```javascript
export default{
    data(){
        return: {
            text1: 'String1'
        }
    },
    props: {
        text2: {
            type: String,
            default: ()=>{ return 'print prop' }
            //需要注意的是这个default是必须的否则会返回undefined
        }
    }
    methods: {
        print_val () {
            console.log(this.text1 + this.text2)
        }
    }
}
```
> 两者都可以直接通过this.text或者this.text2来访问。若两者命名冲突VUE是会提出警告的。

##### emit
先抄一波官方解释
>*触发当前实例上的事件。附加参数都会传给监听器回调*
个人感觉的话还是一个类似于监听他参数的那个事件。
举个例子
```html
//父组件
<div id="app">
  <my-button @greet="sayHi"></my-button>
</div>
```

```javascript
let MyButton = Vue.extend({
  template: '<button @click="triggerClick">click</button>',
  data () {
    return {
      greeting: 'vue.js!'
    }
  },
  methods: {
    triggerClick () {
      this.$emit('greet', this.greeting)
    }
  }
})

new Vue({
  el: '#app',
  components: {
    MyButton
  },
  methods: {
    sayHi (val) {
      alert('Hi, ' + val) // 'Hi, vue.js!'
    }
  }
})

```
当按钮点击时。会触发trggerClick()这个歌函数。这个函数又`派发（emit）`了greet事件。并且`触发`了他。而这个greet事件触发时又会执行一个函数。所以总结一下他是提早监听了greet
#### `$attrs` & `$listeners`

还是先来看官方文档(英文比中文好懂系列)
>`vm.$attrs`<br>
Contains parent-scope attribute bindings (except for class and style) that are not recognized (and extracted) as props. When a component doesn’t have any declared props, this essentially contains all parent-scope bindings (except for class and style), and can be passed down to an inner component via v-bind="$attrs" - useful when creating higher-order components.

来做一个简单的解释：里面包含着使用v-bind绑定的`attrs`。且这个attrs不能作为`prop`。同时可以通过`v-bind="$attrs`来往下传递。总之他是一个attr的容器。

>`vm.$listeners`<br>
Contains parent-scope v-on event listeners (without .native modifiers). This can be passed down to an inner component via v-on="$listeners" - useful when creating transparent wrapper components.

他是作为一个`v-on`事件的容器。且这个v-on没有`.native`修饰符。同时也可以通过`v-on = "$listeners"传递下去`

博客中还提到了很有意思的一点就是他最后添加到原生的html标签上。博客中也提出了相应的解决方法就是在子组件中添加`inheritAttrs:false`来使他不显示。


这里提一嘴v-bind来对变量进行`静态`或者`动态`的赋值。
```VUE
//动态赋值。这个post
<blog-post v-bind:title="post.title"></blog-post>
```

### VUE中的this

一般指向的是VUE实例。但需要注意使用箭头函数时指向的是其`声明时候的环境`(一般都是指向window)。
参考blog中的例子

```javascript
var x = 1;
var obj = {
     x:100
 };
 function getX() {
     console.log(this.x);
 }
 getX(); // 1
 getX = getX.bind(obj);
 getX(); // 100

```
```javascript
var x = 1;
var obj = {
     x:100
 };
getX = () =>{
    console.log(this.x)
}
 getX(); // 1
 getX = getX.bind(obj);
 getX(); // 1

```
比较一下上面的代码


## TODO V-BIND，组件的双向通信 slot vuex Jsx