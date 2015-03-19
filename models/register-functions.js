var bcrypt = require("bcrypt");
//var mongoose = require('mongoose');
var mongoose = require('./mongoose');

var hashPassword = function (next) {
    
    
    console.log("Hashpassword");
    var document = this;
    bcrypt.genSalt(10, function (err, salt) {
        
        if(err)  
            return next(err);
        
        bcrypt.hash(document.info.password, salt, function (err, hash) {
            
            if(err) 
                return next(err);
            document.info.password = hash;
            next();
        });
        
    });
};

var registerUser = function (req, email, password, callback){
    
    console.log("Funcion Register User");
    var self = this;
    var Id = mongoose.Types.ObjectId();
    
    console.log(self.collection.name);
    
    self.findOne({
        'info.email': email
    }, 
    
    function(err, user){
        
        if(err) 
            return callback(err);
            
        //console.log(user);
        
        // User´s email  does not exists in Collection
        if(user) 
            callback(null, false);
        else{
            var newUser = new self({
        
                fanId: Id,
                info:{
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email,
                    birthday: req.body.birthday,
                    gender: req.body.gender,
                    avatarPath: 'http://www.nocturnar.com/forum/attachments/fondos-de-pantalla/28575d1338158805-paisajes-hermosos-fondo-de-pantalla-paisajes_hermosos_del_mundo2.jpg',
                    location: req.body.location
                }
            });
            
            newUser.save(function(err){
        
                if(err) 
                    return callback(err);
                console.log("FAN SUCCESSFULLY SAVED IN  COLLECTION FANS")
                callback(null, newUser);
        
            });
        }
    });
};

module.exports = {
    hashPassword: hashPassword,
    registerUser: registerUser
}