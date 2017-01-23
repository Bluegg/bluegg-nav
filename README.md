# Bluegg Module Boilerplate

Basic JS enabled navigation for responsive goodness. Supports multiple instances. [See a demo](http://codepen.io/matthewbeta/pen/dpbNbK)

1. Install
```shell
npm install bluegg-nav
```

2. Import and run module
```js
var Nav = require('bluegg-nav');

//either use defaults
var defaultNav = new Nav();

var optionsNav = new Nav({
	nav: '.js-nav', // should be unique
	trigger: '.js-nav-trigger', // should be unique
	openClass: 'is-open',
	bodyClass: 'js-mobile-nav-open'
});
```

3. 🍸
