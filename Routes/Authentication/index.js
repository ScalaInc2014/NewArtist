
var signinRoutes = require('./signin');
var signupRoutes = require('./signup');
var signoutRoutes = require('./signout');

module.exports = {
	
	signin: signinRoutes,
	signup: signupRoutes,
	signout: signoutRoutes
}