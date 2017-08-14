const dbUtils = require('./../utils/db-util')
const os = require('os')
const fs = require('fs')
const path = require('path')

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
   * 数据库创建消息
   * @param  {object} model 消息数据模型
   * @return {object}       mysql执行结果
   */
  async createFile (model) {
    const file = model.files.file
    const reader = fs.createReadStream(file.path)
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
    reader.pipe(stream)
    console.log('uploading %s -> %s', file.name, stream.path)
    let result = await dbUtils.insertData('message', model)
    return result
  },

  /**
   * 获取消息计数
   * @param  {obejct} options 查找条件参数
   * @return {[]}             查找结果
   */
  async getCount (options) {
    let _sql = `
    SELECT COUNT(*)
      FROM message`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]['COUNT(*)']
    } else {
      result = 0
    }
    return parseInt(result)
  },

  /**
   * 查找n条消息
   * @param  {obejct} options 查找条件参数
   * @return {[]}             查找结果
   */
  async getMessages (options) {
    let count = await this.getCount()
    let pageIndex = parseInt(options.pageIndex)
    let pageSize = parseInt(options.pageSize)
    let startIndex = count - (pageIndex + 1) * pageSize // 数据库开始索引
    startIndex = startIndex < 0 ? 0 : startIndex        // 小于0则置0
    let endIndex = count - pageIndex * pageSize         // 数据库结束索引
    let _sql = `
    SELECT wechat, publish_time, title, topic, type, content
      FROM message
      LIMIT ${startIndex}, ${endIndex}`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result.reverse()
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
    let count = await this.getCount()
    let pageIndex = parseInt(options.pageIndex)
    let pageSize = parseInt(options.pageSize)
    let startIndex = count - (pageIndex + 1) * pageSize // 数据库开始索引
    startIndex = startIndex < 0 ? 0 : startIndex        // 小于0则置0
    let endIndex = count - pageIndex * pageSize         // 数据库结束索引
    let _sql = `
    SELECT * FROM message
      WHERE wechat="${options.wechat}"
      LIMIT ${startIndex}, ${endIndex}`
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
    let count = await this.getCount()
    let pageIndex = parseInt(options.pageIndex)
    let pageSize = parseInt(options.pageSize)
    let startIndex = count - (pageIndex + 1) * pageSize // 数据库开始索引
    startIndex = startIndex < 0 ? 0 : startIndex        // 小于0则置0
    let endIndex = count - pageIndex * pageSize         // 数据库结束索引
    let _sql = `
    SELECT * FROM message
      WHERE wechat="${options.wechat}" AND type="${options.type}"
      LIMIT ${startIndex}, ${endIndex}`
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
