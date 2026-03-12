const { request2 } = require('@/http/request2')

// const BASE = 'https://iclub-backend-test.imeik.com/iclub-api/'
const BASE = '/iclub-api/'
const BASE2 = 'https://user-test.imeik.com/'

module.exports = {
  /** 获取活动卡片信息（品牌卡片列表、用户已得卡、用户星星总数） */
  apiGetActivityCardInfo: () =>
    request2({
      url: `${BASE}openApi/activity/verify/318/getActivityCardInfo`,
      data: {},
      method: 'POST',
      auth: false,
      encrypt: false,
      isJson: true
    }),

  /** 获取奖品列表（分页），参数走 body：page、limit、orderBy、orderType、needStarCount（可选） */
  apiGetPrizeList: (data) =>
    request2({
      url: `${BASE}openApi/activity/verify/318/prize/list`,
      data: data || {},
      method: 'POST',
      auth: false,
      encrypt: false,
      isJson: true
    }),

  /** 转赠星星 */
  apiTransferStar: (data) =>
    request2({ url: `${BASE}api/activity/verify/318/transferStar`, data, method: 'POST', auth: true, encrypt: false, isJson: true }),

  /** 领取转赠星星 */
  apiReceiveStar: (data) =>
    request2({ url: `${BASE}api/activity/verify/318/receiveStar`, data, method: 'POST', auth: true, encrypt: false, isJson: true }),

  /** 我的礼品列表 */
  apiGetMyPrizes: (data) =>
    request2({ url: `${BASE}api/activity/verify/318/myPrizes`, data, method: 'POST', auth: true, encrypt: false, isJson: true }),

  /** 星星流水记录 */
  apiGetStarFlows: (data) =>
    request2({ url: `${BASE}api/activity/verify/318/starFlows`, data, method: 'POST', auth: true, encrypt: false, isJson: true }),

  /** 兑换奖品 */
  apiExchangePrize: (data) =>
    request2({ url: `${BASE}api/activity/verify/318/exchangePrize`, data, method: 'POST', auth: true, encrypt: false, isJson: true }),

  /** 获取用户信息（头像、昵称等），用于活动首页头像展示，不依赖主包数据 */
  apiQueryUserInfo: () =>
    request2({
      url: `${BASE}api/user/queryUserInfo`,
      data: {},
      method: 'POST',
      auth: true,
      encrypt: false,
      isJson: true
    }),

  /** 查询用户地址详情信息（objectCode、userCode），按 draft2 OpenAPI：POST /biz-passport/passport/accountReceiveAddress/getReceiveAddressDetail，body 为 objectCode、userCode。返回 data 字段以与 store 使用方式一致。 */
  apiGetReceiveAddressDetail: (data) =>
    request2({
      url: `${BASE2}biz-passport/passport/accountReceiveAddress/getReceiveAddressDetail`,
      data: data || {},
      method: 'POST',
      auth: true,
      encrypt: false,
      isJson: true
    }).then((res) => (res && res.data) || {})
}
