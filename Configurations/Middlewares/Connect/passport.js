var passport = require("passport");

var setPassport = function (server){

	console.log(" ** Setting Passport Configurations   **");
	server.use(passport.initialize()); 
	server.use(passport.session()); //persistent login session

};

module.exports = setPassport;