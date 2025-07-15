<template>
  <uni-popup ref="rulePop" :safe-area="false" :mask-click="false" background-color="transparent" @change="(e) => (show = e.show)">
    <div class="x-rule">
      <view class="scroll">
        <div class="bg" />
        <div class="wrapper">
          <image class="title" src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1709262942988/rule-title.png" />
          <view class="content" :style="{ height: '56vh' }">
            <slot />
            <div class="block">
              <div class="text">
                <image src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1709263974154/1%402x.png" />
                参与时间
              </div>
              <div class="desc">{{ moment(eventInfo.startTime).format('yyyy年MM月DD日hh:mm') + '-' + moment(eventInfo.endTime).format('yyyy年MM月DD日hh:mm') }}</div>
            </div>
            <div class="block">
              <div class="text">
                <image src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1709264047404/1%402x%20(1).png" />
                参与平台
              </div>
              <div class="desc">爱+小程序</div>
            </div>
            <div class="block">
              <div class="text">
                <image src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1709264057231/1%402x%20(2).png" />
                活动规则
              </div>
              <div class="desc">
                <div class="t">【活动一：集卡立得联名礼】</div>
                <div class="d" style="margin-bottom: 16rpx">
                  活动期间，集齐2张卡片，点击合成，即可获得嗨体×雷瓦 直卷两用卷发器1份(共计4000份，粉/白色随机，兑完即止)
                  <div><span>得「i验真」卡：</span>使用爱+小程序，扫描任一爱美客旗下医美产品包装盒上的“扫码验真”二维码，完成该产品的首次验真，即得「i验真」卡</div>
                  <div><span>得「i分享」卡：</span>将当前活动页面分享给3位好友，3位好友完成爱+小程序新用户注册，即得「i分享」卡</div>
                </div>
                <div class="tip">*奖品以实物为准，数量有限，兑完即止；</div>
                <div class="tip">*完整填写并提交收货信息视为兑换成功，若未在规定时间内点击合成或提交收货信息，视为自动放弃奖励；</div>
                <div class="tip">*收货地址一经提交，不支持修改；</div>
                <div class="tip">*所兑奖品将在4月18日活动结束后，45个工作日内寄出，具体到货时间以物流为准；</div>
              </div>
              <div class="desc">
                <div class="t" style="margin-bottom: 10rpx">【活动二：赚活力值赢大奖】</div>
                <div class="d" style="margin-bottom: 16rpx">
                  <div class="line">
                    <image src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1709264239718/circle%402x.png" />
                    赚活力值：活动期间，用户登录爱+小程序通过「活力值任务」进行每日签到、转评赞等任务，获取活力值。
                  </div>
                  <div class="line">
                    <image src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1709264239718/circle%402x.png" />
                    赢大奖：根据所得活力值，在兑换时间内(具体时间以积分商城提示为准)兑换奖品。
                  </div>
                </div>
                <div class="tip">*活动期间禁止刷票等违规行为，一经发现，品牌方有权取消兑奖资格！</div>
                <div class="tip">*奖品以实物为准，数量有限，兑完即止；</div>
                <div class="tip">*完整填写并提交收货信息视为兑换成功，若未在规定时间内提交收货信息，视为自动放弃奖励；</div>
                <div class="tip">*收货地址一经提交，不支持修改；</div>
                <div class="tip">*所兑奖品将在4月18日活动结束后，45个工作日内寄出，具体到货时间以物流为准；</div>
                <div class="tip">*在法律允许的情况下，活动解释权归品牌方所有。</div>
              </div>
            </div>
          </view>
        </div>
      </view>
      <image v-if="showClose" src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1699867879319/icon_guanbi%402x.png" class="close" @click="() => (show = false)" />
    </div>
  </uni-popup>
</template>

<script>
export default {
  props: {
    value: Boolean,
    showClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    show(v) {
      this.$refs.rulePop[v ? 'open' : 'close']()
    }
  },

  mounted() {},
  created() {}
}
</script>
<style lang="scss">
.x-rule {
  .scroll {
    position: relative;
    box-sizing: border-box;
    width: 640rpx;
    margin: 0 auto;
    padding-bottom: 20rpx;
    text-align: center;
    background-color: white;
    border-radius: 24rpx;
    image {
      display: block;
    }
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      width: 640rpx;
      height: 300rpx;
      background: url('https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1709263547037/rule-bg.png') no-repeat;
      background-size: 100% 100%;
      content: '';
    }
    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 640rpx;
      height: 40rpx;
      background: url('https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1709281900053/%E7%9F%A9%E5%BD%A2%402x%20(1).png') no-repeat;
      background-size: 100% 100%;
      content: '';
    }
    .wrapper {
      overflow: hidden;
      .title {
        position: relative;
        width: 248rpx;
        height: 102rpx;
        margin: 32rpx auto 22rpx;
      }
      .content {
        position: relative;
        padding: 0 32rpx 0rpx;
        overflow: auto;
        text-align: left;
        .block {
          .text {
            font-weight: bold;
            @include flex-center-y;

            image {
              width: 26rpx;
              height: 28rpx;
              margin-right: 10rpx;
            }
          }
          .desc {
            margin: 8rpx 0 16rpx;
            color: #5a6067;
            font-size: 28rpx;
            line-height: 42rpx;
            text-align: justify;
            .t {
              font-weight: bold;
            }
            span {
              color: #0251e4;
            }
          }
          .tip {
            margin: 4rpx 0;
            color: #8e9296;
            font-size: 24rpx;
            text-align: justify;
          }
          .line {
            display: flex;
            color: #29323d;
            image {
              position: relative;
              top: 10rpx;
              flex-shrink: 0;
              width: 16rpx;
              height: 16rpx;
              margin-right: 10rpx;
            }
          }
        }
      }
    }
  }
  .close {
    @include position-center-x;

    bottom: -90rpx;
    width: 66rpx;
    height: 64rpx;
  }
}
</style>
