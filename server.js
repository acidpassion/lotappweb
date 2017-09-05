// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console
app.use(function (req, res, next) {
    'use strict';
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lotapp'); // connect to our database
var Filter     = require('./app/models/filter');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /filters
// ----------------------------------------------------
router.route('/filters')

	// create a filter (accessed at POST http://localhost:8080/filters)
	.post(function(req, res) {
		
		var filter = new Filter();		// create a new instance of the Filter model
        filter.startHostFrom = req.body.startHostFrom;
        filter.startHostTo = req.body.startHostTo;
        filter.startPanko = req.body.startPanko;
        filter.startGuestFrom = req.body.startGuestFrom;
        filter.startGuestTo = req.body.startGuestTo;
        filter.nowHostFrom = req.body.nowHostFrom;
        filter.nowHostTo = req.body.nowHostTo;
        filter.nowPanko = req.body.nowPanko;
        filter.nowGuestFrom = req.body.nowGuestFrom;
        filter.nowGuestTo = req.body.nowGuestTo;
        filter.endHostFrom = req.body.endHostFrom;
        filter.endHostTo = req.body.endHostTo;
        filter.endPanko = req.body.endPanko;
        filter.endGuestFrom = req.body.endGuestFrom;
        filter.endGuestTo = req.body.endGuestTo;
        filter.euroAsiaHostFrom = req.body.euroAsiaHostFrom;
        filter.euroAsiaHostTo = req.body.euroAsiaHostTo;
        filter.euroAsiaPanko = req.body.euroAsiaPanko;
        filter.euroAsiaGuestFrom = req.body.euroAsiaGuestFrom;
        filter.euroAsiaGuestTo = req.body.euroAsiaGuestTo;
		filter.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Filter created!' });
		});

		
	})

	// get all the filters (accessed at GET http://localhost:8080/api/filters)
	.get(function(req, res) {
	    var query ={}
	    query.name = req.body.name;
	    query.age = req.body.age;
		Filter.find(query,function(err, filters) {
			if (err)
				res.send(err);

			res.json(filters);
		});
	});

// on routes that end in /filters/:filter_id
// ----------------------------------------------------
router.route('/filters/:filter_id')

	// get the filter with that id
	.get(function(req, res) {
		Filter.findById(req.params.filter_id, function(err, filter) {
			if (err)
				res.send(err);
			res.json(filter);
		});
	})

	// update the filter with this id
	// update the filter with this id
	.put(function(req, res) {
		Filter.findById(req.body._id, function(err, filter) {
			if (err)
				res.send(err);
            filter.startHostFrom = req.body.startHostFrom;
            filter.startHostTo = req.body.startHostTo;
            filter.startPanko = req.body.startPanko;
            filter.startGuestFrom = req.body.startGuestFrom;
            filter.startGuestTo = req.body.startGuestTo;
            filter.nowHostFrom = req.body.nowHostFrom;
            filter.nowHostTo = req.body.nowHostTo;
            filter.nowPanko = req.body.nowPanko;
            filter.nowGuestFrom = req.body.nowGuestFrom;
            filter.nowGuestTo = req.body.nowGuestTo;
            filter.endHostFrom = req.body.endHostFrom;
            filter.endHostTo = req.body.endHostTo;
            filter.endPanko = req.body.endPanko;
            filter.endGuestFrom = req.body.endGuestFrom;
            filter.endGuestTo = req.body.endGuestTo;
            filter.euroAsiaHostFrom = req.body.euroAsiaHostFrom;
            filter.euroAsiaHostTo = req.body.euroAsiaHostTo;
            filter.euroAsiaPanko = req.body.euroAsiaPanko;
            filter.euroAsiaGuestFrom = req.body.euroAsiaGuestFrom;
            filter.euroAsiaGuestTo = req.body.euroAsiaGuestTo;
			filter.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Filter updated!' });
			});

		});
	})

	// delete the filter with this id
	.delete(function(req, res) {
		Filter.remove({
			_id: req.params.filter_id
		}, function(err, filter) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

//on routes that search filters
router.route('/filters/search')
    //get filters by search criteria
	.post(function(req, res) {
	    var query ={}
	    query.name = req.body.name;
	    query.age = {$gte: req.body.age};
		Filter.find(query, function(err, filters) {
			if (err)
				res.send(err);

			res.json(filters);
		});


	})


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
