// 配置专属域名
import { getQueryParam, ls, lsGet, lsDel, refreshCurrentPage } from "@/utils/util";
import { getCurrentAppVersion } from "@/utils/index";
import { getUniqID, sortObjectKeys } from "@/utils/tools";
import store from "@/store/store";
import { SM4Util } from "@/utils/sm4";

const { baseNewUrl, baseIclubUrl } = require("./env");

module.exports = {
  /**
   *
   * @param {*} url
   * @param {*} method
   * @param {*} data
   * @param {*} isMessage
   * @param {*} isJson
   * @param {*} noToast
   * @param {*} hideLoading
   * @returns
   */
  request: function (url, method = "GET", data = {}, isMessage = true, isJson = false, noToast = false, hideLoading = true, headers = {}) {
    const json = isJson ? "application/json" : "application/x-www-form-urlencoded";
    // iclub的请求走另外的接口域名
    const base = url.includes("/iclub/") ? baseIclubUrl : baseNewUrl;
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
        "http",
        "/biz-passport/passport/login/getOpenId",
        "iclub/api/operate/queryOperate",
        "iclub/api/authenticity/queryAuthenticity",
        "qxcollege/api/dictionary/tree",
        "qxcollege/api/buryPoint/click",
        "iclub/api/content/info",
        "iclub/api/operate/queryOperate",
        "iclub/api/home/listhomeContent",
        "iclub/api/product/list",
        "iclub/api/product/info",
        "qxcollege/api/fileUpload/findAliToken",
        "iclub/api/user/loginForMiniProgram",
        "passport/api/sso/openid",
        "passport/api/user/uploadUserInfo",
        "/iclub/api/content/listProductContent",
        "/iclub/api/goods/list",
        "/iclub/api/content/info2",
        "/iclub/api/goddess/queryActivityInfo",
        "/passport/api/sso/sendSmsVerCode",
        "/passport/api/sso/loginForMiniProgramForNewUser",
        "loginByMiniApp",
        "/iclub/api/activity/ehi/getEhiGameInfo",
        "/qxcollege/admin/city/tree",
      ];
      if (!token && !whiteList.find((i) => url.includes(i)) && url.indexOf("openApi") === -1) {
        resolve({ data: {} });

        return;
      }

      // 把小程序版本号拼接到query里传给接口
      const _version = getCurrentAppVersion();
      // 请求头带上渠道code
      const channel = (getApp() && getApp().globalData && getApp().globalData.userSource) || "";
      const encryptKey = lsGet("encryptKey");
      const encryptIV = lsGet("encryptIV");
      const SecurityVersion = lsGet("encryptVersion");
      const uniqueFlag = getUniqID();
      console.log("🚀 ~ returnnewPromise ~ uniqueFlag:", uniqueFlag);
      uni.request({
        url: fullUrl + (fullUrl.includes("?") ? "&" : "?") + "_version=" + _version,
        timeout: 30000,
        method,
        data: sortObjectKeys(data),
        header: {
          ...headers,
          "Content-type": json,
          Authorization: token,
          channel: channel,
          "business-sys": "iclub",
          "business-app": "iclub",
          Ticket: lsGet("ticket"),
          app: "IClub",
          SecurityVerify:
            encryptKey &&
            new SM4Util().encryptCustom_CBC(
              JSON.stringify({
                uniqueFlag,
                callTime: Date.now(),
                paramter: sortObjectKeys(data),
              }),
              encryptIV,
              encryptKey
            ),
          encryptIV,
          SecurityVersion,
        },
        success(res) {
          console.log("%c%s", "color: green; background: yellow; font-family: Micirosft Yahei; font-size: 24px;", " 出参明细：", res);

          // 新的token
          if (res.header && res.header["x-imeik-refreshToken"]) {
            ls("iclubUserToken3", res.header["x-imeik-refreshToken"]);
          }
          function isObject(value) {
            return typeof value === "object" && value !== null;
          }
          if (res.data && isObject(res.data)) {
            // 解密
            resolve(res.data);
            return;
          }
          // 请求成功，清除ticket
          lsDel("ticket");
          if (res.data.code === 10000) {
            const pages = getCurrentPages().reverse();
            const pageUrl = pages[0] && pages[0].route;
            uni.$emit(`captcha-${pageUrl}`, data.methodName);
            reject(res.data);
          } else if (res.data.code === 200) {
            if (isMessage) {
              resolve(res.data.data);
            } else {
              resolve(res.data);
            }
            if (hideLoading) {
              uni.hideLoading();
            }
          } else if (res.data.code === 300) {
            // token 错误、过期
            uni.$emit("toast", "登录状态失效\r\n请重新登录");
            uni.clearLogin(); // 清除token
            store.commit("setIsLogin", false);
            store.commit("setTodayCheckIn", false);

            // 刷新当前页面，重新登录
            setTimeout(() => {
              refreshCurrentPage();
              reject();
            }, 2000);
          } else {
            const msg = (res.data && res.data.message) || "接口问题，请检查";
            // 有些业务自己处理错误信息，不需要这里toast
            if (!noToast) {
              setTimeout(() => {
                uni.$emit("toast", msg);
              }, 300);
            }
            reject(res.data);
          }
        },
        fail(err) {
          console.log("请求失败，请检查网络", err);
          uni.$emit("toast", "请求失败，请检查网络");
          // eslint-disable-next-line prefer-promise-reject-errors
          reject("请求失败，请检查网络");
        },
      });
    });
  },
};
