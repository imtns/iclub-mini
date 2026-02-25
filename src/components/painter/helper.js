// 是否是数字
export function isNumber(value) {
  return /^-?\d+(\.\d+)?$/.test(value)
}

// 转换单位
export function toPx(value, baseSize, isDecimal = false) {
  // 如果是数字
  if (typeof value === 'number') {
    return value
  }

  // 如果是字符串数字
  if (isNumber(value)) {
    return value * 1
  }

  // 如果有单位
  if (typeof value === 'string') {
    const reg = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|px|%)$/g
    const results = reg.exec(value)

    if (!value || !results) {
      return 0
    }

    const unit = results[3]
    value = parseFloat(value)

    let res = 0
    if (unit === 'rpx') {
      res = uni.upx2px(value)
    } else if (unit === 'px') {
      res = value
    } else if (unit === '%') {
      res = (value * toPx(baseSize)) / 100
    } else if (unit === 'em') {
      res = value * toPx(baseSize || 14)
    }

    return isDecimal ? res.toFixed(2) * 1 : Math.round(res)
  }

  return 0
}

// 获取文字的开始位置
export function getTextStart(css, view, ctx) {
  let left = toPx(css.left || 0)
  const width = toPx(css.width || '750rpx')
  let metrics = ctx.measureText(view.text).width
  const fillW = ctx.measureText('...').width
  // 超过部分...
  if (metrics > width) {
    const rate = (metrics + fillW) / width // 百分比
    const arr = view.text.split('')
    arr.length = Math.floor(arr.length / rate)
    view.text = arr.join('') + '...'
    metrics = ctx.measureText(view.text).width
  }
  switch (css.textAlign) {
    case 'center':
      left = left + (width - metrics) / 2
      break
    case 'right':
      left = left + (width - metrics)
      break
    case 'left':
      left = left
  }
  return left
}

// 获取文字的开始位置 - 一行多个text
export function getMultiTextStart(css, views, ctx) {
  let left = toPx(css.left || 0)
  const width = toPx(css.width || '750rpx')
  const metrics = views.map(i => ctx.measureText(i.text).width)
  const totalWidth = metrics.reduce((prev, cur)=> {
    return prev + cur
  }, 0)

  // TODO 暂时不考虑超过部分...
  const result = []
  let start = left
  switch (css.textAlign) {
    case 'center':
      start = left + (width - totalWidth) / 2
      break
    case 'right':
      start = left + (width - totalWidth)
      break
    case 'left':
      start = left
  }

  for(let i = 0; i < metrics.length; i++) {
    const arr = [].concat(metrics)
    arr.length = i
    result.push(start + arr.reduce((prev, cur)=> {
      return prev + cur
    }, 0))
  }

  return result
}

/**
 * 计算图片裁剪或者摆放位置
 * @param {*} type  contain, cover 暂时只兼容这两个模式
 * @param {*} containerWidth  容器宽度
 * @param {*} containerHeight  容器高度
 * @param {*} imgWidth   图片宽度
 * @param {*} imgHeight  图片高度
 * @return {*} canvas drawImage的所有入参
 */
export function getObjectFitSize(type = 'cover', containerWidth, containerHeight, imgWidth, imgHeight) {
  let radio = 1, // 容器与图片的比例
    sx = 0, // 开始剪切的 x 坐标位置
    sy = 0, // 开始剪切的 y 坐标位置
    swidth = imgWidth, // 被剪切图像的宽度
    sheight = imgHeight, // 被剪切图像的高度
    x = 0, // 在画布上放置图像的 x 坐标位置
    y = 0, // 在画布上放置图像的 y 坐标位置
    width = containerWidth, // 要使用的图像的宽度（伸展或缩小图像）
    height = containerHeight // 要使用的图像的高度（伸展或缩小图像）
  let cWHRatio = containerWidth / containerHeight
  let iWHRatio = imgWidth / imgHeight

  if (type === 'cover') {
    // cover模式，需要裁剪
    if (iWHRatio >= cWHRatio) {
      // 横图，高先匹配，裁剪宽度
      radio = containerHeight / imgHeight
      sx = (imgWidth - containerWidth / radio) / 2
      swidth = containerWidth / radio
      sheight = imgHeight
    } else {
      // 竖图，宽先匹配，裁剪高度
      radio = containerWidth / imgWidth
      sy = (imgHeight - containerHeight / radio) / 2
      swidth = imgWidth
      sheight = containerHeight / radio
    }
  } else if (type === 'contain') {
    if (iWHRatio >= cWHRatio) {
      // 横图，宽先匹配，高度自适应
      radio = containerWidth / imgWidth
      y = (containerHeight - imgHeight * radio) / 2
      height = imgHeight * radio
    } else {
      // 竖图，高先匹配，宽度自适应
      radio = containerHeight / imgHeight
      x = (containerWidth - imgWidth * radio) / 2
      width = imgWidth * radio
    }
  }

  return { sx, sy, swidth, sheight, x, y, width, height }
}
