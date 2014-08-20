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
                target = this.$namespace(ns);
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