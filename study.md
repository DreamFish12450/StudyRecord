
# Study of Vue

关于`组件`以及`路由`
</br>
想讲路由因为VUE是一个多组件构成的项目所以一般不能用传统的`<a></a>` 所以用了路由的方式来进行组件或者网页的跳转。个人感觉其实跟H5的`<frame>`有点类似。但有仔细想想。VUE区别于HTML可能就是不需要写很多的页面？仔细想想这句话好像又有瑕疵一般的VUE是`SPA`即单页面。区别于以前学的静态页面的跳转需要编写多个html文件SPA一般只有一个html文件。
</br>
&nbsp;&nbsp;&nbsp;&nbsp;那咋整呢。这里先记录下脑洞一种就是用MPA多个页面还有的话就是把组件类似与`<div>`框吧最外面的当做一个组件。

----------
## 关于HTML特性（attribute)和DOM的属性（property）

杂记一下：关于HTML特性（attribute)和DOM的属性（property）
<img src = https://picb.zhimg.com/80/v2-23ef58dab916f4d525f82f61b8b612f0_720w.jpg>
最简单的区分方式是HTML特性是直接写在HTML里面的。而DOM属性则是通过js来获取比如常用的`getElementById()`他返回的就是一个DOM对象。
</br>
&emsp;&emsp;当然最后是以DOM对象存储的所以HTML特性也会映射到DOM属性上去。而映射的一般都是标准化的比如id，value这种。getAttribute()这个方法就是用来获取特性的。且需要注意的是其不会区分大小写。
[参考链接](https://zhuanlan.zhihu.com/p/70671215)

----------
## 挂载
再讲回路由。路由注册好后最后一步是将他挂载到根实例上

```
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

等价于下面的代码

```
.$mount("#app")手动挂载，用来延迟挂载，跟
*  const app = new Vue({
*   el:"#app"
*   router
* });
```
</br>

那么对于我这个菜鸡而言挂载是什么呢。可以简单的将其理解为将DOM元素与VUE实例相绑定。这个时候又要`@神奇的VUE的生命周期了`

<div align=center>
    <img src="https://user-gold-cdn.xitu.io/2019/2/20/1690b0a7158c1cbd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">
</div>
<div  align=center>
    <span  size = 5>生命周期</span>
</div>

&emsp;&emsp;可以看到如果没有el必须调用`$mount`来挂载。</br>
&emsp;&emsp;同时从图中我们也可以一窥`el和template和render的优先级`显然render是大于template而template又是大于el的。</br>
&emsp;&emsp;那么render又是干啥的呢。翻译成中文其为`渲染`而这个渲染再对到生命周期中就是beforeMount和mounted~~虽然翻译过来又变成了挂载~~这个渲染主要做的其实就是`将template转换为Vnode`</br>
&emsp;&emsp;继续观察下面有一个用`vm.$el`来代替`el`那么这两个有啥差呢。这个el是一个DOM元素提供给VUE进行挂载，在挂载开始之前\$el不可见挂载结束后$el就代替了el。所以其指向的也是一个DOM元素。后面又讲到了一个关于虚拟DOM的节点。再来回顾一下DOM树的构建过程。
<div align=center>
    <img src="https://user-gold-cdn.xitu.io/2019/7/23/16c1e10922325215?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">
</div>
<div  align=center>
    <span  size = 5>生命周期</span>
</div>

 &emsp;&emsp;所有的浏览器渲染引擎工作流程大致分为5步：创建 `DOM` 树 —> 创建 `Style Rule`s -> 构建 `Render` 树 —> 布局 `Layout` —> 绘制 Painting。</br>
 &emsp;&emsp;众所周知JS去修改DOM节点主要花费在节点的定位上，而且每次都会重新渲染 。这个时候采用虚拟DOM这需要最后一次进行渲染。
</br>

----------

## Render

好了我们再次再次回归到原来的`render`。
render的主要函数是createElement()返回一个VNode(虚拟节点)<br>
[参考链接](https://juejin.im/post/6844903919764635655)

-----------

## 我们又回到了路由

需要注意的是一般一层路径对应一个router-view。router-view 来设置组件渲染的位置。</br>
Tips:这里我简单说明下`$router`和`$route`的区别:

\$router是指整个路由实例,你可以操控整个路由,通过'\$router.push'往其中添加任意的路由对象.</br>
\$route:是指当前路由实例(`$router`)跳转到的路由对象;
举一个自己写的路由的实例
path就是路径一般来说是对于router-link的 :to方法。component显然也就是组件。
```
  {
    path: '/page01',
    name: 'page01',
    component: page01,
    children: [
      {
        path: 'page01-a',
        name: 'page01A',
        component: page01A
      },
      {
        path: 'page01-b',
        name: 'page01B',
        component: page01B,
        children: [
          {
            path: 'end',
            name: 'pageEnd',
            component: pageEnd
          }
        ]
      }
    ]
  },
```

&emsp;&emsp;由于路由参数对组件实例是复用的.例如:/user/foo 和 /user/bar在使用路由参数时,复用的都是User组件.此时组件的生命周期钩子不会再被调用。如果你想路径切换时,进行一些初始化操作时,可以用一个叫做导航守卫的东西。
</br>瞅瞅官方的解释
```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    //但是可以通过VM实例
    next(vm =>{
        //来访问组件实例
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

## 钩子

再瞅一瞅他的大概的流程还是来自官方。这里的next是一个钩子且必须要去实现它。好了钩子是啥。</br>
`钩子`可以理解为官方提供给你的一个待实现的入口。比如常见的onclick（）。讲到钩子不得不讲到他的CP`回调函数`两者都是为了捕获别人的消息而生的。回调函数最常用的就是listener。对于这个listener。当其捕获过程结束后马上执行。而钩子则是一捕获到就开始按顺序一个个执行。

## 完整的导航解析流程（来自官方）

1.导航被触发。</br>
2.在失活的组件里调用 beforeRouteLeave 守卫。</br>
3.调用全局的 beforeEach 守卫。</br>
4.在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。</br>
5.在路由配置里调用 beforeEnter。</br>
6.解析异步路由组件。</br>
7.在被激活的组件里调用 beforeRouteEnter。</br>
8.调用全局的 beforeResolve 守卫 (2.5+)。</br>
9.导航被确认。</br>
10.调用全局的 afterEach 钩子。</br>
11.触发 DOM 更新。</br>
12.用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。</br>

## 编程式导航

什么是编程式导航,编程式导航就是在vue组件内部通过`this.$route`r访问路由实例,并通过`this.$router.push()`导航到不同的url,进行路由映射,所以 它的作用是和`<router-link :to>`是一毛一样的! 当然,前提是你已经在routes里配置了对应的路由对象.
一般什么时候用到编程式导航?</br>
如果,你想在路由跳转前做点其他事情,例如权限验证，登录验证等.但是用<router-link>的话,就直接跳转了.此时就可以使用编程式导航!</br>
这个push里面的参数又有一定的说法了</br>

```
//字符串
this.$router.push('home')

//对象
this.$router.push({path:'home'})

//命名路由
this.$router.push({name:'user',params:{userId:2333}})
//上面那个命名路由还有需要注意的就是params不能和path并存所以叫他命名路由

//带查询参数,变成/register?plan=private
this.$router.push({path:'register',query:{plan:'private'}})

```

## router的replace

和push类似但是其实直接替换浏览器的记录。

## router.go(n)

为-1的时候就是后退。n的话就是前进如果大于记录是不会报错的所以官方称他默默的错误。0为刷新。</br>
讲到刷新又可以将params和query的区别</br>
 params参数都不会显示在url地址栏中.除了在路由中通过routes进行配置的.所以用户刷新页面后,params参数就会丢失!
query参数可以正常显示在url地址栏中.刷新页面后也不会丢失

## 重定向

重定向其实就是通过路由.拦截path,然后替换url跳转到redirect所指定的路由上. 重定向是通过 routes 配置来完成，</br>

```
//举一个根据请求参数重定向的例子
//甚至是一个方法，动态返回重定向目标：
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
	  const { hash, params, query } = to
	  //这里使用了ES6的解构写法,分别对应了to的hash模式,params,query参数.这里解构就不具体说明了.
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
    }}
  ]
})

```

准备休息
TODO: 组件的传参和懒加载
[参考资料](https://juejin.im/post/6844903665388486664)