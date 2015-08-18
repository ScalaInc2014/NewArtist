var string = "hola mundo";
var rep = string;
rep = "nuevo string";
console.log( string === "nuevo string" ? "true" : "false");
console.log( string === "hola Mundo" ? "true" : "false");
console.log(string);
console.log(rep);


app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});


{ "_id" : ObjectId("55cd1e22c406ba811fe33b43"), 
  "registerDate" : ISODate("2015-08-13T22:45:54.338Z"), 
  "registerMode" : "manual", 
  "contentShared" : [ ], 
  "artistShared" : [ ], 
  "followedArtist" : [ ], 
  "likes" : [ ], 
  "favouriteArtists" : [ ], 
  "history" : [ ], 
  "preferences" : [ ], 
  "mailConfirmation" : true, 
  "info" : { 
    "salt" : "$2a$10$WaHYm90PRQbjblBUAUwCUu", 
    "name" : "Nicolas Fernández", 
    "password" : "$2a$10$WaHYm90PRQbjblBUAUwCUuCY3SukN7yaPhxMQZX9Pxi5cTrS99Prm", 
    "email" : "fercholas2012@gmail.com", 
    "birthday" : ISODate("1987-09-28T00:00:00Z"), 
    "gender" : "male", 
    "avatarPath" : "http://www.nocturnar.com/forum/attachments/fondos-de-pantalla/28575d1338158805-paisajes-hermosos-fondo-de-pantalla-paisajes_hermosos_del_mundo2.jpg", 
    "location" : "Bogotá,Colombia" }, 
    "__v" : 0 
  
}


should(null).not.be.ok();
