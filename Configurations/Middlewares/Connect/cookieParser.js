var cookieParser = require("cookie-parser"); // Middleware to parse Cookie and populate req.cookies.

var setCookieParser = function (server){

	console.log(" ** Setting Cookie Parser Middleware **");
	server.use(cookieParser()); // Signed Cookies in order to work with Express.session

};

module.exports = setCookieParser;