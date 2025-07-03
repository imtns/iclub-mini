<template>
  <div v-if="loading" class="spinner-box">
    <div class="spinner-inner">
      <div class="la-ball-beat">
        <div :style="{ backgroundColor: color }" />
        <div :style="{ backgroundColor: color }" />
        <div :style="{ backgroundColor: color }" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spin',
  props: {
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
  top: 44%;
  left: 50%;
  display: flex;
  align-items: center;
  width: 200rpx;
  height: 200rpx;
  min-height: 50px;
  /* background: white; */
  border-radius: 16rpx;
  transform: translate(-50%, -50%);
  @keyframes ball-beat {
    50% {
      transform: scale(0.75);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  > .spinner-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 30px;
    margin-top: -15px;
    margin-left: -40px;

    > .la-ball-beat {
      position: relative;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      width: 80px;
      height: 30px;
      color: rgba(48, 134, 238, 100%);
      font-size: 0;

      > div {
        position: relative;
        display: inline-block;
        float: none;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        margin: 5px;
        border: none;
        border-radius: 50%;
        animation: ball-beat 0.8s -0.15s infinite linear;

        &:nth-child(2n-1) {
          animation-delay: -0.5s;
        }
      }

      &.la-sm {
        width: 26px;
        height: 8px;

        > div {
          width: 8px;
          height: 8px;
          margin: 3px;
        }
      }

      &.la-2x {
        width: 108px;
        height: 36px;

        > div {
          width: 20px;
          height: 20px;
          margin: 8px;
        }
      }

      &.la-3x {
        width: 162px;
        height: 54px;

        > div {
          width: 30px;
          height: 30px;
          margin: 12px;
        }
      }
    }
  }
}
</style>
