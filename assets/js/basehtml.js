class BaseHTML {
	constructor(){
		this.parent = null;
		this.children = [];
		this.html = '';
	}

	add(item, domAppend=true) {
		this.children.push(item);
		item.parent = this;
		try {
			domAppend ? this.html.appendChild(item.render) : item.render;
		} catch(err) {
			console.warn('Issue appending child to DOM:', item);
			throw err;
		}
	}

	remove(item) {
		this.html.removeChild(item.html);
		this.children.splice(this.children.indexOf(item), 1);
	}

	create(options={}) {
		let defaults = {
			type: 'div',
			className: null,
			id: null,
			attrName: '',
			attrValue: '',
		}
		options = Object.assign(defaults, options);
		let domEle = document.createElement(options.type);
		options.className && this.addClasses(domEle, options.className);
		options.id && domEle.setAttribute('id', options.id);
		(options.attrName && options.attrValue) &&
			(domEle.setAttribute(options.attrName, options.attrValue));
		return domEle;
	}

	addClasses(ele, classes) {
		let classList = classes.split(' ');
		for(let cls of classList) {
			ele.classList.add(cls);
		}
	}

	get render() {
		return this.html;
		// IMPLEMENT IN SUBCLASS
	}

	getElement(query) {
		return this.html.querySelector(query);
	}

	get topmostParent() {
		let leaf = this;
		while(leaf.parent) {
			leaf = leaf.parent;
		}
		return leaf;
	}

	reRender() {
		// IMPLEMENT IN SUBCLASS
	}

}