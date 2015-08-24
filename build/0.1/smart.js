smart.package(function() {
	var array = {
		/**
		 * 遍历数组
		 * 参考链接 http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach
		 * @param   {[Function]}	callback 要执行的函数
		 */
		forEach: Array.prototype.forEach ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.forEach.apply(arguments[0], args);
		} : function(arr, callback /*thisArg*/ ) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}

			if (typeof callback !== "function") {
				throw new TypeError(callback + "is not a function");
			}

			var len = arr.length,
				thisP = arguments[2];

			for (var i = 0; i < len; i++) {
				if (i in arr) {
					callback.call(thisP, arr[i], i, arr);
				}
			}
		},

		/**
		 * 正向查找某一元素在数组中的索引下标
		 * @param  {Array} arr 执行操作的数组
		 * @param  {Object} o  待查找的数组元素
		 * @param {Number}  fromIndex   从数组的何处开始查找
		 * @return {Number}返回o在arr中的索引下标
		 */
		indexOf: Array.prototype.indexOf ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.indexOf.apply(arguments[0], args);
		} : function(arr, o, fromIndex) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			if (fromIndex == undefined) {
				fromIndex = 0;
			} else if (fromIndex < 0) {
				fromIndex = Math.max(0, arr.length);
			}
			for (var i = fromIndex; i < arr.length; i++) {
				if (arr[i] == o) {
					return i;
				}
			}
			return -1;
		},

		/**
		 * 反向查找某一元素在数组中的索引下标
		 * @param  {Array}  arr 		执行操作的数组
		 * @param  {Object} o  			待查找的数组元素
		 * @param {Number}  fromIndex   从数组的何处开始查找
		 * @return {Number} 			返回o在arr中的索引下标
		 */
		lastIndexOf: Array.prototype.lastIndexOf ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.lastIndexOf.apply(arguments[0], args);
		} : function(arr, o, fromIndex) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			if (fromIndex == undefined) {
				fromIndex = arr.length - 1;
			} else if (fromIndex < 0) {
				fromIndex = Math.max(0, arr.length);
			}
			for (var i = fromIndex; i >= 0; i--) {
				if (arr[i] == o) {
					return i;
				}
			}
			return -1;
		},

		/**
		 * 返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组.
		 * @param  {[Array]} 	arr       	原数组(注：原数组不会被改变)
		 * @param  {[Function]} callback	处理原数组的方法
		 * @param  {[Object]} 	thisArgs	执行callback时this指向的对象
		 * @return {[Array]}           		arr经过callback处理后返回的新数组
		 */
		map: Array.prototype.map ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.map.apply(arguments[0], args);
		} : function(arr, callback /*[,thisArg]*/ ) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			if (typeof callback != 'function') {
				throw new TypeError('the callback is not a function');
			}
			var newArray = new Array(arr.length),
				thisArg = arguments[2];
			for (var i = 0, len = arr.length; i < len; i++) {
				newArray[i] = callback.call(thisArg, arr[i], i, arr);
			}
			return newArray;
		},


		/**
		 * 返回一个由原数组中元素执行回调函数且返回值为true的原数组元素
		 * @param  {[Array]} 	arr       	原数组(注：原数组不会被改变)
		 * @param  {[Function]} callback	处理原数组的方法
		 * @param  {[Object]} 	thisArgs	执行callback时this指向的对象
		 * @return {[Array]}           		arr经过callback处理后结果为true的新数组
		 */
		filter: Array.prototype.filter ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.filter.apply(arguments[0], args);
		} : function(arr, callback /*thisArg*/ ) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			if (typeof callback != 'function') {
				throw new TypeError('callback is not a function');
			}
			var newArray = new Array(),
				thisArg = arguments[2];
			for (var i = 0, len = arr.length; i < len; i++) {
				if (callback.call(thisArg, arr[i], i, arr)) {
					newArray.push(arr[i]);
				}
			}
			return newArray;
		},

		/**
		 * 对数组中的每个元素都执行一次callback，直到此函数返回 true，如果发现这个元素，some 将返回 true
		 * 如果回调函数对每个元素执行后都返回 false ，some 将返回 false。
		 * @param  {[Array]} 	arr       	原数组(注：原数组不会被改变)
		 * @param  {[Function]} callback	处理原数组的方法
		 * @return {[Boolean]} 				true:数组中至少有一个元素经过callback处理后返回true，否则则为false：
		 */
		some: Array.prototype.some ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.some.apply(arguments[0], args);
		} : function(arr, callback /*thisArg*/ ) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			if (typeof callback != 'function') {
				throw new TypeError('callback is not a function');
			}
			var ret = false,
				thisArg = arguments[2];
			for (var i = 0, len = arr.length; i < len; i++) {
				if (callback.call(thisArg, arr[i], i, arr)) {
					ret = true;
					break;
				}
			}
			return ret;
		},

		/**
		 * 判断数组中是否任意元素经过callback的处理结果都为true，是则every返回true，否则返回false
		 * @param  {[Array]} 	arr       	原数组(注：原数组不会被改变)
		 * @param  {[Function]} callback	处理原数组的方法
		 * @return {[Boolean]} 				true:数组中任意元素经过callback处理后返回true，否则则为false：
		 */
		every: Array.prototype.every ?
			function() {
				var AP = Array.prototype,
					args = AP.slice.call(arguments, 1);
				return AP.every.apply(arguments[0], args);
		} : function(arr, callback /* thisArg*/ ) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			if (typeof callback != 'function') {
				throw new TypeError('callback is not a function');
			}
			var ret = true,
				thisArg = arguments[2];
			for (var i = 0, len = arr.length; i < len; i++) {
				if (!callback.call(thisArg, arr[i], i, arr)) {
					ret = false;
					break;
				}
			}
			return ret;
		},

		/**
		 * 简化或降级数组
		 * @param {Array} 	arr 	被操作的数组
		 * @param {Function} callback 回调函数，包含四个参数(上一次循环返回的值或初始值、数组当前被操作的值、当前值的索引，数组本身)
		 * @param {Object} initialValue  初始操作值(可选)
		 * @return {Object}
		 */
		reduce: Array.prototype.reduce ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.reduce.apply(arguments[0], args);
		} : function(arr, callback /* initialValue*/ ) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			if (typeof callback != 'function') {
				throw new TypeError('callback is not a function');
			}
			//初始值initialValue传了，则value为初始值，currentValue为arr[0],currentIndex为0
			//or value为arr[0],currentValue为arr[1],currentIndex为1
			var isInitialValueSet = false,
				value,
				len = arr.length;
			if (arguments.length > 2) {
				value = arguments[2];
				isInitialValueSet = true;
			}
			for (var i = 0; i < len; i++) {
				if (isInitialValueSet) {
					value = callback(value, arr[i], i, arr);
				} else {
					value = arr[i];
					isInitialValueSet = true;
				}
			}
			if (!isInitialValueSet) {
				throw new TypeError('数组为空或者未被赋初始值');
			}
			return value;
		},

		/**
		 * 同reduce，区别在于reduce从开始处进行分析，reduceRight从结尾开始分析
		 * @return {[type]} [description]
		 */
		reduceRight: Array.prototype.reduceRight ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.reduceRight.apply(arguments[0], args);
		} : function(arr, callback /* initialValue*/ ) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			if (typeof callback != 'function') {
				throw new TypeError('callback is not a function');
			}
			//初始值initialValue传了，则value为初始值，currentValue为arr[0],currentIndex为0
			//or value为arr[0],currentValue为arr[1],currentIndex为1
			var isInitialValueSet = false,
				value,
				len = arr.length;
			if (arguments.length > 2) {
				value = arguments[2];
				isInitialValueSet = true;
			}
			for (var i = len - 1; i >= 0; i--) {
				if (isInitialValueSet) {
					value = callback(value, arr[i], i, arr);
				} else {
					value = arr[i];
					isInitialValueSet = true;
				}
			}
			if (!isInitialValueSet) {
				throw new TypeError('数组为空或者未被赋初始值');
			}
			return value;
		},

		/**
		 * @description 在指定位置插入元素
		 * @param {Array} arr 原始数组（会被改变）
		 * @param {Object} o 被插入的元素
		 * @param {Number} index 插入的位置
		 * @return {Boolean} true:插入成功；false:插入失败
		 */
		insertAt: Array.prototype.insertAt ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.insertAt.apply(arguments[0], args);
		} : function(arr, o, index) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			var ret = false;
			if (index > -1 && index < arr.length) {
				arr.splice(index, 0, o); //splice(index,howmay,[item1,...itemx])添加/删除元素的位置、需删除的数量(为0则不删除)、添加的新项目
				ret = true;
			}
			return ret;
		},

		/**
		 * @description 在指定元素后插入元素
		 * @param {Array} arr 原始数组（会被改变）
		 * @param {Object} o  指定元素
		 * @param {Object} toInsert 被插入的元素
		 * @return {Boolean} true:插入成功；false:插入失败
		 */
		insertAfter: Array.prototype.insertAfter ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.insertAfter.apply(arguments[0], args);
		} : function(arr, o, toInsert) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			var ret = false,
				index = this.indexOf(arr, o);
			if (index == -1) {
				ret = false;
			} else {
				if (index == arr.length - 1) {
					arr.push(toInsert);
				} else {
					this.insertAt(arr, toInsert, index + 1);
				}
				ret = true;
			}
			return ret;
		},

		/**
		 * @description 在指定元素前插入元素
		 * @param {Array} arr 原始数组（会被改变）
		 * @param {Object} o  指定元素
		 * @param {Object} toInsert 被插入的元素
		 * @return {Boolean} true:插入成功；false:插入失败
		 */
		insertBefore: Array.prototype.insertBefore ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.insertBefore.apply(arguments[0], args);
		} : function(arr, o, toInsert) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			var ret = false,
				index = this.indexOf(arr, o);
			if (index == -1) {
				ret = false;
			} else {
				if (index == 0) {
					arr.unshift(toInsert);
				} else {
					this.insertAt(arr, toInsert, index - 1);
				}
				ret = true;
			}
			return ret;
		},

		/**
		 * 删除数组特定元素
		 * @return {Boolean} true：删除成功;false：删除失败
		 */
		remove: Array.prototype.remove ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.remove.apply(arguments[0], args);
		} : function(arr, o) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			var ret = false,
				index = this.indexOf(arr, o);
			if (index > -1) {
				arr.splice(index, 1);
				ret = true;
			}
			return ret;
		},

		/**
		 * 求数组中最大的元素
		 * @return {Number} 数组中的最大值
		 */
		max: Array.prototype.max ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.max.apply(arguments[0], args);
		} : function(arr) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			return Math.max.apply(Math, arr);
		},

		/**
		 * 求数组中最小的元素
		 * @return {Number} 数组中的最小值
		 */
		min: Array.prototype.min ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.min.apply(arguments[0], args);
		} : function(arr) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			return Math.min.apply(Math, arr);
		},

		/**
		 * 数组所有元素求和
		 * @return {Number} 数组所有元素的和
		 */
		sum: Array.prototype.sum ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.sum.apply(arguments[0], args);
		} : function(arr) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			var sum = 0;
			for (var i = 0, len = arr.length; i < len; i++) {
				sum += arr[i];
			}
			return sum;
		},

		/**
		 * 替换一个数组成员
		 * @return {Boolean} true:替换成功;false:替换失败
		 */
		replace: Array.prototype.replace ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.replace.apply(arguments[0], args);
		} : function(arr, oldV, newV) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === oldV) {
					arr[i] = newV;
					return true;
				}
			}
			return false;
		},

		/**
		 * 数组去重
		 * @return {Array} 由不重复元素构成
		 */
		unique: Array.prototype.unique ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.unique.apply(arguments[0], args);
		} : function(arr) {
			if (arr == null || arr == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			var result = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				if (!this.contains(result, arr[i])) {
					result.push(arr[i]);
				}
			}
			return result;
		},

		//两数组间的操作
		/**
		 * 两个数组的差集
		 * @return {Array} 两数组的差集
		 */
		diff: Array.prototype.diff ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.diff.apply(arguments[0], args);
		} : function(a, b) {
			if (a == null || a == undefined || b == null || b == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			var result = [];
			for (var i = 0, len = a.length; i < len; i++) {
				if (!this.contains(b, a[i])) {
					result.push(a[i]);
				}
			}
			return this.unique(result);
		},

		/**
		 * 两数组的交集
		 * @return {Array}
		 */
		intersect: Array.prototype.intersect ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.intersect.apply(arguments[0], args);
		} : function(a, b) {
			if (a == null || a == undefined || b == null || b == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			var result = [];
			for (var i = 0, len = a.length; i < len; i++) {
				if (this.contains(b, a[i])) {
					result.push(a[i]);
				}
			}
			return this.unique(result);
		},


		/**
		 * 两数组的合集
		 * @return {Array}
		 */
		union: Array.prototype.union ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.union.apply(arguments[0], args);
		} : function(a, b) {
			if (a == null || a == undefined || b == null || b == undefined) {
				throw new TypeError('array can not be null or undefined;');
			}
			return this.unique(a.concat(b));
		},
		/**
		 * 判断数组arr是否包含元素o
		 * @param  {Array} 	arr 	执行查找的数组
		 * @param  {Object} o  		待查找的数组元素
		 * @return {Boolean}
		 */
		contains: Array.prototype.contains ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.contains.apply(arguments[0], args);
		} : function(arr, o) {
			return (this.indexOf(arr, o) > -1);
		},

		//查找
		/**
		 * 冒泡排序
		 * @param {Array} arr 原始数组
		 * @return {Array} 经过排序后的数组(从小到大)
		 */
		bubbleSort: Array.prototype.bubbleSort ? function() {
			var AP = Array.prototype,
				args = AP.slice.call(arguments, 1);
			return AP.bubbleSort.apply(arguments[0], args);
		} : function(arr) {
			if (arr == null || arr == undefined) {
				throw new TypeError('Array can not be null or undefined');
			}
			var len = arr.length,
				temp;
			while (len > 0) {
				for (var j = 0; j < len - 1; j++) {
					if (arr[j] > arr[j + 1]) {
						temp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = temp;
					}
				}
				len--;
			}
			return arr;
		}
	};
	smart.array = array;
})
// Todo
smart.package(function(smart) {
	var doc = this.document,
		win = doc.window = this;

	/**
	 * 从UA和平台信息中提取出当前的浏览器名称、版本、引擎、系统等信息
	 * 参考链接 https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
	 * 			http://www.useragentstring.com/pages/useragentstring.php
	 * @param  {[String]} ua
	 * @param  {[String]} platform
	 * @return {[Object]}          {name,version,platform}
	 */
	var parseUA = function(ua, platform) {
		var name, version, engine;
		// /Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0
		ua = ua.toLowerCase();
		platform = platform ? platform.toLowerCase() : '';
		//attention:Safari gives two version number, one technical in the Safari/xyz token, one user-friendly in a Version/xyz token
		var reg = /(opera|ie|firefox|chrome|trident|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/;
		var UA = ua.match(reg) || [null, 'unkonwn', 0];
		//["firefox/31.0", "firefox", "31.0", "", undefined]


		if (UA[1] == 'trident') {
			UA[1] = 'ie';
		}
		name = (UA[1] == 'version') ? UA[3] : UA[1];

		version = parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]);
		if (name == 'ie') {
			version = doc.documentMode;
		}

		switch (name) {
			case 'ie':
				engine = 'trident';
				break;
			case 'firefox':
				engine = 'gecko';
				break;
			case 'safari':
			case 'chrome':
				engine = 'webkit';
				break;
			case 'opera':
				engine = 'presto';
				break;
			case 'unkonwn':
				var tmp = (navigator.userAgent.toLowerCase().match(/(?:webkit|khtml|gecko)/) || [])[0];
				if (tmp == 'webkit' || tmp == 'khtml') {
					engine = 'webkit';
				} else if (tmp == 'gecko') {
					engine = 'gecko';
				}
				break;
		}

		platform = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0];
		if (platform == 'win') platform = 'windows';

		return {
			name: name,
			version: version,
			platform: platform,
			engine: engine
		}
	}
	var browser = {};
	browser = parseUA(navigator.userAgent, navigator.platform); //get name、version、platform

	browser.Request = (function() {
		var XMLHTTP = function() {
			return new XMLHttpRequest();
		};
		var MSXML2 = function() {
			return new ActiveXObject('MSXML2.XMLHTTP');
		};
		var MSXML = function() {
			return new ActiveXObject('Microsoft.XMLHTTP');
		};
		var attempt = function() {
			for (var i = 0, l = arguments.length; i < l; i++) {
				try {
					return arguments[i]();
				} catch (e) {}
			}
			return null;
		}
		return attempt(function() {
			XMLHTTP();
			return XMLHTTP;
		}, function() {
			MSXML2();
			return MSXML2;
		}, function() {
			MSXML();
			return MSXML;
		})
	})();

	browser.Features = {
		query: !!(doc.querySelector), //True if the browser supports querySelectorAll
		json: !!(win.JSON), //True if the browser supports JSON object
		xhr: !!(browser.Request) //True if the browser supports native XMLHTTP object.
	};

	browser.Devices={
		istouch:'ontouchstart' in window,//True if the browser is touchable
		width:win.screen.width,
		height:win.screen.height,
		dpi:win.devicePixelRatio
	}

	smart.browser = browser;
});
// Todo
/** 
 * @description
 * Package: smart.cookie
 * Need package:smart.core.js
 */
