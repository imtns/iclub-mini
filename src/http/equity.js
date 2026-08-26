const { request } = require('./request')

module.exports = {
  // 查询权益兑换明细
  // productListOfPoints: (params) => request('/iclub-api/api/goods/list', 'get', params, true, true),
  productListOfPoints: (data) => request('/iclub-api/openApi/goods/goodslistForIntegral', 'post', data, true, true),
  // 查询权益详情
  // goodsDetail: (params) => request('/iclub-api/api/goods/detail', 'get', params, true, true),
  goodsDetail: (data) => request('/iclub-api/openApi/goods/goodsDetail', 'post', data, true, true),
  // 库存活力值校验
  validateStockAndIntegral: (data) => request('/iclub-api/api/orderInfo/validateStockAndIntegral', 'post', data, false, true, true)
}
