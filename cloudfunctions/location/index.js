const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const axios = require('axios')
exports.main = async () => {
  const wxContext = cloud.getWXContext()
  const res = await axios.get('https://apis.map.qq.com/ws/location/v1/ip', {
    params: {
      ip: wxContext.CLIENTIP ? wxContext.CLIENTIP : wxContext.CLIENTIPV6,
      key: 'SE6BZ-Y3SKZ-FPFXW-ZK5XR-334UF-ZWFWD' // 使用腾讯WebService API：https://lbs.qq.com/service/webService/webServiceGuide/webServiceIp
    }
  })
  return res.data
}
