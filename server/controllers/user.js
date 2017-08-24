const userService = require('./../services/user')
const tagService = require('./../services/tag')
const userCode = require('./../codes/user')
const wechatUtil = require('./../utils/wechat-util')
const uuidUtil = require('./../utils/uuid')
const MysqlStore = require('./../utils/mysqlStore')
const moment = require('moment')

const mysqlStore = new MysqlStore()
moment.locale('zh-CN')

const userController = {

  /**
   * 认证操作
   * @param  {obejct} ctx 上下文对象
   */
  async auth (ctx) {
    console.log('userController.auth - session: ', JSON.stringify(ctx.session))
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // 数据合法性校验
    let validateResult = userService.validatorAuth(formData)
    if (validateResult.success === false) {
      result.message = validateResult.message
      ctx.body = result
      return
    }

    // 根据登录码从腾讯服务器获取openid和session_key
    await wechatUtil.code2session(formData.loginCode)
      .then(res => {
        console.log('userController.auth code2session:', JSON.stringify(res))
        formData.openid = res.openid
        formData.session_key = res.session_key
        formData.expires_in = res.expires_in
      })
      .catch(err => {
        throw new Error(err)
      })

    // 判断用户是否已存在于数据库
    let existOne = await userService.getExistOne(formData)
    console.log('userController.auth existOne: ', JSON.stringify(existOne))

    if (existOne) {
      // 已注册

      if (ctx.session.openid) {
        // 已登录
        // 获取session
        let sessionResult = await mysqlStore.get(ctx.session['USER_SID'])

        // result.data.session = sessionResult // TODO: 生产环境要删除
      } else {
        // 未登录或登录过期
        // ctx.session = {
        //   openid: formData.openid,
        //   WECHAT_SESSION: formData.session_key
        // }
        let USER_SID = uuidUtil.uuidV4()
        console.log('uuid: ', USER_SID)
        let sessionResult = await mysqlStore.set(
          'USER_SID:' + USER_SID,
          {
            openid: formData.openid,
            WECHAT_SESSION: formData.session_key
          },
          30 * 60 * 1000
        )

        result.data.sessionId = USER_SID
      }

      result.code = 0
      result.message = userCode.SUCCESS
      result.data.userId = existOne.id
    } else {
      // 未注册，去注册
      let userResult = await userService.create({
        openid: formData.openid,
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        level: 2
      })

      if (userResult && userResult.insertId * 1 > 0) {
        // 添加到数据库成功
        // ctx.session = {
        //   openid: formData.openid,
        //   WECHAT_SESSION: formData.session_key
        // }

        let USER_SID = uuidUtil.uuidV4()
        console.log('uuid: ', USER_SID)
        let sessionResult = await mysqlStore.set(
          'USER_SID:' + USER_SID,
          {
            openid: formData.openid,
            WECHAT_SESSION: formData.session_key
          },
          30 * 60 * 1000
        )

        result.data.sessionId = USER_SID
        result.code = 0
        result.message = userCode.SUCCESS
        result.data.userId = userResult.insertId
      } else {
        result.message = userCode.ERROR_SYS
      }
    }
    console.log('userController.auth - session(end): ', JSON.stringify(ctx.session))
    ctx.body = result
  },

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: null
    }

    let userResult = await userService.signIn(formData)

    if (userResult) {
      if (formData.wechat === userResult.wechat) {
        result.code = 0
      } else {
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
      }
    } else {
      result.message = userCode.FAIL_USER_NO_EXIST
    }

    if (formData.source === 'form' && result.code === 0) {
      let session = ctx.session
      session.isLogin = true
      session.wechat = userResult.wechat
      session.userId = userResult.id

      ctx.redirect('/work')
    } else {
      ctx.body = result
    }
  },

  /**
   * 更新用户信息
   * @param   {obejct} ctx 上下文对象
   */
  async update (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    console.log('userController.update - ctx.session: ', JSON.stringify(ctx.session))
    // 将openid添加到表单
    formData.openid = ctx.session.openid

    // 校验数据合法性
    // let validateResult = userService.validatorUpdate(formData)
    // if (validateResult.success === false) {
    //   result.message = validateResult.message
    //   ctx.body = result
    //   return
    // }

    // 将tag数组转化为tag对应的id数组
    let tagNameArray = [] // 用于保存tagName的数组
    let tagIdSet = new Set()   // 用于保存tagId的数组
    if (Array.isArray(formData.tag)) {
      tagNameArray = formData.tag
    } else if ((formData.tag instanceof String) && Array.isArray(JSON.parse(formData.tag))) {
      tagNameArray = JSON.parse(formData.tag)
    } else {
      result.message = userCode.ERROR_TAG_FORMAT
      ctx.body = result
      return
    }

    tagNameArray.forEach(function (tagName) {
      let findResult = await tagService.getTagByTagName(tagName)
      if (findResult) {
        let result = await tagService.update(tagName)
        tagIdSet.add(result.id || result.insertId)
      } else {
        let result = await tagService.create(tagName)
        tagIdSet.add(result.id || result.insertId)
      }
    })

    console.log('userController.update - tagIdSet: ', JSON.stringify(tagIdSet))
    // formData.tag = new Array(tagIdSet)

    // 更新数据库
    let userResult = await userService.update({
      id: formData.userId,
      nick: formData.nick,
      gender: formData.gender,
      language: formData.language,
      city: formData.city,
      province: formData.province,
      country: formData.country,
      avatar: formData.avatar,
      tag: formData.tag,
      modified_time: moment().format('YYYY-MM-DD HH:mm:ss')
    })

    console.log('userController.update - updateResult: ', JSON.stringify(userResult))

    if (userResult && userResult.affectedRows * 1 > 0) {
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
  async getUserInfo (ctx) {
    let formData = ctx.request.body
    console.log('userController.getUserInfo - session=', JSON.stringify(ctx.session))

    let result = {
      code: -1,
      message: userCode.ERROR_SYS,
      data: null
    }
    // if (ctx.session && ctx.session.openid) {
    let userInfo = await userService.getUserInfoByUserId(formData.userId)
    if (userInfo) {
      result = {
        code: 0,
        message: userCode.SUCCESS,
        data: userInfo
      }
    } else {
      result.message = userCode.FAIL_USER_NO_LOGIN
    }
    // } else {
    //   result.message = userCode.FAIL_USER_NO_LOGIN
    // }

    ctx.body = result
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin (ctx) {
    let result = {
      code: -1,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null
    }
    let session = ctx.session
    if (session && session.isLogin === true) {
      result.code = 0
      result.message = userCode.SUCCESS_WAS_LOGIN
    }
    return result
  }

}

module.exports = userController
