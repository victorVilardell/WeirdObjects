function jsonFlickrApi(rsp){

	if (rsp.stat != "ok"){

		// something broke!
		return;
	}

	for (var i=0; i<rsp.blogs.blog.length; i++){

		var blog = rsp.blogs.blog[i];

		var div = document.createElement('div');
		var txt = document.createTextNode(blog.name);

		div.appendChild(txt);
		document.body.appendChild(div);
	}
}

$("#more_com").click(function(){

	$.ajax({
		url : 'https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value&format=json&asinc=1&api_key=0',
		type : 'GET',
		dataType : 'html',

		success : function(code_html, statut){
			$(code_html).appendTo("#commentaires");
		},

		error : function(resultat, statut, erreur){

		},

		complete : function(resultat, statut){
				jsonFlickrApi(resultat);
		}

	});

});