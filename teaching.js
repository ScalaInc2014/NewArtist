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