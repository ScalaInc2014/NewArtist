

var signup = require('./signup');


module.exports = function(passport){

    
    passport.serializeUser(function(user, done) {  // Función en la que definimos qué información del usuario guardamos como infomración de sessión */ ESta función es llamada cuando un usuario hace login satisfactpriamente
       
        console.log("FUnción serializeUser " + user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) { // FUnción en la que que se desliga a un usuario de las variables de session */ ESta función es llamada cuando un usuario hace logout satisfactpriamente
        done(null, user);
   
    });
    
    
    signup(passport);

}