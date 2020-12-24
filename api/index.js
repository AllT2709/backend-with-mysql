//requerir paquetes
const express = require('express');
const app = express();
const auth = require('./components/auth/network')

const connectDB=require('../network/db')

require('dotenv').config();
///connect database
connectDB(
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASS
    )

//// middleware

///routes
app.use('/',auth)

app.listen(process.env.PORT,()=>{
    console.log(`Listen on port ${process.env.PORT}`);
})