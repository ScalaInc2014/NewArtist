var authentication = require('./Authentication');

/** 
 *  <h3>Description: Contains all the Routes required by the Clients.</h3>
    <ul> 
        <li> Authentication: Authentication Routes.
            <ul>
                <li> signin.js:  Signin Routes.
                <li> signout.js: Signout Routes.
                <li> signup.js:  Signup Routes.
                <li> facebook.js:   Authentication Facebook Callback Route.
                <li> google.js:   Authentication Google Callback Route.
                <li> index.js:   Authentication's Routes exportation.
                <li> index.js:   Authentication's Routes exportation.
                
            </ul>
            <br>
        <li>  index.js: Exports a function that declare the used Routes.       
    </ul> 
 * @module Routes
*/


var setRoutes = function(server){

	server.use('/authentication/signin', authentication.getManualSigninRoutes());
	server.use('/authentication/signup', authentication.getManualSignupRoutes());
	server.use('/authentication/signout', authentication.getSignoutRoutes());
    server.use('/authentication/facebook', authentication.getFacebookRoutes());	
    server.use('/authentication/google', authentication.getGoogleRoutes());
};

module.exports = setRoutes;


