var registerUser = require('./Signup/registration');
var verifyEmail = require('./Signup/email_confirmation');
var getUserStrategy = require('./Signin/strategy');
var passwordRecovery = require('./Password_recovery');

module.exports =  {

	signup:{
        registerUser: registerUser,
        verifyEmail: verifyEmail 
	},
	signin: {
		getUserStrategy: getUserStrategy
	},
	passwordRecovery : passwordRecovery
};