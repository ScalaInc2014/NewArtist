var Q = require("q");
var mailService = require('../Utilities/Mail_service');
var mailTypes = require('./mail_types');
var dust = require('dustjs-linkedin');


var mailSender = function(to, locals, mailType) {
    
    var deferred = Q.defer();
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
                
                if(err) 
                    deferred.reject(err);
    
                deferred.resolve(info);
                
            }); 

        }) 
        
        .then(null, function(err){
            
            deferred.reject(err);
            
        });        
    

    return deferred.promise;
};

mailSender.mailTypes = mailTypes;

module.exports = mailSender;


/** 
 *  <h3>Description: Contains the Promise that allows to Send an email and an object with the email's subject and template .</h3>
    <ul> 
        <li> mail_types.js: Exports an object with the subject and HTML Template in relation with the Email's Type.
        <br>
        <li>  index.js: Exports an Object with the MailSender Promise and the Email's Type Object.       
    </ul> 
 * @module Mail Sender
*/

/**
  <p> A promise that completes the Rendering and Email Sending: </p>

    <ul>
        <li> Renders the template and the locals through dustRenderPromise.
        <li> Populates the mailOptions's Object using the parameters received.
        <li> Sends an email through the Node Mailer's SendMail Method.
    </ul>
 * @param {String} to - Email Destination.
 * @param {Object} locals - Locals Variables to be rendering with the HTML Template.
 * @param {Object} MailType - Objects that contains the Subject and Templete to be rendering.
 * @memberof module:Mail Sender
 * @inner
 * @return {Promise} 
*/