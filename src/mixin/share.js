import { pageOptionsToQuery, addUserIdWhenShare, addUserIdWhenShareWithoutLink } from '@/utils/index'
import { mapState } from 'vuex'
import { ls } from '@/utils/util'
import { sleep } from '@/utils/tools'
import report from '@/utils/report/report'
import moment from 'dayjs'
export default {
  data() {
    return {
      isCallbackRunning: false,
      moment,
      locking: false,
      url: '',
      redirecting: false,
      transparentBar: true,
      pageScrollTop: 0,
      isLoaded: false,
      // 默认的全局分享内容
      share: {
        title: '欢迎加入爱美客粉丝会员CLUB',
        path: '/pages/home/index', // 全局分享的路径，比如 首页
        imageUrl: 'https://udstatic.imeik.com/iclub/images/share.jpeg' // 全局分享的图片(可本地可网络)
      }
    }
  },
  computed: {
    ...mapState(['commonConfig', 'isLogin'])
  },
  watch: {
    commonConfig: {
      handler(c) {
        if (!c) return
        this.share.title = c.shareTitle
        this.share.imageUrl = c.shareImage
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    const pages = getCurrentPages().reverse()
    const url = pages[0] && pages[0].route

    this.bus.register(`captchaCallback-${url}`, this, (methodName) => {
      //   console.log('captchaCallback', methodName)
      this.captchaCallback(methodName)
    })
  },
  beforeDestroy() {
    const pages = getCurrentPages().reverse()
    const url = pages[0] && pages[0].route
    this.bus.unregister(`captchaCallback-${url}`, this)
    // wx.offCopyUrl()
  },
  onLoad(options) {
    // 默认分享当前页面全路径 - 带query
    this.share.path = this.$mp.page.route + `${pageOptionsToQuery(this.$mp.page.options) ? '?' + pageOptionsToQuery(this.$mp.page.options) : ''}`
    if (!this.isLoaded) {
      this.isLoaded = true
      wx.onCopyUrl(() => {
        const path = this?.shareInfo?.path || this?.share?.path
        const query = addUserIdWhenShareWithoutLink(path, pageOptionsToQuery(this.$mp.page.options))
        console.log('🚀 ~ onLoad ~ wx.onCopyUrl:', query)
        return { query }
      })
    }
  },
  onPageScroll(res) {
    this.pageScrollTop = res.scrollTop
    this.transparentBar = res.scrollTop < 40
  },
  methods: {
    showToast(message) {
      this.$refs.toast.show({
        message
      })
    },
    formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
      return moment(time).format(format)
    },
    // eventId:1 浏览   2点击
    report(name, isPageLoad = false) {
      const data = { pageSession: Math.random().toString(16).substring(2) + new Date().getTime(), activityName: name }
      report({ eventId: isPageLoad ? 'page_expose' : 'element_click', pageUrl: '', referrerUrl: '', dataKeys: data })
    },
    captchaCallback(methodName) {
      //   console.log('reRunCaptchaMethod 1', methodName)
      this[`${methodName}`]?.()
    },
    phoneFilter(val) {
      if (!val) return
      val = val.toString()
      const reg = /^(.{3}).*(.{4})$/
      return val?.replace(reg, '$1****$2')
    },
    async sleep(time) {
      await sleep(time)
      return Promise.resolve()
    },
    go(url, auth = false, isRedirect = false) {
      if (auth && !this.isLogin) {
        ls('returnUrl', url)
        this.goLogin()
        return
      }
      if (this.redirecting) return
      this.redirecting = true
      if (isRedirect) {
        wx.redirectTo({
          url,
          complete: () => {
            this.redirecting = false
          }
        })
      } else {
        wx.navigateTo({
          url,
          complete: () => {
            this.redirecting = false
          }
        })
      }
    }
  },
  // 定义全局分享
  // 1.发送给朋友
  onShareAppMessage(res) {
    console.log('🚀 ~ onShareAppMessage ~ res:', res)
    // 优先取页面里自定义的shareInfo配置
    const info = { ...(this.shareInfo || {}) }
    if (res.from === 'button' && info.buttonTitle) {
      info.title = info.buttonTitle
      if (info.buttonImage) {
        info.imageUrl = info.buttonImage
      }
    }

    this.$shareCallBack && this.$shareCallBack()
    this.shareInfo?.callback?.(res.from === 'button')
    const path = addUserIdWhenShare(info.path || this.share.path)
    console.error('🚀 ~ 分享给好友 ~ path:', path)
    const title = info.title || this.share.title
    const imageUrl = info.imageUrl || this.share.imageUrl
    return {
      title,
      path,
      imageUrl
    }
  },
  // 2.分享到朋友圈
  onShareTimeline(res) {
    // 优先取页面里自定义的shareInfo配置
    const info = { ...(this.shareInfo || {}) }
    this.$shareCallBack && this.$shareCallBack('timeline')

    const query = addUserIdWhenShare(info.path || this.share.path)
    let queryParams = query
    if (query.includes('?')) {
      // 分享朋友圈只传参数，不需要传path，不要带问号
      queryParams = query.split('?')[1]
    }
    if (this.shareInfo?.buttonTitle) {
      info.title = this.shareInfo?.buttonTitle
    }
    if (this.shareInfo?.buttonImage) {
      info.imageUrl = this.shareInfo.buttonImage
    }
    console.error('🚀 ~ 分享朋友圈 ~ query:', queryParams)
    console.log(info)
    return {
      title: info.title || this.share.title,
      query: queryParams,
      imageUrl: info.imageUrl || this.share.timelineImageUrl || this.share.imageUrl
    }
  }
}
