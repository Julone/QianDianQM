const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body');
const etag = require('koa-etag');
let staticEtag = require('koa-static-etag')
// error handler
onerror(app)
app.use(require('koa2-cors')());
app.use(koaBody({multipart:true}));
app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public', {
  maxAge: 10 * 1000,
  root: 'static'
}))

app.use(etag());

app.use(views(__dirname + '/views', {
  extension: 'ejs',
  options: {
    pretty:true,
  
  }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
const index = require('./routes/index')
const api_v1 = require('./routes/api_v1')
app.use(index.routes(), index.allowedMethods())
app.use(api_v1.routes(),api_v1.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
