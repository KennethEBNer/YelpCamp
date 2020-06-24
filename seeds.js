var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var seeds = [
    {
        name: "Cloud's Rest", 
		price: "2,99",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			username: "Homer"
		}
    },
    {
        name: "Desert Mesa", 
		price: "2,99",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			username: "Homer"
		}
    },
    {
        name: "Canyon Floor", 
		price: "2,99",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			username: "Homer"
		}
    },
	{
        name: "Cloud's Rest", 
		price: "2,99",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			username: "Homer"
		}
    },
    {
        name: "Desert Mesa", 
		price: "2,99",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			username: "Homer"
		}
    },
    {
        name: "Canyon Floor", 
		price: "2,99",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author: {
			username: "Homer"
		}
    }
]

async function seedDB(){
	try{
		// Remove all campgrounds
		await Campground.deleteMany({});
		// Remove all comments
		await Comment.deleteMany({});
		// Repeat for all seeds
		for(const seed of seeds){
			// Create a campground
			let campground = await Campground.create(seed);
			// Create a comment
			let comment = await Comment.create(
				{
					text: "This place is great, but I wish there was internet",
					author: {
						username: "Homer"
					}
				}
			);
			// Add the comment to the campground and save
			campground.comments.push(comment);
			campground.save();
		}
	} catch(err){
		console.log(err);
	}
}

module.exports = seedDB;
 
/*
function seedDB(){
	//Remove all comments
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
	    console.log("removed comments!");
		//Remove all campgrounds
	    Campground.deleteMany({}, function(err){
			if(err){
				console.log(err);
			}
			console.log("removed campgrounds!");
		   //Remove all comments
			Comment.deleteMany({}, function(err) {
				if(err){
					console.log(err);
				}
				console.log("removed comments!");
				 //Add a few campgrounds
				data.forEach(function(seed){
					Campground.create(seed, function(err, campground){
						if(err){
							console.log(err)
						} else {
							console.log("added a campground");
							// Create a comment for each campground
							Comment.create(
								{
									text: "This place is great, but I wish there was internet",
									author: "Homer"
								}, function(err, comment){
									if(err){
										console.log(err);
									} else {
										campground.comments.push(comment);
										campground.save();
										console.log("Created new comment");
									}
								});
						}
					});
				});
			});
		}); 
   });
}
*/
