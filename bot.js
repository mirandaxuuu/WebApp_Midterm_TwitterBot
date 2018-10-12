console.log("The bot begins.");

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var fs = require('fs');

// const promise = require('make-promises-safe');


// AT FIRST I TRIED TO MAKE A BOT THAT KEEPS TRACK OF NEW POSTS, BUT I REALIZED THAT PEOPLE ARE NOT ALWAYS
// MAKING NEW TWEETS THAT INCLUDE "NYU"
// SO I CHANGED MY IDEA TO SEARCH FOR TWEETS INSTEAD OF USING STREAM

// function tweets () {
// 	var stream = T.stream('statuses/filter', { track: 'NYU', lang: 'en' })
	 
// 	stream.on('tweet', function (tweet) {
// 		var fs = require('fs');
// 		var json = JSON.stringify(data,null,2);
// 		fs.writeFile("tweetdata.json", json, function(err){
// 			if (err) throw err;
// 			console.log('Saved!');
// 			// console.log('tweet');
// 			myMainFunction();
// 		})
// 	})
// }


// THIS FUNCTIONS WRITES A JSON FILE AND SAVES IT LOCALLY

function tweets () {
	T.get('search/tweets', {q: 'NYU since:2018-1-1', lang: 'en', count: 20}, function(err, data, response) {
		var fs = require('fs');
		var json = JSON.stringify(data,null,2);
		fs.writeFile("tweetdata.json", json, function(err){
			if (err) throw err;
			console.log('saved!');
			myMainFunction();
		})
	})
}

tweets();


// AN INSTRUCTION ON HOW TO USE FS.WRITEFILE THAT I FOUND ON W3SCHOOLS

// fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
// 	if (err) throw err;
// 	console.log('Saved!');
// });



// PARSE THE DATA FROM TWEETDATA.JSON THAT I JUST CREATED
// GET THE NUMBER OF LIKES THAT THE USER HAS GOTTEN

function getTheNumber (n) {

	var exists = fs.existsSync('tweetdata.json');

	if (exists) {
		// console.log('got the file');
		var txt = fs.readFileSync('tweetdata.json', 'utf8');
		parsedData = JSON.parse(txt);
		// console.log(parsedData);
		var count = parsedData.statuses[n].user.favourites_count;
		// console.log(count);
	} else {
		console.log('cannot find the data file');
	}

	return count;
}



// GET THE ID OF THE POST

function getTheId (n) {

	var exists = fs.existsSync('tweetdata.json');

	if (exists) {
		// console.log('got the file');
		var txt = fs.readFileSync('tweetdata.json', 'utf8');
		parsedData = JSON.parse(txt);
		// console.log(parsedData);
		var id = parsedData.statuses[n].id_str;
		// console.log(id);
	} else {
		console.log('cannot find the data file');
	}

	return id;
}



// GET THE USER'S SCREEN NAME

function getTheUser (n) {

	var exists = fs.existsSync('tweetdata.json');

	if (exists) {
		// console.log('got the file');
		var txt = fs.readFileSync('tweetdata.json', 'utf8');
		parsedData = JSON.parse(txt);
		// console.log(parsedData);
		var user = parsedData.statuses[n].user.screen_name;
		console.log(user);
	} else {
		console.log('cannot find the data file');
	}

	return user;
}



// EXECUTE THE FUNCTIONS FOR 20 TIMES TO REPLAY TO 20 USERS AND RETWEET 20 STATUSES

function myMainFunction() {

	for (i=0; i<20; i++){

		var total_likes = getTheNumber(i);
		var post_id = getTheId(i);
		var user_name = getTheUser(i);
		// console.log(total_likes);
		// console.log(user_id);


		function retweetPost() {

			T.post('statuses/retweet/:id', { id: post_id }, function (err, data, response) {
	  			// console.log(data)
			})
		}


		function replyTweet () {

			T.post('statuses/update', { status: '@' + user_name + ' I like your posts.'}, tweeted);

		    function tweeted(err, reply) {
		      if (err) {
		        console.log(err.message);
		      } else {
		        // console.log('Tweeted!');
		      }
		    }
		}


		if (total_likes < 100) {
			retweetPost();
			console.log('retweeted!')
			replyTweet();
			console.log('replied!' + '\n');
		} else {
			console.log('already popular' + '\n');
		}
	}
}
