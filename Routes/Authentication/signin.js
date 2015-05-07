var express = require('express');
var router = express.Router();
var authentication = require('../../Authentication');

var signinRoutes = function(){
	
	//Login page
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('./Signin/signin',{ errorMessage : req.flash('error') });
	});
	
	// POST Fan Login
	router.post('/manual/fan', authentication.logUser('fan','manual'));	

	// POST Artists Login
	router.post('/manual/artist', authentication.logUser('artist','manual'));

	return router;
};

module.exports = signinRoutes;