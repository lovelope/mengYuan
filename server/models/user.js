const dbUtils = require('./../utils/db-util')
const tagModel = require('./tag')

const user = {

  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('user', model)
    return result
  },

  /**
   * 更新用户信息
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async update (model) {
    let result = await dbUtils.updateData('user', model, model.id)
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne (options) {
    let _sql = `
    SELECT * from user
      where openid="${options.openid}"
      limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByWechatAndPassword (options) {
    let _sql = `
    SELECT * from user
      where password="${options.password}" and wechat="${options.wechat}"
      limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户id查找用户信息
   * @param  {number} userId   用户账号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserId (userId) {
    let result = await dbUtils.findDataById('user', userId)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    if (result) {
      let tagNames = (typeof result.tag === 'string') ? JSON.parse(result.tag) : (result.tag) ? result.tag : []
      tagNames = await tagModel.getTagsByIds(tagNames)
      result = {
        nick: result.nick,
        gender: result.gender,
        avatar: result.avatar,
        tag: tagNames,
        friends: result.friends
      }
    }

    return result
  },

  /**
   * 批量获取用户信息
   * @param {object} options 筛选项
   */
  async getUserInfos (options) {
    let pageIndex = parseInt(options.pageIndex)
    let pageSize = parseInt(options.pageSize)
    let _sql = `SELECT * FROM user LIMIT ? , ?`
    let result = await dbUtils.query(_sql, [pageIndex * pageSize, pageSize])
    return result
  },

  async getFriends (options) {
    let me = this
    let pageIndex = parseInt(options.pageIndex)
    let pageSize = parseInt(options.pageSize)
    let result = []
    // console.log('userModel.getFriends - options: ', JSON.stringify(options))

    let friendsIds = (await me.getUserInfoByUserId(options.userId)).friends
    // console.log('userModel.getFriends - friendsIds: ', JSON.stringify(friendsIds))
    friendsIds = (typeof friendsIds === 'string') ? JSON.parse(friendsIds) : friendsIds
    // console.log('userModel.getFriends - Array.isArray(friendsIds): ', Array.isArray(friendsIds))
    if (!friendsIds) {
      return []
    }
    if (pageIndex * pageSize > friendsIds.length) {
      return []
    }
    let startIndex = pageIndex * pageSize
    let endIndex = startIndex + pageSize
    endIndex = endIndex < friendsIds.length ? endIndex : friendsIds.length
    for (let i = startIndex; i < endIndex; i++) {
      let friend = await me.getUserInfoByUserId(friendsIds[i])
      console.log('userModel.getFriends - friend: ', JSON.stringify(friend))
      let tagNames = (typeof friend.tag === 'string') ? JSON.parse(friend.tag) : friend.tag
      result.push({
        nick: friend.nick,
        gender: friend.gender,
        avatar: friend.avatar,
        tag: tagNames
      })
    }
    return result
  }

}

module.exports = user
