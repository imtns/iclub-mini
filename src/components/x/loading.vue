<template>
  <view class="iclub-mask" :style="{ position }">
    <view class="iclub-loader" :style="{ top }">
      <view class="letter-wrapper">
        <view v-for="(char, index) in letters" :key="index" class="char-box" :style="{ '--delay': index * 0.1 + 's' }">
          <text class="char">{{ char }}</text>
        </view>
      </view>

      <text class="loading-text">{{ text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    top: {
      type: String,
      default: '44%'
    },
    position: {
      type: String,
      default: 'fixed'
    },
    text: {
      type: String,
      default: '正在加载...'
    }
  },
  data() {
    return {
      // 英文小写'i'配合大写，更有设计感
      letters: ['I', 'C', 'L', 'U', 'B']
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.iclub-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  // 磨砂玻璃遮罩
  /* background-color: rgba(255, 255, 255, 40%);
  backdrop-filter: blur(6px); */
}

.iclub-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 190rpx;
  height: 190rpx;
  background: #fff;
  border-radius: 40rpx;
  // 柔和的卡片阴影
  box-shadow: 0 24rpx 70rpx rgba(0, 18, 38, 10%);
  @include position-center;
}

.letter-wrapper {
  display: flex;
  align-items: flex-end;
  height: 60rpx; // 留出足够的跳跃高度
  margin-bottom: 24rpx;
}

.char-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 4rpx;
}

.char {
  /* ──────────────────────────────────────────────────
     核心样式：实现图片中 Hollow（无填充、描边）的效果
     ────────────────────────────────────────────────── */
  color: transparent; // 文字本身设为透明
  font-weight: 600; // 使用较粗的字体，描边效果更好看
  font-size: 34rpx;
  // Arial Black 或 Impact 这种粗体非常适合做描边
  font-family: iclub-loading;
  text-transform: uppercase;
  opacity: 0.5; // 稍微降低整体不透明度，让描边更柔和

  /* 物理跳跃动画 + 描边发光 */
  animation: bounce-glow 1.2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
  animation-delay: var(--delay);

  // 使用 -webkit-text-stroke 实现精确的描边控制
  // 注意：在 uni-app 小程序端，描边粗细建议使用 rpx 以适配不同屏幕
  // 如果必须用 0.5px，请确保父元素没有缩放
  -webkit-text-stroke: 0.5rpx #001226; // 颜色使用你指定的 #001226
}

// 物理投影，随跳动缩放
/* .char-shadow {
  width: 20rpx;
  height: 5rpx;
  margin-top: -8rpx;
  background: rgba(0, 18, 38, 20%); // 使用 #001226 的半透明
  border-radius: 50%;
  filter: blur(2rpx);
  animation: shadow-pulse 0.6s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
  animation-delay: var(--delay);
} */

.loading-text {
  // 底部文字使用 #001226，保持视觉统一
  color: #333;
  font-size: 22rpx;
  opacity: 0.8;
}

// ── 动画定义 ──

@keyframes bounce-glow {
  0%,
  100% {
    transform: translateY(0); // 落地挤压
  }
  50% {
    transform: translateY(-22rpx); // 弹起拉伸
  }
}

@keyframes shadow-pulse {
  0%,
  100% {
    transform: scale(1.5); // 落地，影子变大
    opacity: 0.2;
  }
  50% {
    transform: scale(0.6); // 跳起，影子变小
    opacity: 0.05;
  }
}
</style>
