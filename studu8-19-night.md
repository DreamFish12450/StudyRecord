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

举个例子
```
$color: green;
@mixin button($color: #fff){
    color: $color;
    @content
    border: 1px solid $color;
}
.button-green{
    @include button{background: $color}
}

//其默认的参数为fff其又没有传参所以最后会渲染成//白色
//而background则会渲染成绿色
```

## compass

本人是将compass放到了vue中。所以也只讲几个我可能用到的模块

### normalize和reset

首先normalize是reset的升级。reset是将所有浏览器的`自带样式`给重置。而normalize则是尽量保留这些`默认样式`

>最主要的区别是Normalize.css保留不同浏览器同标签相同的默认值，只重置不同默认样式的差异，可以说css reset的高级版。

Normalize.css的目标

>1、 保留有用的浏览器默认样式，而不是一概将它们“抹杀”。
>2、normalize.css作用在范围更广的元素上面。
>3、修正了一些bug及主流浏览器在渲染上的不一致。
>4、提高了可用性。
>5、用更加详细的文档及注释来解释代码的含义。

### css3模块

个人感觉其主要的是为了浏览器的兼容。
比如一个需要一个 border-radius
```
@include border-radius(20px);
```
就能自动的渲染出其他浏览器的样式

### typography模块

感觉是为了更加方便点的编程

#### link

>Hover Link – Underline a link when you hover over it.
>Link Colors – Easy assignment of colors to link states.
>Unstyled Link – Make a link appear like regular text.

使用的话如下所示
```scss
        a{
            @include hover-link()
        }
```

#### list

>Bullets – Mixins for managing list bullets.
>Horizontal List – Float a list so it appears horizontally.
>Inline-Block List – set list-elements to inline-block so they appear horizontally while retaining their structure.
>Inline List – Style a list as inline text.

可能比较常用的就是`horizontal-list`来让列表变成一长条

#### text

>Ellipsis – Text truncation with ellipsis.隐藏
>Force Wrap – Wrap URLs and long lines of text.强制换行
>No Wrap – Remembering whether or not there's a hyphen in white-space is too hard.不换行使用的mixin时不加`-`比如@include nowrap()
>Text Replacement – Replace text with images.

### helper

可能会用到的一个功能。`inline-image()`

将图片转为`base64`标准

`image-url()`会根据ruby配置文件中生成对应的`cache-buster`（缓存克星）也就是自动生成一个类似于后缀的。

需要注意的是这两个都是function

调用的时候就是直接background-image: inline-image()

### utilities

#### table

常用的table样式
```scss
table{
    $table-color: #7a98c6;
    @include table-scaffolding //table的脚手架
    @ include inner-table-borders(1px, darken($table-color, 40%)) //内边框
    @ include outer-table-borders(2px) //外边框
    @ include alternating-rows-and-columns($even-row-color, $odd-row-color, $dark-intersection, $header-color: white, $footer-color: white)
}
```