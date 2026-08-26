<template>
  <view>
    <panel icon="wrinkle_icon" :score="score.wrinkle" title="衰老">
      <section :desc="wrinkleDesc" :score="scoreInfo.wrinkle_score" title="衰老">
        <baseFace :images="faceImageKeys"></baseFace>
        <view class="button-wrap">
          <btn @tap.native="onOpenModal">衰老性检测图</btn>
        </view>
        <linesGroup :lineWidth="82" :list="scoreDetail"></linesGroup>
      </section>
    </panel>
    <skinDetailModal @cancel="cancelModal" :images="modalImages" overviewTitle="衰老" :score="scoreInfo.wrinkle_score" :useTabs="tabs" v-if="modalVisible"></skinDetailModal>
  </view>
</template>

<script>
import panel from '../panel/index'
import section from '../section/index'
import btn from '../button/index'
import baseFace from '../baseFaceImage/index'
import linesGroup from '../linesGroup/index'
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
    linesGroup,
    skinDetailModal
  },
  data() {
    return {
      scoreDetail: [],
      faceImageKeys: '',
      modalVisible: false,
      modalImages: ['texture_enhanced_lines', 'origin'],
      tabs: ['全脸'],

      scoreInfo: {
        wrinkle_score: ''
      },

      wrinkleDesc: ''
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
    getColorBarDetail: function getColorBarDetail(data) {
      var _data$skin_analyze = data.skin_analyze
      var forehead_wrinkle_info = _data$skin_analyze.forehead_wrinkle_info
      var left_eye_wrinkle_info = _data$skin_analyze.left_eye_wrinkle_info
      var right_eye_wrinkle_info = _data$skin_analyze.right_eye_wrinkle_info
      var left_crowsfeet_wrinkle_info = _data$skin_analyze.left_crowsfeet_wrinkle_info
      var right_crowsfeet_wrinkle_info = _data$skin_analyze.right_crowsfeet_wrinkle_info
      var glabella_wrinkle_info = _data$skin_analyze.glabella_wrinkle_info
      var left_nasolabial_wrinkle_info = _data$skin_analyze.left_nasolabial_wrinkle_info
      var right_nasolabial_wrinkle_info = _data$skin_analyze.right_nasolabial_wrinkle_info
      var left_cheek_wrinkle_info = _data$skin_analyze.left_cheek_wrinkle_info
      var right_cheek_wrinkle_info = _data$skin_analyze.right_cheek_wrinkle_info
      var left_mouth_wrinkle_info = _data$skin_analyze.left_mouth_wrinkle_info
      var right_mouth_wrinkle_info = _data$skin_analyze.right_mouth_wrinkle_info
      var defaultValue = {
        wrinkle_score: 0,
        wrinkle_severity_level: 0
      }
      forehead_wrinkle_info = forehead_wrinkle_info || defaultValue
      left_eye_wrinkle_info = left_eye_wrinkle_info || defaultValue
      right_eye_wrinkle_info = right_eye_wrinkle_info || defaultValue
      left_crowsfeet_wrinkle_info = left_crowsfeet_wrinkle_info || defaultValue
      right_crowsfeet_wrinkle_info = right_crowsfeet_wrinkle_info || defaultValue
      glabella_wrinkle_info = glabella_wrinkle_info || defaultValue
      left_nasolabial_wrinkle_info = left_nasolabial_wrinkle_info || defaultValue
      right_nasolabial_wrinkle_info = right_nasolabial_wrinkle_info || defaultValue
      left_cheek_wrinkle_info = left_cheek_wrinkle_info || defaultValue
      right_cheek_wrinkle_info = right_cheek_wrinkle_info || defaultValue
      left_mouth_wrinkle_info = left_mouth_wrinkle_info || defaultValue
      right_mouth_wrinkle_info = right_mouth_wrinkle_info || defaultValue
      return [
        {
          title: '抬头纹',
          key: 'forehead',
          score: forehead_wrinkle_info.wrinkle_score
        },
        {
          title: '眉间纹',
          key: 'glabella',
          score: glabella_wrinkle_info.wrinkle_score
        },
        {
          title: '鱼尾纹',
          key: 'crowsfeet',
          score: Math.max(left_crowsfeet_wrinkle_info.wrinkle_score, right_crowsfeet_wrinkle_info.wrinkle_score)
        },
        {
          title: '眼角纹',
          key: 'eye',
          score: Math.max(left_eye_wrinkle_info.wrinkle_score, right_eye_wrinkle_info.wrinkle_score)
        },
        {
          title: '法令纹',
          key: 'nasolabial',
          score: Math.max(left_nasolabial_wrinkle_info.wrinkle_score, right_nasolabial_wrinkle_info.wrinkle_score)
        },
        {
          title: '面部纹路',
          key: 'cheek',
          score: Math.max(left_cheek_wrinkle_info.wrinkle_score, right_cheek_wrinkle_info.wrinkle_score)
        },
        {
          title: '嘴角纹',
          key: 'mouth',
          score: Math.max(left_mouth_wrinkle_info.wrinkle_score, right_mouth_wrinkle_info.wrinkle_score)
        }
      ]
    },
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
        var score_info = app.globalData.ceceData.skin_analyze.score_info
        var scoreInfo = score_info
        var score = (0, _copywriting.getKey)(scoreInfo.wrinkle_score)
        var scoreDetail = this.getColorBarDetail(app.globalData.ceceData)
        this.setData({
          scoreInfo: scoreInfo,
          wrinkleDesc: _copywriting.default.wrinkle[score],
          faceImageKeys: scoreDetail.map(function (item) {
            var score = (0, _copywriting.getKey)(100 - item.score)
            return score > 70 ? '' : 'wrinkle-'.concat(score > 70 ? 70 : score, '-').concat(item.key)
          }),
          scoreDetail: scoreDetail
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
