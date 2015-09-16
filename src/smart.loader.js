/* 
* @Author: hankewins
* @Date:   2015-09-10 11:40:39
* @Last Modified by:   hankewins
* @Last Modified time: 2015-09-16 14:38:09
*/
smart.package(function(){
    var win = window, doc = win.document;
    var _global_loaded_cache = {};

    // 定义smart.loader命名空间
    smart.namespace('loader');
    // 单文件可以是字符串，多文件必需是数据
    smart.each(['inc', 'include', 'require', 'use'], function(index, item){
        smart.loader[item] = function(){
            var args = arguments, paths = args[0], func = args[1];
            if(smart.isString(paths)){
                paths = [paths];
            }
            _mainFileLoad(paths, func);
        };
    });

    function _mainFileLoad(paths, func){
        smart.each(paths, function(index, item){
            var ext = _getFileExt(item);
            if(ext === 'css'){
                _cssFileLoad({url:item}, func);
            } else if(ext === 'js') {
                _scriptFileLoad({url:item}, func);
            }
        });
    }

    function _getFileExt(file){
        var reg = /\b\.(css|js)\b/gi, ext = file.match(reg)[0];

        if(ext === '.js'){
            ext = 'js';
        } else if(ext === '.css'){
            ext = 'css';
        } else {
            ext = 'unknow';
        }
        return ext;
    }

    // 非阻塞式加载
    function nonblockLoad(opt, func){
        if(!opt || !smart.isObject(opt)) return;

        if(isCss){
            _cssFileLoad(opt, func);
        } else {
            _scriptFileLoad(opt, func);
        }
    }

    function _cssFileLoad(opt, func){
        var node = doc.createElement('link');
        var head = doc.head || doc.getElementsByTagName('head')[0];

        node.setAttribute('type', 'text/css');
        node.setAttribute('rel', 'stylesheet');
        node.setAttribute('href', opt.url);

        head.appendChild(node);
    }

    function _scriptFileLoad(opt, func){
        var node = doc.createElement('script');
        var head = doc.head || doc.getElementsByTagName('head')[0];
        // document.readyState loaded || complete || interactive
        var loaded = (doc.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
        node.setAttribute('type', 'text/javascript');
        node.setAttribute('src', opt.url);
        node.setAttribute('async', true); // 异步加载

        head.appendChild(node);

        // http://www.cnblogs.com/_franky/archive/2010/06/20/1761370.html
        // 先判断是否支持onload事件，然后再判断IE document.readyState
        if('onload' in node){
            if(node.addEventListener){
                node.addEventListener('load', function(){
                    _fileLoadFunc(node, opt, func);
                }, false);
            }
        } else if(node.attachEvent){
            if(loaded){
                node.attachEvent('onreadystatechange', function(){
                    _fileLoadFunc(node, opt, func);
                }, false);
            }
        }
    }

    function _fileLoadFunc(node, opt, func){
        node.removeEventListener('load', _fileLoadFunc, false);
        //node.detachEvent('onreadystatechange', _fileLoadFunc);
        if(func){
            func();
        }
    }
});