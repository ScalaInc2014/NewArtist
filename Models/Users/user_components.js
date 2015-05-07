var bcrypt = require("bcrypt");
var Q = require('q');

//***************************** Public *******************************//

/**
  <p> Saves in a new Document, the User's information through .save Method. </p>
 * @param {object} NewUserObject - New user's information object.
 * @memberof module:Models.
 * @inner
 * @return {Promise} 
*/

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

/**
  <p> Mongoose Pre Middleware. </p>
  <p> Generates a Salt through bcrypt.genSalt and hash it with the user's password in order to create a coded password. </p>
 * @param {function} Next - Contiue the saving process.
 * @memberof module:Models.
 * @inner

*/


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
    <p> Starts the processes to Register an User in the app. </p>
    <ul>
        <li> Verifies that user's email is not duplicated in the DB.
        <li> Starts the saving User Process.
        <li> Populates a Result Object with the user's information and a Notification message.
    </ul>
 * @param {object} newUserObject - User's information Object.
 * @memberof module:Models.
 * @inner
 * @return {Promise}

*/

var registerPromise = function (newUserObject){
    
   
    var deferred = Q.defer();
    var self = this;   
    var query = self.findOne({ 'info.email': newUserObject.info.email});
    var verifyUserPromise = query.exec();
    var result = {};
    verifyUserPromise

        .then(function(user){

            if(user){
               result.user = null;
               result.informationMessage = 'Correo Electrónico Duplicado';
               deferred.resolve(result);
            }
                
            else{

                self.userSavePromise(newUserObject)

                    .then(function(userSaved){

                        result.user = userSaved;
                        result.informationMessage = null;
                        deferred.resolve(result);
                    });
            }
            
        })

        .then(null, function(err){

            deferred.reject(err);
        }); 
        
   return deferred.promise; 
};


/**
    <p> Starts the processes to Signin an User in the app. </p>
    <ul>
        <li> Verifies that user's email is in the DB.
        <li> Starts the password's verification.
        <li> Populates a Result Object with the user's information and a Notification message.
    </ul>
 * @param {string} email - Mail supplied by the User.
 * @param {string} password - Password supplied by the User.
 * @memberof module:Models.
 * @inner
 * @return {Promise}

*/

var signinPromise = function (email, password){
    
    var deferred = Q.defer();
    var self = this;   
    var query = self.findOne({ 'info.email': email});
    var verifyUserPromise = query.exec();
    var result = {};
            
    verifyUserPromise
        
        .then(function(user){

            if(user){

                user.validPassword(password)
                        
                    .then(function(loggedUser){

                        if(loggedUser){
                            result.user = user;
                            result.informationMessage = null;
                            deferred.resolve(result);
                        }
                        else{
                            result.user = null;
                            result.informationMessage = 'Contraseña Incorrecta';
                            deferred.resolve(result);
                        }
                    })  
                            
                    .then(null,function(err){
                                
                        return deferred.reject(err);
                    });
            }
                       
            else{
                result.user = null;
                result.informationMessage = 'Correo Electrónico Incorrecto';
                deferred.resolve(result);
            }
            
           
        })
                
                
        .then(null, function(err){

            return deferred.reject(err);
        });  
    
    return deferred.promise;
    
};

/**
    <p> Validate the Password supplied by the User. </p>
    <ul>
        <li> Hashs the Salt in DB with the password supplied .
        <li> Compares the result with the passowrd saved in the DB.
        <li> Returns a result through the Promise's value.
    </ul>
 * @param {string} password - Password supplied by the User.
 * @memberof module:Models.
 * @inner
 * @return {Promise}

*/


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
        signinPromise: signinPromise,
        userSavePromise: userSavePromise
    },
    saveMiddlewares: {
        hashPassword: hashPassword
    }
};