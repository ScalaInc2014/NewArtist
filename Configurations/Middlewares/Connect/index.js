var setStaticsPath     = require('./statics');
var setViewsEngine     = require('./views');
var setCookieParser    = require('./cookieParser');
var setBodyParser	   = require('./bodyParser');
var setSession         = require('./session');
var setPassport		   = require('./passport')

module.exports = {

    setStaticsPath     : setStaticsPath,
    setViewsEngine     : setViewsEngine,
    setCookieParser    : setCookieParser,
    setBodyParser      : setBodyParser,
    setSession         : setSession,
    setPassport        : setPassport
};