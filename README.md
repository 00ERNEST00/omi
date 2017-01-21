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

## ͨ��npm��װ 

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
            <Hello data-name="{{name}}" />
        </div>
        `;
    }
    ...
```

�����ʹ�� [webpack](https://webpack.github.io/) ������ߣ�webpack������ģ�������һ����С�İ����Ż�����ʱ�䡣ʹ��[babel](http://babeljs.io/)��������������ʹ��ES6+����д���web������ֻ��Ҫ��webpack���õ�module���ú�[babel-loader](https://github.com/babel/babel-loader)��ɡ���ȻOmiû������ES5���û��������ʹ��ES5�ķ�ʽ��дOmi��������Կ�����[Hello World with ES5](https://github.com/AlloyTeam/Omi/blob/master/docs/cn_hello_world.md#hello-world-with-es5)

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.