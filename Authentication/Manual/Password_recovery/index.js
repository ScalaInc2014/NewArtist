var sendPasswordRecoveryMail = require('./recovery_email');
var recoveryRequest = require('./recovery_request');

var passwordRecovery = {
    sendPasswordRecoveryMail : sendPasswordRecoveryMail,
    resetPassword : recoveryRequest.resetPassword,
    verifyPasswordRequestAndRenderForm : recoveryRequest.verifyPasswordRequestAndRenderForm
};

module.exports = passwordRecovery;