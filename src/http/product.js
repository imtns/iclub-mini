const { request } = require('./request')

module.exports = {
  // 获取产品列表
  getProductList: (data) => request('/iclub-api/api/product/list', 'GET', data, true),
  // 获取产品详情
  getProductDetails: (data) => request('/iclub-api/api/product/info', 'POST', data, true, true)
}
