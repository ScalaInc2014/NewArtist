var express = require("express");
var global_routes = require("./routes/global_routes")
var server = express();

server.use('/', global_routes.home);

server.listen(8080, function(){
	console.log("NewArtist running in port 3000");
	console.log("This is a test");
});