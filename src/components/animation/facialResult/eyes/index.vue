<template>
  <view>
    <panel :copywritings="copywritings" :images="images"></panel>
  </view>
</template>

<script>
import panel from '../panel/index'
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _copywriting = require('../copywriting')
var app = getApp()
export default {
  components: {
    panel
  },
  data() {
    return {
      images: [],
      copywritings: []
    }
  },
  mounted() {
    // 处理小程序 attached 生命周期
    this.attached()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    attached: function attached() {
      var eyebrow_type = app.globalData.ceceData.facial_features.eyebrow.eyebrow_type
      var eyes_type = app.globalData.ceceData.facial_features.eyes.eyes_type
      var copywritings = [
        {
          title: _copywriting.resultLocale[eyebrow_type],
          desc: _copywriting.eyebrowText[eyebrow_type]
        },
        {
          title: _copywriting.resultLocale[eyes_type],
          desc: _copywriting.eyesText[eyes_type]
        }
      ]
      var images = [eyebrow_type, eyes_type]
      this.setData({
        images: images,
        copywritings: copywritings
      })
    }
  },
  created: function () {}
}
</script>
<style>
@import './index.css';
</style>
