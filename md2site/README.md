# [Md2site](http://alloyteam.github.io/omi/md2site/)

Md2site�ǻ���[Omi](https://github.com/AlloyTeam/omi)��һ��Markdownת��վ���ߣ�ʹ�ü򵥣����ɵ��ļ����ɣ�����ǿ��

## ��װʹ�� md2site

``` js
$ npm install md2site -g
$ md2site init your_project_name
$ cd your_project_name
$ npm run dev
$ npm run dist
```

### Hexo VS Md2site

|    | Hexo        | Md2site  |
| ------------- |:-------------:|:-----:|
| Markdown֧�� | ������| ������ |
| ��վ�ļ��ߴ�    | ������   |   ������ |
| �����Ѷ�  | ������| ������ |
| ���ο��� | ������     |   ������ |
| �������� | ������     |   ������ |
| ����ָ���и��� | ������    |   ������ |
| ������֧�� | ������    |   ������ |
| ��Ӧʽ | ������    |   ������ |

    ע:���Ǹ���ģ�����ԱȻ�ʤ��

# Md2site

Md2site is a fast, simple & powerful framework that can be used for transformation of markdown to website based on [Omi](https://github.com/AlloyTeam/omi).

### Installation
Prerequisites: Node.js (>=6.x), npm version 3+

```
$ npm install md2site -g
```

### Usage

```
$ md2site init                     // in current directory
```
or 
```
$ md2site init your_project_name   // in new directroy named project name
```

md2site will run 'npm install' to install dependencies.

### Write your markdown and preview

Write your markdowns and config the website in docs folder, you can run the command to preview the docs:

``` js
$ npm run dev
```

### Generate the website

``` js
$ npm run dist
```

### Hexo VS Md2site

|    | Hexo        | Md2site  |
| ------------- |:-------------:|:-----:|
| Markdown support | ������| ������ |
| File size of generated website | ������   |   ������ |
| Difficulty of getting started  | ������| ������ |
|  Secondary development | ������     |   ������ |
| Themes and plugins  | ������     |   ������ |
| Code specifies row highlight | ������    |   ������ |
| Multi language support | ������    |   ������ |
| Responsive | ������    |   ������ |

    Note: more stars mean win.