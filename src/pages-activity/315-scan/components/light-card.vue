<template>
  <view class="light-card">
    <!-- 棋盘格背景 -->
    <view class="light-card__board">
      <image
        class="light-card__img"
        :src="card && (card.imgUrl || card.cardImageUrl) || ''"
        mode="aspectFit"
      />
      <view class="light-card__brand-tag">
        <text class="light-card__brand-name">{{ card && card.cardName || '' }}</text>
      </view>
    </view>
    <!-- 获得星星数 -->
    <view class="light-card__reward">
      <image class="light-card__star-icon" :src="getStaticImage('icon-star.png')" mode="aspectFit" />
      <text class="light-card__reward-text">+{{ rewardStars }}颗</text>
    </view>
  </view>
</template>

<script>
import { getStaticImage } from '../utils/staticAssets'

export default {
  name: 'LightCard',
  props: {
    card: {
      type: Object,
      default: null
    },
    rewardStars: {
      type: Number,
      default: 1
    }
  },
  methods: {
    getStaticImage
  }
}
</script>

<style lang="scss" scoped>
@import '@/pages-activity/315-scan/assets/common.scss';

.light-card {
  font-family: 'SourceHanSans-Regular', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.light-card__board {
  position: relative;
  width: 320rpx;
  height: 320rpx;
  overflow: hidden;
  background-image:
    linear-gradient(45deg, #f5f5f5 25%, transparent 25%),
    linear-gradient(-45deg, #f5f5f5 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f5f5f5 75%),
    linear-gradient(-45deg, transparent 75%, #f5f5f5 75%);
  background-color: #e8e8e8;
  background-position: 0 0, 0 20rpx, 20rpx -20rpx, -20rpx 0;
  background-size: 40rpx 40rpx;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.light-card__img {
  width: 100%;
  height: 100%;
}

.light-card__brand-tag {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12rpx 16rpx;
  background: rgba(0, 0, 0, 0.4);
}

.light-card__brand-name {
  color: #fff;
  font-weight: 600;
  font-size: 24rpx;
}

.light-card__reward {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
}

.light-card__star-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 8rpx;
}

.light-card__reward-text {
  color: #1890ff;
  font-weight: 700;
  font-size: 32rpx;
}
</style>
