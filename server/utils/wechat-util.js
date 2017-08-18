/**
 * 微信相关请求业务
 */
const axios = require('axios')
const ALL_CONFIG = require('../../config')
const WECHAT_CONFIG = ALL_CONFIG.WECHAT

const API_URL = {
  code2session: `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_CONFIG.APPID}&secret=${WECHAT_CONFIG.APP_SECRET}&grant_type=authorization_code&js_code=`
}

const wechatUtil = {
/**
 * 从微信服务器获取session_key
 * @param {登录码} loginCode
 */
  async code2session (loginCode) {
    let url = `${API_URL.code2session}${loginCode}`
    return axios.get(url).then(function (res) {
      return res.data
    })
  }
}

module.exports = wechatUtil
