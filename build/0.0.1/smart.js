/**
 * smart - A light javascript library.
 * @version v0.0.1
 * @author hankewins
 * @link https://github.com/hankewins/smartjs#readme
 * @license MIT
 */
;(function(){
	// 三个臭皮匠，顶过诸葛亮！
	// smart 因智慧过生，有你、有我、有他
    var smart = {
        namespace: function(name){
            if (!name){
            	return window;
            }

            var nms = name.split('.');
            var tmp = window;

            for (var i = 0; i < nms.length; i++){
                var ns = nms[i];
                tmp[ns] = tmp[ns] || {};
                tmp = tmp[ns];
            }

            return tmp;
        },
        package:function(ns,func){
            var target;
            if(typeof ns == "function"){
                func=ns;
                target = window; 
            }
            else if(typeof ns == "string"){
                target = this.namespace(ns);
            }
            else if(typeof ns == "object"){
                target  = ns;
            }
            func.call(target,this);
        },
        extend: function(destination, source){
            for (var i in source){
            	if (source.hasOwnProperty(i)){
            		destination[i] = source[i];
            	}
            }

            return destination;
        },
        /**
         * 类数组对象转换成数组
         * 
         * @name ota [oject to array]
         * @function
         * @param {Object} arrObj 类数组对象
         * @return {Array} 转换后的数组
         */  
        ota: function(arrObj){
        	var arr = [];
        	
        	try{
        		return arr.slice.call(arrObj); 
        	}
        	catch(e){
        		for (var i = 0, lens = arrObj.length; i < lens; i++){
        			arr.push(arrObj);
        		}

        		return arr;
        	}
        },
        /**
         * 空对象的判断
         * @param  {Object}  obj obj参数
         * @return {Boolean} true || false
         */
        isEmptyObject: function(obj){
            for (var name in obj){
                return false;
            }
            return true;
        },
        /**
         * 把字符串填充为指定的长度
         * @param  {[type]} str      [description]
         * @param  {[type]} length   [description]
         * @param  {[type]} pad_str  [description]
         * @param  {[type]} pad_type [description]
         * @return {[type]}          [description]
         */
        str_pad: function(str, length, pad_str, pad_type){
            var pad_str  = pad_str || '';
            var pad_arr  = ["STR_PAD_BOTH", "STR_PAD_LEFT", "STR_PAD_RIGHT"];
            var pad_type = pad_type &&  pad_arr.indexOf(pad_type) ? pad_type : pad_arr[2];
        
            if (!str || !length || !smart.isString(str) || smart.isNumber(length)){
                return;
            }

            if (length <= str.length){
                return str;
            }

            if (pad_type == pad_arr[0]){
                while(length--){
                    str = (length%2 == 0 )? str : str + pad_str;
                }
            } else if (pad_type == pad_arr[1]){
                while(length--){
                    str = pad_str + str;
                }
            } else if (pad_type == pad_arr[2]){
                while(length--){
                    str = str + pad_str;
                }
            }
                
            return str;
        },
        forEach: function (obj, iterator, context) {
            var key;
            if (obj) {
                if (obj.forEach && obj.forEach !== this.forEach) {
                    obj.forEach(iterator, context);
                } else {
                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) {
                          iterator.call(context, obj[key], key);
                        }
                    }
                }
            }
            return obj;
        },
        trim: function(str){
            if(!str) return;
            return str.replace(/(^\s*)|(\s*$)/g,'');
        },
        ltrim: function(str){
            if(!str) return;
            return str.replace(/(^\s*)/g,'');
        },
        rtrim: function(str){
            if(!str) return;
            return str.replace(/(\s*$)/g,'');
        }
    };

    smart.package(function(){
    	var arr = ['Array', 'Object', 'Boolean', 'String', 'Function', 'Number', 'RegExp', 'Undefined', 'Null', 'IE'];
    	var ots = Object.prototype.toString;
    	// 
    	for (var i = 0; i < arr.length; i++){
    	    smart['is'+arr[i]] = (function(n){
                return function(o){
                	return ots.call(o) === "[object "+arr[n]+"]" ? true : false;
                } 
    	    })(i);
    	}
    });

    smart.extend(smart,{
        indexOf: function(arr, item){
            if (smart.isArray(arr)){
                return [].indexOf.call(arr,item);
            } else if (smart.isObject(arr)){
                for (var k in arr){
                    if (arr.hasOwnProperty(k) && arr[k] === item){
                        return k;
                    }
                }
            }
        },
        each:function(arr,callback){
            if(smart.isArray(arr)){
                return [].forEach.call(arr,callback);
            }
            else if(smart.isObject(arr)){
                for(var i in arr){
                    if(arr.hasOwnProperty(i)){
                        if(callback.call(arr[i],arr[i],i,arr) === false) {
                            return;
                        }
                    }
                }
            }
        },
        filter: function(arr, callback){
            if(smart.isArray(arr)){
                return [].filter.call(arr,callback);
            } else if(smart.isObject(arr)){
                var newObj = {};
                smart.each(arr, function(val, index){
                    if(callback(val,index)){
                        newObj[index] = val;
                    }
                    return newObj;
                });
            }
        }
    });

    window.lhy = window.smart = smart;

    if (typeof define === 'function'){
        define(function(){
            return lhy;
        });
    }
})();
/**
 *  smart.event.js
 */

