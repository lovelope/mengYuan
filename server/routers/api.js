/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')
const messageInfoController = require('./../controllers/message-info')

const routers = router
  // .post('/user/signIn.json', userInfoController.signIn)
  // .post('/user/signup', userInfoController.signUp)
  .post('/user/auth', userInfoController.auth)
  .post('/user/update', userInfoController.update)
  .post('/message/add', messageInfoController.add)
  .post('/message/getMessages', messageInfoController.getMessages)
  .post('/message/getMessageByWechat', messageInfoController.getMessageByWechat)
  .post('/message/getMessageByWechatAndType', messageInfoController.getMessageByWechatAndType)
  .post('/message/getMessageByType', messageInfoController.getMessageByType)
  .post('/message/getMessageByTime', messageInfoController.getMessageByTime)
  .post('/message/deleteMessageByMid', messageInfoController.deleteMessageByMid)
  .post('/message/upload', messageInfoController.upload)

module.exports = routers
