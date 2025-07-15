<template>
  <view class="empty c" :style="{ top }">
    <image :src="img" mode="widthFix" alt="" :style="{ width: imgWidth + 'rpx' }" />
    <view class="text" :style="{ fontSize, color: textColor }"><slot /></view>
  </view>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'shoucang', 'wangluo', 'dizhi', 'dianzan', 'feedback', 'quanyi', 'xiajia', 'pinglun'].includes(value)
      }
    },
    top: {
      type: String,
      default: '49%;'
    },
    src: {
      type: String,
      default: ''
    },
    imgWidth: {
      type: Number,
      default: 260
    },
    fontSize: {
      type: String,
      default: '28rpx'
    },
    textColor: {
      type: String,
      default: 'rgba(0,0,0,0.45)'
    }
  },
  computed: {
    img() {
      if (this.src) return this.src
      return `https://imeik-ibt.oss-cn-beijing.aliyuncs.com/iplus/img/empty-${this.type}.png?1`
    }
  }
}
</script>

<style lang="scss">
.empty.c {
  @include position-center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  .text {
    max-width: 476rpx;
    margin-top: 15rpx;
    font-weight: 400;
    white-space: normal;
    text-align: center;
  }
}
</style>
