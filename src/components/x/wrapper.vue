<template>
  <div class="container" :style="{ background: bg, 'padding-bottom': footer ? `calc(${pb}rpx + env(safe-area-inset-bottom))` : 0 }">
    <uni-transition :show="show">
      <slot />
    </uni-transition>
  </div>
</template>

<script>
export default {
  props: {
    footer: Boolean,
    pb: {
      type: Number,
      default: 250
    },
    bg: {
      type: String,
      default: 'transparent'
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  onReady() {
    /**
     * 延迟300ms，不然页面初始化显示会样式错乱闪烁0.5秒
     */
    setTimeout(() => {
      this.show = true
    }, 300)
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  box-sizing: border-box;
  /* min-height: 100vh; */
  overflow: hidden;
  /* background: #f7f7f9; */
}
</style>