;
smart.package(function(smart) {
	var doc = document;
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
			doc.cookie = sKey + '=' + value;

		},

		getItem: function(sKey) {
			var value = doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(skey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
			return value ? decodeURIComponent(value) : null;

		},
		
		removeItem: function(sKey /*options*/ ) {
			if (!sKey || !this.hasItem(sKey)) return false;
			var opt=this._setOptions(arguments[1]),
				value = '';
			value = "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			if (opt.domain) value += "; domain=" + opt.domain;
			if (opt.path) value += "; path=" + opt.path;
			doc.cookie = encodeURIComponent(sKey) + "=" + value;
			return true;

		},
		hasItem: function(sKey) {
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\+")).test(doc.cookie);
		}
	};
	
	smart.cookie = cookie;
});
(function(){
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

    smart.package(function(smart){
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
smart.package(function() {
	var date = {
		isDate: function(d) {
			return d instanceof Date;
		},
		/**
		 * 求两日期相隔天数
		 * @param  {Date} d1
		 * @param  {Date} d2
		 * @return {Number}    两日期相隔的天数
		 */
		getDatePeriod: function(d1, d2) {
			if (!this.isDate(d1) || !(this.isDate(d2))) {
				throw new TypeError('it is not date type');
			}
			var timeDiff = Math.abs(d1.getTime() - d2.getTime());
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
			return diffDays;
		},

		/**
		 * 是否是闰年
		 * @param  {Date}  d
		 * @return {Boolean}   true:闰年;false:否
		 */
		isLeapYear: function(d) {
			if (!this.isDate(d)) {
				throw new TypeError('it is not date type');
			}
			var year = d.getFullYear();
			return ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0));
		},

		/**
		 * 日期格式化
		 * @param  {Date} 	d         待格式化的日期
		 * @param  {RegExp} formatStr 进行格式化的模式字符串
		 * 		y:年,
		 * 		M:月(1-12,MM:01,M:1)
		 * 		d:天(1-31,dd:01,d:1)
		 * 		h:小时(0-23),
		 * 		m:分(0-59),
		 * 		s:秒(0-59),
		 * 		S:毫秒(0-999),
		 * 		q:季度(1-4)
		 * @return {String}           格式后的字符串
		 */
		dateFormat: function(d, formatStr) {
			if (formatStr === undefined) {
				formatStr = d;
				d = new Date();
			}
			var map = {
				"M": d.getMonth() + 1,
				"d": d.getDate(),
				"h": d.getHours(),
				"m": d.getMinutes(),
				"s": d.getSeconds(),
				"q": Math.floor((d.getMonth() + 3) / 3),
				"S": d.getMilliseconds() //毫秒
			};
			formatStr = formatStr.replace(/([yMdhmsqS])+/g, function(all, t) {
				var v = map[t];
				if (v !== undefined) {
					if (all.length > 1) {
						v = "0" + v;
						v = v.substr(v.length - 2);
					}
					return v;
				} else if (t === 'y') {
					return (d.getFullYear() + '').substr(4 - all.length);
				}
				return all;
			});
			return formatStr;
		},

		dateFormat1: function(date, formatString) {
			var o = {
				"M+": date.getMonth() + 1, //month
				"d+": date.getDate(), //day
				"h+": date.getHours(), //hour
				"m+": date.getMinutes(), //minute
				"s+": date.getSeconds(), //second
				"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
				"S": date.getMilliseconds() //millisecond
			}

			if (/(y+)/.test(formatString)) {
				formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			}

			for (var k in o) {
				if (new RegExp("(" + k + ")").test(formatString)) {
					formatString = formatString.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return formatString;
		}
	}
	smart.date=date;
})

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
// Format
smart.packpage(function(smart){
    var format = {
    	date: function(){
    		
    	}
    };

    smart.format = format;
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
// Todo
smart.package(function(smart){
	var loader = {
		include: function(){},
		require: function(){},
		use: function(){
			
		}
	};
});
// Todo
// import smart.core.js
// smart.router.js

smart.package(function(smart){
    var win = window;
    var doc = document;

    // 参考backbone的正则规则
    var optionalParam = /\((.*?)\)/g;
    var namedParam    = /(\(\?)?:\w+/g;
    var splatParam    = /\*\w+/g;
    var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    var routeStripper = /^[#\/]|\s+$/g;
    var pathStripper = /#.*$/;
    var trailingSlash = /\/$/;

    var addEvent = function(elem, type, callback) {
        doc.addEventListener ? elem.addEventListener(type, callback, false) :
            elem.attachEvent('on' + type, callback);
    };

    var removeEvent = function(elem, type, callback) {
        doc.removeEventListener ? elem.removeEventListener(type, callback) :
            elem.dettachEvent('on' + type, callback);
    };
    

    /**
     * @description 路由控制，参考backbone
     * 
     */
    var Router = {
        root: '/',
        routes: [],
        started: false,
        config: function(options) {
            if (!options || !options.routes) return;

            var routes,
                route,
                callback;
            routes = options.routes;
            if (typeof routes === 'function') {
                routes = routes();
            }
            for (route in routes) {
                (typeof routes[route] === 'string') ? 
                    (callback = options[routes[route]] || null) : (callback = routes[route]); 
                this.add(route, callback);
            }
            return this;
        },
        //执行initialize，使用时自己定义扩展
        initialize: function() {},
        // 开始监听hashchange或popstate事件
        start: function(options) {
            if (this.started === true) return;
            this.started = true;
            this.options = options = options || {};
            this.root = options.root || this.root;
            // 默认是hash方式
            this.options.hashChange = options.hashChange !== false;
            this.options.hasHashChange = ('onhashchange' in window) && this.options.hashChange;
            this.options.pushState = !!options.pushState;
            // 是否支持HTML5 pushState
            this.options.hasPushState = !!(options.pushState && history.pushState);
            if (this.options.hasPushState) {
                addEvent(window, 'popstate', this.listener);
            } else if (this.options.hasHashChange) {
                addEvent(window, 'hashchange', this.listener);
            }
            return this.loadUrl();
        },
        // 停止路由监听
        stop: function (argument) {
            removeEvent(window, 'popstate', this.listener);
            removeEvent(window, 'hashchange', this.listener);
            this.started = false;
        },
        // 监听中转函数
        listener: function(e) {
            Router.loadUrl();
        },
        // 根据hash执行回调函数
        loadUrl: function(fragment) {
            var item, routes,
                current;

            if (fragment) {
                current = this.getFragment(fragment);
            } else {
                current = this.getFragment();
                if (current === this.fragment) return;
            }
            this.fragment = current;
            routes = this.routes;
            for (item in routes) {
                if (routes[item].route.test(current)) {
                    routes[item].callback(current);
                    break;
                }
            }
        },
        /**
         * 1、增加规则到routes队列中
         * 2、动态增加路由规则，
         */
        add: function(route, callback) {
            var args,
                that = this;
            if (!smart.isRegExp(route)) {
                route = this.routeToRegExp(route);
            }
            this.routes.push({
                route: route,
                callback: function(fragment) {
                    args = that.extractParameters(route, fragment);
                    if (callback) {
                        callback.apply(that, args);
                    }
                }
            });
            return this;
        },
        // 动态删除路由规则
        remove: function(route) {
            var item, i, 
                routes;
            if (!smart.isRegExp(route)) {
                route = this.routeToRegExp(route);
            }
            routes = this.routes;
            smart.forEach(routes, function(item, i) {
                if (item.route === route) {
                    routes.splice(i, 1);
                }
            });
            return this;
        },
        /**
         *  触发函数监听
         */
        navigate: function(fragment, options){
            var url;
            if (!this.started) return;
            if (!options || options === true) options = {trigger: !!options};
            url = this.root + (fragment = this.getFragment(fragment || ''));
            fragment = fragment.replace(pathStripper, '');
            if (this.fragment === fragment) return;
            if (fragment === '' && url !== '/') {
                url = url.slice(0, -1);
            }
            if (this.options.hasPushState) {
                // popstate
                history[options.replace ? 'replaceState' : 'pushState']({}, doc.title, url);
            } else if (this.options.hasHashChange) {
                // hashChange
                if (options.replace) {
                  var href = location.href.replace(/(javascript:|#).*$/, '');
                  location.replace(href + '#' + fragment);
                } else {
                  location.hash = '#' + fragment;
                }
            } else {
                return location.assign(url);
            }
            if (options.trigger) return this.loadUrl(fragment);
            return this;
        },
        // 提取正则中的参数
        extractParameters: function(route, fragment) {
            var params = route.exec(fragment).slice(1);
            var arr = [];
            smart.forEach(params, function(param, i) {
                if (i === params.length - 1) {
                    arr.push(param || null);
                    return;
                }
                arr.push(param ? decodeURIComponent(param) : null);
            });
            return arr;
        },
        getHash: function(){
            // 去掉#号的hash
            var match = location.href.match(/#(.*)$/);
            return match ? match[1] : '';
        },
        // html5的pushState方式， 获取url
        getPath: function() {
            var fragment,
                root;
            fragment = decodeURI(location.pathname + location.search);
            // 去掉最后的"/"
            root = this.root.replace(trailingSlash, '');
            if (!fragment.indexOf(root)) {
                fragment = fragment.slice(root.length);
            }
            return fragment;
        },
        // 获取url中的hash片段
        getFragment: function(fragment) {
            if (fragment == null) {
              if (this.options.hasPushState || !this.options.hashChange) {
                fragment = this.getPath();
              } else {
                fragment = this.getHash();
              }
            }
            return fragment.replace(routeStripper, '');
        },
        /**
         * 转换正则表达式
         * 对含有“-{}[]+?.,\^$|# ”的字符加上转义字符
         * 对含有括号的字符串进行处理，使它不捕获不做标号
         * 对含有(?:与:的字符进行处理，括号括起作为参数
         * 对*号进行处理，也作为参数
         */
        routeToRegExp: function (route) {
            route = route.replace(escapeRegExp, '\\$&')
                 .replace(optionalParam, '(?:$1)?')
                 .replace(namedParam, function(match, optional) {
                   return optional ? match : '([^/?]+)';
                 })
                 .replace(splatParam, '([^?]*?)');
            return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
        }
    }

    smart.router = Router;
});
// Todo
/**
 * @description
 * 
 */
(function(){
	var win = window;
	var doc = document;
	var smart = win.smart || (win.smart = {});

	// 全局事件对象
	var touch = {};
	var touchEvent;
	// 滑动距离
	var distanceX=0,  distanceY = 0;
	var tapTimeout, singleTapTimeout, doubleTaptimeout, longTapTimeout, swipeTimeout;
	// 两次触摸的时间间隔
	var timeSpace;
	// 滑动方向
	var direction = function(x1, x2, y1, y2) {
		return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ?
			((x1 - x2 > 0) ? 'Left' : 'Right') : ((y1 - y2 > 0) ? 'Top' : 'Bottom');
	};
	// 清除所有正在执行的触屏事件
	var cancelAll = function() {
		if (tapTimeout) clearTimeout(tapTimeout);
		if (singleTapTimeout) clearTimeout(singleTapTimeout);
		if (doubleTaptimeout) clearTimeout(doubleTaptimeout);
		if (longTapTimeout) clearTimeout(longTapTimeout);
		if (swipeTimeout) clearTimeout(swipeTimeout);
		tapTimeout = singleTapTimeout = doubleTaptimeout = longTapTimeout = swipeTimeout = null;
	};
	// 长按事件
	var longTap = function() {
		if (touch.last) {
			smart.event.trigger('longTap', touch.el);
			touch = {};
		}
		longTapTimeout = null;
	}
	// 清除长按事件
	var cancelLongTap = function() {
		if (longTapTimeout) clearTimeout(longTap);
		longTapTimeout = null;
	}

	// webkit内核浏览器事件类型为touchstart
	// IE9事件类型为MSPointerDown
	// IE10+事件类型为pointerdown
	smart.event.on('touchstart MSPointerDown pointerdown', doc, function(e) {
		var	distance,
			now,
			timeSpace;

		touchEvent = e.touches[0];
		if (touch.x2) {
			touch.x2 = undefined;
			touch.y2 = undefined;
		}
		touch.x1 = touchEvent.pageX;
		touch.y1 = touchEvent.pageY;
		touch.el = 'tagName' in touchEvent.target ? touchEvent.target : touchEvent.target.parentNode;
		now = Date.now();
		// 两次触摸的时间间隔
		timeSpace = now - touch.last || now;
		// 如果两次触摸的时间间隔大于0和小于250ms时，作为双触摸事件
		if (timeSpace > 0 && timeSpace <= 250) touch.isDoubleTap = true;
		touch.last = now;
		// 长按750毫秒执行长按事件
		longTapTimeout = setTimeout(longTap, 750);
	});

	smart.event.on('touchmove MSPointerMove pointermove', doc, function(e) {
		// 触摸已经移动了清除longTap事件
		cancelLongTap();
		touchEvent = e.touches[0];
		touch.x2 = touchEvent.pageX;
		touch.y2 = touchEvent.pageY;
		// 移动的水平距离
		distanceX = Math.abs(touch.x1 - touch.x2);
		// 移动的垂直距离
		distanceY = Math.abs(touch.y1 - touch.y2);
	});

	smart.event.on('touchend MSPointerUp pointerup', doc, function(e) {
		// 触摸已经end了，清除longTap事件
		cancelLongTap();
		// 第二点的距离大于30的时候，触发swipe事件
		if ((touch.x2 && distanceX > 30) || (touch.y2 && distanceY > 30)) {
			swipeTimeout = setTimeout(function(){
				// 触发swipe自定义事件
				smart.event.trigger('swipe', touch.el);
				// 触发swipeLeft等swipe自定义事件
				smart.event.trigger('swipe' + direction(touch.x1, touch.x2, touch.y1, touch.y2), touch.el);
				touch = {};
			}, 0);
		// 否则为tap事件
		// longTap事件时，不执行
		} else if ('last' in touch){
			// 距离小于30的时是tap事件
			if (distanceX < 30 && distanceY < 30) {
				tapTimeout = setTimeout(function() {
					// 单次触摸，并且在事件中增加cancelTouch方法
					if (touch.el) smart.event.trigger('tap', touch.el, {cancelTouch: cancelAll});
					// 两次触摸
					if (touch.isDoubleTap) {
						if (touch.el) smart.event.trigger('doubleTap', touch.el);
						touch = {};
					} else {
						// 单触摸事件
						singleTapTimeout = setTimeout(function(){
							if (touch.el) smart.event.trigger('singleTap', touch.el);
							singleTapTimeout = null;
							touch = {};
						}, 250);
					}
				}, 0)
			} else {
				touch = {};
			}
			distanceX = distanceY = 0;
		}
	});

	smart.event.on('touchcancel MSPointerCancel pointercancel', doc, cancelAll);
	smart.event.on('scroll', window, cancelAll);
	
	// 增加touch事件API
	smart.forEach(['tap', 'singleTap', 'longTap', 'doubleTap', 'swipe', 
		'swipeLeft', 'swipeRight', 'swipeTop', 'swipeBottom', 'transform'], function(eventName) {
		smart.event[eventName] = function(elem, callback) {
			smart.event.on(eventName, elem, callback);
		}
	})

}());
/**
 *  event
 */

smart.package(function(smart){

	var doc = window.document;

    var util = {
        /**
         * @param {obj}
         * @desciption 	是否空对象
         */
        isEmptyObject: function(obj) {
        	for (var o in obj) {
        		if (obj.hasOwnProperty(o)) {
        			return false;
        		}
        	}
        	return true;
        },
        /**
         * @param {str} string
         * @desciption 	去除两边空格
         */
        trim: function(str) {
        	return str.replace(/^\s*|\s*$/, '');
        },
        /**
         * @param {elem} 
         * @param {selector}
         * @description 检测dom元素是否匹配选择器selector, 兼容低版本ie6-8实现matchesSelector功能
         */
        matchesSelector: (function() {
        	var body = doc.body;
        	var matchesSelector = body.webkitMatchesSelector || body.msMatchesSelector || body.mozMatchesSelector || body.oMatchesSelector;

        	var w3cMatches = function(elem, selector) {
        		return matchesSelector.call(elem, selector);				
        	}
        	// 低版本ie
        	var ieMatches = function(elem, selector) {
        		var parent,
        			matches;

        		parent = elem.parentNode;
        		// 元素已存在DOM文档树中
        		if (parent) {
        			var len;
        			matches = parent.querySelectorAll(selector);
        			len = matches.length;
        			while(len--) {
        				if (matches[len] == elem) {
        					return true;
        				}
        			}
        			return false;
        		} else {
        			var div,
        				parentNode;
        			// 元素未添加到DOM文档树
        			div = doc.createElement('div');
        			parentNode = div.appendChild(elem);
        			matches = parentNode.querySelector(selector);
        			div = null;
        			if (matches.length) {
        				return true;
        			}
        			return false;
        		}
        	}

        	return matchesSelector ? w3cMatches : ieMatches;		
        }())
    };

    smart.util = util;
});