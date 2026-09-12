<template>
  <view class="game-main">
    <view class="ui-center" :style="{ backgroundColor: bgColor }">
      <view class="game-ui">
        <!--居中-->
        <!--首页-->
        <view class="page" :style="{ left: (mainShow ? 0 : -750) + 'rpx', transition: 'all 0.5s ease' }">
          <image class="obj" :style="{ width: '750rpx', height: '714rpx', left: '0rpx', top: '504rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/bg.png" />
          <image class="obj rotate" :style="{ width: '179rpx', height: '79rpx', left: '311rpx', top: '506rpx', transformOrigin: '117rpx 58rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/stxt0.png" />
          <image class="obj rotate2" :style="{ width: '216rpx', height: '87rpx', left: '44rpx', top: '556rpx', transformOrigin: '158rpx 65rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/stxt1.png" />
          <image class="obj rotate2" :style="{ width: '227rpx', height: '110rpx', left: '499rpx', top: '764rpx', transformOrigin: '71rpx 70rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/stxt2.png" />
          <image class="obj rotate" :style="{ width: '240rpx', height: '90rpx', left: '54rpx', top: '874rpx', transformOrigin: '50rpx 73rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/stxt3.png" />
          <image class="obj rotate" :style="{ width: '231rpx', height: '96rpx', left: '350rpx', top: '1137rpx', transformOrigin: '146rpx 14rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/stxt4.png" />
          <image class="obj alpha" :style="{ width: '19rpx', height: '23rpx', left: '155rpx', top: '536rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/star0.png" />
          <image class="obj alpha2" :style="{ width: '38rpx', height: '49rpx', left: '178rpx', top: '512rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/star1.png" />
          <image class="obj alpha" :style="{ width: '48rpx', height: '57rpx', left: '220rpx', top: '499rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/star2.png" />
          <image class="obj alpha" :style="{ width: '40rpx', height: '59rpx', left: '673rpx', top: '934rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/star3.png" />
          <image class="obj alpha2" :style="{ width: '40rpx', height: '54rpx', left: '640rpx', top: '967rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/star4.png" />
          <image class="obj" :style="{ width: '677rpx', height: '178rpx', left: '46rpx', top: '296rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/title.png" />
          <!--开始测试-->
          <button class="obj start-button" hover-class="button-class" @tap="startOpen">
            <view class="start-ui">
              <image class="txt" src="https://wx.amo9.com/h5/2026/sep/imeik/start_btn2.png" />
              <image class="txt alpha" style="position: absolute;" src="https://wx.amo9.com/h5/2026/sep/imeik/start_btn3.png" />
            </view>
          </button>
          <!--规则按钮-->
          <button class="obj rule-button" hover-class="button-class" @tap="ruleOpen">
            <image class="txt" src="https://wx.amo9.com/h5/2026/sep/imeik/r0.png" />
            <image class="arrow" src="https://wx.amo9.com/h5/2026/sep/imeik/r1.png" />
          </button>
        </view>
        <!--答题-->
        <view class="page" v-for="(item, index) in answer" :key="index">
          <image class="obj" :style="{ width: '750rpx', height: '1350rpx', left: (0 + item.x) + 'rpx', top: '124rpx', transition: 'all 0.2s ease' }" src="https://wx.amo9.com/h5/2026/sep/imeik/answer/bg.png" />
          <image class="obj" :style="{ width: '213rpx', height: '50rpx', left: (154 + item.x) + 'rpx', top: '311rpx', transition: 'all 0.3s ease' }" :src="item.page" @load="loadComplete" @error="loadComplete" />
          <image class="obj" :style="{ width: '750rpx', height: '601rpx', left: (0 + item.x) + 'rpx', top: '280rpx', transition: 'all 0.4s ease' }" :src="item.title" @load="loadComplete" @error="loadComplete" />
          <view class="obj" :class="item.select == 0 ? 'heartbeat' : ''" :style="{ left: (38 + item.x) + 'rpx', top: '778rpx', transition: 'all 0.5s ease' }">
            <image :style="{ width: '661rpx', height: '142rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/a_no.png" />
            <image class="obj" :style="{ opacity: item.select == 0 ? 1 : 0, width: '661rpx', height: '142rpx', transition: 'all 0.5s ease' }" src="https://wx.amo9.com/h5/2026/sep/imeik/a_ok2.png" />
          </view>
          <view class="obj" :class="item.select == 1 ? 'heartbeat' : ''" :style="{ left: (38 + item.x) + 'rpx', top: '920rpx', transition: 'all 0.7s ease' }">
            <image :style="{ width: '661rpx', height: '166rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/b_no.png" />
            <image class="obj" :style="{ opacity: item.select == 1 ? 1 : 0, width: '661rpx', height: '166rpx', transition: 'all 0.5s ease' }" src="https://wx.amo9.com/h5/2026/sep/imeik/b_ok2.png" />
          </view>
          <view class="obj" :class="item.select == 2 ? 'heartbeat' : ''" :style="{ left: (38 + item.x) + 'rpx', top: '1085rpx', transition: 'all 0.9s ease' }">
            <image :style="{ width: '661rpx', height: '142rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/c_no.png" />
            <image class="obj" :style="{ opacity: item.select == 2 ? 1 : 0, width: '661rpx', height: '142rpx', transition: 'all 0.5s ease' }" src="https://wx.amo9.com/h5/2026/sep/imeik/c_ok2.png" />
          </view>
          <image class="obj" :style="{ width: '661rpx', height: '142rpx', left: (38 + item.x) + 'rpx', top: '778rpx', transition: 'all 0.6s ease' }" :src="item.a" @load="loadComplete" @error="loadComplete" />
          <image class="obj" :style="{ width: '661rpx', height: '166rpx', left: (38 + item.x) + 'rpx', top: '920rpx', transition: 'all 0.8s ease' }" :src="item.b" @load="loadComplete" @error="loadComplete" />
          <image class="obj" :style="{ width: '661rpx', height: '142rpx', left: (38 + item.x) + 'rpx', top: '1085rpx', transition: 'all 1.0s ease' }" :src="item.c" @load="loadComplete" @error="loadComplete" />
          <image class="obj heartbeat2" :style="{ opacity: item.select == 0 ? '1' : '0', width: '661rpx', height: '142rpx', left: (38 + item.x) + 'rpx', top: '778rpx', transition: 'all 0.6s ease' }" :src="item.a2" @load="loadComplete" @error="loadComplete" :id="index" @tap="selectA" />
          <image class="obj heartbeat2" :style="{ opacity: item.select == 1 ? '1' : '0', width: '661rpx', height: '166rpx', left: (38 + item.x) + 'rpx', top: '920rpx', transition: 'all 0.8s ease' }" :src="item.b2" @load="loadComplete" @error="loadComplete" :id="index" @tap="selectB" />
          <image class="obj heartbeat2" :style="{ opacity: item.select == 2 ? '1' : '0', width: '661rpx', height: '142rpx', left: (38 + item.x) + 'rpx', top: '1085rpx', transition: 'all 1.0s ease' }" :src="item.c2" @load="loadComplete" @error="loadComplete" :id="index" @tap="selectC" />
        </view>
        <!--答题按钮-->
        <view class="page" v-if="answerShow">
          <button class="obj answer-button" :style="{ left: (answerID == 0 ? 228 : 74) + 'rpx', opacity: answerID == 0 ? 0 : 1, transition: 'all 0.5s ease' }" hover-class="button-class" @tap="previousQuestion">
            <image class="heartbeat" :style="{ width: '278rpx', height: '90rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/answer/btn_previous.png" />
          </button>
          <button class="obj answer-button" :style="{ left: (answerID == 0 ? 228 : 398) + 'rpx', opacity: answer[answerID] && answer[answerID].select == -1 ? 0.5 : 1, transition: 'all 0.5s ease' }" hover-class="button-class" @tap="nextQuestion">
            <image class="heartbeat" :style="{ width: '278rpx', height: '90rpx' }" :src="answerID == 7 ? 'https://wx.amo9.com/h5/2026/sep/imeik/answer/btn_complete.png' : 'https://wx.amo9.com/h5/2026/sep/imeik/answer/btn_next.png'" />
          </button>
        </view>
        <!--结果页-->
        <view class="page" :style="{ left: (imgShow ? 0 : 750) + 'rpx', transition: 'all 0.5s ease' }">
          <image :style="{ width: '750rpx', height: '1700rpx' }" :src="imgUrl" />
          <image class="obj alpha" :style="{ width: '58rpx', height: '49rpx', left: '36rpx', top: '901rpx' }" :src="'https://wx.amo9.com/h5/2026/sep/imeik/img/l_' + imgType + '.png'" />
          <image class="obj alpha2" :style="{ width: '58rpx', height: '49rpx', left: '652rpx', top: '901rpx' }" :src="'https://wx.amo9.com/h5/2026/sep/imeik/img/r_' + imgType + '.png'" />
          <image class="obj alpha" :style="{ width: '58rpx', height: '49rpx', left: '634rpx', top: '1363rpx' }" :src="'https://wx.amo9.com/h5/2026/sep/imeik/img/r_' + imgType + '.png'" />
          <image class="obj heartbeat2" :style="{ width: '69rpx', height: '56rpx', left: '332rpx', top: '1235rpx' }" :src="'https://wx.amo9.com/h5/2026/sep/imeik/img/b_' + imgType + '.png'" />
          <button class="obj save-button" :style="{ left: '110rpx', backgroundImage: 'url(https://wx.amo9.com/h5/2026/sep/imeik/img/bg_' + imgType + '.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }" hover-class="button-class" @tap="saveImg">
            <image class="heartbeat" :style="{ width: '244rpx', height: '79rpx' }" :src="'https://wx.amo9.com/h5/2026/sep/imeik/img/save_' + imgType + '.png'" />
          </button>
          <button class="obj save-button" :style="{ left: '397rpx', backgroundImage: 'url(https://wx.amo9.com/h5/2026/sep/imeik/img/bg_' + imgType + '.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }" hover-class="button-class" open-type="share">
            <image class="heartbeat" :style="{ width: '244rpx', height: '79rpx' }" :src="'https://wx.amo9.com/h5/2026/sep/imeik/img/share_' + imgType + '.png'" />
          </button>
          <button class="obj store-button heartbeat2" :style="{ backgroundImage: 'url(https://wx.amo9.com/h5/2026/sep/imeik/img/store_' + imgType + '.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }" hover-class="button-class" @tap="storeOpen" />
        </view>
        <!--居中end-->
      </view>
      <!--置顶-->
    </view>
    <!--规则-->
    <view class="tips-wnd" v-show="ruleShow" @touchmove.stop.prevent>
      <view class="tips-bg" :class="bgClass" />
      <view class="tips-ui" :class="tipsClass">
        <view class="rule">
          <image :style="{ width: '702rpx', height: '1075rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/rule/bg3.png" />
          <image class="obj alpha" :style="{ width: '53rpx', height: '50rpx', left: '528rpx', top: '147rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/rule/star0.png" />
          <image class="obj alpha2" :style="{ width: '53rpx', height: '50rpx', left: '105rpx', top: '148rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/rule/star1.png" />
          <image class="obj heartbeat" :style="{ width: '83rpx', height: '64rpx', left: '551rpx', top: '923rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/rule/star2.png" />
          <image class="obj heartbeat" :style="{ width: '73rpx', height: '64rpx', left: '56rpx', top: '937rpx' }" src="https://wx.amo9.com/h5/2026/sep/imeik/rule/star3.png" />
          <button class="obj rule-out" :style="{ width: '90rpx', height: '90rpx' }" hover-class="button-class" @tap="ruleClose" />
        </view>
      </view>
    </view>
    <!--音乐按钮-->
    <view class="soundioc" :style="{ top: returnY + 'px' }">
      <image :class="audioPlay ? 'soundImg-play' : ''" :style="{ display: 'flex', width: returnSize + 'px', height: returnSize + 'px' }" :src="audioPlay ? 'https://wx.amo9.com/h5/2026/sep/imeik/audio/on.png' : 'https://wx.amo9.com/h5/2026/sep/imeik/audio/off.png'" @tap="bgSoundClick" />
    </view>
    <!--返回按钮-->
    <button class="return-button" :style="{ top: returnY + 'px', width: returnSize + 'px', height: returnSize + 'px' }" hover-class="button-class" @tap="exit" />
    <canvas type="2d" :style="{ display: 'flex', position: 'absolute', width: width + 'px', height: height + 'px', left: canvasX + 'px', top: '0' }" id="myCanvas" />
  </view>
