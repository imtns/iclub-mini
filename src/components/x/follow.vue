<template>
  <div>
    <view class="follow-btn" :class="statusClass" @tap.stop="handleTap(false)">
      <text class="follow-text">{{ label }}</text>
    </view>
    <x-pop v-model="unfollowPop" :z-index="9999" :loding="locking" @cancel="handleCancel" cancel @confirm="handleFollowAction"> 确认取消关注吗? </x-pop>
  </div>
</template>

<script>
import { apiFollow } from '@/http'

export default {
  name: 'FollowButton',
  props: {
    showCancelPop: Boolean,
    type: {
      type: String,
      default: 'user',
      validator: (v) => ['influencer', 'expert', 'user'].includes(v)
    },
    objectCode: { type: String, required: true },
    isFollowed: Boolean
  },
  data() {
    return {
      unfollowPop: false,
      label: '',
      locking: false
    }
  },
  watch: {
    isFollowed: {
      immediate: true,
      handler(newVal) {
        this.label = newVal ? '已关注' : '关注'
      }
    }
  },
  computed: {
    statusClass() {
      return `follow-btn--${this.isFollowed ? 'followed' : 'default'}`
    }
  },
  methods: {
    handleTap(confirmed = false) {
      if (!this.isLogin) {
        this.goLogin()
        return
      }

      // 防重复点击：请求进行中直接拦截
      if (this.locking) return

      // 取消关注 且 需要弹窗确认 → 只弹窗，不发请求
      if (this.isFollowed && !confirmed) {
        if (this.showCancelPop) {
          this.unfollowPop = true
        } else {
          this.$emit('unfollow', { targetType: this.targetTypeMap[this.type], targetCode: this.objectCode })
        }
        return
      }

      this.doFollow()
    },

    // 弹窗点击确认
    handleFollowAction() {
      if (this.locking) return
      this.doFollow()
    },

    // 弹窗点击取消
    handleCancel() {
      this.unfollowPop = false
    },

    // 统一执行关注/取消关注请求
    doFollow() {
      this.locking = true

      const targetType = this.targetTypeMap[this.type]
      const action = this.isFollowed ? 'unfollow' : 'follow'

      apiFollow({ targetType, targetCode: this.objectCode }, action)
        .then(() => {
          this.unfollowPop = false
          this.$emit('complete', this.objectCode)
        })
        .catch((e) => {
          this.$emit('error', e)
        })
        .finally(() => {
          setTimeout(() => {
            this.locking = false
          }, 300)
        })
    }
  },

  created() {
    this.targetTypeMap = {
      expert: '1',
      influencer: '2',
      user: '3'
    }
  }
}
</script>

<style scoped lang="scss">
.follow-btn {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 52rpx;
  padding: 0 24rpx;
  border: 2rpx solid transparent;
  border-radius: 32rpx;

  &--default {
    border-color: #366bd5;
    .follow-text {
      color: #366bd5;
    }
  }

  &--followed,
  &--mutual {
    border-color: #d9d9d9;
    .follow-text {
      color: #373737;
    }
  }
}

.follow-text {
  font-size: 26rpx;
  line-height: 1;
  white-space: nowrap;
}
</style>
