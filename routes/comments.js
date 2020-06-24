const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment    = require('../models/comment');
const middleware = require('../middleware');


// NEW ROUTE
router.get('/new', middleware.isLoggedIn, (req, res) => {
	// Find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err || !campground){
            req.flash("error", "Campground not found");
            res.redirect("back");
		} else {
			res.render('comments/new', {campground: campground}); // Always checks in views folder
		}
	});
});

// CREATE ROUTE
router.post('/', middleware.isLoggedIn, function(req, res){
	// Lookup campground by id
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			// Create comment
			Comment.create(req.body.comment, (err, comment) => {
				if(err){
					req.flash('error', 'Something went wrong..');
					console.log(err);
				} else {
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// Save comment 
					comment.save();
					// Connect comment to campground
					campground.comments.push(comment);
					campground.save();
					// Redirect to comment show page
					req.flash('success', 'Your comment has been created');
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err || !foundCampground){
			req.flash('error', 'Campground not found');
			return res.redirect('back');
		}
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err){
				res.redirect('back');
			} else {
				res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
			}
		});
	});
});

// UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if(err){
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	})
});

// DESTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, err => {
		if(err){
			res.redirect('back');
		} else {
			req.flash('success', 'Comment deleted');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;