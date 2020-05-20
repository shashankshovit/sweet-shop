class Checkout extends BaseHTML {
	constructor(html, cart) {
		super();
		this.html = html;
		this.stage = 0;
		this.addRibbon();
		this.createSummaryLayout(cart);
		this.createSummaryFooter();
	}

	get summary() {
		let plural = this.parent.cartCount == 1 ? '' : 's';
		return `${this.parent.cartCount} product${plural} in cart`;
	}

	get total() {
		// return 150 + Math.ceil(Math.random()*30)*50;
		return parseFloat(this.parent.cartCount*250).toFixed(2);
	}

	updateCartTotal() {
		this.getElement('.cost-row .value').innerHTML = `Rs.${this.total}`;
	}

	createSummaryLayout(cart) {
		this.add(new Container({className: 'summary', inner: 0}));
		let horNavOptns = {
			className: 'cart-navigate',
			tileOptions: {
				preview: false,
				details: false,
				quantityController: true,
			}
		};
		if(Object.keys(cart).length) {
			this.cartNavigator = new HorizontalNavigator(horNavOptns, Object.keys(cart), cart);
			this.add(this.cartNavigator);
		} else {
			this.add(new Container({inner: 'Nothing here. Come back later.', className: 'cart-empty'}));
		}
	}

	addRibbon() {
		let statusRibbon = new Container({className: 'ribbon'});

		let reviewCont = new Container({className: 'stage-box active'});
		reviewCont.add(new Container({className: 'stage', type: 'span', inner: '1'}));
		reviewCont.add(new Container({type: 'span', className: 'title', inner: 'Review & Schedule'}));
		statusRibbon.add(reviewCont);

		let addressCont = new Container({className: 'stage-box'});
		addressCont.add(new Container({className: 'stage', type: 'span', inner: '2'}));
		addressCont.add(new Container({type: 'span', className: 'title', inner: 'Select Address'}));
		statusRibbon.add(addressCont);

		let quoteCont = new Container({className: 'stage-box'});
		quoteCont.add(new Container({className: 'stage', type: 'span', inner: '3'}));
		quoteCont.add(new Container({type: 'span', className: 'title', inner: 'Check Quote'}));
		statusRibbon.add(quoteCont);

		let placedCont = new Container({className: 'stage-box last'});
		placedCont.add(new Container({className: 'stage', type: 'span', inner: '4'}));
		placedCont.add(new Container({type: 'span', className: 'title', inner: 'Order Placed'}));
		statusRibbon.add(placedCont);

		this.add(statusRibbon);
	}

	createSummaryFooter() {
		let costBreakup = new Container({className: 'cost-breakup'});
		let left = new Container({className: 'left'});
		let costRow = new Container({type: 'span', className: 'cost-row'});
		costRow.add(new Container({type: 'span', className: 'title', inner: 'Cart Total'}));
		costRow.add(new Container({type: 'span', className: 'value', inner: 'Rs.0'}));
		left.add(costRow);
		let taxRow = new Container({type: 'span'});
		taxRow.add(new Container({type: 'span', className: 'title', inner: 'Tax'}));
		taxRow.add(new Container({type: 'span', className: 'value', inner: 'Rs.50'}));
		left.add(taxRow);
		let shippingRow = new Container({type: 'span'});
		shippingRow.add(new Container({type: 'span', className: 'title', inner: 'Shipping Charges'}));
		shippingRow.add(new Container({type: 'span', className: 'value', inner: 'Rs.100'}));
		left.add(shippingRow);
		costBreakup.add(left);
		costBreakup.add(new NextButton({}, 'Select Address', this.moveToSelectAddress.bind(this)))

		this.add(costBreakup);
	}

	createAddressSection() {
		let addressWrapper = new Container({className: 'no-design'});
		addressWrapper.add(new Container({inner: '<h1>No design</h1>'}));
		addressWrapper.add(new NextButton({}, 'Check Quote', this.moveToCheckQuote.bind(this)));
		this.add(addressWrapper);
	}

	createQuoteSection() {
		let quoteWrapper = new Container({className: 'no-design'});
		quoteWrapper.add(new Container({inner: '<h1>No design</h1>'}));
		quoteWrapper.add(new NextButton({}, 'Order Placed', this.moveToOrderPlaced.bind(this)));
		this.add(quoteWrapper);
	}

	createOrderPlaced() {
		this.add(new Container({inner: '<h1>Your order is placed.</h1>', className: 'no-design'}));
	}

	beforeNext() {
		let toRemove = this.children.slice(1);
		toRemove.forEach(child => {
			this.remove(child);
		});
		this.stage++;
		this.children[0].children[this.stage].html.classList.add('active');
	}

	moveToSelectAddress(evt) {
		this.beforeNext();
		this.createAddressSection();
	}

	moveToCheckQuote(evt) {
		this.beforeNext();
		this.createQuoteSection();
	}

	moveToOrderPlaced(evt) {
		this.beforeNext();
		this.createOrderPlaced();
	}

	initialize() {
		this.html.classList.add('visible');
		this.getElement('.summary').innerHTML = this.summary;
		this.getElement('.cost-row .value').innerHTML = `Rs. ${this.total}`;
		// this.cartNavigator.populateProducts(Object.keys(this.parent.cart));
	}

	destroy() {
		this.html.classList.remove('visible');
		this.html.innerHTML = '';
		this.parent.checkout = undefined;
	}
}