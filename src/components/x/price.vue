<template>
  <div class="x-price" :style="{ color, 'padding-left': big ? '26rpx' : '24rpx' }">
    <view class="unit" :style="{ fontSize: big ? '32rpx' : '26rpx', bottom: big ? '-16rpx' : '-12rpx' }">￥</view>
    <view class="price" :style="{ fontSize: big ? '44rpx' : '26rpx' }">
      {{ finalPrice[0] }}<text :style="{ fontSize: big ? '32rpx' : '26rx' }">.{{ finalPrice[1] || '00' }}</text>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    big: Boolean,
    color: {
      type: String,
      default: 'rgba(250, 44, 25, 100%)'
    },
    price: {
      type: [Number, String],
      default: '0.00'
    }
  },
  data() {
    return {}
  },
  computed: {
    finalPrice() {
      return Number(this.price).toFixed(2).toString().split('.')
    }
  }
}
</script>
<style lang="scss" scoped>
.x-price {
  position: relative;
  height: 45rpx;
  padding-left: 22rpx;
  font-weight: bold;
  @include flex-center-y;
  .unit {
    @include position-center-y;

    left: 0;
    font-size: 24rpx;
  }
}
</style>
