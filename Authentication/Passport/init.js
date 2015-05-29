var manual = require("../Manual/");
var facebook = require("../Facebook/strategy");
var google = require("../Google/strategy");

var setPassportConfigurations = function(passport){

    //This funtion sets the data that will be serialized to the session cookie
    passport.serializeUser(function(user, done) {  
       
        done(null, user);
    });
    
    //This function sets how the user data will be obtained from the data serialized in the session cookie 
    passport.deserializeUser(function(user, done) {
        
        done(null, user);
    });
    
    passport.use('fanLogin', manual.signin.getUserStrategy('fan'));
    passport.use('artistLogin', manual.signin.getUserStrategy('artist'));
    passport.use('facebook',facebook('fan'));
    passport.use('google',google('fan'));
};

module.exports = setPassportConfigurations;