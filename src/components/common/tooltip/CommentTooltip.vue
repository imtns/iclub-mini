<template>
  <view class="tooltip-btn">
    <view class="btn del" @click.stop="delComment">
      <image class="btnImg" src="https://udstatic.imeik.com/pcUploads/1668492282134/icon_%E5%88%A0%E9%99%A4%402x.png" />
      删除
    </view>
    <!-- <view class="btn copy" @click.stop="copyComment">
      <image class="btnImg" src="https://udstatic.imeik.com/pcUploads/1668492306894/icon_%E5%A4%8D%E5%88%B6%402x.png" />
      复制
    </view>
    <view class="btn reply-btn" @click.stop="reply">
      <image class="btnImg" src="https://udstatic.imeik.com/pcUploads/1668492328560/icon_%E5%9B%9E%E5%A4%8D%402x.png" />
      回复
    </view> -->
  </view>
</template>

<script>
import { reportClickEvent } from '@/utils/report/report'
export default {
  name: 'tooltipBtn',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    emitAction(eventName, reportData) {
      this.$emit(eventName, this.item)
      this.$emit('close')
      if (reportData) {
        reportClickEvent({
          activityContent: {
            commentCode: this.item.objectCode,
            title: this.item.title
          },
          ...reportData
        })
      }
    },
    delComment() {
      this.emitAction('delete', {
        activityName: '删除评论',
        activityId: 'genius-face-detail-comment-delete'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-btn {
  display: flex;
  padding: 12rpx 22rpx;
  color: #fff;
  font-weight: 400;
  font-size: 24rpx;
  .btn {
    display: flex;
    gap: 20rpx;
    align-items: center;
    margin-right: 64rpx;
    &:last-child {
      margin-right: 0;
    }
    image {
      width: 32rpx;
      height: 32rpx;
    }
    .btnimg {
      width: 32rpx;
      height: 32rpx;
      margin-bottom: 8rpx;
    }
  }
}
</style>
