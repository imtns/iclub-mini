require("../../@babel/runtime/helpers/Arrayincludes");
require("../../@babel/runtime/helpers/Objectvalues");
var _typeof2 = require("../../@babel/runtime/helpers/typeof");
!(function (e, n) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "undefined" != typeof module) {
    n(exports);
  } else {
    "function" == typeof define && define.amd
      ? define(["exports"], n)
      : n(((e = "undefined" != typeof globalThis ? globalThis : e || self).timeline = {}));
  }
})(void 0, function (e) {
  "use strict";

  function n(e, n, t) {
    return Math.min(Math.max(e, n), t);
  }
  var t = {
    arr: function arr(e) {
      return Array.isArray(e);
    },
    bol: function bol(e) {
      return "boolean" == typeof e;
    },
    obj: function obj(e) {
      n = Object.prototype.toString.call(e);
      t = "Object";
      return n.indexOf(t) > -1;
      var n;
      var t;
    },
    str: function str(e) {
      return "string" == typeof e;
    },
    fnc: function fnc(e) {
      return "function" == typeof e;
    },
    num: function num(e) {
      return "number" == typeof e;
    },
    und: function und(e) {
      return void 0 === e;
    },
    nil: function nil(e) {
      return t.und(e) || null === e;
    },
    hex: function hex(e) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
    },
    rgb: function rgb(e) {
      return /^rgb/.test(e);
    },
    hsl: function hsl(e) {
      return /^hsl/.test(e);
    },
    col: function col(e) {
      return t.hex(e) || t.rgb(e) || t.hsl(e);
    },
  };
  function r(e) {
    var n = Number(e);
    return isNaN(n) ? 0 : n;
  }
  function i(e) {
    return t.rgb(e)
      ? (r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((n = e)))
        ? "rgba(" + r[1] + ",1)"
        : n
      : t.hex(e)
      ? (function (e) {
          var n = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, n, t, r) {
            return n + n + t + t + r + r;
          });
          var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);
          return "rgba(" + parseInt(t[1], 16) + "," + parseInt(t[2], 16) + "," + parseInt(t[3], 16) + ",1)";
        })(e)
      : t.hsl(e)
      ? (function (e) {
          var n;
          var t;
          var r;
          var i = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e);
          var a = parseInt(i[1], 10) / 360;
          var o = parseInt(i[2], 10) / 100;
          var u = parseInt(i[3], 10) / 100;
          var s = i[4] || 1;
          function c(e, n, t) {
            if (t < 0) {
              t += 1;
            }
            if (t > 1) {
              t -= 1;
            }
            return t < 0.16666666666666666
              ? e + 6 * (n - e) * t
              : t < 0.5
              ? n
              : t < 0.6666666666666666
              ? e + (n - e) * (0.6666666666666666 - t) * 6
              : e;
          }
          if (0 == o) {
            n = t = r = u;
          } else {
            var d = u < 0.5 ? u * (1 + o) : u + o - u * o;
            var f = 2 * u - d;
            n = c(f, d, a + 0.3333333333333333);
            t = c(f, d, a);
            r = c(f, d, a - 0.3333333333333333);
          }
          return "rgba(" + Math.round(255 * n) + "," + Math.round(255 * t) + "," + Math.round(255 * r) + "," + s + ")";
        })(e)
      : void 0;
    var n;
    var r;
  }
  function a() {
    return !!document && document.hidden;
  }
  function o(e, n) {
    var t = /^(\*=|\+=|-=)/.exec(e);
    if (!t) {
      return e;
    }
    var r = parseFloat(n);
    var i = parseFloat(e.replace(t[0], ""));
    switch (t[0][0]) {
      case "+":
        return r + i + 0;
      case "-":
        return r - i + 0;
      default:
        return r * i + 0;
    }
  }
  var u = function u(e, n) {
    return -1;
  };
  var s = function s(e) {};
  "undefined" != typeof window && window.requestAnimationFrame
    ? ((u = window.requestAnimationFrame), (s = window.cancelAnimationFrame))
    : "undefined" != typeof window && window.setTimeout
    ? ((u = function u(e, n) {
        var t = n || 0;
        var r = new Date().getTime();
        var i = Math.max(0, 16.7 - (r - t));
        t = r + i;
        return window.setTimeout(function () {
          e(r + i);
        }, i);
      }),
      (s = window.clearTimeout))
    : console.warn("@/utils/@milimu/timeline engine: 该环境中缺少requestAnimationFrame/setTimeout，请自行设置timer");
  var c = new (function () {
    var that = this;
    this.suspendWhenDocumentHidden = true;
    this.activeAnimates = [];
    this.setTimer = function (e) {
      u = e.timer;
      s = e.cancel;
    };
    this.setSuspendWhenDocumentHidden = function (n) {
      that.suspendWhenDocumentHidden = n;
    };
    this.handleVisibilityChange = function () {
      if (that.suspendWhenDocumentHidden) {
        a()
          ? that.stopEngine()
          : (that.activeAnimates.forEach(function (e) {
              return e._onDocumentVisibility();
            }),
            that.engine());
      }
    };
    this.stopEngine = function () {
      if (that.raf) {
        s(that.raf);
      }
      that.raf = void 0;
    };
    this.engine = function () {
      u
        ? that.raf || (a() && that.suspendWhenDocumentHidden) || !(that.activeAnimates.length > 0) || (that.raf = u(that.step.bind(that)))
        : console.error("timer 未定义");
    };
    this.step = function (n) {
      for (var t = that.activeAnimates.length, r = 0; r < t; ) {
        var i = that.activeAnimates[r];
        i.paused ? (that.activeAnimates.splice(r, 1), t--) : (i.tick(n), r++);
      }
      that.raf = r > 0 ? u(that.step.bind(that)) : void 0;
    };
    if ("undefined" != typeof document) {
      document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));
    }
  })();
  var d = (function () {
    function e(r) {
      var that = this;
      this.duration = 0;
      this.callbacks = {};
      this.loop = 1;
      this.remaining = 1;
      this.direction = "normal";
      this.autoplay = false;
      this.passThrough = true;
      this.currentTime = 0;
      this.progress = 0;
      this.paused = true;
      this.began = false;
      this.completed = true;
      this.reversed = true;
      this.startTime = 0;
      this.now = 0;
      this.lastTime = 0;
      this.resolve = null;
      this.speed = 1;
      this.__tracks = {};
      this.__trackDeleteCache = {};
      this.__trackCache = [];
      this.add = function (e) {
        that.__trackCache.push(e);
        return that;
      };
      this.remove = function (e) {
        if (t.str(e)) {
          var n = that.__tracks[e];
          if (n) {
            that.__trackDeleteCache[n.name] = -1;
          }
        } else {
          for (var r in that.__tracks) {
            var a = that.__tracks[r].animations.findIndex(function (n) {
              return n === e;
            });
            if (a > -1) {
              1 === that.__tracks[r].animations.length
                ? (that.__trackDeleteCache[r] = -1)
                : (that.__trackDeleteCache[r] || (that.__trackDeleteCache[r] = new Set()), that.__trackDeleteCache[r].add(a));
              break;
            }
          }
        }
        return that;
      };
      this.update = function () {
        if (!that.__trackCache.length && !Object.keys(that.__trackDeleteCache).length) {
          return that;
        }
        that.passThrough = true;
        var n = e.engine.activeAnimates.indexOf(that);
        if (n > -1) {
          e.engine.activeAnimates.splice(n, 1);
        }
        that.removeAnimationFromTrack(that.__trackDeleteCache);
        that.addTrack(that.__trackCache);
        that.duration = Object.values(that.__tracks).reduce(
          function (e, n) {
            return e.end > n.end ? e : n;
          },
          {
            end: that.duration,
          },
        ).end;
        that.__trackCache = [];
        that.__trackDeleteCache = {};
        var t = that.began;
        var r = that.completed;
        var a = that.reversed;
        var o = that.remaining;
        var u = that.currentTime;
        that.reset();
        if (t && !r) {
          that.began = t;
          that.reversed = a;
          that.remaining = o;
          that.currentTime = u;
        }
        if (that.autoplay) {
          that.play();
        }
        return that;
      };
      this.destroy = function () {
        that.passThrough = true;
        var n = e.engine.activeAnimates.indexOf(that);
        if (n > -1) {
          e.engine.activeAnimates.splice(n, 1);
        }
        that.reset();
        that.__tracks = {};
        that.__trackCache = [];
        that.__trackDeleteCache = {};
      };
      this.removeAnimationFromTrack = function (e) {
        for (var n in e) {
          if (that.__tracks[n]) {
            -1 !== e[n] ? that.__tracks[n].remove(Array.from(e[n])).update() : (that.__tracks[n].remove().update(), delete that.__tracks[n]);
          }
        }
      };
      this.addTrack = function (e) {
        for (var n = 0, t = e; n < t.length; n++) {
          var r = t[n];
          that.__tracks[r.name] = r;
          try {
            r.update();
          } catch (e) {
            console.log("CatchClause", e);
            console.log("CatchClause", e);
//             e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            console.log(e, r);
          }
        }
      };
      this.initSettings = function (e) {
        for (var n = 0, r = ["update", "begin", "loopBegin", "loopComplete", "complete"]; n < r.length; n++) {
          var a = r[n];
          that.callbacks[a] = e[a];
        }
        t.und(e.direction) || (that.direction = e.direction);
        t.und(e.loop) || ("alternate" === that.direction && 1 !== e.loop ? (that.loop = 2 * e.loop) : (that.loop = e.loop));
        if ("boolean" == typeof e.autoplay) {
          that.autoplay = e.autoplay;
        }
      };
      this.resetTime = function () {
        that.startTime = 0;
        that.lastTime = that.adjustTime(that.currentTime) * (1 / that.speed);
      };
      this.adjustTime = function (e) {
        return that.reversed ? that.duration - e : e;
      };
      this.tick = function (e) {
        var n;
        that.now = e;
        that.startTime || (that.startTime = that.now);
        that.setProgress((that.now + (that.lastTime - that.startTime)) * that.speed);
        null === (n = that.customRenderer) || void 0 === n || n.call(that);
      };
      this.setProgress = function (e) {
        var t = that.duration;
        var r = that.adjustTime(e);
        that.progress = n((r / t) * 100, 0, 100);
        if (!that.began && that.currentTime > 0) {
          that.began = true;
          that.lifeCycleHook("begin");
        }
        if (0 === that.currentTime) {
          that.setAnimationsProgress(0);
        }
        (r >= t && that.currentTime !== t) || !t ? that.setAnimationsProgress(t) : that.setAnimationsProgress(r);
        that.currentTime = n(r, 0, t);
        if (that.began) {
          that.lifeCycleHook("update");
        }
        if (e >= t) {
          that.lastTime = 0;
          that.countIteration();
          that.remaining
            ? ((that.startTime = that.now), "alternate" === that.direction && that.toggleChangeDirection())
            : ((that.paused = true),
              that.completed ||
                ((that.completed = true),
                that.lifeCycleHook("complete"),
                !that.passThrough &&
                  Promise &&
                  (that.resolve(),
                  (that.finished = new Promise(function (e) {
                    return (that.resolve = e);
                  })))));
        }
      };
      this.countIteration = function () {
        if (that.remaining) {
          that.remaining--;
        }
      };
      this.toggleChangeDirection = function () {
        if ("alternate" !== that.direction) {
          that.direction = "normal" !== that.direction ? "normal" : "reverse";
        }
        that.reversed = !that.reversed;
      };
      this.lifeCycleHook = function (e) {
        var n;
        var t;
        if (!that.passThrough) {
          null === (t = (n = that.callbacks)[e]) || void 0 === t || t.call(n, that);
        }
      };
      this._onDocumentVisibility = this.resetTime;
      this.setAnimationsProgress = function (e) {
        for (var n = 0, t = Object.values(that.__tracks); n < t.length; n++) {
          var r = t[n];
          e < r.start ? r.finished && (r.finished = false) : (e > r.end && r.finished) || r.run(e);
        }
      };
      this.seek = function (e) {
        that.setProgress(that.adjustTime(e));
        return that;
      };
      this.pause = function () {
        that.paused = true;
        that.resetTime();
        return that;
      };
      this.play = function () {
        if (that.paused && (that.completed && that.reset(), 0 !== that.duration)) {
          that.paused = false;
          e.engine.activeAnimates.push(that);
          that.resetTime();
          e.engine.engine();
          return that;
        }
      };
      this.restart = function () {
        that.reset();
        that.play();
        return that;
      };
      this.reset = function () {
        that.passThrough = false;
        that.currentTime = 0;
        that.progress = 0;
        that.paused = true;
        that.began = false;
        that.completed = false;
        that.reversed = "reverse" === that.direction;
        that.remaining = that.loop;
        if ((that.reversed && that.loop) || ("alternate" === that.direction && 1 === that.loop)) {
          that.remaining++;
        }
        Object.values(that.__tracks).map(function (e) {
          e.reset();
        });
        that.setAnimationsProgress(that.reversed ? that.duration : 0);
        return that;
      };
      this.reverse = function () {
        that.toggleChangeDirection();
        that.completed = !that.reversed;
        that.resetTime();
        return that;
      };
      if (r && t.fnc(r.renderer)) {
        this.customRenderer = r.renderer;
      }
      this.finished = new Promise(function (e) {
        return (that.resolve = e);
      });
      this.initSettings(r || {});
    }
    Object.defineProperty(e.prototype, "alternateReversed", {
      get: function get() {
        return this.reversed && "alternate" === this.direction;
      },
      enumerable: false,
      configurable: true,
    });
    e.engine = c;
    return e;
  })();
  var _f = function f(e, n) {
    _f =
      Object.setPrototypeOf ||
      ({
        __proto__: [],
      } instanceof Array &&
        function (e, n) {
          e.__proto__ = n;
        }) ||
      function (e, n) {
        for (var t in n) {
          if (Object.prototype.hasOwnProperty.call(n, t)) {
            e[t] = n[t];
          }
        }
      };
    return _f(e, n);
  };
  var _l = function l() {
    _l =
      Object.assign ||
      function (e) {
        for (var n, t = 1, r = arguments.length; t < r; t++) {
          for (var i in (n = arguments[t])) {
            if (Object.prototype.hasOwnProperty.call(n, i)) {
              e[i] = n[i];
            }
          }
        }
        return e;
      };
    return _l.apply(this, arguments);
  };
  var h = function h(e) {
    this.start = 0;
    this.end = 0;
    this.began = false;
    this.finished = false;
    this.origin = e;
  };
  var m = (function (e) {
    function i(i, a) {
      var o = e.call(this, "") || this;
      o.__delay = {
        pending: 0,
        current: 0,
      };
      o.__animatables = [];
      o.__animationConfigCache = [];
      o.add = function (e, n) {
        var r = t.arr(e) ? e : [e];
        t.num(n)
          ? (o.__animationConfigCache = o.__animationConfigCache.slice(0, n).concat(r, o.__animationConfigCache.slice(n)))
          : (o.__animationConfigCache = o.__animationConfigCache.concat(r));
        return o;
      };
      o.remove = function (e) {
        if (t.und(e)) {
          o.__animationConfigCache = [];
          return o;
        }
        if (t.arr(e)) {
          var n = [];
          o.__animationConfigCache.map(function (t, r) {
            e.includes(r) || n.push(t);
          });
          o.__animationConfigCache = n;
          return o;
        }
        return (t.num(e)
          ? e
          : o.__animationConfigCache.findIndex(function (n) {
              return n === e;
            })) > -1
          ? (o.__animationConfigCache.splice(e, 1), o)
          : o;
      };
      o.update = function () {
        var e = o.calcAniamtables();
        var n = e.__animatables;
        var t = e.start;
        var r = e.end;
        o.__animatables = n;
        o.start = t;
        o.end = r;
        return o;
      };
      o.getDuration = function (e) {
        if (void 0 === e) {
          e = true;
        }
        if (e) {
          return o.end - o.start;
        }
        var n = o.calcAniamtables();
        var t = n.start;
        return n.end - t;
      };
      o.calcAniamtables = function () {
        for (var e = [], n = o.__tempAnimatable, t = 0, i = o.__animationConfigCache; t < i.length; t++) {
          var a = i[t];
          var u = new h(a);
          u.start = n.end + r(a.offset);
          u.end = u.start + a.duration;
          e.push(u);
          n = u;
        }
        for (var s = o.start, c = o.end, d = 0, f = e; d < f.length; d++) {
          var l = f[d];
          if (l.start < s) {
            s = l.start;
          }
          if (l.end > c) {
            c = l.end;
          }
        }
        return {
          __animatables: e,
          start: s,
          end: c,
        };
      };
      o.run = function (e) {
        o.__animatables.forEach(function (t) {
          var r;
          var i;
          var a;
          var o;
          var u;
          var s;
          if (e < t.start) t.finished = false;
          else if (!(e > t.end && t.finished) && t.origin) {
            var c = n(e - t.start, 0, t.origin.duration) / t.origin.duration;
            t.began ||
              (null === (i = (r = t.origin).begin) ||
                void 0 === i ||
                i.call(r, {
                  progress: c,
                  time: e,
                }),
              (t.began = true));
            if (e >= t.end && !t.finished) {
              c = 1;
              t.finished = true;
              null === (o = (a = t.origin).complete) ||
                void 0 === o ||
                o.call(a, {
                  progress: c,
                  time: e,
                });
            }
            null === (s = (u = t.origin).update) ||
              void 0 === s ||
              s.call(u, {
                progress: c,
                time: e,
              });
          }
        });
      };
      o.reset = function () {
        o.__animatables.map(function (e) {
          e.finished = false;
          e.began = false;
        });
        o.finished = false;
      };
      o.name = i;
      o.delay = r(null == a ? void 0 : a.delay);
      o.start = o.delay;
      o.end = o.delay;
      return o;
    }
    (function (e, n) {
      if ("function" != typeof n && null !== n) {
        throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
      }
      function t() {
        this.constructor = e;
      }
      _f(e, n);
      e.prototype = null === n ? Object.create(n) : ((t.prototype = n.prototype), new t());
    })(i, e);
    Object.defineProperty(i.prototype, "duration", {
      get: function get() {
        return this.end - this.start;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(i.prototype, "delay", {
      get: function get() {
        return this.__delay.current;
      },
      set: function set(e) {
        this.__delay.pending = e;
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(i.prototype, "animations", {
      get: function get() {
        return this.__animatables
          .map(function (e) {
            return e.origin;
          })
          .filter(Boolean);
      },
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(i.prototype, "__tempAnimatable", {
      get: function get() {
        var e = new h(null);
        e.start = this.__delay.pending;
        e.end = this.__delay.pending;
        return e;
      },
      enumerable: false,
      configurable: true,
    });
    return i;
  })(h);
  var p = 0.1;
  function g(e, n) {
    return 1 - 3 * n + 3 * e;
  }
  function v(e, n) {
    return 3 * n - 6 * e;
  }
  function _(e) {
    return 3 * e;
  }
  function b(e, n, t) {
    return ((g(n, t) * e + v(n, t)) * e + _(n)) * e;
  }
  function y(e, n, t) {
    return 3 * g(n, t) * e * e + 2 * v(n, t) * e + _(n);
  }
  function C(e, n, t, r) {
    if (0 <= e && e <= 1 && 0 <= t && t <= 1) {
      var i = new Float32Array(11);
      if (e !== n || t !== r) {
        for (var a = 0; a < 11; ++a) {
          i[a] = b(a * p, e, t);
        }
      }
      return function (i) {
        return (e === n && t === r) || 0 === i || 1 === i ? i : b(o(i), n, r);
      };
    }
    function o(n) {
      for (var r = 0, a = 1; 10 !== a && i[a] <= n; ++a) {
        r += p;
      }
      --a;
      var o = r + ((n - i[a]) / (i[a + 1] - i[a])) * p;
      var u = y(o, e, t);
      return u >= 0.001
        ? (function (e, n, t, r) {
            for (var i = 0; i < 4; ++i) {
              var a = y(n, t, r);
              if (0 === a) {
                return n;
              }
              n -= (b(n, t, r) - e) / a;
            }
            return n;
          })(n, o, e, t)
        : 0 === u
        ? o
        : (function (e, n, t, r, i) {
            var a;
            var o;
            var u = 0;
            do {
              (a = b((o = n + (t - n) / 2), r, i) - e) > 0 ? (t = o) : (n = o);
            } while (Math.abs(a) > 1e-7 && ++u < 10);
            return o;
          })(n, r, r + p, e, t);
    }
  }
  function T(e) {
    if (void 0 === e) {
      e = 10;
    }
    return function (t) {
      return Math.ceil(n(t, 0.000001, 1) * e) * (1 / e);
    };
  }
  var k;
  var w;
  var A =
    ((k = {
      linear: function linear() {
        return function (e) {
          return e;
        };
      },
    }),
    (w = {
      Sine: function Sine() {
        return function (e) {
          return 1 - Math.cos((e * Math.PI) / 2);
        };
      },
      Circ: function Circ() {
        return function (e) {
          return 1 - Math.sqrt(1 - e * e);
        };
      },
      Back: function Back() {
        return function (e) {
          return e * e * (3 * e - 2);
        };
      },
      Bounce: function Bounce() {
        return function (e) {
          for (var n, t = 4; e < ((n = Math.pow(2, --t)) - 1) / 11; ) {}
          return 1 / Math.pow(4, 3 - t) - 7.5625 * Math.pow((3 * n - 2) / 22 - e, 2);
        };
      },
      Elastic: function Elastic(e, t) {
        if (void 0 === e) {
          e = 1;
        }
        if (void 0 === t) {
          t = 0.5;
        }
        var r = n(e, 1, 10);
        var i = n(t, 0.1, 2);
        return function (e) {
          return 0 === e || 1 === e
            ? e
            : -r * Math.pow(2, 10 * (e - 1)) * Math.sin(((e - 1 - (i / (2 * Math.PI)) * Math.asin(1 / r)) * (2 * Math.PI)) / i);
        };
      },
    }),
    ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function (e, n) {
      w[e] = function () {
        return function (e) {
          return Math.pow(e, n + 2);
        };
      };
    }),
    Object.keys(w).forEach(function (e) {
      var n = w[e];
      k["easeIn" + e] = n;
      k["easeOut" + e] = function (e, t) {
        return function (r) {
          return 1 - n(e, t)(1 - r);
        };
      };
      k["easeInOut" + e] = function (e, t) {
        return function (r) {
          return r < 0.5 ? n(e, t)(2 * r) / 2 : 1 - n(e, t)(-2 * r + 2) / 2;
        };
      };
      k["easeOutIn" + e] = function (e, t) {
        return function (r) {
          return r < 0.5 ? (1 - n(e, t)(1 - 2 * r)) / 2 : (n(e, t)(2 * r - 1) + 1) / 2;
        };
      };
    }),
    _l(_l({}, k), {
      bezier: C,
      steps: T,
    }));
  var O = {
    duration: 1000,
    delay: 0,
    easing: A.easeOutElastic(1, 0.5),
  };
  var j = function j(e, r) {
    var that = this;
    this.normalizeTweens = function (e, n) {
      var r;
      return n.tweens.map(function (i) {
        var u = i.value;
        var s = e[n.name] || 0;
        var c = r ? r.to.original : s;
        var d = t.arr(u) ? u[0] : c;
        var f = t.arr(u) ? u[1] : u;
        if (t.und(f)) {
          f = r;
        }
        var h = _l(_l({}, i), {
          from: that.decomposeValue(d),
          to: that.decomposeValue(o(f, d)),
          start: 0,
          end: 0,
          isColor: false,
        });
        h.start = r ? r.end : 0;
        h.end = h.start + h.delay + h.duration;
        h.isColor = t.col(h.from.original);
        r = h;
        return h;
      });
    };
    this.decomposeValue = function (e) {
      var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
      var r =
        (function (e) {
          return t.col(e) ? i(e) : (/\s/g.test(e), e);
        })(e) + "";
      return {
        original: r,
        numbers: r.match(n) ? r.match(n).map(Number) : [0],
        strings: t.str(e) ? r.split(n) : [],
      };
    };
    this.update = function (e) {
      var t = e.progress;
      var r = that.tweens;
      var i = r.length - 1;
      var o = t * that.duration;
      var u = r[i];
      if (i) {
        u =
          r.filter(function (e) {
            return o < e.end;
          })[0] || u;
      }
      for (
        var s = n(o - u.start - u.delay, 0, u.duration) / u.duration,
          c = isNaN(s) ? 1 : u.easing(s),
          d = u.to.strings,
          f = [],
          l = u.to.numbers.length,
          h = 0;
        h < l;
        h++
      ) {
        var m = u.to.numbers[h];
        var p = u.from.numbers[h] || 0;
        f.push(p + c * (m - p));
      }
      var g;
      var v = d.length;
      if (v) {
        g = d[0];
        for (var _ = 0; _ < v; _++) {
          isNaN(f[_]) || (d[_ + 1] ? (g += f[_] + d[_ + 1]) : (g += f[_] + " "));
        }
      } else {
        g = f[0];
      }
      that.target[that.property] = g;
      that.currentValue = g;
    };
    this.target = e;
    this.property = r.name;
    var u = this.normalizeTweens(e, r);
    var s = u[u.length - 1];
    this.tweens = u;
    this.duration = s.end;
    this.delay = u[0].delay;
  };
  e.Timeline = d;
  e.Track = m;
  e.createMotionTween = function (e) {
    var n = (function (e, n) {
      var r = _l({}, n);
      if (t.num(e.defaultDuration)) {
        r.duration = e.defaultDuration;
      }
      if (t.num(e.defaultDelay)) {
        r.delay = e.defaultDelay;
      }
      if (t.fnc(e.defaultEasing)) {
        r.easing = e.defaultEasing;
      }
      return r;
    })(e, O);
    var r = (function (e, n) {
      return Object.keys(e.property)
        .map(function (r) {
          if (t.und(e.target[r])) {
            return false;
          }
          var i = _l({}, n);
          var a = e.property[r];
          if (t.arr(a)) {
            2 === a.length && !t.obj(a[0])
              ? (a = {
                  value: a,
                })
              : (i.duration = n.duration / a.length);
          }
          return {
            name: r,
            tweens: (t.arr(a) ? a : [a]).map(function (e, r) {
              var a = t.obj(e)
                ? e
                : {
                    value: e,
                  };
              if (t.und(a.delay)) {
                a.delay = r ? 0 : n.delay;
              }
              return _l(_l({}, i), a);
            }),
          };
        })
        .filter(Boolean);
    })(e, n).map(function (n) {
      return new j(e.target, n);
    });
    var i = (function (e) {
      var n = e.length
        ? Math.max.apply(
            Math,
            e.map(function (e) {
              return e.duration;
            }),
          )
        : 0;
      var t = e.length
        ? Math.min.apply(
            Math,
            e.map(function (e) {
              return e.delay;
            }),
          )
        : 0;
      return {
        duration: n,
        delay: t,
      };
    })(r);
    return {
      duration: i.duration,
      delay: i.delay,
      offset: e.offset,
      update: function update(n) {
        e.update
          ? e.update(
              _l(_l({}, n), {
                animations: r,
              }),
            )
          : r.map(function (e) {
              return e.update(n);
            });
      },
    };
  };
  e.easings = A;
  e.engine = c;
});
//# sourceMappingURL=index.js.map
