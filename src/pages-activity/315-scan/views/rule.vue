<template>
  <view class="container">
    <!-- 导航栏背景渐变蒙层 -->
    <view
      class="nav-bg-overlay"
      :style="{ opacity: navBgOpacity, height: navBarHeight ? navBarHeight + 'px' : '' }"
    ></view>
    <ik-custom-header
      theme="light"
      system-text-color
      extra-holder
      :transparent="true"
      title="活动规则"
      @navBarHeight="onNavBarHeight"
    />
    <scroll-view class="rule-page-scroll" scroll-y @scroll="onScroll">
      <view class="rule-body">
        <image class="rule-img" :src="getStaticImage('rule.png')" mode="widthFix" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getStaticImage } from '../utils/staticAssets'

export default {
  data() {
    return {
      navBgOpacity: 0,
      navBarHeight: 0,
      shareInfo: {
        path: '/pages-activity/315-scan/views/rule',
        title: '医美人有自己的小卡'
      }
    }
  },

  methods: {
    onScroll(e) {
      this.navBgOpacity = Math.min(e.detail.scrollTop / 48, 1)
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
    },

    getStaticImage
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
}

.container {
  position: relative;
  font-family: 'SourceHanSans-Regular', sans-serif;
  min-height: 100vh;
  background: #fff;

  text,
  input,
  textarea,
  button {
    font-family: 'SourceHanSans-Regular', sans-serif;
  }
}

.rule-page-scroll {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
}

.rule-body {
  padding: 0 0 calc(60rpx + env(safe-area-inset-bottom));
}

.rule-img {
  display: block;
  width: 100%;
}
</style>
