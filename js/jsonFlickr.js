var WeirdObjects =  {

	paginator: {
		numImage: 4, //numero de imagenes por pagina
		numPage : 0, //numero de pagina actual
	},

	content: $(".pc"),
	JSONData: 0,

	getJsonFlickr: function() {
		$.getJSON("https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&name=value&format=json&asinc=1&api_key=aed656c0441370035c9c6e23ddb2c471&gallery_id=9634-72157621980433950&extras=description,owner_name&per_page="+this.numImg+"&page="+this.numPage+"&jsoncallback=?", function (data) {
		})
		.done(function(e){
			WeirdObjects.loadImages(e)
		})
		.fail(function() {
			var error = "Sorry the service is not available.";
			var errorMsg = $("<div class='alert alert-warning' role='alert'/>").append(error);
			$(this.content).append(errorMsg);
		})
		.always(function() {
			/* eliminar siempre el loader*/
		});
	},

	loadImages: function(e) {
		var contentArticle = $(".pc article");
		var xx = 0;
		$(this.content).find(".fa-cog").remove();
		if (this.JSONData == 0) {
			this.JSONData = e.photos.photo;
		};	
		
		for (var i = (this.paginator.numImage * this.paginator.numPage); i <= ((this.paginator.numImage * this.paginator.numPage) + this.paginator.numImage) ; i++ ) {
			var imge = $("<img>").attr("src", "https://farm"+ this.JSONData[i].farm +".staticflickr.com/"+ this.JSONData[i].server +"/"+ this.JSONData[i].id +"_"+ this.JSONData[i].secret +".jpg");
			var link = $("<a/>").append(imge).attr("title", this.JSONData[i].title)
					.attr("href", "https://www.flickr.com/photos/"+ this.JSONData[i].owner +"/"+ this.JSONData[i].id );
			$(contentArticle[xx]).append(link);
			xx++
		}
	},

	cleanImage: function(){
		var contentAncor = $(".pc article a");
		$(contentAncor).each(function(i){
			$(this).remove();
		})
	},

	constructor: function() {

		for(var i=0; i <= this.paginator.numImage-1; i++) {
	    	var loader = $("<i class='fa fa-cog fa-spin fa-3x fa-fw'></i>");
	    	var article = $("<article class='col-lg-3 col-md-6 col-sm-6 col-xs-12'/>").append(loader);
			$(this.content).append(article);
		}

		var paginator = "<p><a href='#' class='btn btn-primary prev'>prev</a><a href='#' class='btn btn-primary next'>next</a></p>"
		$(paginator).insertAfter( this.content );
	},

	events: function() {
		$(".next").bind("click", function(e) {
			e.preventDefault();

			if (WeirdObjects.paginator.numPage < Math.floor(WeirdObjects.JSONData.length / WeirdObjects.paginator.numImage) ) {
				WeirdObjects.paginator.numPage++;
			}

			WeirdObjects.cleanImage();
			WeirdObjects.loadImages();
		});

		$(".prev").bind("click", function(e) {
			e.preventDefault();

			if (WeirdObjects.paginator.numPage > 0 ){
				WeirdObjects.paginator.numPage--;
			};

			WeirdObjects.cleanImage();
			WeirdObjects.loadImages();
		})

	},

	init: function() {
		this.getJsonFlickr();
		this.constructor();
		this.events();
	}
}

WeirdObjects.init();