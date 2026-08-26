const { request2 } = require('./request2')

module.exports = {
  apiGetStyleDoctorList: (data) => {
    return request2({ url: '/iclub-api/api/style/queryPageForStyleDoctor', data })
  }
}
