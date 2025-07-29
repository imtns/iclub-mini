<template>
  <view class="box" :style="{ backgroundImage: `url(${ASSETSURL}bg.png)` }">
    <uni-nav-bar fixed statusBar title=" " :border="false" backgroundColor="transparent">
      <template #left>
        <image @click="leftClick" class="" :src="`${ASSETSURL}leftIcon.png`" style="width: 32rpx; height: 48rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </template>
    </uni-nav-bar>
    <!-- 背景音乐 -->
    <!-- <view class="music">
      <image class="" :src="`${ASSETSURL}music.png`" style="width: 51rpx; height: 51rpx;"
        mode="aspectFit|aspectFill|widthFix"></image>
    </view> -->
    <!-- 拍照区域 -->
    <view class="takePictures" :style="{ backgroundImage: `url(${ASSETSURL}takePicturesbg_01.png)` }">
      <view class="poaText font-26">{{ titleText }}</view>
      <!-- 前置摄像头 -->
      <view class="camera">
        <view style="width: 100%; height: 100%;" v-if="states == 2">
          <image class="scan-anim" :src="image" style="width: 100%; height: 100%;" mode="aspectFill">
          </image>
        </view>
        <view style="width: 100%; height: 100%;" v-else-if="!intelligentAnimation && !takePictures">
          <image class="scan-anim" :src="`${ASSETSURL}takePicturesbg_02.png`" style="width: 100%; height: 100%;"
            mode="aspectFill">
          </image>
        </view>
        <view style="width: 100%; height: 100%;" v-else>
          <camera device-position="front" flash="auto" style="width: 100%; height: 100%;" @error="onCameraError">
          </camera>
        </view>
      </view>

      <!-- 上下扫描动画 -->
      <view class="saomiao" v-if="intelligentAnimation">
        <image class="scan-anim" :src="`${ASSETSURL}saomiao.png`" style="width: 100%; height: 100%;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </view>
    </view>
    <view class="intelligent" v-if="intelligentAnimation">
      <image :src="`${ASSETSURL}IntelligentDiagnosis.png`" style="width: 290rpx; height: 155rpx;"
        mode="aspectFit|aspectFill|widthFix"></image>
    </view>
    <!-- 底部拍照相册按钮 -->
    <view class="btnFlex" v-if="!intelligentAnimation && states == 1">
      <view @click="getPhotoUpload">
        <image class="" :src="`${ASSETSURL}photoUpload.png`" style="width: 272rpx; height: 114rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </view>
      <view @click="handleUpload">
        <image class="" :src="`${ASSETSURL}UploadPhotoAlbum.png`" style="width: 274rpx; height: 116rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </view>
    </view>
    <!-- 重新上传 开始分析 -->
    <view class="btnFlex" v-else-if="!intelligentAnimation && states == 2">
      <view @click="states = 1">
        <image class="" :src="`${ASSETSURL}index_01.png`" style="width: 272rpx; height: 114rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </view>
      <view @click="getdiagnose">
        <image class="" :src="`${ASSETSURL}index_02.png`" style="width: 274rpx; height: 116rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </view>
    </view>
    <view class="btnText" v-if="intelligentAnimation">
      <image class="" :src="`${ASSETSURL}btnText.png`" style="width: 407rpx; height: 24rpx;"
        mode="aspectFit|aspectFill|widthFix"></image>
    </view>
    <!-- 弹窗部分 -->
    <uni-popup ref="popup" :mask-click="false" border-radius="10px 10px 0 0" maskBackgroundColor="rgba(0,0,0,0.7)">
      <!-- AI成功弹窗 -->
      <view class="diagnostics" v-if="shareDataAi">
        <image :src="`${ASSETSURL}success.png`" style="width: 493rpx; height: 493rpx;"
          mode="aspectFit|aspectFill|widthFix">
        </image>
        <view class="diagnosticstext" style="margin-top: 0;">
          颈纹诊断已完成
        </view>
        <view class="diagnosticstexts">
          恭喜您获得{{ shareDataAi.diagnoseBoxCount + shareDataAi.assistBoxCount || 0 }}个嗨嗨宝盒
        </view>
        <image @click="getReupload(1)" :src="`${ASSETSURL}lq.png`"
          style="margin-top: 58rpx; width: 230rpx; height: 97rpx;" mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
      <!-- AI失败弹窗 -->
      <view class="diagnostics" v-else>
        <image :src="`${ASSETSURL}diagnostics.png`" style="width: 228rpx; height: 367rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
        <view class="diagnosticstext">
          颈纹分析失败 请上传清晰的颈部照片
        </view>
        <image @click="getReupload" :src="`${ASSETSURL}reupload.png`"
          style="margin-top: 58rpx; width: 230rpx; height: 97rpx;" mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import xBtn from "@/components/x/btn.vue"
