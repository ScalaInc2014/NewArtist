var mongoose = require('./mongoose');
var Schema = mongoose.Schema;
var registerFunctions = require('./register-functions');
var loginFunctions = require('./login-functions');

var membersItem = new Schema({
    
    name        : String,
    avatarPath  : Date,
    age         : Number,
    rol         : String
});


var sharesItem = new Schema({
    
    fan         : Schema.Types.ObjectId,
    network     : String,
});

var ArtistSchema = new Schema({

        artistId: Schema.Types.ObjectId,
        info:{
         
            name: String,
            password: String,
            salt: String,
            email: String,
            description:{
                enable   : Boolean,
                text     : String,                
            },
            members: [membersItem],
            avatarPath: String,
            location: String
            
        },
        token: String,
        mailConfirmation: { type: Boolean, default: false },
        registerMethod: String,
        premium: Boolean,
        artType: String,
        content:[Schema.Types.ObjectId], 
        fans:{
         
            number: Number,
            fans: [Schema.Types.ObjectId]
            
        },        
        shares:{
         
            number: Number,
            shares: [sharesItem]
            
        },
        registerDate: Date  // Fecha de Registro a New Artists
        //preferencesAlgorithm:"",
        
});

ArtistSchema.pre('save', registerFunctions.saveMiddlewares.hashPassword);
ArtistSchema.statics = registerFunctions.statics;
ArtistSchema.methods = loginFunctions.methods;

var Artist = mongoose.model('Artist', ArtistSchema); 

module.exports = Artist;