
var Q = require('q');

var addLoginPromiseToRequest = function(req, res, next){

    var pLogin = function(user){
        
        var deferred = Q.defer();
        req.login(user, function(err){
            if(err)
                deferred.reject(err);
            else
                deferred.resolve();
        });
        return deferred.promise;
    };
    
    req.pLogin = pLogin;
    next();
};


var setLoginPromiseToRequest = function (server){

    server.use(addLoginPromiseToRequest);

};

module.exports = setLoginPromiseToRequest;