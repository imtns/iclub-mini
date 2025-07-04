(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages-sub/common/vendor"],{

/***/ 106:
/*!*********************************************!*\
  !*** ./src/pages-sub/ai-ceyan/api/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * ai测颜数据在这里
 *
 */
const {
  request
} = __webpack_require__(/*! @/http/request */ 16);
module.exports = {
  testAPI: params => request("https://picsum.photos/id/0/info", "get", params),
  testAPI1: data => request("https://xxxx.com", "post", data),
  apiDianzan: data => request("/iclub/api/content/upvote", "post", data, true)
};

/***/ })

}]);