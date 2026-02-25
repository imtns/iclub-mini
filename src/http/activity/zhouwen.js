const { request2 } = require('../request2')
module.exports = {
  /**
    @propType
    道具类型
    1-嗨体1.0; 2-嗨体1.5 ; 3-嗨体2.5; 4-时间沙漏; 5-复活卡; 6-双倍积分
    @propSource
    道具来源
    1-看广告; 2-消耗商城积分; 3-拉新
  */
  apiAddProp: ({ propType, propSource }) => request2({ url: '/iclub-api/api/activity/ehi/addProp', data: { propType, propSource } }),
  apiGameRanking: () => request2({ url: '/iclub-api/api/activity/ehi/getGameIntegralRanking' }),
  getGameInfo: (data) => request2({ url: '/iclub-api/api/activity/ehi/getEhiGameInfo', data, noToast: false }),
  getGameHP: () => request2({ url: '/iclub-api/api/activity/ehi/getGameHp', noToast: true }),
  // 获取礼品详情
  getGiftDetail: (data) => request2({ url: '/iclub-api/api/activity/ehi/getGiftDetail', data, noToast: false }),
  // 填写红包大奖信息
  addRedPacketInfo: (data) => request2({ url: '/iclub-api/api/activity/ehi/addRedPacketInfo', data, noToast: false })
}
