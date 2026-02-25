const { request } = require('./request')

module.exports = {
  // 产品下内容列表 "labelCode": "", "productCode": ""
  getProductContentList: (data) => request('/iclub-api/api/content/listProductContent', 'POST', data, true, true),
  // 新的内容详情
  getContentDetailsNew: (data) => request('/iclub-api/openApi/content/detail', 'POST', data, true, true, true),
  // 收藏
  getCollect: (data) => request('/iclub-api/api/content/collect', 'POST', data, true, true),
  // 收藏
  getUpvote: (data) => request('/iclub-api/api/content/upvote', 'POST', data, true, true),
  // 收藏
  apiCollect: (data) => request('/iclub-api/api/content/collect', 'POST', data, true, true),
  // 收藏
  apiLike: (data) => request('/iclub-api/api/content/upvote', 'POST', data, true, true),

  // 获取评论
  getComment: (data) => request('/iclub-api/api/contentComment/queryPage', 'POST', data, true, true),

  // 发布评论
  submitComment: (data) => request('/iclub-api/api/contentComment/addComment', 'POST', data, false, true, true)
}
