<template>
  <view class="preview">
    <view class="previewImageWrap">
      <image class="previewImage" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/overview.jpeg"></image>
      <view class="head info">
        <view class="text">额头</view>
        <view class="score">
          <view class="strong" :style="'width: ' + score.total + '%'"></view>
        </view>
      </view>
      <view class="nose info">
        <view class="text">鼻部</view>
        <view class="score">
          <view class="strong" :style="'width: ' + (score.total * 1.1 > 100 ? 100 : score.total * 1.1) + '%'"></view>
        </view>
      </view>
      <view class="eyes info">
        <view class="text">眼部</view>
        <view class="score">
          <view class="strong" :style="'width: ' + score.eyes + '%'"></view>
        </view>
      </view>
      <view class="face info">
        <view class="text">脸颊</view>
        <view class="score">
          <view class="strong" :style="'width: ' + score.total + '%'"></view>
        </view>
      </view>
      <view class="lips info">
        <view class="text">唇颊</view>
        <view class="score">
          <view class="strong" :style="'width: ' + (score.total * 1.1 > 100 ? 100 : score.total * 1.1) + '%'"></view>
        </view>
      </view>
    </view>
    <view class="dataPanel">
      <view class="item">
        <view class="content">
          <view class="title">类型</view>
          <view class="value">{{ type.fulltext }}</view>
        </view>
        <view class="pic" :style="'background-color: ' + type.color"></view>
      </view>
      <view class="item">
        <view class="content">
          <view class="title">肤色</view>
          <view class="value">{{ color.title }}</view>
        </view>
        <view class="pic" :style="'background-color: ' + color.color"></view>
      </view>
    </view>
    <view>
      <radar :data="radarData"></radar>
    </view>
    <view class="sumaryTitle">您存在的问题：</view>
    <view class="sumaryDesc" v-for="(item, index) in suggestion" :key="index">{{ item }}</view>
  </view>
</template>

<script>
import radar from '../radar/index'
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
require('../../.@/utils/animation/@babel/runtime/helpers/Arrayincludes')
var _copywriting = require('../copywriting')
var app = getApp()
export default {
  components: {
    radar
  },
  data() {
    return {
      type: {
        fulltext: '',
        color: ''
      },
      color: {
        title: '',
        color: ''
      },
      suggestion: [],
      radarData: []
    }
  },
  /**
   * 组件的属性列表
   */
  props: {
    score: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {},
  created: function () {},
  watch: {
    score: {
      handler: function observer(score) {
        var arr = []
        for (var key in score) {
          if (['total', 'skinType'].includes(key)) {
            continue
          }
          arr.push([_copywriting.overviewSuggestion[key], score[key]])
        }
        arr.sort(function (a, b) {
          return a[1] - b[1]
        })
        var radarData = [
          ['粗糙', score.rough],
          ['衰老', score.wrinkle],
          ['色素', score.melanin],
          ['痤疮', score.acne],
          ['敏感', score.sensitivity],
          ['干油性', score.oily],
          ['眼部', score.eyes]
        ]
        var _app$globalData$data$ = app.globalData.ceceData.skin_analyze
        var skin_type = _app$globalData$data$.skin_type
        var skintone_ita = _app$globalData$data$.skintone_ita
        this.setData({
          suggestion: [arr[0][0], arr[1][0], arr[2][0]],
          radarData: radarData,
          type: _copywriting.skinTypeColors[skin_type.skin_type],
          color: _copywriting.skinColors[skintone_ita.skintone]
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
