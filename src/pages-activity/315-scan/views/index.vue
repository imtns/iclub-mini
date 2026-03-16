<template>
  <!-- 弹窗打开时禁止页面滚动，关闭时显式设置 overflow:auto 以恢复滚动（避免从分享链接进入关闭弹窗后无法滑动） -->
  <page-meta :page-style="anyPopupOpen || showAddressPopup ? 'overflow: hidden;' : 'overflow: auto;'" />
  <view class="container">
    <image class="index-bg" :src="getStaticImage('index-bg.png')" mode="aspectFill" />
    <!-- 导航栏背景渐变蒙层（跟随滚动透明度 0→1，z-index 在导航栏之下） -->
    <view class="nav-bg-overlay" :style="{ opacity: navBgOpacity, height: navBarHeight ? navBarHeight + 'px' : '' }">
    </view>
    <!-- 自定义导航栏 -->
    <ik-custom-header theme="light" system-text-color extra-holder :transparent="true" title="首页"
      @navBarHeight="onNavBarHeight" />

    <!-- 全页 loading -->
    <view v-if="pageLoading" class="page-loading">
      <ik-loading />
    </view>

    <view v-else class="page-content">
      <!-- ── 头部区域 ── -->
      <view class="header-area">
        <view v-if="isLogin" class="user-avatar-wrap">
          <image class="user-avatar" :src="(userInfo && userInfo.avatar) || ''" mode="aspectFill" />
        </view>
        <image class="title-img" :src="getStaticImage('title.png')" mode="widthFix" />
        <image class="subtitle-img" :src="getStaticImage('subtitle.png')" mode="widthFix" />
        <view class="rule-btn" @tap="onRuleBtnTap">
          <text class="rule-btn__text">活动规则</text>
        </view>
        <button class="share-btn" open-type="share" @tap="onShareBtnTap">
          <image :src="getStaticImage('btn-share.png')" mode="aspectFit" />
        </button>
      </view>

      <!-- ── 品牌卡片轮播 ── -->
      <brand-swiper :cards="brandCards" :current="currentCardIndex" @change="onCardChange" />

      <!-- ── 功能入口区 ── -->
      <view class="func-entry-area">
        <!-- 我的星星 -->
        <view class="func-btn" @tap="onMyStarsTap">
          <view class="func-btn__badge" v-if="displayStarCount">
            <text class="func-btn__badge-text">{{ displayStarCount }}</text>
          </view>
          <image class="func-btn__img" :src="getStaticImage('btn-my-stars.png')" mode="aspectFit" />
        </view>
        <!-- 产品溯源 -->
        <image class="func-btn__img scan-btn" :src="getStaticImage('btn-scan.png')" mode="aspectFit" @tap="onScanTap" />
        <!-- 星星转赠 -->
        <image class="transfer-btn" :src="getStaticImage('btn-transfer.png')" mode="aspectFit"
          @tap="onTransferTap" />
      </view>

      <!-- ── 礼品兑换区 ── -->
      <view class="gift-exchange-area">
        <image class="gift-exchange-bg" :src="getStaticImage('gift-area.png')" mode="widthFix" />
        <view class="gift-exchange-inner">
          <view class="gift-header">
            <text class="gift-more" @tap="onGiftMoreTap">{{ giftMoreText }}</text>
          </view>
          <scroll-view class="gift-scroll" scroll-x :show-scrollbar="false">
            <view class="gift-scroll-inner">
              <home-gift-card v-for="item in homeGiftList" :key="item.prizeCode" :item="item" @tap="onGiftMoreTap" />
            </view>
          </scroll-view>
        </view>
      </view>

      <!-- ── 我的礼品入口 ── -->
      <view class="list-entry" @tap="onMyGiftTap">
        <image class="list-entry__img" :src="getStaticImage('index-more.png')" mode="widthFix" />
      </view>

      <!-- ── 溯源教程入口：点击打开教程弹窗 ── -->
      <view class="tutorial-toggle" @tap="onTutorialToggle">
        <image class="tutorial-toggle__more" :src="getStaticImage('index-look.png')" mode="widthFix" />
        <image class="tutorial-toggle__arrow" :src="getStaticImage('index-arrow.png')" mode="aspectFit" />
      </view>
    </view>

    <!-- ═══════════ 弹窗区 ═══════════ -->

    <!-- 星星转赠弹窗：监听 change 以同步 store，避免点击蒙版关闭后无法再次打开 -->
    <uni-popup ref="transferPop" type="center" background-color="transparent" :is-mask-click="false" @change="onTransferPopupChange">
      <view class="transfer-popup">
        <image class="transfer-popup-bg" :src="getStaticImage('transfer-bg.png')" mode="widthFix" />
        <view class="transfer-popup-body">
          <image class="transfer-popup-title" :src="getStaticImage('transfer-title-0.png')" mode="widthFix" />
          <view class="transfer-amount-row">
            <view class="transfer-amount-inner">
              <input :key="'transfer-input-' + transferInputKey" class="transfer-amount-input" type="number"
                placeholder="请输入数量" placeholder-style="text-align: center;"
                :value="transferAmount" @input="onTransferAmountInput" />
              <text class="transfer-amount-unit">颗</text>
            </view>
          </view>
          <view class="transfer-meta">
            <text class="transfer-current">当前星星数量：<text class="transfer-current-num">{{ userTotalStars }}</text></text>
            <text v-if="isTransferOverLimit" class="transfer-overlimit">超过当前星星数量</text>
          </view>
          <view class="transfer-submit-btn" @tap="onTransferSubmit">
            <image class="transfer-submit-bg" :src="getStaticImage('pop-btn-bg.png')" mode="widthFix" />
            <text class="transfer-submit-text">生成链接</text>
          </view>
        </view>
        <image class="transfer-close-btn" :src="getStaticImage('close-btn.png')" mode="aspectFit"
          @tap="onTransferPopupClose" />
      </view>
    </uni-popup>

    <!-- 星星转赠结果弹窗 -->
    <uni-popup ref="transferResultPop" type="center" background-color="transparent"
      :is-mask-click="false">
      <view class="transfer-popup">
        <image class="transfer-popup-bg" :src="getStaticImage('transfer-bg.png')" mode="widthFix" />
        <view class="transfer-popup-body">
          <image
            :class="['transfer-popup-title', { 'transfer-popup-title--result-success': transferResultStatus === 'success' }]"
            :src="getStaticImage(transferResultStatus === 'success' ? 'transfer-title-1.png' : 'transfer-title-2.png')"
            mode="widthFix" />
          <view class="transfer-amount-row transfer-amount-row--result">
            <text class="transfer-amount-text">{{ transferResultAmount }}</text>
            <text class="transfer-amount-unit">颗</text>
          </view>
          <text class="transfer-result-msg">
            {{ transferResultStatus === 'success' ? '赶快分享给好友吧~' : (transferResultMessage || '网络不好请重试~') }}
          </text>
          <!-- 转赠成功且接口返回分享参数时展示「分享给好友」，点击前已通过编辑分享链接设置 path（带 transferCode、fromUserCode） -->
          <view v-if="transferResultStatus === 'success' && transferShareCode && transferShareFromUserCode"
            class="transfer-result-share-wrap">
            <button class="transfer-result-share-btn" open-type="share" @tap="onTransferResultShareTap">
              <image class="transfer-result-share-bg" :src="getStaticImage('pop-btn-bg.png')" mode="widthFix" />
              <text class="transfer-result-share-text">分享好友</text>
            </button>
          </view>
        </view>
        <!-- 转赠成功时先隐藏关闭按钮引导分享，点击分享后显示关闭按钮 -->
        <image v-if="transferResultStatus !== 'success' || transferResultShareTapped" class="transfer-close-btn"
          :src="getStaticImage('close-btn.png')" mode="aspectFit" @tap="onTransferResultPopupClose" />
      </view>
    </uni-popup>

    <!-- 领取转赠星星结果弹窗：监听 change 以同步 store，确保关闭后页面可滚动 -->
    <uni-popup ref="receiveStarsResultPop" type="center" background-color="transparent"
      :is-mask-click="false" @change="onReceiveStarsResultPopupChange">
      <view class="receive-popup">
        <!-- 标题图：卡片外部上方 -->
        <image class="receive-popup-title"
          :src="getStaticImage(receiveStarsResultStatus === 'success' ? 'receive-title-0.png' : receiveStarsResultStatus === 'claimed' ? 'receive-title-2.png' : 'receive-title-1.png')"
          mode="widthFix" />
        <!-- 卡片主体 -->
        <view class="receive-card">
          <image class="receive-card-bg" :src="getStaticImage('receive-bg.png')" mode="widthFix" />
          <view class="receive-card-content">
            <!-- 成功：主文本三段同底边 -->
            <view v-if="receiveStarsResultStatus === 'success'" class="receive-primary-row">
              <text class="receive-primary-label">恭喜获赠星星</text>
              <text class="receive-primary-num">{{ receiveStarsResultAmount }}</text>
              <text class="receive-primary-label">颗</text>
            </view>
            <!-- 非成功：单行主文本 -->
            <text v-else class="receive-primary-single">
              {{ receiveStarsResultStatus === 'claimed' ? '星星已被领取' : '链接已过期' }}
            </text>
            <!-- 副文本 -->
            <text class="receive-secondary-text">
              {{ receiveStarsResultStatus === 'success' ? '可用于兑换礼品或转赠好友' : receiveStarsResultStatus === 'claimed' ?
                '下次早点来哟!' : '来迟啦，星星领取链接已失效' }}
            </text>
            <!-- 按钮 -->
            <view class="receive-submit-btn" @tap="onReceiveStarsResultPopupConfirm">
              <image class="receive-submit-bg" :src="getStaticImage('pop-btn-bg.png')" mode="widthFix" />
              <text class="receive-submit-text">{{ receiveStarsResultStatus === 'success' ? '开心收下' : '知道啦' }}</text>
            </view>
          </view>
        </view>
        <view class="receive-close-btn" @tap="onReceiveStarsResultPopupConfirm">
          <image :src="getStaticImage('close-btn.png')" mode="aspectFit" />
        </view>
      </view>
    </uni-popup>

    <!-- 领取星星登录提示弹窗 -->
    <uni-popup ref="receiveLoginPop" type="center" background-color="transparent" :is-mask-click="false">
      <view class="login-receive-popup">
        <!-- 标题图：卡片外部上方 -->
        <image class="login-receive-title-img" :src="getStaticImage('receive-title-3.png')" mode="widthFix" />
        <!-- 卡片主体 -->
        <view class="login-receive-card">
          <image class="login-receive-bg" :src="getStaticImage('receive-bg.png')" mode="widthFix" />
          <view class="login-receive-content">
            <text class="login-receive-primary">好有星星转赠</text>
            <text class="login-receive-secondary">请您登录后进行领取</text>
            <view class="login-receive-actions">
              <button class="login-receive-btn login-receive-btn-cancel" @tap="onReceiveLoginCancel">取消</button>
              <button class="login-receive-btn login-receive-btn-confirm" @tap="onReceiveLoginConfirm">去登录</button>
            </view>
          </view>
        </view>
        <!-- 底部关闭按钮：常驻显示 -->
        <view class="login-receive-close" @tap="onReceiveLoginCancel">
          <image :src="getStaticImage('close-btn.png')" mode="aspectFit" />
        </view>
      </view>
    </uni-popup>

    <!-- 点亮小卡弹窗 -->
    <uni-popup ref="lightCardPop" type="center" background-color="transparent" :is-mask-click="false">
      <view class="light-card-popup">
        <!-- 标题图 -->
        <image class="light-card-title-img" :src="getStaticImage('light-title.png')" mode="widthFix" />
        <!-- 小标题：三段同底边 -->
        <view class="light-card-badge">
          <text class="light-card-badge-label">恭喜获得星星</text>
          <text class="light-card-badge-num">{{ lightCardRewardStars }}</text>
          <text class="light-card-badge-label">颗</text>
        </view>
        <!-- 副标题 -->
        <text class="light-card-hint">可用于兑换礼品或转赠好友</text>
        <!-- 卡片（带边框，基于 scanTimes） -->
        <view v-if="currentLightCard" class="light-card-card-wrap">
          <image v-if="getLightCardBorderImage(currentLightCard)" class="light-card-border"
            :src="getLightCardBorderImage(currentLightCard)" mode="aspectFill" />
          <image class="light-card-img" :src="getLightCardImage(currentLightCard)" mode="aspectFill" />
        </view>
        <!-- 收下按钮 -->
        <view class="light-card-submit-btn" @tap="onLightCardPopupSubmit">
          <image class="light-card-submit-bg" :src="getStaticImage('pop-btn-bg.png')" mode="widthFix" />
          <text class="light-card-submit-text">开心收下</text>
        </view>
        <!-- 关闭按钮 -->
        <image class="light-card-close-btn" :src="getStaticImage('close-btn.png')" mode="aspectFit"
          @tap="onLightCardPopupClose" />
      </view>
    </uni-popup>

    <!-- 溯源教程弹窗 -->
    <uni-popup ref="tutorialPop" type="center" background-color="transparent" :is-mask-click="false" @change="onTutorialPopupChange">
      <view class="tutorial-popup">
        <view class="tutorial-popup-card">
          <image class="tutorial-popup-bg" :src="getStaticImage('tutorial-bg.png')" mode="widthFix" />
          <view class="tutorial-popup-inner">
            <scroll-view class="tutorial-popup-scroll" scroll-y :show-scrollbar="false">
              <image class="tutorial-popup-content" :src="getStaticImage('tutorial.png')" mode="widthFix" />
            </scroll-view>
          </view>
        </view>
        <view class="tutorial-popup-close" @tap="onTutorialPopupClose">
          <image :src="getStaticImage('close-btn.png')" mode="aspectFit" />
        </view>
      </view>
    </uni-popup>

    <!-- 我的礼品抽屉 -->
    <uni-popup ref="myGiftsDrawer" type="bottom" background-color="transparent" :safe-area="false"
      :is-mask-click="true" @change="onMyGiftsDrawerChange">
      <view class="drawer-wrap">
        <image class="drawer-title-img" :src="getStaticImage('drawer-title.png')" mode="widthFix" />
        <!-- <view class="drawer-drag-bar" /> -->
        <scroll-view :key="'gifts-' + myGiftsDrawerKey" ref="giftsListScroll" class="gifts-list" scroll-y enhanced :show-scrollbar="false" lower-threshold="100"
          @scrolltolower="onMyGiftsListReachBottom"
          @scroll="onMyGiftsScroll">
          <view v-if="myGiftsList.length === 0" class="gifts-empty">
            <ik-loading v-if="myGiftsLoading" />
            <x-empty v-else>暂无礼品</x-empty>
          </view>
          <view v-for="gift in myGiftsList" :key="gift.objectCode" class="gift-item">
            <image class="gift-item__img" :src="gift.prizeImageUrl || ''" mode="aspectFill" />
            <view class="gift-item__texts">
              <text class="gift-item__name">{{ gift.prizeName }}</text>
              <text class="gift-item__postage">包邮</text>
              <text class="gift-item__time">{{ formatTime(gift.exchangeTime) }}</text>
            </view>
            <view class="gift-item__btn" @tap="onMyGiftItemBtnTap(gift)">
              <text class="gift-item__btn-text">查看地址</text>
            </view>
          </view>
          <!-- 用原生 view 替代 uni-load-more，避免自定义组件在弹层内首次挂载时宽高为 0 的渲染问题 -->
          <view v-if="myGiftsList.length > 0" class="gifts-load-more" @tap="onMyGiftsLoadMoreClick">
            <text class="gifts-load-more__text">{{ myGiftsLoadMoreText }}</text>
          </view>
        </scroll-view>
      </view>
    </uni-popup>

    <!-- 查看收货地址弹窗（展示模式） -->
    <address-popup ref="addressViewPop" :visible="showAddressPopup" :edit="false" :form="viewAddressForm"
      @close="onAddressViewClose" @change="onAddressViewPopupChange" />
  </view>
