/**
 * ai测颜数据在这里
 *
 */
const { request } = require('@/http/request');

module.exports = {
  testAPI: (params) =>
    request('https://picsum.photos/id/0/info', 'get', params),
  testAPI1: (data) =>
    request(
      'https://picsum.photos/api/activity/csly/game/gameRank',
      'post',
      data
    ),
};
