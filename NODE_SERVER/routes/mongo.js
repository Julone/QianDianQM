const MongoClient = require('mongodb').MongoClient;
var {ObjectId} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
module.exports = {
    async db(){
        return await new Promise((res,rej) => {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
                var db = client.db('already');
                res(db);
            });
        })
    },
    async select({collection, filter={}, options = {}}){
        if(filter._id) filter._id = ObjectId(filter._id);
        var result = await new Promise(async (resolve,reject) => {
                var db = await this.db();
                db.collection(collection).find(filter,options).toArray((err,docs)=>{
                    return err? reject(err): resolve(docs);
                })
        }).then(docs=>({
            code: 200, data: docs
        })).catch(e=>({
            msg: e.errmsg,
            code: e.code,
            data: e
        }));
        return result;
    },
}
