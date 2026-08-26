<template>
  <div>
    <uni-popup ref="popup" :safe-area="false" type="bottom" background-color="#fff" :animate="false" mask-background-color="rgba(0,0,0,0.5)" :is-mask-click="true" @change="(e) => (show = e.show)">
      <div id="comment-container">
        <div v-show="!onlyComment" class="content-body comment" @click="commentFocus = false">
          <div v-if="replyTarget" class="reply-mask" @click.stop="replyTarget = null" />
          <div class="header">
            <div class="tip">
              共<text> {{ commentListTotal }} </text>条评论
            </div>
            <text class="iplus icon-close" @click="show = false" />
          </div>
          <scroll-view
            class="content"
            scroll-y
            :scroll-top="scrollViewTop"
            :scroll-into-view="scrollIntoView"
            :scroll-with-animation="true"
            :scroll-into-view-offset="-10"
            :style="{ height: height + 'rpx' }"
            @scroll="onScroll"
            @scrolltolower="onCommentLoadMore"
          >
            <div v-if="commentListTotal" class="comment-list" id="comment-list-top">
              <uni-transition :show="commentListTotal > 0">
                <CommentList
                  ref="commentList"
                  :comments="commentList"
                  :focus="commentFocus"
                  :scroll-top="scrollTop"
                  @collapse-to-item="onCollapse"
                  @reply="onReply"
                  @pin="handleCommentPin"
                  :loading-more="commentLoadingMore"
                  :no-more="commentLoadFinish"
                  :like-api="likeApi"
                />
              </uni-transition>
            </div>
            <x-empty v-else-if="!commentListTotal" type="comment" :img-width="320" />
          </scroll-view>
        </div>
      </div>
      <x-toast ref="toast" />
    </uni-popup>

    <!-- 输入区域移出 popup，放到组件根级，避免 fixed 在安卓 popup 内背景透明问题 -->
    <div
      v-show="show"
      class="comment-input"
      id="comment-input-box"
      :style="{
        paddingBottom: commentInputStyle.paddingBottom,
        bottom: commentInputStyle.bottom
      }"
    >
      <!-- 输入框 -->
      <div class="input-wrapper" @click="expandInput">
        <!-- 收起态：占位条 -->
        <div v-if="!commentFocus && !comment && imageList.length === 0 && !onlyComment" class="input-placeholder">
          <image src="https://udstatic.imeik.com/pcUploads/1675319156933/edit-icon.png" class="placeholder-icon" mode="aspectFit" />
          <text class="placeholder-text">说点什么...</text>
        </div>
        <!-- 展开态：真实 textarea -->
        <div class="input-container" v-if="commentFocus || comment || imageList.length > 0 || onlyComment">
          <uni-easyinput
            v-model="comment"
            :adjust-position="false"
            placeholder-style="font-size:26rpx;color:#A9ACB0;"
            :styles="{ padding: '0', margin: '0' }"
            :placeholder="replyTarget ? '回复 ' + replyTarget.nickName : '说点什么...'"
            :focus="autoFocus"
            :clearable="false"
            type="textarea"
            auto-height
            maxlength="100"
            @focus="onCommentFocus"
            @blur="onCommentBlur"
            @keyboardheightchange="onKeyboardheightchange"
          />
        </div>
      </div>

      <!-- 工具栏和图片预览：只在激活态显示 -->
      <template v-if="commentFocus || comment || imageList.length > 0 || onlyComment">
        <div class="toolbar">
          <div class="toolbar-left" @click="chooseImage">
            <image :src="toolbarImg" class="toolbar-img-icon" mode="aspectFit" />
          </div>
          <button class="send-btn" :class="{ 'send-btn--active': !isEmptyComment }" :disabled="isEmptyComment || commentSending" :loading="commentSending" @click="handleSendComment">
            {{ commentSending ? '' : '发送' }}
          </button>
        </div>

        <scroll-view v-if="imageList.length > 0" class="image-preview-scroll" scroll-x :show-scrollbar="false">
          <div class="image-preview-list">
            <div v-for="(img, idx) in imageList" :key="idx" class="image-preview-item">
              <view v-if="img.status === 'uploading'" class="upload-mask">
                <text class="upload-mask-text">上传中</text>
              </view>
              <view v-if="img.status === 'failed'" class="upload-mask upload-mask--failed">
                <text class="upload-mask-text">失败</text>
              </view>
              <image :src="img.tempFilePath" class="preview-img" mode="aspectFill" @click.stop="previewImage(idx)" />
              <div class="image-remove" @click.stop="removeImage(idx)">
                <img src="https://udstatic.imeik.com/compressed/1776759243291_bg-close%403x.png" class="remove-icon" />
              </div>
            </div>
          </div>
        </scroll-view>
      </template>
    </div>
  </div>
