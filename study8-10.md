# 主要是哈希环和树的结合

## 首先想到的应该是Merkle tree

Merkle tree经常被用在分布式系统中用来检验块是否正确。而且其是一种类似于二叉树的结构。所以不考虑他和哈希环的结合。

## 线段树

然后考虑时间的连续性。搜到了一种叫做线段树的树。其对于单点查询修改都是logn的时间复杂度。但是虽然说时间是连续的但是。具体表示让他连续起来也挺麻烦的。

线段树不同于一般的二叉树是其在查询方面有一个`lazy tag`的机制。这个lazy tag其实主要是在更新的时候不去直接更新叶子节点而是先去修改其`父节点`。当进行查询的时候再去更改他的子女节点的值。

当然这样设计有一定的弊端。
> 在更新时只能同时更新两个节点。应该是存在着改进方法的。

## B+树

搜到了一篇有关的论文[A Distributed Real-time Database Index Algorithm Based on B+ Tree and Consistent Hashing](https://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=SJES&dbname=SJES_01&filename=SJES07DA047306B646015B3145B0EA3989E6&v=MTEwMDJ1UVVyL1BKbGNTYm1LQ0dZQ0dRbGZCckxVOTU5bGh3TG04eGFBPU5pZk9mYk8vYXFETXE0aEdaTzE5Q25nL3p4Y1dtRHg4VEhxUXJHZEVlcnVjVE0rWkNKVWFGMQ==)

qqgg的中文版本[基于B+树和一致性Hash的分布式实时数据库索引算法](https://www.51wendang.com/doc/9fb3fc3ae17321da39fce835/1)。里面大概讲的是分布式实时数据库的一个索引。

大概的话就是底层索引是B+树，上层索引是哈希环。哈希环中的每一个TAG存储着TAG的ID(在这里时间也可以作为一个类似主键的值)。且在论文中的存储节点时尽可能少的来使其满足当一个存储节点崩塌是方便的将存储节点转移。

也就是其存储节点是没有区别的。就存储时没有实际意义这一点是可以改进的。

里面HASH算法也是简单使用了`MD5`。

每一个TAG POINT存储了`TAG ID`，`TAG NAME`和`B+树的索引位置`

相对而言的在B+树中则存储了开始和结束时间和为了其遍历方便而设置的prev和next。
查询过程大概如下

```flow
st=>start: Start
op=>operation: 开始查询
cond=>condition: 匹配到哈希环上的节点Yes or No?
op2=>operation: 根据节点中的索引去查找树
cond2=>condition: 开始时间和结束时间是否匹配
e=>end
st->op->cond

cond(yes)->op2
op2->cond2
cond(no)->op
cond2(yes)->e
cond2(no)->op
```
