<!-- eslint-disable max-len -->
<template>
  <view class="u-toast">
    <x-overlay :show="isShow">
      <view class="u-toast__content"
        :class="['u-type-' + tmpConfig.type, tmpConfig.type === 'loading' || tmpConfig.loading ? 'u-toast__content--loading' : '', tmpConfig.type !== '' ? 't' : '']">
        <image v-if="tmpConfig.type === 'success'"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMA+xAOUszKxsjWVDb4BohDCeWcXhnx6uDSu6lqSx6Pint3PiknF9f12iYAAADUSURBVEjH7dLZDoIwEIVhKiCyln1R3HXe/xENQpyE0tRzS/jvv0zSHmtrjfVNJlFzF0TRCyLpkYYCxJzdr3FTwDzq0ewAc4pgE+cEm7eHm7DBTRHh5kqw2XWT2f9vnj5u+go3N8EGGKjOlKVmoK3eFEIk6YKRtd6Ew8/5oTpQoRhufFKRxMpA2ShlNDQ7Vno/c7AtNUcQzY+F2bLhgknxsSJSjEbxsQvNjEGR78jOZFhxRsMKNPyGqkGVx8agAMMKMKwQw4oNoNggajRYsq1y29paRx+yIDjkDRHLHwAAAABJRU5ErkJggg==" />
        <image v-if="tmpConfig.type === 'warning'"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMA6Rr2zrz88MexppqJcVg+BOTe2NPCtquglI6DfnhgQy4pIxMKZ1BLNOBsApkAAADZSURBVEjH5dZHFoIwFEZhgoVmV3oVsbD/DXr4s4LLYaR3/k2SnPfi/E/rcco8ENqOqkNoZdEdIc+iHiFjkYvQeQ66WMRO72rRgNDNohO8XOWgfJktQ7HQiqGNkMdQImQYCoTODKVCF4ZCoStDmdCNoUhozVAu5DNUCMUM7YQ2DJVCCUOVUMBQLZQytBcK56CMoadQxFAjlDN0ECrmoB1DL6GSobdQxVArVDN0FNoz5Jpp7B2d3+rTtCdIhmAaRu4CM4Jsd/754PvJsKPovGl7HhxWH/nhsq/oC02OKNkGjJ8UAAAAAElFTkSuQmCC" />
        <text class="u-toast__content__text" :class="['u-toast__content__text--' + tmpConfig.type]">{{ tmpConfig.message
          }}</text>
      </view>
    </x-overlay>
  </view>
</template>

