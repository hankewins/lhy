/*
 *
 *
 *
 */

(function(root, doc, T, undefined) {

	var lhy = root[T] || { version: '1.0.0' };

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = lhy;
		}
		exports.lhy = lhy
	} else {
		root[T] = lhy;
	}
	// 类型检测
	// 对象扩展
	
	
	// domReady 借鉴“司徒正美”的实现
	function domReady(fn) {
		var isReady = false,
			arrayFun = [],
			fireReady;

		if (lhy.isFunction(fn)) {
			arrayFun.push(fn);
		}

		fireReady = function() {
			if (isReady) return;
			isReady = true;
			while (arrayFun.length) {
				arrayFun.shift()();
			}
		};
		// for modern brower
		if (doc.addEventListener) {
			doc.addEventListener('DOMContentLoaded', function() {
				doc.removeEventListener('DOMContentLoaded', arguments.callee, false);
				fireReady();
			}, false)
		} else {
			// for ie
			document.write('<script id="ie-domReady" defer src="\/\/:"></script>');
			doc.getElementById('ie-domReady').onreadystatechange = function() {
				if (this.readyState === 'complete') {
					this.onreadystatechange = null;
					fireReady();
					this.parentNode.removeChild(this);
				}
			}
		}
	}

})(this, document, 'lhy');