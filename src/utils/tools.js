import { SM4Util } from '@/utils/sm4'
import moment from 'dayjs'
function splitOssImageUrl(src) {
  if (!src || !src.includes('?x-oss-process=')) {
    return {
      baseUrl: src,
      processStr: ''
    }
  }
  const [baseUrl, processStr] = src.split('?x-oss-process=')
  return { baseUrl, processStr }
}
export function getOssSrc(src, width = 400, defaultFormat = 'png') {
  if (!src) return src
  const CONSTANTS = {
    DOMAIN_MAP: {
      old: 'imeikud.oss-cn-beijing.aliyuncs.com',
      new: 'udstatic.imeik.com'
    }
  }
  let _src = splitOssImageUrl(src).baseUrl

  if (_src.includes('aliyuncs')) {
    _src = _src.replace('http://', 'https://').replace(CONSTANTS.DOMAIN_MAP.old, CONSTANTS.DOMAIN_MAP.new)
  }
  let format = defaultFormat
  const parts = _src.split('.')
  const fileExtension = parts[parts.length - 1].toLowerCase()

  if (['jpg', 'jpeg'].includes(fileExtension)) {
    format = 'jpg'
  }
  if (uni.$detectWebp) {
    format = 'webp'
  }
  // console.log('🚀 ~ getOssSrc ~ _src:', _src)
  return _src + `?x-oss-process=image/resize,m_mfit,w_${width}/format,${format}`
}
export function addParametersToImageSrc(htmlContent, width = 1500) {
  if (!htmlContent) return ''
  const regex = /<img [^>]*src="([^"]+)"[^>]*>/g
  return htmlContent.replace(regex, (match, src) => {
    const newSrc = getOssSrc(src, width)
    return match.replace(src, newSrc)
  })
}
export function detectWebp() {
  let support = false

  try {
    const _wx$getSystemInfoSync = wx.getSystemInfoSync()
    const platform = _wx$getSystemInfoSync.platform
    const system = _wx$getSystemInfoSync.system

    const versionResult = /[0-9.]*$/.exec(system)
    const systemVersion = versionResult ? versionResult[0] : ''
    const iosSystemSupport = platform === 'ios' && !!systemVersion && compareVersion(systemVersion, '14.0') >= 0

    support = platform === 'devtools' || platform === 'android' || iosSystemSupport
  } catch (e) {
    console.log(e)
  }

  return support
}

export function extractText(htmlString) {
  if (!htmlString) return ''
  const regex = /<[^>]*>|<\/[^>]*>/gm
  const texts = htmlString
    .replace(regex, '')
    .trim()
    .split('\n')
    .filter((text) => text.trim())

  return texts
}

export function throttle(func, delay = 200) {
  let prev = Date.now()
  return function () {
    const context = this
    const args = arguments
    const now = Date.now()
    if (now - prev >= delay) {
      func.apply(context, args)
      prev = Date.now()
    }
  }
}

export function formatNumber(num) {
  if (num === undefined) return 0
  if (num >= 10000) {
    return Math.round(num / 1000) / 10 + 'w'
  }
  return num.toString()
}

export function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
export function isEmpty(value) {
  if (value == null || value === false || (typeof value === 'number' && isNaN(value))) {
    return true
  }
  // 字符串空值（包括 'null'、'undefined'、空白字符串）
  if (typeof value === 'string' && (value.trim() === '' || value.trim().toLowerCase() === 'null' || value.trim().toLowerCase() === 'undefined')) {
    return true
  }

  // 空数组
  if (Array.isArray(value) && value.length === 0) return true

  // 空对象
  if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
    return true
  }

  return false
}

export function getUniqID() {
  const idLength = 20
  const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  const timestamp = +new Date()

  const timestampString = timestamp.toString(36).slice(-5)
  id += timestampString

  for (let i = 0; i < idLength - timestampString.length; i++) {
    const randomIndex = Math.floor(Math.random() * possibleCharacters.length)
    id += possibleCharacters.charAt(randomIndex)
  }

  return id
}
export function objectToKeyValueString(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}
export function redirectLogin() {
  console.log('-------redirect login------')
  if (getApp().globalData.logining) return
  getApp().globalData.logining = true
  wx.navigateTo({
    url: '/pages-sub/login/index'
  })
}

