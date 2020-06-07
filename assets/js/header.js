class Header extends BaseHTML {
	constructor(html) {
		super();
		this.html = html;
	}

	get render() {
		let primaryHolder = new Container({className: 'inner'});
		this.add(primaryHolder);
		primaryHolder.add(new Container({inner: 'Call Us +44 12345678', className: 'phone'}));
		let quesDiv = new Container({className: 'ques'});
		quesDiv.add(new Container({type: 'span', inner: 'My Account'}));
		quesDiv.add(new Container({type: 'span', inner: 'FAQ'}));
		quesDiv.add(new Container({type: 'span', inner: 'Help'}));
		primaryHolder.add(quesDiv);
	}
}