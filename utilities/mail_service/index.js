var nodemailer = require("nodemailer");
var emailServiceConfiguration = require("./configuration");

var emailService = nodemailer.createTransport({
        service: emailServiceConfiguration.service,
        auth: {
            user: emailServiceConfiguration.sender,
            pass: emailServiceConfiguration.senderPass
        }
    }
);

module.exports = emailService;