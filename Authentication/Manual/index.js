var registerUser = require('./Signup/registration');
var verifyEmail = require('./Signup/email_confirmation');
var getUserStrategy = require('./Signin/strategy');
module.exports =  {

	signup:{

        registerUser: registerUser,
        verifyEmail: verifyEmail 
	},
	signin: {
		
		getUserStrategy: getUserStrategy
	}

};