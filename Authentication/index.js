var passport = require('passport');
var signup = require('./Signup');

var registerUser = function(userType, registerMode){
    console.log(signup);
    return signup[registerMode].registerUser(userType);
};

var logUser = function(userType, loginMode){
    
    if(userType === 'artist') {
        
        return passport.authenticate('artistLogin', 
		    { 
			    successRedirect: '/', 
			    failureRedirect: '/authentication/login/',
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
            			failureRedirect: '/authentication/login',
            			failureFlash: true 
            		}
            	);
        }
    }
};

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