</template>

<script>
import store from '../store/index'
import { formatTimestamp } from '../utils/format'
import { getStaticImage } from '../utils/staticAssets'
import BrandSwiper from '../components/brand-swiper'
import HomeGiftCard from '../components/home-gift-card'
import LightCard from '../components/light-card'
import AddressPopup from '../components/address-popup'

const ENABLE_BRAND_CARDS_MOCK = false
const ENABLE_LIGHT_CARD_MOCK = false
const BRAND_CARDS_MOCK = [
  { cardCode: 'CD001', cardName: '嗨体', indexNum: 1, cardNum: 5, scanTimes: 1, isLit: true, cardTime: 1709000000000 },
  { cardCode: 'CD002', cardName: '嗨体熊猫', indexNum: 2, cardNum: 3, scanTimes: 3, isLit: true, cardTime: 1710000000000 },
  { cardCode: 'CD003', cardName: '冭活泡泡', indexNum: 3, cardNum: 3, scanTimes: 5, isLit: true, cardTime: 1711000000000 },
  { cardCode: 'CD004', cardName: '濡白天使', indexNum: 4, cardNum: 1, scanTimes: 1, isLit: true, cardTime: 1712000000000 },
  { cardCode: 'CD005', cardName: '如生天使', indexNum: 5, cardNum: 1, scanTimes: 1, isLit: true, cardTime: 1713000000000 },
  { cardCode: 'CD006', cardName: '熠光天使', indexNum: 6, cardNum: 0, scanTimes: 0, isLit: false },
  { cardCode: 'CD007', cardName: '惟她天使', indexNum: 7, cardNum: 0, scanTimes: 0, isLit: false },
  { cardCode: 'CD008', cardName: '宝尼达', indexNum: 8, cardNum: 0, scanTimes: 0, isLit: false },
  { cardCode: 'CD009', cardName: '滑科拉', indexNum: 9, cardNum: 0, scanTimes: 0, isLit: false },
  { cardCode: 'CD010', cardName: '爱芙莱', indexNum: 10, cardNum: 0, scanTimes: 1, isLit: false }
]

