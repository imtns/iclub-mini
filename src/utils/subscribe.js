import { lsGet } from '@/utils/util'
import { addMessageSubscribe } from '@/http/wx'
export const subscribeMessage = async (templateId) => {
  return new Promise((resolve) => {
    const tmplIds = Array.isArray(templateId) ? templateId : [templateId]
    console.log('🚀 ~ subscribeMessage ~ tmplIds:', tmplIds)
    wx.requestSubscribeMessage({
      tmplIds,
      success: (res) => {
        const openId = lsGet('openId')
        console.log('🚀 ~ openId ~ res:', openId)
        const acceptedTemplateIds = Object.keys(res).filter((key) => res[key] === 'accept' && key !== 'errMsg')
        console.log('🚀 ~ subscribeMessage ~ acceptedTemplateIds:1', acceptedTemplateIds)

        if (openId && acceptedTemplateIds.length) {
          addMessageSubscribe({
            openId,
            templateIdList: acceptedTemplateIds
          })
          console.error('res', res)
        }
      },
      fail(err) {
        console.error('requestSubscribeMessage-fail', err)
        resolve()
      },
      complete() {
        console.log('requestSubscribeMessage-complete')
        resolve()
      }
    })
  })
}
