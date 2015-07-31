var notificationTypes = {
    
    NO_EMAIL_REGISTERED : { 
        type : 'redirect',
        view : 'Password_recover/password_recovery'
    },
    SUCCESS_PASSWORD_RECOVERY_REQUEST : {
        type : 'redirect',
        view : 'Password_recover/password_recovery'
    },
    NO_MANUAL_RECOVERY_EMAIL : {
        type : 'redirect',
        view : 'Password_recover/password_recovery'           
    },
    FAN_ALREADY_REGISTERED : {
        type : 'redirect',
        view : 'Signup/fan'           
    },
    ARTIST_ALREADY_REGISTERED : {
        type : 'redirect',
        view : 'Signup/artist'           
    },
    INVALID_AUTHENTICATION_TYPE: {
        type : 'redirect',
        view : 'Signin/signin'          
    }
};

module.exports = notificationTypes;