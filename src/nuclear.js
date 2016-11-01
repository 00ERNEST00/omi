﻿Nuclear.create = function (obj, setting) {
    obj._nuclearSetting = setting||{};
    Nuclear._mixObj(obj);
    var currentEvn = this === Nuclear ? Nuclear.Class : this;
    var component = currentEvn.extend(obj);
    component.create = Nuclear.create;
    return component;
};

Nuclear._mixObj = function (obj) {
    obj.ctor = function (option, selector) {

        this._nuclearTwoWay = true;
        this._nuclearDiffDom = true;
        this._nuclearServerRender = this._nuclearSetting.server;
        //close two way binding by default in node evn
        if (this._nuclearSetting.twoWay === false||this._nuclearServerRender) {
            this._nuclearTwoWay = false;
        }
        if (this._nuclearSetting.diff === false) {
            this._nuclearDiffDom = false;
        }
        this._nuclearReRender= (typeof option === 'string');

        if(this._nuclearReRender) {
            this.parentNode = document.querySelector(option);
            this._ncInstanceId = this.parentNode.firstChild.getAttribute('data-nuclearId');
            this._nuclearOption = JSON.parse(this.parentNode.querySelector("input[name=__nuclear_option_"+this._ncInstanceId+"]").value);
        }else if(this._nuclearServerRender) {
            this._ncInstanceId = Nuclear.getServerInstanceId();
            this._nuclearOption = option;
        }else {
            this._ncInstanceId = Nuclear.getInstanceId();
            this._nuclearOption = option;
        }
        if(Nuclear.ie<9){
            this._nuclearDiffDom = false;
        }
        //加window防止构建到webpack中，Nuclear是局部而非全局
        window.Nuclear.instances[this._ncInstanceId] = this;
        this._nuclearParentEmpty = !selector;
        this.HTML = "";

        if(!(Nuclear.ie<9)) {
            Object.defineProperty(this, 'option', {
                get: function () {
                    return this._nuclearOption;
                },
                set: function (value) {
                    var old = this._nuclearOption;
                    if (old !== value) {
                        this._nuclearOption = value;

                        if (this._nuclearRenderInfo) {
                            this.onOptionChange && this.onOptionChange('_nuclearOption', value, old, '');
                            this._nuclearObserver();
                            this._nuclearRenderInfo.data = this.option;
                            this.refresh();
                        }

                    }
                }
            });
        }else{
            this.option=this._nuclearOption;
        }
        this.option['@item']=function(){

            return JSON.stringify(this);
        }
        if(!this._nuclearReRender) {
            if (!this._nuclearParentEmpty) {
                this.parentNode = typeof selector === "string" ? document.querySelector(selector) : selector;
            } else {
                this.parentNode = document.createElement("div");
            }
        }
        if (this.install) {
            this.install();
        }
        this._nuclearRef = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                //这里判断是否依赖其他nuclear组件，依赖的话记录下来
                if (this[key] && this[key]["_isNuclearComponent"]) {
                    this[key]._nuclearParent = this;
                    this._nuclearRef.push(this[key]);
                }
            }
        }

        this._nuclearFixNestingChild(this);

        this._nuclearTimer = null;
        this._preNuclearTime = new Date();
        this._nuclearObserver();

        this._nuclearRenderInfo = {
            data: this.option,
            parent: this.parentNode
        };
        this._nuclearRender();
        if (this.installed&&arguments.length>1) this.installed();
    };

    obj._nuclearFixNestingChild = function(child){
        child._ncChildrenMapping = [];
        var tpl = child._nuclearTplGenerator();
        if(tpl){
            var arr = tpl.match(/<child[^>][\s\S]*?nc-constructor=['|"](\S*)['|"][\s\S]*?>[\s\S]*?<\/child>/g);
            if(arr) {
                var len = arr.length;
                child.children = [];
                var i = 0;
                for (; i < len; i++) {
                    var matchStr = arr[i];
                    matchStr.match(/nc-constructor=['|"](\S*)['|"]/g);
                    var ChildClass = child._getClassFromString(RegExp.$1);
                    if (!child.childrenOptions) throw "you must define the [childrenOptions] property in the parent node's install function";
                    if (!ChildClass) throw "Can't find Class called [" + RegExp.$1+"]";
                    var sub_child = new ChildClass( child.childrenOptions[i]||{});
                    child.children.push(sub_child);
                    matchStr.match(/nc-name=['|"](\S*)['|"]/g);
                    if(RegExp.$1){
                        child[RegExp.$1] = sub_child;
                    }
                    child._ncChildrenMapping.push({tpl: matchStr,child:sub_child});
                    child._nuclearRef.push(sub_child);
                    //child._nuclearFixNestingChild(sub_child);
                }
            }
        }
    }

    obj._getClassFromString = function(str){
        if(str.indexOf('.')!==0){
            var arr = str.split('.');
            var i= 1,len=arr.length;current = window[arr[0]];
            for(;i<len;i++){
                current = current[arr[i]];
            }
            return current;
        }else{
            return window[str];
        }

    }

    obj._nuclearObserver = function () {
        if (this.option && this._nuclearTwoWay&&!(Nuclear.ie<9)) {
            Nuclear.observe(this.option, function (prop, value, oldValue, path) {
                if (!this.onOptionChange || (this.onOptionChange && this.onOptionChange(prop, value, oldValue, path) !== false)) {
                    this._nuclearRender();
                    //clearTimeout(this._nuclearTimer);
                    //if (new Date() - this._preNuclearTime > 40) {
                    //    this._nuclearRender();
                    //    this._preNuclearTime = new Date();
                    //} else {
                    //    this._nuclearTimer = setTimeout(function () {
                    //        this._nuclearRender();
                    //    }.bind(this), 40);
                    //}
                }
            }.bind(this));
        }
    }

    obj.refresh = function () {
        this._nuclearRender();
    };

    obj.setNuclearContainer = function(selector){
        this.parentNode = typeof selector === "string" ? document.querySelector(selector) : selector;
        this._nuclearRenderInfo.parent = this.parentNode;
        if(document.body === this.parentNode) {
            this.parentNode.insertAdjacentHTML('beforeend',this.HTML);
        }else{
            this.parentNode.innerHTML = this.HTML;
        }
        this.node = this.parentNode.lastChild;
        this._mixNode();
    }

    //加if防止子类赋值undefined，丢失父类方法
    if (obj.render) {
        obj._nuclearTplGenerator = obj.render;
    }

    obj.render = function () {
        if (this._nuclearParentEmpty) {
             return this._nuclearFixNesting(this.HTML);
            //var len=this._nuclearRef.length;
            ////嵌套的render逻辑        
            ////子节点下再无子节点
            //if (len === 0) {
            //    return this.HTML;
            //} else {//子节点下又有子节点
            //    var i=0;
            //    for (; i < len; i++) {
            //        var ref = this._nuclearRef[i];
            //        return ref.render();
            //    }
            //}
        } else {
            return this._nuclearTplGenerator();
        }
    };

    //obj._nuclearSetStyleData=function() {
    //    var styles = this.node.querySelectorAll('style');
    //    var i = 0, len = styles.length;
    //    for (; i < len; i++) {
    //        var style = styles[i];
    //        style.setAttribute('data-nuclearId', this._ncInstanceId);
    //        var cssText = Nuclear.scoper(style.innerHTML, "#nuclear-scoper-" + this._ncInstanceId);
    //        style.innerHTML = '';
    //        if (style.styleSheet) {
    //            style.styleSheet.cssText = cssText;
    //        } else {
    //            style.appendChild(document.createTextNode(cssText));
    //        }
    //    }
    //}
    obj._nuclearFixNesting = function(tpl){
        var len = this._ncChildrenMapping.length;

        if(len>0){
            var i = 0;
            for(;i<len;i++){
                tpl=tpl.replace(this._ncChildrenMapping[i]["tpl"],this._ncChildrenMapping[i]["child"].render());
            }
        }
        return tpl;
    }

    obj._nuclearRender = function () {
        var item = this._nuclearRenderInfo;
        item.tpl = this._nuclearTplGenerator();

        item.tpl = this._nuclearFixNesting(item.tpl);

        if (this.style) {
            var ele = document.getElementById('nuclear_style_' + this._ncInstanceId);
            ele && document.getElementsByTagName('head')[0].removeChild(ele);

            Nuclear.addStyle(this.style(), "nuclear_style_" + this._ncInstanceId);
        }

        if (this.node) {
            //this.node.parentNode&&this.node.parentNode.removeChild(this.node);
            // item.parent.removeChild(this.node);      
            if (Nuclear.isUndefined(item.tpl)) {
                item.parent.removeChild(this.node);
                this.node = null;
                this.HTML = "";
            } else {
                if (this._nuclearDiffDom) {
                    Nuclear.setDOM(this.node, this._nulcearGenerateHTML(item));
                } else {
                    var newNode = Nuclear.str2Dom(this._nulcearGenerateHTML(item));
                    item.parent.replaceChild(newNode, this.node);
                    this.node = newNode;
                }
            }
        } else {
            //第一次渲染
            if (!Nuclear.isUndefined(item.tpl)) {
                if(document.body === item.parent) {
                    item.parent.insertAdjacentHTML('beforeend', this._nulcearGenerateHTML(item));
                }else {
                    item.parent.innerHTML = this._nulcearGenerateHTML(item);
                }
                this.node = item.parent.lastChild;
            }
        }
        if (this.node) {
            this.node.setAttribute("data-nuclearId", this._ncInstanceId);

            this._mixNode();
            //this._nuclearSetStyleData();
            this.HTML = this.node.outerHTML;


            this._nuclearFix();
            if (this.onRefresh) this.onRefresh();
            if(!this._nuclearServerRender){
                this._nuclearFixForm();
            }
        }
    };

    obj._nuclearFixForm = function(){
        var elements = this.node.querySelectorAll('input'),
            i = 0,
            len = elements.length;
        for (; i < len; i++) {
            var element = elements[i];
            var type = element.type.toLowerCase();
            if (element.getAttribute('value') === '') {
                element.value = '';
            }
            if (type === 'checked' || type === 'radio') {
                if (element.hasAttribute('checked')) {
                    element.checked = 'checked';
                } else {
                    element.checked = false;
                }

            }
        }
    };

    obj._mixNode = function () {
        var nodes = this.node.querySelectorAll('*[nc-id]'),len=nodes.length;
        if (len > 0) {
            var i=0;
            for (; i < len; i++) {
                var node=nodes[i];
                this[node.getAttribute("nc-id")] = node;
            }
        }

        var cNodes = this.node.querySelectorAll('*[nc-class]'), cLen = cNodes.length;
        if (cLen > 0) {
            var j = 0;
            for (; j < cLen; j++) {
                var cNode = cNodes[j];
                var cAttr = cNode.getAttribute("nc-class");
                this[cAttr] = [];
            }
            for (j = 0; j < cLen; j++) {
                var cNode = cNodes[j];
                var cAttr = cNode.getAttribute("nc-class");
                this[cAttr].push(cNode);
            }
        }
    };

    
    obj._nuclearFix = function () {
        //从最顶部组件向内fix,非顶层直接return出去
        if (this._nuclearParent || this._nuclearParentEmpty) return;
        this._nuclearFixOne(this)
    };

    obj._nuclearFixOne = function (one) {
        var refLen = one._nuclearRef.length;
        if (refLen > 0) {
            var i = 0;
            for (; i < refLen; i++) {
                var ref = one._nuclearRef[i];
                ref.node = one.node.querySelector('*[data-nuclearId="' + ref._ncInstanceId + '"]');
                if (ref.node) {
                    ref._mixNode();
                    //ref._nuclearRenderInfo.refreshPart = ref.node.querySelectorAll('*[nc-refresh]');
                    ref._nuclearRenderInfo.parent = ref.node.parentNode;

                    this._nuclearFixOne(ref);
                    //依赖的组件new的时候没有插入dom，所以下面两行再次执行是为了防止内部的事件绑定失效
                    if (ref.onRefresh) ref.onRefresh();
                    if(!this._nuclearServerRender){
                        this._nuclearFixForm();
                    }
                    if (ref.installed) ref.installed();
                }
            }
        }
    };

    obj._nuclearWrap = function (tpl) {
        var optionStr="";
        if(this._nuclearServerRender){
            optionStr=this._nuclearViewOption(this._ncInstanceId,JSON.stringify(this.option));
        }
        return '<div id="nuclear-scoper-'+this._ncInstanceId+'" '+(this._nuclearServerRender?'data-server="server"':'')+'>' + tpl  +optionStr+ '</div>'
    };

    obj._nuclearViewOption = function(id,optionStr){
        return '\n<input type="hidden" name="__nuclear_option_'+id+'"  value=\''+optionStr+'\'>\n'
    }

    obj._nulcearGenerateHTML = function (item) {
        return this._nuclearWrap(Nuclear.render(Nuclear._fixEvent(Nuclear._fixTplIndex(this._fixStyleFromTpl(item.tpl)), this._ncInstanceId), item.data));
    }

    obj._fixStyleFromTpl = function (tpl) {
        var arr = tpl.match(/<style(([\s\S])*?)<\/style>/g);
        var str = this.style ? this.style() : '';

        if (arr) {
            var i = 0, len = arr.length;
            for (; i < len; i++) {
                str += arr[i].replace('<style>', '').replace('</style>', '');
            }
        }
        var ele = document.getElementById('nuclear_style_' + this._ncInstanceId);
        ele && document.getElementsByTagName('head')[0].removeChild(ele);

        Nuclear.addStyle(Nuclear.scoper(str, "#nuclear-scoper-" + this._ncInstanceId), "nuclear_style_" + this._ncInstanceId);

        return tpl.replace(/<style(([\s\S])*?)<\/style>/g, '');

    }


    obj._isNuclearComponent = function () { }
};

Nuclear._fixEvent = function (tpl,instanceId) {
    return tpl.replace(/<[\s\S]*?>/g, function (item) {
        return item.replace(/(onabort|onblur|oncancel|oncanplay|oncanplaythrough|onchange|onclick|onclose|oncontextmenu|oncuechange|ondblclick|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|ondurationchange|onemptied|onended|onerror|onfocus|oninput|oninvalid|onkeydown|onkeypress|onkeyup|onload|onloadeddata|onloadedmetadata|onloadstart|onmousedown|onmouseenter|onmouseleave|onmousemove|onmouseout|onmouseover|onmouseup|onmousewheel|onpause|onplay|onplaying|onprogress|onratechange|onreset|onresize|onscroll|onseeked|onseeking|onselect|onshow|onstalled|onsubmit|onsuspend|ontimeupdate|ontoggle|onvolumechange|onwaiting|onautocomplete|onautocompleteerror|onbeforecopy|onbeforecut|onbeforepaste|oncopy|oncut|onpaste|onsearch|onselectstart|onwheel|onwebkitfullscreenchange|onwebkitfullscreenerror|ontouchstart|ontouchmove|ontouchend|ontouchcancel|onpointerdown|onpointerup|onpointercancel|onpointermove|onpointerover|onpointerout|onpointerenter|onpointerleave)=('|")/g, function (eventStr, b, c, d, e) {
            if (e.substr(eventStr.length + d, 18) === "Nuclear.instances[") return eventStr;
            return eventStr += "Nuclear.instances[" + instanceId + "].";
        });
    });
};

Nuclear._fixTplIndex = function (tpl) {
    return tpl.replace(/{{@index}}/g, "{{_nuclearIndex}}");
};

Nuclear.str2Dom = function (html) {
    var wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        body: [0, "", ""],
        _default: [1, "<div>", "</div>"]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    var match = /<\s*\w.*?>/g.exec(html);
    var element = document.createElement('div');
    if (match != null) {
        var tag = match[0].replace(/</g, '').replace(/>/g, '').split(' ')[0];
        if (tag.toLowerCase() === 'body') {
            //var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
            var body = document.createElement("body");
            // keeping the attributes
            element.innerHTML = html.replace(/<body/g, '<div').replace(/<\/body>/g, '</div>');
            var attrs = element.firstChild.attributes;
            body.innerHTML = html;
            for (var i = 0; i < attrs.length; i++) {
                body.setAttribute(attrs[i].name, attrs[i].value);
            }
            return body;
        } else {
            var map = wrapMap[tag] || wrapMap._default;
            html = map[1] + html + map[2];
            element.innerHTML = html;
            // Descend through wrappers to the right content
            var j = map[0] + 1;
            while (j--) {
                element = element.lastChild;
            }
        }
    } else {
        element.innerHTML = html;
        element = element.lastChild;
    }
    return element;
};

Nuclear.isUndefined = function (o) {
    return typeof (o) === "undefined";
};

Nuclear._serverInstanceId=1000000;
Nuclear.getServerInstanceId = function () {
    if(Nuclear._serverInstanceId>10000000&&!Nuclear.instances[1000000])Nuclear._serverInstanceId=1000000;
    return Nuclear._serverInstanceId++;
};

Nuclear._instanceId= 0;
Nuclear.getInstanceId = function () {
    if(Nuclear._instanceId>Nuclear._serverInstanceId){
        throw  'please set _serverInstanceId value to a larger value';
    }
    return Nuclear._instanceId++;
};

Nuclear.instances = {};
Nuclear.destroy=function(instance){
    Nuclear.instances[instance._ncInstanceId] =null;
}
