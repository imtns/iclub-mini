/**
 * ai测颜数据在这里
 *
 */
const { request } = require('@/http/request');

module.exports = {
  testAPI: (params) =>
    request('https://picsum.photos/id/0/info', 'get', params),
  //科技馆 - 用户进入科技馆板块，弹框助力提醒
  assistRemind: (data) =>
    request(
      'https://iclub-backend-test.imeik.com/iclub/api/activity/csly/science/assistRemind',
      'post',
      data
    ),
  apiDianzan: (data) =>
    request('/iclub/api/content/upvote', 'post', data, true),
};
