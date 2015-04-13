var LocalStrategy   = require('passport-local').Strategy;
var Fan = require('../models/fan');
var Artist = require('../models/artist');
 
var userLogin = function (userType) {
    
    var userModel;
    
    console.log("Login Strategy para " + userType);
    
    if(userType === 'fan')
        userModel = Fan;
    else if(userType === 'artist')
        userModel = Artist;    
    
    
    var login = new LocalStrategy(
    
        { 
            usernameField: 'email',
            
        },
    
        function(email, password, done) {
    
            
            var query = userModel.findOne({ 'info.email': email});
            var verifyUserPromise = query.exec();
            
            verifyUserPromise
        
                .then(function(user){
        
                    if(user){
                        
                        console.log(user.validPassword(password));
                        if (!user.validPassword(password)) {
                            
                            return done(null, false, { message: 'Contraseña Incorrecta' });
                        }  
                        
                        else{
                            
                            return done(null, user);
                            
                        }
                        
                    }
                    else{
        
                        return done(null, false, { message: 'Correo Electrónico Incorrecto' });
                    }
        
                })
        
                .then(null, function(err){
        
                    return done(err);
                });         
            
        }
    );
        
    return login;
};


module.exports = userLogin;