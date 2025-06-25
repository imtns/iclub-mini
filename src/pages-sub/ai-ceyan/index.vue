<template>
  <view>
    <button type="primary" @click="TestAPI">测试请求</button>
    {{ responseData }}
    <button type="primary" @click="showDrawer">右侧弹出 显示Drawer</button>
    <uni-drawer ref="showRight" mode="right" :mask-click="false">
      <scroll-view style="height: 100%" scroll-y="true">
        <button type="primary" @click="closeDrawer">关闭Drawer</button>
        <view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
      </scroll-view>
    </uni-drawer>
    <button @click="open">打开弹窗</button>
    <uni-popup ref="popup" border-radius="10px 10px 0 0">
      <div style="display: flex; align-items: center; justify-content: center; width: 300px; height: 200px; background-color: #fff">这是弹窗</div>
    </uni-popup>
  </view>
</template>

<script>
import { testAPI } from './api'
export default {
  data() {
    return {
      responseData: null
    }
  },
  methods: {
    async TestAPI() {
      try {
        const res = await testAPI()
        this.responseData = JSON.stringify(res)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    open() {
      // 参考https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('center')
    },
    showDrawer() {
      this.$refs.showRight.open()
    },
    closeDrawer() {
      this.$refs.showRight.close()
    }
  }
}
</script>