const ENABLE_USER_STARS_MOCK = false
const MOCK_USER_TOTAL_STARS = 1

const ENABLE_PRIZE_LIST_HOME_MOCK = false
const MOCK_PRIZE_LIST_HOME = [
  { prizeCode: 'PH1', prizeName: '爱美客装', prizeImageUrl: getStaticImage('cards/CD001.jpg'), needStarCount: 1, totalCount: 100, remainCount: 50, canExchange: true, indexNum: 1 },
  { prizeCode: 'PH2', prizeName: '爱美客体验装', prizeImageUrl: getStaticImage('cards/CD002.jpg'), needStarCount: 5, totalCount: 80, remainCount: 30, canExchange: true, indexNum: 2 },
  { prizeCode: 'PH3', prizeName: '爱美客体验装', prizeImageUrl: getStaticImage('cards/CD003.jpg'), needStarCount: 9, totalCount: 60, remainCount: 20, canExchange: false, indexNum: 3 },
  { prizeCode: 'PH4', prizeName: '爱美客体验装', prizeImageUrl: getStaticImage('cards/CD004.jpg'), needStarCount: 9, totalCount: 40, remainCount: 0, canExchange: false, indexNum: 4 }
]

const ENABLE_MY_GIFTS_MOCK = false
const MOCK_MY_GIFTS_LIST = [
  {
    objectCode: 'MG001',
    prizeCode: 'PH1',
    prizeName: '嗨体体验装',
    prizeImageUrl: getStaticImage('cards/CD001.jpg'),
    prizeType: 'entity',
    exchangeTime: 1712200000000,
    jumpUrl: '/pages-activity/315-scan/views/star-exchange',
    receiverName: '张三',
    phone: '13800138000',
    detailAddress: '北京市朝阳区某某街道某某小区1号楼101室'
  },
  {
    objectCode: 'MG002',
    prizeCode: 'PH2',
    prizeName: '爱美客周边礼包',
    prizeImageUrl: getStaticImage('cards/CD002.jpg'),
    prizeType: 'entity',
    exchangeTime: 1712300000000,
    jumpUrl: '/pages-activity/315-scan/views/star-exchange'
  },
  {
    objectCode: 'MG003',
    prizeCode: 'CP001',
    prizeName: '到院抵扣券 100 元',
    prizeImageUrl: getStaticImage('cards/CD003.jpg'),
    prizeType: 'coupon',
    exchangeTime: 1712400000000,
    jumpUrl: '/pages-activity/315-scan/views/star-exchange'
  },
  {
    objectCode: 'MG003',
    prizeCode: 'CP001',
    prizeName: '到院抵扣券 100 元',
    prizeImageUrl: getStaticImage('cards/CD003.jpg'),
    prizeType: 'coupon',
    exchangeTime: 1712400000000,
    jumpUrl: '/pages-activity/315-scan/views/star-exchange'
  },
  {
    objectCode: 'MG003',
    prizeCode: 'CP001',
    prizeName: '到院抵扣券 100 元',
    prizeImageUrl: getStaticImage('cards/CD003.jpg'),
    prizeType: 'coupon',
    exchangeTime: 1712400000000,
    jumpUrl: '/pages-activity/315-scan/views/star-exchange'
  },
  {
    objectCode: 'MG003',
    prizeCode: 'CP001',
    prizeName: '到院抵扣券 100 元',
    prizeImageUrl: getStaticImage('cards/CD003.jpg'),
    prizeType: 'coupon',
    exchangeTime: 1712400000000,
    jumpUrl: '/pages-activity/315-scan/views/star-exchange'
  }
]

// 领取转赠星星参数 mock（仅用于本地调试）
const ENABLE_RECEIVE_TRANSFER_MOCK = false
const MOCK_TRANSFER_CODE = '2031718021107081218'
const MOCK_FROM_USER_CODE = '1972581621231980545'

