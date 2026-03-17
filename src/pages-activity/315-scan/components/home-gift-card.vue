<template>
  <view class="home-gift-card" @tap.stop="onTap">
    <view class="home-gift-card__img-wrap">
      <image class="home-gift-card__img" :src="item.prizeImageUrl || item.imgUrl || ''" mode="aspectFit" />
    </view>
    <view class="home-gift-card__info">
      <text class="home-gift-card__name">{{ item.prizeName || item.name || '' }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HomeGiftCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onTap() {
      this.$emit('tap', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/pages-activity/315-scan/assets/common.scss';

.home-gift-card {
  font-family: 'SourceHanSans-Regular', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130rpx;
  height: 160rpx;
  overflow: hidden;
  background: #ECF6FF;
  border-radius: 15rpx;  
}

.home-gift-card__img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90rpx;
  height: 84rpx;
  flex-shrink: 0;
  margin-top: 10rpx;
}

.home-gift-card__img {
  width: 100%;
  height: 100%;
}

.home-gift-card__info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 4rpx 6rpx 0;
  /* iOS 上避免首行文字顶部被截断 */
  box-sizing: border-box;
}

.home-gift-card__name {
  display: -webkit-box;
  overflow: hidden;
  max-width: 118rpx;
  font-size: 22rpx;
  /* iOS 上 100% 行高会导致首行顶部被裁剪，改用略大的行高 */
  line-height: 1.35;
  text-align: center;
  color: #B1C0CE;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  word-break: break-all;
}
</style>
