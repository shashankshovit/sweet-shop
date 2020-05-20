class Container extends BaseHTML {
	constructor(options={}) {
		super();
		this.html = this.create(options);
		options.inner && (this.html.innerHTML = options.inner);
	}
}