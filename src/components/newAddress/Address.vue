<template>
  <view class="pcaPicker">
    <view :class="popFlag ? 'popMask' : ''" @click="hide"></view>
    <view class="popBottom" :class="popFlag ? 'popRound' : ''">
      <view class="head">
        <text class="t1" @click="hide">关闭</text>
        <text class="t3">区域选择</text>
        <text class="t2" @click="confirm">确认</text>
      </view>
      <picker-view :value="pcaIndex" indicator-style="height:39px" style="margin: 0 16px" @change="pcaChange">
        <picker-view-column>
          <view v-for="(item, index) in addressList" :key="index" class="items">{{ item.label }}</view>
        </picker-view-column>
        <picker-view-column v-if="addressList[pcaIndex[0]].children">
          <view v-for="(item, index) in addressList[pcaIndex[0]].children" :key="index" class="items">{{ item.label }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    addressList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      popFlag: false,
      pcaIndex: [0, 0, 0]
    }
  },
  methods: {
    // 滚动切换
    pcaChange(e) {
      console.log('e.detail.value', e.detail.value)
      const currentIndex = e.detail.value
      if (currentIndex[0] != this.pcaIndex[0]) {
        this.pcaIndex.splice(0, 3, currentIndex[0], 0, 0)
        return
      }
      if (currentIndex[1] != this.pcaIndex[1]) {
        this.pcaIndex.splice(1, 2, currentIndex[1], 0)
        return
      }
      if (currentIndex[2] != this.pcaIndex[2]) {
        this.pcaIndex.splice(2, 1, currentIndex[2])
      }
    },
    // 显示
    show(e) {
      console.log('eeeee')
      this.popFlag = true
    },
    // 隐藏
    hide(e) {
      this.popFlag = false
    },
    // 确认
    confirm(e) {
      const current = {
        province: this.addressList[this.pcaIndex[0]]?.label,
        city: this.addressList[this.pcaIndex[0]]?.children && this.addressList[this.pcaIndex[0]]?.children[this.pcaIndex[1]]?.label
      }
      this.$emit('data', current)
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.pcaPicker {
  .popMask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 60%);
  }
  .popBottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20000;
    width: 100vw;
    font-size: 32rpx;
    background-color: #fff;
    border-radius: 32rpx 32rpx 0 0;
    transform: translateY(100%);
    opacity: 0;
    transition: all 0.3s ease;
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      width: 100%;
      height: 80rpx;
      padding: 0 30rpx;
      text {
        display: block;
        height: 100%;
        font-weight: bold;
        line-height: 80rpx;
        text-align: center;
      }
      .t1 {
        color: #969799;
        font-weight: 400;
        font-size: 28rpx;
        line-height: 80rpx;
      }

      .t2 {
        color: #576b95;
        font-weight: 400;
        font-size: 28rpx;
        line-height: 80rpx;
      }

      .t3 {
        color: #323233;
        font-weight: 500;
        font-size: 32rpx;
        line-height: 80rpx;
      }
    }
    picker-view {
      height: 500rpx;
    }
    picker-view view {
      line-height: 68rpx;
      text-align: center;
    }
  }

  .popRound {
    transform: translateX(0);
    opacity: 1;
    transition: all 0.3s ease;
  }
  picker-view-column {
    .items {
      color: black;
      font-size: 28rpx;
      line-height: 96rpx;
      text-align: center;
    }
  }
}
</style>
