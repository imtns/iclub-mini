<template>
  <uni-popup ref="popup" :animation="false" mask-background-color="rgba(0,0,0,0.8)" :safe-area="false" :mask-click="false" background-color="transparent" @change="(e) => (show = e.show)">
    <view class="scroll">
      <div class="wrapper">
        <scroll-view class="content" :scroll-y="true" :style="{ 'max-height': '960rpx', 'min-height': !showContent ? '510rpx' : '180rpx' }" @touchstart="handleGo" @scroll="handleScroll">
          <view class="inner">
            <mp-html v-show="showContent" :content="currentLayer.layerText" :img-count="totalImageCount" scroll-table :preview-img="false" @ready="handleReady" @img-load="handleImgLoad" />
          </view>
        </scroll-view>
        <img v-if="!showContent" src="https://imeikud.oss-cn-beijing.aliyuncs.com/iclub/images/loading.gif" class="loading" />
        <img :style="{ opacity: showCover ? 1 : 0 }" src="https://udstatic.imeik.com/compressed/1758710217861_%E7%9F%A9%E5%BD%A2%402x%20(2).png" class="cover" />
        <div v-if="currentLayer && currentLayer.layerDuration" class="count-down">
          <img src="https://udstatic.imeik.com/compressed/1758709744441_%E8%B7%AF%E5%BE%84%402x.png" class="star" />
          <div class="c">
            <text>{{ seconds }}S </text> 后自动关闭
          </div>
          <img src="https://udstatic.imeik.com/compressed/1758709744441_%E8%B7%AF%E5%BE%84%402x.png" class="star" />
        </div>
      </div>
    </view>
    <image v-if="currentLayer" src="https://udstatic.imeik.com/compressed/1758709087086_icon_guanbi%402x.png" class="close" @click="handleClose" />
  </uni-popup>
</template>
<script>
import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html.vue'
import { submitHomePopup } from '@/http/home'
import { sleep } from '@/utils/tools'
import { mapState } from 'vuex'

