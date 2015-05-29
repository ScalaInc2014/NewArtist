var express = require('express');
var router = express.Router();
var authentication = require('../../Authentication');


var signupRoutes = function(){
	
	/////***** GET REQUEST ****** ////////////
	
	
	//Page for Fan signup
	router.get('/fan', function(req, res){
		res.render('./Signup/fan',{ errorMessage : req.flash('error') });
	});

	//Page for Artist signup
	router.get('/artist', function(req, res){
		res.render('./Signup/artist',{ errorMessage : req.flash('error') });
	});

	/* Get Mail Confirmation from Fans */
	router.get('/confirmation/fan/:user_id', authentication.verifyEmail('fan'));

	/* Get Mail Confirmation from Artists */
	router.get('/confirmation/artist/:user_id', authentication.verifyEmail('artist'));

	/* Get Error Authentication */
	router.get('/confirmation/error', function(req, res){
		res.render('./Signup/verification_error',{ errorMessage : req.flash('error') });
	});

	/* Get Mail Verification */
	router.get('/confirmation/sent', function(req, res){
		res.render('./Signup/mail_verification',{ errorMessage : req.flash('error') });
	});
	
	/////***** POST REQUEST ****** ////////////
	
	//POST Fan signup data
	router.post('/fan', authentication.signupUserManually('fan'));
	
	//POST Artist signup data
	router.post('/artist', authentication.signupUserManually('artist'));

	return router;
};

module.exports = signupRoutes;
