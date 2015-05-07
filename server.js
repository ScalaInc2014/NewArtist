// -------------- Npm and node dependencies ---------------------------//
var bodyParser = require('body-parser'); // Middleware to parse different data formats
var express = require("express");
var cookieParser = require("cookie-parser"); // Middleware to parse Cookie and populate req.cookies.
var session = require("express-session"); // Sets up an HTTP session for a user and provides a persistent req.session object in between requests. Depends on cookieParser.
var MongoStore = require('connect-mongo')(session); // 
var flash = require("connect-flash");  // Middleware used for storing messages in req-
var passport = require("passport");
var path = require("path");
var server = express();
var engines = require("consolidate"); // Normalize Template's Render Functions  

//-------------- Local dependencies -----------------------------------//
var setRoutes = require('./Routes');
var setPassportConfigurations = require('./Authentication/Passport/init');




//---------------- Serve Static Files -----------------///////////////

server.use(express.static(path.join(__dirname, 'Public'))); // Called before authenticationRoutes, in order to prevent the router handles /public/bootstrap

/* View´s Directory and Views Engine Configuration*/
var viewEngineName = 'dust';
server.engine(viewEngineName , engines.dust);
server.set('view engine', viewEngineName);
server.set('views', __dirname + '/Views/');


// The middleware is used to parse the url encoded
server.use(cookieParser()); // Signed Cookies in order to work with Express.session
server.use(bodyParser.urlencoded({ extended : true }));   

// Session Options

var sessionOpts = {
 	
 		secret: 'keyboard cat',
	 	store: new MongoStore({ db: 'NewArtist'}),
	 	key: 'NewArtist_sid',
	    cookie: { 
	    	// expires: new Date(Date.now() + 60000),
	        // maxAge: new Date(Date.now() + 60000) 
	    }
};

server.use(session(sessionOpts)); 
server.use(flash());
server.use(passport.initialize()); 
server.use(passport.session()); //persistent login session

// Strategies and configurations are set up
setPassportConfigurations(passport);

///** ROUTES***///

//Home Page
server.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
	res.locals.session = req.user;
	res.render('index.dust', {title:'NEWARTIST'});
});

setRoutes(server);

///** ROUTES ****///

server.listen(8080, function(){
	console.log("NewArtist running in port 8080");
});