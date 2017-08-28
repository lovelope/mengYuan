/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('./../controllers/user')
const messageController = require('./../controllers/message')
const chatController = require('./../controllers/chat')

const routers = router
  // 用户相关路由
  .post('/user/auth', userController.auth)
  .post('/user/update', userController.update)
  .post('/user/recommend', userController.recommend)
  .post('/user/getUserInfo', userController.getUserInfo)
  .post('/user/getFriends', userController.getFriends)   // 萌友

  // 消息动态相关路由
  .post('/message/add', messageController.add)
  .post('/message/getMessages', messageController.getMessages)
  .post('/message/getMessageByUserId', messageController.getMessageByUserId)
  .post('/message/getMessageByUserIdAndType', messageController.getMessageByUserIdAndType)
  .post('/message/getMessageByType', messageController.getMessageByType)
  .post('/message/getMessageByTime', messageController.getMessageByTime)
  .post('/message/deleteMessageByMid', messageController.deleteMessageByMid)
  .post('/message/upload', messageController.upload)

  // 聊天记录相关路由
  .post('/chat/add', chatController.add)
  .post('/chat/getChatlogs', chatController.getChatlogs)
  .post('/chat/getChatByFromAndTo', chatController.getChatByFromAndTo)

module.exports = routers
