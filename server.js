// -------------- Npm and node dependencies ---------------------------//
var express = require("express");
var flash = require("connect-flash");  // Middleware used for storing messages in req-
var server = express();

//-------------- Local dependencies -----------------------------------//
var setRoutes = require('./Routes');
var initializePassport = require('./Authentication/Passport/init');
var middlewares = require("./Utilities/Middlewares");
var configurations = require("./Configurations");
var communication = require("./Communication");

//---------------- App Configuration -----------------------//

configurations.dataBase();
configurations.middlewares.connect.setStaticsPath(server);
configurations.middlewares.connect.setViewsEngine(server);
configurations.middlewares.connect.setCookieParser(server);
configurations.middlewares.connect.setBodyParser(server);
configurations.middlewares.connect.setSession(server);
server.use(flash());   //** Provisional , mientras se implementa middleware de Notificaciones 
configurations.middlewares.connect.setPassport(server);
configurations.middlewares.own.setNotifications(server);
configurations.middlewares.own.setLoginPromiseToRequest(server);

//----------------       Routes      ----------------------//

initializePassport();

//Home Page
server.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.locals.session = req.user;
	res.render('index.dust', {title:'NEWARTIST'});
});

setRoutes(server);
server.use(communication.processNotifications);

// 404 Page Not Found
server.use( function(req, res, next) {
    // Display the Login page with any flash message, if any
    res.render('./Resource_not_found');
});

server.use(middlewares.errorHandler);

server.listen(8080, function(){
	  console.log("NewArtist running in port 8080");
});