<!-- eslint-disable max-len -->
<template>
  <div v-if="loading" class="spinner-box" :style="spinnerStyle">
    <image src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1706597031910/star.png" class="star" />
    <div class="ship-box">
      <image
        src="data:image/png;base64,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"
        class="ship"
      />
      <image
        src="data:image/png;base64,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"
        class="light"
      />
    </div>
    <div class="text" :style="{ color: textColor }">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'Spin',
  props: {
    textColor: {
      type: String,
      default: '#7d7d7d'
    },
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#2877ff'
    },
    height: {
      type: String,
      default: '10px'
    },
    width: {
      type: String,
      default: '10px'
    },
    margin: {
      type: String,
      default: '5px'
    },
    text: {
      type: String,
      default: '加载中...'
    }
  },
  data() {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.height,
        width: this.width,
        margin: this.margin
      }
    }
  }
}
</script>

<style lang="scss">
.spinner-box {
  position: absolute;
  top: 45%;
  left: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 132rpx;
  height: 132rpx;
  min-height: 50px;
  /* background: white; */
  transform: translate(-50%, -50%);

  .star {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    width: 14rpx;
    height: 14rpx;
    animation: shining 1s linear infinite;
    @keyframes shining {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(0.75);
        opacity: 0.5;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
  .ship-box {
    @include flex-center-y;

    flex-direction: column;
    animation: shift 1s linear infinite;
    @keyframes shift {
      0% {
        transform: rotate(0deg) translateY(0rpx);
      }
      25% {
        transform: rotate(6deg) translateY(5rpx);
      }
      50% {
        transform: rotate(0deg) translateY(10rpx);
      }
      75% {
        transform: rotate(-6deg) translateY(5rpx);
      }
      100% {
        transform: rotate(0deg) translateY(0);
      }
    }
    .ship {
      position: relative;
      z-index: 2;
      width: 132rpx;
      height: 81rpx;
    }
    .light {
      position: relative;
      top: -12rpx;
      left: -4rpx;
      z-index: 1;
      width: 75rpx;
      height: 41rpx;
    }
  }
  .text {
    width: 132rpx;
    font-size: 24rpx;
    text-align: center;
  }
}
</style>
