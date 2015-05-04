var mongoose = require('mongoose');
var mailSender = require('../../../mail_sender');
var mailTypes = mailSender.mailTypes;
var models = require("../../../Models");

/** 
 * Conforma el objeto de Datos dependiendo del Tipo de Usuario que esté haciendo el registro 
 * @param {object} req - Objeto de petición HTTP  con la información ingresada por el usuairo que se está registrando
 * @param {string} userType - Tipo de usuario que está haciendo el registro (fan || artista)
 * @return {object} user - Objeto con la estructura de Datos y el modelo del usuario a registrar.
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

var registerUser = function(userType) {
    
    return function(req, res){

        var user = getUserConfiguration(req, userType);
        var registerFailRedirect = '/authentication/signup/'+ userType;
        var mailVerificationRedirect = '/authentication/signup/mail_verification';
        var locals = {}; //variables for template
        
        user.model.registerPromise(user.dataStructure)
        
            .then(function(newUserInfo){
 
                if(newUserInfo) {
                    
                    locals.confirmationLink = 'http://localhost:8080/authentication/signup/confirmation/'+userType+'/'+ newUserInfo.token;
                    locals.userType = userType;
                    mailSender(newUserInfo.email, locals, mailTypes.CONFIRMATION_MAIL)
                     
                        .then(function (info) {

                            res.redirect(mailVerificationRedirect);

                        })
                        
                        .then(null,function(err){
                            
                            console.log("ON REJECTED ");
                            console.log(err);
                        });
                }
                else {
                    
                    console.log("User already exists");
                    req.flash('error', 'User Already Exists!!!');
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