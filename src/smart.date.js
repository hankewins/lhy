var $D = {
	DP: Date.prototype,
	isDate: function(d) {
		return d instanceof Date;
	},
	/**
	 * 求两日期相隔天数
	 * @param  {Date} d1
	 * @param  {Date} d2
	 * @return {Number}    两日期相隔的天数
	 */
	getDatePeriod: function(d1, d2) {
		if (!this.isDate(d1) || !(this.isDate(d2))) {
			throw new TypeError('it is not date type');
		}
		var timeDiff = Math.abs(d1.getTime() - d2.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return diffDays;
	},

	/**
	 * 是否是闰年
	 * @param  {Date}  d
	 * @return {Boolean}   true:闰年;false:否
	 */
	isLeapYear: function(d) {
		if (!this.isDate(d)) {
			throw new TypeError('it is not date type');
		}
		var year = d.getFullYear();
		return ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0));
	},

	/**
	 * 日期格式化
	 * @param  {Date} 	d         待格式化的日期
	 * @param  {RegExp} formatStr 进行格式化的模式字符串
	 * 		y:年,
	 * 		M:月(1-12,MM:01,M:1)                        									                                                 
	 * 		d:天(1-31,dd:01,d:1)
	 * 		h:小时(0-23),
	 * 		m:分(0-59),
	 * 		s:秒(0-59),
	 * 		S:毫秒(0-999),
	 * 		q:季度(1-4)
	 * @return {String}           格式后的字符串
	 */
	dateFormat:function(d,formatStr){
		if(formatStr===undefined){
			formatStr=d;
			d=new Date();
		}
		var map={
			"M":d.getMonth()+1,
			"d":d.getDate(),
			"h":d.getHours(),
			"m":d.getMinutes(),
			"s":d.getSeconds(),
			"q":Math.floor((d.getMonth()+3)/3),
			"S":d.getMilliseconds()//毫秒
		};
		formatStr=formatStr.replace(/([yMdhmsqS])+/g,function(all,t){
			var v=map[t];
			if(v!==undefined){
				if(all.length>1){
					v="0"+v;
					v=v.substr(v.length-2);
				}
				return v;
			} else if(t==='y'){
				return (d.getFullYear()+'').substr(4-all.length);
			}
			return all;
		});
		return formatStr;
	}
}