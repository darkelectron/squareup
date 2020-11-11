class Clock {
	constructor() {
		this._localStorage = window.localStorage;
		this._clock = document.querySelector('#clock');
		this._setTime = this._setTime.bind(this);
		this._twentyFourMode = true;
		this._clockUpdater = null;
		this._init();
	}

	_appendZero(k) {
		// Append zero if k < 10
		return k = (k < 10) ? '0' + k : k;
	}

	_setTime() {
		const date = new Date();
		let hour = date.getHours();
		let min = date.getMinutes();
		min = this._appendZero(min);

		// 24-hour mode
		if (this._twentyFourMode === true) {
			hour = this._appendZero(hour);
			this._clock.innerText = `${hour}:${min}`;
			return;
		}
	}

	_startClock() {
		this._setTime();
		this._clockUpdater = setInterval(this._setTime, 1000);
	}

	_updateClockMode() {
		clearInterval(this._clockUpdater);
		this._twentyFourMode = !this._twentyFourMode;
		this._localStorage.setItem('twentyFourMode', JSON.stringify(this._twentyFourMode));
		this._startClock();
	}

	_clockClickEvent() {
		this._clock.addEventListener(
			'click',
			() => {
				console.log('toggle 24-hour clock mode');
				this._updateClockMode();
			}
		);
	}

	_init() {
		this._twentyFourMode = JSON.parse(this._localStorage.getItem('twentyFourMode')) || true;
		this._startClock();
		this._clockClickEvent();
	}
}
