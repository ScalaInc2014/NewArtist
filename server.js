var bodyParser = require('body-parser'); // Middleware to parse different data formats
var express = require("express");
var passport = require("passport");
var server = express();


/* Configuracion de la ruta las Vistas del Proyecto y del sistema de platillas a usar*/

server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');


server.use(bodyParser.urlencoded({  // The middleware is used to parse the url encoded
  extended: true
}));                            
server.use(passport.initialize()); // Si inicia el Middleware de PASSPORT en nuestra app



var initPassport = require('./passport/init');
initPassport(passport);

///** RUTAS ***///

var routes = require('./routes/routes.js')(passport);
server.use('/', routes);

///** RUTAS ****///

server.listen(8080, function(){
    
	console.log("NewArtist running in port 8080");

});