$(document).on('ready', function(){

	function searchImages(tags) {
		var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		$.getJSON(flickrAPI, {
			tags: tags,
			tagmode: "any",
			format: "json"
		}).done(function(data) {
			$('#images').empty();
			$.each(data.items, function(i, item) {
				var newListItem = $('<li class="col-md-3">');
				var imageWrapper = $('<a>').attr({
					'data-toggle': "modal",
					'data-target': "#infoModal",
					'data-imgsrc': item.media.m
				}).appendTo(newListItem);
				var newImage = $('<img>').attr('src', item.media.m).appendTo(imageWrapper);
				var newTitle = $('<p class="image-title">').text(item.title).appendTo(newListItem);
				var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
				//var textDesc = $(item.description).text();
				//var newDescription = $('<p class="image-description">').html(textDesc).appendTo(newListItem);
				var newAuthor = $('<p class="image-author">').text(item.author).appendTo(newListItem);
				var newLink = $('<a class="flickr-link btn btn-info">').attr('href', item.link).text('View source image on Flickr').appendTo(newListItem);
				
				// Cap search results at 15 pictures
				newListItem.appendTo('#images');
				if(i === 15) {
					return false;
				}
			});
		});
	}
	// Add on-click event to search button to perform Flickr search	
	$('button.search').on('click', function(event) {
		event.preventDefault();
		var searchInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
		searchImages(searchInput.value);
	});
	
	// Add on-click event to the modal
	$('#infoModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget); // Button that triggered the modal
		var imgSrc = button.data('imgsrc');

		// Update the modal's content
		var modal = $(this);
		var modalBody = modal.find('.modal-body');
		modalBody.empty();
		var modalImage = $('<img>').attr('src', imgSrc).appendTo(modalBody);
	});
});
