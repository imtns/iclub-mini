<template>
  <div class="container">
    <div style="color: red; font-size: 26px">
      不要在main.js和App.vue
      加载任何第三方UI库/方法，主包会超体积，所有组件请在pages-sub/ai-ceyan/components实现，样式，api，逻辑，均放在pages-sub/ai-ceyan目录下
    </div>
    <div>代码只在ai-ceyan的文件夹里更新哦~</div>
    <x-btn @click="go">跳转AI测颜</x-btn>
  </div>
</template>

<script>
import xBtn from "@/components/x/btn.vue"
export default {
  data () {
    return {};
  },
  components: {
    xBtn
  },
  methods: {
    go () {
      wx.navigateTo({
        url: "/pages-sub/ai-ceyan/home",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
