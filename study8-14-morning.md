# VUE的单向数据流

VUE中有个十分重要的概念就是单向数据流

那么这个`单向数据流`是什么呢。
>数据从父级组件传递给子组件，只能`单向`绑定。
子组件内部不能直接修改从父级传递过来的数据。

不能直接的意思就是有别的方法嘛

## 前置知识

`...`剩余参数这个es6的语法糖
顾名思义他表示的是剩余的参数

## v-model
[参考链接](https://www.jianshu.com/p/4147d3ed2e60)
首先v-model它是一个双向绑定。更重要的是，他是一个语法糖。
直接上一个[MDN连接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)

```vue
<input v-model="price">
// 等价于
<input :value="price" @input="price = $event.target.value">
```

来分析一下首先他将`price`绑定到了一个叫value的属性。又注册了一个`oninput`的事件。这个事件又处理了将这个时间的对象的值赋值给price。而父组件可以直接使用这个price。

再举个关于Input的例子
```vue
// 父组件
<template>
<div id="demo">
  <currency-input v-model="price"></currentcy-input>
  <span>{{price}}</span>
</div>
</template>

<script>
export default {
  data() {
    return {
      price: 100,
    }
  }
}
</script>

// 子组件 currency-input
<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
   <!--为什么这里把 'input' 作为触发事件的事件名？`input` 在哪定义的？-->
   <!--emit的作用是触发input事件。并将其值传递给watch-->
</template>

<script>
export default {
  props: {
    value: String,  // 为什么这里要定义 value 属性，父组件貌似没有给子组件传递 value 啊？
 //   <!--实际上父组件的price属性已经被解析成value的属性-->
  }
}
</script>

```

在补充一下。
### 自定义的属性名和事件一般用于组件上。

```VUE
<my-button v-model="number"></my-button>
//切记number要初始化
//子组件
<template>
    <button @click="add"></button>
</template>
<script>
export default{
    model: {
        prop: num,
        event: addNum
    }
    props: {
        num:{
            type:Number
            default: () => { return 0}
        }
    }
    methods: {
        add() {
            this.$emit('addNum', this.num+1)
        }
    }
}
</script>
```
上面一段代码实质监听的是click事件。 当这个事件指向时又会触发addNum这个时间。这个时间将`this.num+1`穿给了watch

### checkbox中的v-model


1.初始化值为数组类型：此时v-model绑定的是元素的`value`属性

2.初始化值为其它类型 ：此时v-model绑定的是元素的`checked属性`，此时它会将其他类型的初始值（字符串，数字等）转化为布尔类型渲染到页面上、

## 睡觉前又想到了导航栏如果现实多个页面

给出两种解决方案。一种就是的话通过vue的`路由`来切换显示的组件。但是可能其中会有组件嵌套

另一种则是通过`v-show`或者动态的添加`display: none`。但是其在历史记录上就不会那么优秀。因为都是同一个网页。

又搜到了一个比较有趣的点就是。如果要监听一个输入框。监听他是否有值在根据是否有值。显示一个或两个框

都叫监听了吗这里就用`watch`

代码如下

```vue
<template>
  <div>
  <input type="text" v-model="flagVal">
  <button >一直显示</button>
  <button v-show="showFlag">控制是否显示</button>
  </div>
</template>

<script>
export default{
     data() {
                return {
                    flagVal: null,
                    showFlag: false
                }
            },
  watch: {
    flagVal(val){
      console.log(val)
      if(val){
        this.showFlag = true
      }
    }
    //这里其实是注册了一个handler
  }
}
</script>
```

### `more about watch`

watch主要是在监听是否改变。当最初绑定是是否并不会执行这个是候他就有一个叫做`immediate: true`的属性来控制。

同时也有一个`deep`属性。`名字叫做深度监听`。我们又知道vue中对于数组和对象的监听是不能检测到其改变的。就是在set的时候不行。而这个`deep`属性解决了这一点

>deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改obj里面任何一个属性都会触发这个监听器里的 `handler`。

同时其也有一种代替就是直接监听`对象的属性的字符串形式`

举个例子：
```vue
template>
    <div>
      <p>obj.a: {{obj.a}}</p>
      <p>obj.a: <input type="text" v-model="obj.a"></p>
    </div>
</template>

<script>
export default {
  name: 'testDemo',
  data () {
    return {
      obj: {
        a: '1'
      }
    }
  },
  watch: {
    'obj.a': {
      handler (newName, oldName) {
        console.log('obj.a changed')
      },
      immediate: true
      // deep: true
    }
  }
}
</script>

```

#### 这里又有一个很奇怪的知识点就是字符串形式的方法.

因为百度不到所以这里讲一个我接触到的点。就是这种方法可以实现简单的`赋值`

```
<button @click="a=3"></button>
```

当然这个watch在切换组件是是要进行`注销`的。来防止其内存溢出。

那么如何对他进行注销呢。
```vue
let unwatch = app.$watch('obj.a', (newName, oldName) => {
  console.log(111)
})
//app是一个VUE实例。$watch是一个api。
unwatch()
//直接掉用unwatch就可以注销他
```
### 讲到watch又不得不讲下他的好朋友计算属性computed

computed的优势在于缓存。也就是当值不变化时其不会再次执行函数
官方解释
>我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的`响应式依赖`进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要` message` 还没有发生改变，多次访问` reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

同时需要注意的是跟`watch`很像的是他的第一个缺省的函数会被认作get。且需要注意这个get一定要`return`一个值

举个例子

```

computed: {
  ChangeVal: function(){
    console.log(111)
    return 222
  }
}
```

这个`get`函数一般在值发生改变时被执行。与get相对应的当然是`set`。
这个是在模板内进行`赋值`是就会调用的。

再来举个例子。

```vue
<script>
export default{
    name: test,
    data () {
        return{
            val:2222
        }
    }
    computed: {
        val: {
            set(){
                console.log('i am setting the val')
            }
        }
    }
    mounted(){
        this.val = 778
    }
}
</script>
```

同时需要注意的是这个`computed`也有一个关闭缓存的属性。即把computed的`cache`设置为false。

同时其在v-for中还可以起一个过滤器的作用

```vue
</template>
      <h4>测试</h4>
      <div>
        <ul>
          <li v-for="n in evenNumbers" :key="n">{{n}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'testDemo',
  data () {
    return {
      numbers: [ 1, 2, 3, 4, 5 ]
    }
  },
  computed: {
    evenNumbers () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  //  filter的目的是创建一个新数组
  }
}
</script>
```