<template>
  <view>
    <panel icon="acne_icon" :score="score.acne" title="痤疮">
      <section :desc="desc" :score="scoreInfo.acne_score" title="痤疮">
        <view class="content">
          <image class="base" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/acne.jpeg"></image>
          <view class="side">
            <view class="item">
              <view class="image image-1"></view>
              <view class="text">I级</view>
            </view>
            <view class="item">
              <image class="image image-2"></image>
              <view class="text">II级</view>
            </view>
            <view class="item">
              <image class="image image-3"></image>
              <view class="text">III级</view>
            </view>
            <view class="item">
              <image class="image image-4"></image>
              <view class="text">IV级</view>
            </view>
          </view>
        </view>
        <view class="button-wrap">
          <btn @tap.native="onOpenModal">痤疮检测图</btn>
        </view>
      </section>
    </panel>
    <skinDetailModal @cancel="cancelModal" :images="modalImages" overviewTitle="痤疮" :score="scoreInfo.acne_score" v-if="modalVisible"></skinDetailModal>
  </view>
</template>

<script>
import panel from '../panel/index'
import section from '../section/index'
import btn from '../button/index'
import skinDetailModal from '../skinDetailModal/index'
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _copywriting = _interopRequireWildcard(require('../copywriting'))
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') {
    return null
  }
  var cacheBabelInterop = new WeakMap()
  var cacheNodeInterop = new WeakMap()
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop
  })(nodeInterop)
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return {
      default: obj
    }
  }
  var cache = _getRequireWildcardCache(nodeInterop)
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}
var app = getApp()
export default {
  components: {
    panel,
    section,
    btn,
    skinDetailModal
  },
  data() {
    return {
      scoreInfo: {
        acne_score: ''
      },
      modalVisible: false,
      desc: {},
      modalImages: ['roi_outline_map', 'origin']
    }
  },
  /**
   * 组件的属性列表
   */
  props: {
    score: {
      type: Object
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onOpenModal: function onOpenModal() {
      this.setData({
        modalVisible: true
      })
    },
    cancelModal: function cancelModal() {
      this.setData({
        modalVisible: false
      })
    }
  },
  created: function () {},
  watch: {
    score: {
      handler: function observer() {
        var scoreInfo = app.globalData.ceceData.skin_analyze.score_info
        this.setData({
          scoreInfo: scoreInfo,
          desc: _copywriting.default.acne[(0, _copywriting.getKey)(scoreInfo.acne_score)]
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
