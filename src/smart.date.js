var $D={
	DP:Date.prototype,
	isDate:function(d){
		return d instanceof Date;
	}
	/**
	 * 求两日期相隔天数
	 * @param  {Date} d1 
	 * @param  {Date} d2 
	 * @return {Number}    两日期相隔的天数
	 */
	getDatePeriod:function(d1,d2){
		if(this.isDate(d1)||(this.isDate(d2))){
			throw new TypeError('it is not date type');
		}
		var timeDiff=Math.abs(d1.getTime()-d2.getTime());
		var diffDays=Math.ceil(timeDiff/(1000*3600*24));
		return diffDays;
	},
}