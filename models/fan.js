var mongoose = require('./mongoose');
var Schema = mongoose.Schema;

var fanSchema = new Schema({

        fan_id: 'ObjectId',
        Info:{
         
            nombre: 'string',
            contraseña: 'string',
            correo_electronico: 'string',
            fecha_nacimiento: 'Date',
            genero: 'string',
            path_avatar: 'string',
            ubicacion: 'string'
            
        }
});


var Fan = mongoose.model('fan', fanSchema); // Se genera el modelo de Fan

module.exports = Fan; // Se exporta el modelo