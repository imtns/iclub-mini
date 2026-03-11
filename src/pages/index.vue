<template>
  <div class="container">
    <!-- 登录状态卡片 -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">登录状态</span>
        <span class="status-tag" :class="isLogin ? 'status-success' : 'status-warning'">
          {{ isLogin ? "已登录" : "未登录" }}
        </span>
      </div>
      <div class="card-content">
        <!-- 登录/退出按钮 -->
        <div class="btn-group" v-if="!isLogin">
          <x-btn @click="handleLogin" class="action-btn">去登录</x-btn>
        </div>

        <!-- 已登录状态展示 -->
        <template v-if="isLogin">
          <div class="user-info-section">
            <div class="avatar-container">
              <img :src="userInfo.headUrl || '/static/default-avatar.png'" class="user-avatar" mode="aspectFill" />
              <div class="user-name">{{ userInfo.nickName || "未知用户" }}</div>
            </div>

            <x-btn @click="logout" class="action-btn logout-btn">退出登录</x-btn>
          </div>

          <!-- 地址选择模块 -->
          <div class="address-section">
            <x-btn @click="goAddress" class="action-btn"> 选择兑换地址 </x-btn>

            <div v-if="addressId" class="address-id-info">
              <span class="info-label">选中的地址ID：</span>
              <span class="info-value address-id">{{ addressId }}</span>
              <span class="tip-text">(兑换时将使用此地址ID提交)</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 页面跳转卡片 -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">页面跳转</span>
      </div>
      <div class="card-content">
        <x-btn @click="go315" class="nav-btn"> 跳转315扫码验真页面 </x-btn>
      </div>
      <div class="card-content">
        <x-btn @click="goposter" class="nav-btn"> 跳转AI海报页面 </x-btn>
      </div>
    </div>

    <!-- 埋点测试卡片 -->
    <div class="card">
      <div class="card-header">
        <span class="card-title">埋点测试</span>
      </div>
      <div class="card-content">
        <x-btn @click="testMaidian" class="nav-btn"> 测试埋点调用方法 </x-btn>
      </div>
    </div>

    <!-- 重要提示 -->
    <div class="important-note">
      <i class="icon-warning"></i>
      <span>注意：所有页面、组件、utils、api都新建到这两个文件夹（315-scan和ai-poster)，不要在其他地方新建文件，所有逻辑仅限这两个文件夹内改动</span>
    </div>
    <div class="important-note">
      <i class="icon-warning"></i>
      <span>注意：所有图片，要记得压缩，推荐使用tinypng</span>
    </div>
    <div class="important-note">
      <span style="color: red">
        小程序分享方法，不要写onShareAppMessage，因为onShareAppMessage是全局方法，会添加分享特定参数，<br />
        在页面中写会覆盖掉 请在data中，定义shareInfo
      </span>
    </div>
    <button style="background-color: orange" open-type="share" @click="handleShareClick">按钮点击分享时的文案设置参考</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      shareInfo: {
        path: "/pages-activity/315-scan/views/index", // 分享路径
        title: "测试爱美客分享标题", // 分享标题
        imageUrl: "https://udstatic.imeik.com/compressed/1772013728917_2.jpeg", // 分享图片的URL
      },
    };
  },
  computed: {
    ...mapState(["userInfo", "isLogin", "addressId"]),
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    handleShareClick() {
      // 当点击分享按钮时，分享文案这样设置
      this.shareInfo.buttonTitle = "测试爱美客分享按钮文案";
      this.shareInfo.buttonImage = "https://udstatic.imeik.com/compressed/1772013862447_8.jpeg";
      this.shareInfo.path = "/pages-activity/315-scan/views/index?a=1&b=2"; // 分享路径，可以携带参数
    },
    logout() {
      try {
        this.$store.commit("setIsLogin", false);
        // 优化：清除存储时保留指定key，避免误删重要数据
        this.clearStorageExcept(["token", "userInfo"]);
        uni.showToast({
          title: "退出登录成功",
          icon: "success",
        });
      } catch (error) {
        console.error("退出登录失败:", error);
        uni.showToast({
          title: "退出登录失败",
          icon: "none",
        });
      }
    },

    goAddress() {
      uni.navigateTo({
        url: "/pages/mine/address/list",
      });
    },
    go315() {
      uni.navigateTo({
        url: "/pages-activity/315-scan/views/index",
      });
    },
    goposter() {
      uni.navigateTo({
        url: "/pages-activity/ai-poster/index",
      });
    },
    handleLogin() {
      // 可以在这里调用全局登录方法跳转逻辑
      this.goLogin();
    },
    testMaidian() {
      // 埋点调用方法，比如星星记录入口点击,到时候根据文档埋点记录，在调用的地方调用这个全局方法即可
      try {
        this.report("星星记录入口点击");
        uni.showToast({
          title: "埋点调用成功",
          icon: "success",
        });
      } catch (error) {
        console.error("埋点调用失败:", error);
        uni.showToast({
          title: "埋点调用失败",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  box-sizing: border-box;
  min-height: 100vh;
  padding: 20rpx;
  background-color: #f5f7fa;
}

// 页面标题
.page-title {
  margin-bottom: 10rpx;
  color: #333;
  font-weight: 600;
  font-size: 36rpx;
  text-align: center;
}

// 卡片样式
.card {
  overflow: hidden;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 5%);

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    background-color: #f8f9fa;
    border-bottom: 1rpx solid #eee;

    .card-title {
      color: #333;
      font-weight: 600;
      font-size: 32rpx;
    }

    .status-tag {
      padding: 6rpx 16rpx;
      color: #fff;
      font-size: 24rpx;
      border-radius: 30rpx;

      &.status-success {
        background-color: #07c160;
      }

      &.status-warning {
        background-color: #ff976a;
      }
    }
  }

  .card-content {
    padding: 20rpx;
  }
}

// 信息行样式
.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  font-size: 28rpx;

  .info-label {
    min-width: 120rpx;
    color: #666;
  }

  .info-value {
    color: #333;
    font-weight: 500;
  }
}

// 按钮样式
.btn-group {
  margin: 10rpx 0;
}

.action-btn {
  width: 100%;
  height: 80rpx;
  margin-bottom: 16rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  border-radius: 12rpx;
}

.logout-btn {
  background-color: #ee0a24 !important;
}

.nav-btn {
  width: 100%;
  height: 80rpx;
  font-size: 28rpx;
  line-height: 80rpx;
  border-radius: 12rpx;
}

// 用户信息区域
.user-info-section {
  display: flex;
  gap: 20rpx;
  align-items: center;
  margin: 20rpx 0;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;

  .avatar-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

    .user-avatar {
      width: 100rpx;
      height: 100rpx;
      margin-bottom: 10rpx;
      border: 2rpx solid #f0f0f0;
      border-radius: 50%;
    }

    .user-name {
      color: #333;
      font-weight: 500;
      font-size: 28rpx;
    }
  }
}

