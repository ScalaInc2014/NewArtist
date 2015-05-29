var express = require('express');
var router = express.Router();
var authentication = require('../../Authentication');

var getFacebookRoutes = function(){
	
    // Facebook Route to Signin
    router.get('/', authentication.accessThroughSocialNetwork('facebook','authentication'));	
    
    // Facebook Callback
	router.get('/callback', authentication.accessThroughSocialNetwork('facebook','redirection'));	
	return router;
};

module.exports = getFacebookRoutes;