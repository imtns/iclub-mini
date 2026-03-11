<template>
  <view class="brand-swiper">
    <swiper
      class="swiper"
      :current="innerCurrent"
      :previous-margin="swiperMargin"
      :next-margin="swiperMargin"
      circular
      @change="onSwiperChange"
    >
      <swiper-item v-for="(card, idx) in safeCards" :key="idx">
        <view class="swiper-item-inner">
            <view class="card-container">
              <view :class="['card-wrap', getCardClass(idx), { 'card-wrap--gray': isZeroTimes(card) }]">
              <image
                v-if="getBorderImage(card)"
                class="card-border"
                :src="getBorderImage(card)"
                mode="aspectFill"
              />
              <image
                :class="['card-img', { 'card-img--gray': isZeroTimes(card) }]"
                :src="getCardImage(card)"
                mode="aspectFill"
              />                            
            </view>
            <!-- 阴影图：跟随卡片平移，但不旋转 -->
            <image
              :class="['card-shadow', getShadowClass(idx)]"
              :src="getStaticImage('card-shadow.png')"
              mode="widthFix"
            />
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getStaticImage } from '../utils/staticAssets'

export default {
  name: 'BrandSwiper',
  props: {
    cards: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      innerCurrent: this.current,
      swiperMargin: '142rpx',
      // 不同次数对应的边框图片，后续可按需替换
      borderImgMap: {
        1: getStaticImage('card-border-1.png'),
        3: getStaticImage('card-border-3.png'),
        5: getStaticImage('card-border-5.png')
      }
    }
  },
  watch: {
    current(val) {
      this.innerCurrent = val
    }
  },
  computed: {
    safeCards() {
      if (Array.isArray(this.cards)) {
        return this.cards
      }
      return []
    }
  },
  methods: {
    getStaticImage,
    getCardImage(card) {
      // 优先根据 cardCode 从 315-scan/cards/ 目录取本地图
      if (card && card.cardCode) {
        return this.getStaticImage(`cards/${card.cardCode}.png`)
      }
      // 兜底：兼容历史字段
      return (card && (card.imgUrl || card.cardImageUrl)) || ''
    },
    getCardClass(idx) {
      const diff = idx - this.innerCurrent
      if (diff === 0) return 'card-active'
      if (diff === -1 || (diff === this.safeCards.length - 1 && this.safeCards.length > 1)) return 'card-prev'
      if (diff === 1 || (diff === -(this.safeCards.length - 1) && this.safeCards.length > 1)) return 'card-next'
      return 'card-far'
    },
    // 获取当前卡片的次数（支持多个字段兜底）
    getCardTimes(card) {
      if (!card) return 0
      const raw = card.scanTimes != null ? card.scanTimes : card.lightTimes
      const num = Number(raw)
      return Number.isNaN(num) ? 0 : num
    },
    isZeroTimes(card) {
      return this.getCardTimes(card) === 0
    },
    // 根据次数返回对应的边框图片，仅对 1 / 3 / 5 次生效
    getBorderImage(card) {
      const times = this.getCardTimes(card)
      // 0 ~ 2 次：使用 1 次边框
      if (times >= 0 && times <= 2) {
        return this.borderImgMap[1]
      }
      // 3 ~ 4 次：使用 3 次边框
      if (times >= 3 && times <= 4) {
        return this.borderImgMap[3]
      }
      // ≥ 5 次：使用 5 次边框
      if (times >= 5) {
        return this.borderImgMap[5]
      }
      return ''
    },
    // 阴影只做 scale/opacity，不旋转
    getShadowClass(idx) {
      const diff = idx - this.innerCurrent
      if (diff === 0) return 'shadow-active'
      if (diff === -1 || (diff === this.safeCards.length - 1 && this.safeCards.length > 1)) return 'shadow-prev'
      if (diff === 1 || (diff === -(this.safeCards.length - 1) && this.safeCards.length > 1)) return 'shadow-next'
      return 'shadow-far'
    },
    onSwiperChange(e) {
      this.innerCurrent = e.detail.current
      this.$emit('change', e.detail.current)
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-swiper {
  width: 100%;
  overflow-x: hidden;
}

.swiper {
  width: 100%;
  /* 卡片 614 + 间距 10 + 阴影约 50 + 旋转余量 */
  height: 700rpx;
  overflow: hidden;
}

/* 必须用内部 view 套 flex，直接对 swiper-item 标签设 flex 在微信小程序中不生效 */
.swiper-item-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-container {
  width: 474rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-wrap {
  position: relative;
  width: 474rpx;
  height: 632rpx;
  overflow: hidden;
  transition: transform 0.3s ease;

  &.card-active {
    transform: rotate(0deg) scale(1);
    opacity: 1;
    z-index: 2;
  }

  &.card-prev {
    transform: translateY(13rpx) rotate(-2.8deg) scale(1);
    opacity: 1;
    z-index: 1;
  }

  &.card-next {
    transform: translateY(13rpx) rotate(2.8deg) scale(1);
    opacity: 1;
    z-index: 1;
  }

  &.card-far {
    transform: rotate(-2.8deg) scale(1);
    opacity: 0.5;
    z-index: 0;
  }
}

.card-wrap--gray {
  filter: grayscale(100%);
}

.card-img {
  position: absolute;
  width: 361rpx;
  height: 505rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card-img--gray {
  filter: grayscale(100%);
}

.card-border {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 474rpx;
  height: 632rpx;
  pointer-events: none;
}

.card-shadow {
  width: 400rpx;
  height: 19rpx;
  margin-top: 10rpx;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &.shadow-active {
    transform: scale(1);
    opacity: 1;
  }

  &.shadow-prev,
  &.shadow-next {
    transform: scale(1);
    opacity: 1;
  }

  &.shadow-far {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
