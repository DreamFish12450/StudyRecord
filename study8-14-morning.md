# VUE的单向数据流

VUE中有个十分重要的概念就是单向数据流

那么这个`单向数据流`是什么呢。
>数据从父级组件传递给子组件，只能`单向`绑定。
子组件内部不能直接修改从父级传递过来的数据。

不能直接的意思就是有别的方法嘛

## 前置知识

## v-model
[参考链接](https://www.jianshu.com/p/4147d3ed2e60)
首先v-model它是一个双向绑定。更重要的是，他是一个语法糖。

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