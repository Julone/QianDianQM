const router = require('koa-router')()
const MongoClient = require('mongodb').MongoClient;
var {ObjectId} = require('mongodb')
var {mongoURL: url} = require('./config')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2! This is API website'
  })
})

router.get('/preview', async(ctx) => {
  var insertedID = ctx.request.query.insertedID || '5e7b0db35750c74f10322c91';
  if(insertedID.length != 24) return ;
  let rs = await new Promise((res,rej) => {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected successfully to server");
      var db = client.db('already');
      db.collection('preview').findOne({_id: ObjectId(insertedID)},{}, (err,rs) =>{
        if(err) rej(err)
        res(rs);
      })
    })
  }).then(r=>r).catch(e=>{
    console.log(e);
  })
  console.log(rs);
  await ctx.render('preview', {
    code: 200,
    msg: 'got',
    data:rs
  });
})
router.get('/template', async(ctx) => {
  var insertedID = ctx.request.query.templateID ;
  if(insertedID.length != 24) return ;
  let rs = await new Promise((res,rej) => {
    MongoClient.connect(url, function(err, client) {
      console.log("Connected successfully to server");
      var db = client.db('already');
      db.collection('template').findOne({_id: ObjectId(insertedID)},{}, (err,rs) =>{
        if(err) rej(err)
        res(rs);
      })
    })
  }).then(r=>r).catch(e=>{
    console.log(e);
  })
  console.log(rs);
  await ctx.render('template', {
    code: 200,
    msg: 'got',
    data:rs.data.box.boxList
  });
})

module.exports = router
