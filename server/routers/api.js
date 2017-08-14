/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')
const messageInfoController = require('./../controllers/message-info')

const routers = router
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signup', userInfoController.signUp)
  .post('/message/add', messageInfoController.add)
  .post('/message/getMessages', messageInfoController.getMessages)
  .post('/message/upload', messageInfoController.upload)

module.exports = routers
