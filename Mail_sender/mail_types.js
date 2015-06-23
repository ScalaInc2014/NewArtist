var mailTypes = {}; 

mailTypes.CONFIRMATION_MAIL = {
    
    subject: 'Confirmación de Cuenta New Artist',
    view:    'Mail_templates/register_link_validation'
    
};

mailTypes.RECOVER_PASSWORD = {

	subject: 'Restablecimiento de contraseña',
	view: 'Mail_templates/password_reset'
};

module.exports = mailTypes;