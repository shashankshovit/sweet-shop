class DetailPage extends BaseHTML {
	constructor(path, products) {
		super();
		this.path = path;
		// this.path = './assets/images/menu/Kaju Sandwich.jpg';
		this.html = new Container({className: 'detail-page'}).render;
		this.createDetailSection();
		this.add(new RecommendedProducts('You May', 'Also Like', products));
	}

	get name() {
		return this.path && this.path.split('/').pop().split('.')[0];
	}

	get description() {
		return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
	}

	createDetailSection() {
		let detailWrap = new Container({className: 'detail-wrapper'});
		let imageWrap = new Container({className: 'image-wrap'});
		imageWrap.add(new Image({src: this.path}));
		detailWrap.add(imageWrap);
		let detail = new Container({className: 'detail'});
		detail.add(new Container({className: 'name-label', inner: this.name}));
		detail.add(new Container({className: 'desc-label', inner: 'Description'}));
		detail.add(new Container({className: 'description', inner: this.description}));
		detail.add(new Container({className: 'quantity-label', inner: 'Quantity'}));
		let dropdownWrap = new Container({className: 'quantity-dropdown-wrap'});
		let weights = ['100 Gms', '250 Gms', '500 Gms', '1 KG', '1.5 KG', '2 KG', '3 KG', '5 KG'];
		let dd = new DropDown("Quantity", weights, {class: 'weight-options', filter: false, alphabetical: false});
		dropdownWrap.html.appendChild(dd.render());
		detail.add(dropdownWrap);
		let offerPrice = new Container({className: 'offer-price'});
		offerPrice.add(new Container({type: 'span', className: 'price', inner: 'Rs.250'}));
		offerPrice.add(new Container({type: 'span', className: 'orig-price', inner: '&nbsp;&nbsp;Rs.500&nbsp;&nbsp;'}));
		offerPrice.add(new Container({type: 'span', className: 'offer', inner: '(50% Off)'}));
		detail.add(offerPrice);
		detail.add(new AddToCart(this.path));
		detailWrap.add(detail);
		this.add(detailWrap);
	}

	reRender(pageOptions={}) {
		this.path = pageOptions.path || this.path;
		this.getElement('.image-wrap img').setAttribute('src', this.path);
		this.getElement('.name-label').innerHTML = this.name;
	}
}