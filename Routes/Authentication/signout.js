var express = require('express');
var signoutRouter = express.Router();
var authentication = require('../../Authentication');


var signoutRoutes = function(){

	signoutRouter.get('/', authentication.logout);
	return signoutRouter;
};

module.exports = signoutRoutes;
