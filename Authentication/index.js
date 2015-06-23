var passport = require('passport');
var manual = require('./Manual');

/**
  <p> Methods that start the Register User Process in relation with the UserType when the Register Mode is Manual</p>

 * @param {string} UserType - Fan || Artist.
 * @return {method} Method that registers the User.

*/

var signupUserManually = function(userType){

    return manual.signup.registerUser(userType);
};

/**
  <p> Methods that start the Log User Process in relation with the UserType when the SigninMode is Manual. </p>

 * @param {string} UserType - Fan || Artist.
 * @return {method} passport.authenticate - Passport's Method that indicates which strategy to employ.

*/

var signinUserManually = function(userType){
    
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
        
        return passport.authenticate('fanLogin', 
    		{ 
    			successRedirect: '/', 
    			failureRedirect: '/authentication/signin',
    			failureFlash: true 
    		}
    	);
    }
};


/**
  <p> Methods that allow acces though Social Network using Passport Strategies. </p>

 * @param {string} provider - Facebook || Google.
 * @return {strategy} passport.authenticate - Passport's Method that indicates which strategy to employ.

*/

var accessThroughSocialNetwork = function(provider, process, rerequest){
    
    var scopes = {
        facebook : ['email','user_birthday','user_location','user_about_me'],
        google : ['profile', 'email']
    };
    
    if( process === 'authentication' ) {
        
        var authenticationOptions = {};
        authenticationOptions.scope = scopes[provider];
        if(rerequest)
            authenticationOptions.authType = 'rerequest';
        return passport.authenticate( provider, authenticationOptions);        
    }
    
    else if( process === 'redirection')
    
        return passport.authenticate( provider,
            {
                successRedirect: '/',
                failureRedirect: '/authentication/signin',
                failureFlash: true
            }
        ); 

};

/**
  <p> Methods that terminate a login session. Removes the req.user property. </p>

 * @param {object} req - HTTP Request.
 * @param {object} res - HTTP Response.

*/

var signout = function(req, res){
    
    req.logout();
	res.redirect('/');
};


module.exports = {

    signupUserManually : signupUserManually,
    signinUserManually : signinUserManually,
    accessThroughSocialNetwork : accessThroughSocialNetwork,
    signout : signout,
    verifyEmail : manual.signup.verifyEmail,
    
    //password recovery
    sendPasswordRecoveryMail : manual.passwordRecovery.sendPasswordRecoveryMail,
    verifyPasswordRequestAndRenderForm : manual.passwordRecovery.verifyPasswordRequestAndRenderForm,
    resetPassword : manual.passwordRecovery.resetPassword
};



///////////////////////////////// **** MODULE DESCRIPTION ***** //////////////////////// 

/** 
 *  <h3>Description: Contains all the methods and dependencies that allow to complete the signup, signin and signout tasks.</h3>
    <ul> 
        <li> Passport: Passport is authentication middleware for Node.js.
            <ul>
                <li> init.js: Initialize Strategies and Passport's methods.
            </ul>
            <br>
        <li> Facebook: Contains the Passport Strategie to complete Signin Process through Facebook.
            <ul>
                <li> strategy.js: Facebook's Strategy declaration.
                <li> config.js: Strategy's Propierties.
            </ul>
            <br>
        <li> Google: Contains the Passport Strategie to complete Signin Process through Google.
            <ul>
                <li> strategy.js: Google's Strategy declaration.
                <li> config.js: Strategy's Propierties.
            </ul>
            <br>   
        <li> Manual: Contains the Passport Strategie to complete Signin Process manually.
            <ul>
                <li> Signin: Manually Signin Strategy declaration.
                <li> Signup: Strategy's Propierties.
                    <ul>
                        <li> email_confirmation.js: Confirms the Email's varification TOken 
                        <li> registration: Starts all the proccess to register an User manually.
                    </ul>    
            </ul>
            <br>  
        <li> index.js: Exports all the methods included in the Authentication's Proccess.
    
    </ul> 
 * @module Authentication
*/