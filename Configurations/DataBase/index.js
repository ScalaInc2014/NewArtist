var dbName = 'NewArtist';
var dbURI = 'mongodb://localhost/' + dbName;
var options = {server: {socketOptions: {keepAlive: 1}}};
var mongoose = require('mongoose');

var openDataBaseConnection = function (){

mongoose.connect(dbURI, options); // Se conecta con la base de datos New Artist

	console.log(" ** Starting DataBase Connection     **");

	mongoose.connection.on('connected', function () {  
	  console.log('Mongoose default connection open to ' + dbURI);
	}); 

	mongoose.connection.on('error',function (err) {
	  console.log("Database Error");
	  console.log(err);
	});

	mongoose.connection.on('disconnected',function (err) {
	  console.log("Database disconnected");
	});


	mongoose.connection.on('reconnected', function () {
	  console.log('MongoDB reconnected!');
	});


	// If the Node process ends, close the Mongoose connection 
	process.on('SIGINT', function() {  
	  mongoose.connection.close(function () { 
	    console.log('Mongoose default connection disconnected through app termination'); 
	    process.exit(0); 
	  }); 
	});

};


module.exports = openDataBaseConnection; 