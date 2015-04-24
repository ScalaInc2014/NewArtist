var Q = require('q');
var parm = 'parm';
var parm2 = 'parm2';
var parm3 = 'parm3'


var Promise = function (parm){

	console.log("Ejecutando Promesa ");
	var deferred  = Q.defer();
	if(parm === 'parm')
		deferred.resolve(parm);
	else
		deferred.reject("Error Error")
	return deferred.promise;

}

var Promise1 = function (parm){

	console.log("Ejecutando Promesa 1");
	var deferred  = Q.defer();
	if(parm === 'parm2')
		deferred.resolve(parm);
	else{
		console.log("Lanzando Eroor ")
		deferred.reject("Error Error")
	}
		
	return deferred.promise;

}

var Promise2 = function (parm){

	console.log("Ejecutando Promesa 2");
	var deferred  = Q.defer();
	if(parm === 'parm3')
		deferred.resolve(parm);
	else
		deferred.reject("Error Error")
	return deferred.promise;

}

///***** q.all para trabajar promesas anidadas de manera mas organizada

 var promisesArray  = Q.all([Promise(parm),Promise1(parm2)]);

 promisesArray

  	.spread(function(parm,parm2){

  		console.log("Este el ONFULLFILLED DE " + parm  + " and " + parm2);

  	})

  	.catch(function(err){

  		console.log("Error Error")

  	})

  	.fin(function(result){

  		console.log("Prueba FInally " + result);
  	})



 Promise(parm)

  .then(function(parm){

  		throw new Error ("Error")
  		//Promise1(parm2)

  })


