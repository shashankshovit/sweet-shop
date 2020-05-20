class AddToCart extends BaseHTML {
	constructor(product, displayText){
		super();
		!displayText && (displayText='Add To Cart');
		this.html = new Container({className: 'add-to-cart', inner: displayText}).render;
		this.product = product;
		this.html.addEventListener('click', this.onClick.bind(this));
	}

	onClick(evt) {
		this.topmostParent.increaseQuantity(this.product);
		evt.stopPropagation();
	}
}