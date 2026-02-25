<template>
  <uni-popup ref="popup" :safe-area="false" :mask-click="false" background-color="transparent" @change="(e) => (show = e.show)">
    <view class="scroll">
      <div class="bg" />
      <div class="wrapper">
        <image class="title" mode="widthFix" src="https://udstatic.imeik.com/pcUploads/1715152838047/%E6%B4%BB%E5%8A%A8%E8%A7%84%E5%88%99%402x.png" />
        <view class="content" :style="{ height: '63vh' }">
          <div class="block">
            <div class="text">
              <image src="https://udstatic.imeik.com/pcUploads/1715154321440/1%402x.png" />
              参与时间
            </div>
            <div class="desc">{{ moment(eventInfo.startTime).format('YYYY年M月DD日hh:mm:ss') + '--' + moment(eventInfo.endTime).format('M月DD日hh:mm:ss') }}</div>
          </div>
          <div class="block">
            <div class="text">
              <image src="https://udstatic.imeik.com/pcUploads/1715154339468/1%402x%20(1).png" />
              参与平台
            </div>
            <div class="desc">爱+小程序</div>
          </div>
          <div class="block">
            <div class="text">
              <image src="https://udstatic.imeik.com/pcUploads/1715154352004/1%402x%20(2).png" />
              活动规则
            </div>
            <div class="desc">
              <image mode="widthFix" style="position: relative; left: -8rpx; width: 206rpx; margin: 5rpx 0" src="https://udstatic.imeik.com/pcUploads/1715154652796/%E9%80%9A%E5%85%B3%402x.png" />
              <div class="t">活动期间，参与游戏，<text>前6000名</text>通关即可获得嗨嗨玩偶挂件<text>1份</text>(共计6000份，先兑先得)。</div>
              <div class="tip">*玩偶挂件以实物为准，同一ID仅能兑换一次，数量有限，兑完即止；</div>
              <div class="tip">*须正确、完整填写地址视为成功兑换，若未在规定时间内提交收货信息，视为自动放弃奖励；</div>
              <div class="tip">*收货地址一经提交，不支持修改；</div>
              <div class="tip">*成功兑换后，奖品将在活动结束后，30个工作日内寄出，具体到货时间以物流信息为准；</div>
            </div>

            <div class="desc">
              <image mode="widthFix" style="position: relative; left: -8rpx; width: 206rpx; margin: 5rpx 0" src="https://udstatic.imeik.com/pcUploads/1715155460880/%E9%97%AF%E5%85%B3%402x.png" />
              <div class="t">活动期间，游戏通关并赚取游戏积分，截至6月28日12:00:00，总分排名<text>前50名</text>用户进入奖金池均分<text>2.5万元</text>现金，即500元(税前)/名。</div>
              <div class="tip">*现金奖励不累计不叠加，同一ID仅能获得一份奖励；</div>
              <div class="tip">*现金奖励以转账方式发放，将在活动结束后7个工作日内联系获奖用户，并核实信息。</div>
              <div class="line" />
              <div class="tip">*游戏细则以游戏内页展示为准；</div>
              <div class="tip">*实物奖励和现金奖励可同时获得；</div>
              <div class="tip">*活动期间禁止不正当获取奖励等违规行为，一经发现，品牌方有权取消兑奖资格；</div>
              <div class="tip">*在法律允许的情况下，活动解释权归品牌方所有。</div>
            </div>
          </div>
        </view>
      </div>
    </view>
    <image src="https://udstatic.imeik.com/pcUploads/1699867879319/icon_guanbi%402x.png" class="close" @click="show = false" />
  </uni-popup>
</template>

<script>
import moment from 'dayjs'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {},
  props: {
    value: Boolean
  },
  data() {
    return {
      moment,
      height: 0
    }
  },
  computed: {
    ...mapGetters(['eventInfo']),
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
      this.$refs.popup[v ? 'open' : 'close']()
    }
  },

  mounted() {},
  created() {},
  methods: {}
}
</script>
<style lang="scss">
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
    background: url('https://udstatic.imeik.com/pcUploads/1715153962782/%E7%BC%96%E7%BB%84%202%402x.png') no-repeat;
    background-size: 100% 100%;
    content: '';
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 640rpx;
    height: 40rpx;
    background: url('https://udstatic.imeik.com/pcUploads/1709281900053/%E7%9F%A9%E5%BD%A2%402x%20(1).png') no-repeat;
    background-size: 100% 100%;
    content: '';
  }
  .wrapper {
    overflow: hidden;
    .title {
      position: relative;
      width: 368rpx;
      margin: 32rpx auto 22rpx;
    }
    .line {
      width: 576rpx;
      height: 1rpx;
      margin: 24rpx 0;
      background: #eee;
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
            font-size: 30rpx;
            text {
              color: #fab800;
            }
          }
          span {
            color: #0251e4;
          }
        }
        .tip {
          margin: 2rpx 0;
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
</style>
