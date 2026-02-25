const { request2 } = require('@/http/request2')

module.exports = {
  // 获取医生列表
  apiGetDoctorList: (data) => request2({ url: '/iclub-api/openApi/activity/genius/face/image/list', data, method: 'post' })
}
