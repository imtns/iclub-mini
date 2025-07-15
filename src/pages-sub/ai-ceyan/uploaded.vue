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

      </view>
      <view class="unpBg_02">
        <image class="scan-anim" :src="ASSETSURL + 'unpBg_02.png'" style="width: 134rpx; height: 189rpx"
          mode="aspectFit|aspectFill|widthFix">
        </image>
      </view>
      <!-- 等级 -->
      <view class="grade">
        A
      </view>
      <view class="textNumber">
        <view> 颈纹数量：3</view>
        <view> 颈纹深度：3mm</view>
        <view> 颈纹长度：5cm</view>
      </view>
      <!-- 诊断结果 -->
      <view class="results">
        <view class="results_01">>>诊断结果</view>
        <view class="results_02">颈部皮肤初老表现，属动态性细纹阶段，建议以预防性治疗为主</view>
      </view>
      <view class="resultser">
        <view class="results_01">A级颈纹治疗方案</view>
        <view class="results_02">
          1.日常护理方案 <br>
          口外用修复<br>
          ·含神经酰胺/瑷尿酸的颈霜(早晚按摩使用】<br>
          ·每周2次A醇类产品【夜同薄涂，建立耐受)<br>
          口 肪睛强化<br>
          ·硬防晒:偶戴丝中/高领衣物<br>
          ·化学防晒:SPF304颈部专用防晒霜2.轻医美干预<br>
          口基础疗程<br>
          ·无针水光(含速明质酸+氯基酸);每月1次，连续3次<br>
          ·低浓度酶体1.5ml浅层军铺注射):同隔2个月1次<br>
        </view>
      </view>
      <view class="btnBg">
        <view>
          <image class="scan-anim" :src="ASSETSURL + 'unpBg_03.png'" style="width: 273rpx; height: 122rpx"
            mode="aspectFit|aspectFill|widthFix">
          </image>
        </view>
        <view class="unpBg_04">
          <image class="scan-anim" :src="ASSETSURL + 'unpBg_04.png'" style="width: 107rpx; height: 55rpx"
            mode="aspectFit|aspectFill|widthFix">
          </image>
        </view>
        <!-- 太阳码 -->
        <view class="unpBg_05" :style="{ backgroundImage: `url(${ASSETSURL}unpBg_05.png)` }">

        </view>
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

  .grade {
    // width: 63rpx;
    // height: 69rpx;
    font-family: OPPOSans;
    font-weight: 800;
    font-size: 83rpx;
    color: #FFFFFF;
    text-stroke: 2rpx #000000;
    -webkit-text-stroke: 2rpx #000000;
    position: absolute;
    top: 290rpx;
    right: 135rpx;
  }

  .textNumber {
    font-family: OPPOSans;
    font-weight: 500;
    font-size: 29rpx;
    color: #000000;
    line-height: 38rpx;
    position: absolute;
    top: 441rpx;
    right: 157rpx;
  }

  .results {
    margin-top: 620rpx;


    .results_01 {
      font-family: OPPOSans;
      font-weight: 800;
      font-size: 28rpx;
      color: #000000;
    }

    .results_02 {
      font-size: 28rpx;
      color: #000000;
    }
  }

  .resultser {
    .results_01 {
      font-family: OPPOSans;
      font-weight: 800;
      font-size: 28rpx;
      color: #000000;
      margin-top: 10rpx;
    }

    .results_02 {
      margin-top: 10rpx;
      font-family: OPPOSans;
      font-weight: 500;
      font-size: 27rpx;
      color: #000000;
      line-height: 36rpx;
    }
  }

  .btnBg {
    display: flex;
    margin-top: 17rpx;

    .unpBg_04 {
      margin-left: 122rpx;
      margin-top: auto;
      margin-bottom: 20rpx;
    }

    .unpBg_05 {
      width: 105rpx;
      height: 106rpx;
      background-size: 100% 100%;
      margin-left: 16rpx;
    }
  }
}
</style>
