<template>
  <view catchtouchmove class="mask">
    <scroll-view class="modal" :scrollY="true">
      <view class="tabs" :style="'margin-top: ' + (styleTop + 12) + 'px'">
        <view @tap="onTabClick" :class="'tab-item ' + (activeTab === item.label ? 'active' : '')" :data-key="item.label" v-for="(item, index) in tabs" :key="index">
          {{ item.label }}
        </view>
      </view>
      <view class="body">
        <view class="wrap">
          <image class="top-left" mode="aspectFill" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/modal/AnimationTipTL.png"></image>
          <image class="top-right" mode="aspectFill" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/modal/AnimationTipBL.png"></image>
          <image class="bottom-left" mode="aspectFill" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/modal/AnimationTipBL.png"></image>
          <image class="bottom-right" mode="aspectFill" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/modal/AnimationTipTL.png"></image>
          <view class="border1">
            <view class="border2">
              <view class="border3">
                <swiper @change="swiperChange" class="swiper" :current="activeDot">
                  <swiper-item class="image-wrap" :itemId="item" v-for="(item, index) in previewImages" :key="index">
                    <view class="image" :style="' width:' + imagePos.width + 'px; height:' + imagePos.height + 'px; left:' + imagePos.left + 'px; top:' + imagePos.top + 'px'">
                      <image class="img" :src="originImage"></image>
                      <image class="img" :src="item"></image>
                    </view>
                  </swiper-item>
                </swiper>
              </view>
            </view>
          </view>
        </view>
        <view class="paginations">
          <view class="pagination">
            <view :class="'dot ' + (activeDot === index ? 'active' : '')" v-for="(item, index) in previewImages" :key="index"></view>
          </view>
          <view class="checkout" v-if="activeTab === '脸颊'">
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
        </view>
      </view>
      <view @tap="close" class="close"></view>
    </scroll-view>
  </view>
</template>

<script>
import detailModalImage from '../detailModalImage/index'
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _objectSpread2 = require('../../.@/utils/animation/@babel/runtime/helpers/objectSpread2')
var _copywriting = require('../copywriting')
var _utils = require('./utils')
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
export default {
  components: {
    detailModalImage
  },
  data() {
    return {
      activeTab: defaultTabs[0].label,
      tabs: defaultTabs,
      degree: '',
      activeDot: 0,
      showLeft: true,
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
        }
      ),

      styleTop: app.globalData.MenuButtonBottom,
      originImage: ''
    }
  },
  /**
   * 组件的属性列表
   */
  props: {
    overviewTitle: String,
    score: {
      type: Number
    },
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
    onTabClick: function onTabClick(e) {
      var tab = e.currentTarget.dataset.key
      var _app$globalData$data$ = app.globalData.ceceData.denselandmark
      var leftFace = _app$globalData$data$.leftFace
      var head = _app$globalData$data$.head
      var nose = _app$globalData$data$.nose
      var imagePos = this.imagePos
      if (tab === '脸颊') {
        imagePos = (0, _utils.calcImagePos)(leftFace, this.imageSize)
      } else if (tab === '鼻子') {
        imagePos = (0, _utils.calcImagePos)(nose, this.imageSize)
      } else if (tab === '额头') {
        imagePos = (0, _utils.calcImagePos)(head, this.imageSize)
      } else {
        imagePos = (0, _utils.calcImagePos)(
          _objectSpread2(
            {
              x: 0,
              y: 0
            },
            this.imageSize
          ),
          this.imageSize
        )
      }
      this.setData({
        activeTab: tab,
        activeDot: 0,
        showLeft: true,
        imagePos: imagePos
      })
    },
    close: function close() {
      this.$emit('cancel')
    },
    swiperChange: function swiperChange(e) {
      this.setData({
        activeDot: e.detail.current
      })
    },
    checkout: function checkout() {
      var showLeft = !this.showLeft
      var imagePos = this.imagePos
      var _app$globalData$data$2 = app.globalData.ceceData.denselandmark
      var leftFace = _app$globalData$data$2.leftFace
      var rightFace = _app$globalData$data$2.rightFace
      if (showLeft) {
        imagePos = (0, _utils.calcImagePos)(leftFace, this.imageSize)
      } else {
        imagePos = (0, _utils.calcImagePos)(rightFace, this.imageSize)
      }
      this.setData({
        showLeft: showLeft,
        imagePos: imagePos
      })
    }
  },
  created: function () {},
  watch: {
    score: {
      handler: function observer(score) {
        this.setData({
          degree: (0, _copywriting.getDegree)(score)
        })
      },

      immediate: true
    },

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
        this.onTabClick({
          currentTarget: {
            dataset: {
              key: tabs[0].label
            }
          }
        })
        this.setData({
          tabs: tabs
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
          imagePos: (0, _utils.calcImagePos)(
            _objectSpread2(
              {
                x: 0,
                y: 0
              },
              app.globalData.originImageSize
            ),
            app.globalData.originImageSize
          ),
          originImage: app.globalData.faceMaps.origin,
          imageSize: app.globalData.originImageSize
        })
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
