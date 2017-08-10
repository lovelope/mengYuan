/**
 * 逻辑文案管理
 */

const userCode = {
  SUCCESS: '操作成功',

  ERROR_USER_NAME: '用户名格式为6-16位的小写字母，包括-、_',

  ERROR_WECHAT: '微信号格式错误',

  ERROR_GENDER: '性别格式错误',

  ERROR_EMAIL: '请输入正确的邮箱地址',

  ERROR_PASSWORD: '密码长度应该为6-16',

  ERROR_PASSWORD_CONFORM: '两次密码不一致',

  ERROR_NATURE: '性格字符串不合法，含有非法字符',

  ERROR_EXPECT: '期望性格字符串不合法，含有非法字符',

  ERROR_SYS: '系统错误',

  FAIL_EMAIL_IS_EXIST: '邮箱已被注册',

  FAIL_USER_NAME_IS_EXIST: '用户名已被注册',

  FAIL_WECHAT_IS_EXIST: '微信已被注册',

  FAIL_USER_NAME_OR_PASSWORD_ERROR: '用户名或登录密码错误',

  FAIL_USER_NO_LOGIN: '用户未登录',

  FAIL_USER_NO_EXIST: '用户不存在'

}

module.exports = userCode
