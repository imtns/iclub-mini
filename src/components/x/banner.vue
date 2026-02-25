<template>
  <view class="slider-wrapper">
    <swiper style="height: 750rpx" :autoplay="autoplay" :interval="interval" :duration="duration" @change="change">
      <swiper-item v-for="(item, index) in images" :key="index">
        <image :src="item.imgUrl" mode="aspectFill" class="slider-image" />
      </swiper-item>
    </swiper>
    <view class="indicator-wrapper">
      <view class="indicator">{{ current + 1 }}</view>
      <view class="allLength">{{ images.length }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      current: 0
    }
  },
  methods: {
    change(e) {
      this.current = e.detail.current
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-image {
  width: 750rpx !important;
  height: 750rpx !important;
}

.indicator-wrapper {
  position: absolute;
  right: 24rpx;
  bottom: 24rpx;
  display: flex;
  align-items: center;
  width: 72rpx;
  color: #fff;
  background: #a5a5a5;
  border-radius: 36rpx;
}

.indicator {
  width: 39rpx;
  color: #fff;
  font-weight: bold;
  font-size: 24rpx;
  line-height: 36rpx;
  text-align: center;
  background: #6a6666;
  border-radius: 36rpx 0 36rpx 36rpx;
}

.allLength {
  width: 32rpx;
  color: #fff;
  font-weight: bold;
  font-size: 24rpx;
  line-height: 36rpx;
  text-align: center;
}
</style>
