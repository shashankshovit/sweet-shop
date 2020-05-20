class ProductTile extends BaseHTML {
	constructor(path, options={}) {
		super();
		let defaults = {
			preview: true,
			details: true,
			quantityController: false,
			classes: '',
			quantity: 0,
		}
		options = Object.assign(defaults, options);
		this.quantity = options.quantity;
		this.path = path;
		let classes = 'product-tile';
		options.classes && (classes += ` ${options.classes}`)
		this.html = new Container({className: classes}).render;
		this.add(new Image({src: path}));
		options.preview && this.showPreviewPane(path);
		options.details && this.showDetailsSection(path);
		options.quantityController && this.showQuantityController();

		this.html.addEventListener('click', this.onProductClick.bind(this));
	}

	onProductClick(evt) {
		this.topmostParent.content.renderContent('detail', {path:this.path});
	}

	get name() {
		return this.path.split('/').pop().split('.')[0];
	}

	get description() {
		return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
	}

	showPreviewPane(path) {
		let previewWrapper = new Container({className: 'preview'});
		previewWrapper.add(new Container({className: 'title', inner: this.name}));
		previewWrapper.add(new Container({className: 'description', inner: this.description}));
		previewWrapper.add(new AddToCart(this.path, 'Order Now'));
		this.add(previewWrapper);
	}

	showDetailsSection(path) {
		let ingredients = 'Major ingredients: Kaju, Sugar, Natural Kesar';
		let detailTile = new Container({className: 'details'});
		let nameHolder = new Container({className: 'name-holder'});
		nameHolder.add(new Container({type: 'span', className: 'veg-non-veg'}));
		nameHolder.add(new Container({type: 'span', className:
			'product-name', inner: this.name, attrName: 'title', attrValue: this.name}));
		detailTile.add(nameHolder);
		detailTile.add(new Container({className: 'ingredients',
				inner: ingredients, attrName: 'title', attrValue: ingredients}));
		let bottomLine = new Container({className: 'bottom-line'});
		let weightPriceDiv = new Container({className: 'weight-price'});
		weightPriceDiv.add(new Container({type: 'span', className: 'weight', inner: '250 Gms'}));
		weightPriceDiv.add(new Container({type: 'span', className: 'price', inner: 'Rs. 250'}));
		bottomLine.add(weightPriceDiv);
		bottomLine.add(new AddToCart(this.path));
		detailTile.add(bottomLine);
		this.add(detailTile);
	}

	showQuantityController() {
		let controlWrap = new Container({className: 'quantity-wrap'});
		let less = new Container({className: 'control', inner: '-'});
		controlWrap.add(less);
		this.qtyHolder = new Container({inner: this.quantity}); 
		controlWrap.add(this.qtyHolder);
		let more = new Container({className: 'control', inner: '+'});
		controlWrap.add(more);
		this.add(controlWrap);

		less.html.addEventListener('click', this.reduceQuantity.bind(this));
		more.html.addEventListener('click', this.increaseQuantity.bind(this));
	}

	reduceQuantity(evt) {
		if(this.quantity > 0) {
			this.topmostParent.reduceQuantity(this.path);
			this.quantity = this.topmostParent.cart[this.path];
			this.qtyHolder.html.innerHTML = this.quantity ;
			this.topmostParent.checkout.updateCartTotal();
		}
		evt.stopPropagation();
	}

	increaseQuantity(evt) {
		this.topmostParent.increaseQuantity(this.path);
		this.quantity = this.topmostParent.cart[this.path];
		this.qtyHolder.html.innerHTML = this.quantity;
		this.topmostParent.checkout.updateCartTotal();
		evt.stopPropagation();
	}
}