(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, createApp) {

__webpack_require__(/*! uni-pages */ 5);
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 6));
var _store = _interopRequireDefault(__webpack_require__(/*! ./store/store */ 13));
var _hooks = _interopRequireDefault(__webpack_require__(/*! ./store/hooks */ 75));
var _spaCustomHooks = _interopRequireDefault(__webpack_require__(/*! spa-custom-hooks */ 76));
var _polyfill = _interopRequireDefault(__webpack_require__(/*! ./polyfill/polyfill */ 77));
var _mixins = _interopRequireDefault(__webpack_require__(/*! ./polyfill/mixins */ 79));
var _report = _interopRequireDefault(__webpack_require__(/*! ./mixin/report */ 80));
var _share = _interopRequireDefault(__webpack_require__(/*! ./mixin/share.js */ 81));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _report2 = _interopRequireDefault(__webpack_require__(/*! ./utils/report */ 84));
var _config = __webpack_require__(/*! ./mixin/config */ 69);
var _tools = __webpack_require__(/*! ./utils/tools */ 18);
var _eventbus = _interopRequireDefault(__webpack_require__(/*! @/utils/eventbus */ 86));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
// 全局分享

// vuex store

// 引入自定义的具体钩子实现

// 自定义全局钩子，需结合store使用

// Api函数polyfill（目前为实验版本，如不需要，可删除！）';

// 全局mixins，用于实现setData等功能，请勿删除！';

// import MixinToken from './mixin/token'
// import Tabbar from './custom-tab-bar'

// import uView from 'uview-ui'
// 埋点上报

