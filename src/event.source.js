/**
 * @description:
 * 	
 *  
 * @version: 1.0.0
 * 
 */
(function(){

	var win = window;
	var doc = document;
	var lhy = win.lhy || (win.lhy = {});
	var GUID = 0;
	var FGUID = 0;
	/* 事件缓存
	cache.__event_cache = {
		1 : {
			events: {
				click: [
					{
						elem: '',
						fguid: 1,
						type: 'click',
						handle: function(){},
						selector: '',
					},
				]
			},
			listener: function(e) {}
		}	
	}
	*/
	//lhy.cache = lhy.cache || {};

	lhy.cache || (lhy.cache = {});
	var cache = lhy.cache.__event_cache = {};

	lhy.event = {
		/**
		 * 事件监听函数，用于中转回调执行事件
		 * @param {guid}
		 */
		listener: function(guid) {
			return function(event) {
				event = lhy.event.fix(event || win.event);
				var elem = cache[guid].elem;
				var type = event.type;
				var i, len;
				var handles = cache[guid]['events'][type];
				// 顺序执行缓存中的回调函数
				for (i=0, len=handles.length; i<len; i++) {
					if (handles[i].apply(elem, arguments) === false) {
						event.preventDefault();
					}
				}
			}
		},
		/**
		 * 事件绑定
		 * @param {elem} 	元素
		 * @param {type} 	事件名称
		 * @param {handle} 	事件回调函数
		 * 
		 * @description 
		 * 支持多个事件同时绑定，事件之间用空格隔开，比如“click mouseup”
		 */
		bind: function(elem, type, handle) {
			this._bind(elem, type, handle);
		},
		/**
		 * 事件解绑
		 * @param {elem} 	元素
		 * @param {type} 	事件名称
		 * @param {handle} 	事件回调函数
		 */
		unbind: function(elem, type, handle) {

			var guid,
				events,
				handles,
				j, l, fguid;

			if (!elem || (elem.guid == undefined)) return;
			guid = elem.guid;
			type = lhy.util.trim(type).toLowerCase().replace(/\s+/g, ' ');
			if (type.indexOf(' ') > 0) {
				var i, len, typeArr;
				for (i=0, len=typeArr.length; i<len; i++) {
					lhy.event.unbind(elem, typeArr[i], handle);
				}
				return;
			}
			handles = cache[guid].events[type];
			if (handle) {
				for (j=0, l=handles.length; j<l; j++) {
					if (handle.fguid === handles[j].fguid) {
						handles.splice(j, 1);
					}
				}
				if (handles.length === 0) {
					lhy.event.unbind(elem, type);
				}
			} else if (type) {
				delete cache[guid].events[type];
				lhy.event.remove(elem, type, cache[guid].listener);
				if (lhy.util.isEmptyObject(cache[guid].events)) {
					delete cache[guid];
				}
			} else {
				for (var t in events) {
					lhy.event.remove(elem, events[t], cache[guid].listener);
				}
				delete cache[guid];
			}
		},

		_bind: function(elem, type, handle, selector) {
			var guid,
				handles,
				handleObj;

			if (!elem || !type || !handle) return;
			type = lhy.util.trim(type).toLowerCase().replace(/\s+/g, ' ');
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
					listener: this.listener(guid),
					events: {}
				};
			}
			handles = cache[guid].events[type] || (cache[guid].events[type] = []);
			if (!handles.length) {
				handles.delegateCount = 0;
			}
			if (!handle.fguid) {
				handle.fguid = ++FGUID;
			}
			// 事件对象
			handleObj = {
				fguid: handle.fguid,
				elem: elem,
				selector: selector,
				type: type,
				handle: handle
			};

			if (selector) {
				handles.splice(handles.delegateCount++, 0, handleObj);
			} else {
				handles.push(handleObj);
			}
			this.add(elem, type, cache[guid].listener, false);
		},

		on: function(elem, type, handle) {
			var selector = elem;
			elem = doc.body;
			this._bind(elem, type, handle, selector);
		},

		off: function(elem, type, handle) {

		},
		/**
		 * @param {elem}		事件元素
		 * @param {type}		事件类型
		 * @param {canBuble}	是否冒泡 stopPropagation
		 * @param {cancelable}	是否取消默认事件 preventDefault
		 *
		 * @description 兼容ie的事件
		 */
		trigger: (function() {
			if (doc.dispatchEvent) {
				return function(elem, type, canBuble, cancelable){
					if (canBuble === undefined) canBuble = true;
					if (cancelable === undefined) cancelable = true;
					var evt = doc.createEvent('HTMLEvents');
					evt.initEvent(type, canBuble, cancelable);
					elem.dispatchEvent(evt);
				}
			} else {
				return function(elem, type) {
					var evt = doc.createEventObject();
					elem.fireEvent('on' + type, evt);
				}
			}
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
		 * @param {event} 	事件
		 * @description 	修正ie事件
		 */
		fix: function(event) {
			if (doc.addEventListener) return event;
			var evt = {};
			var html = document.documentElement;
			var body = document.body;

			evt.target = event.srcElement || document;
			// 文本节点处理
			evt.target.nodeType === 3 && (evt.target = evt.target.parentNode);
			evt.preventDefault = function() {
				event.returnValue = false;
			};
			evt.stopPropagation = function() {
				event.cancelBuble = true;
			};
			evt.pageX = evt.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html && html.clientLeft || body && body.clientLeft || 0);
	        evt.pageY = evt.clientY + (html && html.scrollTop  || body && body.scrollTop  || 0) - (html && html.clientTop  || body && body.clientTop  || 0);
	        // mouseover 与 mouseout事件处理
	        evt.relatedTarget = event.fromElement === evt.target ? event.toElement : event.fromElement;

			for (var e in event) {
				evt[e] = event[e];
			}
			return evt;
		}
	}
}());