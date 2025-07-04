const { request } = require('../../http/request')

module.exports = {
  cityTree: (data) => request('/iclub/openApi/common/city', 'POST', data, true)
}
