class Home extends BaseHTML {
	constructor(banners, menuItems) {
		super();
		this.html = new Container({className: 'home-content'}).render;
		this.createHomeLayout(banners, menuItems);
	}

	createHomeLayout(banners, menuItems) {
		this.add(new Slider(banners));
		this.add(new ShopMenu(menuItems));
		this.add(new RecommendedProducts('Popular', 'Sweets', menuItems));
	}
}