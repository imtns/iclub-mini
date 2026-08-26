require("../@babel/runtime/helpers/Arrayincludes");

var _typeof2 = require("../@babel/runtime/helpers/typeof");

!(function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = "undefined" != typeof globalThis ? globalThis : t || self).milimu = {}));
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
      ***************************************************************************** */ var _e = function e(t, i) {
    return (
      (_e =
        Object.setPrototypeOf ||
        ({
          __proto__: [],
        } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        }),
      _e(t, i)
    );
  };
  function i(t, i) {
    if ("function" != typeof i && null !== i) throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
    function r() {
      this.constructor = t;
    }
    _e(t, i), (t.prototype = null === i ? Object.create(i) : ((r.prototype = i.prototype), new r()));
  }
  function r(t, e, i) {
    if (i || 2 === arguments.length)
      for (var r, n = 0, o = e.length; n < o; n++) (!r && n in e) || (r || (r = Array.prototype.slice.call(e, 0, n)), (r[n] = e[n]));
    return t.concat(r || Array.prototype.slice.call(e));
  }
  var n = (function () {
      function t(e, i, r, n) {
        void 0 === e && (e = 0),
          void 0 === i && (i = 0),
          void 0 === r && (r = 0),
          void 0 === n && (n = 0),
          (this.type = t.TYPE),
          (this.x = e),
          (this.y = i),
          (this.width = r),
          (this.height = n);
      }
      return (
        Object.defineProperty(t.prototype, "left", {
          get: function get() {
            return this.x;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "right", {
          get: function get() {
            return this.x + this.width;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "top", {
          get: function get() {
            return this.y;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "bottom", {
          get: function get() {
            return this.y + this.height;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "empty", {
          get: function get() {
            return new t(0, 0, 0, 0);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.clone = function () {
          return new t(this.x, this.y, this.width, this.height);
        }),
        (t.prototype.copyFrom = function (t) {
          return (this.x = t.x), (this.y = t.y), (this.width = t.width), (this.height = t.height), this;
        }),
        (t.prototype.copyTo = function (t) {
          return (t.x = this.x), (t.y = this.y), (t.width = this.width), (t.height = this.height), t;
        }),
        (t.prototype.contains = function (t, e) {
          return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && e >= this.y && e <= this.y + this.height;
        }),
        (t.prototype.toString = function () {
          return "[@milimu/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
        }),
        (t.TYPE = "rectangle"),
        t
      );
    })(),
    o = (function () {
      function t() {
        this.nodes = {};
      }
      return (
        (t.prototype.has = function (t) {
          return !!this.nodes[t];
        }),
        (t.prototype.add = function (t) {
          t.name && (this.nodes[t.name] ? console.error("node name: " + t.name + " has been used") : (this.nodes[t.name] = t));
        }),
        (t.prototype.delete = function (t) {
          t.name && (this.nodes[t.name] ? (this.nodes[t.name] = void 0) : console.error("未创建该节点"));
        }),
        (t.prototype.clear = function () {
          this.nodes = {};
        }),
        t
      );
    })();
  function s(t, e) {
    var i = (e || "node") + "_" + +new Date() + "_" + parseInt(String(1e7 * Math.random()));
    return t.has(i) ? s(t, e) : i;
  }
  var h = (function () {
      function t(t, e) {
        (this.x = t), (this.y = e);
      }
      return (
        (t.prototype.set = function (t, e) {
          (this.x = t || this.x), (this.y = e || this.y);
        }),
        (t.prototype.clone = function () {
          return new t(this.x, this.y);
        }),
        t
      );
    })(),
    a = (function () {
      function t(t, e, i) {
        (this.cb = i), (this._x = t), (this._y = e);
      }
      return (
        Object.defineProperty(t.prototype, "x", {
          get: function get() {
            return this._x;
          },
          set: function set(t) {
            (this._x = t), this.cb && this.cb(new h(this._x, this._y));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "y", {
          get: function get() {
            return this._y;
          },
          set: function set(t) {
            (this._y = t), this.cb && this.cb(new h(this._x, this._y));
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.set = function (t, e) {
          void 0 !== t && (this._x = t), void 0 !== e && (this._y = e), this.cb && this.cb(new h(this._x, this._y));
        }),
        (t.prototype.clone = function () {
          return new t(this.x, this.y, this.cb);
        }),
        t
      );
    })(),
    l = "undefined" != typeof Float32Array ? Float32Array : Array,
    u = Math.PI / 180;
  function c() {
    var t = new l(6);
    return l != Float32Array && ((t[1] = 0), (t[2] = 0), (t[4] = 0), (t[5] = 0)), (t[0] = 1), (t[3] = 1), t;
  }
  function d(t, e, i) {
    var r = e[0],
      n = e[1],
      o = e[2],
      s = e[3],
      h = e[4],
      a = e[5],
      l = i[0],
      u = i[1];
    return (t[0] = r), (t[1] = n), (t[2] = o), (t[3] = s), (t[4] = r * l + o * u + h), (t[5] = n * l + s * u + a), t;
  }
  function f() {
    var t = new l(2);
    return l != Float32Array && ((t[0] = 0), (t[1] = 0)), t;
  }
  function p(t, e) {
    var i = new l(2);
    return (i[0] = t), (i[1] = e), i;
  }
  function y(t, e, i) {
    var r = e[0],
      n = e[1];
    return (t[0] = i[0] * r + i[2] * n + i[4]), (t[1] = i[1] * r + i[3] * n + i[5]), t;
  }
  Math.hypot ||
    (Math.hypot = function () {
      for (var t = 0, e = arguments.length; e--; ) t += arguments[e] * arguments[e];
      return Math.sqrt(t);
    }),
    f();
  var g,
    b = (function () {
      function t() {
        (this.position = new a(0, 0, this.onChange.bind(this))),
          (this.origin = new a(0, 0, this.onChange.bind(this))),
          (this.scale = new a(1, 1, this.onChange.bind(this))),
          (this.skew = new a(0, 0, this.onChange.bind(this, "position"))),
          (this.localTransform = c()),
          (this.worldTransform = c()),
          (this._rotation = 0),
          (this._localID = 0),
          (this._currentLocalID = 0),
          (this._worldID = 0),
          (this._parentID = 0);
      }
      return (
        Object.defineProperty(t.prototype, "rotation", {
          get: function get() {
            return this._rotation;
          },
          set: function set(t) {
            this._rotation !== t && ((this._rotation = t), this.onChange());
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.onChange = function () {
          this._localID++;
        }),
        (t.prototype.updateLocalTransform = function () {
          this._localID !== this._currentLocalID &&
            ((this.localTransform = this.getCurrentMatrix()), (this._currentLocalID = this._localID), (this._parentID = -1));
        }),
        (t.prototype.updateTransform = function (t) {
          this.updateLocalTransform(),
            this._parentID !== t._worldID && ((this.worldTransform = this.getWorldTransform(t)), (this._parentID = t._worldID), this._worldID++);
        }),
        (t.prototype.getCurrentMatrix = function () {
          var t = this.scale,
            e = t.x,
            i = void 0 === e ? 1 : e,
            r = t.y,
            n = void 0 === r ? 1 : r,
            o = this.skew,
            s = o.x,
            h = void 0 === s ? 0 : s,
            a = o.y,
            f = void 0 === a ? 0 : a,
            y = this.position,
            g = y.x,
            b = void 0 === g ? 0 : g,
            m = y.y,
            _ = void 0 === m ? 0 : m,
            v = c(),
            x = c(),
            w = c(),
            P = c(),
            C = (function (t, e, i, r, n, o) {
              var s = new l(6);
              return (s[0] = t), (s[1] = e), (s[2] = i), (s[3] = r), (s[4] = n), (s[5] = o), s;
            })(1, h, f, 1, b, _),
            M = p(this.origin.x, this.origin.y),
            O = p(-this.origin.x, -this.origin.y);
          return (
            d(w, C, M),
            (function (t, e, i) {
              var r = e[0],
                n = e[1],
                o = e[2],
                s = e[3],
                h = e[4],
                a = e[5],
                l = Math.sin(i),
                u = Math.cos(i);
              (t[0] = r * u + o * l), (t[1] = n * u + s * l), (t[2] = r * -l + o * u), (t[3] = n * -l + s * u), (t[4] = h), (t[5] = a);
            })(
              x,
              w,
              (function (t) {
                return t * u;
              })(this.rotation),
            ),
            (function (t, e, i) {
              var r = e[0],
                n = e[1],
                o = e[2],
                s = e[3],
                h = e[4],
                a = e[5],
                l = i[0],
                u = i[1];
              (t[0] = r * l), (t[1] = n * l), (t[2] = o * u), (t[3] = s * u), (t[4] = h), (t[5] = a);
            })(P, x, p(i, n)),
            d(v, P, O),
            v
          );
        }),
        (t.prototype.getLocalTransform = function () {
          var t,
            e,
            i = c(),
            r = p(-this.position.x, -this.position.y);
          return (
            d(
              i,
              ((t = this.localTransform), ((e = new l(6))[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), (e[4] = t[4]), (e[5] = t[5]), e),
              r,
            ),
            i
          );
        }),
        (t.prototype.getWorldTransform = function (t) {
          var e,
            i,
            r,
            n,
            o,
            s,
            h,
            a,
            l,
            u,
            d,
            f,
            p,
            y,
            g,
            b = c();
          return (
            (e = b),
            (i = t.localTransform),
            (r = this.localTransform),
            (n = i[0]),
            (o = i[1]),
            (s = i[2]),
            (h = i[3]),
            (a = i[4]),
            (l = i[5]),
            (u = r[0]),
            (d = r[1]),
            (f = r[2]),
            (p = r[3]),
            (y = r[4]),
            (g = r[5]),
            (e[0] = n * u + s * d),
            (e[1] = o * u + h * d),
            (e[2] = n * f + s * p),
            (e[3] = o * f + h * p),
            (e[4] = n * y + s * g + a),
            (e[5] = o * y + h * g + l),
            b
          );
        }),
        t
      );
    })(),
    m = function m(t) {
      var e = this;
      (this.isRoot = !0),
        (this.type = "Application"),
        (this.worldAlpha = 1),
        (this.transform = new b()),
        (this.children = []),
        (this.root = this),
        (this.createName = function (t) {
          var i = (t || "node") + "_" + +new Date() + "_" + parseInt(String(1e7 * Math.random()));
          return e.documents.has(i) ? s(e.documents, t) : i;
        }),
        (this.findNode = function (t) {
          return e.documents.nodes[t];
        }),
        (this.addChild = function (t) {
          var i = t;
          Array.isArray(t) || (i = [t]);
          for (var n = 0, o = i; n < o.length; n++) {
            var s = o[n];
            s.parent && s.parent.removeChild(s), (s.parent = e);
          }
          return (e.children = r(r([], e.children), i)), e;
        }),
        (this.removeChild = function (t) {
          var i = e.children.findIndex(function (e) {
            return e.name === t.name;
          });
          return i >= 0 && ((e.children[i].parent = void 0), e.children.splice(i, 1)), e;
        }),
        (this.clearChildren = function () {
          for (var t = 0, i = e.children; t < i.length; t++) {
            var r = i[t];
            e.removeChild(r), r.destroy();
          }
          return (e.children = []), e;
        }),
        (this._recursivePostUpdateTransform = function () {}),
        (this.render = function () {
          e.ctx.clearRect(e.screen.x, e.screen.y, e.screen.width, e.screen.height);
          for (var t = 0, i = e.children; t < i.length; t++) i[t].render(e.ctx);
        }),
        (this.destroy = function () {
          (e.transform = null), e.clearChildren(), e.documents.clear();
        }),
        (this.ctx = t.canvas.getContext("2d")),
        (this.canvas = t.canvas);
      var i = t.devicePixelRatio || 1;
      return (
        (this.devicePixelRatio = i),
        (this.canvas.width = t.width * i),
        (this.canvas.height = t.height * i),
        (this.canvas.style.width = t.width + "px"),
        (this.canvas.style.height = t.height + "px"),
        this.ctx.scale(i, i),
        (this.screen = new n(0, 0, t.width, t.height)),
        (this.documents = new o()),
        (this.name = this.createName(this.type)),
        this
      );
    };
  !(function (t) {
    (t[(t.wilMount = 0)] = "wilMount"), (t[(t.didMount = 1)] = "didMount"), (t[(t.rendering = 2)] = "rendering");
  })(g || (g = {}));
  var _ = (function () {
      function t(t) {
        (this.visible = !0),
          (this.alpha = 1),
          (this.transform = new b()),
          (this._worldAlpha = 1),
          (this._destroyed = !0),
          (this.rendered = g.wilMount),
          (this.__lifeCycle__ = {
            willMount: [
              function (t) {
                t.root &&
                  (t.name || (t.name = t.root.createName(t.type)),
                  t.root.documents.has(t.name) ? ((t.visible = !1), console.warn("Application中存在同名元素：", t.name)) : t.root.documents.add(t));
              },
            ],
            willDestroy: [
              function (t) {
                t.root && t.root.documents.delete(t);
              },
            ],
          }),
          (this.name = t.name),
          (this._width = (null == t ? void 0 : t.width) || 0),
          (this._height = (null == t ? void 0 : t.height) || 0),
          this.transform.position.set(null == t ? void 0 : t.x, null == t ? void 0 : t.y),
          (this.tempDisplayObjectParent = null);
      }
      return (
        Object.defineProperty(t.prototype, "worldTransform", {
          get: function get() {
            return this.transform.worldTransform;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "localTransform", {
          get: function get() {
            return this.transform.localTransform;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "width", {
          get: function get() {
            return this._width;
          },
          set: function set(t) {
            this._width = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "height", {
          get: function get() {
            return this._height;
          },
          set: function set(t) {
            this._height = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "scale", {
          get: function get() {
            return {
              x: this.transform.scale.x,
              y: this.transform.scale.y,
            };
          },
          set: function set(t) {
            if ("number" == typeof t) this.transform.scale.set(t, t);
            else if (!t.hasOwnProperty("x") && !t.hasOwnProperty("y")) return;
            this.transform.scale.set(t.x, t.y);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "rotation", {
          get: function get() {
            return this.transform.rotation;
          },
          set: function set(t) {
            this.transform.rotation = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "x", {
          get: function get() {
            return this.transform.position.x;
          },
          set: function set(t) {
            this.transform.position.set(t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "y", {
          get: function get() {
            return this.transform.position.y;
          },
          set: function set(t) {
            this.transform.position.set(this.x, t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "position", {
          get: function get() {
            return this.transform.position;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "transformOrigin", {
          get: function get() {
            var t = this.transform.origin.clone();
            return [t.x / this.width, t.y / this.height];
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "destroyed", {
          get: function get() {
            return this._destroyed;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "worldAlpha", {
          get: function get() {
            var t = this.alpha;
            return this._parent && (t = this.alpha * this._parent.worldAlpha), (this._worldAlpha = t), t;
          },
          set: function set(t) {
            this._worldAlpha = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "parent", {
          get: function get() {
            return this._parent ? this._parent : this._tempDisplayObjectParent;
          },
          set: function set(t) {
            (this._parent = t), (this._root = (null == t ? void 0 : t.root) || void 0);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "root", {
          get: function get() {
            if (this._parent) return this._parent.root;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "_tempDisplayObjectParent", {
          get: function get() {
            return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new v({})), this.tempDisplayObjectParent;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.destroy = function () {
          this.lifeCycleHook("willDestroy"),
            this.parent && this.parent.removeChild(this),
            (this.transform = null),
            (this.parent = void 0),
            (this._destroyed = !0),
            this.lifeCycleHook("didDestroy");
        }),
        (t.prototype.willMount = function (t) {
          return this.__lifeCycle__.willMount.push(t), this;
        }),
        (t.prototype.didMount = function (t) {
          return this.__lifeCycle__.didMount || (this.__lifeCycle__.didMount = []), this.__lifeCycle__.didMount.push(t), this;
        }),
        (t.prototype.willUpdate = function (t) {
          return this.__lifeCycle__.willUpdate || (this.__lifeCycle__.willUpdate = []), this.__lifeCycle__.willUpdate.push(t), this;
        }),
        (t.prototype.didUpdate = function (t) {
          return this.__lifeCycle__.didUpdate || (this.__lifeCycle__.didUpdate = []), this.__lifeCycle__.didUpdate.push(t), this;
        }),
        (t.prototype.willDestroy = function (t) {
          return this.__lifeCycle__.willDestroy.push(t), this;
        }),
        (t.prototype.didDestroy = function (t) {
          return this.__lifeCycle__.didDestroy || (this.__lifeCycle__.didDestroy = []), this.__lifeCycle__.didDestroy.push(t), this;
        }),
        (t.prototype.willRender = function (t) {
          return this.__lifeCycle__.willRender || (this.__lifeCycle__.willRender = []), this.__lifeCycle__.willRender.push(t), this;
        }),
        (t.prototype.didRender = function (t) {
          return this.__lifeCycle__.didRender || (this.__lifeCycle__.didRender = []), this.__lifeCycle__.didRender.push(t), this;
        }),
        (t.prototype.lifeCycleHook = function (t, e) {
          var i = this;
          return this.__lifeCycle__[t] && this.__lifeCycle__[t].length
            ? (this.__lifeCycle__[t].map(function (t) {
                t(i, e);
              }),
              this)
            : this;
        }),
        (t.prototype.handleTransformAndOpacity = function (t) {
          this._recursivePostUpdateTransform();
          var e = this.localTransform;
          t.transform(e[0], e[1], e[2], e[3], e[4], e[5]), (t.globalAlpha = this.worldAlpha);
        }),
        (t.prototype._recursivePostUpdateTransform = function () {
          this._parent
            ? (this._parent._recursivePostUpdateTransform(), this.transform.updateTransform(this._parent.transform))
            : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
        }),
        (t.prototype.updateTransform = function () {
          this.transform.updateTransform(this.parent.transform), (this.worldAlpha = this.alpha * this.parent.worldAlpha);
        }),
        (t.prototype.setOrigin = function (t) {
          var e, i;
          if (("number" == typeof t ? (e = i = t) : ((e = t.x / this.width), (i = t.y / this.height)), e < 0 || e > 1))
            return console.error("function: setOrigin required args to be number type which between 0 to 1"), this;
          if (void 0 !== i && (i < 0 || i > 1))
            return console.error("function: setOrigin required args to be number type which between 0 to 1"), this;
          var r = e,
            n = i;
          return void 0 === i && (n = e), this.transform.origin.set(r * this.width, n * this.height), this;
        }),
        (t.prototype.setRotate = function (t) {
          return (this.rotation = t), this;
        }),
        (t.prototype.setScale = function (t) {
          return (this.scale = t), this;
        }),
        (t.prototype.setTranslate = function (t) {
          return (this.x = "number" == typeof t.x ? t.x : this.x), (this.y = "number" == typeof t.y ? t.y : this.y), this;
        }),
        (t.prototype.setTranslateX = function (t) {
          return (this.x = t), this;
        }),
        (t.prototype.setTranslateY = function (t) {
          return (this.y = t), this;
        }),
        (t.prototype.toLocal = function (t, e, i) {
          var r = t;
          e && (r = e.toGlobal(t, i)), i || (this._recursivePostUpdateTransform(), this.updateTransform());
          var n,
            o,
            s,
            h,
            a,
            l,
            u,
            d,
            g,
            b = p(r.x, r.y),
            m = f(),
            _ = c();
          return (
            (n = _),
            (o = this.localTransform),
            (s = o[0]),
            (h = o[1]),
            (a = o[2]),
            (l = o[3]),
            (u = o[4]),
            (d = o[5]),
            (g = s * l - h * a) &&
              ((g = 1 / g),
              (n[0] = l * g),
              (n[1] = -h * g),
              (n[2] = -a * g),
              (n[3] = s * g),
              (n[4] = (a * d - l * u) * g),
              (n[5] = (h * u - s * d) * g)),
            y(m, b, _),
            {
              x: m[0],
              y: m[1],
            }
          );
        }),
        (t.prototype.toGlobal = function (t, e) {
          void 0 === e && (e = !1), e || (this._recursivePostUpdateTransform(), this.updateTransform());
          var i = p(t.x, t.y),
            r = f();
          return (
            y(r, i, this.worldTransform),
            {
              x: r[0],
              y: r[1],
            }
          );
        }),
        (t.prototype.render = function (t) {
          this.visible &&
            (this.rendered === g.wilMount
              ? (this.lifeCycleHook("willMount"), (this.rendered = g.didMount))
              : this.rendered === g.rendering && this.lifeCycleHook("willUpdate"),
            t.save(),
            this.handleTransformAndOpacity(t),
            this.lifeCycleHook("willRender", t),
            this.renderer(t),
            this.lifeCycleHook("didRender", t),
            t.restore(),
            this.rendered === g.didMount
              ? (this.lifeCycleHook("didMount"), (this.rendered = g.rendering))
              : this.rendered === g.rendering && this.lifeCycleHook("didUpdate"));
        }),
        t
      );
    })(),
    v = (function (t) {
      function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.type = "TemporaryDisplayObject"), (e.children = []), e;
      }
      return (
        i(e, t), (e.prototype.renderer = function (t) {}), (e.prototype.removeChild = function (t) {}), (e.prototype.addChild = function (t) {}), e
      );
    })(_),
    x = (function (t) {
      function e(e) {
        var i = t.call(this, e) || this;
        return (
          (i.type = "Sprite"),
          (i.renderer = function (t) {
            t.drawImage(i.image, 0, 0, i.imageWidth, i.imageHeight, 0, 0, i.width, i.height);
          }),
          (i.image = e.image),
          (i.width = e.width || e.image.width || 0),
          (i.height = e.height || e.image.height || 0),
          (i.imageWidth = e.image.width || i.height),
          (i.imageHeight = e.image.height || i.height),
          i
        );
      }
      return i(e, t), e;
    })(_),
    w = {
      x: 0,
      y: 0,
      radius: 0,
      fill: "rgba(0,0,0,0)",
    },
    P = (function (t) {
      function e(e) {
        var i = t.call(this, Object.assign({}, w, e)) || this;
        i.type = "Arc";
        var r = Object.assign({}, w, e);
        i.radius = r.radius;
        var n = (r.border || "1px solid rgba(0,0,0,0)").split(" "),
          o = n[0],
          s = n[1],
          h = n[2];
        if (!["solid", "dashed"].includes(s)) throw Error('borderStyle must be one of ["solid", "dashed"]');
        return (
          (i.borderWidth = Number(o.replace("px", ""))),
          (i.borderColor = h),
          (i.borderStyle = s),
          (i.fill = r.fill),
          (i.startAngle = "number" == typeof e.startAngle ? e.startAngle : 0),
          (i.endAngle = "number" == typeof e.endAngle ? e.endAngle : 2 * Math.PI),
          e.dashSetting ? (i.dashSetting = e.dashSetting) : (i.dashSetting = [i.borderWidth, i.borderWidth]),
          i
        );
      }
      return (
        i(e, t),
        (e.prototype.renderer = function (t) {
          t.beginPath(),
            "dashed" === this.borderStyle && t.setLineDash(this.dashSetting),
            this._recursivePostUpdateTransform(),
            t.arc(0, 0, this.radius, this.startAngle, this.endAngle),
            (t.lineWidth = this.borderWidth),
            (t.strokeStyle = this.borderColor),
            this.fill && ((t.fillStyle = this.fill), t.fill()),
            t.stroke();
        }),
        e
      );
    })(_),
    C = (function () {
      function t(t) {
        (this.type = "Gradient"),
          (this.colorArray = []),
          t.hasOwnProperty("colors") && Array.isArray(t.colors) && (this.colorArray = this.formatColors(t.colors));
      }
      return (
        (t.prototype.formatColors = function (t) {
          return t.map(function (e, i) {
            var r = e.split(" "),
              n = r[0],
              o = r[1];
            return {
              color: n,
              stop: Math.min(Math.max(0, Number((o || (i / (t.length - 1)) * 100 + "%").replace(/(\d)(\%)/, "$1")) / 100), 1),
            };
          });
        }),
        t
      );
    })(),
    M = (function (t) {
      function e(e) {
        var i = t.call(this, e) || this;
        return (i.angle = 0), e.hasOwnProperty("angle") && "number" == typeof e.angle && (i.angle = e.angle), i;
      }
      return (
        i(e, t),
        (e.prototype.caculateGredientCoordinate = function (t, e) {
          var i,
            r,
            n = this.angle % 360;
          if ((n < 0 && (n += 360), n <= 45))
            (i = {
              x: 0,
              y: e / 2 + (o = (t / 2) * Math.tan((n * Math.PI) / 180)),
            }),
              (r = {
                x: t,
                y: e / 2 - o,
              });
          else if (n < 90) {
            (i = {
              x: t / 2 - (o = e / 2 / Math.tan((n * Math.PI) / 180)),
              y: e,
            }),
              (r = {
                x: t / 2 + o,
                y: 0,
              });
          } else if (90 === n)
            (i = {
              x: t / 2,
              y: e,
            }),
              (r = {
                x: t / 2,
                y: 0,
              });
          else if (n <= 135) {
            (i = {
              x: t / 2 + (o = (e / 2) * Math.tan(((n - 90) * Math.PI) / 180)),
              y: e,
            }),
              (r = {
                x: t / 2 - o,
                y: 0,
              });
          } else if (n < 180) {
            (i = {
              x: t,
              y: e / 2 + (o = t / 2 / Math.tan(((n - 90) * Math.PI) / 180)),
            }),
              (r = {
                x: 0,
                y: e / 2 - o,
              });
          } else if (180 === n)
            (i = {
              x: t,
              y: e / 2,
            }),
              (r = {
                x: 0,
                y: e / 2,
              });
          else if (n <= 225) {
            (i = {
              x: t,
              y: e / 2 - (o = (t / 2) * Math.tan(((n - 180) * Math.PI) / 180)),
            }),
              (r = {
                x: 0,
                y: e / 2 + o,
              });
          } else if (n <= 270) {
            (i = {
              x: t / 2 + (o = (e / 2) * Math.tan(((270 - n) * Math.PI) / 180)),
              y: 0,
            }),
              (r = {
                x: t / 2 - o,
                y: e,
              });
          } else if (270 === n)
            (i = {
              x: t / 2,
              y: 0,
            }),
              (r = {
                x: t / 2,
                y: e,
              });
          else if (n <= 315) {
            (i = {
              x: t / 2 - (o = e / 2 / Math.tan(((360 - n) * Math.PI) / 180)),
              y: 0,
            }),
              (r = {
                x: t / 2 + o,
                y: e,
              });
          } else {
            var o;
            (i = {
              x: 0,
              y: e / 2 - (o = (t / 2) * Math.tan(((360 - n) * Math.PI) / 180)),
            }),
              (r = {
                x: t,
                y: e / 2 + o,
              });
          }
          return [i, r];
        }),
        (e.prototype.getGradient = function (t, e) {
          for (
            var i = e.width,
              r = e.height,
              n = this.caculateGredientCoordinate(i, r),
              o = n[0],
              s = n[1],
              h = t.createLinearGradient(o.x, o.y, s.x, s.y),
              a = 0,
              l = this.colorArray;
            a < l.length;
            a++
          ) {
            var u = l[a];
            h.addColorStop(u.stop, u.color);
          }
          return h;
        }),
        e
      );
    })(C),
    O = (function (t) {
      function e(e) {
        var i = t.call(this, e) || this;
        return (i.start = e.start), (i.end = e.end), i;
      }
      return (
        i(e, t),
        (e.prototype.getGradient = function (t) {
          for (var e = t.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y), i = 0, r = this.colorArray; i < r.length; i++) {
            var n = r[i];
            e.addColorStop(n.stop, n.color);
          }
          return e;
        }),
        e
      );
    })(C),
    T = (function (t) {
      function e(e) {
        var i = t.call(this, e) || this;
        return (
          (i.type = "RadialGradient"),
          (i.start = e.start || {
            x: 0,
            y: 0,
            radius: 0,
          }),
          (i.end = e.end || i.start),
          i
        );
      }
      return (
        i(e, t),
        (e.prototype.getGradient = function (t) {
          for (
            var e,
              i,
              r = t.createRadialGradient(
                this.start.x,
                this.start.y,
                this.start.radius,
                this.end.x,
                null === (e = this.end) || void 0 === e ? void 0 : e.y,
                null === (i = this.end) || void 0 === i ? void 0 : i.radius,
              ),
              n = 0,
              o = this.colorArray;
            n < o.length;
            n++
          ) {
            var s = o[n];
            r.addColorStop(s.stop, s.color);
          }
          return r;
        }),
        e
      );
    })(C),
    j = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      border: "0px solid rgba(0,0,0,0)",
      borderRadius: 0,
    },
    A = (function (t) {
      function e(e) {
        var i = t.call(this, Object.assign({}, j, e)) || this;
        (i._borderWidth = 0), (i._borderRadius = []), (i.type = "Rect");
        var r = Object.assign({}, j, e),
          n = (r.border || "0px solid rgba(0,0,0,0)").split(" "),
          o = n[0],
          s = n[1],
          h = n[2];
        if (!["solid"].includes(s)) throw Error('borderStyle must be "solid"');
        return (
          (i.borderWidth = Number(o.replace("px", ""))),
          (i.borderColor = h),
          (i.borderStyle = s),
          (i.borderRadius = r.borderRadius || 0),
          (i.fill = r.fill),
          (i.width = r.width),
          (i.height = r.height),
          i
        );
      }
      return (
        i(e, t),
        Object.defineProperty(e.prototype, "width", {
          get: function get() {
            return this._width * this.transform.scale.x;
          },
          set: function set(t) {
            this._width = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "height", {
          get: function get() {
            return this._height * this.transform.scale.y;
          },
          set: function set(t) {
            this._height = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "borderRadius", {
          get: function get() {
            return this._borderRadius;
          },
          set: function set(t) {
            this._borderRadius = this.formatBorderRadius(t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "borderColor", {
          get: function get() {
            return this._borderColor || "";
          },
          set: function set(t) {
            this._borderColor = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "borderWidth", {
          get: function get() {
            return this._borderWidth;
          },
          set: function set(t) {
            Number(t) != Number(t) ? (this._borderWidth = Number(t.replace("px", ""))) : (this._borderWidth = t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "fill", {
          get: function get() {
            return this._fill;
          },
          set: function set(t) {
            this._fill = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.formatBorderRadius = function (t) {
          var e = [];
          return (
            "number" == typeof t && t >= 0
              ? (e = [t, t, t, t])
              : Array.isArray(t) && (e = 2 === t.length ? [t[0], t[1], t[0], t[1]] : 3 === e.length ? [t[0], t[1], t[2], t[1]] : t),
            e
          );
        }),
        (e.prototype.getRectArgs = function () {
          return {
            rectX: 0 + this.borderWidth / 2,
            rectY: 0 + this.borderWidth / 2,
            rectWidth: this._width - this.borderWidth,
            rectHeight: this._height - this.borderWidth,
          };
        }),
        (e.prototype.renderRoundRect = function (t) {
          var e = this.getRectArgs(),
            i = e.rectX,
            r = e.rectY,
            n = e.rectWidth,
            o = e.rectHeight;
          try {
            t.roundRect(i, r, n, o, this.borderRadius), (t.fillStyle = this.getFillStyle(t)), t.fill();
          } catch (e) {
//             e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            var s = this.borderRadius,
              h = s[0],
              a = s[1],
              l = s[2],
              u = s[3];
            t.arc(i + h, r + h, h, Math.PI, 1.5 * Math.PI),
              t.lineTo(i + (n - h - a), r),
              t.arc(i + n - a, r + a, a, 1.5 * Math.PI, 2 * Math.PI),
              t.lineTo(i + n, r + (o - a - l)),
              t.arc(i + n - l, r + o - l, l, 0, 0.5 * Math.PI),
              t.lineTo(i + u, r + o),
              t.arc(i + u, r + o - u, u, 0.5 * Math.PI, Math.PI),
              t.lineTo(i, r + h),
              t.closePath(),
              (t.fillStyle = this.getFillStyle(t)),
              t.fill();
          }
        }),
        (e.prototype.getFillStyle = function (t) {
          var e = this.getRectArgs(),
            i = e.rectWidth,
            r = e.rectHeight;
          if (void 0 === this.fill) return "transparent";
          if ("string" == typeof this.fill) return this.fill;
          if (this._grd) return this._grd;
          if (this.fill instanceof M)
            this._grd = this.fill.getGradient(t, {
              width: i,
              height: r,
            });
          else {
            if (!(this.fill instanceof O || this.fill instanceof T)) throw Error("Error：未支持的渐变");
            this._grd = this.fill.getGradient(t);
          }
          return this._grd;
        }),
        (e.prototype.renderer = function (t) {
          (t.strokeStyle = this.borderColor), (t.lineWidth = this.borderWidth), t.beginPath(), this.renderRoundRect(t), t.stroke();
        }),
        e
      );
    })(_),
    S = (function (t) {
      function e(e) {
        void 0 === e && (e = {});
        var i = t.call(this, e) || this;
        return (
          (i.type = "Layer"),
          (i.children = []),
          (i.clear = function () {
            for (var t = 0, e = i.children; t < e.length; t++) {
              e[t].parent = void 0;
            }
            i.children = [];
          }),
          i
        );
      }
      return (
        i(e, t),
        (e.prototype.addChild = function (t) {
          var e = t;
          Array.isArray(t) || (e = [t]);
          for (var i = 0, n = e; i < n.length; i++) {
            var o = n[i];
            o.parent && o.parent.removeChild(o), (o.parent = this);
          }
          return (this.children = r(r([], this.children), e)), this;
        }),
        (e.prototype.removeChild = function (t) {
          var e = this.children.findIndex(function (e) {
            return e.name === t.name;
          });
          return e >= 0 && ((this.children[e].parent = void 0), this.children.splice(e, 1)), this;
        }),
        (e.prototype.updateTransform = function () {
          this.transform.updateLocalTransform();
          for (var t = 0, e = this.children; t < e.length; t++) {
            var i = e[t];
            i.visible && i.updateTransform();
          }
        }),
        (e.prototype.destroy = function () {
          this.lifeCycleHook("willDestroy"),
            this.parent && this.parent.removeChild(this),
            (this.transform = null),
            (this.parent = void 0),
            (this._destroyed = !0);
          for (var t = 0, e = this.children; t < e.length; t++) {
            var i = e[t];
            this.removeChild(i), i.destroy();
          }
          this.lifeCycleHook("didDestroy");
        }),
        (e.prototype.renderer = function (t) {
          for (var e = 0, i = this.children; e < i.length; e++) {
            var r = i[e];
            r.visible && r.render(t);
          }
        }),
        e
      );
    })(_),
    R = (function (t) {
      function e(e) {
        var i = t.call(this, e) || this;
        return (
          (i.type = "Text"),
          (i.textInfo = null),
          (i.text = e.text),
          (i.color = e.color || "#000"),
          (i.fontFamily = e.fontFamily || "arial,x-locale-body,sans-serif"),
          (i.fontSize = e.fontSize || 12),
          (i.textAlign = e.textAlign || "left"),
          (i.textBaseline = e.textBaseline || "top"),
          (i.direction = e.direction || "inherit"),
          (i.lineHeight = "number" == typeof e.lineHeight ? e.lineHeight : i.fontSize),
          i
        );
      }
      return (
        i(e, t),
        Object.defineProperty(e.prototype, "width", {
          get: function get() {
            if (this._width) return this._width;
            for (var t = 0, e = 0, i = this.text.split("\n"); e < i.length; e++) {
              var r = i[e];
              t = Math.max(r.split("").length * this.fontSize, t);
            }
            return t;
          },
          set: function set(t) {
            this._width = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "height", {
          get: function get() {
            return this.text.split("\n").length * this.lineHeight;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "left", {
          get: function get() {
            return "center" === this.textAlign ? this.x - this.width / 2 : ["end", "right"].includes(this.textAlign) ? this.x - this.width : this.x;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.renderer = function (t) {
          (t.font = this.fontSize + "px '" + this.fontFamily + "'"),
            (t.textAlign = this.textAlign),
            (t.textBaseline = this.textBaseline),
            (t.fillStyle = this.color);
          for (var e = 0, i = 0, r = 0, n = this.text.split("\n"); r < n.length; r++) {
            var o = n[r];
            t.fillText(o, 0, e * this.lineHeight), (i = Math.max(i, t.measureText(o).width)), e++;
          }
          this.width = i;
        }),
        e
      );
    })(_),
    I = {
      a: 7,
      c: 6,
      h: 1,
      l: 2,
      m: 2,
      q: 4,
      s: 4,
      t: 2,
      v: 1,
      z: 0,
    },
    D = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
  function k(t) {
    var e,
      i = [];
    return (
      null === (e = t.match(D)) ||
        void 0 === e ||
        e.map(function (t) {
          var e = t.replace(D, "$1"),
            n = e.toLowerCase(),
            o = (function (t) {
              var e = t.match(W);
              return e ? e.map(Number) : [];
            })(t.replace(D, "$2"));
          if (("m" == n && o.length > 2 && (i.push(r([e], o.splice(0, 2))), (n = "l"), (e = "m" == e ? "l" : "L")), o.length == I[n]))
            return i.push(r([e], o)), "";
          if (o.length < I[n]) throw new Error("malformed path data");
          i.push(r([e], o.splice(0, I[n])));
        }),
      i
    );
  }
  var W = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
  var G = 2 * Math.PI;
  function H(t, e, i, r) {
    var n = t * i + e * r;
    return n > 1 && (n = 1), n < -1 && (n = -1), (t * r - e * i < 0 ? -1 : 1) * Math.acos(n);
  }
  function L(t, e) {
    var i = (4 / 3) * Math.tan(e / 4),
      r = Math.cos(t),
      n = Math.sin(t),
      o = Math.cos(t + e),
      s = Math.sin(t + e);
    return [r, n, r - n * i, n + r * i, o + s * i, s - o * i, o, s];
  }
  function U(t, e, i, r, n, o, s, h, a) {
    var l = Math.sin((a * G) / 360),
      u = Math.cos((a * G) / 360),
      c = (u * (t - i)) / 2 + (l * (e - r)) / 2,
      d = (-l * (t - i)) / 2 + (u * (e - r)) / 2;
    if (0 === c && 0 === d) return [];
    if (0 === s || 0 === h) return [];
    (s = Math.abs(s)), (h = Math.abs(h));
    var f = (c * c) / (s * s) + (d * d) / (h * h);
    f > 1 && ((s *= Math.sqrt(f)), (h *= Math.sqrt(f)));
    var p = (function (t, e, i, r, n, o, s, h, a, l) {
        var u = (l * (t - i)) / 2 + (a * (e - r)) / 2,
          c = (-a * (t - i)) / 2 + (l * (e - r)) / 2,
          d = s * s,
          f = h * h,
          p = u * u,
          y = c * c,
          g = d * f - d * y - f * p;
        g < 0 && (g = 0), (g /= d * y + f * p);
        var b = (((g = Math.sqrt(g) * (n === o ? -1 : 1)) * s) / h) * c,
          m = ((g * -h) / s) * u,
          _ = l * b - a * m + (t + i) / 2,
          v = a * b + l * m + (e + r) / 2,
          x = (u - b) / s,
          w = (c - m) / h,
          P = (-u - b) / s,
          C = (-c - m) / h,
          M = H(1, 0, x, w),
          O = H(x, w, P, C);
        return 0 === o && O > 0 && (O -= G), 1 === o && O < 0 && (O += G), [_, v, M, O];
      })(t, e, i, r, n, o, s, h, l, u),
      y = [],
      g = p[2],
      b = p[3],
      m = Math.max(Math.ceil(Math.abs(b) / (G / 4)), 1);
    b /= m;
    for (var _ = 0; _ < m; _++) y.push(L(g, b)), (g += b);
    return y.map(function (t) {
      for (var e = 0; e < t.length; e += 2) {
        var i = t[e + 0],
          r = t[e + 1],
          n = u * (i *= s) - l * (r *= h),
          o = l * i + u * r;
        (t[e + 0] = n + p[0]), (t[e + 1] = o + p[1]);
      }
      return t;
    });
  }
  function z(t, e, i, r) {
    return ["C", t, e, i, r, i, r];
  }
  function N(t, e, i, r, n, o) {
    return ["C", t / 3 + (2 / 3) * i, e / 3 + (2 / 3) * r, n / 3 + (2 / 3) * i, o / 3 + (2 / 3) * r, n, o];
  }
  var E = (function () {
      function t(t) {
        if (
          ((this.savedPaths = []),
          !("string" == typeof (e = t) && ((e = e.trim()), /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(e) && /[\dz]$/i.test(e) && e.length > 4)))
        )
          throw new Error("Not an SVG path!");
        var e, i, r, n, o, s;
        (this.initialPath =
          ((i = k(t)),
          (r = 0),
          (n = 0),
          (o = 0),
          (s = 0),
          i.map(function (t) {
            var e = (t = t.slice())[0],
              i = e.toUpperCase();
            if (e != i)
              switch (((t[0] = i), e)) {
                case "a":
                  (t[6] += o), (t[7] += s);
                  break;

                case "v":
                  t[1] += s;
                  break;

                case "h":
                  t[1] += o;
                  break;

                default:
                  for (var h = 1; h < t.length; ) (t[h++] += o), (t[h++] += s);
              }
            switch (i) {
              case "Z":
                (o = r), (s = n);
                break;

              case "H":
                o = t[1];
                break;

              case "V":
                s = t[1];
                break;

              case "M":
                (o = r = t[1]), (s = n = t[2]);
                break;

              default:
                (o = t[t.length - 2]), (s = t[t.length - 1]);
            }
            return t;
          }))),
          (this._path = (function (t) {
            for (var e, i = [], r = 0, n = 0, o = 0, s = 0, h = 0, a = 0, l = 0, u = 0, c = 0, d = t.length; c < d; c++) {
              var f = t[c],
                p = f[0];
              switch (p) {
                case "M":
                  (o = f[1]), (s = f[2]);
                  break;

                case "A":
                  var y = U(l, u, f[6], f[7], f[4], f[5], f[1], f[2], f[3]);
                  if (!y.length) continue;
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
                            y: t[7],
                          }
                        );
                      }),
                      b = 0;
                    b < g.length;
                    b++
                  ) {
                    var m = g[b];
                    (f = ["C", m.x1, m.y1, m.x2, m.y2, m.x, m.y]), b < g.length - 1 && i.push(f);
                  }
                  break;

                case "S":
                  var _ = l,
                    v = u;
                  ("C" != e && "S" != e) || ((_ += _ - r), (v += v - n)), (f = ["C", _, v, f[1], f[2], f[3], f[4]]);
                  break;

                case "T":
                  "Q" == e || "T" == e ? ((h = 2 * l - h), (a = 2 * u - a)) : ((h = l), (a = u)), (f = N(l, u, h, a, f[1], f[2]));
                  break;

                case "Q":
                  (h = f[1]), (a = f[2]), (f = N(l, u, f[1], f[2], f[3], f[4]));
                  break;

                case "L":
                  f = z(l, u, f[1], f[2]);
                  break;

                case "H":
                  f = z(l, u, f[1], u);
                  break;

                case "V":
                  f = z(l, u, l, f[1]);
                  break;

                case "Z":
                  f = z(l, u, o, s);
              }
              (e = p),
                (l = f[f.length - 2]),
                (u = f[f.length - 1]),
                f.length > 4 ? ((r = f[f.length - 4]), (n = f[f.length - 3])) : ((r = l), (n = u)),
                i.push(f);
            }
            return i;
          })(this.initialPath)),
          (this.beginPath = !1),
          (this._bounds = null);
      }
      return (
        Object.defineProperty(t.prototype, "bounds", {
          get: function get() {
            if (!this._bounds) {
              var t = this.path;
              if (((this._bounds = [0, 0, 0, 0]), t.length)) {
                for (var e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = 0, r = t.length; i < r; i++)
                  for (var n = t[i].slice(1), o = 0; o < n.length; o += 2)
                    n[o + 0] < e[0] && (e[0] = n[o + 0]),
                      n[o + 1] < e[1] && (e[1] = n[o + 1]),
                      n[o + 0] > e[2] && (e[2] = n[o + 0]),
                      n[o + 1] > e[3] && (e[3] = n[o + 1]);
                this._bounds = e;
              }
            }
            return this._bounds;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "size", {
          get: function get() {
            var t = this.bounds;
            return [t[2] - t[0], t[3] - t[1]];
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "center", {
          get: function get() {
            var t = this.bounds,
              e = t[0],
              i = t[1];
            return [(e + t[2]) / 2, (i + t[3]) / 2];
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "d", {
          get: function get() {
            var t = this.path
              .map(function (t) {
                return t[0] + t.slice(1).join();
              })
              .join("");
            return this.isClosed && (t += "Z"), t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "path", {
          get: function get() {
            return this._path;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "isClosed", {
          get: function get() {
            var t = this.initialPath[this.initialPath.length - 1];
            return t && "Z" === t[0];
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.render = function (t, e, i) {
          var r = this;
          void 0 === e && (e = this.size[0]), void 0 === i && (i = this.size[1]);
          var n = this.path;
          n.length &&
            (t.beginPath(),
            n.forEach(function (n) {
              for (var o = n[0], s = n.slice(1), h = [], a = 0; a < s.length / 2; a++)
                (h[2 * a] = 0 !== e ? (Number(s[2 * a]) / r.size[0]) * e : s[2 * a]),
                  (h[2 * a + 1] = 0 !== i ? (Number(s[2 * a + 1]) / r.size[1]) * i : s[2 * a + 1]);
              "M" === o ? t.moveTo.apply(t, h) : t.bezierCurveTo.apply(t, h);
            }),
            this.isClosed && t.closePath());
        }),
        t
      );
    })(),
    q = (function (t) {
      function e(e) {
        var i = t.call(this, e) || this;
        (i.lineStyle = "solid"),
          (i.type = "Polygon"),
          (i._lineJoin = "round"),
          (i._lineCap = "butt"),
          (i.closePath = !!e.hasOwnProperty("closePath") && !!e.closePath),
          (i.path = e.path);
        var r = e.path;
        return (
          "string" != typeof e.path && (r = i.formatPointsToPath(e.path, i.closePath)),
          (i._svgPath = new E(r)),
          (i.lineWidth = e.lineWidth || 2),
          (i.lineColor = e.lineColor || "#fff"),
          (i.fill = e.fill || "rgba(0,0,0,0)"),
          (i.lineJoin = e.lineJoin || "round"),
          (i.lineCap = e.lineCap || "butt"),
          "dashed" === e.lineStyle && ((i.lineStyle = e.lineStyle), (i.lineJoin = "miter"), (i.lineCap = "butt")),
          e.dashSetting ? (i.dashSetting = e.dashSetting) : (i.dashSetting = [i.lineWidth, i.lineWidth]),
          i
        );
      }
      return (
        i(e, t),
        Object.defineProperty(e.prototype, "lineJoin", {
          get: function get() {
            return this._lineJoin;
          },
          set: function set(t) {
            "dashed" !== this.lineStyle && (this._lineJoin = t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, "lineCap", {
          get: function get() {
            return this._lineCap;
          },
          set: function set(t) {
            "dashed" !== this.lineStyle && (this._lineCap = t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.formatPointsToPath = function (t, e) {
          for (var i = "M " + t[0].x + " " + t[0].y, r = 1; r < t.length; r++) i += "L " + t[r].x + " " + t[r].y;
          return e && (i += " Z"), i;
        }),
        (e.prototype.getColor = function (t, e) {
          var i = this[e];
          if (i instanceof C) {
            if (!this["_" + e + "Grd"])
              if (i instanceof M)
                this["_" + e + "Grd"] = i.getGradient(t, {
                  width: this._svgPath.bounds[2] - this._svgPath.bounds[0],
                  height: this._svgPath.bounds[3] - this._svgPath.bounds[1],
                });
              else {
                if (!(i instanceof O || i instanceof T)) throw Error("Error：未支持的渐变");
                this["_" + e + "Grd"] = i.getGradient(t);
              }
            return this["_" + e + "Grd"];
          }
          return i || "transparent";
        }),
        (e.prototype.renderer = function (t) {
          this._svgPath.render(t, this.width, this.height),
            (t.lineWidth = this.lineWidth),
            (t.lineCap = this.lineCap),
            (t.lineJoin = this.lineJoin),
            (t.strokeStyle = this.getColor(t, "lineColor")),
            "dashed" === this.lineStyle && t.setLineDash(this.dashSetting),
            this.fill && ((t.fillStyle = this.getColor(t, "fill")), t.fill()),
            t.stroke();
        }),
        e
      );
    })(_),
    F = {
      Circle: (function () {
        function t(e, i, r) {
          void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === r && (r = 0),
            (this.type = t.TYPE),
            (this.x = e),
            (this.y = i),
            (this.radius = r);
        }
        return (
          (t.prototype.clone = function () {
            return new t(this.x, this.y, this.radius);
          }),
          (t.prototype.contains = function (t, e) {
            if (this.radius <= 0) return !1;
            var i = this.radius * this.radius,
              r = this.x - t,
              n = this.y - e;
            return (r *= r) + (n *= n) <= i;
          }),
          (t.prototype.getBounds = function () {
            return new n(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
          }),
          (t.prototype.toString = function () {
            return "[@milimu/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]";
          }),
          (t.TYPE = "circle"),
          t
        );
      })(),
      Rectangle: n,
    };
  (t.AngleGradient = M),
    (t.Application = m),
    (t.Arc = P),
    (t.Layer = S),
    (t.LinearGradient = O),
    (t.Node = _),
    (t.ObservablePoint = a),
    (t.Point = h),
    (t.Polygon = q),
    (t.RadialGradient = T),
    (t.Rect = A),
    (t.Sprite = x),
    (t.Text = R),
    (t.shape = F);
});
//# sourceMappingURL=index.js.map
