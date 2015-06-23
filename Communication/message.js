var buildMessage = function(id, params) {
    var message = {};
    message.id = id;
    if(params)
        message.params = params;
    return message;
};

module.exports = buildMessage;