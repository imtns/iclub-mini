<template>
  <view class="x-checkbox" @click.prevent.stop="$emit('click')">
    <image v-if="!value" src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1695190447815/icon_xuanze%402x.png" />
    <image v-else src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1695190529419/icon_xuanze%402x%20(1).png" />
    <view v-if="$slots.default" class="text">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {}
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.x-checkbox {
  position: relative;
  flex-shrink: 0;
  @include flex-center-y;
  > image {
    width: 32rpx;
    height: 32rpx;
  }
  .text {
    margin-left: 12rpx;
    color: rgba(142, 146, 150, 100%);
    font-size: 26rpx;
  }
}
</style>
