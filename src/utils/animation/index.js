/* eslint-disable */

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.calcEnhanceRect = calcEnhanceRect
exports.calcFaceRect = calcFaceRect
exports.createApp = createApp
exports.cropImage = cropImage
exports.drawJawline = drawJawline
exports.extendLine = extendLine
exports.extendPoints = extendPoints
exports.getRatio = getRatio
exports.localFileToBase64 = localFileToBase64
exports.setDataFromResponse = setDataFromResponse
var _createForOfIteratorHelper2 = require('./@babel/runtime/helpers/createForOfIteratorHelper')
require('./@babel/runtime/helpers/Objectvalues')
var _regeneratorRuntime2 = require('./@babel/runtime/helpers/regeneratorRuntime')
var _slicedToArray2 = require('./@babel/runtime/helpers/slicedToArray')
var _asyncToGenerator2 = require('./@babel/runtime/helpers/asyncToGenerator')
var _objectSpread2 = require('./@babel/runtime/helpers/objectSpread2')
var _const = require('./const')
var _milimu = require('./milimu')
var app = getApp()
function calcEnhanceRect(p, enhanced_bw_info) {
  
  return {
    x: (p.x - enhanced_bw_info.enhanced_bw_rect.left) * enhanced_bw_info.ratio,
    y: (p.y - enhanced_bw_info.enhanced_bw_rect.top) * enhanced_bw_info.ratio,
    width: p.width * enhanced_bw_info.ratio,
    height: p.height * enhanced_bw_info.ratio
  }
}
function calcFaceRect(denselandmark, enhanced_bw_info) {
  var headRect = _objectSpread2(
    _objectSpread2({}, denselandmark.face.face_hairline_95),
    {},
    {
      width: Math.abs(denselandmark.face.face_hairline_23.x - denselandmark.face.face_hairline_95.x),
      height: Math.abs(denselandmark.nose.nose_midline_0.y - denselandmark.face.face_hairline_95.y)
    }
  )
  headRect.y -= headRect.height / 2
  var noseRect = _objectSpread2(
    _objectSpread2({}, denselandmark.nose.nose_midline_0),
    {},
    {
      width: 0,
      height: Math.abs(denselandmark.nose.nose_midline_0.y - denselandmark.nose.nose_midline_59.y)
    }
  )
  noseRect.width = noseRect.height
  noseRect.x = noseRect.x - noseRect.width / 2
  var leftFaceRect = {
    x: denselandmark.face.face_contour_left_39.x,
    y: denselandmark.nose.nose_midline_20.y,
    width: denselandmark.nose.nose_midline_20.x - denselandmark.face.face_contour_left_39.x,
    height: denselandmark.face.face_contour_left_39.y - denselandmark.nose.nose_midline_20.y
  }
  var rightFaceRect = {
    x: denselandmark.nose.nose_midline_20.x,
    y: denselandmark.nose.nose_midline_20.y,
    width: denselandmark.face.face_contour_right_39.x - denselandmark.nose.nose_midline_20.x,
    height: denselandmark.face.face_contour_right_39.y - denselandmark.nose.nose_midline_20.y
  }
  var scale = 3
  var leftEyeRect = {
    x: Math.min(denselandmark.left_eye.left_eye_0.x, denselandmark.left_eye.left_eye_31.x),
    y: Math.min(denselandmark.left_eye.left_eye_0.y, denselandmark.left_eye.left_eye_31.y) + Math.abs(denselandmark.left_eye.left_eye_0.y - denselandmark.left_eye.left_eye_31.y) / 2,
    width: Math.abs(denselandmark.left_eye.left_eye_31.x - denselandmark.left_eye.left_eye_0.x),
    height: 0
  }
  leftEyeRect.x = leftEyeRect.x - (leftEyeRect.width * scale - leftEyeRect.width) / 2
  leftEyeRect.width *= scale
  leftEyeRect.height = leftEyeRect.width
  leftEyeRect.y -= leftEyeRect.height / 2
  var rightEyeRect = {
    x: Math.min(denselandmark.right_eye.right_eye_0.x, denselandmark.right_eye.right_eye_31.x),
    y: Math.min(denselandmark.right_eye.right_eye_0.y, denselandmark.right_eye.right_eye_31.y) + Math.abs(denselandmark.right_eye.right_eye_31.y - denselandmark.right_eye.right_eye_0.y) / 2,
    width: Math.abs(denselandmark.right_eye.right_eye_0.x - denselandmark.right_eye.right_eye_31.x),
    height: 0
  }
  rightEyeRect.x = rightEyeRect.x - (rightEyeRect.width * scale - rightEyeRect.width) / 2
  rightEyeRect.width *= scale
  rightEyeRect.height = rightEyeRect.width
  rightEyeRect.y -= rightEyeRect.height / 2
  return {
    head: calcEnhanceRect(headRect, enhanced_bw_info),
    nose: calcEnhanceRect(noseRect, enhanced_bw_info),
    leftFace: calcEnhanceRect(leftFaceRect, enhanced_bw_info),
    rightFace: calcEnhanceRect(rightFaceRect, enhanced_bw_info),
    leftEye: calcEnhanceRect(leftEyeRect, enhanced_bw_info),
    rightEye: calcEnhanceRect(rightEyeRect, enhanced_bw_info)
  }
}
function saveBase64Image(name, base64) {
  if (app.globalData.faceMaps[name]) {
    removeImage(name)
  }
  var imgPath = wx.env.USER_DATA_PATH + '/e-invoice' + name + '.png'
  var imageData = base64.replace(/^data:image\/\w+;base64,/, '')
  var fs = wx.getFileSystemManager()
  fs.writeFileSync(imgPath, imageData, 'base64')
  app.globalData.faceMaps[name] = imgPath
  fs.closeSync({
    fd: fs.openSync({
      filePath: imgPath
    })
  })
}

