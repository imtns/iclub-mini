<template>
  <view>
    <panel icon="sensitivity_icon" :score="score.sensitivity" title="敏感性">
      <section :desc="desc" :score="scoreInfo.sensitivity_score" title="敏感">
        <baseFace :image="faceImageKey"></baseFace>
        <view class="button-wrap">
          <btn @tap.native="onOpenModal">敏感性检测图</btn>
        </view>
      </section>
    </panel>
    <skinDetailModal @cancel="cancelModal" :images="modalImages" overviewTitle="敏感性" :score="scoreInfo.sensitivity_score" v-if="modalVisible"></skinDetailModal>
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
        sensitivity_score: ''
      },
      faceImageKey: '',
      desc: {},
      modalVisible: false,
      modalImages: ['red_area', 'origin']
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
          desc: _copywriting.default.sensitivity[(0, _copywriting.getKey)(scoreInfo.sensitivity_score)],
          faceImageKey: (0, _copywriting.getKey)(scoreInfo.sensitivity_score) === 90 ? '' : 'sensitivity-'.concat((0, _copywriting.getKey)(scoreInfo.sensitivity_score))
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
