<p align="center">
  <a href ="##"><img alt="Omi" src="http://images2015.cnblogs.com/blog/105416/201701/105416-20170120114244046-622856943.png"></a>
</p>

<p align="center">
Open and modern framework for building user interfaces.
</p>

---

## Omi���

* �����ʹ��Omi��ܣ����Ķ�  [Omiʹ���ĵ�](https://github.com/AlloyTeam/Omi/tree/master/docs#omiʹ���ĵ�)
* �����һ�𿪷�����Omi��ܣ��и��õĽ����������˼·�����Ķ�  [����һ��������web��������Omi](https://github.com/AlloyTeam/Omi/tree/master/docs#����һ��������web��������omi)
* �������Omi��ص��������[New issue](https://github.com/AlloyTeam/Omi/issues/new)
* �������ӷ���Ľ�������Omi��һ�п��Լ���QQ��Omi����Ⱥ(256426170):

![qq](./asset/omi_group.png)

## ��װ 

ͨ��npm��װOmi����ֻ��Ҫִ�����������:

``` js
npm install omi
```

## Hello World

�����ʹ��ES6+����ES5�ķ�ʽ��дOmi����������Web����

### Hello World with ES6+

�����ʹ�� [webpack](https://webpack.github.io/) ������ߣ�webpack������ģ�������һ����С�İ����Ż�����ʱ�䡣ʹ��[babel](http://babeljs.io/)��������������ʹ��ES6+����д���web������ֻ��Ҫ��webpack���õ�module���ú�[babel-loader](https://github.com/babel/babel-loader)��ɡ�

һ��Omi�ļ�̵�����������ʾ:

```js
import Omi from './omi.js';

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

������ɵ�HTML���ջ���뵽body�С����������չʾ��Omi�Ĳ�������:

- data����: new Hello(data,..)��data����ֱ���ṩ��render�������ģ��
- �ֲ�CSS: h1ֻ��render���h1��Ч��������Ⱦ�����h1
- ����ʽ�¼���: onclick���õľ�������ڵ�handleClick��this�����õ���Ȼ��DOMԪ��,�������õ���ǰ��event

�����ʹ��Omi.makeHTML�����������ǩ����Ƕ�ס�
```js
    Omi.makeHTML(Hello);
```
��ô��������������ʹ�ã���
```js
  ...
  render() {
        return  `
        <div>
            <div>Test</div>
            <Hello />
        </div>
        `;
    }
    ...
```


###  Hello World with ES5

��ȻOmiû������ES5���û��������ʹ��ES5�ķ�ʽ��дOmi���磬�����HTML������omi.js��

```html
<script src="omi.js"></script>
```

Ȼ��

```js
var Hello =  Omi.create("Hello", {
    style: function () {
        return "h1{ cursor:pointer }";
    },
    handleClick: function (dom) {
        alert(dom.innerHTML);
    },
    render: function () {
        return ' <div><h1 onclick="handleClick(this, event)">Hello ,{{name}}!</h1></div>';
    }
});

Omi.render(new Hello({ name : "Omi" }),"body");
```
��Ȼ������HTML����Ų����㻹����ʹ��AMD��CMD����CommonJS�ķ�ʽ����Omi������Ͳ���һһ�о١�

��Ҫע����ǣ���һ����������������Tag Name�ġ�������������ط�Ƕ�����������磺

```js
  ...
  render:function() {
        return  '<div>\
                    <div>Test</div>\
                    <Hello />\
                </div>';
    }
    ...
```

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.