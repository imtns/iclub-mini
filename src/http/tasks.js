const { request } = require('./request')

module.exports = {
  // 分享加积分
  shareAddPoint: (params) => request('/iclub-api/api/content/share', 'post', params, false, true, false, false),
  // 签到
  signIn: (params) => request('/iclub-api/api/user/userSign', 'post', params, false, true, true, true),

  getIntegralBalanceNew: (params) => request('/iclub-api/api/user/getIntegralInfo', 'post', params, false, true, false, false),
  // 查询用户签到(一周)
  getUserSignForOneWeek: (params) => request('/iclub-api/api/user/getUserSignForOneWeek', 'post', params, false, true, false, false),
  // 查询用户积分
  getIntegralSet: (params) => request('/iclub-api/api/userIntegralDetail/getIntegralSet', 'post', params, false, true, false, false)
}
