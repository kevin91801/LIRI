var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify({
	id: "c861e8bb73cd46429ab3c2304200a2c9",
	secret: "72f17bfe73334754bbaa3859c69ac012"
});

var action = process.argv[2];

var title = process.argv[3];

var request = require("request");

function music() {
	spotify.search({ type: 'track', query: title, limit: 1 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
   	console.log(JSON.stringify(data, null, 2));
   	console.log(JSON.stringify("Artist: " + data.tracks.items.album.artists.name));
   	console.log(JSON.stringify("Track Name: " + data.tracks.items.name));
   	console.log(JSON.stringify("Preview: " + data.tracks.items.preview_url));
   	console.log(JSON.stringify("Album: " + data.tracks.items.album.name));   
	});
}

function search() {
	request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
  
  if (!error && response.statusCode === 200) {
  	console.log("Title: " + JSON.parse(body).Title);
  	console.log("Year: " + JSON.parse(body).Year);
  	console.log("The imdb Rating is: " + JSON.parse(body).imdbRating);
  	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
  	console.log("Country produced: " + JSON.parse(body).Country);
  	console.log("Language: " + JSON.parse(body).Language);
  	console.log("Plot: " + JSON.parse(body).Plot);
  	console.log("Actors: " + JSON.parse(body).Actors);
			}
		});
	
};

switch(action) {
	case 'my-tweets':
		tweets();
		break;

	case 'spotify-this-song':
		music();
		break;

	case 'movie-this':
		search();
		break;

	case 'do-what-it-says':
		DoIt();
		break;
}

function history() {
    
        fs.appendFile("\nlog.txt",action + " " + title, function(err) {
            if (err) {
                return console.log(err);
            }
        
    });
};

history();