<script>
import "./utils/init";
import "./utils/request"; // 初始化云函数
import { mapMutations, mapActions } from "vuex";
import { reportBury } from "@/utils/report/report";
import { TASK_DICT } from "@/dict";
import { getScene, ls, lsGet, refreshCurrentPage } from "./utils/util";
import store from "./store";
export default {
  data() {
    return {
      loaded: false,
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
      success: (res) => {
        wx.setStorageSync("sysInfo", res);
        console.log("getSystemInfo", res);
        this.loaded = true;
      },
    });

    wx.setBackgroundColor({
      backgroundColor: "#f9f9f9", // 窗口的背景色为白色
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
    console.log("1-------======22222111", store.state);
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

    redirectPath: "",
  },
  methods: {
    ...mapActions(["setIntegral"]),
    ...mapMutations(["setDictionaryTree"]),

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
        const sc = getScene(options.query.scene);
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
        this.setIntegral({ changeSource: TASK_DICT.DENG_LU, objectCode: this.globalData.userInfo.objectCode });
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
      this.globalData.userInfo = lsGet("userInfo");
      this.setCurrentOpenId();
      if (uni.hasLogin()) {
        this.getLatestUserInfo();
      } else {
        this.$isResolve();
      }
    },

    // 调用接口获取最新的用户信息
    getLatestUserInfo(refresh) {
      this.$store.dispatch("getUserInfo").then((res) => {
        this.$isResolve();

        if (Object.keys(res).length === 1) return;
        this.globalData.userInfo = res;
        this.setCurrentOpenId();
        ls("userInfo", res);
        //
        // 上传头像和昵称到iclub
        // iclubApiUserEditUserInfo({
        //   headUrl: res.personalUrl,
        //   nickName: res.nickname
        // })
        // 登录后重新刷新页面
        if (refresh) {
          refreshCurrentPage();
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
        success: (res) => {
          this.globalData.networkType = res.networkType;
        },
      });
      // 监听网络类型变化
      uni.onNetworkStatusChange((res) => {
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
            unionid: this.globalData.unionId,
          };
          if (list[i]) {
            reportBury(Object.assign(list[i], data));
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
          },
        });
      });

      updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
        console.log("fail", res);
      });
    },
  },
};
</script>

<style lang="scss">
@import "./uni.scss";
@import "./static/font/iplus/iconfont.css";
// @import './static/font/Gilroy-Bold/index.css';
page {
  min-height: 100vh !important;
  background-color: #f7f7f7 !important;
}

* {
  word-break: break-all;
}

// 去掉烦人的边框
button::after {
  border: 0; // 或者 border: none;
}

@font-face {
  font-weight: bold;
  font-family: Gilroy;
  font-style: normal;
  src: url("https://udstatic.imeik.com/pcUploads/1726634114509/Gilroy-Bold.woff2") format("woff2"),
    url("https://udstatic.imeik.com/pcUploads/1726634111844/Gilroy-Bold.woff") format("woff"),
    url("https://udstatic.imeik.com/pcUploads/1726634109135/Gilroy-Bold.ttf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: Gilroy-bold; /* 指定字体名称 */
  src: url("https://udstatic.imeik.com/pcUploads/1704872978082/gilroy-bold-4.otf");
}

@font-face {
  font-family: AlimamaShuHeiTi; /* 指定字体名称 */
  src: url("https://udstatic.imeik.com/iclub/font/AlimamaShuHeiTi.otf");
}

@font-face {
  font-family: ShuHeiTi-Bold; /* 指定字体名称 */
  src: url("https://udstatic.imeik.com/pcUploads/1729840157020/%E9%98%BF%E9%87%8C%E5%A6%88%E5%A6%88%E6%95%B0%E9%BB%91%E4%BD%93AlimamaShuHeiTi-Bold.ttf");
}

wx-swiper .wx-swiper-dot {
  width: 8rpx;
  height: 8rpx;
}
wx-swiper .wx-swiper-dot-active {
  width: 24rpx;
  height: 8rpx;
  background: #fff;
  border-radius: 4rpx;
}
</style>
