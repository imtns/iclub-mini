/** 请求地址授权，获取地址信息 */

import { getLocationByCoords, saveUserLocation } from '@/http/wx'
import { lsGet, ls } from '@/utils/util'
import coordsUtils from '@/utils/coords'

// 缓存有效期：1分钟
const LOCATION_CACHE_DURATION = 1 * 60 * 1000

export default {
  /**
   * 获取定位
   * @param {Boolean} openSetting 是否弹出授权设置
   * @param {String} remark 备注
   * @param {String} rejectDesc 提示语
   * @param {Boolean} useCache 是否使用缓存
   */
  authorization(openSetting = true, remark = '', rejectDesc = '', useCache = true) {
    const cachedLocation = lsGet('location')
    const cachedTime = lsGet('locationCacheTime')
    const now = Date.now()

    // 使用缓存
    if (cachedLocation && cachedTime && now - cachedTime < LOCATION_CACHE_DURATION && useCache) {
      console.log('使用缓存位置信息', cachedLocation)

      const openId = lsGet('openId')
      if (openId) {
        saveUserLocation({
          lat: cachedLocation.lat,
          lng: cachedLocation.lng,
          openId,
          remark,
          userCode: lsGet('userInfo')?.objectCode
        })
      }

      return Promise.resolve(cachedLocation)
    }

    return new Promise((resolve, reject) => {
      console.log('请求定位授权[openSetting: %s, remark: %s, rejectDesc: %s]', openSetting, remark, rejectDesc)
      wx.authorize({
        scope: 'scope.userLocation',

        success: () => {
          console.log('定位授权成功')

          uni.showLoading({
            title: '定位中...'
          })

          wx.getLocation({
            type: 'gcj02',
            isHighAccuracy: true,

            success: async (res) => {
              uni.hideLoading()

              try {
                const openId = lsGet('openId')

                // if (!openId) {
                //   throw new Error('未获取到openId')
                // }
                if (openId) {
                  saveUserLocation({
                    lat: res.latitude,
                    lng: res.longitude,
                    openId,
                    remark,
                    userCode: lsGet('userInfo')?.objectCode
                  })
                }
                const info = await this.loadCity(res)

                const locationData = {
                  lat: res.latitude,
                  lng: res.longitude,
                  ...res,
                  ...info
                }

                // 缓存
                ls('location', locationData)
                ls('locationCacheTime', Date.now())

                resolve(locationData)
              } catch (e) {
                console.error('定位失败：', e)
                reject(e)
              }
            },

            fail: (err) => {
              uni.hideLoading()
              console.error('wx.getLocation失败', err)
              reject(err)
            }
          })
        },

        fail: () => {
          console.log('未授权定位')

          if (openSetting) {
            this.handleOpenSetting(remark, rejectDesc).then(resolve).catch(reject)
          } else {
            reject(new Error('用户拒绝定位授权'))
          }
        }
      })
    })
  },

  async loadCity({ longitude, latitude }) {
    return new Promise((resolve) => {
      getLocationByCoords({
        lng: longitude,
        lat: latitude
      })
        .then((result) => {
          const cityName = result.data.cityName.replace('城区', '市')
          resolve({
            ...result.data,
            cityName
          })
        })
        .catch(() => {
          resolve({
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

  /**
   * 打开授权设置
   */
  handleOpenSetting(remark = '', rejectDesc = '') {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title: '温馨提示',
        content: `获取权限失败，需要获取您的地理位置才能为您提供${rejectDesc || '更好的服务'}！是否授权获取地理位置？`,

        success: (res) => {
          if (!res.confirm) {
            reject(new Error('用户取消授权'))
            return
          }

          wx.openSetting({
            success: (settingRes) => {
              if (settingRes.authSetting['scope.userLocation']) {
                console.log('重新授权成功')

                this.authorization(false, remark, rejectDesc, false).then(resolve).catch(reject)
              } else {
                reject(new Error('用户未开启定位权限'))
              }
            },

            fail: (err) => {
              reject(err)
            }
          })
        }
      })
    })
  },

  /**
   * 经纬度转地址
   */
  getAddressByLocation(latitude, longitude) {
    const convertResult = coordsUtils.transformFromWGSToGCJ(latitude, longitude)

    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.map.baidu.com/reverse_geocoding/v3/',
        method: 'GET',

        data: {
          ak: 'KHlEdI8gQK1EOVwRmTlmnbx96tc4r2uA',
          output: 'json',
          coordtype: 'gcj02ll',
          location: `${convertResult.latitude},${convertResult.longitude}`
        },

        success(res) {
          if (res.data.status === 0) {
            const result = res.data.result

            resolve({
              address: result.formatted_address,
              province: result.addressComponent.province,
              city: result.addressComponent.city,
              district: result.addressComponent.district,
              street: result.addressComponent.street,
              streetNumber: result.addressComponent.street_number,
              pois: result.pois || []
            })
          } else {
            reject(new Error(res.data.message))
          }
        },

        fail: reject
      })
    })
  },

  /**
   * 地址转坐标
   */
  getLocationByAddress(address) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.map.baidu.com/geocoding/v3/',
        method: 'GET',

        data: {
          ak: 'KHlEdI8gQK1EOVwRmTlmnbx96tc4r2uA',
          output: 'json',
          address
        },

        success(res) {
          if (res.data.status === 0) {
            const location = res.data.result.location

            const converted = coordsUtils.transformFromBaiduToGCJ(location.lat, location.lng)

            resolve({
              latitude: converted.latitude,
              longitude: converted.longitude,
              bdLatitude: location.lat,
              bdLongitude: location.lng,
              confidence: res.data.result.confidence,
              level: res.data.result.level
            })
          } else {
            reject(new Error(res.data.message))
          }
        },

        fail: reject
      })
    })
  },

  clearLocationCache() {
    ls('location', null)
    ls('locationCacheTime', null)
  }
}
