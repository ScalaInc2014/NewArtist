var bcrypt = require("bcrypt");
var mongoose = require('mongoose');
var Q = require('q');


var validPassword = function (password) {

    var document = this;
    console.log("Password: " + password);
    var hashPromise = Q.denodeify(bcrypt.hash);

    var loggedin = hashPromise(password, document.info.salt)

        .then(function(hash){

            if(hash === document.info.password)
                return true;
                
            return false;
        })

        .then(null,function(err){
            
            console.log(err);
        }); 
        
    return loggedin;
};




module.exports = {
    methods: {
        validPassword: validPassword,
    }
}