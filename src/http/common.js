const { request } = require("./request");

module.exports = {
  // 数据埋点
  // apiBuryPointClick: (data) => request('/qxcollege/api/buryPoint/click', 'POST', data, true, true, true),
  apiBuryPointClick: (data) => request("/base/burypoint/pageEventReport", "POST", data, true, true, true),
  // 小程序码生成
  apiQRCode: (data) => request("/biz-passport/api/qrCode/createQrCode", "POST", data, true, true, false, false),

  apiRecordShareInfo: (data) => request("/iclub/openApi/user/userShareForClick", "POST", data, true, true, false, false),

  cityTree: (data) => request("/iclub/openApi/common/city", "POST", data, true),
};
