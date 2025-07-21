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
      data,
      false
    ),
  //科技馆 - 提交AI诊断
  diagnose: (data) =>
    request(
      'https://iclub-backend-test.imeik.com/iclub/api/activity/csly/science/diagnose',
      'post',
      data,
      false
    ),
  apiDianzan: (data) =>
    request('/iclub/api/content/upvote', 'post', data, true),
  findAliToken: () =>
    request(
      '/iclub/openApi/fileUpload/findAliToken',
      'post',
      {},
      true,
      false,
      false,
      false
    ),
};
