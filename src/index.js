/**
 * Nav
 */

class Nav {

	// Include default values for options
	constructor({nav = '.js-nav', trigger = '.js-nav-trigger', openClass = 'is-open', bodyClass = 'js-mobile-nav-open'}) {

		// Store the options
		this.nav = document.querySelector(nav);
		this.trigger = document.querySelector(trigger);
		this.openClass = openClass;
		this.bodyClass = bodyClass;

		// Need to bind the methods to the current scope so we can cleanly add/remove the event handlers
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.isNavRequired = this.isNavRequired.bind(this);

		// Let's dance
		this.init();
	}

	// Add the class to the body, toggle the event listener
	open() {
		document.documentElement.classList.add(this.bodyClass);
		this.nav.classList.add(this.openClass);
		window.scrollTo(0, 0);
		this.trigger.removeEventListener('click', this.open, false);
		this.trigger.addEventListener('click', this.close, false);
	}
	// Remove the class to the body, toggle the event listener
	close() {
		this.trigger.removeEventListener('click', this.close, false);
		this.trigger.addEventListener('click', this.open, false);
		this.nav.classList.remove(this.openClass);
		document.documentElement.classList.remove(this.bodyClass);
	}

	// check if the toggle ishidden, if it is then we can assume the nav shouldn't be Javascript powered
	isNavRequired() {
		// If trigger is not visible, remove open class from body
		if (this.trigger.style.display === 'none' || this.trigger.style.visibility === 'hidden') {
			this.close();
		}
	}

	init() {
		// Open nav on trigger click
		this.trigger.addEventListener('click', this.open, false);

		// Check browser width on resize
		var to = false;

		// Use arrow function so we don't create a new scope to break things
		window.addEventListener('resize', () => {
			// If we have started a timer then clear it
			if (to !== false) {
				clearTimeout(to);
			}
			// Fire!
			to = setTimeout(this.isNavRequired, 200);
		});

		// Check if we need to run
		this.isNavRequired();

	}
}

export default Nav;
