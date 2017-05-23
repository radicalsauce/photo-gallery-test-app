# photo-gallery-test-app
This is a little janky app to be used for basic automation testing interviews.


## Instructions:

**Your task:**
Create a series of automation tests to cover the Flickr Search per some or all of the guidelines below. You are encouraged to use whatever technology you're comfortable with to do so, and feel free to add, dispute or elaborate on various test cases should you feel it necessary. You can either work for the remotely deployed version (found here: https://radicalsauce.github.io/photo-gallery-test-app/#) or pull it down and work with it locally. It requires no server or dependency set up.

**The app:**
https://radicalsauce.github.io/photo-gallery-test-app/#

**Overview:**
Flickr Search is a small, single page application that allows users to create galleries of photos retrieved from via the Flickr API. The application consists of two input fields, that correspond to a search term (e.g. "cats", "pictures of food", etc) and how many photos the user hopes to return ("photo number" input field).

**Basic spec:**
Flickr Search ***should*** have the following features:
- If the search button is clicked without anything in the input fields, it defaults to returning 15 "kittens".
- If the search button is clicked when only the search query input field has a value, it will return 15 results per
the search query
- If the search button is clicked when only the "photo number" input field has a value, it will return that number of
kittens
- If a non numerical value is entered in the "photo number" input field, it will return 15
- When a search is performed, you will see a loading screen until the thumbnails gallery starts to become visible
- When the "photo number" input field has a value of one, one photo thumbnails should be returned
- When the "photo number" input field has a value of 500, 500 photos thumbnails should be returned
- When any photo thumbnail is clicked, it should trigger a modal with a larger version of that image
- The modal should allow for users to scan through the gallery using the left and right buttons
- Clicking the left button on the modal should display images that appear to the left of the clicked thumbnail in
proper order
- Clicking the right button on the modal should display images that appear to the right of the clicked thumbnail in
proper order
- Once the first image in the thumbnail gallery is accessed, the left button should vanish 
- Once the last image in the thumbnail gallery is accessed, the right button should vanish 
- Modal should disappear when the escape button is clicked

