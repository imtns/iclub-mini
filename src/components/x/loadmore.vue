<template>
  <div class="x-loadmore">
    <view v-if="loadmore && !nomore" class="loadmore"><image src="https://udstatic.imeik.com/pcUploads/1699437223744/Spinner-1s-200px%20(1).gif" />正在加载...</view>

    <div v-if="nomore" class="no-data no-more">- 到底了 -</div>
  </div>
</template>

<script>
export default {
  props: {
    loadmore: Boolean,
    nomore: Boolean
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

  margin-top: 20rpx;
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
