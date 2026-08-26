// 濡白生日活动 · 已选溯源机构
// 小程序生命周期内有效，冷启动（每次打开小程序）store 重建自动清空
export default {
  state: {
    selectedOrg: null
  },
  mutations: {
    setCurewhiteOrg(state, org) {
      state.selectedOrg = org || null
    }
  }
}
