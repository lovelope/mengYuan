const messageController = require('./../services/message')
const messageCode = require('./../codes/message')
const userController = require('./user') // 检验用户是否登录
const uploadUtil = require('./../utils/upload')
const moment = require('moment')
moment.locale('zh-CN')

module.exports = {

  /**
   * 添加消息操作
   * @param   {obejct} ctx 上下文对象
   */
  async add (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // // 检验是否登录
    // let validateLoginResult = userController.validateLogin(formData)
    // if (validateLoginResult.code === -1) {
    //   result.message = validateLoginResult.message
    //   ctx.body = result
    //   return
    // }

    // 校验数据合法性
    let validateResult = messageController.validatorCreateMessage(formData)
    if (validateResult.success === false) {
      result.message = validateResult.message
      ctx.body = result
      return
    }

    // 添加数据到数据库
    let messageResult = await messageController.create({
      userId: formData.userId,
      type: formData.type || 'String',
      title: formData.title || '',
      topic: formData.topic || '',
      content: formData.content,
      publish_time: moment().format('YYYY-MM-DD HH:mm:ss')
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
   * 上传文件操作
   * @param   {obejct} ctx 上下文对象
   */
  async upload (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // 检验是否登录
    let validateLoginResult = userController.validateLogin(formData)
    if (validateLoginResult.code === -1) {
      result.message = validateLoginResult.message
      ctx.body = result
      return
    }

    // // 校验数据合法性
    // let validateResult = messageController.validatorUpload(formData)
    // if (validateResult.success === false) {
    //   result.message = validateResult.message
    //   ctx.body = result
    //   return
    // }

    let uploadResult = await uploadUtil.upload(ctx)
    // 添加数据到数据库
    if (uploadResult.code === 0) {
      let messageResult = await messageController.create({
        userId: formData.userId,
        type: formData.type,
        title: formData.title || '',
        topic: formData.topic || '',
        content: uploadResult.data.content,
        publish_time: moment().format('YYYY-MM-DD HH:mm:ss')
      })

      console.log(messageResult)

      if (messageResult && messageResult.insertId * 1 > 0) {
        result.code = 0
        result.message = messageCode.SUCCESS
      } else {
        result.message = messageCode.ERROR_SYS
      }

      ctx.body = result
    } else {
      ctx.body = uploadResult
    }
  },

    /**
     * 获取所有消息操作
     * @param   {obejct} ctx 上下文对象
     */
  async getMessages (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: null
    }

      // 从数据库取消息
    let messageResult = await messageController.getMessages({
      pageIndex: formData.pageIndex || 0,
      pageSize: formData.pageSize || 10
    })

    console.log(messageResult)

    if (messageResult && messageResult.length * 1 > 0) {
      result.code = 0
      result.message = messageCode.SUCCESS
      result.data = messageResult
    } else {
      result.message = messageCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取某用户消息操作
   * @param   {obejct} ctx 上下文对象
   */
  async getMessageByUserId (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // // 检验是否登录
    // let validateLoginResult = userController.validateLogin(formData)
    // if (validateLoginResult.code === -1) {
    //   result.message = validateLoginResult.message
    //   ctx.body = result
    //   return
    // }

    // 从数据库取消息
    let messageResult = await messageController.getMessageByUserId({
      userId: formData.targetUserId,        // targetUserId => userId
      pageIndex: formData.pageIndex || 0,
      pageSize: formData.pageSize || 10
    })

    console.log(messageResult)

    if (messageResult && messageResult.length * 1 > 0) {
      result.code = 0
      result.message = messageCode.SUCCESS
      result.data = messageResult
    } else {
      result.message = messageCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取某类消息操作
   * @param   {obejct} ctx 上下文对象
   */
  async getMessageByType (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // // 检验是否登录
    // let validateLoginResult = userController.validateLogin(formData)
    // if (validateLoginResult.code === -1) {
    //   result.message = validateLoginResult.message
    //   ctx.body = result
    //   return
    // }

    // 从数据库取消息
    let messageResult = await messageController.getMessageByType({
      type: formData.type,
      pageIndex: formData.pageIndex || 0,
      pageSize: formData.pageSize || 10
    })

    console.log(messageResult)

    if (messageResult && messageResult.length * 1 > 0) {
      result.code = 0
      result.message = messageCode.SUCCESS
      result.data = messageResult
    } else {
      result.message = messageCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取某用户的某类消息操作
   * @param   {obejct} ctx 上下文对象
   */
  async getMessageByUserIdAndType (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // // 检验是否登录
    // let validateLoginResult = userController.validateLogin(formData)
    // if (validateLoginResult.code === -1) {
    //   result.message = validateLoginResult.message
    //   ctx.body = result
    //   return
    // }

    // 从数据库取消息
    let messageResult = await messageController.getMessageByUserIdAndType({
      userId: formData.targetUserId,      // targetUserId => userId
      type: formData.type,
      pageIndex: formData.pageIndex || 0,
      pageSize: formData.pageSize || 10
    })

    console.log(messageResult)

    if (messageResult && messageResult.length * 1 > 0) {
      result.code = 0
      result.message = messageCode.SUCCESS
      result.data = messageResult
    } else {
      result.message = messageCode.ERROR_SYS
    }

    ctx.body = result
  },

    /**
   * 获取时间段内消息操作
   * @param   {obejct} ctx 上下文对象
   */
  async getMessageByTime (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // // 检验是否登录
    // let validateLoginResult = userController.validateLogin(formData)
    // if (validateLoginResult.code === -1) {
    //   result.message = validateLoginResult.message
    //   ctx.body = result
    //   return
    // }

    // 从数据库取消息
    let messageResult = await messageController.getMessageByTime({
      start_time: formData.start_time,
      end_time: formData.end_time,
      pageIndex: formData.pageIndex || 0,
      pageSize: formData.pageSize || 10
    })

    console.log(messageResult)

    if (messageResult && messageResult.length * 1 > 0) {
      result.code = 0
      result.message = messageCode.SUCCESS
      result.data = messageResult
    } else {
      result.message = messageCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 通过mid删除一条消息
   * @param   {obejct} ctx 上下文对象
   */
  async deleteMessageByMid (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // // 检验是否登录
    // let validateLoginResult = userController.validateLogin(formData)
    // if (validateLoginResult.code === -1) {
    //   result.message = validateLoginResult.message
    //   ctx.body = result
    //   return
    // }

    // 从数据库删除消息
    let messageResult = await messageController.deleteMessageByMid({
      userId: formData.userId,
      mid: formData.mid
    })

    console.log(messageResult)

    if (messageResult.changedRows > 0) {
      result.code = 0
      result.message = messageCode.SUCCESS
    } else {
      result.message = messageCode.ERROR_SYS
    }

    ctx.body = result
  }
}
