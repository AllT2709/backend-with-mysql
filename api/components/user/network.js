const router = require('express').Router();

const response  = require('../../../network/response');
const jwtAuth = require('../../../auth/authenticate/jwtAuth')
const controller = require('./controller')

///Middleware///
router.get('/contacts',getContacts);
router.post('/contacts/add',addContact)

///Funciones///
async function getContacts(req,res){
    let userToken = jwtAuth.getToken(req);
    console.log(userToken);
    if(userToken !== undefined){
        var data = await controller.getContacts(userToken.user.id);
        if(data.length == 0){
            return response.error(res,'There are not contacts');
        }
        return response.success(res,data,201);
    }else{
        console.log('algo salio mal');
        return response.error(res,'Algo salió mal',401);
    }
}
async function addContact(req,res,next){
    let userToken = jwtAuth.getToken(req);

    /*let newContact = {
        userId:userToken.user.id,
        name: req.body.name,
        number:req.body.number,
    }*/
    let newContact = [[
        userToken.user.id,
        req.body.name,
        req.body.number
    ]]

    await controller.addContact(newContact)
        .then(data=>{
            return response.success(res,data,201);
        })
        .catch(next)
}

module.exports = router;