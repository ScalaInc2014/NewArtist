var express = require('express');
var router = express.Router();

var authenticationRoutes = function(passport){
	
	/* GET Pagina de inicio */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', {title:'NEWARTIST'});
	});
	
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login');
	});


	/* GET Pagina de registro */
	router.get('/signup', function(req, res){
		res.render('signup',{ errorMessage : req.flash('error') });
	});

	/* Submit Datos de Registro POST */
	router.post('/signup', passport.authenticate('signup', 
	{ 
		successRedirect: '/login', 
		failureRedirect: '/signup',
		failureFlash: true
	}));



	return router;
}

module.exports = authenticationRoutes;