</template>

<script>
// 逆转换自原生小程序 build/dev/dist/pages-mbti/index.js
// 保持与原生版本功能一致：MBTI 肌肤测试，含登录授权、答题、结果海报生成、埋点上报

// 登录授权相关配置 —— 与项目 ls() 保持一致，key 带 test 环境前缀
const TOKEN_KEY = 'test_iclubUserToken3';
const USER_INFO_KEY = 'test_userInfo';
const RETURN_URL_KEY = 'test_returnUrl';
const MBTI_PENDING_KEY = 'test_mbtiPendingStart';
const LOGIN_PAGE_URL = '/pages-sub/login/index';

// 模块级变量（对应原生 Page 外的 var）
let innerAudioContext = null;
const answerUrl = 'https://wx.amo9.com/h5/2026/sep/imeik/answer/v1/';
let loadImgI = 0;
let loadCompleteNum = 0;
let imgID = '';
let canvas = null;
let wWidth = 0;
let wHeight = 0;
let imgScale = 0;
let ctx2d = null;
let resourceI = 0;
let resourceL = 0;
let resource = [];
let texture = [];

const imgData = {
  efdo: { color: '#ffdfee', type: '0' },
  efdx: { color: '#ffdfee', type: '0' },
  efuo: { color: '#ffe0b8', type: '1' },
  efux: { color: '#ffdfee', type: '0' },
  esdo: { color: '#ffdfee', type: '0' },
  esdx: { color: '#ffdfee', type: '0' },
  esuo: { color: '#ffe0b8', type: '1' },
  esux: { color: '#ffe0b8', type: '1' },
  lfdo: { color: '#ffdfee', type: '0' },
  lfdx: { color: '#ffdfee', type: '0' },
  lfuo: { color: '#ffdfee', type: '0' },
  lfux: { color: '#ffdfee', type: '0' },
  lsdo: { color: '#ffdfee', type: '0' },
  lsdx: { color: '#ffdfee', type: '0' },
  lsuo: { color: '#ffdfee', type: '0' },
  lsux: { color: '#ffdfee', type: '0' }
};

