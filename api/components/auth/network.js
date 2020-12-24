const router = require('express').Router();

const response = require('../../../network/response')

router.get('/',init);

function init(req,res){
    res.send('Bienvenido!!')
}

module.exports= router;