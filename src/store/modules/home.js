import { getHomePopup } from '@/http/home'
import { getProductList } from '@/http/product'
import { lsGet } from '@/utils/util'

export default {
  state: {
    homeBrandList: [],
    homePopupData: [],
    homePopupCacheCode: new Map(),
    scrollTop: 0,
    isSpecialEventRunning: false,
    pageScrollTops: {}
  },
  mutations: {
    setHomeBrandList(state, payload) {
      state.homeBrandList = payload
    },
    setHomePopupData(state, payload) {
      state.homePopupData = payload
    },
    setHomePopupCacheCode(state, payload) {
      state.homePopupCacheCode.set(payload, true)
    },
    setIsSpecialEventRunning(state, payload) {
      state.isSpecialEventRunning = payload
    },
    setScrollTop(state, { route, scrollTop }) {
      state.pageScrollTops = {
        ...state.pageScrollTops,
        [route]: scrollTop
      }
    }
  },
  actions: {
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
    }
  }
}
