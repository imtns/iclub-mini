/**
 * 调用微信原生地址选择，返回标准化地址对象
 * @returns {Promise<{receiverName:string, phone:string, provinceName:string, cityName:string, areaName:string, detailAddress:string, addressCode:string}>}
 */
export function chooseWxAddress() {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success(res) {
        resolve({
          receiverName: res.userName || '',
          phone: res.telNumber || '',
          provinceName: res.provinceName || '',
          cityName: res.cityName || '',
          areaName: res.countyName || '',
          detailAddress: res.detailInfo || '',
          addressCode: ''
        })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
