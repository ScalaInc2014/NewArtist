var authentication = require('./Authentication');

/** 
 *  <h3>Description: Contains all the Routes required by the Clients.</h3>
    <ul> 
        <li> Authentication: Authentication Routes.
            <ul>
                <li> signin.js:  Signin Routes.
                <li> signout.js: Signout Routes.
                <li> signup.js:  Signup Routes.
                <li> index.js:   Authentication's Routes exportation.
            </ul>
            <br>
        <li>  index.js: Exports a function that declare the used Routes.       
    </ul> 
 * @module Routes
*/


var setRoutes = function(server){

	server.use('/authentication/signin',authentication.signin());
	server.use('/authentication/signup',authentication.signup());
	server.use('/authentication/signout',authentication.signout());	
};

module.exports = setRoutes;


