<template>
  <view class="sticky-tab-list">
    <!-- 正常流的 tabs -->
    <view v-if="tabs.length" class="sticky-tab-list__tab-wrap" ref="tabWrap" :class="{ sticky: stickyActive, animation }" :style="{ top: navBarHeight + 'px', paddingTop: tabPaddingTop + 'rpx' }">
      <x-scroll-tabs :item-padding-top="10" ref="tab" :tabs="tabs" @tab-change="handleTabChange" />
    </view>
    <view v-else style="height: 32rpx; margin-bottom: 30rpx" class="title"> {{ title }} </view>
    <!-- 占位，sticky 时撑开 tab 栏高度，防止内容上移 -->
    <view v-if="stickyActive" :style="'height: ' + (tabBarHeight + 5) + 'px'" />
    <view style="min-height: 85vh; padding-top: 8rpx">
      <div style="min-height: 500rpx; margin-top: 90rpx" v-if="!list.length && !loading && !delayLoading">
        <x-empty :position="emptyPosition" :top="emptyTop" />
      </div>
      <!-- 内容 -->
      <template v-else>
        <x-waterfall-grid v-if="!loading || !delayLoading" :list="list" @click="$emit('note-tap', $event)" :single-line-title="singleLineTitle" />

        <!-- 状态 -->
        <view class="sticky-tab-list__status" v-if="!delayLoading">
          <x-loadmore :loadmore="loading" :nomore="noMore" />
        </view>
        <x-loading v-if="delayLoading" top="45%" />
      </template>
    </view>
  </view>
</template>

<script>
export default {
  name: 'StickyTabList',

  props: {
    title: { type: String, default: '' },
    tabs: { type: Array, default: () => [] },
    list: { type: Array, default: () => [] },
    emptyPosition: {
      type: String,
      default: 'relative'
    },
    loading: { type: Boolean, default: false },
    tabPaddingTop: {
      type: Number,
      default: 0
    },
    tabLoading: Boolean,
    emptyTop: { type: String, default: '49%' },
    noMore: { type: Boolean, default: false },
    stickyActive: { type: Boolean, default: false },
    singleLineTitle: Boolean
  },

  data() {
    return {
      navBarHeight: 0,
      tabBarHeight: 0,
      animation: false,
      delayLoading: false
    }
  },

  watch: {
    tabLoading(value) {
      if (!value) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.delayLoading = false
          })
        }, 150)
      } else {
        this.delayLoading = true
      }
    },
    stickyActive(val) {
      this.animation = val
    },
    tabs(val) {
      if (val.length) {
        setTimeout(() => {
          this.$nextTick(() => {
            this._measureTabBar()
          })
        }, 200)
      }
    }
  },

  mounted() {
    this.navBarHeight = this.lsGet('navBarHeight')
  },

  methods: {
    _measureTabBar() {
      if (this.$refs.tab && typeof this.$refs.tab.measureAllTabs === 'function') {
        this.$refs.tab.measureAllTabs()
      }
      uni
        .createSelectorQuery()
        .in(this)
        .select('.sticky-tab-list__tab-wrap')
        .boundingClientRect((rect) => {
          console.log('🚀 ~ _measureTabBarrect:', rect)
          if (rect && rect.height > 0) this.tabBarHeight = rect.height
        })
        .exec()
    },
    handleTabChange(index) {
      this.$emit('tab-change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.sticky-tab-list {
  padding: 36rpx 0 0;
  background: white;
  .title {
    margin-left: 32rpx;
    color: #000;
    font-weight: 500;
    font-size: 32rpx;
  }
}

.sticky-tab-list__tab-wrap {
  width: 100%;
  margin-bottom: 32rpx;
  background: #fff;
  &.sticky {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 100;
    background: #fff;
    opacity: 0;

    &.animation {
      opacity: 1;
      /* transition: opacity 0.15s ease; */
    }
  }
}

.sticky-tab-list__status {
  position: relative;
  top: -6rpx;
  display: flex;
  justify-content: center;
  padding: 0 0 48rpx;
}
</style>
