class NextButton extends Container {
	constructor(options, displayText, callback) {
		let cls = 'next-button';
		options.className = options.className ? `${cls} ${options.className}` : cls;
		super(options);
		displayText = displayText || 'Next';
		this.add(new Container({inner: displayText}));
		this.add(new Container({type: 'span', className: 'glyphicon glyphicon-chevron-right'}));

		this.html.addEventListener('click', callback)
	}
}