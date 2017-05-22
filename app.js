document.addEventListener('DOMContentLoaded', function() {
	var fullSizedPhotoUrlArray;

	document.onkeydown = function(e) {
		if (e.keyCode === 13) {
			searchPhotos();
		}
	}

	searchButton.onclick = function() {
		searchPhotos();	
	}        

	var searchPhotos = function() {
		// clear the data from the previous search
		fullSizedPhotoUrlArray = [];
		document.querySelector('#container').innerHTML ='';

		// Grab values provided by user or default to searching for 15 kittens
		const tag = document.getElementById('flicker-tag').value || 'kittens';
		const limit = parseInt(document.getElementById('flicker-limit').value) || 15;
		const xhr = new XMLHttpRequest();

		// initiate new Flickr API search
		xhr.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=910215890862a5b0ac66f3665d12010f&tags=' + tag + '&format=json&nojsoncallback=1&per_page=' + limit + '&extras=url_q,url_sq');

		// show loading message while readyState !== 4
		showLoadingMsg();

		xhr.onload = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				var data = JSON.parse(xhr.response);

				hideLoadingMsg();
				setUpThumbails(data);
			} else {
				// make this a properly styled flash msg, time permitting
				alert('Your search failed with an error code of:' + xhr.status);
			}
		};

		xhr.send();
	}

	var showLoadingMsg = function() {
		document.getElementById('loading').style.display = 'block';
	}

	var hideLoadingMsg = function() {
		document.getElementById('loading').style.display = 'none';
	}

	var setUpThumbails = function(data) {
		const photos = data.photos.photo;

		photos.forEach(function(photo, index) {
			var thumbnailTemplate = document.querySelector('#thumbnail-template').content;
			
			// populate array with larger-than-thumbnail sized URLs from photos  
			fullSizedPhotoUrlArray.push({photo_url: photo.url_q, title:photo.title});

			// set up thumbnail templates with necessary data
			thumbnailTemplate.querySelector('#thumbnail').src = photo.url_sq;
			thumbnailTemplate.querySelector('#thumbnail').alt = photo.title;
			thumbnailTemplate.querySelector('.lightbox-trigger').id = 'thumbnail-' + index;

			// generate thumbnail nodes from template
			document.querySelector('#container').appendChild(document.importNode(thumbnailTemplate, true));
		});

		generateLightbox();
	}
	
	var generateLightbox = function() {
		const lightbox = document.getElementById('lightbox');
		const left = document.getElementById('left');
		const right = document.getElementById('right');
		const closeX = document.getElementById('close');
		var image = document.getElementById('lightbox-image');
		var title = document.querySelector('#photoTitle');
		var thumbnails = document.querySelectorAll('.thumbnail-container');

		fullSizedPhotoUrlArray.forEach(function(photo, index, photoArray) {
			thumbnails[index].addEventListener('click', function() {
				image.src = photo.photo_url;
				title.innerHTML = photo.title;
				lightbox.style.display = 'block';

				setUpScrollButtons(index, photoArray.length);
			});
		});	

		closeX.onclick = function() {
			lightbox.style.display = 'none';
		}

		left.onclick = function(e) {
			const index = parseInt(e.target.dataset.index);
			image.src = fullSizedPhotoUrlArray[index].photo_url;
			title.innerHTML = fullSizedPhotoUrlArray[index].title;

			setUpScrollButtons(index, fullSizedPhotoUrlArray.length);

		}

		right.onclick = function(e) {
			const index = parseInt(e.target.dataset.index);
			image.src = fullSizedPhotoUrlArray[index].photo_url;
			title.innerHTML = fullSizedPhotoUrlArray[index].title;

			setUpScrollButtons(index, fullSizedPhotoUrlArray.length);
		}

		// Close lightbox when user hits escape
		window.onkeydown = function(e) {
			if (e.keyCode === 27) {
				lightbox.style.display = 'none';
			}
		}

		// When the user clicks anywhere outside of the lightbox, close it
		window.onclick = function(e) {
			if (e.target == lightbox) {
				lightbox.style.display = 'none';
			}
		}
	}

	var setUpScrollButtons = function(index, photoCount) {
		if (index !== 0) {
		    left.setAttribute('style', 'visibility: visible')
		} else {
			left.setAttribute('style', 'visibility: hidden')
		}

		if (index !== photoCount - 1) {
			right.setAttribute('style', 'visibility: visible')
		} else {
			right.setAttribute('style', 'visibility: hidden')
		}

		left.removeAttribute('data-index', null);
		left.setAttribute('data-index', index - 1);
		right.removeAttribute('data-index', null)
		right.setAttribute('data-index', index + 1);
	}
});
