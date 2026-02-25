const { request2 } = require('./request2')
module.exports = {
  apiPay: (data) => request2({ url: '/iclub-api/api/payorder/micropay', data }),
  apiGetPayResult: (data) => request2({ url: '/iclub-api/api/payorder/queryPayOrderResult', data }),
  apiGetOrderList: (data) => request2({ method: 'get', url: '/iclub-api/api/payorder/queryPayOrderList', data })
}
