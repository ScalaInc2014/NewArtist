var mongoose = require('./mongoose');
var Schema = mongoose.Schema;
var registerFunctions = require('./register-functions');
var loginFunctions = require('./login-functions');

var historyItem = new Schema({
    
    contentId : Schema.Types.ObjectId,
    ViewDAte    : Date
    
});

var fanSchema = new Schema({

        fanId: Schema.Types.ObjectId,
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
        token: String,
        mailConfirmation: { type: Boolean, default: false },
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

fanSchema.pre('save', registerFunctions.saveMiddlewares.hashPassword);
fanSchema.statics = registerFunctions.statics;
fanSchema.methods = loginFunctions.methods;


var Fan = mongoose.model('Fan', fanSchema); 

module.exports = Fan;