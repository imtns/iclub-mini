/* eslint-disable */

require('../../@babel/runtime/helpers/Arrayincludes')
require('../../@babel/runtime/helpers/Objectvalues')
var _typeof2 = require('../../@babel/runtime/helpers/typeof')
!(function (t, e) {
  'object' == (typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e(((t = 'undefined' != typeof globalThis ? globalThis : t || self)['animation-helper'] = {}))
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
  var _e = function e() {
    return (
      (_e =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
          return t
        }),
      _e.apply(this, arguments)
    )
  }
  function n(t, e, n, r) {
    return new (n || (n = Promise))(function (i, o) {
      function a(t) {
        try {
          h(r.next(t))
        } catch (t) {
          //           t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
          o(t)
        }
      }
      function s(t) {
        try {
          h(r.throw(t))
        } catch (t) {
          //           t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
          o(t)
        }
      }
      function h(t) {
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
      h((r = r.apply(t, e || [])).next())
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
                  if (!((i = a.trys), (i = i.length > 0 && i[i.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
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
              //               t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
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
  'undefined' != typeof globalThis ? globalThis : 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self && self
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
                h = i[4] || 1
              function l(t, e, n) {
                return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < 0.5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
              }
              if (0 == a) e = n = r = s
              else {
                var u = s < 0.5 ? s * (1 + a) : s + a - s * a,
                  c = 2 * s - u
                ;(e = l(c, u, o + 1 / 3)), (n = l(c, u, o)), (r = l(c, u, o - 1 / 3))
              }
              return 'rgba(' + Math.round(255 * e) + ',' + Math.round(255 * n) + ',' + Math.round(255 * r) + ',' + h + ')'
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
        h = function h(t) {}
      'undefined' != typeof window && window.requestAnimationFrame
        ? ((s = window.requestAnimationFrame), (h = window.cancelAnimationFrame))
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
          (h = window.clearTimeout))
        : console.warn('@/utils/@milimu/timeline engine: 该环境中缺少requestAnimationFrame/setTimeout，请自行设置timer')
      var l = new (function () {
          var t = this
          ;(this.suspendWhenDocumentHidden = !0),
            (this.activeAnimates = []),
            (this.setTimer = function (t) {
              ;(s = t.timer), (h = t.cancel)
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
              t.raf && h(t.raf), (t.raf = void 0)
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
            (t.engine = l),
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
        _d = function d() {
          return (
            (_d =
              Object.assign ||
              function (t) {
                for (var e, n = 1, r = arguments.length; n < r; n++) for (var i in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                return t
              }),
            _d.apply(this, arguments)
          )
        },
        f = function f(t) {
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
                    s = new f(o)
                  ;(s.start = e.end + r(o.offset)), (s.end = s.start + o.duration), t.push(s), (e = s)
                }
                for (var h = a.start, l = a.end, u = 0, c = t; u < c.length; u++) {
                  var d = c[u]
                  d.start < h && (h = d.start), d.end > l && (l = d.end)
                }
                return {
                  __animatables: t,
                  start: h,
                  end: l
                }
              }),
              (a.run = function (t) {
                a.__animatables.forEach(function (n) {
                  var r, i, o, a, s, h
                  if (t < n.start) n.finished = !1
                  else if (!(t > n.end && n.finished) && n.origin) {
                    var l = e(t - n.start, 0, n.origin.duration) / n.origin.duration
                    n.began ||
                      (null === (i = (r = n.origin).begin) ||
                        void 0 === i ||
                        i.call(r, {
                          progress: l,
                          time: t
                        }),
                      (n.began = !0)),
                      t >= n.end &&
                        !n.finished &&
                        ((l = 1),
                        (n.finished = !0),
                        null === (a = (o = n.origin).complete) ||
                          void 0 === a ||
                          a.call(o, {
                            progress: l,
                            time: t
                          })),
                      null === (h = (s = n.origin).update) ||
                        void 0 === h ||
                        h.call(s, {
                          progress: l,
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
                var t = new f(null)
                return (t.start = this.__delay.pending), (t.end = this.__delay.pending), t
              },
              enumerable: !1,
              configurable: !0
            }),
            i
          )
        })(f),
        y = 0.1
      function g(t, e) {
        return 1 - 3 * e + 3 * t
      }
      function m(t, e) {
        return 3 * e - 6 * t
      }
      function v(t) {
        return 3 * t
      }
      function b(t, e, n) {
        return ((g(e, n) * t + m(e, n)) * t + v(e)) * t
      }
      function _(t, e, n) {
        return 3 * g(e, n) * t * t + 2 * m(e, n) * t + v(e)
      }
      function w(t, e, n, r) {
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
            s = _(a, t, n)
          return s >= 0.001
            ? (function (t, e, n, r) {
                for (var i = 0; i < 4; ++i) {
                  var o = _(e, n, r)
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
      function x(t) {
        return (
          void 0 === t && (t = 10),
          function (n) {
            return Math.ceil(e(n, 1e-6, 1) * t) * (1 / t)
          }
        )
      }
      var C,
        P,
        T =
          ((C = {
            linear: function linear() {
              return function (t) {
                return t
              }
            }
          }),
          (P = {
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
            P[t] = function () {
              return function (t) {
                return Math.pow(t, e + 2)
              }
            }
          }),
          Object.keys(P).forEach(function (t) {
            var e = P[t]
            ;(C['easeIn' + t] = e),
              (C['easeOut' + t] = function (t, n) {
                return function (r) {
                  return 1 - e(t, n)(1 - r)
                }
              }),
              (C['easeInOut' + t] = function (t, n) {
                return function (r) {
                  return r < 0.5 ? e(t, n)(2 * r) / 2 : 1 - e(t, n)(-2 * r + 2) / 2
                }
              }),
              (C['easeOutIn' + t] = function (t, n) {
                return function (r) {
                  return r < 0.5 ? (1 - e(t, n)(1 - 2 * r)) / 2 : (e(t, n)(2 * r - 1) + 1) / 2
                }
              })
          }),
          _d(_d({}, C), {
            bezier: w,
            steps: x
          })),
        A = {
          duration: 600, // 原来1000ms，现在600ms（动画播放更快）
          delay: 0,
          easing: T.easeOutElastic(1, 0.5)
        },
        k = function k(t, r) {
          var o = this
          ;(this.normalizeTweens = function (t, e) {
            var r
            return e.tweens.map(function (i) {
              var s = i.value,
                h = t[e.name] || 0,
                l = r ? r.to.original : h,
                u = n.arr(s) ? s[0] : l,
                c = n.arr(s) ? s[1] : s
              n.und(c) && (c = r)
              var f = _d(_d({}, i), {
                from: o.decomposeValue(u),
                to: o.decomposeValue(a(c, u)),
                start: 0,
                end: 0,
                isColor: !1
              })
              return (f.start = r ? r.end : 0), (f.end = f.start + f.delay + f.duration), (f.isColor = n.col(f.from.original)), (r = f), f
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
              for (var h = e(a - s.start - s.delay, 0, s.duration) / s.duration, l = isNaN(h) ? 1 : s.easing(h), u = s.to.strings, c = [], d = s.to.numbers.length, f = 0; f < d; f++) {
                var p = s.to.numbers[f],
                  y = s.from.numbers[f] || 0
                c.push(y + l * (p - y))
              }
              var g,
                m = u.length
              if (m) {
                g = u[0]
                for (var v = 0; v < m; v++) isNaN(c[v]) || (u[v + 1] ? (g += c[v] + u[v + 1]) : (g += c[v] + ' '))
              } else g = c[0]
              ;(o.target[o.property] = g), (o.currentValue = g)
            }),
            (this.target = t),
            (this.property = r.name)
          var s = this.normalizeTweens(t, r),
            h = s[s.length - 1]
          ;(this.tweens = s), (this.duration = h.end), (this.delay = s[0].delay)
        }
      ;(t.Timeline = u),
        (t.Track = p),
        (t.createMotionTween = function (t) {
          var e = (function (t, e) {
              var r = _d({}, e)
              return n.num(t.defaultDuration) && (r.duration = t.defaultDuration), n.num(t.defaultDelay) && (r.delay = t.defaultDelay), n.fnc(t.defaultEasing) && (r.easing = t.defaultEasing), r
            })(t, A),
            r = (function (t, e) {
              return Object.keys(t.property)
                .map(function (r) {
                  if (n.und(t.target[r])) return !1
                  var i = _d({}, e),
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
                        return n.und(o.delay) && (o.delay = r ? 0 : e.delay), _d(_d({}, i), o)
                      })
                    }
                  )
                })
                .filter(Boolean)
            })(t, e).map(function (e) {
              return new k(t.target, e)
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
                    _d(_d({}, e), {
                      animations: r
                    })
                  )
                : r.map(function (t) {
                    return t.update(e)
                  })
            }
          }
        }),
        (t.easings = T),
        (t.engine = l)
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
      var _e2 = function e(t, n) {
        return (
          (_e2 =
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
          _e2(t, n)
        )
      }
      function n(t, n) {
        if ('function' != typeof n && null !== n) throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null')
        function r() {
          this.constructor = t
        }
        _e2(t, n), (t.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
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
        h = (function () {
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
        l = 'undefined' != typeof Float32Array ? Float32Array : Array,
        u = Math.PI / 180
      function c() {
        var t = new l(6)
        return l != Float32Array && ((t[1] = 0), (t[2] = 0), (t[4] = 0), (t[5] = 0)), (t[0] = 1), (t[3] = 1), t
      }
      function d(t, e, n) {
        var r = e[0],
          i = e[1],
          o = e[2],
          a = e[3],
          s = e[4],
          h = e[5],
          l = n[0],
          u = n[1]
        return (t[0] = r), (t[1] = i), (t[2] = o), (t[3] = a), (t[4] = r * l + o * u + s), (t[5] = i * l + a * u + h), t
      }
      function f() {
        var t = new l(2)
        return l != Float32Array && ((t[0] = 0), (t[1] = 0)), t
      }
      function p(t, e) {
        var n = new l(2)
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
        f()
      var g,
        m = (function () {
          function t() {
            ;(this.position = new h(0, 0, this.onChange.bind(this))),
              (this.origin = new h(0, 0, this.onChange.bind(this))),
              (this.scale = new h(1, 1, this.onChange.bind(this))),
              (this.skew = new h(0, 0, this.onChange.bind(this, 'position'))),
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
                h = o.y,
                f = void 0 === h ? 0 : h,
                y = this.position,
                g = y.x,
                m = void 0 === g ? 0 : g,
                v = y.y,
                b = void 0 === v ? 0 : v,
                _ = c(),
                w = c(),
                x = c(),
                C = c(),
                P = (function (t, e, n, r, i, o) {
                  var a = new l(6)
                  return (a[0] = t), (a[1] = e), (a[2] = n), (a[3] = r), (a[4] = i), (a[5] = o), a
                })(1, s, f, 1, m, b),
                T = p(this.origin.x, this.origin.y),
                A = p(-this.origin.x, -this.origin.y)
              return (
                d(x, P, T),
                (function (t, e, n) {
                  var r = e[0],
                    i = e[1],
                    o = e[2],
                    a = e[3],
                    s = e[4],
                    h = e[5],
                    l = Math.sin(n),
                    u = Math.cos(n)
                  ;(t[0] = r * u + o * l), (t[1] = i * u + a * l), (t[2] = r * -l + o * u), (t[3] = i * -l + a * u), (t[4] = s), (t[5] = h)
                })(
                  w,
                  x,
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
                    h = e[5],
                    l = n[0],
                    u = n[1]
                  ;(t[0] = r * l), (t[1] = i * l), (t[2] = o * u), (t[3] = a * u), (t[4] = s), (t[5] = h)
                })(C, w, p(n, i)),
                d(_, C, A),
                _
              )
            }),
            (t.prototype.getLocalTransform = function () {
              var t,
                e,
                n = c(),
                r = p(-this.position.x, -this.position.y)
              return d(n, ((t = this.localTransform), ((e = new l(6))[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), (e[4] = t[4]), (e[5] = t[5]), e), r), n
            }),
            (t.prototype.getWorldTransform = function (t) {
              var e,
                n,
                r,
                i,
                o,
                a,
                s,
                h,
                l,
                u,
                d,
                f,
                p,
                y,
                g,
                m = c()
              return (
                (e = m),
                (n = t.localTransform),
                (r = this.localTransform),
                (i = n[0]),
                (o = n[1]),
                (a = n[2]),
                (s = n[3]),
                (h = n[4]),
                (l = n[5]),
                (u = r[0]),
                (d = r[1]),
                (f = r[2]),
                (p = r[3]),
                (y = r[4]),
                (g = r[5]),
                (e[0] = i * u + a * d),
                (e[1] = o * u + s * d),
                (e[2] = i * f + a * p),
                (e[3] = o * f + s * p),
                (e[4] = i * y + a * g + h),
                (e[5] = o * y + s * g + l),
                m
              )
            }),
            t
          )
        })(),
        v = function v(t) {
          var e = this
          ;(this.isRoot = !0),
            (this.type = 'Application'),
            (this.worldAlpha = 1),
            (this.transform = new m()),
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
              (this.transform = new m()),
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
                return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new _({})), this.tempDisplayObjectParent
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
                h,
                l,
                u,
                d,
                g,
                m = p(r.x, r.y),
                v = f(),
                b = c()
              return (
                (i = b),
                (a = (o = this.localTransform)[0]),
                (s = o[1]),
                (h = o[2]),
                (l = o[3]),
                (u = o[4]),
                (d = o[5]),
                (g = a * l - s * h) && ((g = 1 / g), (i[0] = l * g), (i[1] = -s * g), (i[2] = -h * g), (i[3] = a * g), (i[4] = (h * d - l * u) * g), (i[5] = (s * u - a * d) * g)),
                y(v, m, b),
                {
                  x: v[0],
                  y: v[1]
                }
              )
            }),
            (t.prototype.toGlobal = function (t, e) {
              void 0 === e && (e = !1), e || (this._recursivePostUpdateTransform(), this.updateTransform())
              var n = p(t.x, t.y),
                r = f()
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
        _ = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this
            return (e.type = 'TemporaryDisplayObject'), (e.children = []), e
          }
          return n(e, t), (e.prototype.renderer = function (t) {}), (e.prototype.removeChild = function (t) {}), (e.prototype.addChild = function (t) {}), e
        })(b),
        w = (function (t) {
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
        x = {
          x: 0,
          y: 0,
          radius: 0,
          fill: 'rgba(0,0,0,0)'
        },
        C = (function (t) {
          function e(e) {
            var n = t.call(this, Object.assign({}, x, e)) || this
            n.type = 'Arc'
            var r = Object.assign({}, x, e)
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
        P = (function () {
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
        T = (function (t) {
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
                var n = e.width, r = e.height, i = this.caculateGredientCoordinate(n, r), o = i[0], a = i[1], s = t.createLinearGradient(o.x, o.y, a.x, a.y), h = 0, l = this.colorArray;
                h < l.length;
                h++
              ) {
                var u = l[h]
                s.addColorStop(u.stop, u.color)
              }
              return s
            }),
            e
          )
        })(P),
        A = (function (t) {
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
        })(P),
        k = (function (t) {
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
        })(P),
        M = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          border: '0px solid rgba(0,0,0,0)',
          borderRadius: 0
        },
        O = (function (t) {
          function e(e) {
            var n = t.call(this, Object.assign({}, M, e)) || this
            ;(n._borderWidth = 0), (n._borderRadius = []), (n.type = 'Rect')
            var r = Object.assign({}, M, e),
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
                  h = a[1],
                  l = a[2],
                  u = a[3]
                t.arc(n + s, r + s, s, Math.PI, 1.5 * Math.PI),
                  t.lineTo(n + (i - s - h), r),
                  t.arc(n + i - h, r + h, h, 1.5 * Math.PI, 2 * Math.PI),
                  t.lineTo(n + i, r + (o - h - l)),
                  t.arc(n + i - l, r + o - l, l, 0, 0.5 * Math.PI),
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
              if (this.fill instanceof T)
                this._grd = this.fill.getGradient(t, {
                  width: n,
                  height: r
                })
              else {
                if (!(this.fill instanceof A || this.fill instanceof k)) throw Error('Error：未支持的渐变')
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
        S = (function (t) {
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
        j = (function (t) {
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
        I = /([astvzqmhlc])([^astvzqmhlc]*)/gi
      function R(t) {
        var e,
          n = []
        return (
          null === (e = t.match(I)) ||
            void 0 === e ||
            e.map(function (t) {
              var e = t.replace(I, '$1'),
                i = e.toLowerCase(),
                o = (function (t) {
                  var e = t.match(L)
                  return e ? e.map(Number) : []
                })(t.replace(I, '$2'))
              if (('m' == i && o.length > 2 && (n.push(r([e], o.splice(0, 2))), (i = 'l'), (e = 'm' == e ? 'l' : 'L')), o.length == D[i])) return n.push(r([e], o)), ''
              if (o.length < D[i]) throw new Error('malformed path data')
              n.push(r([e], o.splice(0, D[i])))
            }),
          n
        )
      }
      var L = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi,
        F = 2 * Math.PI
      function H(t, e, n, r) {
        var i = t * n + e * r
        return i > 1 && (i = 1), i < -1 && (i = -1), (t * r - e * n < 0 ? -1 : 1) * Math.acos(i)
      }
      function W(t, e) {
        var n = (4 / 3) * Math.tan(e / 4),
          r = Math.cos(t),
          i = Math.sin(t),
          o = Math.cos(t + e),
          a = Math.sin(t + e)
        return [r, i, r - i * n, i + r * n, o + a * n, a - o * n, o, a]
      }
      function E(t, e, n, r, i, o, a, s, h) {
        var l = Math.sin((h * F) / 360),
          u = Math.cos((h * F) / 360),
          c = (u * (t - n)) / 2 + (l * (e - r)) / 2,
          d = (-l * (t - n)) / 2 + (u * (e - r)) / 2
        if (0 === c && 0 === d) return []
        if (0 === a || 0 === s) return []
        ;(a = Math.abs(a)), (s = Math.abs(s))
        var f = (c * c) / (a * a) + (d * d) / (s * s)
        f > 1 && ((a *= Math.sqrt(f)), (s *= Math.sqrt(f)))
        var p = (function (t, e, n, r, i, o, a, s, h, l) {
            var u = (l * (t - n)) / 2 + (h * (e - r)) / 2,
              c = (-h * (t - n)) / 2 + (l * (e - r)) / 2,
              d = a * a,
              f = s * s,
              p = u * u,
              y = c * c,
              g = d * f - d * y - f * p
            g < 0 && (g = 0), (g /= d * y + f * p)
            var m = (((g = Math.sqrt(g) * (i === o ? -1 : 1)) * a) / s) * c,
              v = ((g * -s) / a) * u,
              b = l * m - h * v + (t + n) / 2,
              _ = h * m + l * v + (e + r) / 2,
              w = (u - m) / a,
              x = (c - v) / s,
              C = (-u - m) / a,
              P = (-c - v) / s,
              T = H(1, 0, w, x),
              A = H(w, x, C, P)
            return 0 === o && A > 0 && (A -= F), 1 === o && A < 0 && (A += F), [b, _, T, A]
          })(t, e, n, r, i, o, a, s, l, u),
          y = [],
          g = p[2],
          m = p[3],
          v = Math.max(Math.ceil(Math.abs(m) / (F / 4)), 1)
        m /= v
        for (var b = 0; b < v; b++) y.push(W(g, m)), (g += m)
        return y.map(function (t) {
          for (var e = 0; e < t.length; e += 2) {
            var n = t[e + 0],
              r = t[e + 1],
              i = u * (n *= a) - l * (r *= s),
              o = l * n + u * r
            ;(t[e + 0] = i + p[0]), (t[e + 1] = o + p[1])
          }
          return t
        })
      }
      function z(t, e, n, r) {
        return ['C', t, e, n, r, n, r]
      }
      function N(t, e, n, r, i, o) {
        return ['C', t / 3 + (2 / 3) * n, e / 3 + (2 / 3) * r, i / 3 + (2 / 3) * n, o / 3 + (2 / 3) * r, i, o]
      }
      var G = (function () {
          function t(t) {
            if (((this.savedPaths = []), !('string' == typeof (e = t) && ((e = e.trim()), /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(e) && /[\dz]$/i.test(e) && e.length > 4))))
              throw new Error('Not an SVG path!')
            var e, n, r, i, o, a
            ;(this.initialPath =
              ((n = R(t)),
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
                for (var e, n = [], r = 0, i = 0, o = 0, a = 0, s = 0, h = 0, l = 0, u = 0, c = 0, d = t.length; c < d; c++) {
                  var f = t[c],
                    p = f[0]
                  switch (p) {
                    case 'M':
                      ;(o = f[1]), (a = f[2])
                      break
                    case 'A':
                      var y = E(l, u, f[6], f[7], f[4], f[5], f[1], f[2], f[3])
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
                          m = 0;
                        m < g.length;
                        m++
                      ) {
                        var v = g[m]
                        ;(f = ['C', v.x1, v.y1, v.x2, v.y2, v.x, v.y]), m < g.length - 1 && n.push(f)
                      }
                      break
                    case 'S':
                      var b = l,
                        _ = u
                      ;('C' != e && 'S' != e) || ((b += b - r), (_ += _ - i)), (f = ['C', b, _, f[1], f[2], f[3], f[4]])
                      break
                    case 'T':
                      'Q' == e || 'T' == e ? ((s = 2 * l - s), (h = 2 * u - h)) : ((s = l), (h = u)), (f = N(l, u, s, h, f[1], f[2]))
                      break
                    case 'Q':
                      ;(s = f[1]), (h = f[2]), (f = N(l, u, f[1], f[2], f[3], f[4]))
                      break
                    case 'L':
                      f = z(l, u, f[1], f[2])
                      break
                    case 'H':
                      f = z(l, u, f[1], u)
                      break
                    case 'V':
                      f = z(l, u, l, f[1])
                      break
                    case 'Z':
                      f = z(l, u, o, a)
                  }
                  ;(e = p), (l = f[f.length - 2]), (u = f[f.length - 1]), f.length > 4 ? ((r = f[f.length - 4]), (i = f[f.length - 3])) : ((r = l), (i = u)), n.push(f)
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
                  for (var o = i[0], a = i.slice(1), s = [], h = 0; h < a.length / 2; h++)
                    (s[2 * h] = 0 !== e ? (Number(a[2 * h]) / r.size[0]) * e : a[2 * h]), (s[2 * h + 1] = 0 !== n ? (Number(a[2 * h + 1]) / r.size[1]) * n : a[2 * h + 1])
                  'M' === o ? t.moveTo.apply(t, s) : t.bezierCurveTo.apply(t, s)
                }),
                this.isClosed && t.closePath())
            }),
            t
          )
        })(),
        U = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this
            ;(n.lineStyle = 'solid'), (n.type = 'Polygon'), (n._lineJoin = 'round'), (n._lineCap = 'butt'), (n.closePath = !!e.hasOwnProperty('closePath') && !!e.closePath), (n.path = e.path)
            var r = e.path
            return (
              'string' != typeof e.path && (r = n.formatPointsToPath(e.path, n.closePath)),
              (n._svgPath = new G(r)),
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
              if (n instanceof P) {
                if (!this['_' + e + 'Grd'])
                  if (n instanceof T)
                    this['_' + e + 'Grd'] = n.getGradient(t, {
                      width: this._svgPath.bounds[2] - this._svgPath.bounds[0],
                      height: this._svgPath.bounds[3] - this._svgPath.bounds[1]
                    })
                  else {
                    if (!(n instanceof A || n instanceof k)) throw Error('Error：未支持的渐变')
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
        q = {
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
      ;(t.AngleGradient = T),
        (t.Application = v),
        (t.Arc = C),
        (t.Layer = S),
        (t.LinearGradient = A),
        (t.Node = b),
        (t.ObservablePoint = h),
        (t.Point = s),
        (t.Polygon = U),
        (t.RadialGradient = k),
        (t.Rect = O),
        (t.Sprite = w),
        (t.Text = j),
        (t.shape = q)
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
              var n, a, s, h, l
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
                          _e(
                            _e(
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
                      (h = new o.exports.Layer({
                        name: 'animationHelper',
                        width: n.width,
                        height: n.height
                      })),
                      (l = new o.exports.Layer({
                        name: 'animationLayer',
                        width: this.deviceSize.width,
                        height: this.deviceSize.height
                      })),
                      this.app.addChild([s, a, h, l]),
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
              n = _e(_e({}, a.deviceSize), {
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
            for (var r = 1 / 0, i = 1 / 0, o = -1 / 0, s = -1 / 0, h = 0, l = t; h < l.length; h++) {
              var u = l[h],
                c = n.toGlobal(u),
                d = c.x,
                f = c.y
              ;(r = Math.min(d, r)), (i = Math.min(f, i)), (o = Math.max(d, o)), (s = Math.max(f, s))
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
              _e(
                {
                  scaleRatio: 1
                },
                n
              )
            ),
            a = o.ratio,
            s = o.translation,
            h = o.rotate,
            l = o.faceArea,
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
                  rotation: h,
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
                  e >= 1 && (this.currentFocusPart = l)
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
            e.isSameArea(e.getFromController('currentFocusArea'), e.calcFaceArea(t, e.focus.scaleRatio)) || (e.tl.add(e.getFocusTrack(t, e.focus)), (e.trackDelay = e.focus.duration + e.focus.delay)),
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
            h = e.width,
            l = e.height
          return a === n && s === r && h === i && l === o
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
            duration: 600, // 原来1000ms，现在600ms（镜头移动更快）
            delay: 200, // 原来400ms，现在200ms（开始更快）
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
    (t.defaultSpriteAniamteDelay = 200), // 原来400ms，现在200ms（快1倍）
    (t.defaultSpriteAniamteDuration = 600) // 原来1000ms，现在600ms（快40%）
})
//# sourceMappingURL=index.js.map
