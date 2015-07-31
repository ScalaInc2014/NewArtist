var models = require("../../../Models");

/**
    <p> Returns a function that receives the token and verified if it exists in DB: </p>
    <ul>
        <li> Extract the userId (token) from de req Object.
        <li> Verify if the userId exists in the collection.
        <li> If exists update the mailConfirmation property and Login the User.
        <li> If does not exist redirect to a message.
    </ul>
 * @param {string} userType - Fan || Artists.
 * @memberof module:Authentication.
 * @inner
 * @return {function}
*/



var verifyEmail = function (userType){
    
    var userModel = models[userType];
    
    return function(req, res, next){
        
        var userId = req.params.user_id;
        var mailVerificatedRedirect = '/';
        var errorVerificationRedirect = '/authentication/signup/confirmation/error';
        var query = userModel.findOne({ '_id': userId});
        var verifyTokenPromise = query.exec();

        verifyTokenPromise

            .then(function(user){
    
                if(user){
                    
                   if(!user.mailConfirmation){
                        var updateMailConfirmationPromise = userModel.findByIdAndUpdate( user._id, { $set: {  mailConfirmation: true }}).exec();
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
                    
                    delete user.info.password;
                    return req.pLogin(user)
                    .then(function(){
                        res.redirect(mailVerificatedRedirect);
                    });
                    
                }
            })            
    
            .then(null, function(err){

                next(err);
            }); 
    };
};

module.exports = verifyEmail;