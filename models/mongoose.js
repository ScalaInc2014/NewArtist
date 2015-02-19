var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + 'NewArtist'); // Se conecta con la base de datos New Artist

module.exports = mongoose; //Se exporta el modelo