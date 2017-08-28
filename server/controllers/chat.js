const chatService = require('./../services/chat')
const chatCode = require('./../codes/chat')
const moment = require('moment')
moment.locale('zh-CN')

const chatController = {

  /**
   * 添加聊天
   * @param {object} ctx 上下文环境
   */
  async add (ctx) {
    let formData = ctx.request.body
    console.log('chatController.add - formData: ', JSON.stringify(formData))
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    // 数据合法性校验
    // let validateResult = chatService.validatorAdd(formData)
    // if (validateResult.success === false) {
    //   result.message = validateResult.message
    //   ctx.body = result
    //   return
    // }

    // 插入数据库
    let insertResult = await chatService.create({
      from: formData.userId,
      to: formData.targetUserId,
      chatlog: formData.content,
      timeline: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    if (insertResult && parseInt(insertResult.insertId) > 0) {
      result.code = 0
      result.message = chatCode.SUCCESS
    } else {
      result.message = chatCode.ERROR_CREATE
    }

    ctx.body = result
  },

  /**
   * 获取我的所有聊天信息
   * @param {object} ctx 上下文环境
   */
  async getChatlogs (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: null
    }

      // 从数据库取聊天记录
    let chatResult = await chatService.getChatlogs({
      userId: formData.userId,
      pageIndex: formData.pageIndex || 0,
      pageSize: formData.pageSize || 10
    })

    console.log('chatController.getChatlogs - chatResult: ', JSON.stringify(chatResult))

    if (chatResult && chatResult.length * 1 > 0) {
      result.code = 0
      result.message = chatCode.SUCCESS
      result.data = chatResult
    } else {
      result.message = chatCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 查询两个制定用户的消息
   * @param {object} formData 查询表单
   */
  async getChatByFromAndTo (ctx) {
    let formData = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: null
    }

    // 从数据库取聊天记录
    let chatResult = await chatService.getChatByFromAndTo({
      userId: formData.userId,
      targetUserId: formData.targetUserId,
      pageIndex: formData.pageIndex || 0,
      pageSize: formData.pageSize || 10
    })

    console.log('chatController.getChatByFromAndTo - chatResult: ', JSON.stringify(chatResult))

    if (chatResult && chatResult.length * 1 > 0) {
      result.code = 0
      result.message = chatCode.SUCCESS
      result.data = chatResult
    } else {
      result.message = chatCode.ERROR_SYS
    }

    ctx.body = result
  }
}

module.exports = chatController
