const { request } = require('./request')
const { request2 } = require('./request2')
const { sleep } = require('../utils/tools')
module.exports = {
  // 新版 - 通过code获取用户手机号信息
  wxMaLogin: (params) => request('/iclub-api/api/user/loginForMiniProgram', 'POST', params, true),
  // 通过code获取用户openid
  wxGetOpenId: (params) => request('/biz-passport/passport/login/getOpenId', 'POST', params, true, true, false, true, { 'business-app': 'iclub', 'business-sys': 'iclub' }),
  // 更新用户unionId
  // wxUpdateOpenId: (params) => request('/passport/api/sso/updateUnionid', 'POST', params, true),
  // 上传用户信息
  // userUploadUserInfo: (params) => request('/passport/api/user/uploadUserInfo', 'POST', params, true, true),
  // 获取用户信息
  userInfo: (data) => request('/iclub-api/api/user/queryUserInfo', 'post', data, true, true),
  // 刷新token
  refreshToken: (data) => request('/biz-passport/passport/auth/refreshToken', 'post', data, true, true),
  // 更新iclub的头像和昵称
  iclubApiUserEditUserInfo: (params) => request('/iclub-api/api/user/editUserInfo', 'POST', params, true, true),
  testJiami: () => request2({ url: '/iclub-api/openApi/test/testSM4', method: 'POST', data: { data: 123 }, encrypt: true }),
  // getCodeByPhone: (params) => request('/passport/api/sso/sendSmsVerCode', 'POST', params, true, true),
  // 新用户登录
  loginForMiniProgramForNewUser: (params) => request('/passport/api/sso/loginForMiniProgramForNewUser', 'POST', params, true, true),

  // 统一登录后用户注册接口
  userRegister: async (data) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await request('/iclub-api/api/user/register', 'POST', data, true, true)
        await sleep(250) // 关顺说注册的时候会调用userInfo，造成userInfo查询失败，未知原因，所以这里加个延时确保用户注册成功后查询userInfo
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  },
  xlogin: (data) => request('/biz-passport/passport/login/loginByMiniApp', 'POST', data, true, true),
  setEncryptKey: (data) => request('/biz-passport/passport/auth/refreshUserEncryptKey', 'POST', data, true, true),
  addMessageSubscribe: (data) => request('/iclub-api/openApi/user/addWechatMessageSubscribe', 'POST', data, true, true, true, false),
  // 存储用户位置信息
  saveUserLocation: (data) => request('/iclub-api/openApi/user/addUserLocation', 'POST', data, true, true, true),
  getLocationByCoords: (data) => request2({ url: '/iclub-api/openApi/common/gisToAddress', data }),
  isWhiteListFlag: (data) => request2({ url: '/iclub-api/api/trade/verify/permission', method: 'POST', data })
}
