'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Nav
 */

var Nav = function () {
	// Include default values for options
	function Nav(_ref) {
		var _ref$nav = _ref.nav,
		    nav = _ref$nav === undefined ? '.js-nav' : _ref$nav,
		    _ref$trigger = _ref.trigger,
		    trigger = _ref$trigger === undefined ? '.js-nav-trigger' : _ref$trigger,
		    _ref$openClass = _ref.openClass,
		    openClass = _ref$openClass === undefined ? 'is-open' : _ref$openClass,
		    _ref$bodyClass = _ref.bodyClass,
		    bodyClass = _ref$bodyClass === undefined ? 'js-mobile-nav-open' : _ref$bodyClass;

		_classCallCheck(this, Nav);

		// Store the options
		this.nav = document.querySelector(nav);
		this.trigger = document.querySelector(trigger);
		this.openClass = openClass;
		this.bodyClass = bodyClass;

		// Need to bind the methods to the current scope so we can cleanly add/remove the event handlers
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.isNavRequired = this.isNavRequired.bind(this);
		this.checkClickOutside = this.checkClickOutside.bind(this);

		// Let's dance
		this.init();
	}

	_createClass(Nav, [{
		key: 'checkClickOutside',
		value: function checkClickOutside(e) {
			if (this.nav.contains(e.target)) {
				console.log('clicked the nav', this.nav);
			} else {
				console.log('clicked outside', e.target);
				// e.stopPropagation();
				this.close();
			}
		}

		// Add the class to the body, toggle the event listener

	}, {
		key: 'open',
		value: function open() {
			var _this = this;

			console.log('open');
			document.documentElement.classList.add(this.bodyClass);
			this.nav.classList.add(this.openClass);
			window.scrollTo(0, 0);
			this.trigger.removeEventListener('click', this.open, false);
			this.trigger.addEventListener('click', this.close, false);
			setTimeout(function () {
				document.addEventListener('click', _this.checkClickOutside, false);
			}, 0);
		}
		// Remove the class to the body, toggle the event listener

	}, {
		key: 'close',
		value: function close() {
			console.log('close');
			this.trigger.removeEventListener('click', this.close, false);
			this.trigger.addEventListener('click', this.open, false);
			this.nav.classList.remove(this.openClass);
			document.documentElement.classList.remove(this.bodyClass);
			document.removeEventListener('click', this.checkClickOutside, false);
		}

		// check if the toggle ishidden, if it is then we can assume the nav shouldn't be Javascript powered

	}, {
		key: 'isNavRequired',
		value: function isNavRequired() {
			// If trigger is not visible, remove open class from body
			if (this.trigger.style.display === 'none' || this.trigger.style.visibility === 'hidden') {
				this.close();
			}
		}
	}, {
		key: 'init',
		value: function init() {
			var _this2 = this;

			// Open nav on trigger click
			this.trigger.addEventListener('click', this.open, false);

			// Check browser width on resize
			var to = false;

			// Use arrow function so we don't create a new scope to break things
			window.addEventListener('resize', function () {
				// If we have started a timer then clear it
				if (to !== false) {
					clearTimeout(to);
				}
				// Fire!
				to = setTimeout(_this2.isNavRequired, 200);
			});

			// Check if we need to run
			this.isNavRequired();
		}
	}]);

	return Nav;
}();

exports.default = Nav;
module.exports = exports['default'];

