<template>
  <view class="container" :style="{ '--nav-bar-height': navBarHeight + 'px' }">
    <!-- 顶部渐变背景，固定高度 454rpx -->
    <view class="top-gradient-bg"></view>

    <!-- 页面内容层，z-index 高于渐变背景 -->
    <view class="page-content">
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
        title="星星记录"
        @navBarHeight="onNavBarHeight"
      />

      <!-- loading -->
      <view v-if="recordLoading && recordList.length === 0" class="page-loading">
        <ik-loading />
      </view>

      <view v-else>
        <!-- 蓝色信息卡片 -->
        <view class="star-info-card">
          <view class="star-info-left">
            <text class="star-card-label">当前星星</text>
            <view class="star-card-value-row">
              <text class="star-card-value">{{ userTotalStars }}</text>
              <text class="star-card-unit">颗</text>
            </view>
          </view>
          <text class="star-card-hint">星星可赠送好友</text>
        </view>

        <view class="record-panel">
          <view class="record-panel-header">
            <image class="record-header-bg" :src="getStaticImage('record-img.png')" mode="widthFix" />
            <text class="section-title">星星记录</text>
          </view>

          <!-- 流水列表 -->
          <scroll-view
            v-if="displayRecordList.length > 0"
            class="record-list"
            scroll-y
            enhanced
            :show-scrollbar="false"
            @scroll="onScroll"
            @scrolltolower="onListReachBottom"
          >
            <view v-for="(item, idx) in displayRecordList" :key="idx" class="record-item">
              <image class="record-icon" :src="getStaticImage('icon-star.png')" mode="aspectFit" />
              <view class="record-text">
                <text class="record-type">{{ item.sourceName || '星星变动' }}</text>
                <text class="record-time">{{ formatTime(item.starTime) }}</text>
              </view>
              <text :class="['record-amount', item.starCount >= 0 ? 'record-amount--plus' : 'record-amount--minus']">
                {{ formatAmount(item.starCount) }}
              </text>
            </view>
            <!-- 用原生 view 替代 uni-load-more，避免自定义组件在部分场景下宽高为 0 的渲染问题 -->
            <view v-if="recordList.length > 0" class="load-more" @tap="onLoadMoreClick">
              <text class="load-more__text">{{ loadMoreText }}</text>
            </view>
          </scroll-view>

          <!-- 空态 -->
          <view v-else class="empty-block">
            <x-empty>暂无星星记录</x-empty>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import store from '../store/index'
import { formatTimestamp, formatStarAmount } from '../utils/format'
import { getStaticImage } from '../utils/staticAssets'

const ENABLE_RECORD_MOCK = false

const MOCK_RECORD_LIST = [
  {
    sourceName: '扫码获取星星',
    starTime: Date.now(),
    starCount: 5
  },
  {
    sourceName: '赠送好友',
    starTime: Date.now() - 3600 * 1000,
    starCount: -3
  },
  {
    sourceName: '活动奖励',
    starTime: Date.now() - 24 * 3600 * 1000,
    starCount: 10
  }
]

