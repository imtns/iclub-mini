<template>
  <div class="comment-container" :class="{ pop, focus }">
    <div class="comment-wrapper">
      <div v-for="(item, index) in comments" :key="index" :id="'comment-item-' + index" class="box" @longpress="onLongPress(item, $event)">
        <!-- 头像 -->
        <view class="avatar-wrap">
          <div class="avatar">
            <img :src="getOssSrc(item.headUrl, 100)" mode="aspectFill" />
          </div>
          <image v-if="isOfficial(item.accountType)" class="avatar-v-flag" src="https://udstatic.imeik.com/pcUploads/1784011819586/v.png" />
        </view>

        <!-- 右侧主体 -->
        <div class="main">
          <div class="name">
            {{ item.nickName }}
            <text v-if="item.userCode === userInfo.objectCode" class="tag">我</text>
            <official-flag v-else-if="isOfficial(item.accountType)" class="official-flag" />
          </div>
          <div class="comment" :class="{ delete: item.status === '3' && userInfo.objectCode !== item.userCode }">
            {{ isCommentDeleted(item) ? '该评论已删除' : formatRule(item.comment) }}
          </div>

          <!-- 图片列表 -->
          <div v-if="item.pictures && getPicutres(item.pictures).length && isCommentVisible(item)" class="picture-grid">
            <image
              v-for="(pic, pi) in getPicutres(item.pictures)"
              :key="pi"
              :src="getOssSrc(pic, 200)"
              class="picture-item"
              mode="aspectFill"
              @click="previewPicture(getPicutres(item.pictures), pi)"
            />
          </div>

          <!-- 时间 + 回复 + 点赞 -->
          <div class="meta">
            <text class="date">{{ formatCommentTime(item.createTime) }}</text>
            <text class="reply-btn" v-if="isCommentVisible(item)" @tap.stop="$emit('reply', item)">回复</text>
            <div class="like-wrap" @click="handleLike(item)" v-if="item.status !== '3'">
              <image :src="likeIcon(item)" class="like-icon" mode="aspectFit" />
              <text class="like-count">{{ getLikeCnt(item) }}</text>
            </div>
          </div>

          <!-- 置顶标识 -->
          <div class="pin-tag" v-if="item.pinnedFlag === '1'">置顶评论</div>

          <!-- subComments -->
          <div v-if="item.subComments && item.subComments.length" class="sub-wrap" @longpress.stop>
            <div v-for="(sub, si) in getVisibleSubs(item)" :key="si" class="sub-item">
              <div class="sub-header">
                <view class="avatar-wrap">
                  <img v-if="sub.officialReply === '1'" src="https://udstatic.imeik.com/compressed/1775803593087_%E7%BC%96%E7%BB%84%2018%403x.png" class="avatar" mode="aspectFill" />
                  <img v-else :src="getOssSrc(sub.headUrl, 100)" class="avatar" mode="aspectFill" />
                  <image v-if="isOfficial(sub.accountType)" class="avatar-v-flag" src="https://udstatic.imeik.com/pcUploads/1784011819586/v.png" />
                </view>
                <text class="sub-name">{{ sub.officialReply === '1' ? '爱+官方小助手' : sub.nickName }}</text>
                <text v-if="sub.userCode === userInfo.objectCode" class="tag">我</text>
                <text v-else-if="sub.officialReply === '1'" class="tag">官方</text>
                <official-flag v-else-if="isOfficial(sub.accountType)" class="official-flag" />
              </div>
              <div class="sub-comment-wrap">
                <div class="sub-comment">{{ formatRule(sub.comment) }}</div>
                <div v-if="sub.pictures && getPicutres(sub.pictures).length" class="sub-picture-grid">
                  <image
                    v-for="(pic, pi) in getPicutres(sub.pictures)"
                    :key="pi"
                    :src="getOssSrc(pic, 200)"
                    class="sub-picture-item"
                    mode="aspectFill"
                    @click="previewPicture(getPicutres(sub.pictures), pi)"
                  />
                </div>
                <div class="sub-meta">
                  <text class="sub-date">{{ formatCommentTime(sub.createTime) }}</text>
                  <div class="sub-like-wrap" @click="handleLike(sub)">
                    <image :src="likeIcon(sub)" class="like-icon" mode="aspectFit" />
                    <text class="like-count">{{ getLikeCnt(sub) }}</text>
                  </div>
                </div>
              </div>
            </div>

            <!-- 展开/收起，超过3条才显示 -->
            <div v-if="item.subComments.length > 2" class="expand-btn" @click="toggleReplies(index)">
              <span />
              {{ expandedMap[index] ? '收起' : '展开全部 ' + (item.subComments.length - 2) + ' 条回复' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loadmore-tip">
      <x-loadmore :nomore="noMore" :loadmore="loadingMore" />
    </div>

    <x-toast ref="toast" />
  </div>
</template>

<script>
import moment from 'dayjs'
import { commentLike } from '@/http/content'
import { mapState } from 'vuex'
import { getOssSrc, formatCommentTime } from '@/utils/tools'
import OfficialFlag from '@/components/common/official-flag.vue'
import { AccountTypeEnum } from '@/constant/index'

export default {
  components: { OfficialFlag },
  props: {
    pop: { type: Boolean, default: true },
    focus: { type: Boolean, default: false },
    comments: { type: Array, default: () => [] },
    loadingMore: { type: Boolean, default: false },
    noMore: { type: Boolean, default: false },
    likeApi: { type: Function, default: null },
    scrollTop: { type: Number, default: 0 },
    usePageScroll: { type: Boolean, default: false }
  },
  data() {
    return {
      moment,
      expandedMap: {},
      likeMap: {},
      activeComment: null // 当前长按的评论 item
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
      userInfo: (state) => state.user.userInfo
    }),
    isCommentDeleted() {
      return (item) => item.status === '3' && item.userCode !== this.userInfo.objectCode
    },
    isCommentVisible() {
      return (item) => item.status !== '3' || item.userCode === this.userInfo.objectCode
    }
  },
  methods: {
    formatCommentTime,
    getOssSrc,
    isOfficial(accountType) {
      return accountType === AccountTypeEnum.OFFICIAL
    },
    // ---- 长按触发弹窗，仅限自己的评论 ----
    onLongPress(item) {
      console.log('🚀 ~ item:', item)
      uni.$emit('show-pin-popup', item)
    },

    closePopup() {
      this.$refs.deletePopup.close()
      this.activeComment = null
      this.$emit('close-popup')
    },

    // ---- 弹窗操作 ----
    handlePopClick(action) {
      this.$refs.deletePopup.close()
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
        uni.setClipboardData({
          data: item.comment || '',
          success: () => {
            // this.showToast('评论复制成功')
          }
        })
      }

      this.activeComment = null
    },

    // ---- 以下方法保持原有逻辑不变 ----
    cleanOssUrl(url) {
      if (!url) return url
      return url.replace(/(\.jpg|\.jpeg|\.png|\.webp|\.gif).*/i, '$1')
    },

    getPicutres(pictures) {
      if (!pictures) return []
      try {
        let arr = typeof pictures === 'string' ? JSON.parse(pictures) : pictures
        if (!Array.isArray(arr)) return []
        return arr.map((url) => this.cleanOssUrl(url)).filter(Boolean)
      } catch (e) {
        console.error('getPicutres parse error:', e, pictures)
        return []
      }
    },

    formatRule(val) {
      if (!val) return ''
      return val.replace(/\\n/g, '\n')
    },

    getLikeFlag(item) {
      return this.likeMap[item.objectCode]?.flag ?? item.upvoteFlag
    },

    getLikeCnt(item) {
      return this.likeMap[item.objectCode]?.cnt ?? item.upvoteCnt ?? 0
    },

    likeIcon(item) {
      if (this.getLikeFlag(item) === '1') {
        return 'https://udstatic.imeik.com/compressed/1775637184583_icon_dianzan%403x.png'
      }
      return 'https://udstatic.imeik.com/compressed/1775637185406_icon_dianzan%403x%20(1).png'
    },

    getVisibleSubs(item) {
      const idx = this.comments.indexOf(item)
      if (this.expandedMap[idx]) return item.subComments
      return item.subComments.slice(0, 2)
    },

    toggleReplies(index) {
      const isExpanding = !this.expandedMap[index]
      if (!isExpanding) {
        this.$set(this.expandedMap, index, false)
        this.$nextTick(() => {
          uni
            .createSelectorQuery()
            .in(this)
            .select(`#comment-item-${index}`)
            .boundingClientRect((rect) => {
              if (!rect) return
              if (this.usePageScroll) {
                uni.pageScrollTo({ scrollTop: this.scrollTop + rect.top - 120, duration: 150 })
              } else {
                this.$emit('collapse-to-item', this.scrollTop + rect.top)
              }
            })
            .exec()
        })
      } else {
        this.$set(this.expandedMap, index, true)
      }
    },

    previewPicture(urls, current) {
      uni.previewImage({ current: urls[current], urls })
    },

    handleLike(item) {
      if (!this.isLogin) {
        this.goLogin()
        return
      }
      const currentFlag = this.getLikeFlag(item)
      const currentCnt = this.getLikeCnt(item)
      const isLiked = currentFlag === '0'
      const fetchFn = this.likeApi || commentLike
      fetchFn({
        [this.likeApi ? 'objectCode' : 'commentCode']: item.objectCode,
        likeStatus: isLiked
      }).then(() => {
        this.$set(this.likeMap, item.objectCode, {
          flag: isLiked ? '1' : '0',
          cnt: isLiked ? currentCnt + 1 : Math.max(0, currentCnt - 1)
        })
      })
    },

    scrollToReply(parentObjectCode) {
      const idx = this.comments.findIndex((item) => item.objectCode === parentObjectCode)
      if (idx === -1) return
      this.$set(this.expandedMap, idx, true)
      this.$nextTick(() => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#comment-item-${idx}`)
          .boundingClientRect((rect) => {
            if (rect) {
              uni.pageScrollTo({
                scrollTop: rect.top + uni.getWindowInfo().scrollTop - 120,
                duration: 300
              })
            }
          })
          .exec()
      })
    },

    expandItem(index) {
      this.$set(this.expandedMap, index, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-container {
  &.pop {
    padding-bottom: 40rpx;
  }
  &.focus {
    padding-bottom: 140rpx !important;
  }

  .comment-wrapper {
    padding: 0 32rpx;

    .box {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin-top: 60rpx;
      &:first-of-type {
        margin-top: 24rpx;
      }

      .avatar {
        display: block;
        width: 64rpx;
        height: 64rpx;
        overflow: hidden;
        border-radius: 50%;
        ::v-deep image {
          width: 64rpx !important;
          height: 64rpx !important;
          border-radius: 50%;
        }

        &-wrap {
          flex-shrink: 0;
          position: relative;
          margin-right: 16rpx;
        }
      }

      .main {
        flex: 1;
        min-width: 0;
        padding-top: 12rpx;

        .tag {
          height: 34rpx;
          margin-left: 12rpx;
          padding: 0 12rpx;
          color: #366bd5;
          font-weight: bold;
          font-size: 20rpx;
          line-height: 34rpx;
          text-align: center;
          background: rgba(54, 107, 213, 10%);
          border-radius: 20rpx;
        }

        .name {
          color: #666;
          font-weight: 500;
          font-size: 28rpx;
          line-height: 40rpx;
          @include flex-center-y;
        }
        .pin-tag {
          width: 104rpx;
          height: 34rpx;
          margin-top: 18rpx;
          color: #366bd5;
          font-weight: 500;
          font-size: 20rpx;
          line-height: 34rpx;
          text-align: center;
          background: rgba(54, 107, 213, 10%);
          border-radius: 20rpx;
        }
        .comment {
          margin-top: 12rpx;
          color: #222;
          font-size: 28rpx;
          white-space: pre-wrap;
          text-align: justify;
          word-break: break-all;
          &.delete {
            color: #bdbdbd;
          }
        }

        .picture-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12rpx;
          margin-top: 16rpx;
          .picture-item {
            width: 148rpx;
            height: 148rpx;
            object-fit: cover;
            border-radius: 12rpx;
          }
        }

        .meta {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 12rpx;
          .date {
            color: #9d9fa1;
            font-size: 24rpx;
          }
          .reply-btn {
            margin-left: 32rpx;
            color: #222;
            font-size: 24rpx;
          }
          .like-wrap {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-left: auto;
            .like-icon {
              width: 40rpx;
              height: 40rpx;
              margin-right: 8rpx;
            }
            .like-count {
              color: #5a6067;
              font-size: 24rpx;
            }
          }
        }

        .sub-wrap {
          padding: 24rpx 0 0;
          .sub-item {
            margin-bottom: 24rpx;
            &:last-of-type {
              margin-bottom: 0;
            }
            .sub-header {
              display: flex;
              flex-direction: row;
              align-items: center;
              .avatar {
                width: 48rpx;
                height: 48rpx;
                border-radius: 50%;

                &-wrap {
                  position: relative;
                  margin-right: 16rpx;
                  flex-shrink: 0;

                  .avatar-v-flag {
                    width: 24rpx;
                    height: 24rpx;
                  }
                }
              }
              .sub-name {
                margin-left: 0;
                color: #666;
                font-weight: 500;
                font-size: 28rpx;
              }
            }
            .sub-comment-wrap {
              padding-left: 64rpx;
              .sub-comment {
                margin-top: 12rpx;
                color: #222;
                font-size: 28rpx;
                white-space: pre-wrap;
                text-align: justify;
                word-break: break-all;
              }
              .sub-picture-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 12rpx;
                margin-top: 16rpx;
                .sub-picture-item {
                  width: 148rpx;
                  height: 148rpx;
                  border-radius: 8rpx;
                }
              }
              .sub-meta {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 8rpx;
                .sub-date {
                  color: #9d9fa1;
                  font-size: 24rpx;
                }
                .sub-like-wrap {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-left: auto;
                  .like-icon {
                    width: 40rpx;
                    height: 40rpx;
                    margin-right: 8rpx;
                  }
                  .like-count {
                    color: #5a6067;
                    font-size: 24rpx;
                  }
                }
              }
            }
          }
          .expand-btn {
            color: #20385e;
            font-weight: 500;
            font-size: 28rpx;
            @include flex-center-y;
            span {
              width: 48rpx;
              height: 2rpx;
              margin-right: 16rpx;
              background: #eaeaea;
            }
          }
        }
      }
    }
  }
}

.loadmore-tip {
  padding: 20rpx 0 40rpx;
  color: #c0c4cc;
  font-size: 24rpx;
  text-align: center;
}

.official-flag {
  margin-left: 12rpx;
}
</style>
