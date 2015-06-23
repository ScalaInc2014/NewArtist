var models = require("../../../Models");
var messages = require('../../../Messages');
var communication = require('../../../Communication');
var Q = require('q');

var checkPasswordRequestValidity = function(token, userType) {
    
    var userModel = models[userType];
    var findUserByToken = userModel.findOne({ '_id':token}).exec();
    var result = { checked : false };
    
    return findUserByToken
        .then(function(user){
            
            if(user)
                result = user.checkPasswordRequestValidity();
            else
                result.message = communication.buildMessage('PASSWORD_RECOVERY_TOKEN_NOT_FOUND');
            return result;
        });
};


var verifyPasswordRequestAndRenderForm = function(userType) {
    
    return  function(req, res){
        var token = req.params.token;
        checkPasswordRequestValidity(token, userType)
        .then(function(result){
            if(result.checked){
                req.session.passwordRecovery = {
                    userType : userType,
                    token : token
                };
                res.render('./Password_recover/password_reset');
            }
            else{
                req.setNotification(result.message);
                res.end(result.message.id);
            }
        })
        .then(null, console.error);
    };
};

var tryPasswordUpdateAndLogin = function(req) {
    
    var userType = req.session.passwordRecovery.userType;
    var token = req.session.passwordRecovery.token;
    var newPassword = req.body.password;
    var userModel = models[userType];
    var result = { reset : false };
    var findUserByToken = userModel.findOne({ '_id':token}).exec();
    
    return findUserByToken
        .then(function(user){
            if(user){
                return user.updatePassword(newPassword)
                .then(function(){
                    delete user.info.password;
                    return req.ulogin(user)
                    .then(function(){
                        result.reset = true;
                        return result;
                    });
                });
            }
            else{
                result.message = communication.buildMessage('PASSWORD_RECOVERY_TOKEN_NOT_FOUND');
                return result;
            }
        });
};

var resetPassword = function (req, res) {
    
    var message;
    var successPasswordUpdatedRedirect = '/';
    
    if(req.session.passwordRecovery) {
        
        tryPasswordUpdateAndLogin(req)
        .then(function(result){
            if(result.reset){
                delete req.session.passwordRecovery;
                res.redirect(successPasswordUpdatedRedirect);
            }
            else {
                req.setNotification(result.message);
                res.end(result.message.id);
            }
        })
        .then(null, console.error);
    }
    else {
        message = communication.buildMessage('NO_PASSWORD_RECOVERY_REQUEST');
        req.setNotification(message);
        res.end(message.id);
    }
};
   
module.exports = {
    resetPassword : resetPassword,
    verifyPasswordRequestAndRenderForm : verifyPasswordRequestAndRenderForm
};