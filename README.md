﻿<p align="center">
  <a href ="##"><img alt="Omi" src="http://images2015.cnblogs.com/blog/105416/201701/105416-20170120114244046-622856943.png"></a>
</p>
<p align="center">
Open and modern framework for building user interfaces.
</p>
<p align="center">
  <a href="https://travis-ci.org/AlloyTeam/omi"><img src="https://travis-ci.org/AlloyTeam/omi.svg"></a>
</p>

---

## 中文 | [English](https://github.com/AlloyTeam/omi#中文--english-1)

* 如果想体验一下Omi框架，请[点击Omi Playground](http://alloyteam.github.io/omi/example/playground/)
* 如果想使用Omi框架，请阅读  [Omi使用文档](https://github.com/AlloyTeam/omi/tree/master/docs#omi使用文档)
* 如果想一起开发完善Omi框架，有更好的解决方案或者思路，请阅读  [从零一步步打造web组件化框架Omi](https://github.com/AlloyTeam/omi/tree/master/docs#从零一步步打造web组件化框架omi)
* 关于上面的两类文档，如果你想获得更佳的阅读体验，可以访问[Docs Website](http://alloyteam.github.io/omi/website/docs.html)
* 如果你懒得搭建项目脚手架，可以试试[Scaffolding for Omi](https://github.com/AlloyTeam/omi/tree/master/scaffolding)
* 如果你有Omi相关的问题可以[New issue](https://github.com/AlloyTeam/omi/issues/new)
* 如果想更加方便的交流关于Omi的一切可以加入QQ的Omi交流群(256426170)

<img alt="Omi" src="http://alloyteam.github.io/omi/asset/omi_group.png">

## 特性

* 超小的尺寸，7 kb (gzip)
* 良好的兼容性，支持IE8
* 完全面向对象的组件体系
* 局部CSS，HTML+ Scoped CSS + JS组成可复用的组件
* 更自由的更新，每个组件都有update方法，自由选择时机进行更新
* 模板引擎可替换，开发者可以重写Omi.template方法来使用任意模板引擎
* 提供了ES6+和ES5的两种开发方案供开发者自由选择

## 生态

* [omi-finger](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-finger) Omi的[AlloyFinger](https://github.com/AlloyTeam/AlloyFinger)插件，支持各种触摸事件和手势
* [omi-transform](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-transform) Omi的[transformjs](http://alloyteam.github.io/AlloyTouch/transformjs/)插件，快速方便地设置DOM的CSS3 Transform属性
* [omi-touch](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-touch) Omi的[AlloyTouch](https://github.com/AlloyTeam/AlloyTouch)插件，Omi项目的触摸运动解决方案（支持触摸滚动、旋转、翻页、选择等等）
* [omi-jquery-date-picker](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-jquery-date-picker) Omi的时间选择插件，支持各种时间或者时间区域选择

## 通过npm安装 

``` js
npm install omi
```

## Hello World

```js
class Hello extends Omi.Component {
    constructor(data) {
        super(data);
    }
    style () {
        return  `
            h1{
                cursor:pointer;
            }
         `;
    }
    handleClick(target, evt){
        alert(target.innerHTML);
    }
    render() {
        return  `
        <div>
            <h1 onclick="handleClick(this, event)">Hello ,{{name}}!</h1>
        </div>
        `;

    }
}

Omi.render(new Hello({ name : "Omi" }),"body");
```

[[点击这里->在线试试]](http://alloyteam.github.io/omi/website/redirect.html?type=hello)

如果使用omi.lite.js版本(不包含mustachejs模板引擎)的话，也可以[使用 ${this.data.name} 的方式](http://alloyteam.github.io/omi/website/redirect.html?type=without_tpl)。

你可以使用Omi.makeHTML来生成组件标签用于嵌套。
```js
    Omi.makeHTML('Hello', Hello);
```
那么你就在其他组件中使用，并且通过data-*的方式可以给组件传参，如：
```js
  ...
  render() {
        return  `
        <div>
            <div>Test</div>
            <Hello data-name="Omi" />
        </div>
        `;
    }
    ...
```

[[点击这里->在线试试]](http://alloyteam.github.io/omi/website/redirect.html?type=hello_nest)

你可以使用 [webpack](https://webpack.github.io/) + [babel](http://babeljs.io/)，在webpack配置的module设置[babel-loader](https://github.com/babel/babel-loader)，立马就能使用ES6+来编写你的web程序。

 当然Omi没有抛弃ES5的用户，你可以使用ES5的方式编写Omi。[[点击这里试试ES5写Omi程序]](http://alloyteam.github.io/omi/website/redirect.html?type=hello_es5)

## [﻿中文](https://github.com/AlloyTeam/omi#中文--english) | English

* If you want to experience the Omi framework, please click [Omi Playground](http://alloyteam.github.io/omi/example/playground/)
* If you want to use the Omi framework,please read [the Omi documentation](https://github.com/AlloyTeam/omi/tree/master/docs#omi使用文档)
* If you want to develop and improve the Omi framework, there are better solutions or ideas, please read [develop the Omi framework step by step](https://github.com/AlloyTeam/omi/tree/master/docs#从零一步步打造web组件化框架omi)
* If you want to get a better reading experience of the above two categories of documents, you can visit[Docs Website](http://alloyteam.github.io/omi/website/docs.html)
* If you are too lazy to build a project scaffolding, you can try [Scaffolding for Omi](https://github.com/AlloyTeam/omi/tree/master/scaffolding)
* If you have Any problems，please [New issue](https://github.com/AlloyTeam/omi/issues/new)
* If you want to be more convenient on the exchange of all Omi can join the QQ Omi exchange group (256426170)

## Fetures

* Super tiny size, 7 KB (gzip)
* Good compatibility, support IE8
* Fully object-oriented component system
* Support Scoped CSS, reusable components are composed of HTML， Scoped CSS and JS
* More free updates, each component has a update method, free to choose the right time to update
* Template engines can be replaced, developers can override the Omi.template method to use any template engine
* Provides two development way ( ES6+ and ES5) for developers to choose freely

## Plugins

* [omi-finger](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-finger) :  Omi /[AlloyFinger](https://github.com/AlloyTeam/AlloyFinger) integration.
* [omi-transform](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-transform) :  Omi /[transformjs](http://alloyteam.github.io/AlloyTouch/transformjs/) integration.
* [omi-touch](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-touch) :  Omi /[AlloyTouch](https://github.com/AlloyTeam/AlloyTouch) integration.
* [omi-jquery-date-picker](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-jquery-date-picker):  Omi / JQuery Date Picker integration.

## Install

``` js
npm install omi
```

## Hello World

```js
class Hello extends Omi.Component {
    constructor(data) {
        super(data);
    }
    style () {
        return  `
            h1{
                cursor:pointer;
            }
         `;
    }
    handleClick(target, evt){
        alert(target.innerHTML);
    }
    render() {
        return  `
        <div>
            <h1 onclick="handleClick(this, event)">Hello ,{{name}}!</h1>
        </div>
        `;

    }
}

Omi.render(new Hello({ name : "Omi" }),"body");
```

[[Try it on Playground]](http://alloyteam.github.io/omi/website/redirect.html?type=hello)

You can use Omi.makeHTML to generate component tags for nesting.
```js
    Omi.makeHTML('Hello', Hello);
```
Then you can use it in other components, and pass parameter to the component through the data-* , such as:
```js
  ...
  render() {
        return  `
        <div>
            <div>Test</div>
            <Hello data-name="Omi" />
        </div>
        `;
    }
    ...
```

[[Try it on Playground]](http://alloyteam.github.io/omi/website/redirect.html?type=hello_nest)

You can use [webpack](https://webpack.github.io/) + [babel](http://babeljs.io/)，configure the [babel-loader](https://github.com/babel/babel-loader) in  the module settings of webpack，then you can use ES6+ to write your web program.

Omi did not abandon the ES5 users, you can also use ES5 to write Omi.[[Try Omi-ES5 on Playground]](http://alloyteam.github.io/omi/website/redirect.html?type=hello_es5)

## Contributors

|name   |avatars   |company   | 
|---|---|---|
|  [xcatliu](https://github.com/xcatliu) |  ![](https://avatars3.githubusercontent.com/u/5453359?v=3&amp;s=60)  |  Microsoft |  
|  [Aresn](https://github.com/icarusion) |  ![](https://avatars3.githubusercontent.com/u/5370542?v=3&amp;s=60)  |  TalkingCoder |  
|  [pasturn](https://github.com/pasturn) |  ![](https://avatars2.githubusercontent.com/u/6126885?v=3&s=60)  | Mars Holding  |  
|  [dntzhang](https://github.com/dntzhang) | ![](https://avatars2.githubusercontent.com/u/7917954?v=3&s=60)  |  Tencent | 

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
