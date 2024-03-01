parcelRequire = (function (e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    w5Hg: [
      function (require, module, exports) {
        "use strict";
        function e(e, t, n) {
          "Tab" === n.key &&
            (n.shiftKey && document.activeElement === e
              ? (n.preventDefault(), t.focus())
              : n.shiftKey ||
                document.activeElement !== t ||
                (n.preventDefault(), e.focus()));
        }
        function t(e) {
          return Array.prototype.slice
            .call(
              e.querySelectorAll(
                'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
              ),
              0
            )
            .filter(function (e) {
              return !e.hasAttribute("disabled");
            });
        }
        function n(e) {
          t(e).forEach(function (e) {
            e.tabIndex = -1;
          });
        }
        function o(e) {
          t(e).forEach(function (e) {
            e.tabIndex = 0;
          });
        }
        Object.defineProperty(exports, "__esModule", {
          value: !0,
        }),
          (exports.trapFocus = e),
          (exports.getFocusableChildren = t),
          (exports.disableAllFocusable = n),
          (exports.enableAllFocusable = o);
      },
      {},
    ],
    jJeo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: !0,
        }),
          (exports.default = void 0);
        var e = require("./focus");
        function t(e, t) {
          return o(e) || n(e, t) || a(e, t) || r();
        }
        function r() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        function a(e, t) {
          if (e) {
            if ("string" == typeof e) return l(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === r && e.constructor && (r = e.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(e)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? l(e, t)
                : void 0
            );
          }
        }
        function l(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, a = new Array(t); r < t; r++) a[r] = e[r];
          return a;
        }
        function n(e, t) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
            var r = [],
              a = !0,
              l = !1,
              n = void 0;
            try {
              for (
                var o, i = e[Symbol.iterator]();
                !(a = (o = i.next()).done) &&
                (r.push(o.value), !t || r.length !== t);
                a = !0
              );
            } catch (s) {
              (l = !0), (n = s);
            } finally {
              try {
                a || null == i.return || i.return();
              } finally {
                if (l) throw n;
              }
            }
            return r;
          }
        }
        function o(e) {
          if (Array.isArray(e)) return e;
        }
        function i(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function s(e, t) {
          for (var r = 0; r < t.length; r++) {
            var a = t[r];
            (a.enumerable = a.enumerable || !1),
              (a.configurable = !0),
              "value" in a && (a.writable = !0),
              Object.defineProperty(e, a.key, a);
          }
        }
        function u(e, t, r) {
          return t && s(e.prototype, t), r && s(e, r), e;
        }
        var c = (function () {
          function r(e) {
            i(this, r),
              (this.overlayElem = e),
              (this.overlayElem.ariaHidden = !0),
              this.refresh();
          }
          return (
            u(r, [
              {
                key: "initFocusableChildren",
                value: function (r) {
                  this.focusableOverlayItems = (0, e.getFocusableChildren)(r);
                  var a = t(this.focusableOverlayItems, 1);
                  (this.firstOverlayItem = a[0]),
                    (this.lastOverlayItem =
                      this.focusableOverlayItems[
                        this.focusableOverlayItems.length - 1
                      ]);
                },
              },
              {
                key: "enableOverlayFocus",
                value: function () {
                  var e = this;
                  this.focusableOverlayItems.forEach(function (e) {
                    e.tabIndex = 0;
                  }),
                    setTimeout(function () {
                      return e.firstOverlayItem.focus();
                    }, 0);
                },
              },
              {
                key: "disableOverlayFocus",
                value: function () {
                  this.focusableOverlayItems.forEach(function (e) {
                    e.tabIndex = -1;
                  });
                },
              },
              {
                key: "isOpen",
                value: function () {
                  return this.overlayElem.classList.contains("overlay-open");
                },
              },
              {
                key: "openOverlay",
                value: function () {
                  this.overlayElem.classList.add("overlay-open"),
                    (this.overlayElem.ariaHidden = !1),
                    (this.overlayElem.scrollTop = 0),
                    document
                      .querySelector("html")
                      .classList.add("u-disable-scroll"),
                    this.enableOverlayFocus();
                },
              },
              {
                key: "closeOverlay",
                value: function () {
                  this.overlayElem.classList.remove("overlay-open"),
                    (this.overlayElem.ariaHidden = !1),
                    document
                      .querySelector("html")
                      .classList.remove("u-disable-scroll"),
                    this.disableOverlayFocus();
                },
              },
              {
                key: "refresh",
                value: function () {
                  this.initFocusableChildren(this.overlayElem),
                    (this.overlayElem.onkeydown = e.trapFocus.bind(
                      null,
                      this.firstOverlayItem,
                      this.lastOverlayItem
                    )),
                    this.isOpen()
                      ? this.firstOverlayItem.focus()
                      : this.disableOverlayFocus();
                },
              },
            ]),
            r
          );
        })();
        exports.default = c;
      },
      {
        "./focus": "w5Hg",
      },
    ],
    XZf8: [
      function (require, module, exports) {
        module.exports = [
          {
            id: 0,
            productName: "Äthiopien",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 690,
              },
              {
                variantName: "1kg",
                weight: 1e3,
                price: 1e3,
              },
              {
                variantName: "5kg",
                weight: 5e3,
                price: 5e3,
              },
            ],
            properties: ["mild", "filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 1,
            productName: "Brasilien",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 880,
              },
              {
                variantName: "1kg",
                weight: 1e3,
                price: 1200,
              },
              {
                variantName: "5kg",
                weight: 5e3,
                price: 6500,
              },
            ],
            properties: ["mild", "filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 2,
            productName: "Costa Rica",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 790,
              },
              {
                variantName: "2kg",
                weight: 1e3,
                price: 2e3,
              },
            ],
            properties: ["filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 3,
            productName: "Brasilien",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 880,
              },
              {
                variantName: "1kg",
                weight: 1e3,
                price: 1200,
              },
              {
                variantName: "5kg",
                weight: 5e3,
                price: 6500,
              },
            ],
            properties: ["mild", "filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 4,
            productName: "Äthiopien",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 690,
              },
              {
                variantName: "1kg",
                weight: 1e3,
                price: 1e3,
              },
              {
                variantName: "5kg",
                weight: 5e3,
                price: 5e3,
              },
              {
                variantName: "10kg",
                weight: 5e3,
                price: 9e3,
              },
            ],
            properties: ["mild", "filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 5,
            productName: "Brasilien",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 880,
              },
              {
                variantName: "1kg",
                weight: 1e3,
                price: 1200,
              },
              {
                variantName: "5kg",
                weight: 5e3,
                price: 6500,
              },
            ],
            properties: ["mild", "filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 6,
            productName: "Äthiopien",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 690,
              },
              {
                variantName: "1kg",
                weight: 1e3,
                price: 1e3,
              },
              {
                variantName: "5kg",
                weight: 5e3,
                price: 5e3,
              },
            ],
            properties: ["mild", "filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 7,
            productName: "Brasilien",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 880,
              },
              {
                variantName: "1kg",
                weight: 1e3,
                price: 1200,
              },
              {
                variantName: "5kg",
                weight: 5e3,
                price: 6500,
              },
            ],
            properties: ["mild", "filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 8,
            productName: "Costa Rica",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 790,
              },
              {
                variantName: "2kg",
                weight: 1e3,
                price: 2e3,
              },
            ],
            properties: ["filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
          {
            id: 9,
            productName: "Brasilien",
            variants: [
              {
                variantName: "500g",
                weight: 500,
                price: 880,
              },
              {
                variantName: "1kg",
                weight: 1e3,
                price: 1200,
              },
              {
                variantName: "5kg",
                weight: 5e3,
                price: 6500,
              },
            ],
            properties: ["mild", "filtered", "ground"],
            description:
              "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft.",
          },
        ];
      },
      {},
    ],
    xLKZ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: !0,
        }),
          (exports.getProduct = u),
          (exports.numOfProducts = f),
          (exports.cartSize = p),
          (exports.getProductData = s),
          (exports.getCartData = l),
          (exports.insertEntry = d),
          (exports.deleteEntry = g),
          (exports.update = v),
          (exports.read = b),
          (exports.readCart = m);
        var t = r(require("../../products.json"));
        function r(t) {
          return t && t.__esModule
            ? t
            : {
                default: t,
              };
        }
        function e(t, r) {
          var e = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            r &&
              (n = n.filter(function (r) {
                return Object.getOwnPropertyDescriptor(t, r).enumerable;
              })),
              e.push.apply(e, n);
          }
          return e;
        }
        function n(t) {
          for (var r = 1; r < arguments.length; r++) {
            var n = null != arguments[r] ? arguments[r] : {};
            r % 2
              ? e(Object(n), !0).forEach(function (r) {
                  o(t, r, n[r]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : e(Object(n)).forEach(function (r) {
                  Object.defineProperty(
                    t,
                    r,
                    Object.getOwnPropertyDescriptor(n, r)
                  );
                });
          }
          return t;
        }
        function o(t, r, e) {
          return (
            r in t
              ? Object.defineProperty(t, r, {
                  value: e,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[r] = e),
            t
          );
        }
        function u(r) {
          for (var e = parseInt(r, 10), n = 0; n < t.default.length; n += 1)
            if (t.default[n].id === e) return t.default[n];
          return null;
        }
        function i() {
          return {
            productList: [],
          };
        }
        function c() {
          var t = localStorage.getItem("cart");
          return t ? JSON.parse(t) : i();
        }
        function a(t) {
          localStorage.setItem("cart", JSON.stringify(t));
        }
        function f() {
          return t.default.length;
        }
        function p() {
          return c().productList.length;
        }
        function s() {
          return t.default;
        }
        function l() {
          return c().productList;
        }
        function d(t) {
          var r = c();
          r.productList.push(t), a(r);
        }
        function g(t) {
          var r = c(),
            e = r.productList.filter(function (r) {
              return !t(r);
            });
          return (
            e.length !== r.productList.length && ((r.productList = e), a(r), !0)
          );
        }
        function v(t, r) {
          var e = c(),
            n = e.productList.filter(r);
          return 0 !== n.length && (n.forEach(t), a(e), !0);
        }
        function h() {
          var t = [];
          return (
            c().productList.forEach(function (r) {
              for (
                var e = u(r.id), n = e.variants, o = 0;
                o < n.length;
                o += 1
              ) {
                var i = n[o];
                if (i.variantName === r.variantName) {
                  t.push({
                    id: r.id,
                    productName: e.productName,
                    description: e.description,
                    properties: e.properties,
                    variantName: i.variantName,
                    price: i.price,
                    weight: i.weight,
                    amount: r.amount,
                  });
                  break;
                }
              }
            }),
            t
          );
        }
        function O(t, r) {
          var e = {};
          return (
            r.length > 0
              ? r.forEach(function (r) {
                  e[r] = t[r];
                })
              : (e = n({}, t)),
            e
          );
        }
        function b() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function () {
                    return !0;
                  };
          return h()
            .filter(r)
            .map(function (r) {
              return O(r, t);
            });
        }
        function m() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function () {
                    return !0;
                  };
          return c()
            .productList.filter(r)
            .map(function (r) {
              return O(r, t);
            });
        }
      },
      {
        "../../products.json": "XZf8",
      },
    ],
    JZqa: [
      function (require, module, exports) {
        module.exports = "/FEND_Coffee_Costa-Rica 2.6fa885df.png";
      },
      {},
    ],
    Zcgp: [function (require, module, exports) {}, {}],
    eRGv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: !0,
        }),
          (exports.getIconsAndProperties = s),
          (exports.createIcons = a),
          (exports.formatPrice = d),
          (exports.getPriceRange = l),
          (exports.showPriceRange = u),
          (exports.generateProductHTML = c),
          (exports.combineInnerHTML = k),
          (exports.insertProductHTML = p);
        var e = o(require("./query")),
          t = r(require("../../img/FEND_Coffee_Costa-Rica 2.png"));
        function r(e) {
          return e && e.__esModule
            ? e
            : {
                default: e,
              };
        }
        function n() {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (n = function () {
              return e;
            }),
            e
          );
        }
        function o(e) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return {
              default: e,
            };
          var t = n();
          if (t && t.has(e)) return t.get(e);
          var r = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if (Object.prototype.hasOwnProperty.call(e, i)) {
              var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
              s && (s.get || s.set)
                ? Object.defineProperty(r, i, s)
                : (r[i] = e[i]);
            }
          return (r.default = e), t && t.set(e, r), r;
        }
        var i = require("fs");
        function s(e) {
          return e.map(function (e) {
            switch (e) {
              case "mild":
                return {
                  icon: '<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M7.5924 17.1096C7.66795 16.0655 6.62495 15.1367 5.2628 15.0351C3.90065 14.9334 2.73517 15.6973 2.65962 16.7413C2.58407 17.7854 3.62707 18.7141 4.98922 18.8158C6.35137 18.9175 7.51685 18.1536 7.5924 17.1096Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M2.80347 16.6425C2.80347 16.6425 4.23724 17.44 5.00344 17.047C5.77343 16.6579 6.31583 16.8235 7.54478 17.3899" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M5.00348 14.982C4.71142 14.0998 5.28796 13.048 6.36519 12.4239C7.55241 11.7342 8.92549 11.9153 9.43755 12.8245C9.94962 13.7338 9.40342 15.0282 8.2162 15.7179C7.92034 15.8912 7.6131 16.0068 7.30966 16.0723" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M9.37685 12.9825C9.37685 12.9825 7.74963 13.1366 7.3286 13.8956C6.90757 14.6546 6.41827 14.7971 5.08691 15.0283" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M4.68118 13.832C5.7723 13.1984 6.27503 12.0064 5.80406 11.1697C5.33309 10.3329 4.06677 10.1682 2.97565 10.8019C1.88453 11.4355 1.3818 12.6274 1.85277 13.4642C2.32374 14.3009 3.59006 14.4656 4.68118 13.832Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M5.75069 11.3181C5.75069 11.3181 4.25244 11.4568 3.86555 12.158C3.47486 12.8592 2.97418 13.0171 1.74902 13.2252" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M3.78232 8.75658C5.03206 8.62011 5.96294 7.73255 5.8615 6.77417C5.76005 5.81579 4.6647 5.1495 3.41496 5.28597C2.16522 5.42245 1.23434 6.31 1.33578 7.26839C1.43722 8.22677 2.53258 8.89306 3.78232 8.75658Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M5.75082 6.88758C5.75082 6.88758 4.32463 6.406 3.69119 6.89143C3.05775 7.37301 2.5381 7.31522 1.33191 7.01087" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M16.4039 17.1226C17.1627 16.1048 17.1645 14.8081 16.408 14.2262C15.6515 13.6443 14.4231 13.9976 13.6643 15.0154C12.9055 16.0331 12.9037 17.3299 13.6602 17.9118C14.4167 18.4937 15.6451 18.1403 16.4039 17.1226Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M16.4169 14.3849C16.4169 14.3849 15.0931 15.113 15.0059 15.9105C14.9187 16.708 14.5166 17.0548 13.4735 17.7367" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M3.03491 14.2L4.35868 15.0976" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M7.57138 17.2743L9.28963 18.4417L15.1423 11.5993C16.5344 9.48423 16.0754 7.14952 13.993 5.7356L13.7844 5.59305C11.702 4.17912 8.86102 4.75702 7.47276 6.87213L5.12866 10.4358" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M3.03491 14.2L4.35868 15.0976" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M7.73828 17.3898L9.0355 18.2682L12.8172 12.5162C13.9361 10.8134 13.481 8.49406 11.8044 7.35753L11.6337 7.24195C9.95721 6.10542 7.6738 6.56774 6.55485 8.27061L5.12866 10.4397" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M14.7554 6.29042C14.7554 6.29042 17.6002 3.82472 17.9226 2.81148C18.245 1.79823 17.4561 1.26656 17.4561 1.26656C17.4561 1.26656 16.724 0.661694 15.8668 1.27427C15.0095 1.88684 13.5416 5.3812 13.5416 5.3812" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n',
                  name: "Mild",
                };
              case "filtered":
                return {
                  icon: '<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M10.6721 18H3.99941C3.21393 18 2.57861 17.3902 2.57861 16.6363V5.505H12.0929V16.6363C12.0929 17.3902 11.4576 18 10.6721 18Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M12.093 3.85669H1C1 4.76582 1.76622 5.50126 2.71342 5.50126H12.0891V3.85669H12.093Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M12.0929 3.85676H2.57861V3.38372C2.57861 2.6298 3.21393 2.02002 3.99941 2.02002H10.6721C11.4576 2.02002 12.0929 2.6298 12.0929 3.38372V3.85676Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M8.11546 2.02H6.04395V1.99413C6.04395 1.44717 6.50599 1 7.0797 1C7.64956 1 8.11546 1.44348 8.11546 1.99413V2.02Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M13.4945 14.8883H12.0968V5.505H13.4945C14.3262 5.505 15 6.15175 15 6.95001V13.4433C15 14.2378 14.3262 14.8883 13.4945 14.8883Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M12.0929 11.0078H2.57861V12.1313H12.0929V11.0078Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M7.07971 5.64917V10.7307" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n',
                  name: "Für Filterkaffee",
                };
              case "ground":
                return {
                  icon: '<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M10.6293 16.4031C11.4588 14.4166 10.0881 11.8761 7.56773 10.7287C5.04732 9.58125 2.33163 10.2615 1.50206 12.248C0.672496 14.2345 2.04319 16.775 4.5636 17.9224C7.08401 19.0699 9.7997 18.3896 10.6293 16.4031Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M1.83435 12.1525C1.83435 12.1525 4.03241 14.7046 5.74906 14.4786C7.46571 14.2527 8.39121 14.9579 10.3542 16.9139" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M7.11121 10.4418C7.13733 8.51309 8.91742 6.86489 11.3767 6.39342C14.0823 5.87519 16.5752 7.1844 16.9521 9.31576C17.329 11.4471 15.4407 13.5941 12.7351 14.1123C12.0596 14.2409 11.3954 14.2565 10.7759 14.1746" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M16.7245 9.58849C16.7245 9.58849 13.5337 8.75465 12.2351 9.94307C10.9326 11.1315 9.91011 11.0691 7.23438 10.5899" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M7.26003 7.96968C9.74949 7.49243 11.4879 5.51491 11.1428 3.55276C10.7978 1.59062 8.49994 0.386875 6.01049 0.864128C3.52103 1.34138 1.78265 3.3189 2.1277 5.28105C2.47275 7.24319 4.77058 8.44693 7.26003 7.96968Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M10.9363 3.80609C10.9363 3.80609 7.99934 3.03848 6.80141 4.13339C5.60349 5.22829 4.54737 5.18543 2.08435 4.74513" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n',
                  name: "gemahlen",
                };
              default:
                return {};
            }
          });
        }
        function a(e) {
          return s(e)
            .map(function (e) {
              return e.icon;
            })
            .join(" ");
        }
        function d(e) {
          var t = Math.floor(e / 100),
            r = e % 100,
            n = r < 10 ? "0".concat(r) : r;
          return "".concat(t, ",").concat(n, "€");
        }
        function l(e) {
          return e.variants.reduce(
            function (e, t) {
              return {
                min: e.min ? Math.min(e.min, t.price) : t.price,
                max: Math.max(e.max, t.price),
              };
            },
            {
              min: 0,
              max: 0,
            }
          );
        }
        function u(e) {
          return "".concat(d(e.min), " - ").concat(d(e.max));
        }
        function c() {
          for (
            var r =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 4,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : [],
              o = e.getProductData().filter(function (e) {
                return !n.includes(e.id);
              }),
              i = o.length,
              s = [],
              d = 0;
            d < i;
            d += r
          ) {
            for (var c = [], k = d; k < Math.min(d + r, i); k += 1) {
              var p = o[k],
                h = document.createElement("A");
              (h.href = "product.html?id=".concat(p.id)),
                (h.classList = ["product"]);
              var m = u(l(p)),
                C = a(p.properties),
                f =
                  '\n        <div class="coffee-img">\n          <img\n            src="'
                    .concat(t.default, '"\n            alt="')
                    .concat(
                      p.productName,
                      ' Kaffee"\n          />\n        </div>\n        <div class="coffee-text">\n          <div class="coffee-text__origins subhead-m">\n            '
                    )
                    .concat(
                      p.productName,
                      '\n          </div>\n          <div class="coffee-text__price-range">\n            '
                    )
                    .concat(
                      m,
                      '\n          </div>\n              <div class="coffee-text__icons">\n                '
                    )
                    .concat(C, "\n              </div>\n        </div>");
              (h.innerHTML = f),
                c.push({
                  product: p,
                  html: h,
                });
            }
            s.push(c);
          }
          return s;
        }
        function k(e) {
          var t = [];
          return (
            e.forEach(function (e) {
              var r = document.createElement("DIV");
              (r.classList = ["product-group"]),
                e.forEach(function (e) {
                  r.appendChild(e.html);
                }),
                t.push(r);
            }),
            t
          );
        }
        function p(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : document.querySelector(".product-display");
          k(e).forEach(function (e) {
            t.appendChild(e);
          });
        }
      },
      {
        "./query": "xLKZ",
        "../../img/FEND_Coffee_Costa-Rica 2.png": "JZqa",
        fs: "Zcgp",
      },
    ],
    kQRC: [
      function (require, module, exports) {
        module.exports = "/Burger Menu close.ecb7365f.svg";
      },
      {},
    ],
    JUJP: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: !0,
        }),
          (exports.addToCart = O),
          (exports.removeFromCart = T),
          (exports.initCart = H);
        var e = i(require("./overlay")),
          t = require("./product-util"),
          n = o(require("./query")),
          a = i(require("../../img/FEND_Coffee_Costa-Rica 2.png")),
          r = i(require("../../img/icons/Burger Menu close.svg"));
        function c() {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (c = function () {
              return e;
            }),
            e
          );
        }
        function o(e) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return {
              default: e,
            };
          var t = c();
          if (t && t.has(e)) return t.get(e);
          var n = {},
            a = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var r in e)
            if (Object.prototype.hasOwnProperty.call(e, r)) {
              var o = a ? Object.getOwnPropertyDescriptor(e, r) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, r, o)
                : (n[r] = e[r]);
            }
          return (n.default = e), t && t.set(e, n), n;
        }
        function i(e) {
          return e && e.__esModule
            ? e
            : {
                default: e,
              };
        }
        var u,
          d = document.querySelector(".open-cart-button"),
          l = document.querySelector(".close-cart-button"),
          m = document.querySelector(".cart__billing"),
          s = new e.default(document.querySelector(".cart-overlay")),
          p = 0;
        function f() {
          s.closeOverlay(), l.classList.add("u-hidden");
        }
        function v(e) {
          e.classList.remove("amount-input--invalid"),
            (e.size = "".concat(e.value).length);
        }
        function h() {
          var e,
            t,
            n,
            a,
            r = document.querySelector(".cart .add-message");
          p
            ? (1 === Math.abs(p)
                ? ((e = "wurde"), (t = "Produkt"))
                : ((e = "wurden"), (t = "Produkte")),
              p < 0
                ? ((n = "aus dem"), (a = "entfernt"))
                : ((n = "zum"), (a = "hinzugefügt")),
              (r.innerHTML = ""
                .concat(Math.abs(p), " ")
                .concat(t, " ")
                .concat(e, " erfolgreich ")
                .concat(n, " Warenkorb ")
                .concat(a, ".")),
              r.classList.remove("u-hidden"))
            : r.classList.add("u-hidden");
          p = 0;
        }
        function N(e) {
          document
            .querySelectorAll(".cart__product-count-label")
            .forEach(function (t) {
              t.innerHTML = 1 === e ? "Produkt" : "Produkte";
            });
        }
        function y(e) {
          e.parentNode.classList.add("cart__product-count--empty"),
            e.parentNode.classList.remove("cart__product-count--nonempty");
        }
        function L(e) {
          e.parentNode.classList.add("cart__product-count--nonempty"),
            e.parentNode.classList.remove("cart__product-count--empty");
        }
        function _(e) {
          var t = document.querySelectorAll(".cart__product-count"),
            n = parseInt(t[0].innerHTML, 10);
          t.forEach(function (t) {
            var a = t;
            (a.innerHTML = n + e), n + e <= 0 ? y(a) : 0 === n && e > 0 && L(a);
          }),
            (p += e),
            s.isOpen() && (h(), N(n + e));
        }
        function E(e) {
          document
            .querySelectorAll(".cart__product-count")
            .forEach(function (t) {
              var n = t;
              (n.innerHTML = e), 0 === e ? y(n) : L(n);
            }),
            N(e);
        }
        function b() {
          E(
            n.getCartData().reduce(function (e, t) {
              return t.amount + e;
            }, 0)
          );
        }
        function g(e, t, a) {
          return (
            !!n.update(
              function (e) {
                e.amount += a;
              },
              function (n) {
                return n.id === e && n.variantName === t;
              }
            ) && (_(a), !0)
          );
        }
        function C(e, n) {
          var c = n,
            o = document.createElement("div");
          o.className = "cart__item";
          var i = document.createElement("div");
          i.className = "cart__item__content";
          var u = document.createElement("img");
          (u.className = "coffee-img"),
            (u.src = a.default),
            (u.alt = "Kaffee ".concat(n.productName));
          var d = document.createElement("div");
          d.className = "coffee-data";
          var l = document.createElement("div");
          l.className = "name-and-price-row";
          var m = document.createElement("p");
          (m.className = "coffee-name"), (m.textContent = n.productName);
          var s = document.createElement("p");
          (s.className = "coffee-price"),
            (s.textContent = (0, t.formatPrice)(n.price)),
            l.appendChild(m),
            l.appendChild(s);
          var p = document.createElement("a");
          (p.className = "product-link"),
            (p.href = "product.html?id=".concat(n.id)),
            (p.textContent = "zum Produkt");
          var f = document.createElement("p");
          (f.className = "variant-name"), (f.textContent = n.variantName);
          var h = document.createElement("hr");
          h.className = "divider";
          var N = document.createElement("div");
          N.className = "amount-container";
          var y = document.createElement("input");
          (y.type = "text"),
            (y.className = "amount-input"),
            (y.ariaLabel = "Menge"),
            (y.value = n.amount),
            (y.size = 1),
            (y.ariaLabel = "Menge von Produkt "
              .concat(n.productName, " ")
              .concat(n.variantName));
          var L = document.createElement("button"),
            _ = document.createElement("button"),
            E = document.createElement("button");
          L.classList.add("product-button--delete"),
            L.classList.add("icon-button"),
            E.classList.add("product-button--increase-amount"),
            E.classList.add("icon-button"),
            _.classList.add("product-button--decrease-amount"),
            _.classList.add("icon-button"),
            (L.ariaDescription = "Entferne Produkt "
              .concat(n.productName, " ")
              .concat(n.variantName)),
            (E.ariaDescription = "Erhöhe Menge von Produkt "
              .concat(n.productName, " ")
              .concat(n.variantName, " um eins")),
            (_.ariaDescription = "Verringere Menge von Produkt "
              .concat(n.productName, " ")
              .concat(n.variantName, " um eins"));
          var b = document.createElement("div");
          (b.className = "button-container"),
            (L.innerHTML = '<img src="'.concat(
              r.default,
              '" alt="Icon Produkt entfernen">'
            )),
            (E.innerHTML = "&rsaquo;"),
            (_.innerHTML = "&lsaquo;"),
            N.appendChild(_),
            N.appendChild(y),
            N.appendChild(E),
            b.appendChild(N),
            b.appendChild(L),
            d.appendChild(l),
            d.appendChild(p),
            d.appendChild(f),
            d.appendChild(b),
            i.appendChild(u),
            i.appendChild(d),
            o.appendChild(i),
            o.appendChild(h),
            e.appendChild(o),
            (L.onclick = T.bind(null, n.id, n.variantName)),
            _.addEventListener("click", function () {
              (c.amount = Math.max(0, n.amount - 1)),
                c.amount <= 0
                  ? T(c.id, c.variantName)
                  : (g(c.id, c.variantName, -1),
                    (y.value = n.amount),
                    q(),
                    v(y));
            }),
            E.addEventListener("click", function () {
              (c.amount += 1),
                g(c.id, c.variantName, 1),
                (y.value = n.amount),
                q(),
                v(y);
            }),
            y.addEventListener("change", function () {
              if (/^\d+$/.test(y.value)) {
                var e = parseInt(y.value, 10);
                e > 0
                  ? (g(c.id, c.variantName, e - n.amount), (c.amount = e), q())
                  : 0 === e && T(c.id, c.variantName),
                  v(y);
              } else y.classList.add("amount-input--invalid");
            });
        }
        function M() {
          var e = document.querySelector(".cart__product-list");
          (e.innerHTML = ""),
            n.read().forEach(function (t) {
              return C(e, t);
            }),
            s.refresh();
        }
        function q() {
          var e = n.read(["price", "amount"]).reduce(function (e, t) {
              return t.price * t.amount + e;
            }, 0),
            a = e > 0 ? 360 : 0,
            r = e + a;
          (m.querySelector(".price-sum").innerHTML = (0, t.formatPrice)(e)),
            (m.querySelector(".shipping").innerHTML = (0, t.formatPrice)(a)),
            (m.querySelector(".total").innerHTML = (0, t.formatPrice)(r));
        }
        function P() {
          (u = function () {
            k(), h(), s.openOverlay(), l.classList.remove("u-hidden");
          }),
            (d.onclick = u);
        }
        function k() {
          M(), q(), P();
        }
        function O(e, t) {
          var a =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
          g(e, t, 1) ||
            (n.insertEntry({
              id: e,
              variantName: t,
              amount: a,
            }),
            _(a)),
            s.isOpen() ? k() : P();
        }
        function T(e, t) {
          var a = n.readCart(["amount"], function (n) {
            return n.id === e && n.variantName === t;
          });
          a &&
            (n.deleteEntry(function (n) {
              return n.id === e && n.variantName === t;
            }),
            _(-a[0].amount),
            s.isOpen() ? k() : P());
        }
        function H() {
          (l.onclick = f), b(), P();
        }
      },
      {
        "./overlay": "jJeo",
        "./product-util": "eRGv",
        "./query": "xLKZ",
        "../../img/FEND_Coffee_Costa-Rica 2.png": "JZqa",
        "../../img/icons/Burger Menu close.svg": "kQRC",
      },
    ],
    RGqg: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: !0,
        }),
          (exports.handleNavigationScrolling = v),
          (exports.default = void 0);
        var e = n(require("./overlay")),
          t = require("./cart");
        function n(e) {
          return e && e.__esModule
            ? e
            : {
                default: e,
              };
        }
        var a,
          s,
          o = document.getElementById("navigation"),
          d = document.getElementById("mobile-menu-button"),
          i = document.querySelector(".nav--overlay"),
          l = document.getElementById("mobile-menu-close-button"),
          r = !0;
        function c() {
          a.openOverlay(),
            l.classList.remove("u-hidden"),
            d.classList.add("u-hidden");
        }
        function u() {
          l.classList.add("u-hidden"),
            d.classList.remove("u-hidden"),
            a.closeOverlay();
        }
        function v() {
          window.pageYOffset && r
            ? (o.classList.remove("nav--transparent"),
              o.classList.add("nav--solid"),
              (r = !1))
            : !window.pageYOffset &&
              s &&
              (o.classList.add("nav--transparent"),
              o.classList.remove("nav--solid"),
              (r = !0));
        }
        function f() {
          (s = null !== document.querySelector(".header--image")) &&
          !window.pageYOffset
            ? o.classList.add("nav--transparent")
            : o.classList.add("nav--solid");
        }
        function m() {
          (d.onclick = c),
            (l.onclick = u),
            f(),
            (a = new e.default(i)),
            (0, t.initCart)();
        }
        var p = m;
        exports.default = p;
      },
      {
        "./overlay": "jJeo",
        "./cart": "JUJP",
      },
    ],
    w8Kf: [
      function (require, module, exports) {
        "use strict";
        var e = r(require("../util/navigation"));
        function t() {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (t = function () {
              return e;
            }),
            e
          );
        }
        function r(e) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return {
              default: e,
            };
          var r = t();
          if (r && r.has(e)) return r.get(e);
          var n = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if (Object.prototype.hasOwnProperty.call(e, i)) {
              var u = o ? Object.getOwnPropertyDescriptor(e, i) : null;
              u && (u.get || u.set)
                ? Object.defineProperty(n, i, u)
                : (n[i] = e[i]);
            }
          return (n.default = e), r && r.set(e, n), n;
        }
        function n() {
          (0, e.handleNavigationScrolling)();
        }
        (window.onscroll = n), (0, e.default)();
      },
      {
        "../util/navigation": "RGqg",
      },
    ],
  },
  {},
  ["w8Kf"],
  null
);
//# sourceMappingURL=/scripts.bfef707d.js.map
