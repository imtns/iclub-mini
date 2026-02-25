<template>
  <view>
    <panel noTag icon="skin_type_icon" :showScore="false" title="肤色">
      <section :desc="copywriting" :label="skinColors[skintoneITA].title" title="肤色">
        <colorsExample :active="colors[skintoneITA].title" :colors="colors"></colorsExample>
      </section>
    </panel>
  </view>
</template>

<script>
import panel from '../panel/index'
import section from '../section/index'
import colorsExample from '../colorsExample/index'
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _copywriting = require('../copywriting')
var app = getApp()
export default {
  components: {
    panel,
    section,
    colorsExample
  },
  data() {
    return {
      colors: _copywriting.skinColors.slice(0, 6),
      skinColors: _copywriting.skinColors,
      copywriting: {},
      skintoneITA: '',
      title: ''
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
      var skintoneITA = app.globalData.ceceData.skin_analyze.skintone_ita.skintone
      this.setData({
        skintoneITA: skintoneITA,
        copywriting: _copywriting.skinColorCopywriting[skintoneITA]
      })
    },

    showModal: function showModal() {}
  },
  created: function () {}
}
</script>
<style>
@import './index.css';
</style>
