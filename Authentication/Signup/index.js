var registerUser = require('./Manual/registration');
var verifyEmail = require('./Manual/email_confirmation');

module.exports =  {
    manual : {
        registerUser: registerUser,
        verifyEmail: verifyEmail
    }
};