<template>
  <div class="x-pop" :style="{ zIndex }">
    <uni-popup ref="pop" type="center" :is-mask-click="false" :mask-background-color="maskColor">
      <view class="pop-content" :style="{ background: transparent ? '' : '#fff' }">
        <view v-if="title" class="pop-content-title">{{ title }}</view>
        <view class="pop-content-text" :style="{ paddingTop: !title ? '48rpx' : 0, textAlign: contentAlign }"> <slot /></view>
        <view v-if="footer" class="bottom">
          <view class="line" />
          <view class="btns">
            <view v-if="cancel" class="btn cancel" @click.stop="onCancel">{{ cancelText }}</view>
            <view class="btn">
              <x-btn v-if="!$slots.footer" type="default" :loading="loading" @click.stop="$emit('confirm')">
                {{ confirmText }}
              </x-btn>
              <slot v-else name="footer" />
            </view>
          </view>
        </view>
        <image
          v-if="showClose"
          src="https://udstatic.imeik.com/pcUploads/1699867879319/icon_guanbi%402x.png"
          style="position: absolute; bottom: -100rpx; left: 50%; width: 66rpx; height: 64rpx; transform: translateX(-50%)"
          @click.stop="show = false"
        />
      </view>
    </uni-popup>
  </div>
</template>

<script>
export default {
  props: {
    zIndex: {
      type: [String, Number],
      default: 1000
    },
    loading: Boolean,
    showClose: Boolean,
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
    title: String,
    contentAlign: {
      type: String,
      default: 'center'
    },
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
  position: fixed;
  .pop-content {
    position: relative;
    top: -60rpx;
    width: 622rpx;
    /* height: 304rpx; */
    border-radius: 40rpx;
    &-title {
      color: #323233;
      font-size: 36rpx;
      font-weight: 600;
      padding: 48rpx 0 32rpx;
      text-align: center;
    }
    &-text {
      padding: 48rpx;
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
