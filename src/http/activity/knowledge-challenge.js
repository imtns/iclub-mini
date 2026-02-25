const { request2 } = require('../request2')
module.exports = {
  // 获取题目
  getQuestions: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/attendActivity', data }),
  // 开始答题
  getStartActivity: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/startActivity', data }),
  // 获取复活列表
  getResurrectionList: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/reviveList', data }),
  // 判断题 提交答案
  judgeAnswer: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/checkQuestion', data }),

  // 提交答案
  passExam: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/finishChallenge', data }),
  // 复活
  fuhuo: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/revive', data }),
  // 查询-未登录-轻知识挑战赛活动信息 --new
  queryUnloginChallengeMatchActInfo: (data) => request2({ url: '/iclub-api/openApi/activity/challengeMatch/queryNoLoginChallengeMatchActInfo', data }),
  // 查询-登录态-轻知识挑战赛活动信息--new
  queryLoginChallengeMatchActInfo: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/queryLoginChallengeMatchActInfo', data }),
  // 查询榜单
  queryRankingList: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/queryRank', data }),
  // 查询兑换奖品信息
  queryExchangePrizeList: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/queryPrizeInfo', data }),
  // 兑换奖品 校验
  checkExchange: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/submitOrder', data }),
  // 参与挑战
  joinChallenge: (data) => request2({ url: '/iclub-api/api/activity/challengeMatch/saveJoinChallengeMatch', data })
}
