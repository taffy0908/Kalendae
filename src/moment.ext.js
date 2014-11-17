
if (!Kalendae.moment) {
	if (window.moment) {
		Kalendae.moment = window.moment;
	} else {
		throw "Kalendae requires moment.js. You must use kalendae.standalone.js if moment is not available on the page.";
	}
}

moment = Kalendae.moment;

//function to get the total number of days since the epoch.
moment.fn.yearDay = function (input) {
	var yearday = Math.floor(this._d / 86400000);
    return (typeof input === 'undefined') ? yearday :
        this.add({ d : input - yearday });
};

/**
 * 扩展方法：获取this和other之间的所有日期moment
 * @param  {Moment} other 区间日期
 * @return {Array}       包括区间端点以及区间内的所有日期
 */
moment.fn.daysBetween = function(other) {
	var smaller, bigger;
	if(this.isBefore(other)) {
		smaller = this;
		bigger = other;
	} else {
		smaller = other;
		bigger = this;
	}
	var dayLengthBtw = bigger.diff(smaller, 'day'), out = [];
	if(dayLengthBtw === 0) {
		out.push(bigger);
		return out;
	} else {
		out.push(moment(smaller));
	}
	while(dayLengthBtw > 0) {
		out.push(moment(smaller.add({d:1})));
		dayLengthBtw --;
	}

	return out;
};

today = Kalendae.moment().startOf('day');
