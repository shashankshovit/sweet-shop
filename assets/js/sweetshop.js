class SweetShop extends BaseHTML {
	constructor() {
		super();
		this.html = document.querySelector('body');
		this.cart = {};
		this.header = new Header(this.getElement('.header'));
		this.add(this.header, false);
		this.menuBar = new MenuBar(this.getElement('.menu_bar'));
		this.add(this.menuBar, false);
		this.checkout = undefined;
		this.content = new Content(this.getElement('.content'), this.banners, this.menuItems);
		this.add(this.content, false);
		this.footer = new Footer(this.getElement('.footer'));
		this.add(this.footer, false);

		this.blocker = document.querySelector('.blocker');
		this.blocker.addEventListener('click', this.removeBlocker.bind(this));
	}

	get cartCounter() {
		return this.menuBar.getElement('.cart-count');
	}

	get cartCount() {
		return Object.keys(this.cart).length ? Object.values(this.cart).reduce((a,b)=> (a+b)) : 0;
	}

	increaseQuantity(product) {
		if(this.cart[product]) {
			this.cart[product]++;	
		} else {
			this.cart[product] = 1;
		}
		this.cartCounter.classList.add('visible');
		this.cartCounter.innerHTML = this.cartCount;
	}

	reduceQuantity(product) {
		if(!(product in this.cart) || (this.cart[product] == 0)) {
			// product doesnt exist in cart, nothing to worry
		} else {
			this.cart[product]--;
		}
		this.cartCounter.innerHTML = this.cartCount;
		if(this.cartCount == 0) {
			this.cartCounter.classList.remove('visible');
		}
	}

	enableBlocker() {
		this.blocker.classList.add('block');
	}

	removeBlocker() {
		this.blocker.classList.remove('block');
		this.actionsOnBlockerRemove();
	}

	actionsOnBlockerRemove() {
		try {
			this.checkout.destroy();
		} catch(err) {}
	}

	initializeCheckout() {
		this.checkout = new Checkout(this.getElement('.checkout'), this.cart);
		this.add(this.checkout, false);
		this.checkout.initialize();
		this.enableBlocker();
	}

	get banners() {
		return [
			'./assets/images/banners/banner1.png',
			'./assets/images/banners/banner4.jpg',
			'./assets/images/banners/sweets-banner.jpg',
		];
	}

	get menuItems() {
		return [
			'./assets/images/menu/Ajwain_Biscuits.jpg',
			'./assets/images/menu/Akaash_Namkeen.jpg',
			'./assets/images/menu/Anjeer_Dry_Fruit_Roll.jpg',
			'./assets/images/menu/Champakali.jpg',
			'./assets/images/menu/Choco_Biscuits.jpg',
			'./assets/images/menu/Chow_Chow.jpg',
			// './assets/images/menu/Colorful_Petha.jpg',
			'./assets/images/menu/Dry_Fruit_Bite_Mix.jpg',
			'./assets/images/menu/Dry_Jamoon.jpg',
			'./assets/images/menu/Fry_Kaju_Masala.jpg',
			'./assets/images/menu/Fry_Kaju_Roll.jpg',
			'./assets/images/menu/Kaju_Apple.jpg',
			'./assets/images/menu/Kaju_Gunjia.jpg',
			'./assets/images/menu/Kaju_Laddu.jpg',
			'./assets/images/menu/Kaju_Pineapple.jpg',
			'./assets/images/menu/Kaju_Roll.jpg',
			'./assets/images/menu/Kaju_Sandwich.jpg',
			'./assets/images/menu/Kaju_Square.jpg',
			'./assets/images/menu/Mysore_Pak.jpg',
			'./assets/images/menu/Pista_Gulabjamun.jpg',
		]
	}
}