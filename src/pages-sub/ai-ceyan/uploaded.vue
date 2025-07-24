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
    <view class="unpBg" @longpress="handlePoster" :style="{ backgroundImage: `url(${ASSETSURL}unpBg2.png)` }">
      <!-- 照片 -->
      <view class="unpBg_01" :style="{ backgroundImage: `url(${ASSETSURL}unpBg_01.png)` }">
        <image class="scan-anim" :src="shareDataAi.jwImgUrl" style="width: 100%; height: 100%" mode="aspectFill">
        </image>
      </view>
      <view class="unpBg_02">
        <image class="scan-anim" :src="ASSETSURL + 'unpBg_02.png'" style="width: 134rpx; height: 189rpx"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
      <view class="unpBg_03" :style="{ backgroundImage: `url(${ASSETSURL}unpBg_06.png)` }">
        <!-- 等级 -->
        <view class="top_01">{{ shareDataAi.scoreLevel }}</view>
        <!-- 内容 -->
        <view class="top_02">
          <view class="top_02_text">{{ shareDataAi.jwCountDesc }}</view>
          <view class="top_02_text">{{ shareDataAi.jwDepthDesc }}</view>
          <view class="top_02_text">{{ shareDataAi.jwLengthDesc }}</view>
        </view>
      </view>
      <view class="unpBg_04">
        {{ shareDataAi.result }}
      </view>
      <!-- 二维码啥的 -->
      <view class="btnQocd" :style="{ backgroundImage: `url(${ASSETSURL}unpBg_08.png)` }">
        <view class="btnQocdRight">
          <image class="scan-anim" :src="shareDataAi.activityImgUrl" style="width: 149rpx; height: 149rpx"
            mode="aspectFit|aspectFill|widthFix">
          </image>
        </view>
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
    <!-- <x-btn :loading="isLoading" @click="handlePoster">生成海报</x-btn> -->
    <l-painter ref="painter" type="2d" is-canvas-to-temp-file-path custom-style="position: fixed; left: 200%"
      @success="onSuccess" @fail="onFail"> </l-painter>
    <!-- <image class="scan-anim" :src="posterImage" style="width: 100vw; height: 1480rpx"
      mode="aspectFit|aspectFill|widthFix">
    </image> -->
  </view>
</template>

