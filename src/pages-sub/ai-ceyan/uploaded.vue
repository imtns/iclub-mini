<template>
  <view class="box" :style="{ backgroundImage: `url(${ASSETSURL}unpBg.png)` }">
    <uni-nav-bar fixed statusBar title=" " :border="false" backgroundColor="transparent">
      <template #left>
        <image @click="leftClick" class="" :src="`${ASSETSURL}leftIcon.png`" style="width: 32rpx; height: 48rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </template>
    </uni-nav-bar>
    <!-- 背景音乐 -->
    <view class="music">
      <image class="" :src="`${ASSETSURL}music.png`" style="width: 51rpx; height: 51rpx;"
        mode="aspectFit|aspectFill|widthFix"></image>
    </view>
    <view class="unpBg" :style="{ backgroundImage: `url(${ASSETSURL}unpBg2.png)` }">
      <!-- 照片 -->
      <view class="unpBg_01" :style="{ backgroundImage: `url(${ASSETSURL}unpBg_01.png)` }">
        <image class="scan-anim" :src="shareDataAi.jwImgUrl" style="width: 100%; height: 100%"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
      <view class="unpBg_02">
        <image class="scan-anim" :src="ASSETSURL + 'unpBg_02.png'" style="width: 134rpx; height: 189rpx"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
      <view class="unpBg_03" :style="{ backgroundImage: `url(${ASSETSURL}unpBg_06.png)` }">
        <!-- 等级 -->
        <view class="top_01">1</view>
        <!-- 内容 -->
        <view class="top_02">
          <view class="top_02_text">{{ shareDataAi.jwCount }}</view>
          <view class="top_02_text">{{ shareDataAi.jwDepth }}</view>
          <view class="top_02_text">{{ shareDataAi.jwLength }}</view>
        </view>
      </view>
      <view class="unpBg_04">
        {{ shareDataAi.result }}
      </view>
      <!-- 二维码啥的 -->
      <view class="btnQocd" :style="{ backgroundImage: `url(${ASSETSURL}unpBg_08.png)` }">

      </view>
      <!-- 扫码得社群专属福利 -->
      <view class="unpBg_05">
        <image class="scan-anim" :src="ASSETSURL + 'unpBg_07.png'" style="width: 179rpx; height: 18rpx"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
      <!-- 拯救颈纹选嗨体 -->
      <view class="unpBg_06">
        <image class="scan-anim" :src="ASSETSURL + 'unpBg_09.png'" style="width: 272rpx; height: 129rpx"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
    </view>
    <!-- --长按保存结果-- -->
    <view class="unpBg_07">
      <image class="scan-anim" :src="ASSETSURL + 'unpBg_10.png'" style="width: 202rpx; height: 27rpx"
        mode="aspectFit|aspectFill|widthFix">
      </image>
    </view>
    <!-- --邀请好友-- -->
    <view class="unpBg_08">
      <button type="primary" open-type="share" hover-class="none" @click="handleShareClick">
        <image class="scan-anim" :src="ASSETSURL + 'unpBg_11.png'" style="width: 332rpx; height: 96rpx"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </button>
      <view class="unpBg_08_01">
        <image class="scan-anim" :src="ASSETSURL + 'unpBg_12.png'" style="width: 418rpx; height: 51rpx"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
    </view>
    <!-- --*AI生成结果仅供参考，不构成任何医疗建议-- -->
    <view class="unpBg_09">
      <image class="scan-anim" :src="ASSETSURL + 'unpBg_13.png'" style="width: 407rpx; height: 24rpx"
        mode="aspectFit|aspectFill|widthFix">
      </image>
    </view>
    <x-btn :loading="isLoading" @click="handlePoster">生成海报</x-btn>
    <l-painter ref="painter" type="2d" is-canvas-to-temp-file-path custom-style="position: fixed; left: 200%"
      @success="onSuccess" @fail="onFail"> </l-painter>
  </view>
</template>

