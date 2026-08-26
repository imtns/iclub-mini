const { request } = require('./request')

module.exports = {
  // 查询订单详情
  orderinfoDetail: (params) => request(`/iclub-api/api/orderInfo/get/${params}`, 'get', {}, true, true),
  // 查询权益详情
  goodsDetail: (params) => request('/iclub-api/api/goods/detail', 'get', params, true, true)
}
