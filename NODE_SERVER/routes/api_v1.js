var router = require('koa-router')({prefix: '/api'});
var fs = require('fs');
var path = require('path')
var imageSize = require('image-size')
const MongoClient = require('mongodb').MongoClient;
var {ObjectId} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
router.get('/', ctx =>  {
    ctx.body ='fsd'
})
router.post('/action/upload', async ctx => {
    try {
        const file = ctx.request.files.file;
        var date = new Date();
        var todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        var filename = file.size + "-" + file.name;
        // 创建可读流
        let filePath = path.join(__dirname, './../public/upload/', todayDate + '/' + filename);
        const fileDir = path.join(__dirname, './../public/upload/', todayDate);
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir);
        }


        const upStream = fs.createWriteStream(filePath);
        const render = fs.createReadStream(file.path).pipe(upStream);
        console.log(filePath);
        let data = await new Promise(res=>{
            upStream.on('close',function () {
                let imgInfo = {
                    url: '/upload/' + todayDate + '/' + filename,
                    ...imageSize(filePath)
                }
                res(imgInfo)
            })


        })
        ctx.body = {
            code: 200,
            msg: '上传图片成功!',
            data: data
        }

    }
    catch (e) {
        console.log(e);
    }
});
router.post('/postPreviewData',async ctx => {
    var data = ctx.request.body.data || [];
    if(!Array.isArray(data)) data = JSON.parse(data)
    console.log(data);
    let rs = await new Promise((res,rej) => {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            var db = client.db('already');
            db.collection('preview').insertOne({data: data},(err,rs)=>{
                if(err) rej(err);
                res(rs);
            })
        });
    })
    ctx.body = {
        code: 200,
        msg: '数据保存成功',
        insertedID: rs.insertedId
    }
});
router.get('/getPreviewData',async ctx => {
    try{
        var insertedID = ctx.request.query.insertedID || '';
        let rs = await new Promise((res,rej) => {
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");
                var db = client.db('already');
                db.collection('preview').findOne({_id: ObjectId(insertedID)},{}, (err,rs) =>{
                    rs.data.forEach((el)=>{
                        el.bgUrl.url = el.bgUrl.url.replace('/api/',"http://192.168.36.119:3000/")
                        el.lunboList.forEach(lb => {
                            lb.image = lb.image.replace('/api/',"http://192.168.36.119:3000/")
                        });
                        delete el.previewURL;
                        switch (el.type) {
                            case 'block': delete el.lunboList;delete el.lunboConfig;delete el.videoInfo;break
                            case 'lunbo': delete el.bgUrl;delete el.mapList;
                            delete el.videoInfo;break
                            case 'video': delete el.lunboList;delete el.lunboConfig;delete el.bgUrl;delete el.mapList;break
                        }
                        return el;
                    })
                    res(rs.data);
                })
            });
        })
        ctx.body = {
            code: 200,
            msg: 'got',
            data:rs
        }
    }
    catch(e){
        ctx.body  = {code:23}
    }
});
router.post('/postTemplateData',async ctx => {
    var data = ctx.request.body.data || {};
    var title = ctx.request.body.title;
    var addTime = new Date();
    let rs = await new Promise((res,rej) => {
        MongoClient.connect(url, function(err, client) {
            var db = client.db('already');
            db.collection('template').insertOne({data,title,addTime},(err,rs)=>{
                if(err) rej(err);
                res(rs);
            })
        });
    })
    ctx.body = {
        code: 200,
        msg: '数据保存成功',
        templateID: rs.insertedId
    }
});
router.post('/updateTemplate',async ctx => {
    var data = ctx.request.body.data || {};
    var templateID = ctx.request.body.templateID;
    var updateTime = new Date();
    var rs = await new Promise((res,rej) => {
        MongoClient.connect(url, function(err, client) {
            var db = client.db('already');
            db.collection('template').findOneAndUpdate({
                _id: ObjectId(templateID)
            },{
                $set:{
                    data,
                    updateTime
                }
            },(err,rs)=>{
                if( err || !(rs.lastErrorObject.updatedExisting) ){
                    rej(-1)
                }else{
                    res(rs)
                }
            })
        })
    }).then(r=>{
        return {
            code: 200,
            newData: r.value,
            msg: '更新成功'
        }
    }).catch(e=>{
        return {
            code: 110,
            msg: '更新失败'
        }
    });
    console.log(rs);
    ctx.body = rs;
});
router.get('/getTemplateData',async ctx => {
    try{
        var insertedID = ctx.request.query.templateID || '5e7da15c03949552d010da63';
        let rs = await new Promise((res,rej) => {
            MongoClient.connect(url, function(err, client) {

                var db = client.db('already');
                db.collection('template').findOne({_id: ObjectId(insertedID)},{}, (err,rs) =>{
                    res(rs);
                })
            });
        })

        ctx.body = {
            code: 200,
            msg: 'gotten',
            data: rs.data,
            templateID: rs._id,
        }
    }
    catch(e){
        ctx.body  = {code:23}
    }
});
router.get('/getTemplateList',async ctx => {
    try{
        let rs = await new Promise((res,rej) => {
            MongoClient.connect(url, function(err, client) {
                var db = client.db('already');
                db.collection('template').find({},{
                    projection:{
                        _id:1,
                        title:1,
                        addTime:1
                    },
                    sort:{
                        addTime: -1
                    }
                }).toArray((err,doc)=>{
                    console.log(err,doc);
                    if(err) rej([])
                    res(doc);
                })
            });
        })
        ctx.body = {
            code: 200,
            msg: 'gotten',
            data: rs,
        }
    }
    catch(e){
        ctx.body  = {code:23}
    }
});
router.post('/removeTemplateByID', async ctx => {
    try{
        var templateID = ctx.request.query.templateID;
        let rs = await new Promise((res,rej) => {
            MongoClient.connect(url, function(err, client) {
                var db = client.db('already');
                db.collection('template').deleteOne({
                    _id: ObjectId(templateID)
                },{}, (err,rs) => {
                    if(err) rej(-1);
                    res(1)
                })
            });
        })
        ctx.body = {
            code: 200,
            msg: 'ok'
        }
    }
    catch(e){
        ctx.body  = {code:23}
    }
});
router.get('/getShopitemList', async ctx => {
    var {curPage = 1, limit = 10, brand = '', skuId, queryString} = ctx.request.query;
    var filter = {};
    console.log(skuId);
    if( skuId != undefined){
        limit = 1000;
        filter.skuId = {$in:skuId.split(',')}
        console.log(filter);
    }else if(queryString != ''){
        limit = 1000;
        filter.skuId = new RegExp(queryString);
    }else {
        filter.brand = new RegExp(brand);
        if(limit == -1) limit = 1000;
    }
    var s = await require('./mongo').select({
        collection: 'shopitem',
        filter,
        options:{
            limit: limit / 1,
            skip: ((curPage - 1) * limit) / 1,
            projection: ['_id', 'skuId','name','img','price']
        }

    });
    s.total = await require('./mongo').db().then(async r=>{
        return await new Promise((res,rej)=>{
            r.collection('shopitem').countDocuments(filter,{}).then(r=>{
                res(r);
            }).catch(e=>{
                rej(e)
            })
        })
    }).catch(e=>e);
    ctx.body = Object.assign(s, {curPage,limit,brand,_: new Date().toLocaleString()});
})

module.exports = router;