smart.package(function(smart){

    var win = window;
    var doc = document;
    var smart = win.smart || (win.smart = {});
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
    smart.cache || (smart.cache = {});
    var cache = smart.cache.__event_cache = {};
    // 获取和设置元素或回调函数的唯一标识id
    var guid = function(element) {
        return element._guid || (element._guid = _guid++);
    }
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
        focus: { focus: 'focusin', blur: 'focusout' },
        hover: { mouseenter: 'mouseover', mouseleave: 'mouseout' }
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
        }
        // 增加属性，用于标记事件是否冒泡、是否被禁止默认事件，主要用于事件代理
        smart.forEach(methods, function(method, key) {
            var sourceMethod = source[key];
            event[key] = function() {
                this[method] = returnTrue;
                return sourceMethod && sourceMethod.apply(source, arguments);
            }
            // 默认方法
            event[method] = returnFalse;
        });
        // zepto.js
        if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault()) {
            event['isDefaultPrevented'] = returnTrue
        }
        return event;
    };
    // 复制原始事件属性，返回新创建的事件对象
    var proxyEvent = function(event) {
        var proxy, key;
        proxy = { originalEvent: event };
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
          return parent !== node && parent.contains(node)
        } :
        function(parent, node) {
          while (node && (node = node.parentNode))
            if (node === parent) return true
          return false
        }
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
            if ((!type || type == handle.type)
                && (!element || element == handle.elem)
                && (!callback || guid(callback) === guid(handle.callback))
                && (!selector || selector == handle.selector)) {
                result.push(handle);
            }
        }
        return result;
    }
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
            
            smart.forEach(type.split(/\s/), function(t){
                id = guid(element);
                // 获取存储在cache中的事件对象
                handles = cache[id] || (cache[id] = []);
                if (selector) {
                    // 判断selector存在时，事件代理函数为delegator
                    delegator = function(e) {
                        var evt;
                        target = e.target;
                        while(target != element) {
                            if (smart.util.matchesSelector(target, selector)) {
                                evt = proxyEvent(e);
                                evt.currentTarget = target;
                                return callback.apply(target, [evt]);
                            }
                            if (target.parentNode) {
                                target = target.parentNode;
                            }
                        }
                    }
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
                    }
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
                if ('addEventListener' in element) {
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
                while(i--) {
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
                })
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
                })
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
                        try { elem[t]() } 
                        catch (e) {}
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
                        if (evt.isImmediatePropagationStopped()) return false
                    }
                });
            });
        }
    };

    // 绑定单个事件函数
    smart.forEach(['focusin', 'focusout', 'focus', 'blur', 'load', 'resize', 'scroll', 'unload', 'click', 'dblclick',
    'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave',
    'change', 'select', 'keydown', 'keypress', 'keyup', 'error'], function(event) {
        Event[event] = function(elem, callback) {
            return callback ?
                Event.bind(event, elem, callback) :
                Event.trigger(event, elem);
        };
    });

    smart.event = Event;
});
// @import smart.core.js
// smart.http contains http params ajax
smart.package(function(smart){
    var http = {
    	/**
    	 * 序列化参数
    	 * @param  {[type]} param [description]
    	 * @return {[type]}       [description]
    	 */
        serializeParam: function(param){
            if(!param) return '';
            var arr = [];

            for (var k in param){
            	arr.push(encodeURIComponent(k) + '=' + encodeURIComponent(param[k]));
            }
            return arr.join('&');
        },
        getUrlParam: function(name, url, encode){
        	var reg = new RegExp('(?:\\?|&|#)' + name + '(=[^&]*)(?:$|#|&)','i'), matchs = reg.exec(url);
        	var str = matchs ? matchs[1] : '';
        	return !!encode ? encodeURIComponent(str) : str;
        },
	    ajax: function(options){
	    	var opts = options;
	    	var method = opts.method.toLocaleUpperCase();
	    	var isPost = 'POST' == method;
            var timeout = opts.timeout;
            var isComplete = false;
	    	var async = ('async' in opts) ? options.async : true; //默认为异步请求, 可以设置为同步
            
	    	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : false;

	    	if (!xhr){
	    		opts.error && opts.error.call(null, { ret : 999 , msg : 'Create XHR Error!' });
	    		return false;
	    	}

	    	var qstr = http.serializeParam(opts.data);

	    	!isPost && (opts.url = (options.url.indexOf('?') > -1 ? '?' : '&') + qstr);

	    	xhr.open(method, opts.url, async);

	    	isPost && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    var status = xhr.status;
                    if(status == 200 && status < 300 || status == 304 || status == 0){
                        var response = xhr.responseText.replace(/\r|\n|\t/gi,'');
                        var json = null;
                        try{
                            json = JSON.parse(response);
                        }catch(e){
                            console.log('response is not JSON.');
                        }
                        opts.success && opts.success(json,xhr);
                    } else {
                        opts.error && opts.error(xhr);
                    }
                    isComplete = true;
                    if(timer){
                        clearTimeout(timer);
                    }
                }
            };

            xhr.send(isPost ? qstr : void(0));

            if(timeout){
                timer = setTimeout(function(){
                    if(!isComplete){
                        xhr.abort();//不abort同一url无法重新发送请求？
                        opts.timeout && opts.timeout(xhr);
                    }
                },timeout);
            }

            return xhr;

	    }
    };

    smart.http = http;
});
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
                node.nodeType == 1 && ret.push(node);
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

    smart.$ = smart.dom = dom;
});
/** 
 * @description
 * Package: smart.cookie
 * Need package:smart.core.js
 */
