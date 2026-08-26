import { mapState } from 'vuex'
import { ls, lsGet } from '@/utils/util'
import { sysInfo } from '@/utils/sysInfo'
import { sleep, getOssSrc } from '@/utils/tools'
import report from '@/utils/report/report'
import moment from 'dayjs'

export default {
  data() {
    return {
      isCallbackRunning: false,
      moment,
      locking: false,
      url: '',
      sysInfo: sysInfo(),
      redirecting: false,
      transparentBar: true,
      pageScrollTop: 0
    }
  },

  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
      userInfo: (state) => state.user.userInfo,
      commonConfig: (state) => state.config.commonConfig
    })
  },

  created() {
    const pages = getCurrentPages().reverse()
    const url = pages[0] && pages[0].route
    this.bus.register(`captchaCallback-${url}`, this, (methodName) => {
      this.captchaCallback(methodName)
    })
  },

  beforeDestroy() {
    const pages = getCurrentPages().reverse()
    const url = pages[0] && pages[0].route
    this.bus.unregister(`captchaCallback-${url}`, this)
  },

  onPageScroll(res) {
    const route = getCurrentPages().reverse()[0]?.route
    if (route) {
      this.$store.commit('setScrollTop', { route, scrollTop: res.scrollTop })
    }
    this.pageScrollTop = res.scrollTop
    this.transparentBar = res.scrollTop < 40
  },

  methods: {
    showToast(message, duration = 2000) {
      this.$refs.toast.show({ message, duration })
    },

    formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
      return moment(time).format(format)
    },

    report(name, isPageLoad = false) {
      const data = { pageSession: Math.random().toString(16).substring(2) + new Date().getTime(), activityName: name }
      report({ eventId: isPageLoad ? 'page_expose' : 'element_click', pageUrl: '', referrerUrl: '', dataKeys: data })
    },

    captchaCallback(methodName) {
      this[`${methodName}`]?.()
    },

    phoneCall(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber,
        success: (res) => {
          console.log('调用成功!')
        },
        fail: (res) => {
          console.log('调用失败!')
        }
      })
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

    checkSafeLevel(url) {
      const pages = getCurrentPages()
      const level = pages.length
      console.log('🚀 ~ 当前页面栈层级:', level, 'url:', url)
      if (level >= 8) {
        console.warn(`页面栈到达极限(${level}层)，改用 redirectTo 跳转`)
        return true
      }
      return false
    },

    go({ url, auth = false, isRedirect = false }) {
      if (auth && !this.isLogin) {
        ls('returnUrl', url)
        this.goLogin()
        return
      }

      if (this.redirecting) return
      this.redirecting = true

      const shouldRedirect = isRedirect || this.checkSafeLevel(url)

      const complete = () => {
        this.redirecting = false
      }

      if (shouldRedirect) {
        wx.redirectTo({ url, complete })
      } else {
        wx.navigateTo({ url, complete })
      }
    },

    commentTime(time) {
      const _time = moment(time)
      const now = moment()
      const isSameYear = _time.year() === now.year()
      return isSameYear ? _time.format('MM-DD HH:mm:ss') : _time.format('YYYY-MM-DD HH:mm:ss')
    },

    getOssSrc,
    lsGet
  }
}
