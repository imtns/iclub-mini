<template>
  <view catchtouchmove class="mask">
    <scroll-view class="modal" :scrollY="true">
      <view class="body" :style="'margin-top: ' + (styleTop + 12) + 'px'">
        <view class="wrap">
          <view class="swiper">
            <view class="image-wrap" :itemId="item" v-for="(item, index) in previewImages" :key="index">
              <image class="image" :src="item" :style="' width: ' + imagePos.width + 'px;  height: ' + imagePos.height + 'px;  left: ' + imagePos.left + 'px; top:  ' + imagePos.top + 'px'"></image>
            </view>
          </view>
        </view>
        <view class="paginations">
          <view class="pagination">
            <view :class="'dot ' + (activeDot === index ? 'active' : '')" v-for="(item, index) in images" :key="index"></view>
          </view>
          <view class="checkout">
            <text class="text">{{ showLeft ? '左' : '右' }}</text>
            <image @tap="checkout" class="icon" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/checkout.png"></image>
          </view>
        </view>
        <view class="overview">
          <view class="title">{{ overviewTitle }}综合严重程度</view>
          <view class="line-wrap">
            <view class="line">
              <view class="strong" :style="'width: ' + (100 - score) + '%'"></view>
            </view>
            <view class="label">
              <view :class="'item ' + (score >= 70 ? 'active' : '')">轻度</view>
              <view :class="'item ' + (score < 70 && score >= 50 ? 'active' : '')">中度</view>
              <view :class="'item ' + (score < 50 ? 'active' : '')">重度</view>
            </view>
          </view>
          <view class="ringGroup">
            <ring color="#ffeae1" :degree="eyesDegree.pigment" strongColor="rgba(255, 152, 104, 1)" title="色素型"></ring>
            <ring color="#eddee5" :degree="eyesDegree.rete" strongColor="rgba(165, 87, 124, 1)" title="血管型"></ring>
            <ring color="#ededee" :degree="eyesDegree.structural" strongColor="rgba(164, 164, 170, 1)" title="结构型"></ring>
          </view>
        </view>
      </view>
      <view @tap="close" class="close"></view>
    </scroll-view>
  </view>
</template>

<script>
import ring from '../ring/index'
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _utils = require('../skinDetailModal/utils')
var app = getApp()
var defaultTabs = [
  {
    label: '全脸'
  },
  {
    label: '脸颊'
  },
  {
    label: '鼻子'
  },
  {
    label: '额头'
  }
]
var _wx$getSystemInfoSync = uni.getSystemInfoSync()
var windowWidth = _wx$getSystemInfoSync.windowWidth
var container = {
  width: windowWidth * 0.5,
  height: windowWidth * 0.5
}
export default {
  components: {
    ring
  },
  data() {
    return {
      activeTab: defaultTabs[0].label,
      tabs: defaultTabs,
      activeDot: 0,
      previewImages: [],

      imageSize: {
        width: 0,
        height: 0
      },

      imagePos: (0, _utils.calcImagePos)(
        {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        {
          width: 0,
          height: 0
        },
        container
      ),

      styleTop: app.globalData.MenuButtonBottom,
      showLeft: false,
      originImage: ''
    }
  },
  /**
   * 组件的属性列表
   */
  props: {
    score: Number,
    overviewTitle: String,
    eyesDegree: Object,
    useTabs: {
      type: Array
    },
    images: {
      type: Array
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close: function close() {
      this.$emit('cancel')
    },
    checkout: function checkout() {
      var showLeft = !this.showLeft
      var imagePos = this.imagePos
      var _app$globalData$data$ = app.globalData.ceceData.denselandmark
      var leftEye = _app$globalData$data$.leftEye
      var rightEye = _app$globalData$data$.rightEye
      if (showLeft) {
        imagePos = (0, _utils.calcImagePos)(leftEye, this.imageSize, container)
      } else {
        imagePos = (0, _utils.calcImagePos)(rightEye, this.imageSize, container)
      }
      this.setData({
        showLeft: showLeft,
        imagePos: imagePos
      })
    }
  },
  created: function () {},
  watch: {
    useTabs: {
      handler: function observer(useTabs) {
        var tabs =
          useTabs && useTabs.length
            ? useTabs.map(function (i) {
                return {
                  label: i
                }
              })
            : defaultTabs
        this.setData({
          tabs: tabs,
          activeTab: tabs[0].label
        })
      },

      immediate: true,
      deep: true
    },

    images: {
      handler: function observer(image) {
        var previewImages = image
          .map(function (key) {
            return app.globalData.faceMaps[key]
          })
          .filter(Boolean)
        this.setData({
          previewImages: previewImages,
          originImage: app.globalData.faceMaps.origin,
          imageSize: app.globalData.originImageSize
        })
        this.checkout()
      },

      immediate: true,
      deep: true
    }
  }
}
</script>
<style>
@import './index.css';
</style>
