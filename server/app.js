const path = require('path')
const Koa = require('koa')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const ALL_CONFIG = require('./../config')
const routers = require('./routers/index')

const app = new Koa()

// session存储配置
const sessionMysqlConfig = {
  user: ALL_CONFIG.DB.USERNAME,
  password: ALL_CONFIG.DB.PASSWORD,
  database: ALL_CONFIG.DB.DATABASE,
  host: ALL_CONFIG.DB.HOST
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname, './../static')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 打印请求体
app.use(async (ctx, next) => {
  console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)
  await next()
})

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(ALL_CONFIG.API_SERVER_PORT)
console.log(`the server is start at port ${ALL_CONFIG.API_SERVER_PORT}`)
