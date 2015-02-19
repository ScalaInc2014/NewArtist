var LocalStrategy   = require('passport-local').Strategy;


module.exports = function(passport){
    

	passport.use('signup', new LocalStrategy(

       
        function(username, password, done) {

           
            console.log("username  " + username);
            console.log(" password " + password)
        
            return done(null, 1 );
        })
    );

}