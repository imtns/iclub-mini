<template>
  <view class="box" :style="{ backgroundImage: `url(${ASSETSURL}home_01.png)` }">
    <!-- 免责说明 -->
    <view class="home_02" :style="{ backgroundImage: `url(${ASSETSURL}home_02.png)` }" @click="home_03 = !home_03">
      <view class="home_03" v-if="home_03">
        <image @click="getReupload" :src="`${ASSETSURL}home_03.png`" style="width: 28rpx; height: 29rpx;"
          mode="aspectFit|aspectFill|widthFix" />
      </view>
      <view class="agreement" @click.stop="openPopupWithCountdown"></view>
    </view>
    <!-- 底部按钮 -->
    <view class="home_btn">
      <view class="home_04" @click="getNav()">
        <image :src="`${ASSETSURL}home_04.png`" style="width: 297rpx; height: 96rpx;"
          mode="aspectFit|aspectFill|widthFix" />
      </view>
      <view class="home_05">
        <button type="primary" open-type="share" hover-class="none" @click="handleShareClick">
          <image :src="`${ASSETSURL}home_05.png`" style="width: 297rpx; height: 96rpx;"
            mode="aspectFit|aspectFill|widthFix" />
        </button>
      </view>
    </view>
    <uni-popup ref="popupShow" border-radius="10px 10px 0 0" @close="beforeDestroy">
      <view class="popupShow" :style="{ backgroundImage: `url(${ASSETSURL}home_06.png)` }">
        <image :src="`${ASSETSURL}home_05.png`" mode="widthFix" />
      </view>
      <view class="popupShowClone" v-if="countdown > 0" :style="{ backgroundImage: `url(${ASSETSURL}home_07.png)` }">
        {{ countdown }}s
      </view>
      <view class="popupShowElse" v-else>
        <view style="margin-right: 17rpx;" @click="$refs.popupShow.close();">
          <image :src="`${ASSETSURL}home_08.png`" mode="widthFix" style="width: 174rpx; height: 96rpx;" />
        </view>
        <view @click="getNav(1)">
          <image :src="`${ASSETSURL}home_09.png`" mode="widthFix" style="width: 330rpx; height: 96rpx;" />
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import xBtn from "@/components/x/btn.vue"
import { testAPI, assistRemind, diagnose } from './api'
import { mapState } from "vuex";
import Tool from './tool/tool.js'
import { upload } from "./upload/upload";
export default {
  data () {
    return {
      ASSETSURL: Tool.ASSETSURL,
      popupShow: false,//弹窗
      home_03: false,//是否勾选免责说明
      shareInfo: {
        title: "嗨嗨",
        path: "/pages-sub/ai-ceyan/index",
        imageUrl: "https://udstatic.imeik.com/compressed/1751595118141_images.jpeg",
      },
      countdown: 15, // 倒计时秒数
      countdownTimer: null, // 计时器引用
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo"]),
  },
  components: {
    xBtn,
  },
  onShow () {
    if (!this.isLogin) {
      this.goLogin();
      return;
    }
    this.intelligentAnimation = false
  },
  methods: {
    getNav (e) {
      console.log(e, '-------=========');
      if (e) {
        uni.navigateTo({
          url: '/pages-sub/ai-ceyan/index',
        })
      } else if (this.home_03) {
        uni.navigateTo({
          url: '/pages-sub/ai-ceyan/index',
        })
      } else {
        uni.showToast({
          title: '请先勾选免责说明',
          icon: 'none'
        })
      }
    },
    handleShareClick () {
      // 如果页面有按钮点击分享，按钮点击分享的title在shareInfo的buttonTitle里定义
      this.shareInfo = {
        ...this.shareInfo,
        // buttonTitle: "这是按钮点击的分享标题123123",
        // path: "/pages-sub/ai-ceyan/index",
        // // 按钮点击时候的分享图片
        // buttonImage: "https://udstatic.imeik.com/compressed/1751595501058_52e7dd424e57ad14f1dc8460962e33791c3ad6e04e5074417c2f73d49148c4_640.jpeg",
      };
    },
    openPopupWithCountdown () {
      this.countdown = 15;
      this.$refs.popupShow.open('center');
      if (this.countdownTimer) clearInterval(this.countdownTimer);
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--;
        } else {
          this.countdown = 0;
          clearInterval(this.countdownTimer);
          this.countdownTimer = null;
          // 可选：倒计时结束后自动关闭弹窗
          // this.$refs.popupShow.close();
        }
      }, 1000);
    },
  },
  beforeDestroy () {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  },
}
</script>
<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  position: relative;

  .home_02 {
    position: absolute;
    left: 50%;
    bottom: 300rpx;
    transform: translateX(-50%);
    width: 505rpx;
    height: 77rpx;
    background-size: 100% 100%;

    .home_03 {
      position: absolute;
      left: 39rpx;
      top: 24rpx;
    }

    .agreement {
      // background: red;
      width: 40%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .home_btn {
    position: absolute;
    bottom: 180rpx;
    left: 54rpx;
    display: flex;

    .home_05 {
      margin-left: 47rpx;
    }
  }

  .popupShow {
    width: 530rpx;
    height: 903rpx;
    background-size: 100% 100%;
    padding: 215rpx 24rpx 0 32rpx;
    box-sizing: border-box;
  }

  .popupShowClone {
    width: 230rpx;
    height: 97rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    margin: 31rpx auto 0;
    font-family: OPPOSans;
    font-weight: 800;
    font-size: 39rpx;
    color: #FFFFFF;
    text-stroke: 2rpx #000000;
    -webkit-text-stroke: 2rpx #000000;
  }

  .popupShowElse {
    display: flex;
    align-items: center;
    margin-top: 31rpx;
  }
}

button {
  background: none;
  line-height: 0;
}
</style>
