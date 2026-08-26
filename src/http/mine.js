const { request } = require('./request')

module.exports = {
  // 查询用户收藏
  // 查询我的评论列表
  ibtApiContentCommentQueryMyComment: (val) => request('/ibt/api/contentcomment/queryMyComment', 'GET', val, true),
  // 删除评论
  ibtApiContentCommentDelete: (data) => request('/ibt/api/contentcomment/deleteContentComment', 'POST', data, false, true),

  // 新增地址
  iclubApiUserReceiveAddressAdd: (data) => request('/biz-passport/passport/accountReceiveAddress/addReceiveAddress', 'POST', data, false, true),
  // 编辑地址
  iclubApiUserReceiveAddressEdit: (data) => request('/biz-passport/passport/accountReceiveAddress/updateReceiveAddress', 'POST', data, false, true),
  // 删除地址
  iclubApiUserReceiveAddressDelete: (data) => request('/biz-passport/passport/accountReceiveAddress/deleteReceiveAddress', 'POST', data, false, true),
  // 用户地址详情
  iclubApiUserReceiveAddressGet: (data) => request('/biz-passport/passport/accountReceiveAddress/getReceiveAddressDetail', 'POST', data, true, true),

  // 用户地址列表
  iclubApiUserReceiveAddressList: (data) => request('/biz-passport/passport/accountReceiveAddress/getReceiveAddressByUserCode', 'POST', data, true, true),
  // 批量管理
  iclubApiUserReceiveAddressManage: (data) => request('/biz-passport/passport/accountReceiveAddress/setDefaultAddress', 'POST', data, false, true),

  // 我的点赞列表
  iclubApiUserContentUpvoteList: (params) => request('/iclub-api/api/content/upvoteList', 'GET', params, true),
  // 点赞-取消点赞
  iclubApiContentUpVote: (data) => request('/iclub-api/api/content/upvote', 'POST', data, false, true),

  // 我的收藏列表
  iclubApiUserContentCollectList: (params) => request('/iclub-api/api/content/collectList', 'GET', params, true),
  // 收藏-取消收藏
  iclubApiContentCollect: (data) => request('/iclub-api/api/content/collect', 'POST', data, false, true),
  // 积分兑换
  iclubApiUserIntegralExchange: (data) => request('/iclub-api/api/user/integralToMall', 'POST', data, false, true)
}
