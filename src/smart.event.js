/**
 *  event
 */

smart.package(function(smart){

    var win = window,
        doc = window.document,
        util = smart.util,
        GUID = 0,
        FGUID = 0;

    var returnTrue = function() {
        return true;
    };
    var returnFalse = function() {
        return false;
    };
    var eventMethods =  {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
    };
    /* 事件缓存
    cache.__event_cache = {
        1 : {
            events: {
                click: [
                    {
                        elem: 'body',
                        fguid: 1,
                        handle: function(e){},
                        selector: 'selector',
                        type: 'click'
                    },
                ]
                .delegateCount: 1
            },
            listener: function(){}
        }   
    }
    */

    smart.cache = smart.cache || (smart.cache = {});
    var cache = smart.cache.__event_cache || (smart.cache.__event_cache = {});

    var event = {
        _bind: function(elem, type, handle, selector) {
            var guid,
                handles,
                handleObj;

            if (!elem || !type || !handle) return;
            type = util.trim(type).toLowerCase().replace(/\s+/g, ' ');
            if (type.indexOf(' ') > 0) {
                var typeArr = type.split(' ');
                var i, len;
                // 绑定多个事件
                for (i=0, len=typeArr.length; i<len; i++) {
                    this._bind(elem, typeArr[i], handle, selector);
                }
                return;
            }

            guid = elem.guid || (elem.guid = ++GUID);
            if (!cache[guid]) {
                cache[guid] = {
                    listener: function(e){
                        event._dispatch.apply(elem, arguments);
                    },
                    events: {}
                };
            }
            handles = cache[guid].events[type];
            // 相同的type只绑定一次
            if (!handles) {
                handles = cache[guid].events[type] = [];
                this.add(elem, type, cache[guid].listener, false);
            }
            if (!handles.length) {
                handles.delegateCount = 0;
            }
            if (!handle.fguid) {
                handle.fguid = ++FGUID;
            }
            // 事件对象
            handleObj = {
                elem: elem,
                fguid: handle.fguid,
                selector: selector,
                type: type,
                handle: handle
            };

            if (selector) {
                handles.splice(handles.delegateCount++, 0, handleObj);
            } else {
                handles.push(handleObj);
            }
        },
        /**
         * 事件绑定
         * @param   {elem}      元素
         * @param   {type}      事件名称
         * @param   {handle}    事件回调函数
         * @selecor {handle}    
         * 
         * @description 
         * 支持多个事件同时绑定，事件之间用空格隔开，比如“click mouseup”
         */
        _unbind: function(elem, type, handle, selector) {
            var guid,
                events,
                handleObj,
                handles,
                j, l, k, fguid;

            if (!elem || (elem.guid == undefined)) return;
            guid = elem.guid;
            events = cache[guid].events || {};
            // e.g.: "click mouseup mousedown"
            if (type) {
                type = util.trim(type).toLowerCase().replace(/\s+/g, ' ');
                if (type.indexOf(' ') > 0) {
                    var i, len, typeArr;
                    for (i=0, len=typeArr.length; i<len; i++) {
                        this.unbind(elem, typeArr[i], handle, selector);
                    }
                    return;
                }
            } else {
                // off(elem)
                // unbind(elem)
                for (k in events) {
                    this.unbind(elem, k, handle, selector);
                }
                return;
            }
            handles = events[type] || [];
            j = handles.length;
            while (j--) {
                handleObj = handles[j];
                if ((!selector || selector === handleObj.selector) &&
                    (selector ||  elem === handleObj.elem) &&
                    (!handle || handle.fguid === handleObj.fguid)) {
                    handles.splice(j, 1);
                    if (selector) {
                        handles.delegateCount--;
                    }
                }
            }
            if (!handles.length) {
                this.remove(elem, type, cache[guid].listener);
                delete events[type];

                if (util.isEmptyObject(events)) {
                    delete cache[guid];
                }
            }
        },
        /**
         * 事件处理程序，参考jquery
         */
        _dispatch: function(event) {
            var elem,
                type, args, i, j, k,
                handles, handleObj, handle,
                delegateCount, 
                queue = [],
                matches, selector, matched,
                target, ret;
            // 事件兼容性处理
            event = smart.event.compitable(event || win.event);
            args = Array.prototype.slice.call(arguments);
            args[0] = event;
            type = event.type;
            target = event.target;
            handles = cache[this.guid]['events'][type];
            delegateCount = handles.delegateCount;
            // 事件代理处理
            if (delegateCount && target.nodeType) {
                while (target != this) {
                    matches = [];
                    for (i=0; i<delegateCount; i++) {
                        selector = handles[i].selector;
                        if (matches[selector] === undefined) {
                            if (util.matchesSelector(target, selector)) {
                                matches.push(handles[i]);
                            }
                        }
                    }
                    if (matches.length) {
                        queue.push({elem: target, handles: matches});
                    }
                    if (target.parentNode) {
                        target = target.parentNode;
                    } else {
                        break;
                    }
                }
            }
            // 非事件代理，本身绑定的事件
            if (delegateCount < handles.length) {
                queue.push({elem: this, handles: handles.slice(delegateCount)});
            }
            // 遍历事件处理队列
            j = 0;
            while ((matched = queue[j++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                k = 0;
                while ( (handleObj = matched.handles[k++]) && !event.isImmediatePropagationStopped()) {
                    ret = handleObj.handle.apply(matched.elem, args);
                    if (ret !== undefined) {
                        if ((event.result = ret) === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                }
            }
        },
        /**
         * 事件绑定
         * @param {elem}    元素
         * @param {type}    事件名称
         * @param {handle}  事件回调函数
         */
        bind: function(elem, type, handle) {
            if (typeof elem === 'string') {
                var elems, i, len;
                var elems = doc.querySelectorAll(elem);
                for (i=0;  i<elems.length; i++) {
                    this._bind(elems[i], type, handle);
                }
                return;
            }
            this._bind(elem, type, handle);
        },
        /**
         * 事件解绑
         * @param {elem}    元素
         * @param {type}    事件名称
         * @param {handle}  事件回调函数
         */
        unbind: function(elem, type, handle) {
            if (typeof elem === 'string') {
                var elems, i, len;
                var elems = doc.querySelectorAll(elem);
                for (i=0;  i<elems.length; i++) {
                    this._unbind(elems[i], type, handle);
                }
                return;
            }
            this._unbind(elem, type, handle);
        },
        /**
         * 事件代理绑定
         */
        on: function(elem, type, handle) {
            var selector = elem;
            elem = doc.body;
            this._bind(elem, type, handle, selector);
        },
        /**
         * 事件代理解绑
         */
        off: function(elem, type, handle) {
            var selector = elem;
            elem = doc.body;
            this._unbind(elem, type, handle, selector);
        },
    
        trigger: (function() {
            
        }()),
        // 原生事件
        add: (function() {
            if (doc.addEventListener) {
                return function(elem, type, handle) {
                    elem.addEventListener(type, handle, false);
                }
            } else {
                return function(elem, type, handle) {
                    elem.attachEvent('on' + type, handle);  
                }
            }
        }()),
        // 原生事件
        remove: (function() {
            if (doc.removeEventListener) {
                return function(elem, type, handle) {
                    elem.removeEventListener(type, handle); 
                }
            } else {
                return function(elem, type, handle){
                    elem.detachEvent('on' + type, handle);  
                }
            }
        }()),
        /**
         * @param {event}   事件代理
         */
        compitable: function(event) {

            var eventMethod, methods,
                source, proxyEvent,
                key, k;
            
            proxyEvent = this.fix(event); // 代理事件
            source = proxyEvent.originalEvent;  // 原始事件
            // 增加属性，用于标记事件是否冒泡、是否被禁止默认事件，主要用于事件代理
            for (key in eventMethods) {
                eventMethod = source[key];
                source[key] = function() {
                    this[eventMethods[key]] = returnTrue;
                    return eventMethod && eventMethod.apply(source, arguments);
                }
                proxyEvent[eventMethods[key]] = returnFalse;
            }
            // 复制原始事件属性
            for (k in source) {
                proxyEvent[k] = source[k];
            }
            return proxyEvent;
        },
        // ie兼容性处理
        fix: function(event) {

            if (doc.addEventListener) {
                return {originalEvent: event};
            }

            var html, body;

            html = document.documentElement;
            body = document.body;
            event.target = event.srcElement || document;
            // 文本节点处理
            event.target.nodeType === 3 && (event.target = event.target.parentNode);
            event.preventDefault = function() {
                event.returnValue = false;
            };
            event.stopPropagation = function() {
                event.cancelBuble = true;
            };
            event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html && html.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY + (html && html.scrollTop  || body && body.scrollTop  || 0) - (html && html.clientTop  || body && body.clientTop  || 0);
            // mouseover 与 mouseout事件处理
            event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
            
            return {originalEvent: event};
        }
    };

    smart.event = event;
});