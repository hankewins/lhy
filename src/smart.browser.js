// Todo
smart.package(function(smart) {
	var doc = this.document,
		win = doc.window = this;

	/**
	 * 从UA和平台信息中提取出当前的浏览器名称、版本、引擎、系统等信息
	 * 参考链接 https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
	 * 			http://www.useragentstring.com/pages/useragentstring.php
	 * @param  {[String]} ua
	 * @param  {[String]} platform
	 * @return {[Object]}          {name,version,platform}
	 */
	var parseUA = function(ua, platform) {
		var name, version, engine;
		// /Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0
		ua = ua.toLowerCase();
		platform = platform ? platform.toLowerCase() : '';
		//attention:Safari gives two version number, one technical in the Safari/xyz token, one user-friendly in a Version/xyz token
		var reg = /(opera|ie|firefox|chrome|trident|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/;
		var UA = ua.match(reg) || [null, 'unkonwn', 0];
		//["firefox/31.0", "firefox", "31.0", "", undefined]


		if (UA[1] == 'trident') {
			UA[1] = 'ie';
		}
		name = (UA[1] == 'version') ? UA[3] : UA[1];

		version = parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]);
		if (name == 'ie') {
			version = doc.documentMode;
		}

		switch (name) {
			case 'ie':
				engine = 'trident';
				break;
			case 'firefox':
				engine = 'gecko';
				break;
			case 'safari':
			case 'chrome':
				engine = 'webkit';
				break;
			case 'opera':
				engine = 'presto';
				break;
			case 'unkonwn':
				var tmp = (navigator.userAgent.toLowerCase().match(/(?:webkit|khtml|gecko)/) || [])[0];
				if (tmp == 'webkit' || tmp == 'khtml') {
					engine = 'webkit';
				} else if (tmp == 'gecko') {
					engine = 'gecko';
				}
				break;
		}

		platform = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0];
		if (platform == 'win') platform = 'windows';

		return {
			name: name,
			version: version,
			platform: platform,
			engine: engine
		};
	};
	var browser = {};
	browser = parseUA(navigator.userAgent, navigator.platform); //get name、version、platform

	browser.Request = (function() {
		var XMLHTTP = function() {
			return new XMLHttpRequest();
		};
		var MSXML2 = function() {
			return new ActiveXObject('MSXML2.XMLHTTP');
		};
		var MSXML = function() {
			return new ActiveXObject('Microsoft.XMLHTTP');
		};
		var attempt = function() {
			for (var i = 0, l = arguments.length; i < l; i++) {
				try {
					return arguments[i]();
				} catch (e) {}
			}
			return null;
		};
		return attempt(function() {
			XMLHTTP();
			return XMLHTTP;
		}, function() {
			MSXML2();
			return MSXML2;
		}, function() {
			MSXML();
			return MSXML;
		});
	})();

	browser.Features = {
		query: !!(doc.querySelector), //True if the browser supports querySelectorAll
		json: !!(win.JSON), //True if the browser supports JSON object
		xhr: !!(browser.Request) //True if the browser supports native XMLHTTP object.
	};

	browser.Devices={
		istouch:'ontouchstart' in window,//True if the browser is touchable
		width:win.screen.width,
		height:win.screen.height,
		dpi:win.devicePixelRatio
	};

	smart.browser = browser;
});