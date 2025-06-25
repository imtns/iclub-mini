import { lsGet } from '@/utils/util'
import { addMessageSubscribe } from '@/http/wx'
export const subscribeMessage = async (templateId) => {
  return new Promise((resolve) => {
    wx.requestSubscribeMessage({
      tmplIds: [templateId],
      success: (res) => {
        addMessageSubscribe({
          openId: lsGet('openId'),
          templateId: templateId
        })
        console.error('res', res)
      },

      complete: async () => {
        console.log('requestSubscribeMessage-complete')
        resolve()
      }
    })
  })
}
