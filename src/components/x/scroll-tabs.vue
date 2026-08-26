<template>
  <view class="container">
    <view class="series-tab" :class="{ sticky }">
      <scroll-view ref="tabScrollView" class="series-tab__scroll" scroll-x :show-scrollbar="false" :scroll-left="tabScrollLeft" :scroll-with-animation="true">
        <view class="series-tab__inner" id="st-inner">
          <view v-for="(tab, index) in tabs" :key="index" :id="'st-item-' + index" class="series-tab__item" :style="{ paddingTop: itemPaddingTop + 'rpx' }" @click="selectTab(index)">
            <text :id="'st-text-' + index" class="series-tab__item-text" :class="{ 'series-tab__item-text--active': activeIndex === index }" :style="[tab.width ? { width: tab.width } : {}]">{{
              tab.tagName
            }}</text>
          </view>

          <view
            class="series-tab__bar"
            :style="{
              opacity: barReady ? 1 : 0,
              width: barWidth + 'px',
              transform: 'translateX(' + barLeft + 'px)',
              transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)'
            }"
          />
        </view>
      </scroll-view>
      <view class="series-tab__bottom-line" />
    </view>
  </view>
</template>

<script>
const INDICATOR_WIDTH_RPX = 64

export default {
  name: 'SeriesTab',
  props: {
    sticky: Boolean,
    tabs: {
      type: Array,
      default: () => []
    },
    itemPaddingTop: {
      type: Number,
      default: 60
    }
  },

  data() {
    return {
      activeIndex: 0,
      barLeft: 0,
      barReady: false,
      barWidth: uni.upx2px(INDICATOR_WIDTH_RPX),
      scrollIntoId: 'st-item-0',
      tabCenters: [], // 非激活态中心缓存
      tabActiveCenters: [], // 激活态中心缓存
      scrollViewWidth: 0,
      tabScrollLeft: 0
    }
  },

  mounted() {},

  methods: {
    setActive(tabCode) {
      const findIndex = this.tabs.findIndex((item) => item.objectCode === tabCode)
      this.selectTab(findIndex, true)
    },
    measureAllTabs() {
      if (!this.tabs.length) return
      const query = uni.createSelectorQuery().in(this)
      query.select('#st-inner').boundingClientRect()
      query.select('.series-tab__scroll').boundingClientRect() // ✅ 额外测量可视区宽度
      this.tabs.forEach((_, i) => {
        query.select('#st-text-' + i).boundingClientRect()
      })
      query.exec((rects) => {
        const inner = rects[0]
        const scrollView = rects[1] // ✅ 可视区域
        if (!inner) return
        const centers = []
        for (let i = 2; i < rects.length; i++) {
          // ✅ 从 2 开始，跳过 inner 和 scrollView
          const text = rects[i]
          if (!text) {
            centers.push(0)
            continue
          }
          const centerX = text.left - inner.left + text.width / 2
          centers.push(centerX)
        }
        this.tabCenters = centers
        this.scrollViewWidth = scrollView?.width || inner.width // ✅ 存可视区宽度
        console.log('this,barWidth', this.barWidth)
        this.tabActiveCenters[0] = centers[0]
        this.barLeft = centers[0] - this.barWidth / 2
        this.barReady = true
      })
    },

    selectTab(index, silent = false) {
      if (index === this.activeIndex) return
      const prevIndex = this.activeIndex
      this.activeIndex = index
      this.scrollIntoId = 'st-item-' + index
      this._scrollToTab(index)

      if (!silent) {
        this.$emit('tab-change', this.tabs[index])
      }

      // 已缓存激活态中心，直接用，无需查询 DOM
      if (this.tabActiveCenters[index] !== undefined) {
        this.barLeft = Math.round(this.tabActiveCenters[index] - this.barWidth / 2)
        // 上一个 tab 切走后字体缩小，更新其非激活态缓存
        this._measureInactiveCenter(prevIndex)
        return
      }

      // 首次切到该 tab，等字体放大后测量并永久缓存
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this)
        query.select('#st-inner').boundingClientRect()
        query.select('#st-text-' + index).boundingClientRect()
        query.exec((rects) => {
          const inner = rects[0]
          const text = rects[1]
          if (!inner || !text) return
          const centerX = text.left - inner.left + text.width / 2
          this.tabActiveCenters[index] = centerX
          this.barLeft = Math.round(centerX - this.barWidth / 2)
        })
      })
    },

    // 缓存某个 tab 切走后（非激活态）的中心，供 _scrollToTab 使用
    _measureInactiveCenter(index) {
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this)
        query.select('#st-inner').boundingClientRect()
        query.select('#st-text-' + index).boundingClientRect()
        query.exec((rects) => {
          const inner = rects[0]
          const text = rects[1]
          if (!inner || !text) return
          this.tabCenters[index] = text.left - inner.left + text.width / 2
        })
      })
    },

    _scrollToTab(index) {
      const tabCenterX = this.tabActiveCenters[index] ?? this.tabCenters[index]
      if (tabCenterX === undefined) return

      if (this.scrollViewWidth) {
        // ✅ tabCenterX 是 tab 中心相对 inner 的位置
        // targetScrollLeft 让选中 tab 在可视区居中
        const targetScrollLeft = Math.max(0, tabCenterX - this.scrollViewWidth / 2)
        if (targetScrollLeft === this.tabScrollLeft) {
          // 强制触发更新
          this.tabScrollLeft = targetScrollLeft + 0.1
          this.$nextTick(() => {
            this.tabScrollLeft = targetScrollLeft
          })
        } else {
          this.tabScrollLeft = targetScrollLeft
        }
        return
      }

      // scrollViewWidth 未缓存时重新测量
      const query = uni.createSelectorQuery().in(this)
      query.select('.series-tab__scroll').boundingClientRect()
      query.exec((rects) => {
        const scrollView = rects[0]
        if (!scrollView) return
        this.scrollViewWidth = scrollView.width
        this.tabScrollLeft = Math.max(0, tabCenterX - scrollView.width / 2)
      })
    },

    scrollToLeft() {
      if (this.$refs.tabScrollView) {
        this.$refs.tabScrollView.scrollTo({
          scrollLeft: 0,
          duration: 300,
          animated: true
        })
      }
    }
  }
}
</script>

<style lang="scss">
$blue: #366bd5;
$left-indent: 40rpx;
$right-indent: 32rpx;

.container {
  position: relative;
  width: 100%;
}

.series-tab {
  position: relative;
  width: 100%;
  &.sticky {
    padding-top: 24rpx;
    background: #f5f5f5;
  }
  &::after {
    bottom: 0;
    z-index: 11;
    width: 748rpx;
    height: 2rpx;
    background: url('https://udstatic.imeik.com/compressed/1773054138805_%E7%9B%B4%E7%BA%BF%203%402x.png') no-repeat;
    background-size: 100% 100%;
    content: '';
    @include position-center-x;
  }
  &::before {
    position: absolute;
    top: 60rpx;
    left: 0;
    z-index: 10;
    width: 32rpx;
    height: 80rpx;
    content: '';
  }

  &__scroll {
    width: 100%;
  }

  &__inner {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    padding-right: $right-indent;
    padding-left: $left-indent;
  }

  &__item {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 28rpx 30rpx;
  }

  &__item-text {
    color: #5a6067;
    font-size: 28rpx;
    line-height: 1;
    white-space: nowrap;
    text-align: center;

    &--active {
      color: $blue;
      font-weight: 500;
      font-size: 32rpx;
    }
  }

  &__bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4rpx;
    background: $blue;
  }
}
</style>