export default {
  data() {
    return {
      tipsClass: 'hidden',
      bgClass: 'bg-hidden',
      ruleShow: false,
      returnY: 0,
      returnSize: 0,
      audioPlay: true,
      answerShow: false,
      answerID: -1,
      answer: [],
      userInfo: null,
      mainShow: true,
      imgShow: false,
      bgColor: '#ffdfee',
      imgUrl: '',
      imgType: '0',
      canvas: null,
      width: 750,
      height: 1334,
      canvasX: -4000,
      tempFilePath: ''
    };
  },
  onLoad(options) {
    const that = this;
    innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = 'https://wx.amo9.com/h5/2026/sep/imeik/bg.mp3';
    innerAudioContext.loop = true;
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const windowInfo = wx.getWindowInfo();
    let xyPercentage = 750 / windowInfo.windowWidth;
    console.log(menuButtonInfo);
    const value = wx.getStorageSync('bgSound');
    console.log(value);
    if (value != null && value.length > 3) {
      this.audioPlay = value == 'true';
    }
    if (this.audioPlay) {
      innerAudioContext.autoplay = true;
      innerAudioContext.play();
    }
    this.mainShow = true;
    this.imgShow = false;
    this.answer = [];
    this.answerShow = false;
    this.answerID = -1;
    this.tempFilePath = '';
    this.bgColor = '#ffdfee';
    this.returnY = menuButtonInfo.top;
    this.returnSize = menuButtonInfo.height;

    // 画布初始化
    wWidth = windowInfo.windowWidth;
    wHeight = windowInfo.windowHeight;
    imgScale = wWidth / 750;
    this.width = wWidth;
    this.height = 1334 * imgScale;

    that.ctx = wx.createCameraContext();
    const query = uni.createSelectorQuery().in(this);
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log('222');
        canvas = res[0].node;
        that.canvas = canvas;
        ctx2d = canvas.getContext('2d');
        const dpr = windowInfo.pixelRatio;
        let _w = res[0].width;
        console.log(res[0].width, res[0].height, dpr);
        canvas.width = res[0].width * dpr;
        canvas.height = 1334 * (_w / 750) * dpr;
        ctx2d.scale(dpr, dpr);
      });
  },
  methods: {
    startOpen() {
      // 1. 判断用户是否已登录并授权过用户信息
      const token = wx.getStorageSync(TOKEN_KEY);
      const userInfo = wx.getStorageSync(USER_INFO_KEY);
      if (token && userInfo) {
        this.userInfo = userInfo;
        console.log('已授权，用户信息：', userInfo);
        this.beginAnswer();
        return;
      }
      // 2. 未授权：跳转登录页弹出授权窗口
      wx.setStorageSync(RETURN_URL_KEY, '/pages-mbti/index');
      wx.setStorageSync(MBTI_PENDING_KEY, true);
      wx.navigateTo({
        url: LOGIN_PAGE_URL,
        fail: () => {
          wx.showToast({ title: '无法打开登录页，请重试', icon: 'none' });
        }
      });
    },
    waitUserInfoAndStart() {
      let times = 0;
      const maxTimes = 10;
      const that = this;
      const timer = setInterval(() => {
        times++;
        const userInfo = wx.getStorageSync(USER_INFO_KEY);
        if (userInfo) {
          clearInterval(timer);
          wx.removeStorageSync(MBTI_PENDING_KEY);
          that.userInfo = userInfo;
          console.log('授权成功，用户信息：', userInfo);
          that.beginAnswer();
        } else if (times >= maxTimes) {
          clearInterval(timer);
          wx.removeStorageSync(MBTI_PENDING_KEY);
          wx.showToast({ title: '获取用户信息失败，请重试', icon: 'none' });
        }
      }, 500);
    },
    beginAnswer() {
      this.answer = [
        { id: 0, x: 750, title: '', a: '', b: '', c: '', a2: '', b2: '', c2: '', page: '', select: -1 },
        { id: 1, x: 750, title: '', a: '', b: '', c: '', a2: '', b2: '', c2: '', page: '', select: -1 },
        { id: 2, x: 750, title: '', a: '', b: '', c: '', a2: '', b2: '', c2: '', page: '', select: -1 },
        { id: 3, x: 750, title: '', a: '', b: '', c: '', a2: '', b2: '', c2: '', page: '', select: -1 },
        { id: 4, x: 750, title: '', a: '', b: '', c: '', a2: '', b2: '', c2: '', page: '', select: -1 },
        { id: 5, x: 750, title: '', a: '', b: '', c: '', a2: '', b2: '', c2: '', page: '', select: -1 },
        { id: 6, x: 750, title: '', a: '', b: '', c: '', a2: '', b2: '', c2: '', page: '', select: -1 },
        { id: 7, x: 750, title: '', a: '', b: '', c: '', a2: '', b2: '', c2: '', page: '', select: -1 }
      ];
      loadImgI = 0;
      this.loadAnswerImg();
      this.mainShow = false;
      this.answerShow = true;
      this.answerID = 0;
      setTimeout(() => {
        this.answer[this.answerID].x = 0;
      }, 100);
      this.report('开始测试');
    },
    nextQuestion() {
      if (this.answerID == 7) {
        imgID = '';
        const sList = [1, 2, 3];
        let s = sList[this.answer[0].select] + sList[this.answer[1].select];
        console.log('第1个字母分数：' + s);
        if (s > 3) {
          imgID = 'l';
        } else imgID = 'e';
        s = sList[this.answer[2].select] + sList[this.answer[3].select];
        console.log('第2个字母分数：' + s);
        if (s > 3) {
          imgID += 'f';
        } else imgID += 's';
        s = sList[this.answer[4].select] + sList[this.answer[5].select];
        console.log('第3个字母分数：' + s);
        if (s > 3) {
          imgID += 'd';
        } else imgID += 'u';
        s = sList[this.answer[6].select] + sList[this.answer[7].select];
        console.log('第4个字母分数：' + s);
        if (s > 3) {
          imgID += 'x';
        } else imgID += 'o';
        console.log('imgID：' + imgID);
        console.log(imgData[imgID]);

        this.answer[this.answerID].x = -750;
        console.log(this.userInfo);
        this.answerShow = false;
        this.canvasX = -4000;
        this.tempFilePath = '';
        this.imgShow = true;
        this.imgUrl = 'https://wx.amo9.com/h5/2026/sep/imeik/img/' + imgID + '.png';
        this.bgClass = imgData[imgID].color;
        this.imgType = imgData[imgID].type;

        // 加载资源生成海报
        resource = [{ name: 'bg', url: 'https://wx.amo9.com/h5/2026/sep/imeik/img/v2/_' + imgID + '.png' }];
        resource.push({ name: 'head', url: this.userInfo.headUrl });
        resourceI = -1;
        resourceL = resource.length;
        this.resourceLoad();
        this.report('生成结果');
      } else {
        if (this.answer[this.answerID].select > -1) {
          this.answer[this.answerID].x = -750;
          this.answerID++;
          this.answer[this.answerID].x = 0;
        }
        this.report('下一题');
      }
      this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
    },
    storeOpen() {
      this.report('立即咨询');
    },
    resourceLoad() {
      console.log('resourceLoad');
      resourceI++;
      console.log('resourceI:' + resourceI + ' resourceL:' + resourceL);
      const that = this;
      if (resourceL > resourceI) {
        const img = canvas.createImage();
        img.onload = (e) => {
          console.log('onload');
          console.log(img.width);
          texture[resource[resourceI].name] = { obj: img, width: img.width, height: img.height };
          that.resourceLoad();
        };
        img.onerror = (e) => {
          console.log('onerror:' + e);
        };
        img.src = resource[resourceI].url;
      } else if (resourceL == resourceI) {
        that.gamePlay();
      }
    },
    gamePlay() {
      console.log('gamePlay');
      ctx2d.clearRect(0, 0, wWidth, wHeight);
      ctx2d.drawImage(texture['head'].obj, 0, 0, texture['head'].width, texture['head'].height, 41 * imgScale, 81 * imgScale, 66 * imgScale, 66 * imgScale);
      ctx2d.drawImage(texture['bg'].obj, 0, 0, texture['bg'].width, texture['bg'].height, 0, 0, 750 * imgScale, 1334 * imgScale);
      ctx2d.font = 32 * imgScale + 'px Arial';
      ctx2d.fillStyle = '#f22d61';
      ctx2d.textAlign = 'left';
      ctx2d.fillText('@美客+' + this.userInfo.nickName, 121 * imgScale, (97 + 32) * imgScale);
      setTimeout(() => {
        this.canvasToTempFilePath();
      }, 1000);
    },
    canvasToTempFilePath() {
      wx.canvasToTempFilePath({
        canvas: this.canvas,
        success: (res) => {
          console.log(res.tempFilePath);
          this.tempFilePath = res.tempFilePath;
        }
      });
    },
    loadAnswerImg() {
      console.log('加载' + (loadImgI + 1) + '题');
      loadCompleteNum = 0;
      this.answer[loadImgI].page = answerUrl + 'page' + this.answer[loadImgI].id + '.png';
      this.answer[loadImgI].title = answerUrl + this.answer[loadImgI].id + '_title.png';
      this.answer[loadImgI].a = answerUrl + this.answer[loadImgI].id + '_a.png';
      this.answer[loadImgI].b = answerUrl + this.answer[loadImgI].id + '_b.png';
      this.answer[loadImgI].c = answerUrl + this.answer[loadImgI].id + '_c.png';
      this.answer[loadImgI].a2 = answerUrl + 'ok/' + this.answer[loadImgI].id + '_a.png';
      this.answer[loadImgI].b2 = answerUrl + 'ok/' + this.answer[loadImgI].id + '_b.png';
      this.answer[loadImgI].c2 = answerUrl + 'ok/' + this.answer[loadImgI].id + '_c.png';
    },
    selectA(e) {
      const idx = Number(e.currentTarget.id);
      this.answer[this.answerID].select = 0;
      this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
    },
    selectB(e) {
      const idx = Number(e.currentTarget.id);
      this.answer[this.answerID].select = 1;
      this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
    },
    selectC(e) {
      const idx = Number(e.currentTarget.id);
      this.answer[this.answerID].select = 2;
      this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
    },
    previousQuestion() {
      if (this.answerID > 0) {
        this.answer[this.answerID].x = 750;
        this.answerID--;
        this.answer[this.answerID].x = 0;
        this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
        this.report('上一题');
      }
    },
    loadComplete() {
      loadCompleteNum++;
      if (loadCompleteNum == 8) {
        console.log('加载完成');
        loadImgI++;
        if (8 > loadImgI) this.loadAnswerImg();
      }
    },
    exit() {
      wx.navigateBack();
      this.report('返回到主页');
    },
    ruleOpen() {
      this.ruleShow = true;
      setTimeout(() => {
        this.tipsClass = 'show';
        this.bgClass = 'bg-show';
      }, 200);
      this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
      this.report('活动规则');
    },
    ruleClose() {
      this.tipsClass = 'hidden';
      this.bgClass = 'bg-hidden';
      setTimeout(() => {
        this.ruleShow = false;
      }, 500);
      this.setAudioPlay('https://wx.amo9.com/h5/2026/sep/imeik/button.mp3');
    },
    bgSoundClick() {
      if (this.audioPlay) {
        innerAudioContext.pause();
      } else {
        innerAudioContext.play();
      }
      this.audioPlay = !this.audioPlay;
      wx.setStorageSync('bgSound', String(this.audioPlay));
    },
    saveImg() {
      wx.saveImageToPhotosAlbum({
        filePath: this.tempFilePath,
        success: (res) => {
          wx.showToast({ title: '已保存到相册' });
        },
        fail: (err) => {
          console.log(err);
          if (err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' || err.errMsg === 'saveImageToPhotosAlbum:fail auth deny' || err.errMsg === 'saveImageToPhotosAlbum:fail authorize no response') {
            console.log('用户一开始拒绝了，我们想再次发起授权');
            const title = '系统提示';
            const content = '请允许我们保存图片到相册';
            wx.showModal({
              title,
              content,
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting['scope.writePhotosAlbum']) {
                        // 授权成功
                      } else {
                        // 用户仍未授权
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
      this.report('一键保存');
    },
    setAudioPlay(str) {
      if (this.audioPlay) {
        const audio = wx.createInnerAudioContext();
        audio.autoplay = true;
        audio.src = str;
        audio.onEnded((res) => {
          audio.offEnded();
          audio.destroy();
          console.log('销毁');
        });
      }
    },
    /**
     * 埋点上报 —— 与全局 mixin 的 report(name) 保持一致
     */
    report(value) {
      const gd = getApp() && getApp().globalData ? getApp().globalData : {};
      const user = wx.getStorageSync('test_userInfo') || {};
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1] || {};
      const prevPage = pages[pages.length - 2] || {};
      const scene = wx.getLaunchOptionsSync().scene;
      const deviceInfo = wx.getDeviceInfo();
      const appBaseInfo = wx.getAppBaseInfo();

      const params = {
        visitId: gd.visitId || '',
        appid: appBaseInfo.appId || gd.appId || '',
        openId: wx.getStorageSync('test_openId') || '',
        unionid: wx.getStorageSync('test_unionId') || '',
        platSource: 9,
        eventType: 2,
        scene: scene,
        phone: user.phone || '',
        userId: user.objectCode || '',
        doctorLevel: user.doctorLevel || '',
        pageUrl: curPage.route || 'pages-mbti/index',
        referrerUrl: prevPage.route || '',
        imei: deviceInfo.deviceId || '',
        wechatEdition: appBaseInfo.hostVersion || '',
        platform: (deviceInfo.osName || '') + ' ' + (deviceInfo.osVersion || ''),
        version: gd.version || '',
        phoneModelId: deviceInfo.deviceModel || '',
        manufacturer: deviceInfo.deviceBrand || '',
        networkType: gd.networkType || '',
        actionTime: this._formatTime(),
        pageSession: Math.random().toString(16).substring(2) + new Date().getTime(),
        activityName: value
      };

      const wxParams = {};
      Object.keys(params).forEach((k) => { wxParams[k.toLowerCase()] = params[k]; });
      try {
        wx.reportEvent('element_click', wxParams);
      } catch (e) {
        console.warn('wx.reportEvent 上报失败', e);
      }

      const baseUrl = 'https://user-test.imeik.com';
      if (!params.unionid || !params.openId) {
        console.log('埋点暂缓上报（缺少 unionid/openId）', params);
        return;
      }
      wx.request({
        url: baseUrl + '/base/burypoint/pageEventReport',
        method: 'POST',
        data: params,
        header: { 'content-type': 'application/json' },
        success: (res) => { console.log('埋点上报成功', value, res); },
        fail: (err) => { console.warn('埋点上报失败', value, err); }
      });
    },
    _formatTime(time) {
      time = time || new Date();
      const opt = {
        'Y+': time.getFullYear().toString(),
        'M+': (time.getMonth() + 1).toString(),
        'D+': time.getDate().toString(),
        'H+': time.getHours().toString(),
        'm+': time.getMinutes().toString(),
        's+': time.getSeconds().toString()
      };
      let format = 'YYYY-MM-DD HH:mm:ss';
      let ret;
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(format);
        if (ret) {
          format = format.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
        }
      }
      return format;
    }
  },
  onReady() {},
  onShow() {
    const token = wx.getStorageSync(TOKEN_KEY);
    const pending = wx.getStorageSync(MBTI_PENDING_KEY);
    if (token && pending) {
      this.waitUserInfoAndStart();
    } else if (!token) {
      wx.removeStorageSync(MBTI_PENDING_KEY);
    }
  },
  onHide() {},
  onUnload() {
    if (this.audioPlay) {
      innerAudioContext.pause();
    }
  },
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareTimeline() {
    this.report('分享朋友圈');
    return {
      title: '点击测测你的肌肤MBTI',
      path: '/pages-mbti/index',
      imageUrl: 'https://wx.amo9.com/h5/2026/sep/imeik/icon.jpg'
    };
  },
  onShareAppMessage() {
    this.report('一键分享');
    return {
      title: '点击测测你的肌肤MBTI',
      path: '/pages-mbti/index',
      imageUrl: 'https://wx.amo9.com/h5/2026/sep/imeik/icon.jpg',
      success: (res) => {
        console.log('转发成功', res);
      },
      fail: (res) => {
        console.log('转发失败', res);
      }
    };
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: Pangmenzhengdao;
  src: url("https://udstatic.imeik.com/pcUploads/1712648373491/pangmenzhengdao.ttf");
}

.game-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
}

.ui-center {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: fixed;
}

.game-ui {
  display: flex;
  width: 750rpx;
  height: 1700rpx;
  position: fixed;
  flex-direction: column;
  margin-top: 100rpx;
}

.obj {
  display: flex;
  position: absolute;
}

.heartbeat {
  animation: heartbeat-data 1.5s infinite;
}

.page {
  position: relative;
}

.page .title {
  display: flex;
  position: absolute;
}

@keyframes heartbeat-data {
  0% { transform: scale(0.95); }
  50% { transform: scale(1); }
  100% { transform: scale(0.95); }
}

.heartbeat2 {
  animation: heartbeat-data2 1.5s infinite;
}

@keyframes heartbeat-data2 {
  0% { transform: scale(1.05); }
  50% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.light {
  animation: light-data 1.5s infinite;
}

@keyframes light-data {
  0% { box-shadow: 10rpx 10rpx 20rpx #F2F0EE; }
  50% { box-shadow: 10rpx 10rpx 20rpx #F2F0EE; }
  100% { box-shadow: 10rpx 10rpx 20rpx #F2F0EE; }
}

.alpha {
  animation: alpha-data 1.5s infinite;
}

@keyframes alpha-data {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.alpha2 {
  animation: alpha-data2 1.5s infinite;
}

@keyframes alpha-data2 {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.rotate {
  animation: rotate-data 1.5s infinite;
}

@keyframes rotate-data {
  0% { transform: rotate(5deg); }
  50% { transform: rotate(-5deg); }
  100% { transform: rotate(5deg); }
}

.rotate2 {
  animation: rotate-data2 1.5s infinite;
}

@keyframes rotate-data2 {
  0% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(-5deg); }
}

.button-class {
  transform: scale(1.1);
}

button::after {
  border: none;
}

.start-button {
  width: 643rpx;
  height: 166rpx;
  padding: 0;
  left: 71rpx;
  top: 1226rpx;
  margin: auto;
  background: rgba(255, 204, 51, 0);
  background-image: url(https://wx.amo9.com/h5/2026/sep/imeik/start_btn0.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
}

.start-ui {
  display: flex;
  margin-left: 142rpx;
  margin-top: 18rpx;
  animation: heartbeat-data 1.5s infinite;
}

.start-button .start-ui .txt {
  width: 329rpx;
  height: 115rpx;
}

.rule-button {
  width: 138rpx;
  height: 30rpx;
  padding: 0;
  left: 325rpx;
  top: 1404rpx;
  margin: auto;
  border: none;
  border-radius: 0;
  background: rgba(255, 204, 51, 0);
}

.rule-button .txt {
  width: 112rpx;
  height: 27rpx;
}

.rule-button .arrow {
  width: 13rpx;
  height: 16rpx;
  margin-top: 8rpx;
  animation: arrow-data 1.5s infinite;
}

@keyframes arrow-data {
  0% { margin-left: 10rpx; }
  50% { margin-left: 0rpx; }
  100% { margin-left: 10rpx; }
}

.return-button {
  position: fixed;
  padding: 0;
  left: 31rpx;
  margin: auto;
  background: rgba(255, 204, 51, 0);
  background-image: url(https://wx.amo9.com/h5/2026/sep/imeik/return.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
}

.tips-wnd {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.tips-bg {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0);
}

.bg-show {
  background-color: rgba(0, 0, 0, 0.7);
  transition: all 0.5s ease;
}

.bg-hidden {
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.5s ease;
}

.show {
  margin-bottom: 0;
  transition: all 0.5s ease;
}

.hidden {
  margin-bottom: -3000rpx;
  transition: all 0.5s ease;
}

.tips-ui {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.rule {
  display: flex;
  position: relative;
  width: 702rpx;
  height: 1075rpx;
  margin-top: 110rpx;
}

.rule-out {
  width: 95rpx;
  height: 95rpx;
  padding: 0;
  left: 606rpx;
  top: -41rpx;
  margin: auto;
  background: rgba(255, 204, 51, 0);
  background-image: url(https://wx.amo9.com/h5/2026/sep/imeik/rule/out.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
}

.soundioc {
  position: fixed;
  display: flex;
  left: 120rpx;
}

.soundImg-play {
  animation: rotate360 1s linear infinite;
}

@keyframes rotate360 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.answer-button {
  width: 278rpx;
  height: 90rpx;
  padding: 0;
  top: 1346rpx;
  margin: auto;
  background: rgba(255, 204, 51, 0);
  background-image: url(https://wx.amo9.com/h5/2026/sep/imeik/answer/btn_bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
}

.save-button {
  width: 244rpx;
  height: 79rpx;
  padding: 0;
  top: 1124rpx;
  margin: auto;
  background: rgba(255, 204, 51, 0);
  border: none;
  border-radius: 0;
}

.store-button {
  width: 228rpx;
  height: 52rpx;
  padding: 0;
  left: 403rpx;
  top: 1355rpx;
  margin: auto;
  background: rgba(255, 204, 51, 0);
  border: none;
  border-radius: 0;
}
</style>
