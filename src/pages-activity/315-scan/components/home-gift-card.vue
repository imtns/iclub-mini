<template>
  <view class="home-gift-card" @tap="onTap">
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
@import '@/static/assets/315-scan/common.scss';

.home-gift-card {
  font-family: 'SourceHanSans-Regular', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130rpx;
  height: 146rpx;
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
  margin-top: 8rpx;
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
  padding: 0 6rpx 0;
}

.home-gift-card__name {
  display: -webkit-box;
  overflow: hidden;
  max-width: 118rpx;
  font-size: 22rpx;
  line-height: 100%;
  text-align: center;
  color: #B1C0CE;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  word-break: break-all;
}
</style>
