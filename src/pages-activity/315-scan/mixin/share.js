/**
 * 315-scan 分包默认分享
 * 使用方式：在需要默认分享的页面里 import globalShareMixin from '@/pages-activity/315-scan/mixin/share' 并 mixins: [globalShareMixin]
 * 不写 shareInfo 的页面将使用此默认（分享到活动首页）；需要自定义的页面照常写自己的 shareInfo 即可覆盖。
 */
import { getStaticImage } from '../utils/staticAssets'

export default {
  data() {
    return {
      shareInfo: {
        path: '/pages-activity/315-scan/views/index?inviteSource=19',
        title: '快来点亮专属小卡吧！',
        imageUrl: getStaticImage('share2.png')
      }
    }
  }
}
