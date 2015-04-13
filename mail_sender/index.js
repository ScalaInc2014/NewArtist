var Q = require("q");
var mailService = require('../utilities/mail_service');
var mailTypes = require('./mail_types');
var dust = require('dustjs-linkedin');
var deferred = Q.defer();

var mailSender = function(to, locals, mailType) {
    
    
    var dustRenderPromise = Q.denodeify(dust.render);
   
    dustRenderPromise( mailType.view, locals)
    
        .then(function(html){

            var mailOptions = {
    
                from: 'New Artists <sender@server.com>',
                to: to,
                subject: mailType.subject,
                html: html
            };           
           
            mailService.sendMail(mailOptions, function(err, info){
                
                //if(err) return deferred.reject(err);
    
                if(err) 
                    return deferred.resolve(err);
                
                return deferred.resolve(info);
                
            }); 

        }) 
        
        .then(null, function(err){
            
            return deferred.reject(err);
            
        });        
    

    return deferred.promise;
};

mailSender.mailTypes = mailTypes;

module.exports = mailSender;
