const { request2 } = require('../request2')
module.exports = {
  getQuestions: (data) => request2({ url: '/iclub-api/api/exam/queryChallengeMatchPaper', data }),
  getResurrectionList: (data) => request2({ url: '/iclub-api/api/challengeMatch/queryReviveDetailList', data }),
  passExam: (data) => request2({ url: '/iclub-api/api/challengeMatch/saveSuccessRecord', data }),
  fuhuo: (data) => request2({ url: '/iclub-api/api/challengeMatch/completeReviveTask', data }),
  // 查询-未登录-轻知识挑战赛活动信息
  queryUnloginChallengeMatchActInfo: (data) => request2({ url: '/iclub-api/openApi/activity/queryUnloginChallengeMatchActInfo', data }),
  // 查询-登录态-轻知识挑战赛活动信息
  queryLoginChallengeMatchActInfo: (data) => request2({ url: '/iclub-api/api/challengeMatch/queryLoginChallengeMatchActInfo', data }),
  // 查询榜单
  queryRankingList: (data) => request2({ url: '/iclub-api/api/challengeMatch/queryRankingList', data }),
  // 查询兑换奖品信息
  queryExchangePrizeList: (data) => request2({ url: '/iclub-api/api/challengeMatch/queryExchangePrizeList', data }),
  // 兑换奖品 校验
  checkExchange: (data) => request2({ url: '/iclub-api/api/challengeMatch/checkExchange', data }),
  // 参与挑战
  joinChallenge: (data) => request2({ url: '/iclub-api/api/challengeMatch/saveJoinChallengeMatch', data })
}
