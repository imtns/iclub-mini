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

// compponents/facialResult/nose/index.ts
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
      var nose_type = app.globalData.ceceData.facial_features.nose.nose_type
      var mouth_type = app.globalData.ceceData.facial_features.mouth.mouth_type
      var copywritings = [
        {
          title: _copywriting.resultLocale[nose_type],
          desc: _copywriting.noseText[nose_type]
        },
        {
          title: _copywriting.resultLocale[mouth_type],
          desc: _copywriting.lipText[mouth_type]
        }
      ]
      var images = [nose_type, mouth_type]
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
