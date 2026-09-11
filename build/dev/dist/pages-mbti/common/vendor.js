(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages-mbti/common/vendor"],{

/***/ 118:
/*!************************************!*\
  !*** ./src/pages-mbti/api/demo.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiTest = void 0;
var _request = __webpack_require__(/*! ./request */ 119);
var apiTest = function apiTest(data) {
  return (0, _request.request)({
    url: "/iclub-api/api/product/list",
    // url:'/mbti-api/xxxx/info',
    method: "GET",
    data: data
  });
};
exports.apiTest = apiTest;

/***/ }),

/***/ 119:
/*!***************************************!*\
  !*** ./src/pages-mbti/api/request.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _util = __webpack_require__(/*! @/utils/util */ 10);
var _tools = __webpack_require__(/*! @/utils/tools */ 20);
var _index = __webpack_require__(/*! @/utils/index */ 18);
var _index2 = __webpack_require__(/*! @/dict/index */ 27);
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = __webpack_require__(/*! @/http/env */ 12),
  env = _require.env,
  baseNewUrl = _require.baseNewUrl,
  baseIclubUrl = _require.baseIclubUrl;
// 懒加载避免与 store 模块的循环依赖
var getStore = function getStore() {
  return __webpack_require__(/*! @/store/index */ 13).default;
};
module.exports = {
  request: function request(_ref) {
    var url = _ref.url,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? "POST" : _ref$method,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$isJson = _ref.isJson,
      isJson = _ref$isJson === void 0 ? true : _ref$isJson,
      _ref$noToast = _ref.noToast,
      noToast = _ref$noToast === void 0 ? true : _ref$noToast,
      _ref$encrypt = _ref.encrypt,
      encrypt = _ref$encrypt === void 0 ? false : _ref$encrypt,
      _ref$auth = _ref.auth,
      auth = _ref$auth === void 0 ? true : _ref$auth;
    var json = isJson ? "application/json" : "application/x-www-form-urlencoded";
    var base = url.includes("/iclub-api/") ? baseIclubUrl : baseNewUrl;

    // 这里可以根据不同的接口路径，设置不同的baseUrl，这里换成你们需要的签注，base的请求url换成你们的域名，注意测试环境和正式环境
    if (url.includes("/mbti-api")) {
      // base = env === "prod" ? "https://consultation-api-backend.imeik.com" : "https://consultation-api-backend-test.imeik.com";
      base = env === "prod" ? "https://mbti.xxx.com" : "https://mbti-test.xxx.com";
    }
    var fullUrl = url.includes("http") ? url : "".concat(base).concat(url);
    var token = (0, _util.lsGet)("iclubUserToken3");

    // eslint-disable-next-line no-async-promise-executor
    return new Promise( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
        var whiteList, _version, encryptKey, encryptIV, SecurityVersion;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 不需要登录就可以调用的接口白名单
                whiteList = ["queryPageForStyleDoctor", "iclub-api/api/operate/queryOperate", "iclub-api/api/authenticity/queryAuthenticity", "qxcollege/api/dictionary/tree", "qxcollege/api/buryPoint/click", "burypoint/pageEventReport", "iclub-api/api/content/info", "iclub-api/api/operate/queryOperate", "iclub-api/api/home/listhomeContent", "iclub-api/api/product/list", "iclub-api/api/product/info",
                // 'qxcollege/api/fileUpload/findAliToken',
                "iclub-api/api/user/loginForMiniProgram", "passport/api/sso/openid", "passport/api/user/uploadUserInfo", "/iclub-api/api/content/listProductContent", "/iclub-api/api/goods/list", "/iclub-api/api/content/info2", "/iclub-api/openApi/test/testSM4", "/iclub-api/openApi/activity/queryUnloginChallengeMatchActInfo", "/iclub-api/api/activity/ehi/getEhiGameInfo", "openApi"];
                if (!(!token && !whiteList.find(function (i) {
                  return url.includes(i);
                }) && auth)) {
                  _context.next = 4;
                  break;
                }
                resolve({
                  data: {}
                });
                return _context.abrupt("return");
              case 4:
                // 把小程序版本号拼接到query里传给接口
                _version = (0, _index.getCurrentAppVersion)(); // 请求头带上渠道code
                // const channel = (getApp() && getApp().globalData && getApp().globalData.userSource) || ''
                encryptKey = (0, _util.lsGet)("encryptKey");
                encryptIV = (0, _util.lsGet)("encryptIV");
                SecurityVersion = (0, _util.lsGet)("encryptVersion"); // 请求头带上渠道code
                uni.request({
                  url: fullUrl + (fullUrl.includes("?") ? "&" : "?") + "_version=" + _version,
                  // url: fullUrl,
                  method: method,
                  data: (0, _tools.sortObjectKeys)(data),
                  // data,
                  header: {
                    "Content-type": json,
                    Authorization: token,
                    // channel: channel,
                    app: "IClub",
                    Ticket: (0, _util.lsGet)("ticket"),
                    openId: (0, _util.lsGet)("openId"),
                    SecurityVerify: SecurityVersion ? (0, _tools.getSecurityToken)({
                      data: data,
                      encryptIV: encryptIV,
                      encryptKey: encryptKey
                    }) : "",
                    SecurityVersion: SecurityVersion
                  },
                  success: function success(res) {
                    if (!url.includes("pageEventReport")) {
                      console.log("********************************************************************************\n\u8BF7\u6C42\u5730\u5740\uFF1A".concat(url, "\n\uD83D\uDCE6 \u8BF7\u6C42\u53C2\u6570\uFF1A"), data, " \n\u2705 \u8FD4\u56DE\u7ED3\u679C\uFF1A", res === null || res === void 0 ? void 0 : res.data, "********************************************************************************");
                    }
                    if (res.data.code === 10000) {
                      var pages = getCurrentPages().reverse();
                      var pageUrl = pages[0] && pages[0].route;
                      uni.$emit("captcha-".concat(pageUrl), data.methodName);
                      reject(new Error("captcha"));
                      return;
                    }
                    if (res.data.code === 200) {
                      (0, _util.lsDel)("ticket");
                      resolve(res.data);
                    } else if (res.data.code in _index2.GONGGAO_DICT) {
                      var message = getStore().state.config.commonConfig.GONGGAO_DICT[res.data.code];
                      getStore().commit("setSystemUpdate", message);
                    } else if (res.data.code === 300) {
                      // token 错误、过期
                      // uni.cToast('登录状态失效\r\n请重新登录')
                      uni.$emit("toast", "登录状态失效\r\n请重新登录");
                      uni.clearLogin(); // 清除token
                      getStore().commit("setIsLogin", false);
                      // 刷新当前页面，重新登录
                      // setTimeout(() => {
                      //   refreshCurrentPage()
                      // }, 2000)
                      reject(res.data);
                    } else {
                      var msg = res.data && res.data.message || "服务器开小差了，请稍后再试";
                      // 有些业务自己处理错误信息，不需要这里toast
                      if (!noToast) {
                        uni.cToast(msg);
                      }
                      reject(Object.assign(res.data, {
                        message: msg
                      }));
                    }
                  },
                  fail: function fail() {
                    // uni.cToast('请求失败，请检查网络')
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject({
                      message: "请求失败，请检查网络"
                    });
                  }
                });
              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-mbti/common/vendor.js.map