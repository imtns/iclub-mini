<template>
  <view style="background-color: #febd01; min-height: 100vh">
    <view class="box" :style="{ backgroundImage: `url(${ASSETSURL}home_01.png)` }">
      <!-- 免责说明 -->
      <view class="home_02" :style="{ backgroundImage: `url(${ASSETSURL}${home_03 ? 'home_02s' : 'home_02'}.png)` }" @click="home_03 = !home_03">
        <!-- <view class="home_03" v-if="home_03"> -->
        <!-- <image @click="getReupload" :src="`${ASSETSURL}home_03.png`" style="width: 28rpx; height: 28rpx;"
          mode="aspectFit|aspectFill|widthFix" /> -->
        <!-- </view> -->
        <view class="agreement" @click.stop="openPopupWithCountdown"></view>
      </view>
      <!-- 底部按钮 -->
      <view class="home_btn">
        <view class="home_04" @click="getNav()">
          <image :src="`${ASSETSURL}home_04.png`" style="width: 297rpx; height: 96rpx" mode="aspectFit|aspectFill|widthFix" />
        </view>
        <view class="home_05">
          <button type="primary" open-type="share" hover-class="none" @click="handleShareClick">
            <image :src="`${ASSETSURL}home_05.png`" style="width: 297rpx; height: 96rpx" mode="aspectFit|aspectFill|widthFix" />
          </button>
        </view>
      </view>
      <uni-popup ref="popupShow" :mask-click="false" border-radius="10px 10px 0 0" @close="beforeDestroy" maskBackgroundColor="rgba(0,0,0,0.7)">
        <view class="popupShow" :style="{ backgroundImage: `url(${ASSETSURL}home_06.png)` }">
          <image :src="`${ASSETSURL}home_05.png`" mode="widthFix" />
        </view>
        <view class="popupShowClone" v-if="countdown > 0" :style="{ backgroundImage: `url(${ASSETSURL}home_07.png)` }"> {{ countdown }}s </view>
        <view class="popupShowElse" v-else>
          <view style="margin-right: 17rpx" @click="$refs.popupShow.close()">
            <image :src="`${ASSETSURL}home_08.png`" mode="widthFix" style="width: 174rpx; height: 96rpx" />
          </view>
          <view @click="getNav(1)">
            <image :src="`${ASSETSURL}home_09.png`" mode="widthFix" style="width: 330rpx; height: 96rpx" />
          </view>
        </view>
      </uni-popup>
      <!-- 弹窗部分 -->
      <uni-popup ref="popup" :mask-click="false" border-radius="10px 10px 0 0" maskBackgroundColor="rgba(0,0,0,0.7)">
        <!-- 助力成功弹窗 -->
        <view class="diagnostics" v-if="true">
          <image :src="`${ASSETSURL}success.png`" style="width: 493rpx; height: 493rpx" mode="aspectFit|aspectFill|widthFix"> </image>
          <view class="diagnosticstext" style="margin-top: 0"> {{ shareData.assistUserName || "" }} <br />已完成颈纹分析 </view>
          <view class="diagnosticstexts"> 恭喜您获得{{ shareData.count || 0 }}个嗨嗨宝盒 </view>
          <image
            @click="$refs.popup.close()"
            :src="`${ASSETSURL}lq.png`"
            style="margin-top: 58rpx; width: 230rpx; height: 97rpx"
            mode="aspectFit|aspectFill|widthFix"
          >
          </image>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import xBtn from "@/components/x/btn.vue";
