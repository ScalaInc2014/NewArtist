var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	var testObject = {
		developers: "Nicolás, Miguel",
		app: "NewArtist"
	};
	res.send(testObject);
});

module.exports = router;