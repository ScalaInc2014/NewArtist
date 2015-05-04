var express = require('express');
var router = express.Router();
var authentication = require('../../Authentication');

var signupRoutes = function(){
	

	//Page for Fan signup
	router.get('/fan', function(req, res){
		res.render('fan_signup',{ errorMessage : req.flash('error') });
	});

	//Page for Artist signup
	router.get('/artist', function(req, res){
		res.render('artist_signup',{ errorMessage : req.flash('error') });
	});

	//POST Fan signup data
	router.post('/manual/fan', authentication.registerUser('fan', 'manual'));
	
	//POST Artist signup data
	router.post('/manual/artist', authentication.registerUser('artist', 'manual'));	
	
	
	/* Get Mail Verification */
	router.get('/mail_verification', function(req, res){
		res.render('mail_verification',{ errorMessage : req.flash('error') });
	});

	/* Get Mail Confirmation from Fans */
	router.get('/confirmation/fan/:user_id', authentication.verifyEmail('fan'));

	/* Get Mail Confirmation from Artists */
	router.get('/confirmation/artist/:user_id', authentication.verifyEmail('artist'));

	/* Get Error Authentication */
	router.get('/verificationError', function(req, res){
		res.render('verificationError',{ errorMessage : req.flash('error') });
	});

	return router;
};

module.exports = signupRoutes;
