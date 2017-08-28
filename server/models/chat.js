const dbUtils = require('./../utils/db-util')

const chatModel = {

  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create (model) {
    let result = await dbUtils.insertData('chat', model)
    return result
  },

  /**
   * 获取所有聊天记录
   * @param {object} formData 查询表单
   */
  async getChatlogs (formData) {
    let pageIndex = parseInt(formData.pageIndex)
    let pageSize = parseInt(formData.pageSize)

    let _sql = `
     SELECT *
       FROM chat
       WHERE \`from\`="${formData.userId}" OR \`to\`="${formData.userId}"
       ORDER BY timeline DESC
       LIMIT ${pageIndex * pageSize}, ${pageSize}`
    let result = await dbUtils.query(_sql)
    return result
  },

  /**
   * 查询两个制定用户的消息
   * @param {object} formData 查询表单
   */
  async getChatByFromAndTo (formData) {
    let pageIndex = parseInt(formData.pageIndex)
    let pageSize = parseInt(formData.pageSize)

    let _sql = `
     SELECT *
       FROM chat
       WHERE (\`from\`="${formData.userId}" AND \`to\`="${formData.targetUserId}")
        OR (\`from\`="${formData.targetUserId}" AND \`to\`="${formData.userId}")
       ORDER BY timeline DESC
       LIMIT ${pageIndex * pageSize}, ${pageSize}`
    let result = await dbUtils.query(_sql)
    return result
  }

}

module.exports = chatModel
