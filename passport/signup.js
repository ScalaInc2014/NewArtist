var LocalStrategy   = require('passport-local').Strategy;
var Fan = require('../models/fan');

var signup = new LocalStrategy(
    
    { 
        usernameField: 'email',
        passReqToCallback : true 
    },

    function(req, email, password, done) {

        Fan.registerUser(req, email, password, function(err, fan){
            
            
            if(err) 
                return done(err);
            
            if(fan){
               done(null, fan);
            }
            
            else{
               done(null, false, {message: 'The User Already exists!!!!!!!!'});
                
            }
            
        });
        
    });
            
module.exports = signup;