export default {
  components: { BrandSwiper, HomeGiftCard, LightCard, AddressPopup },

  data() {
    const defaultSharePath = '/pages-activity/315-scan/views/index'
    const defaultShareTitle = '医美人有自己的小卡'
    return {
      // 首次进入已通过 initPage 拉取完成，后续通过 onShow 做刷新
      hasRefreshedOnce: false,
      currentCardIndex: 0,
      navBgOpacity: 0,
      navBarHeight: 0,
      giftMoreText: '更多礼品 >',
      showTutorialPopup: false,
      shareInfo: {
        path: defaultSharePath,
        title: defaultShareTitle
      },
      defaultSharePath,
      defaultShareTitle,
      showAddressPopup: false,
      viewAddressForm: { receiverName: '', phone: '', detailAddress: '' },
      // 每次打开转赠弹窗时递增，用于 input 的 key，强制重新挂载以清空内部缓存
      transferInputKey: 0,
      // 转赠成功弹窗：用户点击分享后显示关闭按钮，避免流程卡住
      transferResultShareTapped: false,
      // 每次打开我的礼品抽屉时递增，用于 scroll-view 的 key，强制重新挂载以修复关闭再打开后 scrolltolower 不触发
      myGiftsDrawerKey: 0,
      // 活动结束提示仅在进入首页时自动 toast 一次，其余通过点击入口再提示
      activityEndedToastShown: false,
      // 领取星星登录提示弹窗
      showReceiveLoginPopup: false
    }
  },

  computed: {
    isLogin() { return this.$store && this.$store.state.isLogin },
    userInfo() { return store.state.userInfo },
    pageLoading() { return store.state.pageLoading },
    userTotalStars() {
      if (ENABLE_USER_STARS_MOCK) return MOCK_USER_TOTAL_STARS
      return store.state.userTotalStars
    },
    // 角标数字：与 userTotalStars 一致，mock 开启时也用 mock 数量
    displayStarCount() {
      const count = ENABLE_USER_STARS_MOCK ? MOCK_USER_TOTAL_STARS : (store.state.userTotalStars || 0)
      if (count <= 0) return ''
      if (count > 99) return '99+'
      return String(count)
    },
    brandCards() {
      const list = store.state.brandCards || []
      if (ENABLE_BRAND_CARDS_MOCK) {
        return BRAND_CARDS_MOCK
      }
      // 活动结束且接口未返回品牌卡片时，兜底展示 CD001~CD010，全部 0 次，顺序 1~10
      const status = store.state.activityStatus
      if ((!list || list.length === 0) && status === 2) {
        return Array.from({ length: 10 }).map((_, idx) => {
          const index = idx + 1
          return {
            // 1~9 → CD001~CD009，10 → CD010
            cardCode: `CD${String(index).padStart(3, '0')}`,
            indexNum: index,
            scanTimes: 0,
            cardNum: 0,
            isLit: false
          }
        })
      }
      return list
    },
    homeGiftList() {
      const list = store.state.giftListHome || []
      if (ENABLE_PRIZE_LIST_HOME_MOCK) {
        return MOCK_PRIZE_LIST_HOME
      }
      return list.slice(0, 4)
    },
    showTransferPopup() { return store.state.showTransferPopup },
    transferAmount() { return store.state.transferAmount },
    transferLoading() { return store.state.transferLoading },
    showTransferResultPopup() { return store.state.showTransferResultPopup },
    transferResultStatus() { return store.state.transferResultStatus },
    transferResultAmount() { return store.state.transferResultAmount },
    transferResultMessage() { return store.state.transferResultMessage },
    transferShareCode() { return store.state.transferShareCode || '' },
    transferShareFromUserCode() { return store.state.transferShareFromUserCode || '' },
    showReceiveStarsResultPopup() { return store.state.showReceiveStarsResultPopup },
    receiveStarsResultStatus() { return store.state.receiveStarsResultStatus },
    receiveStarsResultAmount() { return store.state.receiveStarsResultAmount },
    showLightCardPopup() { return store.state.showLightCardPopup },
    lightCardRewardStars() { return store.state.lightCardRewardStars },
    currentLightCard() { return store.state.currentLightCard },
    showMyGiftsDrawer() { return store.state.showMyGiftsDrawer },
    myGiftsList() {
      const list = store.state.myGiftsList || []
      if (ENABLE_MY_GIFTS_MOCK) {
        return MOCK_MY_GIFTS_LIST
      }
      return list
    },
    myGiftsPage() { return store.state.myGiftsPage },
    myGiftsTotalPage() { return store.state.myGiftsTotalPage },
    myGiftsLoading() { return store.state.myGiftsLoading },
    myGiftsLoadMoreStatus() {
      if (store.state.myGiftsLoading) return 'loading'
      const page = Number(this.myGiftsPage) || 1
      const total = Math.max(1, Number(this.myGiftsTotalPage) || 1)
      return page >= total ? 'noMore' : 'more'
    },
    myGiftsLoadMoreText() {
      const s = this.myGiftsLoadMoreStatus
      if (s === 'noMore') return '没有更多了'
      if (s === 'loading') return '正在加载...'
      return '点击加载更多'
    },
    isTransferOverLimit() {
      const amount = Number(store.state.transferAmount)
      const total = this.userTotalStars
      return amount > 0 && amount > total
    },
    anyPopupOpen() {
      return this.showTransferPopup ||
        this.showTransferResultPopup ||
        this.showReceiveStarsResultPopup ||
        this.showLightCardPopup ||
        this.showMyGiftsDrawer ||
        this.showReceiveLoginPopup ||
        this.showTutorialPopup
    }
  },

  watch: {
    showTransferPopup(val) {
      if (val) this.report('星星分享页面pv')
      this.$nextTick(() => { this.$refs.transferPop && (val ? this.$refs.transferPop.open() : this.$refs.transferPop.close()) })
    },
    showTransferResultPopup(val) {
      if (val) {
        // 参考主包首页：转赠成功时编辑分享链接，设置带 transferCode、fromUserCode 的 path，好友打开即可领取
        if (this.transferResultStatus === 'success' && this.transferShareCode && this.transferShareFromUserCode) {
          const base = '/pages-activity/315-scan/views/index'
          this.shareInfo.path = `${base}?transferCode=${encodeURIComponent(this.transferShareCode)}&fromUserCode=${encodeURIComponent(this.transferShareFromUserCode)}`
          this.shareInfo.buttonTitle = `好友送来专属星星，快来兑换好礼！`
          if (this.getStaticImage) this.shareInfo.buttonImage = this.getStaticImage('share.png')
          // 开发调试：查看当前编辑后的分享参数
          // console.log('[315-scan] transfer shareInfo 更新：', JSON.stringify(this.shareInfo))
        }
      } else {
        store.commit('CLEAR_TRANSFER_SHARE_PARAMS')
        this.shareInfo.path = this.defaultSharePath
        this.shareInfo.title = this.defaultShareTitle
        delete this.shareInfo.buttonTitle
        delete this.shareInfo.buttonImage
      }
      this.$nextTick(() => { this.$refs.transferResultPop && (val ? this.$refs.transferResultPop.open() : this.$refs.transferResultPop.close()) })
    },
    showReceiveStarsResultPopup(val) {
      this.$nextTick(() => { this.$refs.receiveStarsResultPop && (val ? this.$refs.receiveStarsResultPop.open() : this.$refs.receiveStarsResultPop.close()) })
    },
    showLightCardPopup(val) {
      this.$nextTick(() => { this.$refs.lightCardPop && (val ? this.$refs.lightCardPop.open() : this.$refs.lightCardPop.close()) })
    },
    showMyGiftsDrawer(val) {
      this.$nextTick(() => { this.$refs.myGiftsDrawer && (val ? this.$refs.myGiftsDrawer.open() : this.$refs.myGiftsDrawer.close()) })
    },
    showReceiveLoginPopup(val) {
      this.$nextTick(() => { this.$refs.receiveLoginPop && (val ? this.$refs.receiveLoginPop.open() : this.$refs.receiveLoginPop.close()) })
    }
  },

  onLoad(options) {
    this.initPage(options)
  },

  async onShow() {
    this._giftMoreTapLock = false
    this.report('首页pv', true)
    // 首次进入已在 initPage 中完成初始化，这里只负责后续回到首页时刷新数据
    if (this.hasRefreshedOnce) {
      await this.refreshPageData({ isRefresh: true })
      // 登录返回后：若有暂存的领取参数，执行领取并弹窗（活动结束时仅 toast 提示）
      const pending = store.state.pendingReceiveStarParams
      if (pending && this.$store && this.$store.state.isLogin) {
        if (this.checkActivityEndedAndToast()) {
          store.commit('CLEAR_PENDING_RECEIVE_STAR_PARAMS')
        } else {
          store.commit('CLEAR_PENDING_RECEIVE_STAR_PARAMS')
          await store.dispatch('doReceiveStar', pending)
        }
      }
    } else {
      this.hasRefreshedOnce = true
    }
    if (ENABLE_LIGHT_CARD_MOCK) {
      this.$nextTick(() => this.mockAndShowLightCard())
    }
  },

  onPageScroll(e) {
    this.navBgOpacity = Math.min(e.scrollTop / 48, 1)
  },

  methods: {
    getStaticImage,
    async initPage(options) {
      this._giftMoreTapLock = false
      await this.refreshPageData()
      await this.handleEntryOptions(options)
    },

    // 首页数据刷新：onLoad 首次进入会执行一次，后续通过 onShow 进入时也复用该逻辑
    // isRefresh：从其他页面返回时为 true，不显示全屏 loading，避免页面闪烁
    async refreshPageData({ isRefresh = false } = {}) {
      await store.dispatch('fetchActivityCardInfo', { showLoading: !isRefresh })
      await store.dispatch('fetchPrizeListHome')
      if (this.$store && this.$store.state.isLogin) {
        await store.dispatch('fetchUserInfo')
      } else {
        store.commit('SET_USER_INFO', null)
      }
      await store.dispatch('fetchActivityStatus')
      this.maybeShowActivityEndedToast()
    },

    // 处理从分享 / 转赠链接进入时带的参数（shine、transferCode 等），只在 initPage 首次调用
    async handleEntryOptions(options) {
      // 点亮小卡：从链接 query 上带 shine，对应 cardCode
      if (options && options.shine) {
        // 活动已结束时仅提示，不再弹出点亮小卡弹窗
        if (!this.checkActivityEndedAndToast()) {
          const shineCode = options.shine
          const codes = store.state.brandCardCodes || []
          if (codes.includes(shineCode)) {
            const card = (store.state.brandCards || []).find(c => c.cardCode === shineCode)
            if (card) {
              store.commit('SET_LIGHT_CARD_DATA', { card, rewardStars: (card.starCount != null ? card.starCount : card.scanTimes) || 1 })
              store.commit('SET_SHOW_LIGHT_CARD_POPUP', true)
            }
          }
        }
      }

      // 领取转赠星星：从链接 query 上带 transferCode / fromUserCode
      const receiveParams = (options && options.transferCode && options.fromUserCode)
        ? { transferCode: options.transferCode, fromUserCode: options.fromUserCode }
        : (ENABLE_RECEIVE_TRANSFER_MOCK ? { transferCode: MOCK_TRANSFER_CODE, fromUserCode: MOCK_FROM_USER_CODE } : null)
      if (receiveParams) {
        // 活动已结束时，仅提示活动状态文案，不再跳转登录或执行领取
        if (this.checkActivityEndedAndToast()) {
          return
        }
        const isLogin = this.$store && this.$store.state.isLogin
        if (!isLogin) {
          store.commit('SET_PENDING_RECEIVE_STAR_PARAMS', receiveParams)
          // 不直接跳转登录，先弹出领取星星登录提示弹窗
          this.openReceiveLoginPopup()
          return
        }
        await store.dispatch('doReceiveStar', receiveParams)
      }
    },

    formatTime: formatTimestamp,

    /** 进入首页后若活动已结束，仅自动 toast 一次活动状态文案 */
    maybeShowActivityEndedToast() {
      const status = store.state.activityStatus
      if (status === 2 && !this.activityEndedToastShown) {
        const desc = store.state.activityStatusDesc || '活动已结束'
        this.activityEndedToastShown = true
        uni.showToast({ title: desc, icon: 'none' })
      }
    },

    /** 在点击功能入口前检查活动是否已结束，已结束则 toast 并阻断后续操作 */
    checkActivityEndedAndToast() {
      const status = store.state.activityStatus
      if (status === 2) {
        const desc = store.state.activityStatusDesc || '活动已结束'
        uni.showToast({ title: desc, icon: 'none' })
        return true
      }
      return false
    },

    /** 登录校验：未登录则跳转登录页（参考主包 goLogin），返回 false；已登录返回 true */
    requireLogin() {
      const isLogin = this.$store && this.$store.state.isLogin
      if (!isLogin) {
        this.goLogin()
        return false
      }
      return true
    },

    onCardChange(idx) { this.currentCardIndex = idx },
    onRuleBtnTap() { uni.navigateTo({ url: '/pages-activity/315-scan/views/rule' }) },
    onMyStarsTap() {
      if (!this.requireLogin()) return
      this.report('星星记录入口点击')
      uni.navigateTo({ url: '/pages-activity/315-scan/views/star-record' })
    },
    onScanTap() {
      if (this.checkActivityEndedAndToast()) return
      this.report('扫码验真入口点击')
      uni.navigateTo({ url: '/pages-activity/315-scan/scan/index' })
    },
    onGiftMoreTap() {
      // 防止事件冒泡或重复触发导致星星兑换页被打开两次
      if (this._giftMoreTapLock) return
      if (this.checkActivityEndedAndToast()) return
      this._giftMoreTapLock = true
      this.report('积分商城入口点击')
      uni.navigateTo({ url: '/pages-activity/315-scan/views/star-exchange' })
    },

    onTransferTap() {
      if (this.checkActivityEndedAndToast()) return
      if (!this.requireLogin()) return
      // 打开前先清空输入并递增 key，避免上次未清空的数据残留、强制 input 重新挂载
      store.commit('SET_TRANSFER_AMOUNT', '')
      this.transferInputKey += 1
      store.commit('SET_SHOW_TRANSFER_POPUP', true)
    },
    onTransferAmountInput(e) {
      let val = e.detail.value.replace(/[^\d]/g, '')
      val = val.replace(/^0+/, '') || '' // 禁止以 0 开头
      store.commit('SET_TRANSFER_AMOUNT', val)
      return val
    },
    onTransferPopupClose() {
      store.commit('SET_SHOW_TRANSFER_POPUP', false)
      store.commit('SET_TRANSFER_AMOUNT', '')
    },
    /** uni-popup change：弹窗被关闭时（含点击蒙版）同步 store，避免状态不同步导致无法再次打开 */
    onTransferPopupChange(e) {
      if (e && e.show === false) {
        store.commit('SET_SHOW_TRANSFER_POPUP', false)
        store.commit('SET_TRANSFER_AMOUNT', '')
      }
    },
    onTransferSubmit() {
      const amount = Number(store.state.transferAmount)
      if (!amount || amount <= 0) { uni.showToast({ title: '请输入转赠数量', icon: 'none' }); return }
      if (amount > this.userTotalStars) { uni.showToast({ title: '超过当前星星数量', icon: 'none' }); return }
      this.report('分享星星点击次数')
      store.dispatch('doTransferStar', { starCount: amount })
    },
    onTransferResultPopupClose() {
      this.transferResultShareTapped = false
      store.commit('SET_SHOW_TRANSFER_RESULT_POPUP', false)
      store.commit('SET_TRANSFER_AMOUNT', '')
      store.commit('CLEAR_TRANSFER_SHARE_PARAMS')
      this.shareInfo.path = this.defaultSharePath
      this.shareInfo.title = this.defaultShareTitle
      delete this.shareInfo.buttonTitle
      delete this.shareInfo.buttonImage
      this.$refs.transferResultPop && this.$refs.transferResultPop.close()
    },
    onTransferResultShareTap() {
      if (!this.requireLogin()) return
      this.transferResultShareTapped = true
      this.report('转赠结果弹窗-分享给好友点击')
    },

    onReceiveStarsResultPopupConfirm() {
      if (store.state.receiveStarsResultStatus === 'success') {
        this.report('星星领取次数')
        store.dispatch('fetchActivityCardInfo', { showLoading: false })
      }
      store.commit('SET_SHOW_RECEIVE_STARS_RESULT_POPUP', false)
    },
    /** uni-popup change：领取结果弹窗被关闭时同步 store，确保 anyPopupOpen 正确、页面可恢复滚动 */
    onReceiveStarsResultPopupChange(e) {
      if (e && e.show === false) {
        store.commit('SET_SHOW_RECEIVE_STARS_RESULT_POPUP', false)
      }
    },

    onLightCardPopupClose() { store.commit('SET_SHOW_LIGHT_CARD_POPUP', false) },
    onLightCardPopupSubmit() { store.commit('SET_SHOW_LIGHT_CARD_POPUP', false) },

    /** mock：从卡片数组（含 -1 = 不展示）中随机抽一个，设置 store 并打开弹窗 */
    mockAndShowLightCard() {
      const codes = [...BRAND_CARDS_MOCK.map(c => c.cardCode), -1]
      const picked = codes[Math.floor(Math.random() * codes.length)]
      if (picked === -1) return
      const card = BRAND_CARDS_MOCK.find(c => c.cardCode === picked)
      if (!card) return
      store.commit('SET_LIGHT_CARD_DATA', { card, rewardStars: (card.starCount != null ? card.starCount : card.scanTimes) || 1 })
      store.commit('SET_SHOW_LIGHT_CARD_POPUP', true)
    },

    /** 根据 scanTimes 返回对应边框图（与 brand-swiper 逻辑一致：0~2→1；3~4→3；≥5→5） */
    getLightCardBorderImage(card) {
      if (!card) return ''
      const times = card.scanTimes != null ? Number(card.scanTimes) : 0
      // 0 ~ 2 次：使用 1 次边框
      if (times >= 0 && times <= 2) {
        return getStaticImage('card-border-1.png')
      }
      // 3 ~ 4 次：使用 3 次边框
      if (times >= 3 && times <= 4) {
        return getStaticImage('card-border-3.png')
      }
      // ≥ 5 次：使用 5 次边框
      if (times >= 5) {
        return getStaticImage('card-border-5.png')
      }
      return ''
    },

    /** 根据 cardCode 返回卡片图片 */
    getLightCardImage(card) {
      if (!card || !card.cardCode) return ''
      return getStaticImage(`cards/${card.cardCode}.jpg`)
    },

    onTutorialToggle() {
      this.showTutorialPopup = true
      this.$nextTick(() => { this.$refs.tutorialPop && this.$refs.tutorialPop.open() })
    },

    onTutorialPopupClose() {
      this.showTutorialPopup = false
      this.$refs.tutorialPop && this.$refs.tutorialPop.close()
    },

    onTutorialPopupChange(e) {
      if (!e.show) this.showTutorialPopup = false
    },

    onMyGiftTap() {
      if (!this.requireLogin()) return
      this.report('我的奖品入口点击')
      this.myGiftsDrawerKey += 1
      store.commit('SET_SHOW_MY_GIFTS_DRAWER', true)
      store.dispatch('fetchMyPrizes', { page: 1 })
    },
    onMyGiftsDrawerClose() { store.commit('SET_SHOW_MY_GIFTS_DRAWER', false) },
    onMyGiftsDrawerChange(e) {
      if (!e || typeof e.show === 'undefined') return
      if (!e.show) {
        store.commit('SET_SHOW_MY_GIFTS_DRAWER', false)
      }
    },
    doMyGiftsLoadMore() {
      const page = Number(this.myGiftsPage) || 1
      const total = Math.max(1, Number(this.myGiftsTotalPage) || 1)
      if (page >= total || store.state.myGiftsLoading) return
      store.dispatch('fetchMyPrizes', { page: page + 1, isLoadMore: true })
    },
    onMyGiftsListReachBottom() {
      this.doMyGiftsLoadMore()
    },
    onMyGiftsLoadMoreClick() {
      if (this.myGiftsLoadMoreStatus !== 'more') return
      this.doMyGiftsLoadMore()
    },
    onMyGiftsScroll(e) {
      if (this._myGiftsScrollThrottle || store.state.myGiftsLoading) return
      const page = Number(this.myGiftsPage) || 1
      const total = Math.max(1, Number(this.myGiftsTotalPage) || 1)
      if (page >= total) return
      const scrollTop = e.detail && e.detail.scrollTop != null ? e.detail.scrollTop : 0
      const query = uni.createSelectorQuery().in(this)
      query.select('.gifts-list').scrollOffset((res) => {
        if (!res) return
        const r = Array.isArray(res) ? res[0] : res
        if (!r || r.scrollHeight == null) return
        const viewportH = 260
        const threshold = 100
        if (scrollTop + viewportH >= r.scrollHeight - threshold) {
          this._myGiftsScrollThrottle = true
          this.doMyGiftsLoadMore()
          setTimeout(() => { this._myGiftsScrollThrottle = false }, 800)
        }
      }).exec()
    },
    onMyGiftItemBtnTap(gift) {
      // 通过 addressCode 调用同一接口获取地址详情，再展示弹窗
      const addressCode = gift.addressCode || ''
      const userCode = (this.$store && this.$store.getters.userCode) || ''
      if (!addressCode || !userCode) {
        uni.showToast({ title: '暂无地址信息', icon: 'none' })
        return
      }
      store.dispatch('fetchAddressDetail', { objectCode: addressCode, userCode }).then(() => {
        this.viewAddressForm = {
          receiverName: store.state.addressForm.receiverName || '',
          phone: store.state.addressForm.phone || '',
          detailAddress: store.state.addressForm.detail || store.state.addressForm.detailAddress || ''
        }
        this.showAddressPopup = true
      })
    },
    onAddressViewClose() {
      this.showAddressPopup = false
    },
    onAddressViewPopupChange(show) {
      if (show === false) {
        this.showAddressPopup = false
      }
    },

    onShareBtnTap() {
      this.report('首页分享按钮点击')
    },

    /** 打开 / 关闭领取星星登录提示弹窗，供外部调用 */
    openReceiveLoginPopup() {
      this.showReceiveLoginPopup = true
      this.$nextTick(() => {
        this.$refs.receiveLoginPop && this.$refs.receiveLoginPop.open()
      })
    },
    closeReceiveLoginPopup() {
      this.showReceiveLoginPopup = false
      this.$nextTick(() => {
        this.$refs.receiveLoginPop && this.$refs.receiveLoginPop.close()
      })
    },
    onReceiveLoginCancel() {
      this.closeReceiveLoginPopup()
    },
    onReceiveLoginConfirm() {
      this.closeReceiveLoginPopup()
      if (this.goLogin) {
        this.goLogin()
      }
    },

    $shareCallBack(type) {
      if (type === 'timeline') {
        this.report('315验真-活动分享-分享到朋友圈')
      } else {
        this.report('315验真-活动分享-分享到朋友')
      }
    },

    onNavBarHeight(h) {
      this.navBarHeight = h || 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/pages-activity/315-scan/assets/common.scss';

.container {
  font-family: 'SourceHanSans-Regular', sans-serif;
  position: relative;
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
  // background: linear-gradient(180deg, #b9dbfc 0%, #dfedff 100%);
  background-blend-mode: lighten;

  /* 显式覆盖 text/input/button 等默认字体，确保思源黑体生效 */
  text,
  input,
  textarea,
  button {
    font-family: 'SourceHanSans-Regular', sans-serif;
  }
}

/* 整页背景：用 aspectFill 填满固定区域，避免 widthFix 在部分端上按比例撑高导致布局错乱 */
.index-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* 主内容区：保证在背景图之上，避免按钮等被遮挡 */
.page-content {
  position: relative;
  z-index: 1;
}

/* 覆盖第三方组件内部文本 */
::v-deep .x-button,
::v-deep .empty .text {
  font-family: 'SourceHanSans-Regular', sans-serif !important;
}


/* 导航栏背景渐变蒙层：跟随滚动从透明变为白色，叠在导航栏之下 */
.nav-bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 997;
  background-color: #ffffff;
  pointer-events: none;
}


.page-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

/* ── 头部 ── */
.header-area {
  position: relative;
  width: 750rpx;
  height: 386rpx;

  .user-avatar-wrap {
    position: absolute;
    top: 20rpx;
    left: 28rpx;
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-avatar {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
  }

  .title-img {
    position: absolute;
    width: 535.5rpx;
    height: 264.6rpx;
    top: 20rpx;
    left: 50%;
    transform: translateX(-50%);
  }

  .subtitle-img {
    position: absolute;
    width: 541rpx;
    height: 77rpx;
    top: 312rpx;
    left: 50%;
    transform: translateX(-50%);
  }

  .rule-btn {
    position: absolute;
    top: 142rpx;
    left: 0;
    width: 60rpx;
    height: 143rpx;
    background: #00000040;
    border-top-right-radius: 14rpx;
    border-bottom-right-radius: 14rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;

    .rule-btn__text {
      color: #ffffff;
      font-weight: 500;
      font-size: 28rpx;
      line-height: 30rpx;
      text-align: center;
      writing-mode: vertical-rl;
    }
  }

  .share-btn {
    position: absolute;
    top: 172rpx;
    right: 6rpx;
    width: 94rpx;
    height: 94rpx;
    padding: 0;
    background: transparent;
    border: none;

    image {
      width: 100%;
      height: 100%;
    }
  }
}

/* ── 功能入口 ── */
.func-entry-area {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: -40rpx;
}

.func-btn {
  position: relative;
  // margin-left: -4rpx;
  // margin-bottom: -6rpx;
}

.func-btn__badge {
  position: absolute;
  top: 8rpx;
  right: 34rpx;
  z-index: 2;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #fff6b9;
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  .func-btn__badge-text {
    color: #8D6642;
    font-size: 28rpx;
    font-weight: bold;
    line-height: 1;
    margin-top: 2rpx;
  }
}

.func-btn__img {
  width: 170rpx;
  height: 144rpx;
  margin-left: -6rpx;
}

.scan-btn {
  width: 398rpx;
  height: 126rpx;
  margin-bottom: 1rpx;
}

.transfer-btn {
  width: 170rpx;
  height: 149rpx;
  margin-bottom: 10rpx;
}

/* ── 礼品区 ── */
.gift-exchange-area {
  position: relative;
  margin: 42rpx 32rpx 0;
  padding: 24rpx;
  width: 683rpx;
  height: 296rpx;
  overflow: hidden;
}

.gift-exchange-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gift-exchange-inner {
  position: relative;
  z-index: 1;
}

.gift-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 36rpx;

  .gift-more {
    color: #287CF0;
    font-size: 24rpx;
    margin-top: 14rpx;
    margin-right: 50rpx;
    opacity: 0;
  }
}

.gift-scroll {
  width: 100%;
}

.gift-scroll-inner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24rpx;
  padding-bottom: 4rpx;
}

.gift-list-fixed {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 8rpx;
}

/* ── 我的礼品入口 ── */
.list-entry {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24rpx;

  .list-entry__img {
    width: 686rpx;
    height: 100rpx;
  }
}

/* ── 溯源教程入口 ── */
.tutorial-toggle {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100rpx;

  .tutorial-toggle__more {
    width: 686rpx;
    height: 100rpx;
  }

  .tutorial-toggle__arrow {
    position: absolute;
    right: 52rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 23rpx;
    height: 23rpx;
  }
}

/* ── 溯源教程弹窗 ── */
.tutorial-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 690rpx;

  /* 卡片容器：bg 绝对定位为背景，scroll 覆盖整个卡片区域 */
  &-card {
    position: relative;
    width: 750rpx;
    height: 1293rpx;
  }

  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
    pointer-events: none;
  }

  /* 圆角裁剪容器：仅底部两角圆角，与背景图一致，避免内容图边角漏出 */
  &-inner {
    position: absolute;
    top: 284rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 534.5rpx;
    height: 1010rpx;
    border-radius: 0 0 100rpx 100rpx;
    overflow: hidden;
    z-index: 1;
  }

  &-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &-content {
    width: 100%;
    display: block;
  }

  &-close {
    width: 64rpx;
    height: 64rpx;
    margin-top: 48rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }
}

