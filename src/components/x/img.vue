<template>
  <view class="img-container" :class="getID" @click="$emit('click')">
    <!-- <x-spin v-if="!show" class="loading-icon" /> -->

    <image v-if="!lazy && src" :lazy-load="true" :webp="true" :src="finalSrc" :mode="mode" :style="{ minHeight: '50rpx', borderRadius: radius }" @load="$emit('loaded')" />
    <view v-else :style="{ 'border-radius': radius, position: 'relative', width: style.width, height: style.height }">
      <view class="color-box" :style="{ background: style.background, width: style.width, height: style.height, borderRadius: radius }" />
      <uni-transition :show="show" mode="fade" :duration="600">
        <image :webp="true" :src="finalSrc" :mode="mode" :style="{ width, height }" @load="$emit('loaded')" />
      </uni-transition>
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
      loaded: false
    }
  },
  computed: {
    style() {
      //   const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      return {
        background: '#d9e6fa',
        width: this.width,
        height: this.height
      }
    },
    getID() {
      return 'img-' + this._uid
    },
    finalSrc() {
      if (this.src.includes('gif')) return this.src
      let format = 'png'
      const parts = this.src.split('.')
      const fileExtension = parts[parts.length - 1].toLowerCase()

      if (['jpg', 'jpeg'].includes(fileExtension)) {
        format = 'jpg'
      }
      if (uni.$detectWebp) {
        format = 'webp'
      }
      let width = this.width
      let height = this.height
      if (width.includes('rpx')) {
        width = Math.round(width.split('rpx')[0] * 1.5)
      }
      if (height.includes('rpx')) {
        height = Math.round(height.split('rpx')[0] * 1.5)
      }

      const rule = `?x-oss-process=image/resize,m_mfit,w_${width}/format,${format}`
      return this.src + rule
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        const observer = uni.createIntersectionObserver(this)
        observer.relativeToViewport({ bottom: 0 }).observe('.' + this.getID, (res) => {
          if (res.intersectionRatio > 0) {
            this.show = true
          }
        })
      }, 200)
    })
  },
  methods: {
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
    @include position-center;
  }
  image {
    position: relative;
    z-index: 2;
    display: block;
    width: 100%;
    height: 100%;
    &.lazy {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
