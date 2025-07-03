(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages-sub/common/vendor"],{

/***/ 43:
/*!*********************************************!*\
  !*** ./src/pages-sub/ai-ceyan/api/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * ai测颜数据在这里
 *
 */
var _require = __webpack_require__(/*! @/http/request */ 15),
  request = _require.request;
module.exports = {
  testAPI: function testAPI(params) {
    return request('https://picsum.photos/id/0/info', 'get', params);
  },
  testAPI1: function testAPI1(data) {
    return request('https://xxxx.com', 'post', data);
  }
};

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-sub/common/vendor.js.map