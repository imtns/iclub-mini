const { request } = require('../request')

module.exports = {
  // 获取投票活动信息
  getVoteQueryActivityWorksInfo: (data) => request('/iclub-api/api/activity/vote/queryVoteActivityInfo', 'post', data, true, true),
  // 获取投票作品详情
  getVoteQueryWorksDetail: (data) => request('/iclub-api/api/activity/vote/queryWorksDetail', 'post', data, true, true),
  // 投票作品分页列表查询
  getVoteQueryPage: (data) => request('/iclub-api/api/activity/vote/queryPage', 'post', data, true, true),
  // 查询所有作品分类信息
  getQueryWorksCategoryList: (data) => request('/iclub-api/api/activity/vote/queryWorksCategoryList', 'post', data, false, true),
  // 添加投票
  addVote: (data) => request('/iclub-api/api/activity/vote/submitVote', 'post', data, false, true),
  // 不需要登录

  // 获取投票活动信息
  noLoginQueryVoteActivityInfo: (data) => request('/iclub-api/openApi/activity/queryVoteActivityInfo', 'post', data, true, true),
  // 获取所有作品分类信息
  noLoginQueryWorksCategoryList: (data) => request('/iclub-api/openApi/activity/queryWorksCategoryList', 'post', data, false, true),
  // 获取作品投票-投票作品分页列表查询（无需登录）
  noLoginQueryPage: (data) => request('/iclub-api/openApi/activity/queryPage', 'post', data, true, true)
}
