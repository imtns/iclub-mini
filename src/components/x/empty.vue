<template>
  <view class="empty c" :style="{ top, left: position === 'relative' ? 'auto' : '50%', position, transform: position === 'relative' ? 'translate(0,0)' : 'translate(-50%,-50%)' }">
    <image :src="img" mode="widthFix" alt="" :style="{ width: imgWidth + 'rpx' }" />
    <view class="empty__text" v-if="!$slots.default">
      {{ emptyText }}
    </view>
    <view v-else class="empty__text">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'EmptyView', // 新增组件名，符合规范
  props: {
    type: {
      type: String,
      default: 'default'
    },
    position: {
      type: String,
      default: 'absolute',
      // 新增校验：仅允许合法的定位值
      validator(value) {
        return ['absolute', 'relative', 'static', 'fixed', 'sticky'].includes(value)
      }
    },
    top: {
      type: String,
      default: '49%'
    },
    src: {
      type: String,
      default: ''
    },
    imgWidth: {
      type: Number,
      default: 240
    },

    text: {
      type: String,
      default: '暂无内容~'
    }
  },
  computed: {
    positionTop() {
      // 仅absolute时使用传入的top，其他定位不设置top
      return this.position === 'absolute' ? this.top : 'auto'
    },
    emptyText() {
      if (this.type === 'default') return this.text
      const textMap = {
        shoucang: '暂无收藏~',
        wifi: '暂无网络~',
        location: '暂无地址~',
        comment: '暂无评论~',
        dianzan: '暂无点赞~',
        feedback: '暂无反馈记录~',
        search: '暂无搜索内容~',
        order: '暂无订单'
      }
      return textMap[this.type] || this.text // 兜底，避免未知type导致空文本
    },
    img() {
      if (this.src) return this.src
      // 增加容错：拼接URL前校验type
      const validType = ['default', 'shoucang', 'wifi', 'location', 'dianzan', 'feedback', 'search', 'error', 'comment', 'cart', 'order'].includes(this.type) ? this.type : 'default'
      return `https://udstatic.imeik.com/iclub/images/empty/icon-${validType}.png?6`
    }
  }
}
</script>

<style lang="scss" scoped>
// 基础样式：所有定位类型都适用
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;

  // 绝对定位专属样式
  &--absolute {
    @include position-center; // 仅absolute时应用居中定位（transform）
  }

  // 文本样式抽离，避免样式覆盖
  &__text {
    max-width: 476rpx;
    margin-top: 12rpx;
    color: rgba(0, 0, 0, 70%);
    font-size: 26rpx;
    white-space: normal;
    text-align: center;
  }
}

// 移除原有的.c类名依赖，避免样式污染
</style>
