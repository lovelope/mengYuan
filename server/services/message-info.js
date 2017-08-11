/**
 * 消息业务操作
 */

const messageModel = require('./../models/message-info')
const messageCode = require('./../codes/message')

const message = {

  /**
   * 创建消息
   * @param  {object} message   消息对象
   * @return {object}           创建结果
   */
  async create (message) {
    let result = await messageModel.create(message)
    return result
  },

  /**
   * 获取n条消息
   * @param  {object} formData  查找的表单数据
   * @return {array}      查找结果
   */
  async getMessages (formData) {
    let resultData = await messageModel.getMessages({
      'pageIndex': formData.pageIndex,
      'pageSize': formData.pageSize
    })
    return resultData
  },

  /**
   * 根据微信号查找消息
   * @param  {object} formData  查找的表单数据
   * @return {array}      查找结果
   */
  async getMessageByWechat (formData) {
    let resultData = await messageModel.getMessageByWechat({
      'wechat': formData.wechat
    })
    return resultData
  },

  /**
   * 根据时间段查找消息
   * @param  {object} formData 查找的表单数据
   * @return {array}          查找结果
   */
  async getMessageByTime (formData) {
    let resultData = await messageModel.getMessageByTime({
      'start_time': formData.start_time,
      'end_time': formData.end_time})
    return resultData
  },

  /**
   * 根据类型查找某人的消息
   * @param  {object} formData 查找的表单数据
   * @return {array}          查找结果
   */
  async getMessageByWechatAndType (formData) {
    let resultData = await messageModel.getMessageByWechatAndType({
      'wechat': formData.wechat,
      'type': formData.type
    })
    return resultData
  },

  /**
   * 根据类型查找消息
   * @param  {object} formData 查找的表单数据
   * @return {array}          查找结果
   */
  async getMessageByType (formData) {
    let resultData = await messageModel.getMessageByType({
      'type': formData.type
    })
    return resultData
  },

  /**
   * 检验用户上传的消息数据
   * @param  {object} messageInfo 用户上传的消息数据
   * @return {object}          校验结果
   */
  validatorCreateMessage (messageInfo) {
    let result = {
      success: false,
      message: ''
    }

    if (!/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(messageInfo.wechat)) {
      result.message = messageCode.ERROR_WECHAT
      return result
    }

    if (!/^(String|Picture|Video)$/.test(messageInfo.type)) {
      result.message = messageCode.ERROR_MESSAGE_TYPE
      return result
    }

    if (!/^[a-zA-Z0-9\u4E00-\u9FA5]{, 1431655760}$/.test(messageInfo.content)) {
      result.message = messageCode.ERROR_NATURE
      return result
    }

    result.success = true

    return result
  }

}

module.exports = message
