
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userComponents = require('./user_components');

var historyItem = new Schema({
    
    contentId : Schema.Types.ObjectId,
    ViewDAte    : Date
    
});

var fanSchema = new Schema({

        info:{
         
            name: String,
            password: String,
            salt: String,
            email: String,
            birthday: Date,
            gender: String,
            avatarPath: String,
            location: String
            
        },
        mailConfirmation: { type : Boolean, default : false },
        passwordRequest: Date,
        registerMethod: String,
        registerMode: String,
        preferences:[Schema.Types.ObjectId], 
        history:[historyItem], // Json Array {contenido_id,fecha_reproduccion:"Date"}
        favouriteArtists:[Schema.Types.ObjectId],
        likes:[Schema.Types.ObjectId],
        followedArtist:[Schema.Types.ObjectId],
        artistShared:[Schema.Types.ObjectId],
        contentShared:[Schema.Types.ObjectId],
        registerDate: Date  // Fecha de Registro a New Artists
        //preferencesAlgorithm:"",
        
});

fanSchema.pre('save', userComponents.saveMiddlewares.hashPassword);
fanSchema.statics = userComponents.statics;
fanSchema.methods = userComponents.methods;


var Fan = mongoose.model('Fan', fanSchema); 

module.exports = Fan;