<template>
  <div class="x-loading">
    <div class="la-ball-spin">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- <image src="https://imeik-ibt.oss-cn-beijing.aliyuncs.com/iplus/img/loading.gif" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {}
}
</script>
<style lang="scss" scoped>
.x-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150rpx;
  height: 150rpx;
  padding: 16px;
  background: rgba(0, 0, 0, 60%);
  border-radius: 12px;
  transform: translate(-50%, -50%);
  transform: translate3d(-50%, -50%, 0);
  image {
    width: 100%;
    height: 100%;
  }
  .la-ball-spin,
  .la-ball-spin > div {
    position: relative;
    box-sizing: border-box;
  }
  .la-ball-spin {
    display: block;
    color: #fff;
    font-size: 0;
  }
  .la-ball-spin.la-dark {
    color: #333;
  }
  .la-ball-spin > div {
    display: inline-block;
    float: none;
    background-color: currentcolor;
    border: 0 solid currentcolor;
  }
  .la-ball-spin {
    width: 32px;
    height: 32px;
  }
  .la-ball-spin > div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    border-radius: 100%;
    animation: ball-spin 1s infinite ease-in-out;
  }
  .la-ball-spin > div:nth-child(1) {
    top: 5%;
    left: 50%;
    animation-delay: -1.125s;
  }
  .la-ball-spin > div:nth-child(2) {
    top: 18%;
    left: 81%;
    animation-delay: -1.25s;
  }
  .la-ball-spin > div:nth-child(3) {
    top: 50%;
    left: 95%;
    animation-delay: -1.375s;
  }
  .la-ball-spin > div:nth-child(4) {
    top: 81%;
    left: 81%;
    animation-delay: -1.5s;
  }
  .la-ball-spin > div:nth-child(5) {
    top: 94%;
    left: 50%;
    animation-delay: -1.625s;
  }
  .la-ball-spin > div:nth-child(6) {
    top: 81%;
    left: 18%;
    animation-delay: -1.75s;
  }
  .la-ball-spin > div:nth-child(7) {
    top: 49%;
    left: 5%;
    animation-delay: -1.875s;
  }
  .la-ball-spin > div:nth-child(8) {
    top: 18%;
    left: 18%;
    animation-delay: -2s;
  }
  .la-ball-spin.la-sm {
    width: 16px;
    height: 16px;
  }
  .la-ball-spin.la-sm > div {
    width: 4px;
    height: 4px;
    margin-top: -2px;
    margin-left: -2px;
  }
  .la-ball-spin.la-2x {
    width: 64px;
    height: 64px;
  }
  .la-ball-spin.la-2x > div {
    width: 16px;
    height: 16px;
    margin-top: -8px;
    margin-left: -8px;
  }
  .la-ball-spin.la-3x {
    width: 96px;
    height: 96px;
  }
  .la-ball-spin.la-3x > div {
    width: 24px;
    height: 24px;
    margin-top: -12px;
    margin-left: -12px;
  }
  /*
       * Animation
       */
  @keyframes ball-spin {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    80% {
      transform: scale(0);
      opacity: 0;
    }
  }
  @keyframes ball-spin {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    80% {
      transform: scale(0);
      opacity: 0;
    }
  }
  @keyframes ball-spin {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    80% {
      transform: scale(0);
      opacity: 0;
    }
  }
  @keyframes ball-spin {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    80% {
      transform: scale(0);
      opacity: 0;
    }
  }
}
</style>
