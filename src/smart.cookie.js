/* 
* @Author: hankewins
* @Date:   2015-09-07 14:55:42
* @Last Modified by:   hankewins
* @Last Modified time: 2015-09-21 16:55:03
*/
/** 
 * @description
 * Package: smart.cookie
 * Need package:smart.core.js
 */
smart.package(function() {

	smart.namespace('cookie');

	smart.cookie.get = function(name){
		var val = document.cookie.match(new RegExp(encodeURIComponent(name) + '=(\\S[^;]+)'));
		return val ? decodeURIComponent(val[1]) : null;
	};

	smart.cookie.set = function(name, val, expires, domain, path, secure){
		var cookieVal = encodeURIComponent(val), date = new Date();

		if(domain){
			cookieVal = cookieVal + '; domain=' + domain;
		}

		if(path){
			cookieVal = cookieVal + '; path=' + path;
		}

		if(expires !== 0){
			date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
			cookieVal = cookieVal + '; expires=' + date.toGMTString();
		} else {
			cookieVal = cookieVal + '; expires=' + new Date(0).toGMTString();
		}

		document.cookie = encodeURIComponent(name) + '=' + cookieVal;
	};

	smart.cookie.remove = function(name){
		smart.cookie.set(name, '', 0);
	};

});