var mongoose = require('mongoose');
var mailSender = require('../../../Mail_sender');
var mailTypes = mailSender.mailTypes;
var models = require("../../../Models");
var communication = require('../../../Communication');

/**
  <p> Returns the User's Object in relation with the User doing the Register Process: </p>
 * @param {string} req - Request HTTP.
 * @param {string} userType - Fan || Artists.
 * @memberof module:Authentication.
 * @inner
 * @return {object} user - User's data Structure. 
*/

var getUserConfiguration = function(req, userType) {
    
    var user = {};
    var currentDate = new Date();
    var Id = mongoose.Types.ObjectId();

    if(userType === 'fan') {
        
        user.dataStructure = {
            fanId: Id,
            info:{
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                birthday: req.body.birthday,
                gender: req.body.gender,
                avatarPath: 'http://www.nocturnar.com/forum/attachments/fondos-de-pantalla/28575d1338158805-paisajes-hermosos-fondo-de-pantalla-paisajes_hermosos_del_mundo2.jpg',
                location: req.body.location
            },
            registerDate: currentDate,
            registerMode: "manual",
            token: Id,
        };
    }
    else {
        user.dataStructure = {
            artistId: Id,
            info:{
             
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                avatarPath: 'http://www.nocturnar.com/forum/attachments/fondos-de-pantalla/28575d1338158805-paisajes-hermosos-fondo-de-pantalla-paisajes_hermosos_del_mundo2.jpg',
                location: req.body.location
                
            },
            artType: req.body.artType,
            registerDate: currentDate,
            registerMode: "manual",
            token: Id,
            
        };
    }
    
    return user;
};

/**
  <p> Returns a function with  the necessary processes to complete User's registration: </p>

    <ul>
        <li> Populate the user object through getUserConfiguration.
        <li> Start the registration process through userModel.registerPromise.
        <li> If register process is complete, sends an Email through mailSender Method.
        <li> Redirects to the properly route.
    </ul>
 * @param {string} userType - Fan || Artists.
 * @memberof module:Authentication
 * @inner
 * @return {function} 
*/

var registerUser = function(userType) {
    
    return function(req, res, next){

        var userModel = models[userType];
        var user = getUserConfiguration(req, userType);
        var mailVerificationRedirect = '/authentication/signup/confirmation/sent';
        var confirmationLink = '/authentication/signup/confirmation/';
        var locals = {}; //variables for template
        var message;
        
        userModel.registerUser(user.dataStructure)
        
            .then(function(result){
 
                if(result.newUser) {

                    locals.confirmationLink = req.headers.origin + confirmationLink + userType +'/'+ result.newUser._id;
                    locals.userType = userType;
                    mailSender(result.newUser.info.email, locals, mailTypes.CONFIRMATION_MAIL)
                     
                        .then(function (info) {
                            res.redirect(mailVerificationRedirect);
                        })
                        
                        .then(null,function(err){
                            next(err);
                        });
                }
                else {

                    message = result.message;
                    req.setNotification( message );
                    next();
                }                
                
            })
            
            .then(null,function(err){
                next(err);
            });
    };
};

module.exports = registerUser;