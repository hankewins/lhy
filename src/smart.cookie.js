/** 
 * @description
 * Package: smart.cookie
 * Need package:smart.core.js
 */
;
smart.package(function(smart) {
	var doc = document,
		win = window = this;
	var cookie = {
		options: {
			path: '/',
			encode: true,
			secure: false,
			domain: false,
			expires: false
		},
		setItem: function(sKey, value /*options*/ ) {
			var opt = smart.extend(arguments[2], this.options);
			if (opt.encode) value = encodeURIComponent(value);
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
		getItem: function(sKey /* options*/ ) {

		},
		removeItem: function(sKey /*options*/ ) {

		},
		hasItem: function(sKey) {

		}


	};
	smart.cookie = cookie;
});