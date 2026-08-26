<template>
  <view class="pin-actions-container">
    <uni-popup ref="pinPopup" :z-index="999999" type="bottom" :mask-click="true" :safe-area="false" @maskClick="handleMaskClick" background-color="transparent">
      <view class="action-sheet">
        <!-- 置顶按钮 -->
        <view class="action-item" @click="handlePin">
          <image class="action-icon" style="top: -1px" src="https://udstatic.imeik.com/compressed/1779433657322_icon_pinglun%20%403x.png" mode="aspectFit" />
          <text class="action-text">{{ isPinned ? '取消置顶' : '置顶' }}</text>
        </view>

        <!-- 取消按钮 -->
        <view class="action-item action-item--cancel" @click="handleCancel">
          <image class="action-icon" src="https://udstatic.imeik.com/pcUploads/1784002140906/close.png" mode="aspectFit" />
          <text class="action-text">取消</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: 'pinActions',
  props: {
    // 是否已置顶
    isPinned: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentData: null
    }
  },
  methods: {
    // 打开弹层
    open(data) {
      this.currentData = data
      this.$refs.pinPopup.open()
    },

    // 关闭弹层
    close() {
      this.$refs.pinPopup.close()
      setTimeout(() => {
        this.currentData = null
      }, 200)
    },

    // 点击遮罩关闭
    handleMaskClick() {
      this.handleCancel()
    },

    // 点击置顶
    handlePin() {
      this.close()
      this.$emit(this.isPinned ? 'unpin' : 'pin', this.currentData)
    },

    // 点击取消
    handleCancel() {
      this.close()
      this.$emit('cancel', this.currentData)
    }
  }
}
</script>

<style lang="scss" scoped>
.pin-actions-container {
  position: relative;

  .action-sheet {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    padding: 50rpx 32rpx 100rpx;
    background: #f7f7f7;
    border-radius: 24rpx 24rpx 0 0;

    .action-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 98rpx;
      padding: 0 28rpx;
      background: #fff;
      border-radius: 12rpx;

      &--cancel {
        color: #8e9296;
      }
    }

    .action-icon {
      position: relative;
      display: block;
      flex-shrink: 0;
      width: 40rpx;
      height: 40rpx;
      margin-right: 20rpx;
    }

    .action-text {
      color: #222;
      font-weight: 400;
      font-size: 32rpx;
    }
  }
}
</style>
