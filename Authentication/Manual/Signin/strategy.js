var LocalStrategy   = require('passport-local').Strategy;
var models = require('../../../Models');
 
/**
  <p> Returns a function with  the UserStrategy in relation with the User's Type: </p>

    <ul>
        <li> Populates userModel in relation with the UserType.
        <li> Declare a Strategy that starts the processes to signin through userModel.signinPromise .
        <li> The Signin Promise returns the Authentication's result and passes it to Passport's Done() Method.
    </ul>
 * @param {string} userType - Fan || Artists.
 * @memberof module:Authentication
 * @inner
 * @return {function} Passport Strategy
*/

var getUserStrategy = function (userType) {
    
    var userModel = models[userType];    
    
    var userStrategy = new LocalStrategy(
    
        { 
            usernameField: 'email',
            
        },
    
        function(email, password, done) {
    
            userModel.manualSignin(email, password)
                
                .then(function(result){

                    if(result.user)
                        return done(null,result.user);
                    else{
                        return done(null, false, { message: result.informationMessage });
                    }
                })
                
                .then(null,function(err){
                    
                    return done(err);
                });
        }
    );
        
    return userStrategy;
};


module.exports = getUserStrategy;