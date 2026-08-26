import { apiRecordShareInfo } from '@/http/common'

export default {
  state: {
    openId: '',
    unionId: '',
    openIdHasSetted: false,
    shareCode: '',
    shareCode1: '',
    inviteInfo: {
      inviteCode: '',
      inviteSource: '',
      shareLinkTime: ''
    }
  },
  mutations: {
    _setOpenId(state, { openid, unionid }) {
      state.openId = openid
      state.unionId = unionid
    },
    setOpenIdSetted(state, value) {
      state.openIdHasSetted = value
    },
    storeShareCode(state, params) {
      state.shareCode = params
    },
    storeShareCode1(state, params) {
      state.shareCode1 = params
    },
    setInviteInfo(state, { inviteCode, inviteSource, shareLinkTime }) {
      console.log('setInviteInfo', inviteCode, inviteSource, shareLinkTime)
      state.inviteInfo.inviteCode = inviteCode
      state.inviteInfo.inviteSource = inviteSource
      state.inviteInfo.shareLinkTime = shareLinkTime
    }
  },
  actions: {
    // 原 setOpenId mutation 需要访问 userInfo，改为 action 以获取 rootState
    setOpenId({ commit, state, rootState }, { openid, unionid }) {
      console.log('🚀 ~ setOpenId ~ openid:', openid)
      commit('_setOpenId', { openid, unionid })

      let fromPage = getApp().globalData.shareLink || '/pages/home/index'
      const inviteOpenId = getApp().globalData.inviteOpenId
      const inviteUserCode = getApp().globalData.inviteCode
      const inviteeOpenId = openid
      const inviteeUserCode = rootState.user.userInfo?.objectCode
      if (fromPage?.includes('%')) {
        fromPage = decodeURIComponent(fromPage)
      }
      const shareLinkTime = getApp().globalData.shareLinkTime
      if (fromPage?.includes('%')) {
        fromPage = decodeURIComponent(fromPage)
      }
      if (inviteOpenId === inviteeOpenId) {
        return
      }
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
          commit('setOpenIdSetted', true)
        })
      }
    }
  }
}
