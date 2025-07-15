<template>
  <view>
    <x-btn type="primary" @click="TestAPI">是否登录：{{ isLogin }}</x-btn>
    <span v-if="isLogin">昵称：{{ userInfo.nickName }}</span>
    <x-btn type="primary" @click="showDrawer">右侧弹出 显示Drawer</x-btn>
    <uni-drawer ref="showRight" mode="right" :mask-click="false">
      <scroll-view style="height: 100%" scroll-y="true">
        <button type="primary" @click="closeDrawer">关闭Drawer</button>
        <view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
      </scroll-view>
    </uni-drawer>
    <x-btn @click="toast" type="primary">Toast提示</x-btn>
    <span style="color: red">页面toast不要用wx.showLoading，要用这个，页面添加x-toast 标签</span>
    <x-btn @click="open">打开弹窗</x-btn>
    <uni-popup ref="popup" border-radius="10px 10px 0 0">
      <div
        style="display: flex; align-items: center; justify-content: center; width: 300px; height: 200px; background-color: #fff">
        这是弹窗</div>
    </uni-popup>
    <x-btn @click="maidian">埋点记录</x-btn>
    <button type="primary" open-type="share" @click="handleShareClick">按钮分享</button>
    <span style="color: red">页面所有加载和点击要记录埋点操作</span>
    <x-btn @click="goAddress">跳转选择地址页面</x-btn>
    <div v-if="addressInfo">地址信息：{{ JSON.stringify(addressInfo) }}</div>

    <x-btn @click="handleCaptcha">接口滑块示例</x-btn>
    <x-toast ref="toast" />
  </view>
</template>

<script>
import { apiDianzan } from "./api";
import { mapState } from "vuex";
export default {
  data () {
    return {
      responseData: null,
      addressInfo: "",
      /**
       * 注意~！！！ 分享的时候不要在页面添加
       * onShareAppMessage和onShareTimeline 方法，否则分享的时候拉新逻辑会丢失
       * 如果要分享，在页面data里添加shareInfo对象，在shareInfo里定义分享的标题、路径、图片
       */
      shareInfo: {
        title: "嗨嗨",
        path: "/pages-sub/ai-ceyan/index",
        imageUrl: "https://udstatic.imeik.com/compressed/1751595118141_images.jpeg",
      },
    };
  },
  onShow () {
    // 从地址页面选择完地址返回页面后会读取到地址信息
    const addressInfo = this.lsGet("address");
    if (addressInfo) {
      this.addressInfo = addressInfo;
      this.lsDel("address");
    }
  },
  computed: {
    ...mapState(["isLogin", "userInfo"]),
  },
  methods: {
    showToast (msg) {
      this.$refs.toast.show({ message: msg });
    },

    handleShareClick () {
      // 如果页面有按钮点击分享，按钮点击分享的title在shareInfo的buttonTitle里定义
      this.shareInfo = {
        ...this.shareInfo,
        buttonTitle: "这是按钮点击的分享标题",
        path: "/pages-sub/ai-ceyan/index",
        // 按钮点击时候的分享图片
        buttonImage: "https://udstatic.imeik.com/compressed/1751595501058_52e7dd424e57ad14f1dc8460962e33791c3ad6e04e5074417c2f73d49148c4_640.jpeg",
      };
    },
    handleCaptcha () {
      if (!this.isLogin) {
        this.goLogin();
        return;
      }
      apiDianzan({
        contentCodeList: ["1750082459933716482"],
        dealType: "1",
        methodName: "handleCaptcha", // 有的接口操作的时候，会弹滑块弹窗验证，需要在提交的object里添加methodName字段，用于验证成功后，回调自动执行接口
      }).then((res) => {
        this.showToast("点赞成功");
      });
    },
    goAddress () {
      uni.navigateTo({
        url: "/pages/mine/address/list",
      });
    },
    maidian () {
      // 比如签到,点击就记录名称
      // 其他点击同样操作记录
      this.report("嗨嗨:签到点击");
    },
    toast () {
      this.showToast("提示信息");
    },
    async TestAPI () {
      if (!this.isLogin) {
        this.goLogin();
      }
    },
    open () {
      // 参考https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("center");
    },
    showDrawer () {
      this.$refs.showRight.open();
    },
    closeDrawer () {
      this.$refs.showRight.close();
    },
  },
};
</script>
<style lang="scss">
button {
  margin: 5px 0;
}
</style>
