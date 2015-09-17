/* 
* @Author: hankewins
* @Date:   2015-09-07 14:55:42
* @Last Modified by:   hankewins
* @Last Modified time: 2015-09-17 17:58:32
*/
/** 
 * @description
 * Package: smart.cookie
 * Need package:smart.core.js
 */
smart.package(function() {
	// var cookie = {
	// 	options: {
	// 		path: '/',
	// 		secure: false,
	// 		domain: false,
	// 		expires: false
	// 	},
	// 	_setOptions:function(opt){
	// 		if(opt === undefined) return this.options;
	// 		return smart.extend(opt,this.options);
	// 	},
	// 	setItem: function(sKey, value /*options*/ ) {
	// 		var opt=this._setOptions(arguments[2]);
	// 		value = encodeURIComponent(value);
	// 		if (opt.path) value += '; path=' + opt.path;
	// 		if (opt.domain) value += '; domain=' + opt.domain;
	// 		if (opt.expires) {
	// 			var date = new Date();
	// 			date.setTime(date.getTime() + opt.expires * 24 * 60 * 60 * 1000);
	// 			value += '; expires=' + date.toGMTString();
	// 		}
	// 		if (opt.secure) value += '; secure';
	// 		document.cookie = sKey + '=' + value;

	// 	},

	// 	getItem: function(sKey) {
	// 		var value = document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(skey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
	// 		return value ? decodeURIComponent(value) : null;
	// 	},

	// 	removeItem: function(sKey /*options*/ ) {
	// 		if (!sKey || !this.hasItem(sKey)) return false;
	// 		var opt=this._setOptions(arguments[1]),
	// 			value = '';
	// 		value = "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	// 		if (opt.domain) value += "; domain=" + opt.domain;
	// 		if (opt.path) value += "; path=" + opt.path;
	// 		document.cookie = encodeURIComponent(sKey) + "=" + value;
	// 		return true;

	// 	},
	// 	hasItem: function(sKey) {
	// 		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\+")).test(document.cookie);
	// 	}
	// };

	// smart.cookie = cookie;
	
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