<script>
import { testAPI, testAPI1 } from './api'
import Tool from './tool/tool.js'
export default {
  data () {
    return {
      shareDataAi: '',
      ASSETSURL: Tool.ASSETSURL,
      shareInfo: {
        title: "嗨嗨",
        path: "/pages-sub/ai-ceyan/index",
        imageUrl: "https://udstatic.imeik.com/compressed/1751595118141_images.jpeg",
      },
    }
  },
  onLoad (options) {
    if (options.data) {
      console.log(JSON.parse(decodeURIComponent(options.data)), '=====-------------');
      this.shareDataAi = JSON.parse(decodeURIComponent(options.data))
    }
  },
  onShow () {
  },
  methods: {
    handlePoster () {
      const poster = this.getPoster();
      this.isLoading = true;
      console.log("poster", poster);
      this.$nextTick(() => {
        try {
          this.$refs.painter.render(poster);
        } catch (err) {
          this.onFail(err);
        }
      });
    },
    onFail (err) {
      console.error("err", err);
      this.isLoading = false;

      wx.showToast({
        title: "生成失败,请重试",
        icon: "none",
      });
    },
    getPoster () {
      return {
        css: {
          width: "692rpx",
          backgroundImage: "url(https://udstatic.imeik.com/compressed/1741689495997_%E7%BC%96%E7%BB%84%2010%402x.png)",
          backgroundSize: "contain",
          height: "1250rpx",
          position: "relative",
        },

        views: [
          {
            type: "view",
            css: {
              position: "relative",
              zIndex: 2,
              width: "622rpx",
            },
            views: [
              {
                type: "image",
                src: "https://imeikud.oss-cn-beijing.aliyuncs.com/imeik_iclub/style/a14ace0d49c5a9792dab0149c7708c72.jpg",
                css: {
                  width: "540rpx",
                  height: "960rpx",
                  top: "72rpx",
                  left: "76rpx",
                  borderRadius: "20rpx",
                  position: "absolute",
                },
              },
              {
                type: "image",
                src: "https://udstatic.imeik.com/compressed/1744100493708_%E4%BD%8D%E5%9B%BE%E5%A4%87%E4%BB%BD%402x.png",
                css: {
                  width: "540rpx",
                  height: "960rpx",
                  top: "72rpx",
                  left: "76rpx",
                  borderRadius: "20rpx",
                  position: "absolute",
                },
              },
              {
                type: "image",
                src: "https://udstatic.imeik.com/compressed/1744180590099_qr-test.png",
                css: {
                  width: "168rpx",
                  height: "168rpx",
                  top: "1060rpx",
                  left: "72rpx",
                  position: "absolute",
                },
              },
              {
                type: "text",
                text: "来爱+体验风格爆改",
                css: {
                  top: "1112rpx",
                  right: "8rpx",
                  position: "absolute",
                },
              },
              {
                type: "text",
                text: "长按保存海报",
                css: {
                  top: "1144rpx",
                  right: "8rpx",
                  position: "absolute",
                },
              },
            ],
          },
        ],
      };
    },
    onSuccess (path) {
      console.log("🚀 ~ onSuccess ~ path:", path);
      this.posterImage = path;
      this.isLoading = false;
      this.$refs.posterPop.open();
      wx.showToast({
        title: "海报生成成功",
        icon: "success",
      });
      wx.hideLoading();
    },
    leftClick () {
      uni.navigateBack()
    },
    handleShareClick () {
      // 如果页面有按钮点击分享，按钮点击分享的title在shareInfo的buttonTitle里定义
      this.shareInfo = {
        ...this.shareInfo,
        buttonTitle: "这是按钮点击的分享标题123123",
        path: "/pages-sub/ai-ceyan/index",
        // 按钮点击时候的分享图片
        buttonImage: "https://udstatic.imeik.com/compressed/1751595501058_52e7dd424e57ad14f1dc8460962e33791c3ad6e04e5074417c2f73d49148c4_640.jpeg",
      };
    },
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;

  .music {
    display: flex;
    justify-content: flex-end;
    margin-right: 20rpx;
    margin-top: 20rpx;
  }

  .takePictures {
    background-size: 100% 100%;
    width: 654rpx;
    height: 881rpx;
    margin: 0rpx auto 0;
    position: relative;

    .poaText {
      position: absolute;
      top: 48rpx;
      right: 153rpx;
      font-family: OPPOSans;
      font-weight: 500;
      font-size: 25rpx;
      color: #000000;
    }

    .camera {
      position: absolute;
      width: 596rpx;
      height: 687rpx;
      top: 161rpx;
      right: 29rpx;
      background: red;
    }

    .saomiao {
      position: absolute;
      width: 597rpx;
      height: 387rpx;
      top: 161rpx;
      right: 29rpx;
      overflow: hidden;
      animation: scanMove 2s linear infinite;
    }
  }
}

.intelligent {
  display: flex;
  justify-content: center;
}

.btnFlex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 88rpx 66rpx 0;
}

