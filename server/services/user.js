/**
 * 用户业务操作
 */

// const validator = require('validator')
const userModel = require('./../models/user')
const userCode = require('./../codes/user')
const userUtil = require('../utils/user-util')

const user = {

  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create (user) {
    let result = await userModel.create(user)
    return result
  },

  /**
   * 更新用户信息
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async update (user) {
    let result = await userModel.update(user)
    return result
  },

  /**
   * 获取推荐列表
   * @param {Number:Int} userId 用户id
   */
  async getRecommend (userId) {
    let result = await userUtil.getSameInterestUsers(userId)
    console.log('userService.getRecommend - result: ', JSON.stringify(result))
    return result
  },

  /**
   * 获取萌友列表
   * @param {Number:Int} userId 用户id
   */
  async getFriends (formData) {
    let result = await userModel.getFriends(formData)
    return result
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne (formData) {
    let resultData = await userModel.getExistOne({
      'openid': formData.openid
    })
    return resultData
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn (formData) {
    let resultData = await userModel.getOneByWechatAndPassword({
      'wechat': formData.wechat,
      'password': formData.password
    })
    return resultData
  },

  /**
   * 根据用户id查找用户业务操作
   * @param  {number} userId   用户id
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserId (userId) {
    let resultData = await userModel.getUserInfoByUserId(userId) || {}
    let userInfo = {
      nick: resultData.nick,
      gender: resultData.gender,
      tag: resultData.tag
    }
    return userInfo
  },

  /**
   * 校验登录码
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorAuth (formData) {
    let result = {
      success: false,
      message: ''
    }

    // 登录码
    if (!/^[a-zA-Z0-9-]{32}$/.test(formData.loginCode)) {
      result.message = userCode.ERROR_LOGIN_CODE
      return result
    }

    result.success = true

    return result
  },

  /**
   * 检验更新用户信息数据
   * @param  {object} userInfo 用户更新数据
   * @return {object}          校验结果
   */
  validatorUpdate (userInfo) {
    let result = {
      success: false,
      message: ''
    }

    // 昵称
    if (userInfo.nick && !/^[^<>]{1,19}$/.test(userInfo.nick)) {
      result.message = userCode.ERROR_NICK
      return result
    }

    // 性别
    if (userInfo.gender && !/^(MAIL|FEMAIL)$/.test(userInfo.gender)) {
      result.message = userCode.ERROR_GENDER
      return result
    }

    // 语言
    if (userInfo.language && !/^[a-z]{2}_[A-Z]{2}$/.test(userInfo.language)) {
      result.message = userCode.ERROR_LANGUAGE
      return result
    }

    // 市
    if (userInfo.city && !/^[a-zA-Z']{2,64}$/.test(userInfo.city)) {
      result.message = userCode.ERROR_CITY
      return result
    }

    // 省
    if (userInfo.province && !/^[a-zA-Z']{2,64}$/.test(userInfo.province)) {
      result.message = userCode.ERROR_PROVINCE
      return result
    }

    // 国
    if (userInfo.country && !/^[a-zA-Z]{2,64}$/.test(userInfo.country)) {
      result.message = userCode.ERROR_COUNTRY
      return result
    }

    // 头像链接
    if (userInfo.avatar && !/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/.test(userInfo.avatar)) {
      result.message = userCode.ERROR_AVATAR
      return result
    }

    // 标签
    if (userInfo.tag && !/^[^<>]{0,80}$/gm.test(JSON.stringify(userInfo.tag))) {
      result.message = userCode.ERROR_TAG
      return result
    }

    result.success = true

    return result
  }

}

module.exports = user
