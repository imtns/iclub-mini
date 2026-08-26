import { request2 } from './request2'

/**
 *  ("1", "嗨小美-联系客服"),
    ("2", "我的-加入社群"),
    ("3", "联系我们-企微客服"),
 */
export const apiGetQr = (data) => {
  return request2({
    url: '/iclub-api/openApi/qrCodeConfig/detailByPosition',
    data
  })
}
