const { request } = require('./request')

module.exports = {
  // 查询
  getUserIntegralDetailPage: (params) => request('/iclub-api/api/user/getUserIntegralDetailPage', 'get', params, true, true),
  // 权益兑换列表
  getExchangeList: (params) => request('/iclub-api/api/orderInfo/list', 'get', params, true, true),
  // 兑换商品
  getSubmitOrder: (data) => request('/iclub-api/api/orderInfo/submitOrder', 'post', data, false, true),
  //
  getInviteUser: (params) => request('/iclub-api/api/user/getInviteUser', 'post', params, false, true)
}
