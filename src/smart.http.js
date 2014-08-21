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
	    	var async = ('async' in opts) ? options.async : true;
	    	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : false;

	    	if (!xhr){
	    		opts.error && opts.error.call(null, { ret : 999 , msg : 'Create XHR Error!' });
	    		return false;
	    	}

	    	var qstr = http.serializeParam(opts.data);

	    	!isPost && (opts.url = (options.url.indexOf('?') > -1 ? '?' : '&') + qstr);

	    	xhr.open(method, opts.url, async);

	    	isPost && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    }
    };

    smart.http = http;
});