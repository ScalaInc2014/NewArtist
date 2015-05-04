var LocalStrategy   = require('passport-local').Strategy;
var models = require('../../Models');
 
var getUserStrategy = function (userType) {
    
    var userModel = models[userType];    
    
    var userStrategy = new LocalStrategy(
    
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
        
    return userStrategy;
};


module.exports = getUserStrategy;