</template>

<script>
import { sysInfo } from '@/utils/sysInfo'
import { submitComment, pinComment } from '@/http/content'
import moment from 'dayjs'
import { mapState, mapActions } from 'vuex'
import CommentList from '@/components/comment/comment-list'
import AliOss from '@/utils/aliOssSts.js'
import { sleep } from '@/utils/tools'
import { AccountTypeEnum } from '@/constant/index'
const KEYBOARD_HEIGHT_KEY = 'cached_keyboard_height'
export default {
  components: { CommentList },
  props: {
    value: Boolean,
    showPopCommentAfterSend: {
      type: Boolean,
      default: true
    },
    contentCode: String,
    info: {
      type: Object,
      default: () => {}
    },
    likeApi: { type: Function, default: null },
    submitApi: { type: Function, default: null }
  },
  data() {
    return {
      sysInfo: sysInfo(),
      commentFocus: false,
      loading: false,
      onlyComment: false,
      moment,
      height: '',
      comment: '',
      autoFocus: false,
      scrollTop: 0,
      keyboardHeight: 0,
      commentSending: false,
      isChoosingImage: false,
      imageList: [],
      replyTarget: null,
      scrollViewTop: 0,
      scrollIntoView: '',
      commentPage: 1,
      commentLoadingMore: false
    }
  },
  computed: {
    ...mapState({
      commentList: (state) => state.comment.commentList,
      commentLoadFinish: (state) => state.comment.commentLoadFinish,
      isLogin: (state) => state.user.isLogin,
      commentListTotal: (state) => state.comment.commentListTotal
    }),
    isEmptyComment() {
      return !this.comment.replace(/\s+/g, '').length && this.imageList.length === 0
    },
    toolbarImg() {
      return this.imageList.length === 9 ? 'https://udstatic.imeik.com/compressed/1776742940035_comment-icon-d.png' : 'https://udstatic.imeik.com/compressed/1776742956729_comment-icon.png'
    },
    commentInputStyle() {
      if (this.commentFocus && this.keyboardHeight > 0) {
        let bottomOffset = this.keyboardHeight
        // Android 需要额外加上输入框自身高度，iOS 不需要
        if (!this.sysInfo.isIOS) {
          const isHarmonyOS = this.sysInfo.system.includes('OpenHarmony')
          bottomOffset = this.keyboardHeight + (isHarmonyOS ? 48 : 0)
        }
        return {
          paddingBottom: 'calc(16rpx + env(safe-area-inset-bottom))',
          bottom: bottomOffset + 'px'
        }
      }
      return {
        paddingBottom: 'calc(16rpx + env(safe-area-inset-bottom))',
        bottom: '0px'
      }
    },
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    show(v) {
      if (v) {
        const maxHeightPx = this.sysInfo.windowHeight - this.sysInfo.navHeight
        this.height = (maxHeightPx * 750) / this.sysInfo.screenWidth - 750
        setTimeout(() => {
          this.loading = false
        }, 300)
      } else {
        setTimeout(() => {
          this.onBlur()
        }, 100)
      }
      this.$refs.popup[v ? 'open' : 'close']()
    },
    commentFocus(v) {
      this.$emit('focus-change', v)
    }
  },
  methods: {
    ...mapActions(['getComment']),

    fetchComment() {
      this.commentPage = 1
      this.commentNoMore = false
      this.getComment({
        objectCode: this.info.objectCode,
        page: 1
      })
    },
    handleCommentPin() {
      this.scrollIntoView = ''

      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollIntoView = 'comment-list-top'
        }, 100)
      })
    },
    async chooseImage() {
      const maxCount = 9 - this.imageList.length
      if (maxCount <= 0) {
        uni.$emit('toast', '最多上传9张图片')
        return
      }
      this.isChoosingImage = true
      uni.chooseImage({
        count: maxCount,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: async (res) => {
          const MAX_SIZE = 10 * 1024 * 1024
          const validFiles = []
          const oversizedCount = res.tempFiles.filter((f) => f.size > MAX_SIZE).length

          res.tempFiles.forEach((file) => {
            if (file.size <= MAX_SIZE) {
              validFiles.push(file)
            }
          })

          if (oversizedCount > 0) {
            if (oversizedCount === 1) {
              uni.$emit('toast', '上传照片不能大于10MB')
            } else {
              uni.$emit('toast', `${oversizedCount}张图片超过10MB已过滤`)
            }
          }

          if (validFiles.length === 0) {
            this.isChoosingImage = false
            return
          }

          const tokenData = await AliOss.getUploadTokenAsync()
          this.isChoosingImage = false

          const newItems = validFiles.map((file) => {
            const filename = file.name || `img_${Date.now()}_${Math.random().toString(36).slice(2)}`
            return {
              tempFilePath: file.path || file.tempFilePath,
              filename,
              status: 'uploading',
              url: ''
            }
          })

          const startIdx = this.imageList.length
          this.imageList = [...this.imageList, ...newItems]

          newItems.forEach((item, i) => {
            const uploadData = {
              ...tokenData,
              filePath: item.tempFilePath,
              filename: item.filename
            }
            AliOss.aliUpload(uploadData.filePath, uploadData, (url) => {
              const targetIdx = startIdx + i
              if (url) {
                this.$set(this.imageList, targetIdx, {
                  ...this.imageList[targetIdx],
                  status: 'success',
                  url
                })
              } else {
                this.$set(this.imageList, targetIdx, {
                  ...this.imageList[targetIdx],
                  status: 'failed'
                })
              }
            })
          })
        },
        fail: (err) => {
          this.isChoosingImage = false
          console.log('选择图片失败', err)
        }
      })
    },
    onScroll(e) {
      this.scrollTop = e.detail.scrollTop
    },
    previewImage(idx) {
      const urls = this.imageList.map((img) => img.tempFilePath)
      uni.previewImage({ current: urls[idx], urls })
    },

    removeImage(idx) {
      const list = [...this.imageList]
      list.splice(idx, 1)
      this.imageList = list
    },

    async handleSendComment() {
      const uploadingCount = this.imageList.filter((i) => i.status === 'uploading').length
      if (uploadingCount > 0) {
        uni.$emit('toast', '图片上传中，请稍候')
        return
      }

      const imageUrls = this.imageList.filter((i) => i.status === 'success').map((i) => i.url)

      this.commentSending = true
      try {
        const fetchFn = this.submitApi || submitComment
        const { data } = await fetchFn({
          comment: this.comment,
          contentCode: this.info.objectCode,
          pictures: JSON.stringify(imageUrls),
          pareantCode: this.replyTarget?.objectCode || ''
        })
        const parentCode = this.replyTarget?.objectCode || null
        const userInfo = this.$store.state.user.userInfo

        const newComment = {
          objectCode: data?.objectCode,
          comment: this.comment,
          pictures: JSON.stringify(imageUrls) || [],
          accountType: userInfo.accountType || AccountTypeEnum.NORMAL,
          headUrl: userInfo.headUrl || '',
          nickName: userInfo.nickName || '',
          userCode: userInfo.objectCode || '',
          createTime: new Date().toISOString(),
          officialReply: '0',
          upvoteFlag: '0',
          pinnedFlag: '0',
          upvoteCnt: 0,
          status: '2',
          subComments: []
        }

        if (parentCode) {
          this.$store.commit('appendSubComment', { parentCode, comment: newComment })
        } else {
          this.$store.commit('prependComment', newComment)
          this.scrollIntoView = ''
          this.$nextTick(() => {
            setTimeout(() => {
              this.scrollIntoView = 'comment-list-top'
            }, 100)
          })
        }
        this.comment = ''
        this.imageList = []
        this.replyTarget = null
        this.$emit('callback', true, parentCode)
        if (this.showPopCommentAfterSend) {
          this.onlyComment = false
          this.autoFocus = false
          this.commentFocus = false
        } else {
          this.onBlur()
        }
        setTimeout(() => {
          this.commentSending = false
        }, 200)
      } catch (err) {
        console.error('发送评论失败', err)
        uni.$emit('toast', err?.message || '发送失败，请重试')
        this.$emit('callback', false)
        this.commentSending = false
      }
    },

    onBlur() {
      if (this.onlyComment) {
        this.show = false
      }
      this.commentFocus = false
      this.autoFocus = false
      this.comment = ''
      this.imageList = []
      this.replyTarget = null
      setTimeout(() => {
        this.onlyComment = false
      }, 300)
    },

    setOnlyComment(tag) {
      this.onlyComment = tag
      setTimeout(() => {
        this.autoFocus = tag
      }, 50)
    },

    onCommentFocus() {
      this.commentFocus = true
      // 有缓存就先设上，让输入框立刻到位
      const cached = uni.getStorageSync(KEYBOARD_HEIGHT_KEY)
      if (cached) {
        this.keyboardHeight = cached
      }
    },

    onCommentBlur() {
      setTimeout(() => {
        if (this.isChoosingImage) return
        if (!this.comment && this.imageList.length === 0 && !this.onlyComment) {
          this.commentFocus = false
        }
      }, 300)
    },

    expandInput() {
      if (!this.isLogin) {
        this.goLogin()
        return
      }
      if (!this.commentFocus) {
        this.commentFocus = true
        this.$nextTick(() => {
          this.autoFocus = true
        })
      }
    },

    onKeyboardheightchange(e) {
      const keyboardHeight = e.detail.height || 0
      if (keyboardHeight <= 0) {
        this.keyboardHeight = 0
        return
      }
      console.log('键盘高度原始值:', keyboardHeight, '是否iOS:', this.sysInfo.isIOS)
      let finalHeight
      if (this.sysInfo.isIOS) {
        finalHeight = keyboardHeight - 20
      } else {
        finalHeight = keyboardHeight
      }
      console.log('最终键盘高度:', finalHeight)
      this.keyboardHeight = finalHeight
      // 存到 storage，下次 focus 直接用
      uni.setStorageSync(KEYBOARD_HEIGHT_KEY, finalHeight)
    },
    onCollapse(scrollTop) {
      console.log('🚀 ~ targetScrollTop:', scrollTop)
      // 先置为不同值触发响应，再设目标值
      this.$nextTick(() => {
        this.scrollViewTop = scrollTop - 300
      })
    },
    onReply(item) {
      if (!this.isLogin) {
        this.goLogin()
        return
      }
      this.replyTarget = item
      this.commentFocus = true
      this.$nextTick(() => {
        this.autoFocus = true
      })
    },

    async onCommentLoadMore() {
      if (this.commentNoMore || this.commentLoadingMore) return
      this.commentLoadingMore = true
      await sleep(500)
      this.commentPage++
      try {
        await this.getComment({
          objectCode: this.info.objectCode,
          page: this.commentPage,
          loadMore: true
        })
      } finally {
        this.commentLoadingMore = false
      }
    }
  }
}
</script>

