/**
 * Author: Shashank Shovit (shashankshovit@gmail.com)
 * Github: https://github.com/shashankshovit/
 *
 * This utility helps to create dropdown is just two steps.
 *
 * Usage:
 * let dropdown = new DropDown('Cities', ['Venice', 'Paris', 'Bangalore']);
 * document.querySelector('.container1').appendChild(dropdown.render());
 */

 class DropDown {
	constructor(label, choices, options) {
		this.label = label;
		this.choices = choices;
		let defaultOptions = {
			alphabetical: true,
			arrow: true,
			callback: null,
			class: null,
			filter: true,
			id: 'DropDown',
			updateLabel: true,
		};
		this.options = Object.assign(defaultOptions, options);
		this.validateAttributes();
		this.html = '';
		document.addEventListener('click', this.captureClickCloseDropdown.bind(this));
	}

	validateAttributes() {
		let isAcceptable = true;
		isAcceptable = isAcceptable && (typeof(this.label) == 'string') && (this.label.trim() != '');
		if(this.choices instanceof Object ) {
			let values = Object.values(this.choices);
			isAcceptable = isAcceptable && (values.length != 0)
				&& (values.every(ch => (typeof(ch) == 'string' || typeof(ch) == 'number')));
			(this.choices instanceof Array) && this.reorganiseChoices();
		} else {
			isAcceptable = false;
		} 
		if(!isAcceptable) {
			let warningMsg = `DropDown Usage: DropDown(label, choices, options)
					label: String
					choices: Array[<String/Number>]/Object{key: <String/Number>, ...}
					options: <Object>{
						alphabetical: Boolean,
						class: String,
						id: String,
						filter: Boolean,
						callback: function,
                        updateLabel: Boolean
					}
				`;
			throw warningMsg;
		}
	}

	reorganiseChoices() {
		let choices = this.choices;
		this.choices = {};
		choices.forEach(ch => {this.choices[ch] = ch;});
	}

	get optionsContainer() {
		return this.html.querySelector('.dropdown-options');
	}

	get arrowContainer() {
		return this.html.querySelector('.dropdown-arrow');
	}

	get isExpanded() {
		return this.optionsContainer.classList.contains('open');
	}

	closeDropdown() {
		this.arrowContainer.classList.remove('down');
		this.optionsContainer.classList.remove('open');
	}

	openDropdown() {
		this.arrowContainer.classList.add('down');
		this.optionsContainer.classList.add('open');
	}

	captureClickCloseDropdown(e) {
		(this.isExpanded) && this.closeDropdown();
	}

	createHTML() {
		this.html = document.createElement('div');
		this.html.id = this.options.id;
		this.html.classList.add('dropdown-push-controller');
		if(this.options.class) { this.html.classList.add(this.options.class); }

		let labelHolder = document.createElement('div');
		labelHolder.className = 'dropdown-label';
		
		let label = document.createElement('div');
		label.innerHTML = this.label;
		labelHolder.appendChild(label);
		
		let arrow = document.createElement('div');
		arrow.className = 'dropdown-arrow left';
		!this.options.arrow && (arrow.classList.add('hidden'));
		labelHolder.appendChild(arrow);
		
		this.html.addEventListener('click', this.pushButtonClicked.bind(this));
		this.html.appendChild(labelHolder);

		let choices = this.createOptions();
		this.html.appendChild(choices);
		return this.html;
	}

	pushButtonClicked(e) {
		if(this.isExpanded) {
			this.closeDropdown();
		} else {
			this.openDropdown();
		}
		e.stopPropagation();
	}

	createOptions() {
		let optionsContainer = document.createElement('div');
		optionsContainer.className = 'dropdown-options';
		this.options.filter && optionsContainer.appendChild(this.createFilter());
		let sortedKeys = this.options.alphabetical ? Object.keys(this.choices).sort() : Object.keys(this.choices);
		sortedKeys.forEach(key => {
			let optionElement = document.createElement('div');
			optionElement.innerHTML = key;
			optionElement.dataset.value = this.choices[key];
			optionElement.addEventListener('click', this.optionSelected.bind(this));
			optionsContainer.appendChild(optionElement);
		});
		return optionsContainer;
	}

	createFilter() {
		let searchInput = document.createElement('input');
		searchInput.type = 'text';
		searchInput.placeholder = 'Filter';
		searchInput.classList.add('dropdown-search');
		searchInput.addEventListener('keyup', this.filterList.bind(this));
		searchInput.addEventListener('click', function(e) {
			e.stopPropagation();
		});
		return searchInput;
	}

	filterList(e) {
		let regEx = new RegExp(`.*${e.target.value.split('').join('.*')}.*`, 'i');
		let options = Array.from(this.optionsContainer.children);
		if(e.target.value.trim() == '') {
			this.clearFilter();
		} else {
			Array.from(this.optionsContainer.children).forEach(option => {
				if(regEx.test(option.innerText))
					option.classList.remove('expelled');
				else
					option.classList.add('expelled');
			});
		}
	}

	clearFilter() {
		this.html.querySelector('.dropdown-search').value='';
		let options = Array.from(this.optionsContainer.children);
		options.forEach(option => option.classList.remove('expelled'));
	}

	optionSelected(e) {
		this.options.updateLabel && (this.html.firstElementChild.firstElementChild.innerText = e.target.innerText);
		let selectedValue = e.target.dataset.value;
		this.html.dataset.value = selectedValue;
		this.options.filter && this.clearFilter();
		this.options.callback && this.options.callback(selectedValue);
	}

	render() {
		return this.createHTML();
	}
}
