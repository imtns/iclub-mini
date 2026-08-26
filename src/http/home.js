const { request } = require('./request')

module.exports = {
  // 获取banner图，optType：1首页轮播图 2产品轮播图  dataCode:产品id
  getQueryOperate: (data) => request('/iclub-api/api/operate/queryOperate', 'POST', data, true, true),
  getHomeContent: (data) => request('/iclub-api/api/home/listhomeContent', 'POST', data, true, true),
  getHomePopup: (data) => request('/iclub-api/openApi/popup/list', 'POST', data, true, true),
  submitHomePopup: (data) => request('/iclub-api/openApi/popup/record/submit', 'POST', data, true, true)
}
export function getTaskList() {
  return request({
    url: `${baseUrl}/mall-api/points/list`,
    method: 'get',
    params: {}
  })
}
