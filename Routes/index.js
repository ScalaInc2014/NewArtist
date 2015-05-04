var authentication = require('./Authentication');

var routes = function(server){

	server.use('/authentication/signin',authentication.signin());
	server.use('/authentication/signup',authentication.signup());
	server.use('/authentication/signout',authentication.signout());	
};

module.exports = routes;


