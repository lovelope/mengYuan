/**
 * 用户相关请求业务
 * 找标签重复率高的用户数组返回
 */

// const ALL_CONFIG = require('../../config')
const userModel = require('../models/user')
const tagModel = require('../models/tag')

const userUtil = {
/**
 * 从微信服务器获取session_key
 * @param {登录码} loginCode
 */
  async getSameInterestUsers (userId) {
    let userInfo = await userModel.getUserInfoByUserId(userId)
    console.log('userUtils.getSameInterestUsers - userInfo: ', JSON.stringify(userInfo))
    let userTag = JSON.parse(userInfo.tag)
    let userTagLength = userTag.length

    // [{userId: 1, userInfo: {}, rate: 0.9},{userId: 2, userInfo: {}, rate: 0.8}]
    let result = []

    let pageIndex = 0
    let pageSize = 1000
    let userList = []
    // 从所有用户里获取匹配项
    do {
      userList = await userModel.getUserInfos({
        'pageIndex': pageIndex++,
        'pageSize': pageSize
      })

      if (userList.length < pageSize) {
        // 筛选共同兴趣
        await ((function () {
          for (let i = 0; userList[i]; i++) {
            console.log('userUtils.getSameInterestUsers - userList[i]: ', JSON.stringify(userList[i]))
            let tmpUserTag = JSON.parse(userList[i].tag)
            // 查找两数组相同元素
            let intersection = userTag.filter(v => tmpUserTag.includes(v))
            let rate = intersection.length / userTagLength
            if (userList[i].id !== userId) {
              let tagNames = (async function () {
                let result = await tagModel.getTagsByIds(userList[i].tag) || []
                return result
              })()
              result.push({
                userId: userList[i].id,
                userInfo: {
                  nick: userList[i].nick,
                  tag: tagNames,
                  gender: userList[i].gender,
                  avatar: userList[i].avatar
                },
                rate: rate
              })
            }
          }
        })())
      }

      result.sort(this.compare)     // 排序
      result = result.slice(0, 100) // 只取前100条
    } while (userList.length >= pageSize)

    result.sort(this.compare)
    result = result.slice(0, 100)
    console.log('userUtils.getSameInterestUsers - result: ', JSON.stringify(result))
    return result
  },

  compare (a, b) {
    return parseFloat(a.rate) - parseFloat(b.rate)
  }
}

module.exports = userUtil
