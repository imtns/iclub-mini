<template>
  <!-- 兑换页两列大卡 -->
  <view class="gift-card gift-card--grid" @tap="onTap">
    <!-- 商品图 -->
    <view class="gift-card__img-wrap">
      <image class="gift-card__img" :src="item.prizeImageUrl || item.imgUrl || ''" mode="aspectFill" />
      <!-- 库存不足：先蒙层，再在蒙层上面盖居中图标 -->
      <view v-if="isOutOfStock" class="gift-card__stock-mask" />
      <image
        v-if="isOutOfStock"
        class="gift-card__stock-icon"
        :src="exchangeImgNone"
        mode="aspectFit"
      />
    </view>

    <!-- 商品信息 -->
    <view class="gift-card__info">
      <text class="gift-card__name">{{ item.prizeName || item.name || '' }}</text>
      <!-- 底部兑换条 -->
      <view class="gift-card__footer-wrap" @tap.stop="onExchange">
        <view class="gift-card__footer">
          <view class="gift-card__stars-wrap">
            <text class="gift-card__stars-num">{{ item.needStarCount || item.starCost || 0 }}</text>
            <text class="gift-card__stars-txt">颗星星</text>
          </view>
        </view>
        <image
          class="gift-card__status-img"
          :src="item.canExchange && !isOutOfStock ? exchangeStatus1 : exchangeStatus0"
          mode="aspectFit"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { getStaticImage } from '../utils/staticAssets'

export default {
  name: 'GiftCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    userStarCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      exchangeStatus0: getStaticImage('exchange-status-0.png'),
      exchangeStatus1: getStaticImage('exchange-status-1.png'),
      exchangeImgNone: getStaticImage('exchange-img-none.png')
    }
  },
  computed: {
    // 接口只返回 remainCount，无 outOfStock 字段；库存为 0 即视为缺货（仅用于展示蒙层/图标）
    isOutOfStock() {
      return Number(this.item.remainCount) === 0
    },
    // 仅用于展示可兑换/不可兑换图标，不在此做拦截
    canExchange() {
      return this.item.canExchange === true &&
        (this.userStarCount >= (this.item.needStarCount || this.item.starCost || 0))
    }
  },
  methods: {
    onTap() {
      this.$emit('tap', this.item)
    },
    onExchange() {
      this.$emit('exchange', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/assets/315-scan/common.scss';

/* 兑换页两列大卡 */
.gift-card--grid {
  font-family: 'SourceHanSans-Regular', sans-serif;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 473rpx;
  overflow: hidden;
  opacity: 1;
  background: #fff;
  border-radius: 36rpx;

  .gift-card__img-wrap {
    position: relative;
    width: 288rpx;
    height: 288rpx;
    margin: 25rpx auto 0;
    overflow: hidden;
    border-radius: 36rpx;

    .gift-card__img {
      width: 100%;
      height: 100%;
    }
  }

  /* 库存不足：蒙层在下，图标盖在蒙层上面、居中 */
  .gift-card__stock-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: #00000080;
  }

  .gift-card__stock-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: 207rpx;
    height: 207rpx;
    transform: translate(-50%, -50%);
  }

  .gift-card__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16rpx 25rpx 16rpx;
    min-height: 0;
  }

  .gift-card__name {
    display: -webkit-box;
    overflow: hidden;
    width: 100%;
    color: #000;
    font-size: 28rpx;
    // text-align: center;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    margin-top: 6rpx;
    margin-bottom: 10rpx;
  }

  .gift-card__footer-wrap {
    position: relative;
    width: 288rpx;
    height: 60rpx;
    margin-top: 10rpx;
  }

  .gift-card__footer {
    display: flex;
    align-items: center;
    width: 288rpx;
    height: 60rpx;
    border-radius: 14rpx;
    background: #EBF6FF;
    box-sizing: border-box;
  }

  .gift-card__stars-wrap {
    display: flex;
    align-items: baseline;
    margin-left: 14rpx;
  }

  .gift-card__stars-num {
    font-size: 38rpx;
    font-weight: bold;
    color: #2B9DE7;
  }

  .gift-card__stars-txt {
    font-size: 24rpx;
    color: #2B9DE7;
    margin-left: 2rpx;
  }

  /* 状态图盖在 footer 右侧，不在容器内 */
  .gift-card__status-img {
    position: absolute;
    right: -2rpx;
    top: -27rpx;
    z-index: 1;
    width: 91rpx;
    height: 82rpx;
  }
}

</style>
