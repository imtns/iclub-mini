import { getCurrentAppId } from '@/utils'
import { lsGet } from '@/utils/util'

// 直接在这里获取 token，避免循环依赖

module.exports = {
  request(config) {
    return new Promise((resolve, reject) => {
      let data
      if (config.method.toUpperCase() === 'GET') {
        data = config.params
      }
      if (config.method.toUpperCase() === 'POST') {
        data = config.data
      }
      const token = lsGet('iclubUserToken3')
      // // todo 开发测试使用的token
      // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJleHRlbmQiOiI4ZTQ1MGNjZDhmYTA3MmMzMzBmMjRiZWE1YTYwYmVmODM4NGVmN2M0YTMwY2I3ZTg3OTFlZTYwODkwNzhmYmNkIiwiYWNjZXNzRXhwaXJlVGltZSI6MTc1NDU1Nzk0MzgwNSwic3ViIjoiMTg4MTEzNzcwNzciLCJhdWQiOiJhcGkiLCJhY2NvdW50Q29kZSI6IjE3MjUzOTQ0NTM3NzE3MDIyNzQiLCJjcmVhdGVkIjoxNzU0Mzg1MTQzODA1LCJyZWZyZXNoU3RhcnRUaW1lIjoxNzU0NDcxNTQzODA1fQ.pX-WoyRwVP8uCKa4NxC832Tj-3IRQSOzPWNAfx9V22hg470Q6SKYiZ02N9jeuTuyY-erwR1XrWDTfj6aUbz32w'
      console.log('token:', token)
      // appId比较常用，因此放在这里，所有请求都带上appId
      data.appId = getCurrentAppId()
      uni.request({
        url: config.url, // 需要传进来完整的url，避免不同的地址都在这里处理
        timeout: 60000,
        method: config.method,
        data: data,
        header: {
          'Content-type': 'application/json',
          app: 'VipMall',
          Authorization: token // 需要传进来token
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          console.log('请求失败，请检查网络', err)
          uni.showToast({
            title: '请求失败，请检查网络',
            icon: 'none'
          })
          reject(err)
        }
      })
    })
  }
}
