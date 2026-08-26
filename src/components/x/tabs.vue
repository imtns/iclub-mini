<template>
  <view class="ul">
    <view v-for="(item, index) in tabs" :key="index" class="li" :class="{ active: value == item.value }" @click="actived(item.value, index)">
      <span style="position: relative; z-index: 2">{{ item.name }}</span>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TabsThree',
  props: {
    loading: Boolean,
    value: {
      type: String,
      default: 1
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showBg: 0
    }
  },
  methods: {
    actived(item, index) {
      if (this.loading || this.value === item) return
      this.showBg = index
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.ul {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 98rpx;
  background: #fff;
  border-bottom: 1rpx #eee solid;
  .li {
    width: 40%;
    margin: 32rpx 0;
    color: #3b3b3b;
    font-weight: 400;
    font-size: 32rpx;
    text-align: center;
    background: #fff;
    border-radius: 8rpx;
  }
  .active {
    position: relative;
    color: #366bd5;
    font-weight: 600;
    font-size: 32rpx;
    text-align: center;
    &::after {
      @include position-center-x;

      bottom: -12rpx;
      z-index: 1;
      width: 84rpx;
      height: 4rpx;
      background: #366bd5;
      content: '';
    }
  }
}
</style>
