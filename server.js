// -------------- Npm and node dependencies ---------------------------//
var bodyParser = require('body-parser'); // Middleware to parse different data formats
var express = require("express");
var cookieParser = require("cookie-parser"); // Middleware to parse Cookie and populate req.cookies.
var session = require("express-session"); // Sets up an HTTP session for a user and provides a persistent req.session object in between requests. Depends on cookieParser.
var flash = require("connect-flash");  // Middleware used for storing messages in req-
var passport = require("passport");
var serveStatic = require('serve-static') // Middleware to serve static files
var path = require("path");
var server = express();

//---------------- Serve Static Files -----------------///////////////

server.use(express.static(path.join(__dirname, 'public/bootstrap'))); // Called before authenticationRoutes, in order to prevent the router handles /public/bootstrap

//-------------- Local dependencies -----------------------------------//
var setPassportConfigurations = require('./passport/init');
var authenticationRoutes = require('./routes');


/* View´s Directory and Views Engine Configuration*/

server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');

// The middleware is used to parse the url encoded
server.use(bodyParser.urlencoded({ extended : true }));   
server.use(passport.initialize()); 

server.use(cookieParser('keyboard cat')); // Signed Cookies in order to work with Express.session
server.use(session()); 
server.use(flash());

// Strategies and configurations are set up
setPassportConfigurations(passport);

///** ROUTES***///

server.use('/', authenticationRoutes(passport));

///** ROUTES ****///


server.listen(8080, function(){
	console.log("NewArtist running in port 8080");
});