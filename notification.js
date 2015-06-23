/**
 * Module dependencies.
 */

var _ = require("underscore");
/**
 * Expose `notification()` function on requests.
 *
 * @return {Function}
 * @api public
 */
 
var notification = function (options) {
  
  options = options || {};
  var safe = (options.unsafe === undefined) ? true : !options.unsafe;
  
  return function(req, res, next) {
    if (req.setNotification && req.clearNotification && safe) { return next(); }
    req.setNotification = _setNotification;
    req.clearNotification = _clearNotification;
    next();
  };
};

var _setNotification = function(message) {
    if (this.session === undefined) throw Error('req.setNotification() requires sessions');
    if (!_.isObject(message)) throw Error('req.setNotification() only accepts objects');
    this.session.notification = message;
};

/**
 * @param {Object} message
 * @return {Object}
 * @api public
 */

var _clearNotification = function() {

    if (this.session === undefined) throw Error('req.clearNotification() requires sessions');
    if (this.session.notification){
        var notification = _.clone(this.session.notification);
        delete this.session.notification;
        return notification;
    }
    return {};
};

module.exports = notification;