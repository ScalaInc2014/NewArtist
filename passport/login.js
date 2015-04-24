var LocalStrategy   = require('passport-local').Strategy;
var Fan = require('../models/fan');
var Artist = require('../models/artist');
 
var userLogin = function (userType) {
    
    var userModel;
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

                        user.validPassword(password)
                        
                            .then(function(loggedUser){

                                if(loggedUser)
                                    return done(null, user);
                                else
                                    return done(null, false, { message: 'Contraseña Incorrecta' });
                            })  
                            
                            .then(null,function(err){
                                
                                return done(err);
                            });
                    }
                       
                    else
                        done(null, false, { message: 'Correo Electrónico Incorrecto' });
                })
                
                
                .then(null, function(err){

                    return done(err);
                });         
        }
    );
        
    return login;
};


module.exports = userLogin;