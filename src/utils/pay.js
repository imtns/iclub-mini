import { apiPay, apiGetPayResult } from '@/http/pay'
import { lsGet } from './util'
import { sleep } from './tools'

export async function requestPayment({
  price = 1, // 单位：分
  businessType = 1,
  quantity = 1
}) {
  try {
    wx.showLoading({
      title: '加载中...'
    })

    const { data } = await apiPay({
      quantity, // 测试用的字段，测试环境支付1分钱，但是需记录实际支付嗨币
      openid: lsGet('openId'),
      body: '爱+嗨币支付',
      totalFee: Math.round(price * 100),
      spbillCreateIp: '',
      businessType,
      contentCode: '',
      deviceInfo: uni.getSystemInfoAsync().model
    })

    const res = await new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.packageValue,
        signType: data.signType,
        paySign: data.paySign,
        success: resolve,
        fail: reject
      })
    })

    if (res.errMsg !== 'requestPayment:ok') {
      throw new Error({ message: '支付失败' })
    }
    console.log('支付成功==', res)
    const pollPaymentStatus = async () => {
      const maxAttempts = 10
      let attempts = 0

      while (attempts < maxAttempts) {
        const { data: statusRes } = await apiGetPayResult({ orderCode: data.orderCode })
        const orderStatus = statusRes.orderStatus
        // orderStatus:  1-待付款 、2-支付中、3-已支付、4-已退款、5-已取消
        switch (+orderStatus) {
          case 1:
            throw new Error('订单未支付')
          case 2:
            attempts++
            await sleep(500) // 等500ms重新查询状态
            continue
          case 3:
            return statusRes
          case 4:
            throw new Error('订单已退款')
          case 5:
            throw new Error('订单已取消')
          default:
            throw new Error('未知订单状态')
        }
      }

      throw new Error('支付状态查询超时')
    }

    return await pollPaymentStatus()
  } catch (err) {
    console.error('支付失败', err)
    throw err
  } finally {
    wx.hideLoading()
  }
}
