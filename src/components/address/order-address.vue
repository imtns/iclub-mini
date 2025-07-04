<template>
  <div class="order-address">
    <view v-if="address" class="addressBox" @click="goAddress">
      <image class="logo" src="https://udstatic.imeik.com/pcUploads/1704781816016/icon_dizhi%20%402x.png" />
      <view class="rightBox">
        <view class="title">
          <view class="titleText">
            <span class="name">{{ address.receiver }}</span>
            <span class="phone">{{ address.phone }}</span>
          </view>
          <image v-if="submit" class="titlePic" src="https://udstatic.imeik.com/pcUploads/1694689689040/222.png" />
        </view>
        <view class="addressText">
          <span v-if="address.fullname">{{ address.fullname }}</span>
          <span>{{ address.detailAddress }}</span>
        </view>
      </view>
    </view>
    <view v-else class="address" @click="goAddress">
      <image class="addressL" src="https://udstatic.imeik.com/pcUploads/1704786283969/icon_dizhi%402x.png" />
      <view class="addressText">请添加收货地址后再兑换</view>
      <image class="addressR" src="https://udstatic.imeik.com/pcUploads/1693997586416/icon_jiantou%20.png" />
    </view>
  </div>
</template>

<script>
export default {
  props: {
    submit: Boolean,
    address: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    goAddress() {
      if (this.submit) {
        uni.navigateTo({
          url: '/pages/mine/address/list'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.order-address {
  .address {
    display: flex;
    align-items: center;
    margin: 0 8rpx 32rpx;
    padding: 44rpx 24rpx;
    background: #fff;
    border-radius: 32rpx;

    .addressL {
      width: 32rpx;
      height: 32rpx;
      margin-top: 8rpx;
      margin-right: 16rpx;
    }

    .addressText {
      padding-top: 12rpx;
      color: #29323d;
      font-weight: 400;
      font-size: 30rpx;
      line-height: 42rpx;
    }

    .addressR {
      width: 24rpx;
      height: 32rpx;
      margin-left: auto;
    }
  }
  .addressBox {
    display: flex;
    margin: 0 0rpx 32rpx;
    padding: 32rpx 24rpx;
    background: #fff;
    border-radius: 32rpx;

    .logo {
      width: 32rpx;
      min-width: 32rpx;
      height: 32rpx;
      margin-top: 4rpx;
      margin-right: 16rpx;
    }

    .rightBox {
      width: 100%;

      .title {
        display: flex;
        align-items: center;

        .titleText {
          display: flex;
          align-items: center;

          .name {
            margin-right: 16rpx;
            color: #29323d;
            font-weight: 600;
            font-size: 30rpx;
            line-height: 42rpx;
          }

          .phone {
            color: #29323d;
            font-weight: 400;
            font-size: 24rpx;
            line-height: 34rpx;
          }
        }

        .titlePic {
          width: 32rpx;
          min-width: 32rpx;
          height: 32rpx;
          margin-left: auto;
        }
      }

      .addressText {
        margin-top: 8rpx;
        color: #29323d;
        font-weight: 400;
        font-size: 26rpx;
        line-height: 36rpx;
        text-align: justify;
      }
    }
  }
}
</style>
