<template>
  <page-meta :page-style="addressPopupVisible ? 'overflow: hidden;' : ''" />
  <view class="container" :style="{ '--nav-bar-height': navBarHeight + 'px' }">
    <!-- 导航栏背景渐变蒙层 -->
    <view
      class="nav-bg-overlay"
      :style="{ opacity: navBgOpacity, height: navBarHeight ? navBarHeight + 'px' : '' }"
    ></view>
    <ik-custom-header
      theme="light"
      system-text-color
      extra-holder
      :transparent="true"
      title="星星兑换"
      @navBarHeight="onNavBarHeight"
    />

    <!-- Tab 栏：选中为 exchange-tab 图+星星数字+白字，未选中为设计稿规范样式 -->
    <star-exchange-tabs
      :options="tabOptions"
      :default-select="tabLevel"
      class="tab-bar"
      @change="onTabChange"
    />

    <!-- 礼品列表 -->
    <scroll-view
      class="gift-list-wrap"
      scroll-y
      enhanced
      :show-scrollbar="false"
      @scroll="onScroll"
      @scrolltolower="onLoadMore"
    >
      <!-- loading -->
      <view v-if="exchangeLoading && exchangeGiftList.length === 0" class="list-loading">
        <ik-loading />
      </view>

      <!-- 两列网格 -->
      <view v-else-if="exchangeGiftList.length > 0" class="gift-grid">
        <gift-card
          v-for="item in exchangeGiftList"
          :key="item.prizeCode"
          :item="item"
          :user-star-count="userTotalStars"
          @exchange="onExchange"
        />
      </view>

      <!-- 空态 -->
      <view v-else class="empty-state">
        <x-empty>暂无该档位礼品</x-empty>
      </view>

      <uni-load-more v-if="exchangeGiftList.length > 0" :status="loadMoreStatus" />
    </scroll-view>

    <!-- 填写收货地址弹窗 -->
    <uni-popup ref="addressPop" type="center" background-color="transparent">
      <view class="address-popup">
        <text class="address-popup-title">填写收货地址</text>
        <view class="address-fields">
          <view class="address-field">
            <text class="field-label">收货人姓名</text>
            <input
              class="field-input"
              :value="addressForm.receiverName"
              placeholder="请输入收货人姓名"
              placeholder-style="color:#D2D2D2;font-size:26rpx;font-family:'SourceHanSans-Regular',sans-serif;"
              @input="onAddressFormUpdate('receiverName', $event.detail.value)"
            />
          </view>
          <view class="address-field">
            <text class="field-label">联系电话</text>
            <input
              class="field-input"
              :value="addressForm.phone"
              type="number"
              placeholder="请输入收货人联系电话"
              placeholder-style="color:#D2D2D2;font-size:26rpx;font-family:'SourceHanSans-Regular',sans-serif;"
              @input="onAddressFormUpdate('phone', $event.detail.value)"
            />
          </view>
          <view class="address-field">
            <text class="field-label">详细地址</text>
            <textarea
              class="field-textarea"
              :value="addressForm.detailAddress"
              placeholder="请输入详细收货地址"
              placeholder-style="color:#D2D2D2;font-size:26rpx;font-family:'SourceHanSans-Regular',sans-serif;"
              @input="onAddressFormUpdate('detailAddress', $event.detail.value)"
            />
          </view>
        </view>
        <text class="address-popup-hint">奖励将在7个工作日内发货。请确保地址信息准确无误</text>
        <view class="address-popup-actions">
          <button class="addr-btn addr-btn-cancel" @tap="onAddressPopupCancel">取消</button>
          <button class="addr-btn addr-btn-submit" :loading="exchangeLoading" @tap="onAddressPopupSubmit">提交</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import store from '../store/index'
import GiftCard from '../components/gift-card'
import StarExchangeTabs from '../components/star-exchange-tabs'
import { getStaticImage } from '../utils/staticAssets'

