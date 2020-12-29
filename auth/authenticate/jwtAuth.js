const jwtAuth = require('jsonwebtoken');

require('dotenv').config();

function sign(data){
    return jwtAuth.sign(data, process.env.JWT_SECRET);
}
function decode(token){
    return jwtAuth.decode(token);
}
function getToken(req){
    if(!req.headers.authorization){
        console.log('no está autorizado');
        return new Error('No está autorizado');
    }
    let token=req.headers.authorization || '';
    token = token.replace('Bearer ','');
    return decode(token);
}
module.exports={
    sign,
    decode,
    getToken
}