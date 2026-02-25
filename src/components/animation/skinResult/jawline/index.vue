<template>
  <view>
    <panel icon="jawline_icon" :score="levelScore" :showScore="false" title="下颌线提升">
      <view class="section">
        <view class="content">
          <view class="title">
            <text class="text">下颌线程度</text>
            <view class="level great" v-if="levelScore > 90">
              优秀
              <view class="line"></view>
              <image class="icon" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/jawline_great_icon.png"></image>
            </view>
            <view class="level normal" v-else>
              轻度
              <view class="line"></view>
              <image class="icon" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/jawline_normal_icon.png"></image>
            </view>
          </view>
          <view class="faceArea">
            <image class="base" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/jawline.jpeg"></image>
          </view>
          <view class="button-wrap">
            <btn @tap.native="onOpenModal">下颌线检测图</btn>
          </view>
          <view class="angle-wrap">
            <view class="label">下颌线角度</view>
            <view class="value">
              <view class="angle">
                左脸颊：{{ angle.left }}度
                <image class="icon" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/jawline_degree_icon.jpeg"></image>
              </view>
              <view class="angle">
                右脸颊：{{ angle.right }}度
                <image class="icon" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/jawline_degree_icon.jpeg"></image>
              </view>
            </view>
          </view>
          <view class="desc-wrap">
            <view class="title">{{ copywriting.result }}</view>
            <view class="text">{{ copywriting.copywriting }}</view>
          </view>
        </view>
      </view>
    </panel>
    <jawlineDetailModal :angles="angle" @cancel="cancelModal" :images="images" :score="levelScore" v-if="modalVisible"></jawlineDetailModal>
  </view>
</template>

<script>
import panel from '../panel/index'
import section from '../section/index'
import btn from '../button/index'
import linesGroup from '../linesGroup/index'
import jawlineDetailModal from '../jawlineDetailModal/index'
import ring from '../ring/index'
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _copywriting = _interopRequireDefault(require('../copywriting'))
function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj
      }
}
var app = getApp()
export default {
  components: {
    panel,
    section,
    btn,
    linesGroup,
    jawlineDetailModal,
    ring
  },
  data() {
    return {
      modalVisible: false,
      levelScore: 90,
      images: [],
      copywriting: {
        result: '',
        copywriting: ''
      },
      angle: {}
    }
  },
  props: {
    score: {
      type: Object
    }
  },
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
        var _app$globalData$data$
        if (!app.globalData.ceceData) {
          return
        }
        var level = app.globalData.ceceData.skin_analyze.side_result.level || 0
        var levelScore = level > 0 ? 89 : 100
        this.setData({
          levelScore: levelScore,
          copywriting: _copywriting.default.jawline[level],
          angle: (_app$globalData$data$ = app.globalData.ceceData.skin_analyze.side_result) === null || _app$globalData$data$ === void 0 ? void 0 : _app$globalData$data$.angle,
          images: [app.globalData.faceMaps.leftSide, app.globalData.faceMaps.rightSide]
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
