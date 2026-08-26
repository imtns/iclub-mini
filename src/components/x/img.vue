<template>
  <view class="img-container" :class="getID" @click="$emit('click')">
    <!-- <x-spin v-if="!show" class="loading-icon" /> -->

    <image v-if="!lazy && src" :lazy-load="true" :webp="true" :src="finalSrc" :mode="mode" :style="{ minHeight: '50rpx', borderRadius: radius, opacity: 1 }" @load="$emit('loaded')" />
    <view v-else :style="{ 'border-radius': radius, position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }">
      <view class="color-box" :style="{ background: placeholderColor }" />
      <image v-show="show" :webp="true" :src="finalSrc" :mode="mode" :style="{ width: '100%', height: '100%', opacity: 0 }" @load="$emit('loaded')" :class="{ 'lazy-image--show': show }" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'XImg',
  props: {
    waterfall: Boolean,
    lazy: {
      type: Boolean,
      default: true
    },
    radius: {
      type: String,
      default: '0rpx'
    },
    mode: {
      type: String,
      default: 'widthFix'
    },
    width: {
      type: String,
      default: '300rpx'
    },
    height: {
      type: String,
      default: '300rpx'
    },
    src: {
      type: [String, null],
      default: '',
      requred: true
    },
    type: {
      type: String,
      default: 'zone'
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      show: false,
      loaded: false,
      placeholderColor: this._randomColor()
    }
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height
      }
    },
    getID() {
      return 'img-' + this._uid
    },
    finalSrc() {
      // 1. 空值直接返回
      if (!this.src) {
        return this.src
      }

      // 2. 定义无需处理的图片格式（GIF/SVG）
      const IGNORE_FORMATS = ['gif', 'svg']

      // 提取文件后缀（兼容URL带参数、大小写）
      const getFileExtension = (url) => {
        const urlWithoutParams = url.split('?')[0]
        const extension = urlWithoutParams.split('.').pop()?.toLowerCase() || ''
        return extension
      }

      // 3. GIF/SVG 直接返回原地址，不处理
      const fileExt = getFileExtension(this.src)
      if (IGNORE_FORMATS.includes(fileExt)) {
        return this.src
      }

      // 4. 以下为原有处理逻辑（保持不变，可复用之前优化的代码）
      const CONSTANTS = {
        DOMAIN_MAP: {
          old: 'imeikud.oss-cn-beijing.aliyuncs.com',
          new: 'udstatic.imeik.com'
        },
        SUPPORT_FORMATS: {
          jpg: ['jpg', 'jpeg'],
          png: ['png'],
          webp: ['webp']
        },
        OSS_PROCESS_PREFIX: '?x-oss-process=image/resize,m_mfit'
      }

      const filterSrc = this.src.replace('http://', 'https://').replace(CONSTANTS.DOMAIN_MAP.old, CONSTANTS.DOMAIN_MAP.new)

      let targetFormat = 'png'
      const urlWithoutParams = filterSrc.split('?')[0]
      const processExt = urlWithoutParams.split('.').pop()?.toLowerCase() || ''

      if (CONSTANTS.SUPPORT_FORMATS.jpg.includes(processExt)) {
        targetFormat = 'jpg'
      }
      if (uni?.$detectWebp) {
        targetFormat = 'webp'
      }

      const convertRpxToPx = (size) => {
        if (typeof size !== 'string') return size
        if (size.includes('rpx')) {
          const num = parseFloat(size.split('rpx')[0])
          return Math.round(num * 1.5)
        }
        return parseInt(size, 10) || 0
      }

      const width = convertRpxToPx(this.width)
      const height = convertRpxToPx(this.height)

      let ossParams = CONSTANTS.OSS_PROCESS_PREFIX
      if (width) ossParams += `,w_${width}`
      if (height) ossParams += `,h_${height}`
      ossParams += `/format,${targetFormat}`

      return filterSrc + ossParams
    }
  },

  mounted() {
    if (!this.lazy || !this.src) return
    this._setupObserver()
  },

  beforeDestroy() {
    this._disconnectObserver()
  },
  methods: {
    _randomColor() {
      const hue = Math.floor(Math.random() * 360)
      return `hsl(${hue}, 15%, 88%)`
    },
    _setupObserver() {
      console.log('222')
      this.$nextTick(() => {
        setTimeout(() => {
          const observer = uni.createIntersectionObserver(this)
          this._observer = observer
          observer.relativeToViewport({ bottom: 50 }).observe('.' + this.getID, (res) => {
            console.log('res', res)
            if (res.intersectionRatio > 0) {
              this.show = true
              this._disconnectObserver()
            }
          })
        }, 200)
      })
    },
    _disconnectObserver() {
      if (this._observer) {
        this._observer.disconnect()
        this._observer = null
      }
    },
    onImageLoad() {
      console.log('load')
    }
  }
}
</script>
<style lang="scss">
.img-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .loading-icon {
    @include position-center;

    width: 140px !important;
    height: 140px !important;
  }

  .color-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  image {
    position: relative;
    z-index: 2;
    display: block;
    width: 100%;
    height: 100%;

    &.lazy-image {
      z-index: 2;
      transition: all 0.3s ease;
      &--show {
        opacity: 1 !important;
      }
    }
  }
}
</style>
