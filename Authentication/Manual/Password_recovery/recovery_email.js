var Q = require('q');
var models = require("../../../Models");
var mailSender = require('../../../Mail_sender');
var mailTypes = mailSender.mailTypes;
var communication = require('../../../Communication');


var sendRecoveryEmail =  function(req, userType) {
    
    var result = { done : false };
    var email = req.body.email;
    var resetPath = '/authentication/password_recovery/reset/';
    var userModel = models[userType];
    var locals = {}; //variables for mail template
    var findUserByEmail = userModel.findOne({ 'info.email' : email}).exec();
    
    return findUserByEmail
    
        .then(function( user ){
            if(user){
                if(user.registerMode === "manual"){
                    user.passwordRequest = new Date(); 
                    locals.userType = userType;
                    locals.resetLink = req.hostname + resetPath + userType + '/' + user._id; 
                    return Q.all([
                        mailSender(user.info.email, locals, mailTypes.RECOVER_PASSWORD),
                        user.uSave()
                    ]) 
                    .then( function() {
                        result.done = true;
                        return result;
                    })
                    .then(null, console.error);
                }
                else{
                    result.message = communication.buildMessage('NO_MANUAL_RECOVERY_EMAIL', {socialNetwork : user.registerMode});
                    return result;
                }
            }
            else {
                result.message = communication.buildMessage('NO_EMAIL_REGISTERED');
                return result;
            }
            
        });
};


var sendPasswordRecoveryMail = function (userType){
    
    return function(req, res){

        var notificationRedirectPath = '/authentication/password_recovery/';
        var message;
        sendRecoveryEmail(req, userType)
        .then(function( result ){
            if(result.done)
                message = communication.buildMessage('SUCCESS_PASSWORD_RECOVERY_REQUEST');
            else
                message = result.message;
            console.log(message);
            req.setNotification( message );
            res.redirect( notificationRedirectPath );    
        })
        .then(null, console.error);
    };
};

module.exports = sendPasswordRecoveryMail;