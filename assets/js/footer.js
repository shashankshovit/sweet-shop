class Footer extends BaseHTML {
	constructor(html) {
		super();
		this.html = html;
		this.add(new Container({
			className: 'sweet-shop-footer',
			inner: '<h2><a href="https://github.com/shashankshovit/sweet-shop/">Link to Github repo</a></h2>'}));
	}
}