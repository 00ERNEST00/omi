/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	var _omiFinger = __webpack_require__(8);

	var _omiFinger2 = _interopRequireDefault(_omiFinger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	_omiFinger2['default'].init();

	var App = function (_Omi$Component) {
	    _inherits(App, _Omi$Component);

	    function App(data) {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, data));
	    }

	    _createClass(App, [{
	        key: 'handleTap',
	        value: function handleTap(evt) {
	            alert(11);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return '\n        <div>\n            <div omi-finger onTap="handleTap"  >ABCD</div>\n        </div>\n        ';
	        }
	    }]);

	    return App;
	}(_index2['default'].Component);

	_index2['default'].render(new App(), "#container");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _omi = __webpack_require__(2);

	var _omi2 = _interopRequireDefault(_omi);

	var _mustache = __webpack_require__(3);

	var _mustache2 = _interopRequireDefault(_mustache);

	var _component = __webpack_require__(4);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	_omi2['default'].template = _mustache2['default'].render;

	_omi2['default'].Component = _component2['default'];

	window.Omi = _omi2['default'];
	module.exports = _omi2['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var Omi = {};
	Omi.instances = {};
	Omi._instanceId = 0;
	Omi.getInstanceId = function () {
	    return Omi._instanceId++;
	};
	Omi.customTags = [];
	Omi.mapping = {};

	Omi.STYLEPREFIX = "omi_style_";
	Omi.STYLESCOPEDPREFIX = "omi_scoped_";

	//fix ie bug
	if (typeof Object.assign != 'function') {
	    Object.assign = function (target) {
	        'use strict';

	        if (target == null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }

	        target = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source != null) {
	                for (var key in source) {
	                    if (Object.prototype.hasOwnProperty.call(source, key)) {
	                        target[key] = source[key];
	                    }
	                }
	            }
	        }
	        return target;
	    };
	}

	/**
	 * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
	 * on host objects like NamedNodeMap, NodeList, and HTMLCollection
	 * (technically, since host objects have been implementation-dependent,
	 * at least before ES6, IE hasn't needed to work this way).
	 * Also works on strings, fixes IE < 9 to allow an explicit undefined
	 * for the 2nd argument (as in Firefox), and prevents errors when
	 * called on other DOM objects.
	 */
	(function () {
	    'use strict';

	    var _slice = Array.prototype.slice;

	    try {
	        // Can't be used with DOM elements in IE < 9
	        _slice.call(document.documentElement);
	    } catch (e) {
	        // Fails in IE < 9
	        // This will work for genuine arrays, array-like objects,
	        // NamedNodeMap (attributes, entities, notations),
	        // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
	        // and will not fail on other DOM objects (as do DOM elements in IE < 9)
	        Array.prototype.slice = function (begin, end) {
	            // IE < 9 gets unhappy with an undefined end argument
	            end = typeof end !== 'undefined' ? end : this.length;

	            // For native Array objects, we use the native slice function
	            if (Object.prototype.toString.call(this) === '[object Array]') {
	                return _slice.call(this, begin, end);
	            }

	            // For array like object we handle it ourselves.
	            var i,
	                cloned = [],
	                size,
	                len = this.length;

	            // Handle negative value for "begin"
	            var start = begin || 0;
	            start = start >= 0 ? start : len + start;

	            // Handle negative value for "end"
	            var upTo = end ? end : len;
	            if (end < 0) {
	                upTo = len + end;
	            }

	            // Actual expected size of the slice
	            size = upTo - start;

	            if (size > 0) {
	                cloned = new Array(size);
	                if (this.charAt) {
	                    for (i = 0; i < size; i++) {
	                        cloned[i] = this.charAt(start + i);
	                    }
	                } else {
	                    for (i = 0; i < size; i++) {
	                        cloned[i] = this[start + i];
	                    }
	                }
	            }

	            return cloned;
	        };
	    }
	})();

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) {
	        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function toArr(obj) {
	    var arr = [];
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            arr.push({ key: key, value: obj[key] });
	        }
	    }
	    return arr;
	}

	Omi.create = function (tagName, parent, setting) {
	    var u_setting = parent,
	        u_parent = Omi.Component;
	    if (arguments.length > 2) {
	        u_setting = setting;
	        u_parent = parent;
	    }
	    Omi[tagName] = function (parent) {
	        _inherits(Obj, parent);

	        function Obj(data, server) {
	            _classCallCheck(this, Obj);
	            this.___omi_constructor_name = tagName;
	            return _possibleConstructorReturn(this, (Obj.__proto__ || Object.getPrototypeOf(Obj)).call(this, data, server));
	        }

	        _createClass(Obj, toArr(u_setting));

	        return Obj;
	    }(u_parent);

	    Omi.customTags.push(tagName);

	    return Omi[tagName];
	};

	Omi.mixIndex = function (array, key) {
	    var len = array.length,
	        indexName = key || "index";
	    for (var i = 0; i < len; i++) {
	        var item = array[i];
	        if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === "object") {
	            item[indexName] = i;
	        } else {
	            array[i] = { value: item };
	            array[i][indexName] = i;
	        }
	    }
	    return array;
	};

	Omi.$ = function (selector, context) {
	    if (context) {
	        return context.querySelector(selector);
	    } else {
	        return document.querySelector(selector);
	    }
	};

	Omi.$$ = function (selector, context) {
	    if (context) {
	        return Array.prototype.slice.call(context.querySelectorAll(selector));
	    } else {
	        return Array.prototype.slice.call(document.querySelectorAll(selector));
	    }
	};

	Omi.getClassFromString = function (str) {
	    if (str.indexOf('.') !== 0) {
	        var arr = str.split('.');
	        var len = arr.length;
	        var current = Omi[arr[0]];
	        for (var i = 1; i < len; i++) {
	            current = current[arr[i]];
	        }
	        return current;
	    } else {
	        return Omi[str];
	    }
	};

	//��ǰ��Component�ľ�̬�������Ƶ�omi��������Ȼmakehtml ��ie��child���ʲ������׵ľ�̬����
	Omi.makeHTML = function (name, ctor) {
	    Omi[name] = ctor;
	    Omi.customTags.push(name);
	};

	Omi.render = function (component, renderTo, increment) {
	    component.renderTo = typeof renderTo === "string" ? document.querySelector(renderTo) : renderTo;
	    component._omi_increment = increment;
	    component.install();
	    component._render(true);
	    component.installed();
	    component._childrenInstalled(component);
	    return component;
	};

	Omi.get = function (name) {
	    return Omi.mapping[name];
	};

	Omi.plugins = {};

	Omi.extendPlugin = function (name, handler) {
	    Omi.plugins[name] = handler;
	};

	module.exports = Omi;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	/*global define: false Mustache: true*/

	(function defineMustache(global, factory) {
	    if (( false ? 'undefined' : _typeof(exports)) === 'object' && exports && typeof exports.nodeName !== 'string') {
	        factory(exports); // CommonJS
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	    } else {
	        global.Mustache = {};
	        factory(global.Mustache); // script, wsh, asp
	    }
	})(undefined, function mustacheFactory(mustache) {

	    var objectToString = Object.prototype.toString;
	    var isArray = Array.isArray || function isArrayPolyfill(object) {
	        return objectToString.call(object) === '[object Array]';
	    };

	    function isFunction(object) {
	        return typeof object === 'function';
	    }

	    /**
	     * More correct typeof string handling array
	     * which normally returns typeof 'object'
	     */
	    function typeStr(obj) {
	        return isArray(obj) ? 'array' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    }

	    function escapeRegExp(string) {
	        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	    }

	    /**
	     * Null safe way of checking whether or not an object,
	     * including its prototype, has a given property
	     */
	    function hasProperty(obj, propName) {
	        return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && propName in obj;
	    }

	    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
	    // See https://github.com/janl/mustache.js/issues/189
	    var regExpTest = RegExp.prototype.test;
	    function testRegExp(re, string) {
	        return regExpTest.call(re, string);
	    }

	    var nonSpaceRe = /\S/;
	    function isWhitespace(string) {
	        return !testRegExp(nonSpaceRe, string);
	    }

	    var entityMap = {
	        '&': '&amp;',
	        '<': '&lt;',
	        '>': '&gt;',
	        '"': '&quot;',
	        "'": '&#39;',
	        '/': '&#x2F;',
	        '`': '&#x60;',
	        '=': '&#x3D;'
	    };

	    function escapeHtml(string) {
	        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
	            return entityMap[s];
	        });
	    }

	    var whiteRe = /\s*/;
	    var spaceRe = /\s+/;
	    var equalsRe = /\s*=/;
	    var curlyRe = /\s*\}/;
	    var tagRe = /#|\^|\/|>|\{|&|=|!/;

	    /**
	     * Breaks up the given `template` string into a tree of tokens. If the `tags`
	     * argument is given here it must be an array with two string values: the
	     * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
	     * course, the default is to use mustaches (i.e. mustache.tags).
	     *
	     * A token is an array with at least 4 elements. The first element is the
	     * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
	     * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
	     * all text that appears outside a symbol this element is "text".
	     *
	     * The second element of a token is its "value". For mustache tags this is
	     * whatever else was inside the tag besides the opening symbol. For text tokens
	     * this is the text itself.
	     *
	     * The third and fourth elements of the token are the start and end indices,
	     * respectively, of the token in the original template.
	     *
	     * Tokens that are the root node of a subtree contain two more elements: 1) an
	     * array of tokens in the subtree and 2) the index in the original template at
	     * which the closing tag for that section begins.
	     */
	    function parseTemplate(template, tags) {
	        if (!template) return [];

	        var sections = []; // Stack to hold section tokens
	        var tokens = []; // Buffer to hold the tokens
	        var spaces = []; // Indices of whitespace tokens on the current line
	        var hasTag = false; // Is there a {{tag}} on the current line?
	        var nonSpace = false; // Is there a non-space char on the current line?

	        // Strips all whitespace tokens array for the current line
	        // if there was a {{#tag}} on it and otherwise only space.
	        function stripSpace() {
	            if (hasTag && !nonSpace) {
	                while (spaces.length) {
	                    delete tokens[spaces.pop()];
	                }
	            } else {
	                spaces = [];
	            }

	            hasTag = false;
	            nonSpace = false;
	        }

	        var openingTagRe, closingTagRe, closingCurlyRe;
	        function compileTags(tagsToCompile) {
	            if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);

	            if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);

	            openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
	            closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
	            closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
	        }

	        compileTags(tags || mustache.tags);

	        var scanner = new Scanner(template);

	        var start, type, value, chr, token, openSection;
	        while (!scanner.eos()) {
	            start = scanner.pos;

	            // Match any text between tags.
	            value = scanner.scanUntil(openingTagRe);

	            if (value) {
	                for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
	                    chr = value.charAt(i);

	                    if (isWhitespace(chr)) {
	                        spaces.push(tokens.length);
	                    } else {
	                        nonSpace = true;
	                    }

	                    tokens.push(['text', chr, start, start + 1]);
	                    start += 1;

	                    // Check for whitespace on the current line.
	                    if (chr === '\n') stripSpace();
	                }
	            }

	            // Match the opening tag.
	            if (!scanner.scan(openingTagRe)) break;

	            hasTag = true;

	            // Get the tag type.
	            type = scanner.scan(tagRe) || 'name';
	            scanner.scan(whiteRe);

	            // Get the tag value.
	            if (type === '=') {
	                value = scanner.scanUntil(equalsRe);
	                scanner.scan(equalsRe);
	                scanner.scanUntil(closingTagRe);
	            } else if (type === '{') {
	                value = scanner.scanUntil(closingCurlyRe);
	                scanner.scan(curlyRe);
	                scanner.scanUntil(closingTagRe);
	                type = '&';
	            } else {
	                value = scanner.scanUntil(closingTagRe);
	            }

	            // Match the closing tag.
	            if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);

	            token = [type, value, start, scanner.pos];
	            tokens.push(token);

	            if (type === '#' || type === '^') {
	                sections.push(token);
	            } else if (type === '/') {
	                // Check section nesting.
	                openSection = sections.pop();

	                if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);

	                if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
	            } else if (type === 'name' || type === '{' || type === '&') {
	                nonSpace = true;
	            } else if (type === '=') {
	                // Set the tags for the next time around.
	                compileTags(value);
	            }
	        }

	        // Make sure there are no open sections when we're done.
	        openSection = sections.pop();

	        if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

	        return nestTokens(squashTokens(tokens));
	    }

	    /**
	     * Combines the values of consecutive text tokens in the given `tokens` array
	     * to a single token.
	     */
	    function squashTokens(tokens) {
	        var squashedTokens = [];

	        var token, lastToken;
	        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	            token = tokens[i];

	            if (token) {
	                if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
	                    lastToken[1] += token[1];
	                    lastToken[3] = token[3];
	                } else {
	                    squashedTokens.push(token);
	                    lastToken = token;
	                }
	            }
	        }

	        return squashedTokens;
	    }

	    /**
	     * Forms the given array of `tokens` into a nested tree structure where
	     * tokens that represent a section have two additional items: 1) an array of
	     * all tokens that appear in that section and 2) the index in the original
	     * template that represents the end of that section.
	     */
	    function nestTokens(tokens) {
	        var nestedTokens = [];
	        var collector = nestedTokens;
	        var sections = [];

	        var token, section;
	        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	            token = tokens[i];

	            switch (token[0]) {
	                case '#':
	                case '^':
	                    collector.push(token);
	                    sections.push(token);
	                    collector = token[4] = [];
	                    break;
	                case '/':
	                    section = sections.pop();
	                    section[5] = token[2];
	                    collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
	                    break;
	                default:
	                    collector.push(token);
	            }
	        }

	        return nestedTokens;
	    }

	    /**
	     * A simple string scanner that is used by the template parser to find
	     * tokens in template strings.
	     */
	    function Scanner(string) {
	        this.string = string;
	        this.tail = string;
	        this.pos = 0;
	    }

	    /**
	     * Returns `true` if the tail is empty (end of string).
	     */
	    Scanner.prototype.eos = function eos() {
	        return this.tail === '';
	    };

	    /**
	     * Tries to match the given regular expression at the current position.
	     * Returns the matched text if it can match, the empty string otherwise.
	     */
	    Scanner.prototype.scan = function scan(re) {
	        var match = this.tail.match(re);

	        if (!match || match.index !== 0) return '';

	        var string = match[0];

	        this.tail = this.tail.substring(string.length);
	        this.pos += string.length;

	        return string;
	    };

	    /**
	     * Skips all text until the given regular expression can be matched. Returns
	     * the skipped string, which is the entire tail if no match can be made.
	     */
	    Scanner.prototype.scanUntil = function scanUntil(re) {
	        var index = this.tail.search(re),
	            match;

	        switch (index) {
	            case -1:
	                match = this.tail;
	                this.tail = '';
	                break;
	            case 0:
	                match = '';
	                break;
	            default:
	                match = this.tail.substring(0, index);
	                this.tail = this.tail.substring(index);
	        }

	        this.pos += match.length;

	        return match;
	    };

	    /**
	     * Represents a rendering context by wrapping a view object and
	     * maintaining a reference to the parent context.
	     */
	    function Context(view, parentContext) {
	        this.view = view;
	        this.cache = { '.': this.view };
	        this.parent = parentContext;
	    }

	    /**
	     * Creates a new context using the given view with this context
	     * as the parent.
	     */
	    Context.prototype.push = function push(view) {
	        return new Context(view, this);
	    };

	    /**
	     * Returns the value of the given name in this context, traversing
	     * up the context hierarchy if the value is absent in this context's view.
	     */
	    Context.prototype.lookup = function lookup(name) {
	        var cache = this.cache;

	        var value;
	        if (cache.hasOwnProperty(name)) {
	            value = cache[name];
	        } else {
	            var context = this,
	                names,
	                index,
	                lookupHit = false;

	            while (context) {
	                if (name.indexOf('.') > 0) {
	                    value = context.view;
	                    names = name.split('.');
	                    index = 0;

	                    /**
	                     * Using the dot notion path in `name`, we descend through the
	                     * nested objects.
	                     *
	                     * To be certain that the lookup has been successful, we have to
	                     * check if the last object in the path actually has the property
	                     * we are looking for. We store the result in `lookupHit`.
	                     *
	                     * This is specially necessary for when the value has been set to
	                     * `undefined` and we want to avoid looking up parent contexts.
	                     **/
	                    while (value != null && index < names.length) {
	                        if (index === names.length - 1) lookupHit = hasProperty(value, names[index]);

	                        value = value[names[index++]];
	                    }
	                } else {
	                    value = context.view[name];
	                    lookupHit = hasProperty(context.view, name);
	                }

	                if (lookupHit) break;

	                context = context.parent;
	            }

	            cache[name] = value;
	        }

	        if (isFunction(value)) value = value.call(this.view);

	        return value;
	    };

	    /**
	     * A Writer knows how to take a stream of tokens and render them to a
	     * string, given a context. It also maintains a cache of templates to
	     * avoid the need to parse the same template twice.
	     */
	    function Writer() {
	        this.cache = {};
	    }

	    /**
	     * Clears all cached templates in this writer.
	     */
	    Writer.prototype.clearCache = function clearCache() {
	        this.cache = {};
	    };

	    /**
	     * Parses and caches the given `template` and returns the array of tokens
	     * that is generated from the parse.
	     */
	    Writer.prototype.parse = function parse(template, tags) {
	        var cache = this.cache;
	        var tokens = cache[template];

	        if (tokens == null) tokens = cache[template] = parseTemplate(template, tags);

	        return tokens;
	    };

	    /**
	     * High-level method that is used to render the given `template` with
	     * the given `view`.
	     *
	     * The optional `partials` argument may be an object that contains the
	     * names and templates of partials that are used in the template. It may
	     * also be a function that is used to load partial templates on the fly
	     * that takes a single argument: the name of the partial.
	     */
	    Writer.prototype.render = function render(template, view, partials) {
	        var tokens = this.parse(template);
	        var context = view instanceof Context ? view : new Context(view);
	        return this.renderTokens(tokens, context, partials, template);
	    };

	    /**
	     * Low-level method that renders the given array of `tokens` using
	     * the given `context` and `partials`.
	     *
	     * Note: The `originalTemplate` is only ever used to extract the portion
	     * of the original template that was contained in a higher-order section.
	     * If the template doesn't use higher-order sections, this argument may
	     * be omitted.
	     */
	    Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
	        var buffer = '';

	        var token, symbol, value;
	        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	            value = undefined;
	            token = tokens[i];
	            symbol = token[0];

	            if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);else if (symbol === '&') value = this.unescapedValue(token, context);else if (symbol === 'name') value = this.escapedValue(token, context);else if (symbol === 'text') value = this.rawValue(token);

	            if (value !== undefined) buffer += value;
	        }

	        return buffer;
	    };

	    Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
	        var self = this;
	        var buffer = '';
	        var value = context.lookup(token[1]);

	        // This function is used to render an arbitrary template
	        // in the current context by higher-order sections.
	        function subRender(template) {
	            return self.render(template, context, partials);
	        }

	        if (!value) return;

	        if (isArray(value)) {
	            for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	                buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
	            }
	        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'string' || typeof value === 'number') {
	            buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
	        } else if (isFunction(value)) {
	            if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');

	            // Extract the portion of the original template that the section contains.
	            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

	            if (value != null) buffer += value;
	        } else {
	            buffer += this.renderTokens(token[4], context, partials, originalTemplate);
	        }
	        return buffer;
	    };

	    Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
	        var value = context.lookup(token[1]);

	        // Use JavaScript's definition of falsy. Include empty arrays.
	        // See https://github.com/janl/mustache.js/issues/186
	        if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate);
	    };

	    Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
	        if (!partials) return;

	        var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	        if (value != null) return this.renderTokens(this.parse(value), context, partials, value);
	    };

	    Writer.prototype.unescapedValue = function unescapedValue(token, context) {
	        var value = context.lookup(token[1]);
	        if (value != null) return value;
	    };

	    Writer.prototype.escapedValue = function escapedValue(token, context) {
	        var value = context.lookup(token[1]);
	        if (value != null) return mustache.escape(value);
	    };

	    Writer.prototype.rawValue = function rawValue(token) {
	        return token[1];
	    };

	    mustache.name = 'mustache.js';
	    mustache.version = '2.3.0';
	    mustache.tags = ['{{', '}}'];

	    // All high-level mustache.* functions use this writer.
	    var defaultWriter = new Writer();

	    /**
	     * Clears all cached templates in the default writer.
	     */
	    mustache.clearCache = function clearCache() {
	        return defaultWriter.clearCache();
	    };

	    /**
	     * Parses and caches the given template in the default writer and returns the
	     * array of tokens it contains. Doing this ahead of time avoids the need to
	     * parse templates on the fly as they are rendered.
	     */
	    mustache.parse = function parse(template, tags) {
	        return defaultWriter.parse(template, tags);
	    };

	    /**
	     * Renders the `template` with the given `view` and `partials` using the
	     * default writer.
	     */
	    mustache.render = function render(template, view, partials) {
	        if (typeof template !== 'string') {
	            throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
	        }

	        return defaultWriter.render(template, view, partials);
	    };

	    // This is here for backwards compatibility with 0.4.x.,
	    /*eslint-disable */ // eslint wants camel cased function name
	    mustache.to_html = function to_html(template, view, partials, send) {
	        /*eslint-enable*/

	        var result = mustache.render(template, view, partials);

	        if (isFunction(send)) {
	            send(result);
	        } else {
	            return result;
	        }
	    };

	    // Export the escaping function so that the user may override it.
	    // See https://github.com/janl/mustache.js/issues/244
	    mustache.escape = escapeHtml;

	    // Export these mainly for testing, but also for advanced usage.
	    mustache.Scanner = Scanner;
	    mustache.Context = Context;
	    mustache.Writer = Writer;

	    return mustache;
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _omi = __webpack_require__(2);

	var _omi2 = _interopRequireDefault(_omi);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	var _event = __webpack_require__(6);

	var _event2 = _interopRequireDefault(_event);

	var _diff = __webpack_require__(7);

	var _diff2 = _interopRequireDefault(_diff);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Component = function () {
	    function Component(data, server) {
	        _classCallCheck(this, Component);

	        //re render the server-side rendering html on the client-side
	        var type = Object.prototype.toString.call(data);
	        var isReRendering = type !== '[object Object]' && type !== '[object Undefined]';
	        if (isReRendering) {
	            this.renderTo = typeof data === "string" ? document.querySelector(data) : data;
	            this._hidden = this.renderTo.querySelector('.omi_scoped__hidden_data');
	            this.id = this._hidden.dataset.omiId;
	            this.data = JSON.parse(this._hidden.value);
	        } else {
	            this.data = data || {};
	            this._omi_server_rendering = server;
	            this.id = this._omi_server_rendering ? 1000000 + _omi2['default'].getInstanceId() : _omi2['default'].getInstanceId();
	        }
	        this.refs = {};
	        this.children = [];
	        this.childrenData = [];
	        this.HTML = null;
	        this._addedItems = [];
	        this._omi_order = [];
	        _omi2['default'].instances[this.id] = this;
	        this.dataFirst = true;
	        this._omi_scoped_attr = _omi2['default'].STYLESCOPEDPREFIX + this.id;
	        //this.BODY_ELEMENT = document.createElement('body');
	        this._preCSS = null;
	        if (this._omi_server_rendering || isReRendering) {
	            this.install();
	            this._render(true);
	            this.installed();
	            this._childrenInstalled(this);
	        }
	    }

	    _createClass(Component, [{
	        key: 'install',
	        value: function install() {}
	    }, {
	        key: 'installed',
	        value: function installed() {}
	    }, {
	        key: 'uninstall',
	        value: function uninstall() {}
	    }, {
	        key: 'afterUpdate',
	        value: function afterUpdate() {}
	    }, {
	        key: 'beforeUpdate',
	        value: function beforeUpdate() {}
	    }, {
	        key: 'render',
	        value: function render() {}
	    }, {
	        key: 'style',
	        value: function style() {}
	    }, {
	        key: 'update',
	        value: function update() {
	            this.beforeUpdate();
	            if (this.renderTo) {
	                this._render();
	            } else {
	                // update child node
	                if (this._omi_removed) {
	                    var hdNode = this._createHiddenNode();
	                    this.node.parentNode.replaceChild(hdNode, this.node);
	                    this.node = hdNode;
	                } else {
	                    (0, _diff2['default'])(this.node, (0, _event2['default'])(this._childRender(this._omiChildStr), this.id));
	                }
	            }
	            //update added components
	            this._renderAddedChildren();
	            this.afterUpdate();
	        }
	    }, {
	        key: 'setData',
	        value: function setData(data, update) {
	            this.data = data;
	            if (update) {
	                this.update();
	            }
	        }
	    }, {
	        key: 'removeChild',
	        value: function removeChild(indexOrChild) {
	            var child = indexOrChild;
	            if (typeof indexOrChild === 'number') {
	                child = this.children[indexOrChild];
	            }

	            child.remove();
	        }
	    }, {
	        key: 'restoreChild',
	        value: function restoreChild(indexOrChild) {
	            var child = indexOrChild;
	            if (typeof indexOrChild === 'number') {
	                child = this.children[indexOrChild];
	            }

	            child.restore();
	        }
	    }, {
	        key: 'setComponentOrder',
	        value: function setComponentOrder(arr) {
	            var _this = this;

	            arr.forEach(function (item, index) {
	                _this._omi_order[index] = item;
	            });
	            this.update();
	        }
	        //beforeBegin,beforeEnd,afterBegin,afterEnd

	    }, {
	        key: 'addComponent',
	        value: function addComponent(position, el, component) {
	            this._addedItems.push({ position: position, el: el, component: component });
	            this.update();
	        }
	    }, {
	        key: 'removeComponent',
	        value: function removeComponent(component) {
	            for (var i = 0, len = this._addedItems.length; i < len; i++) {
	                if (component.id === this._addedItems[i].component.id) {
	                    this._addedItems.splice(i, 1);
	                    break;
	                }
	            }
	            this.update();
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            this._omi_removed = true;
	            this.update();
	            this.uninstall();
	        }
	    }, {
	        key: 'restore',
	        value: function restore() {
	            this._omi_removed = false;
	            this.update();
	            this.installed();
	        }
	    }, {
	        key: '_renderAddedChildren',
	        value: function _renderAddedChildren() {
	            var _this2 = this;

	            this._addedItems.forEach(function (item) {
	                var target = typeof item.el === "string" ? _this2.node.querySelector(item.el) : item.el;
	                item.component.install();
	                item.component._render(true);
	                item.component.installed();
	                item.component._childrenInstalled(item.component);
	                target.insertAdjacentHTML(item.position, item.component.HTML);
	            });
	            this.children.forEach(function (child) {
	                child._renderAddedChildren();
	            });
	        }
	    }, {
	        key: '_render',
	        value: function _render(isFirst) {
	            var _this3 = this;

	            if (this._omi_removed) {
	                var node = this._createHiddenNode();
	                if (!isFirst) {
	                    this.node.parentNode.replaceChild(node, this.node);
	                    this.node = node;
	                } else if (this.renderTo) {
	                    this.renderTo.appendChild(node);
	                }
	                return;
	            }
	            this._generateHTMLCSS();
	            this._extractChildren(this);
	            if (isFirst) {
	                this.children.forEach(function (item, index) {
	                    _this3._omi_order[index] = index;
	                });
	            }
	            this.children.forEach(function (item, index) {
	                _this3.HTML = _this3.HTML.replace(item._omiChildStr, _this3.children[_this3._omi_order[index]].HTML);
	            });
	            this.HTML = (0, _event2['default'])(this.HTML, this.id);
	            if (isFirst) {
	                if (this.renderTo) {
	                    if (this._omi_increment) {
	                        this.renderTo.insertAdjacentHTML('beforeend', this.HTML);
	                    } else {
	                        this.renderTo.innerHTML = this.HTML;
	                    }
	                }
	            } else {
	                if (this.HTML !== "") {
	                    (0, _diff2['default'])(this.node, this.HTML);
	                } else {
	                    (0, _diff2['default'])(this.node, this._createHiddenNode());
	                }
	            }
	            //get node prop from parent node
	            if (this.renderTo) {
	                this.node = document.querySelector("[" + this._omi_scoped_attr + "]");
	                this._queryElements(this);
	                this._fixForm();
	            }
	        }
	    }, {
	        key: '_childRender',
	        value: function _childRender(childStr, isFirst) {
	            var _this4 = this;

	            if (this._omi_removed) {
	                this.HTML = '<input type="hidden" omi_scoped_' + this.id + ' >';
	                return this.HTML;
	            }
	            childStr = childStr.replace("<child", "<div").replace("/>", "></div>");
	            this._mergeData(childStr, isFirst);
	            this._generateHTMLCSS();
	            this._extractChildren(this);
	            if (isFirst) {
	                this.children.forEach(function (item, index) {
	                    _this4._omi_order[index] = index;
	                });
	            }
	            this.children.forEach(function (item, index) {
	                _this4.HTML = _this4.HTML.replace(item._omiChildStr, _this4.children[_this4._omi_order[index]].HTML);
	            });
	            this.HTML = (0, _event2['default'])(this.HTML, this.id);
	            return this.HTML;
	        }
	    }, {
	        key: '_queryElements',
	        value: function _queryElements(current) {
	            current._mixRefs();
	            current._execPlugins();
	            current.children.forEach(function (item) {
	                item.node = current.node.querySelector("[" + _omi2['default'].STYLESCOPEDPREFIX + item.id + "]");
	                //recursion get node prop from parent node
	                current._queryElements(item);
	            });
	        }
	    }, {
	        key: '_mixRefs',
	        value: function _mixRefs() {
	            var _this5 = this;

	            var nodes = _omi2['default'].$$('*[ref]', this.node);
	            nodes.forEach(function (node) {
	                if (node.hasAttribute(_this5._omi_scoped_attr)) {
	                    _this5.refs[node.getAttribute('ref')] = node;
	                }
	            });
	        }
	    }, {
	        key: '_execPlugins',
	        value: function _execPlugins() {
	            var _this6 = this;

	            Object.keys(_omi2['default'].plugins).forEach(function (item) {
	                var nodes = _omi2['default'].$$('*[' + item + ']', _this6.node);
	                nodes.forEach(function (node) {
	                    if (node.hasAttribute(_this6._omi_scoped_attr)) {
	                        _omi2['default'].plugins[item](node, _this6);
	                    }
	                });
	            });
	        }
	    }, {
	        key: '_childrenInstalled',
	        value: function _childrenInstalled(root) {
	            var _this7 = this;

	            root.children.forEach(function (child) {
	                child.installed();
	                _this7._childrenInstalled(child);
	            });
	        }
	    }, {
	        key: '_getConstructorNameByMagic',
	        value: function _getConstructorNameByMagic(c) {
	            return (c + "").split("(")[0].replace("function", "").trim();
	        }
	    }, {
	        key: '_fixForm',
	        value: function _fixForm() {

	            _omi2['default'].$$('input', this.node).forEach(function (element) {
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
	            });

	            _omi2['default'].$$('select', this.node).forEach(function (select) {
	                var value = select.getAttribute('value');
	                if (value) {
	                    _omi2['default'].$$('option', select).forEach(function (option) {
	                        if (value === option.getAttribute('value')) {
	                            option.setAttribute('selected', 'selected');
	                        }
	                    });
	                } else {
	                    var firstOption = _omi2['default'].$$('option', select)[0];
	                    firstOption && firstOption.setAttribute('selected', 'selected');
	                }
	            });
	        }
	    }, {
	        key: '_replaceTags',
	        value: function _replaceTags(array, html) {
	            var str = array.join("|");
	            var reg = new RegExp("(<(" + str + "))[^a-zA-Z>][\\s\\S]*?/>", "g");
	            return html.replace(reg, function (m, a, b) {
	                return m.replace(a, '<child tag="' + b + '" ');
	            });
	        }
	    }, {
	        key: '_createHiddenNode',
	        value: function _createHiddenNode() {
	            var hdNode = document.createElement("input");
	            hdNode.setAttribute("type", "hidden");
	            hdNode.setAttribute(this._omi_scoped_attr, '');
	            return hdNode;
	        }
	    }, {
	        key: '_mergeData',
	        value: function _mergeData(childStr, isFirst) {
	            var arr = childStr.match(/\s*data=['|"](\S*)['|"]/);
	            if (isFirst) {
	                this.data = Object.assign(this.data, this._getDataset(childStr), arr ? this.parent[RegExp.$1] : null);
	            } else {
	                if (this.dataFirst) {
	                    this.data = Object.assign({}, this._getDataset(childStr), this.data);
	                } else {
	                    this.data = Object.assign({}, this.data, this._getDataset(childStr));
	                }
	            }
	            isFirst && this.install();
	        }
	    }, {
	        key: '_generateHTMLCSS',
	        value: function _generateHTMLCSS() {
	            this.CSS = this.style() || '';
	            if (this.CSS) {
	                this.CSS = _style2['default'].scoper(this.CSS, "[" + this._omi_scoped_attr + "]");
	                if (this.CSS !== this._preCSS && !this._omi_server_rendering) {
	                    _style2['default'].addStyle(this.CSS, this.id);
	                    this._preCSS = this.CSS;
	                }
	            }
	            var tpl = this.render();
	            this.HTML = this._scopedAttr(_omi2['default'].template(tpl ? tpl : "", this.data), this._omi_scoped_attr).trim();
	            if (this._omi_server_rendering) {
	                this.HTML = '\r\n<style id="' + _omi2['default'].STYLEPREFIX + this.id + '">\r\n' + this.CSS + '\r\n</style>\r\n' + this.HTML;
	                this.HTML += '\r\n<input type="hidden" data-omi-id="' + this.id + '" class="' + _omi2['default'].STYLESCOPEDPREFIX + '_hidden_data" value=\'' + JSON.stringify(this.data) + '\'  />\r\n';
	            }
	        }
	    }, {
	        key: '_scopedAttr',
	        value: function _scopedAttr(html, id) {
	            return html.replace(/<[^/]([A-Za-z]*)[^>]*>/g, function (m) {
	                var str = m.split(" ")[0].replace(">", "");
	                return m.replace(str, str + " " + id);
	            });
	        }
	    }, {
	        key: '_getDataset',
	        value: function _getDataset(str) {
	            var _this8 = this;

	            var arr = str.match(/data-(\S*)=['|"](\S*)['|"]/g);
	            if (arr) {
	                var _ret = function () {
	                    var obj = {};
	                    arr.forEach(function (item) {
	                        var arr = item.split('=');
	                        obj[_this8._capitalize(arr[0].replace('data-', ''))] = arr[1].replace(/['|"]/g, '');
	                        arr = null;
	                    });
	                    return {
	                        v: obj
	                    };
	                }();

	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            }
	            //this.BODY_ELEMENT.innerHTML = str ;
	            //return this.BODY_ELEMENT.firstChild.dataset;
	        }
	    }, {
	        key: '_capitalize',
	        value: function _capitalize(str) {
	            str = str.toLowerCase();
	            str = str.replace(/\b\w+\b/g, function (word) {
	                return word.substring(0, 1).toUpperCase() + word.substring(1);
	            }).replace(/-/g, '');
	            return str.substring(0, 1).toLowerCase() + str.substring(1);
	        }
	    }, {
	        key: '_extractChildren',
	        value: function _extractChildren(child) {
	            if (_omi2['default'].customTags.length > 0) {
	                child.HTML = this._replaceTags(_omi2['default'].customTags, child.HTML);
	            }
	            var arr = child.HTML.match(/<child[^>][\s\S]*?tag=['|"](\S*)['|"][\s\S]*?\/>/g);

	            if (arr) {
	                var len = arr.length;

	                for (var i = 0; i < len; i++) {
	                    var childStr = arr[i];
	                    childStr.match(/\s*tag=['|"](\S*)['|"]/);

	                    var name = RegExp.$1;
	                    var cmi = this.children[i];
	                    //if not first time to invoke _extractChildren method
	                    //___omi_constructor_name for es5
	                    if (cmi && (cmi.constructor.name === name || cmi.___omi_constructor_name === name || this._getConstructorNameByMagic(cmi.constructor))) {
	                        cmi._childRender(childStr);
	                        continue;
	                    } else {
	                        (function () {
	                            var ChildClass = _omi2['default'].getClassFromString(name);
	                            if (!ChildClass) throw "Can't find Class called [" + name + "]";
	                            var sub_child = new ChildClass(Object.assign({}, child.childrenData[i]), false);
	                            sub_child._omiChildStr = childStr;
	                            sub_child.parent = child;

	                            var evtArr = childStr.match(/[\s\t\n]+on(\S*)=['|"](\S*)['|"]/g);
	                            if (evtArr) {
	                                evtArr.forEach(function (item) {
	                                    var evtArr = item.trim().split("=");
	                                    var hdName = evtArr[1].replace(/['|"]/g, "");
	                                    var handler = sub_child.parent[hdName];
	                                    if (handler) {
	                                        sub_child.data[evtArr[0]] = handler.bind(sub_child.parent);
	                                    }
	                                });
	                            }
	                            sub_child._childRender(childStr, true);

	                            var mo_ids = childStr.match(/omi-id=['|"](\S*)['|"]/);
	                            if (mo_ids) {
	                                _omi2['default'].mapping[RegExp.$1] = sub_child;
	                            }
	                            if (!cmi) {
	                                child.children.push(sub_child);
	                            } else {
	                                child.children[i] = sub_child;
	                            }

	                            var nameArr = childStr.match(/\s*name=['|"](\S*)['|"]/);

	                            if (nameArr) {
	                                child[RegExp.$1] = sub_child;
	                            }
	                        })();
	                    }
	                }
	            }
	        }
	    }]);

	    return Component;
	}();

	exports['default'] = Component;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _omi = __webpack_require__(2);

	var _omi2 = _interopRequireDefault(_omi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	//many thanks to https://github.com/thomaspark/scoper/
	function scoper(css, prefix) {
	    var re = new RegExp("([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)", "g");
	    css = css.replace(re, function (g0, g1, g2) {

	        if (g1.match(/^\s*(@media|@keyframes|to|from|@font-face)/)) {
	            return g1 + g2;
	        }

	        if (g1.match(/:scope/)) {
	            g1 = g1.replace(/([^\s]*):scope/, function (h0, h1) {
	                if (h1 === "") {
	                    return "> *";
	                } else {
	                    return "> " + h1;
	                }
	            });
	        }

	        g1 = g1.replace(/^(\s*)/, g1.trim() + prefix + "," + "$1" + prefix + " ").replace(/\s+/g, ' ');
	        return g1 + g2;
	    });

	    return css;
	}

	function addStyle(cssText, id) {
	    var ele = document.getElementById(_omi2["default"].STYLEPREFIX + id),
	        head = document.getElementsByTagName('head')[0];
	    if (ele && ele.parentNode === head) {
	        head.removeChild(ele);
	    }

	    var someThingStyles = document.createElement('style');
	    head.appendChild(someThingStyles);
	    someThingStyles.setAttribute('type', 'text/css');
	    someThingStyles.setAttribute('id', _omi2["default"].STYLEPREFIX + id);
	    if (!!window.ActiveXObject) {
	        someThingStyles.styleSheet.cssText = cssText;
	    } else {
	        someThingStyles.textContent = cssText;
	    }
	}

	exports["default"] = {
	    scoper: scoper,
	    addStyle: addStyle
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function scopedEvent(tpl, id) {
	    return tpl.replace(/<[\s\S]*?>/g, function (item) {
	        return item.replace(/on(abort|blur|cancel|canplay|canplaythrough|change|click|close|contextmenu|cuechange|dblclick|drag|dragend|dragenter|dragleave|dragover|dragstart|drop|durationchange|emptied|ended|error|focus|input|invalid|keydown|keypress|keyup|load|loadeddata|loadedmetadata|loadstart|mousedown|mouseenter|mouseleave|mousemove|mouseout|mouseover|mouseup|mousewheel|pause|play|playing|progress|ratechange|reset|resize|scroll|seeked|seeking|select|show|stalled|submit|suspend|timeupdate|toggle|volumechange|waiting|autocomplete|autocompleteerror|beforecopy|beforecut|beforepaste|copy|cut|paste|search|selectstart|wheel|webkitfullscreenchange|webkitfullscreenerror|touchstart|touchmove|touchend|touchcancel|pointerdown|pointerup|pointercancel|pointermove|pointerover|pointerout|pointerenter|pointerleave|Abort|Blur|Cancel|CanPlay|CanPlayThrough|Change|Click|Close|ContextMenu|CueChange|DblClick|Drag|DragEnd|DragEnter|DragLeave|DragOver|DragStart|Drop|DurationChange|Emptied|Ended|Error|Focus|Input|Invalid|KeyDown|KeyPress|KeyUp|Load|LoadedData|LoadedMetadata|LoadStart|MouseDown|MouseEnter|MouseLeave|MouseMove|MouseOut|MouseOver|MouseUp|MouseWheel|Pause|Play|Playing|Progress|RateChange|Reset|Resize|Scroll|Seeked|Seeking|Select|Show|Stalled|Submit|Suspend|TimeUpdate|Toggle|VolumeChange|Waiting|AutoComplete|AutoCompleteError|BeforeCopy|BeforeCut|BeforePaste|Copy|Cut|Paste|Search|SelectStart|Wheel|WebkitFullScreenChange|WebkitFullScreenError|TouchStart|TouchMove|TouchEnd|TouchCancel|PointerDown|PointerUp|PointerCancel|PointerMove|PointerOver|PointerOut|PointerEnter|PointerLeave)=('|")/g, function (eventStr, b, c, d, e) {
	            if (e.substr(eventStr.length + d, 14) === "Omi.instances[") return eventStr;
	            return eventStr += "Omi.instances[" + id + "].";
	        });
	    });
	};

	exports["default"] = scopedEvent;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var NODE_INDEX = '__set-dom-index__';
	var ELEMENT_TYPE = 1;
	var DOCUMENT_TYPE = 9;
	var HTML_ELEMENT = document.createElement('html');
	var BODY_ELEMENT = document.createElement('body');

	var isIE = function isIE(ver) {
	    var b = document.createElement('b');
	    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
	    return b.getElementsByTagName('i').length === 1;
	};

	/**
	 * @description
	 * Updates existing dom to match a new dom.
	 *
	 * @param {HTMLEntity} prev - The html entity to update.
	 * @param {String|HTMLEntity} next - The updated html(entity).
	 */
	function setDOM(prev, next) {
	    // Ensure a realish dom node is provided.
	    assert(prev && prev.nodeType, 'You must provide a valid node to update.');

	    // Alias document element with document.
	    if (prev.nodeType === DOCUMENT_TYPE) prev = prev.documentElement;

	    // If a string was provided we will parse it as dom.
	    if (typeof next === 'string') {
	        if (prev === document.documentElement) {
	            HTML_ELEMENT.innerHTML = next;
	            next = HTML_ELEMENT;
	        } else {
	            BODY_ELEMENT.innerHTML = next;
	            next = BODY_ELEMENT.firstChild;
	        }
	    }

	    if (isIE(8)) {
	        prev.parentNode.replaceChild(next, prev);
	        return;
	    }
	    // Update the node.
	    setNode(prev, next);
	}

	/**
	 * @private
	 * @description
	 * Updates a specific htmlNode and does whatever it takes to convert it to another one.
	 *
	 * @param {HTMLEntity} prev - The previous HTMLNode.
	 * @param {HTMLEntity} next - The updated HTMLNode.
	 */
	function setNode(prev, next) {
	    // Handle regular element node updates.
	    if (prev.nodeType === ELEMENT_TYPE) {
	        // Update all children (and subchildren).
	        setChildNodes(prev, prev.childNodes, next.childNodes);

	        // Update the elements attributes / tagName.
	        if (prev.nodeName === next.nodeName) {
	            // If we have the same nodename then we can directly update the attributes.
	            setAttributes(prev, prev.attributes, next.attributes);
	        } else {
	            // Otherwise clone the new node to use as the existing node.
	            var newPrev = next.cloneNode();
	            // Copy over all existing children from the original node.
	            while (prev.firstChild) {
	                newPrev.appendChild(prev.firstChild);
	            } // Replace the original node with the new one with the right tag.
	            prev.parentNode.replaceChild(newPrev, prev);
	        }
	    } else if (prev.nodeType === next.nodeType) {
	        // Handle other types of node updates (text/comments/etc).
	        // If both are the same type of node we can update directly.
	        prev.nodeValue = next.nodeValue;
	    } else {
	        // we have to replace the node.
	        prev.parentNode.replaceChild(next, prev);
	    }
	}

	/*
	 * @private
	 * @description
	 * Utility that will update one list of attributes to match another.
	 *
	 * @param {HTMLEntity} parent - The current parentNode being updated.
	 * @param {Attributes} prev - The previous attributes.
	 * @param {Attributes} next - The updated attributes.
	 */
	function setAttributes(parent, prev, next) {
	    var i, a, b, ns;

	    // Remove old attributes.
	    for (i = prev.length; i--;) {
	        a = prev[i];
	        ns = a.namespaceURI;
	        b = next.getNamedItemNS(ns, a.name);
	        if (!b) prev.removeNamedItemNS(ns, a.name);
	    }

	    // Set new attributes.
	    for (i = next.length; i--;) {
	        a = next[i];
	        ns = a.namespaceURI;
	        b = prev.getNamedItemNS(ns, a.name);
	        if (!b) {
	            // Add a new attribute.
	            next.removeNamedItemNS(ns, a.name);
	            prev.setNamedItemNS(a);
	        } else if (b.value !== a.value) {
	            // Update existing attribute.
	            b.value = a.value;
	        }
	    }
	}

	/*
	 * @private
	 * @description
	 * Utility that will update one list of childNodes to match another.
	 *
	 * @param {HTMLEntity} parent - The current parentNode being updated.
	 * @param {NodeList} prevChildNodes - The previous children.
	 * @param {NodeList} nextChildNodes - The updated children.
	 */
	function setChildNodes(parent, prevChildNodes, nextChildNodes) {
	    var key, a, b, oldPosition, newPosition;

	    // Convert nodelists into a usuable map.
	    var prev = keyNodes(prevChildNodes);
	    var next = keyNodes(nextChildNodes);

	    // Remove old nodes.
	    for (key in prev) {
	        if (next[key]) continue;
	        parent.removeChild(prev[key]);
	    }

	    // Set new nodes.
	    for (key in next) {
	        a = prev[key];
	        b = next[key];
	        if (a) {
	            // Update an existing node.
	            setNode(a, b);
	            // Check if the node has moved in the tree.
	            oldPosition = a[NODE_INDEX];
	            newPosition = b[NODE_INDEX];
	            if (oldPosition === newPosition) continue;
	            // Check if the node has already been properly positioned.
	            if (prevChildNodes[newPosition] === a) continue;
	            // Reposition node.
	            parent.insertBefore(a, prevChildNodes[newPosition]);
	        } else {
	            // Append the new node.
	            parent.appendChild(b);
	        }
	    }
	}

	/**
	 * @private
	 * @description
	 * Converts a nodelist into a keyed map.
	 * This is used for diffing while keeping elements with 'data-key' or 'id' if possible.
	 *
	 * @param {NodeList} childNodes - The childNodes to convert.
	 * @return {Object}
	 */
	function keyNodes(childNodes) {
	    var result = {};

	    for (var i = childNodes.length, el; i--;) {
	        el = childNodes[i];
	        el[NODE_INDEX] = i;
	        result[getKey(el) || i] = el;
	    }

	    return result;
	}

	/**
	 * @private
	 * @description
	 * Utility to try to pull a key out of an element.
	 * (Uses 'id' if possible and falls back to 'data-key')
	 *
	 * @param {HTMLEntity} node - The node to get the key for.
	 * @return {String}
	 */
	function getKey(node) {
	    if (node.nodeType !== ELEMENT_TYPE) return;
	    return node.getAttribute('data-key') || node.id;
	}

	/**
	 * Confirm that a value is truthy, throws an error message otherwise.
	 *
	 * @param {*} val - the val to test.
	 * @param {String} msg - the error message on failure.
	 * @throws Error
	 */
	function assert(val, msg) {
	    if (!val) throw new Error('set-dom: ' + msg);
	}

	exports['default'] = setDOM;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	var _alloyFinger = __webpack_require__(9);

	var _alloyFinger2 = _interopRequireDefault(_alloyFinger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var OmiFinger = {};

	OmiFinger.init = function () {
	    _index2['default'].extendPlugin('omi-finger', function (dom, instance) {
	        var finger = new _alloyFinger2['default'](dom, {
	            tap: instance[dom.getAttribute('onTap')]
	        });
	    });
	};

	OmiFinger.destroy = function () {
	    _index2['default'].plugins['omi-finger'] = null;
	    delete _index2['default'].plugins['omi-finger'];
	};

	exports['default'] = OmiFinger;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* AlloyFinger v0.1.4
	 * By dntzhang
	 * Github: https://github.com/AlloyTeam/AlloyFinger
	 */
	;(function () {
	    function getLen(v) {
	        return Math.sqrt(v.x * v.x + v.y * v.y);
	    }

	    function dot(v1, v2) {
	        return v1.x * v2.x + v1.y * v2.y;
	    }

	    function getAngle(v1, v2) {
	        var mr = getLen(v1) * getLen(v2);
	        if (mr === 0) return 0;
	        var r = dot(v1, v2) / mr;
	        if (r > 1) r = 1;
	        return Math.acos(r);
	    }

	    function cross(v1, v2) {
	        return v1.x * v2.y - v2.x * v1.y;
	    }

	    function getRotateAngle(v1, v2) {
	        var angle = getAngle(v1, v2);
	        if (cross(v1, v2) > 0) {
	            angle *= -1;
	        }

	        return angle * 180 / Math.PI;
	    }

	    var HandlerAdmin = function HandlerAdmin(el) {
	        this.handlers = [];
	        this.el = el;
	    };

	    HandlerAdmin.prototype.add = function (handler) {
	        this.handlers.push(handler);
	    };

	    HandlerAdmin.prototype.del = function (handler) {
	        if (!handler) this.handlers = [];

	        for (var i = this.handlers.length; i >= 0; i--) {
	            if (this.handlers[i] === handler) {
	                this.handlers.splice(i, 1);
	            }
	        }
	    };

	    HandlerAdmin.prototype.dispatch = function () {
	        for (var i = 0, len = this.handlers.length; i < len; i++) {
	            var handler = this.handlers[i];
	            if (typeof handler === 'function') handler.apply(this.el, arguments);
	        }
	    };

	    function wrapFunc(el, handler) {
	        var handlerAdmin = new HandlerAdmin(el);
	        handlerAdmin.add(handler);

	        return handlerAdmin;
	    }

	    var AlloyFinger = function AlloyFinger(el, option) {

	        this.element = typeof el == 'string' ? document.querySelector(el) : el;

	        this.start = this.start.bind(this);
	        this.move = this.move.bind(this);
	        this.end = this.end.bind(this);
	        this.cancel = this.cancel.bind(this);
	        this.element.addEventListener("touchstart", this.start, false);
	        this.element.addEventListener("touchmove", this.move, false);
	        this.element.addEventListener("touchend", this.end, false);
	        this.element.addEventListener("touchcancel", this.cancel, false);

	        this.preV = { x: null, y: null };
	        this.pinchStartLen = null;
	        this.scale = 1;
	        this.isDoubleTap = false;

	        var noop = function noop() {};

	        this.rotate = wrapFunc(this.element, option.rotate || noop);
	        this.touchStart = wrapFunc(this.element, option.touchStart || noop);
	        this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
	        this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
	        this.pinch = wrapFunc(this.element, option.pinch || noop);
	        this.swipe = wrapFunc(this.element, option.swipe || noop);
	        this.tap = wrapFunc(this.element, option.tap || noop);
	        this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
	        this.longTap = wrapFunc(this.element, option.longTap || noop);
	        this.singleTap = wrapFunc(this.element, option.singleTap || noop);
	        this.pressMove = wrapFunc(this.element, option.pressMove || noop);
	        this.touchMove = wrapFunc(this.element, option.touchMove || noop);
	        this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
	        this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);

	        this.delta = null;
	        this.last = null;
	        this.now = null;
	        this.tapTimeout = null;
	        this.singleTapTimeout = null;
	        this.longTapTimeout = null;
	        this.swipeTimeout = null;
	        this.x1 = this.x2 = this.y1 = this.y2 = null;
	        this.preTapPosition = { x: null, y: null };
	    };

	    AlloyFinger.prototype = {
	        start: function start(evt) {
	            if (!evt.touches) return;
	            this.now = Date.now();
	            this.x1 = evt.touches[0].pageX;
	            this.y1 = evt.touches[0].pageY;
	            this.delta = this.now - (this.last || this.now);
	            this.touchStart.dispatch(evt);
	            if (this.preTapPosition.x !== null) {
	                this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30;
	            }
	            this.preTapPosition.x = this.x1;
	            this.preTapPosition.y = this.y1;
	            this.last = this.now;
	            var preV = this.preV,
	                len = evt.touches.length;
	            if (len > 1) {
	                this._cancelLongTap();
	                this._cancelSingleTap();
	                var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
	                preV.x = v.x;
	                preV.y = v.y;
	                this.pinchStartLen = getLen(preV);
	                this.multipointStart.dispatch(evt);
	            }
	            this.longTapTimeout = setTimeout(function () {
	                this.longTap.dispatch(evt);
	            }.bind(this), 750);
	        },
	        move: function move(evt) {
	            if (!evt.touches) return;
	            var preV = this.preV,
	                len = evt.touches.length,
	                currentX = evt.touches[0].pageX,
	                currentY = evt.touches[0].pageY;
	            this.isDoubleTap = false;
	            if (len > 1) {
	                var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

	                if (preV.x !== null) {
	                    if (this.pinchStartLen > 0) {
	                        evt.scale = getLen(v) / this.pinchStartLen;
	                        this.pinch.dispatch(evt);
	                    }

	                    evt.angle = getRotateAngle(v, preV);
	                    this.rotate.dispatch(evt);
	                }
	                preV.x = v.x;
	                preV.y = v.y;
	            } else {
	                if (this.x2 !== null) {
	                    evt.deltaX = currentX - this.x2;
	                    evt.deltaY = currentY - this.y2;
	                } else {
	                    evt.deltaX = 0;
	                    evt.deltaY = 0;
	                }
	                this.pressMove.dispatch(evt);
	            }

	            this.touchMove.dispatch(evt);

	            this._cancelLongTap();
	            this.x2 = currentX;
	            this.y2 = currentY;
	            if (len > 1) {
	                evt.preventDefault();
	            }
	        },
	        end: function end(evt) {
	            if (!evt.changedTouches) return;
	            this._cancelLongTap();
	            var self = this;
	            if (evt.touches.length < 2) {
	                this.multipointEnd.dispatch(evt);
	            }
	            this.touchEnd.dispatch(evt);
	            //swipe
	            if (this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.preV.y - this.y2) > 30) {
	                evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
	                this.swipeTimeout = setTimeout(function () {
	                    self.swipe.dispatch(evt);
	                }, 0);
	            } else {
	                this.tapTimeout = setTimeout(function () {
	                    self.tap.dispatch(evt);
	                    // trigger double tap immediately
	                    if (self.isDoubleTap) {
	                        self.doubleTap.dispatch(evt);
	                        clearTimeout(self.singleTapTimeout);
	                        self.isDoubleTap = false;
	                    } else {
	                        self.singleTapTimeout = setTimeout(function () {
	                            self.singleTap.dispatch(evt);
	                        }, 250);
	                    }
	                }, 0);
	            }

	            this.preV.x = 0;
	            this.preV.y = 0;
	            this.scale = 1;
	            this.pinchStartLen = null;
	            this.x1 = this.x2 = this.y1 = this.y2 = null;
	        },
	        cancel: function cancel(evt) {
	            clearTimeout(this.singleTapTimeout);
	            clearTimeout(this.tapTimeout);
	            clearTimeout(this.longTapTimeout);
	            clearTimeout(this.swipeTimeout);
	            this.touchCancel.dispatch(evt);
	        },
	        _cancelLongTap: function _cancelLongTap() {
	            clearTimeout(this.longTapTimeout);
	        },
	        _cancelSingleTap: function _cancelSingleTap() {
	            clearTimeout(this.singleTapTimeout);
	        },
	        _swipeDirection: function _swipeDirection(x1, x2, y1, y2) {
	            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
	        },

	        on: function on(evt, handler) {
	            if (this[evt]) {
	                this[evt].add(handler);
	            }
	        },

	        off: function off(evt, handler) {
	            if (this[evt]) {
	                this[evt].del(handler);
	            }
	        },

	        destroy: function destroy() {
	            if (this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
	            if (this.tapTimeout) clearTimeout(this.tapTimeout);
	            if (this.longTapTimeout) clearTimeout(this.longTapTimeout);
	            if (this.swipeTimeout) clearTimeout(this.swipeTimeout);

	            this.element.removeEventListener("touchstart", this.start);
	            this.element.removeEventListener("touchmove", this.move);
	            this.element.removeEventListener("touchend", this.end);
	            this.element.removeEventListener("touchcancel", this.cancel);

	            this.rotate.del();
	            this.touchStart.del();
	            this.multipointStart.del();
	            this.multipointEnd.del();
	            this.pinch.del();
	            this.swipe.del();
	            this.tap.del();
	            this.doubleTap.del();
	            this.longTap.del();
	            this.singleTap.del();
	            this.pressMove.del();
	            this.touchMove.del();
	            this.touchEnd.del();
	            this.touchCancel.del();

	            this.preV = this.pinchStartLen = this.scale = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = null;

	            return null;
	        }
	    };

	    if (typeof module !== 'undefined' && ( false ? 'undefined' : _typeof(exports)) === 'object') {
	        module.exports = AlloyFinger;
	    } else {
	        window.AlloyFinger = AlloyFinger;
	    }
	})();

/***/ }
/******/ ]);