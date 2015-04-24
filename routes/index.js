var express = require('express');
var router = express.Router();
var registerMiddlewares = require('../passport/register-middlewares');

var authenticationRoutes = function(passport){
	
	//Login page
	router.get('/login/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login',{ errorMessage : req.flash('error') });
	});
	
	
	// POST Fan Login
	
	router.post('/login/fan', passport.authenticate('fanLogin', 
		{ 
			successRedirect: '/', 
			failureRedirect: '/authentication/login',
			failureFlash: true 
		}
	));	

	// POST Artists Login
	
	router.post('/login/artist', passport.authenticate('artistLogin', 
		{ 
			successRedirect: '/', 
			failureRedirect: '/authentication/login/',
			failureFlash: true 
		}
	));

	//Logout  page
	router.get('/logout/', function(req, res) {
		
		req.logout();
		res.redirect('/');
	});


	//Page for Fan signup
	router.get('/signup/fan', function(req, res){
		res.render('fan_signup',{ errorMessage : req.flash('error') });
	});

	//Page for Artist signup
	router.get('/signup/artist', function(req, res){
		res.render('artist_signup',{ errorMessage : req.flash('error') });
	});

	//POST Fan signup data
	router.post('/signup/fan', registerMiddlewares.registerUser('fan'));
	
	//POST Artist signup data
	router.post('/signup/artist', registerMiddlewares.registerUser('artist'));	
	
	
	/* Get Mail Verification */
	router.get('/signup/mail_verification', function(req, res){
		res.render('mail_verification',{ errorMessage : req.flash('error') });
	});

	/* Get Mail Confirmation from Fans */
	router.get('/signup/confirmation/fan/:user_id', registerMiddlewares.mailConfirmation('fan'));

	/* Get Mail Confirmation from Artists */
	router.get('/signup/confirmation/artist/:user_id', registerMiddlewares.mailConfirmation('artist'));

	/* Get Error Authentication */
	router.get('/signup/verificationError', function(req, res){
		res.render('verificationError',{ errorMessage : req.flash('error') });
	});

	return router;
}

module.exports = authenticationRoutes;
