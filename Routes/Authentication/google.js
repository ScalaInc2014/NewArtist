var express = require('express');
var router = express.Router();
var authentication = require('../../Authentication');

var getGoogleRoutes = function(){
	
    
    // Google Route to Signin
    router.get('/', authentication.accessThroughSocialNetwork('google','authentication'));	
    
    // Facebook Callback
	router.get('/callback', authentication.accessThroughSocialNetwork('google','redirection'));	
	return router;
};

module.exports =getGoogleRoutes;