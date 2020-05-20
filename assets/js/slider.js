class Slider extends BaseHTML {
	constructor(banners) {
		super();
		this.html = new Container({className: 'slider-container'}).render;
		this.createSlider(banners);
	}

	createSlider(banners) {
		let imagePathList = banners;
		// create indicators and carousels based on image path list
		let indicators = '';
		let carousels = '';
		for(let i=0; i<imagePathList.length; i++) {
			let indicators_active = '';
			let carousels_active = '';
			if(i==0) {
				indicators_active = ' class="active"';
				carousels_active = ' active';
			}
			indicators += `<li data-target="#showcase" data-slide-to="${i}${indicators_active}"></li>`;
			carousels += `<div class="item${carousels_active}">
							<img src="${imagePathList[i]}">
						</div>
			`;
		}

		this.html.innerHTML = `
			<!-- SHOW CASE -->
	
			<div id="showcase" class="carousel slide" data-ride="carousel">
				<!-- Indicators -->
				<ol class="carousel-indicators">
					${indicators}
				</ol>

				<!-- Wrapper for slides -->
				<div class="carousel-inner">
					${carousels}
				</div>


				<!-- Left and right controls -->
				<a class="left carousel-control" href="#showcase" data-slide="prev">
					<span class="glyphicon glyphicon-chevron-left"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="right carousel-control" href="#showcase" data-slide="next">
					<span class="glyphicon glyphicon-chevron-right"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		`;
	}
}