import { testAPI, assistRemind, diagnose } from "./api";
import { mapState } from "vuex";
import Tool from "./tool/tool.js";
import { upload } from "./upload/upload";
export default {
  data() {
    return {
      ASSETSURL: Tool.ASSETSURL,
      popupShow: false, //弹窗
      home_03: false, //是否勾选免责说明
      shareInfo: {
        title: "点击查收你的AI颈纹分析结果",
        path: "/pages-sub/ai-ceyan/home",
        imageUrl: "https://udstatic.imeik.com/compressed/1751595118141_images.jpeg",
      },
      countdown: 10, // 倒计时秒数
      countdownTimer: null, // 计时器引用
      shareData: null,
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo"]),
  },
  components: {
    xBtn,
  },
  onLoad(ope) {
    const shareLinkTime = (getApp().globalData && getApp().globalData.shareLinkTime) || "";
    const date = moment(shareLinkTime);
    const isToday = date.isSame(moment(), "day");

    console.log("hasInviteCode", hasInviteCode);
    if (hasInviteCode && !isToday) {
      uni.showToast({
        title: "助力链接已失效",
        icon: "none",
      });
    }
    // if (ope.shareExpire == 1) {
    //   uni.showToast({
    //     title: '助力链接已失效',
    //     icon: 'none'
    //   })
    // }
  },
  onShow() {
    this.getAssis();
  },
  methods: {
    //科技馆 - 用户进入科技馆板块，弹框助力提醒
    async getAssis() {
      try {
        const { code, data, message } = await assistRemind();
        console.log(code, data, message, "用户进入科技馆板块，弹框助力提醒");
        if (code == 200 && data) {
          this.report("新用户/老用户");
          this.shareData = data;
          this.$refs.popup.open("center");
        }
      } catch (err) {
        console.log(err);
      }
    },
    getNav(e) {
      if (!this.isLogin) {
        this.goLogin();
        return;
      }
      console.log(e, "-------=========");
      if (e) {
        uni.navigateTo({
          url: "/pages-sub/ai-ceyan/index",
        });
        this.report("完成免责声明的用户人数");
        this.$refs.popupShow.close();
      } else if (this.home_03) {
        this.report("【开始检测】点击次数/人次");
        uni.navigateTo({
          url: "/pages-sub/ai-ceyan/index",
        });
      } else {
        uni.showToast({
          title: "请先勾选免责说明",
          icon: "none",
        });
      }
    },
    handleShareClick() {
      this.report("【邀请好友检测】点击次数/人次");
      // 如果页面有按钮点击分享，按钮点击分享的title在shareInfo的buttonTitle里定义
      this.shareInfo = {
        ...this.shareInfo,
        // buttonTitle: "这是按钮点击的分享标题123123",
        // path: "/pages-sub/ai-ceyan/index",
        // // 按钮点击时候的分享图片
        // buttonImage: "https://udstatic.imeik.com/compressed/1751595501058_52e7dd424e57ad14f1dc8460962e33791c3ad6e04e5074417c2f73d49148c4_640.jpeg",
      };
    },
    openPopupWithCountdown() {
      this.countdown = 10;
      this.$refs.popupShow.open("center");
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
  beforeDestroy() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 750rpx;
  height: 1480rpx;
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
      top: 50%;
      transform: translateY(-50%);
      width: 28rpx;
      height: 28rpx;
      background: #fa7700;
      border-radius: 50%;
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
    color: #ffffff;
    // text-stroke: 2rpx #000000;
    // -webkit-text-stroke: 2rpx #000000;
  }

  .popupShowElse {
    display: flex;
    align-items: center;
    margin-top: 31rpx;
  }
}

.diagnostics {
  margin: 0 118rpx;
  text-align: center;

  .diagnosticstext {
    font-family: OPPOSans;
    font-weight: 800;
    font-size: 52rpx;
    color: #ffffff;
    // -webkit-text-stroke: 2rpx #000000;
    // text-stroke: 2rpx #000000;
    margin-top: 43rpx;
  }

  .diagnosticstexts {
    font-family: OPPOSans;
    font-weight: 500;
    font-size: 32rpx;
    color: #ffffff;
    // text-stroke: 2rpx #000000;
    // -webkit-text-stroke: 2rpx #000000;
    margin-top: 12rpx;
  }
}

button {
  background: none;
  line-height: 0;
}
</style>
