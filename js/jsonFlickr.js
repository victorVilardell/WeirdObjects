/*
var numImg = 4;
var numPage = 0;

(function(){

$.getJSON("https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&name=value&format=json&asinc=1&api_key=aed656c0441370035c9c6e23ddb2c471&gallery_id=9634-72157621980433950&extras=description,owner_name&per_page="+numImg+"&page="+numPage+"&jsoncallback=?", function (data) {

	var elemPrint = $(".pc");

	if (data.stat != 1) {
		for(i=0; i <= numImg-1; i++) {
	    	var loader = $("<i class='fa fa-cog fa-spin fa-3x fa-fw'></i>");
	    	var article = $("<article class='col-lg-3 col-md-6 col-sm-6 col-xs-12'/>").append(loader);
			$(elemPrint).append(article)
    	}
	}

    for(i=0; i <= numImg-1; i++) {
    	var thisDate = data.photos.photo[i];
    	var selecArg = $(".pc article");

		$(selecArg[i]).find(".fa-cog").remove();
		var imge = $("<img>").attr("src", "https://farm"+ thisDate.farm +".staticflickr.com/"+ thisDate.server +"/"+ thisDate.id +"_"+ thisDate.secret +".jpg");
		var link = $("<a/>").append(imge).attr("title", thisDate.title)
				.attr("href", "https://www.flickr.com/photos/"+ thisDate.owner +"/"+ thisDate.id );
		$(selecArg[i]).append(link);

    }


});

})(document)*/
/*
(function() {

	function WeirdObjects() {
		this.numImage = 4; //numero de imagenes por pagina
		this.numPage = 0; //numero de pagina actual
		this.content = $(".pc");
		
		this.getJsonFlickr = function() {
			this.xx = function(e) { 
				$(".pc").find(".fa-cog").remove();
			    WeirdObjects.xx();
				var JSONData = e.photos.photo;
				for (var i = (WeirdObjects.numImage * WeirdObjects.numPage); i <= ((WeirdObjects.numImage * WeirdObjects.numPage) + WeirdObjects.numImage) ; i++ ) {
					var imge = $("<img>").attr("src", "https://farm"+ JSONData[i].farm +".staticflickr.com/"+ JSONData[i].server +"/"+ JSONData[i].id +"_"+ JSONData[i].secret +".jpg");
					var link = $("<a/>").append(imge).attr("title", JSONData[i].title)
							.attr("href", "https://www.flickr.com/photos/"+ JSONData[i].owner +"/"+ JSONData[i].id );
					$(selecArg[i]).append(link);
				}
			};
			$.getJSON("https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&name=value&format=json&asinc=1&api_key=aed656c0441370035c9c6e23ddb2c471&gallery_id=9634-72157621980433950&extras=description,owner_name&per_page="+this.numImg+"&page="+this.numPage+"&jsoncallback=?", function (data) {
			})
			.done(function(e){
				this.xx(e)
			})
			.fail(function() {
				var error = "Sorry the service is not available.";
				var errorMsg = $("<div class='alert alert-warning' role='alert'/>").append(error);
				$(this.content).append(errorMsg);
			})
			.always(function() {
				/* eliminar siempre el loader
			});
			}
	}

	

	WeirdObjects.prototype.constructor = function() {

		for(var i=0; i <= this.numImage-1; i++) {
	    	var loader = $("<i class='fa fa-cog fa-spin fa-3x fa-fw'></i>");
	    	var article = $("<article class='col-lg-3 col-md-6 col-sm-6 col-xs-12'/>").append(loader);
			$(this.content).append(article);
		}

	}

	WeirdObjects.prototype.init = function() {
		this.getJsonFlickr();
		this.constructor();
	}

	var go = new WeirdObjects();
	go.init();

})(document)*/

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
		$(this.content).find(".fa-cog").remove();
		if (this.JSONData == 0) {
			this.JSONData = e.photos.photo;
		};	
		for (var i = (this.paginator.numImage * this.paginator.numPage); i <= ((this.paginator.numImage * this.paginator.numPage) + this.paginator.numImage) ; i++ ) {
			var xx = 0;
			var imge = $("<img>").attr("src", "https://farm"+ this.JSONData[i].farm +".staticflickr.com/"+ this.JSONData[i].server +"/"+ this.JSONData[i].id +"_"+ this.JSONData[i].secret +".jpg");
			var link = $("<a/>").append(imge).attr("title", this.JSONData[i].title)
					.attr("href", "https://www.flickr.com/photos/"+ this.JSONData[i].owner +"/"+ this.JSONData[i].id );
			$(contentArticle[xx]).append(link);
			xx++
		}
	},

	constructor: function() {

		for(var i=0; i <= this.paginator.numImage-1; i++) {
	    	var loader = $("<i class='fa fa-cog fa-spin fa-3x fa-fw'></i>");
	    	var article = $("<article class='col-lg-3 col-md-6 col-sm-6 col-xs-12'/>").append(loader);
			$(this.content).append(article);
		}

	},

	events: function() {
		$(".next").bind("click", function(e) {
			e.preventDefault();
			WeirdObjects.paginator.numPage = WeirdObjects.paginator.numPage + 1;
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