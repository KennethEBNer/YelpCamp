const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const User     = require('../models/user');

// ROOT ROUTE
router.get('/', function(req, res){
	res.render('landing'); // Always checks in views folder
});

// Show register form
router.get('/register', (req, res) => {
	res.render('register', {page: 'register'});
});

// Handle sign up logic
router.post('/register', (req, res) => {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			req.flash('error', err.message);
			return res.redirect('register');
		}
		passport.authenticate('local')(req, res, () => {
			req.flash('success', 'You are signed in. Welcome to YelpCamp ' + user.username);
			res.redirect('/campgrounds');
		});
	});
});

// Show log in form
router.get('/login', (req, res) => {
	res.render('login', {page: 'login'});
});

// Handle login logic
router.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}), (req, res) => {
});

// LOGOUT Route
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'You have been logged out');
	res.redirect('/campgrounds');
});


module.exports = router;