<template>
  <view class="demo-page">
    <ik-custom-header extra-holder :transparent="transparentBar" title="MBTI Demo" />

    <!-- 顶部介绍 -->
    <view class="hero">
      <view class="hero__badge">DEMO</view>
      <view class="hero__title">MBTI 功能接入示例</view>
      <view class="hero__desc"> 本页面用于展示 MBTI 模块的基础组件、登录状态及页面跳转能力 </view>
    </view>

    <!-- 重要提示 -->
    <view class="notice">
      <view class="notice__icon">!</view>
      <view class="notice__content">
        <view class="notice__title">开发注意</view>
        <view class="notice__text">
          所有新增代码请统一放在
          <text class="notice__code">pages-mbti</text>
          文件夹中
        </view>
      </view>
    </view>

    <!-- 登录状态 -->
    <view class="section">
      <view class="section__header">
        <view>
          <view class="section__title">登录状态</view>
          <view class="section__desc">全局 Mixin 数据示例</view>
        </view>

        <view class="status-tag" :class="isLogin ? 'status-tag--success' : 'status-tag--warning'">
          <view class="status-tag__dot"></view>
          {{ isLogin ? "已登录" : "未登录" }}
        </view>
      </view>

      <view class="login-info">
        <view class="info-row">
          <text class="info-row__label">isLogin</text>
          <text class="info-row__value">{{ isLogin }}</text>
        </view>

        <template v-if="isLogin">
          <view class="divider"></view>

          <view class="user-card">
            <image v-if="userInfo && userInfo.headUrl" class="user-card__avatar" :src="userInfo.headUrl" mode="aspectFill" />

            <view class="user-card__content">
              <view class="user-card__name">
                {{ (userInfo && userInfo.nickName) || "当前用户" }}
              </view>

              <view class="user-card__phone" v-if="userInfo && userInfo.phone">
                {{ userInfo.phone }}
              </view>
            </view>
          </view>

          <!-- 原始用户信息，方便开发调试 -->
          <view class="json-box">
            <view class="json-box__header">
              <text>userInfo</text>
              <text class="json-box__type">Object</text>
            </view>

            <view class="json-box__content">
              {{ JSON.stringify(userInfo, null, 2) }}
            </view>
          </view>
        </template>

        <button v-else class="action-btn action-btn--pink" @click="goLogin">前往登录</button>
        <button v-if="isLogin" class="action-btn" @click="goLogout">退出登录</button>
      </view>
    </view>

    <!-- 组件演示 -->
    <view class="section">
      <view class="section__header">
        <view>
          <view class="section__title">组件演示</view>
          <view class="section__desc">Uni UI 基础组件使用示例</view>
        </view>
      </view>

      <view class="component-list">
        <!-- Popup -->
        <view class="component-item">
          <view class="component-item__info">
            <view class="component-item__icon">P</view>
            <view>
              <view class="component-item__title">Popup</view>
              <view class="component-item__desc">居中弹窗组件</view>
            </view>
          </view>

          <button class="mini-btn mini-btn--light" @click="open">打开</button>
        </view>

        <!-- Rate -->
        <view class="component-item component-item--column">
          <view class="component-item__info">
            <view class="component-item__icon">R</view>
            <view>
              <view class="component-item__title">Rate</view>
              <view class="component-item__desc">评分组件</view>
            </view>
          </view>

          <view class="rate-wrapper">
            <uni-rate :max="10" :value="5" />
          </view>
        </view>
      </view>
    </view>

    <!-- 页面导航 -->
    <view class="section">
      <view class="section__header">
        <view>
          <view class="section__title">页面导航</view>
          <view class="section__desc">MBTI 模块页面跳转示例</view>
        </view>
      </view>

      <view class="route-card" @click="go">
        <view class="route-card__icon">MBTI</view>

        <view class="route-card__content">
          <view class="route-card__title">MBTI 测试页面</view>
          <view class="route-card__path"> /pages-mbti/index </view>
        </view>

        <view class="route-card__arrow">›</view>
      </view>
    </view>
    <view class="section">
      <view class="section__header">
        <view>
          <view class="section__title">埋点示例</view>
        </view>
      </view>

      <view class="route-card" @click="handleReport">
        <view class="route-card__content">
          <view class="route-card__title">点击记录埋点</view>
        </view>

        <view class="route-card__arrow">›</view>
      </view>
    </view>
    <!-- 底部提示 -->
    <view class="footer-tip">
      <view class="footer-tip__line"></view>
      <text>MBTI MODULE DEMO</text>
      <view class="footer-tip__line"></view>
    </view>

    <!-- Popup -->
    <uni-popup ref="popup" border-radius="24rpx">
      <view class="popup-card">
        <view class="popup-card__icon">✓</view>
        <view class="popup-card__title">Popup 示例</view>
        <view class="popup-card__desc"> 这是一个自定义居中弹窗 </view>

        <button class="popup-card__btn" type="primary" @click="closePopup">知道了</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
