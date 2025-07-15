/**
 * ai测颜数据在这里
 *
 */
const { request } = require("@/http/request");

module.exports = {
  testAPI: (params) => request("https://picsum.photos/id/0/info", "get", params),
  testAPI1: (data) => request("https://xxxx.com", "post", data),
  apiDianzan: (data) => request("/iclub/api/content/upvote", "post", data, true),
  findAliToken: () => request("/iclub/openApi/fileUpload/findAliToken", "post", {}, true, false, false, false),
};
