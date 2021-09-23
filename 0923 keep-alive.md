## keep-alive

首先的话他不会创造真的dom节点，他的render会先于被包裹的组件执行。此时去执行他的patch时会导致`vnode.componentInstance的值是undfined`这个时候啥也不会做，当再次访问的时候（指被包裹组件）。这个就已经有了这个缓存的实例。

### 创建步骤

第一步：获取keep-alive包裹着的第一个子组件对象及其组件名；
第二步：根据设定的黑白名单**（excludes）**（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步；
第三步：根据组件ID和tag生成缓存Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值**并更新该key在this.keys中的位置（更新key的位置是实现LRU置换策略的关键）**，否则执行第四步；
第四步：在this.cache对象中存储该组件实例并保存key值，之后检查缓存的实例数量是否超过max设置值，超过则根据LRU置换策略删除最近最久未使用的实例（即是下标为0的那个key）;
第五步：最后并且很重要，将该组件实例的keepAlive属性值设置为true。

### **router-view的key属性**

*这个key的作用:*

1. **不设置 router-view 的 key 属性**
   *由于 Vue 会复用相同组件, 即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子, 这时候你需要在路由组件中, 添加beforeRouteUpdate钩子来执行相关方法拉去数据
   相关钩子加载顺序为: beforeRouteUpdate*
2. ** 设置 router-view 的 key 属性值为 $route.path**
   从/page/1 => /page/2, 由于这两个路由的$route.path并不一样, 所以组件被强制不复用, 相关钩子加载顺序为:
   beforeRouteUpdate => created => mounted

从/page?id=1 => /page?id=2, 由于这两个路由的$route.path一样, 所以和没设置 key 属性一样, 会复用组件, 相关钩子加载顺序为:
beforeRouteUpdate
\3. **设置 router-view 的 key 属性值为 $route.fullPath**
从/page/1 => /page/2, 由于这两个路由的$route.fullPath并不一样, 所以组件被强制不复用, 相关钩子加载顺序为:
beforeRouteUpdate => created => mounted

从/page?id=1 => /page?id=2, 由于这两个路由的$route.fullPath并不一样, 所以组件被强制不复用, 相关钩子加载顺序为:
beforeRouteUpdate => created => mounted