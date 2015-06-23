var bcrypt = require("bcrypt");
var Q = require('q');

var messages = require('../../Messages');
var communication = require('../../Communication');


//***************************** Public *******************************//

/**
  <p> Saves in a new Document, the User's information through .save Method. </p>
 * @param {object} NewUserObject - New user's information object.
 * @memberof module:Models.
 * @inner
 * @return {Promise} 
*/

var saveUser = function (newUserObject){

    var deferred = Q.defer();
    var newUser = new this(newUserObject);

    newUser.save(function(err){

        if(err)
            deferred.reject(err);
        else{
            var userSaved = {
                
                token: newUser._id,
                email: newUser.info.email
       
            };
            deferred.resolve(userSaved);
        }
    });  
    
    return deferred.promise; 
};

/**
  <p> This is a instance method. Used to save the user's information in form of promise.</p>
 * @memberof module:Models.
 * @inner
 * @return {Promise} 
*/

var uSave = function(){
    
    var deferred = Q.defer();
    this.save(function(err){
        if(err)
            deferred.reject(err);
        else
            deferred.resolve();
    });
    return deferred.promise;
};

/**
  <p> This is a instance method. Used to update/reset the user's password.</p>
 * @memberof module:Models.
 * @inner
 * @return {Promise} 
*/


var updatePassword = function(newPassword){
    
    this.info.password = newPassword;
    this.passwordRequest = undefined;
    return this.uSave();
};

/**
  <p> This is a instance method. Used to check the existence and life of the passwordRequest property in the user document.</p>
 * @memberof module:Models.
 * @inner
 * @return {Boolean} 
*/

var checkPasswordRequestValidity = function(){
    
    var result = { checked : false };
    
    if(this.passwordRequest){
        var currentDate = (new Date()).getTime();
        var passwordRequestDate = this.passwordRequest.getTime();
        var oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        if(currentDate - passwordRequestDate <= oneDayInMilliseconds)
            result.checked = true;
        else
            result.message = communication.buildMessage('EXPIRED_PASSWORD_RECOVERY_TOKEN');
        return result;
    }
    result.message = communication.buildMessage('NO_PASSWORD_RECOVERY_REQUEST');
    return result;
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
    
    if(document.info.password !== ""){  // If the RegisterMode is Manual and the user provided a password
    
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
    }
    else
        next();
};

/**
    <p> Populates a result object and resolve a promise </p>
    <ul>
        <li> Populates result.user.
        <li> Populates result.message.
        <li> Resolve the promise.
    </ul>
 * @param {object} deferred - Q's Promise Object.
 * @param {object} user - User info.
 * @param {string} message - Notification to Client.
 * @memberof module:Models.
 * @inner

*/

var resolvePromise = function (deferred, user, message){

    var result = {};
    result.user = user;
    result.informationMessage = message;
    deferred.resolve(result);
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

    var findUserByEmail = self.findOne({ 'info.email' : newUserObject.info.email }).exec();
    
    findUserByEmail
        .then(function(user){

            if(user)
                resolvePromise(deferred, null, messages.notification.ALREADY_REGISTERED); 
                
            else{

                self.saveUser(newUserObject)

                    .then(function(userSaved){
                         resolvePromise(deferred, userSaved, null);
                    })
                    
                    .then(null, function(err){
                        deferred.reject(err);
                    });
            }
        })

        .then(null, function(err){
            deferred.reject(err);
        }); 
        
   return deferred.promise; 
};

/**
    <p> Starts the processes to Signing  manually in the app. </p>
    <ul>
        <li> Verifies that user's email is in the DB.
        <li> Starts the password's verification.
        <li> Starts de ResolvePromise process.
    </ul>
 * @param {string} email - Mail supplied by the User.
 * @param {string} password - Password supplied by the User.
 * @memberof module:Models.
 * @inner
 * @return {Promise}

*/

var manualSignin = function (email, password) {
    
    var deferred = Q.defer();
    var self = this;   
    var findUserByEmail = self.findOne({ 'info.email' : email }).exec();
    
    findUserByEmail
        .then(function(user){

            if(user){

                if(user.registerMode === "manual"){
                    
                    user.validatePassword(password)
                            
                        .then(function(loggedUser){
    
                            if(loggedUser)
                                resolvePromise(deferred, user, null);
                            else
                                resolvePromise(deferred, null, messages.notification.INVALID_PASSWORD);
                        })  
                                
                        .then(null,function(err){            
                            deferred.reject(err);
                        });                      
                }  
                else{
                    var message =  messages.notification.INVALID_AUTHENTICATION_TYPE + user.registerMode;
                    resolvePromise(deferred, null, message);
                }
            }              
            else
                resolvePromise(deferred, null, messages.notification.INVALID_EMAIL);
        })

        .then(null, function(err){

            deferred.reject(err);
        });  
    
    return deferred.promise;
    
};

/**
    <p> Starts the processes to Signin through a social Network. </p>
    <ul>
        <li> Verifies user's email is in the DB and the Signin's and Signup's Method matches.
        <li> Starts de ResolvePromise process.
    </ul>
 * @param {string} email - Mail supplied by the User.
 * @param {string} provider - Signin Method.
 * @memberof module:Models.
 * @inner
 * @return {Promise}

*/

var socialSignin = function (email, provider) {
    
    var deferred = Q.defer();
    var self = this;   
    var findUserByEmail = self.findOne({ 'info.email' : email }).exec();

    findUserByEmail    
        .then(function(user){

            if(user && (provider === user.registerMode))
                resolvePromise(deferred, user, null);
            else
                resolvePromise(deferred, null, messages.notification.INVALID_EMAIL);              
        })

        .then(null, function(err){
            deferred.reject(err);
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

var validatePassword = function (password) {

    var deferred = Q.defer();
    var user = this;
    var hashPromise = Q.denodeify(bcrypt.hash);

    hashPromise(password, user.info.salt)


        .then(function(hash){

            if(hash === user.info.password)
                deferred.resolve(true);
            else
                deferred.resolve(false);
        })
        
        .catch(function(err){
            
            deferred.reject(err);
        }); 

    return deferred.promise;
    
};


var resetPassword = function (token, salt, password) {

    var deferred = Q.defer();
    var self = this;   
    var query = self.findByIdAndUpdate( token , { $set: { 'info.password': password ,'info.salt': salt}});
    var updatePassword = query.exec();
   
    updatePassword
    
    .then(function(user){

        if(user)
            resolvePromise(deferred, user, null);
        else
            resolvePromise(deferred, null, messages.notification.PASSWORD_UPDATE_FAIL);              
    })

    .then(null, function(err){
        deferred.reject(err);
    });  
    
    return deferred.promise;
    
};


module.exports = {
    
    methods:{
        checkPasswordRequestValidity : checkPasswordRequestValidity,
        validatePassword : validatePassword,
        uSave : uSave,
        updatePassword : updatePassword
    },
    statics: {
        registerPromise : registerPromise,
        manualSignin : manualSignin,
        socialSignin : socialSignin,
        saveUser : saveUser,
        resetPassword : resetPassword
    },
    saveMiddlewares: {
        hashPassword : hashPassword
    }
};