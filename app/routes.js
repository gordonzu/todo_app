'use strict';

var Meetups = require('./models/meetup');

function getMeetups(res) {                                                                     
    Meetups.find(function (err, meetups) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will⇉
        if (err) {
            res.send(err);
        }

        res.json(meetups); // return all todos in JSON format
    }); 
};

module.exports = function (app) {

    app.get('/api/meetups', function (req, res) {
        getMeetups(res);
    });

	app.post('/api/meetups', function (req, res) {

			// create a meetup, information comes from AJAX request from Angular
			Meetups.create({
				name: req.body.name,
				done: false
			}, function (err, todo) {
				if (err)
					res.send(err);

				// get and return all the todos after you create another
				getMeetups(res);
			});
    });

	app.delete('/api/meetups/:_id', function(req, res) {
		Meetups.remove({
			_id : req.params._id
		}, function(err, meetups) {
			if (err) {
				res.send(err);
			}

			// get and return all the meetups after you create another
			getMeetups(res);	
		});
	});

	// application -------------------------------------------------------------                                
	app.get('*', function (req, res) {
			res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the p⇉
	});    
};






