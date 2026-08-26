const { request2 } = require('../request2')
module.exports = {
  queryActivityInfoLogin: (data) => request2({ url: '/iclub-api/api/activity/orgActivity/getActivityInfo', data }),
  queryActivityInfoWihoutLogin: (data) => request2({ url: '/iclub-api/openApi/activity/orgActivity/getActivityInfo', data, auth: false }),
  apiJoin: () => request2({ url: '/iclub-api/api/activity/orgActivity/joinActivity' }),
  apiJoinUsers: (data) => request2({ url: '/iclub-api/api/activity/orgActivity/queryjoinActivityUser', data }),
  apiGetWinner: () => request2({ url: '/iclub-api/api/activity/orgActivity/getPrizeUser' }),
  apiAddOrgUser: () => request2({ url: '/iclub-api/api/activity/orgActivity/addFromOrgUser' })
}
