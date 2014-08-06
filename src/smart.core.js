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

    window.lhy = window.smart = smart;

    if (typeof define === 'function'){
        define(function(){
            return lhy;
        });
    }
})();