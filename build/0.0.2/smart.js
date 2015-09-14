/**
 * smart - A light javascript library.
 * @version v0.0.2
 * @author hankewins
 * @link https://github.com/hankewins/smartjs#readme
 * @license MIT
 */
/**
 * 起源：涉世未深的三个臭皮匠，因对前端的执着，带着各自的信念，开始 smart 创作之路。
 * 定位：smart 因智慧过生，有你、有我、有他，简单、易懂、轻便。
 */
(function(undefined) {
    //'use strict'
    var root = this || (typeof window !== 'undefined' ? window : global),
        win = window,
        doc = document,
        slice = Array.prototype.slice,
        jsTypeArr = ['Object', 'Array', 'Function', 'String', 'Number', 'Null', 'Undefined'],
        smart = smart || {};

    // use jquery or zepto selector enginer
    smart.$ = win.jQuery || win.Zepto || win.ender || win.$;

    extend(smart, {
        each: each,
        forEach: each,
        trim: function(str) {
            return str.replace(/^\s+|\s+$/g, '');
        },
        trimLeft: function(str) {
            return str.replace(/^\s+/g, '');
        },
        trimRight: function(str) {
            return str.replace(/\s+$/g, '');
        },
        isEmptyObject: function(obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        },
        namespace: function(str) {
            var target = null,
                i, arr = str.split('.'),
                len = arr.length;

            target = this;

            for (i = 0; i < arr.length; i++) {
                tmp = arr[i];
                target = target[tmp] = target[tmp] || {};
            }
            return this[arr[0]];
        },
        extend: function(target) {
            var deep, args = slice.call(arguments, 1);
            if (typeof target == 'boolean') {
                deep = target;
                target = args.shift();
            }

            each(args, function(index, item) {
                extend(target, item, deep);
            });

            return target;
        },
        package: function(name, func) {
            var target;
            if (typeof name == "function") {
                func = name;
                target = window;
            } else if (typeof name == "string") {
                target = this.namespace(name);
            } else if (typeof name == "object") {
                target = name;
            }

            func.call(target, this);

            return target;
        },
        util: function(name, func) {
            func = smart.isFunction(func) ? func : empty;

            if (smart.isString(name)) {
                smart.util[name] = func;
            } else if (smart.isFunction(name)) {
                smart.extend(smart.util, name());
            } else if (smart.isObject(name)) {
                smart.extend(smart.util, name);
            }
        },
        // http://www.cnblogs.com/haogj/archive/2013/01/15/2861950.html
        // http://www.cnblogs.com/zhangziqiu/archive/2011/06/27/DOMReady.html
        // https://github.com/jquery/jquery/blob/master/src/core/ready.js
        // https://github.com/ded/domready/blob/master/ready.js
        // Compatibility with IE6, IE7, and IE8 has been fully dropped. 
        ready: function(func) {
            var readyList = [],
                ieHack = doc.documentElement.doScroll,
                completed,
                loaded = (ieHack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

            if (!loaded) {
                doc.addEventListener('DOMContentLoaded', completed = function() {
                    doc.removeEventListener('DOMContentLoaded', completed, false);
                    loaded = 1;
                    while ((completed = readyList.shift())) {
                        completed();
                    }
                }, false);
            }

            return loaded ? setTimeout(func) : readyList.push(func);
        }
    });

    each(jsTypeArr, function(index, item) {
        smart['is' + item] = function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + item + ']' ? true : false;
        };
    });

    // 参考的资料信息
    // https://github.com/JamesMGreene/document.currentScript
    // https://developer.mozilla.org/zh-CN/docs/Web/API/document.currentScript
    smart.util('currentScript', function() {
        var scriptEls = doc.getElementsByTagName('script'),
            scriptLen = scriptEls.length,
            fileSrc;

        if (doc.currentScript) {
            return doc.currentScript;
        }

        if (scriptLen === 0) {
            return;
        }

        if (scriptEls === 1) {
            return scriptEls[0];
        }

        if ('readyState' in scriptEls[0]) {
            for (var i = scriptEls.length; i--;) {
                if (scriptEls[i].readyState === 'interactive') {
                    return scriptEls[i];
                }
            }
        }

        if (doc.readyState === 'loading') {
            return scriptEls[len - 1];
        }

        try {
            throw Error('get currentJS');
        } catch (e) {
            if (e.fileName) //firefox
                fileSrc = e.fileName;
            else if (e.stack) //chrome
            //fileSrc = e.stack.split(/\s+/).pop().replace(/(\:\d+)+$/, '');
                fileSrc = e.stack.match(/\([^\)]+\:\d+\)/)[0].replace(/^\(|(\:\d+)+\)$/g, '');
            else if (e.sourceURL) //safari
                fileSrc = e.sourceURL;
        }

        if (fileSrc) {
            for (var j = 0; j < scriptLen; j++) {
                if (scriptEls[j].src === fileSrc) return scriptEls[j];
            }
        }

        return fileSrc || scriptEls[scriptLen - 1];

    });

    // 定义应用的相关基础配置信息
    smart.util('application', function(options) {
        // 获取正在执行的Javascript文件的路径
        var currentScript = smart.util.currentScript();
        var staticPath = '',
            format = 'json',
            assetsRoot, webRoot, modulePath, env, reg;
        var defaults = {};
        var opts = smart.extend(defaults, options);

        module = opts.module || '';

        if (module) {
            reg = new RegExp(module + '\\S+', 'ig');
        } else {
            reg = new RegExp(module + '\/[^\/]+$', 'ig');
        }
        modulePath = currentScript.src.replace(reg, module);
        staticPath = modulePath;

        if (currentScript.src.indexOf(location.host) > -1) {
            webRoot = location.protocol + '//' + location.host;
            assetsRoot = webRoot;
        } else {
            webRoot = location.protocol + '//' + location.host;
            if (currentScript.src.indexOf('localhost') > -1) {
                assetsRoot = 'http://localhost';
            } else {
                if (currentScript.src.indexOf('//') > -1) {
                    var protocol = currentScript.src.substring(0, currentScript.src.indexOf('//') + 2);
                    var host = currentScript.src.replace(protocol, '');
                    host = host.substring(0, host.indexOf('/'));
                    assetsRoot = protocol + host;
                }
            }
        }

        console.log(/localhost|dev.demo.gionee.com|demo.3gtest.gionee.com/.test(webRoot));
        console.log(opts.env === 'test');

        if (opts.env === 'test' && /localhost|dev.demo.gionee.com|demo.3gtest.gionee.com/.test(webRoot)) {
            format = 'jsonp';
        }

        return {
            staticPath: staticPath,
            assetsRoot: assetsRoot,
            webRoot: webRoot,
            format: format
        };
    });

    // Empty function, used as default callback
    function empty() {}

    function each(collection, callback) {
        var oToString = Object.prototype.toString;

        if (oToString.call(collection) === '[object Array]') {
            for (var i = 0, lens = collection.length; i < lens; i++) {
                callback.call(collection, i, collection[i]);
            }
        }

        if (oToString.call(collection) === '[object Object]') {
            for (var k in collection) {
                callback.call(collection, k, collection[k]);
            }
        }
    }

    function extend(target, source, deep) {
        for (var k in source) {
            if (deep && (smart.isObject(source[k]) || smart.isArray(source[k]))) {
                if (smart.isObject(source[k]) && !smart.isObject(target[k])) {
                    target[k] = {};
                }

                if (smart.isArray(source[k]) && !smart.isArray(target[k])) {
                    target[k] = [];
                }

                extend(target[k], source[k], deep);

            } else if (source[k] !== undefined) {
                target[k] = source[k];
            }
        }
    }

    // http://www.360doc.com/content/13/0419/11/11247313_279415878.shtml
    function _initStartTime() {
        var performance, startTime;

        performance = win.performance || win.webkitPerformance || win.mozPerformance || win.msPerformance;

        if (performance && performance.timing && performance.timing.navigationStart) {

            startTime = performance.timing.navigationStart;

            // chrome browser

        } else if (win.chrome && win.chrome.csi && win.chrome.csi().startE) {

            startTime = win.chrome.csi().startE;

            //http://www.360doc.com/content/13/0419/11/11247313_279415878.shtml
        } else if (win.gtbExternal && win.gtbExternal.startE) {

            startTime = win.gtbExternal.startE;

        }

        // 解决火狐7.8的bug
        if (navigator.userAgent.match(/Firefox\/[78]\./)) {

            this.navigationStart = performance.timing.unloadEventStart || performance.timing.fetchStart || undefined;

        }

        return startTime;
    }


    win.smart = smart;

}.call(this));
// import smart.core.js
// smart.dom.js
smart.package(function(smart){
    var doc = document;
    var div = doc.createElement('div');
    // IE 10.0+ Firefox 3.6+ Chrome 8.0+ Safari 5.1+ Opera 11.5+ Android 3.0
    // http://caniuse.com/classlist
    var supportNavtiveClassList = 'classList' in document.documentElement;

    var dom = {
        one: function(selector, context){
            if (!selector){
                return;
            }
            var ctx = context || doc;
            return ctx.querySelector(selector);         
        },
        all: function(selector, context){
            if (!selector){
                return;
            }
            var ctx = context || doc;
            return ctx.querySelectorAll(selector);
        },
        // querySelector slower than getElementById
        // querySelectorAll slower than getElementsByTagName
        // http://www.w3cfuns.com/article-5593688-1-1.html 
        id: function(id){
            return doc.getElementById(id);
        },

        tagName: function(tagName, context){
            var ctx = context || doc;
            return ctx.getElementByTagName(tagName);
        },
        matchesSelector: function(elem, selector){
            if (!elem || !selector) return;
            var matches = elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.oMatchesSelector || elem.msMatchesSelector;
            if(matches) return matches.call(elem, selector);

        },
        addClass: function(elem, className){
            if (supportNavtiveClassList){
                if(!elem || !className || !dom.hasClass(elem, className)){
                    return;
                }
                elem.classList.add(className);
            } else {
                if (!elem || !className || !dom.hasClass(elem, className)){
                    return;
                }
                elem.className += " " + className;
            }
        },
        hasClass: function(elem, className){
            if (supportNavtiveClassList){
                if (!elem || !className){
                    return false;
                }
                elem.classList.contains(className);                
            } else {
                if (!elem || !className){
                    return false;
                }
                return -1 < ' ' + elem.className + ' '.indexOf(' ' + className + ' ');
            }
        },
        removeClass: function(elem, className){
            if (supportNavtiveClassList){
                if (!elem || !className || !dom.hasClass(elem, className)){
                    return;
                }
                elem.classList.remove(className);
            } else {
                if (!elem || !className || !dom.hasClass(elem, className)){
                    return;
                }
                elem.className = elem.className.replace(new RegExp('(?:^|\\s+)' + className + '(?:$|\\s+)'), ' ');
            }
        },
        toggleClass: function(elem, className){
            if (dom.hasClass(elem, className)){
                dom.removeClass(elem, className);
            } else {
                dom.addClass(elem, className);
            }
        },
        replaceClass: function(elem, old, newstr){
            if (dom.hasClass(elem, old)){
                elem.className = elem.className.replace(new RegExp('(?:^|\\s+)' + old + '(?:$|\\s+)'), ' ' + newstr + ' ');
            }
        },
        children: function(elem){
            if (elem.childElementCount){
                return [].slice.call(el.children);
            }

            var ret = [];
            for (var node = elem.firstChild; node; node = node.nextSlibling){
                (node.nodeType === 1) && ret.push(node);
            }

            return ret;
        },
        next: function(elem){
            if ("nextElementSibling" in elem){
                return elem.nextElementSibling;
            }

            while(elem = elem.nextSlibling){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        prev: function(elem){
            if("previousElementSibling" in elem){
                return elem.previousElementSibling;
            }

            while(elem = elem.previousSibling){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        first: function(elem){
            if("firstElementChild" in elem){
                return elem.firstElementChild;
            }

            while(elem = elem.firstChild){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        last: function(elem){
            if("lastElementChild" in elem){
                return elem.firstElementChild;
            }

            while(elem = elem.lastChild){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        parent: function(elem){
            if("parentElement" in elem){
                return elem.parentElement;
            }

            while(elem = elem.parentNode){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        /**
         * 选择器过滤
         * @param  {Array}   elems     元素集合
         * @param  {Object}  selector  选择器过滤项
         * @return {Boolean}           是否过滤成功
         */
        filter: function (elems, selector){
            return smart.filter(elems, function(elem){
                return dom.matchesSelector(elems, selector);
            });
        },
        /**
         * 向后插入元素
         * @param  {Object}  parentElement     父类元素
         * @param  {Object}  newElement        插入的元素
         * @param  {Object}  refernceElement   参考元素
         * @return {Object}                    被插入的元素
         */
        insertAfter: function(parentElement, newElement, refernceElement){
            var next = refernceElement.nextSibling;
            if(next){
                parentElement.insertBefore(newElement, next);
            }
            else{
                parentElement.appendChild(newElement);
            }
            return newElement;
        }
    };

    smart.dom = dom;
});
/**
 *  smart.event.js
 */

smart.package(function(smart) {

    var win = window;
    var doc = document;
    // 标识绑定元素与回调函数的唯一性
    var _guid = 1;
    /*缓存绑定的元素、事件、回调、代理函数
    smart.cache.__event_cache = {
        1: [{
            type: type,             // 绑定的事件类型
            elem: element,          // 绑定的元素
            selector: selector,     // 事件代理元素
            callback: callback,     // 回调函数
            delegator: delegator,   // 事件代理时的回调函数
            index: handles.length,  // 标志位，用于解除监听时删除使用
            proxy: function(){}     // 每个元素的事件监听函数
        },{}]
    }*/
    smart.cache = smart.cache || {};
    var cache = smart.cache.__event_cache = {};
    // 获取和设置元素或回调函数的唯一标识id
    var guid = function(element) {
        return element._guid || (element._guid = _guid++);
    };
    var returnTrue = function() {
        return true;
    };
    var returnFalse = function() {
        return false;
    };
    // 是否支持onfocusin和onfocusout事件
    var isFocusinSupported = 'onfocusin' in window;
    // 鼠标事件类型，用于触发createEvent时使用
    var mouseEvents = {};
    smart.forEach(['click', 'mouseup', 'mousemove', 'mousedown'], function(e) {
        mouseEvents[e] = 'MouseEvents';
    });
    // 标识特殊事件
    var specialEvent = {
        focus: {
            focus: 'focusin',
            blur: 'focusout'
        },
        hover: {
            mouseenter: 'mouseover',
            mouseleave: 'mouseout'
        }
    };
    // 获取绑定事件
    // 当浏览器支持focusin时，focus用focusin代替绑定
    // 当事件为mouseenter、mouseleave时用真实事件mouseover绑定
    var realEvent = function(type) {
        return specialEvent.hover[type] || (isFocusinSupported && specialEvent.focus[type]) || type;
    };
    /* 对事件对象进行处理，增加三个属性，用于标识事件的状态
     * isDefaultPrevented 判断是否禁用默认事件
     * isImmediatePropagationStopped 判断是否禁用事件冒泡和此元素同类型事件的冒泡
     * isPropagationStopped 判断是否禁用事件冒泡
     */
    var compatible = function(event) {
        if ('isDefaultPrevented' in event) return event;
        var source,
            methods;

        // 原始事件
        source = event;
        methods = {
            preventDefault: 'isDefaultPrevented',
            stopPropagation: 'isPropagationStopped',
            stopImmediatePropagation: 'isImmediatePropagationStopped'
        };
        // 增加属性，用于标记事件是否冒泡、是否被禁止默认事件，主要用于事件代理
        smart.forEach(methods, function(method, key) {
            var sourceMethod = source[key];
            event[key] = function() {
                this[method] = returnTrue;
                return sourceMethod && sourceMethod.apply(source, arguments);
            };
            // 默认方法
            event[method] = returnFalse;
        });
        // zepto.js
        if (source.defaultPrevented !== undefined ? source.defaultPrevented :
            'returnValue' in source ? source.returnValue === false :
            source.getPreventDefault && source.getPreventDefault()) {
            event.isDefaultPrevented = returnTrue;
        }
        return event;
    };
    // 复制原始事件属性，返回新创建的事件对象
    var proxyEvent = function(event) {
        var proxy, key;
        proxy = {
            originalEvent: event
        };
        for (key in event) {
            if (event[key] !== undefined) proxy[key] = event[key];
        }
        return proxy;
    };

    /* zepto.js $.contains
     * 判断node元素是为parent元素的子元素
     */
    var contains = doc.documentElement.contains ?
        function(parent, node) {
            return parent !== node && parent.contains(node);
        } :
        function(parent, node) {
            while (node && (node = node.parentNode))
                if (node === parent) return true;
            return false;
        };
    /* 查找缓存在cache中事件对象
     * 返回满足条件的事件对象
     */
    var findHandles = function(type, element, callback, selector) {
        var id,
            result = [],
            i,
            handles, handle;

        handles = cache[guid(element)];
        if (!handles) {
            return result;
        }
        i = handles.length;
        while (i--) {
            handle = handles[i];
            if ((!type || type == handle.type) && (!element || element == handle.elem) && (!callback || guid(callback) === guid(handle.callback)) && (!selector || selector == handle.selector)) {
                result.push(handle);
            }
        }
        return result;
    };
    var Event = {
        /** 绑定事件，增加绑定事件对象至cache中
         * @element 事件对象
         * @type 事件类型
         * @callback 事件回调参数
         * @selector 事件代理元素
         */
        add: function(element, type, callback, selector) {
            var id, handles, i,
                handle = {},
                delegator, fn, result,
                target;

            smart.forEach(type.split(/\s/), function(t) {
                id = guid(element);
                // 获取存储在cache中的事件对象
                handles = cache[id] || (cache[id] = []);
                if (selector) {
                    // 判断selector存在时，事件代理函数为delegator
                    delegator = function(e) {
                        var evt;
                        target = e.target;
                        while (target != element) {
                            if (smart.util.matchesSelector(target, selector)) {
                                evt = proxyEvent(e);
                                evt.currentTarget = target;
                                return callback.apply(target, [evt]);
                            }
                            if (target.parentNode) {
                                target = target.parentNode;
                            }
                        }
                    };
                }
                // 创建事件缓存对象
                handle = {
                    type: t,
                    elem: element,
                    selector: selector,
                    callback: callback,
                    delegator: delegator,
                    index: handles.length,
                };
                // 模拟事件类型mouseenter和mouseleave事件
                if (t in specialEvent.hover) {
                    callback = function(e) {
                        // 获取mouseout和mouseover的relatedTarget对象
                        var related = e.relatedTarget;
                        if (!related || (related !== element && !contains(element, related)))
                            return handle.callback.apply(element, arguments);
                    };
                }
                fn = delegator || callback;
                // 事件监听函数
                handle.proxy = function(e) {
                    e = compatible(e);
                    if (e.isImmediatePropagationStopped()) return;
                    result = fn.apply(element, [e]);
                    if (result === false) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    return result;
                };
                handles.push(handle);
                if (element.addEventListener) {
                    element.addEventListener(realEvent(t), handle.proxy, false);
                }
            });
        },
        remove: function(element, type, callback, selector) {
            var id = guid(element);
            smart.forEach(type.split(/\s/), function(t) {
                var i, handles;
                handles = findHandles(t, element, callback, selector);
                i = handles.length;
                while (i--) {
                    delete cache[id][handles[i].index];
                    if ('removeEventListener' in element) {
                        element.removeEventListener(t, handles[i].proxy, false);
                    }
                }
            });
        },
        bind: function(type, element, callback) {
            Event.on(type, element, callback);
        },
        unbind: function(type, element, callback) {
            Event.off(type, element, callback);
        },
        /*
         * @type 事件类型
         * @element 绑定的元素
         * @selector 事件代理元素
         * @callback 事件回调
         */
        on: function(type, element, selector, callback) {

            if (type && !smart.isString(type)) {
                smart.forEach(type, function(fn, t) {
                    Event.on(t, element, selector, callback);
                });
                return;
            }
            if (smart.isFunction(selector)) {
                callback = selector;
                selector = undefined;
            }
            if (doc || element instanceof HTMLElement) {
                element = [element];
            }
            // 设置回调函数的唯一标识
            guid(callback);
            smart.forEach(element, function(elem) {
                Event.add(elem, type, callback, selector);
            });
        },
        off: function(type, element, selector, callback) {
            if (type && !smart.isString(type)) {
                smart.forEach(type, function(fn, t) {
                    Event.on(t, element, selector, callback);
                });
                return;
            }
            if (smart.isFunction(selector)) {
                callback = selector;
                selector = undefined;
            }
            if (doc || element instanceof HTMLElement) {
                element = [element];
            }
            smart.forEach(element, function(elem) {
                Event.remove(elem, type, callback, selector);
            });
        },
        trigger: function(type, element, args) {
            if (doc || element instanceof HTMLElement) {
                element = [element];
            }
            if (!smart.isString(type)) return;
            smart.forEach(element, function(elem) {
                smart.forEach(type.split(/\s/), function(t) {
                    var evt,
                        handles,
                        i;

                    if (/^(focus|blur)$/.test(t)) {
                        try {
                            elem[t]();
                        } catch (e) {}
                        return;
                    }
                    // 创建自定义事件
                    evt = doc.createEvent(mouseEvents[t] || 'Events');
                    // 初始化事件
                    evt.initEvent(t, true, true);
                    // 增加事件属性，用于标识冒泡状态和是否禁用默认事件状态
                    evt = compatible(evt);
                    // 创建新的事件对象
                    evt = proxyEvent(evt);
                    // 修改事件的触发元素
                    evt.target = elem;
                    if (args && smart.isObject(args)) {
                        for (var o in args) evt[o] = args[o];
                    }
                    // 查找缓存的事件对象
                    handles = findHandles(t, elem);
                    i = handles.length;
                    while (i--) {
                        // 遍历循环执行回调
                        handles[i].proxy(evt);
                        if (evt.isImmediatePropagationStopped()) return false;
                    }
                });
            });
        }
    };

    // 绑定单个事件函数
    smart.forEach(['focusin', 'focusout', 'focus', 'blur', 'load', 'resize', 'scroll', 'unload', 'click', 'dblclick',
        'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave',
        'change', 'select', 'keydown', 'keypress', 'keyup', 'error'
    ], function(event) {
        Event[event] = function(elem, callback) {
            return callback ?
                Event.bind(event, elem, callback) :
                Event.trigger(event, elem);
        };
    });

    smart.event = Event;
});