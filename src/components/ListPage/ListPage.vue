<script>
import apiStandardAdapter from './adapter/apiStandardAdapter'
import { preprocessQuery, createFetch } from './utils'

// 基于 页面滚动 实现的列表组件
export default {
  name: 'ListPage',
  provide() {
    return {
      getQuery: () => this.query,
      refresh: this.refresh,
      search: this.search,
      syncQuery: this.syncQuery,
      getResult: this.getResult
    }
  },
  props: {
    request: {
      type: Function,
      required: true
    },
    query: {
      type: Object,
      default: () => ({})
    },
    /*
     * 分页模式：
     * server 为服务端分页模式；
     * client 为客户端分页模式(服务端需要一次返回全部数据)；
     * none 为不分页模式
     */
    paginationMode: {
      type: String,
      default: 'server',
      validator: (v) => ['server', 'client', 'none'].includes(v)
    },
    // 仅在 paginationMode=none 和 paginationMode=client 时生效
    filterProxy: {
      type: [Boolean, Function],
      default: false
    },
    pageSize: {
      type: Number,
      default: 20
    },
    formatRes: {
      type: Function,
      default: undefined
    },
    wrapStyle: {
      type: Object,
      default: undefined
    },
    showEmptyImg: {
      type: Boolean,
      default: true
    },
    emptyType: {
      type: String,
      default: 'default'
    },
    emptyImg: {
      type: String,
      default: undefined
    },
    emptyImgWidth: {
      type: String,
      default: '240rpx'
    },
    emptyImgHeight: {
      type: String,
      default: '240rpx'
    },
    emptyWrapStyle: {
      type: Object,
      default: undefined
    },
    emptyTextStyle: {
      type: Object,
      default: undefined
    },
    emptyText: {
      type: String,
      default: '暂无内容~'
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    errorText: {
      type: String,
      default: '请求失败，点击重新加载'
    },
    lazyLoad: Boolean,
    // loading延迟显示时长(ms)，0表示不延迟，避免快速请求时闪烁
    loadingDelay: {
      type: Number,
      default: 500
    },
    // 是否在created中立即显示loading（覆盖loadingDelay）
    immediateLoading: {
      type: Boolean,
      default: true
    },
    hideLoading: {
      type: Boolean,
      default: false
    },
    // 适配器：修改符合接口请求和组件规范的参数
    adapter: {
      type: [Object, null],
      default: () => apiStandardAdapter
    }
  },
  emits: ['fetch:before', 'fetch:completed', 'error', 'update:query'],
  data() {
    return {
      queryCopy: {},
      pageIndex: 0,
      result: [], // 所有列表数据
      filterResult: [], // 筛选后的列表数据
      renderResult: [], // 渲染到页面上的列表数据
      refreshing: false,
      loading: false,
      showLoading: false, // 延迟显示loading，避免闪烁
      finished: false,
      error: false,
      empty: false,
      isReady: false
    }
  },
  computed: {
    isServerMode() {
      return this.paginationMode === 'server'
    },
    isClientMode() {
      return this.paginationMode === 'client'
    },
    emptyImgDef() {
      // 增加容错：拼接URL前校验type
      const validType = ['default', 'shoucang', 'wifi', 'location', 'dianzan', 'feedback', 'search', 'error'].includes(this.emptyType) ? this.emptyType : 'default'
      return `https://udstatic.imeik.com/iclub/images/empty/icon-${validType}.png?6`
    }
  },
  created() {
    this.requestToken = 1
    this.lastToken = 0
    this.cloneQuery()

    if (!this.lazyLoad) {
      this.showLoading = this.immediateLoading
    }
  },
  mounted() {
    if (!this.lazyLoad) {
      this.handleLoad()
    }
  },
  methods: {
    // 当现有查询参数不能满足时，可以传入额外的查询参数
    async fetchData(extraQuery = {}, { immediate = false } = {}) {
      this.isReady = true

      let requestQuery = preprocessQuery({ ...this.query, ...extraQuery })

      if (this.isServerMode) {
        requestQuery.pageSize = this.pageSize
        requestQuery.pageIndex = this.pageIndex
      }

      requestQuery = this.adapter?.request(requestQuery) ?? requestQuery
      this.$emit('fetch:before', requestQuery)

      if (process.env.NODE_ENV === 'development') {
        console.log('list-page:requestQuery ', requestQuery)
      }

      this.empty = false
      this.error = false
      this.finished = false
      this.loading = true

      // 延迟显示loading，避免快速请求时闪烁；重试时立即显示
      const delay = immediate ? 0 : this.loadingDelay
      if (delay > 0) {
        this._loadingTimer = setTimeout(() => {
          this.showLoading = true
        }, delay)
      } else {
        this.showLoading = true
      }

      try {
        this.lastToken = this.requestToken
        let { token, res } = await createFetch(this.requestToken++, this.request, requestQuery)

        // 忽略过期请求的返回数据
        if (this.lastToken > token) return

        if (this.refreshing) {
          this.resetResult()
          this.refreshing = false
        }
        this.loading = false

        clearTimeout(this._loadingTimer)
        this.error = false

        res = this.adapter?.response(res) ?? res
        res = this.formatRes?.(res) ?? res

        const result = (this.isServerMode ? res.result : res) ?? []

        if (this.isServerMode) {
          this.result.push(...result)
          this.filterResult.push(...result)
          this.renderResult.push(...result)
          this.finished = result.length < this.pageSize
        } else {
          this.result = result
          this.filterResult = this.applyFilter(this.result, this.query)
          this.renderResult = this.isClientMode ? this.filterResult.slice(0, this.pageSize) : this.filterResult
          this.finished = this.isClientMode ? this.filterResult.length < this.pageSize : true
        }

        if (this.pageIndex === 1 && !this.renderResult.length) {
          this.empty = true
        }
        await this.sleep(200)

        this.showLoading = false
        wx.stopPullDownRefresh()
        this.emitFetchCompleted(res)
      } catch (e) {
        wx.stopPullDownRefresh()
        if (this.refreshing) {
          this.resetResult()
          this.refreshing = false
        }

        this.loading = false
        this.showLoading = false
        clearTimeout(this._loadingTimer)
        this.error = true
        this.$emit('error', e)
      }
    },
    emitFetchCompleted(res = {}) {
      const { result, filterResult, renderResult, pageIndex } = this
      this.$emit('fetch:completed', {
        res,
        pageIndex,
        result,
        filterResult,
        renderResult
      })

      console.log(this.isReady, this.empty, this.finished, this.showLoading)
    },
    handleLoad(extraQuery = {}, options) {
      if (this.loading || this.finished || this.error) return

      this.nextPageIndex()

      if (!this.isReady || this.isServerMode) {
        this.fetchData(extraQuery, options)
        return
      }

      // 客户端分页加载逻辑
      if (this.isClientMode && this.filterResult.length) {
        const result = this.filterResult.slice(this.pageSize * (this.pageIndex - 1), this.pageSize * this.pageIndex)
        this.renderResult.push(...result)
        this.loading = false
        this.showLoading = false
        clearTimeout(this._loadingTimer)
        this.finished = result.length < this.pageSize
        this.emitFetchCompleted()
      }
    },
    async handleRefresh(extraQuery = {}) {
      if (this.refreshScrollTop) {
        await wx.pageScrollTo({ scrollTop: 0 })
        this.refreshScrollTop = false
      }

      this.refreshing = true
      this.resetPageIndex()
      this.nextPageIndex()
      await this.fetchData(extraQuery)
    },
    // 清空已有数据并重新加载（使用现有查询参数）
    reload() {
      // this.resetResult()
      this.handleRefresh()
    },
    // 清空已有数据并重新加载（使用初始化页面时保存的原始查询参数）
    refresh(extraQueryOrScrollTop = {}, scrollTop = true) {
      let extraQuery = {}
      if (typeof extraQueryOrScrollTop === 'boolean') {
        this.refreshScrollTop = extraQueryOrScrollTop
      } else {
        extraQuery = extraQueryOrScrollTop
        this.refreshScrollTop = scrollTop
      }

      this.resetQuery(extraQuery)
      this.$nextTick(this.reload)
    },
    // 加载下一页
    nextPage() {
      this.handleLoad({}, { immediate: true })
    },
    search() {
      if (this.isServerMode || !this.filterProxy) {
        return this.reload()
      }

      this.empty = false
      this.resetPageIndex()
      this.nextPageIndex()

      this.filterResult = this.applyFilter(this.result, this.query)

      if (this.isClientMode) {
        this.renderResult = this.filterResult.slice(0, this.pageSize)
        this.finished = this.renderResult.length < this.pageSize
      } else {
        // 不分页模式
        this.renderResult = this.filterResult
        this.finished = true
      }

      if (this.pageIndex === 1 && !this.renderResult.length) {
        this.empty = true
      }

      this.loading = false
    },
    resetResult() {
      this.result = []
      this.filterResult = []
      this.renderResult = []
    },
    nextPageIndex() {
      this.pageIndex++
    },
    resetPageIndex() {
      this.pageIndex = 0
    },
    // 恢复到初始状态
    resetInitState() {
      this.pageIndex = 0
      this.result = []
      this.filterResult = []
      this.renderResult = []
      this.refreshing = false
      this.loading = false
      this.finished = false
      this.error = false
      this.empty = false
    },
    cloneQuery() {
      this.queryCopy = { ...this.query }
    },
    resetQuery(extraQuery = {}) {
      this.syncQuery({
        ...this.queryCopy,
        ...extraQuery
      })
    },
    syncQuery(query = {}) {
      this.$emit('update:query', query)
    },
    // 根据 filterProxy 对数据进行过滤
    applyFilter(data, query) {
      if (typeof this.filterProxy === 'function') {
        // 自定义过滤
        return this.filterProxy(data, query)
      } else if (this.filterProxy) {
        // 模糊匹配
        let filterResult = data
        Object.keys(query).forEach((key) => {
          filterResult = filterResult.filter((item) => {
            const keyword = `${query[key]}`
            if (!keyword.length) return true
            return `${item[key]}`.indexOf(keyword) > -1
          })
        })

        return filterResult
      }

      return data
    },
    // 对外提供数据
    getResult() {
      const { result, filterResult, renderResult } = this
      return {
        result,
        filterResult,
        renderResult
      }
    }
  }
}
</script>

<template>
  <div class="im-list-page" :style="[wrapStyle]">
    <slot :result="renderResult" :refresh="refresh" :next-page="nextPage"></slot>
    <div v-show="empty || error" class="im-list-page__empty" :style="[emptyWrapStyle]">
      <slot v-if="showEmptyImg" name="img">
        <img
          class="im-list-page__empty-img"
          :style="{
            width: emptyImgWidth,
            height: emptyImgHeight
          }"
          :src="emptyImg || emptyImgDef"
          mode="widthFix"
          alt=""
        />
      </slot>
      <div v-if="error" @click.stop="fetchData({}, { immediate: true })">{{ errorText }}</div>
      <div v-else class="im-list-page__empty-text" :style="[emptyTextStyle]">
        <slot name="empty">{{ emptyText }}</slot>
      </div>
    </div>
    <div v-if="isReady && !empty && !hideLoading" v-show="showLoading" class="im-list-page__status loading">
      <image src="https://udstatic.imeik.com/pcUploads/1699437223744/Spinner-1s-200px%20(1).gif" />正在加载...
    </div>
    <div v-if="isReady && !empty && finished && !showLoading" class="im-list-page__status">{{ finishedText }}</div>
  </div>
</template>

<style lang="scss">
.im-list-page {
  min-height: 100vh;

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 230rpx;
    padding-bottom: 230rpx;
    color: rgba(0, 0, 0, 70%);
    font-size: 26rpx;
    line-height: 40rpx;
    text-align: center;

    &-img {
      width: 240rpx;
      height: 240rpx;
    }

    &-text {
      margin-top: 12rpx;
    }
  }

  &__status {
    padding: 30rpx;
    color: rgba(0, 0, 0, 50%);
    font-size: 26rpx;
    line-height: 40rpx;
    text-align: center;
    @include flex-center;
    &.loading {
      color: $main-blue;
      image {
        width: 46rpx;
        height: 46rpx;
      }
    }
  }
}
</style>
