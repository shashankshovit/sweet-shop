class Image extends BaseHTML {
	constructor(options={}) {
		super();
		if(!options.src) {
			// throw "Image.js: Image path required. Eg. {src: '/path/to/image.jpg'}";
		}
		options.type = 'img';
		options.attrName = 'src';
		options.attrValue = options.src;
		this.html = this.create(options);
	}
}