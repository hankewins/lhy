/**
 * 起源：涉世未深的三个臭皮匠，因对前端的执着，带着各自的信念，开始 smart 创作之路。
 * 定位：smart 因智慧过生，有你、有我、有他，简单、易懂、轻便。
 */
(function(undefined) {
    //'use strict'
    var win = window,
        doc = document,
        slice = Array.prototype.slice,
        jsTypeArr = ['Object', 'Array', 'Function', 'String', 'Number', 'Null', 'Undefined'],
        smart = smart || {};
    // use jquery or zepto selector enginer
    smart.$ = win.jQuery || win.Zepto || win.ender || win.$;

    smart = {
        each: each,
        forEach: each,
        isEmptyObject: function(obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        },
        namespace: function(str) {
            var target = win,
                tmp;
            if (typeof str == 'string') {
                for (var i = 0, arr = str.split('.'); i < arr.length; i++) {
                    tmp = arr[i];
                    target[tmp] = target[tmp] || {};
                    target = target[tmp];
                }
            }

            return target;
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
        trim: function(str){
            return str.replace(/^\s+|\s+$/,'');
        }
    };

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
            for (var j = 0; j < len; j++) {
                if (scriptEls[j].src === fileSrc) return scriptEls[j];
            }
        }

        return fileSrc || scriptEls[len - 1];

    });

    // 定义应用的相关基础配置信息
    smart.util('application', function(module) {
        // 获取正在执行的Javascript文件的路径
        var currentScript = smart.util.currentScript();
        var staticPath = '', assetsRoot, webRoot, modulePath, env, reg;
        module = module || '';
        if(module){
            reg = new RegExp(module+'\\S+','ig');
        } else {
            reg = new RegExp(module+'\/[^\/]+$','ig');
        }
        modulePath = currentScript.src.replace(reg, module);
        staticPath = modulePath;

        if(currentScript.src.indexOf(location.host) > -1){
            webRoot = location.protocol + '//' + location.host;
            assetsRoot = webRoot;
        } else {
            webRoot = location.protocol + '//' + location.host;
            if(currentScript.src.indexOf('localhost') > -1){
                assetsRoot = 'http://localhost';
            } else {
                if(currentScript.src.indexOf('//') > -1){
                    var protocol = currentScript.src.substring(0,currentScript.src.indexOf('//') + 2);
                    var host = currentScript.src.replace(protocol,'');
                    host = host.substring(0, host.indexOf('/'));
                    assetsRoot = protocol + host;
                }
            }
        }

        return {
            staticPath: staticPath,
            assetsRoot: assetsRoot,
            webRoot: webRoot
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

    win.smart = smart;

}.call(this));