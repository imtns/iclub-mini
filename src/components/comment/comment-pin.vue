<template>
  <div class="container">
    <!-- 长按评论操作弹窗 -->
    <uni-popup ref="pinPop" :z-index="999999" type="bottom" :mask-click="true" :safe-area="false" @maskClick="closePopup" background-color="#F7F7F7">
      <view class="action-sheet" :style="{ height: isPublisher ? '438rpx' : '328rpx' }">
        <!-- 置顶：单独一个卡片 -->
        <view class="action-card action-card--single" @click="handlePopClick('pin')" v-if="isPublisher">
          <image class="action-icon" src="https://udstatic.imeik.com/compressed/1779433657322_icon_pinglun%20%403x.png" mode="aspectFit" />
          <text class="action-text">{{ activeComment.pinnedFlag === '1' ? '取消置顶' : '置顶' }}</text>
        </view>

        <!-- 回复 + 复制：同一个卡片，中间分割线 -->
        <view class="action-card action-card--group">
          <view class="action-row" @click="handlePopClick('reply')">
            <image class="action-icon" src="https://udstatic.imeik.com/compressed/1779433657315_icon_pinglun%20%403x%20(1).png" mode="aspectFit" />
            <text class="action-text">回复</text>
          </view>
          <view class="action-divider" />
          <view class="action-row" @click="handlePopClick('copy')">
            <image class="action-icon" src="https://udstatic.imeik.com/compressed/1779433657549_icon_pinglun%20%403x%20(2).png" mode="aspectFit" />
            <text class="action-text">复制</text>
          </view>
        </view>

        <!-- Home indicator -->
        <view class="home-indicator" />
      </view>
    </uni-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    authorCode: String
  },
  data() {
    return {
      activeComment: null // 当前长按的评论 item
    }
  },

  watch: {
    show(v) {
      this.$refs.pinPop[v ? 'open' : 'close']()
    }
  },
  computed: {
    isPublisher() {
      return this.authorCode === this.userInfo.objectCode
    }
  },
  mounted() {},
  created() {
    uni.$on('show-pin-popup', this.onLongPress)
  },
  beforeDestroy() {
    uni.$off('show-pin-popup', this.onLongPress)
  },
  methods: {
    // ---- 长按触发弹窗，仅限自己的评论 ----
    onLongPress(item) {
      console.log('🚀 ~ item:', item)
      console.log('this.authorCode', this.authorCode)
      this.activeComment = item
      this.$refs.pinPop.open()
    },

    closePopup() {
      this.$refs.pinPop.close()
      setTimeout(() => {
        this.activeComment = null
      }, 200)
    },

    // ---- 弹窗操作 ----
    handlePopClick(action) {
      this.$refs.pinPop.close()
      if (!this.isLogin) {
        this.goLogin()
        return
      }
      const item = this.activeComment
      if (!item) return

      if (action === 'pin') {
        // 置顶：通知父组件处理
        console.log('pin', item)
        this.$emit('pin', item)
      } else if (action === 'reply') {
        // 回复：复用已有的 reply emit
        this.$emit('reply', item)
      } else if (action === 'copy') {
        // 复制评论内容到剪贴板
        wx.setClipboardData({
          data: item.comment || '',
          success: () => {
            uni.showToast({
              icon: 'none',
              title: '已复制到剪切板'
            })
          }
        })
      }

      this.activeComment = null
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  .action-sheet {
    padding: 50rpx 32rpx 0rpx;
    background: transparent;
    background: #f7f7f7;
    border-radius: 12rpx 12rpx 0rpx 0rpx;
    /* 置顶卡片：单独一块 */
    .action-card--single {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 98rpx;
      margin-bottom: 24rpx;
      padding: 0 32rpx;
      background: #fff;
      border-radius: 12rpx;
    }

    /* 回复+复制卡片：一块，内部分割线 */
    .action-card--group {
      margin-bottom: 16rpx;
      overflow: hidden;
      background: #fff;
      border-radius: 12rpx;

      .action-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 98rpx;
        padding: 0 32rpx;
      }

      .action-divider {
        position: relative;
        left: 92rpx;
        width: 598rpx;
        height: 1rpx;
        background: #f0f0f0;
      }
    }

    .action-icon {
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
