/* eslint-disable */

require('../../@babel/runtime/helpers/Objectvalues')
require('../../@babel/runtime/helpers/Arrayincludes')
var _typeof2 = require('../../@babel/runtime/helpers/typeof')
!(function (t, e) {
  'object' == (typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e(((t = 'undefined' != typeof globalThis ? globalThis : t || self)['skin-animation'] = {}))
})(void 0, function (t) {
  'use strict'

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
       Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
       THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  var _e = function e(t, n) {
    return (
      (_e =
        Object.setPrototypeOf ||
        ({
          __proto__: []
        } instanceof Array &&
          function (t, e) {
            t.__proto__ = e
          }) ||
        function (t, e) {
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
        }),
      _e(t, n)
    )
  }
  function n(t, n) {
    if ('function' != typeof n && null !== n) throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null')
    function r() {
      this.constructor = t
    }
    _e(t, n), (t.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
  }
  var _r = function r() {
    return (
      (_r =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
          return t
        }),
      _r.apply(this, arguments)
    )
  }
  function i(t, e, n) {
    if (n || 2 === arguments.length) for (var r, i = 0, o = e.length; i < o; i++) (!r && i in e) || (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]))
    return t.concat(r || Array.prototype.slice.call(e))
  }
  'undefined' != typeof globalThis ? globalThis : 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self && self
  var o = {
    exports: {}
  }
  !(function (t, e) {
    !(function (t) {
      /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.
               Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.
               THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
      var _e2 = function e() {
        return (
          (_e2 =
            Object.assign ||
            function (t) {
              for (var e, n = 1, r = arguments.length; n < r; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
              return t
            }),
          _e2.apply(this, arguments)
        )
      }
      function n(t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              l(r.next(t))
            } catch (t) {
              //               t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
              o(t)
            }
          }
          function s(t) {
            try {
              l(r.throw(t))
            } catch (t) {
              //               t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
              o(t)
            }
          }
          function l(t) {
            var e
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e)
                    })).then(a, s)
          }
          l((r = r.apply(t, e || [])).next())
        })
      }
      function r(t, e) {
        var n,
          r,
          i,
          o,
          a = {
            label: 0,
            sent: function sent() {
              if (1 & i[0]) throw i[1]
              return i[1]
            },
            trys: [],
            ops: []
          }
        return (
          (o = {
            next: s(0),
            throw: s(1),
            return: s(2)
          }),
          'function' == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this
            }),
          o
        )
        function s(o) {
          return function (s) {
            return (function (o) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (((n = 1), r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)) return i
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o
                      break
                    case 4:
                      return (
                        a.label++,
                        {
                          value: o[1],
                          done: !1
                        }
                      )
                    case 5:
                      a.label++, (r = o[1]), (o = [0])
                      continue
                    case 7:
                      ;(o = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!((i = (i = a.trys).length > 0 && i[i.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                        a = 0
                        continue
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        a.label = o[1]
                        break
                      }
                      if (6 === o[0] && a.label < i[1]) {
                        ;(a.label = i[1]), (i = o)
                        break
                      }
                      if (i && a.label < i[2]) {
                        ;(a.label = i[2]), a.ops.push(o)
                        break
                      }
                      i[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  o = e.call(t, a)
                } catch (t) {
                  //                   t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                  ;(o = [6, t]), (r = 0)
                } finally {
                  n = i = 0
                }
              if (5 & o[0]) throw o[1]
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            })([o, s])
          }
        }
      }
      var i = {
        exports: {}
      }
      !(function (t, e) {
        !(function (t) {
          function e(t, e, n) {
            return Math.min(Math.max(t, e), n)
          }
          var n = {
            arr: function arr(t) {
              return Array.isArray(t)
            },
            bol: function bol(t) {
              return 'boolean' == typeof t
            },
            obj: function obj(t) {
              return (e = 'Object'), Object.prototype.toString.call(t).indexOf(e) > -1
              var e
            },
            str: function str(t) {
              return 'string' == typeof t
            },
            fnc: function fnc(t) {
              return 'function' == typeof t
            },
            num: function num(t) {
              return 'number' == typeof t
            },
            und: function und(t) {
              return void 0 === t
            },
            nil: function nil(t) {
              return n.und(t) || null === t
            },
            hex: function hex(t) {
              return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
            },
            rgb: function rgb(t) {
              return /^rgb/.test(t)
            },
            hsl: function hsl(t) {
              return /^hsl/.test(t)
            },
            col: function col(t) {
              return n.hex(t) || n.rgb(t) || n.hsl(t)
            }
          }
          function r(t) {
            var e = Number(t)
            return isNaN(e) ? 0 : e
          }
          function i(t) {
            return n.rgb(t)
              ? (r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((e = t)))
                ? 'rgba(' + r[1] + ',1)'
                : e
              : n.hex(t)
              ? (function (t) {
                  var e = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (t, e, n, r) {
                      return e + e + n + n + r + r
                    }),
                    n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)
                  return 'rgba(' + parseInt(n[1], 16) + ',' + parseInt(n[2], 16) + ',' + parseInt(n[3], 16) + ',1)'
                })(t)
              : n.hsl(t)
              ? (function (t) {
                  var e,
                    n,
                    r,
                    i = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),
                    o = parseInt(i[1], 10) / 360,
                    a = parseInt(i[2], 10) / 100,
                    s = parseInt(i[3], 10) / 100,
                    l = i[4] || 1
                  function h(t, e, n) {
                    return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < 0.5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
                  }
                  if (0 == a) e = n = r = s
                  else {
                    var u = s < 0.5 ? s * (1 + a) : s + a - s * a,
                      c = 2 * s - u
                    ;(e = h(c, u, o + 1 / 3)), (n = h(c, u, o)), (r = h(c, u, o - 1 / 3))
                  }
                  return 'rgba(' + Math.round(255 * e) + ',' + Math.round(255 * n) + ',' + Math.round(255 * r) + ',' + l + ')'
                })(t)
              : void 0
            var e, r
          }
          function o() {
            return !!document && document.hidden
          }
          function a(t, e) {
            var n = /^(\*=|\+=|-=)/.exec(t)
            if (!n) return t
            var r = parseFloat(e),
              i = parseFloat(t.replace(n[0], ''))
            switch (n[0][0]) {
              case '+':
                return r + i + 0
              case '-':
                return r - i + 0
              default:
                return r * i + 0
            }
          }
          var s = function s(t, e) {
              return -1
            },
            l = function l(t) {}
          'undefined' != typeof window && window.requestAnimationFrame
            ? ((s = window.requestAnimationFrame), (l = window.cancelAnimationFrame))
            : 'undefined' != typeof window && window.setTimeout
            ? ((s = function s(t, e) {
                var n = e || 0,
                  r = new Date().getTime(),
                  i = Math.max(0, 16.7 - (r - n))
                return (
                  (n = r + i),
                  window.setTimeout(function () {
                    t(r + i)
                  }, i)
                )
              }),
              (l = window.clearTimeout))
            : console.warn('@/utils/@milimu/timeline engine: 该环境中缺少requestAnimationFrame/setTimeout，请自行设置timer')
          var h = new (function () {
              var t = this
              ;(this.suspendWhenDocumentHidden = !0),
                (this.activeAnimates = []),
                (this.setTimer = function (t) {
                  ;(s = t.timer), (l = t.cancel)
                }),
                (this.setSuspendWhenDocumentHidden = function (e) {
                  t.suspendWhenDocumentHidden = e
                }),
                (this.handleVisibilityChange = function () {
                  t.suspendWhenDocumentHidden &&
                    (o()
                      ? t.stopEngine()
                      : (t.activeAnimates.forEach(function (t) {
                          return t._onDocumentVisibility()
                        }),
                        t.engine()))
                }),
                (this.stopEngine = function () {
                  t.raf && l(t.raf), (t.raf = void 0)
                }),
                (this.engine = function () {
                  s ? t.raf || (o() && t.suspendWhenDocumentHidden) || !(t.activeAnimates.length > 0) || (t.raf = s(t.step.bind(t))) : console.error('timer 未定义')
                }),
                (this.step = function (e) {
                  for (var n = t.activeAnimates.length, r = 0; r < n; ) {
                    var i = t.activeAnimates[r]
                    i.paused ? (t.activeAnimates.splice(r, 1), n--) : (i.tick(e), r++)
                  }
                  t.raf = r > 0 ? s(t.step.bind(t)) : void 0
                }),
                'undefined' != typeof document && document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this))
            })(),
            u = (function () {
              function t(r) {
                var i = this
                ;(this.duration = 0),
                  (this.callbacks = {}),
                  (this.loop = 1),
                  (this.remaining = 1),
                  (this.direction = 'normal'),
                  (this.autoplay = !1),
                  (this.passThrough = !0),
                  (this.currentTime = 0),
                  (this.progress = 0),
                  (this.paused = !0),
                  (this.began = !1),
                  (this.completed = !0),
                  (this.reversed = !0),
                  (this.startTime = 0),
                  (this.now = 0),
                  (this.lastTime = 0),
                  (this.resolve = null),
                  (this.speed = 1),
                  (this.__tracks = {}),
                  (this.__trackDeleteCache = {}),
                  (this.__trackCache = []),
                  (this.add = function (t) {
                    return i.__trackCache.push(t), i
                  }),
                  (this.remove = function (t) {
                    if (n.str(t)) {
                      var e = i.__tracks[t]
                      e && (i.__trackDeleteCache[e.name] = -1)
                    } else
                      for (var r in i.__tracks) {
                        var o = i.__tracks[r].animations.findIndex(function (e) {
                          return e === t
                        })
                        if (o > -1) {
                          1 === i.__tracks[r].animations.length ? (i.__trackDeleteCache[r] = -1) : (i.__trackDeleteCache[r] || (i.__trackDeleteCache[r] = new Set()), i.__trackDeleteCache[r].add(o))
                          break
                        }
                      }
                    return i
                  }),
                  (this.update = function () {
                    if (!i.__trackCache.length && !Object.keys(i.__trackDeleteCache).length) return i
                    i.passThrough = !0
                    var e = t.engine.activeAnimates.indexOf(i)
                    e > -1 && t.engine.activeAnimates.splice(e, 1),
                      i.removeAnimationFromTrack(i.__trackDeleteCache),
                      i.addTrack(i.__trackCache),
                      (i.duration = Object.values(i.__tracks).reduce(
                        function (t, e) {
                          return t.end > e.end ? t : e
                        },
                        {
                          end: i.duration
                        }
                      ).end),
                      (i.__trackCache = []),
                      (i.__trackDeleteCache = {})
                    var n = i.began,
                      r = i.completed,
                      o = i.reversed,
                      a = i.remaining,
                      s = i.currentTime
                    return i.reset(), n && !r && ((i.began = n), (i.reversed = o), (i.remaining = a), (i.currentTime = s)), i.autoplay && i.play(), i
                  }),
                  (this.destroy = function () {
                    i.passThrough = !0
                    var e = t.engine.activeAnimates.indexOf(i)
                    e > -1 && t.engine.activeAnimates.splice(e, 1), i.reset(), (i.__tracks = {}), (i.__trackCache = []), (i.__trackDeleteCache = {})
                  }),
                  (this.removeAnimationFromTrack = function (t) {
                    for (var e in t) i.__tracks[e] && (-1 !== t[e] ? i.__tracks[e].remove(Array.from(t[e])).update() : (i.__tracks[e].remove().update(), delete i.__tracks[e]))
                  }),
                  (this.addTrack = function (t) {
                    for (var e = 0, n = t; e < n.length; e++) {
                      var r = n[e]
                      i.__tracks[r.name] = r
                      try {
                        r.update()
                      } catch (t) {
                        //                         t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        console.log(t, r)
                      }
                    }
                  }),
                  (this.initSettings = function (t) {
                    for (var e = 0, r = ['update', 'begin', 'loopBegin', 'loopComplete', 'complete']; e < r.length; e++) {
                      var o = r[e]
                      i.callbacks[o] = t[o]
                    }
                    n.und(t.direction) || (i.direction = t.direction),
                      n.und(t.loop) || ('alternate' === i.direction && 1 !== t.loop ? (i.loop = 2 * t.loop) : (i.loop = t.loop)),
                      'boolean' == typeof t.autoplay && (i.autoplay = t.autoplay)
                  }),
                  (this.resetTime = function () {
                    ;(i.startTime = 0), (i.lastTime = i.adjustTime(i.currentTime) * (1 / i.speed))
                  }),
                  (this.adjustTime = function (t) {
                    return i.reversed ? i.duration - t : t
                  }),
                  (this.tick = function (t) {
                    var e
                    ;(i.now = t), i.startTime || (i.startTime = i.now), i.setProgress((i.now + (i.lastTime - i.startTime)) * i.speed), null === (e = i.customRenderer) || void 0 === e || e.call(i)
                  }),
                  (this.setProgress = function (t) {
                    var n = i.duration,
                      r = i.adjustTime(t)
                    ;(i.progress = e((r / n) * 100, 0, 100)),
                      !i.began && i.currentTime > 0 && ((i.began = !0), i.lifeCycleHook('begin')),
                      0 === i.currentTime && i.setAnimationsProgress(0),
                      (r >= n && i.currentTime !== n) || !n ? i.setAnimationsProgress(n) : i.setAnimationsProgress(r),
                      (i.currentTime = e(r, 0, n)),
                      i.began && i.lifeCycleHook('update'),
                      t >= n &&
                        ((i.lastTime = 0),
                        i.countIteration(),
                        i.remaining
                          ? ((i.startTime = i.now), 'alternate' === i.direction && i.toggleChangeDirection())
                          : ((i.paused = !0),
                            i.completed ||
                              ((i.completed = !0),
                              i.lifeCycleHook('complete'),
                              !i.passThrough &&
                                Promise &&
                                (i.resolve(),
                                (i.finished = new Promise(function (t) {
                                  return (i.resolve = t)
                                }))))))
                  }),
                  (this.countIteration = function () {
                    i.remaining && i.remaining--
                  }),
                  (this.toggleChangeDirection = function () {
                    'alternate' !== i.direction && (i.direction = 'normal' !== i.direction ? 'normal' : 'reverse'), (i.reversed = !i.reversed)
                  }),
                  (this.lifeCycleHook = function (t) {
                    var e, n
                    !i.passThrough && (null === (n = (e = i.callbacks)[t]) || void 0 === n || n.call(e, i))
                  }),
                  (this._onDocumentVisibility = this.resetTime),
                  (this.setAnimationsProgress = function (t) {
                    for (var e = 0, n = Object.values(i.__tracks); e < n.length; e++) {
                      var r = n[e]
                      t < r.start ? r.finished && (r.finished = !1) : (t > r.end && r.finished) || r.run(t)
                    }
                  }),
                  (this.seek = function (t) {
                    return i.setProgress(i.adjustTime(t)), i
                  }),
                  (this.pause = function () {
                    return (i.paused = !0), i.resetTime(), i
                  }),
                  (this.play = function () {
                    if (i.paused && (i.completed && i.reset(), 0 !== i.duration)) return (i.paused = !1), t.engine.activeAnimates.push(i), i.resetTime(), t.engine.engine(), i
                  }),
                  (this.restart = function () {
                    return i.reset(), i.play(), i
                  }),
                  (this.reset = function () {
                    return (
                      (i.passThrough = !1),
                      (i.currentTime = 0),
                      (i.progress = 0),
                      (i.paused = !0),
                      (i.began = !1),
                      (i.completed = !1),
                      (i.reversed = 'reverse' === i.direction),
                      (i.remaining = i.loop),
                      ((i.reversed && i.loop) || ('alternate' === i.direction && 1 === i.loop)) && i.remaining++,
                      Object.values(i.__tracks).map(function (t) {
                        t.reset()
                      }),
                      i.setAnimationsProgress(i.reversed ? i.duration : 0),
                      i
                    )
                  }),
                  (this.reverse = function () {
                    return i.toggleChangeDirection(), (i.completed = !i.reversed), i.resetTime(), i
                  }),
                  r && n.fnc(r.renderer) && (this.customRenderer = r.renderer),
                  (this.finished = new Promise(function (t) {
                    return (i.resolve = t)
                  })),
                  this.initSettings(r || {})
              }
              return (
                Object.defineProperty(t.prototype, 'alternateReversed', {
                  get: function get() {
                    return this.reversed && 'alternate' === this.direction
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (t.engine = h),
                t
              )
            })(),
            _c = function c(t, e) {
              return (
                (_c =
                  Object.setPrototypeOf ||
                  ({
                    __proto__: []
                  } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                  }),
                _c(t, e)
              )
            },
            _f = function f() {
              return (
                (_f =
                  Object.assign ||
                  function (t) {
                    for (var e, n = 1, r = arguments.length; n < r; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t
                  }),
                _f.apply(this, arguments)
              )
            },
            d = function d(t) {
              ;(this.start = 0), (this.end = 0), (this.began = !1), (this.finished = !1), (this.origin = t)
            },
            p = (function (t) {
              function i(i, o) {
                var a = t.call(this, '') || this
                return (
                  (a.__delay = {
                    pending: 0,
                    current: 0
                  }),
                  (a.__animatables = []),
                  (a.__animationConfigCache = []),
                  (a.add = function (t, e) {
                    var r = n.arr(t) ? t : [t]
                    return (
                      n.num(e)
                        ? (a.__animationConfigCache = a.__animationConfigCache.slice(0, e).concat(r, a.__animationConfigCache.slice(e)))
                        : (a.__animationConfigCache = a.__animationConfigCache.concat(r)),
                      a
                    )
                  }),
                  (a.remove = function (t) {
                    if (n.und(t)) return (a.__animationConfigCache = []), a
                    if (n.arr(t)) {
                      var e = []
                      return (
                        a.__animationConfigCache.map(function (n, r) {
                          t.includes(r) || e.push(n)
                        }),
                        (a.__animationConfigCache = e),
                        a
                      )
                    }
                    return (n.num(t)
                      ? t
                      : a.__animationConfigCache.findIndex(function (e) {
                          return e === t
                        })) > -1
                      ? (a.__animationConfigCache.splice(t, 1), a)
                      : a
                  }),
                  (a.update = function () {
                    var t = a.calcAniamtables(),
                      e = t.__animatables,
                      n = t.start,
                      r = t.end
                    return (a.__animatables = e), (a.start = n), (a.end = r), a
                  }),
                  (a.getDuration = function (t) {
                    if ((void 0 === t && (t = !0), t)) return a.end - a.start
                    var e = a.calcAniamtables(),
                      n = e.start
                    return e.end - n
                  }),
                  (a.calcAniamtables = function () {
                    for (var t = [], e = a.__tempAnimatable, n = 0, i = a.__animationConfigCache; n < i.length; n++) {
                      var o = i[n],
                        s = new d(o)
                      ;(s.start = e.end + r(o.offset)), (s.end = s.start + o.duration), t.push(s), (e = s)
                    }
                    for (var l = a.start, h = a.end, u = 0, c = t; u < c.length; u++) {
                      var f = c[u]
                      f.start < l && (l = f.start), f.end > h && (h = f.end)
                    }
                    return {
                      __animatables: t,
                      start: l,
                      end: h
                    }
                  }),
                  (a.run = function (t) {
                    a.__animatables.forEach(function (n) {
                      var r, i, o, a, s, l
                      if (t < n.start) n.finished = !1
                      else if (!(t > n.end && n.finished) && n.origin) {
                        var h = e(t - n.start, 0, n.origin.duration) / n.origin.duration
                        n.began ||
                          (null === (i = (r = n.origin).begin) ||
                            void 0 === i ||
                            i.call(r, {
                              progress: h,
                              time: t
                            }),
                          (n.began = !0)),
                          t >= n.end &&
                            !n.finished &&
                            ((h = 1),
                            (n.finished = !0),
                            null === (a = (o = n.origin).complete) ||
                              void 0 === a ||
                              a.call(o, {
                                progress: h,
                                time: t
                              })),
                          null === (l = (s = n.origin).update) ||
                            void 0 === l ||
                            l.call(s, {
                              progress: h,
                              time: t
                            })
                      }
                    })
                  }),
                  (a.reset = function () {
                    a.__animatables.map(function (t) {
                      ;(t.finished = !1), (t.began = !1)
                    }),
                      (a.finished = !1)
                  }),
                  (a.name = i),
                  (a.delay = r(null == o ? void 0 : o.delay)),
                  (a.start = a.delay),
                  (a.end = a.delay),
                  a
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e) throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null')
                  function n() {
                    this.constructor = t
                  }
                  _c(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()))
                })(i, t),
                Object.defineProperty(i.prototype, 'duration', {
                  get: function get() {
                    return this.end - this.start
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(i.prototype, 'delay', {
                  get: function get() {
                    return this.__delay.current
                  },
                  set: function set(t) {
                    this.__delay.pending = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(i.prototype, 'animations', {
                  get: function get() {
                    return this.__animatables
                      .map(function (t) {
                        return t.origin
                      })
                      .filter(Boolean)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(i.prototype, '__tempAnimatable', {
                  get: function get() {
                    var t = new d(null)
                    return (t.start = this.__delay.pending), (t.end = this.__delay.pending), t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                i
              )
            })(d),
            y = 0.1
          function g(t, e) {
            return 1 - 3 * e + 3 * t
          }
          function _(t, e) {
            return 3 * e - 6 * t
          }
          function m(t) {
            return 3 * t
          }
          function b(t, e, n) {
            return ((g(e, n) * t + _(e, n)) * t + m(e)) * t
          }
          function v(t, e, n) {
            return 3 * g(e, n) * t * t + 2 * _(e, n) * t + m(e)
          }
          function x(t, e, n, r) {
            if (0 <= t && t <= 1 && 0 <= n && n <= 1) {
              var i = new Float32Array(11)
              if (t !== e || n !== r) for (var o = 0; o < 11; ++o) i[o] = b(o * y, t, n)
              return function (i) {
                return (t === e && n === r) || 0 === i || 1 === i ? i : b(a(i), e, r)
              }
            }
            function a(e) {
              for (var r = 0, o = 1; 10 !== o && i[o] <= e; ++o) r += y
              --o
              var a = r + ((e - i[o]) / (i[o + 1] - i[o])) * y,
                s = v(a, t, n)
              return s >= 0.001
                ? (function (t, e, n, r) {
                    for (var i = 0; i < 4; ++i) {
                      var o = v(e, n, r)
                      if (0 === o) return e
                      e -= (b(e, n, r) - t) / o
                    }
                    return e
                  })(e, a, t, n)
                : 0 === s
                ? a
                : (function (t, e, n, r, i) {
                    var o,
                      a,
                      s = 0
                    do {
                      ;(o = b((a = e + (n - e) / 2), r, i) - t) > 0 ? (n = a) : (e = a)
                    } while (Math.abs(o) > 1e-7 && ++s < 10)
                    return a
                  })(e, r, r + y, t, n)
            }
          }
          function C(t) {
            return (
              void 0 === t && (t = 10),
              function (n) {
                return Math.ceil(e(n, 1e-6, 1) * t) * (1 / t)
              }
            )
          }
          var w,
            L,
            M =
              ((w = {
                linear: function linear() {
                  return function (t) {
                    return t
                  }
                }
              }),
              (L = {
                Sine: function Sine() {
                  return function (t) {
                    return 1 - Math.cos((t * Math.PI) / 2)
                  }
                },
                Circ: function Circ() {
                  return function (t) {
                    return 1 - Math.sqrt(1 - t * t)
                  }
                },
                Back: function Back() {
                  return function (t) {
                    return t * t * (3 * t - 2)
                  }
                },
                Bounce: function Bounce() {
                  return function (t) {
                    for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11; );
                    return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                  }
                },
                Elastic: function Elastic(t, n) {
                  void 0 === t && (t = 1), void 0 === n && (n = 0.5)
                  var r = e(t, 1, 10),
                    i = e(n, 0.1, 2)
                  return function (t) {
                    return 0 === t || 1 === t ? t : -r * Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1 - (i / (2 * Math.PI)) * Math.asin(1 / r)) * (2 * Math.PI)) / i)
                  }
                }
              }),
              ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach(function (t, e) {
                L[t] = function () {
                  return function (t) {
                    return Math.pow(t, e + 2)
                  }
                }
              }),
              Object.keys(L).forEach(function (t) {
                var e = L[t]
                ;(w['easeIn' + t] = e),
                  (w['easeOut' + t] = function (t, n) {
                    return function (r) {
                      return 1 - e(t, n)(1 - r)
                    }
                  }),
                  (w['easeInOut' + t] = function (t, n) {
                    return function (r) {
                      return r < 0.5 ? e(t, n)(2 * r) / 2 : 1 - e(t, n)(-2 * r + 2) / 2
                    }
                  }),
                  (w['easeOutIn' + t] = function (t, n) {
                    return function (r) {
                      return r < 0.5 ? (1 - e(t, n)(1 - 2 * r)) / 2 : (e(t, n)(2 * r - 1) + 1) / 2
                    }
                  })
              }),
              _f(_f({}, w), {
                bezier: x,
                steps: C
              })),
            P = {
              duration: 1e3,
              delay: 0,
              easing: M.easeOutElastic(1, 0.5)
            },
            A = function A(t, r) {
              var o = this
              ;(this.normalizeTweens = function (t, e) {
                var r
                return e.tweens.map(function (i) {
                  var s = i.value,
                    l = t[e.name] || 0,
                    h = r ? r.to.original : l,
                    u = n.arr(s) ? s[0] : h,
                    c = n.arr(s) ? s[1] : s
                  n.und(c) && (c = r)
                  var d = _f(_f({}, i), {
                    from: o.decomposeValue(u),
                    to: o.decomposeValue(a(c, u)),
                    start: 0,
                    end: 0,
                    isColor: !1
                  })
                  return (d.start = r ? r.end : 0), (d.end = d.start + d.delay + d.duration), (d.isColor = n.col(d.from.original)), (r = d), d
                })
              }),
                (this.decomposeValue = function (t) {
                  var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
                    r =
                      (function (t) {
                        return n.col(t) ? i(t) : (/\s/g.test(t), t)
                      })(t) + ''
                  return {
                    original: r,
                    numbers: r.match(e) ? r.match(e).map(Number) : [0],
                    strings: n.str(t) ? r.split(e) : []
                  }
                }),
                (this.update = function (t) {
                  var n = t.progress,
                    r = o.tweens,
                    i = r.length - 1,
                    a = n * o.duration,
                    s = r[i]
                  i &&
                    (s =
                      r.filter(function (t) {
                        return a < t.end
                      })[0] || s)
                  for (var l = e(a - s.start - s.delay, 0, s.duration) / s.duration, h = isNaN(l) ? 1 : s.easing(l), u = s.to.strings, c = [], f = s.to.numbers.length, d = 0; d < f; d++) {
                    var p = s.to.numbers[d],
                      y = s.from.numbers[d] || 0
                    c.push(y + h * (p - y))
                  }
                  var g,
                    _ = u.length
                  if (_) {
                    g = u[0]
                    for (var m = 0; m < _; m++) isNaN(c[m]) || (u[m + 1] ? (g += c[m] + u[m + 1]) : (g += c[m] + ' '))
                  } else g = c[0]
                  ;(o.target[o.property] = g), (o.currentValue = g)
                }),
                (this.target = t),
                (this.property = r.name)
              var s = this.normalizeTweens(t, r),
                l = s[s.length - 1]
              ;(this.tweens = s), (this.duration = l.end), (this.delay = s[0].delay)
            }
          ;(t.Timeline = u),
            (t.Track = p),
            (t.createMotionTween = function (t) {
              var e = (function (t, e) {
                  var r = _f({}, e)
                  return n.num(t.defaultDuration) && (r.duration = t.defaultDuration), n.num(t.defaultDelay) && (r.delay = t.defaultDelay), n.fnc(t.defaultEasing) && (r.easing = t.defaultEasing), r
                })(t, P),
                r = (function (t, e) {
                  return Object.keys(t.property)
                    .map(function (r) {
                      if (n.und(t.target[r])) return !1
                      var i = _f({}, e),
                        o = t.property[r]
                      return (
                        n.arr(o) &&
                          (2 !== o.length || n.obj(o[0])
                            ? (i.duration = e.duration / o.length)
                            : (o = {
                                value: o
                              })),
                        {
                          name: r,
                          tweens: (n.arr(o) ? o : [o]).map(function (t, r) {
                            var o = n.obj(t)
                              ? t
                              : {
                                  value: t
                                }
                            return n.und(o.delay) && (o.delay = r ? 0 : e.delay), _f(_f({}, i), o)
                          })
                        }
                      )
                    })
                    .filter(Boolean)
                })(t, e).map(function (e) {
                  return new A(t.target, e)
                }),
                i = (function (t) {
                  return {
                    duration: t.length
                      ? Math.max.apply(
                          Math,
                          t.map(function (t) {
                            return t.duration
                          })
                        )
                      : 0,
                    delay: t.length
                      ? Math.min.apply(
                          Math,
                          t.map(function (t) {
                            return t.delay
                          })
                        )
                      : 0
                  }
                })(r)
              return {
                duration: i.duration,
                delay: i.delay,
                offset: t.offset,
                update: function update(e) {
                  t.update
                    ? t.update(
                        _f(_f({}, e), {
                          animations: r
                        })
                      )
                    : r.map(function (t) {
                        return t.update(e)
                      })
                }
              }
            }),
            (t.easings = M),
            (t.engine = h)
        })(e)
      })(0, i.exports)
      var o = {
        exports: {}
      }
      !(function (t, e) {
        !(function (t) {
          /*! *****************************************************************************
            Copyright (c) Microsoft Corporation.
                       Permission to use, copy, modify, and/or distribute this software for any
            purpose with or without fee is hereby granted.
                       THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
            REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
            AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
            INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
            LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
            OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
            PERFORMANCE OF THIS SOFTWARE.
            ***************************************************************************** */
          var _e3 = function e(t, n) {
            return (
              (_e3 =
                Object.setPrototypeOf ||
                ({
                  __proto__: []
                } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e
                  }) ||
                function (t, e) {
                  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                }),
              _e3(t, n)
            )
          }
          function n(t, n) {
            if ('function' != typeof n && null !== n) throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null')
            function r() {
              this.constructor = t
            }
            _e3(t, n), (t.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
          }
          function r(t, e, n) {
            if (n || 2 === arguments.length) for (var r, i = 0, o = e.length; i < o; i++) (!r && i in e) || (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]))
            return t.concat(r || Array.prototype.slice.call(e))
          }
          var i = (function () {
              function t(e, n, r, i) {
                void 0 === e && (e = 0),
                  void 0 === n && (n = 0),
                  void 0 === r && (r = 0),
                  void 0 === i && (i = 0),
                  (this.type = t.TYPE),
                  (this.x = e),
                  (this.y = n),
                  (this.width = r),
                  (this.height = i)
              }
              return (
                Object.defineProperty(t.prototype, 'left', {
                  get: function get() {
                    return this.x
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'right', {
                  get: function get() {
                    return this.x + this.width
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'top', {
                  get: function get() {
                    return this.y
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'bottom', {
                  get: function get() {
                    return this.y + this.height
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t, 'empty', {
                  get: function get() {
                    return new t(0, 0, 0, 0)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (t.prototype.clone = function () {
                  return new t(this.x, this.y, this.width, this.height)
                }),
                (t.prototype.copyFrom = function (t) {
                  return (this.x = t.x), (this.y = t.y), (this.width = t.width), (this.height = t.height), this
                }),
                (t.prototype.copyTo = function (t) {
                  return (t.x = this.x), (t.y = this.y), (t.width = this.width), (t.height = this.height), t
                }),
                (t.prototype.contains = function (t, e) {
                  return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && e >= this.y && e <= this.y + this.height
                }),
                (t.prototype.toString = function () {
                  return '[@/utils/@milimu/math:Rectangle x=' + this.x + ' y=' + this.y + ' width=' + this.width + ' height=' + this.height + ']'
                }),
                (t.TYPE = 'rectangle'),
                t
              )
            })(),
            o = (function () {
              function t() {
                this.nodes = {}
              }
              return (
                (t.prototype.has = function (t) {
                  return !!this.nodes[t]
                }),
                (t.prototype.add = function (t) {
                  t.name && (this.nodes[t.name] ? console.error('node name: ' + t.name + ' has been used') : (this.nodes[t.name] = t))
                }),
                (t.prototype.delete = function (t) {
                  t.name && (this.nodes[t.name] ? (this.nodes[t.name] = void 0) : console.error('未创建该节点'))
                }),
                (t.prototype.clear = function () {
                  this.nodes = {}
                }),
                t
              )
            })()
          function a(t, e) {
            var n = (e || 'node') + '_' + +new Date() + '_' + parseInt(String(1e7 * Math.random()))
            return t.has(n) ? a(t, e) : n
          }
          var s = (function () {
              function t(t, e) {
                ;(this.x = t), (this.y = e)
              }
              return (
                (t.prototype.set = function (t, e) {
                  ;(this.x = t || this.x), (this.y = e || this.y)
                }),
                (t.prototype.clone = function () {
                  return new t(this.x, this.y)
                }),
                t
              )
            })(),
            l = (function () {
              function t(t, e, n) {
                ;(this.cb = n), (this._x = t), (this._y = e)
              }
              return (
                Object.defineProperty(t.prototype, 'x', {
                  get: function get() {
                    return this._x
                  },
                  set: function set(t) {
                    ;(this._x = t), this.cb && this.cb(new s(this._x, this._y))
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'y', {
                  get: function get() {
                    return this._y
                  },
                  set: function set(t) {
                    ;(this._y = t), this.cb && this.cb(new s(this._x, this._y))
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (t.prototype.set = function (t, e) {
                  void 0 !== t && (this._x = t), void 0 !== e && (this._y = e), this.cb && this.cb(new s(this._x, this._y))
                }),
                (t.prototype.clone = function () {
                  return new t(this.x, this.y, this.cb)
                }),
                t
              )
            })(),
            h = 'undefined' != typeof Float32Array ? Float32Array : Array,
            u = Math.PI / 180
          function c() {
            var t = new h(6)
            return h != Float32Array && ((t[1] = 0), (t[2] = 0), (t[4] = 0), (t[5] = 0)), (t[0] = 1), (t[3] = 1), t
          }
          function f(t, e, n) {
            var r = e[0],
              i = e[1],
              o = e[2],
              a = e[3],
              s = e[4],
              l = e[5],
              h = n[0],
              u = n[1]
            return (t[0] = r), (t[1] = i), (t[2] = o), (t[3] = a), (t[4] = r * h + o * u + s), (t[5] = i * h + a * u + l), t
          }
          function d() {
            var t = new h(2)
            return h != Float32Array && ((t[0] = 0), (t[1] = 0)), t
          }
          function p(t, e) {
            var n = new h(2)
            return (n[0] = t), (n[1] = e), n
          }
          function y(t, e, n) {
            var r = e[0],
              i = e[1]
            return (t[0] = n[0] * r + n[2] * i + n[4]), (t[1] = n[1] * r + n[3] * i + n[5]), t
          }
          Math.hypot ||
            (Math.hypot = function () {
              for (var t = 0, e = arguments.length; e--; ) t += arguments[e] * arguments[e]
              return Math.sqrt(t)
            }),
            d()
          var g,
            _ = (function () {
              function t() {
                ;(this.position = new l(0, 0, this.onChange.bind(this))),
                  (this.origin = new l(0, 0, this.onChange.bind(this))),
                  (this.scale = new l(1, 1, this.onChange.bind(this))),
                  (this.skew = new l(0, 0, this.onChange.bind(this, 'position'))),
                  (this.localTransform = c()),
                  (this.worldTransform = c()),
                  (this._rotation = 0),
                  (this._localID = 0),
                  (this._currentLocalID = 0),
                  (this._worldID = 0),
                  (this._parentID = 0)
              }
              return (
                Object.defineProperty(t.prototype, 'rotation', {
                  get: function get() {
                    return this._rotation
                  },
                  set: function set(t) {
                    this._rotation !== t && ((this._rotation = t), this.onChange())
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (t.prototype.onChange = function () {
                  this._localID++
                }),
                (t.prototype.updateLocalTransform = function () {
                  this._localID !== this._currentLocalID && ((this.localTransform = this.getCurrentMatrix()), (this._currentLocalID = this._localID), (this._parentID = -1))
                }),
                (t.prototype.updateTransform = function (t) {
                  this.updateLocalTransform(), this._parentID !== t._worldID && ((this.worldTransform = this.getWorldTransform(t)), (this._parentID = t._worldID), this._worldID++)
                }),
                (t.prototype.getCurrentMatrix = function () {
                  var t = this.scale,
                    e = t.x,
                    n = void 0 === e ? 1 : e,
                    r = t.y,
                    i = void 0 === r ? 1 : r,
                    o = this.skew,
                    a = o.x,
                    s = void 0 === a ? 0 : a,
                    l = o.y,
                    d = void 0 === l ? 0 : l,
                    y = this.position,
                    g = y.x,
                    _ = void 0 === g ? 0 : g,
                    m = y.y,
                    b = void 0 === m ? 0 : m,
                    v = c(),
                    x = c(),
                    C = c(),
                    w = c(),
                    L = (function (t, e, n, r, i, o) {
                      var a = new h(6)
                      return (a[0] = t), (a[1] = e), (a[2] = n), (a[3] = r), (a[4] = i), (a[5] = o), a
                    })(1, s, d, 1, _, b),
                    M = p(this.origin.x, this.origin.y),
                    P = p(-this.origin.x, -this.origin.y)
                  return (
                    f(C, L, M),
                    (function (t, e, n) {
                      var r = e[0],
                        i = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        l = e[5],
                        h = Math.sin(n),
                        u = Math.cos(n)
                      ;(t[0] = r * u + o * h), (t[1] = i * u + a * h), (t[2] = r * -h + o * u), (t[3] = i * -h + a * u), (t[4] = s), (t[5] = l)
                    })(
                      x,
                      C,
                      (function (t) {
                        return t * u
                      })(this.rotation)
                    ),
                    (function (t, e, n) {
                      var r = e[0],
                        i = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        l = e[5],
                        h = n[0],
                        u = n[1]
                      ;(t[0] = r * h), (t[1] = i * h), (t[2] = o * u), (t[3] = a * u), (t[4] = s), (t[5] = l)
                    })(w, x, p(n, i)),
                    f(v, w, P),
                    v
                  )
                }),
                (t.prototype.getLocalTransform = function () {
                  var t,
                    e,
                    n = c(),
                    r = p(-this.position.x, -this.position.y)
                  return f(n, ((t = this.localTransform), ((e = new h(6))[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), (e[4] = t[4]), (e[5] = t[5]), e), r), n
                }),
                (t.prototype.getWorldTransform = function (t) {
                  var e,
                    n,
                    r,
                    i,
                    o,
                    a,
                    s,
                    l,
                    h,
                    u,
                    f,
                    d,
                    p,
                    y,
                    g,
                    _ = c()
                  return (
                    (e = _),
                    (n = t.localTransform),
                    (r = this.localTransform),
                    (i = n[0]),
                    (o = n[1]),
                    (a = n[2]),
                    (s = n[3]),
                    (l = n[4]),
                    (h = n[5]),
                    (u = r[0]),
                    (f = r[1]),
                    (d = r[2]),
                    (p = r[3]),
                    (y = r[4]),
                    (g = r[5]),
                    (e[0] = i * u + a * f),
                    (e[1] = o * u + s * f),
                    (e[2] = i * d + a * p),
                    (e[3] = o * d + s * p),
                    (e[4] = i * y + a * g + l),
                    (e[5] = o * y + s * g + h),
                    _
                  )
                }),
                t
              )
            })(),
            m = function m(t) {
              var e = this
              ;(this.isRoot = !0),
                (this.type = 'Application'),
                (this.worldAlpha = 1),
                (this.transform = new _()),
                (this.children = []),
                (this.root = this),
                (this.createName = function (t) {
                  var n = (t || 'node') + '_' + +new Date() + '_' + parseInt(String(1e7 * Math.random()))
                  return e.documents.has(n) ? a(e.documents, t) : n
                }),
                (this.findNode = function (t) {
                  return e.documents.nodes[t]
                }),
                (this.addChild = function (t) {
                  var n = t
                  Array.isArray(t) || (n = [t])
                  for (var i = 0, o = n; i < o.length; i++) {
                    var a = o[i]
                    a.parent && a.parent.removeChild(a), (a.parent = e)
                  }
                  return (e.children = r(r([], e.children), n)), e
                }),
                (this.removeChild = function (t) {
                  var n = e.children.findIndex(function (e) {
                    return e.name === t.name
                  })
                  return n >= 0 && ((e.children[n].parent = void 0), e.children.splice(n, 1)), e
                }),
                (this.clearChildren = function () {
                  for (var t = 0, n = e.children; t < n.length; t++) {
                    var r = n[t]
                    e.removeChild(r), r.destroy()
                  }
                  return (e.children = []), e
                }),
                (this._recursivePostUpdateTransform = function () {}),
                (this.render = function () {
                  e.ctx.clearRect(e.screen.x, e.screen.y, e.screen.width, e.screen.height)
                  for (var t = 0, n = e.children; t < n.length; t++) n[t].render(e.ctx)
                }),
                (this.destroy = function () {
                  ;(e.transform = null), e.clearChildren(), e.documents.clear()
                }),
                (this.ctx = t.canvas.getContext('2d')),
                (this.canvas = t.canvas)
              var n = t.devicePixelRatio || 1
              return (
                (this.devicePixelRatio = n),
                (this.canvas.width = t.width * n),
                (this.canvas.height = t.height * n),
                (this.canvas.style.width = t.width + 'px'),
                (this.canvas.style.height = t.height + 'px'),
                this.ctx.scale(n, n),
                (this.screen = new i(0, 0, t.width, t.height)),
                (this.documents = new o()),
                (this.name = this.createName(this.type)),
                this
              )
            }
          !(function (t) {
            ;(t[(t.wilMount = 0)] = 'wilMount'), (t[(t.didMount = 1)] = 'didMount'), (t[(t.rendering = 2)] = 'rendering')
          })(g || (g = {}))
          var b = (function () {
              function t(t) {
                ;(this.visible = !0),
                  (this.alpha = 1),
                  (this.transform = new _()),
                  (this._worldAlpha = 1),
                  (this._destroyed = !0),
                  (this.rendered = g.wilMount),
                  (this.__lifeCycle__ = {
                    willMount: [
                      function (t) {
                        t.root &&
                          (t.name || (t.name = t.root.createName(t.type)),
                          t.root.documents.has(t.name) ? ((t.visible = !1), console.warn('Application中存在同名元素：', t.name)) : t.root.documents.add(t))
                      }
                    ],
                    willDestroy: [
                      function (t) {
                        t.root && t.root.documents.delete(t)
                      }
                    ]
                  }),
                  (this.name = t.name),
                  (this._width = (null == t ? void 0 : t.width) || 0),
                  (this._height = (null == t ? void 0 : t.height) || 0),
                  this.transform.position.set(null == t ? void 0 : t.x, null == t ? void 0 : t.y),
                  (this.tempDisplayObjectParent = null)
              }
              return (
                Object.defineProperty(t.prototype, 'worldTransform', {
                  get: function get() {
                    return this.transform.worldTransform
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'localTransform', {
                  get: function get() {
                    return this.transform.localTransform
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'width', {
                  get: function get() {
                    return this._width
                  },
                  set: function set(t) {
                    this._width = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'height', {
                  get: function get() {
                    return this._height
                  },
                  set: function set(t) {
                    this._height = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'scale', {
                  get: function get() {
                    return {
                      x: this.transform.scale.x,
                      y: this.transform.scale.y
                    }
                  },
                  set: function set(t) {
                    if ('number' == typeof t) this.transform.scale.set(t, t)
                    else if (!t.hasOwnProperty('x') && !t.hasOwnProperty('y')) return
                    this.transform.scale.set(t.x, t.y)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'rotation', {
                  get: function get() {
                    return this.transform.rotation
                  },
                  set: function set(t) {
                    this.transform.rotation = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'x', {
                  get: function get() {
                    return this.transform.position.x
                  },
                  set: function set(t) {
                    this.transform.position.set(t)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'y', {
                  get: function get() {
                    return this.transform.position.y
                  },
                  set: function set(t) {
                    this.transform.position.set(this.x, t)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'position', {
                  get: function get() {
                    return this.transform.position
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'transformOrigin', {
                  get: function get() {
                    var t = this.transform.origin.clone()
                    return [t.x / this.width, t.y / this.height]
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'destroyed', {
                  get: function get() {
                    return this._destroyed
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'worldAlpha', {
                  get: function get() {
                    var t = this.alpha
                    return this._parent && (t = this.alpha * this._parent.worldAlpha), (this._worldAlpha = t), t
                  },
                  set: function set(t) {
                    this._worldAlpha = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'parent', {
                  get: function get() {
                    return this._parent ? this._parent : this._tempDisplayObjectParent
                  },
                  set: function set(t) {
                    ;(this._parent = t), (this._root = (null == t ? void 0 : t.root) || void 0)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'root', {
                  get: function get() {
                    if (this._parent) return this._parent.root
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, '_tempDisplayObjectParent', {
                  get: function get() {
                    return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new v({})), this.tempDisplayObjectParent
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (t.prototype.destroy = function () {
                  this.lifeCycleHook('willDestroy'),
                    this.parent && this.parent.removeChild(this),
                    (this.transform = null),
                    (this.parent = void 0),
                    (this._destroyed = !0),
                    this.lifeCycleHook('didDestroy')
                }),
                (t.prototype.willMount = function (t) {
                  return this.__lifeCycle__.willMount.push(t), this
                }),
                (t.prototype.didMount = function (t) {
                  return this.__lifeCycle__.didMount || (this.__lifeCycle__.didMount = []), this.__lifeCycle__.didMount.push(t), this
                }),
                (t.prototype.willUpdate = function (t) {
                  return this.__lifeCycle__.willUpdate || (this.__lifeCycle__.willUpdate = []), this.__lifeCycle__.willUpdate.push(t), this
                }),
                (t.prototype.didUpdate = function (t) {
                  return this.__lifeCycle__.didUpdate || (this.__lifeCycle__.didUpdate = []), this.__lifeCycle__.didUpdate.push(t), this
                }),
                (t.prototype.willDestroy = function (t) {
                  return this.__lifeCycle__.willDestroy.push(t), this
                }),
                (t.prototype.didDestroy = function (t) {
                  return this.__lifeCycle__.didDestroy || (this.__lifeCycle__.didDestroy = []), this.__lifeCycle__.didDestroy.push(t), this
                }),
                (t.prototype.willRender = function (t) {
                  return this.__lifeCycle__.willRender || (this.__lifeCycle__.willRender = []), this.__lifeCycle__.willRender.push(t), this
                }),
                (t.prototype.didRender = function (t) {
                  return this.__lifeCycle__.didRender || (this.__lifeCycle__.didRender = []), this.__lifeCycle__.didRender.push(t), this
                }),
                (t.prototype.lifeCycleHook = function (t, e) {
                  var n = this
                  return this.__lifeCycle__[t] && this.__lifeCycle__[t].length
                    ? (this.__lifeCycle__[t].map(function (t) {
                        t(n, e)
                      }),
                      this)
                    : this
                }),
                (t.prototype.handleTransformAndOpacity = function (t) {
                  this._recursivePostUpdateTransform()
                  var e = this.localTransform
                  t.transform(e[0], e[1], e[2], e[3], e[4], e[5]), (t.globalAlpha = this.worldAlpha)
                }),
                (t.prototype._recursivePostUpdateTransform = function () {
                  this._parent
                    ? (this._parent._recursivePostUpdateTransform(), this.transform.updateTransform(this._parent.transform))
                    : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
                }),
                (t.prototype.updateTransform = function () {
                  this.transform.updateTransform(this.parent.transform), (this.worldAlpha = this.alpha * this.parent.worldAlpha)
                }),
                (t.prototype.setOrigin = function (t) {
                  var e, n
                  if (('number' == typeof t ? (e = n = t) : ((e = t.x / this.width), (n = t.y / this.height)), e < 0 || e > 1))
                    return console.error('function: setOrigin required args to be number type which between 0 to 1'), this
                  if (void 0 !== n && (n < 0 || n > 1)) return console.error('function: setOrigin required args to be number type which between 0 to 1'), this
                  var r = e,
                    i = n
                  return void 0 === n && (i = e), this.transform.origin.set(r * this.width, i * this.height), this
                }),
                (t.prototype.setRotate = function (t) {
                  return (this.rotation = t), this
                }),
                (t.prototype.setScale = function (t) {
                  return (this.scale = t), this
                }),
                (t.prototype.setTranslate = function (t) {
                  return (this.x = 'number' == typeof t.x ? t.x : this.x), (this.y = 'number' == typeof t.y ? t.y : this.y), this
                }),
                (t.prototype.setTranslateX = function (t) {
                  return (this.x = t), this
                }),
                (t.prototype.setTranslateY = function (t) {
                  return (this.y = t), this
                }),
                (t.prototype.toLocal = function (t, e, n) {
                  var r = t
                  e && (r = e.toGlobal(t, n)), n || (this._recursivePostUpdateTransform(), this.updateTransform())
                  var i,
                    o,
                    a,
                    s,
                    l,
                    h,
                    u,
                    f,
                    g,
                    _ = p(r.x, r.y),
                    m = d(),
                    b = c()
                  return (
                    (i = b),
                    (a = (o = this.localTransform)[0]),
                    (s = o[1]),
                    (l = o[2]),
                    (h = o[3]),
                    (u = o[4]),
                    (f = o[5]),
                    (g = a * h - s * l) && ((g = 1 / g), (i[0] = h * g), (i[1] = -s * g), (i[2] = -l * g), (i[3] = a * g), (i[4] = (l * f - h * u) * g), (i[5] = (s * u - a * f) * g)),
                    y(m, _, b),
                    {
                      x: m[0],
                      y: m[1]
                    }
                  )
                }),
                (t.prototype.toGlobal = function (t, e) {
                  void 0 === e && (e = !1), e || (this._recursivePostUpdateTransform(), this.updateTransform())
                  var n = p(t.x, t.y),
                    r = d()
                  return (
                    y(r, n, this.worldTransform),
                    {
                      x: r[0],
                      y: r[1]
                    }
                  )
                }),
                (t.prototype.render = function (t) {
                  this.visible &&
                    (this.rendered === g.wilMount ? (this.lifeCycleHook('willMount'), (this.rendered = g.didMount)) : this.rendered === g.rendering && this.lifeCycleHook('willUpdate'),
                    t.save(),
                    this.handleTransformAndOpacity(t),
                    this.lifeCycleHook('willRender', t),
                    this.renderer(t),
                    this.lifeCycleHook('didRender', t),
                    t.restore(),
                    this.rendered === g.didMount ? (this.lifeCycleHook('didMount'), (this.rendered = g.rendering)) : this.rendered === g.rendering && this.lifeCycleHook('didUpdate'))
                }),
                t
              )
            })(),
            v = (function (t) {
              function e() {
                var e = (null !== t && t.apply(this, arguments)) || this
                return (e.type = 'TemporaryDisplayObject'), (e.children = []), e
              }
              return n(e, t), (e.prototype.renderer = function (t) {}), (e.prototype.removeChild = function (t) {}), (e.prototype.addChild = function (t) {}), e
            })(b),
            x = (function (t) {
              function e(e) {
                var n = t.call(this, e) || this
                return (
                  (n.type = 'Sprite'),
                  (n.renderer = function (t) {
                    t.drawImage(n.image, 0, 0, n.imageWidth, n.imageHeight, 0, 0, n.width, n.height)
                  }),
                  (n.image = e.image),
                  (n.width = e.width || e.image.width || 0),
                  (n.height = e.height || e.image.height || 0),
                  (n.imageWidth = e.image.width || n.height),
                  (n.imageHeight = e.image.height || n.height),
                  n
                )
              }
              return n(e, t), e
            })(b),
            C = {
              x: 0,
              y: 0,
              radius: 0,
              fill: 'rgba(0,0,0,0)'
            },
            w = (function (t) {
              function e(e) {
                var n = t.call(this, Object.assign({}, C, e)) || this
                n.type = 'Arc'
                var r = Object.assign({}, C, e)
                n.radius = r.radius
                var i = (r.border || '1px solid rgba(0,0,0,0)').split(' '),
                  o = i[0],
                  a = i[1],
                  s = i[2]
                if (!['solid', 'dashed'].includes(a)) throw Error('borderStyle must be one of ["solid", "dashed"]')
                return (
                  (n.borderWidth = Number(o.replace('px', ''))),
                  (n.borderColor = s),
                  (n.borderStyle = a),
                  (n.fill = r.fill),
                  (n.startAngle = 'number' == typeof e.startAngle ? e.startAngle : 0),
                  (n.endAngle = 'number' == typeof e.endAngle ? e.endAngle : 2 * Math.PI),
                  e.dashSetting ? (n.dashSetting = e.dashSetting) : (n.dashSetting = [n.borderWidth, n.borderWidth]),
                  n
                )
              }
              return (
                n(e, t),
                (e.prototype.renderer = function (t) {
                  t.beginPath(),
                    'dashed' === this.borderStyle && t.setLineDash(this.dashSetting),
                    this._recursivePostUpdateTransform(),
                    t.arc(0, 0, this.radius, this.startAngle, this.endAngle),
                    (t.lineWidth = this.borderWidth),
                    (t.strokeStyle = this.borderColor),
                    this.fill && ((t.fillStyle = this.fill), t.fill()),
                    t.stroke()
                }),
                e
              )
            })(b),
            L = (function () {
              function t(t) {
                ;(this.type = 'Gradient'), (this.colorArray = []), t.hasOwnProperty('colors') && Array.isArray(t.colors) && (this.colorArray = this.formatColors(t.colors))
              }
              return (
                (t.prototype.formatColors = function (t) {
                  return t.map(function (e, n) {
                    var r = e.split(' '),
                      i = r[0],
                      o = r[1]
                    return {
                      color: i,
                      stop: Math.min(Math.max(0, Number((o || (n / (t.length - 1)) * 100 + '%').replace(/(\d)(\%)/, '$1')) / 100), 1)
                    }
                  })
                }),
                t
              )
            })(),
            M = (function (t) {
              function e(e) {
                var n = t.call(this, e) || this
                return (n.angle = 0), e.hasOwnProperty('angle') && 'number' == typeof e.angle && (n.angle = e.angle), n
              }
              return (
                n(e, t),
                (e.prototype.caculateGredientCoordinate = function (t, e) {
                  var n,
                    r,
                    i = this.angle % 360
                  if ((i < 0 && (i += 360), i <= 45))
                    (n = {
                      x: 0,
                      y: e / 2 + (o = (t / 2) * Math.tan((i * Math.PI) / 180))
                    }),
                      (r = {
                        x: t,
                        y: e / 2 - o
                      })
                  else if (i < 90)
                    (n = {
                      x: t / 2 - (o = e / 2 / Math.tan((i * Math.PI) / 180)),
                      y: e
                    }),
                      (r = {
                        x: t / 2 + o,
                        y: 0
                      })
                  else if (90 === i)
                    (n = {
                      x: t / 2,
                      y: e
                    }),
                      (r = {
                        x: t / 2,
                        y: 0
                      })
                  else if (i <= 135)
                    (n = {
                      x: t / 2 + (o = (e / 2) * Math.tan(((i - 90) * Math.PI) / 180)),
                      y: e
                    }),
                      (r = {
                        x: t / 2 - o,
                        y: 0
                      })
                  else if (i < 180)
                    (n = {
                      x: t,
                      y: e / 2 + (o = t / 2 / Math.tan(((i - 90) * Math.PI) / 180))
                    }),
                      (r = {
                        x: 0,
                        y: e / 2 - o
                      })
                  else if (180 === i)
                    (n = {
                      x: t,
                      y: e / 2
                    }),
                      (r = {
                        x: 0,
                        y: e / 2
                      })
                  else if (i <= 225)
                    (n = {
                      x: t,
                      y: e / 2 - (o = (t / 2) * Math.tan(((i - 180) * Math.PI) / 180))
                    }),
                      (r = {
                        x: 0,
                        y: e / 2 + o
                      })
                  else if (i <= 270)
                    (n = {
                      x: t / 2 + (o = (e / 2) * Math.tan(((270 - i) * Math.PI) / 180)),
                      y: 0
                    }),
                      (r = {
                        x: t / 2 - o,
                        y: e
                      })
                  else if (270 === i)
                    (n = {
                      x: t / 2,
                      y: 0
                    }),
                      (r = {
                        x: t / 2,
                        y: e
                      })
                  else if (i <= 315)
                    (n = {
                      x: t / 2 - (o = e / 2 / Math.tan(((360 - i) * Math.PI) / 180)),
                      y: 0
                    }),
                      (r = {
                        x: t / 2 + o,
                        y: e
                      })
                  else {
                    var o
                    ;(n = {
                      x: 0,
                      y: e / 2 - (o = (t / 2) * Math.tan(((360 - i) * Math.PI) / 180))
                    }),
                      (r = {
                        x: t,
                        y: e / 2 + o
                      })
                  }
                  return [n, r]
                }),
                (e.prototype.getGradient = function (t, e) {
                  for (
                    var n = e.width, r = e.height, i = this.caculateGredientCoordinate(n, r), o = i[0], a = i[1], s = t.createLinearGradient(o.x, o.y, a.x, a.y), l = 0, h = this.colorArray;
                    l < h.length;
                    l++
                  ) {
                    var u = h[l]
                    s.addColorStop(u.stop, u.color)
                  }
                  return s
                }),
                e
              )
            })(L),
            P = (function (t) {
              function e(e) {
                var n = t.call(this, e) || this
                return (n.start = e.start), (n.end = e.end), n
              }
              return (
                n(e, t),
                (e.prototype.getGradient = function (t) {
                  for (var e = t.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y), n = 0, r = this.colorArray; n < r.length; n++) {
                    var i = r[n]
                    e.addColorStop(i.stop, i.color)
                  }
                  return e
                }),
                e
              )
            })(L),
            A = (function (t) {
              function e(e) {
                var n = t.call(this, e) || this
                return (
                  (n.type = 'RadialGradient'),
                  (n.start = e.start || {
                    x: 0,
                    y: 0,
                    radius: 0
                  }),
                  (n.end = e.end || n.start),
                  n
                )
              }
              return (
                n(e, t),
                (e.prototype.getGradient = function (t) {
                  for (
                    var e,
                      n,
                      r = t.createRadialGradient(
                        this.start.x,
                        this.start.y,
                        this.start.radius,
                        this.end.x,
                        null === (e = this.end) || void 0 === e ? void 0 : e.y,
                        null === (n = this.end) || void 0 === n ? void 0 : n.radius
                      ),
                      i = 0,
                      o = this.colorArray;
                    i < o.length;
                    i++
                  ) {
                    var a = o[i]
                    r.addColorStop(a.stop, a.color)
                  }
                  return r
                }),
                e
              )
            })(L),
            T = {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
              border: '0px solid rgba(0,0,0,0)',
              borderRadius: 0
            },
            S = (function (t) {
              function e(e) {
                var n = t.call(this, Object.assign({}, T, e)) || this
                ;(n._borderWidth = 0), (n._borderRadius = []), (n.type = 'Rect')
                var r = Object.assign({}, T, e),
                  i = (r.border || '0px solid rgba(0,0,0,0)').split(' '),
                  o = i[0],
                  a = i[1],
                  s = i[2]
                if (!['solid'].includes(a)) throw Error('borderStyle must be "solid"')
                return (
                  (n.borderWidth = Number(o.replace('px', ''))),
                  (n.borderColor = s),
                  (n.borderStyle = a),
                  (n.borderRadius = r.borderRadius || 0),
                  (n.fill = r.fill),
                  (n.width = r.width),
                  (n.height = r.height),
                  n
                )
              }
              return (
                n(e, t),
                Object.defineProperty(e.prototype, 'width', {
                  get: function get() {
                    return this._width * this.transform.scale.x
                  },
                  set: function set(t) {
                    this._width = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(e.prototype, 'height', {
                  get: function get() {
                    return this._height * this.transform.scale.y
                  },
                  set: function set(t) {
                    this._height = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(e.prototype, 'borderRadius', {
                  get: function get() {
                    return this._borderRadius
                  },
                  set: function set(t) {
                    this._borderRadius = this.formatBorderRadius(t)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(e.prototype, 'borderColor', {
                  get: function get() {
                    return this._borderColor || ''
                  },
                  set: function set(t) {
                    this._borderColor = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(e.prototype, 'borderWidth', {
                  get: function get() {
                    return this._borderWidth
                  },
                  set: function set(t) {
                    Number(t) != Number(t) ? (this._borderWidth = Number(t.replace('px', ''))) : (this._borderWidth = t)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(e.prototype, 'fill', {
                  get: function get() {
                    return this._fill
                  },
                  set: function set(t) {
                    this._fill = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (e.prototype.formatBorderRadius = function (t) {
                  var e = []
                  return 'number' == typeof t && t >= 0 ? (e = [t, t, t, t]) : Array.isArray(t) && (e = 2 === t.length ? [t[0], t[1], t[0], t[1]] : 3 === e.length ? [t[0], t[1], t[2], t[1]] : t), e
                }),
                (e.prototype.getRectArgs = function () {
                  return {
                    rectX: 0 + this.borderWidth / 2,
                    rectY: 0 + this.borderWidth / 2,
                    rectWidth: this._width - this.borderWidth,
                    rectHeight: this._height - this.borderWidth
                  }
                }),
                (e.prototype.renderRoundRect = function (t) {
                  var e = this.getRectArgs(),
                    n = e.rectX,
                    r = e.rectY,
                    i = e.rectWidth,
                    o = e.rectHeight
                  try {
                    t.roundRect(n, r, i, o, this.borderRadius), (t.fillStyle = this.getFillStyle(t)), t.fill()
                  } catch (e) {
                    //                     e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    var a = this.borderRadius,
                      s = a[0],
                      l = a[1],
                      h = a[2],
                      u = a[3]
                    t.arc(n + s, r + s, s, Math.PI, 1.5 * Math.PI),
                      t.lineTo(n + (i - s - l), r),
                      t.arc(n + i - l, r + l, l, 1.5 * Math.PI, 2 * Math.PI),
                      t.lineTo(n + i, r + (o - l - h)),
                      t.arc(n + i - h, r + o - h, h, 0, 0.5 * Math.PI),
                      t.lineTo(n + u, r + o),
                      t.arc(n + u, r + o - u, u, 0.5 * Math.PI, Math.PI),
                      t.lineTo(n, r + s),
                      t.closePath(),
                      (t.fillStyle = this.getFillStyle(t)),
                      t.fill()
                  }
                }),
                (e.prototype.getFillStyle = function (t) {
                  var e = this.getRectArgs(),
                    n = e.rectWidth,
                    r = e.rectHeight
                  if (void 0 === this.fill) return 'transparent'
                  if ('string' == typeof this.fill) return this.fill
                  if (this._grd) return this._grd
                  if (this.fill instanceof M)
                    this._grd = this.fill.getGradient(t, {
                      width: n,
                      height: r
                    })
                  else {
                    if (!(this.fill instanceof P || this.fill instanceof A)) throw Error('Error：未支持的渐变')
                    this._grd = this.fill.getGradient(t)
                  }
                  return this._grd
                }),
                (e.prototype.renderer = function (t) {
                  ;(t.strokeStyle = this.borderColor), (t.lineWidth = this.borderWidth), t.beginPath(), this.renderRoundRect(t), t.stroke()
                }),
                e
              )
            })(b),
            k = (function (t) {
              function e(e) {
                void 0 === e && (e = {})
                var n = t.call(this, e) || this
                return (
                  (n.type = 'Layer'),
                  (n.children = []),
                  (n.clear = function () {
                    for (var t = 0, e = n.children; t < e.length; t++) e[t].parent = void 0
                    n.children = []
                  }),
                  n
                )
              }
              return (
                n(e, t),
                (e.prototype.addChild = function (t) {
                  var e = t
                  Array.isArray(t) || (e = [t])
                  for (var n = 0, i = e; n < i.length; n++) {
                    var o = i[n]
                    o.parent && o.parent.removeChild(o), (o.parent = this)
                  }
                  return (this.children = r(r([], this.children), e)), this
                }),
                (e.prototype.removeChild = function (t) {
                  var e = this.children.findIndex(function (e) {
                    return e.name === t.name
                  })
                  return e >= 0 && ((this.children[e].parent = void 0), this.children.splice(e, 1)), this
                }),
                (e.prototype.updateTransform = function () {
                  this.transform.updateLocalTransform()
                  for (var t = 0, e = this.children; t < e.length; t++) {
                    var n = e[t]
                    n.visible && n.updateTransform()
                  }
                }),
                (e.prototype.destroy = function () {
                  this.lifeCycleHook('willDestroy'), this.parent && this.parent.removeChild(this), (this.transform = null), (this.parent = void 0), (this._destroyed = !0)
                  for (var t = 0, e = this.children; t < e.length; t++) {
                    var n = e[t]
                    this.removeChild(n), n.destroy()
                  }
                  this.lifeCycleHook('didDestroy')
                }),
                (e.prototype.renderer = function (t) {
                  for (var e = 0, n = this.children; e < n.length; e++) {
                    var r = n[e]
                    r.visible && r.render(t)
                  }
                }),
                e
              )
            })(b),
            O = (function (t) {
              function e(e) {
                var n = t.call(this, e) || this
                return (
                  (n.type = 'Text'),
                  (n.textInfo = null),
                  (n.text = e.text),
                  (n.color = e.color || '#000'),
                  (n.fontFamily = e.fontFamily || 'arial,x-locale-body,sans-serif'),
                  (n.fontSize = e.fontSize || 12),
                  (n.textAlign = e.textAlign || 'left'),
                  (n.textBaseline = e.textBaseline || 'top'),
                  (n.direction = e.direction || 'inherit'),
                  (n.lineHeight = 'number' == typeof e.lineHeight ? e.lineHeight : n.fontSize),
                  n
                )
              }
              return (
                n(e, t),
                Object.defineProperty(e.prototype, 'width', {
                  get: function get() {
                    if (this._width) return this._width
                    for (var t = 0, e = 0, n = this.text.split('\n'); e < n.length; e++) {
                      var r = n[e]
                      t = Math.max(r.split('').length * this.fontSize, t)
                    }
                    return t
                  },
                  set: function set(t) {
                    this._width = t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(e.prototype, 'height', {
                  get: function get() {
                    return this.text.split('\n').length * this.lineHeight
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(e.prototype, 'left', {
                  get: function get() {
                    return 'center' === this.textAlign ? this.x - this.width / 2 : ['end', 'right'].includes(this.textAlign) ? this.x - this.width : this.x
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (e.prototype.renderer = function (t) {
                  ;(t.font = this.fontSize + "px '" + this.fontFamily + "'"), (t.textAlign = this.textAlign), (t.textBaseline = this.textBaseline), (t.fillStyle = this.color)
                  for (var e = 0, n = 0, r = 0, i = this.text.split('\n'); r < i.length; r++) {
                    var o = i[r]
                    t.fillText(o, 0, e * this.lineHeight), (n = Math.max(n, t.measureText(o).width)), e++
                  }
                  this.width = n
                }),
                e
              )
            })(b),
            D = {
              a: 7,
              c: 6,
              h: 1,
              l: 2,
              m: 2,
              q: 4,
              s: 4,
              t: 2,
              v: 1,
              z: 0
            },
            j = /([astvzqmhlc])([^astvzqmhlc]*)/gi
          function G(t) {
            var e,
              n = []
            return (
              null === (e = t.match(j)) ||
                void 0 === e ||
                e.map(function (t) {
                  var e = t.replace(j, '$1'),
                    i = e.toLowerCase(),
                    o = (function (t) {
                      var e = t.match(B)
                      return e ? e.map(Number) : []
                    })(t.replace(j, '$2'))
                  if (('m' == i && o.length > 2 && (n.push(r([e], o.splice(0, 2))), (i = 'l'), (e = 'm' == e ? 'l' : 'L')), o.length == D[i])) return n.push(r([e], o)), ''
                  if (o.length < D[i]) throw new Error('malformed path data')
                  n.push(r([e], o.splice(0, D[i])))
                }),
              n
            )
          }
          var B = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi,
            z = 2 * Math.PI
          function I(t, e, n, r) {
            var i = t * n + e * r
            return i > 1 && (i = 1), i < -1 && (i = -1), (t * r - e * n < 0 ? -1 : 1) * Math.acos(i)
          }
          function Z(t, e) {
            var n = (4 / 3) * Math.tan(e / 4),
              r = Math.cos(t),
              i = Math.sin(t),
              o = Math.cos(t + e),
              a = Math.sin(t + e)
            return [r, i, r - i * n, i + r * n, o + a * n, a - o * n, o, a]
          }
          function K(t, e, n, r, i, o, a, s, l) {
            var h = Math.sin((l * z) / 360),
              u = Math.cos((l * z) / 360),
              c = (u * (t - n)) / 2 + (h * (e - r)) / 2,
              f = (-h * (t - n)) / 2 + (u * (e - r)) / 2
            if (0 === c && 0 === f) return []
            if (0 === a || 0 === s) return []
            ;(a = Math.abs(a)), (s = Math.abs(s))
            var d = (c * c) / (a * a) + (f * f) / (s * s)
            d > 1 && ((a *= Math.sqrt(d)), (s *= Math.sqrt(d)))
            var p = (function (t, e, n, r, i, o, a, s, l, h) {
                var u = (h * (t - n)) / 2 + (l * (e - r)) / 2,
                  c = (-l * (t - n)) / 2 + (h * (e - r)) / 2,
                  f = a * a,
                  d = s * s,
                  p = u * u,
                  y = c * c,
                  g = f * d - f * y - d * p
                g < 0 && (g = 0), (g /= f * y + d * p)
                var _ = (((g = Math.sqrt(g) * (i === o ? -1 : 1)) * a) / s) * c,
                  m = ((g * -s) / a) * u,
                  b = h * _ - l * m + (t + n) / 2,
                  v = l * _ + h * m + (e + r) / 2,
                  x = (u - _) / a,
                  C = (c - m) / s,
                  w = (-u - _) / a,
                  L = (-c - m) / s,
                  M = I(1, 0, x, C),
                  P = I(x, C, w, L)
                return 0 === o && P > 0 && (P -= z), 1 === o && P < 0 && (P += z), [b, v, M, P]
              })(t, e, n, r, i, o, a, s, h, u),
              y = [],
              g = p[2],
              _ = p[3],
              m = Math.max(Math.ceil(Math.abs(_) / (z / 4)), 1)
            _ /= m
            for (var b = 0; b < m; b++) y.push(Z(g, _)), (g += _)
            return y.map(function (t) {
              for (var e = 0; e < t.length; e += 2) {
                var n = t[e + 0],
                  r = t[e + 1],
                  i = u * (n *= a) - h * (r *= s),
                  o = h * n + u * r
                ;(t[e + 0] = i + p[0]), (t[e + 1] = o + p[1])
              }
              return t
            })
          }
          function R(t, e, n, r) {
            return ['C', t, e, n, r, n, r]
          }
          function F(t, e, n, r, i, o) {
            return ['C', t / 3 + (2 / 3) * n, e / 3 + (2 / 3) * r, i / 3 + (2 / 3) * n, o / 3 + (2 / 3) * r, i, o]
          }
          var E = (function () {
              function t(t) {
                if (((this.savedPaths = []), !('string' == typeof (e = t) && ((e = e.trim()), /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(e) && /[\dz]$/i.test(e) && e.length > 4))))
                  throw new Error('Not an SVG path!')
                var e, n, r, i, o, a
                ;(this.initialPath =
                  ((n = G(t)),
                  (r = 0),
                  (i = 0),
                  (o = 0),
                  (a = 0),
                  n.map(function (t) {
                    var e = (t = t.slice())[0],
                      n = e.toUpperCase()
                    if (e != n)
                      switch (((t[0] = n), e)) {
                        case 'a':
                          ;(t[6] += o), (t[7] += a)
                          break
                        case 'v':
                          t[1] += a
                          break
                        case 'h':
                          t[1] += o
                          break
                        default:
                          for (var s = 1; s < t.length; ) (t[s++] += o), (t[s++] += a)
                      }
                    switch (n) {
                      case 'Z':
                        ;(o = r), (a = i)
                        break
                      case 'H':
                        o = t[1]
                        break
                      case 'V':
                        a = t[1]
                        break
                      case 'M':
                        ;(o = r = t[1]), (a = i = t[2])
                        break
                      default:
                        ;(o = t[t.length - 2]), (a = t[t.length - 1])
                    }
                    return t
                  }))),
                  (this._path = (function (t) {
                    for (var e, n = [], r = 0, i = 0, o = 0, a = 0, s = 0, l = 0, h = 0, u = 0, c = 0, f = t.length; c < f; c++) {
                      var d = t[c],
                        p = d[0]
                      switch (p) {
                        case 'M':
                          ;(o = d[1]), (a = d[2])
                          break
                        case 'A':
                          var y = K(h, u, d[6], d[7], d[4], d[5], d[1], d[2], d[3])
                          if (!y.length) continue
                          for (
                            var g = y.map(function (t) {
                                return (
                                  t[0],
                                  t[1],
                                  {
                                    x1: t[2],
                                    y1: t[3],
                                    x2: t[4],
                                    y2: t[5],
                                    x: t[6],
                                    y: t[7]
                                  }
                                )
                              }),
                              _ = 0;
                            _ < g.length;
                            _++
                          ) {
                            var m = g[_]
                            ;(d = ['C', m.x1, m.y1, m.x2, m.y2, m.x, m.y]), _ < g.length - 1 && n.push(d)
                          }
                          break
                        case 'S':
                          var b = h,
                            v = u
                          ;('C' != e && 'S' != e) || ((b += b - r), (v += v - i)), (d = ['C', b, v, d[1], d[2], d[3], d[4]])
                          break
                        case 'T':
                          'Q' == e || 'T' == e ? ((s = 2 * h - s), (l = 2 * u - l)) : ((s = h), (l = u)), (d = F(h, u, s, l, d[1], d[2]))
                          break
                        case 'Q':
                          ;(s = d[1]), (l = d[2]), (d = F(h, u, d[1], d[2], d[3], d[4]))
                          break
                        case 'L':
                          d = R(h, u, d[1], d[2])
                          break
                        case 'H':
                          d = R(h, u, d[1], u)
                          break
                        case 'V':
                          d = R(h, u, h, d[1])
                          break
                        case 'Z':
                          d = R(h, u, o, a)
                      }
                      ;(e = p), (h = d[d.length - 2]), (u = d[d.length - 1]), d.length > 4 ? ((r = d[d.length - 4]), (i = d[d.length - 3])) : ((r = h), (i = u)), n.push(d)
                    }
                    return n
                  })(this.initialPath)),
                  (this.beginPath = !1),
                  (this._bounds = null)
              }
              return (
                Object.defineProperty(t.prototype, 'bounds', {
                  get: function get() {
                    if (!this._bounds) {
                      var t = this.path
                      if (((this._bounds = [0, 0, 0, 0]), t.length)) {
                        for (var e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], n = 0, r = t.length; n < r; n++)
                          for (var i = t[n].slice(1), o = 0; o < i.length; o += 2)
                            i[o + 0] < e[0] && (e[0] = i[o + 0]), i[o + 1] < e[1] && (e[1] = i[o + 1]), i[o + 0] > e[2] && (e[2] = i[o + 0]), i[o + 1] > e[3] && (e[3] = i[o + 1])
                        this._bounds = e
                      }
                    }
                    return this._bounds
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'size', {
                  get: function get() {
                    var t = this.bounds
                    return [t[2] - t[0], t[3] - t[1]]
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'center', {
                  get: function get() {
                    var t = this.bounds,
                      e = t[0],
                      n = t[1]
                    return [(e + t[2]) / 2, (n + t[3]) / 2]
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'd', {
                  get: function get() {
                    var t = this.path
                      .map(function (t) {
                        return t[0] + t.slice(1).join()
                      })
                      .join('')
                    return this.isClosed && (t += 'Z'), t
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'path', {
                  get: function get() {
                    return this._path
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(t.prototype, 'isClosed', {
                  get: function get() {
                    var t = this.initialPath[this.initialPath.length - 1]
                    return t && 'Z' === t[0]
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (t.prototype.render = function (t, e, n) {
                  var r = this
                  void 0 === e && (e = this.size[0]), void 0 === n && (n = this.size[1])
                  var i = this.path
                  i.length &&
                    (t.beginPath(),
                    i.forEach(function (i) {
                      for (var o = i[0], a = i.slice(1), s = [], l = 0; l < a.length / 2; l++)
                        (s[2 * l] = 0 !== e ? (Number(a[2 * l]) / r.size[0]) * e : a[2 * l]), (s[2 * l + 1] = 0 !== n ? (Number(a[2 * l + 1]) / r.size[1]) * n : a[2 * l + 1])
                      'M' === o ? t.moveTo.apply(t, s) : t.bezierCurveTo.apply(t, s)
                    }),
                    this.isClosed && t.closePath())
                }),
                t
              )
            })(),
            W = (function (t) {
              function e(e) {
                var n = t.call(this, e) || this
                ;(n.lineStyle = 'solid'), (n.type = 'Polygon'), (n._lineJoin = 'round'), (n._lineCap = 'butt'), (n.closePath = !!e.hasOwnProperty('closePath') && !!e.closePath), (n.path = e.path)
                var r = e.path
                return (
                  'string' != typeof e.path && (r = n.formatPointsToPath(e.path, n.closePath)),
                  (n._svgPath = new E(r)),
                  (n.lineWidth = e.lineWidth || 2),
                  (n.lineColor = e.lineColor || '#fff'),
                  (n.fill = e.fill || 'rgba(0,0,0,0)'),
                  (n.lineJoin = e.lineJoin || 'round'),
                  (n.lineCap = e.lineCap || 'butt'),
                  'dashed' === e.lineStyle && ((n.lineStyle = e.lineStyle), (n.lineJoin = 'miter'), (n.lineCap = 'butt')),
                  e.dashSetting ? (n.dashSetting = e.dashSetting) : (n.dashSetting = [n.lineWidth, n.lineWidth]),
                  n
                )
              }
              return (
                n(e, t),
                Object.defineProperty(e.prototype, 'lineJoin', {
                  get: function get() {
                    return this._lineJoin
                  },
                  set: function set(t) {
                    'dashed' !== this.lineStyle && (this._lineJoin = t)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                Object.defineProperty(e.prototype, 'lineCap', {
                  get: function get() {
                    return this._lineCap
                  },
                  set: function set(t) {
                    'dashed' !== this.lineStyle && (this._lineCap = t)
                  },
                  enumerable: !1,
                  configurable: !0
                }),
                (e.prototype.formatPointsToPath = function (t, e) {
                  for (var n = 'M ' + t[0].x + ' ' + t[0].y, r = 1; r < t.length; r++) n += 'L ' + t[r].x + ' ' + t[r].y
                  return e && (n += ' Z'), n
                }),
                (e.prototype.getColor = function (t, e) {
                  var n = this[e]
                  if (n instanceof L) {
                    if (!this['_' + e + 'Grd'])
                      if (n instanceof M)
                        this['_' + e + 'Grd'] = n.getGradient(t, {
                          width: this._svgPath.bounds[2] - this._svgPath.bounds[0],
                          height: this._svgPath.bounds[3] - this._svgPath.bounds[1]
                        })
                      else {
                        if (!(n instanceof P || n instanceof A)) throw Error('Error：未支持的渐变')
                        this['_' + e + 'Grd'] = n.getGradient(t)
                      }
                    return this['_' + e + 'Grd']
                  }
                  return n || 'transparent'
                }),
                (e.prototype.renderer = function (t) {
                  this._svgPath.render(t, this.width, this.height),
                    (t.lineWidth = this.lineWidth),
                    (t.lineCap = this.lineCap),
                    (t.lineJoin = this.lineJoin),
                    (t.strokeStyle = this.getColor(t, 'lineColor')),
                    'dashed' === this.lineStyle && t.setLineDash(this.dashSetting),
                    this.fill && ((t.fillStyle = this.getColor(t, 'fill')), t.fill()),
                    t.stroke()
                }),
                e
              )
            })(b),
            H = {
              Circle: (function () {
                function t(e, n, r) {
                  void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), (this.type = t.TYPE), (this.x = e), (this.y = n), (this.radius = r)
                }
                return (
                  (t.prototype.clone = function () {
                    return new t(this.x, this.y, this.radius)
                  }),
                  (t.prototype.contains = function (t, e) {
                    if (this.radius <= 0) return !1
                    var n = this.radius * this.radius,
                      r = this.x - t,
                      i = this.y - e
                    return (r *= r) + (i *= i) <= n
                  }),
                  (t.prototype.getBounds = function () {
                    return new i(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
                  }),
                  (t.prototype.toString = function () {
                    return '[@/utils/@milimu/math:Circle x=' + this.x + ' y=' + this.y + ' radius=' + this.radius + ']'
                  }),
                  (t.TYPE = 'circle'),
                  t
                )
              })(),
              Rectangle: i
            }
          ;(t.AngleGradient = M),
            (t.Application = m),
            (t.Arc = w),
            (t.Layer = k),
            (t.LinearGradient = P),
            (t.Node = b),
            (t.ObservablePoint = l),
            (t.Point = s),
            (t.Polygon = W),
            (t.RadialGradient = A),
            (t.Rect = S),
            (t.Sprite = x),
            (t.Text = O),
            (t.shape = H)
        })(e)
      })(0, o.exports)
      var a = (function () {
          function t(t) {
            var a = this
            ;(this.currentFocusArea = {
              x: 0,
              y: 0,
              width: -1,
              height: -1
            }),
              (this.callback = {}),
              (this.animations = []),
              (this.init = function (t, i) {
                return n(a, void 0, void 0, function () {
                  var n, a, s, l, h
                  return r(this, function (r) {
                    switch (r.label) {
                      case 0:
                        return this.callLifeCycle('start'), (n = t), 'string' != typeof t ? [3, 2] : [4, this.loadImage(t)]
                      case 1:
                        ;(n = r.sent()), (r.label = 2)
                      case 2:
                        return (
                          (n.name = 'faceSprite'),
                          (a = new o.exports.Layer({
                            name: 'mask'
                          }).addChild([
                            new o.exports.Rect(
                              _e2(
                                _e2(
                                  {
                                    x: 0,
                                    y: 0
                                  },
                                  this.deviceSize
                                ),
                                {
                                  fill: i
                                }
                              )
                            )
                          ])),
                          (s = new o.exports.Layer({
                            name: 'faceSpriteLayer'
                          }).addChild(n)),
                          (l = new o.exports.Layer({
                            name: 'animationHelper',
                            width: n.width,
                            height: n.height
                          })),
                          (h = new o.exports.Layer({
                            name: 'animationLayer',
                            width: this.deviceSize.width,
                            height: this.deviceSize.height
                          })),
                          this.app.addChild([s, a, l, h]),
                          this.app.render(),
                          this.callLifeCycle('initialized'),
                          [2, this]
                        )
                    }
                  })
                })
              }),
              (this.fitSpriteToDevice = function () {
                var t = a.app.findNode('faceSprite'),
                  n = _e2(_e2({}, a.deviceSize), {
                    x: 0,
                    y: 0
                  }),
                  r = t.width,
                  i = t.height,
                  o = Math.min(n.width / r, n.height / i),
                  s = {
                    x: (n.width - r * o) / 2,
                    y: (n.height - i * o) / 2
                  }
                console.log(o, s), a.app.findNode('faceSpriteLayer').setScale(o).setTranslate(s), a.app.findNode('animationHelper').setScale(o).setTranslate(s), a.app.render()
              }),
              (this.loadImage = function (t) {
                var e = new Image(),
                  n = new Promise(function (t, n) {
                    ;(e.onload = function () {
                      var n = new o.exports.Sprite({
                        width: e.width,
                        height: e.height,
                        image: e
                      })
                      t(n)
                    }),
                      (e.onerror = n)
                  })
                return (e.src = t), (e.crossOrigin = 'true'), n
              }),
              (this.destroy = function () {
                var t = a.animations
                ;(a.animations = []),
                  t.map(function (t) {
                    var e
                    return null === (e = t.tl) || void 0 === e ? void 0 : e.destroy()
                  }),
                  a.app.destroy()
              }),
              (this.playIndex = function (t, e) {
                var n = a.initialAnimation(a.animations[t])
                return (
                  n
                    .on('end', function () {
                      n.layer.clear(),
                        a.callLifeCycle('animationEnd', {
                          animation: n,
                          index: t
                        }),
                        e()
                    })
                    .setup(),
                  a
                )
              }),
              (this.play = function (t) {
                if ((void 0 === t && (t = 0), !a.animations[t])) return a.callLifeCycle('end'), a
                var e = a.initialAnimation(a.animations[t])
                return (
                  e
                    .on('end', function () {
                      e.layer.clear(),
                        a.callLifeCycle('animationEnd', {
                          animation: e,
                          index: t
                        }),
                        a.play(t + 1)
                    })
                    .setup(),
                  a
                )
              }),
              (this.callLifeCycle = function (t, e) {
                var n
                null === (n = a.callback[t]) ||
                  void 0 === n ||
                  n.map(function (t) {
                    return t(a, e)
                  })
              }),
              (this.on = function (t, e) {
                var n
                return a.callback[t] || (a.callback[t] = []), null === (n = a.callback[t]) || void 0 === n || n.push(e), a
              }),
              (this.calcFaceArea = function (t, e) {
                void 0 === e && (e = 1)
                var n = a.app.findNode('animationHelper')
                n.setScale(1).setRotate(-a.headpose.roll_angle).setTranslate({
                  x: 0,
                  y: 0
                })
                for (var r = 1 / 0, i = 1 / 0, o = -1 / 0, s = -1 / 0, l = 0, h = t; l < h.length; l++) {
                  var u = h[l],
                    c = n.toGlobal(u),
                    f = c.x,
                    d = c.y
                  ;(r = Math.min(f, r)), (i = Math.min(d, i)), (o = Math.max(f, o)), (s = Math.max(d, s))
                }
                var p = Math.abs(o - r) * e,
                  y = Math.abs(s - i) * e
                return (
                  n.setRotate(0),
                  {
                    x: r,
                    y: i,
                    width: p,
                    height: y
                  }
                )
              }),
              (this.syncTransformToHelperLayer = function (t, e) {
                var n = a.calcFaceArea(t, e.scaleRatio)
                console.log(n, 'faceArea', t)
                var r = e.displayArea || a.defaultDisplayArea,
                  i = a.app.findNode('animationHelper'),
                  o = Math.min(r.width / n.width, r.height / n.height)
                i.setScale(o).setRotate(-a.headpose.roll_angle)
                var s = {
                  x: n.x * o,
                  y: n.y * o
                }
                return (
                  i.setTranslate({
                    x: r.x - s.x,
                    y: r.y - s.y
                  }),
                  {
                    ratio: o,
                    translation: s,
                    rotate: i.rotation,
                    faceArea: n,
                    deviceDisplayArea: r
                  }
                )
              }),
              (this.initialAnimation = function (t) {
                var e = new i.exports.Timeline({
                  renderer: a.app.render
                })
                return (
                  (t.calcFaceArea = function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
                    return a.calcFaceArea.apply(a, t)
                  }),
                  (t.getFocusTrack = function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
                    return a.getFocusTrack.apply(a, t)
                  }),
                  (t.getFromController = function (t) {
                    return a[t]
                  }),
                  (t.layer = a.app.findNode('animationLayer')),
                  (t.faceSprite = a.app.findNode('animationHelper')),
                  (t.tl = e),
                  t
                )
              }),
              t.engine && (i.exports.Timeline.engine = t.engine),
              t.loadImage && (this.loadImage = t.loadImage),
              (this.app = t.app),
              (this.deviceSize = t.deviceSize),
              (this.landmark = t.landmark),
              (this.headpose = t.headpose),
              (this.faceRectangle = t.faceRectangle),
              (this.defaultDisplayArea = t.defaultDisplayArea || {
                x: 0.2 * this.deviceSize.width,
                y: 0.2 * this.deviceSize.height,
                width: 0.6 * this.deviceSize.width,
                height: 0.6 * this.deviceSize.height
              })
          }
          return (
            (t.prototype.addAniamtion = function (t) {
              return this.animations.push(t), this
            }),
            (t.prototype.addAniamtions = function (t) {
              return (this.animations = this.animations.concat(t)), this
            }),
            (t.prototype.removeAnimation = function (t) {
              var e
              if ('number' == typeof t) e = t
              else if (
                (e = this.animations.findIndex(function (e) {
                  return e === t
                })) < 0
              )
                return this
              return this.animations.splice(e, 1), this
            }),
            (t.prototype.getFocusTrack = function (t, n) {
              var r = this.app.findNode('faceSpriteLayer'),
                o = this.syncTransformToHelperLayer(
                  t,
                  _e2(
                    {
                      scaleRatio: 1
                    },
                    n
                  )
                ),
                a = o.ratio,
                s = o.translation,
                l = o.rotate,
                h = o.faceArea,
                u = o.deviceDisplayArea
              return (
                console.log(r.position, r.scale),
                new i.exports.Track('focus').add(
                  i.exports.createMotionTween({
                    target: {
                      scale: r.scale.x,
                      rotation: r.rotation,
                      translationX: r.position.x,
                      translationY: r.position.y
                    },
                    defaultEasing: i.exports.easings.linear(),
                    property: {
                      scale: a,
                      rotation: l,
                      translationX: u.x - s.x,
                      translationY: u.y - s.y
                    },
                    delay: n.delay,
                    duration: n.dura,
                    update: function update(t) {
                      for (var e = t.progress, n = 0, i = t.animations; n < i.length; n++) {
                        var o = i[n]
                        o.update({
                          progress: e
                        }),
                          'rotation' === o.property && r.setRotate(o.currentValue),
                          'translationX' === o.property && r.setTranslateX(o.currentValue),
                          'translationY' === o.property && r.setTranslateY(o.currentValue),
                          'scale' === o.property && r.setScale(o.currentValue)
                      }
                      e >= 1 && (this.currentFocusPart = h)
                    }
                  })
                )
              )
            }),
            t
          )
        })(),
        s = function s(t) {
          var e = this
          void 0 === t && (t = {}),
            (this.callbacks = {}),
            (this.layer = new o.exports.Layer()),
            (this.faceSprite = new o.exports.Layer()),
            (this.trackDelay = 0),
            (this.calcFaceArea = function (t, e) {
              return {
                x: 0,
                y: 0,
                width: -1,
                height: -1
              }
            }),
            (this.getFromController = function (t) {}),
            (this.getFocusTrack = function (t, e) {
              return new i.exports.Track('')
            }),
            (this.toGlobalByPosition = function (t) {
              return e.faceSprite.toGlobal(t)
            }),
            (this.toGlobalByKey = function (t) {
              return e.toGlobalByPosition(e.getFromController('landmark')[t])
            }),
            (this.setup = function () {
              if (e.tl) {
                e.beforeSetup()
                var t = e.focus.keys.map(function (t) {
                  return e.getFromController('landmark')[t]
                })
                e.isSameArea(e.getFromController('currentFocusArea'), e.calcFaceArea(t, e.focus.scaleRatio)) ||
                  (e.tl.add(e.getFocusTrack(t, e.focus)), (e.trackDelay = e.focus.duration + e.focus.delay)),
                  e.callLifeCycle('begin'),
                  (e.tl.callbacks.complete = function () {
                    e.callLifeCycle('end')
                  }),
                  e.run()
              } else console.warn('timeline 未定义')
            }),
            (this.isSameArea = function (t, e) {
              var n = t.x,
                r = t.y,
                i = t.width,
                o = t.height,
                a = e.x,
                s = e.y,
                l = e.width,
                h = e.height
              return a === n && s === r && l === i && h === o
            }),
            (this.on = function (t, n) {
              var r
              return e.callbacks[t] || (e.callbacks[t] = []), null === (r = e.callbacks[t]) || void 0 === r || r.push(n), e
            }),
            (this.callLifeCycle = function (t, n) {
              var r
              null === (r = e.callbacks[t]) ||
                void 0 === r ||
                r.map(function (t) {
                  return t(n)
                })
            }),
            (this.focus = Object.assign(
              {},
              {
                duration: 1e3,
                delay: 500,
                keys: [],
                scaleRatio: 1
              },
              t.focus
            ))
        }
      ;(t.Animation = s),
        (t.AnimationController = a),
        (t.defaultAnimationSetting = {
          endDelay: 0
        }),
        (t.defaultSpriteAniamteDelay = 500),
        (t.defaultSpriteAniamteDuration = 1e3)
    })(e)
  })(0, o.exports)
  var a = Object.assign(
      {},
      {
        maskColor: 'rgba(29, 12, 84, 0.35)',
        solidLineColor: 'rgba(255,255,255,.5)',
        dashedLineColor: 'rgba(255,255,255,.6)',
        shadeLineColor: 'rgba(255,255,255,.6)',
        skinShapeDefaultColor: '#fff',
        skinShapeThemeColor: '#D7ADFF',
        gradualLineColor: '#fff',
        themeColor: '#0091FF',
        strongPointColor: '#0091FF',
        textColor: '#fff',
        fontSize: 12,
        lineHeight: 12,
        lineWidth: 2,
        lineExtendLength: 50,
        triangleWidth: 7,
        triangleHeight: 7,
        dashSetting: [2, 2],
        pointSize: 8
      }
    ),
    s = {
      get: function get(t) {
        return a[t]
      },
      set: function set(t, e) {
        a[t] = e
      }
    },
    l = {
      exports: {}
    }
  function h(t, e, n) {
    var r = Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
    return 0 === r ? t : new l.exports.Point((n / r) * (e.x - t.x) + e.x, (n / r) * (e.y - t.y) + e.y)
  }
  function u(t, e, n) {
    return [h(t, e, n), h(e, t, n)]
  }
  function c(t, e) {
    if (void 0 === e) return t
    if ('object' != _typeof2(e) || 'object' != _typeof2(t)) return e
    if (Array.isArray(e)) {
      if (!Array.isArray(t)) return e
      for (var n in e) t[n] = c(t[n], e[n])
      return t
    }
    for (var r in e) t[r] = c(t[r], e[r])
    return t
  }
  !(function (t, e) {
    !(function (t) {
      /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.
               Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.
               THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
      var _e4 = function e(t, n) {
        return (
          (_e4 =
            Object.setPrototypeOf ||
            ({
              __proto__: []
            } instanceof Array &&
              function (t, e) {
                t.__proto__ = e
              }) ||
            function (t, e) {
              for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
            }),
          _e4(t, n)
        )
      }
      function n(t, n) {
        if ('function' != typeof n && null !== n) throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null')
        function r() {
          this.constructor = t
        }
        _e4(t, n), (t.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
      }
      function r(t, e, n) {
        if (n || 2 === arguments.length) for (var r, i = 0, o = e.length; i < o; i++) (!r && i in e) || (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]))
        return t.concat(r || Array.prototype.slice.call(e))
      }
      var i = (function () {
          function t(e, n, r, i) {
            void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), (this.type = t.TYPE), (this.x = e), (this.y = n), (this.width = r), (this.height = i)
          }
          return (
            Object.defineProperty(t.prototype, 'left', {
              get: function get() {
                return this.x
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'right', {
              get: function get() {
                return this.x + this.width
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'top', {
              get: function get() {
                return this.y
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'bottom', {
              get: function get() {
                return this.y + this.height
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t, 'empty', {
              get: function get() {
                return new t(0, 0, 0, 0)
              },
              enumerable: !1,
              configurable: !0
            }),
            (t.prototype.clone = function () {
              return new t(this.x, this.y, this.width, this.height)
            }),
            (t.prototype.copyFrom = function (t) {
              return (this.x = t.x), (this.y = t.y), (this.width = t.width), (this.height = t.height), this
            }),
            (t.prototype.copyTo = function (t) {
              return (t.x = this.x), (t.y = this.y), (t.width = this.width), (t.height = this.height), t
            }),
            (t.prototype.contains = function (t, e) {
              return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && e >= this.y && e <= this.y + this.height
            }),
            (t.prototype.toString = function () {
              return '[@/utils/@milimu/math:Rectangle x=' + this.x + ' y=' + this.y + ' width=' + this.width + ' height=' + this.height + ']'
            }),
            (t.TYPE = 'rectangle'),
            t
          )
        })(),
        o = (function () {
          function t() {
            this.nodes = {}
          }
          return (
            (t.prototype.has = function (t) {
              return !!this.nodes[t]
            }),
            (t.prototype.add = function (t) {
              t.name && (this.nodes[t.name] ? console.error('node name: ' + t.name + ' has been used') : (this.nodes[t.name] = t))
            }),
            (t.prototype.delete = function (t) {
              t.name && (this.nodes[t.name] ? (this.nodes[t.name] = void 0) : console.error('未创建该节点'))
            }),
            (t.prototype.clear = function () {
              this.nodes = {}
            }),
            t
          )
        })()
      function a(t, e) {
        var n = (e || 'node') + '_' + +new Date() + '_' + parseInt(String(1e7 * Math.random()))
        return t.has(n) ? a(t, e) : n
      }
      var s = (function () {
          function t(t, e) {
            ;(this.x = t), (this.y = e)
          }
          return (
            (t.prototype.set = function (t, e) {
              ;(this.x = t || this.x), (this.y = e || this.y)
            }),
            (t.prototype.clone = function () {
              return new t(this.x, this.y)
            }),
            t
          )
        })(),
        l = (function () {
          function t(t, e, n) {
            ;(this.cb = n), (this._x = t), (this._y = e)
          }
          return (
            Object.defineProperty(t.prototype, 'x', {
              get: function get() {
                return this._x
              },
              set: function set(t) {
                ;(this._x = t), this.cb && this.cb(new s(this._x, this._y))
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'y', {
              get: function get() {
                return this._y
              },
              set: function set(t) {
                ;(this._y = t), this.cb && this.cb(new s(this._x, this._y))
              },
              enumerable: !1,
              configurable: !0
            }),
            (t.prototype.set = function (t, e) {
              void 0 !== t && (this._x = t), void 0 !== e && (this._y = e), this.cb && this.cb(new s(this._x, this._y))
            }),
            (t.prototype.clone = function () {
              return new t(this.x, this.y, this.cb)
            }),
            t
          )
        })(),
        h = 'undefined' != typeof Float32Array ? Float32Array : Array,
        u = Math.PI / 180
      function c() {
        var t = new h(6)
        return h != Float32Array && ((t[1] = 0), (t[2] = 0), (t[4] = 0), (t[5] = 0)), (t[0] = 1), (t[3] = 1), t
      }
      function f(t, e, n) {
        var r = e[0],
          i = e[1],
          o = e[2],
          a = e[3],
          s = e[4],
          l = e[5],
          h = n[0],
          u = n[1]
        return (t[0] = r), (t[1] = i), (t[2] = o), (t[3] = a), (t[4] = r * h + o * u + s), (t[5] = i * h + a * u + l), t
      }
      function d() {
        var t = new h(2)
        return h != Float32Array && ((t[0] = 0), (t[1] = 0)), t
      }
      function p(t, e) {
        var n = new h(2)
        return (n[0] = t), (n[1] = e), n
      }
      function y(t, e, n) {
        var r = e[0],
          i = e[1]
        return (t[0] = n[0] * r + n[2] * i + n[4]), (t[1] = n[1] * r + n[3] * i + n[5]), t
      }
      Math.hypot ||
        (Math.hypot = function () {
          for (var t = 0, e = arguments.length; e--; ) t += arguments[e] * arguments[e]
          return Math.sqrt(t)
        }),
        d()
      var g,
        _ = (function () {
          function t() {
            ;(this.position = new l(0, 0, this.onChange.bind(this))),
              (this.origin = new l(0, 0, this.onChange.bind(this))),
              (this.scale = new l(1, 1, this.onChange.bind(this))),
              (this.skew = new l(0, 0, this.onChange.bind(this, 'position'))),
              (this.localTransform = c()),
              (this.worldTransform = c()),
              (this._rotation = 0),
              (this._localID = 0),
              (this._currentLocalID = 0),
              (this._worldID = 0),
              (this._parentID = 0)
          }
          return (
            Object.defineProperty(t.prototype, 'rotation', {
              get: function get() {
                return this._rotation
              },
              set: function set(t) {
                this._rotation !== t && ((this._rotation = t), this.onChange())
              },
              enumerable: !1,
              configurable: !0
            }),
            (t.prototype.onChange = function () {
              this._localID++
            }),
            (t.prototype.updateLocalTransform = function () {
              this._localID !== this._currentLocalID && ((this.localTransform = this.getCurrentMatrix()), (this._currentLocalID = this._localID), (this._parentID = -1))
            }),
            (t.prototype.updateTransform = function (t) {
              this.updateLocalTransform(), this._parentID !== t._worldID && ((this.worldTransform = this.getWorldTransform(t)), (this._parentID = t._worldID), this._worldID++)
            }),
            (t.prototype.getCurrentMatrix = function () {
              var t = this.scale,
                e = t.x,
                n = void 0 === e ? 1 : e,
                r = t.y,
                i = void 0 === r ? 1 : r,
                o = this.skew,
                a = o.x,
                s = void 0 === a ? 0 : a,
                l = o.y,
                d = void 0 === l ? 0 : l,
                y = this.position,
                g = y.x,
                _ = void 0 === g ? 0 : g,
                m = y.y,
                b = void 0 === m ? 0 : m,
                v = c(),
                x = c(),
                C = c(),
                w = c(),
                L = (function (t, e, n, r, i, o) {
                  var a = new h(6)
                  return (a[0] = t), (a[1] = e), (a[2] = n), (a[3] = r), (a[4] = i), (a[5] = o), a
                })(1, s, d, 1, _, b),
                M = p(this.origin.x, this.origin.y),
                P = p(-this.origin.x, -this.origin.y)
              return (
                f(C, L, M),
                (function (t, e, n) {
                  var r = e[0],
                    i = e[1],
                    o = e[2],
                    a = e[3],
                    s = e[4],
                    l = e[5],
                    h = Math.sin(n),
                    u = Math.cos(n)
                  ;(t[0] = r * u + o * h), (t[1] = i * u + a * h), (t[2] = r * -h + o * u), (t[3] = i * -h + a * u), (t[4] = s), (t[5] = l)
                })(
                  x,
                  C,
                  (function (t) {
                    return t * u
                  })(this.rotation)
                ),
                (function (t, e, n) {
                  var r = e[0],
                    i = e[1],
                    o = e[2],
                    a = e[3],
                    s = e[4],
                    l = e[5],
                    h = n[0],
                    u = n[1]
                  ;(t[0] = r * h), (t[1] = i * h), (t[2] = o * u), (t[3] = a * u), (t[4] = s), (t[5] = l)
                })(w, x, p(n, i)),
                f(v, w, P),
                v
              )
            }),
            (t.prototype.getLocalTransform = function () {
              var t,
                e,
                n = c(),
                r = p(-this.position.x, -this.position.y)
              return f(n, ((t = this.localTransform), ((e = new h(6))[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), (e[4] = t[4]), (e[5] = t[5]), e), r), n
            }),
            (t.prototype.getWorldTransform = function (t) {
              var e,
                n,
                r,
                i,
                o,
                a,
                s,
                l,
                h,
                u,
                f,
                d,
                p,
                y,
                g,
                _ = c()
              return (
                (e = _),
                (n = t.localTransform),
                (r = this.localTransform),
                (i = n[0]),
                (o = n[1]),
                (a = n[2]),
                (s = n[3]),
                (l = n[4]),
                (h = n[5]),
                (u = r[0]),
                (f = r[1]),
                (d = r[2]),
                (p = r[3]),
                (y = r[4]),
                (g = r[5]),
                (e[0] = i * u + a * f),
                (e[1] = o * u + s * f),
                (e[2] = i * d + a * p),
                (e[3] = o * d + s * p),
                (e[4] = i * y + a * g + l),
                (e[5] = o * y + s * g + h),
                _
              )
            }),
            t
          )
        })(),
        m = function m(t) {
          var e = this
          ;(this.isRoot = !0),
            (this.type = 'Application'),
            (this.worldAlpha = 1),
            (this.transform = new _()),
            (this.children = []),
            (this.root = this),
            (this.createName = function (t) {
              var n = (t || 'node') + '_' + +new Date() + '_' + parseInt(String(1e7 * Math.random()))
              return e.documents.has(n) ? a(e.documents, t) : n
            }),
            (this.findNode = function (t) {
              return e.documents.nodes[t]
            }),
            (this.addChild = function (t) {
              var n = t
              Array.isArray(t) || (n = [t])
              for (var i = 0, o = n; i < o.length; i++) {
                var a = o[i]
                a.parent && a.parent.removeChild(a), (a.parent = e)
              }
              return (e.children = r(r([], e.children), n)), e
            }),
            (this.removeChild = function (t) {
              var n = e.children.findIndex(function (e) {
                return e.name === t.name
              })
              return n >= 0 && ((e.children[n].parent = void 0), e.children.splice(n, 1)), e
            }),
            (this.clearChildren = function () {
              for (var t = 0, n = e.children; t < n.length; t++) {
                var r = n[t]
                e.removeChild(r), r.destroy()
              }
              return (e.children = []), e
            }),
            (this._recursivePostUpdateTransform = function () {}),
            (this.render = function () {
              e.ctx.clearRect(e.screen.x, e.screen.y, e.screen.width, e.screen.height)
              for (var t = 0, n = e.children; t < n.length; t++) n[t].render(e.ctx)
            }),
            (this.destroy = function () {
              ;(e.transform = null), e.clearChildren(), e.documents.clear()
            }),
            (this.ctx = t.canvas.getContext('2d')),
            (this.canvas = t.canvas)
          var n = t.devicePixelRatio || 1
          return (
            (this.devicePixelRatio = n),
            (this.canvas.width = t.width * n),
            (this.canvas.height = t.height * n),
            (this.canvas.style.width = t.width + 'px'),
            (this.canvas.style.height = t.height + 'px'),
            this.ctx.scale(n, n),
            (this.screen = new i(0, 0, t.width, t.height)),
            (this.documents = new o()),
            (this.name = this.createName(this.type)),
            this
          )
        }
      !(function (t) {
        ;(t[(t.wilMount = 0)] = 'wilMount'), (t[(t.didMount = 1)] = 'didMount'), (t[(t.rendering = 2)] = 'rendering')
      })(g || (g = {}))
      var b = (function () {
          function t(t) {
            ;(this.visible = !0),
              (this.alpha = 1),
              (this.transform = new _()),
              (this._worldAlpha = 1),
              (this._destroyed = !0),
              (this.rendered = g.wilMount),
              (this.__lifeCycle__ = {
                willMount: [
                  function (t) {
                    t.root &&
                      (t.name || (t.name = t.root.createName(t.type)), t.root.documents.has(t.name) ? ((t.visible = !1), console.warn('Application中存在同名元素：', t.name)) : t.root.documents.add(t))
                  }
                ],
                willDestroy: [
                  function (t) {
                    t.root && t.root.documents.delete(t)
                  }
                ]
              }),
              (this.name = t.name),
              (this._width = (null == t ? void 0 : t.width) || 0),
              (this._height = (null == t ? void 0 : t.height) || 0),
              this.transform.position.set(null == t ? void 0 : t.x, null == t ? void 0 : t.y),
              (this.tempDisplayObjectParent = null)
          }
          return (
            Object.defineProperty(t.prototype, 'worldTransform', {
              get: function get() {
                return this.transform.worldTransform
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'localTransform', {
              get: function get() {
                return this.transform.localTransform
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'width', {
              get: function get() {
                return this._width
              },
              set: function set(t) {
                this._width = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'height', {
              get: function get() {
                return this._height
              },
              set: function set(t) {
                this._height = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'scale', {
              get: function get() {
                return {
                  x: this.transform.scale.x,
                  y: this.transform.scale.y
                }
              },
              set: function set(t) {
                if ('number' == typeof t) this.transform.scale.set(t, t)
                else if (!t.hasOwnProperty('x') && !t.hasOwnProperty('y')) return
                this.transform.scale.set(t.x, t.y)
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'rotation', {
              get: function get() {
                return this.transform.rotation
              },
              set: function set(t) {
                this.transform.rotation = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'x', {
              get: function get() {
                return this.transform.position.x
              },
              set: function set(t) {
                this.transform.position.set(t)
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'y', {
              get: function get() {
                return this.transform.position.y
              },
              set: function set(t) {
                this.transform.position.set(this.x, t)
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'position', {
              get: function get() {
                return this.transform.position
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'transformOrigin', {
              get: function get() {
                var t = this.transform.origin.clone()
                return [t.x / this.width, t.y / this.height]
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'destroyed', {
              get: function get() {
                return this._destroyed
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'worldAlpha', {
              get: function get() {
                var t = this.alpha
                return this._parent && (t = this.alpha * this._parent.worldAlpha), (this._worldAlpha = t), t
              },
              set: function set(t) {
                this._worldAlpha = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'parent', {
              get: function get() {
                return this._parent ? this._parent : this._tempDisplayObjectParent
              },
              set: function set(t) {
                ;(this._parent = t), (this._root = (null == t ? void 0 : t.root) || void 0)
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'root', {
              get: function get() {
                if (this._parent) return this._parent.root
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, '_tempDisplayObjectParent', {
              get: function get() {
                return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new v({})), this.tempDisplayObjectParent
              },
              enumerable: !1,
              configurable: !0
            }),
            (t.prototype.destroy = function () {
              this.lifeCycleHook('willDestroy'), this.parent && this.parent.removeChild(this), (this.transform = null), (this.parent = void 0), (this._destroyed = !0), this.lifeCycleHook('didDestroy')
            }),
            (t.prototype.willMount = function (t) {
              return this.__lifeCycle__.willMount.push(t), this
            }),
            (t.prototype.didMount = function (t) {
              return this.__lifeCycle__.didMount || (this.__lifeCycle__.didMount = []), this.__lifeCycle__.didMount.push(t), this
            }),
            (t.prototype.willUpdate = function (t) {
              return this.__lifeCycle__.willUpdate || (this.__lifeCycle__.willUpdate = []), this.__lifeCycle__.willUpdate.push(t), this
            }),
            (t.prototype.didUpdate = function (t) {
              return this.__lifeCycle__.didUpdate || (this.__lifeCycle__.didUpdate = []), this.__lifeCycle__.didUpdate.push(t), this
            }),
            (t.prototype.willDestroy = function (t) {
              return this.__lifeCycle__.willDestroy.push(t), this
            }),
            (t.prototype.didDestroy = function (t) {
              return this.__lifeCycle__.didDestroy || (this.__lifeCycle__.didDestroy = []), this.__lifeCycle__.didDestroy.push(t), this
            }),
            (t.prototype.willRender = function (t) {
              return this.__lifeCycle__.willRender || (this.__lifeCycle__.willRender = []), this.__lifeCycle__.willRender.push(t), this
            }),
            (t.prototype.didRender = function (t) {
              return this.__lifeCycle__.didRender || (this.__lifeCycle__.didRender = []), this.__lifeCycle__.didRender.push(t), this
            }),
            (t.prototype.lifeCycleHook = function (t, e) {
              var n = this
              return this.__lifeCycle__[t] && this.__lifeCycle__[t].length
                ? (this.__lifeCycle__[t].map(function (t) {
                    t(n, e)
                  }),
                  this)
                : this
            }),
            (t.prototype.handleTransformAndOpacity = function (t) {
              this._recursivePostUpdateTransform()
              var e = this.localTransform
              t.transform(e[0], e[1], e[2], e[3], e[4], e[5]), (t.globalAlpha = this.worldAlpha)
            }),
            (t.prototype._recursivePostUpdateTransform = function () {
              this._parent
                ? (this._parent._recursivePostUpdateTransform(), this.transform.updateTransform(this._parent.transform))
                : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
            }),
            (t.prototype.updateTransform = function () {
              this.transform.updateTransform(this.parent.transform), (this.worldAlpha = this.alpha * this.parent.worldAlpha)
            }),
            (t.prototype.setOrigin = function (t) {
              var e, n
              if (('number' == typeof t ? (e = n = t) : ((e = t.x / this.width), (n = t.y / this.height)), e < 0 || e > 1))
                return console.error('function: setOrigin required args to be number type which between 0 to 1'), this
              if (void 0 !== n && (n < 0 || n > 1)) return console.error('function: setOrigin required args to be number type which between 0 to 1'), this
              var r = e,
                i = n
              return void 0 === n && (i = e), this.transform.origin.set(r * this.width, i * this.height), this
            }),
            (t.prototype.setRotate = function (t) {
              return (this.rotation = t), this
            }),
            (t.prototype.setScale = function (t) {
              return (this.scale = t), this
            }),
            (t.prototype.setTranslate = function (t) {
              return (this.x = 'number' == typeof t.x ? t.x : this.x), (this.y = 'number' == typeof t.y ? t.y : this.y), this
            }),
            (t.prototype.setTranslateX = function (t) {
              return (this.x = t), this
            }),
            (t.prototype.setTranslateY = function (t) {
              return (this.y = t), this
            }),
            (t.prototype.toLocal = function (t, e, n) {
              var r = t
              e && (r = e.toGlobal(t, n)), n || (this._recursivePostUpdateTransform(), this.updateTransform())
              var i,
                o,
                a,
                s,
                l,
                h,
                u,
                f,
                g,
                _ = p(r.x, r.y),
                m = d(),
                b = c()
              return (
                (i = b),
                (a = (o = this.localTransform)[0]),
                (s = o[1]),
                (l = o[2]),
                (h = o[3]),
                (u = o[4]),
                (f = o[5]),
                (g = a * h - s * l) && ((g = 1 / g), (i[0] = h * g), (i[1] = -s * g), (i[2] = -l * g), (i[3] = a * g), (i[4] = (l * f - h * u) * g), (i[5] = (s * u - a * f) * g)),
                y(m, _, b),
                {
                  x: m[0],
                  y: m[1]
                }
              )
            }),
            (t.prototype.toGlobal = function (t, e) {
              void 0 === e && (e = !1), e || (this._recursivePostUpdateTransform(), this.updateTransform())
              var n = p(t.x, t.y),
                r = d()
              return (
                y(r, n, this.worldTransform),
                {
                  x: r[0],
                  y: r[1]
                }
              )
            }),
            (t.prototype.render = function (t) {
              this.visible &&
                (this.rendered === g.wilMount ? (this.lifeCycleHook('willMount'), (this.rendered = g.didMount)) : this.rendered === g.rendering && this.lifeCycleHook('willUpdate'),
                t.save(),
                this.handleTransformAndOpacity(t),
                this.lifeCycleHook('willRender', t),
                this.renderer(t),
                this.lifeCycleHook('didRender', t),
                t.restore(),
                this.rendered === g.didMount ? (this.lifeCycleHook('didMount'), (this.rendered = g.rendering)) : this.rendered === g.rendering && this.lifeCycleHook('didUpdate'))
            }),
            t
          )
        })(),
        v = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this
            return (e.type = 'TemporaryDisplayObject'), (e.children = []), e
          }
          return n(e, t), (e.prototype.renderer = function (t) {}), (e.prototype.removeChild = function (t) {}), (e.prototype.addChild = function (t) {}), e
        })(b),
        x = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this
            return (
              (n.type = 'Sprite'),
              (n.renderer = function (t) {
                t.drawImage(n.image, 0, 0, n.imageWidth, n.imageHeight, 0, 0, n.width, n.height)
              }),
              (n.image = e.image),
              (n.width = e.width || e.image.width || 0),
              (n.height = e.height || e.image.height || 0),
              (n.imageWidth = e.image.width || n.height),
              (n.imageHeight = e.image.height || n.height),
              n
            )
          }
          return n(e, t), e
        })(b),
        C = {
          x: 0,
          y: 0,
          radius: 0,
          fill: 'rgba(0,0,0,0)'
        },
        w = (function (t) {
          function e(e) {
            var n = t.call(this, Object.assign({}, C, e)) || this
            n.type = 'Arc'
            var r = Object.assign({}, C, e)
            n.radius = r.radius
            var i = (r.border || '1px solid rgba(0,0,0,0)').split(' '),
              o = i[0],
              a = i[1],
              s = i[2]
            if (!['solid', 'dashed'].includes(a)) throw Error('borderStyle must be one of ["solid", "dashed"]')
            return (
              (n.borderWidth = Number(o.replace('px', ''))),
              (n.borderColor = s),
              (n.borderStyle = a),
              (n.fill = r.fill),
              (n.startAngle = 'number' == typeof e.startAngle ? e.startAngle : 0),
              (n.endAngle = 'number' == typeof e.endAngle ? e.endAngle : 2 * Math.PI),
              e.dashSetting ? (n.dashSetting = e.dashSetting) : (n.dashSetting = [n.borderWidth, n.borderWidth]),
              n
            )
          }
          return (
            n(e, t),
            (e.prototype.renderer = function (t) {
              t.beginPath(),
                'dashed' === this.borderStyle && t.setLineDash(this.dashSetting),
                this._recursivePostUpdateTransform(),
                t.arc(0, 0, this.radius, this.startAngle, this.endAngle),
                (t.lineWidth = this.borderWidth),
                (t.strokeStyle = this.borderColor),
                this.fill && ((t.fillStyle = this.fill), t.fill()),
                t.stroke()
            }),
            e
          )
        })(b),
        L = (function () {
          function t(t) {
            ;(this.type = 'Gradient'), (this.colorArray = []), t.hasOwnProperty('colors') && Array.isArray(t.colors) && (this.colorArray = this.formatColors(t.colors))
          }
          return (
            (t.prototype.formatColors = function (t) {
              return t.map(function (e, n) {
                var r = e.split(' '),
                  i = r[0],
                  o = r[1]
                return {
                  color: i,
                  stop: Math.min(Math.max(0, Number((o || (n / (t.length - 1)) * 100 + '%').replace(/(\d)(\%)/, '$1')) / 100), 1)
                }
              })
            }),
            t
          )
        })(),
        M = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this
            return (n.angle = 0), e.hasOwnProperty('angle') && 'number' == typeof e.angle && (n.angle = e.angle), n
          }
          return (
            n(e, t),
            (e.prototype.caculateGredientCoordinate = function (t, e) {
              var n,
                r,
                i = this.angle % 360
              if ((i < 0 && (i += 360), i <= 45))
                (n = {
                  x: 0,
                  y: e / 2 + (o = (t / 2) * Math.tan((i * Math.PI) / 180))
                }),
                  (r = {
                    x: t,
                    y: e / 2 - o
                  })
              else if (i < 90)
                (n = {
                  x: t / 2 - (o = e / 2 / Math.tan((i * Math.PI) / 180)),
                  y: e
                }),
                  (r = {
                    x: t / 2 + o,
                    y: 0
                  })
              else if (90 === i)
                (n = {
                  x: t / 2,
                  y: e
                }),
                  (r = {
                    x: t / 2,
                    y: 0
                  })
              else if (i <= 135)
                (n = {
                  x: t / 2 + (o = (e / 2) * Math.tan(((i - 90) * Math.PI) / 180)),
                  y: e
                }),
                  (r = {
                    x: t / 2 - o,
                    y: 0
                  })
              else if (i < 180)
                (n = {
                  x: t,
                  y: e / 2 + (o = t / 2 / Math.tan(((i - 90) * Math.PI) / 180))
                }),
                  (r = {
                    x: 0,
                    y: e / 2 - o
                  })
              else if (180 === i)
                (n = {
                  x: t,
                  y: e / 2
                }),
                  (r = {
                    x: 0,
                    y: e / 2
                  })
              else if (i <= 225)
                (n = {
                  x: t,
                  y: e / 2 - (o = (t / 2) * Math.tan(((i - 180) * Math.PI) / 180))
                }),
                  (r = {
                    x: 0,
                    y: e / 2 + o
                  })
              else if (i <= 270)
                (n = {
                  x: t / 2 + (o = (e / 2) * Math.tan(((270 - i) * Math.PI) / 180)),
                  y: 0
                }),
                  (r = {
                    x: t / 2 - o,
                    y: e
                  })
              else if (270 === i)
                (n = {
                  x: t / 2,
                  y: 0
                }),
                  (r = {
                    x: t / 2,
                    y: e
                  })
              else if (i <= 315)
                (n = {
                  x: t / 2 - (o = e / 2 / Math.tan(((360 - i) * Math.PI) / 180)),
                  y: 0
                }),
                  (r = {
                    x: t / 2 + o,
                    y: e
                  })
              else {
                var o
                ;(n = {
                  x: 0,
                  y: e / 2 - (o = (t / 2) * Math.tan(((360 - i) * Math.PI) / 180))
                }),
                  (r = {
                    x: t,
                    y: e / 2 + o
                  })
              }
              return [n, r]
            }),
            (e.prototype.getGradient = function (t, e) {
              for (
                var n = e.width, r = e.height, i = this.caculateGredientCoordinate(n, r), o = i[0], a = i[1], s = t.createLinearGradient(o.x, o.y, a.x, a.y), l = 0, h = this.colorArray;
                l < h.length;
                l++
              ) {
                var u = h[l]
                s.addColorStop(u.stop, u.color)
              }
              return s
            }),
            e
          )
        })(L),
        P = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this
            return (n.start = e.start), (n.end = e.end), n
          }
          return (
            n(e, t),
            (e.prototype.getGradient = function (t) {
              for (var e = t.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y), n = 0, r = this.colorArray; n < r.length; n++) {
                var i = r[n]
                e.addColorStop(i.stop, i.color)
              }
              return e
            }),
            e
          )
        })(L),
        A = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this
            return (
              (n.type = 'RadialGradient'),
              (n.start = e.start || {
                x: 0,
                y: 0,
                radius: 0
              }),
              (n.end = e.end || n.start),
              n
            )
          }
          return (
            n(e, t),
            (e.prototype.getGradient = function (t) {
              for (
                var e,
                  n,
                  r = t.createRadialGradient(
                    this.start.x,
                    this.start.y,
                    this.start.radius,
                    this.end.x,
                    null === (e = this.end) || void 0 === e ? void 0 : e.y,
                    null === (n = this.end) || void 0 === n ? void 0 : n.radius
                  ),
                  i = 0,
                  o = this.colorArray;
                i < o.length;
                i++
              ) {
                var a = o[i]
                r.addColorStop(a.stop, a.color)
              }
              return r
            }),
            e
          )
        })(L),
        T = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          border: '0px solid rgba(0,0,0,0)',
          borderRadius: 0
        },
        S = (function (t) {
          function e(e) {
            var n = t.call(this, Object.assign({}, T, e)) || this
            ;(n._borderWidth = 0), (n._borderRadius = []), (n.type = 'Rect')
            var r = Object.assign({}, T, e),
              i = (r.border || '0px solid rgba(0,0,0,0)').split(' '),
              o = i[0],
              a = i[1],
              s = i[2]
            if (!['solid'].includes(a)) throw Error('borderStyle must be "solid"')
            return (
              (n.borderWidth = Number(o.replace('px', ''))),
              (n.borderColor = s),
              (n.borderStyle = a),
              (n.borderRadius = r.borderRadius || 0),
              (n.fill = r.fill),
              (n.width = r.width),
              (n.height = r.height),
              n
            )
          }
          return (
            n(e, t),
            Object.defineProperty(e.prototype, 'width', {
              get: function get() {
                return this._width * this.transform.scale.x
              },
              set: function set(t) {
                this._width = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'height', {
              get: function get() {
                return this._height * this.transform.scale.y
              },
              set: function set(t) {
                this._height = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'borderRadius', {
              get: function get() {
                return this._borderRadius
              },
              set: function set(t) {
                this._borderRadius = this.formatBorderRadius(t)
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'borderColor', {
              get: function get() {
                return this._borderColor || ''
              },
              set: function set(t) {
                this._borderColor = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'borderWidth', {
              get: function get() {
                return this._borderWidth
              },
              set: function set(t) {
                Number(t) != Number(t) ? (this._borderWidth = Number(t.replace('px', ''))) : (this._borderWidth = t)
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'fill', {
              get: function get() {
                return this._fill
              },
              set: function set(t) {
                this._fill = t
              },
              enumerable: !1,
              configurable: !0
            }),
            (e.prototype.formatBorderRadius = function (t) {
              var e = []
              return 'number' == typeof t && t >= 0 ? (e = [t, t, t, t]) : Array.isArray(t) && (e = 2 === t.length ? [t[0], t[1], t[0], t[1]] : 3 === e.length ? [t[0], t[1], t[2], t[1]] : t), e
            }),
            (e.prototype.getRectArgs = function () {
              return {
                rectX: 0 + this.borderWidth / 2,
                rectY: 0 + this.borderWidth / 2,
                rectWidth: this._width - this.borderWidth,
                rectHeight: this._height - this.borderWidth
              }
            }),
            (e.prototype.renderRoundRect = function (t) {
              var e = this.getRectArgs(),
                n = e.rectX,
                r = e.rectY,
                i = e.rectWidth,
                o = e.rectHeight
              try {
                t.roundRect(n, r, i, o, this.borderRadius), (t.fillStyle = this.getFillStyle(t)), t.fill()
              } catch (e) {
                //                 e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                var a = this.borderRadius,
                  s = a[0],
                  l = a[1],
                  h = a[2],
                  u = a[3]
                t.arc(n + s, r + s, s, Math.PI, 1.5 * Math.PI),
                  t.lineTo(n + (i - s - l), r),
                  t.arc(n + i - l, r + l, l, 1.5 * Math.PI, 2 * Math.PI),
                  t.lineTo(n + i, r + (o - l - h)),
                  t.arc(n + i - h, r + o - h, h, 0, 0.5 * Math.PI),
                  t.lineTo(n + u, r + o),
                  t.arc(n + u, r + o - u, u, 0.5 * Math.PI, Math.PI),
                  t.lineTo(n, r + s),
                  t.closePath(),
                  (t.fillStyle = this.getFillStyle(t)),
                  t.fill()
              }
            }),
            (e.prototype.getFillStyle = function (t) {
              var e = this.getRectArgs(),
                n = e.rectWidth,
                r = e.rectHeight
              if (void 0 === this.fill) return 'transparent'
              if ('string' == typeof this.fill) return this.fill
              if (this._grd) return this._grd
              if (this.fill instanceof M)
                this._grd = this.fill.getGradient(t, {
                  width: n,
                  height: r
                })
              else {
                if (!(this.fill instanceof P || this.fill instanceof A)) throw Error('Error：未支持的渐变')
                this._grd = this.fill.getGradient(t)
              }
              return this._grd
            }),
            (e.prototype.renderer = function (t) {
              ;(t.strokeStyle = this.borderColor), (t.lineWidth = this.borderWidth), t.beginPath(), this.renderRoundRect(t), t.stroke()
            }),
            e
          )
        })(b),
        k = (function (t) {
          function e(e) {
            void 0 === e && (e = {})
            var n = t.call(this, e) || this
            return (
              (n.type = 'Layer'),
              (n.children = []),
              (n.clear = function () {
                for (var t = 0, e = n.children; t < e.length; t++) e[t].parent = void 0
                n.children = []
              }),
              n
            )
          }
          return (
            n(e, t),
            (e.prototype.addChild = function (t) {
              var e = t
              Array.isArray(t) || (e = [t])
              for (var n = 0, i = e; n < i.length; n++) {
                var o = i[n]
                o.parent && o.parent.removeChild(o), (o.parent = this)
              }
              return (this.children = r(r([], this.children), e)), this
            }),
            (e.prototype.removeChild = function (t) {
              var e = this.children.findIndex(function (e) {
                return e.name === t.name
              })
              return e >= 0 && ((this.children[e].parent = void 0), this.children.splice(e, 1)), this
            }),
            (e.prototype.updateTransform = function () {
              this.transform.updateLocalTransform()
              for (var t = 0, e = this.children; t < e.length; t++) {
                var n = e[t]
                n.visible && n.updateTransform()
              }
            }),
            (e.prototype.destroy = function () {
              this.lifeCycleHook('willDestroy'), this.parent && this.parent.removeChild(this), (this.transform = null), (this.parent = void 0), (this._destroyed = !0)
              for (var t = 0, e = this.children; t < e.length; t++) {
                var n = e[t]
                this.removeChild(n), n.destroy()
              }
              this.lifeCycleHook('didDestroy')
            }),
            (e.prototype.renderer = function (t) {
              for (var e = 0, n = this.children; e < n.length; e++) {
                var r = n[e]
                r.visible && r.render(t)
              }
            }),
            e
          )
        })(b),
        O = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this
            return (
              (n.type = 'Text'),
              (n.textInfo = null),
              (n.text = e.text),
              (n.color = e.color || '#000'),
              (n.fontFamily = e.fontFamily || 'arial,x-locale-body,sans-serif'),
              (n.fontSize = e.fontSize || 12),
              (n.textAlign = e.textAlign || 'left'),
              (n.textBaseline = e.textBaseline || 'top'),
              (n.direction = e.direction || 'inherit'),
              (n.lineHeight = 'number' == typeof e.lineHeight ? e.lineHeight : n.fontSize),
              n
            )
          }
          return (
            n(e, t),
            Object.defineProperty(e.prototype, 'width', {
              get: function get() {
                if (this._width) return this._width
                for (var t = 0, e = 0, n = this.text.split('\n'); e < n.length; e++) {
                  var r = n[e]
                  t = Math.max(r.split('').length * this.fontSize, t)
                }
                return t
              },
              set: function set(t) {
                this._width = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'height', {
              get: function get() {
                return this.text.split('\n').length * this.lineHeight
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'left', {
              get: function get() {
                return 'center' === this.textAlign ? this.x - this.width / 2 : ['end', 'right'].includes(this.textAlign) ? this.x - this.width : this.x
              },
              enumerable: !1,
              configurable: !0
            }),
            (e.prototype.renderer = function (t) {
              ;(t.font = this.fontSize + "px '" + this.fontFamily + "'"), (t.textAlign = this.textAlign), (t.textBaseline = this.textBaseline), (t.fillStyle = this.color)
              for (var e = 0, n = 0, r = 0, i = this.text.split('\n'); r < i.length; r++) {
                var o = i[r]
                t.fillText(o, 0, e * this.lineHeight), (n = Math.max(n, t.measureText(o).width)), e++
              }
              this.width = n
            }),
            e
          )
        })(b),
        D = {
          a: 7,
          c: 6,
          h: 1,
          l: 2,
          m: 2,
          q: 4,
          s: 4,
          t: 2,
          v: 1,
          z: 0
        },
        j = /([astvzqmhlc])([^astvzqmhlc]*)/gi
      function G(t) {
        var e,
          n = []
        return (
          null === (e = t.match(j)) ||
            void 0 === e ||
            e.map(function (t) {
              var e = t.replace(j, '$1'),
                i = e.toLowerCase(),
                o = (function (t) {
                  var e = t.match(B)
                  return e ? e.map(Number) : []
                })(t.replace(j, '$2'))
              if (('m' == i && o.length > 2 && (n.push(r([e], o.splice(0, 2))), (i = 'l'), (e = 'm' == e ? 'l' : 'L')), o.length == D[i])) return n.push(r([e], o)), ''
              if (o.length < D[i]) throw new Error('malformed path data')
              n.push(r([e], o.splice(0, D[i])))
            }),
          n
        )
      }
      var B = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi,
        z = 2 * Math.PI
      function I(t, e, n, r) {
        var i = t * n + e * r
        return i > 1 && (i = 1), i < -1 && (i = -1), (t * r - e * n < 0 ? -1 : 1) * Math.acos(i)
      }
      function Z(t, e) {
        var n = (4 / 3) * Math.tan(e / 4),
          r = Math.cos(t),
          i = Math.sin(t),
          o = Math.cos(t + e),
          a = Math.sin(t + e)
        return [r, i, r - i * n, i + r * n, o + a * n, a - o * n, o, a]
      }
      function K(t, e, n, r, i, o, a, s, l) {
        var h = Math.sin((l * z) / 360),
          u = Math.cos((l * z) / 360),
          c = (u * (t - n)) / 2 + (h * (e - r)) / 2,
          f = (-h * (t - n)) / 2 + (u * (e - r)) / 2
        if (0 === c && 0 === f) return []
        if (0 === a || 0 === s) return []
        ;(a = Math.abs(a)), (s = Math.abs(s))
        var d = (c * c) / (a * a) + (f * f) / (s * s)
        d > 1 && ((a *= Math.sqrt(d)), (s *= Math.sqrt(d)))
        var p = (function (t, e, n, r, i, o, a, s, l, h) {
            var u = (h * (t - n)) / 2 + (l * (e - r)) / 2,
              c = (-l * (t - n)) / 2 + (h * (e - r)) / 2,
              f = a * a,
              d = s * s,
              p = u * u,
              y = c * c,
              g = f * d - f * y - d * p
            g < 0 && (g = 0), (g /= f * y + d * p)
            var _ = (((g = Math.sqrt(g) * (i === o ? -1 : 1)) * a) / s) * c,
              m = ((g * -s) / a) * u,
              b = h * _ - l * m + (t + n) / 2,
              v = l * _ + h * m + (e + r) / 2,
              x = (u - _) / a,
              C = (c - m) / s,
              w = (-u - _) / a,
              L = (-c - m) / s,
              M = I(1, 0, x, C),
              P = I(x, C, w, L)
            return 0 === o && P > 0 && (P -= z), 1 === o && P < 0 && (P += z), [b, v, M, P]
          })(t, e, n, r, i, o, a, s, h, u),
          y = [],
          g = p[2],
          _ = p[3],
          m = Math.max(Math.ceil(Math.abs(_) / (z / 4)), 1)
        _ /= m
        for (var b = 0; b < m; b++) y.push(Z(g, _)), (g += _)
        return y.map(function (t) {
          for (var e = 0; e < t.length; e += 2) {
            var n = t[e + 0],
              r = t[e + 1],
              i = u * (n *= a) - h * (r *= s),
              o = h * n + u * r
            ;(t[e + 0] = i + p[0]), (t[e + 1] = o + p[1])
          }
          return t
        })
      }
      function R(t, e, n, r) {
        return ['C', t, e, n, r, n, r]
      }
      function F(t, e, n, r, i, o) {
        return ['C', t / 3 + (2 / 3) * n, e / 3 + (2 / 3) * r, i / 3 + (2 / 3) * n, o / 3 + (2 / 3) * r, i, o]
      }
      var E = (function () {
          function t(t) {
            if (((this.savedPaths = []), !('string' == typeof (e = t) && ((e = e.trim()), /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(e) && /[\dz]$/i.test(e) && e.length > 4))))
              throw new Error('Not an SVG path!')
            var e, n, r, i, o, a
            ;(this.initialPath =
              ((n = G(t)),
              (r = 0),
              (i = 0),
              (o = 0),
              (a = 0),
              n.map(function (t) {
                var e = (t = t.slice())[0],
                  n = e.toUpperCase()
                if (e != n)
                  switch (((t[0] = n), e)) {
                    case 'a':
                      ;(t[6] += o), (t[7] += a)
                      break
                    case 'v':
                      t[1] += a
                      break
                    case 'h':
                      t[1] += o
                      break
                    default:
                      for (var s = 1; s < t.length; ) (t[s++] += o), (t[s++] += a)
                  }
                switch (n) {
                  case 'Z':
                    ;(o = r), (a = i)
                    break
                  case 'H':
                    o = t[1]
                    break
                  case 'V':
                    a = t[1]
                    break
                  case 'M':
                    ;(o = r = t[1]), (a = i = t[2])
                    break
                  default:
                    ;(o = t[t.length - 2]), (a = t[t.length - 1])
                }
                return t
              }))),
              (this._path = (function (t) {
                for (var e, n = [], r = 0, i = 0, o = 0, a = 0, s = 0, l = 0, h = 0, u = 0, c = 0, f = t.length; c < f; c++) {
                  var d = t[c],
                    p = d[0]
                  switch (p) {
                    case 'M':
                      ;(o = d[1]), (a = d[2])
                      break
                    case 'A':
                      var y = K(h, u, d[6], d[7], d[4], d[5], d[1], d[2], d[3])
                      if (!y.length) continue
                      for (
                        var g = y.map(function (t) {
                            return (
                              t[0],
                              t[1],
                              {
                                x1: t[2],
                                y1: t[3],
                                x2: t[4],
                                y2: t[5],
                                x: t[6],
                                y: t[7]
                              }
                            )
                          }),
                          _ = 0;
                        _ < g.length;
                        _++
                      ) {
                        var m = g[_]
                        ;(d = ['C', m.x1, m.y1, m.x2, m.y2, m.x, m.y]), _ < g.length - 1 && n.push(d)
                      }
                      break
                    case 'S':
                      var b = h,
                        v = u
                      ;('C' != e && 'S' != e) || ((b += b - r), (v += v - i)), (d = ['C', b, v, d[1], d[2], d[3], d[4]])
                      break
                    case 'T':
                      'Q' == e || 'T' == e ? ((s = 2 * h - s), (l = 2 * u - l)) : ((s = h), (l = u)), (d = F(h, u, s, l, d[1], d[2]))
                      break
                    case 'Q':
                      ;(s = d[1]), (l = d[2]), (d = F(h, u, d[1], d[2], d[3], d[4]))
                      break
                    case 'L':
                      d = R(h, u, d[1], d[2])
                      break
                    case 'H':
                      d = R(h, u, d[1], u)
                      break
                    case 'V':
                      d = R(h, u, h, d[1])
                      break
                    case 'Z':
                      d = R(h, u, o, a)
                  }
                  ;(e = p), (h = d[d.length - 2]), (u = d[d.length - 1]), d.length > 4 ? ((r = d[d.length - 4]), (i = d[d.length - 3])) : ((r = h), (i = u)), n.push(d)
                }
                return n
              })(this.initialPath)),
              (this.beginPath = !1),
              (this._bounds = null)
          }
          return (
            Object.defineProperty(t.prototype, 'bounds', {
              get: function get() {
                if (!this._bounds) {
                  var t = this.path
                  if (((this._bounds = [0, 0, 0, 0]), t.length)) {
                    for (var e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], n = 0, r = t.length; n < r; n++)
                      for (var i = t[n].slice(1), o = 0; o < i.length; o += 2)
                        i[o + 0] < e[0] && (e[0] = i[o + 0]), i[o + 1] < e[1] && (e[1] = i[o + 1]), i[o + 0] > e[2] && (e[2] = i[o + 0]), i[o + 1] > e[3] && (e[3] = i[o + 1])
                    this._bounds = e
                  }
                }
                return this._bounds
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'size', {
              get: function get() {
                var t = this.bounds
                return [t[2] - t[0], t[3] - t[1]]
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'center', {
              get: function get() {
                var t = this.bounds,
                  e = t[0],
                  n = t[1]
                return [(e + t[2]) / 2, (n + t[3]) / 2]
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'd', {
              get: function get() {
                var t = this.path
                  .map(function (t) {
                    return t[0] + t.slice(1).join()
                  })
                  .join('')
                return this.isClosed && (t += 'Z'), t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'path', {
              get: function get() {
                return this._path
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, 'isClosed', {
              get: function get() {
                var t = this.initialPath[this.initialPath.length - 1]
                return t && 'Z' === t[0]
              },
              enumerable: !1,
              configurable: !0
            }),
            (t.prototype.render = function (t, e, n) {
              var r = this
              void 0 === e && (e = this.size[0]), void 0 === n && (n = this.size[1])
              var i = this.path
              i.length &&
                (t.beginPath(),
                i.forEach(function (i) {
                  for (var o = i[0], a = i.slice(1), s = [], l = 0; l < a.length / 2; l++)
                    (s[2 * l] = 0 !== e ? (Number(a[2 * l]) / r.size[0]) * e : a[2 * l]), (s[2 * l + 1] = 0 !== n ? (Number(a[2 * l + 1]) / r.size[1]) * n : a[2 * l + 1])
                  'M' === o ? t.moveTo.apply(t, s) : t.bezierCurveTo.apply(t, s)
                }),
                this.isClosed && t.closePath())
            }),
            t
          )
        })(),
        W = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this
            ;(n.lineStyle = 'solid'), (n.type = 'Polygon'), (n._lineJoin = 'round'), (n._lineCap = 'butt'), (n.closePath = !!e.hasOwnProperty('closePath') && !!e.closePath), (n.path = e.path)
            var r = e.path
            return (
              'string' != typeof e.path && (r = n.formatPointsToPath(e.path, n.closePath)),
              (n._svgPath = new E(r)),
              (n.lineWidth = e.lineWidth || 2),
              (n.lineColor = e.lineColor || '#fff'),
              (n.fill = e.fill || 'rgba(0,0,0,0)'),
              (n.lineJoin = e.lineJoin || 'round'),
              (n.lineCap = e.lineCap || 'butt'),
              'dashed' === e.lineStyle && ((n.lineStyle = e.lineStyle), (n.lineJoin = 'miter'), (n.lineCap = 'butt')),
              e.dashSetting ? (n.dashSetting = e.dashSetting) : (n.dashSetting = [n.lineWidth, n.lineWidth]),
              n
            )
          }
          return (
            n(e, t),
            Object.defineProperty(e.prototype, 'lineJoin', {
              get: function get() {
                return this._lineJoin
              },
              set: function set(t) {
                'dashed' !== this.lineStyle && (this._lineJoin = t)
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'lineCap', {
              get: function get() {
                return this._lineCap
              },
              set: function set(t) {
                'dashed' !== this.lineStyle && (this._lineCap = t)
              },
              enumerable: !1,
              configurable: !0
            }),
            (e.prototype.formatPointsToPath = function (t, e) {
              for (var n = 'M ' + t[0].x + ' ' + t[0].y, r = 1; r < t.length; r++) n += 'L ' + t[r].x + ' ' + t[r].y
              return e && (n += ' Z'), n
            }),
            (e.prototype.getColor = function (t, e) {
              var n = this[e]
              if (n instanceof L) {
                if (!this['_' + e + 'Grd'])
                  if (n instanceof M)
                    this['_' + e + 'Grd'] = n.getGradient(t, {
                      width: this._svgPath.bounds[2] - this._svgPath.bounds[0],
                      height: this._svgPath.bounds[3] - this._svgPath.bounds[1]
                    })
                  else {
                    if (!(n instanceof P || n instanceof A)) throw Error('Error：未支持的渐变')
                    this['_' + e + 'Grd'] = n.getGradient(t)
                  }
                return this['_' + e + 'Grd']
              }
              return n || 'transparent'
            }),
            (e.prototype.renderer = function (t) {
              this._svgPath.render(t, this.width, this.height),
                (t.lineWidth = this.lineWidth),
                (t.lineCap = this.lineCap),
                (t.lineJoin = this.lineJoin),
                (t.strokeStyle = this.getColor(t, 'lineColor')),
                'dashed' === this.lineStyle && t.setLineDash(this.dashSetting),
                this.fill && ((t.fillStyle = this.getColor(t, 'fill')), t.fill()),
                t.stroke()
            }),
            e
          )
        })(b),
        H = {
          Circle: (function () {
            function t(e, n, r) {
              void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === r && (r = 0), (this.type = t.TYPE), (this.x = e), (this.y = n), (this.radius = r)
            }
            return (
              (t.prototype.clone = function () {
                return new t(this.x, this.y, this.radius)
              }),
              (t.prototype.contains = function (t, e) {
                if (this.radius <= 0) return !1
                var n = this.radius * this.radius,
                  r = this.x - t,
                  i = this.y - e
                return (r *= r) + (i *= i) <= n
              }),
              (t.prototype.getBounds = function () {
                return new i(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
              }),
              (t.prototype.toString = function () {
                return '[@/utils/@milimu/math:Circle x=' + this.x + ' y=' + this.y + ' radius=' + this.radius + ']'
              }),
              (t.TYPE = 'circle'),
              t
            )
          })(),
          Rectangle: i
        }
      ;(t.AngleGradient = M),
        (t.Application = m),
        (t.Arc = w),
        (t.Layer = k),
        (t.LinearGradient = P),
        (t.Node = b),
        (t.ObservablePoint = l),
        (t.Point = s),
        (t.Polygon = W),
        (t.RadialGradient = A),
        (t.Rect = S),
        (t.Sprite = x),
        (t.Text = O),
        (t.shape = H)
    })(e)
  })(0, l.exports)
  var f = {
    exports: {}
  }
  function d(t, e) {
    return new l.exports.Arc({
      x: t.x,
      y: t.y,
      radius: e.size / 2,
      fill: e.color
    })
  }
  function p(t, e) {
    return (
      void 0 === e && (e = {}),
      new l.exports.Polygon({
        path: t,
        lineStyle: 'solid',
        lineColor: e.color,
        lineWidth: s.get('lineWidth'),
        fill: e.fill
      })
    )
  }
  function y(t, e, n) {
    void 0 === n && (n = {})
    var r = new l.exports.LinearGradient({
      start: t,
      end: e,
      colors: ['rgba(255,255,255,0) 0%', n.color + ' 50%', 'rgba(255,255,255,0) 100%']
    })
    return new l.exports.Polygon({
      path: [t, e],
      lineColor: r,
      lineWidth: n.size
    })
  }
  function g(t) {
    for (var e, n, r = [], i = 0, o = t; i < o.length; i++) {
      var a = o[i]
      r.push(
        ((e = a),
        void 0 ===
          (n = {
            color: s.get('dashedLineColor')
          }) && (n = {}),
        new l.exports.Polygon({
          path: e,
          lineStyle: 'dashed',
          dashSetting: s.get('dashSetting'),
          lineColor: n.color,
          lineWidth: s.get('lineWidth'),
          fill: n.fill
        }))
      )
    }
    return r
  }
  !(function (t, e) {
    !(function (t) {
      /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.
               Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.
               THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
      function e(t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              l(r.next(t))
            } catch (t) {
              //               t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
              o(t)
            }
          }
          function s(t) {
            try {
              l(r.throw(t))
            } catch (t) {
              //               t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
              o(t)
            }
          }
          function l(t) {
            var e
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e)
                    })).then(a, s)
          }
          l((r = r.apply(t, e || [])).next())
        })
      }
      function n(t, e) {
        var n,
          r,
          i,
          o,
          a = {
            label: 0,
            sent: function sent() {
              if (1 & i[0]) throw i[1]
              return i[1]
            },
            trys: [],
            ops: []
          }
        return (
          (o = {
            next: s(0),
            throw: s(1),
            return: s(2)
          }),
          'function' == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this
            }),
          o
        )
        function s(o) {
          return function (s) {
            return (function (o) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; a; )
                try {
                  if (((n = 1), r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)) return i
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o
                      break
                    case 4:
                      return (
                        a.label++,
                        {
                          value: o[1],
                          done: !1
                        }
                      )
                    case 5:
                      a.label++, (r = o[1]), (o = [0])
                      continue
                    case 7:
                      ;(o = a.ops.pop()), a.trys.pop()
                      continue
                    default:
                      if (!((i = (i = a.trys).length > 0 && i[i.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                        a = 0
                        continue
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        a.label = o[1]
                        break
                      }
                      if (6 === o[0] && a.label < i[1]) {
                        ;(a.label = i[1]), (i = o)
                        break
                      }
                      if (i && a.label < i[2]) {
                        ;(a.label = i[2]), a.ops.push(o)
                        break
                      }
                      i[2] && a.ops.pop(), a.trys.pop()
                      continue
                  }
                  o = e.call(t, a)
                } catch (t) {
                  //                   t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                  ;(o = [6, t]), (r = 0)
                } finally {
                  n = i = 0
                }
              if (5 & o[0]) throw o[1]
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              }
            })([o, s])
          }
        }
      }
      var r = Object.freeze({
        __proto__: null,
        loadImage: function loadImage(t, r) {
          return e(this, void 0, void 0, function () {
            var e, i
            return n(this, function (n) {
              return (
                (e = new Image()),
                (i = new Promise(function (t, n) {
                  ;(e.onload = function () {
                    t({
                      width: e.width,
                      height: e.height,
                      image: e
                    })
                  }),
                    (e.onerror = n)
                })),
                (e.src = t),
                r && r.crossOrigin && (e.crossOrigin = 'true'),
                [2, i]
              )
            })
          })
        },
        scaleViewportWithRatio: function scaleViewportWithRatio(t, e) {
          var n = t.top,
            r = t.left,
            i = t.width,
            o = t.height,
            a = Math.abs((i - i * e) / 2),
            s = Math.abs((o - o * e) / 2)
          e >= 1 ? ((n -= s), (r -= a)) : ((n += s), (r += a))
          var l = {
            y: n,
            x: r,
            width: i * e,
            height: o * e
          }
          return {
            wrapRectData: l,
            faceData: {
              scale: l.width / i,
              transformOrigin: {
                x: r + i / 2,
                y: n + o / 2
              }
            }
          }
        },
        getRatio: function getRatio(t, e, n) {
          if (n) return Math.min(e.width / t.width, e.height / t.height)
          if (e.width === e.height) {
            var r = Math.max(t.width, t.height)
            return e.width > r ? 1 : e.width / r
          }
          return t.height / e.height > t.width / e.width ? (e.height > t.height ? 1 : e.height / t.height) : e.width > t.width ? 1 : e.width / t.width
        }
      })
      function i(t, e) {
        return t.indexOf(e) > -1
      }
      var o = {
          arr: function arr(t) {
            return Array.isArray(t)
          },
          bol: function bol(t) {
            return 'boolean' == typeof t
          },
          obj: function obj(t) {
            return i(Object.prototype.toString.call(t), 'Object')
          },
          str: function str(t) {
            return 'string' == typeof t
          },
          fnc: function fnc(t) {
            return 'function' == typeof t
          },
          num: function num(t) {
            return 'number' == typeof t
          },
          und: function und(t) {
            return void 0 === t
          },
          nil: function nil(t) {
            return o.und(t) || null === t
          },
          hex: function hex(t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
          },
          rgb: function rgb(t) {
            return /^rgb/.test(t)
          },
          hsl: function hsl(t) {
            return /^hsl/.test(t)
          },
          col: function col(t) {
            return o.hex(t) || o.rgb(t) || o.hsl(t)
          },
          base64: function base64(t) {
            return !!this.str(t) && /^data:image\/.*;base64,/.test(t)
          },
          emptyObj: function emptyObj(t) {
            return !!this.obj(t) && !!Object.keys(t).length
          }
        },
        a = Object.freeze({
          __proto__: null,
          getRectangle: function getRectangle(t) {
            var e
            return (
              t.face_rectangle && (e = t.face_rectangle),
              t.hand_rectangle && (e = t.hand_rectangle),
              t.humanbody_rectangle && (e = t.humanbody_rectangle),
              t.body_rectangle && (e = t.body_rectangle),
              e
            )
          },
          flattenLandmark: function flattenLandmark(t) {
            for (var e = {}, n = 0, r = Object.values(t); n < r.length; n++) {
              var i = r[n]
              for (var o in i)
                'number' == typeof i[o]
                  ? (e[o] = {
                      x: i[o],
                      y: i[o]
                    })
                  : (e[o] = i[o])
            }
            return e
          },
          stringContains: i,
          is: o,
          random: function random(t, e, n) {
            if ('int' === e) return Number(Math.floor(Math.random() * (t[1] - t[0] + 1)) + t[0])
            var r = n && n >= 0 && n <= 20 ? n : 2
            return Number((Math.random() * (t[0] - t[1]) + t[1]).toFixed(r))
          }
        }),
        s = Object.freeze({
          __proto__: null,
          getPointAngle: function getPointAngle(t, e) {
            var n = e.x - t.x,
              r = e.y - t.y
            return Math.atan2(r, n)
          }
        })
      ;(t.dataUtils = a), (t.imageUtils = r), (t.mathUtils = s)
    })(e)
  })(0, f.exports)
  var _ = function _(t, e) {
    void 0 === e && (e = {})
    for (var n = [], r = 0, i = t; r < i.length; r++) {
      var o = i[r],
        a = new l.exports.Polygon({
          path: o,
          lineColor: e.color || s.get('themeColor'),
          lineWidth: s.get('lineWidth')
        })
      n.push(a)
    }
    return n
  }
  function m(t, e) {
    for (var n = [], r = 0, i = t; r < i.length; r++) {
      var o = i[r],
        a = h(o[0], o[1], e),
        l = h(o[1], o[0], e)
      if (!a || !l) return n
      var u = y(a, l, {
        color: s.get('gradualLineColor'),
        size: s.get('lineWidth')
      })
      n.push(u)
    }
    return n
  }
  function b(t, e, n, r, i) {
    var o = new l.exports.Layer()
    o.addChild(
      (function (t, e, n) {
        var r,
          i,
          o = 'number' == typeof n.width ? n.width : s.get('triangleWidth'),
          a = 'number' == typeof n.height ? n.height : s.get('triangleHeight'),
          h = [
            {
              x: t.x,
              y: t.y
            },
            {
              x: t.x + o,
              y: t.y - a / 2
            },
            {
              x: t.x + o,
              y: t.y + a / 2
            }
          ],
          u = [
            {
              x: e.x,
              y: e.y
            },
            {
              x: e.x - o,
              y: e.y - a / 2
            },
            {
              x: e.x - o,
              y: e.y + a / 2
            }
          ],
          c = [
            {
              x: t.x + o,
              y: t.y
            },
            {
              x: e.x - o,
              y: e.y
            }
          ],
          f = new l.exports.Layer()
        n.vertical &&
          ((h = [
            {
              x: t.x,
              y: t.y
            },
            {
              x: t.x - o / 2,
              y: t.y + a
            },
            {
              x: t.x + o / 2,
              y: t.y + a
            }
          ]),
          (u = [
            {
              x: e.x,
              y: e.y
            },
            {
              x: e.x - o / 2,
              y: e.y - a
            },
            {
              x: e.x + o / 2,
              y: e.y - a
            }
          ]),
          (c = [t, e]))
        for (var d = 0, p = [h, u]; d < p.length; d++) {
          var y =
            ((r = p[d]),
            (i = n.color),
            new l.exports.Polygon({
              path: r,
              fill: i,
              lineColor: i
            }))
          f.addChild(y)
        }
        return (
          f.addChild(
            new l.exports.Polygon({
              path: c,
              fill: n.color,
              lineColor: n.color,
              lineWidth: s.get('lineWidth')
            })
          ),
          f
        )
      })(t, e, {
        color: i || s.get('themeColor'),
        vertical: !!r && 'vertical' === r.vertical
      })
    )
    var a = new l.exports.Text({
      text: n,
      fontSize: s.get('fontSize'),
      lineHeight: s.get('lineHeight'),
      color: s.get('textColor')
    })
    if (r && 'vertical' === r.vertical) {
      var h = t.x - (r.offset || 0.3 * s.get('fontSize'))
      ;(a.textAlign = 'right'),
        r.writePosition && 'right' === r.writePosition && ((h = t.x + (r.offset || 0.3 * s.get('fontSize'))), (a.textAlign = 'left')),
        (a.x = h),
        (a.y = Math.abs((t.y + e.y - a.height) / 2))
    } else {
      a.textAlign = 'center'
      var u = t.y + 0.3 * s.get('fontSize')
      r && r.writePosition && 'top' === r.writePosition && (u = u - a.height - 0.3 * s.get('fontSize')), (a.x = Math.abs((t.x + e.x) / 2)), (a.y = u)
    }
    return o.addChild(a), o
  }
  var v = function v(t, e, n, i) {
      var o = new l.exports.Layer(),
        a = (function (t, e) {
          var n = f.exports.mathUtils.getPointAngle(t.center, t.start),
            i = f.exports.mathUtils.getPointAngle(t.center, t.end)
          return new l.exports.Arc(
            _r(
              {
                radius: e,
                startAngle: n,
                endAngle: i
              },
              t.center
            )
          )
        })(t, t.radius)
      a && ((a.borderColor = i || s.get('shadeLineColor')), (a.borderStyle = 'dashed'), (a.dashSetting = s.get('dashSetting')), (a.borderWidth = s.get('lineWidth')), o.addChild(a))
      var h = new l.exports.Text({
        text: e,
        textAlign: 'center',
        x: t.center.x + n.x,
        y: t.center.y + n.y,
        lineHeight: s.get('lineHeight'),
        fontSize: s.get('fontSize'),
        color: s.get('textColor')
      })
      return o.addChild(h), o
    },
    x = [
      'right_eyebrow_34',
      'right_eyebrow_0',
      'right_eyebrow_55',
      'left_eyebrow_31',
      'left_eyebrow_12',
      'left_eyebrow_2',
      'right_eye_eyelid_0',
      'right_eye_eyelid_31',
      'left_eye_eyelid_63',
      'left_eye_eyelid_10',
      'left_eye_eyelid_18',
      'face_contour_right_60',
      'face_contour_left_60',
      'face_contour_right_36',
      'face_contour_left_36',
      'face_contour_right_0',
      'face_contour_left_15',
      'face_hairline_72',
      'nose_midline_53',
      'nose_right_39',
      'upper_lip_0',
      'upper_lip_32',
      'lower_lip_46',
      'lower_lip_16',
      'lower_lip_7'
    ],
    C = ['face_contour_right_49', 'face_contour_right_36', 'face_contour_right_0'],
    w = ['left_eyebrow_0', 'left_eyebrow_5', 'left_eyebrow_12', 'left_eyebrow_23', 'left_eyebrow_31', 'left_eyebrow_34'],
    L = ['left_eyebrow_0', 'left_eyebrow_55', 'left_eyebrow_42', 'left_eyebrow_34'],
    M = ['left_eyebrow_12', 'left_eyebrow_55', 'left_eyebrow_34'],
    P = Array.from(new Set(i(i([], w), L))),
    A = ['left_eye_eyelid_0', 'left_eye_eyelid_8', 'left_eye_eyelid_16', 'left_eye_eyelid_24', 'left_eye_eyelid_31'],
    T = ['left_eye_eyelid_31', 'left_eye_eyelid_38', 'left_eye_eyelid_52', 'left_eye_eyelid_0'],
    S = Array.from(new Set(i(i([], A), T))),
    k = P.concat(S),
    O = ['nose_right_0', 'nose_right_27', 'nose_right_39', 'nose_right_51', 'nose_midline_53', 'nose_left_52', 'nose_left_40', 'nose_left_28', 'nose_left_0'],
    D = ['upper_lip_0', 'upper_lip_6', 'upper_lip_12', 'upper_lip_16', 'upper_lip_20', 'upper_lip_27', 'upper_lip_33'],
    j = ['upper_lip_0', 'upper_lip_56', 'upper_lip_49', 'upper_lip_42', 'upper_lip_33'],
    G = ['upper_lip_0', 'lower_lip_53', 'lower_lip_46', 'lower_lip_39', 'upper_lip_33'],
    B = ['upper_lip_0', 'lower_lip_7', 'lower_lip_14', 'lower_lip_18', 'lower_lip_25', 'upper_lip_33'],
    z = Array.from(new Set(i(i(i(i([], D), j), G), B))),
    I = 'nose_left_40',
    Z = 'nose_right_39',
    K = 'nose_midline_53',
    R = 'nose_right_0',
    F = [
      ['face_contour_right_49', 'face_contour_right_36'],
      ['face_contour_right_0', 'face_contour_right_36']
    ],
    E = 'face_hairline_72',
    W = 'face_hairline_0',
    H = 'face_hairline_144',
    N = 'face_contour_right_0',
    U = ['face_contour_left_20', 'lower_lip_63'],
    V = ['upper_lip_33', 'face_contour_right_20'],
    q = (function () {
      for (var t = [], e = 0; e <= 144; e++) t.push('face_hairline_' + e), e < 64 && (t.push('face_contour_left_' + e), t.push('face_contour_right_' + e))
      return t
    })(),
    Y = (function () {
      for (var t = [], e = 0; e <= 63; e++) t.push('left_eyebrow_' + e), t.push('left_eye_eyelid_' + e)
      return t
    })()
  function J(t) {
    return {
      face: {
        width: 0.6 * t.width,
        height: 0.5 * t.height,
        x: 0.2 * t.width,
        y: 0.15 * t.height
      },
      eyes: {
        width: 0.35 * t.width,
        height: 0.35 * t.height,
        x: 0.4 * t.width,
        y: 0.3 * t.height
      }
    }
  }
  var X = 200,
    $ = 400
  function Q(t) {
    var e = t.layer
    t.update, t.begin
    var n = t.element,
      i = t.duration,
      o = t.offset,
      a = (function (t, e) {
        var n = {}
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r])
        if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
          var i = 0
          for (r = Object.getOwnPropertySymbols(t); i < r.length; i++) e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]])
        }
        return n
      })(t, ['layer', 'update', 'begin', 'element', 'duration', 'offset']),
      s = Array.isArray(n) ? n : [n]
    return _r(_r({}, a), {
      offset: 'number' == typeof o ? o : X,
      duration: 'number' == typeof i ? i : $,
      begin: function begin() {
        e.addChild(s)
      },
      update: function update(t) {
        var e = t.progress
        s.map(function (t) {
          return (t.alpha = e)
        })
      }
    })
  }
  function tt(t) {
    var e = t.layer,
      n = t.delay,
      r = t.stay,
      i = t.duration,
      o = t.element,
      a = Array.isArray(o) ? o : [o]
    return [
      {
        offset: n,
        duration: i,
        begin: function begin(t) {
          e.addChild(a)
        },
        update: function update(t) {
          var e = t.progress
          a.map(function (t) {
            return (t.alpha = e)
          })
        }
      },
      {
        offset: r,
        duration: i,
        update: function update(t) {
          var e = t.progress
          a.map(function (t) {
            return (t.alpha = 1 - e)
          })
        },
        complete: function complete(t) {
          a.map(function (t) {
            return e.removeChild(t)
          })
        }
      }
    ]
  }
  var et = {
    exports: {}
  }
  !(function (t, e) {
    !(function (t) {
      function e(t, e, n) {
        return Math.min(Math.max(t, e), n)
      }
      var n = {
        arr: function arr(t) {
          return Array.isArray(t)
        },
        bol: function bol(t) {
          return 'boolean' == typeof t
        },
        obj: function obj(t) {
          return (e = 'Object'), Object.prototype.toString.call(t).indexOf(e) > -1
          var e
        },
        str: function str(t) {
          return 'string' == typeof t
        },
        fnc: function fnc(t) {
          return 'function' == typeof t
        },
        num: function num(t) {
          return 'number' == typeof t
        },
        und: function und(t) {
          return void 0 === t
        },
        nil: function nil(t) {
          return n.und(t) || null === t
        },
        hex: function hex(t) {
          return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
        },
        rgb: function rgb(t) {
          return /^rgb/.test(t)
        },
        hsl: function hsl(t) {
          return /^hsl/.test(t)
        },
        col: function col(t) {
          return n.hex(t) || n.rgb(t) || n.hsl(t)
        }
      }
      function r(t) {
        var e = Number(t)
        return isNaN(e) ? 0 : e
      }
      function i(t) {
        return n.rgb(t)
          ? (r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((e = t)))
            ? 'rgba(' + r[1] + ',1)'
            : e
          : n.hex(t)
          ? (function (t) {
              var e = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (t, e, n, r) {
                  return e + e + n + n + r + r
                }),
                n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)
              return 'rgba(' + parseInt(n[1], 16) + ',' + parseInt(n[2], 16) + ',' + parseInt(n[3], 16) + ',1)'
            })(t)
          : n.hsl(t)
          ? (function (t) {
              var e,
                n,
                r,
                i = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),
                o = parseInt(i[1], 10) / 360,
                a = parseInt(i[2], 10) / 100,
                s = parseInt(i[3], 10) / 100,
                l = i[4] || 1
              function h(t, e, n) {
                return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < 0.5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
              }
              if (0 == a) e = n = r = s
              else {
                var u = s < 0.5 ? s * (1 + a) : s + a - s * a,
                  c = 2 * s - u
                ;(e = h(c, u, o + 1 / 3)), (n = h(c, u, o)), (r = h(c, u, o - 1 / 3))
              }
              return 'rgba(' + Math.round(255 * e) + ',' + Math.round(255 * n) + ',' + Math.round(255 * r) + ',' + l + ')'
            })(t)
          : void 0
        var e, r
      }
      function o() {
        return !!document && document.hidden
      }
      function a(t, e) {
        var n = /^(\*=|\+=|-=)/.exec(t)
        if (!n) return t
        var r = parseFloat(e),
          i = parseFloat(t.replace(n[0], ''))
        switch (n[0][0]) {
          case '+':
            return r + i + 0
          case '-':
            return r - i + 0
          default:
            return r * i + 0
        }
      }
      var s = function s(t, e) {
          return -1
        },
        l = function l(t) {}
      'undefined' != typeof window && window.requestAnimationFrame
        ? ((s = window.requestAnimationFrame), (l = window.cancelAnimationFrame))
        : 'undefined' != typeof window && window.setTimeout
        ? ((s = function s(t, e) {
            var n = e || 0,
              r = new Date().getTime(),
              i = Math.max(0, 16.7 - (r - n))
            return (
              (n = r + i),
              window.setTimeout(function () {
                t(r + i)
              }, i)
            )
          }),
          (l = window.clearTimeout))
        : console.warn('@/utils/@milimu/timeline engine: 该环境中缺少requestAnimationFrame/setTimeout，请自行设置timer')
      var h = new (function () {
          var t = this
          ;(this.suspendWhenDocumentHidden = !0),
            (this.activeAnimates = []),
            (this.setTimer = function (t) {
              ;(s = t.timer), (l = t.cancel)
            }),
            (this.setSuspendWhenDocumentHidden = function (e) {
              t.suspendWhenDocumentHidden = e
            }),
            (this.handleVisibilityChange = function () {
              t.suspendWhenDocumentHidden &&
                (o()
                  ? t.stopEngine()
                  : (t.activeAnimates.forEach(function (t) {
                      return t._onDocumentVisibility()
                    }),
                    t.engine()))
            }),
            (this.stopEngine = function () {
              t.raf && l(t.raf), (t.raf = void 0)
            }),
            (this.engine = function () {
              s ? t.raf || (o() && t.suspendWhenDocumentHidden) || !(t.activeAnimates.length > 0) || (t.raf = s(t.step.bind(t))) : console.error('timer 未定义')
            }),
            (this.step = function (e) {
              for (var n = t.activeAnimates.length, r = 0; r < n; ) {
                var i = t.activeAnimates[r]
                i.paused ? (t.activeAnimates.splice(r, 1), n--) : (i.tick(e), r++)
              }
              t.raf = r > 0 ? s(t.step.bind(t)) : void 0
            }),
            'undefined' != typeof document && document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this))
        })(),
        u = (function () {
          function t(r) {
            var i = this
            ;(this.duration = 0),
              (this.callbacks = {}),
              (this.loop = 1),
              (this.remaining = 1),
              (this.direction = 'normal'),
              (this.autoplay = !1),
              (this.passThrough = !0),
              (this.currentTime = 0),
              (this.progress = 0),
              (this.paused = !0),
              (this.began = !1),
              (this.completed = !0),
              (this.reversed = !0),
              (this.startTime = 0),
              (this.now = 0),
              (this.lastTime = 0),
              (this.resolve = null),
              (this.speed = 1),
              (this.__tracks = {}),
              (this.__trackDeleteCache = {}),
              (this.__trackCache = []),
              (this.add = function (t) {
                return i.__trackCache.push(t), i
              }),
              (this.remove = function (t) {
                if (n.str(t)) {
                  var e = i.__tracks[t]
                  e && (i.__trackDeleteCache[e.name] = -1)
                } else
                  for (var r in i.__tracks) {
                    var o = i.__tracks[r].animations.findIndex(function (e) {
                      return e === t
                    })
                    if (o > -1) {
                      1 === i.__tracks[r].animations.length ? (i.__trackDeleteCache[r] = -1) : (i.__trackDeleteCache[r] || (i.__trackDeleteCache[r] = new Set()), i.__trackDeleteCache[r].add(o))
                      break
                    }
                  }
                return i
              }),
              (this.update = function () {
                if (!i.__trackCache.length && !Object.keys(i.__trackDeleteCache).length) return i
                i.passThrough = !0
                var e = t.engine.activeAnimates.indexOf(i)
                e > -1 && t.engine.activeAnimates.splice(e, 1),
                  i.removeAnimationFromTrack(i.__trackDeleteCache),
                  i.addTrack(i.__trackCache),
                  (i.duration = Object.values(i.__tracks).reduce(
                    function (t, e) {
                      return t.end > e.end ? t : e
                    },
                    {
                      end: i.duration
                    }
                  ).end),
                  (i.__trackCache = []),
                  (i.__trackDeleteCache = {})
                var n = i.began,
                  r = i.completed,
                  o = i.reversed,
                  a = i.remaining,
                  s = i.currentTime
                return i.reset(), n && !r && ((i.began = n), (i.reversed = o), (i.remaining = a), (i.currentTime = s)), i.autoplay && i.play(), i
              }),
              (this.destroy = function () {
                i.passThrough = !0
                var e = t.engine.activeAnimates.indexOf(i)
                e > -1 && t.engine.activeAnimates.splice(e, 1), i.reset(), (i.__tracks = {}), (i.__trackCache = []), (i.__trackDeleteCache = {})
              }),
              (this.removeAnimationFromTrack = function (t) {
                for (var e in t) i.__tracks[e] && (-1 !== t[e] ? i.__tracks[e].remove(Array.from(t[e])).update() : (i.__tracks[e].remove().update(), delete i.__tracks[e]))
              }),
              (this.addTrack = function (t) {
                for (var e = 0, n = t; e < n.length; e++) {
                  var r = n[e]
                  i.__tracks[r.name] = r
                  try {
                    r.update()
                  } catch (t) {
                    //                     t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    console.log(t, r)
                  }
                }
              }),
              (this.initSettings = function (t) {
                for (var e = 0, r = ['update', 'begin', 'loopBegin', 'loopComplete', 'complete']; e < r.length; e++) {
                  var o = r[e]
                  i.callbacks[o] = t[o]
                }
                n.und(t.direction) || (i.direction = t.direction),
                  n.und(t.loop) || ('alternate' === i.direction && 1 !== t.loop ? (i.loop = 2 * t.loop) : (i.loop = t.loop)),
                  'boolean' == typeof t.autoplay && (i.autoplay = t.autoplay)
              }),
              (this.resetTime = function () {
                ;(i.startTime = 0), (i.lastTime = i.adjustTime(i.currentTime) * (1 / i.speed))
              }),
              (this.adjustTime = function (t) {
                return i.reversed ? i.duration - t : t
              }),
              (this.tick = function (t) {
                var e
                ;(i.now = t), i.startTime || (i.startTime = i.now), i.setProgress((i.now + (i.lastTime - i.startTime)) * i.speed), null === (e = i.customRenderer) || void 0 === e || e.call(i)
              }),
              (this.setProgress = function (t) {
                var n = i.duration,
                  r = i.adjustTime(t)
                ;(i.progress = e((r / n) * 100, 0, 100)),
                  !i.began && i.currentTime > 0 && ((i.began = !0), i.lifeCycleHook('begin')),
                  0 === i.currentTime && i.setAnimationsProgress(0),
                  (r >= n && i.currentTime !== n) || !n ? i.setAnimationsProgress(n) : i.setAnimationsProgress(r),
                  (i.currentTime = e(r, 0, n)),
                  i.began && i.lifeCycleHook('update'),
                  t >= n &&
                    ((i.lastTime = 0),
                    i.countIteration(),
                    i.remaining
                      ? ((i.startTime = i.now), 'alternate' === i.direction && i.toggleChangeDirection())
                      : ((i.paused = !0),
                        i.completed ||
                          ((i.completed = !0),
                          i.lifeCycleHook('complete'),
                          !i.passThrough &&
                            Promise &&
                            (i.resolve(),
                            (i.finished = new Promise(function (t) {
                              return (i.resolve = t)
                            }))))))
              }),
              (this.countIteration = function () {
                i.remaining && i.remaining--
              }),
              (this.toggleChangeDirection = function () {
                'alternate' !== i.direction && (i.direction = 'normal' !== i.direction ? 'normal' : 'reverse'), (i.reversed = !i.reversed)
              }),
              (this.lifeCycleHook = function (t) {
                var e, n
                !i.passThrough && (null === (n = (e = i.callbacks)[t]) || void 0 === n || n.call(e, i))
              }),
              (this._onDocumentVisibility = this.resetTime),
              (this.setAnimationsProgress = function (t) {
                for (var e = 0, n = Object.values(i.__tracks); e < n.length; e++) {
                  var r = n[e]
                  t < r.start ? r.finished && (r.finished = !1) : (t > r.end && r.finished) || r.run(t)
                }
              }),
              (this.seek = function (t) {
                return i.setProgress(i.adjustTime(t)), i
              }),
              (this.pause = function () {
                return (i.paused = !0), i.resetTime(), i
              }),
              (this.play = function () {
                if (i.paused && (i.completed && i.reset(), 0 !== i.duration)) return (i.paused = !1), t.engine.activeAnimates.push(i), i.resetTime(), t.engine.engine(), i
              }),
              (this.restart = function () {
                return i.reset(), i.play(), i
              }),
              (this.reset = function () {
                return (
                  (i.passThrough = !1),
                  (i.currentTime = 0),
                  (i.progress = 0),
                  (i.paused = !0),
                  (i.began = !1),
                  (i.completed = !1),
                  (i.reversed = 'reverse' === i.direction),
                  (i.remaining = i.loop),
                  ((i.reversed && i.loop) || ('alternate' === i.direction && 1 === i.loop)) && i.remaining++,
                  Object.values(i.__tracks).map(function (t) {
                    t.reset()
                  }),
                  i.setAnimationsProgress(i.reversed ? i.duration : 0),
                  i
                )
              }),
              (this.reverse = function () {
                return i.toggleChangeDirection(), (i.completed = !i.reversed), i.resetTime(), i
              }),
              r && n.fnc(r.renderer) && (this.customRenderer = r.renderer),
              (this.finished = new Promise(function (t) {
                return (i.resolve = t)
              })),
              this.initSettings(r || {})
          }
          return (
            Object.defineProperty(t.prototype, 'alternateReversed', {
              get: function get() {
                return this.reversed && 'alternate' === this.direction
              },
              enumerable: !1,
              configurable: !0
            }),
            (t.engine = h),
            t
          )
        })(),
        _c2 = function c(t, e) {
          return (
            (_c2 =
              Object.setPrototypeOf ||
              ({
                __proto__: []
              } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e
                }) ||
              function (t, e) {
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
              }),
            _c2(t, e)
          )
        },
        _f2 = function f() {
          return (
            (_f2 =
              Object.assign ||
              function (t) {
                for (var e, n = 1, r = arguments.length; n < r; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                return t
              }),
            _f2.apply(this, arguments)
          )
        },
        d = function d(t) {
          ;(this.start = 0), (this.end = 0), (this.began = !1), (this.finished = !1), (this.origin = t)
        },
        p = (function (t) {
          function i(i, o) {
            var a = t.call(this, '') || this
            return (
              (a.__delay = {
                pending: 0,
                current: 0
              }),
              (a.__animatables = []),
              (a.__animationConfigCache = []),
              (a.add = function (t, e) {
                var r = n.arr(t) ? t : [t]
                return (
                  n.num(e)
                    ? (a.__animationConfigCache = a.__animationConfigCache.slice(0, e).concat(r, a.__animationConfigCache.slice(e)))
                    : (a.__animationConfigCache = a.__animationConfigCache.concat(r)),
                  a
                )
              }),
              (a.remove = function (t) {
                if (n.und(t)) return (a.__animationConfigCache = []), a
                if (n.arr(t)) {
                  var e = []
                  return (
                    a.__animationConfigCache.map(function (n, r) {
                      t.includes(r) || e.push(n)
                    }),
                    (a.__animationConfigCache = e),
                    a
                  )
                }
                return (n.num(t)
                  ? t
                  : a.__animationConfigCache.findIndex(function (e) {
                      return e === t
                    })) > -1
                  ? (a.__animationConfigCache.splice(t, 1), a)
                  : a
              }),
              (a.update = function () {
                var t = a.calcAniamtables(),
                  e = t.__animatables,
                  n = t.start,
                  r = t.end
                return (a.__animatables = e), (a.start = n), (a.end = r), a
              }),
              (a.getDuration = function (t) {
                if ((void 0 === t && (t = !0), t)) return a.end - a.start
                var e = a.calcAniamtables(),
                  n = e.start
                return e.end - n
              }),
              (a.calcAniamtables = function () {
                for (var t = [], e = a.__tempAnimatable, n = 0, i = a.__animationConfigCache; n < i.length; n++) {
                  var o = i[n],
                    s = new d(o)
                  ;(s.start = e.end + r(o.offset)), (s.end = s.start + o.duration), t.push(s), (e = s)
                }
                for (var l = a.start, h = a.end, u = 0, c = t; u < c.length; u++) {
                  var f = c[u]
                  f.start < l && (l = f.start), f.end > h && (h = f.end)
                }
                return {
                  __animatables: t,
                  start: l,
                  end: h
                }
              }),
              (a.run = function (t) {
                a.__animatables.forEach(function (n) {
                  var r, i, o, a, s, l
                  if (t < n.start) n.finished = !1
                  else if (!(t > n.end && n.finished) && n.origin) {
                    var h = e(t - n.start, 0, n.origin.duration) / n.origin.duration
                    n.began ||
                      (null === (i = (r = n.origin).begin) ||
                        void 0 === i ||
                        i.call(r, {
                          progress: h,
                          time: t
                        }),
                      (n.began = !0)),
                      t >= n.end &&
                        !n.finished &&
                        ((h = 1),
                        (n.finished = !0),
                        null === (a = (o = n.origin).complete) ||
                          void 0 === a ||
                          a.call(o, {
                            progress: h,
                            time: t
                          })),
                      null === (l = (s = n.origin).update) ||
                        void 0 === l ||
                        l.call(s, {
                          progress: h,
                          time: t
                        })
                  }
                })
              }),
              (a.reset = function () {
                a.__animatables.map(function (t) {
                  ;(t.finished = !1), (t.began = !1)
                }),
                  (a.finished = !1)
              }),
              (a.name = i),
              (a.delay = r(null == o ? void 0 : o.delay)),
              (a.start = a.delay),
              (a.end = a.delay),
              a
            )
          }
          return (
            (function (t, e) {
              if ('function' != typeof e && null !== e) throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null')
              function n() {
                this.constructor = t
              }
              _c2(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()))
            })(i, t),
            Object.defineProperty(i.prototype, 'duration', {
              get: function get() {
                return this.end - this.start
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(i.prototype, 'delay', {
              get: function get() {
                return this.__delay.current
              },
              set: function set(t) {
                this.__delay.pending = t
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(i.prototype, 'animations', {
              get: function get() {
                return this.__animatables
                  .map(function (t) {
                    return t.origin
                  })
                  .filter(Boolean)
              },
              enumerable: !1,
              configurable: !0
            }),
            Object.defineProperty(i.prototype, '__tempAnimatable', {
              get: function get() {
                var t = new d(null)
                return (t.start = this.__delay.pending), (t.end = this.__delay.pending), t
              },
              enumerable: !1,
              configurable: !0
            }),
            i
          )
        })(d),
        y = 0.1
      function g(t, e) {
        return 1 - 3 * e + 3 * t
      }
      function _(t, e) {
        return 3 * e - 6 * t
      }
      function m(t) {
        return 3 * t
      }
      function b(t, e, n) {
        return ((g(e, n) * t + _(e, n)) * t + m(e)) * t
      }
      function v(t, e, n) {
        return 3 * g(e, n) * t * t + 2 * _(e, n) * t + m(e)
      }
      function x(t, e, n, r) {
        if (0 <= t && t <= 1 && 0 <= n && n <= 1) {
          var i = new Float32Array(11)
          if (t !== e || n !== r) for (var o = 0; o < 11; ++o) i[o] = b(o * y, t, n)
          return function (i) {
            return (t === e && n === r) || 0 === i || 1 === i ? i : b(a(i), e, r)
          }
        }
        function a(e) {
          for (var r = 0, o = 1; 10 !== o && i[o] <= e; ++o) r += y
          --o
          var a = r + ((e - i[o]) / (i[o + 1] - i[o])) * y,
            s = v(a, t, n)
          return s >= 0.001
            ? (function (t, e, n, r) {
                for (var i = 0; i < 4; ++i) {
                  var o = v(e, n, r)
                  if (0 === o) return e
                  e -= (b(e, n, r) - t) / o
                }
                return e
              })(e, a, t, n)
            : 0 === s
            ? a
            : (function (t, e, n, r, i) {
                var o,
                  a,
                  s = 0
                do {
                  ;(o = b((a = e + (n - e) / 2), r, i) - t) > 0 ? (n = a) : (e = a)
                } while (Math.abs(o) > 1e-7 && ++s < 10)
                return a
              })(e, r, r + y, t, n)
        }
      }
      function C(t) {
        return (
          void 0 === t && (t = 10),
          function (n) {
            return Math.ceil(e(n, 1e-6, 1) * t) * (1 / t)
          }
        )
      }
      var w,
        L,
        M =
          ((w = {
            linear: function linear() {
              return function (t) {
                return t
              }
            }
          }),
          (L = {
            Sine: function Sine() {
              return function (t) {
                return 1 - Math.cos((t * Math.PI) / 2)
              }
            },
            Circ: function Circ() {
              return function (t) {
                return 1 - Math.sqrt(1 - t * t)
              }
            },
            Back: function Back() {
              return function (t) {
                return t * t * (3 * t - 2)
              }
            },
            Bounce: function Bounce() {
              return function (t) {
                for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11; );
                return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
              }
            },
            Elastic: function Elastic(t, n) {
              void 0 === t && (t = 1), void 0 === n && (n = 0.5)
              var r = e(t, 1, 10),
                i = e(n, 0.1, 2)
              return function (t) {
                return 0 === t || 1 === t ? t : -r * Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1 - (i / (2 * Math.PI)) * Math.asin(1 / r)) * (2 * Math.PI)) / i)
              }
            }
          }),
          ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach(function (t, e) {
            L[t] = function () {
              return function (t) {
                return Math.pow(t, e + 2)
              }
            }
          }),
          Object.keys(L).forEach(function (t) {
            var e = L[t]
            ;(w['easeIn' + t] = e),
              (w['easeOut' + t] = function (t, n) {
                return function (r) {
                  return 1 - e(t, n)(1 - r)
                }
              }),
              (w['easeInOut' + t] = function (t, n) {
                return function (r) {
                  return r < 0.5 ? e(t, n)(2 * r) / 2 : 1 - e(t, n)(-2 * r + 2) / 2
                }
              }),
              (w['easeOutIn' + t] = function (t, n) {
                return function (r) {
                  return r < 0.5 ? (1 - e(t, n)(1 - 2 * r)) / 2 : (e(t, n)(2 * r - 1) + 1) / 2
                }
              })
          }),
          _f2(_f2({}, w), {
            bezier: x,
            steps: C
          })),
        P = {
          duration: 1e3,
          delay: 0,
          easing: M.easeOutElastic(1, 0.5)
        },
        A = function A(t, r) {
          var o = this
          ;(this.normalizeTweens = function (t, e) {
            var r
            return e.tweens.map(function (i) {
              var s = i.value,
                l = t[e.name] || 0,
                h = r ? r.to.original : l,
                u = n.arr(s) ? s[0] : h,
                c = n.arr(s) ? s[1] : s
              n.und(c) && (c = r)
              var d = _f2(_f2({}, i), {
                from: o.decomposeValue(u),
                to: o.decomposeValue(a(c, u)),
                start: 0,
                end: 0,
                isColor: !1
              })
              return (d.start = r ? r.end : 0), (d.end = d.start + d.delay + d.duration), (d.isColor = n.col(d.from.original)), (r = d), d
            })
          }),
            (this.decomposeValue = function (t) {
              var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
                r =
                  (function (t) {
                    return n.col(t) ? i(t) : (/\s/g.test(t), t)
                  })(t) + ''
              return {
                original: r,
                numbers: r.match(e) ? r.match(e).map(Number) : [0],
                strings: n.str(t) ? r.split(e) : []
              }
            }),
            (this.update = function (t) {
              var n = t.progress,
                r = o.tweens,
                i = r.length - 1,
                a = n * o.duration,
                s = r[i]
              i &&
                (s =
                  r.filter(function (t) {
                    return a < t.end
                  })[0] || s)
              for (var l = e(a - s.start - s.delay, 0, s.duration) / s.duration, h = isNaN(l) ? 1 : s.easing(l), u = s.to.strings, c = [], f = s.to.numbers.length, d = 0; d < f; d++) {
                var p = s.to.numbers[d],
                  y = s.from.numbers[d] || 0
                c.push(y + h * (p - y))
              }
              var g,
                _ = u.length
              if (_) {
                g = u[0]
                for (var m = 0; m < _; m++) isNaN(c[m]) || (u[m + 1] ? (g += c[m] + u[m + 1]) : (g += c[m] + ' '))
              } else g = c[0]
              ;(o.target[o.property] = g), (o.currentValue = g)
            }),
            (this.target = t),
            (this.property = r.name)
          var s = this.normalizeTweens(t, r),
            l = s[s.length - 1]
          ;(this.tweens = s), (this.duration = l.end), (this.delay = s[0].delay)
        }
      ;(t.Timeline = u),
        (t.Track = p),
        (t.createMotionTween = function (t) {
          var e = (function (t, e) {
              var r = _f2({}, e)
              return n.num(t.defaultDuration) && (r.duration = t.defaultDuration), n.num(t.defaultDelay) && (r.delay = t.defaultDelay), n.fnc(t.defaultEasing) && (r.easing = t.defaultEasing), r
            })(t, P),
            r = (function (t, e) {
              return Object.keys(t.property)
                .map(function (r) {
                  if (n.und(t.target[r])) return !1
                  var i = _f2({}, e),
                    o = t.property[r]
                  return (
                    n.arr(o) &&
                      (2 !== o.length || n.obj(o[0])
                        ? (i.duration = e.duration / o.length)
                        : (o = {
                            value: o
                          })),
                    {
                      name: r,
                      tweens: (n.arr(o) ? o : [o]).map(function (t, r) {
                        var o = n.obj(t)
                          ? t
                          : {
                              value: t
                            }
                        return n.und(o.delay) && (o.delay = r ? 0 : e.delay), _f2(_f2({}, i), o)
                      })
                    }
                  )
                })
                .filter(Boolean)
            })(t, e).map(function (e) {
              return new A(t.target, e)
            }),
            i = (function (t) {
              return {
                duration: t.length
                  ? Math.max.apply(
                      Math,
                      t.map(function (t) {
                        return t.duration
                      })
                    )
                  : 0,
                delay: t.length
                  ? Math.min.apply(
                      Math,
                      t.map(function (t) {
                        return t.delay
                      })
                    )
                  : 0
              }
            })(r)
          return {
            duration: i.duration,
            delay: i.delay,
            offset: t.offset,
            update: function update(e) {
              t.update
                ? t.update(
                    _f2(_f2({}, e), {
                      animations: r
                    })
                  )
                : r.map(function (t) {
                    return t.update(e)
                  })
            }
          }
        }),
        (t.easings = M),
        (t.engine = h)
    })(e)
  })(0, et.exports)
  var nt = _r({}, o.exports.defaultAnimationSetting),
    rt = (function (t) {
      function e(e, n) {
        var o = t.call(this, e) || this
        return (
          (o.beforeSetup = function () {
            ;(o.focus.keys = Y), o.focus.displayArea || (o.focus.displayArea = J(o.getFromController('deviceSize')).eyes)
          }),
          (o.run = function () {
            var t = o,
              e = t.tl,
              n = t.trackDelay,
              r = t.layer,
              i = new et.exports.Track('eyesAnalysis', {
                delay: n
              }),
              a = o._getEyesPinkElements(),
              s = a.points,
              l = a.lines
            i.add([
              Q({
                element: s,
                layer: r
              }),
              Q({
                element: l,
                layer: r
              }),
              Q({
                element: o._getEyesGradualLinesAndDashedLines(o.data),
                layer: r
              }),
              Q({
                element: o._getEyesArrowTexts(o.data),
                layer: r
              }),
              {
                duration: o.animtionConfig.endDelay,
                begin: function begin() {
                  return o.callLifeCycle('message', {
                    message: 'animationFinished'
                  })
                }
              }
            ]),
              null == e || e.add(i).update().play()
          }),
          (o._getEyesPinkElements = function () {
            for (var t = [], e = 0, n = i(i([], k), ['left_eye_pupil_center']); e < n.length; e++) {
              var r = n[e]
              t.push(
                d(o.toGlobalByKey(r), {
                  size: s.get('pointSize'),
                  color: s.get('themeColor')
                })
              )
            }
            for (var a = [], l = 0, h = [w, L, A, T]; l < h.length; l++) {
              for (var u = [], c = 0, f = h[l]; c < f.length; c++) {
                r = f[c]
                u.push(o.toGlobalByKey(r))
              }
              a.push(
                p(u, {
                  color: s.get('themeColor'),
                  size: s.get('lineWidth')
                })
              )
            }
            return {
              points: t,
              lines: a
            }
          }),
          (o._getEyesGradualLinesAndDashedLines = function (t) {
            var e = 2 * s.get('fontSize'),
              n = o._getEyesGradualLines(),
              r = o._calcEyebrowDashedLines(),
              a = r.horizontalDashLines,
              l = r.verticalDashLines,
              h = g(i(i([], a), l)),
              u = o._calcEyelidDashedLines(),
              c = u.horizontalDashLines,
              f = u.verticalDashLines,
              d = g(i(i([], c), f)),
              p = [
                v(
                  {
                    start: o.toGlobalByKey('left_eye_eyelid_52'),
                    center: o.toGlobalByKey('left_eye_eyelid_31'),
                    end: o.toGlobalByKey('left_eye_eyelid_24'),
                    radius: e
                  },
                  (t.eyes.angulus_oculi_medialis || 0) + '°',
                  {
                    x: 2 * -e,
                    y: 0.5 * -e
                  }
                ),
                v(
                  {
                    start: a[0][1],
                    center: o.toGlobalByKey('left_eyebrow_12'),
                    end: o.toGlobalByKey('left_eyebrow_31'),
                    radius: e
                  },
                  (t.eyebrow.brow_uptrend_angle || 0) + '°',
                  {
                    x: 1.5 * e,
                    y: 0
                  }
                ),
                v(
                  {
                    start: o.toGlobalByKey('left_eyebrow_0'),
                    center: o.toGlobalByKey('left_eyebrow_34'),
                    end: a[2][0],
                    radius: e
                  },
                  (t.eyebrow.brow_camber_angle || 0) + '°',
                  {
                    x: 1.5 * -e,
                    y: 0
                  }
                )
              ]
            return i(i(i(i([], n), h), d), p)
          }),
          (o._getEyesArrowTexts = function (t) {
            var e = o._calcEyebrowDashedLines(),
              n = e.verticalDashLines,
              r = e.horizontalDashLines,
              a = [
                b(r[0][0], r[2][0], '眉毛高度\n' + (t.eyebrow.brow_height || 0) + 'mm', {
                  vertical: 'vertical'
                }),
                b(r[0][1], r[1][1], '眉毛粗细\n' + (t.eyebrow.brow_thick || 0) + 'mm', {
                  vertical: 'vertical',
                  writePosition: 'right'
                }),
                b(n[0][0], n[1][0], '眉毛宽度\n' + (t.eyebrow.brow_width || 0) + 'mm', {
                  writePosition: 'top'
                })
              ]
            return i(i([], o._getEyelidTexts(t)), a)
          }),
          (o._getEyesGradualLines = function () {
            return m(
              [
                [o.toGlobalByKey('left_eyebrow_12'), o.toGlobalByKey('left_eyebrow_31')],
                [o.toGlobalByKey('left_eyebrow_0'), o.toGlobalByKey('left_eyebrow_34')],
                [o.toGlobalByKey('left_eye_eyelid_24'), o.toGlobalByKey('left_eye_eyelid_31')],
                [o.toGlobalByKey('left_eye_eyelid_31'), o.toGlobalByKey('left_eye_eyelid_52')]
              ],
              s.get('lineExtendLength')
            )
          }),
          (o._calcEyebrowDashedLines = function () {
            for (
              var t = 1.2 * s.get('fontSize'),
                e = 2 * s.get('fontSize'),
                n = o.toGlobalByKey('left_eyebrow_0'),
                r = o.toGlobalByKey(o.toGlobalByKey('left_eyebrow_34').x > o.toGlobalByKey('left_eyebrow_31').x ? 'left_eyebrow_34' : 'left_eyebrow_31'),
                i = o.toGlobalByKey(M[0]),
                a = o.toGlobalByKey(M[2]),
                l = [],
                h = 0;
              h < 3;
              h++
            )
              l.push([
                {
                  x: n.x - t,
                  y: o.toGlobalByKey(M[h]).y
                },
                {
                  x: r.x + t,
                  y: o.toGlobalByKey(M[h]).y
                }
              ])
            for (var u = [], c = 0, f = [n, r]; c < f.length; c++) {
              var d = f[c]
              u.push([
                {
                  x: d.x,
                  y: i.y - e
                },
                {
                  x: d.x,
                  y: a.y + e
                }
              ])
            }
            return {
              horizontalDashLines: l,
              verticalDashLines: u
            }
          }),
          (o._calcEyelidDashedLines = function () {
            for (var t = o.toGlobalByKey(S[0]), e = o.toGlobalByKey(S[0]), n = o.toGlobalByKey(S[0]), r = o.toGlobalByKey(S[0]), i = 0, a = S; i < a.length; i++) {
              var l = a[i],
                h = o.toGlobalByKey(l),
                u = h.x
              ;(g = h.y) < e.y &&
                (e = {
                  x: u,
                  y: g
                }),
                g > t.y &&
                  (t = {
                    x: u,
                    y: g
                  }),
                u < n.x &&
                  (n = {
                    x: u,
                    y: g
                  }),
                u > r.x &&
                  (r = {
                    x: u,
                    y: g
                  })
            }
            for (var c = 1.2 * s.get('fontSize'), f = 2 * s.get('fontSize'), d = [], p = 0, y = [e.y, t.y]; p < y.length; p++) {
              var g = y[p]
              d.push([
                {
                  x: n.x - c,
                  y: g
                },
                {
                  x: r.x + c,
                  y: g
                }
              ])
            }
            for (var _ = [], m = 0, b = [n.x, r.x]; m < b.length; m++) {
              u = b[m]
              _.push([
                {
                  x: u,
                  y: e.y - s.get('fontSize')
                },
                {
                  x: u,
                  y: t.y + f
                }
              ])
            }
            return {
              horizontalDashLines: d,
              verticalDashLines: _
            }
          }),
          (o._getEyelidTexts = function (t) {
            var e = o._calcEyelidDashedLines(),
              n = e.horizontalDashLines,
              i = e.verticalDashLines
            return [
              b(n[0][0], n[1][0], '眼睛高度\n' + t.eyes.eye_height + 'mm', {
                vertical: 'vertical'
              }),
              b(
                _r(_r({}, i[0][1]), {
                  y: i[0][1].y - s.get('fontSize')
                }),
                _r(_r({}, i[1][1]), {
                  y: i[1][1].y - s.get('fontSize')
                }),
                '眼睛宽度\n' + t.eyes.eye_width + 'mm'
              )
            ]
          }),
          (o.data = e.data),
          (o.animtionConfig = _r(_r({}, nt), n)),
          o
        )
      }
      return n(e, t), e
    })(o.exports.Animation),
    it = ['forehead_wrinkle', 'glabella_wrinkle', 'nasolabial_fold', 'mouth_wrinkle', 'pores_cheek', 'blackhead', 'brown_spot', 'acne'],
    ot = {
      lineWidth: s.get('lineWidth') / 2,
      dashSetting: s.get('dashSetting'),
      lineStyle: 'dashed',
      closePath: !0,
      lineColor: s.get('skinShapeDefaultColor')
    },
    at = {
      forehead_wrinkle: [
        {
          name: '抬头纹',
          shape: _r(
            {
              path: 'M 56.8202 -0.236716 L 56.8135 0.263239 C 56.1528 0.254421 55.4864 0.25 54.8144 0.25 L 54.8144 -0.25 C 55.4886 -0.25 56.1572 -0.245564 56.8202 -0.236716 Z M 60.8246 -0.126899 L 60.8037 0.372661 C 60.1443 0.344992 59.4788 0.321977 58.8071 0.303644 L 58.8208 -0.19617 C 59.4949 -0.177771 60.1628 -0.154672 60.8246 -0.126899 Z M 64.8271 0.103278 L 64.7904 0.601929 C 64.132 0.55346 63.4669 0.509947 62.7951 0.47142 L 62.8238 -0.02776 C 63.4982 0.010921 64.166 0.0546107 64.8271 0.103278 Z M 68.8165 0.465861 L 68.7624 0.962925 C 68.1091 0.89182 67.4486 0.825948 66.7808 0.76535 L 66.826 0.267396 C 67.4967 0.328264 68.1602 0.394431 68.8165 0.465861 Z M 72.808 0.978033 L 72.7345 1.4726 C 72.0831 1.37578 71.4237 1.28457 70.7564 1.19904 L 70.82 0.703096 C 71.4906 0.789055 72.1533 0.880716 72.808 0.978033 Z M 76.7484 1.65016 L 76.6534 2.14104 C 76.0081 2.01615 75.3541 1.89725 74.6914 1.78441 L 74.7754 1.2915 C 75.4418 1.40498 76.0994 1.52455 76.7484 1.65016 Z M 80.6731 2.50913 L 80.5539 2.99471 C 79.9166 2.83825 79.2697 2.68821 78.6131 2.54465 L 78.7199 2.05619 C 79.3807 2.20065 80.0317 2.35166 80.6731 2.50913 Z M 84.5525 3.57616 L 84.406 4.05422 C 83.7793 3.86221 83.1418 3.67707 82.4934 3.4989 L 82.6259 3.01677 C 83.2789 3.19623 83.9211 3.38272 84.5525 3.57616 Z M 88.3426 4.8694 L 88.1656 5.33702 C 87.5531 5.1052 86.9285 4.88074 86.2916 4.66375 L 86.4528 4.19047 C 87.095 4.40924 87.7249 4.63559 88.3426 4.8694 Z M 92.0528 6.43103 L 91.8413 6.88409 C 91.2485 6.60736 90.6419 6.33847 90.0213 6.07759 L 90.2151 5.61666 C 90.8416 5.88004 91.4541 6.15155 92.0528 6.43103 Z M 95.6296 8.2899 L 95.3794 8.72281 C 94.8139 8.39602 94.2326 8.07751 93.6354 7.7675 L 93.8658 7.32374 C 94.4696 7.6372 95.0576 7.95933 95.6296 8.2899 Z M 99.02 10.4808 L 98.727 10.886 C 98.1979 10.5034 97.6505 10.1295 97.0849 9.76441 L 97.3561 9.34431 C 97.9291 9.71413 98.4837 10.0931 99.02 10.4808 Z M 102.155 13.0386 L 101.816 13.406 C 101.337 12.9638 100.837 12.5302 100.316 12.1057 L 100.632 11.7181 C 101.161 12.1491 101.669 12.5894 102.155 13.0386 Z M 104.928 15.9703 L 104.541 16.2872 C 104.129 15.7838 103.692 15.2883 103.231 14.8015 L 103.594 14.4577 C 104.063 14.9531 104.508 15.4576 104.928 15.9703 Z M 107.235 19.2838 L 106.803 19.5351 C 106.476 18.9724 106.121 18.4163 105.738 17.8676 L 106.148 17.5815 C 106.539 18.1414 106.901 18.7092 107.235 19.2838 Z M 108.942 22.9285 L 108.472 23.0981 C 108.251 22.4855 107.999 21.8764 107.715 21.2722 L 108.168 21.0595 C 108.458 21.6778 108.716 22.3013 108.942 22.9285 Z M 109.932 26.8715 L 109.437 26.9424 C 109.345 26.2979 109.217 25.6513 109.055 25.005 L 109.54 24.8831 C 109.707 25.5461 109.837 26.2098 109.932 26.8715 Z M 110.059 30.9415 L 109.56 30.8993 C 109.615 30.2523 109.632 29.5945 109.611 28.9295 L 110.111 28.9138 C 110.133 29.5981 110.115 30.2752 110.059 30.9415 Z M 109.204 34.9442 L 108.733 34.7763 C 108.95 34.1674 109.129 33.5348 109.268 32.8833 L 109.757 32.9875 C 109.613 33.6605 109.429 34.3144 109.204 34.9442 Z M 107.27 38.5604 L 106.872 38.2579 C 107.261 37.7466 107.613 37.1941 107.927 36.6061 L 108.368 36.8413 C 108.042 37.4527 107.675 38.0276 107.27 38.5604 Z M 104.235 41.3187 L 103.978 40.8902 C 104.528 40.5591 105.051 40.1681 105.539 39.7217 L 105.877 40.0909 C 105.364 40.5594 104.815 40.9704 104.235 41.3187 Z M 100.322 42.6675 L 100.232 42.1757 L 100.835 42.0613 C 100.938 42.0413 101.041 42.0206 101.147 41.9992 C 101.495 41.928 101.837 41.8362 102.172 41.7243 L 102.33 42.1986 C 101.976 42.3168 101.615 42.4137 101.247 42.4891 L 100.625 42.611 C 100.524 42.6302 100.423 42.649 100.322 42.6675 Z M 96.3449 43.2358 L 96.2933 42.7384 C 96.9558 42.6697 97.6139 42.5888 98.2691 42.4953 L 98.3397 42.9903 C 97.6781 43.0847 97.0137 43.1664 96.3449 43.2358 Z M 92.3316 43.5063 L 92.3152 43.0066 C 92.9856 42.9845 93.6477 42.9517 94.3036 42.9078 L 94.3369 43.4067 C 93.6754 43.451 93.0076 43.484 92.3316 43.5063 Z M 88.3051 43.5171 L 88.3177 43.0173 C 88.9945 43.0343 89.6579 43.0423 90.3109 43.041 L 90.3119 43.541 C 89.6543 43.5423 88.9864 43.5342 88.3051 43.5171 Z M 84.3056 43.3268 L 84.3393 42.828 C 85.0227 42.874 85.685 42.9126 86.3318 42.9438 L 86.3077 43.4432 C 85.6576 43.4119 84.9922 43.3731 84.3056 43.3268 Z M 80.3073 42.9996 L 80.354 42.5018 L 81.8623 42.6372 C 82.0242 42.6511 82.1845 42.6646 82.3433 42.6777 L 82.3022 43.176 L 80.8237 43.0473 C 80.6537 43.0318 80.4817 43.0159 80.3073 42.9996 Z M 76.3164 42.5989 L 76.3685 42.1016 L 78.357 42.3068 L 78.3068 42.8043 L 76.3164 42.5989 Z M 72.3318 42.181 L 72.383 41.6837 L 74.3724 41.8913 L 74.32 42.3886 L 72.3318 42.181 Z M 68.3733 41.7943 L 68.4186 41.2963 L 69.7318 41.4191 C 69.9555 41.4406 70.1819 41.4625 70.4115 41.4851 L 70.3627 41.9827 L 68.3733 41.7943 Z M 64.3893 41.4692 L 64.4248 40.9704 C 65.0818 41.0172 65.7459 41.0682 66.4218 41.1235 L 66.381 41.6218 C 65.7069 41.5666 65.0445 41.5158 64.3893 41.4692 Z M 60.3998 41.2337 L 60.4228 40.7342 C 61.086 40.7648 61.7521 40.8 62.4232 40.8397 L 62.3936 41.3388 C 61.7247 41.2992 61.0608 41.2642 60.3998 41.2337 Z M 56.4046 41.1053 L 56.4135 40.6054 C 57.0803 40.6172 57.7476 40.6339 58.4165 40.6555 L 58.4004 41.1552 C 57.7339 41.1338 57.069 41.1171 56.4046 41.1053 Z M 52.4114 41.1222 L 52.3995 40.6223 C 53.0676 40.6065 53.7351 40.5956 54.4031 40.5896 L 54.4075 41.0896 C 53.742 41.0955 53.077 41.1064 52.4114 41.1222 Z M 48.4208 41.2738 L 48.3949 40.7745 C 49.0644 40.7398 49.7305 40.7097 50.395 40.6844 L 50.414 41.184 C 49.7519 41.2093 49.088 41.2392 48.4208 41.2738 Z M 44.4341 41.5308 L 44.396 41.0322 C 45.0698 40.9808 45.7347 40.9338 46.3944 40.8911 L 46.4266 41.3901 C 45.7689 41.4326 45.1059 41.4795 44.4341 41.5308 Z M 40.4509 41.8745 L 40.4036 41.3767 L 41.7436 41.2529 C 41.963 41.2332 42.1808 41.214 42.3973 41.1953 L 42.4404 41.6934 C 41.7925 41.7495 41.1325 41.8097 40.4509 41.8745 Z M 36.4758 42.2763 L 36.4234 41.779 L 38.4129 41.5727 L 38.4634 42.0702 L 36.4758 42.2763 Z M 32.4979 42.6982 L 32.4459 42.2009 L 34.4335 41.9905 L 34.4865 42.4877 L 32.4979 42.6982 Z M 28.5131 43.0901 L 28.4685 42.5921 L 29.9385 42.4547 C 30.1086 42.4382 30.2814 42.4213 30.457 42.4039 L 30.5063 42.9015 L 28.5131 43.0901 Z M 24.5146 43.392 L 24.4853 42.8928 C 25.1296 42.8551 25.7909 42.8102 26.4763 42.7579 L 26.5142 43.2565 C 25.826 43.3089 25.1618 43.354 24.5146 43.392 Z M 20.5045 43.5368 L 20.499 43.0369 C 21.151 43.0297 21.814 43.0136 22.492 42.9886 L 22.5104 43.4883 C 21.8282 43.5134 21.1608 43.5296 20.5045 43.5368 Z M 16.4817 43.4592 L 16.5076 42.9598 C 17.1638 42.9939 17.8266 43.017 18.4984 43.0296 L 18.489 43.5296 C 17.8117 43.5168 17.1435 43.4935 16.4817 43.4592 Z M 12.4836 43.1069 L 12.5461 42.6108 C 13.2024 42.6935 13.8616 42.7637 14.5255 42.8219 L 14.4818 43.32 C 13.8117 43.2612 13.1462 43.1903 12.4836 43.1069 Z M 8.49856 42.4425 L 8.61039 41.9552 L 8.84453 42.0056 C 9.41826 42.1214 9.99221 42.2269 10.5672 42.3223 L 10.4853 42.8155 C 9.90467 42.7192 9.32503 42.6127 8.74559 42.4957 L 8.49856 42.4425 Z M 4.80571 40.7004 L 5.10755 40.3018 C 5.63353 40.7001 6.18994 41.0393 6.7714 41.3152 L 6.55702 41.7669 C 5.94439 41.4762 5.35872 41.1192 4.80571 40.7004 Z M 2.05123 37.6801 L 2.47251 37.4108 C 2.83117 37.9719 3.22774 38.493 3.65816 38.9689 L 3.28733 39.3043 C 2.83811 38.8076 2.4247 38.2643 2.05123 37.6801 Z M 0.372812 33.9082 L 0.853702 33.7712 C 1.03597 34.4115 1.25799 35.0295 1.51757 35.6204 L 1.05979 35.8215 C 0.791003 35.2096 0.561282 34.5702 0.372812 33.9082 Z M -0.239586 29.9463 L 0.260118 29.9291 C 0.282975 30.594 0.344465 31.2492 0.443676 31.8908 L -0.0504512 31.9672 C -0.152703 31.3059 -0.21605 30.631 -0.239586 29.9463 Z M 0.0812179 25.868 L 0.572442 25.9613 C 0.448336 26.615 0.360193 27.2674 0.30777 27.9159 L -0.190605 27.8756 C -0.136743 27.2093 -0.0462099 26.5392 0.0812179 25.868 Z M 1.25448 21.9363 L 1.71715 22.1258 C 1.46421 22.7432 1.24387 23.3646 1.05617 23.9883 L 0.577376 23.8442 C 0.769729 23.205 0.995448 22.5685 1.25448 21.9363 Z M 3.1566 18.2902 L 3.57777 18.5596 C 3.21732 19.123 2.88573 19.6935 2.58312 20.2701 L 2.1404 20.0377 C 2.44968 19.4485 2.78845 18.8656 3.1566 18.2902 Z M 5.56001 15.1132 L 5.93502 15.4439 C 5.49145 15.947 5.07319 16.4586 4.68034 16.978 L 4.28155 16.6764 C 4.68199 16.1469 5.10818 15.6256 5.56001 15.1132 Z M 8.36582 12.3348 L 8.69405 12.712 C 8.18736 13.1529 7.70269 13.6029 7.24011 14.0615 L 6.8881 13.7064 C 7.3584 13.2402 7.851 12.7828 8.36582 12.3348 Z M 11.5759 9.86165 L 11.8582 10.2744 C 11.3032 10.6539 10.7673 11.0424 10.2505 11.4397 L 9.94579 11.0432 C 10.47 10.6403 11.0134 10.2464 11.5759 9.86165 Z M 15.0297 7.74913 L 15.2697 8.18776 C 14.6796 8.51065 14.106 8.8422 13.5489 9.18216 L 13.2884 8.75537 C 13.8523 8.41128 14.4327 8.07579 15.0297 7.74913 Z M 18.6555 5.96512 L 18.8576 6.42248 C 18.2422 6.69436 17.6411 6.97441 17.0546 7.26245 L 16.8342 6.81364 C 17.4268 6.52262 18.034 6.23972 18.6555 5.96512 Z M 22.415 4.46933 L 22.5832 4.94018 C 21.9493 5.16667 21.328 5.4008 20.7195 5.64243 L 20.535 5.17772 C 21.1489 4.93394 21.7756 4.69777 22.415 4.46933 Z M 26.261 3.23336 L 26.3993 3.71386 C 25.7524 3.90001 25.1168 4.09327 24.4924 4.29355 L 24.3397 3.81744 C 24.9689 3.61562 25.6093 3.4209 26.261 3.23336 Z M 30.1689 2.22637 L 30.2806 2.71372 C 29.6251 2.86403 28.9796 3.02094 28.3441 3.18438 L 28.2196 2.70014 C 28.8593 2.5356 29.5091 2.37765 30.1689 2.22637 Z M 34.1063 1.42444 L 34.1945 1.91658 C 33.5328 2.03525 32.8801 2.16007 32.2363 2.29098 L 32.1367 1.80101 C 32.7842 1.66933 33.4408 1.54378 34.1063 1.42444 Z M 38.064 0.802536 L 38.1314 1.29798 C 37.4652 1.38853 36.8072 1.48483 36.1573 1.58682 L 36.0798 1.09287 C 36.7331 0.990341 37.3945 0.893549 38.064 0.802536 Z M 42.0728 0.336484 L 42.1212 0.83413 C 41.4524 0.899264 40.791 0.969766 40.1371 1.0456 L 40.0795 0.548923 C 40.7365 0.47274 41.4009 0.401914 42.0728 0.336484 Z M 46.0615 0.0172176 L 46.0931 0.516218 C 45.4227 0.55868 44.7591 0.606176 44.1022 0.658673 L 44.0624 0.160262 C 44.722 0.107546 45.3884 0.0598534 46.0615 0.0172176 Z M 50.0783 -0.174322 L 50.0946 0.325413 C 49.4234 0.347271 48.7585 0.373859 48.0998 0.405149 L 48.0761 -0.0942875 C 48.7372 -0.125696 49.4046 -0.152383 50.0783 -0.174322 Z M 54.0987 -0.248326 L 54.1011 0.251669 C 53.4298 0.254819 52.7643 0.262425 52.1046 0.274464 L 52.0954 -0.225453 C 52.7574 -0.237533 53.4252 -0.245165 54.0987 -0.248326 Z'
            },
            ot
          ),
          getPosition: function getPosition(t) {
            var e = t('face_hairline_92'),
              n = e.x,
              r = e.y,
              i = t('face_hairline_50').x,
              o = Math.abs(i - n)
            return {
              x: n,
              y: r,
              width: o,
              height: (43.8 / 110.35) * o
            }
          }
        }
      ],
      glabella_wrinkle: [
        {
          name: '眉间纹',
          shape: _r(_r({}, ot), {
            path: 'M25.894626,41 C8.91532401,41 8.91532401,35.7775079 3.43064987,23.559256 C-2.05402427,11.3410041 0.475448964,1 24.3061603,1 C48.1368716,1 53.3998152,11.736631 48.1368716,21 C42.8739281,30.263369 42.8739281,41 25.894626,41 Z'
          }),
          getPosition: function getPosition(t) {
            var e = t('left_eyebrow_32'),
              n = e.x,
              r = e.y,
              i = t('right_eyebrow_32').x,
              o = Math.abs(i - n),
              a = (40 * o) / 55.5
            return {
              x: n,
              y: r - a,
              width: o,
              height: a
            }
          }
        }
      ],
      nasolabial_fold: [
        {
          name: '法令纹',
          shape: _r(
            {
              path: 'm2.426293,56.083302c3.690674,1.880492 12.98356,-8.961502 20.756254,-24.216274c7.77269,-15.254762 11.08183,-29.145639 7.391157,-31.026131c-3.690674,-1.880492 -12.983565,8.961511 -20.756254,24.216274c-7.772694,15.254771 -11.08183,29.145639 -7.391157,31.026131z'
            },
            ot
          ),
          getPosition: function getPosition(t) {
            var e = t('nose_left_30'),
              n = t('upper_lip_0'),
              r = Math.abs(e.y - n.y),
              i = (35 * r) / 59
            return {
              x: e.x - i,
              y: e.y,
              width: i,
              height: r
            }
          }
        },
        {
          name: '法令纹',
          shape: _r(
            {
              path: 'm30.573707,56.083302c3.690674,-1.880492 0.381538,-15.77136 -7.391157,-31.026131c-7.77269,-15.254762 -17.065581,-26.096766 -20.756254,-24.216274c-3.690674,1.880492 -0.381533,15.771369 7.391157,31.026131c7.772694,15.254771 17.065581,26.096766 20.756254,24.216274z'
            },
            ot
          ),
          getPosition: function getPosition(t) {
            var e = t('nose_right_30'),
              n = e.x,
              r = e.y,
              i = t('upper_lip_31').y,
              o = Math.abs(r - i)
            return {
              x: n,
              y: r,
              width: (35 * o) / 59,
              height: o
            }
          }
        }
      ],
      mouth_wrinkle: [
        {
          name: '嘴角纹',
          shape: _r(
            {
              path: 'M21.442592,0.565766047 L21.2354724,1.02085004 C21.8402093,1.29608037 22.3436805,1.67766014 22.7358575,2.16195842 L23.1244305,1.84729822 C22.6823417,1.3013641 22.116381,0.872423605 21.442592,0.565766047 Z M17.2902375,0.0744247415 L17.3479526,0.571082539 C18.0377275,0.490925902 18.6906485,0.478495058 19.2961325,0.534127047 L19.3418799,0.03622427 C18.7007157,-0.0226860202 18.0132824,-0.009598103 17.2902375,0.0744247415 Z M13.3686747,1.10511057 L13.5526905,1.57001724 C14.1858503,1.31940484 14.8114575,1.111004 15.4229624,0.946712889 L15.2932296,0.463836724 C14.6629903,0.63316115 14.0192898,0.847589154 13.3686747,1.10511057 Z M9.78075239,2.93087333 L10.0452463,3.35518804 C10.6152219,2.99989731 11.1905028,2.67409362 11.7669472,2.37969545 L11.5395319,1.93440646 C10.9503596,2.23530496 10.3627132,2.5681117 9.78075239,2.93087333 Z M6.52565906,5.33339983 L6.85241127,5.71186118 C7.06175417,5.53112079 7.27359432,5.35404547 7.49790087,5.17240986 C7.79844983,4.92928105 8.10282002,4.69396152 8.41045702,4.46677807 L8.11343097,4.06456479 C7.79988103,4.29611481 7.4896968,4.5359294 7.18334096,4.78375571 C6.95487785,4.96875712 6.73900497,5.14920336 6.52565906,5.33339983 Z M3.68699368,8.20545771 L4.07049612,8.52627833 C4.48635818,8.02916529 4.93173141,7.54044458 5.40392859,7.06362365 L5.04865685,6.71179699 C4.56667161,7.19850184 4.11187631,7.69756164 3.68699368,8.20545771 Z M1.39304105,11.5628373 L1.83400947,11.7985211 C2.13314723,11.2388292 2.47682403,10.6757822 2.86184175,10.1151611 L2.44968034,9.83210104 C2.05434751,10.407742 1.70103571,10.986574 1.39304105,11.5628373 Z M0.031987856,15.4049035 L0.526081071,15.4815318 C0.619588322,14.8786044 0.786464238,14.2464595 1.02401536,13.5949851 L0.554269661,13.4236988 C0.305869352,14.1049267 0.130672659,14.7685916 0.031987856,15.4049035 Z M0.734844025,19.4551704 L1.15112833,19.1782094 C0.811040407,18.6670426 0.59175829,18.0723706 0.494796972,17.4055173 L1.79412041e-13,17.4774615 C0.107332803,18.2156448 0.352480291,18.8804612 0.734844025,19.4551704 Z M4.32902024,21.5427521 L4.40217688,21.0481329 C3.71717821,20.9468182 3.10552322,20.7523752 2.5795387,20.4676306 L2.34150292,20.9073339 C2.92100903,21.2210527 3.58838053,21.4332078 4.32902024,21.5427521 Z M8.42867839,21.2629965 L8.31109621,20.7770187 C7.64146154,20.9390366 6.99349256,21.0459634 6.37593103,21.0964591 L6.41667814,21.594796 C7.06084317,21.5421251 7.73441528,21.4309733 8.42867839,21.2629965 Z M12.3203723,19.8167329 L12.0983277,19.3687417 C11.492305,19.6691138 10.8871985,19.9337239 10.288363,20.1605883 L10.4654989,20.6281595 C11.079789,20.3954403 11.6998686,20.1242826 12.3203723,19.8167329 Z M15.6989222,17.7752339 L15.4073806,17.3690277 C14.8639465,17.7590604 14.3118339,18.1230886 13.7544997,18.4593018 L14.0127707,18.8874327 C14.5815177,18.5443347 15.144727,18.1729901 15.6989222,17.7752339 Z M18.815328,15.1538264 L18.4647308,14.7973413 C17.9994461,15.2549412 17.5103653,15.6999718 16.9998245,16.1297659 L17.3218331,16.5122713 C17.8422189,16.0741893 18.3408374,15.6204801 18.815328,15.1538264 Z M21.4502839,12.0843687 L21.043043,11.7942741 C20.6696967,12.3183856 20.2615975,12.8380806 19.821677,13.3490609 L20.2005944,13.6752841 C20.650418,13.1528013 21.067975,12.621062 21.4502839,12.0843687 Z M23.4202246,8.53701295 L22.9553461,8.35292606 C22.7248462,8.93501237 22.4402807,9.52848421 22.1048883,10.1261445 L22.5409226,10.3708363 C22.8870503,9.75404592 23.1812929,9.14039221 23.4202246,8.53701295 Z M24.1370471,4.46568308 L23.6390975,4.51091831 C23.6932955,5.10752963 23.6545436,5.7538522 23.5240838,6.4378374 L24.0152297,6.53151602 C24.1541018,5.80342611 24.1956385,5.11065747 24.1370471,4.46568308 Z M23.1419923,1.86912844 L22.7514027,2.18128193 C22.8803065,2.34257586 22.995623,2.51345341 23.0973192,2.69358766 L23.5327236,2.44777672 C23.4179234,2.24443136 23.287631,2.05136246 23.1419923,1.86912844 Z'
            },
            ot
          ),
          getPosition: function getPosition(t) {
            var e = t(U[0]),
              n = t(U[1]),
              r = t(V[0]),
              i = t(V[1]),
              o = {
                left: {
                  x: e.x,
                  y: n.y,
                  width: Math.abs(e.x - n.x),
                  height: Math.abs(e.y - n.y)
                },
                right: {
                  x: r.x,
                  y: r.y,
                  width: Math.abs(r.x - i.x),
                  height: Math.abs(r.y - i.y)
                }
              },
              a = Math.max(o.left.width, o.right.width),
              s = (23 * a) / 25
            return {
              x: n.x - a,
              y: n.y,
              width: a,
              height: s
            }
          }
        },
        {
          name: '嘴角纹',
          shape: _r(
            {
              path: 'M2.72023963,0.565766047 L2.92735929,1.02085004 C2.32262233,1.29608037 1.81915118,1.67766014 1.42697417,2.16195842 L1.03840119,1.84729822 C1.48048993,1.3013641 2.04645065,0.872423605 2.72023963,0.565766047 Z M6.87259411,0.0744247415 L6.81487902,0.571082539 C6.12510415,0.490925902 5.47218319,0.478495058 4.86669918,0.534127047 L4.82095177,0.03622427 C5.46211597,-0.0226860202 6.14954922,-0.009598103 6.87259411,0.0744247415 Z M10.7941569,1.10511057 L10.6101412,1.57001724 C9.97698137,1.31940484 9.35137412,1.111004 8.73986925,0.946712889 L8.86960208,0.463836724 C9.49984136,0.63316115 10.1435418,0.847589154 10.7941569,1.10511057 Z M14.3820793,2.93087333 L14.1175854,3.35518804 C13.5476097,2.99989731 12.9723289,2.67409362 12.3958845,2.37969545 L12.6232998,1.93440646 C13.2124721,2.23530496 13.8001184,2.5681117 14.3820793,2.93087333 Z M17.6371726,5.33339983 L17.3104204,5.71186118 C17.1010775,5.53112079 16.8892373,5.35404547 16.6649308,5.17240986 C16.3643818,4.92928105 16.0600116,4.69396152 15.7523746,4.46677807 L16.0494007,4.06456479 C16.3629506,4.29611481 16.6731349,4.5359294 16.9794907,4.78375571 C17.2079538,4.96875712 17.4238267,5.14920336 17.6371726,5.33339983 Z M20.475838,8.20545771 L20.0923355,8.52627833 C19.6764735,8.02916529 19.2311002,7.54044458 18.7589031,7.06362365 L19.1141748,6.71179699 C19.59616,7.19850184 20.0509553,7.69756164 20.475838,8.20545771 Z M22.7697906,11.5628373 L22.3288222,11.7985211 C22.0296844,11.2388292 21.6860076,10.6757822 21.3009899,10.1151611 L21.7131513,9.83210104 C22.1084841,10.407742 22.4617959,10.986574 22.7697906,11.5628373 Z M24.1308438,15.4049035 L23.6367506,15.4815318 C23.5432433,14.8786044 23.3763674,14.2464595 23.1388163,13.5949851 L23.608562,13.4236988 C23.8569623,14.1049267 24.032159,14.7685916 24.1308438,15.4049035 Z M23.4279876,19.4551704 L23.0117033,19.1782094 C23.3517912,18.6670426 23.5710734,18.0723706 23.6680347,17.4055173 L24.1628317,17.4774615 C24.0554988,18.2156448 23.8103514,18.8804612 23.4279876,19.4551704 Z M19.8338114,21.5427521 L19.7606548,21.0481329 C20.4456534,20.9468182 21.0573084,20.7523752 21.5832929,20.4676306 L21.8213287,20.9073339 C21.2418226,21.2210527 20.5744511,21.4332078 19.8338114,21.5427521 Z M15.7341533,21.2629965 L15.8517354,20.7770187 C16.5213701,20.9390366 17.1693391,21.0459634 17.7869006,21.0964591 L17.7461535,21.594796 C17.1019885,21.5421251 16.4284164,21.4309733 15.7341533,21.2629965 Z M11.8424593,19.8167329 L12.064504,19.3687417 C12.6705266,19.6691138 13.2756332,19.9337239 13.8744686,20.1605883 L13.6973327,20.6281595 C13.0830426,20.3954403 12.4629631,20.1242826 11.8424593,19.8167329 Z M8.46390943,17.7752339 L8.7554511,17.3690277 C9.2988852,17.7590604 9.85099771,18.1230886 10.4083319,18.4593018 L10.1500609,18.8874327 C9.58131397,18.5443347 9.01810466,18.1729901 8.46390943,17.7752339 Z M5.34750366,15.1538264 L5.69810087,14.7973413 C6.16338559,15.2549412 6.65246635,15.6999718 7.1630072,16.1297659 L6.84099853,16.5122713 C6.32061272,16.0741893 5.8219943,15.6204801 5.34750366,15.1538264 Z M2.71254778,12.0843687 L3.11978867,11.7942741 C3.49313497,12.3183856 3.90123411,12.8380806 4.34115469,13.3490609 L3.96223721,13.6752841 C3.5124137,13.1528013 3.09485664,12.621062 2.71254778,12.0843687 Z M0.742607041,8.53701295 L1.20748554,8.35292606 C1.43798546,8.93501237 1.72255096,9.52848421 2.05794336,10.1261445 L1.62190907,10.3708363 C1.27578131,9.75404592 0.981538738,9.14039221 0.742607041,8.53701295 Z M0.0257845898,4.46568308 L0.523734159,4.51091831 C0.469536193,5.10752963 0.508288095,5.7538522 0.638747882,6.4378374 L0.147601961,6.53151602 C0.00872986991,5.80342611 -0.0328068232,5.11065747 0.0257845898,4.46568308 Z M1.0208394,1.86912844 L1.41142895,2.18128193 C1.28252518,2.34257586 1.16720866,2.51345341 1.06551247,2.69358766 L0.630108076,2.44777672 C0.744908283,2.24443136 0.875200615,2.05136246 1.0208394,1.86912844 Z'
            },
            ot
          ),
          getPosition: function getPosition(t) {
            var e = t(U[0]),
              n = t(U[1]),
              r = t(V[0]),
              i = t(V[1]),
              o = {
                left: {
                  x: n.x,
                  y: n.y,
                  width: Math.abs(e.x - n.x),
                  height: Math.abs(e.y - n.y)
                },
                right: {
                  x: r.x,
                  y: r.y,
                  width: Math.abs(r.x - i.x),
                  height: Math.abs(r.y - i.y)
                }
              },
              a = Math.max(o.left.width, o.right.width),
              s = (23 * a) / 25
            return {
              x: r.x,
              y: r.y,
              width: a,
              height: s
            }
          }
        }
      ],
      pores_cheek: [
        {
          name: '毛孔',
          shape: _r(
            {
              path: 'M7.13093178,2.81238071 C-5.03749736,9.35260743 0.336534138,60.7865356 27.1305619,60.7865356 C53.9245897,60.7865356 82.9535296,36.7141505 82.9535296,21.5446741 C82.9535296,6.37519777 19.2993609,-3.72784602 7.13093178,2.81238071 Z'
            },
            ot
          ),
          getPosition: function getPosition(t) {
            var e = t('face_contour_left_47'),
              n = t('nose_left_10'),
              r = Math.abs(n.x - e.x),
              i = (64 * r) / 87
            return {
              x: e.x,
              y: n.y,
              width: r,
              height: i
            }
          }
        },
        {
          name: '毛孔',
          shape: _r(
            {
              path: 'm63.87728,2.6882c10.09089,5.45019 5.63438,48.3118 -16.58506,48.3118c-22.21944,0 -46.29222,-20.06032 -46.29222,-32.70155c0,-12.64123 52.78638,-21.06043 62.87728,-15.61025z'
            },
            ot
          ),
          getPosition: function getPosition(t) {
            var e = t('face_contour_right_47'),
              n = t('nose_right_10'),
              r = Math.abs(n.x - e.x),
              i = (53 * r) / 72
            return {
              x: n.x,
              y: n.y,
              width: r,
              height: i
            }
          }
        }
      ],
      blackhead: [
        {
          name: '黑头',
          shape: _r(
            {
              path: 'M36.3141404,1 C27.6356434,1 20.3892532,7.7258252 17.7296554,14.4993193 C15.0700577,21.2728134 13.2174166,43.7522067 11.0415175,48.5247231 C8.86561837,53.2972395 -1.56041449,58.6412789 1.58741803,70.3013889 C4.73525054,81.961499 25.2524085,85 33.1403941,85 C41.0283798,85 67.1349997,83.5227914 68.8204777,70.3013889 C70.5059557,57.0799865 59.8173986,57.0799865 57.8883306,48.5247231 C55.9592627,39.9694597 55.9589973,19.457231 53.1411547,14.4993193 C50.323312,9.54140766 44.9926373,1 36.3141404,1 Z'
            },
            ot
          ),
          getPosition: function getPosition(t) {
            var e = t('nose_midline_14'),
              n = e.x,
              r = e.y,
              i = t('nose_midline_55'),
              o = i.x,
              a = i.y,
              s = Math.abs(a - r),
              l = (72 / 84) * s
            return {
              x: Math.max(n, o) - Math.abs(n - o) / 2 - l / 2,
              y: r,
              width: l,
              height: s
            }
          }
        }
      ],
      brown_spot: [],
      acne: []
    },
    st = ['dark_circle', 'crows_feet', 'eye_finelines', 'eye_pouch'],
    lt = {
      dark_circle: [
        {
          name: '黑眼圈',
          shape: _r(_r({}, ot), {
            path: 'M100.5,176 C155.452333,176 200,136.824916 200,88.5 C200,40.1750844 155.452333,1 100.5,1 C45.5476674,1 1,40.1750844 1,88.5 C1,136.824916 45.5476674,176 100.5,176 Z'
          }),
          getPosition: function getPosition(t) {
            var e = t('left_eye_eyelid_0'),
              n = t('left_eye_eyelid_31'),
              r = 1.4 * Math.abs(e.x - n.x)
            return {
              x: e.x - 0.2 * r,
              y: e.y - r / 2,
              width: r,
              height: r
            }
          }
        }
      ],
      crows_feet: [
        {
          name: '鱼尾纹',
          shape: _r(_r({}, ot), {
            path: 'M53.190962,66.8030712 C53.7692124,41.5338098 97.0540413,20.386201 97.0540413,6.78486207 C97.0540413,-6.81647683 4.50983297,-0.0624508954 1.09206941,66.8030712 C-0.315133122,94.3337446 14.2882957,125.008192 53.190962,131.72315 C95.5710633,139.038344 114.292873,112.861242 110.527909,105.405135 C103.234338,90.9609989 52.6074813,92.3008956 53.190962,66.8030712 Z'
          }),
          getPosition: function getPosition(t) {
            var e = t('left_eyebrow_0').x,
              n = t('left_eye_eyelid_0'),
              r = n.x,
              i = n.y,
              o = 1.7 * Math.abs(r - e),
              a = (146 * o) / 115
            return {
              x: r - (4 * o) / 5,
              y: i - (2 * a) / 5,
              width: o,
              height: a
            }
          }
        }
      ],
      eye_finelines: [
        {
          name: '眼部细纹',
          shape: _r(_r({}, ot), {
            path: 'M53.190962,66.8030712 C53.7692124,41.5338098 97.0540413,20.386201 97.0540413,6.78486207 C97.0540413,-6.81647683 4.50983297,-0.0624508954 1.09206941,66.8030712 C-0.315133122,94.3337446 14.2882957,125.008192 53.190962,131.72315 C95.5710633,139.038344 114.292873,112.861242 110.527909,105.405135 C103.234338,90.9609989 52.6074813,92.3008956 53.190962,66.8030712 Z'
          }),
          getPosition: function getPosition(t) {
            var e = t('left_eyebrow_0').x,
              n = t('left_eye_eyelid_0'),
              r = n.x,
              i = n.y,
              o = 1.7 * Math.abs(r - e),
              a = (146 * o) / 115
            return {
              x: r - (4 * o) / 5,
              y: i - (2 * a) / 5,
              width: o,
              height: a
            }
          }
        }
      ],
      eye_pouch: [
        {
          name: '眼袋',
          shape: _r(_r({}, ot), {
            path: 'M139.605101,8.29939551 C141.727562,20.5078388 119.995162,51.3984478 75.300952,51.400719 C30.6067418,51.4029901 0,30.167554 0,9.29007417 C0,-11.5874057 41.8986072,13.5501446 68.7203217,13.5487817 C95.5420362,13.5474187 137.48264,-3.90904783 139.605101,8.29939551 Z'
          }),
          getPosition: function getPosition(t) {
            var e = t('left_eye_eyelid_0'),
              n = e.x,
              r = e.y,
              i = t('left_eye_eyelid_31'),
              o = i.x,
              a = i.y,
              s = 1.2 * Math.abs(o - n),
              l = (63 / 142) * s
            return {
              x: n - 0.1 * s,
              y: Math.max(r, a + (1 / 8) * l),
              width: s,
              height: l
            }
          }
        }
      ]
    },
    ht = _r({}, o.exports.defaultAnimationSetting),
    ut = (function (t) {
      function e(e, n) {
        var i = t.call(this) || this
        return (
          (i.progress = 0),
          (i.beforeSetup = function () {
            ;(i.focus.keys = Y), i.focus.displayArea || (i.focus.displayArea = J(i.getFromController('deviceSize')).eyes)
          }),
          (i.run = function () {
            for (
              var t = i,
                e = t.tl,
                n = t.layer,
                r = t.trackDelay,
                o = new et.exports.Track('threeParts', {
                  delay: r
                }),
                a = function a(t) {
                  var e = i.animateConfigMap[t]
                  if (e) {
                    var r = e.map(function (e) {
                      var r = i._createShape(t, e)
                      return n.addChild(Object.values(r)), r
                    })
                    o.add(
                      et.exports.createMotionTween({
                        target: {
                          fill: 'rgba(0,0,0,0)',
                          textOpacity: 0,
                          shapeLineColor: s.get('skinShapeDefaultColor')
                        },
                        defaultEasing: et.exports.easings.linear(),
                        property: {
                          fill: [
                            {
                              value: 'rgba(0,0,0,0.2)',
                              duration: 300
                            },
                            {
                              value: 'rgba(0,0,0,0)',
                              duration: 300
                            }
                          ],
                          textOpacity: [
                            {
                              value: 1,
                              duration: 300
                            }
                          ],
                          shapeLineColor: [
                            {
                              value: s.get('skinShapeThemeColor'),
                              duration: 300
                            },
                            {
                              value: s.get('skinShapeDefaultColor'),
                              duration: 300
                            }
                          ]
                        },
                        update: function update(t) {
                          for (
                            var e = t.progress,
                              n = function n(t) {
                                t.update({
                                  progress: e
                                }),
                                  'fill' === t.property
                                    ? r.map(function (e) {
                                        ;(e.shape.fill = t.currentValue), (e.shape.alpha = 1)
                                      })
                                    : 'textOpacity' === t.property
                                    ? r.map(function (e) {
                                        return (e.text.alpha = t.currentValue)
                                      })
                                    : 'shapeLineColor' === t.property &&
                                      r.map(function (e) {
                                        return (e.shape.lineColor = t.currentValue)
                                      })
                              },
                              i = 0,
                              o = t.animations;
                            i < o.length;
                            i++
                          ) {
                            n(o[i])
                          }
                        }
                      })
                    )
                  }
                  o.add({
                    offset: -500,
                    duration: 500,
                    begin: function begin() {
                      0 === i.progress && i.callLifeCycle('begin'),
                        (i.progress += 1),
                        i.callLifeCycle('message', {
                          progress: i.progress
                        })
                    }
                  })
                },
                l = 0,
                h = i.order;
              l < h.length;
              l++
            ) {
              a(h[l])
            }
            var u = o.getDuration(!1)
            null == e ||
              e
                .add(o)
                .add(
                  new et.exports.Track('endDelay', {
                    delay: u
                  }).add({
                    duration: i.animtionConfig.endDelay,
                    begin: function begin() {
                      return i.callLifeCycle('message', {
                        message: 'animationFinished'
                      })
                    }
                  })
                )
                .update()
                .play()
          }),
          (i._createShape = function (t, e) {
            var n = e.shape,
              o = e.getPosition(i.toGlobalByKey),
              a = o.x,
              h = o.y,
              u = o.width,
              c = o.height,
              f = new l.exports.Polygon(
                _r(_r({}, n), {
                  x: a,
                  y: h,
                  width: u,
                  height: c
                })
              )
            f.alpha = 0
            var d = u / f.width
            f.setScale(d)
            var p = a + (f.width * d) / 2,
              y = h + (f.height * d) / 2
            ;['crows_feet', 'eye_finelines'].includes(t) && ((p = a + (f.width * d * 2) / 5), (y = 'crows_feet' === t ? h + (f.height * d) / 3 : h + (f.height * d * 3) / 4))
            var g = new l.exports.Text({
              text: e.name,
              x: p,
              y: y,
              fontSize: s.get('fontSize'),
              color: '#fff',
              textAlign: 'center',
              textBaseline: 'middle'
            })
            return (
              (g.alpha = 0),
              {
                shape: f,
                text: g
              }
            )
          }),
          (i.animtionConfig = _r(_r({}, ht), n)),
          (i.order = (null == e ? void 0 : e.order) || st),
          (i.animateConfigMap = c(lt, null == e ? void 0 : e.animateConfigMap)),
          i
        )
      }
      return n(e, t), e
    })(o.exports.Animation),
    ct = _r({}, o.exports.defaultAnimationSetting),
    ft = (function (t) {
      function e(e, n) {
        var o = t.call(this) || this
        return (
          (o.beforeSetup = function () {
            ;(o.focus.keys = q), o.focus.displayArea || (o.focus.displayArea = J(o.getFromController('deviceSize')).face)
          }),
          (o.run = function () {
            for (
              var t = o,
                e = t.tl,
                n = t.trackDelay,
                r = t.layer,
                a = new et.exports.Track('faceAnalysis', {
                  delay: n
                }),
                l = [],
                h = 0,
                u = C;
              h < u.length;
              h++
            ) {
              var c = u[h]
              l.push(
                d(o.toGlobalByKey(c), {
                  size: s.get('pointSize'),
                  color: s.get('strongPointColor')
                })
              )
            }
            for (var f = [], p = 0, y = F; p < y.length; p++) {
              for (var g = [], _ = 0, b = y[p]; _ < b.length; _++) {
                c = b[_]
                g.push(o.toGlobalByKey(c))
              }
              f.push(g)
            }
            var x = m(f, s.get('lineExtendLength')),
              w = 2.5 * s.get('fontSize'),
              L = v(
                {
                  start: o.toGlobalByKey('face_contour_right_0'),
                  center: o.toGlobalByKey('face_contour_right_36'),
                  end: o.toGlobalByKey('face_contour_right_49'),
                  radius: w
                },
                (o.data.face.E || 0) + '°',
                {
                  x: -w,
                  y: -w
                }
              ),
              M = o._getFaceRectDashLine(),
              P = o._getFaceRectDescriptionText()
            a.add([
              Q({
                layer: r,
                element: l,
                duration: 300
              }),
              Q({
                layer: r,
                offset: 700,
                element: i([L], x)
              }),
              Q({
                duration: 500,
                layer: r,
                element: M
              }),
              Q({
                layer: r,
                element: P
              }),
              {
                duration: o.animtionConfig.endDelay,
                begin: function begin() {
                  return o.callLifeCycle('message', {
                    message: 'animationFinished'
                  })
                }
              }
            ]),
              null == e || e.add(a).update().play()
          }),
          (o._getFaceRectDashLine = function () {
            var t = 1.5 * s.get('fontSize'),
              e = o.toGlobalByKey(E),
              n = o.toGlobalByKey(H),
              i = o.toGlobalByKey(W),
              a = o.toGlobalByKey(N),
              l = u(
                {
                  x: n.x,
                  y: e.y
                },
                {
                  x: i.x,
                  y: e.y
                },
                t
              ),
              h = u(
                {
                  x: n.x,
                  y: e.y
                },
                {
                  x: n.x,
                  y: a.y
                },
                t
              ),
              c = u(
                {
                  x: i.x,
                  y: e.y
                },
                {
                  x: i.x,
                  y: a.y
                },
                t
              ),
              f = u(
                {
                  x: n.x,
                  y: a.y
                },
                {
                  x: i.x,
                  y: a.y
                },
                t
              ),
              d = 5 * s.get('fontSize'),
              p = o.toGlobalByKey('face_contour_left_36'),
              y = o.toGlobalByKey('face_contour_right_36'),
              _ = [
                _r(_r({}, p), {
                  y: y.y - d
                }),
                _r(_r({}, p), {
                  y: y.y + d
                })
              ],
              m = [
                _r(_r({}, y), {
                  y: y.y - d
                }),
                _r(_r({}, y), {
                  y: y.y + d
                })
              ],
              b = s.get('fontSize'),
              v = o.toGlobalByKey('face_hairline_17'),
              x = o.toGlobalByKey('face_hairline_127')
            return g([
              l,
              h,
              c,
              f,
              _,
              m,
              u(
                {
                  x: v.x,
                  y: e.y
                },
                {
                  x: v.x,
                  y: a.y
                },
                b
              ),
              u(
                {
                  x: x.x,
                  y: e.y
                },
                {
                  x: x.x,
                  y: a.y
                },
                b
              )
            ])
          }),
          (o._getFaceRectDescriptionText = function () {
            var t = o.data,
              e = o.toGlobalByKey(E),
              n = o.toGlobalByKey(H),
              i = o.toGlobalByKey(W),
              a = o.toGlobalByKey(N),
              l = o.toGlobalByKey('face_contour_left_36'),
              h = o.toGlobalByKey('face_contour_right_36'),
              u = o.toGlobalByKey('face_hairline_127'),
              c = o.toGlobalByKey('face_hairline_17')
            return [
              b(
                {
                  x: n.x - 2 * s.get('triangleWidth'),
                  y: e.y
                },
                {
                  x: n.x - 2 * s.get('triangleWidth'),
                  y: a.y
                },
                '脸部长度\n' + t.face.face_length + 'mm',
                {
                  vertical: 'vertical'
                }
              ),
              b(
                {
                  x: l.x,
                  y: h.y
                },
                h,
                '下颌角宽度\n' + t.face.mandible_length + 'mm'
              ),
              b(
                {
                  x: u.x,
                  y: c.y
                },
                c,
                '颞部宽度\n' + t.face.tempus_length + 'mm'
              ),
              b(
                n,
                _r(_r({}, i), {
                  y: n.y
                }),
                '颧骨宽度\n' + t.face.zygoma_length + 'mm'
              )
            ]
          }),
          (o.data = e.data),
          (o.animtionConfig = _r(_r({}, ct), n)),
          o
        )
      }
      return n(e, t), e
    })(o.exports.Animation),
    dt = _r({}, o.exports.defaultAnimationSetting),
    pt = (function (t) {
      function e(e, n) {
        var o = t.call(this) || this
        return (
          (o.progress = 0),
          (o.beforeSetup = function () {
            ;(o.focus.keys = q), o.focus.displayArea || (o.focus.displayArea = J(o.getFromController('deviceSize')).face)
          }),
          (o.run = function () {
            for (
              var t = o,
                e = t.tl,
                n = t.layer,
                r = t.trackDelay,
                a = o.data,
                h = new et.exports.Track('threeParts', {
                  delay: r
                }),
                u = function u(t) {
                  if (['ance', 'brown_spot'].includes(t)) {
                    var e = new l.exports.Layer()
                    'acne' === t
                      ? (e = o._createRects(i(i(i(i([], a.acne.rectangle), a.acne_mark.rectangle), a.acne_nodule.rectangle), a.acne_pustule.rectangle)))
                      : 'brown_spot' === t && (e = o._createRects(a.brown_spot.rectangle)),
                      n.addChild(e),
                      h.add(
                        tt({
                          layer: n,
                          delay: 0,
                          stay: 500,
                          duration: 500,
                          element: e
                        })
                      )
                  } else {
                    var r = o.animateConfigMap[t]
                    if (r) {
                      var u = r.map(function (t) {
                        var e = o._createShape(t)
                        return n.addChild(Object.values(e)), e
                      })
                      h.add(
                        et.exports.createMotionTween({
                          target: {
                            fill: 'rgba(0,0,0,0)',
                            textOpacity: 0,
                            shapeLineColor: s.get('skinShapeDefaultColor')
                          },
                          defaultEasing: et.exports.easings.linear(),
                          property: {
                            fill: [
                              {
                                value: 'rgba(0,0,0,0.2)',
                                duration: 500
                              },
                              {
                                value: 'rgba(0,0,0,0)',
                                duration: 500
                              }
                            ],
                            textOpacity: [
                              {
                                value: 1,
                                duration: 500
                              }
                            ],
                            shapeLineColor: [
                              {
                                value: s.get('skinShapeThemeColor'),
                                duration: 500
                              },
                              {
                                value: s.get('skinShapeDefaultColor'),
                                duration: 500
                              }
                            ]
                          },
                          update: function update(t) {
                            for (
                              var e = t.progress,
                                n = function n(t) {
                                  t.update({
                                    progress: e
                                  }),
                                    'fill' === t.property
                                      ? u.map(function (e) {
                                          ;(e.shape.fill = t.currentValue), (e.shape.alpha = 1)
                                        })
                                      : 'textOpacity' === t.property
                                      ? u.map(function (e) {
                                          return (e.text.alpha = t.currentValue)
                                        })
                                      : 'shapeLineColor' === t.property &&
                                        u.map(function (e) {
                                          return (e.shape.lineColor = t.currentValue)
                                        })
                                },
                                r = 0,
                                i = t.animations;
                              r < i.length;
                              r++
                            ) {
                              n(i[r])
                            }
                          }
                        })
                      )
                    }
                  }
                  h.add({
                    offset: -500,
                    duration: 800,
                    begin: function begin() {
                      0 === o.progress && o.callLifeCycle('begin'),
                        (o.progress += 1),
                        o.callLifeCycle('message', {
                          progress: o.progress
                        })
                    }
                  })
                },
                c = 0,
                f = o.order;
              c < f.length;
              c++
            ) {
              u(f[c])
            }
            var d = h.getDuration(!1)
            null == e ||
              e
                .add(h)
                .add(
                  new et.exports.Track('endDelay', {
                    delay: d
                  }).add({
                    duration: o.animtionConfig.endDelay,
                    begin: function begin() {
                      return o.callLifeCycle('message', {
                        message: 'animationFinished'
                      })
                    }
                  })
                )
                .update()
                .play()
          }),
          (o._createShape = function (t) {
            var e = t.shape,
              n = t.getPosition(o.toGlobalByKey),
              i = n.x,
              a = n.y,
              h = n.width,
              u = n.height,
              c = new l.exports.Polygon(
                _r(_r({}, e), {
                  x: i,
                  y: a,
                  width: h,
                  height: u
                })
              )
            c.alpha = 0
            var f = h / c.width
            c.setScale(f)
            var d = new l.exports.Text({
              text: t.name,
              x: i + (c.width * f) / 2,
              y: a + (c.height * f) / 2,
              fontSize: s.get('fontSize'),
              color: '#fff',
              textAlign: 'center',
              textBaseline: 'middle'
            })
            return (
              (d.alpha = 0),
              {
                shape: c,
                text: d
              }
            )
          }),
          (o._createRects = function (t) {
            var e = new l.exports.Layer()
            return (
              t.map(function (t) {
                var n = o.toGlobalByPosition({
                    x: t.left,
                    y: t.top
                  }),
                  i = o.toGlobalByPosition({
                    x: t.left + t.width,
                    y: t.top + t.height
                  }),
                  a = new l.exports.Rect(
                    _r(_r({}, n), {
                      width: i.x - n.x,
                      height: i.y - n.y,
                      border: s.get('lineWidth') / 2 + 'px solid #fff'
                    })
                  )
                e.addChild(a)
              }),
              (e.alpha = 0),
              e
            )
          }),
          (o.data = e.data),
          (o.animtionConfig = _r(_r({}, dt), n)),
          (o.order = e.order || it),
          (o.animateConfigMap = c(at, e.animateConfigMap)),
          o
        )
      }
      return n(e, t), e
    })(o.exports.Animation),
    yt = _r(_r({}, o.exports.defaultAnimationSetting), {
      dashedLinesDuration: 200
    }),
    gt = (function (t) {
      function e(e, n) {
        var i = t.call(this) || this
        return (
          (i.beforeSetup = function () {
            ;(i.focus.keys = q), i.focus.displayArea || (i.focus.displayArea = J(i.getFromController('deviceSize')).face)
          }),
          (i.run = function () {
            for (
              var t = i,
                e = t.tl,
                n = t.trackDelay,
                o = t.layer,
                a = new et.exports.Track('fiveEyes', {
                  delay: n
                }),
                l = 0.1 * s.get('fontSize'),
                h = i.toGlobalByKey(E).y - l,
                u = i.toGlobalByKey(N).y + l,
                c = [],
                f = 0,
                d = ['face_hairline_132', 'left_eye_eyelid_0', 'left_eye_eyelid_31', 'right_eye_eyelid_31', 'right_eye_eyelid_0', 'face_hairline_12'];
              f < d.length;
              f++
            ) {
              var p = d[f]
              c.push([
                _r(_r({}, i.toGlobalByKey(p)), {
                  y: h
                }),
                _r(_r({}, i.toGlobalByKey(p)), {
                  y: u
                })
              ])
            }
            a.add([
              Q({
                duration: i.animtionConfig.dashedLinesDuration,
                layer: o,
                element: g(c)
              }),
              Q({
                layer: o,
                element: i._getFiveEyeDescription(c)
              }),
              {
                duration: i.animtionConfig.endDelay,
                begin: function begin() {
                  return i.callLifeCycle('message', {
                    message: 'animationFinished'
                  })
                }
              }
            ]),
              null == e || e.add(a).update().play()
          }),
          (i._getFiveEyeDescription = function (t) {
            var e = 6 * s.get('fontSize'),
              n = i.toGlobalByKey('left_eye_eyelid_0').y,
              r = i.toGlobalByKey('left_eye_eyelid_31').y + e
            return [
              b(
                {
                  x: t[0][0].x,
                  y: n
                },
                {
                  x: t[1][0].x,
                  y: n
                },
                '右外眼角颧弓留白\n' + i.data.five_eyes.one_eye.righteye_empty_length + 'mm'
              ),
              b(
                {
                  x: t[1][0].x,
                  y: r
                },
                {
                  x: t[2][0].x,
                  y: r
                },
                '右眼宽度\n' + i.data.five_eyes.righteye + 'mm'
              ),
              b(
                {
                  x: t[2][0].x,
                  y: n
                },
                {
                  x: t[3][0].x,
                  y: n
                },
                '内眼角间距\n' + i.data.five_eyes.three_eye.eyein_length + 'mm'
              ),
              b(
                {
                  x: t[3][0].x,
                  y: r
                },
                {
                  x: t[4][0].x,
                  y: r
                },
                '左眼宽度\n' + i.data.five_eyes.lefteye + 'mm'
              ),
              b(
                {
                  x: t[4][0].x,
                  y: n
                },
                {
                  x: t[5][0].x,
                  y: n
                },
                '左外眼角颧弓留白\n' + i.data.five_eyes.five_eye.lefteye_empty_length + 'mm'
              )
            ]
          }),
          (i.data = e.data),
          (i.animtionConfig = _r(_r({}, yt), n)),
          i
        )
      }
      return n(e, t), e
    })(o.exports.Animation),
    _t = _r({}, o.exports.defaultAnimationSetting),
    mt = (function (t) {
      function e(e, n) {
        var o = t.call(this) || this
        return (
          (o.beforeSetup = function () {
            ;(o.focus.keys = q), o.focus.displayArea || (o.focus.displayArea = J(o.getFromController('deviceSize')).face)
          }),
          (o.run = function () {
            for (
              var t = o,
                e = t.tl,
                n = t.trackDelay,
                r = t.layer,
                i = new et.exports.Track('goldenTriangle', {
                  delay: n
                }),
                a = [],
                l = 0,
                h = ['left_eye_pupil_center', 'right_eye_pupil_center', 'nose_midline_53', 'face_contour_right_15', 'face_contour_left_15', 'lower_lip_15', 'face_contour_right_0'];
              l < h.length;
              l++
            ) {
              var u = h[l]
              a.push(
                d(o.toGlobalByKey(u), {
                  size: s.get('pointSize'),
                  color: s.get('themeColor')
                })
              )
            }
            var c = [o.toGlobalByKey('left_eye_pupil_center'), o.toGlobalByKey('right_eye_pupil_center')],
              f = 200,
              p = 2 * s.get('fontSize'),
              y = 1.5 * s.get('fontSize')
            i.add([
              Q({
                duration: 200,
                offset: 100,
                layer: r,
                element: a
              }),
              Q({
                duration: f,
                layer: r,
                element: _([c])
              }),
              Q({
                duration: f,
                layer: r,
                element: o._getGoldenTriangleGradualLines()
              }),
              Q({
                duration: f,
                layer: r,
                element: o._getGoldenTriangleGradualArcText()
              }),
              Q({
                duration: f,
                layer: r,
                element: o._getJawDashLineAndText({
                  textLineHeight: y,
                  textLineWidth: p
                })
              }),
              {
                duration: o.animtionConfig.endDelay,
                begin: function begin() {
                  return o.callLifeCycle('message', {
                    message: 'animationFinished'
                  })
                }
              }
            ]),
              null == e || e.add(i).update().play()
          }),
          (o._getGoldenTriangleGradualLines = function () {
            var t = 2 * s.get('fontSize'),
              e = [o.toGlobalByKey('nose_midline_53'), o.toGlobalByKey('left_eye_pupil_center')],
              n = [o.toGlobalByKey('right_eye_pupil_center'), o.toGlobalByKey('nose_midline_53')],
              r = [o.toGlobalByKey('face_contour_right_0'), o.toGlobalByKey('face_contour_right_15')],
              a = [o.toGlobalByKey('face_contour_right_0'), o.toGlobalByKey('face_contour_left_15')]
            return i(i([], m([e, n], t)), m([r, a], t))
          }),
          (o._getGoldenTriangleGradualArcText = function () {
            var t = 2 * s.get('fontSize')
            return [
              v(
                {
                  start: o.toGlobalByKey('left_eye_pupil_center'),
                  center: o.toGlobalByKey('nose_midline_53'),
                  end: o.toGlobalByKey('right_eye_pupil_center'),
                  radius: t
                },
                '黄金三角\n' + (o.data.golden_triangle || 0) + '°',
                {
                  x: 0,
                  y: 2.5 * -t
                }
              ),
              v(
                {
                  start: o.toGlobalByKey('face_contour_left_15'),
                  center: o.toGlobalByKey('face_contour_right_0'),
                  end: o.toGlobalByKey('face_contour_right_15'),
                  radius: t
                },
                (o.data.face.E || 0) + '°',
                {
                  x: 0,
                  y: 1.5 * -t
                }
              )
            ]
          }),
          (o._getJawDashLineAndText = function (t) {
            var e = t.textLineWidth,
              n = t.textLineHeight,
              r = o.toGlobalByKey('face_contour_left_15'),
              a = o.toGlobalByKey('lower_lip_15'),
              s = o.toGlobalByKey('face_contour_right_0'),
              l = o.toGlobalByKey('face_contour_right_15'),
              h = [
                {
                  x: r.x - e,
                  y: s.y
                },
                {
                  x: l.x + e,
                  y: s.y
                }
              ],
              u = [
                {
                  x: r.x - e,
                  y: a.y
                },
                {
                  x: l.x + e,
                  y: a.y
                }
              ],
              c = [
                {
                  x: l.x,
                  y: a.y - n
                },
                {
                  x: l.x,
                  y: s.y + n
                }
              ],
              f = [
                {
                  x: r.x,
                  y: a.y - n
                },
                {
                  x: r.x,
                  y: s.y + n
                }
              ]
            return i(i([], g([h, u, c, f])), [
              b(
                {
                  y: a.y,
                  x: f[1].x - e / 2
                },
                {
                  y: s.y,
                  x: f[1].x - e / 2
                },
                '下巴长度\n' + o.data.jaw.jaw_length + 'mm',
                {
                  vertical: 'vertical'
                }
              ),
              b(
                {
                  x: r.x,
                  y: h[0].y + n / 2
                },
                {
                  x: l.x,
                  y: h[0].y + n / 2
                },
                '下巴宽度\n' + o.data.jaw.jaw_width + 'mm'
              )
            ])
          }),
          (o.data = e.data),
          (o.animtionConfig = _r(_r({}, _t), n)),
          o
        )
      }
      return n(e, t), e
    })(o.exports.Animation),
    bt = _r(_r({}, o.exports.defaultAnimationSetting), {
      themePointDuration: 200,
      solidLineDuration: 200,
      dashedLineDuration: 200,
      gradualLineDuration: 200,
      textDuration: 200,
      noseLineOffsetTop: 3 * s.get('fontSize'),
      noseLineOffsetBottom: s.get('fontSize'),
      noseLineOffsetX: s.get('fontSize'),
      lipLineOffsetY: 2.5 * s.get('fontSize'),
      lipLineOffsetX: 1.5 * s.get('fontSize')
    }),
    vt = (function (t) {
      function e(e, n) {
        var o = t.call(this) || this
        return (
          (o.beforeSetup = function () {
            ;(o.focus.keys = q), o.focus.displayArea || (o.focus.displayArea = J(o.getFromController('deviceSize')).face)
          }),
          (o.run = function () {
            var t = o,
              e = t.tl,
              n = t.trackDelay,
              r = t.layer,
              a = new et.exports.Track('mouthAnalysis', {
                delay: n
              }),
              l = o._getMouthPointsAndLines(),
              h = l.points,
              u = l.lines,
              c = o._getLipDashedLines(),
              f = c.verticalDashLines,
              d = c.horizontalDashLines
            a.add([
              Q({
                element: h,
                layer: r,
                duration: o.animtionConfig.themePointDuration
              }),
              Q({
                element: u,
                layer: r,
                duration: o.animtionConfig.solidLineDuration
              }),
              Q({
                element: m([[o.toGlobalByKey('upper_lip_33'), o.toGlobalByKey('lower_lip_39')]], s.get('lineExtendLength')),
                layer: r,
                duration: o.animtionConfig.gradualLineDuration
              }),
              Q({
                layer: r,
                element: i(i([], g(i(i([], d), f))), o._getNoseDashedLines()),
                duration: o.animtionConfig.dashedLineDuration
              }),
              Q({
                layer: r,
                element: o.drawArrowTexts(),
                duration: o.animtionConfig.textDuration
              }),
              {
                duration: o.animtionConfig.endDelay,
                begin: function begin() {
                  return o.callLifeCycle('message', {
                    message: 'animationFinished'
                  })
                }
              }
            ]),
              null == e || e.add(a).update().play()
          }),
          (o._getMouthPointsAndLines = function () {
            for (var t = [], e = 0, n = i(i([], O), z); e < n.length; e++) {
              var r = n[e]
              t.push(
                d(o.toGlobalByKey(r), {
                  size: s.get('pointSize'),
                  color: s.get('themeColor')
                })
              )
            }
            for (var a = [], l = 0, h = [O, D, j, G, B]; l < h.length; l++) {
              var u = h[l]
              a.push(
                p(
                  u.map(function (t) {
                    return o.toGlobalByKey(t)
                  }),
                  {
                    color: s.get('themeColor'),
                    size: s.get('lineWidth')
                  }
                )
              )
            }
            return {
              points: t,
              lines: a
            }
          }),
          (o._getLipDashedLines = function () {
            for (var t = o._calcLipArea(), e = t.left, n = t.right, r = t.bottom, i = t.top, a = [], s = 0, l = [i, r]; s < l.length; s++) {
              var h = l[s]
              a.push([
                {
                  x: e.x - o.animtionConfig.lipLineOffsetX,
                  y: h.y
                },
                {
                  x: n.x + o.animtionConfig.lipLineOffsetX,
                  y: h.y
                }
              ])
            }
            for (var u = [], c = 0, f = [e, n]; c < f.length; c++) {
              h = f[c]
              u.push([
                {
                  x: h.x,
                  y: i.y - o.animtionConfig.lipLineOffsetY / 2
                },
                {
                  x: h.x,
                  y: r.y + o.animtionConfig.lipLineOffsetY
                }
              ])
            }
            return {
              horizontalDashLines: a,
              verticalDashLines: u
            }
          }),
          (o._getNoseDashedLines = function () {
            for (
              var t = o.toGlobalByKey(I),
                e = o.toGlobalByKey(R),
                n = o.toGlobalByKey(K),
                r = o.toGlobalByKey(Z),
                a = [
                  {
                    x: t.x - o.animtionConfig.noseLineOffsetX,
                    y: n.y
                  },
                  {
                    x: r.x + o.animtionConfig.noseLineOffsetX,
                    y: n.y
                  }
                ],
                s = [],
                l = 0,
                h = [t, r];
              l < h.length;
              l++
            ) {
              var u = h[l]
              s.push([
                {
                  x: u.x,
                  y: e.y - o.animtionConfig.noseLineOffsetTop
                },
                {
                  x: u.x,
                  y: n.y + o.animtionConfig.noseLineOffsetBottom
                }
              ])
            }
            return g(i([a], s))
          }),
          (o._calcLipArea = function () {
            for (var t = z[0], e = z[0], n = z[0], r = z[0], i = 0, a = z; i < a.length; i++) {
              var s = a[i]
              o.toGlobalByKey(s).y < o.toGlobalByKey(t).y && (t = s),
                o.toGlobalByKey(s).x < o.toGlobalByKey(e).x && (e = s),
                o.toGlobalByKey(s).y > o.toGlobalByKey(n).y && (n = s),
                o.toGlobalByKey(s).x > o.toGlobalByKey(r).x && (r = s)
            }
            return {
              top: o.toGlobalByKey(t),
              left: o.toGlobalByKey(e),
              bottom: o.toGlobalByKey(n),
              right: o.toGlobalByKey(r)
            }
          }),
          (o.drawArrowTexts = function () {
            var t = o.data,
              e = o.toGlobalByKey(I),
              n = o.toGlobalByKey(R),
              r = o.toGlobalByKey(Z),
              i = o._calcLipArea(),
              a = i.bottom,
              l = i.left,
              h = i.right,
              u = i.top,
              c = o._getLipDashedLines().verticalDashLines,
              f = 1.2 * s.get('fontSize')
            return [
              b(
                {
                  x: e.x,
                  y: n.y - o.animtionConfig.noseLineOffsetTop + s.get('fontSize')
                },
                {
                  x: r.x,
                  y: n.y - o.animtionConfig.noseLineOffsetTop + s.get('fontSize')
                },
                '鼻翼宽度\n' + t.nose.nose_width + 'mm'
              ),
              b(
                {
                  x: l.x - o.animtionConfig.lipLineOffsetX,
                  y: u.y
                },
                {
                  x: l.x - o.animtionConfig.lipLineOffsetX,
                  y: a.y
                },
                '嘴唇高度\n' + t.mouth.mouth_height + 'mm',
                {
                  vertical: 'vertical'
                }
              ),
              b(
                {
                  x: l.x,
                  y: a.y + o.animtionConfig.lipLineOffsetY - s.get('fontSize')
                },
                {
                  x: h.x,
                  y: a.y + o.animtionConfig.lipLineOffsetY - s.get('fontSize')
                },
                '嘴唇宽度\n' + t.mouth.mouth_width + 'mm'
              ),
              v(
                {
                  start: o.toGlobalByKey('lower_lip_39'),
                  center: o.toGlobalByKey('upper_lip_33'),
                  end: c[1][0],
                  radius: f
                },
                (t.mouth.angulus_oris || 0) + '°',
                {
                  x: 1.5 * -f,
                  y: 1.5 * -f
                }
              )
            ]
          }),
          (o.data = e.data),
          (o.animtionConfig = _r(_r({}, bt), n)),
          o
        )
      }
      return n(e, t), e
    })(o.exports.Animation),
    xt = _r(_r({}, o.exports.defaultAnimationSetting), {
      dashedLinesDuration: 200
    }),
    Ct = (function (t) {
      function e(e, n) {
        var i = t.call(this) || this
        return (
          (i.beforeSetup = function () {
            ;(i.focus.keys = q), i.focus.displayArea || (i.focus.displayArea = J(i.getFromController('deviceSize')).face)
          }),
          (i.run = function () {
            var t = i,
              e = t.tl,
              n = t.trackDelay,
              r = t.layer,
              o = new et.exports.Track('threeParts', {
                delay: n
              }),
              a = 0.5 * s.get('fontSize'),
              l = i.toGlobalByKey(H).x - a,
              h = i.toGlobalByKey(W).x + a,
              u = i.toGlobalByKey(E),
              c = i.toGlobalByKey('nose_midline_8'),
              f = i.toGlobalByKey('nose_midline_53'),
              d = i.toGlobalByKey(N),
              p = [
                {
                  x: l,
                  y: u.y
                },
                {
                  x: h,
                  y: u.y
                }
              ],
              y = [
                {
                  x: l,
                  y: c.y
                },
                {
                  x: h,
                  y: c.y
                }
              ],
              _ = [
                {
                  x: l,
                  y: f.y
                },
                {
                  x: h,
                  y: f.y
                }
              ],
              m = [
                {
                  x: l,
                  y: d.y
                },
                {
                  x: h,
                  y: d.y
                }
              ],
              v = [
                {
                  y: u.y,
                  x: (f.x + c.x) / 2
                },
                {
                  y: d.y,
                  x: (f.x + c.x) / 2
                }
              ],
              x = [
                b(p[0], y[0], '上庭\n' + i.data.three_parts.one_part.faceup_length + 'mm', {
                  vertical: 'vertical'
                }),
                b(y[0], _[0], '中庭\n' + i.data.three_parts.two_part.facemid_length + 'mm', {
                  vertical: 'vertical'
                }),
                b(_[0], m[0], '下庭\n' + i.data.three_parts.three_part.facedown_length + 'mm', {
                  vertical: 'vertical'
                })
              ]
            o.add([
              Q({
                layer: r,
                duration: i.animtionConfig.dashedLinesDuration,
                element: g([p, y, _, m, v])
              }),
              Q({
                layer: r,
                element: x
              }),
              {
                duration: i.animtionConfig.endDelay,
                begin: function begin() {
                  return i.callLifeCycle('message', {
                    message: 'animationFinished'
                  })
                }
              }
            ]),
              null == e || e.add(o).update().play()
          }),
          (i.data = e.data),
          (i.animtionConfig = _r(_r({}, xt), n)),
          i
        )
      }
      return n(e, t), e
    })(o.exports.Animation),
    wt = _r(_r({}, o.exports.defaultAnimationSetting), {
      twinklePointsColor: ['rgba(0, 145, 255, 0.5)', 'rgba(0, 145, 255, 0.5)', 'rgba(0, 145, 255, 0.5)', 'rgba(0, 145, 255, 0.5)'],
      pointSize: [15, 20],
      delay: [200, 1000],
      duration: 400,
      endDelay: 0
    }),
    Lt = (function (t) {
      function e(e) {
        var n = t.call(this) || this
        return (
          (n.beforeSetup = function () {
            ;(n.focus.keys = q), n.focus.displayArea || (n.focus.displayArea = J(n.getFromController('deviceSize')).face)
          }),
          (n.run = function () {
            for (var t = n, e = t.tl, r = t.trackDelay, i = t.layer, o = [], a = 0, s = x; a < s.length; a++) {
              var l = s[a],
                h = f.exports.dataUtils.random([0, n.animtionConfig.twinklePointsColor.length - 1], 'int'),
                u = f.exports.dataUtils.random(n.animtionConfig.pointSize, 'int'),
                c = f.exports.dataUtils.random(n.animtionConfig.delay, 'int'),
                p = d(n.toGlobalByKey(l), {
                  size: u,
                  color: n.animtionConfig.twinklePointsColor[h]
                })
              p.alpha = 0
              var y = new et.exports.Track(l, {
                delay: r
              }).add(
                tt({
                  layer: i,
                  delay: c,
                  stay: c,
                  duration: n.animtionConfig.duration,
                  element: p
                })
              )
              null == e || e.add(y), o.push(y.getDuration(!1))
            }
            var g = o.reduce(function (t, e) {
              return Math.max(t, e)
            }, o[0])
            null == e ||
              e
                .add(
                  new et.exports.Track('end', {
                    delay: g
                  }).add({
                    duration: n.animtionConfig.endDelay,
                    begin: function begin() {
                      return n.callLifeCycle('message', {
                        message: 'animationFinished'
                      })
                    }
                  })
                )
                .update()
                .play()
          }),
          (n.animtionConfig = _r(_r({}, wt), e)),
          n
        )
      }
      return n(e, t), e
    })(o.exports.Animation)
  ;(t.EyesAnalysis = rt),
    (t.EyesSkin = ut),
    (t.FaceAnalysis = ft),
    (t.FaceSkin = pt),
    (t.FiveEyes = gt),
    (t.GoldenTriangle = mt),
    (t.MouthAnalysis = vt),
    (t.Threeparts = Ct),
    (t.TwinklePoints = Lt),
    (t.defaultEyesAnalysisAnimationSetting = nt),
    (t.defaultEyesSkinAnimationSetting = ht),
    (t.defaultFaceAnalysisAnimationSetting = ct),
    (t.defaultFaceSkinAnimationSetting = dt),
    (t.defaultFiveEyesAnimationConfig = yt),
    (t.defaultGoldenTriangleAnimationSetting = _t),
    (t.defaultMouthAnalysisAnimationSetting = bt),
    (t.defaultThreePartsAnimationConfig = xt),
    (t.defaultTwinklePointsAnimationSetting = wt),
    (t.theme = s)
})
//# sourceMappingURL=index.js.map
