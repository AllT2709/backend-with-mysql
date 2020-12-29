///////ojo: no puedo ignorar(.gitignore) los archivos que estan guardados en el repositorio
//requerir paquetes
const express = require('express');
const passport = require('passport')
const app = express();
const auth = require('./components/auth/network');
const contact = require('./components/user/network');

require('dotenv').config();


//// middleware
app.use(express.json());
app.use(passport.initialize());
///routes
app.use('/auth',auth);
app.use('/api',contact);


///Server
app.listen(process.env.PORT,()=>{
    console.log(`Listen on port ${process.env.PORT}`);
})