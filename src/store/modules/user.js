import { checkFuliFlag } from '@/http/fuli'
import { userInfo, isWhiteListFlag } from '@/http/wx.js'
import { ls, lsGet } from '@/utils/util'

export default {
  state: {
    isLogin: !!lsGet('iclubUserToken3'),
    userInfo: {},
    defaultAvatar: '',
    captchaFlag: false,
    fuliFlag: false,
    signTask: {},
    isScanWhiteFlag: false
  },
  getters: {
    // state 是局部 state（user 模块的 state）
    userCode(state) {
      return state.userInfo.objectCode
    },
    isLogin(state) {
      return state.isLogin
    }
  },
  mutations: {
    setIsLogin(state, payload) {
      console.warn('setIsLogin::::', payload)
      state.isLogin = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
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
    setCaptchaFlag(state, value) {
      state.captchaFlag = value
    },
    setFuliFlag(state, payload) {
      state.fuliFlag = payload
    },
    setWhiteListFlag(state, payload) {
      console.log('setWhiteListFlag', payload)
      state.isScanWhiteFlag = payload
    }
  },
  actions: {
    async getIsUserInWhiteList({ commit }) {
      const { data } = await isWhiteListFlag()
      commit('setWhiteListFlag', data)
    },
    // rootState 可通过第三个参数访问
    async getUserInfo({ commit, dispatch, rootState }) {
      console.log('getUserInfo-----', rootState.user.isLogin)
      if (!rootState.user.isLogin) return
      return new Promise((resolve) => {
        userInfo()
          .then((res) => {
            console.log('🚀 ~ getUserInfo ~ res:', res)
            commit('setUserInfo', res)
            commit('setIsLogin', true)
            dispatch('detectFuliFlag')
            dispatch('getIsUserInWhiteList')
            ls('userInfo', res)
            resolve(res)
          })
          .catch(() => {
            commit('setIsLogin', false)
            commit('setUserInfo', {})
            resolve('')
          })
      })
    },
    detectFuliFlag({ commit }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const { data } = await checkFuliFlag()
        console.log('!!!!!flag', data)
        commit('setFuliFlag', data)
        resolve(data)
      })
    }
  }
}
