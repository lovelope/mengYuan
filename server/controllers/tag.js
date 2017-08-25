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
  async addTags (tags) {
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
        if (parseInt(findResult.id) > 0) {
          // 找到则计数自增且加入tagsId数组
          result.data.tagsId.push(findResult.id)
          let updateResult = await tagService.update(tags[i])
          if (updateResult && updateResult.affectedRows * 1 > 0) {

          } else {
            result.code = -1
            result.message = tagCode.ERROR_UPDATE
          }
        } else {
          // 找不到则创建
          let createResult = await tagService.create(tags[i])
          if (createResult && createResult.insertedId * 1 > 0) {
            result.data.tagsId.push(createResult.insertedId)
          } else {
            result.code = -1
            result.message = tagCode.ERROR_CREATE
          }
        }
      }
    })()

    result.data.tagsId.sort()
    return result
  }
}

module.exports = tagController
