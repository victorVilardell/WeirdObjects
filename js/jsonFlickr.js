var numImg = 4;
var numPage = 0;

/*function jsonFlickrApi(rsp){
	console.log(rsp.jsonFlickrApi.stat);
	if (rsp.stat != "ok"){

		// something broke!
		return;
	}

	for (var i=0; i<rsp.blogs.blog.length; i++){
		console.log("entra");
		var blog = rsp.blogs.blog[i];

		var div = document.createElement('div');
		var txt = document.createTextNode(blog.name);

		div.appendChild(txt);
		document.body.appendChild(div);
	}
}*/

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

})(document)