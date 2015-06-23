var express = require('express');
var router = express.Router();
var authentication = require('../../Authentication');

var getPasswordRecoveryRoutes = function(){
	
	///*** GET REQUEST ***////
	
	//E-mail solicitation page 
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('./Password_recover/password_recovery', {errorMessage : req.flash('error')});
	});
	

	//Password Recover page
	router.get('/reset/fan/:token', authentication.verifyPasswordRequestAndRenderForm('fan'));
	router.get('/reset/artist/:token', authentication.verifyPasswordRequestAndRenderForm('artist'));

	////*** POST REQUEST ***////

	// POST Password Recover Fan and Artist
	router.post('/send_mail/fan', authentication.sendPasswordRecoveryMail('fan'));
	router.post('/send_mail/artist', authentication.sendPasswordRecoveryMail('artist'));
	
	// POST Password Recover// POST Password Reset
	router.post('/reset', authentication.resetPassword);


	return router;
};

module.exports = getPasswordRecoveryRoutes;