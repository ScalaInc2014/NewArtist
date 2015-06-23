var mongoose = require('mongoose');
var PassportStrategy = require('passport-facebook').Strategy;
var strategyProperties = require('./config');
var models = require("../../Models");
var messages = require("../../Messages");


var setUserDataStructure = function(profile, accessToken, userType) {
    
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
                location: (profile._json.location && profile._json.location.name)
            },
            registerDate: currentDate,
            registerMode: 'facebook',
            mailConfirmation: true,
            token: accessToken,
        };
    }
  
    return user;
};

var checkUserPermissions = function(profile){
    
    if( typeof profile._json.email === "undefined")
        return false;
    return true;
};

var getStrategy = function(userType){

    var strategy = new PassportStrategy(strategyProperties ,
        
        function(req, accessToken, refreshToken, profile, done){

            var userModel = models[userType]; 
            var email = profile._json.email;
            userModel.socialSignin(email, 'facebook')
                
                .then(function(result){

                    if(result.user)
                        return done(null, result.user);
                    else{

                        var isPermissionAllowed = checkUserPermissions(profile);
                        if(isPermissionAllowed === true){
                            var user = setUserDataStructure(profile, accessToken, userType);
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
                        else{

                            return done(null, false, { message: messages.notification.EMAIL_PERMISSION_DENIED });
                        }   
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