// 兑换列表本地 mock，数据结构与 apiGetPrizeList 的 list 一致，后端接入稳定后可整体删除
const ENABLE_EXCHANGE_MOCK = true
const MOCK_EXCHANGE_GIFT_BY_LEVEL = {
  1: [
    { prizeCode: 'P1-1', prizeName: '1星体验装', prizeImageUrl: getStaticImage('cards/CD001.png'), needStarCount: 1, totalCount: 100, remainCount: 50, canExchange: true, indexNum: 1 },
    { prizeCode: 'P1-2', prizeName: '1星小样', prizeImageUrl: getStaticImage('cards/CD001.png'), needStarCount: 1, totalCount: 80, remainCount: 0, canExchange: false, indexNum: 2 },
    { prizeCode: 'P1-3', prizeName: '1星试用礼', prizeImageUrl: '', needStarCount: 1, totalCount: 60, remainCount: 10, canExchange: true, indexNum: 3 },
    { prizeCode: 'P1-3', prizeName: '1星试用礼', prizeImageUrl: '', needStarCount: 1, totalCount: 60, remainCount: 10, canExchange: true, indexNum: 3 },
    { prizeCode: 'P1-3', prizeName: '1星试用礼', prizeImageUrl: '', needStarCount: 1, totalCount: 60, remainCount: 10, canExchange: true, indexNum: 3 },
    { prizeCode: 'P1-3', prizeName: '1星试用礼', prizeImageUrl: '', needStarCount: 1, totalCount: 60, remainCount: 10, canExchange: true, indexNum: 3 },
    { prizeCode: 'P1-3', prizeName: '1星试用礼', prizeImageUrl: '', needStarCount: 1, totalCount: 60, remainCount: 10, canExchange: true, indexNum: 3 },
    { prizeCode: 'P1-3', prizeName: '1星试用礼', prizeImageUrl: '', needStarCount: 1, totalCount: 60, remainCount: 10, canExchange: true, indexNum: 3 },
    { prizeCode: 'P1-3', prizeName: '1星试用礼', prizeImageUrl: '', needStarCount: 1, totalCount: 60, remainCount: 10, canExchange: true, indexNum: 3 },
  ],
  3: [
    { prizeCode: 'P3-1', prizeName: '3星面膜组合', prizeImageUrl: '', needStarCount: 3, totalCount: 50, remainCount: 20, canExchange: true, indexNum: 1 },
    { prizeCode: 'P3-2', prizeName: '3星精华体验', prizeImageUrl: '', needStarCount: 3, totalCount: 40, remainCount: 40, canExchange: true, indexNum: 2 },
    { prizeCode: 'P3-3', prizeName: '3星护理套装', prizeImageUrl: '', needStarCount: 3, totalCount: 30, remainCount: 0, canExchange: false, indexNum: 3 }
  ],
  5: [
    { prizeCode: 'P5-1', prizeName: '5星正装礼盒', prizeImageUrl: '', needStarCount: 5, totalCount: 20, remainCount: 5, canExchange: true, indexNum: 1 },
    { prizeCode: 'P5-2', prizeName: '5星医美体验券', prizeImageUrl: '', needStarCount: 5, totalCount: 100, remainCount: 80, canExchange: true, indexNum: 2 }
  ],
  10: [
    
  ]
}

const TAB_OPTIONS = [
  { label: '1星奖品', value: 1 },
  { label: '3星奖品', value: 3 },
  { label: '5星奖品', value: 5 },
  { label: '10星奖品', value: 10 }
]

