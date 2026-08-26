const { request2 } = require('../request2')

// 获取我的医生信息
export function apiGetDoctorInfo() {
  return request2({
    url: `/consultation-api/doctor/self`,
    method: 'get'
  })
}
