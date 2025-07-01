<template>
  <view class="box" :style="{ backgroundImage: `url(${ASSETSURL}bg.png)` }">
    <!-- <button type="primary" @click="TestAPI">测试请求</button>
    {{ responseData }}
    <button type="primary" @click="showDrawer">右侧弹出 显示Drawer</button>
    <uni-drawer ref="showRight" mode="right" :mask-click="false">
      <scroll-view style="height: 100%" scroll-y="true">
        <button type="primary" @click="closeDrawer">关闭Drawer</button>
        <view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
      </scroll-view>
    </uni-drawer>
    <button @click="open">打开弹窗</button>
    <uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
      @cancel="cancel" @clear="clear">
    </uni-search-bar>
    <view class="search-result">
      <text class="search-result-text">当前输入为：{{ searchValue }}</text>
    </view>
    <uni-popup ref="popup" border-radius="10px 10px 0 0">
      <div
        style="display: flex; align-items: center; justify-content: center; width: 300px; height: 200px; background-color: #fff">
        这是弹窗</div>
    </uni-popup> -->
    <uni-nav-bar fixed statusBar title=" " :border="false" backgroundColor="transparent">
      <template #left>
        <image class="" :src="`${ASSETSURL}leftIcon.png`" style="width: 32rpx; height: 48rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </template>
    </uni-nav-bar>
    <!-- 背景音乐 -->
    <view class="music">
      <image class="" :src="`${ASSETSURL}music.png`" style="width: 51rpx; height: 51rpx;"
        mode="aspectFit|aspectFill|widthFix"></image>
    </view>
    <!-- 拍照区域 -->
    <view class="takePictures" :style="{ backgroundImage: `url(${ASSETSURL}takePicturesbg_01.png)` }">
      <view class="poaText font-26">{{ titleText }}</view>
      <!-- 前置摄像头 -->
      <view class="camera">
        <view style="width: 100%; height: 100%;" v-if="intelligentAnimation">
          <image class="scan-anim" :src="image" style="width: 100%; height: 100%;" mode="aspectFit|aspectFill|widthFix">
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
    <view class="btnFlex" v-else>
      <view @click="getPhotoUpload">
        <image class="" :src="`${ASSETSURL}photoUpload.png`" style="width: 272rpx; height: 114rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </view>
      <view @click="getUploadPhotoAlbum">
        <image class="" :src="`${ASSETSURL}UploadPhotoAlbum.png`" style="width: 274rpx; height: 116rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
      </view>
    </view>
    <!-- 弹窗部分 -->
    <uni-popup ref="popup" border-radius="10px 10px 0 0">
      <view class="diagnostics">
        <image :src="`${ASSETSURL}diagnostics.png`" style="width: 228rpx; height: 367rpx;"
          mode="aspectFit|aspectFill|widthFix"></image>
        <view class="diagnosticstext">
          诊断失败 请上传清晰的颈部照片
        </view>
        <image @click="getReupload" :src="`${ASSETSURL}reupload.png`" style="width: 230rpx; height: 97rpx;"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { testAPI } from './api'
import Tool from './tool/tool.js'

export default {
  data () {
    return {
      image: null,
      intelligentAnimation: false,//是否显示 智能诊断和扫描动画
      responseData: null,
      searchValue: '',
      ASSETSURL: Tool.ASSETSURL,
      titleText: '请上传您的颈部照片',
    }
  },
  onShow () {
  },
  methods: {
    // async TestAPI () {
    //   try {
    //     const res = await testAPI()
    //     this.responseData = JSON.stringify(res)
    //     console.log(res)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    // open () {
    //   // 参考https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html
    //   // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
    //   this.$refs.popup.open('center')
    // },
    // showDrawer () {
    //   this.$refs.showRight.open()
    // },
    // closeDrawer () {
    //   this.$refs.showRight.close()
    // },
    //拒绝摄像头后
    onCameraError (e) {
      uni.showModal({
        title: '提示',
        content: '请前往设置打开摄像头权限',
        confirmText: '去设置',
        cancelText: '取消',
        success: function (modalRes) {
          if (modalRes.confirm) {
            uni.openSetting()
          }
        }
      });
    },
    // 拍照上传，先判断是否开启摄像头权限
    getPhotoUpload () {
      // 检查摄像头权限
      uni.getSetting({
        success: (res) => {
          const cameraAuth = res.authSetting['scope.camera'];
          if (cameraAuth) {
            // 已授权，拍照
            const ctx = uni.createCameraContext();
            ctx.takePhoto({
              quality: 'high',
              success: (res) => {
                console.log(res.tempImagePath, '拍照上传');
                // {"errMsg": "operateCamera:ok", "width": 720, "tempImagePath": "wxfile://tmp_86c2f196b102a4fb1b2553ac442e40ca.jpg", "height": 828} 拍照上传
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
    // 相册上传
    getUploadPhotoAlbum () {
      let thst = this
      uni.chooseImage({
        count: 1, // 默认选择一张
        sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
        sourceType: ['album'], // 只允许从相册选择
        success: (res) => {
          thst.titleText = '嗨嗨颈纹知识话术'
          thst.intelligentAnimation = true
          thst.image = res.tempFilePaths[0]
          console.log(res, '相册上传');
          setTimeout(() => {
            this.$refs.popup.open('center')
          }, 3000);
        },
        fail: (err) => {
          uni.showToast({
            title: '选择图片失败',
            icon: 'none'
          });
          console.error('选择图片失败', err);
        }
      });
    },
    //重新上传
    getReupload () {
      this.$refs.popup.close()
      this.titleText = '请上传您的颈部照片'
      this.intelligentAnimation = false
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

// @keyframes scanMove {
//   0% {
//     height: 0;
//     opacity: 0.8;
//   }

//   10% {
//     opacity: 1;
//   }

//   45% {
//     height: 687rpx;
//     opacity: 1;
//   }

//   55% {
//     height: 687rpx;
//     opacity: 1;
//   }

//   90% {
//     height: 0;
//     opacity: 1;
//   }

//   100% {
//     height: 0;
//     opacity: 0.8;
//   }
// }</style>
