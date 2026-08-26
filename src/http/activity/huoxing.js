const { request2 } = require('./request2')

module.exports = {
  // 查询活性卡甄选机构（分页）
  apiOrgList: (data) => request2({ url: '/iclub-api/openApi/activity/hxk/company/queryPage', data, auth: false }),
  // 活性卡兑换列表
  hxkDetail: (data) => request2({ url: '/iclub-api/api/activity/hxk/company/detail', data }),
  // 活性卡兑换列表
  hxkExchangeGoodCheck: (data) => request2({ url: '/iclub-api/api/activity/hxk/company/exchangeGoodCheck', data }),
  // 活性卡机构校验
  hxkCheckStatus: (data) => request2({ url: '/iclub-api/api/activity/hxk/company/checkStatus', data }),
  // 上传消费凭证
  apiUploadEvidence: (data) => request2({ url: '/iclub-api/api/activity/hxk/consumeVoucher/upload', data }),
  // 消费凭证列表
  apiEvidenceList: (data) => request2({ url: '/iclub-api/api/activity/hxk/consumeVoucher/queryPage', data })
}
