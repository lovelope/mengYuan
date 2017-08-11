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
  .post('/message/getMessages', messageInfoController.getMessages)
/*   .post('*', () => {
    return {
      code: -2,
      message: '未知接口',
      data: {}
    }
  }) */

module.exports = routers