import { testAPI, assistRemind, diagnose } from './api'
import report from "@/utils/report/report"; // 埋点上报
import { mapState } from "vuex";
import Tool from './tool/tool.js'
import { upload } from "./upload/upload";
export default {
  data () {
    return {
      takePictures: false,//是否开启拍照
      image: null,
      intelligentAnimation: false,//是否显示 智能诊断和扫描动画
      ASSETSURL: Tool.ASSETSURL,
      titleTextArr: ['有颈纹，嗨体一下', '拯救颈纹，选嗨体', '嗨体一下，纠正中重度颈纹'],
      titleText: '',
      uploadImage: "",
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
      shareDataAi: null,
      states: 1,//1 默认  2 重新上传开始分析
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo"]),
  },
  components: {
    xBtn
  },
  onLoad () {
    this.titleText = this.titleTextArr[Math.floor(Math.random() * this.titleTextArr.length)]
  },
  onShow () {
    // if (!this.isLogin) {
    //   this.goLogin();
    //   return;
    // }
    this.intelligentAnimation = false
  },
  methods: {
    // ai分析
    async getdiagnose () {
      this.intelligentAnimation = true
      try {
        const { code, data, message } = await diagnose({ jwImgUrl: this.uploadImage, inviterCode: '' })
        if (code == 200) {
          this.shareDataAi = data
          console.log(this.shareDataAi.diagnoseBoxCount + this.shareDataAi.assistBoxCount, '------==========');
          if (data.diagnoseBoxCount > 0 || data.assistBoxCount > 0) {
            this.$refs.popup.open('center')
          } else {
            setTimeout(() => {
              uni.navigateTo({
                url: '/pages-sub/ai-ceyan/uploaded?data=' + decodeURIComponent(JSON.stringify(this.shareDataAi))
              })
            }, 3000);
          }
        } else {
          this.$refs.popup.open('center')
          uni.showToast({
            title: message,
            icon: 'none'
          });
        }
        setTimeout(() => {
          this.intelligentAnimation = false
          this.states = 1
        }, 3000);

      } catch (error) {
        console.log(error, 'error');

      }
    },
    //科技馆 - 用户进入科技馆板块，弹框助力提醒
    async getAssis () {
      try {
        const { code, data, message } = await assistRemind()
        console.log(code, data, message, '用户进入科技馆板块，弹框助力提醒')
        if (code == 200 && data) {
          this.report('新用户/老用户')
          this.$refs.popup.open('center')
        } else {
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages-sub/ai-ceyan/uploaded?data=' + decodeURIComponent(JSON.stringify(this.shareDataAi))
            })
          }, 3000);
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 图片上传方法
    getUploadImage () {
      let thst = this
      return new Promise((resolve, reject) => {
        wx.chooseMedia({
          mediaType: ["image"],
          count: 1,
          sourceType: ["album"],
          sizeType: ["original", "compressed"],
          success: async (res) => {
            const savePath = "image";
            const filePath = res.tempFiles[0].tempFilePath;
            thst.image = filePath
            upload(filePath, savePath, (imageUrl) => {
              console.log("imageUrl----------", imageUrl);
              if (imageUrl) {
                this.report('照片上传成功的次数/人次')
                console.log("图片上传成功", imageUrl);
                resolve(imageUrl);
              } else {
                console.log("图片上传失败，请稍后重试");
              }
            });
          },
          fail: reject,
        });
      });
    },
    //图片上传
    async handleUpload () {
      try {
        const imageUrl = await this.getUploadImage();
        console.log("🚀 ~ handleUpload ~ imageUrl:", imageUrl);
        this.uploadImage = imageUrl;
        // this.getdiagnose(imageUrl)
        this.states = 2
      } catch (error) {
        console.log(error, 'error');
      }
    },
    leftClick () {
      uni.navigateBack()
    },
    //拒绝摄像头后
    onCameraError (e) {
      this.takePictures = false
      console.log(this.takePictures, 'thst.takePictures');
      uni.showModal({
        title: '提示',
        content: '请前往设置打开摄像头权限',
        confirmText: '去设置',
        cancelText: '取消',
        success: function (modalRes) {
          if (modalRes.confirm) {
            uni.openSetting()
          } else if (modalRes.cancel) {
          }
        }
      });
    },
    // 拍照上传，先判断是否开启摄像头权限
    getPhotoUpload () {
      this.report('【开始分析】按钮点击次数/人次')
      let thst = this
      // 检查摄像头权限
      uni.getSetting({
        success: (res) => {
          if (!thst.takePictures) {
            thst.takePictures = true
            return
          }
          const cameraAuth = res.authSetting['scope.camera'];
          if (cameraAuth) {
            // 已授权，拍照
            const ctx = uni.createCameraContext();
            ctx.takePhoto({
              quality: 'high',
              success: async (res) => {
                console.log(res.tempImagePath, '拍照上传');
                const savePath = "image";
                const filePath = res.tempImagePath;
                thst.image = filePath
                upload(filePath, savePath, async (imageUrl) => {
                  console.log("imageUrl----------", imageUrl);
                  this.report('照片上传成功的次数/人次')
                  if (imageUrl) {
                    this.uploadImage = imageUrl;
                    this.states = 2
                  } else {
                    uni.showToast({
                      title: '图片上传失败，请稍后重试',
                      icon: 'none'
                    });
                    console.log("图片上传失败，请稍后重试");
                    setTimeout(() => {
                      this.intelligentAnimation = false
                    }, 3000);
                  }
                });
              }
            });
          } else {
            // 未授权，提示用户去授权
            uni.showModal({
              title: '提示',
              content: '请前往设置打开摄像头权限',
              confirmText: '去设置',
              cancelText: '取消',
              success: function (modalRes) {
                if (modalRes.confirm) {
                  uni.openSetting();
                  console.log(thst.takePictures, 'thst.takePictures');
                } else if (modalRes.cancel) {
                  thst.takePictures = false
                  console.log(thst.takePictures, 'thst.takePictures');
                }
              }
            });
          }
        },

        fail: () => {
          uni.showModal({
            title: '错误',
            content: '无法获取摄像头权限设置，请重试或检查系统设置。',
            showCancel: false
          });
        }
      });
    },
    //重新上传
    getReupload (e) {
      this.$refs.popup.close()
      this.intelligentAnimation = false
      if (e == 1) {
        uni.navigateTo({
          url: '/pages-sub/ai-ceyan/uploaded?data=' + decodeURIComponent(JSON.stringify(this.shareDataAi))
        })
      }
    }
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
      left: 260rpx;
      font-family: OPPOSans;
      font-weight: 500;
      font-size: 25rpx;
      color: #000000;
      width: 260rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .camera {
      position: absolute;
      width: 596rpx;
      height: 687rpx;
      top: 161rpx;
      right: 29rpx;
      // background: red;
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
    // -webkit-text-stroke: 2rpx #000000;
    // text-stroke: 2rpx #000000;
    margin-top: 43rpx;
  }

  .diagnosticstexts {
    font-family: OPPOSans;
    font-weight: 500;
    font-size: 32rpx;
    color: #FFFFFF;
    // text-stroke: 2rpx #000000;
    // -webkit-text-stroke: 2rpx #000000;
    margin-top: 12rpx;
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

.btnText {
  display: flex;
  justify-content: center;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 92rpx;
}
</style>
