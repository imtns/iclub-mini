import Vue from 'vue'
import Vuex from 'vuex'
import {
  apiGetActivityCardInfo,
  apiGetPrizeList,
  apiTransferStar,
  apiReceiveStar,
  apiGetMyPrizes,
  apiGetStarFlows,
  apiExchangePrize,
  apiGetReceiveAddressDetail,
  apiQueryUserInfo
} from '../api/index'
import { validateAddress } from '../utils/validate'

Vue.use(Vuex)

/** 兑换接口业务错误码映射 */
const EXCHANGE_ERROR_MAP = {
  10013: '活动尚未开始',
  10014: '活动已结束',
  10015: '星星数量不足',
  10020: '奖品不存在'
}

const store = new Vuex.Store({
  state: {
    /* ─── 首页公共 ─── */
    pageLoading: false,
    userTotalStars: 0,
    /** 用户信息（头像、昵称等），登录后由 fetchUserInfo 拉取 */
    userInfo: null,
    brandCards: [],
    brandCardCodes: [],
    giftListHome: [],

    /* ─── 转赠输入弹窗 ─── */
    showTransferPopup: false,
    transferAmount: '',
    transferLoading: false,

    /* ─── 转赠结果弹窗（success | failure） ─── */
    showTransferResultPopup: false,
    transferResultStatus: 'success',
    transferResultAmount: 0,
    transferResultMessage: '网络不好请重试~',
    /** 转赠成功后的分享链接参数（用于编辑分享链接），接口返回的 transferCode、fromUserCode */
    transferShareCode: '',
    transferShareFromUserCode: '',

    /* ─── 领取星星结果弹窗（success | claimed | expired） ─── */
    showReceiveStarsResultPopup: false,
    receiveStarsResultStatus: 'success',
    receiveStarsResultAmount: 0,
    /** 未登录时暂存的领取参数，登录返回后执行 doReceiveStar */
    pendingReceiveStarParams: null,

    /* ─── 点亮小卡弹窗 ─── */
    showLightCardPopup: false,
    lightCardRewardStars: 1,
    currentLightCard: null,

    /* ─── 我的礼品抽屉 ─── */
    showMyGiftsDrawer: false,
    myGiftsList: [],
    myGiftsPage: 1,
    myGiftsTotalPage: 1,
    myGiftsLoading: false,

    /* ─── 星星记录页 ─── */
    recordList: [],
    recordPage: 1,
    recordTotalPage: 1,
    recordLoading: false,

    /* ─── 兑换页 ─── */
    exchangeGiftList: [],
    exchangePage: 1,
    exchangeTotalPage: 1,
    exchangeLoading: false,

    /* ─── 收货地址弹窗 ─── */
    addressPopupVisible: false,
    exchangeGiftItem: null,
    // 与 apiGetReceiveAddressDetail 返回字段一一对应做缓存，便于后续复用
    addressForm: {
      // 接口字段：receiver
      receiverName: '',
      phone: '',
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      areaCode: '',
      areaName: '',
      fullname: '',
      detailAddress: '',
      /** 详情：接口 fullName + " " + detailAddress 的组合，用于展示与兑换提交 */
      detail: '',
      defaultFlag: '',
      userCode: '',
      objectCode: '',
      // 兑换接口使用的地址编码（当前与 objectCode 一致）
      addressCode: ''
    }
  },

  getters: {
    displayStarCount: (state) => {
      const count = state.userTotalStars || 0
      if (count <= 0) return ''
      if (count > 99) return '99+'
      return String(count)
    }
  },

  mutations: {
    SET_PAGE_LOADING: (state, v) => { state.pageLoading = v },
    SET_USER_TOTAL_STARS: (state, v) => { state.userTotalStars = v },
    SET_USER_INFO: (state, v) => { state.userInfo = v },
    SET_BRAND_CARDS: (state, v) => { state.brandCards = v },
    SET_BRAND_CARD_CODES: (state, v) => { state.brandCardCodes = v },
    SET_GIFT_LIST_HOME: (state, v) => { state.giftListHome = v },

    SET_SHOW_TRANSFER_POPUP: (state, v) => { state.showTransferPopup = v },
    SET_TRANSFER_AMOUNT: (state, v) => { state.transferAmount = v },
    SET_TRANSFER_LOADING: (state, v) => { state.transferLoading = v },

    SET_SHOW_TRANSFER_RESULT_POPUP: (state, v) => { state.showTransferResultPopup = v },
    SET_TRANSFER_RESULT: (state, { status, amount, message }) => {
      state.transferResultStatus = status
      state.transferResultAmount = amount
      state.transferResultMessage = message || '网络不好请重试~'
    },
    /** 设置转赠成功后的分享链接参数（编辑分享链接用） */
    SET_TRANSFER_SHARE_PARAMS: (state, { transferCode, fromUserCode }) => {
      state.transferShareCode = transferCode || ''
      state.transferShareFromUserCode = fromUserCode || ''
    },
    /** 清除转赠分享参数（关闭结果弹窗时调用） */
    CLEAR_TRANSFER_SHARE_PARAMS: (state) => {
      state.transferShareCode = ''
      state.transferShareFromUserCode = ''
    },

    SET_SHOW_RECEIVE_STARS_RESULT_POPUP: (state, v) => { state.showReceiveStarsResultPopup = v },
    SET_RECEIVE_STARS_RESULT: (state, { status, amount }) => {
      state.receiveStarsResultStatus = status
      state.receiveStarsResultAmount = amount || 0
    },
    SET_PENDING_RECEIVE_STAR_PARAMS: (state, v) => { state.pendingReceiveStarParams = v },
    CLEAR_PENDING_RECEIVE_STAR_PARAMS: (state) => { state.pendingReceiveStarParams = null },

    SET_SHOW_LIGHT_CARD_POPUP: (state, v) => { state.showLightCardPopup = v },
    SET_LIGHT_CARD_DATA: (state, { card, rewardStars }) => {
      state.currentLightCard = card
      state.lightCardRewardStars = rewardStars || 1
    },

    SET_SHOW_MY_GIFTS_DRAWER: (state, v) => { state.showMyGiftsDrawer = v },
    SET_MY_GIFTS_LIST: (state, v) => { state.myGiftsList = v },
    APPEND_MY_GIFTS_LIST: (state, v) => { state.myGiftsList = state.myGiftsList.concat(v) },
    SET_MY_GIFTS_PAGE: (state, v) => { state.myGiftsPage = v },
    SET_MY_GIFTS_TOTAL_PAGE: (state, v) => { state.myGiftsTotalPage = v },
    SET_MY_GIFTS_LOADING: (state, v) => { state.myGiftsLoading = v },

    SET_RECORD_LIST: (state, v) => { state.recordList = v },
    APPEND_RECORD_LIST: (state, v) => { state.recordList = state.recordList.concat(v) },
    SET_RECORD_PAGE: (state, v) => { state.recordPage = v },
    SET_RECORD_TOTAL_PAGE: (state, v) => { state.recordTotalPage = v },
    SET_RECORD_LOADING: (state, v) => { state.recordLoading = v },

    SET_EXCHANGE_GIFT_LIST: (state, v) => { state.exchangeGiftList = v },
    APPEND_EXCHANGE_GIFT_LIST: (state, v) => { state.exchangeGiftList = state.exchangeGiftList.concat(v) },
    SET_EXCHANGE_PAGE: (state, v) => { state.exchangePage = v },
    SET_EXCHANGE_TOTAL_PAGE: (state, v) => { state.exchangeTotalPage = v },
    SET_EXCHANGE_LOADING: (state, v) => { state.exchangeLoading = v },

    SET_ADDRESS_POPUP_VISIBLE: (state, v) => { state.addressPopupVisible = v },
    SET_EXCHANGE_GIFT_ITEM: (state, v) => { state.exchangeGiftItem = v },
    SET_ADDRESS_FORM: (state, v) => { state.addressForm = Object.assign({}, state.addressForm, v) },
    RESET_ADDRESS_FORM: (state) => {
      state.addressForm = {
        receiverName: '',
        phone: '',
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        areaCode: '',
        areaName: '',
        fullname: '',
        detailAddress: '',
        detail: '',
        defaultFlag: '',
        userCode: '',
        objectCode: '',
        addressCode: ''
      }
    }
  },

  actions: {
    /** 获取首页活动数据（品牌卡片 + 星星总数）
     * @param {{ showLoading?: boolean }} payload - showLoading 为 false 时不显示全屏 loading（用于从其他页面返回时的静默刷新）
     */
    async fetchActivityCardInfo({ commit }, { showLoading = true } = {}) {
      if (showLoading) commit('SET_PAGE_LOADING', true)
      try {
        const res = await apiGetActivityCardInfo()
        const { cards = [], userCards = [], userTotalStars = 0 } = res.data || {}
        const mergedCards = cards.map((card) => {
          const userCard = userCards.find((u) => u.cardCode === card.cardCode)
          const cardNum = userCard ? userCard.cardNum : 0
          return {
            ...card,
            isLit: !!userCard,
            cardNum,
            cardTime: userCard ? userCard.cardTime : undefined,
            scanTimes: cardNum
          }
        })
        // 排序：先按点亮次数分组（降序 5>3>1>0），组内：已获得的按获得时间老到新，未获得的按卡片序号小到大
        mergedCards.sort((a, b) => {
          if (a.cardNum !== b.cardNum) return b.cardNum - a.cardNum
          const aTime = a.cardTime != null ? a.cardTime : null
          const bTime = b.cardTime != null ? b.cardTime : null
          if (aTime != null && bTime != null) return aTime - bTime
          if (aTime != null) return -1
          if (bTime != null) return 1
          return (a.indexNum ?? 0) - (b.indexNum ?? 0)
        })
        commit('SET_BRAND_CARDS', mergedCards)
        commit('SET_BRAND_CARD_CODES', mergedCards.map((c) => c.cardCode).filter(Boolean))
        commit('SET_USER_TOTAL_STARS', userTotalStars)
      } catch (e) {
        uni.showToast({ title: e.message || '加载失败，请重试', icon: 'none' })
      } finally {
        if (showLoading) commit('SET_PAGE_LOADING', false)
      }
    },

    /** 获取用户信息（头像、昵称），用于活动首页头像展示 */
    async fetchUserInfo({ commit }) {
      try {
        const res = await apiQueryUserInfo()
        const data = (res && res.data) || res
        if (data) {
          commit('SET_USER_INFO', {
            avatar: data.avatar || data.avatarUrl || data.headUrl || '',
            nickName: data.nickName || data.nickname || ''
          })
        } else {
          commit('SET_USER_INFO', null)
        }
      } catch {
        commit('SET_USER_INFO', null)
      }
    },

    /** 获取首页礼品列表（前4条） */
    async fetchPrizeListHome({ commit }) {
      try {
        const res = await apiGetPrizeList({ page: 1, limit: 4, orderBy: 'indexNum', orderType: 'asc' })
        commit('SET_GIFT_LIST_HOME', (res.data && res.data.list) || [])
      } catch (e) {
        uni.showToast({ title: e.message || '礼品加载失败', icon: 'none' })
      }
    },

    /**
     * 获取兑换页礼品列表
     * @param {{ tabLevel: number, page: number, isLoadMore: boolean }} payload
     */
    async fetchPrizeListExchange({ commit }, { tabLevel, page = 1, isLoadMore = false }) {
      commit('SET_EXCHANGE_LOADING', true)
      try {
        const res = await apiGetPrizeList({
          page,
          limit: 10,
          needStarCount: tabLevel != null ? tabLevel : undefined,
          orderBy: 'indexNum',
          orderType: 'asc'
        })
        const { list = [], totalPage = 1 } = res.data || {}
        if (isLoadMore) {
          commit('APPEND_EXCHANGE_GIFT_LIST', list)
        } else {
          commit('SET_EXCHANGE_GIFT_LIST', list)
        }
        commit('SET_EXCHANGE_PAGE', page)
        commit('SET_EXCHANGE_TOTAL_PAGE', totalPage)
      } catch (e) {
        uni.showToast({ title: e.message || '加载失败', icon: 'none' })
      } finally {
        commit('SET_EXCHANGE_LOADING', false)
      }
    },

    /**
     * 执行星星转赠
     * 成功/失败均关闭输入弹窗，打开结果弹窗（不 toast）
     * @param {{ starCount: number }} payload
     */
    async doTransferStar({ commit, state }, { starCount }) {
      const amount = Number(starCount)
      commit('SET_TRANSFER_LOADING', true)
      try {
        const res = await apiTransferStar({ starCount: amount })
        const data = res && res.data ? res.data : {}
        const transferCode = data.transferCode || data.transferNo || ''
        const fromUserCode = data.fromUserCode || data.userCode || ''
        commit('SET_TRANSFER_LOADING', false)
        commit('SET_SHOW_TRANSFER_POPUP', false)
        commit('SET_TRANSFER_AMOUNT', '')
        commit('SET_TRANSFER_RESULT', { status: 'success', amount, message: '' })
        commit('SET_USER_TOTAL_STARS', Math.max(0, state.userTotalStars - amount))
        commit('SET_TRANSFER_SHARE_PARAMS', { transferCode, fromUserCode })
      } catch (e) {
        commit('SET_TRANSFER_LOADING', false)
        commit('SET_SHOW_TRANSFER_POPUP', false)
        commit('SET_TRANSFER_AMOUNT', '')
        commit('SET_TRANSFER_RESULT', { status: 'failure', amount, message: e.message || '网络不好请重试~' })
        commit('SET_TRANSFER_SHARE_PARAMS', { transferCode: '', fromUserCode: '' })
      } finally {
        commit('SET_SHOW_TRANSFER_RESULT_POPUP', true)
      }
    },

    /**
     * 执行领取转赠星星（从链接进入，query 参数触发）
     * 10018 → claimed 弹窗；10019 → expired 弹窗；其余业务码 → toast；网络异常 → expired 弹窗
     * @param {{ transferCode: string, fromUserCode: string }} payload
     */
    async doReceiveStar({ commit }, { transferCode, fromUserCode }) {
      try {
        const res = await apiReceiveStar({ transferCode, fromUserCode })
        const amount = (res.data && (res.data.receiveStarCount)) || 0
        commit('SET_RECEIVE_STARS_RESULT', { status: 'success', amount })
        commit('SET_SHOW_RECEIVE_STARS_RESULT_POPUP', true)
      } catch (e) {
        const code = e && e.code
        if (code === 10018) {
          commit('SET_RECEIVE_STARS_RESULT', { status: 'claimed', amount: 0 })
          commit('SET_SHOW_RECEIVE_STARS_RESULT_POPUP', true)
        } else if (code === 10019) {
          commit('SET_RECEIVE_STARS_RESULT', { status: 'expired', amount: 0 })
          commit('SET_SHOW_RECEIVE_STARS_RESULT_POPUP', true)
        } else if (!code) {
          commit('SET_RECEIVE_STARS_RESULT', { status: 'expired', amount: 0 })
          commit('SET_SHOW_RECEIVE_STARS_RESULT_POPUP', true)
        } else {
          uni.showToast({ title: e.message || '领取失败', icon: 'none' })
        }
      }
    },

    /**
     * 获取我的礼品列表
     * @param {{ page: number, isLoadMore: boolean }} payload
     */
    async fetchMyPrizes({ commit }, { page = 1, isLoadMore = false } = {}) {
      const limit = 3
      commit('SET_MY_GIFTS_LOADING', true)
      try {
        const res = await apiGetMyPrizes({ page, limit, orderBy: 'exchangeTime', orderType: 'desc' })
        const data = res.data || {}
        const list = data.list || []
        // 兼容 totalPage / totalPages / total(totalCount 计算)
        let totalPage = data.totalPage ?? data.totalPages ?? 1
        if (totalPage === 1 && (data.total != null || data.totalCount != null)) {
          const total = data.total ?? data.totalCount ?? 0
          totalPage = Math.max(1, Math.ceil(Number(total) / limit))
        }
        // 本页条数不足 limit 时视为最后一页
        if (list.length < limit) {
          totalPage = page
        }
        if (isLoadMore) {
          commit('APPEND_MY_GIFTS_LIST', list)
        } else {
          commit('SET_MY_GIFTS_LIST', list)
        }
        commit('SET_MY_GIFTS_PAGE', page)
        commit('SET_MY_GIFTS_TOTAL_PAGE', totalPage)
      } catch (e) {
        uni.showToast({ title: e.message || '加载失败', icon: 'none' })
      } finally {
        commit('SET_MY_GIFTS_LOADING', false)
      }
    },

    /**
     * 获取星星流水记录
     * @param {{ page: number, isLoadMore: boolean }} payload
     */
    async fetchStarFlows({ commit }, { page = 1, isLoadMore = false } = {}) {
      commit('SET_RECORD_LOADING', true)
      try {
        const res = await apiGetStarFlows({ page, limit: 20, orderBy: 'starTime', orderType: 'desc' })
        const { list = [], totalPage = 1 } = res.data || {}
        if (isLoadMore) {
          commit('APPEND_RECORD_LIST', list)
        } else {
          commit('SET_RECORD_LIST', list)
        }
        commit('SET_RECORD_PAGE', page)
        commit('SET_RECORD_TOTAL_PAGE', totalPage)
      } catch (e) {
        uni.showToast({ title: e.message || '加载失败', icon: 'none' })
      } finally {
        commit('SET_RECORD_LOADING', false)
      }
    },

    /**
     * 提交礼品兑换
     * 成功 → toast + 关闭弹窗；失败 → toast 错误文案，弹窗不关闭
     * @param {{ prizeCode: string, receiver: string, phone: string, ... }} payload
     */
    async doExchangePrize({ commit, dispatch }, params) {
      const validateResult = validateAddress({ receiverName: params.receiver, phone: params.phone, detailAddress: params.detailAddress })
      if (validateResult !== true) {
        uni.showToast({ title: validateResult, icon: 'none' })
        return
      }
      commit('SET_EXCHANGE_LOADING', true)
      try {
        await apiExchangePrize(params)
        commit('SET_EXCHANGE_LOADING', false)
        commit('SET_ADDRESS_POPUP_VISIBLE', false)
        commit('RESET_ADDRESS_FORM')
        uni.showToast({ title: '兑换成功', icon: 'success' })
        dispatch('fetchActivityCardInfo')
      } catch (e) {
        commit('SET_EXCHANGE_LOADING', false)
        const msg = EXCHANGE_ERROR_MAP[e && e.code] || e.message || '兑换失败'
        uni.showToast({ title: msg, icon: 'none' })
      }
    },

    /**
     * 查询用户地址详情信息，用于填写收货地址弹窗预填
     * @param {{ objectCode: string, userCode: string }} payload
     */
    async fetchAddressDetail({ commit }, { objectCode, userCode }) {
      if (!objectCode || !userCode) return
      try {
        const d = await apiGetReceiveAddressDetail({ objectCode, userCode }) || {}
        const fullName = (d.fullName || d.fullname || '').trim()
        const detailAddress = (d.detailAddress || '').trim()
        commit('SET_ADDRESS_FORM', {
          // 主键与编码
          objectCode: d.objectCode || '',
          addressCode: d.objectCode || d.addressCode || '',
          userCode: d.userCode || userCode || '',
          // 收货人与联系方式
          receiverName: d.receiver || '',
          phone: d.phone || '',
          // 省市区与完整地址
          provinceCode: d.provinceCode || '',
          provinceName: d.provinceName || '',
          cityCode: d.cityCode || '',
          cityName: d.cityName || '',
          areaCode: d.areaCode || '',
          areaName: d.areaName || '',
          fullname: fullName,
          detailAddress,
          // 详情：fullName + " " + detailAddress
          detail: [fullName, detailAddress].filter(Boolean).join(' '),
          // 其它标识
          defaultFlag: d.defaultFlag || ''
        })
      } catch (e) {
        uni.showToast({ title: e.message || '获取地址失败', icon: 'none' })
      }
    }
  }
})

export default store