export function copyText(data) {
  uni.setClipboardData({
    data,
    success: function (res) {
      uni.hideLoading()

      uni.showToast({
        title: '复制成功',
        icon: 'none'
      })
    }
  })
}
// 获取备用密钥的函数，带缓存和接口请求

export function getEncryptData() {
  const maxRetries = 3 // 最大重试次数
  let retryCount = 0 // 当前重试次数

  // 定义内部函数用于尝试获取密钥
  const tryGetUserKey = () =>
    new Promise((resolve, reject) => {
      const userCryptoManager = wx.getUserCryptoManager()
      userCryptoManager.getLatestUserKey({
        success: (data) => {
          console.error('🚀 ~ getUserCryptoManager ~ data:', data)
          // 截取前16位作为加密密钥
          data.encryptKey = data.encryptKey?.slice(0, 16)
          // 检查数据是否有效
          if (data.encryptKey && data.iv && data.version) {
            resolve(data) // 成功且数据有效，直接返回
          } else {
            reject(new Error('Tencent API returned invalid data')) // 数据无效，触发重试
          }
        },
        fail: (err) => {
          reject(new Error(`Tencent API failed: ${err.errMsg || err}`)) // 失败，触发重试
        }
      })
    })

  // 主逻辑，包含重试机制
  return new Promise((resolve) => {
    const attempt = async () => {
      try {
        const data = await tryGetUserKey()
        resolve(data) // 成功获取有效数据，结束
      } catch (err) {
        retryCount++
        console.error(`重试 ${retryCount}/${maxRetries} 失败: ${err.message}`)

        if (retryCount < maxRetries) {
          // 延迟后重试
          setTimeout(attempt, 500 * retryCount) // 延迟递增：500ms, 1000ms, 1500ms
        } else {
          // 重试 3 次后仍失败，返回空值
          console.error('Max retries reached, returning empty result')
          resolve({}) // 返回空对象
        }
      }
    }

    attempt() // 启动第一次尝试
  })
}
export function sortObjectKeys(obj) {
  const sortedObj = Array.isArray(obj) ? [] : {}

  Object.keys(obj)
    .sort()
    .forEach(function (key) {
      if (obj[key] !== null && typeof obj[key] === 'object') {
        sortedObj[key] = sortObjectKeys(obj[key])
      } else {
        sortedObj[key] = obj[key]
      }
    })

  return sortedObj
}
export function isNumber(value) {
  return /^-?\d+(\.\d+)?$/.test(value)
}

export const deepClone = (obj) => {
  if (typeof obj !== 'object') return
  const newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      newObj[key] = deepClone(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

export function isInvalid(value) {
  // 统一将值转换为字符串后检查，方便处理 'undefined' 等字符串情况
  if (value === null || value === undefined) {
    return true
  }
  // 检查空字符串、纯空白字符串、'undefined'、'null'
  if (typeof value === 'string') {
    return value.trim() === '' || value === 'undefined' || value === 'null'
  }
  // 其他情况（如数字、布尔值、布尔值等）暂时不视为无效，视需求可扩展
  return false
}

export const getSecurityToken = ({ data, encryptIV, encryptKey }) => {
  return new SM4Util().encryptCustom_CBC(
    JSON.stringify({
      uniqueFlag: getUniqID(),
      callTime: Date.now(),
      paramter: sortObjectKeys(data)
    }),
    encryptIV,
    encryptKey
  )
}

export const formatCommentTime = (time) => {
  const now = moment()
  const target = moment(time)
  const diffSeconds = now.diff(target, 'second')
  const diffMinutes = now.diff(target, 'minute')
  const diffHours = now.diff(target, 'hour')
  const diffDays = now.diff(target, 'day')

  if (diffSeconds < 60) return '刚刚'
  if (diffMinutes < 60) return `${diffMinutes}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (diffDays <= 3) return `${diffDays}天前`

  if (target.isSame(now, 'year')) {
    return target.format('MM-DD HH:mm')
  } else {
    return target.format('YYYY-MM-DD HH:mm')
  }
}

export function compareVersion(_v1, _v2) {
  if (typeof _v1 !== 'string' || typeof _v2 !== 'string') return 0

  const v1 = _v1.split('.')
  const v2 = _v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10)
    const num2 = parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

export function getUID() {
  return new Date().getTime().toString(36) + Math.random().toString(36).substr(2)
}
