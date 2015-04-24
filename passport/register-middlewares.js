var Fan = require('../models/fan');
var Artist = require('../models/artist');
var mongoose = require('mongoose');
var mailSender = require('../mail_sender');
var mailTypes = mailSender.mailTypes;


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
        
        user.model = Fan;
      
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
        
        user.model = Artist;
     
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


var mailConfirmation = function (userType){
    
    var userModel;
    
    if(userType === 'fan')
        userModel = Fan;
    else if(userType === 'artist')
        userModel = Artist;

    return function(req, res){
        
        var userId = req.params.user_id;
        var query = userModel.findOne({ 'token': userId});
        var verifyTokenPromise = query.exec();
        var mailVerificatedRedirect = '/';
        var errorVerificationRedirect = '/authentication/signup/verificationError';
        verifyTokenPromise

            .then(function(user){
    
                if(user){
                    
                   if(!user.mailConfirmation){

                        query = userModel.findByIdAndUpdate( user._id, { $set: {  mailConfirmation: true }});
                        var updateMailConfirmationPromise = query.exec();
                        return updateMailConfirmationPromise;
                   } 
                   else{

                        req.flash('error', 'Link de Verificación ha Expirado');
                        res.redirect(errorVerificationRedirect);
                   }

                }

                else{

                    req.flash('error', 'Link de Verificación Inválido');
                    res.redirect(errorVerificationRedirect);

                }

            })
            
            .then (function(user){

                if(user){
                    
                     req.login( user, function(err) {
                        
                        if (err) return console.log(err);
                        res.redirect(mailVerificatedRedirect);
                    });                    
                    
                }
            })            
    
            .then(null, function(err){

                return console.log(err);
            }); 

    };

};

module.exports = {

 registerUser: registerUser,
 mailConfirmation : mailConfirmation

};