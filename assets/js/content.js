class Content extends BaseHTML {
	constructor(html, banners, menuItems) {
		super();
		this.html = html;
		this.banners = banners;
		this.products = menuItems;
		this.page = 'home';		// deciding factor setting page content
		this.contentTypes = {
			home: {},
			detail: {},
			checkout: {},
			about: {},
			account: {},
		};
		this.addChildren(banners, menuItems);
		this.renderContent(this.page);
	}

	addChildren(banners, menuItems) {
		this.contentTypes.home = new Home(banners, menuItems);
		this.add(this.contentTypes.home, false);
		this.contentTypes.detail = new DetailPage('', menuItems);
		this.add(this.contentTypes.detail, false);
	}

	renderContent(page, pageOptions={}) {
		page = page || this.page;
		if(!Object.keys(this.contentTypes).includes(page)) {
			console.error("Invalid content type: ", page);
			return;
		}
		this.children.forEach(child => {
			try {
				this.html.removeChild(child.html)
			} catch(err) {
				// console.log('Failed removal of ', child, err);
			}
		});
		this.html.appendChild(this.contentTypes[page].html);
		this.contentTypes[page].reRender(pageOptions);
	}

}