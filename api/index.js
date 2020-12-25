///////ojo: no puedo ignorar(.gitignore) los archivos que estan guardados en el repositorio
//requerir paquetes
const express = require('express');
const passport = require('passport')
const app = express();
const auth = require('./components/auth/network')

require('dotenv').config();


//// middleware
app.use(express.json());
app.use(passport.initialize());
///routes
app.use('/auth',auth)

app.listen(process.env.PORT,()=>{
    console.log(`Listen on port ${process.env.PORT}`);
})