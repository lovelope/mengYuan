const userInfoService = require('./../services/user-info')
const userCode = require('./../codes/user')
const dateTime = require('./../utils/datetime')

module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn (ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }

    let userResult = await userInfoService.signIn(formData)

    if (userResult) {
      if (formData.userName === userResult.name) {
        result.success = true
      } else {
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      result.code = 'FAIL_USER_NO_EXIST'
      result.message = userCode.FAIL_USER_NO_EXIST
    }

    if (formData.source === 'form' && result.success === true) {
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult.id

      ctx.redirect('/work')
    } else {
      ctx.body = result
    }
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    let validateResult = userInfoService.validatorSignUp(formData)

    if (validateResult.success === false) {
      result.message = validateResult.message
      ctx.body = result
      return
    }

    let existOne = await userInfoService.getExistOne(formData)
    console.log(existOne)

    if (existOne) {
      if (existOne.wechat === formData.wechat) {
        result.message = userCode.FAIL_WECHAT_IS_EXIST
        ctx.body = result
        return
      }
      if (existOne.email === formData.email) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }

    let userResult = await userInfoService.create({
      wechat: formData.wechat,
      gender: formData.gender,
      nature: formData.nature,
      expect: formData.expect,
      create_time: dateTime.getNowDatetime(),
      level: 2
    })

    console.log(userResult)

    if (userResult && userResult.insertId * 1 > 0) {
      result.code = 0
      result.message = userCode.SUCCESS
    } else {
      result.message = userCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo (ctx) {
    let session = ctx.session
    let isLogin = session.isLogin
    let userName = session.userName

    console.log('session=', session)

    let result = {
      success: false,
      message: '',
      data: null
    }
    if (isLogin === true && userName) {
      let userInfo = await userInfoService.getUserInfoByUserName(userName)
      if (userInfo) {
        result.data = userInfo
        result.success = true
      } else {
        result.message = userCode.FAIL_USER_NO_LOGIN
      }
    } else {
      // TODO
    }

    ctx.body = result
  },

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
  }

}
