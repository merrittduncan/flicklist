

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "e4c4dc1d7b1d1f4a08a397c5faf53694"
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
            var response = response.results;
            model.browseItems = response;
            console.log(model.browseItems);

			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
      var myLi= $("<li></li>").append($("<p>"+ movie.original_title + "</p>"));
      $("#section-watchlist ul").append(myLi);
  });

  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {
        var myButton = $("<button></button>").text("Add to Watchlist");
        myButton.click(function(){
            model.watchlistItems.push(movie);
            render();
        });
		// TODO 3
		// insert a list item into the <ul> in the browse section;
        var myLi= $("<li></li>").append($("<p>"+ movie.original_title + "</p>").append(myButton));
        $("#section-browse ul").append(myLi);

		// TODO 4
		// the list item should include a button that says "Add to Watchlist"


		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again

  });
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
