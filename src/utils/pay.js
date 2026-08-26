import { wxPay } from '@/http/pay'
import { sysInfo } from '@/utils/sysInfo'
import { request2 } from '@/http/request2'
import { lsGet } from '@/utils/util'
const { env } = require('@/http/env')

function getLoginCode() {
  return new Promise((resolve, reject) => {
    uni.login({
      success(data) {
        if (data.errMsg === 'login:ok') {
          resolve(data.code)
        } else {
          reject(data.errMsg)
        }
      },
      fail: (e) => reject(e.errMsg)
    })
  })
}

function cancelOrder(orderCode) {
  return request2({ url: '/iclub-api/api/trade/order/cancel', method: 'post', data: { orderCode, openId: lsGet('openId') } })
}

function pollPayStatus(orderCode) {
  return request2({ url: '/iclub-api/api/trade/order/pay/status', method: 'post', data: { orderCode } })
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForPaySuccess(orderCode, maxAttempts = 20) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(500)
    try {
      const res = await pollPayStatus(orderCode)
      if (res?.data === true) return true
    } catch (e) {
      // 单次轮询失败不中断，继续重试
    }
  }
  return false
}

/**
 * 请求支付
 */
export async function requestPayment(orderCode) {
  const code = await getLoginCode()
  return new Promise((resolve, reject) => {
    console.log('requestPayment 开始，参数订单ID:', orderCode)
    const isDevtools = sysInfo().platform === 'devtools'
    const requestData = {
      orderCode,
      appId: 'wx4cef4e6f8975a519',
      code,
      channelIdentifier: 'iclub-weixin-iclub',
      deviceType: sysInfo().isIOS && !isDevtools ? 2 : 1
    }

    if (typeof wxPay !== 'function') {
      console.error('wxPay 函数未定义')
      wx.hideLoading()
      reject(new Error('wxPay 函数未定义'))
      return
    }

    wxPay(requestData)
      .then((res) => {
        console.log('wxPay 响应:', res)
        if (res.code === 200 && res.data) {
          const payData = res.data
          const _env = (env === 'prod' || sysInfo().isIOS) && !isDevtools ? 0 : 1
          console.log('🚀 ~ requestPayment ~ _env:', _env)
          wx.requestVirtualPayment({
            signData: payData.signData,
            paySig: payData.paySig,
            signature: payData.signature,
            mode: payData.mode,
            env: _env,
            success(wxRes) {
              console.log('微信支付成功:', wxRes)
              // 轮询订单支付状态，确认入账后跳转订单列表
              waitForPaySuccess(orderCode).then((paid) => {
                if (paid) {
                  resolve()
                } else {
                  reject(new Error('支付失败，请稍后重试'))
                }
              })
            },
            fail({ errMsg, errCode }) {
              console.error('微信支付失败:', errCode, errMsg)
              // if (errMsg.includes('cancel')) {
              let message = errMsg.replace('requestVirtualPayment:fail', '')
              if (message.includes('完成充值')) {
                message = 'Apple Store 支付服务繁忙，请稍后重试。'
              }
              cancelOrder(orderCode).finally(() => {
                reject(message)
              })
            }
          })
        } else {
          console.error('wxPay 返回错误:', res)
          reject(new Error(res.message || '支付请求失败'))
        }
      })
      .catch((error) => {
        console.error('wxPay 调用失败:', error)
        reject(error.message)
      })
  })
}
