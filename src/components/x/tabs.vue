<template>
  <div class="x-tabs"></div>
</template>

<script>
export default {
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
.x-tabs {
  position: fixed;
  top: -1rpx;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 112rpx;
  background: #fff;
  border-bottom: 1rpx solid #e5e5e5;
  @include flex-center;
  .tab {
    position: relative;
    width: 200rpx;
    height: 100%;
    color: #5a6067;
    font-size: 30rpx;
    @include flex-center;
    &.active {
      color: #001226;
      font-size: 36rpx;

      &::after {
        bottom: 2rpx;
        width: 32rpx;
        height: 10rpx;
        background: #217aff;
        border-radius: 10rpx;
        content: '';
        @include position-center-x;
      }
    }
  }
}
</style>
