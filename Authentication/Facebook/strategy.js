var mongoose = require('mongoose');
var PassportStrategy = require('passport-facebook').Strategy;
var strategyProperties = require('./config');
var models = require("../../Models");


var getUserConfiguration = function(profile, accessToken, userType) {
    
    var user = {};
    var currentDate = new Date();
    var Id = mongoose.Types.ObjectId();
    var profilePicturePath = 'https://graph.facebook.com/' + profile.id + '/picture' + '?width=200&height=200' + '&access_token=' + accessToken;
   
    if(userType === 'fan') {
        
        user.dataStructure = {
            fanId: Id,
            info:{
                name: profile.displayName,
                password: '',
                email: profile._json.email,
                birthday: profile._json.birthday,
                gender: profile._json.gender,
                avatarPath: profilePicturePath,
                location: profile._json.location.name
            },
            registerDate: currentDate,
            registerMode: 'facebook',
            mailConfirmation: true,
            token: accessToken,
        };
    }
  
    return user;
};

var getStrategy = function(userType){

    var strategy = new PassportStrategy(strategyProperties ,
        
        function(accessToken, refreshToken, profile, done){

            var userModel = models[userType]; 
            var email = profile._json.email;
            userModel.socialSignin(email, 'facebook')
                
                .then(function(result){

                    if(result.user)
                        return done(null, result.user);
                    else{

                        var user = getUserConfiguration(profile, accessToken, userType);
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