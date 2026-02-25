const { request } = require('./request')

module.exports = {
  updateUserInfo: (data) => request('/iclub-api/api/user/editUserInfo', 'post', data, false, true),
  setUserLabel: (data) => request('/iclub-api/api/user/setUserLabel', 'post', data, false, true),
  labelList: (data) => request('/iclub-api/api/label/list', 'post', data, false, true)
}
