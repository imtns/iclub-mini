<template>
  <div class="x-loadmore" :style="{ marginTop: space + 'rpx' }">
    <view v-if="loadmore && !nomore" class="loadmore"><image src="https://udstatic.imeik.com/pcUploads/1699437223744/Spinner-1s-200px%20(1).gif" />正在加载...</view>

    <div v-else-if="nomore && !$slots.default" class="no-data">
      <text style="color: rgba(0, 0, 0, 50%); font-size: 24rpx"> 已经到底了~ </text>
    </div>
    <slot v-else-if="nomore" />
  </div>
</template>

<script>
export default {
  props: {
    loadmore: Boolean,
    nomore: Boolean,
    space: {
      type: [String, Number],
      default: 10
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
.x-loadmore {
  position: relative;
  @include flex-center;
  .no-data {
    color: rgba(0, 0, 0, 50%) !important;
    font-size: 20rpx;
  }

  .loadmore {
    @include flex-center;

    color: $main-blue;
    font-size: 26rpx;
    image {
      width: 46rpx;
      height: 46rpx;
    }
  }
}
</style>
