<template>
  <div class="container">
    <div style="color: red;font-size: 26px">
      不要在main.js和App.vue 加载任何第三方UI库，所有组件请在pages-sub/ai-ceyan/components实现，样式，api，逻辑，均放在pages-sub/ai-ceyan目录下
    </div>
    <button @click="go">跳转AI测颜</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    go() {
      wx.navigateTo({
        url: '/pages-sub/ai-ceyan/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
