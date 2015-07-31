var express = require('express');
var router = express.Router();
var authentication = require('../../Authentication');

var signinRoutes = function(){
	
	///***GET REQUEST ***////
	
	//Login page
	router.get('/', function(req, res, next) {
    	// Display the Login page with any flash message, if any
		res.render('./Signin/signin');
	});

	////***POST REQUEST ***////

	// POST Fan Login
	router.post('/fan', authentication.signinUserManually('fan'));	

	// POST Artists Login
	router.post('/artist', authentication.signinUserManually('artist'));

	return router;
};

module.exports = signinRoutes;