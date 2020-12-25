const mysql = require('mysql');

require('dotenv').config();
//async function connect(host,user,pass,db){
    var con = mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME
    });

    con.connect((err)=>{
        if(err){
            throw err
        }
        console.log('DB Connected!');
    })
//}

module.exports= con;