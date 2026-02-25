const { request } = require('../../http/request')

module.exports = {
  cityTree: (data) => request('/iclub-api/openApi/common/city', 'POST', data, true)
}
