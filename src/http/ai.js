/**
 * ai测颜数据在这里
 *
 */
const { request } = require('./request')

module.exports = {
  testAPI: (data) => request('https://api.moji.com/moji-api/ai/userInfo', 'post', data)
}
