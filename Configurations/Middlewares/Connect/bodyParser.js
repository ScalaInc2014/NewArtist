var bodyParser = require('body-parser'); // Middleware to parse different data formats

var setBodyParser = function (server){

	console.log(" ** Setting Body Parser Middleware   **");
	server.use(bodyParser.urlencoded({ extended : true }));

};

module.exports = setBodyParser;