class MenuBar extends BaseHTML {
	constructor(html) {
		super();
		this.html = html;
		this.createMenuBar();
	}

	createMenuBar() {
		let menuInnerWrap = new Container({className: 'menu-inner'});
		let leftMenu = new Container({className: 'left'});
		menuInnerWrap.add(leftMenu);
		let rightMenu = new Container({className: 'right'});
		menuInnerWrap.add(rightMenu);

		let logoContainer = new Container({className: 'logo-wrap'});
		logoContainer.html.addEventListener('click', this.onLogoClick.bind(this));
		leftMenu.add(logoContainer);
		let location = new Container({className: 'location'});
		leftMenu.add(location);

		let navDiv = new Container({className: 'sitenav'});
		this.mobileMenu = navDiv;
		let iconDiv = new Container({className: 'user-icons'});
		iconDiv.add(new Image({src: './assets/images/icons/lens.png'}));
		iconDiv.add(new Image({src: './assets/images/icons/user.png'}));
		let shoppingBag = new Image({src: './assets/images/icons/bag.png'});
		shoppingBag.html.addEventListener('click', this.toggleCheckout.bind(this));
		iconDiv.add(shoppingBag);
		iconDiv.add(new Container({className: 'cart-count', type: 'span'}));
		rightMenu.add(navDiv);
		rightMenu.add(iconDiv);

		let mobileMenu = new Container({className: 'mobile-menu'});
		mobileMenu.html.innerHTML = `
			<span class='first'></span>
			<span class='second'></span>
		`;
		mobileMenu.html.addEventListener('click', this.toggleMobileMenu.bind(this));
		navDiv.add(mobileMenu);
		// navDiv.add(new Container({type: 'span', className: 'home', inner: 'Home'}));
		navDiv.add(new Container({type: 'span', className: 'about', inner: 'About'}));
		navDiv.add(new Container({type: 'span', className: 'products', inner: 'Products'}));
		navDiv.add(new Container({type: 'span', className: 'services', inner: 'Services'}));
		navDiv.add(new Container({type: 'span', className: 'gifts', inner: 'Gifts'}));

		this.add(menuInnerWrap);
	}

	onLogoClick() {
		this.topmostParent.content.renderContent('home');
	}

	toggleMobileMenu(evt) {
		this.mobileMenu.children.slice(1).forEach(sp => {
			if(sp.html.classList.contains('menuvisible')) {
				sp.html.classList.remove('menuvisible');
			} else {
				sp.html.classList.add('menuvisible');
			}
		});
	}

	toggleCheckout(evt) {
		if(this.parent.checkout) {
			this.parent.checkout.destroy();
		} else {
			this.parent.initializeCheckout();
		}
	}

}