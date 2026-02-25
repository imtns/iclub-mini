<template>
  <div class="container">
    <ik-custom-header :transparent="transparent" theme="light" @back="handleBack">
      <view slot="title" class="title"> 登录 </view>
    </ik-custom-header>
    <x-loading v-if="loading" background="white" />
    <loginform :invite="inviteCode" :code="loginCode" :attrs="loginFormAttrs">
      <div @click="handleLoginClick">
        <button class="wx-btn" :disabled="loading" :open-type="isAgreePrivacy ? 'getPhoneNumber' : ''" @getphonenumber="handleGetPhoneNumber">一键登录</button>
      </div>
    </loginform>
    <x-toast ref="toast" />
  </div>
</template>

<script>
// 导入模块
import { getCurrentAppId } from '@/utils'
import { EVENT_ID_ELEMENT_CLICK } from '@/mixin/config'
import report from '@/utils/report/report'
import { getActivePage } from '@/utils/report/helper'
import { xlogin, setEncryptKey, userRegister } from '@/http/wx'
import { ls, lsGet, lsDel } from '@/utils/util'
import { mapActions, mapState } from 'vuex'
import { getEncryptData } from '@/utils/tools'
import { TASK_DICT } from '@/dict'
const { env } = require('@/http/env')

// 常量定义（抽离到顶部，便于维护）
const STORAGE_KEYS = {
  USER_TOKEN: 'iclubUserToken3',
  OPEN_ID: 'openId',
  UNION_ID: 'unionId',
  RETURN_URL: 'returnUrl',
  NEW_USER_FLAG: 'newUserFlag',
  REPLACE_SIGN_RESULT: 'replaceSignResult',
  ENCRYPT_KEY: 'encryptKey',
  ENCRYPT_IV: 'encryptIV',
  ENCRYPT_VERSION: 'encryptVersion'
}

const API_HEADER = {
  businessApp: 'iclub',
  businessSys: 'iclub',
  envVersion: env === 'prod' ? 'production' : 'test'
}

const REPORT_EVENT_ID = {
  LOGIN_SUCCESS: 2
}

