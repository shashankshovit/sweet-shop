class HorizontalNavigator extends Container {
	constructor(options, products, cart) {
		options.className = 'horizontal-navigator-container';
		super(options);
		this.addHorizontalNavigation();
		this.populateProducts(products, options.tileOptions, cart);
	}

	addHorizontalNavigation() {
		let leftScroll = new Container({type: 'span', className: 'glyphicon glyphicon-chevron-left left arrow'});
		let rightScroll = new Container({type: 'span', className: 'glyphicon glyphicon-chevron-right right arrow'});
		this.add(leftScroll);
		this.add(rightScroll);
		this.productsWrapper = new Container({className: 'products-wrapper'});
		this.add(this.productsWrapper);

		leftScroll.html.addEventListener('click', this.onLeftClick.bind(this));
		rightScroll.html.addEventListener('click', this.onRightClick.bind(this));
	}

	populateProducts(products, overrideTileOptions, cart) {
		let first = true;
		let visibilityClass;
		let tileOptns = overrideTileOptions || {
			preview: false,
			details: true,
			quantityController: false,
			classes: 'recommend col-xs-3 col-sm-3 col-md-3 col-lg-3',
		};

		while(products.length) {
			visibilityClass = first ? ' visible' : ' beyond-right';
			let rowDiv = new Container({className: `row${visibilityClass}`});
			for(let i=0; i<4 && products.length; i++) {
				let imagePath = products.pop();
				cart && (tileOptns.quantity = cart[imagePath]);
				rowDiv.add(new ProductTile(imagePath, tileOptns));
			}
			this.productsWrapper.add(rowDiv);
			first = false;
		}
	}

	get visibleIndex() {
		let visibilityList = this.productsWrapper.children
			.map(child => child.html.classList.contains('visible'));
		return visibilityList.indexOf(true);
	}

	onLeftClick() {
		let index = this.visibleIndex;
		if(index - 1 >= 0) {
			this.productsWrapper.children[index].html.classList.remove('visible');
			this.productsWrapper.children[index].html.classList.add('beyond-right');
			this.productsWrapper.children[index-1].html.classList.remove('beyond-left');
			this.productsWrapper.children[index-1].html.classList.add('visible');
		}
	}

	onRightClick() {
		let index = this.visibleIndex;
		if(index + 1 < this.productsWrapper.children.length) {
			this.productsWrapper.children[index].html.classList.remove('visible');
			this.productsWrapper.children[index].html.classList.add('beyond-left');
			this.productsWrapper.children[index+1].html.classList.remove('beyond-right');
			this.productsWrapper.children[index+1].html.classList.add('visible');
		}
	}
}