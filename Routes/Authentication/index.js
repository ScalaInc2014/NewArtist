var getManualSigninRoutes = require('./signin');
var getManualSignupRoutes = require('./signup');
var getSignoutRoutes = require('./signout');
var getFacebookRoutes = require('./facebook');
var getGoogleRoutes = require('./google');

module.exports = {
	getManualSigninRoutes: getManualSigninRoutes,
	getManualSignupRoutes: getManualSignupRoutes,
	getSignoutRoutes: getSignoutRoutes,
	getFacebookRoutes: getFacebookRoutes,
	getGoogleRoutes: getGoogleRoutes
};