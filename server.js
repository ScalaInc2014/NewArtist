var express = require("express");
var global_routes = require("./routes/global_routes")
var server = express();

server.use('/', global_routes.home);

server.listen(3000, function(){
	console.log("NewArtist running in port 3000");
});