const { request } = require('./request')

module.exports = {
  // 真伪查询
  queryAuthenticityInfo: (data) => request('/iclub-api/api/authenticity/queryAuthenticity', 'POST', data, true, true),
  // 嗨体新年-真伪查询
  hihiQueryAuthenticity: (data) => request('/iclub-api/api/activity/hihi/queryAuthenticity', 'POST', data, true, true),
  // 我的查询记录
  getSearchRecord: (data) => request('/iclub-api/api/authenticity/queryRecords', 'POST', data, true, true),
  // 查询兑换图标
  getExchangeIcon: (data) => request('/iclub-api/api/authenticity/haveQueryRecordGiftPop', 'POST', data, true, true)
}
