class RecommendedProducts extends BaseHTML {
	constructor(title1, title2, menuItems) {
		super();
		this.html = new Container({className: 'recommended'}).render;
		this.allProducts = menuItems;
		this.remainingProducts = shuffle(this.allProducts);
		this.createLayout(title1, title2);
	}

	createLayout(title1, title2) {
		let headingSpan = new Container({type: 'span', className: 'menu-head', inner: `${title1} `});
		headingSpan.add(new Container({type: 'span', className: 'menu-head-orange', inner: `${title2}`}));
		this.add(headingSpan);
		this.menuContainer = new HorizontalNavigator(
			{className: 'menu-items-container'}, this.remainingProducts);
		this.add(this.menuContainer);
	}

}