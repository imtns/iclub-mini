const { request2 } = require('../request2')

const orderType = {
  8: 'threeEight',
  9: 'threeOneFive',
  10: 'consumption',
  11: 'challengeMatch'
}
module.exports = {
  apiOrderSubmit: (data) => request2({ url: `/iclub-api/api/activity/${orderType[+data.orderType]}/submitOrder`, data })
}
