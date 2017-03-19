# Omi TodoMVC

---

## ���� | [English](https://github.com/AlloyTeam/omi#����--english-1)

* ���������һ��Omi��ܣ����Է��� [Omi Playground](http://alloyteam.github.io/omi/example/playground/)
* �����ʹ��Omi��ܻ��߿�������Omi��ܣ����Է��� [Omiʹ���ĵ�](https://github.com/AlloyTeam/omi/tree/master/docs#omiʹ���ĵ�)
* ��������ø��ѵ��Ķ����飬���Է��� [Docs Website](http://alloyteam.github.io/omi/website/docs.html)
* ��������ô��Ŀ���ּܣ��������� [omi-cli](https://github.com/AlloyTeam/omi/tree/master/cli)
* �������Omi��ص�������� [New issue](https://github.com/AlloyTeam/omi/issues/new)
* �������ӷ���Ľ�������Omi��һ�п��Լ���QQ��Omi����Ⱥ(256426170)

<img alt="Omi" src="http://alloyteam.github.io/omi/asset/omi_group.png">

## ������

``` js
$ npm install omi-cli -g       //��װcli
$ omi init your_project_name   //��ʼ����Ŀ����Ҳ������һ���յ��ļ�����ִ�� omi init
$ cd your_project_name         //��������ڿ��ļ�����ִ�е� omi init����������������
$ npm run dev                  //����
$ npm run dist                 //���𷢲�
``` 

## ����

* ��С�ĳߴ磬7 kb (gzip)
* ���õļ����ԣ�֧��IE8 ������������es5-shim��es5-sham��
* ��ȫ�������������ϵ
* �ֲ�CSS��HTML+ Scoped CSS + JS��ɿɸ��õ����
* �����ɵĸ��£�ÿ���������update����������ѡ��ʱ�����и���
* ģ��������滻�������߿�����дOmi.template������ʹ������ģ������
* �ṩ��ES6+��ES5�����ֿ�������������������ѡ��

## ��̬

* [omi-finger](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-finger) Omi��[AlloyFinger](https://github.com/AlloyTeam/AlloyFinger)�����֧�ָ��ִ����¼�������
* [omi-transform](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-transform) Omi��[transformjs](http://alloyteam.github.io/AlloyTouch/transformjs/)��������ٷ��������DOM��CSS3 Transform����
* [omi-touch](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-touch) Omi��[AlloyTouch](https://github.com/AlloyTeam/AlloyTouch)�����Omi��Ŀ�Ĵ����˶����������֧�ִ�����������ת����ҳ��ѡ��ȵȣ�
* [omi-jquery-date-picker](https://github.com/AlloyTeam/omi/tree/master/plugins/omi-jquery-date-picker) Omi��ʱ��ѡ������֧�ָ���ʱ�����ʱ������ѡ��

## ͨ��npm��װ 

``` js
$ npm install omi
```

## Hello World

�����ʹ�� [webpack](https://webpack.github.io/) + [babel](http://babeljs.io/)����webpack���õ�module����[babel-loader](https://github.com/babel/babel-loader)���������ʹ��ES6+����д���web����

* [[Hello World ES6+ ->��������]](http://alloyteam.github.io/omi/website/redirect.html?type=hello_nest)
* [[Hello World ES5  ->��������]](http://alloyteam.github.io/omi/website/redirect.html?type=hello_es5)

���ʹ��omi.lite.js�汾(������[mustache.js](https://github.com/janl/mustache.js)ģ������)�Ļ���Ҳ����[ʹ�� ${this.data.name} �ķ�ʽ](http://alloyteam.github.io/omi/website/redirect.html?type=without_tpl)��

## CDN

* [https://unpkg.com/omi@0.4.5/dist/omi.min.js](https://unpkg.com/omi@0.4.5/dist/omi.min.js)
* [https://unpkg.com/omi@0.4.5/dist/omi.js](https://unpkg.com/omi@0.4.5/dist/omi.js)
* [https://unpkg.com/omi@0.4.5/dist/omi.lite.min.js](https://unpkg.com/omi@0.4.5/dist/omi.lite.min.js)
* [https://unpkg.com/omi@0.4.5/dist/omi.lite.js](https://unpkg.com/omi@0.4.5/dist/omi.lite.js)

## [?����](https://github.com/AlloyTeam/omi#����--english) | English

* If you want to experience the Omi framework, you can visit [Omi Playground](http://alloyteam.github.io/omi/example/playground/)
* If you want to use the Omi framework or develop and improve omi framework, please read [the Omi documentation](https://github.com/AlloyTeam/omi/tree/master/docs#omiʹ���ĵ�)
* If you want to get a better reading experience of the documents, you can visit [Docs Website](http://alloyteam.github.io/omi/website/docs.html)
* If you are too lazy to build a project scaffolding, you can try [omi-cli](https://github.com/AlloyTeam/omi/tree/master/cli)
* If you have Any problems��please [New issue](https://github.com/AlloyTeam/omi/issues/new)
* If you want to be more convenient on the exchange of all Omi can join the QQ Omi exchange group (256426170)

## omi-cli

``` js
$ npm install omi-cli -g       //install cli
$ omi init your_project_name   //init project, you can also exec 'omi init' in an empty folder
$ cd your_project_name         //please ignore this command if you executed 'omi init' in an empty folder
$ npm run dev                  //develop
$ npm run dist                 //release
``` 

## Fetures

* Super tiny size, 7 KB (gzip)
* Good compatibility, support IE8 (please import es5-shim or es5-sham by yourself)
* Fully object-oriented component system
* Support Scoped CSS, reusable components are composed of HTML�� Scoped CSS and JS
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
$ npm install omi
```

## Hello World


You can use [webpack](https://webpack.github.io/) + [babel](http://babeljs.io/)��configure the [babel-loader](https://github.com/babel/babel-loader) in  the module settings of webpack��then you can use ES6+ to write your web program.

* [[Hello World ES6+ ->Try it on Playground]](http://alloyteam.github.io/omi/website/redirect.html?type=hello_nest)
* [[Hello World ES5  ->Try it on Playground]](http://alloyteam.github.io/omi/website/redirect.html?type=hello_es5)

if using 'omi.lite.js' (without [mustache.js](https://github.com/janl/mustache.js))��you can [use the ${this.data.name} way](http://alloyteam.github.io/omi/website/redirect.html?type=without_tpl)��

## CDN

* [https://unpkg.com/omi@0.4.5/dist/omi.min.js](https://unpkg.com/omi@0.4.5/dist/omi.min.js)
* [https://unpkg.com/omi@0.4.5/dist/omi.js](https://unpkg.com/omi@0.4.5/dist/omi.js)
* [https://unpkg.com/omi@0.4.5/dist/omi.lite.min.js](https://unpkg.com/omi@0.4.5/dist/omi.lite.min.js)
* [https://unpkg.com/omi@0.4.5/dist/omi.lite.js](https://unpkg.com/omi@0.4.5/dist/omi.lite.js)

## Contributors

|name   |avatars   |company   | 
|---|---|---|
|  [CodeFalling](https://github.com/CodeFalling) |  ![](https://avatars3.githubusercontent.com/u/5436704?v=3&s=60)  |  alibaba |  
|  [abell123456](https://github.com/abell123456) |  ![](https://avatars1.githubusercontent.com/u/2232380?v=3&s=60)  |  alibaba |  
|  [Aresn](https://github.com/icarusion) |  ![](https://avatars3.githubusercontent.com/u/5370542?v=3&s=60)  |  TalkingCoder |  
|  [pasturn](https://github.com/pasturn) |  ![](https://avatars2.githubusercontent.com/u/6126885?v=3&s=60)  | Mars Holding  |  
|  [vorshen](https://github.com/vorshen) | ![](https://avatars2.githubusercontent.com/u/10334783?v=3&s=60)  |  Tencent | 
|  [dntzhang](https://github.com/dntzhang) | ![](https://avatars2.githubusercontent.com/u/7917954?v=3&s=60)  |  Tencent | 
|  [xcatliu](https://github.com/xcatliu) |  ![](https://avatars3.githubusercontent.com/u/5453359?v=3&s=60)  |  Microsoft |  

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.