/*(function(H){*/ //先屏蔽 for test
	// H.array=H.array || {};
	// $A=H.array,
		/*//to do 各大手机浏览器的js引擎 及确定最终有必要被引入到库中的数组扩展方法
		IE6-7 supports JScript 5(es3,javascript 1.5)
		IE8 supports JScript 6(es3 ,javscript 1.5(more bug fix over JScript))
		Firefox 3.0 supports JavaScript 1.7+ 
		Firefox 4.0+ ,IE9,opera11.6 supports javascript 1.8.2(ES5)

		//for javascript 1.6 &1.6-
		forEach,
		indexOf,
		lastIndexOf,
		map,
		filter,
		some,
		every,

		//for javascript 1.8
		reduce,
		reduceRight,

		//常用方法的简单封装
		find,
		remove,
		removeAt,
		removeAll,
		insertAfter,
		insertBefore,
		insertAt,
		empty,
		max,
		min,
		sum,
		sortBy,
		diff,
		
		unique,
		contains,
		union;
	  */
	  	
		
		var $A= {
			
			/**
		  	 * 遍历数组
		  	 *
		  	 * 参考链接 http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach
		  	 * @param   {[Function]}	callback 要执行的函数
		  	 */
			forEach:/*Array.prototype.forEach
				? function(){
					var args=Array.prototype.slice.call(arguments,1);
					return Array.prototype.forEach.apply(arguments[0],args);
				}
				: */function(arr,callback/*thisArg*/){
					var len=arr.length,
						thisP;
					if(typeof callback !== "function"){
						throw new TypeError(callback + "is not a function");
					}

					//除了callback之外的其它参数
					if(arguments.length >2){
						thisP=arguments[2];
					}
					for(var i = 0; i < len ; i++) {
						if (i in arr){
							callback.call(thisP,arr[i],i,arr);
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
			indexOf:/*Array.prototype.indexOf
				? function(){
					var args=Array.prototype.indexOf.apply(arguments[0],args);
					return Array.prototype.indexOf.apply()
				}
				:*/ function(arr,o,fromIndex){
					if(fromIndex == undefined){
						fromIndex =0;
					} else if (fromIndex < 0) {
						fromIndex =Math.max(0,arr.length);
					}
					for(var i= fromIndex; i<arr.length;i++){
						if(arr[i] ==o){
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
			lastIndexOf:/*Array.prototype.indexOf
				? function(){
					var args=Array.prototype.lastIndexOf.apply(arguments[0],args);
					return Array.prototype.indexOf.apply()
				}
				:*/ function(arr,o,fromIndex){
					if(fromIndex == undefined){
						fromIndex =arr.length -1;
					} else if (fromIndex < 0) {
						fromIndex =Math.max(0,arr.length);
					}
					for(var i= fromIndex; i>=0;i--){
						if(arr[i] ==o){
							return i;
						}
					}
					return -1;
				},

			/**
			 * [map description]
			 * @param  {[type]} arr       [description]
			 * @param  {[type]} callback[ [description]
			 * @param  {[type]} thisArg]  [description]
			 * @return {[type]}           [description]
			 */
			map:Array.prototype.map
				? function(){
					var args=Array.prototype.slice.call(arguments,1);
					return Array.prototype
				}
			: function(arr,callback/*[,thisArg]*/){

			},

			/**
			 * 判断数组arr是否包含元素o
			 * @param  {Array} 	arr 	执行查找的数组
			 * @param  {Object} o  		待查找的数组元素
			 * @return {Boolean}     	
			 */
			contains:function(arr,o){
				return (this.indexOf(arr,o) >-1);
			}
		}
/*})(LHY)*/;