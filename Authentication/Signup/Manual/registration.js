var mongoose = require('mongoose');
var mailSender = require('../../../Mail_sender');
var mailTypes = mailSender.mailTypes;
var models = require("../../../Models");

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
    
    user.model = models[userType];
    
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
            token: Id,
            
        };
    }
    
    return user;
};

/**
  <p> Returns a function with  the necessary processes to complete User's registration: </p>

    <ul>
        <li> Populate the user object through getUserConfiguration.
        <li> Start the registration process through user.model.registerPromise.
        <li> If register process is complete, sends an Email through mailSender Method.
        <li> Redirects to the properly route.
    </ul>
 * @param {string} userType - Fan || Artists.
 * @memberof module:Authentication
 * @inner
 * @return {function} 
*/

var registerUser = function(userType) {
    
    return function(req, res){

        var user = getUserConfiguration(req, userType);
        var registerFailRedirect = '/authentication/signup/'+ userType;
        var mailVerificationRedirect = '/authentication/signup/mail_verification';
        var locals = {}; //variables for template
        
        user.model.registerPromise(user.dataStructure)
        
            .then(function(result){
 
                if(result.user) {
                    
                    locals.confirmationLink = 'http://localhost:8080/authentication/signup/confirmation/'+userType+'/'+ result.user.token;
                    locals.userType = userType;
                    mailSender(result.user.email, locals, mailTypes.CONFIRMATION_MAIL)
                     
                        .then(function (info) {

                            res.redirect(mailVerificationRedirect);

                        })
                        
                        .then(null,function(err){

                            console.log(err);
                        });
                }
                else {

                    req.flash('error', result.informationMessage);
                    res.redirect(registerFailRedirect);
                }                
                
            })
            
            .then(null,function(err){
                
                console.log("Operational Error");
                console.log(err);
                
            });
    };
};

module.exports = registerUser;