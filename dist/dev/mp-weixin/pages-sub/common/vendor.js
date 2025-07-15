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
    return request('https://picsum.photos/api/activity/csly/game/gameRank', 'post', data);
  }
};

/***/ }),

/***/ 44:
/*!*********************************************!*\
  !*** ./src/pages-sub/ai-ceyan/tool/tool.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  ASSETSURL: 'https://cdn1.vrupup.com/s/1549/img/'
};

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-sub/common/vendor.js.map