'use strict';

var express  		= require('express');
var app      		= express();                    // create our app w/ express
var mongoose 		= require('mongoose');          // mongoose for mongodb
var morgan 			= require('morgan');            // log requests to the console (express4)
var bodyParser 		= require('body-parser');    	// pull information from HTML POST (express4)
var methodOverride 	= require('method-override');   // simulate DELETE and PUT (express4)

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io
mongoose.connect('mongodb://localhost:27017/mean-demo');


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

 // define model =================
var Meetups = mongoose.model('Meetups', {
	text : String
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// -------------------------------------------------------------------------
// get all meetups (meetups)
app.get('/api/meetups', function(req, res) {

	// use mongoose to get all meetups in the database
	Meetups.find(function(err, meetups) {

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			res.send(err);
        }

		res.json(meetups); // return all meetups in JSON format
	});
});

// create meetups and send back all meetups after creation
app.post('/api/meetups', function(req, res) {

	// create a meetups, information comes from AJAX request from Angular
	Meetups.create({
		text : req.body.text,
		done : false
	}, function(err, meetups) {
		if (err) {
			res.send(err);
        }

		// get and return all the meetups after you create another
		Meetups.find(function(err, meetups) {
			if (err) {
				res.send(err);
            }
			res.json(meetups);
      });
  });
});

// delete a meetup
app.delete('/api/meetups/:meetups_id', function(req, res) {
	Meetups.remove({
		_id : req.params.meetup_id
	}, function(err, meetups) {
		if (err) {
			res.send(err);
        }

		// get and return all the meetups after you create another
		Meetups.find(function(err, meetups) {
			if (err) {
				res.send(err);
            }
			res.json(meetups);
		});
	});
});

// application 
app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
});



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080...");

