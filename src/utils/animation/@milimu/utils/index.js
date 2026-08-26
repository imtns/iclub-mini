require("../../@babel/runtime/helpers/Objectvalues");
var _typeof2 = require("../../@babel/runtime/helpers/typeof");
!(function (t, n) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "undefined" != typeof module
    ? n(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], n)
    : n(((t = "undefined" != typeof globalThis ? globalThis : t || self).utils = {}));
})(void 0, function (t) {
  "use strict";

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
  function n(t, n, e, r) {
    return new (e || (e = Promise))(function (i, o) {
      function a(t) {
        try {
          c(r.next(t));
        } catch (t) {
          // t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
          o(t);
        }
      }
      function u(t) {
        try {
          c(r.throw(t));
        } catch (t) {
          // t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
          o(t);
        }
      }
      function c(t) {
        var n;
        t.done
          ? i(t.value)
          : ((n = t.value),
            n instanceof e
              ? n
              : new e(function (t) {
                  t(n);
                })).then(a, u);
      }
      c((r = r.apply(t, n || [])).next());
    });
  }
  function e(t, n) {
    var e,
      r,
      i,
      o,
      a = {
        label: 0,
        sent: function sent() {
          if (1 & i[0]) throw i[1];
          return i[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (o = {
        next: u(0),
        throw: u(1),
        return: u(2),
      }),
      "function" == typeof Symbol &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function u(o) {
      return function (u) {
        return (function (o) {
          if (e) throw new TypeError("Generator is already executing.");
          for (; a; )
            try {
              if (
                ((e = 1), r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
              )
                return i;
              switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                case 0:
                case 1:
                  i = o;
                  break;
                case 4:
                  return (
                    a.label++,
                    {
                      value: o[1],
                      done: !1,
                    }
                  );
                case 5:
                  a.label++, (r = o[1]), (o = [0]);
                  continue;
                case 7:
                  (o = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (!((i = a.trys), (i = i.length > 0 && i[i.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                    a = 0;
                    continue;
                  }
                  if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                    a.label = o[1];
                    break;
                  }
                  if (6 === o[0] && a.label < i[1]) {
                    (a.label = i[1]), (i = o);
                    break;
                  }
                  if (i && a.label < i[2]) {
                    (a.label = i[2]), a.ops.push(o);
                    break;
                  }
                  i[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              o = n.call(t, a);
            } catch (t) {
              // t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
              (o = [6, t]), (r = 0);
            } finally {
              e = i = 0;
            }
          if (5 & o[0]) throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0,
          };
        })([o, u]);
      };
    }
  }
  var r = Object.freeze({
    __proto__: null,
    loadImage: function loadImage(t, r) {
      return n(this, void 0, void 0, function () {
        var n, i;
        return e(this, function (e) {
          return (
            (n = new Image()),
            (i = new Promise(function (t, e) {
              (n.onload = function () {
                t({
                  width: n.width,
                  height: n.height,
                  image: n,
                });
              }),
                (n.onerror = e);
            })),
            (n.src = t),
            r && r.crossOrigin && (n.crossOrigin = "true"),
            [2, i]
          );
        });
      });
    },
    scaleViewportWithRatio: function scaleViewportWithRatio(t, n) {
      var e = t.top,
        r = t.left,
        i = t.width,
        o = t.height,
        a = Math.abs((i - i * n) / 2),
        u = Math.abs((o - o * n) / 2);
      n >= 1 ? ((e -= u), (r -= a)) : ((e += u), (r += a));
      var c = {
        y: e,
        x: r,
        width: i * n,
        height: o * n,
      };
      return {
        wrapRectData: c,
        faceData: {
          scale: c.width / i,
          transformOrigin: {
            x: r + i / 2,
            y: e + o / 2,
          },
        },
      };
    },
    getRatio: function getRatio(t, n, e) {
      if (e) return Math.min(n.width / t.width, n.height / t.height);
      if (n.width === n.height) {
        var r = Math.max(t.width, t.height);
        return n.width > r ? 1 : n.width / r;
      }
      return t.height / n.height > t.width / n.width ? (n.height > t.height ? 1 : n.height / t.height) : n.width > t.width ? 1 : n.width / t.width;
    },
  });
  function i(t, n) {
    return t.indexOf(n) > -1;
  }
  var o = {
    arr: function arr(t) {
      return Array.isArray(t);
    },
    bol: function bol(t) {
      return "boolean" == typeof t;
    },
    obj: function obj(t) {
      return i(Object.prototype.toString.call(t), "Object");
    },
    str: function str(t) {
      return "string" == typeof t;
    },
    fnc: function fnc(t) {
      return "function" == typeof t;
    },
    num: function num(t) {
      return "number" == typeof t;
    },
    und: function und(t) {
      return void 0 === t;
    },
    nil: function nil(t) {
      return o.und(t) || null === t;
    },
    hex: function hex(t) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
    },
    rgb: function rgb(t) {
      return /^rgb/.test(t);
    },
    hsl: function hsl(t) {
      return /^hsl/.test(t);
    },
    col: function col(t) {
      return o.hex(t) || o.rgb(t) || o.hsl(t);
    },
    base64: function base64(t) {
      return !!this.str(t) && /^data:image\/.*;base64,/.test(t);
    },
    emptyObj: function emptyObj(t) {
      return !!this.obj(t) && !!Object.keys(t).length;
    },
  };
  var a = Object.freeze({
    __proto__: null,
    getRectangle: function getRectangle(t) {
      var n;
      return (
        t.face_rectangle && (n = t.face_rectangle),
        t.hand_rectangle && (n = t.hand_rectangle),
        t.humanbody_rectangle && (n = t.humanbody_rectangle),
        t.body_rectangle && (n = t.body_rectangle),
        n
      );
    },
    flattenLandmark: function flattenLandmark(t) {
      for (var n = {}, e = 0, r = Object.values(t); e < r.length; e++) {
        var i = r[e];
        for (var o in i)
          "number" == typeof i[o]
            ? (n[o] = {
                x: i[o],
                y: i[o],
              })
            : (n[o] = i[o]);
      }
      return n;
    },
    stringContains: i,
    is: o,
    random: function random(t, n, e) {
      if ("int" === n) return Number(Math.floor(Math.random() * (t[1] - t[0] + 1)) + t[0]);
      var r = e && e >= 0 && e <= 20 ? e : 2;
      return Number((Math.random() * (t[0] - t[1]) + t[1]).toFixed(r));
    },
  });
  var u = Object.freeze({
    __proto__: null,
    getPointAngle: function getPointAngle(t, n) {
      var e = n.x - t.x,
        r = n.y - t.y;
      return Math.atan2(r, e);
    },
  });
  (t.dataUtils = a), (t.imageUtils = r), (t.mathUtils = u);
});
//# sourceMappingURL=index.js.map
