<template>
  <div class="container">
    <ik-custom-header :transparent="transparent" theme="light" @back="handleBack" :system-update-pop="false">
      <view slot="title" class="title"> 登录 </view>
    </ik-custom-header>
    <x-loading v-if="loading" background="white" text="正在登录..." />
    <loginform :invite="invite" :code="loginCode" :attrs="loginFormAttrs">
      <div @click="handleLoginClick">
        <button v-if="!isAgreePrivacy" class="wx-btn">一键登录</button>
        <button v-else-if="canQuickLogin" class="wx-btn" :class="{ loading }" :disabled="loading" @click="handleQuickLogin">一键登录</button>
        <button v-else class="wx-btn" open-type="getPhoneNumber" :class="{ loading }" :disabled="loading" @getphonenumber="handleGetPhoneNumber">一键登录</button>
      </div>
    </loginform>
    <x-toast ref="toast" />
  </div>
</template>

<script>
import { getCurrentAppId } from '@/utils'
import { EVENT_ID_ELEMENT_CLICK } from '@/mixin/config'
import report from '@/utils/report/report'
import { getActivePage } from '@/utils/report/helper'
import { setEncryptKey } from '@/http/wx'
import { ls, lsGet, lsDel } from '@/utils/util'
import { mapActions, mapState } from 'vuex'
import { getEncryptData } from '@/utils/tools'
const { env } = require('@/http/env')

// ─── 常量定义（抽离到顶部，便于维护）────────────────────────────────────────

const STORAGE_KEYS = {
  USER_TOKEN: 'iclubUserToken3',
  OPEN_ID: 'openId',
  UNION_ID: 'unionId',
  RETURN_URL: 'returnUrl',
  NEW_USER_FLAG: 'newUserFlag',
  ENCRYPT_KEY: 'encryptKey',
  ENCRYPT_IV: 'encryptIV',
  ENCRYPT_VERSION: 'encryptVersion'
}

const API_HEADER = {
  businessApp: 'iclub',
  businessSys: 'iclub',
  envVersion: env === 'prod' ? 'production' : 'test'
}

console.log('env', env)

