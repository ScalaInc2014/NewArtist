var engines = require("consolidate"); // Normalize Template's Render Functions
var viewEngineName = 'dust';
var path = require("path");

var setViewsEngine = function (server){

	console.log(" ** Configuring View's Engine        **");
	server.engine(viewEngineName , engines.dust);
	server.set('view engine', viewEngineName);
	server.set('views', path.join(__dirname, '../../../Views'));

};

module.exports = setViewsEngine;