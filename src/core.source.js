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
        type: function(o){
        	var ots = Object.prototype.toString;
        	var arr = ['Array','Object','String','Number','Function','EmptyObject','Boolean','Undefind','Null'];

        	for (var i = 0; i < arr.length; i++){
        		return ots.call(o) === '"[Object ' + arr[i] +']"' ? true : false;
        	}
        }
    };

    window.lhy = window.smart = smart;

    if (typeof define === 'function'){
        define(function(){
            return lhy;
        });
    }
})();