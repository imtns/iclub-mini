/* eslint-disable no-loss-of-precision */
/**
 *  判断经纬度是否超出中国境内
 */
function isLocationOutOfChina(latitude, longitude) {
  if (longitude < 72.004 || longitude > 137.8347 || latitude < 0.8293 || latitude > 55.8271) {
    return true
  }
  return false
}

/**
 *  将WGS-84(国际标准)转为GCJ-02(火星坐标):
 */
function transformFromWGSToGCJ(latitude, longitude) {
  console.log(latitude, longitude)

  const ee = 0.00669342162296594323
  const a = 6378245.0
  const pi = 3.14159265358979324

  if (!isLocationOutOfChina(latitude, longitude)) {
    let adjustLat = transformLatWithXY(longitude - 105.0, latitude - 35.0)
    let adjustLon = transformLonWithXY(longitude - 105.0, latitude - 35.0)
    const radLat = (latitude / 180.0) * pi
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    adjustLat = (adjustLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi)
    adjustLon = (adjustLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi)
    latitude = latitude + adjustLat
    longitude = longitude + adjustLon
  }

  return { latitude: latitude, longitude: longitude }
}

/**
 *  将GCJ-02(火星坐标)转为百度坐标:
 */
function transformFromGCJToBaidu(latitude, longitude) {
  const pi = (3.14159265358979324 * 3000.0) / 180.0

  const z = Math.sqrt(longitude * longitude + latitude * latitude) + 0.00002 * Math.sin(latitude * pi)
  const theta = Math.atan2(latitude, longitude) + 0.000003 * Math.cos(longitude * pi)
  const a_latitude = z * Math.sin(theta) + 0.006
  const a_longitude = z * Math.cos(theta) + 0.0065

  return { latitude: a_latitude, longitude: a_longitude }
}

/**
 *  将百度坐标转为GCJ-02(火星坐标):
 */
function transformFromBaiduToGCJ(latitude, longitude) {
  const xPi = (3.14159265358979323846264338327950288 * 3000.0) / 180.0

  const x = longitude - 0.0065
  const y = latitude - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPi)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPi)
  const a_latitude = z * Math.sin(theta)
  const a_longitude = z * Math.cos(theta)

  return { latitude: a_latitude, longitude: a_longitude }
}

/**
 *  将GCJ-02(火星坐标)转为WGS-84:
 */
function transformFromGCJToWGS(latitude, longitude) {
  const threshold = 0.00001

  // The boundary
  let minLat = latitude - 0.5
  let maxLat = latitude + 0.5
  let minLng = longitude - 0.5
  let maxLng = longitude + 0.5

  let delta = 1
  let maxIteration = 30

  while (true) {
    const leftBottom = transformFromWGSToGCJ(minLat, minLng)
    const rightBottom = transformFromWGSToGCJ(minLat, maxLng)
    const leftUp = transformFromWGSToGCJ(maxLat, minLng)
    const midPoint = transformFromWGSToGCJ((minLat + maxLat) / 2, (minLng + maxLng) / 2)
    delta = Math.abs(midPoint.latitude - latitude) + Math.abs(midPoint.longitude - longitude)

    if (maxIteration-- <= 0 || delta <= threshold) {
      return { latitude: (minLat + maxLat) / 2, longitude: (minLng + maxLng) / 2 }
    }

    if (isContains({ latitude: latitude, longitude: longitude }, leftBottom, midPoint)) {
      maxLat = (minLat + maxLat) / 2
      maxLng = (minLng + maxLng) / 2
    } else if (isContains({ latitude: latitude, longitude: longitude }, rightBottom, midPoint)) {
      maxLat = (minLat + maxLat) / 2
      minLng = (minLng + maxLng) / 2
    } else if (isContains({ latitude: latitude, longitude: longitude }, leftUp, midPoint)) {
      minLat = (minLat + maxLat) / 2
      maxLng = (minLng + maxLng) / 2
    } else {
      minLat = (minLat + maxLat) / 2
      minLng = (minLng + maxLng) / 2
    }
  }
}

function isContains(point, p1, p2) {
  return (
    point.latitude >= Math.min(p1.latitude, p2.latitude) &&
    point.latitude <= Math.max(p1.latitude, p2.latitude) &&
    point.longitude >= Math.min(p1.longitude, p2.longitude) &&
    point.longitude <= Math.max(p1.longitude, p2.longitude)
  )
}

function transformLatWithXY(x, y) {
  const pi = 3.14159265358979324
  let lat = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
  lat += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0
  lat += ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0
  lat += ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) * 2.0) / 3.0
  return lat
}

function transformLonWithXY(x, y) {
  const pi = 3.14159265358979324
  let lon = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  lon += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0
  lon += ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0
  lon += ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) * 2.0) / 3.0
  return lon
}

module.exports = {
  isLocationOutOfChina: isLocationOutOfChina,
  transformFromWGSToGCJ: transformFromWGSToGCJ,
  transformFromGCJToBaidu: transformFromGCJToBaidu,
  transformFromBaiduToGCJ: transformFromBaiduToGCJ,
  transformFromGCJToWGS: transformFromGCJToWGS
}
