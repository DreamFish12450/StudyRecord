# scss与sass与compass


## scss和sass

`scss`和`sass`类似，其都是文件后缀名
不同的是sass采用的是没有花括号且采用空格缩进。回车换行。scss则和一般的css比较接近

## compass则作为一种框架去编译他

一般用到的就是compass watch命令去自动生成编译后的css

### scss的几个关键概念

一个是`变量`的概念
```
$ft-size: 15px;
body{
    font-size: $ft-size;
}
```

第二个是局部的scss文件。就比如说上面的变量就可以单独写在_variable.scss
只需要导入的时候使用`@import "variable"`

且需要注意的是在scss文件中全局的和局部的是不能重名的。对于上面一个例子， 也就是不存在variable.scss的文件

还有一个概念的话就是在css中常用的子代的那种渲染方式。比如要渲染body中的p需要采用以下的方式

```
//css写法
body p{
    color: red;
}
//scss写法
body{
    p{
        color: red;
    }
}
```

但需要注意的是当需要渲染的是类似与hover这种伪类则需要使用`&`运算符来显式的指出其所父类
```
a{
    &:hover{
        color: white
    }
}
```

css中 `.a.b`代表的是一个元素同时有这两个类

scss中还有一个比较好用的就是@extend`（继承）` 他可以让一个类含有另外一个类的样式。且他是可以多个继承的。
通过extend又可以讲到一个占位符`%`这个东西个人感觉的用处就是少生成一点css。也就是只有在继承的类中会被渲染。
其原来的类是不会出现的。

```
%a{
    color:red
}
.b{
    @extend %a
    //只有上面的color: red会出现在css文件中
}
```

然后又大概的再去瞅一瞅`@mixin`和`@include`的配合。[参考链接](https://www.sass.hk/skill/sass141.html)