(function(){

	var win = window;
	var doc = document;
	var lhy = win.lhy || (win.lhy = {});
	var GUID = 0;
	var FGUID = 0;
	/*
	cache.__event_cache = {
		1 : {
			elem: 
			events: {
				click: [function(){}, function(){}]
			}
		}	
	}
	*/
	//lhy.cache = lhy.cache || {};

	lhy.cache || (lhy.cache = {});
	var cache = lhy.cache.__event_cache = {};

	lhy.event = {
		listener: function(event) {
			event = lhy.event.fix(event || win.event);
			var elem = event.target || event.srcElement;
			var type = event.type;
			var i, len;
			if (!elem.guid) return;
			var handles = cache[elem.guid]['events'][type];
			for (i=0, len=handles.length; i<len; i++) {
				if (handles[i].apply(elem, arguments) === false) {
					event.preventDefault();
				}
			}
		},
		bind: function(elem, type, handle) {
			if (!elem || !type || !handle) return;
			
			type = type.trim().toLowerCase().replace(/\s+/g, ' ');
			if (type.indexOf(' ') > 0) {
				var typeArr = type.split(' ');
				var i, len;
				// 绑定多个事件
				for (i=0, len=typeArr.length; i<len; i++) {
					this.bind(elem, typeArr[i], handle);
				}
			}

			var guid = elem.guid || (elem.guid = ++GUID);
			cache[guid] || (cache[guid] = {});
			var events = cache[guid]['events'] || (cache[guid]['events'] = {});
			var handles = events[type] || (events[type] = []);
			
			if (!handle.fguid) {
				handle.fguid = ++FGUID
			}

			handles.push(handle);
			cache[guid]['elem'] = elem;
			lhy.event.add(elem, type, lhy.event.listener);
		},

		unbind: function(elem, type, handle) {

			var guid = elem.guid,
				events,
				handles,
				j, l, fguid;

			type.trim().toLowerCase().replace(/\s+/g, ' ');
			if (type.indexOf(' ') > 0) {
				var i, len, typeArr;
				for (i=0, len=typeArr.length; i<len; i++) {
					lhy.event.unbind(elem, typeArr[i], handle);
				}
			}
			
			events = cache[guid].events;
			handles = events[type];
			if (handle) {
				if (!handles) return;
					console.log(handle.fguid);
					console.log(handles[j].fguid);
				for (j=0, l<handles.length; j<l; j++) {
					if (handle.fguid === handles[j].fguid) {
						handles.splice(j, 1);
					}
				}
				if (handles.length === 0) {
					lhy.event.unbind(elem, type);
				}
			} else if (type) {
				delete cache[guid].events[type];
				lhy.event.remove(elem, type, lhy.event.listener);
			} else {
				for (var t in events) {
					lhy.event.remove(elem, events[t], lhy.event.listener);
				}
				delete cache[guid];
			}
		},

		on: function(elem, type, handle) {

		},

		off: function(elem, type, handle) {

		},

		trigger: function(elem, type) {

		},
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

		fix: function(event) {
			if (doc.addEventListener) return event;
			var evt = {};
			var html = document.documentElement;
			var body = document.body;

			evt.target = event.srcElement || document;
			evt.target.nodeType === 3 && (evt.target = evt.target.parentNode);
			evt.preventDefault = function() {
				event.returnValue = false;
			};
			evt.stopPropagation = function() {
				event.cancelBuble = true;
			};
			evt.pageX = evt.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html && html.clientLeft || body && body.clientLeft || 0);
	        evt.pageY = evt.clientY + (html && html.scrollTop  || body && body.scrollTop  || 0) - (html && html.clientTop  || body && body.clientTop  || 0);
	        evt.relatedTarget = event.fromElement === evt.target ? event.toElement : event.fromElement;

			for (var e in event) {
				evt[e] = event[e];
			}
			return evt;
		}
	}
}());