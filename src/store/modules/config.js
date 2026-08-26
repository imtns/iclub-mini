import { apiGetConfig } from '@/http/common'

export default {
  state: {
    commonConfig: {},
    systemUpdate: false,
    navBarHeight: 0
  },
  getters: {
    sms4(state) {
      return {
        key: state.commonConfig.sms_key || '',
        iv: state.commonConfig.sms_iv || ''
      }
    }
  },
  mutations: {
    setNavBarHeight(state, value) {
      state.navBarHeight = value
    },
    setConfig(state, payload) {
      console.warn('load-config::::::::', payload)
      state.commonConfig = payload
      if (payload.systemUpdate) {
        state.systemUpdate = payload.systemUpdate
      }
    },
    setSystemUpdate(state, value) {
      state.systemUpdate = value
    }
  },
  actions: {
    async getConfig({ commit }) {
      try {
        const result = await apiGetConfig()
        commit('setConfig', JSON.parse(result))
      } catch {
        wx.request({
          url: `https://imeikud.oss-cn-beijing.aliyuncs.com/iclub/config${process.env.VUE_APP_BUILD_ENV === 'prod' ? '' : '_test'}.json`,
          success(res) {
            commit('setConfig', res.data)
          }
        })
      }
    }
  }
}