// isLogin 和 userInfo 已注册全局 mixin
// 可直接获取登录状态及当前用户信息，无需在当前页面重新定义

export default {
  data() {
    return {};
  },

  methods: {
    /**
     * 打开 Popup
     * 支持：top / left / bottom / right / center
     */
    open() {
      this.$refs.popup.open("center");
    },

    /**
     * 关闭 Popup
     */
    closePopup() {
      this.$refs.popup.close();
    },

    /**
     * 跳转 MBTI 页面
     */
    go() {
      wx.navigateTo({
        url: "/pages-mbti/index",
      });
    },
    goLogout() {
      if (!this.isLogin) return;
      const that = this;

      uni.showModal({
        title: "提示",
        content: "确认退出登录？",
        success(res) {
          if (res.confirm) {
            that.$store.commit("setIsLogin", false);
            that.clearStorageExcept(["sysInfo", "navBarHeight", "openId", "unionId", "home-loaded"]);
          }
        },
      });
    },
    handleReport() {
      // 埋点接口调用全局方法report, 未来所有页面加载，点击操作，均可调用该方法上报埋点数据
      // eg: this.report('mbti页面加载');
      this.report("点击记录埋点");
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 24rpx 28rpx 80rpx;
  background: #f5f7fa;
  color: #1f2329;
}

/* =========================
   顶部介绍
========================= */

.hero {
  position: relative;
  overflow: hidden;
  padding: 40rpx 36rpx;
  margin-bottom: 24rpx;
  border-radius: 28rpx;
  background: linear-gradient(135deg, #20252d 0%, #353c48 100%);
  box-shadow: 0 12rpx 36rpx rgba(31, 35, 41, 0.12);

  &::after {
    content: "";
    position: absolute;
    top: -80rpx;
    right: -60rpx;
    width: 240rpx;
    height: 240rpx;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    height: 42rpx;
    padding: 0 18rpx;
    margin-bottom: 22rpx;
    border-radius: 21rpx;
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.8);
    font-size: 22rpx;
    font-weight: 600;
    letter-spacing: 2rpx;
  }

  &__title {
    position: relative;
    z-index: 1;
    margin-bottom: 14rpx;
    color: #fff;
    font-size: 40rpx;
    font-weight: 700;
    line-height: 1.4;
  }

  &__desc {
    position: relative;
    z-index: 1;
    max-width: 580rpx;
    color: rgba(255, 255, 255, 0.62);
    font-size: 25rpx;
    line-height: 1.7;
  }
}

/* =========================
   开发提示
========================= */

.notice {
  display: flex;
  align-items: flex-start;
  padding: 26rpx 28rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid #ffe0a3;
  border-radius: 22rpx;
  background: #fffaf0;

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 42rpx;
    height: 42rpx;
    margin-right: 20rpx;
    border-radius: 50%;
    background: #ffb020;
    color: #fff;
    font-size: 26rpx;
    font-weight: bold;
  }

  &__content {
    flex: 1;
  }

  &__title {
    margin-bottom: 8rpx;
    color: #8c5a00;
    font-size: 27rpx;
    font-weight: 600;
  }

  &__text {
    color: red;
    font-size: 28rpx;
    line-height: 1.7;
  }

  &__code {
    display: inline-block;
    padding: 1rpx 10rpx;
    margin: 0 5rpx;
    border-radius: 6rpx;
    background: #fff0cc;
    font-size: 28rpx;
    color: #d48806;
    font-family: monospace;
    font-weight: 600;
  }
}

/* =========================
   通用 Section
========================= */

.section {
  padding: 30rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid #edf0f5;
  border-radius: 26rpx;
  background: #fff;
  box-shadow: 0 6rpx 24rpx rgba(31, 35, 41, 0.04);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28rpx;
  }

  &__title {
    margin-bottom: 6rpx;
    color: #1f2329;
    font-size: 30rpx;
    font-weight: 700;
  }

  &__desc {
    color: #a1a7b3;
    font-size: 22rpx;
  }
}

