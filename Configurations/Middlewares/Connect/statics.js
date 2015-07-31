var express = require("express");
var path = require("path");

var setStaticsPath = function (server){

	console.log(" ** Configuring Statics Files's Path **");
	server.use(express.static(path.join(__dirname, '../../../Public')));
};

module.exports = setStaticsPath;