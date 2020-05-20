class ShopMenu extends BaseHTML {
	constructor(menuItems) {
		super();
		this.html = new Container({className: 'shop-menu'}).render;
		this.allProducts = menuItems;
		this.remainingProducts = [];
		this.createLayout();
		this.initializeMenuContainer();
		this.addProducts(menuItems, 8);
	}

	createLayout() {
		let headingSpan = new Container({type: 'span', className: 'menu-head', inner: 'Our '});
		headingSpan.add(new Container({type: 'span', className: 'menu-head-orange', inner: 'Menu'}));
		this.add(headingSpan);
		this.menuContainer = new Container({className: 'menu-items-container'});
		this.add(this.menuContainer);
		let buttonDiv = new Container({className: 'more-wrapper'});
		let button = new Container({type: 'span', inner: 'More'});
		buttonDiv.add(button);
		this.add(buttonDiv);

		button.html.addEventListener('click', this.onMoreClick.bind(this));
	}

	initializeMenuContainer() {
		this.remainingProducts = shuffle(this.allProducts);
		// DELETE PRODUCTS FROM CONTAINER
	}

	addProducts(menuItems, number=8) {
		let tileOptns = {
			preview: true,
			details: false,
			classes: 'menu col-xs-6 col-sm-6 col-md-3 col-lg-3',
		};
		for(let i=0; i<number && this.remainingProducts.length; i++) {

			this.menuContainer.add(new ProductTile(this.remainingProducts.pop(), tileOptns));
		}
		// !this.remainingProducts.length && this.removeMoreButton();
	}


	onMoreClick(evt) {
		this.addProducts();
	}

}