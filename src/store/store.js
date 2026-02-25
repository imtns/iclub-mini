import Vue from 'vue'
import Vuex from 'vuex'
import { getUserSignForOneWeek } from '@/http/tasks'
import { checkFuliFlag } from '@/http/fuli'
import { getComment } from '@/http/content'
import { userInfo } from '@/http/wx.js'
import { ls, lsGet } from '@/utils/util'
import { getProductList } from '@/http/product'
import { getTaskList } from '@/http/mall'
import { apiRecordShareInfo, apiGetConfig } from '@/http/common'
import { getHomePopup } from '@/http/home'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    commonConfig: {},
    isLogin: !!lsGet('iclubUserToken3'),
    captchaFlag: false,
    userInfo: {},
    addressId: '',
    commentList: [],
    isTodayCheckIn: false, // 今日签到状态
    defaultAvatar: '',
    signTask: {}, // 签到任务
    isSpecialEventRunning: false, // 是否有活动在进行中
    fuliFlag: false, // 判断用户是否拥有过福利金
    systemUpdate: false, // 系统升级弹窗
    // 分享code
    shareCode: '',
    // 赠卡code
    shareCode1: '',
    openId: '',
    unionId: '',
    hihiPageStart: false,
    hihiInvitedEntry: false,
    openIdHasSetted: false,
    cityTree: [],
    homeBrandList: [],
    homePopupData: [],
    homePopupCacheCode: new Map(),
    inviteInfo: {
      inviteCode: '',
      inviteSource: '',
      shareLinkTime: ''
    },
    mallTaskList: []
  },
  getters: {
    userCode(state) {
      return state.userInfo.objectCode
    },
    isLogin(state) {
      return state.isLogin
    },
    sms4(state) {
      return {
        key: state.commonConfig.sms_key || '',
        iv: state.commonConfig.sms_iv || ''
      }
    },
    // 是否显示首页tab会员商城未读标识
    isMallTaskShowTip(state) {
      console.log('🚀 ~ isMallTaskShowTip ~ mallTaskList:', state.mallTaskList)
      const loopTask = state.mallTaskList?.filter((item) => item.taskType === '2')
      const findFinishTask = loopTask?.filter((item) => item.completionStatus === '1')
      console.log('🚀 ~ isMallTaskShowTip ~ findFinishTask:', findFinishTask)
      return !state.isLogin ? false : findFinishTask?.length === 0
    }
  },
  mutations: {
    setHomePopupCacheCode(state, payload) {
      state.homePopupCacheCode.set(payload, true)
    },
    setHomePopupData(state, payload) {
      state.homePopupData = payload
    },
    setFuliFlag(state, payload) {
      state.fuliFlag = payload
    },
    setIsLogin(state, payload) {
      console.warn('setIsLogin::::', payload)
      state.isLogin = payload
    },
    setCommentList(state, payload) {
      state.commentList = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },

    setTodayCheckIn(state, payload) {
      state.isTodayCheckIn = payload
    },
    setSignTask(state, payload) {
      state.signTask = payload
    },
    setDefaultAvatar(state) {
      const defaultAvatars = [
        'https://udstatic.imeik.com/pcUploads/1705285352902/1.png',
        'https://udstatic.imeik.com/pcUploads/1705285380205/2.png',
        'https://udstatic.imeik.com/pcUploads/1705285409154/3.png'
      ]
      const randomNumber = Math.floor(Math.random() * defaultAvatars.length)
      state.defaultAvatar = defaultAvatars[randomNumber]
    },
    setConfig(state, payload) {
      console.warn('load-config::::::::', payload)
      state.commonConfig = payload
      if (payload.systemUpdate) {
        // state.systemUpdate = true
        state.systemUpdate = payload.systemUpdate
      }
    },
    setIsSpecialEventRunning(state, payload) {
      state.isSpecialEventRunning = payload
    },
    setCaptchaFlag(state, value) {
      state.captchaFlag = value
    },
    setSystemUpdate(state, value) {
      state.systemUpdate = value
    },
    // 设置分享码
    storeShareCode(state, params) {
      state.shareCode = params
    },
    // 设置分享码
    storeShareCode1(state, params) {
      state.shareCode1 = params
    },
    setAddressId(state, addressId) {
      state.addressId = addressId
    },
    setOpenIdSetted(state, value) {
      state.openIdHasSetted = value
    },
    setOpenId(state, { unionid, openid }) {
      state.openId = openid
      console.log('🚀 ~ setOpenId ~ openid:', openid)
      state.unionId = unionid
      // 记录分享信息
      let fromPage = getApp().globalData.shareLink || '/pages/home/index'
      const inviteOpenId = getApp().globalData.inviteOpenId
      const inviteUserCode = getApp().globalData.inviteCode
      const inviteeOpenId = openid
      const inviteeUserCode = state.userInfo?.objectCode
      if (fromPage?.includes('%')) {
        fromPage = decodeURIComponent(fromPage)
      }
      const shareLinkTime = getApp().globalData.shareLinkTime
      if (fromPage?.includes('%')) {
        fromPage = decodeURIComponent(fromPage)
      }
      // 两个相等代表自己点自己的分享
      if (inviteOpenId === inviteeOpenId) {
        return
      }
      // 通过分享（不包括渠道来的）进来的小程序记录分享信息等
      if (!getApp().globalData.userSource && inviteOpenId && !state.openIdHasSetted && shareLinkTime) {
        console.error('----------------- mixinGetOpenId -----------------')
        apiRecordShareInfo({
          channelCode: '',
          fromPage,
          inviteOpenId,
          inviteUserCode,
          inviteeOpenId,
          inviteeUserCode,
          shareTime: shareLinkTime
        }).then(() => {
          state.openIdHasSetted = true
        })
      }
    },
    setHihiPageStart(state, hihiPageStart) {
      state.hihiPageStart = hihiPageStart
    },
    setHihiInvitedEntry(state, hihiInvitedEntry) {
      state.hihiInvitedEntry = hihiInvitedEntry
    },
    setCityTree(state, payload) {
      state.cityTree = payload
    },
    setHomeBrandList(state, payload) {
      state.homeBrandList = payload
    },
    setInviteInfo(state, { inviteCode, inviteSource, shareLinkTime }) {
      console.log('setInviteInfo', inviteCode, inviteSource, shareLinkTime)
      state.inviteInfo.inviteCode = inviteCode
      state.inviteInfo.inviteSource = inviteSource
      state.inviteInfo.shareLinkTime = shareLinkTime
    },
    setMallTaskList(state, payload) {
      state.mallTaskList = payload
    }
  },

  actions: {
    getMallTaskList({ commit }) {
      console.error('getMallTaskList')
      getTaskList().then((res) => {
        console.log('🚀 ~ getMallTaskList ~ res:', res)
        if (res.code === 200) {
          commit('setMallTaskList', res.data || [])
        }
      })
    },
    getHomePopup({ commit }, newPageIndex) {
      const openId = lsGet('openId')
      getHomePopup({ openId, triggerPageType: String(newPageIndex) }).then((res) => {
        commit('setHomePopupData', res)
      })
    },
    getHomeBrandList({ commit }) {
      console.error('getHomeBrandList')
      getProductList().then((res) => {
        commit('setHomeBrandList', res)
      })
    },
    getCityTree({ commit }) {
      console.error('getCityTree')
      return new Promise((resolve) => {
        wx.request({
          url: 'https://udstatic.imeik.com/iclub/json/city.json',
          success(res) {
            commit('setCityTree', res.data.data)
            resolve()
          }
        })
      })
      // cityTree().then((res) => {
      //   commit('setCityTree', res)
      // })
    },
    async getConfig({ commit }) {
      try {
        const result = await apiGetConfig()
        commit('setConfig', JSON.parse(result))
      } catch {
        // 如果请求接口报错，备选方案请求oss获取配置
        wx.request({
          url: `https://imeikud.oss-cn-beijing.aliyuncs.com/iclub/config${process.env.VUE_APP_BUILD_ENV === 'prod' ? '' : '_test'}.json`,
          success(res) {
            commit('setConfig', res.data)
          }
        })
      }
    },

    async getUserInfo({ commit, dispatch, state }) {
      console.log('getUserInfo-----', state.isLogin)
      if (!state.isLogin) return
      return new Promise((resolve) => {
        userInfo()
          .then((res) => {
            console.log('🚀 ~ getUserInfo ~ res:', res)
            commit('setUserInfo', res)
            commit('setIsLogin', true)
            // dispatch('getSignTask')
            dispatch('detectFuliFlag')
            // dispatch('getPointBalance')
            ls('userInfo', res)
            // 如果没有unionId，上报
            if (!res.unionid) {
              //   dispatch('uploadUserUnionId')
            }
            resolve(res)
          })
          .catch(() => {
            commit('setIsLogin', false)
            commit('setUserInfo', {})
            resolve('')
          })
      })
    },
    async getComment({ commit }, contentCode) {
      const result = await getComment({ page: 1, limit: 9999, contentCode })
      commit('setCommentList', result.list || [])
    },
    detectFuliFlag({ commit }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const { data } = await checkFuliFlag()
        console.log('!!!!!flag', data)
        commit('setFuliFlag', data)
        resolve(data)
      })
    },
    async getSignTask({ commit }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        try {
          const { data } = await getUserSignForOneWeek()
          commit('setSignTask', data)
        } catch {
        } finally {
          resolve(true)
        }
      })
    }
  }
})

export default store