function removeImage(name) {
  var fs = wx.getFileSystemManager()
  var files = Object.values(app.globalData.faceMaps)
  if (name) {
    files = [app.globalData.faceMaps[name]]
  }
  if (!files.length) {
    return
  }
  var _iterator = _createForOfIteratorHelper2(files)
  var _step
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var filename = _step.value
      fs.unlinkSync(filename)
    }
  } catch (err) {
    console.log('CatchClause', err)
    console.log('CatchClause', err)
    _iterator.e(err)
  } finally {
    _iterator.f()
  }
}
function setDataFromResponse(_x, _x2, _x3) {
  return _setDataFromResponse.apply(this, arguments)
}
function _setDataFromResponse() {
  _setDataFromResponse = _asyncToGenerator2(
    /* */ _regeneratorRuntime2().mark(function _callee(res, originImage, images) {
      var faces
      var _res$skinAnalyzeAPIPa
      var face_rectangle
      var skinResult
      var left_side_result
      var right_side_result
      var _res$facialFeaturesAP
      var facialResult
      var denselandmark
      var headpose
      var _left_side_result$lef
      var left_jawline_mark
      var left_jawline_angle
      var left_jawline_angle_level
      var left_jawline_quality
      var _right_side_result$ri
      var right_jawline_mark
      var right_jawline_angle
      var right_jawline_angle_level
      var right_jawline_quality
      var data
      var intersectionLeft
      var intersectionRight
      var name
      var image
      return _regeneratorRuntime2().wrap(
        function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                console.log('_setDataFromResponse', _const)
                faces = res[_const.detectAPIPath].faces
                _res$skinAnalyzeAPIPa = res[_const.skinAnalyzeAPIPath]
                face_rectangle = _res$skinAnalyzeAPIPa.face_rectangle
                skinResult = _res$skinAnalyzeAPIPa.result
                left_side_result = _res$skinAnalyzeAPIPa.left_side_result
                right_side_result = _res$skinAnalyzeAPIPa.right_side_result
                _res$facialFeaturesAP = res[_const.facialFeaturesAPIPath]
                facialResult = _res$facialFeaturesAP.result
                denselandmark = _res$facialFeaturesAP.denselandmark
                headpose = _res$facialFeaturesAP.headpose
                _left_side_result$lef = left_side_result.left_jawline_info
                left_jawline_mark = _left_side_result$lef.left_jawline_mark
                left_jawline_angle = _left_side_result$lef.left_jawline_angle
                left_jawline_angle_level = _left_side_result$lef.left_jawline_angle_level
                left_jawline_quality = _left_side_result$lef.left_jawline_quality
                _right_side_result$ri = right_side_result.right_jawline_info
                right_jawline_mark = _right_side_result$ri.right_jawline_mark
                right_jawline_angle = _right_side_result$ri.right_jawline_angle
                right_jawline_angle_level = _right_side_result$ri.right_jawline_angle_level
                right_jawline_quality = _right_side_result$ri.right_jawline_quality
                data = {
                  beauty_score: Math.round(
                    Object.values(faces[0].attributes.beauty).reduce(function (prev, curr) {
                      return curr + prev
                    }, 0) / 2
                  ),
                  face_rectangle: face_rectangle,
                  headpose: headpose,
                  skin_analyze: _objectSpread2(
                    _objectSpread2({}, skinResult),
                    {},
                    {
                      acne: skinResult.acne.rectangle.length + skinResult.acne_mark.rectangle.length + skinResult.acne_nodule.rectangle.length + skinResult.acne_pustule.rectangle.length
                    }
                  ),
                  denselandmark: calcFaceRect(denselandmark, skinResult.enhanced_bw_info),
                  origin_denselandmark: denselandmark,
                  facial_features: facialResult,
                  image_url: originImage
                }
                // 侧脸数据插入
                if (!(left_jawline_quality === 1 && right_jawline_quality === 1)) {
                  _context.next = 23
                  break
                }
                intersectionLeft = findIntersection(left_jawline_mark[8], left_jawline_mark[20], left_jawline_mark[60], left_jawline_mark[47])
                intersectionRight = findIntersection(right_jawline_mark[8], right_jawline_mark[20], right_jawline_mark[60], right_jawline_mark[47])
                if (!(intersectionRight && intersectionRight)) {
                  _context.next = 23
                  break
                }
                data.skin_analyze.side_result = {
                  level: Math.max(left_jawline_angle_level, right_jawline_angle_level),
                  angle: {
                    left: left_jawline_angle,
                    right: right_jawline_angle
                  }
                }
                _context.prev = 11
                _context.next = 14
                return drawJawline(images.left, [
                  [left_jawline_mark[8], intersectionLeft],
                  [intersectionLeft, left_jawline_mark[60]]
                ])
              case 14:
                app.globalData.faceMaps.leftSide = _context.sent
                _context.next = 17
                return drawJawline(images.right, [
                  [right_jawline_mark[8], intersectionRight],
                  [intersectionRight, right_jawline_mark[60]]
                ])
              case 17:
                app.globalData.faceMaps.rightSide = _context.sent
                _context.next = 23
                break
              case 20:
                _context.prev = 20
                _context.t0 = _context['catch'](11)
                console.log(_context.t0)
              case 23:
                _context.t1 = _regeneratorRuntime2().keys(skinResult.face_maps)
              case 24:
                if ((_context.t2 = _context.t1()).done) {
                  _context.next = 36
                  break
                }
                name = _context.t2.value
                if (!(name === 'texture_enhanced_bw')) {
                  _context.next = 30
                  break
                }
                saveBase64Image(name, skinResult.face_maps[name])
                _context.next = 34
                break
              case 30:
                _context.next = 32
                return cropImage('data:image/png;base64,' + skinResult.face_maps[name], skinResult.enhanced_bw_info.enhanced_bw_rect)
              case 32:
                image = _context.sent
                saveBase64Image(name, image)
              case 34:
                _context.next = 24
                break
              case 36:
                _context.next = 38
                return new Promise(function (resolve, reject) {
                  console.log('originImage', originImage)
                  wx.getImageInfo({
                    src: originImage,
                    // 图片带有特殊字符，在某些手机中Image不触发onload；先请求图片到缓存地址，使用缓存地址规避这个问题
                    success: function success(res) {
                      cropImage(res.path, skinResult.enhanced_bw_info.enhanced_bw_rect).then(function (res) {
                        app.globalData.originImageSize = {
                          width: skinResult.enhanced_bw_info.enhanced_bw_rect.width * skinResult.enhanced_bw_info.ratio,
                          height: skinResult.enhanced_bw_info.enhanced_bw_rect.height * skinResult.enhanced_bw_info.ratio
                        }
                        resolve(res)
                      })
                    },
                    fail: function fail(err) {
                      reject({
                        err_msg: '图片加载失败，请升级微信后体验'
                      })
                    }
                  })
                })
              case 38:
                app.globalData.faceMaps.origin = _context.sent
                app.globalData.ceceData = data
                return _context.abrupt('return', data)
              case 41:
              case 'end':
                return _context.stop()
            }
        },
        _callee,
        null,
        [[11, 20]]
      )
    })
  )
  return _setDataFromResponse.apply(this, arguments)
}
function cropImage(_x4, _x5) {
  return _cropImage.apply(this, arguments)
}
function _cropImage() {
  
  _cropImage = _asyncToGenerator2(
    /* */ _regeneratorRuntime2().mark(function _callee2(src, _ref) {
      var top
      var left
      var width
      var height
      var canvas
      var context
      var image
      return _regeneratorRuntime2().wrap(function _callee2$(_context2) {
        while (1)
          switch ((_context2.prev = _context2.next)) {
            case 0:
              top = _ref.top
              left = _ref.left
              width = _ref.width
              height = _ref.height
              canvas = wx.createOffscreenCanvas({
                type: '2d',
                width: width,
                height: height
              })
              // 获取 context。注意这里必须要与创建时的 type 一致
              context = canvas.getContext('2d')
              // 创建一个图片
              image = canvas.createImage()
              // 等待图片加载
              _context2.next = 6
              return new Promise(function (resolve, reject) {
                image.onload = resolve
                image.onerror = reject
                image.src = src
                // 要加载的图片 url
              })
            case 6:
              // 把图片画到离屏 canvas 上
              context.clearRect(0, 0, width, height)
              context.drawImage(image, left, top, width, height, 0, 0, width, height)
              return _context2.abrupt('return', canvas.toDataURL('image/png', 1))
            case 9:
            case 'end':
              return _context2.stop()
          }
      }, _callee2)
    })
  )
  return _cropImage.apply(this, arguments)
}
function localFileToBase64(filePath) {
  var fileManager = wx.getFileSystemManager()
  return 'data:image/jpeg;base64,' + fileManager.readFileSync(filePath, 'base64')
}
function getRatio(elementInfo, containerInfo, fitContainer) {
  if (fitContainer) {
    return Math.min(containerInfo.width / elementInfo.width, containerInfo.height / elementInfo.height)
  }
  if (containerInfo.width === containerInfo.height) {
    var compareEdge = Math.max(elementInfo.width, elementInfo.height)
    return containerInfo.width > compareEdge ? 1 : containerInfo.width / compareEdge
  }
  if (elementInfo.height / containerInfo.height > elementInfo.width / containerInfo.width) {
    return containerInfo.height > elementInfo.height ? 1 : containerInfo.height / elementInfo.height
  }
  return containerInfo.width > elementInfo.width ? 1 : containerInfo.width / elementInfo.width
}
function drawJawline(_x6, _x7) {
  return _drawJawline.apply(this, arguments)
}
function _drawJawline() {
  _drawJawline = _asyncToGenerator2(
    /* */ _regeneratorRuntime2().mark(function _callee3(src, data) {
      var canvas
      var image
      var milimuApp
      var layer
      var _iterator
      var _step
      var line
      var _extendLine
      var _extendLine2
      var start
      var end
      var lineColor
      var l
      return _regeneratorRuntime2().wrap(function _callee3$(_context3) {
        while (1)
          switch ((_context3.prev = _context3.next)) {
            case 0:
              canvas = wx.createOffscreenCanvas({
                type: '2d'
              })
              // 创建一个图片
              image = canvas.createImage()
              // 等待图片加载
              _context3.next = 4
              return new Promise(function (resolve, reject) {
                image.onload = resolve
                image.onerror = reject
                image.src = src
                // 要加载的图片 url
              })
            case 4:
              canvas.style = {}
              // milimu兼容
              milimuApp = new _milimu.Application({
                canvas: canvas,
                width: image.width,
                height: image.height
              })
              layer = new _milimu.Layer()
              layer.addChild(
                new _milimu.Sprite({
                  image: image
                })
              )
              _iterator = _createForOfIteratorHelper2(data)
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                  line = _step.value
                  _extendLine = extendLine(line[0], line[1], 85)
                  _extendLine2 = _slicedToArray2(_extendLine, 2)
                  start = _extendLine2[0]
                  end = _extendLine2[1]
                  lineColor = new _milimu.LinearGradient({
                    start: start,
                    end: end,
                    colors: ['rgba(255,255,255,0) 0%', '#fff 50%', 'rgba(255,255,255,0) 100%']
                  })
                  l = new _milimu.Polygon({
                    path: [start, end],
                    lineColor: lineColor,
                    lineWidth: 4
                  })
                  layer.addChild(l)
                }
              } catch (err) {
                console.log('CatchClause', err)
                console.log('CatchClause', err)
                _iterator.e(err)
              } finally {
                _iterator.f()
              }
              milimuApp.addChild(layer).render()
              return _context3.abrupt('return', canvas.toDataURL('image/png', 1))
            case 12:
            case 'end':
              return _context3.stop()
          }
      }, _callee3)
    })
  )
  return _drawJawline.apply(this, arguments)
}
function findIntersection(p1, p2, p3, p4) {
  var calculateSlopeAndIntercept = function calculateSlopeAndIntercept(point1, point2) {
    if (point1.x === point2.x) {
      // 平行于y轴
      return [null, null]
    }
    var slope = (point2.y - point1.y) / (point2.x - point1.x)
    var intercept = point1.y - slope * point1.x
    return [slope, intercept]
  }
  var _calculateSlopeAndInt = calculateSlopeAndIntercept(p1, p2)
  var _calculateSlopeAndInt2 = _slicedToArray2(_calculateSlopeAndInt, 2)
  var slope1 = _calculateSlopeAndInt2[0]
  var intercept1 = _calculateSlopeAndInt2[1]
  var _calculateSlopeAndInt3 = calculateSlopeAndIntercept(p3, p4)
  var _calculateSlopeAndInt4 = _slicedToArray2(_calculateSlopeAndInt3, 2)
  var slope2 = _calculateSlopeAndInt4[0]
  var intercept2 = _calculateSlopeAndInt4[1]
  if ((slope1 === null && slope2 === null) || slope1 === slope2) {
    throw new Error('Lines are parallel or coincident.')
  }
  if (slope1 === null) {
    // 第一条直线平行于y轴
    var _x_intersection = p1.x
    var _y_intersection = slope2 * p1.x + intercept2
    return {
      x: _x_intersection,
      y: _y_intersection
    }
  }
  if (slope2 === null) {
    // 第二条直线平行于y轴
    var _x_intersection2 = p3.x
    var _y_intersection2 = slope1 * p3.x + intercept1
    return {
      x: _x_intersection2,
      y: _y_intersection2
    }
  }
  // 两条直线都不平行于x轴或y轴
  var x_intersection = (intercept2 - intercept1) / (slope1 - slope2)
  var y_intersection = slope1 * x_intersection + intercept1
  return {
    x: x_intersection,
    y: y_intersection
  }
}

