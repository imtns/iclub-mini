<template>
  <view class="item">
    <image v-if="item.contentType === '2'" class="play" src="https://udstatic.imeik.com/pcUploads/1705632630868/play-icon.png" />
    <view class="content">
      <x-img :lazy="false" width="350rpx" :src="item.coverImage" mode="widthFix" />
    </view>

    <view class="title">
      <text> {{ item.title }} </text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      require: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  overflow: hidden;
  background: white;
  border-radius: 32rpx;
  box-shadow: 0 6rpx 10rpx 0 rgba(241, 241, 241, 50%);
  .play {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    z-index: 2;
    width: 36rpx;
    height: 36rpx;
  }
  .content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .title {
    padding: 16rpx 24rpx 24rpx;
    text {
      max-height: 80rpx;
      color: #001226;
      font-size: 26rpx;
      text-align: left;
      @include multi-overflow(2);
    }
  }
}
</style>
