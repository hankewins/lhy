// (function(){ //先屏蔽 for test
//to do 各大手机浏览器的js引擎 及确定最终有必要被引入到库中的数组扩展方法

var $A = {

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