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
      <view class="unpBg_01" :style="{ backgroundImage: `url(${ASSETSURL}unpBg_01.png)` }">

      </view>
      <view class="unpBg_02">
        <image class="scan-anim" :src="ASSETSURL + 'unpBg_02.png'" style="width: 134rpx; height: 189rpx"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
    </view>
  </view>
</template>

<script>
import { testAPI, testAPI1 } from './api'
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
    leftClick () {
      uni.navigateBack()
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
  height: 1280rpx;
  background-size: 100% 100%;
  margin: 0 12rpx 0 16rpx;
  position: relative;

  .unpBg_01 {
    background-size: 100% 100%;
    width: 246rpx;
    height: 283rpx;
    position: absolute;
    top: 285rpx;
    left: 34rpx;
  }

  .unpBg_02 {
    position: absolute;
    top: 397rpx;
    left: 211rpx;
  }
}
</style>