<script>
import xBtn from "@/components/x/btn.vue"
import { testAPI, testAPI1 } from './api'
import { mapState } from "vuex";
import Tool from './tool/tool.js'
export default {
  components: {
    xBtn
  },
  computed: {
    ...mapState(["isLogin", "userInfo"]),
  },
  data () {
    return {
      shareDataAi: '',
      ASSETSURL: Tool.ASSETSURL,
      posterImage: "",
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
      uni.showLoading({
        title: '保存中...'
      });
      const poster = this.getPoster();
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
      uni.hideLoading();

      wx.showToast({
        title: "生成失败,请重试",
        icon: "none",
      });
    },
    getPoster () {
      return {
        css: {
          // width: "750rpx",
          // backgroundImage: `url(${this.ASSETSURL}unpBg.png)`,
          // backgroundSize: "contain",
          // height: "1480rpx",
          // position: "relative",
        },

        views: [
          {
            type: "view",
            css: {
              width: "750rpx",
              backgroundImage: `url(${this.ASSETSURL}unpBg.png)`,
              backgroundSize: "contain",
              height: "1480rpx",
              position: "relative",
            },
            views: [
              {
                type: "image",
                src: `${this.ASSETSURL}poster_01.png`,
                css: {
                  width: "722rpx",
                  height: "1391rpx",
                  top: "0rpx",
                  left: "19rpx",
                  borderRadius: "0",
                  position: "absolute",
                },
              },
              // 用户姓名
              {
                type: "text",
                text: `${this.userInfo.nickName}的`,
                css: {
                  width: '148rpx',
                  fontSize: '49rpx',
                  top: "310rpx",
                  left: "51rpx",
                  borderRadius: "0",
                  position: "absolute",
                  lineClamp: '1'
                },
              },
              {
                type: "text",
                text: `ai颈纹分析结果`,
                css: {
                  width: '260rpx',
                  fontSize: '34rpx',
                  top: "325rpx",
                  left: "210rpx",
                  borderRadius: "0",
                  position: "absolute",
                  // lineClamp: '1'
                },
              },
              {
                type: "image",
                src: `${this.ASSETSURL}poster_02.png`,
                css: {
                  width: "294rpx",
                  height: "365rpx",
                  top: "399rpx",
                  left: "49rpx",
                  borderRadius: "0",
                  position: "absolute",
                },
              },
              {
                type: "image",
                src: `${this.ASSETSURL}poster_03.png`,
                css: {
                  width: "129rpx",
                  height: "183rpx",
                  top: "599rpx",
                  left: "257rpx",
                  borderRadius: "0",
                  position: "absolute",
                  zIndex: 2,

                },
              },
              //上传的图片
              {
                type: "image",
                src: `${this.shareDataAi.jwImgUrl}`,
                css: {
                  width: "294rpx",
                  height: "365rpx",
                  top: "399rpx",
                  left: "49rpx",
                  borderRadius: "0",
                  position: "absolute",
                  zIndex: 1,
                },
              },
              {
                type: "image",
                src: `${this.ASSETSURL}poster_04.png`,
                css: {
                  width: "333rpx",
                  height: "328rpx",
                  top: "429rpx",
                  right: "50rpx",
                  borderRadius: "0",
                  position: "absolute",
                  zIndex: 1,
                },
              },
              // 等级
              {
                type: "text",
                text: this.shareDataAi.scoreLevel,
                css: {
                  width: "333rpx",
                  height: "328rpx",
                  top: "340rpx",
                  left: "575rpx",
                  fontWeight: '800',
                  fontSize: '87rpx',
                  borderRadius: "0",
                  textStroke: '2rpx #000000',
                  position: "absolute",
                  color: '#FFF',
                  zIndex: 2,
                },
              },
              // 数量
              {
                type: "text",
                text: `${this.shareDataAi.jwCountDesc}`,
                css: {
                  width: "333rpx",
                  top: "604rpx",
                  left: "522rpx",
                  fontSize: '27rpx',
                  borderRadius: "0",
                  position: "absolute",
                  color: '#000000',
                  zIndex: 2,
                  lineClamp: '1'

                },
              },
              // 深度
              {
                type: "text",
                text: `${this.shareDataAi.jwDepthDesc}`,
                css: {
                  width: "333rpx",
                  top: "646rpx",
                  left: "522rpx",
                  fontSize: '27rpx',
                  borderRadius: "0",
                  position: "absolute",
                  color: '#000000',
                  zIndex: 2,
                  lineClamp: '1'
                },
              },
              // 长度
              {
                type: "text",
                text: `${this.shareDataAi.jwLengthDesc}`,
                css: {
                  width: "333rpx",
                  top: "688rpx",
                  left: "522rpx",
                  fontSize: '27rpx',
                  borderRadius: "0",
                  position: "absolute",
                  color: '#000000',
                  zIndex: 2,
                  lineClamp: '1'
                },
              },
              // 描述
              {
                type: "text",
                text: `${this.shareDataAi.result}`,
                css: {
                  width: "639rpx",
                  hight: '95rpx',
                  bottom: "487rpx",
                  left: "58rpx",
                  fontSize: '25rpx',
                  borderRadius: "0",
                  position: "absolute",
                  color: '#6E6D6A',
                  zIndex: 2,
                  lineClamp: '3'
                },
              },
              // 二维码啥的
              {
                type: "image",
                src: `${this.ASSETSURL}poster_05.png`,
                css: {
                  width: "422rpx",
                  height: "227rpx",
                  left: "165rpx",
                  bottom: "227rpx",
                  borderRadius: "0",
                  position: "absolute",
                },
              },
              // 保养攻略 二维码
              {
                type: "image",
                src: `${this.ASSETSURL}bg.png`,
                css: {
                  width: "149rpx",
                  height: "149rpx",
                  left: "174rpx",
                  bottom: "262rpx",
                  borderRadius: "0",
                  position: "absolute",
                },
              },
              // AI颈纹分析 二维码 
              {
                type: "image",
                src: this.shareDataAi.activityImgUrl,
                css: {
                  width: "149rpx",
                  height: "149rpx",
                  left: "428rpx",
                  bottom: "262rpx",
                  borderRadius: "0",
                  position: "absolute",
                },
              },
              // 拯救颈纹
              {
                type: "image",
                src: `${this.ASSETSURL}poster_06.png`,
                css: {
                  width: "272rpx",
                  height: "129rpx",
                  left: "26rpx",
                  bottom: "79rpx",
                  borderRadius: "0",
                  position: "absolute",
                },
              },
            ],
          },
        ],
      };
    },
    // 保存海报
    onSuccess (path) {
      console.log("🚀 ~ onSuccess ~ path:", path);
      this.posterImage = path;
      // 保存到相册
      uni.saveImageToPhotosAlbum({
        filePath: path,
        success: () => {
          uni.showToast({
            title: "已保存到相册",
            icon: "success",
          });
        },
        fail: (err) => {
          uni.showToast({
            title: "保存失败，请重试",
            icon: "none",
          });
          console.error("保存海报失败", err);
        },
        complete: () => {
          uni.hideLoading();
        }
      });
    },
    leftClick () {
      uni.navigateBack({
        delta: 2,
      })
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
    color: #6E6D6A;
    line-height: 35rpx;
  }

  .btnQocd {
    width: 376rpx;
    height: 194rpx;
    background-size: 100% 100%;
    position: absolute;
    bottom: 34rpx;
    right: 41rpx;

    .btnQocdRight {
      position: absolute;
      right: 10rpx;
      top: 8rpx;
    }
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
