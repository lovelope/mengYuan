const wechatUtil = require('../utils/wechat-util')

wechatUtil.code2session('0619bJKp1zYuHn0X25Ip16LHKp19bJKi')
  .then(res => {
    console.log('loginCode2session=>res: ', JSON.stringify(res))
  })
  .catch(err => {
    throw new Error(err)
  })