/* =========================
   登录状态
========================= */

.status-tag {
  display: flex;
  align-items: center;
  height: 48rpx;
  padding: 0 18rpx;
  border-radius: 24rpx;
  font-size: 22rpx;
  font-weight: 500;

  &__dot {
    width: 12rpx;
    height: 12rpx;
    margin-right: 10rpx;
    border-radius: 50%;
  }

  &--success {
    background: #edf9f1;
    color: #2ba471;

    .status-tag__dot {
      background: #2ba471;
    }
  }

  &--warning {
    background: #fff5e8;
    color: #ed7b2f;

    .status-tag__dot {
      background: #ed7b2f;
    }
  }
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__label {
    color: #646a73;
    font-size: 25rpx;
  }

  &__value {
    padding: 6rpx 14rpx;
    border-radius: 8rpx;
    background: #f2f3f5;
    color: #3370ff;
    font-family: monospace;
    font-size: 23rpx;
  }
}

.divider {
  height: 1rpx;
  margin: 26rpx 0;
  background: #f0f1f3;
}

/* =========================
   用户
========================= */

.user-card {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;

  &__avatar {
    width: 88rpx;
    height: 88rpx;
    margin-right: 20rpx;
    border: 4rpx solid #f2f3f5;
    border-radius: 50%;
    background: #f5f5f5;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__name {
    overflow: hidden;
    margin-bottom: 8rpx;
    color: #1f2329;
    font-size: 28rpx;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__phone {
    color: #8f959e;
    font-size: 23rpx;
  }
}

/* =========================
   JSON
========================= */

.json-box {
  overflow: hidden;
  border-radius: 16rpx;
  background: #f7f8fa;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18rpx 22rpx;
    border-bottom: 1rpx solid #e8eaed;
    color: #646a73;
    font-family: monospace;
    font-size: 22rpx;
  }

  &__type {
    color: #8f959e;
  }

  &__content {
    max-height: 320rpx;
    overflow-y: auto;
    padding: 22rpx;
    color: #4e5969;
    font-family: monospace;
    font-size: 21rpx;
    line-height: 1.65;
    white-space: pre-wrap;
    word-break: break-all;
  }
}

/* =========================
   组件
========================= */

.component-list {
  overflow: hidden;
  border: 1rpx solid #f0f1f3;
  border-radius: 18rpx;
}

.component-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 110rpx;
  padding: 20rpx 22rpx;
  border-bottom: 1rpx solid #f0f1f3;

  &:last-child {
    border-bottom: 0;
  }

  &--column {
    align-items: flex-start;
    flex-direction: column;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    margin-right: 18rpx;
    border-radius: 16rpx;
    background: #eef3ff;
    color: #3370ff;
    font-size: 24rpx;
    font-weight: 700;
  }

  &__title {
    margin-bottom: 5rpx;
    color: #1f2329;
    font-size: 26rpx;
    font-weight: 600;
  }

  &__desc {
    color: #a1a7b3;
    font-size: 21rpx;
  }
}

