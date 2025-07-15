<template>
  <uni-popup ref="popup" :is-mask-click="isMaskClick" :type="type" background-color="#fff">
    <div class="x-popup">
      <view class="header" :class="{ confirm: headerConfirm }">
        <template v-if="headerConfirm">
          <text style="color: rgba(150, 151, 153, 100%); font-weight: normal" @click="show = false">取消</text>
          <text>{{ title }}</text>
          <text style="color: rgba(87, 107, 149, 100%); font-weight: normal" @click="show = false && $emit('confirm')">确认</text>
        </template>
        <template v-else>
          <text>{{ title }}</text>
          <text class="iplus icon-close" @click="show = false" />
        </template>
      </view>
      <view class="content"><slot /></view>
      <template v-if="$slots.footer">
        <view class="footer"><slot name="footer" /></view>
      </template>
    </div>
  </uni-popup>
</template>

<script>
export default {
  props: {
    headerConfirm: Boolean,
    title: {
      type: String,
      default: ''
    },
    value: Boolean,
    isMaskClick: Boolean,
    type: {
      type: String,
      default: 'bottom'
    }
  },
  data() {
    return {}
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    show(value) {
      this.$refs.popup[value ? 'open' : 'close']()
    }
  },
  mounted() {},
  created() {}
}
</script>
<style lang="scss" scoped>
.x-popup {
  position: relative;
  padding: 0 32rpx 50rpx;
  .header {
    position: relative;
    justify-content: space-between;
    height: 104rpx;
    color: #29323d;
    font-weight: 500;
    font-size: 32rpx;
    &.confirm {
      height: 96rpx;
    }
    @include flex-center-y;
    &:not(.confirm)::after {
      bottom: 0;
      width: 750rpx;
      height: 2rpx;
      background-color: rgba(151, 151, 151, 16%);
      content: '';
      @include position-center-x;
    }
    .icon-close {
      padding: 5rpx;
      color: #929694;
      font-size: 32rpx;
    }
  }
  .footer {
    width: 100%;
    margin-top: 46rpx;
    @include flex-center-y;
  }
}
</style>
