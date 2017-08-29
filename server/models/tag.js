const dbUtils = require('./../utils/db-util')

const tagModel = {

  /**
   * 数据库创建标签
   * @param  {object} model 标签数据模型
   * @return {object}       mysql执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('tag', model)
    return result
  },

  /**
   * 更新标签信息(自增)
   * @param  {object} model 标签数据模型
   * @return {object}       mysql执行结果
   */
  async update (model) {
    let result = await dbUtils.updateData('tag', model, model.id)
    return result
  },

  /**
   * 根据标签名查找某个标签是否存在
   * @param  {obejct} tagName 查找条件参数
   * @return {object|null}        查找结果
   */
  async getTagByTagName (tagName) {
    let _sql = `
    SELECT * from tag
      where tag_name like "${tagName}"
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
   * 根据标签id查找某个标签是否存在
   * @param  {obejct} id          查找条件参数
   * @return {object|null}        查找结果
   */
  async getTagById (id) {
    let _sql = `
    SELECT * from tag
      where id="${id}"
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
   * 根据id数组获取标签名称数组
   * @param {array} ids 标签id数组
   */
  async getTagsByIds (ids) {
    let me = this
    let tagArray = []
    if (!Array.isArray(ids)) {
      ids = JSON.parse(ids)
    }
    console.log('tagModel.getTagsByIds - ids: ', JSON.stringify(ids))
    await (
      (async function () {
        for (let i = 0, len = ids.length; i < len; i++) {
          console.log(`tagModel.getTagsByIds - i: ${i}`)
          tagArray.push((await me.getTagById(ids[i])).tag_name)
        }
      })()
    )
    console.log('tagModel.getTagsByIds - tagArray: ', JSON.stringify(tagArray))
    return tagArray
  }

}

module.exports = tagModel