/* ═══════════ 弹窗公共样式 ═══════════ */
.popup-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600rpx;
  padding: 40rpx 40rpx 56rpx;
  background: #fff;
  border-radius: 32rpx;
}

.popup-star-deco {
  width: 160rpx;
  height: 160rpx;
  margin-top: -80rpx;
  margin-bottom: 16rpx;
}


.popup-title {
  color: #1890ff;
  font-weight: 700;
  font-size: 36rpx;
  margin-bottom: 24rpx;
}

.popup-submit-btn {
  width: 100% !important;
  margin-top: 32rpx;
}

.popup-close-btn {
  position: absolute;
  bottom: -80rpx;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  transform: translateX(-50%);
}

.popup-close-icon {
  color: #333;
  font-size: 40rpx;
  line-height: 1;
}

/* ── 转赠弹窗（底图布局） ── */
.transfer-popup {
  position: relative;
  width: 750rpx;
  // height: 940rpx;
  overflow: visible;
}

.transfer-popup-bg {
  width: 722rpx;
  height: 940rpx;
  display: block;
  margin: 0 auto;
}

.transfer-popup-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;  
  box-sizing: border-box;
  gap: 10rpx;
  padding-top: 298rpx;
}

.transfer-popup-title {
  width: 279rpx;
  margin-bottom: 26rpx;

  &--result-success {
    width: 437rpx;
  }
}

