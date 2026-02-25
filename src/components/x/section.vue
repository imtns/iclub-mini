<template>
  <div class="x-section" :style="{ marginTop: $slots.title ? '0' : '24rpx' }">
    <slot name="title" />
    <view v-if="$slots.form">
      <slot name="form" />
    </view>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {}
}
</script>
<style lang="scss" scoped>
.x-section {
  position: relative;
  float: left;
  width: 100%;
}
</style>
