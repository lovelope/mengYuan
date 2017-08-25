const tagService = require('./../services/tag')
const tagCode = require('./../codes/tag')

const tagController = {

  /**
   *
   * @param {object} tagName 标签名
   */
  async create (tagName) {
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    let insertResult = await tagService.create(tagName)
    if (insertResult && insertResult.insertId * 1 > 0) {
      result.code = 0
      result.message = tagCode.SUCCESS
    } else {
      result.message = tagCode.ERROR_SYS
    }
    return result
  },

  /**
   *
   * @param {object} tagName 标签名
   */
  async getTagByTagName (tagName) {
    let result = {
      code: -1,
      message: '',
      data: {}
    }

    let findResult = await tagService.getTagByTagName(tagName)
    if (findResult) {
      result.code = 0
      result.message = tagCode.SUCCESS
      result.data = findResult
    }
    return result
  },

  /**
   *
   * @param {array} tags 标签名数组
   */
  async addTags (tags, oldTags) {
    console.log('oldTags: ', JSON.stringify(oldTags))
    let result = {
      code: 0,
      message: '',
      data: {
        tagsId: []
      }
    }

    await (async () => {
      for (let i = 0, len = tags.length; i < len; i++) {
        console.log('tag %d: %s', i, tags[i])
        // 查找数据库是否已存在该标签
        let findResult = await tagService.getTagByTagName(tags[i])
        console.log('tagController.addTags - findResult:', JSON.stringify(findResult))
        if (!findResult) {
          // 找不到则创建
          let createResult = await tagService.create(tags[i])
          console.log('tagController.addTags - createResult:', JSON.stringify(createResult))
          if (createResult && parseInt(createResult.insertId) > 0) {
            await result.data.tagsId.push(parseInt(createResult.insertId))
          } else {
            result.code = -1
            result.message = tagCode.ERROR_CREATE
          }
        } else if (parseInt(findResult.id) > 0) {
          // 找到则计数自增且加入tagsId数组
          await result.data.tagsId.push(findResult.id)

          // 用户之前选过同样的标签则计数不增加
          if (oldTags.indexOf(findResult.id) === -1) {
            console.log('oldTags index: --- ', oldTags.indexOf(findResult.id))
            let updateResult = await tagService.update(tags[i])
            if (updateResult && updateResult.affectedRows * 1 > 0) {

            } else {
              result.code = -1
              result.message = tagCode.ERROR_UPDATE
            }
          }
        }
      }
    })()

    result.data.tagsId.sort(function (a, b) {
      return parseInt(a) - parseInt(b)
    })
    return result
  }
}

module.exports = tagController
