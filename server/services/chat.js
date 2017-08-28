/**
 * 聊天业务操作
 */

const chatModel = require('./../models/chat')

const chatService = {

  /**
   * 创建用户
   * @param  {object} chat   聊天记录对象
   * @return {object}        创建结果
   */
  async create (chat) {
    let result = await chatModel.create(chat)
    return result
  },

  /**
   * 获取用户的所有聊天记录
   * @param {object} formData 查询条件
   */
  async getChatlogs (formData) {
    let resultData = await chatModel.getChatlogs(formData)
    return resultData
  },

  /**
   * 查询两个制定用户的消息
   * @param {object} formData 查询表单
   */
  async getChatByFromAndTo (formData) {
    let resultData = await chatModel.getChatByFromAndTo(formData)
    return resultData
  }

}

module.exports = chatService
