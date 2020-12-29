const ConnectionDB = require('../network/db');

 function addContact(tabla, data) {
    return new Promise((resolve,reject)=>{
        let query = `INSERT INTO ${tabla}(user_id,name,number) VALUES ?`;
        ConnectionDB.query(query, [data], (err, result) => {
            if(err){
                reject(err)
            }else{
                console.log('new user ==>' + data);
                console.log('result===>'+result);
                resolve(data);
            }
       })

    })
}
function getContacts(tabla,idUser){
    return new Promise((resolve,reject)=>{
        let query = `SELECT * FROM ${tabla} WHERE user_id= ${idUser}`;
        ConnectionDB.query(query,(err,data)=>{
            if(err){
                reject(err);
            }else{
                console.log(...data);
                console.log('data ==>'+data[0]);
                resolve(data)
            }
        })
    })
}

module.exports = {
    addContact,
    getContacts,
}