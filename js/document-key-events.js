class DocumentKeyEvents {
	constructor() {
		this._keysLog = {};
		this._keyUpEvent();
		this._keyDownEvent();
	}

	_keyUpEvent() {
		document.addEventListener(
			'keyup',
			e => {
				// Prevent default escape key function
				e.preventDefault();

				// Toggle web menu on escape button
				if (e.key === 'Escape') {
					webMenu.toggleWebMenu();
					return;
				}

				delete this._keysLog[e.key];
			}
		);
	}

	_keyDownEvent() {
		document.addEventListener(
			'keydown',
			e => {
				this._keysLog[e.key] = true;
			}
		);
	}
}
