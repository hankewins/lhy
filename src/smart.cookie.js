/** 
 * @description
 * Package: smart.cookie
 * Need package:smart.core.js
 */
;
smart.package(function(smart) {
	var doc = document;
	var cookie = {
		options: {
			path: '/',
			secure: false,
			domain: false,
			expires: false
		},
		_setOptions:function(opt){
			if(opt==undefined) return this.options;
			return smart.extend(opt,this.options);
		},
		setItem: function(sKey, value /*options*/ ) {
			var opt=this._setOptions(arguments[2]);
			value = encodeURIComponent(value);
			if (opt.path) value += '; path=' + opt.path;
			if (opt.domain) value += '; domain=' + opt.domain;
			if (opt.expires) {
				var date = new Date();
				date.setTime(date.getTime() + opt.expires * 24 * 60 * 60 * 1000);
				value += '; expires=' + date.toGMTString();
			}
			if (opt.secure) value += '; secure';
			doc.cookie = sKey + '=' + value;

		},

		getItem: function(sKey) {
			var value = doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(skey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
			return value ? decodeURIComponent(value) : null;

		},
		
		removeItem: function(sKey /*options*/ ) {
			if (!sKey || !this.hasItem(sKey)) return false;
			var opt=this._setOptions(arguments[1]),
				value = '';
			value = "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			if (opt.domain) value += "; domain=" + opt.domain;
			if (opt.path) value += "; path=" + opt.path;
			doc.cookie = encodeURIComponent(sKey) + "=" + value;
			return true;

		},
		hasItem: function(sKey) {
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\+")).test(doc.cookie);
		}
	};
	
	smart.cookie = cookie;
});