export default {
  data() {
    return {
      navBgOpacity: 0,
      navBarHeight: 0,
      shareInfo: {
        path: '/pages-activity/315-scan/views/star-record',
        title: '医美人有自己的小卡'
      }
    }
  },

  computed: {
    userTotalStars() { return store.state.userTotalStars },
    recordList() { return store.state.recordList },
    recordLoading() { return store.state.recordLoading },
    recordPage() { return store.state.recordPage },
    recordTotalPage() { return store.state.recordTotalPage },
    displayRecordList() {
      if (ENABLE_RECORD_MOCK && this.recordList.length === 0 && !this.recordLoading) {
        return MOCK_RECORD_LIST
      }
      return this.recordList
    },
    loadMoreStatus() {
      if (store.state.recordLoading) return 'loading'
      return store.state.recordPage >= store.state.recordTotalPage ? 'noMore' : 'more'
    },
    loadMoreText() {
      const s = this.loadMoreStatus
      if (s === 'noMore') return '没有更多了'
      if (s === 'loading') return '正在加载...'
      return '点击加载更多'
    }
  },

  onLoad() {
    store.dispatch('fetchStarFlows', { page: 1 })
  },

  methods: {
    getStaticImage,
    formatTime: formatTimestamp,
    formatAmount: formatStarAmount,

    onScroll(e) {
      // this.navBgOpacity = Math.min(e.detail.scrollTop / 48, 1)
    },

    onListReachBottom() {
      if (this.recordPage >= this.recordTotalPage || store.state.recordLoading) return
      store.dispatch('fetchStarFlows', { page: this.recordPage + 1, isLoadMore: true })
    },
    onLoadMoreClick() {
      if (this.loadMoreStatus !== 'more') return
      this.onListReachBottom()
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
}

.container {
  font-family: 'SourceHanSans-Regular', sans-serif;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;

  text,
  input,
  textarea,
  button {
    font-family: 'SourceHanSans-Regular', sans-serif;
  }
}

.top-gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 454rpx;
  background: linear-gradient(180deg, #AFDAFF 0%, #FFFFFF 100%);
  pointer-events: none;
  z-index: 0;
}

.page-content {
  position: relative;
  z-index: 1;
}

::v-deep .x-button,
::v-deep .empty .text {
  font-family: 'SourceHanSans-Regular', sans-serif !important;
}

.page-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;

  &__text {
    color: #999;
    font-size: 26rpx;
    font-family: 'SourceHanSans-Regular', sans-serif;
  }
}

/* ── 星星卡片 ── */
.star-info-card {
  position: relative;
  width: 654rpx;
  height: 298rpx;
  margin: 32rpx auto 0;
  padding: 40rpx 48rpx 104rpx;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: 41rpx;
  background: #287CF0;
}

.star-info-left {
  display: flex;
  flex-direction: column;
}

.star-card-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 32rpx;  
}

.star-card-value-row {
  display: flex;
  align-items: flex-end;
  margin-top: 36rpx;
}

.star-card-value {
  color: #fff;
  font-weight: 900;
  font-size: 64rpx;
  line-height: 1;
}

.star-card-unit {
  margin-left: 8rpx;
  margin-bottom: 6rpx;
  color: #fff;
  font-size: 36rpx;
  font-style: bold;
}

.star-card-hint {
  color: #FFFFFFA1;
  font-size: 24rpx;
  margin-right: -20rpx;
}

.record-panel {
  margin-top: -50rpx;
  padding-bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* 280rpx = 37.33vw：导航栏占位下方到panel顶部的固定偏移 */
  min-height: calc(100vh - var(--nav-bar-height, 0px) - 37.33vw);
}

.record-panel-header {
  position: relative;
  height: 120rpx;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20rpx;
}

.record-header-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.section-title {
  position: relative;
  z-index: 1;
  color: #135E9C;
  font-weight: 700;
  font-size: 36rpx;
}

/* ── 流水列表 ── */
.record-list {
  /* 400rpx = 37.33vw(card区域) + 16vw(panel头部120rpx) = 53.33vw */
  height: calc(100vh - var(--nav-bar-height, 0px) - 53.33vw);
  padding: 24rpx 32rpx env(safe-area-inset-bottom);
  box-sizing: border-box;
}

.record-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
}

.record-icon {
  width: 72rpx;
  height: 72rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.record-text {
  flex: 1;

  .record-type {
    display: block;
    color: #333;
    font-size: 28rpx;
    font-weight: 500;
  }

  .record-time {
    display: block;
    margin-top: 6rpx;
    color: #999;
    font-size: 22rpx;
  }
}

.record-amount {
  font-weight: 700;
  font-size: 30rpx;
  flex-shrink: 0;

  &--plus { color: #287CF0; }
  &--minus { color: #333333; }
}

.empty-block {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>

