
requirejs.config({
	waitSeconds : 0,
	baseUrl: "./assets/js",
	paths: {
		// 'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
		'lib': 'lib',
	},
});

let libFiles = [
	'basehtml',
	'container',
	'image',
	'header',
	'menubar',
	'content',
	'home',
	'slider',
	'shopmenuitem',
	'shopmenu',
	'sweetshop',
];

require(libFiles, function () {
	// new SweetShop();
	// window.sweetShopObj = new SweetShop();
});