// Vue.use(uView)
// eslint-disable-next-line no-new
const tk = new _report2.default({
  tracks: _config.trackConfig
});
_vue.default.prototype.$elementTracker = tk.extraPageMethods && tk.extraPageMethods[0]; // 挂载$elementTracker到vue
_vue.default.prototype.bus = _eventbus.default;
_vue.default.prototype.goLogin = _tools.redirectLogin;
uni.$detectWebp = (0, _tools.detectWebp)();
_polyfill.default.init();
_vue.default.use(_spaCustomHooks.default, _hooks.default, _store.default);
_vue.default.filter("price", v => Number(v).toFixed(2));
_vue.default.mixin(_report.default);
_vue.default.mixin(_mixins.default);
_vue.default.mixin(_share.default);
// Vue.mixin(MixinToken)
_vue.default.config.productionTip = false;
_App.default.mpType = "app";
_App.default.store = _store.default;
_vue.default.prototype.$onLaunched = new Promise(resolve => {
  _vue.default.prototype.$isResolve = resolve;
});
const app = new _vue.default({
  ..._App.default
});
createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 6:
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 7);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 72);
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 74);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 7:
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../node_modules/vue-inset-loader!./App.vue?vue&type=script&lang=js& */ 8);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 72:
/*!*******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--9-oneOf-1-2!../node_modules/postcss-loader/src??ref--9-oneOf-1-3!../node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--9-oneOf-1-4!../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--9-oneOf-1-5!../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../node_modules/vue-inset-loader!./App.vue?vue&type=style&index=0&lang=scss& */ 73);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_node_modules_vue_inset_loader_index_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 73:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--9-oneOf-1-2!./node_modules/postcss-loader/src??ref--9-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--9-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--9-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./node_modules/vue-inset-loader!./src/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 8:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./node_modules/vue-inset-loader!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
__webpack_require__(/*! ./utils/init */ 9);
__webpack_require__(/*! ./utils/request */ 28);
var _vuex = __webpack_require__(/*! vuex */ 14);
var _report = __webpack_require__(/*! @/utils/report/report */ 67);
var _dict = __webpack_require__(/*! @/dict */ 70);
var _util = __webpack_require__(/*! ./utils/util */ 10);
var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 71));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// 初始化云函数
var _default = exports.default = {
  data() {
    return {
      loaded: false
    };
  },
  onLaunch(options) {
    console.error("小程序onLaunch====", options);
    // wx.cloud.init({
    //   env: 'cloud1-5gkxpioe4b34a94b', // 替换为你的云环境 ID
    //   traceUser: true
    // })
    this.$store.commit("setDefaultAvatar");
    this.getUserInfo();
    this.getDictionaryData();
    uni.hideTabBar();
    wx.setStorageSync("home-loaded", 1);
    uni.$on("getUserInfo", this.refreshUserInfo);
    this.initReportParams(); // 初始化上报需要的参数
    this.sendEnterEvent(); // 进入小程序发送活力值
    this.checkUpdate(); // 升级检测
    // 用户没用登录的时候需要设置随机默认头像
    uni.removeStorageSync("home-index");
    this.$store.dispatch("getConfig"); // 获取oss配置
    this.$store.dispatch("getCityTree"); // 获取选择地址数据

    wx.getSystemInfo({
      success: res => {
        wx.setStorageSync("sysInfo", res);
        console.log("getSystemInfo", res);
        this.loaded = true;
      }
    });
    wx.setBackgroundColor({
      backgroundColor: "#f9f9f9" // 窗口的背景色为白色
    });
  },
  onShow(options) {
    // 保存邀请码和渠道码 - 需要放在onShow里面，因为热启动时onLaunch不会触发
    this.setInviteAndQuDaoCode(options);
    this.$store.commit("setHihiInvitedEntry", false);
    if (this.loaded) {
      this.getUserInfo();
    }
  },
  onHide() {
    // this.$store.commit('clearData')
    console.log("1-------======22222111", _store.default.state);
  },
  globalData: {
    hihiPageStart: false,
    // 数据字典
    dictionaryTree: {},
    // 选择的课程一级分类 - 首页快捷入口跳到分类tab
    selectedCourseCategory: "",
    // 选择的课程排序方式 - 首页快捷入口跳到分类tab
    selectedCourseSort: 1,
    // 用户信息
    userInfo: null,
    // 用户openid
    openId: "",
    // 用户unionid
    unionId: "",
    // 邀请码
    inviteCode: "",
    // 用户来源
    userSource: "",
    // 分享时间
    shareLinkTime: "",
    // 分享地址
    shareLink: "",
    // 分享人openid
    inviteOpenId: "",
    // visitId - 用以上报-不要删
    visitId: "",
    // 网络类型 - 用以上报-不要删
    networkType: "",
    // 暂存上报队列
    tempBuryPointList: [],
    redirectPath: ""
  },
  methods: {
    ...(0, _vuex.mapActions)(["setIntegral"]),
    ...(0, _vuex.mapMutations)(["setDictionaryTree"]),
    // 设置渠道码和邀请码
    setInviteAndQuDaoCode(options) {
      console.error("setInviteAndQuDaoCode", options);
      let inviteCode = ""; // 邀请码
      let inviteSource = ""; // 皱纹活动道具来源
      let shareLinkTime = ""; // 皱纹活动分享时间
      let shareLink = "";
      let inviteOpenId = "";
      // 邀请码 - 通过用户分享的链接进来的
      if (options.query) {
        if (options.query.inviteCode) {
          inviteCode = options.query.inviteCode;
        }
        if (options.query.inviteSource) {
          inviteSource = options.query.inviteSource;
        }
        if (options.query.shareLinkTime) {
          shareLinkTime = options.query.shareLinkTime;
        }
        if (options.query.shareLink) {
          shareLink = options.query.shareLink;
        }
        if (options.query.openid) {
          inviteOpenId = options.query.openid;
        }
      }

      // 渠道码 & 邀请码
      if (options.query && options.query.scene) {
        const sc = (0, _util.getScene)(options.query.scene);
        console.log("---------parsedScene----------", sc);

        // 渠道码
        if (sc && sc.qudaoCode) {
          this.globalData.userSource = sc.qudaoCode;
        }
        /* 生成跳转链接的二维码带着跳转链接直接重定向页面，避免每次上活动需要发版生成链接的问题
           qudaoCode=encodeURIComponent('qudaoCode=FGCC20241225001')
           redirectPath=encodeURIComponent('/pages-activity/315/index')
           示例:二维码生成链接    pages/webview/redirect?scene=qudaoCode%3DFGCC20241225001%26redirectPath%3D%2Fpages-activity%2F315%2Findex
        */
        if (sc && sc.redirectPath) {
          this.globalData.redirectPath = sc.redirectPath;
        }
        // 邀请码 - 通过用户分享的小程序码进来的
        if (sc && sc.inviteCode) {
          inviteCode = sc.inviteCode;
          // 记录被邀请人和邀请人的信息
        }
      }
      this.$store.commit("setOpenIdSetted", false);

      // this.globalData.hihiPageStart = true

      // 存储邀请码
      this.globalData.shareLink = shareLink;
      this.globalData.inviteOpenId = inviteOpenId;
      this.globalData.inviteCode = inviteCode;
      this.globalData.inviteSource = inviteSource;
      this.globalData.shareLinkTime = shareLinkTime;
    },
    // 进入小程序加活力值
    sendEnterEvent() {
      if (uni.hasLogin()) {
        // DENG_LU活力值:'2'
        this.setIntegral({
          changeSource: _dict.TASK_DICT.DENG_LU,
          objectCode: this.globalData.userInfo.objectCode
        });
      }
    },
    // 获取数据字典
    async getDictionaryData() {
      const dictTree = await this.$store.dispatch("getDictTree");
      this.$store.dispatch("getSpecialEventInfo");
      this.globalData.dictionaryTree = dictTree;
    },
    // 初始化用户信息
    getUserInfo() {
      this.globalData.userInfo = (0, _util.lsGet)("userInfo");
      this.setCurrentOpenId();
      if (uni.hasLogin()) {
        this.getLatestUserInfo();
      } else {
        this.$isResolve();
      }
    },
    // 调用接口获取最新的用户信息
    getLatestUserInfo(refresh) {
      this.$store.dispatch("getUserInfo").then(res => {
        this.$isResolve();
        if (Object.keys(res).length === 1) return;
        this.globalData.userInfo = res;
        this.setCurrentOpenId();
        (0, _util.ls)("userInfo", res);
        //
        // 上传头像和昵称到iclub
        // iclubApiUserEditUserInfo({
        //   headUrl: res.personalUrl,
        //   nickName: res.nickname
        // })
        // 登录后重新刷新页面
        if (refresh) {
          (0, _util.refreshCurrentPage)();
          setTimeout(() => {
            uni.removeStorageSync("home-index");
          }, 500);
        }
      });
    },
    // 设置当前用户的openid - 区分小程序取不同字段
    setCurrentOpenId() {
      const user = this.globalData.userInfo || {};
      const openid = user.iclubOpenid;
      const unionid = user.unionid || "";
      this.globalData.openId = openid || "";
      this.globalData.unionId = unionid || "";
    },
    // 登录成功事件监听，比如获取用户信息 - refresh 是否刷新页面
    refreshUserInfo(refresh) {
      this.getLatestUserInfo(refresh);
      this.getDictionaryData();
    },
    // 初始化上报需要的参数 - 业务也可以用
    initReportParams() {
      // visitId
      this.globalData.visitId = Math.random().toString(16).substring(2) + new Date().getTime();

      // 网络类型
      uni.getNetworkType({
        success: res => {
          this.globalData.networkType = res.networkType;
        }
      });
      // 监听网络类型变化
      uni.onNetworkStatusChange(res => {
        this.globalData.networkType = res.networkType;
      });
      // 暂存上报队列
      uni.$on("stageBuryPointClick", this.stageBuryPointClick);
      // 监听openId和unionId获取事件
      uni.$on("getUserOpenIdAndUnionId", this.reportTempBuryPoint);
    },
    // 暂存上报队列
    stageBuryPointClick(params) {
      this.globalData.tempBuryPointList.push(params);
    },
    // 上报暂存的数据
    reportTempBuryPoint() {
      const list = [].concat(this.globalData.tempBuryPointList || []);
      for (let i = list.length; i >= 0; i--) {
        // 同时删除 tempBuryPointList 里的数据，防止重复上报
        this.globalData.tempBuryPointList.splice(i, 1);
        setTimeout(() => {
          const data = {
            openId: this.globalData.openId,
            unionid: this.globalData.unionId
          };
          if (list[i]) {
            (0, _report.reportBury)(Object.assign(list[i], data));
          }
        }, i * 1000);
      }
    },
    // 检查版本更新
    checkUpdate() {
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log("succ", res.hasUpdate);
      });
      updateManager.onUpdateReady(function (res) {
        uni.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
        console.log("fail", res);
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[0,"common/runtime","common/vendor"]]]);