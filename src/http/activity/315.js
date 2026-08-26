const { request2 } = require('../request2')
module.exports = {
  // 查询315活动信息
  queryActivityInfoLogin: (data) => request2({ url: '/iclub-api/api/activity/threeOneFive/getActivityInfo', data, cleartTicket: false }),
  queryActivityInfoWihoutLogin: (data) => request2({ url: '/iclub-api/openApi/activity/threeOneFive/getActivityInfo', data, auth: false }),
  detectGameStatus: () => request2({ url: '/iclub-api/api/activity/queryXiaoXiaoLePass' }),
  apiHecheng: (data) => request2({ url: '/iclub-api/api/activity/threeOneFive/merge', data }),
  apiGetMyPrize: () => request2({ url: '/iclub-api/api/activity/threeOneFive/myPrize' }),
  apiScanQuery: (data) => request2({ url: '/iclub-api/api/activity/threeOneFive/queryAuthenticity', data })
}
