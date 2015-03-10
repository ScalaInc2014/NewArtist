//-------------------------Requirements-----------------------------//
var mongoose = require('mongoose');

var dbName = 'NewArtist';

mongoose.connect('mongodb://localhost/' + dbName); // Se conecta con la base de datos New Artist

module.exports = mongoose; //Se exporta el modelo