export default {
  components: { GiftCard, StarExchangeTabs },

  data() {
    return {
      tabLevel: 1,
      tabOptions: TAB_OPTIONS,
      navBgOpacity: 0,
      navBarHeight: 0,
      shareInfo: {
        path: '/pages-activity/315-scan/views/star-exchange',
        title: '医美人有自己的小卡'
      }
    }
  },

  computed: {
    /** 表单绑定活动 store 的 addressForm，由 fetchAddressDetail 预填、用户可编辑 */
    addressForm() {
      return store.state.addressForm
    },
    userTotalStars() { return store.state.userTotalStars },
    exchangeGiftList() {
      const list = store.state.exchangeGiftList
      if (ENABLE_EXCHANGE_MOCK && list.length === 0 && !store.state.exchangeLoading) {
        return MOCK_EXCHANGE_GIFT_BY_LEVEL[this.tabLevel] || []
      }
      return list
    },
    exchangeLoading() { return store.state.exchangeLoading },
    exchangePage() { return store.state.exchangePage },
    exchangeTotalPage() { return store.state.exchangeTotalPage },
    addressPopupVisible() { return store.state.addressPopupVisible },
    loadMoreStatus() {
      if (store.state.exchangeLoading) return 'loading'
      return store.state.exchangePage >= store.state.exchangeTotalPage ? 'noMore' : 'more'
    }
  },

  watch: {
    addressPopupVisible(val) {
      this.$nextTick(() => {
        this.$refs.addressPop && (val ? this.$refs.addressPop.open() : this.$refs.addressPop.close())
      })
    }
  },

  onLoad() {
    this.loadList(1, false)
  },

  onShow() {
    this.report('积分商城pv', true)
    // 从主包地址列表选择返回：用主包 addressId(objectCode) + userCode 拉详情并打开填写弹窗
    const mainAddressId = (this.$store && this.$store.state.addressId) || ''
    // console.log('mainAddressId', mainAddressId)
    if (store.state.exchangeGiftItem && mainAddressId) {
      this.$store.commit('setAddressId', '')
      const userCode = this.$store.getters.userCode
      store.dispatch('fetchAddressDetail', { objectCode: mainAddressId, userCode }).then(() => {
        store.commit('SET_ADDRESS_POPUP_VISIBLE', true)
      })
    }
  },

  methods: {
    loadList(page, isLoadMore) {
      store.dispatch('fetchPrizeListExchange', {
        tabLevel: this.tabLevel,
        page,
        isLoadMore
      })
    },

    onTabChange(val) {
      this.tabLevel = val
      this.loadList(1, false)
    },

    onLoadMore() {
      if (this.exchangePage >= this.exchangeTotalPage || store.state.exchangeLoading) return
      this.loadList(this.exchangePage + 1, true)
    },

    onExchange(item) {
      const needStars = item.needStarCount ?? item.starCost ?? 0
      const outOfStock = Number(item.remainCount) === 0
      if (outOfStock) {
        uni.showToast({ title: '该礼品库存不足', icon: 'none' })
        return
      }
      // if (this.userTotalStars < needStars) {
      //   uni.showToast({ title: '星星数量不足，无法兑换', icon: 'none' })
      //   return
      // }
      store.commit('SET_EXCHANGE_GIFT_ITEM', item)
      uni.navigateTo({ url: '/pages/mine/address/list' })
    },

    onAddressFormUpdate(field, value) {
      store.commit('SET_ADDRESS_FORM', { [field]: value })
    },

    onAddressPopupCancel() {
      store.commit('SET_ADDRESS_POPUP_VISIBLE', false)
      store.commit('RESET_ADDRESS_FORM')
    },

    onScroll(e) {
      this.navBgOpacity = Math.min(e.detail.scrollTop / 48, 1)
    },

    onAddressPopupSubmit() {
      const item = store.state.exchangeGiftItem
      const form = store.state.addressForm
      if (!item) return
      store.dispatch('doExchangePrize', {
        prizeCode: item.prizeCode,
        receiver: form.receiverName,
        phone: form.phone,
        provinceName: form.provinceName,
        cityName: form.cityName,
        areaName: form.areaName,
        detailAddress: form.detailAddress,
        addressCode: form.addressCode
      })
    },

    onNavBarHeight(h) {
      this.navBarHeight = h || 0
    },

    $shareCallBack(type) {
      if (type === 'timeline') {
        this.report('315验真-活动分享-分享到朋友圈')
      } else {
        this.report('315验真-活动分享-分享到朋友')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/assets/315-scan/common.scss';

/* 导航栏背景渐变蒙层 */
.nav-bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 997;
  background-color: #ffffff;
  pointer-events: none;
}

/* 页面底色：顶部 453rpx 为渐变层，其余为 #F9F9F9 */
.container {
  font-family: 'SourceHanSans-Regular', sans-serif;
  position: relative;
  min-height: 100vh;
  background-color: #f9f9f9;

  text,
  input,
  textarea,
  button {
    font-family: 'SourceHanSans-Regular', sans-serif;
  }
}

/* 覆盖第三方组件内部文本 */
::v-deep .uni-load-more__text {
  font-family: 'SourceHanSans-Regular', sans-serif !important;
  margin-left: 0px !important;
}
::v-deep .x-button,
::v-deep .ik-form-item .label-text,
::v-deep .ik-form-item input,
::v-deep .ik-form-item textarea {
  font-family: 'SourceHanSans-Regular', sans-serif !important;
}

.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 453rpx;
  background: linear-gradient(180deg, #afdaff 0%, #ffffff 100%);
  z-index: 0;
}

.tab-bar {
  margin: 0;
  position: relative;
  z-index: 1;
}

.gift-list-wrap {
  position: relative;
  z-index: 1;
  /* 98rpx(tab栏) = 13.07vw；导航栏高度通过 --nav-bar-height 动态传入 */
  height: calc(100vh - var(--nav-bar-height, 0px) - 13.07vw);
  padding: 0 30rpx env(safe-area-inset-bottom);
  box-sizing: border-box;
}

.list-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400rpx;
}

.gift-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18rpx;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* ── 地址弹窗 ── */
.address-popup {
  width: 603rpx;
  height: 1069rpx;
  padding: 50rpx 61rpx 40rpx;
  background: linear-gradient(180deg, #d8f0ff 0%, #ffffff 22%, #ffffff 86%, #d8f0ff 100%);
  border-radius: 107rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.address-popup-title {
  display: block;
  margin-bottom: 46rpx;
  color: #333333;
  font-weight: 700;
  font-size: 36rpx;
  text-align: center;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

/* 三个字段的外层列容器 */
.address-fields {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  margin-bottom: 16rpx;
}

/* 每个字段：label + 输入框列布局 */
.address-field {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 26rpx;
  font-weight: 500;
  color: rgba(51, 51, 51, 0.82);
  line-height: 38rpx;
  margin-bottom: 12rpx;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.field-input {
  width: 100%;
  height: 84rpx;
  line-height: 84rpx;
  background: #f3f2f2;
  border-radius: 64rpx;
  padding: 0 30rpx 0 44rpx;
  box-sizing: border-box;
  font-size: 26rpx;
  color: #333333;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.field-textarea {
  width: 100%;
  height: 301rpx;
  background: #f3f2f2;
  border-radius: 46rpx;
  padding: 24rpx 30rpx 24rpx 44rpx;
  box-sizing: border-box;
  font-size: 26rpx;
  color: #333333;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.address-popup-hint {
  display: block;
  margin-bottom: 32rpx;
  color: #ff6903;
  font-size: 24rpx;
  line-height: 1.48;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.address-popup-actions {
  display: flex;
  gap: 13rpx;

  .addr-btn {
    flex: 1;
    height: 92rpx;
    line-height: 92rpx;
    border-radius: 63rpx;
    font-size: 32rpx;
    font-family: 'SourceHanSans-Regular', sans-serif;
    border: none;
    padding: 0;
    text-align: center;
    box-sizing: border-box;
  }

  .addr-btn-cancel {
    flex: 165;
    background: #f3f2f2;
    color: #999999;
  }

  .addr-btn-submit {
    flex: 304;
    background: #2b9de7;
    color: #ffffff;
    font-weight: 700;
  }
}
</style>

