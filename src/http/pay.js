import { request2 } from './request2'

/**
 * 微信支付
 * /pay-api/pay/wxPay
 * channelIdentifier: 渠道标识
 * openId: 微信openId
 * orderCode: 订单号
 */
export function wxPay(data) {
  return request2({
    url: '/pay-api/pay/wxPay2',
    method: 'post',
    data
  })
}
