var signin = require("../Signin");

var setPassportConfigurations = function(passport){

    //This funtion sets the data that will be serialized to the session cookie
    passport.serializeUser(function(user, done) {  
       
        done(null, user);
    });
    
    //This function sets how the user data will be obtained from the data serialized in the session cookie 
    passport.deserializeUser(function(user, done) {
        
        done(null, user);
    });
    
    passport.use('fanLogin', signin.manual.getUserStrategy('fan'));
    passport.use('artistLogin', signin.manual.getUserStrategy('artist'));
};

module.exports = setPassportConfigurations;