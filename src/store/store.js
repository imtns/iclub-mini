import Vue from "vue";
import Vuex from "vuex";
import { getIntegralBalanceNew, getUserSignForOneWeek, getIntegralTask } from "@/http/tasks";
// import { checkFuliFlag } from "@/http/fuli";
// import { getComment } from '@/http/content'
import { userInfo, wxUpdateOpenId } from "@/http/wx.js";
import { iclubApiUserAddIntegral } from "@/http/mine.js";
import { apiRecordShareInfo } from "@/http/common";
import { ls, lsGet } from "@/utils/util";
import { getCurrentAppId } from "@/utils";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    commonConfig: {},
    isLogin: !!lsGet("iclubUserToken3"),
    captchaFlag: false,
    userInfo: {},
    addressId: "",
    commentList: [],
    isTodayCheckIn: false, // 今日签到状态
    defaultAvatar: "",
    balance: 0, // 用户活力值
    willExpiredBalance: 0, // 即将过期活力值
    // dictionaryTree: {}, // 数据字典
    iclubDictoryTree: {}, // 数据字典
    signTask: {}, // 签到任务
    isSpecialEventRunning: false, // 是否有活动在进行中
    fuliFlag: false, // 判断用户是否拥有过福利金
    systemUpdate: false, // 系统升级弹窗
    // 分享code
    shareCode: "",
    // 赠卡code
    shareCode1: "",
    openId: "",
    unionId: "",
    hihiPageStart: false,
    hihiInvitedEntry: false,
    openIdHasSetted: false,
    cityTree: [],
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    sms4(state) {
      return {
        key: (state.iclubDictoryTree.options || []).find((item) => item.name === "sms_key")?.sign || "",
        iv: (state.iclubDictoryTree.options || []).find((item) => item.name === "sms_iv")?.sign || "",
      };
    },
    eventInfo(state) {
      return {
        startTime: (state.iclubDictoryTree.options || []).find((item) => item.name === "activityStartTime")?.sign || "",
        endTime: (state.iclubDictoryTree.options || []).find((item) => item.name === "activityEndTime")?.sign || "",
      };
    },
  },
  mutations: {
    setDictionaryTree(state, payload) {
      console.log("setDictionaryTree", payload);
      //   state.dictionaryTree = payload
      state.iclubDictoryTree = payload;
    },
    setFuliFlag(state, payload) {
      state.fuliFlag = payload;
    },
    setIsLogin(state, payload) {
      console.warn("setIsLogin::::", payload);
      state.isLogin = payload;
    },
    setCommentList(state, payload) {
      state.commentList = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setBalance(state, payload) {
      state.balance = payload.integralBalance;
      state.willExpiredBalance = payload.willExpiredIntegral;
    },

    setTodayCheckIn(state, payload) {
      state.isTodayCheckIn = payload;
    },
    setSignTask(state, payload) {
      state.signTask = payload;
    },
    setDefaultAvatar(state) {
      const defaultAvatars = [
        "https://udstatic.imeik.com/pcUploads/1705285352902/1.png",
        "https://udstatic.imeik.com/pcUploads/1705285380205/2.png",
        "https://udstatic.imeik.com/pcUploads/1705285409154/3.png",
      ];
      const randomNumber = Math.floor(Math.random() * defaultAvatars.length);
      state.defaultAvatar = defaultAvatars[randomNumber];
    },
    setConfig(state, payload) {
      console.warn("load-config::::::::", payload);
      state.commonConfig = payload;
      if (payload.systemUpdate) {
        // state.systemUpdate = true
        state.systemUpdate = payload.systemUpdate;
      }
    },
    setIsSpecialEventRunning(state, payload) {
      state.isSpecialEventRunning = payload;
    },
    setCaptchaFlag(state, value) {
      state.captchaFlag = value;
    },
    setSystemUpdate(state, value) {
      state.systemUpdate = value;
    },
    // 设置分享码
    storeShareCode(state, params) {
      state.shareCode = params;
    },
    // 设置分享码
    storeShareCode1(state, params) {
      state.shareCode1 = params;
    },
    setAddressId(state, addressId) {
      state.addressId = addressId;
    },
    setOpenIdSetted(state, value) {
      state.openIdHasSetted = value;
    },
    setOpenId(state, { unionid, openid }) {
      state.openId = openid;
      console.log("🚀 ~ setOpenId ~ openid:", openid);
      state.unionId = unionid;
      // 记录分享信息
      let fromPage = getApp().globalData.shareLink || "/pages/home/index";
      const inviteOpenId = getApp().globalData.inviteOpenId;
      const inviteUserCode = getApp().globalData.inviteCode;
      const inviteeOpenId = openid;
      const inviteeUserCode = state.userInfo?.objectCode;
      const shareTime = getApp().globalData.shareLinkTime;
      if (fromPage?.includes("%")) {
        fromPage = decodeURIComponent(fromPage);
      }
      // 两个相等代表自己点自己的分享
      if (inviteOpenId === inviteeOpenId) {
        return;
      }
      // 通过渠道二维码进来的小程序记录分享信息等
      if (!getApp().globalData.userSource && inviteOpenId && !state.openIdHasSetted) {
        console.error("----------------- mixinGetOpenId -----------------");
        apiRecordShareInfo({
          channelCode: "",
          fromPage,
          inviteOpenId,
          inviteUserCode,
          inviteeOpenId,
          inviteeUserCode,
          shareTime,
        }).then(() => {
          state.openIdHasSetted = true;
        });
      }
    },
    setHihiPageStart(state, hihiPageStart) {
      state.hihiPageStart = hihiPageStart;
    },
    setHihiInvitedEntry(state, hihiInvitedEntry) {
      state.hihiInvitedEntry = hihiInvitedEntry;
    },
    setCityTree(state, payload) {
      state.cityTree = payload;
    },
  },

  actions: {
    getCityTree({ commit }) {
      console.error("getCityTree");
      return new Promise((resolve) => {
        wx.request({
          url: "https://udstatic.imeik.com/iclub/json/city.json",
          success(res) {
            commit("setCityTree", res.data.data);
            resolve();
          },
        });
      });
      // cityTree().then((res) => {
      //   commit('setCityTree', res)
      // })
    },
    getConfig({ commit }) {
      wx.request({
        url: `https://imeikud.oss-cn-beijing.aliyuncs.com/iclub/config${
          process.env.VUE_APP_BUILD_ENV === "prod" ? "" : "_test"
        }.json?v=${Math.random()}`,
        success(res) {
          console.log("setConfig-data", res.data);
          commit("setConfig", res.data);
        },
      });
    },
    getDictTree({ commit }) {
      return new Promise((resolve) => {
        wx.request({
          url: `https://imeikud.oss-cn-beijing.aliyuncs.com/iclub/json/tree${process.env.VUE_APP_BUILD_ENV === "prod" ? "" : "_test"}.json`,
          success(res) {
            console.log("setConfig-tree", res.data);
            commit("setDictionaryTree", res.data);
            resolve();
          },
        });
      });
    },

    async getPointBalance({ commit }) {
      const { data } = await getIntegralBalanceNew();
      console.log("data", data);
      commit("setBalance", data);
    },
    async getUserInfo({ commit, dispatch, state }) {
      return new Promise((resolve) => {
        userInfo()
          .then((res) => {
            commit("setUserInfo", res);
            commit("setIsLogin", true);
            dispatch("getSignTask");
            dispatch("detectFuliFlag");
            dispatch("getPointBalance");
            ls("userInfo", res);
            // 如果没有unionId，上报
            if (!res.unionid) {
              //   dispatch('uploadUserUnionId')
            }
            resolve(res);
          })
          .catch(() => {
            commit("setIsLogin", false);
            commit("setUserInfo", {});
            resolve("");
          });
      });
    },
    uploadUserUnionId() {
      uni.login({
        success(data) {
          if (data.errMsg === "login:ok") {
            wxUpdateOpenId({
              appId: "wx4cef4e6f8975a519",
              code: data.code,
            })
              .then((res) => {
                console.log("update unionId成功", res);
              })
              .catch(() => {});
          }
        },
        fail(err) {
          console.log("update unionId失败", err);
        },
      });
    },
    // async getComment({ commit }, contentCode) {
    //   const result = await getComment({ page: 1, limit: 9999, contentCode })
    //   commit('setCommentList', result.list || [])
    // },
    // detectFuliFlag({ commit }) {
    //   // eslint-disable-next-line no-async-promise-executor
    //   return new Promise(async (resolve) => {
    //     const { data } = await checkFuliFlag();
    //     console.log("!!!!!flag", data);
    //     commit("setFuliFlag", data);
    //     resolve(data);
    //   });
    // },
    async getSignTask({ commit }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        try {
          const [{ value: StatusData }, { value: TaskData }] = await Promise.allSettled([getUserSignForOneWeek(), getIntegralTask()]);
          commit("setSignTask", { StatusData, TaskData });
        } catch {
        } finally {
          resolve(true);
        }
      });
    },
    // 判断是否是特殊活动,如果在活动期间，则首页弹窗活动广告
    async getSpecialEventInfo({ commit, state }) {
      const startTime = state.iclubDictoryTree.options?.find?.((item) => item.name === "activityStartTime")?.sign || "";
      const endTime = state.iclubDictoryTree.options?.find?.((item) => item.name === "activityEndTime")?.sign || "";
      const currentTime = new Date();
      // const currentDay = moment().format('yyyy-MM-DD')
      // const cacheKey = 'showAd' + currentDay
      // const cacheKey = 'showAd'
      // const adCache = wx.getStorageSync(cacheKey)
      // console.log('🚀 ~ getSpecialEventInfo ~ adCache:', adCache)
      if (currentTime > new Date(startTime) && currentTime < new Date(endTime)) {
        // if (!adCache) {
        // wx.setStorageSync(cacheKey, 1)
        commit("setIsSpecialEventRunning", true);
        // }
      }
    },
    setIntegral({ state, dispatch }, { changeSource, objectCode }) {
      const businessCode = objectCode || state.userInfo.objectCode;
      if (!businessCode) return;
      return new Promise((resolve) => {
        iclubApiUserAddIntegral({
          changeSource,
          businessCode,
        }).then((res) => {
          console.log("iclubApiUserAddIntegral", res);
          dispatch("getPointBalance");
          resolve(true);
        });
      });
    },
  },
});

export default store;
