var notificationTypes = require("./notification_types");

var processNotifications = function(req, res, next) {

    if(req.session.notification) {

        var locals = {message : req.clearNotification()};
        if(notificationTypes[locals.message.id].type === 'redirect') {
            
            res.render(notificationTypes[locals.message.id].view, locals);
        }
    }
    else
        next();
};

module.exports = processNotifications; 