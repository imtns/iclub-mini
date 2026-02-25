<template>
  <div class="x-title">
    <view class="title">{{ title }}</view>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {}
}
</script>
<style lang="scss" scoped>
.x-title {
  position: relative;
  margin-bottom: 32rpx;
  padding-top: 40rpx;
  @include flex-spacebetween;
  .title {
    position: relative;
    color: #001226;
    font-weight: bold;
    font-size: 36rpx;
    &::before {
      left: -20rpx;
      width: 6rpx;
      height: 32rpx;
      background: #2f72f6;
      border-radius: 0rpx 8rpx 8rpx 0rpx;
      content: '';
      @include position-center-y;
    }
  }
}
</style>