export default {
  name: 'LoginPage',

  data() {
    return {
      isPhoneLoginOpen: false,
      loading: false,
      loginPlugin: requirePlugin('myPlugin'),
      invite: (getApp().globalData && getApp().globalData.inviteCode) || '',
      isAgreePrivacy: false, // 原 agree
      loginCode: '', // 原 code
      loginFormAttrs: {}, // 原 attrs
      canQuickLogin: false,
      header: API_HEADER,
      inviteData: {}
    }
  },

  async onLoad() {
    try {
      await this.fetchLoginCode()
      this.initLoginFormAttrs()
      wx.hideShareMenu({})
      this.initPluginEventListeners()
      this.checkUserCanQuickLogin()
    } catch (error) {
      console.error('页面初始化失败:', error)
      this.$refs.toast?.show({ title: '登录初始化失败，请重试' })
    }
  },

  onUnload() {
    this.removePluginEventListeners()
    lsDel(STORAGE_KEYS.RETURN_URL)
  },

  computed: {
    ...mapState({
      inviteInfo: state => state.auth.inviteInfo
    })
  },

  mounted() {
    getApp().globalData.logining = false
  },

  methods: {
    ...mapActions(['setIntegral']),

    /**
     * 初始化插件事件监听
     */
    initPluginEventListeners() {
      const { emitter } = this.loginPlugin

      emitter.on('choosePrivacy', (data) => {
        this.isAgreePrivacy = data
      })

      emitter.on('noLogin', () => {
        console.log('用户点击了暂不登录')
        emitter.off('noLogin')
        uni.navigateBack()
      })

      emitter.on('handleLoginData', (res) => {
        console.log('手机号登录成功')
        this.handleLoginSuccess(res)
      })

      emitter.on('phoneLoginOpen', (data) => {
        this.isPhoneLoginOpen = data
      })
    },

    /**
     * 移除插件事件监听
     */
    removePluginEventListeners() {
      const { emitter } = this.loginPlugin
      const events = ['choosePrivacy', 'noLogin', 'handleLoginData', 'phoneLoginOpen', 'closeLoginPhone']
      events.forEach((event) => emitter.off(event))
    },

    /**
     * 处理返回
     */
    handleBack() {
      uni.navigateBack()
    },

    /**
     * 初始化登录表单属性（原 getAttrs）
     */
    initLoginFormAttrs() {
      const inviteData = {
        inviteCode: getApp?.()?.globalData?.inviteCode || this.inviteInfo.inviteCode || '',
        inviteSource: getApp?.()?.globalData?.inviteSource || this.inviteInfo.inviteSource || '',
        shareLinkTime: getApp?.()?.globalData?.shareLinkTime || this.inviteInfo.shareLinkTime || '',
        channel: (getApp() && getApp().globalData && getApp().globalData.userSource) || ''
      }
      this.inviteData = inviteData
      this.loginFormAttrs = {
        logo: 'https://udstatic.imeik.com/pcUploads/1711074121845/iclub-logo.png',
        text: 'IMEIK爱+',
        extra: { bizData: JSON.stringify(inviteData) },
        ...API_HEADER
      }
      console.log('登录表单属性:', this.loginFormAttrs)
    },

    /**
     * 检测是否可以快捷登录（保留第一份核心逻辑）
     */
    checkUserCanQuickLogin() {
      const params = {
        appId: getCurrentAppId(),
        code: this.loginCode
      }
      this.loginPlugin
        .loginCheckAccountByCode(params, API_HEADER)
        .then((result) => {
          console.log('checkUserCanQuickLogin result:', result)
          this.canQuickLogin = result == '1'
        })
        .finally(() => {
          // 调用检测接口后需要重新获取一次 wx.code 供登录时使用
          this.fetchLoginCode()
        })
    },

    /**
     * 快捷登录入口（保留第一份逻辑）
     */
    handleQuickLogin() {
      this.wechatLogin()
    },

    /**
     * 登录成功处理（原 handleLoginOK，保留第一份注册逻辑）
     * @param {Object} res - 登录成功返回数据
     */
    async handleLoginSuccess(res) {
      console.log('登录成功，已获取token', res.token)

      const { token, openId, unionId, bizData } = res
      ls(STORAGE_KEYS.USER_TOKEN, token || '')
      ls(STORAGE_KEYS.OPEN_ID, openId)
      ls(STORAGE_KEYS.UNION_ID, unionId)

      // newUserFlag 从登录返回的 bizData 里解析（第二份方式，无需再调 userRegister）
      try {
        const parsedBizData = JSON.parse(bizData || '{}')
        ls(STORAGE_KEYS.NEW_USER_FLAG, parsedBizData.newUserFlag === '1')
      } catch {
        ls(STORAGE_KEYS.NEW_USER_FLAG, false)
      }

      try {
        // 1. 获取并设置加密信息
        await this.handleEncryptData()

        // 2. 更新登录状态 & 获取用户信息
        this.$store.commit('setIsLogin', true)
        this.$store.dispatch('getUserInfo')

        // 3. 页面跳转
        this.handlePageRedirect()
      } catch (err) {
        console.error('登录异常', err)
        this.$refs.toast?.show({ title: '登录失败，请重试' })
      } finally {
        this.loading = false
      }
    },

    /**
     * 处理加密数据（从第二份抽出为独立方法）
     */
    async handleEncryptData() {
      const { encryptKey, iv: encryptIV, version } = await getEncryptData()
      console.log('encryptKey', encryptKey)
      console.log('encryptIV', encryptIV)
      console.log('version', version)

      await setEncryptKey({ businessSys: 'iclub', iv: encryptIV, version })

      ls(STORAGE_KEYS.ENCRYPT_KEY, encryptKey)
      ls(STORAGE_KEYS.ENCRYPT_IV, encryptIV)
      ls(STORAGE_KEYS.ENCRYPT_VERSION, version)
    },

    /**
     * 处理页面跳转（原 handleLoginOK 末尾逻辑抽出）
     */
    async handlePageRedirect() {
      const returnUrl = lsGet(STORAGE_KEYS.RETURN_URL)
      this.$nextTick(() => {
        if (returnUrl) {
          uni.redirectTo({
            url: returnUrl,
            success: () => lsDel(STORAGE_KEYS.RETURN_URL),
            fail: (err) => {
              console.error('跳转失败:', err)
              this.handleBack()
            }
          })
        } else {
          this.handleBack()
        }
      })
    },

    /**
     * 获取登录 Code（原 getCode）
     */
    async fetchLoginCode() {
      const maxRetries = 1
      let retryCount = 0
      const that = this

      const tryGetCode = () => {
        return new Promise((resolve, reject) => {
          wx.login({
            success(data) {
              if (data.errMsg === 'login:ok' && data.code) {
                console.log('获取到code:', data.code)
                that.loginCode = data.code
                resolve(data.code)
              } else {
                reject(new Error('wx.login获取到code为空'))
              }
            },
            fail(err) {
              console.log('获取登录CODE失败', err)
              reject(err)
            }
          })
        })
      }

      while (retryCount <= maxRetries) {
        try {
          return await tryGetCode()
        } catch (err) {
          retryCount++
          if (retryCount > maxRetries) {
            this.$refs.toast?.show({ title: '获取登录凭证失败' })
            throw new Error('获取code失败')
          }
          console.log(`重试获取code (${retryCount}/${maxRetries})`)
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }
    },

    /**
     * 埋点上报（原 reportLoginEvent）
     */
    reportLoginEvent(data) {
      const cur = getActivePage() || {}
      report({
        eventId: EVENT_ID_ELEMENT_CLICK,
        pageUrl: 'pages/login/index',
        referrerUrl: cur.route || '',
        dataKeys: data
      })
    },

    /**
     * 处理获取手机号（原 getPhoneNumber）
     */
    async handleGetPhoneNumber({ detail }) {
      if (detail.errMsg !== 'getPhoneNumber:ok') {
        this.reportLoginEvent({ activityName: '取消', actionRank: 5, activityId: 'p005_phone_cannel' })
        return
      }
      const { iv, encryptedData } = detail
      this.reportLoginEvent({ activityName: '允许', actionRank: 6, activityId: 'p005_phone_permit' })
      await this.wechatLogin({ iv, encryptedData })
    },

    /**
     * 登录按钮点击埋点（原 handleLogin）
     */
    handleLoginClick() {
      this.reportLoginEvent({ activityName: '微信授权', actionRank: 2, activityId: 'p005_register_yes' })
    },

    /**
     * 微信登录核心逻辑（原 wxLogin，保留第一份 canQuickLogin / newLoginFlag 逻辑）
     * @param {Object} params - 可选的加密手机号参数
     */
    async wechatLogin({ encryptedData = '', iv = '' } = {}) {
      this.loading = true

      let params = {
        encryptedData,
        appId: getCurrentAppId(),
        invite: (getApp().globalData && getApp().globalData.inviteCode) || this.inviteInfo.inviteCode || '',
        code: this.loginCode,
        iv,
        registerChannel: '',
        bizData: JSON.stringify(this.inviteData) || ''
      }

      // 快捷登录时附加标识
      if (this.canQuickLogin) {
        params = Object.assign(params, { newLoginFlag: '1' })
      }

      try {
        const res = await this.loginPlugin.wxLogin(params, API_HEADER)
        await this.handleLoginSuccess(res)
      } catch (error) {
        console.error('登录失败:', error)
        this.$refs.toast?.show({ title: '登录失败，请重试' })
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 100vh;
  background-color: white !important;

  .wx-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 622rpx;
    height: 88rpx;
    color: #fff;
    font-weight: 500;
    font-size: 28rpx;
    line-height: 40rpx;
    text-align: center;
    background: #05bc24;
    border: none;
    border-radius: 16rpx;

    &.loading {
      background: rgba(5, 188, 36, 50%);
    }

    &[disabled] {
      background: rgba(5, 188, 36, 60%);
    }

    .btn-img {
      z-index: 10;
      width: 32rpx;
      height: 32rpx;
      margin-right: 8rpx;
    }
  }

  .title {
    font-weight: 600;
    font-size: 32rpx;
  }
}
</style>
