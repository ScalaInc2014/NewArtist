var express = require('express');
var signoutRouter = express.Router();
var authentication = require('../../Authentication');


var signoutRoutes = function(){

	signoutRouter.get('/', authentication.signout);
	return signoutRouter;
};

module.exports = signoutRoutes;
