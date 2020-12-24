//si la petición es exitosa
exports.success = function(res,message,status){
    let statusCode = status || 200;
    let statusMessage = message || '';
    
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: statusMessage,
    })
}

//si la petición ha fallado
exports.error = function(res,message,status){
    let statusCode = status || 500;
    let statusMessage = message || 'internal server error';

    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: statusMessage,
    })
}
