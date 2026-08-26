<template>
  <view>
    <panel icon="oily_intensity_icon" :score="score.oily" title="干油性">
      <section :desc="skinTypeDesc" :showLabel="false" title="肤质">
        <colorsExample :active="skinType" :colors="skinTypeColors"></colorsExample>
      </section>
      <section :desc="oilyDesc" :score="scoreInfo.oily_intensity_score" title="油光">
        <view class="oily-wrap">
          <baseFace :images="oilyImageKeys"></baseFace>
          <view class="text t">T区</view>
          <view class="text left">左脸颊</view>
          <view class="text right">右脸颊</view>
          <view class="text jaw">下巴</view>
        </view>
        <view class="button-wrap">
          <btn @tap.native="onOilyClick">油光检测图</btn>
        </view>
        <linesGroup :list="oilyDetail"></linesGroup>
      </section>
      <section :desc="waterDesc" :score="scoreInfo.water_score" title="水分">
        <colorsExample :active="waterColors[waterLevel].title" :colors="waterColors"></colorsExample>
        <view class="button-wrap">
          <btn @tap.native="onWaterClick">水分检测图</btn>
        </view>
        <linesGroup color="#7FE2FF" colorBackgroundLine="#E5F9FF" :list="waterDetail"></linesGroup>
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
import colorsExample from '../colorsExample/index'
import linesGroup from '../linesGroup/index'
import skinDetailModal from '../skinDetailModal/index'
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _createForOfIteratorHelper2 = require('../../.@/utils/animation/@babel/runtime/helpers/createForOfIteratorHelper')
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
    colorsExample,
    linesGroup,
    skinDetailModal
  },
  data() {
    return {
      scoreInfo: {
        water_score: 0,
        oily_intensity_score: 0
      },

      skinTypeColors: ['中性', '干性', '混合', '油性'].map(function (i) {
        var _iterator = _createForOfIteratorHelper2(_copywriting.skinTypeColors)
        var _step
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var t = _step.value
            if (t.title === i) {
              return t
            }
          }
        } catch (err) {
          console.log('CatchClause', err)
          console.log('CatchClause', err)
          _iterator.e(err)
        } finally {
          _iterator.f()
        }
      }),

      waterColors: _copywriting.waterColors,
      waterLevel: 0,
      oilyImageKeys: ['oily-line'],
      oilyDetail: [],
      waterDetail: [],
      skinTypeDesc: {},
      oilyDesc: {},
      waterDesc: {},
      modalVisible: false,
      modalTitle: '',
      modalScore: '',
      modalImages: [],
      skinType: '',
      title: '',
      useTabs: []
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
    onWaterClick: function onWaterClick() {
      this.setData({
        modalVisible: true,
        modalTitle: '水分',
        modalScore: this.scoreInfo.water_score,
        modalImages: ['water_area', 'origin']
      })
    },
    onOilyClick: function onOilyClick() {
      this.setData({
        modalVisible: true,
        modalTitle: '油光',
        modalScore: this.scoreInfo.oily_intensity_score,
        modalImages: ['texture_enhanced_oily_area', 'origin']
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
        var _app$globalData$data$ = app.globalData.ceceData.skin_analyze.oily_intensity
        var chin_area = _app$globalData$data$.chin_area
        var left_cheek = _app$globalData$data$.left_cheek
        var right_cheek = _app$globalData$data$.right_cheek
        var t_zone = _app$globalData$data$.t_zone
        var _app$globalData$data$2 = app.globalData.ceceData.skin_analyze.water
        var water_forehead = _app$globalData$data$2.water_forehead
        var water_leftcheek = _app$globalData$data$2.water_leftcheek
        var water_rightcheek = _app$globalData$data$2.water_rightcheek
        var oilyDetail = [
          {
            title: '左脸颊',
            score: ((left_cheek.intensity + 1) / 3) * 100
          },
          {
            title: '右脸颊',
            score: ((right_cheek.intensity + 1) / 3) * 100
          },
          {
            title: 'T区',
            score: ((t_zone.intensity + 1) / 3) * 100
          },
          {
            title: '下巴',
            score: ((chin_area.intensity + 1) / 3) * 100
          }
        ]
        var waterDetail = [
          {
            title: '左脸颊',
            score: water_leftcheek.area * 100
          },
          {
            title: '右脸颊',
            score: water_rightcheek.area * 100
          },
          {
            title: '额头',
            score: water_forehead.area * 100
          }
        ]
        var waterLevel = 0
        if (scoreInfo.water_score < 90) {
          waterLevel = 1
        }
        if (scoreInfo.water_score < 70) {
          waterLevel = 2
        }
        if (scoreInfo.water_score < 50) {
          waterLevel = 3
        }
        this.setData({
          scoreInfo: scoreInfo,
          waterLevel: waterLevel,
          oilyDesc: _copywriting.default.oily_intensity[(0, _copywriting.getKey)(scoreInfo.oily_intensity_score)],
          waterDesc: _copywriting.default.water[(0, _copywriting.getKey)(scoreInfo.water_score)],
          oilyImageKeys: [(0, _copywriting.getKey)(scoreInfo.oily_intensity_score) === 90 ? '' : 'oily-'.concat((0, _copywriting.getKey)(scoreInfo.oily_intensity_score)), 'oily-line'],
          oilyDetail: oilyDetail,
          waterDetail: waterDetail,
          skinTypeDesc: _copywriting.default.skin_type[app.globalData.ceceData.skin_analyze.skin_type.skin_type],
          skinType: _copywriting.skinTypeColors[app.globalData.ceceData.skin_analyze.skin_type.skin_type].title
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
