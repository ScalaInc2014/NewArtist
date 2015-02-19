var express = require('express');
var router = express.Router();


module.exports = function(passport){
	


	/* GET Pagina de inicio */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', {title:'NEWARTIST'});
	});



	/* GET Pagina de registro */
	router.get('/signup', function(req, res){
		res.render('signup',{title:'NEWARTIST'});
	});

	/* Submit Datos de Registro POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/login',
	//	failureFlash: true
	}));


	return router;
}