smart.package(function() {
	var cookie = {
		options: {
			path: '/',
			secure: false,
			domain: false,
			expires: false
		},
		_setOptions:function(opt){
			if(opt==undefined) return this.options;
			return smart.extend(opt,this.options);
		},
		setItem: function(sKey, value /*options*/ ) {
			var opt=this._setOptions(arguments[2]);
			value = encodeURIComponent(value);
			if (opt.path) value += '; path=' + opt.path;
			if (opt.domain) value += '; domain=' + opt.domain;
			if (opt.expires) {
				var date = new Date();
				date.setTime(date.getTime() + opt.expires * 24 * 60 * 60 * 1000);
				value += '; expires=' + date.toGMTString();
			}
			if (opt.secure) value += '; secure';
			document.cookie = sKey + '=' + value;

		},

		getItem: function(sKey) {
			var value = document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(skey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
			return value ? decodeURIComponent(value) : null;

		},
		
		removeItem: function(sKey /*options*/ ) {
			if (!sKey || !this.hasItem(sKey)) return false;
			var opt=this._setOptions(arguments[1]),
				value = '';
			value = "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			if (opt.domain) value += "; domain=" + opt.domain;
			if (opt.path) value += "; path=" + opt.path;
			document.cookie = encodeURIComponent(sKey) + "=" + value;
			return true;

		},
		hasItem: function(sKey) {
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\+")).test(document.cookie);
		}
	};
	
	smart.cookie = cookie;
});