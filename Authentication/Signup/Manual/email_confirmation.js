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

module.exports = verifyEmail;