<script>
export default {
  name: 'x-toast',
  data () {
    return {
      isShow: false,
      timer: null, // 定时器
      config: {
        message: '', // 显示文本
        type: '', // 主题类型，primary，success，error，warning，black
        duration: 2000, // 显示的时间，毫秒
        position: 'center', // toast出现的位置
        complete: null, // 执行完后的回调函数
        overlay: false, // 是否防止触摸穿透
        loading: false // 是否加载中状态
      },
      tmpConfig: {} // 将用户配置和内置配置合并后的临时配置变量
    }
  },
  computed: {
    overlayStyle () {
      const style = {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }
      // 将遮罩设置为100%透明度，避免出现灰色背景
      style.backgroundColor = 'rgba(0, 0, 0, 0)'
      return style
    }
  },
  onShow () {
    console.error('toast-show')
  },
  created () {
    // 通过主题的形式调用toast，批量生成方法函数
    ;['primary', 'success', 'error', 'warning', 'default', 'loading'].forEach((item) => {
      this[item] = (message) =>
        this.show({
          type: item,
          message
        })
    })
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    // 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
    show (options) {
      // 不将结果合并到this.config变量，避免多次调用u-toast，前后的配置造成混乱
      this.tmpConfig = Object.assign(this.config, options)
      //   console.log('this.tmpConfig', this.tmpConfig)
      // 清除定时器
      this.clearTimer()
      this.isShow = true
      this.timer = setTimeout(() => {
        // 倒计时结束，清除定时器，隐藏toast组件
        this.clearTimer()
        // 判断是否存在callback方法，如果存在就执行
        typeof this.tmpConfig.complete === 'function' && this.tmpConfig.complete()
      }, this.tmpConfig.duration)
    },
    // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
    hide () {
      this.clearTimer()
    },
    clearTimer () {
      this.isShow = false
      // 清除定时器
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
</script>

<style lang="scss" scoped>
/* @import '../../libs/css/components.scss'; */

$u-toast-color: #fff;
$u-toast-border-radius: 16px;
$u-toast-border-background-color: rgba(0, 0, 0, 80%);
$u-toast-border-font-size: 14px;
$u-toast-border-padding: 10px 12px;
$u-toast-loading-border-padding: 20px 20px;
$u-toast-content-text-color: #fff;
$u-toast-content-text-font-size: 14px;
$u-toast-u-icon: 10rpx;
$u-toast-u-type-primary-color: #0974ee;
$u-toast-u-type-primary-background-color: #0974ee;
$u-toast-u-type-primary-border-color: rgb(215, 234, 254);
$u-toast-u-type-primary-border-width: 1px;
$u-toast-u-type-success-color: #03c33d;
$u-toast-u-type-success-background-color: #dbf1e1;
$u-toast-u-type-success-border-color: #bef5c8;
$u-toast-u-type-success-border-width: 1px;
$u-toast-u-type-error-color: red;
$u-toast-u-type-error-background-color: #fef0f0;
$u-toast-u-type-error-border-color: #fde2e2;
$u-toast-u-type-error-border-width: 1px;
$u-toast-u-type-warning-color: #faad14;
$u-toast-u-type-warning-background-color: #fdf6ec;
$u-toast-u-type-warning-border-color: #faecd8;
$u-toast-u-type-warning-border-width: 1px;
$u-toast-u-type-default-color: #fff;
$u-toast-u-type-default-background-color: #585858;

.u-toast {
  position: fixed;
  z-index: 99999;

  &__content {
    @include flex-center;

    &.t {
      display: flex;
      flex-direction: column;
      width: 216rpx;
      height: 216rpx;
      font-size: 25rpx !important;
      background: rgba(0, 0, 0, 70%);
      border-radius: 20rpx;

      image {
        width: 52rpx;
        height: 52rpx;
        margin-bottom: 22rpx;
      }
    }

    position: relative;
    align-items: center;
    min-width: 230rpx;
    max-width: 490rpx;
    padding: $u-toast-border-padding;
    color: $u-toast-color;
    text-align: center;
    background-color: $u-toast-border-background-color;
    border-radius: $u-toast-border-radius;

    &--loading {
      flex-direction: column;
      padding: $u-toast-loading-border-padding;
    }

    &__text {
      color: $u-toast-content-text-color;
      font-size: $u-toast-content-text-font-size;
      line-height: 20px;

      &--default {
        color: $u-toast-content-text-color;
      }

      /* &--error {
        color: red;
      }

      &--primary {
        color: #0974ee;
      }

      &--success {
        color: #03c33d;
      }

      &--warning {
        color: #faad14;
      } */
    }
  }
}

.u-type-primary {
  color: $u-toast-u-type-primary-color;
  background-color: $u-toast-u-type-primary-background-color;
  border-color: $u-toast-u-type-primary-border-color;
  border-width: $u-toast-u-type-primary-border-width;
}

.u-type-success {
  color: $u-toast-u-type-success-color;
  background-color: $u-toast-u-type-success-background-color;
  border-color: $u-toast-u-type-success-border-color;
  border-width: 1px;
}

.u-type-error {
  color: $u-toast-u-type-error-color;
  background-color: $u-toast-u-type-error-background-color;
  border-color: $u-toast-u-type-error-border-color;
  border-width: $u-toast-u-type-error-border-width;
}

.u-type-warning {
  color: $u-toast-u-type-warning-color;
  background-color: $u-toast-u-type-warning-background-color;
  border-color: $u-toast-u-type-warning-border-color;
  border-width: 1px;
}

.u-type-default {
  color: $u-toast-u-type-default-color;
  background-color: $u-toast-u-type-default-background-color;
}
</style>
