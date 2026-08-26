<template>
  <uni-popup ref="popup" :z-index="9999" :animation="true" mask-background-color="rgba(0,0,0,0.8)" :safe-area="false" background-color="transparent" @change="(e) => (show = e.show)">
    <view class="scroll">
      <div class="wrapper">
        <scroll-view class="content" :scroll-y="true" :style="{ 'max-height': '1040rpx' }" @touchstart="handleGo">
          <view class="inner">
            <mp-html v-show="showContent" :content="currentLayer.layerText" :img-count="totalImageCount" scroll-table :preview-img="false" @ready="handleReady" @img-load="handleImgLoad" />
          </view>
        </scroll-view>
        <img v-if="!showContent" src="https://imeikud.oss-cn-beijing.aliyuncs.com/iclub/images/loading.gif" class="loading" />
      </div>
    </view>
    <image v-if="currentLayer && showContent" src="https://udstatic.imeik.com/compressed/1758709087086_icon_guanbi%402x.png" class="close" mode="widthFix" @click="handleClose" />
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
      default: -1
    }
  },
  data() {
    return {
      showContent: false,
      currentIndex: -1,
      seconds: 0,
      timer: null,
      show: false,
      isClosed: false,
      queriedPageIndices: new Set(),
      showCover: false,
      _pageIndexTimer: null,
      // 记录当前「期望展示」的 pageIndex
      // 请求返回时与此对比，不匹配则丢弃，避免旧请求数据触发弹窗
      _expectedPageIndex: -1
    }
  },
  computed: {
    ...mapState({
      homePopupData: state => state.home.homePopupData,
      homePopupCacheCode: state => state.home.homePopupCacheCode,
      openId: state => state.auth.openId
    }),
    totalImageCount() {
      const html = this.currentLayer?.layerText || ''
      const matches = html.match(/<img\b[^>]*>/gi)
      console.log('🚀 ~ totalImageCount ~ matches:', matches?.length)
      const count = matches ? matches?.length : 0
      return count
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
          this.showCover = false
        }
        this.$emit('pop', v)
        this.$refs.popup?.[v ? 'open' : 'close']?.()
      },
      immediate: true
    },
    homePopupData: {
      handler(v) {
        // 关键校验：数据返回时，检查当前 pageIndex 是否还是期望的那个
        // 不匹配说明用户已切换 tab，丢弃这次数据，不弹窗
        if (this._expectedPageIndex !== this.pageIndex) {
          console.log(`丢弃过期数据：期望 pageIndex=${this.pageIndex}，实际收到 pageIndex=${this._expectedPageIndex} 的数据`)
          return
        }
        if (v && v.length > 0) {
          this.currentIndex = 0
          this.isClosed = false
          this.checkAndShowPopup()
        } else {
          this.show = false
        }
      },
      deep: true,
      immediate: true
    },
    pageIndex: {
      handler(newPageIndex) {
        clearTimeout(this._pageIndexTimer)
        this._pageIndexTimer = setTimeout(() => {
          this.queryPagePopup(newPageIndex)
        }, 500)
      },
      immediate: false
    }
  },

  beforeDestroy() {
    this.clearTimer()
    clearTimeout(this._pageIndexTimer)
  },

  methods: {
    // 父组件 onLoad 完成后调用，确保 openId 就绪再查询
    init() {
      this.queryPagePopup(this.pageIndex)
    },

    async queryPagePopup(pageIndex) {
      if (!this.openId) {
        await this.getOpenId()
      }
      if (!this.queriedPageIndices.has(pageIndex)) {
        this.queriedPageIndices.add(pageIndex)
        // 记录本次「期望展示」的 pageIndex，数据回来时用于校验
        this._expectedPageIndex = pageIndex
        this.$store
          .dispatch('getHomePopup', pageIndex)
          .then(() => {
            console.log(`已查询 pageIndex ${pageIndex} 的弹窗数据`)
          })
          .catch((error) => {
            console.error(`查询 pageIndex ${pageIndex} 弹窗数据失败:`, error)
          })
      }
    },

    handleReady() {
      if (this.totalImageCount === 0) {
        this.showContent = true
      }
    },

    async handleImgLoad() {
      console.log('loaded!!!!!!')
      await sleep(100)
      this.showContent = true
      this.checkContentHeight()
      for (let i = 0; i < 3; i++) {
        await this.checkContentHeight()
        await sleep(400)
      }
    },

    checkContentHeight() {
      uni
        .createSelectorQuery()
        .in(this)
        .select('.inner')
        .boundingClientRect((data) => {
          if (data) {
            const realHeight = data.height
            const maxHeightPx = uni.upx2px(960)
            this.showCover = realHeight > maxHeightPx
          }
        })
        .exec()
    },

    handleScroll(e) {
      const { scrollTop, scrollHeight } = e.detail
      const maxHeightPx = uni.upx2px(960)
      const distanceToBottom = scrollHeight - scrollTop - maxHeightPx
      const isNearBottom = distanceToBottom < 50
      this.showCover = !isNearBottom
    },

    handleGo() {
      const url = this.currentLayer.landingPagePath
      if (url) {
        this.report('home_popup_click:' + url)
        this.go({ url })
        setTimeout(() => {
          this.show = false
        }, 1200)
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
        this.$store.commit('setHomePopupCacheCode', currentObjectCode)
        setTimeout(() => {
          this.show = true
        }, 500)
        return
      }
      this.closePopup()
    },

    handleClose() {
      this.submitAndNextPopup()
    },

    async submitAndNextPopup() {
      if (!this.currentLayer) {
        this.closePopup()
        return
      }
      if (!this.openId) {
        await this.getOpenId()
      }
      if (!this.openId) {
        this.switchToNextPopup()
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
      this.showCover = false
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
  width: 624rpx;
  overflow: hidden;
  border-radius: 12rpx;

  image {
    display: block;
  }
  .loading {
    top: -80rpx;
    width: 100rpx;
    height: 100rpx;
    background: white;
    border-radius: 14rpx;
    @include flex-center;
    @include position-center-x;
    img {
      width: 60rpx;
      height: 60rpx;
    }
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
.inner {
  color: white;
  text-align: center;
}
.close {
  @include position-center-x;

  bottom: -90rpx;
  width: 66rpx;
}
</style>
