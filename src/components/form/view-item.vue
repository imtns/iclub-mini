<template>
  <view class="form-view-item">
    <text @longpress="onLongPressed(getLabel(model, field))">{{ getLabel(model, field) }}</text>
  </view>
</template>

<script>
import { getShowLabel } from './util'
export default {
  name: 'view-item',
  props: {
    // 配置项
    field: {
      type: Object,
      default: () => {}
    },
    // 绑定的model
    model: {
      type: Object,
      default: () => {}
    },
    // 自身的格式化详情方法
    formatValue: {
      type: Function,
      default: null
    }
  },
  methods: {
    // 获取展示的值
    getLabel() {
      // 优先展示组件自己的格式化方法格式化出来的值
      return this.formatValue ? this.formatValue(this.model, this.field) : getShowLabel(this.model, this.field)
    },

    onLongPressed(text) {
      console.log(text)
      uni.setClipboardData({
        data: text,
        success: (res) => {
          uni.vibrateShort({})
          this.$refs.toast.show({
            message: '内容已复制'
          })
          //   uni.showToast({
          //     title: '内容已复制',
          //     icon: 'none',
          //     duration: 1000,
          //     mask: false
          //   })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-view-item {
  min-height: 36rpx;
  word-break: break-all;
}
</style>
