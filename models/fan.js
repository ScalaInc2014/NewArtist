var mongoose = require('./mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");


var historyItem = new Schema({
    
    contentId : Schema.Types.ObjectId,
    ViewDAte    : Date
    
});

var fanSchema = new Schema({

        fanId: Schema.Types.ObjectId,
        info:{
         
            name: String,
            password: String,
            email: String,
            birthday: Date,
            gender: String,
            avatarPath: String,
            location: String
            
        },
        token: String,
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

fanSchema.statics.verifyUser = function (email, callback){
    
    this.findOne({
        'info.email':email
    }, 
    
    function(err, fan){
        
            if(err) 
                return callback(err);
            
            console.log(fan);
            // Fan´s email  does not exists in Fan´s Collection
            if(fan) 
                callback(null, false);
            else     
                callback(null, true);
    });
};

fanSchema.statics.hashPassword = function (password, callback) {
    
    bcrypt.genSalt(10, function (err, salt) {
        
        if(err)  
            return callback(err);
        
        bcrypt.hash(password, salt, function (err, hash) {
            
            if(err) 
                return callback(err);
            
            callback(null, hash);
        });
        
    });
};


var fanSave = function (email, hashPassword, callback){
    
    
    console.log("FUNCION FAN SAVE");
    var id = mongoose.Types.ObjectId();
    
    var fan = new Fan({
        
        fanId: id,
        info:{
         
            email: email,
            password: hashPassword,

        }
    });
    
    fan.save(function(err){
        
       if(err) return callback(err);
       
       console.log("FAN SUCCESSFULLY SAVED IN  COLLECTION FANS")
       callback(null,fan);
        
    });
    
}


fanSchema.statics.registerUser = function (req, email, password, callback){
    
     var self = this;

     self.verifyUser(email, function(err,verify){
         
         if(err) return callback(err);
         
         if(verify){  //  email does not exist in DB
             
             //// Next Register process  (Hash password)
             self.hashPassword(password, function(err, hash){
                 
                 
                  if (err) 
                    return callback(err);
                  // Next Register Process (Save Fan Document)

                  fanSave(email, hash, function(err, fan){
                      
                      if(err) 
                        return  callback(err);
                      
                      callback(null, fan);
                      
                  });
                 
             });
        
        
         }else{
            
             //// User already Exist
             callback(null, false);
             
         }
     });

};


var Fan = mongoose.model('Fan', fanSchema); 

module.exports = Fan; 
