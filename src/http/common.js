const { request } = require('./request')

module.exports = {
  // 数据埋点
  // apiBuryPointClick: (data) => request('/qxcollege/api/buryPoint/click', 'POST', data, true, true, true),
  apiBuryPointClick: (data) => request('/base/burypoint/pageEventReport', 'POST', data, true, true, true),
  // 小程序码生成
  apiQRCode: (data) => request('/biz-passport/api/qrCode/createQrCode', 'POST', data, true, true, false, false),

  apiRecordShareInfo: (data) => request('/iclub-api/openApi/user/userShareForClick', 'POST', data, true, true, false, false),

  cityTree: (data) => request('/iclub-api/openApi/common/city', 'POST', data, true),

  // 根据shareId换取映射数据
  getSceneData: (data) => request('/iclub-api/openApi/neck/getSceneValue', 'POST', data, true, true, false, false),

  apiGetConfig: (data = {}) => request('/iclub-api/openApi/appConfig/getAppConfig', 'POST', data, true, true, false, false)
}
