const mongodb=require('mongodb');


const mongoclient=mongodb.MongoClient;

let _db;

const mongoConnect=callback =>{
    mongoclient.connect('mongodb+srv://jashankot20:yu6Kb0f8G086NWnR@cluster1.ca0kvyn.mongodb.net/shop?retryWrites=true&w=majority')
.then(client=>{
    _db= client.db()
    console.log('connected');
    callback(client);
})
.catch(err =>{
    console.log(err);
    throw err;  
})
}

const getDb =() =>{
    if(_db){
        return _db;
    }
    throw 'no database exist';
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;

