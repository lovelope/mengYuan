/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')
const messageInfoController = require('./../controllers/message-info')

const routers = router
  .get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signup', userInfoController.signUp)
  .post('/message/add', messageInfoController.add)

module.exports = routers
