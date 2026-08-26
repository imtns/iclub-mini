import Vue from 'vue'
import { getComment, getCommentCount } from '@/http/content'

export default {
  state: {
    commentList: [],
    commentLoadFinish: false,
    commentListTotal: 0
  },
  mutations: {
    prependComment(state, comment) {
      state.commentList = [comment, ...state.commentList]
      state.commentListTotal = (state.commentListTotal || 0) + 1
    },
    appendSubComment(state, { parentCode, comment }) {
      const parent = state.commentList.find((item) => item.objectCode === parentCode)
      if (parent) {
        if (!parent.subComments) {
          Vue.set(parent, 'subComments', [])
        }
        parent.subComments.unshift(comment)
      }
      state.commentListTotal = (state.commentListTotal || 0) + 1
    },
    setCommentLoadFinish(state, payload) {
      state.commentLoadFinish = payload
    },
    appendCommentList(state, payload) {
      state.commentList = [...state.commentList, ...payload]
    },
    setCommentListTotal(state, payload) {
      state.commentListTotal = payload
    },
    setCommentList(state, payload) {
      state.commentList = payload
    }
  },
  actions: {
    async getComment({ commit, rootState }, { page, objectCode, loadMore = false, apiFunc = null, apiTotalCountFunc = null }) {
      console.log('store---getComment')
      const fetchFn = apiFunc || ((params, isLogin) => getComment(params, isLogin))

      const result = await fetchFn({ page, limit: 20, contentCode: objectCode }, rootState.user.isLogin)
      console.log('🚀get comment list:', result)

      if (page === 1) {
        const api = apiTotalCountFunc || getCommentCount
        const totalComment = await api({ contentCode: objectCode, userCode: rootState.user.userInfo?.objectCode })
        console.log('🚀 ~ totalComment:', totalComment)
        commit('setCommentListTotal', totalComment)
      }
      const list = result.list || []
      const totalPage = result.totalPage || 0

      if (loadMore) {
        commit('appendCommentList', list)
      } else {
        commit('setCommentList', list)
      }
      commit('setCommentLoadFinish', page >= totalPage || !list.length || totalPage === 0)
    }
  }
}
