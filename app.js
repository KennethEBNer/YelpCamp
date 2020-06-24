const express        = require('express'),
	  app            = express(),
	  bodyParser     = require('body-parser'),
	  mongoose       = require('mongoose'),
	  flash          = require('connect-flash'),
	  passport       = require('passport'),
	  LocalStrategy  = require('passport-local'),
	  methodOverride = require('method-override'),
	  Campground     = require('./models/campground'),
	  Comment	     = require('./models/comment'),
	  User           = require('./models/user'),
	  seedDB 	     = require('./seeds');

// Require Routes 
const campgroundRoutes = require('./routes/campgrounds'),
	  commentRoutes    = require('./routes/comments'),
	  indexRoutes      = require('./routes/index');

// mongoose.connect('mongodb://localhost:27017/yelp_camp_v12', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connect('mongodb+srv://dbUserYelpCamp:jegerkulogsmart@yelpcamp-nr0ry.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR: ', err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); // Seed the database (having issues with campground.author.id.equals(currentUser._id)) 
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: 'This is it. Here I stand.',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(process.env.PORT || 3000, function(){
	console.log('The YelpCamp Server Has Started!');
});
