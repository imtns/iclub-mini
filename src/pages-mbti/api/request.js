// 配置专属域名
import { getQueryParam, ls, lsGet, lsDel } from "@/utils/util";
import { sortObjectKeys, getSecurityToken } from "@/utils/tools";
import { getCurrentAppVersion } from "@/utils/index";
import { GONGGAO_DICT } from "@/dict/index";
const { env, baseNewUrl, baseIclubUrl } = require("@/http/env");
// 懒加载避免与 store 模块的循环依赖
const getStore = () => require("@/store/index").default;

module.exports = {
  request: function ({ url, method = "POST", data = {}, isJson = true, noToast = true, encrypt = false, auth = true }) {
    const json = isJson ? "application/json" : "application/x-www-form-urlencoded";
    let base = url.includes("/iclub-api/") ? baseIclubUrl : baseNewUrl;

    // 这里可以根据不同的接口路径，设置不同的baseUrl，这里换成你们需要的签注，base的请求url换成你们的域名，注意测试环境和正式环境
    if (url.includes("/mbti-api")) {
      // base = env === "prod" ? "https://consultation-api-backend.imeik.com" : "https://consultation-api-backend-test.imeik.com";
      base = env === "prod" ? "https://mbti.xxx.com" : "https://mbti-test.xxx.com";
    }

    const fullUrl = url.includes("http") ? url : `${base}${url}`;
    let token = lsGet("iclubUserToken3");
    // #ifdef H5
    if (getQueryParam("token")) {
      token = getQueryParam("token");
      ls("iclubUserToken3", token);
    }
    // #endif

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // 不需要登录就可以调用的接口白名单
      const whiteList = [
        "queryPageForStyleDoctor",
        "iclub-api/api/operate/queryOperate",
        "iclub-api/api/authenticity/queryAuthenticity",
        "qxcollege/api/dictionary/tree",
        "qxcollege/api/buryPoint/click",
        "burypoint/pageEventReport",
        "iclub-api/api/content/info",
        "iclub-api/api/operate/queryOperate",
        "iclub-api/api/home/listhomeContent",
        "iclub-api/api/product/list",
        "iclub-api/api/product/info",
        // 'qxcollege/api/fileUpload/findAliToken',
        "iclub-api/api/user/loginForMiniProgram",
        "passport/api/sso/openid",
        "passport/api/user/uploadUserInfo",
        "/iclub-api/api/content/listProductContent",
        "/iclub-api/api/goods/list",
        "/iclub-api/api/content/info2",
        "/iclub-api/openApi/test/testSM4",
        "/iclub-api/openApi/activity/queryUnloginChallengeMatchActInfo",
        "/iclub-api/api/activity/ehi/getEhiGameInfo",
        "openApi",
      ];
      if (!token && !whiteList.find((i) => url.includes(i)) && auth) {
        resolve({ data: {} });
        return;
      }
      // 把小程序版本号拼接到query里传给接口
      const _version = getCurrentAppVersion();
      // 请求头带上渠道code
      // const channel = (getApp() && getApp().globalData && getApp().globalData.userSource) || ''
      const encryptKey = lsGet("encryptKey");
      const encryptIV = lsGet("encryptIV");
      const SecurityVersion = lsGet("encryptVersion");
      // 请求头带上渠道code
      uni.request({
        url: fullUrl + (fullUrl.includes("?") ? "&" : "?") + "_version=" + _version,
        // url: fullUrl,
        method,
        data: sortObjectKeys(data),
        // data,
        header: {
          "Content-type": json,
          Authorization: token,
          // channel: channel,
          app: "IClub",
          Ticket: lsGet("ticket"),
          openId: lsGet("openId"),
          SecurityVerify: SecurityVersion ? getSecurityToken({ data, encryptIV, encryptKey }) : "",
          SecurityVersion,
        },

        success(res) {
          if (!url.includes("pageEventReport")) {
            console.log(
              `********************************************************************************
请求地址：${url}
📦 请求参数：`,
              data,
              ` 
✅ 返回结果：`,
              res?.data,
              "********************************************************************************",
            );
          }
          if (res.data.code === 10000) {
            const pages = getCurrentPages().reverse();
            const pageUrl = pages[0] && pages[0].route;
            uni.$emit(`captcha-${pageUrl}`, data.methodName);
            reject(new Error("captcha"));
            return;
          }
          if (res.data.code === 200) {
            lsDel("ticket");
            resolve(res.data);
          } else if (res.data.code in GONGGAO_DICT) {
            const message = getStore().state.config.commonConfig.GONGGAO_DICT[res.data.code];
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
            const msg = (res.data && res.data.message) || "服务器开小差了，请稍后再试";
            // 有些业务自己处理错误信息，不需要这里toast
            if (!noToast) {
              uni.cToast(msg);
            }
            reject(Object.assign(res.data, { message: msg }));
          }
        },
        fail() {
          // uni.cToast('请求失败，请检查网络')
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message: "请求失败，请检查网络" });
        },
      });
    });
  },
};