<style lang="scss">
#comment-container {
  position: relative;
  isolation: isolate;
}

/* ── 评论列表区域 ── */
.content-body.comment {
  position: relative;
  z-index: 100;
  padding: 80rpx 0 0;
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  .reply-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 20%);
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    min-height: 84rpx;
    padding: 24rpx 32rpx;
    background: white;
    border-bottom: 1px solid #eee;
    border-radius: 32rpx 32rpx 0 0;

    .tip {
      color: #9d9fa1;
      font-size: 24rpx;
      text {
        margin: 0 5rpx;
        color: #333;
      }
    }

    .iplus {
      position: absolute;
      top: 26rpx;
      right: 32rpx;
      font-size: 34rpx;
    }
  }

  .content {
    min-height: 1000rpx;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
}

/* ── 评论输入区域 ── */
.comment-input {
  position: fixed;
  bottom: 0;
  left: 0;
  // 移出 popup 后直接相对视口定位，z-index 需高于 popup
  z-index: 99999;
  box-sizing: border-box;
  width: 750rpx;
  padding: 16rpx 24rpx;
  background: #fff;
  border-top: 1rpx solid rgba(0, 0, 0, 10%);
  transform: translateZ(0);
  backface-visibility: hidden;
  // 强制 GPU 合成层，彻底解决安卓背景透明问题
  transition: bottom 0.3s ease;
  will-change: transform;

  .input-wrapper {
    box-sizing: border-box;
    width: 100%;
    max-height: 468rpx;
    overflow: hidden;
    background: #f9f9f9;
    border-radius: 32rpx;
    .input-container {
      padding: 12rpx 16rpx;
    }
    .input-placeholder {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 64rpx;
      padding: 0 24rpx;
      background: #f9f9f9;
      border-radius: 40rpx;

      .placeholder-icon {
        width: 24rpx;
        height: 24rpx;
        margin-right: 12rpx;
      }

      .placeholder-text {
        color: #666;
        font-weight: 400;
        font-size: 24rpx;
      }
    }

    .uni-easyinput {
      padding: 24rpx 32rpx;
    }

    ::v-deep .uni-easyinput__content {
      padding: 0 !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }

    ::v-deep .uni-easyinput__content-textarea {
      text-align: justify;
      background: transparent !important;
    }
  }

  .comment-textarea {
    width: 100%;
    color: #29323d;
    font-size: 28rpx;
    line-height: 40rpx;
    background: transparent;
    border: none;
    outline: none;
  }

  .image-preview-scroll {
    width: 750rpx;
    margin-top: 12rpx;
    margin-left: -24rpx;
  }

  .image-preview-list {
    display: inline-flex;
    flex-direction: row;
    gap: 20rpx;
    padding: 12rpx 30rpx 8rpx 24rpx;
    white-space: nowrap;
  }

  .image-preview-item {
    position: relative;
    flex-shrink: 0;
    width: 92rpx;
    height: 92rpx;
  }

  .preview-img {
    width: 92rpx;
    height: 92rpx;
    object-fit: cover;
    border-radius: 12rpx;
  }

  .upload-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 92rpx;
    height: 92rpx;
    background: rgba(0, 0, 0, 45%);
    border-radius: 12rpx;

    &--failed {
      background: rgba(220, 38, 38, 45%);
    }

    .upload-mask-text {
      color: #fff;
      font-size: 20rpx;
    }
  }

  .image-remove {
    position: absolute;
    top: -8rpx;
    right: -8rpx;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26rpx;
    height: 26rpx;

    .remove-icon {
      width: 26rpx;
      height: 26rpx;
    }
  }

  .toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 12rpx;

    .toolbar-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52rpx;
      height: 52rpx;

      .toolbar-img-icon {
        width: 36rpx;
        height: 36rpx;
      }
    }

    .send-btn {
      display: inline-block;
      flex-shrink: 0;
      width: 120rpx;
      height: 60rpx;
      margin: 0;
      padding: 0;
      color: #fff;
      font-size: 26rpx;
      line-height: 60rpx;
      text-align: center;
      background: rgba(54, 107, 213, 40%);
      border-radius: 32rpx;

      &--active {
        background: #366bd5;
      }

      &::after {
        border: none;
      }
    }
  }
}
</style>
