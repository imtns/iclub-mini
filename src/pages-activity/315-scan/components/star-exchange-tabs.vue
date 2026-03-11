<template>
  <view class="star-exchange-tabs">
    <view
      v-for="(item, index) in options"
      :key="index"
      class="tab-item"
      :class="{ active: activeTab === item.value }"
      :data-value="item.value"
      @click="onTabClick(item)"
    >
      <!-- 选中：图片铺底 + 左侧星星数字 + 右侧白字 -->
      <view v-if="activeTab === item.value" class="tab-item-selected">
        <image
          class="tab-item-selected-bg"
          :src="selectedBgUrl"
          mode="widthFix"
        />
        <view class="tab-item-selected-text">
          <view class="tab-star-num-wrap">
            <text class="tab-star-num">{{ item.value }}</text>
          </view>
          <text class="tab-label-white">星奖品</text>
        </view>
      </view>
      <!-- 未选中：纯文本 -->
      <text v-else class="tab-item-unselected">{{ item.label }}</text>
    </view>
  </view>
</template>

<script>
import { getStaticImage } from '../utils/staticAssets'

export default {
  name: 'StarExchangeTabs',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    defaultSelect: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      activeTab: ''
    }
  },
  computed: {
    selectedBgUrl() {
      return getStaticImage('exchange-tab.png') || ''
    }
  },
  watch: {
    defaultSelect: {
      handler(val) {
        this.activeTab = val
      },
      immediate: true
    }
  },
  methods: {
    onTabClick(item) {
      this.activeTab = item.value
      this.$emit('change', item.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/pages-activity/315-scan/assets/common.scss';

.star-exchange-tabs {
  font-family: 'SourceHanSans-Regular', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 16rpx 24rpx 18rpx;
  // background: #fff;
}

.tab-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 64rpx;
}

/* 选中态：图片铺底 + 文字叠在上方 */
.tab-item-selected {
  position: relative;
  width: 100%;
  min-height: 64rpx;
  margin-top: -6rpx;
}

.tab-item-selected-bg {
  display: block;
  width: 194rpx;
  height: 70rpx;
  vertical-align: top;
}

.tab-item-selected-text {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

/* 固定宽度容器：按两位数字预留，数字在内居中，与「星奖品」的间距不随个位/十位变化 */
.tab-star-num-wrap {
  width: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: -16rpx;
}

.tab-star-num {
  color: #ff6f00;
  font-size: 32rpx;
  font-style: bold;
}

.tab-label-white {
  color: #fff;
  font-size: 32rpx;
  font-style: bold;
  margin-top: 2rpx;
}

/* 未选中态：设计稿规范 */
.tab-item-unselected {
  font-size: 32rpx;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
  color: #33333359;
  margin-top: 2rpx;
}
</style>
