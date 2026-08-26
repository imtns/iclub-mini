<template>
  <view
    class="move-view"
    :class="['move-view__' + uid]"
    :style="{
      top: isInit ? `${nowTop}px` : top,
      left: isInit ? `${nowLeft}px` : left,
      zIndex
    }"
    @click="handleClick"
    @touchstart="handleTouchStart"
    @touchmove.stop="handleTouchmove"
    @touchend="handleTouchend"
    @touchcancel="handleTouchend"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    top: {
      type: String,
      default: undefined
    },
    left: {
      type: String,
      default: undefined
    },
    zIndex: {
      type: Number,
      default: 20
    },
    topOffset: {
      type: Number, // px
      default: 0
    },
    bottomOffset: {
      type: Number, // px
      default: 0
    },
    leftOffset: {
      type: Number, // px
      default: 0
    },
    rightOffset: {
      type: Number, // px
      default: 0
    },
    // 延迟获取 dom
    delay: {
      type: Number,
      default: 1000
    },
    // 手动初始化
    manual: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uid: Math.random().toString(36).substring(3, 8),
      isInit: false,
      nowLeft: 0, // 初始X坐标
      nowTop: 0 // 初始Y坐标
    }
  },
  created() {
    const { windowWidth, windowHeight } = wx.getWindowInfo()
    this.windowWidth = windowWidth
    this.windowHeight = windowHeight
  },
  mounted() {
    if (!this.manual) {
      this.init()
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    init() {
      if (this.isInit) return

      this.$nextTick(() => {
        this.timer = setTimeout(() => {
          const query = this.getDom()
          query?.exec((res) => {
            console.log('🚀 ~ res:', res)
            const item = res?.[0]
            if (item) {
              const { width, height, top, left } = item
              if (!width || !height) {
                console.error('获取元素尺寸失败，请改为手动初始化，或增加 delay 时间')
                return
              }
              this.iconWidth = width
              this.iconHeight = height
              this.nowLeft = left
              this.nowTop = top
              this.isInit = true
            }
          })
        }, this.delay)
      })
    },
    getDom() {
      const query = wx.createSelectorQuery().in(this)
      query.select(`.move-view__${this.uid}`).boundingClientRect()
      return query
    },
    handleClick() {
      this.$emit('click')
    },
    handleTouchStart(e) {
      if (!this.isInit) return
      const { clientX, clientY } = e.touches[0]
      this.startX = clientX
      this.startY = clientY
      this.isStart = true
    },
    handleTouchmove(e) {
      if (!this.isInit || !this.isStart) return
      const { clientX, clientY } = e.touches[0]
      const { startX, startY, nowLeft: currentX, nowTop: currentY, windowWidth, windowHeight, iconWidth, iconHeight, topOffset, bottomOffset, leftOffset, rightOffset } = this

      const deltaX = clientX - startX
      const deltaY = clientY - startY

      // 计算新位置
      let newX = currentX + deltaX
      let newY = currentY + deltaY

      // 计算边界
      const minX = leftOffset
      const maxX = windowWidth - iconWidth - rightOffset
      const minY = topOffset
      const maxY = windowHeight - iconHeight - bottomOffset

      // 限制坐标范围
      newX = Math.max(minX, Math.min(maxX, newX))
      newY = Math.max(minY, Math.min(maxY, newY))

      this.nowLeft = newX
      this.nowTop = newY
      this.startX = newX + iconWidth / 2
      this.startY = newY + iconHeight / 2
    },
    handleTouchend() {
      this.isStart = false
    }
  }
}
</script>

<style scoped lang="scss">
.move-view {
  position: fixed;
}
</style>
