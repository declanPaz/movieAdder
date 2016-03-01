


$(function(init){
	$('#movieSubmit').click(sendRequest);
	$('#yearSubmit').click(sendRequest);
	$('#typeSubmit').click(sendRequest);
	$('#nextPageButton').click(sendRequest);
});

var $movieArray = [];

var $page = 1;

function sendRequest () {
	var $movieInput = $('#movieInput').val();
	var $yearInput = $('#yearInput').val();
	var $typeInput = $('#typeInput').val();
	$.ajax({
		method: 'GET',
		url: `http://www.omdbapi.com/?s=${$movieInput}&y=${$yearInput}&r=json&type=${$typeInput}&page=${$page}`,
		success:function(data) {
			$('#movieContainer').append(addMovieInfo(data));
		},
		error: function(error){
		}
	});
}

function addMovieInfo (data) {
	var $dataObjects = data.Search;
	$movieArray = $dataObjects.map(function(item){
		var $movie = $('#movieTemplate').clone();	
		
		console.log("this is each item",item);

		var $imdbLocation = item.imdbID;
		$movie.find('.movieTitle').text(item.Title);
		$movie.find('.movieType').text(item.Type);
	  $movie.find('.imdbLink').attr('href', function() {
	    return 'http://www.imdb.com/title/' + $imdbLocation;
	  }).text("See for yourself on the IMDB page!");

		$movie.find('.moviePoster').attr("src", function() {
			return item.Poster;
		});
		return $movie;
	});

	return $movieArray;
	$page+=1;
}










