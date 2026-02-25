const { request2 } = require('../request2')
module.exports = {
  apiGetActInfo: (isLogin) => request2({ url: !isLogin ? '/iclub-api/openApi/activity/threeEight/getActivityInfo' : '/iclub-api/api/activity/threeEight/getActivityInfo' }),
  apiGetPrizeList: () => request2({ url: '/iclub-api/openApi/activity/threeEight/getShanLiangPrizeList' }),
  apiLockPrize: (data) => request2({ url: '/iclub-api/api/activity/threeEight/lockPrize', data }),
  apiGetMyPrize: () => request2({ url: '/iclub-api/api/activity/threeEight/getMyPrize' }),
  apiPrizeSubmit: (data) => request2({ url: '/iclub-api/api/activity/threeEight/submitOrder', data })
}
