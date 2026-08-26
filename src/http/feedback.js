const { request } = require('./request')

module.exports = {
  // 反馈记录
  ibtApiFeedbackQuery: (params) => request('/iclub-api/api/feedback/queryFeedback', 'GET', params, true),
  // 新增问题反馈
  ibtApiFeedbackAdd: (params) => request('/iclub-api/api/feedback/addFeedback', 'post', params, false, true)
}
