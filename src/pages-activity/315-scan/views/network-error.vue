<template>
  <view class="container">
    <!-- 导航栏背景蒙层（此页面无滚动，常驻透明） -->
    <view
      class="nav-bg-overlay"
      :style="{ height: navBarHeight ? navBarHeight + 'px' : '' }"
    ></view>
    <ik-custom-header
      theme="light"
      system-text-color
      extra-holder
      :transparent="true"
      title=""
      @navBarHeight="onNavBarHeight"
    />
    <view class="error-content">
      <image class="status-image" :src="statusImage" mode="aspectFit" />
      <text class="main-text">网络不好，请重试~</text>
      <text class="sub-text">请开启网络或切换网络后再刷新重试</text>
      <x-btn type="primary" text="重试" :radius="'44rpx'" :height="'88rpx'" @tap="onRetry" />
    </view>
  </view>
</template>

<script>
import { getStaticImage } from '../utils/staticAssets'
import globalShareMixin from '@/pages-activity/315-scan/mixin/share'

export default {
  mixins: [globalShareMixin],

  data() {
    return {
      statusImage: getStaticImage('ico-network-error.png'),
      navBarHeight: 0
    }
  },

  methods: {
    onRetry() {
      uni.navigateBack()
    },

    onNavBarHeight(h) {
      this.navBarHeight = h || 0
    },

    $shareCallBack(type) {
      if (type === 'timeline') {
        this.report('315验真-活动分享-分享到朋友圈')
      } else {
        this.report('315验真-活动分享-分享到朋友')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/pages-activity/315-scan/assets/common.scss';

.nav-bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 997;
  background-color: #ffffff;
  pointer-events: none;
  opacity: 0;
}

.container {
  font-family: 'SourceHanSans-Regular', sans-serif;
  min-height: 100vh;
  background: linear-gradient(180deg, #e8f4ff 0%, #fff 60%);

  text,
  input,
  textarea,
  button {
    font-family: 'SourceHanSans-Regular', sans-serif;
  }
}

::v-deep .x-button {
  font-family: 'SourceHanSans-Regular', sans-serif !important;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 60rpx calc(60rpx + env(safe-area-inset-bottom));
}

.status-image {
  width: 400rpx;
  height: 360rpx;
  margin-bottom: 40rpx;
}

.main-text {
  color: #333;
  font-weight: 600;
  font-size: 34rpx;
  margin-bottom: 16rpx;
}

.sub-text {
  color: #999;
  font-size: 26rpx;
  margin-bottom: 60rpx;
  text-align: center;
  line-height: 1.7;
}
</style>