export default {
  name: 'LoginPage', // 添加组件名，便于调试
  data() {
    return {
      isPhoneLoginOpen: false,
      loading: false,
      loginPlugin: requirePlugin('myPlugin'),
      inviteCode: '', // 重命名：更语义化
      isAgreePrivacy: false, // 重命名：更语义化
      loginCode: '', // 重命名：更语义化
      loginFormAttrs: {}, // 重命名：更语义化
      header: API_HEADER
    }
  },

  async onLoad() {
    try {
      // 初始化数据
      this.inviteCode = getApp()?.globalData?.inviteCode || ''
      await this.fetchLoginCode() // 重命名：动词+名词 规范
      this.initLoginFormAttrs() // 重命名：更语义化

      // 隐藏分享菜单
      wx.hideShareMenu({})

      // 初始化事件监听
      this.initPluginEventListeners()
    } catch (error) {
      console.error('页面初始化失败:', error)
      this.$refs.toast?.show({ title: '登录初始化失败，请重试' })
    }
  },

  onUnload() {
    // 移除所有事件监听
    this.removePluginEventListeners()
    // 清理存储
    lsDel(STORAGE_KEYS.RETURN_URL)
  },

  computed: {
    ...mapState(['inviteInfo'])
  },

  mounted() {
    // 重置全局登录状态
    getApp().globalData.logining = false
  },

  methods: {
    ...mapActions(['setIntegral']),

    /**
     * 初始化插件事件监听
     */
    initPluginEventListeners() {
      const { emitter } = this.loginPlugin

      // 使用箭头函数，避免this指向问题
      emitter.on('choosePrivacy', (data) => {
        this.isAgreePrivacy = data
      })

      emitter.on('noLogin', () => {
        console.log('用户点击了暂不登录')
        emitter.off('noLogin') // 及时移除，防止内存泄漏
        uni.navigateBack()
      })

      emitter.on('handleLoginData', (res) => {
        console.log('手机号登录成功')
        this.handleLoginSuccess(res) // 重命名：更语义化
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
     * 处理返回逻辑
     */
    handleBack() {
      uni.navigateBack()
    },

    /**
     * 初始化登录表单属性
     */
    initLoginFormAttrs() {
      this.loginFormAttrs = {
        logo: 'https://udstatic.imeik.com/pcUploads/1711074121845/iclub-logo.png',
        text: 'IMEIK爱+',
        ...API_HEADER
      }
    },

    /**
     * 生成埋点会话ID
     */
    generatePageSessionId() {
      return Math.random().toString(16).substring(2) + new Date().getTime()
    },

    /**
     * 登录成功处理逻辑
     * @param {Object} res - 登录成功返回数据
     */
    async handleLoginSuccess(res) {
      const { token, openId, unionId } = res
      console.log('登录成功，已获取token', token)

      // 存储用户信息
      ls(STORAGE_KEYS.USER_TOKEN, token || '')
      ls(STORAGE_KEYS.OPEN_ID, openId)
      ls(STORAGE_KEYS.UNION_ID, unionId)

      try {
        // 1. 上报登录成功埋点
        this.reportLoginEvent({
          eventId: REPORT_EVENT_ID.LOGIN_SUCCESS,
          activityName: '登录成功',
          activityContent: JSON.stringify({ token, openId })
        })

        // 2. 处理邀请码信息
        const inviteData = {
          inviteCode: getApp()?.globalData?.inviteCode || this.inviteInfo.inviteCode || '',
          inviteSource: getApp()?.globalData?.inviteSource || this.inviteInfo.inviteSource || '',
          shareLinkTime: getApp()?.globalData?.shareLinkTime || this.inviteInfo.shareLinkTime || ''
        }

        // 3. 上报注册前埋点
        this.reportLoginEvent({
          eventId: REPORT_EVENT_ID.LOGIN_SUCCESS,
          activityName: '登录成功注册爱+前',
          activityContent: JSON.stringify({ ...inviteData, token })
        })

        // 4. 用户注册
        const registerResult = await userRegister(inviteData)
        this.$store.commit('setIsLogin', true)

        // 5. 存储注册结果
        ls(STORAGE_KEYS.NEW_USER_FLAG, registerResult.newUserFlag === '1')
        ls(STORAGE_KEYS.REPLACE_SIGN_RESULT, registerResult.replaceSignResult || '')

        // 6. 上报注册后埋点
        this.reportLoginEvent({
          eventId: REPORT_EVENT_ID.LOGIN_SUCCESS,
          activityName: '登录成功注册爱+后',
          activityContent: JSON.stringify({ ...inviteData, token })
        })

        // 7. 获取并设置加密信息
        await this.handleEncryptData()

        // 8. 获取用户信息
        const userInfo = await this.$store.dispatch('getUserInfo')
        console.log('🚀 ~ login-------userInfo:', userInfo)

        // 9. 上报获取用户信息埋点
        this.reportLoginEvent({
          eventId: REPORT_EVENT_ID.LOGIN_SUCCESS,
          activityName: '登录后获取用户信息',
          activityContent: JSON.stringify({ userInfo })
        })

        // 10. 登录加积分
        if (userInfo?.objectCode) {
          await this.setIntegral({
            changeSource: TASK_DICT.DENG_LU,
            objectCode: userInfo.objectCode
          })
        }

        // 11. 页面跳转逻辑
        this.handlePageRedirect()
      } catch (err) {
        console.error('登录后续处理异常', err)
        this.reportLoginEvent({
          eventId: REPORT_EVENT_ID.LOGIN_SUCCESS,
          activityName: '登录异常',
          activityContent: `登录异常::${err.message}`
        })
        this.$refs.toast?.show({ title: '登录失败，请重试' })
      } finally {
        this.loading = false
      }
    },

    /**
     * 处理加密数据逻辑
     */
    async handleEncryptData() {
      try {
        const { encryptKey, iv: encryptIV, version } = await getEncryptData()

        // 上报获取加密串埋点
        this.reportLoginEvent({
          eventId: REPORT_EVENT_ID.LOGIN_SUCCESS,
          activityName: '注册成功后获取腾讯加密串',
          activityContent: JSON.stringify({ encryptKey, encryptIV, version })
        })

        // 设置加密密钥
        await setEncryptKey({
          businessSys: 'iclub',
          iv: encryptIV,
          version
        })

        // 存储加密信息
        ls(STORAGE_KEYS.ENCRYPT_KEY, encryptKey)
        ls(STORAGE_KEYS.ENCRYPT_IV, encryptIV)
        ls(STORAGE_KEYS.ENCRYPT_VERSION, version)

        // 上报设置加密串埋点
        this.reportLoginEvent({
          eventId: REPORT_EVENT_ID.LOGIN_SUCCESS,
          activityName: '注册成功后设置腾讯加密串',
          activityContent: JSON.stringify({ encryptKey, encryptIV, version })
        })
      } catch (error) {
        console.error('处理加密数据失败:', error)
        throw error
      }
    },

    /**
     * 处理页面跳转
     */
    handlePageRedirect() {
      const returnUrl = lsGet(STORAGE_KEYS.RETURN_URL)

      this.$nextTick(() => {
        if (returnUrl) {
          uni.redirectTo({
            url: returnUrl,
            success: () => {
              lsDel(STORAGE_KEYS.RETURN_URL)
            },
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
     * 获取登录Code
     * @returns {Promise<string>} 登录Code
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

      // 重试逻辑
      while (retryCount <= maxRetries) {
        try {
          return await tryGetCode.call(this) // 绑定this
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
     * 通用埋点上报方法
     * @param {Object} data - 埋点数据
     */
    reportLoginEvent(data) {
      const curPage = getActivePage() || {}

      report({
        eventId: data.eventId,
        pageUrl: 'pages-sub/loing/index',
        referrerUrl: curPage.route || '',
        dataKeys: {
          pageSession: this.generatePageSessionId(),
          ...data
        }
      })
    },

    /**
     * 处理获取手机号
     * @param {Object} param0 - 事件参数
     */
    async handleGetPhoneNumber({ detail }) {
      // 用户拒绝授权
      if (detail.errMsg !== 'getPhoneNumber:ok') {
        this.reportLoginEvent({
          eventId: EVENT_ID_ELEMENT_CLICK,
          activityName: '取消',
          actionRank: 5,
          activityId: 'p005_phone_cannel'
        })
        return
      }

      // 用户允许授权
      const { iv, encryptedData } = detail
      this.reportLoginEvent({
        eventId: EVENT_ID_ELEMENT_CLICK,
        activityName: '允许',
        actionRank: 6,
        activityId: 'p005_phone_permit'
      })

      // 执行登录
      await this.wechatLogin({ iv, encryptedData })
    },

    /**
     * 处理登录按钮点击
     */
    handleLoginClick() {
      this.reportLoginEvent({
        eventId: EVENT_ID_ELEMENT_CLICK,
        activityName: '微信授权',
        actionRank: 2,
        activityId: 'p005_register_yes'
      })
    },

    /**
     * 微信登录核心逻辑
     * @param {Object} params - 登录参数
     */
    async wechatLogin({ encryptedData, iv }) {
      this.loading = true

      try {
        const loginParams = {
          encryptedData,
          appId: getCurrentAppId(),
          invite: this.inviteCode || this.inviteInfo.inviteCode || '',
          code: this.loginCode,
          iv,
          registerChannel: ''
        }

        let loginResult
        // 开发环境和生产环境区分
        if (process.env.NODE_ENV === 'development') {
          loginResult = await xlogin(loginParams)
        } else {
          loginResult = await this.loginPlugin.wxLogin(loginParams, API_HEADER)
        }

        // 登录成功处理
        await this.handleLoginSuccess(loginResult)
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
    border: none; /* 移除默认边框 */
    border-radius: 16rpx;

    .btn-img {
      z-index: 10;
      width: 32rpx;
      height: 32rpx;
      margin-right: 8rpx;
    }

    // 禁用状态样式
    &[disabled] {
      background: rgb(5, 188, 36, 60%);
    }
  }

  .title {
    font-weight: 600;
    font-size: 32rpx;
  }
}
</style>
