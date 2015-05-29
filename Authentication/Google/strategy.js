var mongoose = require('mongoose');
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var models = require("../../Models");
var strategyProperties = require('./config');

var getUserConfiguration = function(profile, accessToken, userType) {
    
    var user = {};
    var currentDate = new Date();
    var Id = mongoose.Types.ObjectId();  
    var location;
    
    if(profile._json.placesLived)
        location = profile._json.placesLived[0].value;
    else
        location = "Desconocida";

    if(userType === 'fan') {
        
        user.dataStructure = {
            fanId: Id,
            info:{
                name: profile._json.displayName,
                password: '',
                email: profile._json.emails[0].value,
                birthday: profile._json.birthday,
                gender: profile._json.gender,
                avatarPath: profile._json.image.url,
                location: location
            },
            registerDate: currentDate,
            registerMode: 'google',
            mailConfirmation: true,
            token: accessToken,
        };
    }
  
    return user;
};

var getStrategy = function(userType){

    var strategy = new GoogleStrategy(strategyProperties,

        function(token, refreshToken, profile, done){

            var userModel = models[userType]; 
            var email = profile._json.emails[0].value;
            userModel.socialSignin(email, 'google')
                
                .then(function(result){

                    if(result.user)
                        return done(null,result.user);
                    else{

                        var user = getUserConfiguration(profile, token, 'fan');
                        userModel.registerPromise(user.dataStructure)
                    
                        .then(function(result){
             
                            if(result.user)                   
                                return done(null, user.dataStructure);                
                            else 
                                return done(null, false, { message: result.informationMessage });                             
                        })
                        
                        .then(null,function(err){
                            
                            return done(err);
                            
                        });                         
                    }
                })
                
                .then(null,function(err){
                    
                    return done(err);
                });  

        }
    );
    return strategy;
};

module.exports = getStrategy;