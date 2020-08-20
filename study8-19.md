# 主要是开始了vuetify的学习

## yarn和npm

>1. npm主要使用的是串行的执行每个package.而yarn则是并行，所以从速度上来说他较快
>2. yarn的输出信息更为简洁

## vuex

先了解`what is  vuex`

>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，

把这个状态需要理解成一个state。而这个state。 可以理解成一种数据源。 一把也就是在`data`中存放的。

这个模式的话他是一个`pattern + library` 他是用来存储那些state的

### store和mutation

>每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：

>1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。也正因为store的特点导致组件或者实例其调用的其实时store的同一个变量

>2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation(改变)。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。


#### what is state
>As defined by FOLDOC, state is how something is; its `configuration`, `attributes`, `condition` or `information content`. We will use the term component to include software and hardware "things". Virtually all components have state, from applications to operating systems to network layers

举个类似官方的例子
```javascript
//store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({ //export是将其导出
  state:{
    count:0
  },
  mutations: { //关键
    increment (state) {
      state.count++
    }
  }
})

\\组件
<template>
  <v-btn @click="increment" outlined>{{this.$store.state.count}}</v-btn>
</template>

<script>
import  {store} from '../store'
export default {
  name: "testButton",
  store: store,
  methods: {
    increment(){
      this.$store.commit("increment") 提交这个改变这个increment指的是store中的mmutation
      // eslint-disable-next-line no-console
      console.log(this.$store.state.count)
    }
  }

}
</script>

<style scoped>

</style>

```

另一个重要的概念SSOT(单一数据源),`其实就是只在一个地方修改数据`

再回到`state`我们可以发现单纯的使用`this.$store.state.count`会比较麻烦。那么如何直接快速的使用count与this.$store.state.count相绑定呢。这个时候就要使用vuex的辅助函数`mapState`代码如下所示

再补充一个[箭头函数小抄](https://juejin.im/post/6844903911048871949)
```javascript
  computed: mapState({
    count: state => state.count //state是其形参返回的是state.count 将this.$store.state.count与count进行绑定
    //使用count: 'count'等价于上面这一种
  })
```