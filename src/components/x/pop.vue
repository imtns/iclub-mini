<template>
  <div class="x-pop">
    <uni-popup ref="pop" type="center" :is-mask-click="false" :mask-background-color="maskColor">
      <view class="pop-content" :style="{ background: transparent ? '' : '#fff' }">
        <view class="pop-content-text"> <slot /></view>
        <view v-if="footer" class="bottom">
          <view class="line" />
          <view class="btns">
            <view v-if="cancel" class="btn cancel" @click="onCancel">{{ cancelText }}</view>
            <view class="btn">
              <x-btn v-if="!$slots.footer" type="default" :loading="loading" @click="$emit('confirm')">
                {{ confirmText }}
              </x-btn>
              <slot v-else name="footer" />
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    footer: {
      type: Boolean,
      default: true
    },
    transparent: Boolean,
    maskColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.5)'
    },
    cancel: Boolean,
    value: Boolean,
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
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
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.$refs.pop.open()
      } else {
        this.$refs.pop.close()
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    onCancel() {
      this.show = false
      this.$emit('cancel')
    }
  }
}
</script>
<style>
.x-pop button {
  width: 100% !important;
  padding: 0;
  font-size: 32rpx !important;
  border-radius: 0 0 40rpx 40rpx !important;
}
</style>
<style lang="scss" scoped>
.x-pop {
  position: relative;
  .pop-content {
    position: relative;
    top: -60rpx;
    width: 622rpx;
    /* height: 304rpx; */
    border-radius: 40rpx;
    &-text {
      padding: 48rpx 44rpx;
      color: #323233;
      font-size: 32rpx;
      text-align: center;
    }
    .btns {
      @include flex-center;
      @include border-top(#ebedf0);

      position: relative;
      border-radius: 40rpx;
      .btn {
        position: relative;
        flex: 1;
        height: 96rpx;
        color: #366bd5;
        font-weight: 400;
        font-size: 32rpx;
        > x-btn {
          width: 100%;
        }
        &.cancel {
          color: #333;
          @include border-right(#ebedf0);
        }
        @include flex-center;
      }
    }
  }
}
</style>