.transfer-amount-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 482rpx;
  height: 128rpx;
  border-radius: 64rpx;
  background: #f3f2f2;
  padding: 0 50rpx;

  &--result {
    background: #f2f9fd;
    // margin-top: 50rpx;
    align-items: baseline;
    padding-top: 16rpx;

    .transfer-amount-unit {
      position: static;
      right: auto;
      top: auto;
      transform: none;
      font-size: 36rpx;
      font-weight: 500;
      margin-left: 4rpx;
      margin-bottom: 0;
    }
  }
}

.transfer-amount-input {
  flex: 1;
  color: #287CF0;
  font-size: 38rpx;
  font-weight: bold;
  text-align: center;
}

.transfer-amount-inner {
  position: relative;
  width: 260rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transfer-amount-text {
  flex: none;
  color: #287CF0;
  font-size: 89rpx;
  font-weight: bold;
  text-align: center;
  line-height: 1;
}

.transfer-amount-unit {
  color: #287CF0;
  font-size: 38rpx;
  font-weight: bold;
  margin-left: 8rpx;
  line-height: 1;
}

.transfer-amount-inner .transfer-amount-unit {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0;
}

.transfer-meta {
  width: 482rpx;
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80rpx;
}

.transfer-current {
  color: #999;
  font-size: 28rpx;
  text-align: center;
}

.transfer-current-num {
  color: #ff6903;
  font-size: 28rpx;
}

.transfer-overlimit {
  margin-top: 12rpx;
  color: #dc0101;
  font-size: 20rpx;
  text-align: center;
}

.transfer-result-msg {
  margin-top: 16rpx;
  color: #666666;
  font-size: 36rpx;
  text-align: center;
}

.transfer-submit-btn {
  position: relative;
  margin-top: 6rpx;
  margin-bottom: -140rpx;
  width: 398rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .transfer-submit-bg {
    width: 100%;
    display: block;
  }

  .transfer-submit-text {
    position: absolute;
    color: #fff;
    font-size: 36rpx;
    font-weight: bold;
  }
}

.transfer-result-share-wrap {
  margin-top: 32rpx;
  margin-bottom: 16rpx;
}

.transfer-result-share-btn {
  position: relative;
  width: 398rpx;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    border: none;
  }

  .transfer-result-share-bg {
    width: 100%;
    display: block;
  }

  .transfer-result-share-text {
    position: absolute;
    color: #fff;
    font-size: 36rpx;
    font-weight: bold;
  }
}

