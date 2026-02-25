<template>
  <view>
    <panel icon="eyes_icon" :score="score.eyes" title="眼部">
      <section :desc="desc" :score="scoreInfo.dark_circle_score" title="眼部">
        <view class="content">
          <view class="imageWrap">
            <image class="base" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/eyes-base.jpeg"></image>
            <image class="mask" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/eyes-30.png"></image>
            <image class="mask" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/eyes-70.png"></image>
            <image class="mask" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/eyes-50.png"></image>
          </view>
          <view class="side">
            <view class="item">
              <view class="icon icon-1"></view>
              <view class="text">色素型</view>
            </view>
            <view class="item">
              <view class="icon icon-2"></view>
              <view class="text">血管型</view>
            </view>
            <view class="item">
              <view class="icon icon-3"></view>
              <view class="text">结构型</view>
            </view>
          </view>
        </view>
        <view class="button-wrap">
          <btn @tap.native="onOpenModal">眼部检测图</btn>
        </view>
        <linesGroup :lineWidth="75" :list="scoreDetail"></linesGroup>
        <view class="ringGroup">
          <ring color="#ffeae1" :degree="eyesDegree.pigment" strongColor="rgba(255, 152, 104, 1)" title="色素型"></ring>
          <ring color="#eddee5" :degree="eyesDegree.rete" strongColor="rgba(165, 87, 124, 1)" title="血管型"></ring>
          <ring color="#ededee" :degree="eyesDegree.structural" strongColor="rgba(164, 164, 170, 1)" title="结构型"></ring>
        </view>
      </section>
    </panel>
    <skinDetailModal @cancel="cancelModal" :eyesDegree="eyesDegree" :images="modalImages" overviewTitle="眼部" :score="scoreInfo.dark_circle_score" v-if="modalVisible"></skinDetailModal>
  </view>
</template>

<script>
import panel from '../panel/index'
import section from '../section/index'
import btn from '../button/index'
import linesGroup from '../linesGroup/index'
import skinDetailModal from '../skinEyesDetailModal/index'
import ring from '../ring/index'
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
    linesGroup,
    skinDetailModal,
    ring
  },
  data() {
    return {
      scoreInfo: {
        dark_circle_score: ''
      },
      eyesImageKey: '',
      scoreDetail: [],
      eyesDegree: {
        rete: 0,
        pigment: 0,
        structural: 0
      },
      modalVisible: false,
      desc: {},
      modalImages: ['origin']
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
        var _app$globalData$data$ = app.globalData.ceceData.skin_analyze
        var left_dark_circle_rete = _app$globalData$data$.left_dark_circle_rete
        var right_dark_circle_rete = _app$globalData$data$.right_dark_circle_rete
        var left_dark_circle_pigment = _app$globalData$data$.left_dark_circle_pigment
        var right_dark_circle_pigment = _app$globalData$data$.right_dark_circle_pigment
        var left_dark_circle_structural = _app$globalData$data$.left_dark_circle_structural
        var right_dark_circle_structural = _app$globalData$data$.right_dark_circle_structural
        this.setData({
          scoreInfo: scoreInfo,
          desc: _copywriting.default.dark_circle[(0, _copywriting.getKey)(scoreInfo.dark_circle_score)],
          eyesDegree: {
            rete: Math.max(left_dark_circle_rete.value, right_dark_circle_rete.value),
            pigment: Math.max(left_dark_circle_pigment.value, right_dark_circle_pigment.value),
            structural: Math.max(left_dark_circle_structural.value, right_dark_circle_structural.value)
          },
          eyesImageKey: (0, _copywriting.getKey)(scoreInfo.dark_circle_score) === 90 ? '' : 'eyes-'.concat((0, _copywriting.getKey)(scoreInfo.dark_circle_score)),
          scoreDetail: [
            {
              title: '综合严重程度',
              score: 100 - scoreInfo.dark_circle_score
            }
          ]
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
