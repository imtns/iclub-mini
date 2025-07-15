export function isPromise(val) {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch)
}
export function isImageFile(item) {
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
  function isImageUrl(url) {
    return IMAGE_REGEXP.test(url)
  }
  if (item.isImage != null) {
    return item.isImage
  }
  if (item.type) {
    return item.type === 'image'
  }
  if (item.url) {
    return isImageUrl(item.url)
  }
  return false
}
export function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}
export function pickExclude(obj, keys) {
  if (!isPlainObject(obj)) {
    return {}
  }
  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key]
    }
    return prev
  }, {})
}
export function formatImage(res) {
  function getName(tempFilePath) {
    const parts = tempFilePath.split('/')
    const fileName = parts[parts.length - 1]
    const filename = fileName.split('.')[0]
    return filename
  }

  return res.tempFiles.map((item) =>
    Object.assign(Object.assign({}, pickExclude(item, ['tempFilePath'])), { type: 'image', url: item.tempFilePath, thumb: item.tempFilePath, name: getName(item.tempFilePath) })
  )
}
export function chooseFile(multiple, capture, sizeType, maxCount) {
  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      mediaType: ['image'],
      count: multiple ? Math.min(maxCount, 20) : 1,
      sourceType: capture,
      sizeType,
      success: (res) => resolve(formatImage(res)),
      fail: reject
    })
  })
}