.transfer-close-btn {
  position: absolute;
  bottom: -4rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 64rpx;
  height: 64rpx;
}

/* ── 领取星星结果弹窗 ── */
.receive-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 722rpx;
}

.receive-popup-title {
  position: relative;
  z-index: 2;
  width: 476rpx;
  margin-bottom: -156rpx;
}

.receive-card {
  position: relative;
  width: 750rpx;
}

.receive-card-bg {
  width: 722rpx;
  display: block;
  margin: 0 auto;
}

.receive-card-content {
  position: absolute;
  top: 424rpx;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 40rpx 56rpx;
  gap: 22rpx;
}

.receive-primary-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4rpx;
}

.receive-primary-label {
  color: #287CF0;
  font-size: 36rpx;
  font-weight: bold;
  line-height: 1;
}

.receive-primary-num {
  color: #287CF0;
  font-size: 64rpx;
  font-weight: bold;
  line-height: 1;
}

.receive-primary-single {
  color: #287CF0;
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
}

.receive-secondary-text {
  color: #999999;
  font-size: 28rpx;
  text-align: center;
}

.receive-submit-btn {
  position: relative;
  width: 398rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60rpx;

  .receive-submit-bg {
    width: 100%;
    display: block;
  }

  .receive-submit-text {
    position: absolute;
    color: #fff;
    font-size: 36rpx;
    font-weight: bold;
  }
}

