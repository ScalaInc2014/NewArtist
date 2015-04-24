var bcrypt = require("bcrypt");
var Q = require('q');


var validPasswordPromise = function (password) {

    var deferred = Q.defer();
    var document = this;
    var hashPromise = Q.denodeify(bcrypt.hash);

    hashPromise(password, document.info.salt)

        .then(function(hash){

            if(hash === document.info.password)
                 deferred.resolve(true);

            deferred.resolve(false);
        })
        
        .catch(function(err){
            
            deferred.reject(err);
        }); 

    return deferred.promise;
    
};

module.exports = {
    methods: {
        validPassword: validPasswordPromise,
    }
};