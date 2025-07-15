<template>
  <view id="footer" class="x-footer" :style="{ background: bg, borderRadius, color }" :class="{ center, flex }">
    <slot />
  </view>
</template>

<script>
export default {
  props: {
    flex: Boolean,
    center: Boolean,
    borderRadius: {
      type: String,
      default: '0px'
    },
    color: {
      type: String,
      default: '#333'
    },
    bg: {
      type: String,
      default: 'white'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    const that = this
    setTimeout(() => {
      const query = uni.createSelectorQuery().in(this)
      query
        .select('#footer')
        .boundingClientRect((data) => {
          that.$emit('height', data?.height)
        })
        .exec()
    }, 200)
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.x-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  box-shadow: 0rpx -2rpx 16rpx 0rpx rgba(41, 50, 61, 3%);
  &.flex {
    display: flex;
  }
  &.center {
    @include flex-center;
  }
}
</style>
