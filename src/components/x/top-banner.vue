<template>
  <div class="container">
    <image :src="src" mode="widthFix" :style="{ width }" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '690rpx'
    }
  },
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
.container {
  position: relative;
  padding: 0 30rpx;

  image {
    display: block;
  }
}
</style>
