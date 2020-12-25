const router = require('express').Router();

const passport = require('passport');
const response = require('../../../network/response')

require('../../../auth/strategies/localStrategi')

///Middlewares///
router.get('/',init);
router.post('/register',passport.authenticate('register',{session:false}),register)
router.post('/login',login)

///functions///
function init(req,res){
    res.send('Bienvenido!!')
}
function register(req,res){
    response.success(res,'user created',200);
}
function login(req,res,next){
    passport.authenticate('login',(err,user)=>{
        console.log(user);
        try{
            if(err || !user){
                response.error(res,'An Error has ocurred');
                return next(err);
            }
            req.login(user,{session:false} ,(error)=>{
                if(err) return next(error);
                
                const body={
                    id:user[0].id,
                    name: user[0].name,
                    username: user[0].username,
                    password: user[0].password
                }
                response.success(res,body,200);

            })

        }catch(err){
            return next(err);
        }
    })(req, res, next)
}

module.exports= router;