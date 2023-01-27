var Fe = function(e) {
  return Be(e) && !Ne(e);
};
function Be(t) {
  return !!t && typeof t == "object";
}
function Ne(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || Ve(t);
}
var De = typeof Symbol == "function" && Symbol.for, He = De ? Symbol.for("react.element") : 60103;
function Ve(t) {
  return t.$$typeof === He;
}
function We(t) {
  return Array.isArray(t) ? [] : {};
}
function ut(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? it(We(t), t, e) : t;
}
function Ue(t, e, n) {
  return t.concat(e).map(function(i) {
    return ut(i, n);
  });
}
function Ye(t, e) {
  if (!e.customMerge)
    return it;
  var n = e.customMerge(t);
  return typeof n == "function" ? n : it;
}
function $e(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return t.propertyIsEnumerable(e);
  }) : [];
}
function qt(t) {
  return Object.keys(t).concat($e(t));
}
function me(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function qe(t, e) {
  return me(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function ze(t, e, n) {
  var i = {};
  return n.isMergeableObject(t) && qt(t).forEach(function(o) {
    i[o] = ut(t[o], n);
  }), qt(e).forEach(function(o) {
    qe(t, o) || (me(t, o) && n.isMergeableObject(e[o]) ? i[o] = Ye(o, n)(t[o], e[o], n) : i[o] = ut(e[o], n));
  }), i;
}
function it(t, e, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || Ue, n.isMergeableObject = n.isMergeableObject || Fe, n.cloneUnlessOtherwiseSpecified = ut;
  var i = Array.isArray(e), o = Array.isArray(t), s = i === o;
  return s ? i ? n.arrayMerge(t, e, n) : ze(t, e, n) : ut(e, n);
}
it.all = function(e, n) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(i, o) {
    return it(i, o, n);
  }, {});
};
var Ke = it, jt = Ke;
function Xe(t) {
  return t instanceof Element;
}
function Ft(t) {
  return t instanceof HTMLElement;
}
function tt(t) {
  return typeof t == "function";
}
function ht(t) {
  return typeof t == "string";
}
function C(t) {
  return t === void 0;
}
class Bt {
  on(e, n, i, o) {
    return o === void 0 && (o = !1), C(this.bindings) && (this.bindings = {}), C(this.bindings[e]) && (this.bindings[e] = []), this.bindings[e].push({
      handler: n,
      ctx: i,
      once: o
    }), this;
  }
  once(e, n, i) {
    return this.on(e, n, i, !0);
  }
  off(e, n) {
    return C(this.bindings) || C(this.bindings[e]) ? this : (C(n) ? delete this.bindings[e] : this.bindings[e].forEach((i, o) => {
      i.handler === n && this.bindings[e].splice(o, 1);
    }), this);
  }
  trigger(e) {
    for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
      i[o - 1] = arguments[o];
    return !C(this.bindings) && this.bindings[e] && this.bindings[e].forEach((s, r) => {
      const {
        ctx: l,
        handler: c,
        once: a
      } = s, h = l || this;
      c.apply(h, i), a && this.bindings[e].splice(r, 1);
    }), this;
  }
}
function ge(t) {
  const e = Object.getOwnPropertyNames(t.constructor.prototype);
  for (let n = 0; n < e.length; n++) {
    const i = e[n], o = t[i];
    i !== "constructor" && typeof o == "function" && (t[i] = o.bind(t));
  }
  return t;
}
function Ze(t, e) {
  return (n) => {
    if (e.isOpen()) {
      const i = e.el && n.currentTarget === e.el;
      (!C(t) && n.currentTarget.matches(t) || i) && e.tour.next();
    }
  };
}
function Ge(t) {
  const {
    event: e,
    selector: n
  } = t.options.advanceOn || {};
  if (e) {
    const i = Ze(n, t);
    let o;
    try {
      o = document.querySelector(n);
    } catch {
    }
    if (!C(n) && !o)
      return console.error(`No element was found for the selector supplied to advanceOn: ${n}`);
    o ? (o.addEventListener(e, i), t.on("destroy", () => o.removeEventListener(e, i))) : (document.body.addEventListener(e, i, !0), t.on("destroy", () => document.body.removeEventListener(e, i, !0)));
  } else
    return console.error("advanceOn was defined, but no event name was passed.");
}
function be(t) {
  return !ht(t) || t === "" ? "" : t.charAt(t.length - 1) !== "-" ? `${t}-` : t;
}
function Je(t) {
  const e = t.options.attachTo || {}, n = Object.assign({}, e);
  if (tt(n.element) && (n.element = n.element.call(t)), ht(n.element)) {
    try {
      n.element = document.querySelector(n.element);
    } catch {
    }
    n.element || console.error(`The element for this Shepherd step was not found ${e.element}`);
  }
  return n;
}
function ye(t) {
  return t == null ? !0 : !t.element || !t.on;
}
function Nt() {
  let t = Date.now();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
    const n = (t + Math.random() * 16) % 16 | 0;
    return t = Math.floor(t / 16), (e == "x" ? n : n & 3 | 8).toString(16);
  });
}
function I() {
  return I = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, I.apply(this, arguments);
}
function we(t, e) {
  if (t == null)
    return {};
  var n = {}, i = Object.keys(t), o, s;
  for (s = 0; s < i.length; s++)
    o = i[s], !(e.indexOf(o) >= 0) && (n[o] = t[o]);
  return n;
}
const Qe = ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "flipAlignment"], tn = ["mainAxis", "crossAxis", "limiter"];
function gt(t) {
  return t.split("-")[0];
}
function Dt(t) {
  return t.split("-")[1];
}
function bt(t) {
  return ["top", "bottom"].includes(gt(t)) ? "x" : "y";
}
function Ht(t) {
  return t === "y" ? "height" : "width";
}
function zt(t, e, n) {
  let {
    reference: i,
    floating: o
  } = t;
  const s = i.x + i.width / 2 - o.width / 2, r = i.y + i.height / 2 - o.height / 2, l = bt(e), c = Ht(l), a = i[c] / 2 - o[c] / 2, h = gt(e), f = l === "x";
  let u;
  switch (h) {
    case "top":
      u = {
        x: s,
        y: i.y - o.height
      };
      break;
    case "bottom":
      u = {
        x: s,
        y: i.y + i.height
      };
      break;
    case "right":
      u = {
        x: i.x + i.width,
        y: r
      };
      break;
    case "left":
      u = {
        x: i.x - o.width,
        y: r
      };
      break;
    default:
      u = {
        x: i.x,
        y: i.y
      };
  }
  switch (Dt(e)) {
    case "start":
      u[l] -= a * (n && f ? -1 : 1);
      break;
    case "end":
      u[l] += a * (n && f ? -1 : 1);
      break;
  }
  return u;
}
const en = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: r
  } = n, l = s.filter(Boolean), c = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let a = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: o
  }), {
    x: h,
    y: f
  } = zt(a, i, c), u = i, p = {}, m = 0;
  for (let b = 0; b < l.length; b++) {
    const {
      name: O,
      fn: x
    } = l[b], {
      x: E,
      y: v,
      data: g,
      reset: d
    } = await x({
      x: h,
      y: f,
      initialPlacement: i,
      placement: u,
      strategy: o,
      middlewareData: p,
      rects: a,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (h = E ?? h, f = v ?? f, p = I({}, p, {
      [O]: I({}, p[O], g)
    }), d && m <= 50) {
      m++, typeof d == "object" && (d.placement && (u = d.placement), d.rects && (a = d.rects === !0 ? await r.getElementRects({
        reference: t,
        floating: e,
        strategy: o
      }) : d.rects), {
        x: h,
        y: f
      } = zt(a, u, c)), b = -1;
      continue;
    }
  }
  return {
    x: h,
    y: f,
    placement: u,
    strategy: o,
    middlewareData: p
  };
};
function nn(t) {
  return I({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, t);
}
function _e(t) {
  return typeof t != "number" ? nn(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Et(t) {
  return I({}, t, {
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
async function xe(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: o,
    platform: s,
    rects: r,
    elements: l,
    strategy: c
  } = t, {
    boundary: a = "clippingAncestors",
    rootBoundary: h = "viewport",
    elementContext: f = "floating",
    altBoundary: u = !1,
    padding: p = 0
  } = e, m = _e(p), O = l[u ? f === "floating" ? "reference" : "floating" : f], x = Et(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(O))) == null || n ? O : O.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: a,
    rootBoundary: h,
    strategy: c
  })), E = f === "floating" ? I({}, r.floating, {
    x: i,
    y: o
  }) : r.reference, v = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), g = await (s.isElement == null ? void 0 : s.isElement(v)) ? await (s.getScale == null ? void 0 : s.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, d = Et(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: E,
    offsetParent: v,
    strategy: c
  }) : E);
  return {
    top: (x.top - d.top + m.top) / g.y,
    bottom: (d.bottom - x.bottom + m.bottom) / g.y,
    left: (x.left - d.left + m.left) / g.x,
    right: (d.right - x.right + m.right) / g.x
  };
}
const on = Math.min, sn = Math.max;
function Lt(t, e, n) {
  return sn(t, on(e, n));
}
const rn = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      element: n,
      padding: i = 0
    } = t ?? {}, {
      x: o,
      y: s,
      placement: r,
      rects: l,
      platform: c
    } = e;
    if (n == null)
      return {};
    const a = _e(i), h = {
      x: o,
      y: s
    }, f = bt(r), u = Dt(r), p = Ht(f), m = await c.getDimensions(n), b = f === "y" ? "top" : "left", O = f === "y" ? "bottom" : "right", x = l.reference[p] + l.reference[f] - h[f] - l.floating[p], E = h[f] - l.reference[f], v = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(n));
    let g = v ? f === "y" ? v.clientHeight || 0 : v.clientWidth || 0 : 0;
    g === 0 && (g = l.floating[p]);
    const d = x / 2 - E / 2, y = a[b], T = g - m[p] - a[O], A = g / 2 - m[p] / 2 + d, R = Lt(y, A, T), U = (u === "start" ? a[b] : a[O]) > 0 && A !== R && l.reference[p] <= l.floating[p] ? A < y ? y - A : T - A : 0;
    return {
      [f]: h[f] - U,
      data: {
        [f]: R,
        centerOffset: A - R
      }
    };
  }
}), ln = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function St(t) {
  return t.replace(/left|right|bottom|top/g, (e) => ln[e]);
}
function cn(t, e, n) {
  n === void 0 && (n = !1);
  const i = Dt(t), o = bt(t), s = Ht(o);
  let r = o === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (r = St(r)), {
    main: r,
    cross: St(r)
  };
}
const an = {
  start: "end",
  end: "start"
};
function Kt(t) {
  return t.replace(/start|end/g, (e) => an[e]);
}
function fn(t) {
  const e = St(t);
  return [Kt(t), e, Kt(e)];
}
const un = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(n) {
      var i;
      const {
        placement: o,
        middlewareData: s,
        rects: r,
        initialPlacement: l,
        platform: c,
        elements: a
      } = n, {
        mainAxis: h = !0,
        crossAxis: f = !0,
        fallbackPlacements: u,
        fallbackStrategy: p = "bestFit",
        flipAlignment: m = !0
      } = e, b = we(e, Qe), O = gt(o), E = u || (O === l || !m ? [St(l)] : fn(l)), v = [l, ...E], g = await xe(n, b), d = [];
      let y = ((i = s.flip) == null ? void 0 : i.overflows) || [];
      if (h && d.push(g[O]), f) {
        const {
          main: B,
          cross: Z
        } = cn(o, r, await (c.isRTL == null ? void 0 : c.isRTL(a.floating)));
        d.push(g[B], g[Z]);
      }
      if (y = [...y, {
        placement: o,
        overflows: d
      }], !d.every((B) => B <= 0)) {
        var T, A;
        const B = ((T = (A = s.flip) == null ? void 0 : A.index) != null ? T : 0) + 1, Z = v[B];
        if (Z)
          return {
            data: {
              index: B,
              overflows: y
            },
            reset: {
              placement: Z
            }
          };
        let U = "bottom";
        switch (p) {
          case "bestFit": {
            var R;
            const $t = (R = y.map((wt) => [wt, wt.overflows.filter((rt) => rt > 0).reduce((rt, je) => rt + je, 0)]).sort((wt, rt) => wt[1] - rt[1])[0]) == null ? void 0 : R[0].placement;
            $t && (U = $t);
            break;
          }
          case "initialPlacement":
            U = l;
            break;
        }
        if (o !== U)
          return {
            reset: {
              placement: U
            }
          };
      }
      return {};
    }
  };
};
function ve(t) {
  return t === "x" ? "y" : "x";
}
const hn = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(n) {
      const {
        x: i,
        y: o,
        placement: s
      } = n, {
        mainAxis: r = !0,
        crossAxis: l = !1,
        limiter: c = {
          fn: (x) => {
            let {
              x: E,
              y: v
            } = x;
            return {
              x: E,
              y: v
            };
          }
        }
      } = e, a = we(e, tn), h = {
        x: i,
        y: o
      }, f = await xe(n, a), u = bt(gt(s)), p = ve(u);
      let m = h[u], b = h[p];
      if (r) {
        const x = u === "y" ? "top" : "left", E = u === "y" ? "bottom" : "right", v = m + f[x], g = m - f[E];
        m = Lt(v, m, g);
      }
      if (l) {
        const x = p === "y" ? "top" : "left", E = p === "y" ? "bottom" : "right", v = b + f[x], g = b - f[E];
        b = Lt(v, b, g);
      }
      const O = c.fn(I({}, n, {
        [u]: m,
        [p]: b
      }));
      return I({}, O, {
        data: {
          x: O.x - i,
          y: O.y - o
        }
      });
    }
  };
}, dn = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(n) {
      const {
        x: i,
        y: o,
        placement: s,
        rects: r,
        middlewareData: l
      } = n, {
        offset: c = 0,
        mainAxis: a = !0,
        crossAxis: h = !0
      } = e, f = {
        x: i,
        y: o
      }, u = bt(s), p = ve(u);
      let m = f[u], b = f[p];
      const O = typeof c == "function" ? c(n) : c, x = typeof O == "number" ? {
        mainAxis: O,
        crossAxis: 0
      } : I({
        mainAxis: 0,
        crossAxis: 0
      }, O);
      if (a) {
        const y = u === "y" ? "height" : "width", T = r.reference[u] - r.floating[y] + x.mainAxis, A = r.reference[u] + r.reference[y] - x.mainAxis;
        m < T ? m = T : m > A && (m = A);
      }
      if (h) {
        var E, v, g, d;
        const y = u === "y" ? "width" : "height", T = ["top", "left"].includes(gt(s)), A = r.reference[p] - r.floating[y] + (T && (E = (v = l.offset) == null ? void 0 : v[p]) != null ? E : 0) + (T ? 0 : x.crossAxis), R = r.reference[p] + r.reference[y] + (T ? 0 : (g = (d = l.offset) == null ? void 0 : d[p]) != null ? g : 0) - (T ? x.crossAxis : 0);
        b < A ? b = A : b > R && (b = R);
      }
      return {
        [u]: m,
        [p]: b
      };
    }
  };
};
function D(t) {
  var e;
  return ((e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function j(t) {
  return D(t).getComputedStyle(t);
}
function $(t) {
  return Ee(t) ? (t.nodeName || "").toLowerCase() : "";
}
let _t;
function Oe() {
  if (_t)
    return _t;
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands) ? (_t = t.brands.map((e) => e.brand + "/" + e.version).join(" "), _t) : navigator.userAgent;
}
function N(t) {
  return t instanceof D(t).HTMLElement;
}
function L(t) {
  return t instanceof D(t).Element;
}
function Ee(t) {
  return t instanceof D(t).Node;
}
function Xt(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = D(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Tt(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i,
    display: o
  } = j(t);
  return /auto|scroll|overlay|hidden/.test(e + i + n) && !["inline", "contents"].includes(o);
}
function pn(t) {
  return ["table", "td", "th"].includes($(t));
}
function Vt(t) {
  const e = /firefox/i.test(Oe()), n = j(t), i = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || (i ? i !== "none" : !1) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective"].some((o) => n.willChange.includes(o)) || ["paint", "layout", "strict", "content"].some(
    (o) => {
      const s = n.contain;
      return s != null ? s.includes(o) : !1;
    }
  );
}
function Se() {
  return !/^((?!chrome|android).)*safari/i.test(Oe());
}
function Wt(t) {
  return ["html", "body", "#document"].includes($(t));
}
const Ae = {
  x: 1,
  y: 1
};
function dt(t) {
  const e = !L(t) && t.contextElement ? t.contextElement : L(t) ? t : null;
  if (!e)
    return Ae;
  const n = e.getBoundingClientRect(), i = j(e);
  let o = n.width / parseFloat(i.width), s = n.height / parseFloat(i.height);
  return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: o,
    y: s
  };
}
function q(t, e, n, i) {
  var o, s, r, l;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const c = t.getBoundingClientRect();
  let a = Ae;
  e && (i ? L(i) && (a = dt(i)) : a = dt(t));
  const h = L(t) ? D(t) : window, f = !Se() && n, u = (c.left + (f && (o = (s = h.visualViewport) == null ? void 0 : s.offsetLeft) != null ? o : 0)) / a.x, p = (c.top + (f && (r = (l = h.visualViewport) == null ? void 0 : l.offsetTop) != null ? r : 0)) / a.y, m = c.width / a.x, b = c.height / a.y;
  return {
    width: m,
    height: b,
    top: p,
    right: u + m,
    bottom: p + b,
    left: u,
    x: u,
    y: p
  };
}
function z(t) {
  return ((Ee(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function Ct(t) {
  return L(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function Te(t) {
  return q(z(t)).left + Ct(t).scrollLeft;
}
function mn(t, e, n) {
  const i = N(e), o = z(e), s = q(t, !0, n === "fixed", e);
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = {
    x: 0,
    y: 0
  };
  if (i || !i && n !== "fixed")
    if (($(e) !== "body" || Tt(o)) && (r = Ct(e)), N(e)) {
      const c = q(e, !0);
      l.x = c.x + e.clientLeft, l.y = c.y + e.clientTop;
    } else
      o && (l.x = Te(o));
  return {
    x: s.left + r.scrollLeft - l.x,
    y: s.top + r.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function pt(t) {
  if ($(t) === "html")
    return t;
  const e = t.assignedSlot || t.parentNode || (Xt(t) ? t.host : null) || z(t);
  return Xt(e) ? e.host : e;
}
function Zt(t) {
  return !N(t) || j(t).position === "fixed" ? null : t.offsetParent;
}
function gn(t) {
  let e = pt(t);
  for (; N(e) && !Wt(e); ) {
    if (Vt(e))
      return e;
    e = pt(e);
  }
  return null;
}
function Gt(t) {
  const e = D(t);
  let n = Zt(t);
  for (; n && pn(n) && j(n).position === "static"; )
    n = Zt(n);
  return n && ($(n) === "html" || $(n) === "body" && j(n).position === "static" && !Vt(n)) ? e : n || gn(t) || e;
}
function bn(t) {
  if (N(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = q(t);
  return {
    width: e.width,
    height: e.height
  };
}
function yn(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: i
  } = t;
  const o = N(n), s = z(n);
  if (n === s)
    return e;
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 1,
    y: 1
  };
  const c = {
    x: 0,
    y: 0
  };
  if ((o || !o && i !== "fixed") && (($(n) !== "body" || Tt(s)) && (r = Ct(n)), N(n))) {
    const a = q(n);
    l = dt(n), c.x = a.x + n.clientLeft, c.y = a.y + n.clientTop;
  }
  return {
    width: e.width * l.x,
    height: e.height * l.y,
    x: e.x * l.x - r.scrollLeft * l.x + c.x,
    y: e.y * l.y - r.scrollTop * l.y + c.y
  };
}
function wn(t, e) {
  const n = D(t), i = z(t), o = n.visualViewport;
  let s = i.clientWidth, r = i.clientHeight, l = 0, c = 0;
  if (o) {
    s = o.width, r = o.height;
    const a = Se();
    (a || !a && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: s,
    height: r,
    x: l,
    y: c
  };
}
const Jt = Math.min, ct = Math.max;
function _n(t) {
  var e;
  const n = z(t), i = Ct(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, s = ct(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), r = ct(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0);
  let l = -i.scrollLeft + Te(t);
  const c = -i.scrollTop;
  return j(o || n).direction === "rtl" && (l += ct(n.clientWidth, o ? o.clientWidth : 0) - s), {
    width: s,
    height: r,
    x: l,
    y: c
  };
}
function Ce(t) {
  const e = pt(t);
  return Wt(e) ? t.ownerDocument.body : N(e) && Tt(e) ? e : Ce(e);
}
function at(t, e) {
  var n;
  e === void 0 && (e = []);
  const i = Ce(t), o = i === ((n = t.ownerDocument) == null ? void 0 : n.body), s = D(i);
  return o ? e.concat(s, s.visualViewport || [], Tt(i) ? i : []) : e.concat(i, at(i));
}
function xn(t, e) {
  const n = q(t, !0, e === "fixed"), i = n.top + t.clientTop, o = n.left + t.clientLeft, s = N(t) ? dt(t) : {
    x: 1,
    y: 1
  }, r = t.clientWidth * s.x, l = t.clientHeight * s.y, c = o * s.x, a = i * s.y;
  return {
    top: a,
    left: c,
    right: c + r,
    bottom: a + l,
    x: c,
    y: a,
    width: r,
    height: l
  };
}
function Qt(t, e, n) {
  return e === "viewport" ? Et(wn(t, n)) : L(e) ? xn(e, n) : Et(_n(z(t)));
}
function vn(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let i = at(t).filter((l) => L(l) && $(l) !== "body"), o = null;
  const s = j(t).position === "fixed";
  let r = s ? pt(t) : t;
  for (; L(r) && !Wt(r); ) {
    const l = j(r), c = Vt(r);
    (s ? !c && !o : !c && l.position === "static" && !!o && ["absolute", "fixed"].includes(o.position)) ? i = i.filter((h) => h !== r) : o = l, r = pt(r);
  }
  return e.set(t, i), i;
}
function On(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: o
  } = t;
  const r = [...n === "clippingAncestors" ? vn(e, this._c) : [].concat(n), i], l = r[0], c = r.reduce((a, h) => {
    const f = Qt(e, h, o);
    return a.top = ct(f.top, a.top), a.right = Jt(f.right, a.right), a.bottom = Jt(f.bottom, a.bottom), a.left = ct(f.left, a.left), a;
  }, Qt(e, l, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
const En = {
  getClippingRect: On,
  convertOffsetParentRelativeRectToViewportRelativeRect: yn,
  isElement: L,
  getDimensions: bn,
  getOffsetParent: Gt,
  getDocumentElement: z,
  getScale: dt,
  async getElementRects(t) {
    let {
      reference: e,
      floating: n,
      strategy: i
    } = t;
    const o = this.getOffsetParent || Gt, s = this.getDimensions;
    return {
      reference: mn(e, await o(n), i),
      floating: I({
        x: 0,
        y: 0
      }, await s(n))
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => j(t).direction === "rtl"
};
function Sn(t, e, n, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: r = !0,
    animationFrame: l = !1
  } = i, c = o && !l, a = c || s ? [...L(t) ? at(t) : t.contextElement ? at(t.contextElement) : [], ...at(e)] : [];
  a.forEach((m) => {
    c && m.addEventListener("scroll", n, {
      passive: !0
    }), s && m.addEventListener("resize", n);
  });
  let h = null;
  if (r) {
    let m = !0;
    h = new ResizeObserver(() => {
      m || n(), m = !1;
    }), L(t) && !l && h.observe(t), !L(t) && t.contextElement && !l && h.observe(t.contextElement), h.observe(e);
  }
  let f, u = l ? q(t) : null;
  l && p();
  function p() {
    const m = q(t);
    u && (m.x !== u.x || m.y !== u.y || m.width !== u.width || m.height !== u.height) && n(), u = m, f = requestAnimationFrame(p);
  }
  return n(), () => {
    var m;
    a.forEach((b) => {
      c && b.removeEventListener("scroll", n), s && b.removeEventListener("resize", n);
    }), (m = h) == null || m.disconnect(), h = null, l && cancelAnimationFrame(f);
  };
}
const An = (t, e, n) => {
  const i = /* @__PURE__ */ new Map(), o = I({
    platform: En
  }, n), s = I({}, o.platform, {
    _c: i
  });
  return en(t, e, I({}, o, {
    platform: s
  }));
};
function Tn(t) {
  t.cleanup && t.cleanup();
  const e = t._getResolvedAttachToOptions();
  let n = e.element;
  const i = Rn(e, t), o = ye(e);
  return o && (n = document.body, t.shepherdElementComponent.getElement().classList.add("shepherd-centered")), t.cleanup = Sn(n, t.el, () => {
    if (!t.el) {
      t.cleanup();
      return;
    }
    Pn(n, t, i, o);
  }), t.target = e.element, i;
}
function Cn(t, e) {
  return {
    floatingUIOptions: jt(t.floatingUIOptions || {}, e.floatingUIOptions || {})
  };
}
function In(t) {
  t.cleanup && t.cleanup(), t.cleanup = null;
}
function Pn(t, e, n, i) {
  return An(t, e.el, n).then(Ln(e, i)).then((o) => new Promise((s) => {
    setTimeout(() => s(o), 300);
  })).then((o) => {
    o && o.el && o.el.focus({
      preventScroll: !0
    });
  });
}
function Ln(t, e) {
  return (n) => {
    let {
      x: i,
      y: o,
      placement: s,
      middlewareData: r
    } = n;
    return t.el && (e ? Object.assign(t.el.style, {
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }) : Object.assign(t.el.style, {
      position: "absolute",
      left: `${i}px`,
      top: `${o}px`
    }), t.el.dataset.popperPlacement = s, kn(t.el, r)), t;
  };
}
function kn(t, e) {
  const n = t.querySelector(".shepherd-arrow");
  if (n) {
    let i, o, s, r;
    if (e.arrow) {
      const {
        x: l,
        y: c
      } = e.arrow;
      i = l != null ? `${l}px` : "", o = c != null ? `${c}px` : "";
    }
    Object.assign(n.style, {
      left: i,
      top: o,
      right: s,
      bottom: r
    });
  }
}
function Rn(t, e) {
  const n = {
    strategy: "absolute",
    middleware: []
  }, i = Mn(e);
  return ye(t) || (n.middleware.push(
    un(),
    hn({
      limiter: dn(),
      crossAxis: !0
    })
  ), i && n.middleware.push(rn({
    element: i
  })), n.placement = t.on), jt(e.options.floatingUIOptions || {}, n);
}
function Mn(t) {
  return t.options.arrow && t.el ? t.el.querySelector(".shepherd-arrow") : !1;
}
function P() {
}
function jn(t, e) {
  for (const n in e)
    t[n] = e[n];
  return t;
}
function Ie(t) {
  return t();
}
function te() {
  return /* @__PURE__ */ Object.create(null);
}
function yt(t) {
  t.forEach(Ie);
}
function Ut(t) {
  return typeof t == "function";
}
function H(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function Fn(t) {
  return Object.keys(t).length === 0;
}
function ot(t, e) {
  t.appendChild(e);
}
function M(t, e, n) {
  t.insertBefore(e, n || null);
}
function k(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function Bn(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function F(t) {
  return document.createElement(t);
}
function ee(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function Pe(t) {
  return document.createTextNode(t);
}
function At() {
  return Pe(" ");
}
function Nn() {
  return Pe("");
}
function It(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function _(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function ne(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__);
  for (const i in e)
    e[i] == null ? t.removeAttribute(i) : i === "style" ? t.style.cssText = e[i] : i === "__value" ? t.value = t[i] = e[i] : n[i] && n[i].set ? t[i] = e[i] : _(t, i, e[i]);
}
function Dn(t) {
  return Array.from(t.childNodes);
}
function nt(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
let mt;
function ft(t) {
  mt = t;
}
function Le() {
  if (!mt)
    throw new Error("Function called outside component initialization");
  return mt;
}
function Hn(t) {
  Le().$$.on_mount.push(t);
}
function Yt(t) {
  Le().$$.after_update.push(t);
}
const lt = [], st = [], vt = [], ie = [], Vn = Promise.resolve();
let kt = !1;
function Wn() {
  kt || (kt = !0, Vn.then(ke));
}
function Rt(t) {
  vt.push(t);
}
const Pt = /* @__PURE__ */ new Set();
let xt = 0;
function ke() {
  const t = mt;
  do {
    for (; xt < lt.length; ) {
      const e = lt[xt];
      xt++, ft(e), Un(e.$$);
    }
    for (ft(null), lt.length = 0, xt = 0; st.length; )
      st.pop()();
    for (let e = 0; e < vt.length; e += 1) {
      const n = vt[e];
      Pt.has(n) || (Pt.add(n), n());
    }
    vt.length = 0;
  } while (lt.length);
  for (; ie.length; )
    ie.pop()();
  kt = !1, Pt.clear(), ft(t);
}
function Un(t) {
  if (t.fragment !== null) {
    t.update(), yt(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Rt);
  }
}
const Ot = /* @__PURE__ */ new Set();
let G;
function J() {
  G = {
    r: 0,
    c: [],
    p: G
  };
}
function Q() {
  G.r || yt(G.c), G = G.p;
}
function w(t, e) {
  t && t.i && (Ot.delete(t), t.i(e));
}
function S(t, e, n, i) {
  if (t && t.o) {
    if (Ot.has(t))
      return;
    Ot.add(t), G.c.push(() => {
      Ot.delete(t), i && (n && t.d(1), i());
    }), t.o(e);
  } else
    i && i();
}
function Yn(t, e) {
  const n = {}, i = {}, o = {
    $$scope: 1
  };
  let s = t.length;
  for (; s--; ) {
    const r = t[s], l = e[s];
    if (l) {
      for (const c in r)
        c in l || (i[c] = 1);
      for (const c in l)
        o[c] || (n[c] = l[c], o[c] = 1);
      t[s] = l;
    } else
      for (const c in r)
        o[c] = 1;
  }
  for (const r in i)
    r in n || (n[r] = void 0);
  return n;
}
function et(t) {
  t && t.c();
}
function K(t, e, n, i) {
  const {
    fragment: o,
    after_update: s
  } = t.$$;
  o && o.m(e, n), i || Rt(() => {
    const r = t.$$.on_mount.map(Ie).filter(Ut);
    t.$$.on_destroy ? t.$$.on_destroy.push(...r) : yt(r), t.$$.on_mount = [];
  }), s.forEach(Rt);
}
function X(t, e) {
  const n = t.$$;
  n.fragment !== null && (yt(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function $n(t, e) {
  t.$$.dirty[0] === -1 && (lt.push(t), Wn(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function V(t, e, n, i, o, s, r, l) {
  l === void 0 && (l = [-1]);
  const c = mt;
  ft(t);
  const a = t.$$ = {
    fragment: null,
    ctx: [],
    props: s,
    update: P,
    not_equal: o,
    bound: te(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    callbacks: te(),
    dirty: l,
    skip_bound: !1,
    root: e.target || c.$$.root
  };
  r && r(a.root);
  let h = !1;
  if (a.ctx = n ? n(t, e.props || {}, function(f, u) {
    const p = !(arguments.length <= 2) && arguments.length - 2 ? arguments.length <= 2 ? void 0 : arguments[2] : u;
    return a.ctx && o(a.ctx[f], a.ctx[f] = p) && (!a.skip_bound && a.bound[f] && a.bound[f](p), h && $n(t, f)), u;
  }) : [], a.update(), h = !0, yt(a.before_update), a.fragment = i ? i(a.ctx) : !1, e.target) {
    if (e.hydrate) {
      const f = Dn(e.target);
      a.fragment && a.fragment.l(f), f.forEach(k);
    } else
      a.fragment && a.fragment.c();
    e.intro && w(t.$$.fragment), K(t, e.target, e.anchor, e.customElement), ke();
  }
  ft(c);
}
class W {
  $destroy() {
    X(this, 1), this.$destroy = P;
  }
  $on(e, n) {
    if (!Ut(n))
      return P;
    const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return i.push(n), () => {
      const o = i.indexOf(n);
      o !== -1 && i.splice(o, 1);
    };
  }
  $set(e) {
    this.$$set && !Fn(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
function qn(t) {
  let e, n, i, o, s;
  return {
    c() {
      e = F("button"), _(e, "aria-label", n = t[3] ? t[3] : null), _(e, "class", i = `${t[1] || ""} shepherd-button ${t[4] ? "shepherd-button-secondary" : ""}`), e.disabled = t[2], _(e, "tabindex", "0");
    },
    m(r, l) {
      M(r, e, l), e.innerHTML = t[5], o || (s = It(e, "click", function() {
        Ut(t[0]) && t[0].apply(this, arguments);
      }), o = !0);
    },
    p(r, l) {
      let [c] = l;
      t = r, c & 32 && (e.innerHTML = t[5]), c & 8 && n !== (n = t[3] ? t[3] : null) && _(e, "aria-label", n), c & 18 && i !== (i = `${t[1] || ""} shepherd-button ${t[4] ? "shepherd-button-secondary" : ""}`) && _(e, "class", i), c & 4 && (e.disabled = t[2]);
    },
    i: P,
    o: P,
    d(r) {
      r && k(e), o = !1, s();
    }
  };
}
function zn(t, e, n) {
  let {
    config: i,
    step: o
  } = e, s, r, l, c, a, h;
  function f(u) {
    return tt(u) ? u = u.call(o) : u;
  }
  return t.$$set = (u) => {
    "config" in u && n(6, i = u.config), "step" in u && n(7, o = u.step);
  }, t.$$.update = () => {
    t.$$.dirty & 192 && (n(0, s = i.action ? i.action.bind(o.tour) : null), n(1, r = i.classes), n(2, l = i.disabled ? f(i.disabled) : !1), n(3, c = i.label ? f(i.label) : null), n(4, a = i.secondary), n(5, h = i.text ? f(i.text) : null));
  }, [s, r, l, c, a, h, i, o];
}
class Kn extends W {
  constructor(e) {
    super(), V(this, e, zn, qn, H, {
      config: 6,
      step: 7
    });
  }
}
function oe(t, e, n) {
  const i = t.slice();
  return i[2] = e[n], i;
}
function se(t) {
  let e, n, i = t[1], o = [];
  for (let r = 0; r < i.length; r += 1)
    o[r] = re(oe(t, i, r));
  const s = (r) => S(o[r], 1, 1, () => {
    o[r] = null;
  });
  return {
    c() {
      for (let r = 0; r < o.length; r += 1)
        o[r].c();
      e = Nn();
    },
    m(r, l) {
      for (let c = 0; c < o.length; c += 1)
        o[c].m(r, l);
      M(r, e, l), n = !0;
    },
    p(r, l) {
      if (l & 3) {
        i = r[1];
        let c;
        for (c = 0; c < i.length; c += 1) {
          const a = oe(r, i, c);
          o[c] ? (o[c].p(a, l), w(o[c], 1)) : (o[c] = re(a), o[c].c(), w(o[c], 1), o[c].m(e.parentNode, e));
        }
        for (J(), c = i.length; c < o.length; c += 1)
          s(c);
        Q();
      }
    },
    i(r) {
      if (!n) {
        for (let l = 0; l < i.length; l += 1)
          w(o[l]);
        n = !0;
      }
    },
    o(r) {
      o = o.filter(Boolean);
      for (let l = 0; l < o.length; l += 1)
        S(o[l]);
      n = !1;
    },
    d(r) {
      Bn(o, r), r && k(e);
    }
  };
}
function re(t) {
  let e, n;
  return e = new Kn({
    props: {
      config: t[2],
      step: t[0]
    }
  }), {
    c() {
      et(e.$$.fragment);
    },
    m(i, o) {
      K(e, i, o), n = !0;
    },
    p(i, o) {
      const s = {};
      o & 2 && (s.config = i[2]), o & 1 && (s.step = i[0]), e.$set(s);
    },
    i(i) {
      n || (w(e.$$.fragment, i), n = !0);
    },
    o(i) {
      S(e.$$.fragment, i), n = !1;
    },
    d(i) {
      X(e, i);
    }
  };
}
function Xn(t) {
  let e, n, i = t[1] && se(t);
  return {
    c() {
      e = F("footer"), i && i.c(), _(e, "class", "shepherd-footer");
    },
    m(o, s) {
      M(o, e, s), i && i.m(e, null), n = !0;
    },
    p(o, s) {
      let [r] = s;
      o[1] ? i ? (i.p(o, r), r & 2 && w(i, 1)) : (i = se(o), i.c(), w(i, 1), i.m(e, null)) : i && (J(), S(i, 1, 1, () => {
        i = null;
      }), Q());
    },
    i(o) {
      n || (w(i), n = !0);
    },
    o(o) {
      S(i), n = !1;
    },
    d(o) {
      o && k(e), i && i.d();
    }
  };
}
function Zn(t, e, n) {
  let i, {
    step: o
  } = e;
  return t.$$set = (s) => {
    "step" in s && n(0, o = s.step);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(1, i = o.options.buttons);
  }, [o, i];
}
class Gn extends W {
  constructor(e) {
    super(), V(this, e, Zn, Xn, H, {
      step: 0
    });
  }
}
function Jn(t) {
  let e, n, i, o, s;
  return {
    c() {
      e = F("button"), n = F("span"), n.textContent = "×", _(n, "aria-hidden", "true"), _(e, "aria-label", i = t[0].label ? t[0].label : "Close Tour"), _(e, "class", "shepherd-cancel-icon"), _(e, "type", "button");
    },
    m(r, l) {
      M(r, e, l), ot(e, n), o || (s = It(e, "click", t[1]), o = !0);
    },
    p(r, l) {
      let [c] = l;
      c & 1 && i !== (i = r[0].label ? r[0].label : "Close Tour") && _(e, "aria-label", i);
    },
    i: P,
    o: P,
    d(r) {
      r && k(e), o = !1, s();
    }
  };
}
function Qn(t, e, n) {
  let {
    cancelIcon: i,
    step: o
  } = e;
  const s = (r) => {
    r.preventDefault(), o.cancel();
  };
  return t.$$set = (r) => {
    "cancelIcon" in r && n(0, i = r.cancelIcon), "step" in r && n(2, o = r.step);
  }, [i, s, o];
}
class ti extends W {
  constructor(e) {
    super(), V(this, e, Qn, Jn, H, {
      cancelIcon: 0,
      step: 2
    });
  }
}
function ei(t) {
  let e;
  return {
    c() {
      e = F("h3"), _(e, "id", t[1]), _(e, "class", "shepherd-title");
    },
    m(n, i) {
      M(n, e, i), t[3](e);
    },
    p(n, i) {
      let [o] = i;
      o & 2 && _(e, "id", n[1]);
    },
    i: P,
    o: P,
    d(n) {
      n && k(e), t[3](null);
    }
  };
}
function ni(t, e, n) {
  let {
    labelId: i,
    element: o,
    title: s
  } = e;
  Yt(() => {
    tt(s) && n(2, s = s()), n(0, o.innerHTML = s, o);
  });
  function r(l) {
    st[l ? "unshift" : "push"](() => {
      o = l, n(0, o);
    });
  }
  return t.$$set = (l) => {
    "labelId" in l && n(1, i = l.labelId), "element" in l && n(0, o = l.element), "title" in l && n(2, s = l.title);
  }, [o, i, s, r];
}
class ii extends W {
  constructor(e) {
    super(), V(this, e, ni, ei, H, {
      labelId: 1,
      element: 0,
      title: 2
    });
  }
}
function le(t) {
  let e, n;
  return e = new ii({
    props: {
      labelId: t[0],
      title: t[2]
    }
  }), {
    c() {
      et(e.$$.fragment);
    },
    m(i, o) {
      K(e, i, o), n = !0;
    },
    p(i, o) {
      const s = {};
      o & 1 && (s.labelId = i[0]), o & 4 && (s.title = i[2]), e.$set(s);
    },
    i(i) {
      n || (w(e.$$.fragment, i), n = !0);
    },
    o(i) {
      S(e.$$.fragment, i), n = !1;
    },
    d(i) {
      X(e, i);
    }
  };
}
function ce(t) {
  let e, n;
  return e = new ti({
    props: {
      cancelIcon: t[3],
      step: t[1]
    }
  }), {
    c() {
      et(e.$$.fragment);
    },
    m(i, o) {
      K(e, i, o), n = !0;
    },
    p(i, o) {
      const s = {};
      o & 8 && (s.cancelIcon = i[3]), o & 2 && (s.step = i[1]), e.$set(s);
    },
    i(i) {
      n || (w(e.$$.fragment, i), n = !0);
    },
    o(i) {
      S(e.$$.fragment, i), n = !1;
    },
    d(i) {
      X(e, i);
    }
  };
}
function oi(t) {
  let e, n, i, o = t[2] && le(t), s = t[3] && t[3].enabled && ce(t);
  return {
    c() {
      e = F("header"), o && o.c(), n = At(), s && s.c(), _(e, "class", "shepherd-header");
    },
    m(r, l) {
      M(r, e, l), o && o.m(e, null), ot(e, n), s && s.m(e, null), i = !0;
    },
    p(r, l) {
      let [c] = l;
      r[2] ? o ? (o.p(r, c), c & 4 && w(o, 1)) : (o = le(r), o.c(), w(o, 1), o.m(e, n)) : o && (J(), S(o, 1, 1, () => {
        o = null;
      }), Q()), r[3] && r[3].enabled ? s ? (s.p(r, c), c & 8 && w(s, 1)) : (s = ce(r), s.c(), w(s, 1), s.m(e, null)) : s && (J(), S(s, 1, 1, () => {
        s = null;
      }), Q());
    },
    i(r) {
      i || (w(o), w(s), i = !0);
    },
    o(r) {
      S(o), S(s), i = !1;
    },
    d(r) {
      r && k(e), o && o.d(), s && s.d();
    }
  };
}
function si(t, e, n) {
  let {
    labelId: i,
    step: o
  } = e, s, r;
  return t.$$set = (l) => {
    "labelId" in l && n(0, i = l.labelId), "step" in l && n(1, o = l.step);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && (n(2, s = o.options.title), n(3, r = o.options.cancelIcon));
  }, [i, o, s, r];
}
class ri extends W {
  constructor(e) {
    super(), V(this, e, si, oi, H, {
      labelId: 0,
      step: 1
    });
  }
}
function li(t) {
  let e;
  return {
    c() {
      e = F("div"), _(e, "class", "shepherd-text"), _(e, "id", t[1]);
    },
    m(n, i) {
      M(n, e, i), t[3](e);
    },
    p(n, i) {
      let [o] = i;
      o & 2 && _(e, "id", n[1]);
    },
    i: P,
    o: P,
    d(n) {
      n && k(e), t[3](null);
    }
  };
}
function ci(t, e, n) {
  let {
    descriptionId: i,
    element: o,
    step: s
  } = e;
  Yt(() => {
    let {
      text: l
    } = s.options;
    tt(l) && (l = l.call(s)), Ft(l) ? o.appendChild(l) : n(0, o.innerHTML = l, o);
  });
  function r(l) {
    st[l ? "unshift" : "push"](() => {
      o = l, n(0, o);
    });
  }
  return t.$$set = (l) => {
    "descriptionId" in l && n(1, i = l.descriptionId), "element" in l && n(0, o = l.element), "step" in l && n(2, s = l.step);
  }, [o, i, s, r];
}
class ai extends W {
  constructor(e) {
    super(), V(this, e, ci, li, H, {
      descriptionId: 1,
      element: 0,
      step: 2
    });
  }
}
function ae(t) {
  let e, n;
  return e = new ri({
    props: {
      labelId: t[1],
      step: t[2]
    }
  }), {
    c() {
      et(e.$$.fragment);
    },
    m(i, o) {
      K(e, i, o), n = !0;
    },
    p(i, o) {
      const s = {};
      o & 2 && (s.labelId = i[1]), o & 4 && (s.step = i[2]), e.$set(s);
    },
    i(i) {
      n || (w(e.$$.fragment, i), n = !0);
    },
    o(i) {
      S(e.$$.fragment, i), n = !1;
    },
    d(i) {
      X(e, i);
    }
  };
}
function fe(t) {
  let e, n;
  return e = new ai({
    props: {
      descriptionId: t[0],
      step: t[2]
    }
  }), {
    c() {
      et(e.$$.fragment);
    },
    m(i, o) {
      K(e, i, o), n = !0;
    },
    p(i, o) {
      const s = {};
      o & 1 && (s.descriptionId = i[0]), o & 4 && (s.step = i[2]), e.$set(s);
    },
    i(i) {
      n || (w(e.$$.fragment, i), n = !0);
    },
    o(i) {
      S(e.$$.fragment, i), n = !1;
    },
    d(i) {
      X(e, i);
    }
  };
}
function ue(t) {
  let e, n;
  return e = new Gn({
    props: {
      step: t[2]
    }
  }), {
    c() {
      et(e.$$.fragment);
    },
    m(i, o) {
      K(e, i, o), n = !0;
    },
    p(i, o) {
      const s = {};
      o & 4 && (s.step = i[2]), e.$set(s);
    },
    i(i) {
      n || (w(e.$$.fragment, i), n = !0);
    },
    o(i) {
      S(e.$$.fragment, i), n = !1;
    },
    d(i) {
      X(e, i);
    }
  };
}
function fi(t) {
  let e, n = !C(t[2].options.title) || t[2].options.cancelIcon && t[2].options.cancelIcon.enabled, i, o = !C(t[2].options.text), s, r = Array.isArray(t[2].options.buttons) && t[2].options.buttons.length, l, c = n && ae(t), a = o && fe(t), h = r && ue(t);
  return {
    c() {
      e = F("div"), c && c.c(), i = At(), a && a.c(), s = At(), h && h.c(), _(e, "class", "shepherd-content");
    },
    m(f, u) {
      M(f, e, u), c && c.m(e, null), ot(e, i), a && a.m(e, null), ot(e, s), h && h.m(e, null), l = !0;
    },
    p(f, u) {
      let [p] = u;
      p & 4 && (n = !C(f[2].options.title) || f[2].options.cancelIcon && f[2].options.cancelIcon.enabled), n ? c ? (c.p(f, p), p & 4 && w(c, 1)) : (c = ae(f), c.c(), w(c, 1), c.m(e, i)) : c && (J(), S(c, 1, 1, () => {
        c = null;
      }), Q()), p & 4 && (o = !C(f[2].options.text)), o ? a ? (a.p(f, p), p & 4 && w(a, 1)) : (a = fe(f), a.c(), w(a, 1), a.m(e, s)) : a && (J(), S(a, 1, 1, () => {
        a = null;
      }), Q()), p & 4 && (r = Array.isArray(f[2].options.buttons) && f[2].options.buttons.length), r ? h ? (h.p(f, p), p & 4 && w(h, 1)) : (h = ue(f), h.c(), w(h, 1), h.m(e, null)) : h && (J(), S(h, 1, 1, () => {
        h = null;
      }), Q());
    },
    i(f) {
      l || (w(c), w(a), w(h), l = !0);
    },
    o(f) {
      S(c), S(a), S(h), l = !1;
    },
    d(f) {
      f && k(e), c && c.d(), a && a.d(), h && h.d();
    }
  };
}
function ui(t, e, n) {
  let {
    descriptionId: i,
    labelId: o,
    step: s
  } = e;
  return t.$$set = (r) => {
    "descriptionId" in r && n(0, i = r.descriptionId), "labelId" in r && n(1, o = r.labelId), "step" in r && n(2, s = r.step);
  }, [i, o, s];
}
class hi extends W {
  constructor(e) {
    super(), V(this, e, ui, fi, H, {
      descriptionId: 0,
      labelId: 1,
      step: 2
    });
  }
}
function he(t) {
  let e;
  return {
    c() {
      e = F("div"), _(e, "class", "shepherd-arrow"), _(e, "data-popper-arrow", "");
    },
    m(n, i) {
      M(n, e, i);
    },
    d(n) {
      n && k(e);
    }
  };
}
function di(t) {
  let e, n, i, o, s, r, l, c, a = t[4].options.arrow && t[4].options.attachTo && t[4].options.attachTo.element && t[4].options.attachTo.on && he();
  i = new hi({
    props: {
      descriptionId: t[2],
      labelId: t[3],
      step: t[4]
    }
  });
  let h = [{
    "aria-describedby": o = C(t[4].options.text) ? null : t[2]
  }, {
    "aria-labelledby": s = t[4].options.title ? t[3] : null
  }, t[1], {
    role: "dialog"
  }, {
    tabindex: "0"
  }], f = {};
  for (let u = 0; u < h.length; u += 1)
    f = jn(f, h[u]);
  return {
    c() {
      e = F("div"), a && a.c(), n = At(), et(i.$$.fragment), ne(e, f), nt(e, "shepherd-has-cancel-icon", t[5]), nt(e, "shepherd-has-title", t[6]), nt(e, "shepherd-element", !0);
    },
    m(u, p) {
      M(u, e, p), a && a.m(e, null), ot(e, n), K(i, e, null), t[13](e), r = !0, l || (c = It(e, "keydown", t[7]), l = !0);
    },
    p(u, p) {
      let [m] = p;
      u[4].options.arrow && u[4].options.attachTo && u[4].options.attachTo.element && u[4].options.attachTo.on ? a || (a = he(), a.c(), a.m(e, n)) : a && (a.d(1), a = null);
      const b = {};
      m & 4 && (b.descriptionId = u[2]), m & 8 && (b.labelId = u[3]), m & 16 && (b.step = u[4]), i.$set(b), ne(e, f = Yn(h, [(!r || m & 20 && o !== (o = C(u[4].options.text) ? null : u[2])) && {
        "aria-describedby": o
      }, (!r || m & 24 && s !== (s = u[4].options.title ? u[3] : null)) && {
        "aria-labelledby": s
      }, m & 2 && u[1], {
        role: "dialog"
      }, {
        tabindex: "0"
      }])), nt(e, "shepherd-has-cancel-icon", u[5]), nt(e, "shepherd-has-title", u[6]), nt(e, "shepherd-element", !0);
    },
    i(u) {
      r || (w(i.$$.fragment, u), r = !0);
    },
    o(u) {
      S(i.$$.fragment, u), r = !1;
    },
    d(u) {
      u && k(e), a && a.d(), X(i), t[13](null), l = !1, c();
    }
  };
}
const pi = 9, mi = 27, gi = 37, bi = 39;
function de(t) {
  return t.split(" ").filter((e) => !!e.length);
}
function yi(t, e, n) {
  let {
    classPrefix: i,
    element: o,
    descriptionId: s,
    firstFocusableElement: r,
    focusableElements: l,
    labelId: c,
    lastFocusableElement: a,
    step: h,
    dataStepId: f
  } = e, u, p, m;
  const b = () => o;
  Hn(() => {
    n(1, f = {
      [`data-${i}shepherd-step-id`]: h.id
    }), n(9, l = o.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')), n(8, r = l[0]), n(10, a = l[l.length - 1]);
  }), Yt(() => {
    m !== h.options.classes && O();
  });
  function O() {
    x(m), m = h.options.classes, E(m);
  }
  function x(d) {
    if (ht(d)) {
      const y = de(d);
      y.length && o.classList.remove(...y);
    }
  }
  function E(d) {
    if (ht(d)) {
      const y = de(d);
      y.length && o.classList.add(...y);
    }
  }
  const v = (d) => {
    const {
      tour: y
    } = h;
    switch (d.keyCode) {
      case pi:
        if (l.length === 0) {
          d.preventDefault();
          break;
        }
        d.shiftKey ? (document.activeElement === r || document.activeElement.classList.contains("shepherd-element")) && (d.preventDefault(), a.focus()) : document.activeElement === a && (d.preventDefault(), r.focus());
        break;
      case mi:
        y.options.exitOnEsc && h.cancel();
        break;
      case gi:
        y.options.keyboardNavigation && y.back();
        break;
      case bi:
        y.options.keyboardNavigation && y.next();
        break;
    }
  };
  function g(d) {
    st[d ? "unshift" : "push"](() => {
      o = d, n(0, o);
    });
  }
  return t.$$set = (d) => {
    "classPrefix" in d && n(11, i = d.classPrefix), "element" in d && n(0, o = d.element), "descriptionId" in d && n(2, s = d.descriptionId), "firstFocusableElement" in d && n(8, r = d.firstFocusableElement), "focusableElements" in d && n(9, l = d.focusableElements), "labelId" in d && n(3, c = d.labelId), "lastFocusableElement" in d && n(10, a = d.lastFocusableElement), "step" in d && n(4, h = d.step), "dataStepId" in d && n(1, f = d.dataStepId);
  }, t.$$.update = () => {
    t.$$.dirty & 16 && (n(5, u = h.options && h.options.cancelIcon && h.options.cancelIcon.enabled), n(6, p = h.options && h.options.title));
  }, [o, f, s, c, h, u, p, v, r, l, a, i, b, g];
}
class wi extends W {
  constructor(e) {
    super(), V(this, e, yi, di, H, {
      classPrefix: 11,
      element: 0,
      descriptionId: 2,
      firstFocusableElement: 8,
      focusableElements: 9,
      labelId: 3,
      lastFocusableElement: 10,
      step: 4,
      dataStepId: 1,
      getElement: 12
    });
  }
  get getElement() {
    return this.$$.ctx[12];
  }
}
class Mt extends Bt {
  constructor(e, n) {
    return n === void 0 && (n = {}), super(e, n), this.tour = e, this.classPrefix = this.tour.options ? be(this.tour.options.classPrefix) : "", this.styles = e.styles, this._resolvedAttachTo = null, ge(this), this._setOptions(n), this;
  }
  cancel() {
    this.tour.cancel(), this.trigger("cancel");
  }
  complete() {
    this.tour.complete(), this.trigger("complete");
  }
  destroy() {
    In(this), Ft(this.el) && (this.el.remove(), this.el = null), this._updateStepTargetOnHide(), this.trigger("destroy");
  }
  getTour() {
    return this.tour;
  }
  hide() {
    this.tour.modal.hide(), this.trigger("before-hide"), this.el && (this.el.hidden = !0), this._updateStepTargetOnHide(), this.trigger("hide");
  }
  _resolveAttachToOptions() {
    return this._resolvedAttachTo = Je(this), this._resolvedAttachTo;
  }
  _getResolvedAttachToOptions() {
    return this._resolvedAttachTo === null ? this._resolveAttachToOptions() : this._resolvedAttachTo;
  }
  isOpen() {
    return Boolean(this.el && !this.el.hidden);
  }
  show() {
    return tt(this.options.beforeShowPromise) ? Promise.resolve(this.options.beforeShowPromise()).then(() => this._show()) : Promise.resolve(this._show());
  }
  updateStepOptions(e) {
    Object.assign(this.options, e), this.shepherdElementComponent && this.shepherdElementComponent.$set({
      step: this
    });
  }
  getElement() {
    return this.el;
  }
  getTarget() {
    return this.target;
  }
  _createTooltipContent() {
    const e = `${this.id}-description`, n = `${this.id}-label`;
    return this.shepherdElementComponent = new wi({
      target: this.tour.options.stepsContainer || document.body,
      props: {
        classPrefix: this.classPrefix,
        descriptionId: e,
        labelId: n,
        step: this,
        styles: this.styles
      }
    }), this.shepherdElementComponent.getElement();
  }
  _scrollTo(e) {
    const {
      element: n
    } = this._getResolvedAttachToOptions();
    tt(this.options.scrollToHandler) ? this.options.scrollToHandler(n) : Xe(n) && typeof n.scrollIntoView == "function" && n.scrollIntoView(e);
  }
  _getClassOptions(e) {
    const n = this.tour && this.tour.options && this.tour.options.defaultStepOptions, i = e.classes ? e.classes : "", o = n && n.classes ? n.classes : "", s = [...i.split(" "), ...o.split(" ")], r = new Set(s);
    return Array.from(r).join(" ").trim();
  }
  _setOptions(e) {
    e === void 0 && (e = {});
    let n = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
    n = jt({}, n || {}), this.options = Object.assign({
      arrow: !0
    }, n, e, Cn(n, e));
    const {
      when: i
    } = this.options;
    this.options.classes = this._getClassOptions(e), this.destroy(), this.id = this.options.id || `step-${Nt()}`, i && Object.keys(i).forEach((o) => {
      this.on(o, i[o], this);
    });
  }
  _setupElements() {
    C(this.el) || this.destroy(), this.el = this._createTooltipContent(), this.options.advanceOn && Ge(this), Tn(this);
  }
  _show() {
    this.trigger("before-show"), this._resolveAttachToOptions(), this._setupElements(), this.tour.modal || this.tour._setupModal(), this.tour.modal.setupForStep(this), this._styleTargetElementForStep(this), this.el.hidden = !1, this.options.scrollTo && setTimeout(() => {
      this._scrollTo(this.options.scrollTo);
    }), this.el.hidden = !1;
    const e = this.shepherdElementComponent.getElement(), n = this.target || document.body;
    n.classList.add(`${this.classPrefix}shepherd-enabled`), n.classList.add(`${this.classPrefix}shepherd-target`), e.classList.add("shepherd-enabled"), this.trigger("show");
  }
  _styleTargetElementForStep(e) {
    const n = e.target;
    !n || (e.options.highlightClass && n.classList.add(e.options.highlightClass), n.classList.remove("shepherd-target-click-disabled"), e.options.canClickTarget === !1 && n.classList.add("shepherd-target-click-disabled"));
  }
  _updateStepTargetOnHide() {
    const e = this.target || document.body;
    this.options.highlightClass && e.classList.remove(this.options.highlightClass), e.classList.remove("shepherd-target-click-disabled", `${this.classPrefix}shepherd-enabled`, `${this.classPrefix}shepherd-target`);
  }
}
function _i(t) {
  if (t) {
    const {
      steps: e
    } = t;
    e.forEach((n) => {
      n.options && n.options.canClickTarget === !1 && n.options.attachTo && n.target instanceof HTMLElement && n.target.classList.remove("shepherd-target-click-disabled");
    });
  }
}
function xi(t) {
  let {
    width: e,
    height: n,
    x: i = 0,
    y: o = 0,
    r: s = 0
  } = t;
  const {
    innerWidth: r,
    innerHeight: l
  } = window, {
    topLeft: c = 0,
    topRight: a = 0,
    bottomRight: h = 0,
    bottomLeft: f = 0
  } = typeof s == "number" ? {
    topLeft: s,
    topRight: s,
    bottomRight: s,
    bottomLeft: s
  } : s;
  return `M${r},${l}H0V0H${r}V${l}ZM${i + c},${o}a${c},${c},0,0,0-${c},${c}V${n + o - f}a${f},${f},0,0,0,${f},${f}H${e + i - h}a${h},${h},0,0,0,${h}-${h}V${o + a}a${a},${a},0,0,0-${a}-${a}Z`;
}
function vi(t) {
  let e, n, i, o, s;
  return {
    c() {
      e = ee("svg"), n = ee("path"), _(n, "d", t[2]), _(e, "class", i = `${t[1] ? "shepherd-modal-is-visible" : ""} shepherd-modal-overlay-container`);
    },
    m(r, l) {
      M(r, e, l), ot(e, n), t[11](e), o || (s = It(e, "touchmove", t[3]), o = !0);
    },
    p(r, l) {
      let [c] = l;
      c & 4 && _(n, "d", r[2]), c & 2 && i !== (i = `${r[1] ? "shepherd-modal-is-visible" : ""} shepherd-modal-overlay-container`) && _(e, "class", i);
    },
    i: P,
    o: P,
    d(r) {
      r && k(e), t[11](null), o = !1, s();
    }
  };
}
function Re(t) {
  if (!t)
    return null;
  const n = t instanceof HTMLElement && window.getComputedStyle(t).overflowY;
  return n !== "hidden" && n !== "visible" && t.scrollHeight >= t.clientHeight ? t : Re(t.parentElement);
}
function Oi(t, e) {
  const n = t.getBoundingClientRect();
  let i = n.y || n.top, o = n.bottom || i + n.height;
  if (e) {
    const r = e.getBoundingClientRect(), l = r.y || r.top, c = r.bottom || l + r.height;
    i = Math.max(i, l), o = Math.min(o, c);
  }
  const s = Math.max(o - i, 0);
  return {
    y: i,
    height: s
  };
}
function Ei(t, e, n) {
  let {
    element: i,
    openingProperties: o
  } = e;
  Nt();
  let s = !1, r, l;
  a();
  const c = () => i;
  function a() {
    n(4, o = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      r: 0
    });
  }
  function h() {
    n(1, s = !1), x();
  }
  function f(g, d, y, T) {
    if (g === void 0 && (g = 0), d === void 0 && (d = 0), T) {
      const {
        y: A,
        height: R
      } = Oi(T, y), {
        x: B,
        width: Z,
        left: U
      } = T.getBoundingClientRect();
      n(4, o = {
        width: Z + g * 2,
        height: R + g * 2,
        x: (B || U) - g,
        y: A - g,
        r: d
      });
    } else
      a();
  }
  function u(g) {
    x(), g.tour.options.useModalOverlay ? (E(g), p()) : h();
  }
  function p() {
    n(1, s = !0);
  }
  const m = (g) => {
    g.preventDefault();
  }, b = (g) => {
    g.stopPropagation();
  };
  function O() {
    window.addEventListener("touchmove", m, {
      passive: !1
    });
  }
  function x() {
    r && (cancelAnimationFrame(r), r = void 0), window.removeEventListener("touchmove", m, {
      passive: !1
    });
  }
  function E(g) {
    const {
      modalOverlayOpeningPadding: d,
      modalOverlayOpeningRadius: y
    } = g.options, T = Re(g.target), A = () => {
      r = void 0, f(d, y, T, g.target), r = requestAnimationFrame(A);
    };
    A(), O();
  }
  function v(g) {
    st[g ? "unshift" : "push"](() => {
      i = g, n(0, i);
    });
  }
  return t.$$set = (g) => {
    "element" in g && n(0, i = g.element), "openingProperties" in g && n(4, o = g.openingProperties);
  }, t.$$.update = () => {
    t.$$.dirty & 16 && n(2, l = xi(o));
  }, [i, s, l, b, o, c, a, h, f, u, p, v];
}
class Si extends W {
  constructor(e) {
    super(), V(this, e, Ei, vi, H, {
      element: 0,
      openingProperties: 4,
      getElement: 5,
      closeModalOpening: 6,
      hide: 7,
      positionModal: 8,
      setupForStep: 9,
      show: 10
    });
  }
  get getElement() {
    return this.$$.ctx[5];
  }
  get closeModalOpening() {
    return this.$$.ctx[6];
  }
  get hide() {
    return this.$$.ctx[7];
  }
  get positionModal() {
    return this.$$.ctx[8];
  }
  get setupForStep() {
    return this.$$.ctx[9];
  }
  get show() {
    return this.$$.ctx[10];
  }
}
const Y = new Bt();
class Ai extends Bt {
  constructor(e) {
    e === void 0 && (e = {}), super(e), ge(this);
    const n = {
      exitOnEsc: !0,
      keyboardNavigation: !0
    };
    return this.options = Object.assign({}, n, e), this.classPrefix = be(this.options.classPrefix), this.steps = [], this.addSteps(this.options.steps), ["active", "cancel", "complete", "inactive", "show", "start"].map((o) => {
      ((s) => {
        this.on(s, (r) => {
          r = r || {}, r.tour = this, Y.trigger(s, r);
        });
      })(o);
    }), this._setTourID(), this;
  }
  addStep(e, n) {
    let i = e;
    return i instanceof Mt ? i.tour = this : i = new Mt(this, i), C(n) ? this.steps.push(i) : this.steps.splice(n, 0, i), i;
  }
  addSteps(e) {
    return Array.isArray(e) && e.forEach((n) => {
      this.addStep(n);
    }), this;
  }
  back() {
    const e = this.steps.indexOf(this.currentStep);
    this.show(e - 1, !1);
  }
  cancel() {
    if (this.options.confirmCancel) {
      const e = this.options.confirmCancelMessage || "Are you sure you want to stop the tour?";
      window.confirm(e) && this._done("cancel");
    } else
      this._done("cancel");
  }
  complete() {
    this._done("complete");
  }
  getById(e) {
    return this.steps.find((n) => n.id === e);
  }
  getCurrentStep() {
    return this.currentStep;
  }
  hide() {
    const e = this.getCurrentStep();
    if (e)
      return e.hide();
  }
  isActive() {
    return Y.activeTour === this;
  }
  next() {
    const e = this.steps.indexOf(this.currentStep);
    e === this.steps.length - 1 ? this.complete() : this.show(e + 1, !0);
  }
  removeStep(e) {
    const n = this.getCurrentStep();
    this.steps.some((i, o) => {
      if (i.id === e)
        return i.isOpen() && i.hide(), i.destroy(), this.steps.splice(o, 1), !0;
    }), n && n.id === e && (this.currentStep = void 0, this.steps.length ? this.show(0) : this.cancel());
  }
  show(e, n) {
    e === void 0 && (e = 0), n === void 0 && (n = !0);
    const i = ht(e) ? this.getById(e) : this.steps[e];
    i && (this._updateStateBeforeShow(), tt(i.options.showOn) && !i.options.showOn() ? this._skipStep(i, n) : (this.trigger("show", {
      step: i,
      previous: this.currentStep
    }), this.currentStep = i, i.show()));
  }
  start() {
    this.trigger("start"), this.focusedElBeforeOpen = document.activeElement, this.currentStep = null, this._setupModal(), this._setupActiveTour(), this.next();
  }
  _done(e) {
    const n = this.steps.indexOf(this.currentStep);
    if (Array.isArray(this.steps) && this.steps.forEach((i) => i.destroy()), _i(this), this.trigger(e, {
      index: n
    }), Y.activeTour = null, this.trigger("inactive", {
      tour: this
    }), this.modal && this.modal.hide(), (e === "cancel" || e === "complete") && this.modal) {
      const i = document.querySelector(".shepherd-modal-overlay-container");
      i && i.remove();
    }
    Ft(this.focusedElBeforeOpen) && this.focusedElBeforeOpen.focus();
  }
  _setupActiveTour() {
    this.trigger("active", {
      tour: this
    }), Y.activeTour = this;
  }
  _setupModal() {
    this.modal = new Si({
      target: this.options.modalContainer || document.body,
      props: {
        classPrefix: this.classPrefix,
        styles: this.styles
      }
    });
  }
  _skipStep(e, n) {
    const i = this.steps.indexOf(e);
    if (i === this.steps.length - 1)
      this.complete();
    else {
      const o = n ? i + 1 : i - 1;
      this.show(o, n);
    }
  }
  _updateStateBeforeShow() {
    this.currentStep && this.currentStep.hide(), this.isActive() || this._setupActiveTour();
  }
  _setTourID() {
    const e = this.options.tourName || "tour";
    this.id = `${e}--${Nt()}`;
  }
}
const Ti = typeof window > "u";
class pe {
  constructor() {
  }
}
Ti ? Object.assign(Y, {
  Tour: pe,
  Step: pe
}) : Object.assign(Y, {
  Tour: Ai,
  Step: Mt
});
const Me = {
  useModalOverlay: !0,
  keyboardNavigation: !0,
  defaultStepOptions: {
    cancelIcon: {
      enabled: !0
    },
    scrollTo: { behavior: "smooth", block: "center" },
    modalOverlayOpeningPadding: 8,
    modalOverlayOpeningRadius: 4,
    buttons: [{
      action() {
        return this.back();
      },
      text: "上一步"
    }, {
      action() {
        return this.next();
      },
      text: "下一步"
    }]
  }
}, Ci = (t) => {
  t.prototype.$shepherd = (e = {}) => {
    const n = {
      ...Me,
      ...e
    };
    return new Y.Tour(n);
  };
}, Ii = (t = {}) => {
  const e = {
    ...Me,
    ...t
  };
  return new Y.Tour(e);
}, Pi = {
  install: Ci,
  version: "1.0.0"
};
export {
  Pi as default,
  Ii as shepherd
};