/**
 * 给定两个点，一个距离，输出方向矢量上延长该距离的坐标
 * @param {API.Point} start 开始点
 * @param {API.Point} end 结束点
 * @param {number} distance 需要延长的距离
 * @returns {API.Point}
 */
function extendPoints(start, end, distance) {
  var p1
  var l = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
  if (l === 0) {
    return start
  }
  p1 = new _milimu.Point((distance / l) * (end.x - start.x) + end.x, (distance / l) * (end.y - start.y) + end.y)
  return p1
}

/**
 * 给定两个点，一个距离，输出方向矢量上延长该距离的两点
 * @param {API.Point} start 开始点
 * @param {API.Point} end 结束点
 * @param {number} distance 需要延长的距离
 * @returns {[API.Point, API.Point]}
 */
function extendLine(start, end, distance) {
  return [extendPoints(start, end, distance), extendPoints(end, start, distance)]
}
function createApp(id) {
  return new Promise(function (resolve, reject) {
    var query = wx.createSelectorQuery()
    query
      .select('#'.concat(id))
      .fields({
        node: true,
        size: true
      })
      .exec(function (res) {
        var canvas = res[0].node
        if (!canvas) {
          reject(res)
          return
        }
        var _wx$getSystemInfoSync = wx.getSystemInfoSync()
        var pixelRatio = _wx$getSystemInfoSync.pixelRatio
        var windowWidth = _wx$getSystemInfoSync.windowWidth
        var windowHeight = _wx$getSystemInfoSync.windowHeight // Canvas 画布的实际绘制宽高
        var width = res[0].width || windowWidth
        var height = res[0].height || windowHeight
        canvas.style = {}
        var app = new _milimu.Application({
          canvas: canvas,
          width: width,
          height: height,
          devicePixelRatio: pixelRatio
        })
        resolve(app)
      })
  })
}
