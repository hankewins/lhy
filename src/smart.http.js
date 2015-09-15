/* 
* @Author: hankewins
* @Date:   2015-09-02 14:28:12
* @Last Modified by:   hankewins
* @Last Modified time: 2015-09-15 14:46:28
*/
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