# slot Jsx

## JSX

jsx这个概念最早在react中提出。他是一种标签语法其主要是为了` We recommend using it with React to describe what the UI should look like.` 就是描述UI原本的样子。

>React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。

## slot

`具名插槽`：字面意思有名字的嘛。用vue2.6后的`v-slot`举个面包屑导航的例子。
```vue
//子组件
<template>
    <div>
      <span>
        <slot></slot>
      </span>
      <span>
        <slot name="bread"></slot>
      </span>
    </div>
</template>

<script>
export default {
  name: 'NavHeader'
}
```
```vue
    <NavHeader>
      <template v-slot:default>
        <a href="/">HOME/</a>
      </template>
      <template v-slot:bread>
        <a>leave</a>
      </template>
    </NavHeader>
```

首先要注意的一点是`v-slot`只能在template元素上使用。且需要注意的是没有名字的slot的默认名字是`default`。