export default {
  components: {
    mpHtml
  },
  props: {
    pageIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showContent: false,
      currentIndex: 0,
      seconds: 0,
      timer: null,
      show: false,
      isClosed: false,
      queriedPageIndices: new Set(),
      showCover: false // 控制 cover 图片显示
    }
  },
  computed: {
    ...mapState(['homePopupData', 'homePopupCacheCode']),
    totalImageCount() {
      const html = this.currentLayer?.layerText || ''
      const matches = html.match(/<img\b[^>]*>/gi)
      console.log('🚀 ~ totalImageCount ~ matches:', matches?.length)
      return matches ? matches?.length : 0
    },
    currentLayer() {
      if (this.isClosed || !this.show || !this.popupData.length) {
        return null
      }
      return this.popupData[this.currentIndex]
    },
    popupData() {
      return Array.isArray(this.homePopupData) ? this.homePopupData : []
    }
  },
  watch: {
    show: {
      handler(v) {
        if (v) {
          this.startTimer()
        } else {
          this.isClosed = true
          this.clearTimer()
          this.showCover = false // 弹窗关闭时隐藏 cover
        }
        this.$emit('pop', v)
        this.$refs.popup?.[v ? 'open' : 'close']?.()
      },
      immediate: true
    },
    homePopupData: {
      handler(v) {
        if (v && v.length > 0) {
          this.currentIndex = 0
          this.isClosed = false
          this.checkAndShowPopup()
        }
      },
      deep: true,
      immediate: true
    },
    pageIndex: {
      handler(newPageIndex) {
        if (!this.queriedPageIndices.has(newPageIndex)) {
          this.queriedPageIndices.add(newPageIndex)
          this.$store
            .dispatch('getHomePopup', newPageIndex)
            .then(() => {
              console.log(`已查询 pageIndex ${newPageIndex} 的弹窗数据`)
            })
            .catch((error) => {
              console.error(`查询 pageIndex ${newPageIndex} 弹窗数据失败:`, error)
            })
        } else {
          console.log(`pageIndex ${newPageIndex} 已查询过，跳过重复查询`)
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.clearTimer()
  },

  methods: {
    handleReady() {
      if (this.totalImageCount === 0) {
        this.showContent = true
      }
    },
    async handleImgLoad() {
      console.log('loaded!!!!!!')
      await sleep(100)
      this.showContent = true
      // 多次检查高度以确保内容加载完成
      this.checkContentHeight()
      for (let i = 0; i < 3; i++) {
        await this.checkContentHeight()
        await sleep(400)
      }
    },
    // 检查内容高度
    checkContentHeight() {
      uni
        .createSelectorQuery()
        .in(this)
        .select('.inner')
        .boundingClientRect((data) => {
          // console.log('🚀 ~ checkContentHeight ~ data:', data)
          if (data) {
            const realHeight = data.height
            const maxHeightPx = uni.upx2px(960)
            this.showCover = realHeight > maxHeightPx
            // console.log(`内容高度: ${realHeight}px, 最大高度: ${maxHeightPx}px, showCover: ${this.showCover}`)
          }
        })
        .exec()
    },
    handleScroll(e) {
      const { scrollTop, scrollHeight } = e.detail
      const maxHeightPx = uni.upx2px(960)
      const distanceToBottom = scrollHeight - scrollTop - maxHeightPx // 距离底部的距离

      const isNearBottom = distanceToBottom < 50
      this.showCover = !isNearBottom
      // console.log(`滚动位置: ${scrollTop},  是否到底部: ${isNearBottom},cover:${this.showCover}`)
    },
    handleGo() {
      const url = this.currentLayer.landingPagePath
      if (url) {
        uni.navigateTo({ url })
      }
    },
    checkAndShowPopup() {
      if (this.show || this.isClosed || !this.popupData.length) {
        this.show = false
        return
      }
      while (this.currentIndex < this.popupData.length) {
        const layer = this.popupData[this.currentIndex]
        const currentObjectCode = layer?.objectCode
        if (currentObjectCode && this.homePopupCacheCode.has(currentObjectCode)) {
          this.currentIndex++
          continue
        }
        this.$store.commit('setHomePopupCacheCode', currentObjectCode)
        setTimeout(() => {
          this.show = true
        }, 1000)
        return
      }
      this.closePopup()
    },
    handleClose() {
      this.submitAndNextPopup()
    },
    submitAndNextPopup() {
      if (!this.currentLayer) {
        this.closePopup()
        return
      }
      submitHomePopup({
        layerCode: this.currentLayer.objectCode,
        triggerPageType: String(this.pageIndex),
        openId: this.lsGet('openId')
      })
        .then(() => {
          console.log('弹窗数据提交成功')
        })
        .catch((error) => {
          console.error('提交弹窗数据失败:', error)
        })
      this.switchToNextPopup()
    },
    switchToNextPopup() {
      this.currentIndex++
      while (this.currentIndex < this.popupData.length) {
        const nextLayer = this.popupData[this.currentIndex]
        const currentObjectCode = nextLayer?.objectCode
        if (currentObjectCode && this.homePopupCacheCode.has(currentObjectCode)) {
          this.currentIndex++
          continue
        }
        this.$store.commit('setHomePopupCacheCode', currentObjectCode)
        this.clearTimer()
        if (nextLayer.layerDuration) {
          this.seconds = Number(nextLayer.layerDuration)
          this.startTimer()
        }
        console.log(`切换到弹窗 ${this.currentIndex + 1}/${this.popupData.length}`)
        return
      }
      console.log('所有弹窗已显示完毕，关闭弹窗')
      this.closePopup()
    },
    closePopup() {
      this.show = false
      this.currentIndex = 0
      this.showCover = false // 关闭弹窗时隐藏 cover
    },
    startTimer() {
      this.clearTimer()
      if (this.currentLayer && this.currentLayer.layerDuration) {
        this.seconds = Number(this.currentLayer.layerDuration)
        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds <= 0) {
            this.submitAndNextPopup()
          }
        }, 1000)
      }
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
}
</script>
<style lang="scss">
.scroll {
  position: relative;
  box-sizing: border-box;
  width: 524rpx;
  padding: 44rpx 32rpx 116rpx;
  background: #fff;
  border: 10rpx solid #a0b9eb;
  border-radius: 40rpx;
  &::after {
    position: absolute;
    top: -15rpx;
    right: -15rpx;
    bottom: -15rpx;
    left: -15rpx;
    z-index: 0;
    box-sizing: border-box;
    border: 8rpx solid rgba(54, 107, 213, 47%);
    border-radius: 40rpx;
    content: '';
    pointer-events: none;
  }

  &::before {
    position: absolute;
    top: -114rpx;
    left: 0rpx;
    z-index: -1;
    width: 157rpx;
    height: 137rpx;
    background: url('https://udstatic.imeik.com/compressed/1758718878851_%E7%BC%96%E7%BB%84%205%402x.png') no-repeat;
    background-size: 100% 100%;
    content: '';
    pointer-events: none;
  }

  .count-down {
    bottom: 40rpx;
    gap: 18rpx;
    width: 334rpx;
    height: 52rpx;
    background: url('https://udstatic.imeik.com/compressed/1758709677740_%E7%9F%A9%E5%BD%A2%402x%20(1).png') no-repeat;
    background-size: 100% 100%;
    @include flex-center;
    @include position-center-x;
    img {
      left: 44rpx;
      width: 20rpx;
      height: 20rpx;
    }
    .c {
      @include flex-center-y;

      font-size: 26rpx;
      text {
        margin-right: 10rpx;
        color: #366bd5;
        font-weight: 500;
      }
    }
  }

  image {
    display: block;
  }

  .wrapper {
    overflow: hidden;
    text-align: center;

    .content {
      position: relative;
      width: 100%;
      overflow-y: auto;
      text-align: justify;
      pointer-events: auto;

      img {
        width: 100%;
      }
    }
    .loading {
      top: 270rpx;
      width: 60rpx;
      height: 60rpx;
      @include position-center-x;
    }
    .cover {
      bottom: 112rpx;
      width: 508rpx;
      height: 40rpx;
      transition: all 0.3s;
      @include position-center-x;
    }
  }
}
.close {
  @include position-center-x;

  bottom: -90rpx;
  width: 66rpx;
  height: 64rpx;
}
</style>