.rate-wrapper {
  padding: 24rpx 0 5rpx 82rpx;
}

/* =========================
   按钮
========================= */

.mini-btn {
  min-width: 110rpx;
  height: 60rpx;
  padding: 0 24rpx;
  margin: 0;
  border-radius: 14rpx;
  font-size: 23rpx;
  line-height: 60rpx;

  &--light {
    border: 1rpx solid #dfe3e8;
    background: #fff;
    color: #4e5969;

    &::after {
      border: 0;
    }
  }
}

.action-btn {
  margin-top: 24rpx;
  border-radius: 16rpx;
  font-size: 26rpx;

  &--pink {
    border: 0;
    background: #fff0f5;
    color: #e8518d;

    &::after {
      border: 0;
    }
  }
}

/* =========================
   路由
========================= */

.route-card {
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-radius: 18rpx;
  background: #f7f9ff;

  &:active {
    opacity: 0.75;
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 88rpx;
    height: 88rpx;
    margin-right: 22rpx;
    border-radius: 22rpx;
    background: #3370ff;
    color: #fff;
    font-size: 20rpx;
    font-weight: 700;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin-bottom: 9rpx;
    color: #1f2329;
    font-size: 27rpx;
    font-weight: 600;
  }

  &__path {
    overflow: hidden;
    color: #8f959e;
    font-family: monospace;
    font-size: 21rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__arrow {
    margin-left: 20rpx;
    color: #a1a7b3;
    font-size: 46rpx;
    font-weight: 300;
  }
}

/* =========================
   Drawer
========================= */

.drawer {
  display: flex;
  flex-direction: column;
  width: 580rpx;
  height: 100%;
  background: #fff;

  &__header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 40rpx 30rpx 26rpx;
    border-bottom: 1rpx solid #f0f1f3;
  }

  &__title {
    margin-bottom: 6rpx;
    font-size: 30rpx;
    font-weight: 700;
  }

  &__desc {
    color: #a1a7b3;
    font-size: 22rpx;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58rpx;
    height: 58rpx;
    border-radius: 50%;
    background: #f5f6f7;
    color: #646a73;
    font-size: 40rpx;
    line-height: 1;
  }

  &__scroll {
    flex: 1;
    height: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    min-height: 90rpx;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #f5f5f5;
    color: #4e5969;
    font-size: 25rpx;
  }

  &__number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48rpx;
    height: 48rpx;
    margin-right: 20rpx;
    border-radius: 12rpx;
    background: #f2f3f5;
    color: #8f959e;
    font-size: 20rpx;
  }
}

/* =========================
   Popup
========================= */

.popup-card {
  width: 520rpx;
  box-sizing: border-box;
  padding: 46rpx 36rpx 34rpx;
  border-radius: 26rpx;
  background: #fff;
  text-align: center;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88rpx;
    height: 88rpx;
    margin: 0 auto 24rpx;
    border-radius: 50%;
    background: #edf9f1;
    color: #2ba471;
    font-size: 42rpx;
    font-weight: 600;
  }

  &__title {
    margin-bottom: 14rpx;
    color: #1f2329;
    font-size: 32rpx;
    font-weight: 700;
  }

  &__desc {
    margin-bottom: 34rpx;
    color: #8f959e;
    font-size: 24rpx;
  }

  &__btn {
    border-radius: 16rpx;
    font-size: 26rpx;
  }
}

/* =========================
   Footer
========================= */

.footer-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
  color: #c2c6cc;
  font-size: 19rpx;
  letter-spacing: 2rpx;

  &__line {
    width: 60rpx;
    height: 1rpx;
    margin: 0 18rpx;
    background: #dfe1e5;
  }
}
</style>
