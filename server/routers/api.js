/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('./../controllers/user')
const messageController = require('./../controllers/message')

const routers = router
  // .post('/user/signIn.json', userController.signIn)
  // .post('/user/signup', userController.signUp)
  .post('/user/auth', userController.auth)
  .post('/user/update', userController.update)
  .post('/message/add', messageController.add)
  .post('/message/getMessages', messageController.getMessages)
  .post('/message/getMessageByUserId', messageController.getMessageByUserId)
  .post('/message/getMessageByUserIdAndType', messageController.getMessageByUserIdAndType)
  .post('/message/getMessageByType', messageController.getMessageByType)
  .post('/message/getMessageByTime', messageController.getMessageByTime)
  .post('/message/deleteMessageByMid', messageController.deleteMessageByMid)
  .post('/message/upload', messageController.upload)

module.exports = routers
