<template>
  <view>
    <panel icon="rough_icon" :score="score.rough" title="粗糙">
      <section :desc="poresDesc" :score="scoreInfo.pores_score" title="毛孔">
        <view class="pores">
          <view class="item">
            <image class="image" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/pores.jpeg"></image>
            <view class="title">{{ poresCount }}</view>
            <view class="desc">毛孔个数</view>
          </view>
          <view class="item">
            <image class="image" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/blackhead.jpeg"></image>
            <view class="title">{{ poresDegree }}</view>
            <view class="desc">毛孔程度</view>
          </view>
        </view>
        <view class="button-wrap">
          <btn @tap.native="onPoresClick">毛孔检测图</btn>
        </view>
      </section>
      <section :desc="blackheadDesc" :score="scoreInfo.blackhead_score" title="黑头">
        <view class="blackhead">
          <view class="item">
            <image class="image" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/pores.jpeg"></image>
            <view class="title">{{ blackheadCount }}</view>
            <view class="desc">黑头个数</view>
          </view>
          <view class="item">
            <image class="image" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/blackhead.jpeg"></image>
            <view class="title">{{ blackheadDegree }}</view>
            <view class="desc">黑头程度</view>
          </view>
        </view>
        <view class="button-wrap">
          <btn @tap.native="onBlackheadClick">黑头检测图</btn>
        </view>
      </section>
      <section :desc="wrinkleDesc" :score="scoreInfo.wrinkle_score" title="纹理">
        <baseFace :image="wrinkleImageKey"></baseFace>
        <view class="button-wrap">
          <btn @tap.native="onWrinkleClick">纹理检测图</btn>
        </view>
      </section>
    </panel>
    <skinDetailModal @cancel="cancelModal" :images="modalImages" :overviewTitle="modalTitle" :score="modalScore" :useTabs="useTabs" v-if="modalVisible"></skinDetailModal>
  </view>
</template>

<script>
import panel from '../panel/index'
import section from '../section/index'
import btn from '../button/index'
import baseFace from '../baseFaceImage/index'
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
    baseFace,
    skinDetailModal
  },
  data() {
    return {
      scoreInfo: {
        blackhead_score: 0,
        wrinkle_score: 0,
        pores_score: 0
      },

      poresDesc: {},
      blackheadDesc: {},
      wrinkleDesc: {},
      poresDegree: '',
      blackheadDegree: '',
      wrinkleImageKey: '',
      modalVisible: false,
      modalTitle: '',
      modalScore: 0,
      modalImages: [],
      useTabs: undefined,
      poresCount: 0,
      blackheadCount: ''
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
    onBlackheadClick: function onBlackheadClick() {
      this.setData({
        modalVisible: true,
        modalTitle: '黑头',
        modalScore: this.scoreInfo.blackhead_score,
        useTabs: ['鼻子'],
        modalImages: ['texture_enhanced_bw', 'texture_enhanced_blackheads', 'origin']
      })
    },
    onWrinkleClick: function onWrinkleClick() {
      this.setData({
        modalVisible: true,
        modalTitle: '皱纹',
        modalScore: this.scoreInfo.wrinkle_score,
        useTabs: ['全脸'],
        modalImages: ['rough_area', 'origin']
      })
    },
    onPoresClick: function onPoresClick() {
      this.setData({
        modalVisible: true,
        modalTitle: '毛孔',
        modalScore: this.scoreInfo.pores_score,
        useTabs: [],
        modalImages: ['texture_enhanced_bw', 'texture_enhanced_pores', 'origin']
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
        var score_info = app.globalData.ceceData.skin_analyze.score_info
        this.setData({
          scoreInfo: score_info,
          poresCount: Math.round((100 - score_info.pores_score) / 0.05),
          poresDesc: _copywriting.default.pores[(0, _copywriting.getKey)(score_info.pores_score)],
          blackheadCount: Math.round((100 - score_info.blackhead_score) / 0.3),
          blackheadDesc: _copywriting.default.blackhead[(0, _copywriting.getKey)(score_info.blackhead_score)],
          wrinkleDesc: _copywriting.default.wrinkle[(0, _copywriting.getKey)(score_info.wrinkle_score)],
          poresDegree: (0, _copywriting.getDegree)(score_info.pores_score),
          blackheadDegree: (0, _copywriting.getDegree)(score_info.blackhead_score),
          wrinkleImageKey: (0, _copywriting.getKey)(score_info.pores_score) === 90 ? '' : 'pores-'.concat((0, _copywriting.getKey)(score_info.pores_score))
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