.diagnostics {
  margin: 0 118rpx;
  text-align: center;

  .diagnosticstext {
    font-family: OPPOSans;
    font-weight: 800;
    font-size: 52rpx;
    color: #FFFFFF;
    -webkit-text-stroke: 2rpx #000000;
    text-stroke: 2rpx #000000;
    margin-top: 43rpx;
    margin-bottom: 58rpx;
  }
}

@keyframes scanMove {
  0% {
    height: 0;
    opacity: 0.8;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    height: 687rpx;
    opacity: 0.8;
  }
}

.unpBg {
  width: 722rpx;
  height: 1290rpx;
  background-size: 100% 100%;
  margin: 0 12rpx 0 16rpx;
  position: relative;
  padding: 0 30rpx 0 28rpx;
  box-sizing: border-box;
  display: inline-block;
  top: -150rpx;

  .unpBg_01 {
    background-size: 100% 100%;
    width: 294rpx;
    height: 365rpx;
    position: absolute;
    top: 380rpx;
    left: 34rpx;
  }

  .unpBg_02 {
    position: absolute;
    top: 586rpx;
    left: 235rpx;
    z-index: 1;
  }

  .unpBg_03 {
    width: 333rpx;
    height: 328rpx;
    background-size: 100% 100%;
    position: absolute;
    top: 410rpx;
    left: 350rpx;

    .top_01 {
      position: absolute;
      top: 14rpx;
      left: 207rpx;
      font-family: OPPOSans;
      font-weight: 800;
      font-size: 87rpx;
      color: #FFFFFF;
      text-stroke: 2rpx #000000;
      -webkit-text-stroke: 2rpx #000000;
    }

    .top_02 {
      position: absolute;
      top: 170rpx;
      left: 156rpx;

      .top_02_text {
        font-family: OPPOSans;
        font-weight: 500;
        font-size: 27rpx;
        color: #000000;
        line-height: 42rpx;
      }
    }
  }

  .unpBg_04 {
    max-height: 160rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    position: absolute;
    top: 920rpx;
    left: 0;
    margin: 0 64rpx 0 43rpx;
    font-family: OPPOSans;
    font-weight: 500;
    font-size: 25rpx;
    color: #000000;
    line-height: 35rpx;
    opacity: 0.73;
  }

  .btnQocd {
    width: 376rpx;
    height: 194rpx;
    background-size: 100% 100%;
    position: absolute;
    bottom: 34rpx;
    right: 41rpx;
  }

  .unpBg_05 {
    position: absolute;
    left: 98rpx;
    bottom: 167rpx;
  }

  .unpBg_06 {
    position: absolute;
    left: 10rpx;
    bottom: 0rpx;
  }
}

.unpBg_07 {
  display: flex;
  justify-content: center;
  margin-top: -150rpx;
}

.unpBg_08 {
  margin-top: 50rpx;
  position: relative;
  display: flex;
  justify-content: center;

  .unpBg_08_01 {
    position: absolute;
    left: 50rpx;
    top: -35rpx;
  }
}

.unpBg_09 {
  display: flex;
  justify-content: center;
  margin-top: 18rpx;
}

button {
  background: none;
  line-height: 0;
}
</style>
