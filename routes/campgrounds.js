const express    = require('express');
const router     = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

// INDEX - Show all campgrounds
router.get('/', function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render('campgrounds/index', {campgrounds: allCampgrounds, page: 'campgrounds'}); // Always checks in views folder
		}
	});
});

// CREATE - Add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const price = req.body.price;
	const image = req.body.image;
	const desc = req.body.description;
	const author = {
		id: req.user._id,
		username: req.user.username
	};
	const newCampground = {name: name, price: price, image: image, description: desc, author: author};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

// NEW - Show form to create new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
	res.render('campgrounds/new'); // Always checks in views folder
});

// SHOW - Shows more info about one campground
router.get('/:id', function(req, res){
	// Find the campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash('error', 'Campground not found');
			res.redirect('back');
		} else {
			// Render show template with that campground
			res.render('campgrounds/show', {campground: foundCampground}); // Always checks in views folder
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render('campgrounds/edit', {campground: foundCampground});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
	// Find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect('/campgrounds');
		} else {
			// Redirect to show page
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// DESTROY CAMPGROUNDS ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;
