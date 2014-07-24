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