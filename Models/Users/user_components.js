var bcrypt = require("bcrypt");
var Q = require('q');

//***************************** Public *******************************//

var userSavePromise = function (newUserObject){


    var deferred = Q.defer();
    
    var newUser = new this(newUserObject);

    newUser.save(function(err){

        if(err) 
            return deferred.reject(err);
  
        var userSaved = {
            
            token: newUser.token,
            email: newUser.info.email
            
        };
        console.log("USER SUCCESSFULLY SAVED IN  COLLECTION ");
        deferred.resolve(userSaved);
    });   

    return deferred.promise; 
};


var hashPassword = function (next) {

    var document = this;
    var bcryptGenSalt = Q.denodeify(bcrypt.genSalt);
    var GenSaltPromise = bcryptGenSalt(10);
    
    GenSaltPromise

        .then(function(salt){

            document.info.salt = salt;
            var bcryptHash = Q.denodeify(bcrypt.hash);
            return bcryptHash(document.info.password, salt);

        })

        .then (function(hash){

            document.info.password = hash;
            next();
        })

        .catch(function(err){
            
            next(err);
        }); 
};


/** 
 * Busca en la BD el mail ingresado en el proceso de Registro  
 * @param {object} newUserObject - Información dada por el usuairo en el momento del registro
 
*/

var registerPromise = function (newUserObject){
    
   
    var deferred = Q.defer();
    var self = this;   
    var query = self.findOne({ 'info.email': newUserObject.info.email});
    var verifyUserPromise = query.exec();

    verifyUserPromise

        .then(function(user){

            if(user)
                deferred.resolve(false);
            else{

                self.userSavePromise(newUserObject)

                    .then(function(userSaved){

                        deferred.resolve(userSaved);
                    });
            }

        })

        .then(null, function(err){

            deferred.reject(err);
        }); 
        
   return deferred.promise; 
};


var validPasswordPromise = function (password) {

    var deferred = Q.defer();
    var document = this;
    var hashPromise = Q.denodeify(bcrypt.hash);

    hashPromise(password, document.info.salt)

        .then(function(hash){

            if(hash === document.info.password)
                 deferred.resolve(true);

            deferred.resolve(false);
        })
        
        .catch(function(err){
            
            deferred.reject(err);
        }); 

    return deferred.promise;
    
};

module.exports = {
    
    methods:{
        validPassword: validPasswordPromise    
    },
    statics: {
        registerPromise: registerPromise,
        userSavePromise: userSavePromise
    },
    saveMiddlewares: {
        hashPassword: hashPassword
    }
};