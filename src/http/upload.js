const { request } = require('./request')

module.exports = {
  // 获取文件上传token
  findAliToken: (data) => request('/iclub-api/openApi/fileUpload/findAliToken', 'post', {}, true, false, false, false)
}
