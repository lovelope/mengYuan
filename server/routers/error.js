/**
 * 错误页面子路由
 */

const router = require('koa-router')()

module.exports = router.get('*', async (ctx) => {
  ctx.body = `
    <div style="margin-top: 100px; text-align: center;">
      <h1 style="color: #ff534c;">萌缘</h1>
      <p>萌缘后台API服务器正在运行中...</p>
      <p>${new Date().toLocaleString()}</p>
    </div>
    `
})
