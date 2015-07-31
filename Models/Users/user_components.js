var bcrypt = require("bcrypt");
var Q = require('q');
var communication = require('../../Communication');


//***************************** Public *******************************//

/**
  <p> Saves in a new Document, the User's information through .pSave Promise. </p>
 * @param {object} NewUserObject - New user's information object.
 * @memberof module:Models.
 * @inner
 * @return {Promise} 
*/

var createUserFromStructureAndSave = function (newUserObject){

    var newUser = new this(newUserObject);
    return newUser.pSave();
};

/**
  <p> This is an instance method. Used to save the user's information in form of promise.</p>
 * @memberof module:Models.
 * @inner
 * @return {Promise} 
*/

var pSave = function(){
    
    var deferred = Q.defer();
    this.save(function(err){
        if(err)
            deferred.reject(err);
        else
            deferred.resolve( this );
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
    return this.pSave();
};

/**
  <p> This is a instance method. Used to check the existence and life of the passwordRequest property in the user document.</p>
 * @memberof module:Models.
 * @inner
 * @return {Boolean} 
*/

var checkPasswordRequestValidity = function(){
    
    var result = { checked : false };
    var currentDate = (new Date()).getTime();
    var passwordRequestDate = this.passwordRequest.getTime();
    var oneDayInMilliseconds = 24 * 60 * 60 * 1000;    
    
    if(this.passwordRequest){
        
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

    if( typeof document.info.password !== "undefined"){  // If the RegisterMode is Manual and the user provided a password

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
    }
    else
        next();
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

var registerUser = function (newUserObject){
    
    var result = { newUser : null };
    var self = this;   
    var findUserByEmail = self.findOne({ 'info.email' : newUserObject.info.email }).exec();

    return findUserByEmail
        .then(function(user){

            if(user) {
                
                result.message = communication.buildMessage( self.modelName.toUpperCase() + '_ALREADY_REGISTERED');
                return result;
            }
            else{

                return self.createUserFromStructureAndSave(newUserObject)
                
                    .then(function(newUser){
                        result.newUser = newUser;
                        return result;
                    });
            }
        });
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
    
    var result = { signedUser : null };
    var self = this;   
    var findUserByEmail = self.findOne({ 'info.email' : email }).exec();
    
    return findUserByEmail
    
        .then(function(user){

            if(user){

                if(user.registerMode === "manual"){
                    
                    return user.validatePassword(password)
                        .then(function(validPassword){
    
                            if(validPassword){
                                result.signedUser = user;
                                return result;
                            }
                            else{
                                result.message = communication.buildMessage('INVALID_PASSWORD');
                                return result;
                            }
                        });
                }  
                else{
                    result.message = communication.buildMessage('INVALID_AUTHENTICATION_TYPE', {socialNetwork : user.registerMode});
                    return result;
                }
            }              
            else{
                result.message = communication.buildMessage('INVALID_EMAIL');
                return result;
            }
        });
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
    
    var result = { signedUser : null };
    var self = this;   
    var findUserByEmail = self.findOne({ 'info.email' : email }).exec();

    return findUserByEmail    
    
        .then(function(user){
            if(user && (provider === user.registerMode)){
                result.signedUser = user;
                return result;
            }
            else{
                result.message = communication.buildMessage('INVALID_EMAIL');
                return result;
            }
        });
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

    var user = this;
    var hashPromise = Q.denodeify(bcrypt.hash);

    return hashPromise(password, user.info.salt)


        .then(function(hash){

            if(hash === user.info.password)
                return true;
            else
                return false;
        });
};


var resetPassword = function (token, salt, password) {

    var result = { reseted: false };
    var self = this;   
    var query = self.findByIdAndUpdate( token , { $set: { 'info.password': password ,'info.salt': salt}});
    var updatePassword = query.exec();
   
    return updatePassword
    
        .then(function(user){
    
            if(user){
                result.reseted = true;
                return result;
            }
            else{
                result.message = communication.buildMessage('PASSWORD_UPDATE_FAIL');
                return result;
            }
        });
};


module.exports = {
    
    methods:{
        checkPasswordRequestValidity : checkPasswordRequestValidity,
        validatePassword : validatePassword,
        pSave : pSave,
        updatePassword : updatePassword
    },
    statics: {
        registerUser : registerUser,
        manualSignin : manualSignin,
        socialSignin : socialSignin,
        createUserFromStructureAndSave : createUserFromStructureAndSave,
        resetPassword : resetPassword
    },
    saveMiddlewares: {
        hashPassword : hashPassword
    }
};