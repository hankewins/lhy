(function(){
	var T = {
		namespace: function(name){
			if (!name){
				return window;
			}
			var ns = window, nsArr = name.split('.');

			for (var i = 0; i < nsArr.length; i++){
				var n = nsArr[i];
				ns[n] = ns[n] || {};
				ns = ns[n];
			}

			return ns;
		},
		packpage: function(ns,func){

		}
	};

	window.lhy = window.TT = window.T = T;

	if (typeof define === 'function'){
		define(function(){
			return T;
		});
	}
})();
