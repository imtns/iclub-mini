const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 动态获取当前云环境
})

exports.main = async (event, context) => {
  // event 包含前端传递的参数
  const { name } = event

  // 获取调用者的 OpenID
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  // 模拟业务逻辑
  return {
    message: `Hello, ${name || 'Guest'}!`,
    openid: openid,
    timestamp: new Date().toISOString()
  }
}
