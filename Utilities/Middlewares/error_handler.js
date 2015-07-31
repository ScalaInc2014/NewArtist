
var errorHandler = function(err, req, res, next){
    
    console.log("Middleware de Manejo de Errores");
    console.error(err.stack);
    var msg;

    switch(err.type){

        case 'database':
            msg = "Server Unavailable";
            res.statusCode = 503;
            break;         
        default:
            msg = 'Internal Server Error';
            res.statusCode = 500;
   
    }

    res.render('./Error_Handler',{msg: msg, status: res.statusCode});
 
};


module.exports = errorHandler;