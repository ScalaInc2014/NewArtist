var passport = require('passport');
var signup = require('./Signup');

/** 
 *  <h3>Description: Contains all the methods and dependencies that allow to complete the signup, signin and signout tasks.</h3>
    <ul> 
        <li> Passport: Passport is authentication middleware for Node.js.
            <ul>
                <li> init.js: Initialize Strategies and Passport's methods.
            </ul>
            <br>
        <li> Signin: Contains the Passport Strategies to complete Signin Process in relation with the user's register Mode.
            <ul>
                <li> facebook_strategy.js: Facebook Strategy declaration.
                <li> manual_stralategy.js: Manual Strategy declaration.
                <li> twitter_strategy.js: Twitter Strategy declaration.
                <li> index.js: Signin Strategies exportation.
            </ul>
            <br>
        <li> Signup: Contains the Passport Strategies in relation with the user's register Mode.
            <ul>
                <li> Manual: Manual Strategy declaration.
                    <ul>
                        <li> email_confirmation.js: Complete the mail confirmation Process.
                        <li> registration.js: Complete de user's registration Process.
                    </ul>
                <li> facebook_strategy.js: Facebook Strategy declaration.                               
                <li> twitter_strategy.js: Twitter Strategy declaration.
                <li> index.js: SignUp Strategies exportation.
            </ul> 
            <br>   
        <li>  index.js: Exports the methods that allow the user to signin, signup or signout tasks.       
    </ul> 
 * @module Authentication
*/


/**
  <p> Methods that start the Register User Process in relation with the UserType and the RegisterMode. </p>

 * @param {string} UserType - Fan || Artist.
 * @param {string} registerModer - Manual || Facebook || Twitter.
 * @return {method} Method that registers the User.

*/


var registerUser = function(userType, registerMode){
    console.log(signup);
    return signup[registerMode].registerUser(userType);
};

/**
  <p> Methods that start the Log User Process in relation with the UserType and the SigninMode. </p>

 * @param {string} UserType - Fan || Artist.
 * @param {string} LoginMode - Manual || Facebook || Twitter.
 * @return {method} passport.authenticate - Passport's Method that indicates which strategy to employ.

*/

var logUser = function(userType, loginMode){
    
    if(userType === 'artist') {
        
        return passport.authenticate('artistLogin', 
		    { 
			    successRedirect: '/', 
			    failureRedirect: '/authentication/signin/',
			    failureFlash: true 
		    }
	    );
    }
    else if(userType === 'fan'){
        
        switch(loginMode){
            
            case 'manual':
                return passport.authenticate('fanLogin', 
            		{ 
            			successRedirect: '/', 
            			failureRedirect: '/authentication/signin',
            			failureFlash: true 
            		}
            	);
        }
    }
};

/**
  <p> Methods that terminate a login session. Removes the req.user property. </p>

 * @param {object} req - HTTP Request.
 * @param {object} res - HTTP Response.

*/


var logout = function(req, res){
    req.logout();
	res.redirect('/');
};

module.exports = {
    registerUser : registerUser,
    logUser: logUser,
    verifyEmail : signup.manual.verifyEmail,
    logout : logout
};