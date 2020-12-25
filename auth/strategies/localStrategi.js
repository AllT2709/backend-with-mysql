const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


const connectDB = require('../../network/db')

//Strategies with passport

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
},
     function (req, email, password, cb) {
         //Una forma de queries en backend usando comillas invertdas y sin parametro en funcion connectDB.query
        let query = `SELECT email FROM users WHERE email="${email}"`;
        connectDB.query(query, async function (err, data, fields) {
            if (data) {
                console.log('There is an error!! that email is registered');
                return cb(err, null);
            } else {
                await bcrypt.hash(password, 5)
                    .then(passHashed => {
                        let query = `INSERT INTO users(name,username,email,password) VALUES ?`;
                        //Mysql: Es importante encerrar los datos con doble corchete
                        let newUser = [[
                            req.body.name,
                            req.body.username,
                            email,
                            passHashed
                        ]]
                        connectDB.query(query, [newUser], (err, result) => {
                            if (err) {
                                console.log(err.message);
                                return cb(err, null);
                            } else {
                                console.log('insert success =>' + result);
                                return cb(null, newUser)
                            }
                        })
                    })
                    .catch(err => {
                        return cb(err, null);
                    })
            }
        })
    }
))

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},  function (email, password, cb) {
    //Una forma de queries en backend con signo al final y parametro en la funcion 'connectDB.query'
        let query = `SELECT * FROM users WHERE email=?`;
        connectDB.query(query,email,async function(err,data,fields){
            if(!data){
                console.log(' That user is not registered or bad');
                return cb(err,null);
            }else{
                await bcrypt.compare(password,data[0].password)
                    .then(isIqual =>{
                        if(!isIqual){
                            console.log('bad password');
                            throw new Error('bad password')
                        }
                        return cb(null,data)
                    })
                    .catch(err =>cb(err,null))
            }
        })
}))