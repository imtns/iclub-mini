<template>
  <view class="search-bar-wrap" :class="{ 'search-bar-wrap--sticky': sticky }">
    <view class="search-bar">
      <view class="search-icon">
        <image src="https://udstatic.imeik.com/compressed/1773908066000_search%402x.png" mode="aspectFit" class="search-icon-img" />
      </view>
      <input class="search-input" :value="value" :placeholder="placeholder" placeholder-style="color:#8E9296;font-size:28rpx;" confirm-type="search" @input="onInput" @confirm="onConfirm" />
      <view v-if="value && showClear" class="clear" @touchstart.stop="onClear">
        <uni-icons type="clear" color="#c0c4cc" size="22" />
      </view>
      <button class="search-btn" @tap="onSearch">搜索</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'XSearchBar',
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '请输入要搜索的关键词' },
    sticky: { type: Boolean, default: false }, // 吸顶模式
    showClear: { type: Boolean, default: false } // 是否显示清除按钮
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.detail.value)
    },
    onConfirm() {
      this.$emit('search', this.value)
    },
    onSearch() {
      uni.hideKeyboard()
      this.$emit('search', this.value)
    },
    onClear() {
      this.$emit('input', '')
      this.$emit('clear')
      this.$emit('search', '')
    }
  }
}
</script>

<style scoped lang="scss">
.search-bar-wrap {
  box-sizing: border-box;
  width: 750rpx;
  padding: 20rpx 32rpx;
  background: transparent;

  &--sticky {
    position: fixed;
    top: var(--status-bar-height);
    left: 0;
    z-index: 100;
    padding-top: 16rpx;
    padding-bottom: 16rpx;
    background: #f5f5f5;
  }
}

.search-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 72rpx;
  overflow: hidden;
  background: #fff;
  border-radius: 36rpx;
}

.search-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-left: 24rpx;
}

.search-icon-img {
  position: relative;
  top: -2rpx;
  width: 40rpx;
  height: 40rpx;
}

.search-input {
  position: relative;
  top: -1px;
  flex: 1;
  height: 70rpx;
  margin-left: 4rpx;
  padding-right: 20rpx;
  color: #333;
  font-size: 28rpx;
  background: transparent;
}

.clear {
  position: absolute;
  top: 50%;
  right: 120rpx;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
}

.search-btn {
  position: relative;
  right: 6rpx;
  flex-shrink: 0;
  width: 104rpx;
  height: 60rpx;
  padding: 0;
  color: #fff;
  font-size: 28rpx;
  line-height: 60rpx;
  text-align: center;
  background: #366bd5;
  border-radius: 36rpx;

  &::after {
    border: none;
  }
}
</style>
