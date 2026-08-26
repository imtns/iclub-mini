<template>
  <div class="x-loading">
    <image src="https://udstatic.imeik.com/compressed/1781150032707_loading.png" />
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
  border-radius: 12px;
  transform: translate(-50%, -50%);
  transform: translate3d(-50%, -50%, 0);
  image {
    width: 60rpx;
    height: 60rpx;
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