.receive-close-btn {
  position: relative;
  z-index: 10;
  width: 64rpx;
  height: 64rpx;
  margin-top: -82rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    width: 100%;
    height: 100%;
  }
}

.result-close-btn {
  position: absolute;
  bottom: -80rpx;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  transform: translateX(-50%);

  &--light {
    background: rgba(255, 255, 255, 0.9);
  }

  &--dark {
    background: #555;
  }

  .close-icon--dark {
    color: #333;
    font-size: 40rpx;
  }

  .close-icon--light {
    color: #fff;
    font-size: 40rpx;
  }
}

/* ── 领取星星登录提示弹窗 ── */
.login-receive-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 722rpx;
}

.login-receive-title-img {
  position: relative;
  z-index: 2;
  width: 476rpx;
  margin-bottom: -156rpx;
}

.login-receive-card {
  position: relative;
  width: 750rpx;
}

.login-receive-bg {
  width: 722rpx;
  display: block;
  margin: 0 auto;
}

.login-receive-content {
  position: absolute;
  top: 424rpx;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 40rpx 56rpx;
  gap: 20rpx;
}

.login-receive-primary {
  color: #287CF0;
  font-size: 36rpx;
  font-weight: bold;
}

.login-receive-secondary {
  color: #999999;
  font-size: 28rpx;
}

.login-receive-actions {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
  gap: 24rpx;
}

.login-receive-btn {
  width: 253rpx;
  height: 126rpx;
  line-height: 126rpx;
  border-radius: 63rpx;
  font-size: 36rpx;
  font-family: 'SourceHanSans-Regular', sans-serif;
  border: none;
  padding: 0;
  text-align: center;
  box-sizing: border-box;
}

.login-receive-btn-cancel {
  background: #f3f2f2;
  color: #999999;
}

.login-receive-btn-confirm {
  background: #287CF0;
  color: #ffffff;
  font-weight: 700;
}

.login-receive-close {
  position: relative;
  z-index: 10;
  width: 64rpx;
  height: 64rpx;
  margin-top: -82rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    width: 100%;
    height: 100%;
  }
}

/* ── 点亮小卡弹窗 ── */
.light-card-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560rpx;
}

.light-card-title-img {
  width: 579rpx;
  margin-bottom: 20rpx;
}

.light-card-badge {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 386rpx;
  height: 87rpx;
  border-radius: 72.5rpx;
  border: 1rpx solid #FEFE9B;
  background: #FEFE9B66;
  backdrop-filter: blur(18.8px);
  padding: 10rpx 24rpx 16rpx;
  margin-bottom: 16rpx;
  box-sizing: border-box;

  .light-card-badge-label {
    color: #FFFFFF;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 6rpx;
  }

  .light-card-badge-num {
    color: #FDFDA2;
    font-size: 64rpx;
    font-weight: bold;
    line-height: 1;
  }
}

.light-card-hint {
  color: rgba(255, 255, 255, 0.898);
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 6rpx;
}

.light-card-card-wrap {
  position: relative;
  width: 569rpx;
  height: 758rpx;
  margin-bottom: 32rpx;
}

.light-card-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.light-card-img {
  position: absolute;
  width: 433rpx;
  height: 606rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.light-card-submit-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 288rpx;

  .light-card-submit-bg {
    width: 100%;
    display: block;
  }

  .light-card-submit-text {
    position: absolute;
    color: #FFFFFF;
    font-size: 36rpx;
    font-weight: bold;
  }
}

.light-card-close-btn {
  width: 64rpx;
  height: 64rpx;
  margin-top: 44rpx;
}

/* ── 我的礼品抽屉 ── */
.drawer-wrap {
  position: relative;
  width: 750rpx;
  // max-height: 70vh;
  padding: 0 32rpx;
  padding-bottom: env(safe-area-inset-bottom);
  border-radius: 68rpx 68rpx 0 0;
  overflow: hidden;
  background: linear-gradient(180deg, #DFEDFF 0%, #FFFFFF 21.54%, #FFFFFF 86.27%, #DFEDFF 100%);
  border: 6px solid rgba(255, 255, 255, 0.3);
}

.drawer-title-img {
  position: absolute;
  top: 52rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 212rpx;
  height: 54rpx;
  z-index: 0;
}

.drawer-drag-bar {
  position: relative;
  z-index: 1;
  width: 80rpx;
  height: 8rpx;
  margin: 16rpx auto;
  background: #ddd;
  border-radius: 8rpx;
}

.gifts-list {
  position: relative;
  z-index: 1;
  /* 高度明显小于 3 条内容（3×168≈504rpx），确保只要有 3 条就可以滚动 */
  height: 420rpx;
  margin-top: 140rpx;
}

.gifts-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300rpx;
}

.gifts-load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;

  &__text {
    color: #999;
    font-size: 26rpx;
    font-family: 'SourceHanSans-Regular', sans-serif;
  }
}

.gift-item {
  display: flex;
  align-items: center;
  width: 662rpx;
  height: 168rpx;
  box-sizing: border-box;
  border-bottom: 2rpx solid #f3f3f3;

  &:last-child {
    border-bottom: none;
  }

  .gift-item__img {
    flex-shrink: 0;
    width: 120rpx;
    height: 120rpx;
    margin-right: 20rpx;
    border-radius: 50%;
  }

  .gift-item__texts {
    flex: 1;

    .gift-item__name {
      display: block;
      color: #333;
      font-size: 32rpx;
      font-weight: bold;
    }

    .gift-item__postage {
      display: block;
      color: #999;
      font-size: 26rpx;
    }

    .gift-item__time {
      display: block;
      color: #ccc;
      font-size: 22rpx;
    }
  }

  .gift-item__btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 84rpx;
    position: relative;
    border: none;
    border-radius: 42rpx;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      box-sizing: border-box;
      border: 2rpx solid #2B9DE7;
      pointer-events: none;
    }

    .gift-item__btn-text {
      color: #287CF0;
      font-size: 28rpx;
      font-weight: bold;
    }
  }
}
</style>
