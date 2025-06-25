/** 请求地址授权，获取地址信息 */

import { getLocationByCoords, saveUserLocation } from '@/http/wx'
import { lsGet, ls } from '@/utils/util'
export default {
  /**
   *
   * @param {*} openSetting 拒绝授权后是否弹出再次获取弹窗
   * @returns 百度地理位置信息
   */
  authorization(openSetting = true, isResolve, remark) {
    const locationFlag = wx.getStorageSync('locationFlag')
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.userLocation',
        success: () => {
          console.log('获取授权成功')
          uni.showLoading({
            title: '定位中...'
          })
          wx.getLocation({
            success: async (res) => {
              console.log('获取当前初始位置成功', res)
              uni.hideLoading()
              try {
                saveUserLocation({
                  lat: res.latitude,
                  lng: res.longitude,
                  openId: lsGet('openId'),
                  remark,
                  userCode: lsGet('userInfo')?.objectCode
                })

                const info = await this.loadCity(res)
                ls('location', {
                  lat: res.latitude,
                  lng: res.longitude,
                  ...info
                })
                isResolve?.(info) || resolve(info)
              } catch (e) {
                reject()
              }
            },
            fail: (err) => {
              console.log('获取当前初始位置失败', err)
              uni.hideLoading()
              reject()
            }
          })
        },
        fail: (err) => {
          console.log('获取授权失败', err)
          wx.setStorageSync('locationFlag', 1)
          if (openSetting && +locationFlag === 1) {
            this.handleOpenSetting(resolve)
          } else {
            reject()
          }
        }
      })
    })
  },
  async loadCity({ longitude, latitude }) {
    return new Promise((resolve) => {
      getLocationByCoords({ lng: longitude, lat: latitude })
        .then((result) => {
          const cityName = result.data.cityName.replace('城区', '市')
          resolve(Object.assign(result.data, { cityName }))
        })
        .catch(() => {
          reject({
            provinceCode: 110000,
            cityCode: 110100,
            areaCode: 110101,
            province: '北京市',
            city: '北京市',
            area: '东城区'
          })
        })
    })
  },
  // 用户授权定位
  handleOpenSetting(callback) {
    uni.showModal({
      title: '温馨提示',
      content: '获取权限失败，需要获取您的地理位置才能为您提供更好的服务！是否授权获取地理位置？',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userLocation']) {
                // 用户同意授权
                console.log('用户同意授权')
                this.authorization(false, callback)
              } else {
                callback()
              }
            }
          })
        } else {
          callback()
        }
      }
    })
  }
}
