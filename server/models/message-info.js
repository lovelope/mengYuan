const dbUtils = require('./../utils/db-util')

const message = {

  /**
   * 数据库创建消息
   * @param  {object} model 消息数据模型
   * @return {object}       mysql执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('message', model)
    return result
  },

  /**
   * 查找n条消息
   * @param  {obejct} options 查找条件参数
   * @return {[]}             查找结果
   */
  async getMessages (options) {
    let startIndex = parseInt(options.pageIndex)*parseInt(options.pageSize)
    let endIndex = parseInt(options.pageSize)
    let _sql = `
    SELECT wechat, publish_time, title, topic, type, content
      FROM message
      LIMIT ${startIndex}, ${endIndex}`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
    } else {
      result = []
    }
    return result
  },

  /**
   * 根据微信号查找消息
   * @param  {obejct} options 查找条件参数
   * @return {[]}             查找结果
   */
  async getMessageByWechat (options) {
    let _sql = `
    SELECT * FROM message
      WHERE wechat="${options.wechat}"
      LIMIT "${options.pageIndex}*${options.pageSize}", "${options.pageSize}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
    } else {
      result = []
    }
    return result
  },

  /**
   * 根据消息ID查找消息
   * @param  {object} options 消息索引对象
   * @return {object|null}         查找结果
   */
  async getMessageByMid (options) {
    let _sql = `
    SELECT * FROM message
      WHERE mid="${options.mid}"
      LIMIT 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据消息类型查找消息
   * @param  {object} options 消息类型对象
   * @return {[]}         查找结果
   */
  async getMessageByWechatAndType (options) {
    let _sql = `
    SELECT * FROM message
      WHERE wechat="${options.wechat}" AND type="${options.type}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
    } else {
      result = []
    }
    return result
  },

  /**
   * 根据消息类型查找消息
   * @param  {object} options 消息类型对象
   * @return {[]}         查找结果
   */
  async getMessageByType (options) {
    let _sql = `
    SELECT * FROM message
      WHERE type="${options.type}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
    } else {
      result = []
    }
    return result
  },

  /**
   * 根据消息时间段查找消息
   * @param  {object} options 消息时间段对象
   * @return {[]}         查找结果
   */
  async getMessageByTime (options) {
    let _sql = `
    SELECT * FROM message
      WHERE publish_time  BETWEEN "${options.start_time}" AND "${options.end_time}"`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
    } else {
      result = []
    }
    return result
  }

}

module.exports = message
