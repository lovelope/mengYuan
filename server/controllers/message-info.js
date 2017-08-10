const messageInfoService = require('./../services/message-info')
const messageCode = require('./../codes/message')
const userCode = require('./../codes/user')
const dateTime = require('./../utils/datetime')

module.exports = {

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin (ctx) {
    let result = {
      success: false,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN'
    }
    let session = ctx.session
    if (session && session.isLogin === true) {
      result.success = true
      result.message = ''
      result.code = ''
    }
    return result
  },

  /**
   * 添加消息操作
   * @param   {obejct} ctx 上下文对象
   */
  async _add (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    let validateResult = messageInfoService.validatorCreateMessage(formData)

    if (validateResult.success === false) {
      result.message = validateResult.message
      ctx.body = result
      return
    }

    let messageResult = await messageInfoService.create({
      wechat: formData.wechat,
      type: formData.type,
      title: formData.title || '',
      topic: formData.topic || '',
      content: formData.content,
      publish_time: dateTime.getNowDatetime(),
      level: 2
    })

    console.log(messageResult)

    if (messageResult && messageResult.insertId * 1 > 0) {
      result.code = 0
      result.message = messageCode.SUCCESS
    } else {
      result.message = messageCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async add (ctx) {
    let session = ctx.session
    let isLogin = session.isLogin
    let userName = session.userName

    console.log('session=', session)

    let result = {
      code: -1,
      message: '',
      data: {}
    }
    if (isLogin === true && userName) {
      result = await this._add(ctx)
    } else {
      result.message = userCode.FAIL_USER_NO_LOGIN
    }

    ctx.body = result
  }

}
