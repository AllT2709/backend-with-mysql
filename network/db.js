const mysql = require('mysql');

async function connect(host,user,pass){
    let con = await mysql.createConnection({
        host:host,
        user:user,
        password:pass
    });

    con.connect((err)=>{
        if(err){
            throw err
        }
        console.log('DB Connected!');
    })
}

module.exports= connect;