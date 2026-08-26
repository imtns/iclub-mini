export default {
  state: {
    cityTree: [],
    addressId: ''
  },
  mutations: {
    setCityTree(state, payload) {
      state.cityTree = payload
    },
    setAddressId(state, addressId) {
      state.addressId = addressId
    }
  },
  actions: {
    getCityTree({ commit }) {
      console.error('getCityTree')
      return new Promise((resolve) => {
        wx.request({
          url: 'https://udstatic.imeik.com/iclub/json/city-new.json',
          success(res) {
            commit('setCityTree', res.data.data)
            resolve()
          }
        })
      })
    }
  }
}
