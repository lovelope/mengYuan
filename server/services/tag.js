/**
 * 标签业务操作
 */

const tagModel = require('./../models/tag')

const tag = {

  /**
   * 创建用户
   * @param  {object} tag  标签信息
   * @return {object}      创建结果
   */
  async create (tagName) {
    let result = await tagModel.create({
      'tag_name': tagName,
      count: 1
    })
    return result
  },

  /**
   * 更新标签信息（计数自增）
   * @param  {object} tag  标签信息
   * @return {object}      更新结果
   */
  async update (tagName) {
    let oneTag = await tagModel.getTagByTagName(tagName)
    if (oneTag && oneTag.count) {
      oneTag.count++  // 计数加1
    } else {
      let result = await tagModel.create(tagName)
      return result
    }
    let result = await tagModel.update(oneTag)
    return result
  },

  /**
   * 查找存在标签信息
   * @param  {object} formData  查找的表单数据
   * @return {object|null}      查找结果
   */
  async getTagByTagName (tagName) {
    let resultData = await tagModel.getTagByTagName(tagName)
    return resultData
  },

  /**
   * 根据标签id查找标签业务操作
   * @param  {number} id       标签id
   * @return {object|null}     查找结果
   */
  async getTagById (id) {
    let resultData = await tagModel.getTagById(id) || {}
    let tag = {
      id: resultData.id,
      tag: resultData.tag,
      count: resultData.count
    }
    return tag
  }

}

module.exports = tag
