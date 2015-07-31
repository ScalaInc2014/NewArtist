var session = require("express-session"); // Sets up an HTTP session for a user and provides a persistent req.session object in between requests. Depends on cookieParser.
var MongoStore = require('connect-mongo')(session); // 
var sessionOpts = {
 	
 	secret: 'keyboard cat',
 	store: new MongoStore({ db: 'NewArtist'}),
 	key: 'NewArtist_sid',
 	resave: false,
 	saveUninitialized: true,
    cookie: { 
    	// expires: new Date(Date.now() + 60000),
        // maxAge: new Date(Date.now() + 60000) 
    }
};

var setSession = function (server){

	console.log(" ** Setting Session Middleware       **");
	server.use(session(sessionOpts));

};

module.exports = setSession;