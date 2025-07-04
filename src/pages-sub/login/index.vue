<template>
  <div class="container">
    <x-loading v-if="loading" background="white" />
    <loginform :invite="invite" :code="code" :attrs="attrs">
      <div @click="handleLogin">
        <button v-if="!agree" class="wx-btn">一键登录</button>
        <button v-else class="wx-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键登录</button>
      </div>
    </loginform>
    <x-toast ref="toast" />
  </div>
</template>

<script>
import { getCurrentAppId } from "@/utils";
import { EVENT_ID_ELEMENT_CLICK } from "@/mixin/config";
import report from "@/utils/report/report"; // 埋点上报
import { getActivePage } from "@/utils/report/helper";
import { xlogin, setEncryptKey, userRegister } from "@/http/wx";

import { ls, lsGet, lsDel } from "@/utils/util";
import { mapActions } from "vuex";
import { getEncryptData } from "@/utils/tools";
import { TASK_DICT } from "@/dict";
const { env } = require("@/http/env");
console.log("env", env);
const header = {
  businessApp: "iclub",
  businessSys: "iclub",
  envVersion: env === "prod" ? "production" : "test",
};
export default {
  data() {
    return {
      isPhoneLoginOpen: false,
      loading: false,
      loginPlugin: requirePlugin("myPlugin"),
      invite: (getApp().globalData && getApp().globalData.inviteCode) || "",
      agree: false,
      code: "",
      attrs: {},
      header,
    };
  },

  onLoad() {
    this.getCode();
    this.getAttrs();
    // 监听用户是否点击用户隐私协议
    this.loginPlugin.emitter.on("choosePrivacy", (data) => {
      this.agree = data;
    });
    this.loginPlugin.emitter.on("noLogin", () => {
      console.log("noLogin点击了暂不登录");
      this.loginPlugin.emitter.off("noLogin");
      uni.navigateBack();
    });
    this.loginPlugin.emitter.on("handleLoginData", (res) => {
      console.log("手机号登录成功");
      this.handleLoginOK(res);
    });
    this.loginPlugin.emitter.on("phoneLoginOpen", (data) => {
      this.isPhoneLoginOpen = data;
    });
  },

  onUnload() {
    this.loginPlugin.emitter.off("handleLoginData");
    this.loginPlugin.emitter.off("noLogin");
    this.loginPlugin.emitter.off("phoneLoginOpen");
    this.loginPlugin.emitter.off("choosePrivacy");
    this.loginPlugin.emitter.off("closeLoginPhone");
  },

  watch: {},
  mounted() {
    getApp().globalData.logining = false;
    // this.reportPvEvent('show', data.page)
  },

  created() {},
  methods: {
    ...mapActions(["setIntegral"]),
    back() {
      //   console.log('按了返回')
      //   if (this.isPhoneLoginOpen) {
      //     // 这里需要关闭手机登录弹窗（这里告诉插件，我要关闭手机登录的弹窗了）
      //     this.loginPlugin.emitter.emit('closeLoginPhone', false)
      //     this.isPhoneLoginOpen = false
      //   } else {
      uni.navigateBack();
      //   }
    },
    getAttrs() {
      this.attrs = {
        // 小程序的logo，具体大小联系UI
        logo: "https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1711074121845/iclub-logo.png",
        // 小程序的标题
        text: "IMEIK爱+",
        // 手机号验证码登录后完成后需要返回的页面
        // biz-passport平台区分 具体请看文档https://imeik.feishu.cn/docx/BZnFdMtY1oLS6KxLGXIcDIjWnhf
        ...header,
      };
    },
    async handleLoginOK(res) {
      console.log("登录成功，已获取token", res.token);

      ls("iclubUserToken3", res.token || "");
      ls("openId", res.openId);
      ls("unionId", res.unionId);
      try {
        const data = {
          inviteCode: getApp?.()?.globalData?.inviteCode || "",
          inviteSource: getApp?.()?.globalData.inviteSource || "",
          shareLinkTime: getApp?.()?.globalData.shareLinkTime || "",
        };
        const result = await userRegister(data);
        ls("newUserFlag", result.newUserFlag === "1");

        const { encryptKey, iv: encryptIV, version } = await getEncryptData();
        console.log("encryptKey", encryptKey);
        console.log("encryptIV", encryptIV);
        console.log("version", version);

        await setEncryptKey({ businessSys: "iclub", iv: encryptIV, version });
        ls("encryptKey", encryptKey);
        ls("encryptIV", encryptIV);
        ls("encryptVersion", version);
        const userInfo = await this.$store.dispatch("getUserInfo");
        this.loading = false;
        this.$store.commit("setIsLogin", true);
        // 登录加积分
        await this.setIntegral({ changeSource: TASK_DICT.DENG_LU, objectCode: userInfo.objectCode });
      } catch (err) {
        console.error("登录异常", err);
      } finally {
        // this.back()
        if (lsGet("returnUrl")) {
          uni.redirectTo({ url: lsGet("returnUrl") });
          lsDel("returnUrl");
        } else {
          this.back();
        }
      }
    },
    async getCode() {
      const that = this;
      return new Promise((resolve) => {
        wx.login({
          success(data) {
            if (data.errMsg === "login:ok") {
              console.log("code:::", data.code);
              that.code = data.code;
              resolve(data.code);
            }
          },
          fail(err) {
            console.log("获取登录CODE失败", err);
          },
        });
      });
    },
    // 上报点击
    reportLoginEvent(data) {
      const cur = getActivePage() || {}; // 当前路由

      report({ eventId: EVENT_ID_ELEMENT_CLICK, pageUrl: "pages/login/index", referrerUrl: cur.route, dataKeys: data });
    },

    async getPhoneNumber({ detail }) {
      // 用户拒绝操作
      if (detail.errMsg !== "getPhoneNumber:ok") {
        this.reportLoginEvent({ activityName: "取消", actionRank: 5, activityId: "p005_phone_cannel" });
        return;
      }
      const { iv, encryptedData } = detail;
      this.wxLogin({ iv, encryptedData });
      this.reportLoginEvent({ activityName: "允许", actionRank: 6, activityId: "p005_phone_permit" });
    },
    handleLogin() {
      this.reportLoginEvent({ activityName: "微信授权", actionRank: 2, activityId: "p005_register_yes" });
    },
    async wxLogin({ encryptedData, iv, code }) {
      this.loading = true;
      const params = {
        encryptedData,
        appId: getCurrentAppId(),
        invite: (getApp().globalData && getApp().globalData.inviteCode) || "",
        code: this.code,
        iv,
        registerChannel: "", // 暂无用
      };
      // 临时dev登录
      if (process.env.NODE_ENV === "development") {
        xlogin(params).then((res) => {
          this.handleLoginOK(res);
        });
      } else {
        this.loginPlugin
          .wxLogin(params, header)
          .then(async (res) => {
            this.handleLoginOK(res);
            // 后续的业务逻辑处理
          })
          .catch(() => {
            console.log("登录失败");
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 100vh;
  background-color: white !important;
  .wx-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 622rpx;
    height: 88rpx;
    color: #fff;
    font-weight: 500;
    font-size: 28rpx;
    line-height: 40rpx;
    text-align: center;
    background: #05bc24;
    border-radius: 16rpx;
    .btn-img {
      z-index: 10;
      width: 32rpx;
      height: 32rpx;
      margin-right: 8rpx;
    }
  }
}
</style>
