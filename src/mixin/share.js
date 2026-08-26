import { pageOptionsToQuery, addUserIdWhenShare, addUserIdWhenShareWithoutLink } from '@/utils/index'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isLoaded: false,
      // 默认的全局分享内容
      share: {
        title: '欢迎加入爱美客粉丝会员CLUB',
        path: '/pages/home/index',
        imageUrl: 'https://udstatic.imeik.com/iclub/images/share.jpeg'
      }
    }
  },

  computed: {
    ...mapState({
      commonConfig: (state) => state.config.commonConfig
    })
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

  onLoad(options) {
    console.error('mixin@@@@@@@@@  load!!!!!!!!!!!')
    // 默认分享当前页面全路径 - 带query
    this.share.path = this.$mp.page?.route + `${pageOptionsToQuery(this.$mp.page.options) ? '?' + pageOptionsToQuery(this.$mp.page.options) : ''}`
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

  // 1. 发送给朋友
  onShareAppMessage(res) {
    console.log('🚀 ~ onShareAppMessage ~ res:', res)
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
    return { title, path, imageUrl }
  },

  // 2. 分享到朋友圈
  onShareTimeline(res) {
    const info = { ...(this.shareInfo || {}) }
    this.$shareCallBack && this.$shareCallBack('timeline')

    const query = addUserIdWhenShare(info.path || this.share.path)
    let queryParams = query
    if (query.includes('?')) {
      queryParams = query.split('?')[1]
    }
    if (this.shareInfo?.buttonTitle) {
      info.title = this.shareInfo?.buttonTitle
    }
    if (this.shareInfo?.buttonImage) {
      info.imageUrl = this.shareInfo.buttonImage
    }
    if (this.shareInfo?.timelineImage) {
      info.imageUrl = this.shareInfo?.timelineImage
    }
    console.error('🚀 ~ 分享朋友圈 ~ query:', queryParams)
    return {
      title: info.title || this.share.title,
      query: queryParams,
      imageUrl: info.imageUrl || this.share.timelineImageUrl || this.share.imageUrl
    }
  }
}
