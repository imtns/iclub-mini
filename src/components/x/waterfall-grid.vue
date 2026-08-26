<template>
  <view class="waterfall-grid" :class="{ singleLineTitle }">
    <view class="waterfall-grid__col">
      <view v-for="(item, index) in leftList" :key="index" class="waterfall-grid__card" @click="handleClick(item)">
        <slot name="card" :item="item">
          <!-- 默认卡片样式，业务层可通过 slot 完全覆盖 -->
          <image v-if="item.contentType === '2'" class="waterfall-grid__play" src="https://udstatic.imeik.com/pcUploads/1705632630868/play-icon.png" />
          <view class="waterfall-grid__img-wrap">
            <x-img width="334rpx" height="442rpx" :src="item.coverImage" mode="aspectFill" />
          </view>
          <view class="waterfall-grid__body">
            <text class="waterfall-grid__title">{{ item.title }}</text>
          </view>
        </slot>
      </view>
    </view>

    <view class="waterfall-grid__col">
      <view v-for="(item, index) in rightList" :key="index" class="waterfall-grid__card" @click="handleClick(item)">
        <slot name="card" :item="item">
          <image v-if="item.contentType === '2'" class="waterfall-grid__play" src="https://udstatic.imeik.com/pcUploads/1705632630868/play-icon.png" />
          <view class="waterfall-grid__img-wrap">
            <x-img width="334rpx" height="442rpx" :src="item.coverImage" mode="aspectFill" />
          </view>
          <view class="waterfall-grid__body">
            <text class="waterfall-grid__title">{{ item.title }}</text>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'WaterfallGrid',
  props: {
    // 完整列表，组件内部自动分列，外部无需处理
    list: {
      type: Array,
      default: () => []
    },
    // 列数，默认 2，预留扩展
    columns: {
      type: Number,
      default: 2
    },
    singleLineTitle: Boolean
  },
  computed: {
    leftList() {
      return this.list.filter((_, i) => i % this.columns === 0)
    },
    rightList() {
      return this.list.filter((_, i) => i % this.columns === 1)
    }
  },
  methods: {
    handleClick(item) {
      console.log('🚀 ~ item:', item)
      // this.$emit('click', item)
      const url = '/pages-sub/detail/index?objectCode=' + item.objectCode + '&contentType=' + item.contentType
      this.go({ url })
    }
  }
}
</script>

<style lang="scss" scoped>
.waterfall-grid {
  display: flex;
  flex-direction: row;
  gap: 22rpx;
  align-items: flex-start;
  padding: 0 32rpx 32rpx;

  &.singleLineTitle {
    .waterfall-grid__body {
      align-items: center;
      justify-content: center;
      height: auto;
      height: 88rpx;
    }
    .waterfall-grid__title {
      display: block;
      font-weight: 500;
      font-size: 28rpx;
      line-height: 28rpx;
      @include text-overflow;
    }
  }
  &__col {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24rpx;
    width: 0;
    min-width: 0;
  }

  &__card {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: #fff;
    border-radius: 12rpx;
    box-shadow: 0rpx 8rpx 20rpx 6rpx rgba(0, 0, 0, 8%);
  }

  &__play {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    z-index: 99;
    width: 36rpx;
    height: 36rpx;
  }

  &__img-wrap {
    position: relative;
    width: 100%;
    height: 442rpx;
    overflow: hidden;
    border-radius: 12rpx 12rpx 0 0;
  }

  &__body {
    display: flex;
    align-items: flex-start;
    height: 108rpx;
    padding: 20rpx 24rpx;
  }

  &__title {
    display: -webkit-box;
    max-height: 68rpx;
    overflow: hidden;
    color: #232323;
    font-size: 26rpx;
    line-height: 34rpx;
    word-break: break-all;
    @include multi-overflow(2);
  }
}
</style>
