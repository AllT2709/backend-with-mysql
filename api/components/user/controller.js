const store = require('../../../store/mysql');

const TABLA='contacts';

function getContacts(idUser){
    return store.getContacts(TABLA,idUser)
}
function addContact(data){
    return new Promise((resolve,reject)=>{
        if(!data){
            reject('There was an error!!!');
        }
        resolve(store.addContact(TABLA,data));
    })
}
module.exports = {
    getContacts,
    addContact,
}