// 地址区域
.address-section {
  margin-top: 20rpx;

  .section-title {
    margin-bottom: 16rpx;
    color: #333;
    font-weight: 500;
    font-size: 28rpx;
  }

  .address-id-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 16rpx;
    padding: 16rpx;
    font-size: 26rpx;
    background-color: #f8f9fa;
    border-radius: 8rpx;

    .address-id {
      margin: 0 8rpx;
      color: #356ad3;
      font-weight: 600;
    }

    .tip-text {
      margin-left: 8rpx;
      color: #999;
      font-size: 24rpx;
    }
  }
}

// 重要提示
.important-note {
  display: flex;
  align-items: flex-start;
  margin-top: 10rpx;
  padding: 20rpx;
  background-color: #fff7e6;
  border: 1rpx solid #ffd591;
  border-radius: 12rpx;

  .icon-warning {
    flex-shrink: 0;
    width: 32rpx;
    height: 32rpx;
    margin-right: 12rpx;
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJBMTAgMTAgMCAwIDAgMiAxMnYxYTEgMSAwIDAgMCAxIDFoMTZhMSAxIDAgMCAwIDEtMXYtMUExMCAxMCAwIDAgMCAxMiAyem0xIDEzYTEgMSAwIDAgMS0yIDB2LTJhMSAxIDAgMCAxIDIgMHptLS41LTguNWExLjUgMS41IDAgMCAwLTIgMGwtLjUgM2ExIDEgMCAwIDAgMS41IDEuNWg0YTEgMSAwIDAgMCAxLjUtMS41bC0uNS0zYTEuNSAxLjUgMCAwIDAtMiAwem0uNSA0LjV2LjV6IiBmaWxsPSIjZTllNzczIiBmaWxsLW9wYWNpdHk9IjEiLz48L3N2Zz4=")
      no-repeat center;
    background-size: 100%;
  }

  span {
    color: #e67700;
    font-size: 26rpx;
    line-height: 1.6;
  }
}
</style>
