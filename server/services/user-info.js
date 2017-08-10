/**
 * 用户业务操作
 */

// const validator = require('validator')
const userModel = require('./../models/user-info')
const userCode = require('./../codes/user')

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
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne (formData) {
    let resultData = await userModel.getExistOne({
      'wechat': formData.wechat
    })
    return resultData
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn (formData) {
    let resultData = await userModel.getOneByUserNameAndPassword({
      'password': formData.password,
      'name': formData.userName})
    return resultData
  },

  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName (userName) {
    let resultData = await userModel.getUserInfoByUserName(userName) || {}
    let userInfo = {
      // id: resultData.id,
      email: resultData.email,
      userName: resultData.name,
      detailInfo: resultData.detail_info,
      createTime: resultData.create_time
    }
    return userInfo
  },

  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp (userInfo) {
    let result = {
      success: false,
      message: ''
    }

    // if (!/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(userInfo.userName)) {
    //   result.message = userCode.ERROR_USER_NAME
    //   return result
    // }
    // if (!validator.isEmail(userInfo.email)) {
    //   result.message = userCode.ERROR_EMAIL
    //   return result
    // }
    // if (!/[a-zA-Z0-9]{6,16}/.test(userInfo.password)) {
    //   result.message = userCode.ERROR_PASSWORD
    //   return result
    // }
    // if (userInfo.password !== userInfo.confirmPassword) {
    //   result.message = userCode.ERROR_PASSWORD_CONFORM
    //   return result
    // }

    if (!/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(userInfo.wechat)) {
      result.message = userCode.ERROR_WECHAT
      return result
    }

    if (!/^(MAIL|FEMAIL)$/.test(userInfo.gender)) {
      result.message = userCode.ERROR_GENDER
      return result
    }

    if (!/^[a-zA-Z;\s\u4e00-\u9fa5]{0,80}$/gm.test(userInfo.nature)) {
      result.message = userCode.ERROR_NATURE
      return result
    }

    if (!/^[a-zA-Z;\s\u4e00-\u9fa5]{0,80}$/gm.test(userInfo.expect)) {
      result.message = userCode.ERROR_EXPECT
      return result
    }

    result.success = true

    return result
  }

}

module.exports = user
