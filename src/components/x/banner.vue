<template>
  <view class="slider-wrapper" :style="[customStyle, { height }]">
    <swiper style="height: 100%" :autoplay="autoplay" :interval="interval" :duration="duration" @change="change">
      <swiper-item v-for="(item, index) in images" :key="index">
        <div class="slider-image" @tap="onBannerClicked(item)">
          <x-img :src="getUrl(item)" :lazy="false" width="750rpx" :height="height" mode="aspectFill" />
        </div>
      </swiper-item>
    </swiper>
    <view v-if="indicator && indicatorStyle === 'number' && images.length > 1" class="indicator-wrapper">
      <view class="indicator-current">{{ current + 1 }}</view>
      <view class="indicator-total">{{ images.length }}</view>
    </view>
    <view v-if="indicator && indicatorStyle === 'dot' && images.length > 1" class="dots-wrap">
      <view v-for="(item, idx) in images" :key="idx" class="dot" :class="{ 'dot--active': current === idx }" />
    </view>
  </view>
</template>

<script>
import { pageJump } from '@/utils/util'

export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '200rpx'
    },
    customStyle: {
      type: Object,
      default: () => ({})
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
    },
    indicator: {
      type: Boolean,
      default: true
    },
    indicatorStyle: {
      type: String,
      default: 'dot' // 'dot' | 'number'
    },
    imgField: {
      type: String,
      default: 'imgUrl'
    },
    linkField: {
      type: String,
      default: 'linkUrl'
    }
  },
  data() {
    return {
      locker: false,
      current: 0
    }
  },
  methods: {
    change(e) {
      this.current = e.detail.current
    },
    jump(url) {
      if (!url) {
        this.locker = false
        return
      }
      pageJump(url)
      setTimeout(() => {
        this.locker = false
      }, 1500)
    },
    onBannerClicked(item) {
      if (this.locker || typeof item === 'string') return
      this.report('圈子banner点击')
      this.locker = true
      this.jump(item[this.linkField])
    },
    getUrl(item) {
      if (typeof item === 'string') return item
      return item[this.imgField]
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
  width: 100%;
  height: 100%;
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

.indicator-current {
  width: 39rpx;
  color: #fff;
  font-weight: bold;
  font-size: 24rpx;
  line-height: 36rpx;
  text-align: center;
  background: #6a6666;
  border-radius: 36rpx 0 36rpx 36rpx;
}

.indicator-total {
  width: 32rpx;
  color: #fff;
  font-weight: bold;
  font-size: 24rpx;
  line-height: 36rpx;
  text-align: center;
}

.dots-wrap {
  position: absolute;
  right: 0;
  bottom: 10rpx;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  gap: 10rpx;
  align-items: center;
  justify-content: center;
}

.dot {
  width: 8rpx;
  height: 8rpx;
  background: rgba(255, 255, 255, 40%);
  border-radius: 4rpx;

  &--active {
    width: 24rpx;
    height: 8rpx;
    background: #fff;
    border-radius: 4rpx;
  }
}
</style>
