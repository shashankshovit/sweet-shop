class Footer extends BaseHTML {
	constructor(html) {
		super();
		this.html = html;
		this.add(new Container({inner: `<h1>Footer Here</h1>`}));
	}
}