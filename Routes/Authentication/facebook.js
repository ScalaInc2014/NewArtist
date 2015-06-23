var express = require('express');
var router = express.Router();
var authentication = require('../../Authentication');

var getFacebookRoutes = function(){
	
    // Facebook Route to Signin
    router.get('/', authentication.accessThroughSocialNetwork('facebook','authentication',false));	
    
    // Facebook Callback
	router.get('/callback', authentication.accessThroughSocialNetwork('facebook','redirection',false));	
	
	// Facebook Rerequest Route
	
    router.get('/rerequest', authentication.accessThroughSocialNetwork('facebook','authentication',true));
	return router;
};

module.exports = getFacebookRoutes;