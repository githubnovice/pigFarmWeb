! function(N, f, W) {
	"use strict";
	f.module("ngAnimate", ["ng"]).directive("ngAnimateChildren", function() {
		return function(X, C, g) {
			g = g.ngAnimateChildren, f.isString(g) && 0 === g.length ? C.data("$$ngAnimateChildren", !0) : X.$watch(g, function(f) {
				C.data("$$ngAnimateChildren", !!f)
			})
		}
	}).factory("$$animateReflow", ["$$rAF", "$document", function(f) {
		return function(g) {
			return f(function() {
				g()
			})
		}
	}]).config(["$provide", "$animateProvider", function(X, C) {
		function g(f) {
			for(var n = 0; n < f.length; n++) {
				var g = f[n];
				if(1 == g.nodeType) return g
			}
		}

		function ba(f, n) {
			return g(f) == g(n)
		}
		var u, t = f.noop,
			n = f.forEach,
			da = C.$$selectors,
			aa = f.isArray,
			ea = f.isString,
			ga = f.isObject,
			r = {
				running: !0
			};
		X.decorator("$animate", ["$delegate", "$$q", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", "$templateRequest", "$$jqLite", function(O, N, M, Y, y, H, P, W, Z, Q) {
			function R(a, c) {
				var b = a.data("$$ngAnimateState") || {};
				return c && (b.running = !0, b.structural = !0, a.data("$$ngAnimateState", b)), b.disabled || b.running && b.structural
			}

			function D(a) {
				var c, b = N.defer();
				return b.promise.$$cancelFn = function() {
					c && c()
				}, P.$$postDigest(function() {
					c = a(function() {
						b.resolve()
					})
				}), b.promise
			}

			function I(a) {
				return ga(a) ? (a.tempClasses && ea(a.tempClasses) && (a.tempClasses = a.tempClasses.split(/\s+/)), a) : void 0
			}

			function S(a, c, b) {
				b = b || {};
				var d = {};
				n(b, function(e, a) {
					n(a.split(" "), function(a) {
						d[a] = e
					})
				});
				var h = Object.create(null);
				n((a.attr("class") || "").split(/\s+/), function(e) {
					h[e] = !0
				});
				var f = [],
					l = [];
				return n(c && c.classes || [], function(e, a) {
					var b = h[a],
						c = d[a] || {};
					!1 === e ? (b || "addClass" == c.event) && l.push(a) : !0 === e && (b && "removeClass" != c.event || f.push(a))
				}), 0 < f.length + l.length && [f.join(" "), l.join(" ")]
			}

			function T(a) {
				if(a) {
					var c = [],
						b = {};
					a = a.substr(1).split("."), (Y.transitions || Y.animations) && c.push(M.get(da[""]));
					for(var d = 0; d < a.length; d++) {
						var f = a[d],
							k = da[f];
						k && !b[f] && (c.push(M.get(k)), b[f] = !0)
					}
					return c
				}
			}

			function U(a, c, b, d) {
				function h(e, a) {
					var b = e[a],
						c = e["before" + a.charAt(0).toUpperCase() + a.substr(1)];
					return b || c ? ("leave" == a && (c = b, b = null), u.push({
						event: a,
						fn: b
					}), J.push({
						event: a,
						fn: c
					}), !0) : void 0
				}

				function k(c, l, w) {
					var E = [];
					n(c, function(a) {
						a.fn && E.push(a)
					});
					var m = 0;
					n(E, function(c, f) {
						var p = function() {
							a: {
								if(l) {
									if((l[f] || t)(), ++m < E.length) break a;
									l = null
								}
								w()
							}
						};
						switch(c.event) {
							case "setClass":
								l.push(c.fn(a, e, A, p, d));
								break;
							case "animate":
								l.push(c.fn(a, b, d.from, d.to, p));
								break;
							case "addClass":
								l.push(c.fn(a, e || b, p, d));
								break;
							case "removeClass":
								l.push(c.fn(a, A || b, p, d));
								break;
							default:
								l.push(c.fn(a, p, d))
						}
					}), l && 0 === l.length && w()
				}
				var l = a[0];
				if(l) {
					d && (d.to = d.to || {}, d.from = d.from || {});
					var e, A;
					aa(b) && (e = b[0], A = b[1], e ? A ? b = e + " " + A : (b = e, c = "addClass") : (b = A, c = "removeClass"));
					var w = "setClass" == c,
						E = w || "addClass" == c || "removeClass" == c || "animate" == c,
						p = a.attr("class") + " " + b;
					if(x(p)) {
						var ca = t,
							m = [],
							J = [],
							g = t,
							s = [],
							u = [],
							p = (" " + p).replace(/\s+/g, ".");
						return n(T(p), function(a) {
							!h(a, c) && w && (h(a, "addClass"), h(a, "removeClass"))
						}), {
							node: l,
							event: c,
							className: b,
							isClassBased: E,
							isSetClassOperation: w,
							applyStyles: function() {
								d && a.css(f.extend(d.from || {}, d.to || {}))
							},
							before: function(a) {
								ca = a, k(J, m, function() {
									ca = t, a()
								})
							},
							after: function(a) {
								g = a, k(u, s, function() {
									g = t, a()
								})
							},
							cancel: function() {
								m && (n(m, function(a) {
									(a || t)(!0)
								}), ca(!0)), s && (n(s, function(a) {
									(a || t)(!0)
								}), g(!0))
							}
						}
					}
				}
			}

			function G(a, c, b, d, h, k, l, e) {
				function A(e) {
					var l = "$animate:" + e;
					J && J[l] && 0 < J[l].length && H(function() {
						b.triggerHandler(l, {
							event: a,
							className: c
						})
					})
				}

				function w() {
					A("before")
				}

				function E() {
					A("after")
				}

				function p() {
					p.hasBeenRun || (p.hasBeenRun = !0, k())
				}

				function g() {
					if(!g.hasBeenRun) {
						m && m.applyStyles(), g.hasBeenRun = !0, l && l.tempClasses && n(l.tempClasses, function(a) {
							u.removeClass(b, a)
						});
						var w = b.data("$$ngAnimateState");
						w && (m && m.isClassBased ? B(b, c) : (H(function() {
							var e = b.data("$$ngAnimateState") || {};
							fa == e.index && B(b, c, a)
						}), b.data("$$ngAnimateState", w))), A("close"), e()
					}
				}
				var m = U(b, a, c, l);
				if(!m) return p(), w(), E(), g(), t;
				a = m.event, c = m.className;
				var J = f.element._data(m.node),
					J = J && J.events;
				if(d || (d = h ? h.parent() : b.parent()), z(b, d)) return p(), w(), E(), g(), t;
				d = b.data("$$ngAnimateState") || {};
				var L = d.active || {},
					s = d.totalActive || 0,
					q = d.last;
				if(h = !1, s > 0) {
					if(s = [], m.isClassBased) "setClass" == q.event ? (s.push(q), B(b, c)) : L[c] && (v = L[c], v.event == a ? h = !0 : (s.push(v), B(b, c)));
					else if("leave" == a && L["ng-leave"]) h = !0;
					else {
						for(var v in L) s.push(L[v]);
						d = {}, B(b, !0)
					}
					0 < s.length && n(s, function(a) {
						a.cancel()
					})
				}
				if(!m.isClassBased || m.isSetClassOperation || "animate" == a || h || (h = "addClass" == a == b.hasClass(c)), h) return p(), w(), E(), A("close"), e(), t;
				L = d.active || {}, s = d.totalActive || 0, "leave" == a && b.one("$destroy", function(a) {
					a = f.element(this);
					var e = a.data("$$ngAnimateState");
					e && (e = e.active["ng-leave"]) && (e.cancel(), B(a, "ng-leave"))
				}), u.addClass(b, "ng-animate"), l && l.tempClasses && n(l.tempClasses, function(a) {
					u.addClass(b, a)
				});
				var fa = K++;
				return s++, L[c] = m, b.data("$$ngAnimateState", {
					last: m,
					active: L,
					index: fa,
					totalActive: s
				}), w(), m.before(function(e) {
					var l = b.data("$$ngAnimateState");
					e = e || !l || !l.active[c] || m.isClassBased && l.active[c].event != a, p(), !0 === e ? g() : (E(), m.after(g))
				}), m.cancel
			}

			function q(a) {
				(a = g(a)) && (a = f.isFunction(a.getElementsByClassName) ? a.getElementsByClassName("ng-animate") : a.querySelectorAll(".ng-animate"), n(a, function(a) {
					a = f.element(a), (a = a.data("$$ngAnimateState")) && a.active && n(a.active, function(a) {
						a.cancel()
					})
				}))
			}

			function B(a, c) {
				if(ba(a, y)) r.disabled || (r.running = !1, r.structural = !1);
				else if(c) {
					var b = a.data("$$ngAnimateState") || {},
						d = !0 === c;
					!d && b.active && b.active[c] && (b.totalActive--, delete b.active[c]), (d || !b.totalActive) && (u.removeClass(a, "ng-animate"), a.removeData("$$ngAnimateState"))
				}
			}

			function z(a, c) {
				if(r.disabled) return !0;
				if(ba(a, y)) return r.running;
				var b, d, g;
				do {
					if(0 === c.length) break;
					var k = ba(c, y),
						l = k ? r : c.data("$$ngAnimateState") || {};
					if(l.disabled) return !0;
					k && (g = !0), !1 !== b && (k = c.data("$$ngAnimateChildren"), f.isDefined(k) && (b = k)), d = d || l.running || l.last && !l.last.isClassBased
				} while (c = c.parent());
				return !g || !b && d
			}
			u = Q, y.data("$$ngAnimateState", r);
			var $ = P.$watch(function() {
					return Z.totalPendingRequests
				}, function(a) {
					0 === a && ($(), P.$$postDigest(function() {
						P.$$postDigest(function() {
							r.running = !1
						})
					}))
				}),
				K = 0,
				V = C.classNameFilter(),
				x = V ? function(a) {
					return V.test(a)
				} : function() {
					return !0
				};
			return {
				animate: function(a, c, b, d, h) {
					return d = d || "ng-inline-animate", h = I(h) || {}, h.from = b ? c : null, h.to = b ? b : c, D(function(b) {
						return G("animate", d, f.element(g(a)), null, null, t, h, b)
					})
				},
				enter: function(a, c, b, d) {
					return d = I(d), a = f.element(a), c = c && f.element(c), b = b && f.element(b), R(a, !0), O.enter(a, c, b), D(function(h) {
						return G("enter", "ng-enter", f.element(g(a)), c, b, t, d, h)
					})
				},
				leave: function(a, c) {
					return c = I(c), a = f.element(a), q(a), R(a, !0), D(function(b) {
						return G("leave", "ng-leave", f.element(g(a)), null, null, function() {
							O.leave(a)
						}, c, b)
					})
				},
				move: function(a, c, b, d) {
					return d = I(d), a = f.element(a), c = c && f.element(c), b = b && f.element(b), q(a), R(a, !0), O.move(a, c, b), D(function(h) {
						return G("move", "ng-move", f.element(g(a)), c, b, t, d, h)
					})
				},
				addClass: function(a, c, b) {
					return this.setClass(a, c, [], b)
				},
				removeClass: function(a, c, b) {
					return this.setClass(a, [], c, b)
				},
				setClass: function(a, c, b, d) {
					if(d = I(d), a = f.element(a), a = f.element(g(a)), R(a)) return O.$$setClassImmediately(a, c, b, d);
					var h, k = a.data("$$animateClasses"),
						l = !!k;
					return k || (k = {
						classes: {}
					}), h = k.classes, c = aa(c) ? c : c.split(" "), n(c, function(a) {
						a && a.length && (h[a] = !0)
					}), b = aa(b) ? b : b.split(" "), n(b, function(a) {
						a && a.length && (h[a] = !1)
					}), l ? (d && k.options && (k.options = f.extend(k.options || {}, d)), k.promise) : (a.data("$$animateClasses", k = {
						classes: h,
						options: d
					}), k.promise = D(function(e) {
						var l = a.parent(),
							b = g(a),
							c = b.parentNode;
						if(c && !c.$$NG_REMOVED && !b.$$NG_REMOVED) {
							b = a.data("$$animateClasses"), a.removeData("$$animateClasses");
							var c = a.data("$$ngAnimateState") || {},
								d = S(a, b, c.active);
							return d ? G("setClass", d, a, l, null, function() {
								d[0] && O.$$addClassImmediately(a, d[0]), d[1] && O.$$removeClassImmediately(a, d[1])
							}, b.options, e) : e()
						}
						e()
					}))
				},
				cancel: function(a) {
					a.$$cancelFn()
				},
				enabled: function(a, c) {
					switch(arguments.length) {
						case 2:
							if(a) B(c);
							else {
								var b = c.data("$$ngAnimateState") || {};
								b.disabled = !0, c.data("$$ngAnimateState", b)
							}
							break;
						case 1:
							r.disabled = !a;
							break;
						default:
							a = !r.disabled
					}
					return !!a
				}
			}
		}]), C.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function(r, C, M, Y) {
			function y() {
				b || (b = Y(function() {
					c = [], b = null, x = {}
				}))
			}

			function H(a, e) {
				b && b(), c.push(e), b = Y(function() {
					n(c, function(a) {
						a()
					}), c = [], b = null, x = {}
				})
			}

			function P(a, e) {
				var b = g(a);
				a = f.element(b), k.push(a), b = Date.now() + e, h >= b || (M.cancel(d), h = b, d = M(function() {
					X(k), k = []
				}, e, !1))
			}

			function X(a) {
				n(a, function(a) {
					(a = a.data("$$ngAnimateCSS3Data")) && n(a.closeAnimationFns, function(a) {
						a()
					})
				})
			}

			function Z(a, e) {
				var b = e ? x[e] : null;
				if(!b) {
					var c = 0,
						d = 0,
						f = 0,
						g = 0;
					n(a, function(a) {
						if(1 == a.nodeType) {
							a = r.getComputedStyle(a) || {}, c = Math.max(Q(a[z + "Duration"]), c), d = Math.max(Q(a[z + "Delay"]), d), g = Math.max(Q(a[K + "Delay"]), g);
							var e = Q(a[K + "Duration"]);
							e > 0 && (e *= parseInt(a[K + "IterationCount"], 10) || 1), f = Math.max(e, f)
						}
					}), b = {
						total: 0,
						transitionDelay: d,
						transitionDuration: c,
						animationDelay: g,
						animationDuration: f
					}, e && (x[e] = b)
				}
				return b
			}

			function Q(a) {
				var e = 0;
				return a = ea(a) ? a.split(/\s*,\s*/) : [], n(a, function(a) {
					e = Math.max(parseFloat(a) || 0, e)
				}), e
			}

			function R(b, e, c, d) {
				b = 0 <= ["ng-enter", "ng-leave", "ng-move"].indexOf(c);
				var f, p = e.parent(),
					h = p.data("$$ngAnimateKey");
				h || (p.data("$$ngAnimateKey", ++a), h = a), f = h + "-" + g(e).getAttribute("class");
				var p = f + " " + c,
					h = x[p] ? ++x[p].total : 0,
					m = {};
				if(h > 0) {
					var n = c + "-stagger",
						m = f + " " + n;
					(f = !x[m]) && u.addClass(e, n), m = Z(e, m), f && u.removeClass(e, n)
				}
				u.addClass(e, c);
				var n = e.data("$$ngAnimateCSS3Data") || {},
					k = Z(e, p);
				return f = k.transitionDuration, k = k.animationDuration, b && 0 === f && 0 === k ? (u.removeClass(e, c), !1) : (c = d || b && f > 0, b = k > 0 && 0 < m.animationDelay && 0 === m.animationDuration, e.data("$$ngAnimateCSS3Data", {
					stagger: m,
					cacheKey: p,
					running: n.running || 0,
					itemIndex: h,
					blockTransition: c,
					closeAnimationFns: n.closeAnimationFns || []
				}), p = g(e), c && (I(p, !0), d && e.css(d)), b && (p.style[K + "PlayState"] = "paused"), !0)
			}

			function D(a, e, b, c, d) {
				function f() {
					e.off(D, h), u.removeClass(e, k), u.removeClass(e, t), z && M.cancel(z), G(e, b);
					var c, a = g(e);
					for(c in s) a.style.removeProperty(s[c])
				}

				function h(a) {
					a.stopPropagation();
					var b = a.originalEvent || a;
					a = b.$manualTimeStamp || b.timeStamp || Date.now(), b = parseFloat(b.elapsedTime.toFixed(3)), Math.max(a - H, 0) >= C && b >= x && c()
				}
				var m = g(e);
				if(a = e.data("$$ngAnimateCSS3Data"), -1 != m.getAttribute("class").indexOf(b) && a) {
					var k = "",
						t = "";
					n(b.split(" "), function(a, b) {
						var e = (b > 0 ? " " : "") + a;
						k += e + "-active", t += e + "-pending"
					});
					var s = [],
						q = a.itemIndex,
						v = a.stagger,
						r = 0;
					if(q > 0) {
						r = 0, 0 < v.transitionDelay && 0 === v.transitionDuration && (r = v.transitionDelay * q);
						var y = 0;
						0 < v.animationDelay && 0 === v.animationDuration && (y = v.animationDelay * q, s.push(B + "animation-play-state")), r = Math.round(100 * Math.max(r, y)) / 100
					}
					r || (u.addClass(e, k), a.blockTransition && I(m, !1));
					var F = Z(e, a.cacheKey + " " + k),
						x = Math.max(F.transitionDuration, F.animationDuration);
					if(0 !== x) {
						!r && d && (F.transitionDuration || (e.css("transition", F.animationDuration + "s linear all"), s.push("transition")), e.css(d));
						var q = Math.max(F.transitionDelay, F.animationDelay),
							C = 1e3 * q;
						0 < s.length && (v = m.getAttribute("style") || "", ";" !== v.charAt(v.length - 1) && (v += ";"), m.setAttribute("style", v + " "));
						var z, H = Date.now(),
							D = V + " " + $,
							q = 1e3 * (r + 1.5 * (q + x));
						return r > 0 && (u.addClass(e, t), z = M(function() {
							z = null, 0 < F.transitionDuration && I(m, !1), 0 < F.animationDuration && (m.style[K + "PlayState"] = ""), u.addClass(e, k), u.removeClass(e, t), d && (0 === F.transitionDuration && e.css("transition", F.animationDuration + "s linear all"), e.css(d), s.push("transition"))
						}, 1e3 * r, !1)), e.on(D, h), a.closeAnimationFns.push(function() {
							f(), c()
						}), a.running++, P(e, q), f
					}
					u.removeClass(e, k), G(e, b), c()
				} else c()
			}

			function I(a, b) {
				a.style[z + "Property"] = b ? "none" : ""
			}

			function S(a, b, c, d) {
				return R(a, b, c, d) ? function(a) {
					a && G(b, c)
				} : void 0
			}

			function T(a, b, c, d, f) {
				return b.data("$$ngAnimateCSS3Data") ? D(a, b, c, d, f) : (G(b, c), void d())
			}

			function U(a, b, c, d, f) {
				var g = S(a, b, c, f.from);
				if(g) {
					var h = g;
					return H(b, function() {
							h = T(a, b, c, d, f.to)
						}),
						function(a) {
							(h || t)(a)
						}
				}
				y(), d()
			}

			function G(a, b) {
				u.removeClass(a, b);
				var c = a.data("$$ngAnimateCSS3Data");
				c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData("$$ngAnimateCSS3Data"))
			}

			function q(a, b) {
				var c = "";
				return a = aa(a) ? a : a.split(/\s+/), n(a, function(a, d) {
					a && 0 < a.length && (c += (d > 0 ? " " : "") + a + b)
				}), c
			}
			var z, $, K, V, B = "";
			N.ontransitionend === W && N.onwebkittransitionend !== W ? (B = "-webkit-", z = "WebkitTransition", $ = "webkitTransitionEnd transitionend") : (z = "transition", $ = "transitionend"), N.onanimationend === W && N.onwebkitanimationend !== W ? (B = "-webkit-", K = "WebkitAnimation", V = "webkitAnimationEnd animationend") : (K = "animation", V = "animationend");
			var b, x = {},
				a = 0,
				c = [],
				d = null,
				h = 0,
				k = [];
			return {
				animate: function(a, b, c, d, f, g) {
					return g = g || {}, g.from = c, g.to = d, U("animate", a, b, f, g)
				},
				enter: function(a, b, c) {
					return c = c || {}, U("enter", a, "ng-enter", b, c)
				},
				leave: function(a, b, c) {
					return c = c || {}, U("leave", a, "ng-leave", b, c)
				},
				move: function(a, b, c) {
					return c = c || {}, U("move", a, "ng-move", b, c)
				},
				beforeSetClass: function(a, b, c, d, f) {
					return f = f || {}, b = q(c, "-remove") + " " + q(b, "-add"), (f = S("setClass", a, b, f.from)) ? (H(a, d), f) : (y(), void d())
				},
				beforeAddClass: function(a, b, c, d) {
					return d = d || {}, (b = S("addClass", a, q(b, "-add"), d.from)) ? (H(a, c), b) : (y(), void c())
				},
				beforeRemoveClass: function(a, b, c, d) {
					return d = d || {}, (b = S("removeClass", a, q(b, "-remove"), d.from)) ? (H(a, c), b) : (y(), void c())
				},
				setClass: function(a, b, c, d, f) {
					return f = f || {}, c = q(c, "-remove"), b = q(b, "-add"), T("setClass", a, c + " " + b, d, f.to)
				},
				addClass: function(a, b, c, d) {
					return d = d || {}, T("addClass", a, q(b, "-add"), c, d.to)
				},
				removeClass: function(a, b, c, d) {
					return d = d || {}, T("removeClass", a, q(b, "-remove"), c, d.to)
				}
			}
		}])
	}])
}(window, window.angular);

! function(window) {
	var createModule = function(angular) {
		var module = angular.module("FBAngular", []);
		return module.factory("Fullscreen", ["$document", "$rootScope", function($document, $rootScope) {
			var document = $document[0],
				isKeyboardAvailbleOnFullScreen = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element && Element.ALLOW_KEYBOARD_INPUT,
				emitter = $rootScope.$new();
			$document.on("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange", function() {
				emitter.$emit("FBFullscreen.change", serviceInstance.isEnabled())
			});
			var serviceInstance = {
				$on: angular.bind(emitter, emitter.$on),
				all: function() {
					serviceInstance.enable(document.documentElement)
				},
				enable: function(element) {
					element.requestFullScreen ? element.requestFullScreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ? /Version\/[\d]{1,2}(\.[\d]{1,2}){1}(\.(\d){1,2}){0,1} Safari/.test(navigator.userAgent) ? element.webkitRequestFullscreen() : element.webkitRequestFullscreen(isKeyboardAvailbleOnFullScreen) : element.msRequestFullscreen && element.msRequestFullscreen()
				},
				cancel: function() {
					document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen()
				},
				isEnabled: function() {
					var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
					return fullscreenElement ? !0 : !1
				},
				toggleAll: function() {
					serviceInstance.isEnabled() ? serviceInstance.cancel() : serviceInstance.all()
				},
				isSupported: function() {
					var docElm = document.documentElement,
						requestFullscreen = docElm.requestFullScreen || docElm.mozRequestFullScreen || docElm.webkitRequestFullscreen || docElm.msRequestFullscreen;
					return requestFullscreen ? !0 : !1
				}
			};
			return serviceInstance
		}]), module.directive("fullscreen", ["Fullscreen", function(Fullscreen) {
			return {
				link: function($scope, $element, $attrs) {
					if($attrs.fullscreen) {
						$scope.$watch($attrs.fullscreen, function(value) {
							var isEnabled = Fullscreen.isEnabled();
							value && !isEnabled ? (Fullscreen.enable($element[0]), $element.addClass("isInFullScreen")) : !value && isEnabled && (Fullscreen.cancel(), $element.removeClass("isInFullScreen"))
						});
						var removeFullscreenHandler = Fullscreen.$on("FBFullscreen.change", function(evt, isFullscreenEnabled) {
							isFullscreenEnabled || $scope.$evalAsync(function() {
								$scope.$eval($attrs.fullscreen + "= false"), $element.removeClass("isInFullScreen")
							})
						});
						$scope.$on("$destroy", function() {
							removeFullscreenHandler()
						})
					} else {
						if(void 0 !== $attrs.onlyWatchedProperty) return;
						$element.on("click", function() {
							Fullscreen.enable($element[0])
						})
					}
				}
			}
		}]), module
	};
	"function" == typeof define && define.amd ? define("FBAngular", ["angular"], function(angular) {
		return createModule(angular)
	}) : createModule(window.angular)
}(window);

! function(p, d) {
	"use strict";

	function v(r, h, g) {
		return {
			restrict: "ECA",
			terminal: !0,
			priority: 400,
			transclude: "element",
			link: function(a, c, b, f, y) {
				function z() {
					k && (g.cancel(k), k = null), l && (l.$destroy(), l = null), m && (k = g.leave(m), k.then(function() {
						k = null
					}), m = null)
				}

				function x() {
					var b = r.current && r.current.locals;
					if(d.isDefined(b && b.$template)) {
						var b = a.$new(),
							f = r.current;
						m = y(b, function(b) {
							g.enter(b, null, m || c).then(function() {
								!d.isDefined(t) || t && !a.$eval(t) || h()
							}), z()
						}), l = f.scope = b, l.$emit("$viewContentLoaded"), l.$eval(w)
					} else z()
				}
				var l, m, k, t = b.autoscroll,
					w = b.onload || "";
				a.$on("$routeChangeSuccess", x), x()
			}
		}
	}

	function A(d, h, g) {
		return {
			restrict: "ECA",
			priority: -400,
			link: function(a, c) {
				var b = g.current,
					f = b.locals;
				c.html(f.$template);
				var y = d(c.contents());
				b.controller && (f.$scope = a, f = h(b.controller, f), b.controllerAs && (a[b.controllerAs] = f), c.data("$ngControllerController", f), c.children().data("$ngControllerController", f)), y(a)
			}
		}
	}
	p = d.module("ngRoute", ["ng"]).provider("$route", function() {
		function r(a, c) {
			return d.extend(Object.create(a), c)
		}

		function h(a, d) {
			var b = d.caseInsensitiveMatch,
				f = {
					originalPath: a,
					regexp: a
				},
				g = f.keys = [];
			return a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(a, d, b, c) {
				return a = "?" === c ? c : null, c = "*" === c ? c : null, g.push({
					name: b,
					optional: !!a
				}), d = d || "", "" + (a ? "" : d) + "(?:" + (a ? d : "") + (c && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "")
			}).replace(/([\/$\*])/g, "\\$1"), f.regexp = new RegExp("^" + a + "$", b ? "i" : ""), f
		}
		var g = {};
		this.when = function(a, c) {
			var b = d.copy(c);
			if(d.isUndefined(b.reloadOnSearch) && (b.reloadOnSearch = !0), d.isUndefined(b.caseInsensitiveMatch) && (b.caseInsensitiveMatch = this.caseInsensitiveMatch), g[a] = d.extend(b, a && h(a, b)), a) {
				var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
				g[f] = d.extend({
					redirectTo: a
				}, h(f, b))
			}
			return this
		}, this.caseInsensitiveMatch = !1, this.otherwise = function(a) {
			return "string" == typeof a && (a = {
				redirectTo: a
			}), this.when(null, a), this
		}, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function(a, c, b, f, h, p, x) {
			function l(b) {
				var e = s.current;
				(v = (n = k()) && e && n.$$route === e.$$route && d.equals(n.pathParams, e.pathParams) && !n.reloadOnSearch && !w) || !e && !n || a.$broadcast("$routeChangeStart", n, e).defaultPrevented && b && b.preventDefault()
			}

			function m() {
				var u = s.current,
					e = n;
				v ? (u.params = e.params, d.copy(u.params, b), a.$broadcast("$routeUpdate", u)) : (e || u) && (w = !1, (s.current = e) && e.redirectTo && (d.isString(e.redirectTo) ? c.path(t(e.redirectTo, e.params)).search(e.params).replace() : c.url(e.redirectTo(e.pathParams, c.path(), c.search())).replace()), f.when(e).then(function() {
					if(e) {
						var b, c, a = d.extend({}, e.resolve);
						return d.forEach(a, function(b, e) {
							a[e] = d.isString(b) ? h.get(b) : h.invoke(b, null, null, e)
						}), d.isDefined(b = e.template) ? d.isFunction(b) && (b = b(e.params)) : d.isDefined(c = e.templateUrl) && (d.isFunction(c) && (c = c(e.params)), c = x.getTrustedResourceUrl(c), d.isDefined(c) && (e.loadedTemplateUrl = c, b = p(c))), d.isDefined(b) && (a.$template = b), f.all(a)
					}
				}).then(function(c) {
					e == s.current && (e && (e.locals = c, d.copy(e.params, b)), a.$broadcast("$routeChangeSuccess", e, u))
				}, function(b) {
					e == s.current && a.$broadcast("$routeChangeError", e, u, b)
				}))
			}

			function k() {
				var a, b;
				return d.forEach(g, function(f) {
					var q;
					if(q = !b) {
						var h = c.path();
						q = f.keys;
						var l = {};
						if(f.regexp)
							if(h = f.regexp.exec(h)) {
								for(var k = 1, m = h.length; m > k; ++k) {
									var n = q[k - 1],
										p = h[k];
									n && p && (l[n.name] = p)
								}
								q = l
							} else q = null;
						else q = null;
						q = a = q
					}
					q && (b = r(f, {
						params: d.extend({}, c.search(), a),
						pathParams: a
					}), b.$$route = f)
				}), b || g[null] && r(g[null], {
					params: {},
					pathParams: {}
				})
			}

			function t(a, b) {
				var c = [];
				return d.forEach((a || "").split(":"), function(a, d) {
					if(0 === d) c.push(a);
					else {
						var f = a.match(/(\w+)(?:[?*])?(.*)/),
							g = f[1];
						c.push(b[g]), c.push(f[2] || ""), delete b[g]
					}
				}), c.join("")
			}
			var n, v, w = !1,
				s = {
					routes: g,
					reload: function() {
						w = !0, a.$evalAsync(function() {
							l(), m()
						})
					},
					updateParams: function(a) {
						if(!this.current || !this.current.$$route) throw B("norout");
						var b = {},
							f = this;
						d.forEach(Object.keys(a), function(c) {
							f.current.pathParams[c] || (b[c] = a[c])
						}), a = d.extend({}, this.current.params, a), c.path(t(this.current.$$route.originalPath, a)), c.search(d.extend({}, c.search(), b))
					}
				};
			return a.$on("$locationChangeStart", l), a.$on("$locationChangeSuccess", m), s
		}]
	});
	var B = d.$$minErr("ngRoute");
	p.provider("$routeParams", function() {
		this.$get = function() {
			return {}
		}
	}), p.directive("ngView", v), p.directive("ngView", A), v.$inject = ["$route", "$anchorScroll", "$animate"], A.$inject = ["$compile", "$controller", "$route"]
}(window, window.angular);

! function(n, h, p) {
	"use strict";

	function E(a) {
		var d = [];
		return s(d, h.noop).chars(a), d.join("")
	}

	function g(a) {
		var d = {};
		a = a.split(",");
		var c;
		for(c = 0; c < a.length; c++) d[a[c]] = !0;
		return d
	}

	function F(a, d) {
		function c(a, b, c, l) {
			if(b = h.lowercase(b), t[b])
				for(; f.last() && u[f.last()];) e("", f.last());
			v[b] && f.last() == b && e("", b), (l = w[b] || !!l) || f.push(b);
			var m = {};
			c.replace(G, function(a, b, d, c, e) {
				m[b] = r(d || c || e || "")
			}), d.start && d.start(b, m, l)
		}

		function e(a, b) {
			var e, c = 0;
			if(b = h.lowercase(b))
				for(c = f.length - 1; c >= 0 && f[c] != b; c--);
			if(c >= 0) {
				for(e = f.length - 1; e >= c; e--) d.end && d.end(f[e]);
				f.length = c
			}
		}
		"string" != typeof a && (a = null === a || "undefined" == typeof a ? "" : "" + a);
		var b, k, l, f = [],
			m = a;
		for(f.last = function() {
				return f[f.length - 1]
			}; a;) {
			if(l = "", k = !0, f.last() && x[f.last()] ? (a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + f.last() + "[^>]*>", "i"), function(a, b) {
					return b = b.replace(H, "$1").replace(I, "$1"), d.chars && d.chars(r(b)), ""
				}), e("", f.last())) : (0 === a.indexOf("<!--") ? (b = a.indexOf("--", 4), b >= 0 && a.lastIndexOf("-->", b) === b && (d.comment && d.comment(a.substring(4, b)), a = a.substring(b + 3), k = !1)) : y.test(a) ? (b = a.match(y)) && (a = a.replace(b[0], ""), k = !1) : J.test(a) ? (b = a.match(z)) && (a = a.substring(b[0].length), b[0].replace(z, e), k = !1) : K.test(a) && ((b = a.match(A)) ? (b[4] && (a = a.substring(b[0].length), b[0].replace(A, c)), k = !1) : (l += "<", a = a.substring(1))), k && (b = a.indexOf("<"), l += 0 > b ? a : a.substring(0, b), a = 0 > b ? "" : a.substring(b), d.chars && d.chars(r(l)))), a == m) throw L("badparse", a);
			m = a
		}
		e()
	}

	function r(a) {
		if(!a) return "";
		var d = M.exec(a);
		a = d[1];
		var c = d[3];
		return(d = d[2]) && (q.innerHTML = d.replace(/</g, "&lt;"), d = "textContent" in q ? q.textContent : q.innerText), a + d + c
	}

	function B(a) {
		return a.replace(/&/g, "&amp;").replace(N, function(a) {
			var c = a.charCodeAt(0);
			return a = a.charCodeAt(1), "&#" + (1024 * (c - 55296) + (a - 56320) + 65536) + ";"
		}).replace(O, function(a) {
			return "&#" + a.charCodeAt(0) + ";"
		}).replace(/</g, "&lt;").replace(/>/g, "&gt;")
	}

	function s(a, d) {
		var c = !1,
			e = h.bind(a, a.push);
		return {
			start: function(a, k, f) {
				a = h.lowercase(a), !c && x[a] && (c = a), c || !0 !== C[a] || (e("<"), e(a), h.forEach(k, function(c, f) {
					var k = h.lowercase(f),
						g = "img" === a && "src" === k || "background" === k;
					!0 !== P[k] || !0 === D[k] && !d(c, g) || (e(" "), e(f), e('="'), e(B(c)), e('"'))
				}), e(f ? "/>" : ">"))
			},
			end: function(a) {
				a = h.lowercase(a), c || !0 !== C[a] || (e("</"), e(a), e(">")), a == c && (c = !1)
			},
			chars: function(a) {
				c || e(B(a))
			}
		}
	}
	var L = h.$$minErr("$sanitize"),
		A = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
		z = /^<\/\s*([\w:-]+)[^>]*>/,
		G = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
		K = /^</,
		J = /^<\//,
		H = /\x3c!--(.*?)--\x3e/g,
		y = /<!DOCTYPE([^>]*?)>/i,
		I = /<!\[CDATA\[(.*?)]]\x3e/g,
		N = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
		O = /([^\#-~| |!])/g,
		w = g("area,br,col,hr,img,wbr");
	n = g("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), p = g("rp,rt");
	var v = h.extend({}, p, n),
		t = h.extend({}, n, g("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
		u = h.extend({}, p, g("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
	n = g("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use");
	var x = g("script,style"),
		C = h.extend({}, w, t, u, v, n),
		D = g("background,cite,href,longdesc,src,usemap,xlink:href");
	n = g("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"), p = g("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan");
	var P = h.extend({}, D, p, n),
		q = document.createElement("pre"),
		M = /^(\s*)([\s\S]*?)(\s*)$/;
	h.module("ngSanitize", []).provider("$sanitize", function() {
		this.$get = ["$$sanitizeUri", function(a) {
			return function(d) {
				var c = [];
				return F(d, s(c, function(c, b) {
					return !/^unsafe/.test(a(c, b))
				})), c.join("")
			}
		}]
	}), h.module("ngSanitize").filter("linky", ["$sanitize", function(a) {
		var d = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/,
			c = /^mailto:/;
		return function(e, b) {
			function k(a) {
				a && g.push(E(a))
			}

			function f(a, c) {
				g.push("<a "), h.isDefined(b) && g.push('target="', b, '" '), g.push('href="', a.replace(/"/g, "&quot;"), '">'), k(c), g.push("</a>")
			}
			if(!e) return e;
			for(var m, n, p, l = e, g = []; m = l.match(d);) n = m[0], m[2] || m[4] || (n = (m[3] ? "http://" : "mailto:") + n), p = m.index, k(l.substr(0, p)), f(n, m[0].replace(c, "")), l = l.substring(p + m[0].length);
			return k(l), a(g.join(""))
		}
	}])
}(window, window.angular);

var Skycons;
! function(a) {
	"use strict";

	function b(a, b, c, d) {
		a.beginPath(), a.arc(b, c, d, 0, s, !1), a.fill()
	}

	function c(a, b, c, d, e) {
		a.beginPath(), a.moveTo(b, c), a.lineTo(d, e), a.stroke()
	}

	function d(a, c, d, e, f, g, h, i) {
		var j = Math.cos(c * s),
			k = Math.sin(c * s);
		i -= h, b(a, d - k * f, e + j * g + .5 * i, h + (1 - .5 * j) * i)
	}

	function e(a, b, c, e, f, g, h, i) {
		var j;
		for(j = 5; j--;) d(a, b + j / 5, c, e, f, g, h, i)
	}

	function f(a, b, c, d, f, g, h) {
		b /= 3e4;
		var i = .21 * f,
			j = .12 * f,
			k = .24 * f,
			l = .28 * f;
		a.fillStyle = h, e(a, b, c, d, i, j, k, l), a.globalCompositeOperation = "destination-out", e(a, b, c, d, i, j, k - g, l - g), a.globalCompositeOperation = "source-over"
	}

	function g(a, b, d, e, f, g, h) {
		b /= 12e4;
		var i, j, k, l, m = .25 * f - .5 * g,
			n = .32 * f + .5 * g,
			o = .5 * f - .5 * g;
		for(a.strokeStyle = h, a.lineWidth = g, a.lineCap = "round", a.beginPath(), a.arc(d, e, m, 0, s, !1), a.stroke(), i = 8; i--;) j = (b + i / 8) * s, k = Math.cos(j), l = Math.sin(j), c(a, d + k * n, e + l * n, d + k * o, e + l * o)
	}

	function h(a, b, c, d, e, f, g) {
		b /= 15e3;
		var h = .29 * e - .5 * f,
			i = .05 * e,
			j = Math.cos(b * s),
			k = j * s / -16;
		a.strokeStyle = g, a.lineWidth = f, a.lineCap = "round", c += j * i, a.beginPath(), a.arc(c, d, h, k + s / 8, k + 7 * s / 8, !1), a.arc(c + Math.cos(k) * h * t, d + Math.sin(k) * h * t, h, k + 5 * s / 8, k + 3 * s / 8, !0), a.closePath(), a.stroke()
	}

	function i(a, b, c, d, e, f, g) {
		b /= 1350;
		var h, i, j, k, l = .16 * e,
			m = 11 * s / 12,
			n = 7 * s / 12;
		for(a.fillStyle = g, h = 4; h--;) i = (b + h / 4) % 1, j = c + (h - 1.5) / 1.5 * (1 === h || 2 === h ? -1 : 1) * l, k = d + i * i * e, a.beginPath(), a.moveTo(j, k - 1.5 * f), a.arc(j, k, .75 * f, m, n, !1), a.fill()
	}

	function j(a, b, d, e, f, g, h) {
		b /= 750;
		var i, j, k, l, m = .1875 * f;
		for(a.strokeStyle = h, a.lineWidth = .5 * g, a.lineCap = "round", i = 4; i--;) j = (b + i / 4) % 1, k = Math.floor(d + (i - 1.5) / 1.5 * (1 === i || 2 === i ? -1 : 1) * m) + .5, l = e + j * f, c(a, k, l - 1.5 * g, k, l + 1.5 * g)
	}

	function k(a, b, d, e, f, g, h) {
		b /= 3e3;
		var i, j, k, l, m = .16 * f,
			n = .75 * g,
			o = b * s * .7,
			p = Math.cos(o) * n,
			q = Math.sin(o) * n,
			r = o + s / 3,
			t = Math.cos(r) * n,
			u = Math.sin(r) * n,
			v = o + 2 * s / 3,
			w = Math.cos(v) * n,
			x = Math.sin(v) * n;
		for(a.strokeStyle = h, a.lineWidth = .5 * g, a.lineCap = "round", i = 4; i--;) j = (b + i / 4) % 1, k = d + Math.sin((j + i / 4) * s) * m, l = e + j * f, c(a, k - p, l - q, k + p, l + q), c(a, k - t, l - u, k + t, l + u), c(a, k - w, l - x, k + w, l + x)
	}

	function l(a, b, c, d, f, g, h) {
		b /= 3e4;
		var i = .21 * f,
			j = .06 * f,
			k = .21 * f,
			l = .28 * f;
		a.fillStyle = h, e(a, b, c, d, i, j, k, l), a.globalCompositeOperation = "destination-out", e(a, b, c, d, i, j, k - g, l - g), a.globalCompositeOperation = "source-over"
	}

	function m(a, b, c, d, e, f, g) {
		var h = e / 8,
			i = h / 3,
			j = 2 * i,
			k = b % 1 * s,
			l = Math.cos(k),
			m = Math.sin(k);
		a.fillStyle = g, a.strokeStyle = g, a.lineWidth = f, a.lineCap = "round", a.beginPath(), a.arc(c, d, h, k, k + Math.PI, !1), a.arc(c - i * l, d - i * m, j, k + Math.PI, k, !1), a.arc(c + j * l, d + j * m, i, k + Math.PI, k, !0), a.globalCompositeOperation = "destination-out", a.fill(), a.globalCompositeOperation = "source-over", a.stroke()
	}

	function n(a, b, c, d, e, f, g, h, i) {
		b /= 2500;
		var j, k, l, n, o = u[g],
			p = (b + g - v[g].start) % h,
			q = (b + g - v[g].end) % h,
			r = (b + g) % h;
		if(a.strokeStyle = i, a.lineWidth = f, a.lineCap = "round", 1 > p) {
			if(a.beginPath(), p *= o.length / 2 - 1, j = Math.floor(p), p -= j, j *= 2, j += 2, a.moveTo(c + (o[j - 2] * (1 - p) + o[j] * p) * e, d + (o[j - 1] * (1 - p) + o[j + 1] * p) * e), 1 > q) {
				for(q *= o.length / 2 - 1, k = Math.floor(q), q -= k, k *= 2, k += 2, n = j; n !== k; n += 2) a.lineTo(c + o[n] * e, d + o[n + 1] * e);
				a.lineTo(c + (o[k - 2] * (1 - q) + o[k] * q) * e, d + (o[k - 1] * (1 - q) + o[k + 1] * q) * e)
			} else
				for(n = j; n !== o.length; n += 2) a.lineTo(c + o[n] * e, d + o[n + 1] * e);
			a.stroke()
		} else if(1 > q) {
			for(a.beginPath(), q *= o.length / 2 - 1, k = Math.floor(q), q -= k, k *= 2, k += 2, a.moveTo(c + o[0] * e, d + o[1] * e), n = 2; n !== k; n += 2) a.lineTo(c + o[n] * e, d + o[n + 1] * e);
			a.lineTo(c + (o[k - 2] * (1 - q) + o[k] * q) * e, d + (o[k - 1] * (1 - q) + o[k + 1] * q) * e), a.stroke()
		}
		1 > r && (r *= o.length / 2 - 1, l = Math.floor(r), r -= l, l *= 2, l += 2, m(a, b, c + (o[l - 2] * (1 - r) + o[l] * r) * e, d + (o[l - 1] * (1 - r) + o[l + 1] * r) * e, e, f, i))
	}
	var o, p;
	! function() {
		var b = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame,
			c = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.oCancelAnimationFrame || a.msCancelAnimationFrame;
		b && c ? (o = function(a) {
			function c() {
				d.value = b(c), a()
			}
			var d = {
				value: null
			};
			return c(), d
		}, p = function(a) {
			c(a.value)
		}) : (o = setInterval, p = clearInterval)
	}();
	var q = 500,
		r = .08,
		s = 2 * Math.PI,
		t = 2 / Math.sqrt(2),
		u = [
			[-.75, -.18, -.7219, -.1527, -.6971, -.1225, -.6739, -.091, -.6516, -.0588, -.6298, -.0262, -.6083, .0065, -.5868, .0396, -.5643, .0731, -.5372, .1041, -.5033, .1259, -.4662, .1406, -.4275, .1493, -.3881, .153, -.3487, .1526, -.3095, .1488, -.2708, .1421, -.2319, .1342, -.1943, .1217, -.16, .1025, -.129, .0785, -.1012, .0509, -.0764, .0206, -.0547, -.012, -.0378, -.0472, -.0324, -.0857, -.0389, -.1241, -.0546, -.1599, -.0814, -.1876, -.1193, -.1964, -.1582, -.1935, -.1931, -.1769, -.2157, -.1453, -.229, -.1085, -.2327, -.0697, -.224, -.0317, -.2064, .0033, -.1853, .0362, -.1613, .0672, -.135, .0961, -.1051, .1213, -.0706, .1397, -.0332, .1512, .0053, .158, .0442, .1624, .0833, .1636, .1224, .1615, .1613, .1565, .1999, .15, .2378, .1402, .2749, .1279, .3118, .1147, .3487, .1015, .3858, .0892, .4236, .0787, .4621, .0715, .5012, .0702, .5398, .0766, .5768, .089, .6123, .1055, .6466, .1244, .6805, .144, .7147, .163, .75, .18],
			[-.75, 0, -.7033, .0195, -.6569, .0399, -.6104, .06, -.5634, .0789, -.5155, .0954, -.4667, .1089, -.4174, .1206, -.3676, .1299, -.3174, .1365, -.2669, .1398, -.2162, .1391, -.1658, .1347, -.1157, .1271, -.0661, .1169, -.017, .1046, .0316, .0903, .0791, .0728, .1259, .0534, .1723, .0331, .2188, .0129, .2656, -.0064, .3122, -.0263, .3586, -.0466, .4052, -.0665, .4525, -.0847, .5007, -.1002, .5497, -.113, .5991, -.124, .6491, -.1325, .6994, -.138, .75, -.14]
		],
		v = [{
			start: .36,
			end: .11
		}, {
			start: .56,
			end: .16
		}];
	Skycons = function(a) {
		this.list = [], this.interval = null, this.color = a && a.color ? a.color : "black"
	}, Skycons.CLEAR_DAY = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			f = Math.min(d, e);
		g(a, b, .5 * d, .5 * e, f, f * r, c)
	}, Skycons.CLEAR_NIGHT = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			f = Math.min(d, e);
		h(a, b, .5 * d, .5 * e, f, f * r, c)
	}, Skycons.PARTLY_CLOUDY_DAY = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			h = Math.min(d, e);
		g(a, b, .625 * d, .375 * e, .75 * h, h * r, c), f(a, b, .375 * d, .625 * e, .75 * h, h * r, c)
	}, Skycons.PARTLY_CLOUDY_NIGHT = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			g = Math.min(d, e);
		h(a, b, .667 * d, .375 * e, .75 * g, g * r, c), f(a, b, .375 * d, .625 * e, .75 * g, g * r, c)
	}, Skycons.CLOUDY = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			g = Math.min(d, e);
		f(a, b, .5 * d, .5 * e, g, g * r, c)
	}, Skycons.RAIN = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			g = Math.min(d, e);
		i(a, b, .5 * d, .37 * e, .9 * g, g * r, c), f(a, b, .5 * d, .37 * e, .9 * g, g * r, c)
	}, Skycons.SLEET = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			g = Math.min(d, e);
		j(a, b, .5 * d, .37 * e, .9 * g, g * r, c), f(a, b, .5 * d, .37 * e, .9 * g, g * r, c)
	}, Skycons.SNOW = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			g = Math.min(d, e);
		k(a, b, .5 * d, .37 * e, .9 * g, g * r, c), f(a, b, .5 * d, .37 * e, .9 * g, g * r, c)
	}, Skycons.WIND = function(a, b, c) {
		var d = a.canvas.width,
			e = a.canvas.height,
			f = Math.min(d, e);
		n(a, b, .5 * d, .5 * e, f, f * r, 0, 2, c), n(a, b, .5 * d, .5 * e, f, f * r, 1, 2, c)
	}, Skycons.FOG = function(a, b, d) {
		var e = a.canvas.width,
			f = a.canvas.height,
			g = Math.min(e, f),
			h = g * r;
		l(a, b, .5 * e, .32 * f, .75 * g, h, d), b /= 5e3;
		var i = Math.cos(b * s) * g * .02,
			j = Math.cos((b + .25) * s) * g * .02,
			k = Math.cos((b + .5) * s) * g * .02,
			m = Math.cos((b + .75) * s) * g * .02,
			n = .936 * f,
			o = Math.floor(n - .5 * h) + .5,
			p = Math.floor(n - 2.5 * h) + .5;
		a.strokeStyle = d, a.lineWidth = h, a.lineCap = "round", c(a, i + .2 * e + .5 * h, o, j + .8 * e - .5 * h, o), c(a, k + .2 * e + .5 * h, p, m + .8 * e - .5 * h, p)
	}, Skycons.prototype = {
		add: function(a, b) {
			var c;
			"string" == typeof a && (a = document.getElementById(a)), c = {
				element: a,
				context: a.getContext("2d"),
				drawing: b
			}, this.list.push(c), this.draw(c, q)
		},
		set: function(a, b) {
			var c;
			for("string" == typeof a && (a = document.getElementById(a)), c = this.list.length; c--;)
				if(this.list[c].element === a) return this.list[c].drawing = b, void this.draw(this.list[c], q);
			this.add(a, b)
		},
		remove: function(a) {
			var b;
			for("string" == typeof a && (a = document.getElementById(a)), b = this.list.length; b--;)
				if(this.list[b].element === a) return void this.list.splice(b, 1)
		},
		draw: function(a, b) {
			var c = a.context.canvas;
			a.context.globalCompositeOperation = "destination-out", a.context.fillRect(0, 0, c.width, c.height), a.context.globalCompositeOperation = "source-over", a.drawing(a.context, b, this.color)
		},
		play: function() {
			var a = this;
			this.pause(), this.interval = o(function() {
				var b, c = Date.now();
				for(b = a.list.length; b--;) a.draw(a.list[b], c)
			}, 1e3 / 60)
		},
		pause: function() {
			this.interval && (p(this.interval), this.interval = null)
		}
	}
}(this);
var angularSkycons = angular.module("angular-skycons", []);
angularSkycons.directive("skycon", function() {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			icon: "=",
			size: "=",
			animated: "="
		},
		link: function(a, b, c) {
			var d = document.createElement("canvas");
			d.className = c.class ? c.class : "";
			var e = {};
			e.color = c.color ? c.color : "black";
			var f = new Skycons(e);
			a.$watch("size", function(b) {
				b ? (d.height = b, d.width = b) : (d.height = a.size || 64, d.width = a.size || 64)
			}, !0), f.add(d, a.icon), a.$watch("icon", function() {
				f.set(d, a.icon)
			}, !0), "false" === a.animated || a.animated === !1 ? f.pause() : f.play(), 8 === b[0].nodeType ? b.replaceWith(d) : b[0].appendChild(d), a.$on("$destroy", function() {
				f.remove(d), 0 === f.list.length && f.pause(d)
			})
		}
	}
});

! function(root, factory) {
	"object" == typeof exports ? module.exports = factory(require("angular")) : "function" == typeof define && define.amd ? define(["angular"], factory) : factory(root.angular)
}(this, function(angular) {
	! function(angular) {
		"use strict";
		return angular.module("easypiechart", []).directive("easypiechart", [function() {
			return {
				restrict: "A",
				require: "?ngModel",
				scope: {
					percent: "=",
					options: "="
				},
				link: function(scope, element) {
					scope.percent = scope.percent || 0;
					var options = {
						barColor: "#ef1e25",
						trackColor: "#f9f9f9",
						scaleColor: "#dfe0e0",
						scaleLength: 5,
						lineCap: "round",
						lineWidth: 3,
						size: 110,
						rotate: 0,
						animate: {
							duration: 1e3,
							enabled: !0
						}
					};
					scope.options = angular.extend(options, scope.options);
					var pieChart = new EasyPieChart(element[0], options);
					scope.$watch("percent", function(newVal) {
						pieChart.update(newVal)
					})
				}
			}
		}])
	}(angular);
	var CanvasRenderer = function(el, options) {
			var cachedBackground, canvas = document.createElement("canvas");
			el.appendChild(canvas), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(canvas);
			var ctx = canvas.getContext("2d");
			canvas.width = canvas.height = options.size;
			var scaleBy = 1;
			window.devicePixelRatio > 1 && (scaleBy = window.devicePixelRatio, canvas.style.width = canvas.style.height = [options.size, "px"].join(""), canvas.width = canvas.height = options.size * scaleBy, ctx.scale(scaleBy, scaleBy)), ctx.translate(options.size / 2, options.size / 2), ctx.rotate((-0.5 + options.rotate / 180) * Math.PI);
			var radius = (options.size - options.lineWidth) / 2;
			options.scaleColor && options.scaleLength && (radius -= options.scaleLength + 2), Date.now = Date.now || function() {
				return +new Date
			};
			var drawCircle = function(color, lineWidth, percent) {
					percent = Math.min(Math.max(-1, percent || 0), 1);
					var isNegative = 0 >= percent ? !0 : !1;
					ctx.beginPath(), ctx.arc(0, 0, radius, 0, 2 * Math.PI * percent, isNegative), ctx.strokeStyle = color, ctx.lineWidth = lineWidth, ctx.stroke()
				},
				drawScale = function() {
					var offset, length;
					ctx.lineWidth = 1, ctx.fillStyle = options.scaleColor, ctx.save();
					for(var i = 24; i > 0; --i) i % 6 === 0 ? (length = options.scaleLength, offset = 0) : (length = .6 * options.scaleLength, offset = options.scaleLength - length), ctx.fillRect(-options.size / 2 + offset, 0, length, 1), ctx.rotate(Math.PI / 12);
					ctx.restore()
				},
				reqAnimationFrame = function() {
					return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
						window.setTimeout(callback, 1e3 / 60)
					}
				}(),
				drawBackground = function() {
					options.scaleColor && drawScale(), options.trackColor && drawCircle(options.trackColor, options.trackWidth || options.lineWidth, 1)
				};
			this.getCanvas = function() {
				return canvas
			}, this.getCtx = function() {
				return ctx
			}, this.clear = function() {
				ctx.clearRect(options.size / -2, options.size / -2, options.size, options.size)
			}, this.draw = function(percent) {
				options.scaleColor || options.trackColor ? ctx.getImageData && ctx.putImageData ? cachedBackground ? ctx.putImageData(cachedBackground, 0, 0) : (drawBackground(), cachedBackground = ctx.getImageData(0, 0, options.size * scaleBy, options.size * scaleBy)) : (this.clear(), drawBackground()) : this.clear(), ctx.lineCap = options.lineCap;
				var color;
				color = "function" == typeof options.barColor ? options.barColor(percent) : options.barColor, drawCircle(color, options.lineWidth, percent / 100)
			}.bind(this), this.animate = function(from, to) {
				var startTime = Date.now();
				options.onStart(from, to);
				var animation = function() {
					var process = Math.min(Date.now() - startTime, options.animate.duration),
						currentValue = options.easing(this, process, from, to - from, options.animate.duration);
					this.draw(currentValue), options.onStep(from, to, currentValue), process >= options.animate.duration ? options.onStop(from, to) : reqAnimationFrame(animation)
				}.bind(this);
				reqAnimationFrame(animation)
			}.bind(this)
		},
		EasyPieChart = function(el, opts) {
			var defaultOptions = {
				barColor: "#ef1e25",
				trackColor: "#f9f9f9",
				scaleColor: "#dfe0e0",
				scaleLength: 5,
				lineCap: "round",
				lineWidth: 3,
				trackWidth: void 0,
				size: 110,
				rotate: 0,
				animate: {
					duration: 1e3,
					enabled: !0
				},
				easing: function(x, t, b, c, d) {
					return t /= d / 2, 1 > t ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b
				},
				onStart: function() {},
				onStep: function() {},
				onStop: function() {}
			};
			if("undefined" != typeof CanvasRenderer) defaultOptions.renderer = CanvasRenderer;
			else {
				if("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
				defaultOptions.renderer = SVGRenderer
			}
			var options = {},
				currentValue = 0,
				init = function() {
					this.el = el, this.options = options;
					for(var i in defaultOptions) defaultOptions.hasOwnProperty(i) && (options[i] = opts && "undefined" != typeof opts[i] ? opts[i] : defaultOptions[i], "function" == typeof options[i] && (options[i] = options[i].bind(this)));
					options.easing = "string" == typeof options.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[options.easing]) ? jQuery.easing[options.easing] : defaultOptions.easing, "number" == typeof options.animate && (options.animate = {
						duration: options.animate,
						enabled: !0
					}), "boolean" != typeof options.animate || options.animate || (options.animate = {
						duration: 1e3,
						enabled: options.animate
					}), this.renderer = new options.renderer(el, options), this.renderer.draw(currentValue), el.dataset && el.dataset.percent ? this.update(parseFloat(el.dataset.percent)) : el.getAttribute && el.getAttribute("data-percent") && this.update(parseFloat(el.getAttribute("data-percent")))
				}.bind(this);
			this.update = function(newValue) {
				return newValue = parseFloat(newValue), options.animate.enabled ? this.renderer.animate(currentValue, newValue) : this.renderer.draw(newValue), currentValue = newValue, this
			}.bind(this), this.disableAnimation = function() {
				return options.animate.enabled = !1, this
			}, this.enableAnimation = function() {
				return options.animate.enabled = !0, this
			}, init()
		}
});

! function(a, b) {
	if("function" == typeof define && define.amd) define(["jquery"], b);
	else if("object" == typeof module && module.exports) {
		var c;
		try {
			c = require("jquery")
		} catch(d) {
			c = null
		}
		module.exports = b(c)
	} else a.Slider = b(a.jQuery)
}(this, function(a) {
	var b;
	return function(a) {
			"use strict";

			function b() {}

			function c(a) {
				function c(b) {
					b.prototype.option || (b.prototype.option = function(b) {
						a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
					})
				}

				function e(b, c) {
					a.fn[b] = function(e) {
						if("string" == typeof e) {
							for(var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
								var j = this[h],
									k = a.data(j, b);
								if(k)
									if(a.isFunction(k[e]) && "_" !== e.charAt(0)) {
										var l = k[e].apply(k, g);
										if(void 0 !== l && l !== k) return l
									} else f("no such method '" + e + "' for " + b + " instance");
								else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
							}
							return this
						}
						var m = this.map(function() {
							var d = a.data(this, b);
							return d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d)), a(this)
						});
						return !m || m.length > 1 ? m : m[0]
					}
				}
				if(a) {
					var f = "undefined" == typeof console ? b : function(a) {
						console.error(a)
					};
					return a.bridget = function(a, b) {
						c(b), e(a, b)
					}, a.bridget
				}
			}
			var d = Array.prototype.slice;
			c(a)
		}(a),
		function(a) {
			function c(b, c) {
				function d(a, b) {
					var c = "data-slider-" + b,
						d = a.getAttribute(c);
					try {
						return JSON.parse(d)
					} catch(e) {
						return d
					}
				}
				"string" == typeof b ? this.element = document.querySelector(b) : b instanceof HTMLElement && (this.element = b);
				var e, f, g, h = this.element.style.width,
					i = !1,
					j = this.element.parentNode;
				if(this.sliderElem) i = !0;
				else {
					this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
					var k = document.createElement("div");
					k.className = "slider-track", e = document.createElement("div"), e.className = "slider-selection", f = document.createElement("div"), f.className = "slider-handle min-slider-handle", g = document.createElement("div"), g.className = "slider-handle max-slider-handle", k.appendChild(e), k.appendChild(f), k.appendChild(g);
					var l = function(a) {
							var b = document.createElement("div");
							b.className = "tooltip-arrow";
							var c = document.createElement("div");
							c.className = "tooltip-inner", a.appendChild(b), a.appendChild(c)
						},
						m = document.createElement("div");
					m.className = "tooltip tooltip-main", l(m);
					var n = document.createElement("div");
					n.className = "tooltip tooltip-min", l(n);
					var o = document.createElement("div");
					o.className = "tooltip tooltip-max", l(o), this.sliderElem.appendChild(k), this.sliderElem.appendChild(m), this.sliderElem.appendChild(n), this.sliderElem.appendChild(o), j.insertBefore(this.sliderElem, this.element), this.element.style.display = "none"
				}
				a && (this.$element = a(this.element), this.$sliderElem = a(this.sliderElem)), c = c ? c : {};
				for(var p = Object.keys(this.defaultOptions), q = 0; q < p.length; q++) {
					var r = p[q],
						s = c[r];
					s = "undefined" != typeof s ? s : d(this.element, r), s = null !== s ? s : this.defaultOptions[r], this.options || (this.options = {}), this.options[r] = s
				}
				this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), i === !0 && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "top", "width", "height"].forEach(function(a) {
					this._removeProperty(this.trackSelection, a)
				}, this), [this.handle1, this.handle2].forEach(function(a) {
					this._removeProperty(a, "left"), this._removeProperty(a, "top")
				}, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function(a) {
					this._removeProperty(a, "left"), this._removeProperty(a, "top"), this._removeProperty(a, "margin-left"), this._removeProperty(a, "margin-top"), this._removeClass(a, "right"), this._removeClass(a, "top")
				}, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight", this._addClass(this.tooltip, "right"), this.tooltip.style.left = "100%", this._addClass(this.tooltip_min, "right"), this.tooltip_min.style.left = "100%", this._addClass(this.tooltip_max, "right"), this.tooltip_max.style.left = "100%") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = h, this.options.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this._addClass(this.tooltip, "top"), this.tooltip.style.top = -this.tooltip.outerHeight - 14 + "px", this._addClass(this.tooltip_min, "top"), this.tooltip_min.style.top = -this.tooltip_min.outerHeight - 14 + "px", this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = -this.tooltip_max.outerHeight - 14 + "px"), this.options.value instanceof Array ? this.options.range = !0 : this.options.range && (this.options.value = [this.options.value, this.options.max]), this.trackSelection = e || this.trackSelection, "none" === this.options.selection && this._addClass(this.trackSelection, "hide"), this.handle1 = f || this.handle1, this.handle2 = g || this.handle2, i === !0 && (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"));
				var t = ["round", "triangle", "custom"],
					u = -1 !== t.indexOf(this.options.handle);
				u && (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle)), this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos], this.setValue(this.options.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 0), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.touchCapable ? (this.mousedown = this._mousedown.bind(this), this.sliderElem.addEventListener("touchstart", this.mousedown, !1)) : (this.mousedown = this._mousedown.bind(this), this.sliderElem.addEventListener("mousedown", this.mousedown, !1)), "hide" === this.options.tooltip ? (this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide")) : "always" === this.options.tooltip ? (this._showTooltip(), this._alwaysShowTooltip = !0) : (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1), this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)), this.options.enabled ? this.enable() : this.disable()
			}
			var d = {
				formatInvalidInputErrorMsg: function(a) {
					return "Invalid input value '" + a + "' passed in"
				},
				callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
			};
			if(b = function(a, b) {
					return c.call(this, a, b), this
				}, b.prototype = {
					_init: function() {},
					constructor: b,
					defaultOptions: {
						id: "",
						min: 0,
						max: 10,
						step: 1,
						precision: 0,
						orientation: "horizontal",
						value: 5,
						range: !1,
						selection: "before",
						tooltip: "show",
						tooltip_split: !1,
						handle: "round",
						reversed: !1,
						enabled: !0,
						formatter: function(a) {
							return a instanceof Array ? a[0] + " : " + a[1] : a
						},
						natural_arrow_keys: !1
					},
					over: !1,
					inDrag: !1,
					getValue: function() {
						return this.options.range ? this.options.value : this.options.value[0]
					},
					setValue: function(a, b) {
						a || (a = 0), this.options.value = this._validateInputValue(a);
						var c = this._applyPrecision.bind(this);
						this.options.range ? (this.options.value[0] = c(this.options.value[0]), this.options.value[1] = c(this.options.value[1]), this.options.value[0] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[0])), this.options.value[1] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[1]))) : (this.options.value = c(this.options.value), this.options.value = [Math.max(this.options.min, Math.min(this.options.max, this.options.value))], this._addClass(this.handle2, "hide"), this.options.value[1] = "after" === this.options.selection ? this.options.max : this.options.min), this.diff = this.options.max - this.options.min, this.percentage = this.diff > 0 ? [100 * (this.options.value[0] - this.options.min) / this.diff, 100 * (this.options.value[1] - this.options.min) / this.diff, 100 * this.options.step / this.diff] : [0, 0, 100], this._layout();
						var d = this.options.range ? this.options.value : this.options.value[0];
						return this._setDataVal(d), b === !0 && this._trigger("slide", d), this
					},
					destroy: function() {
						this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), a && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"))
					},
					disable: function() {
						return this.options.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this
					},
					enable: function() {
						return this.options.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this
					},
					toggle: function() {
						return this.options.enabled ? this.disable() : this.enable(), this
					},
					isEnabled: function() {
						return this.options.enabled
					},
					on: function(b, c) {
						return a ? (this.$element.on(b, c), this.$sliderElem.on(b, c)) : this._bindNonQueryEventHandler(b, c), this
					},
					getAttribute: function(a) {
						return a ? this.options[a] : this.options
					},
					setAttribute: function(a, b) {
						return this.options[a] = b, this
					},
					refresh: function() {
						return this._removeSliderEventHandlers(), c.call(this, this.element, this.options), a && a.data(this.element, "slider", this), this
					},
					_removeSliderEventHandlers: function() {
						this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.handle2.removeEventListener("focus", this.handle2Keydown, !1), this.handle2.removeEventListener("blur", this.handle2Keydown, !1), this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.mousedown, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1)
					},
					_bindNonQueryEventHandler: function(a, b) {
						void 0 === this.eventToCallbackMap[a] && (this.eventToCallbackMap[a] = []), this.eventToCallbackMap[a].push(b)
					},
					_cleanUpEventCallbacksMap: function() {
						for(var a = Object.keys(this.eventToCallbackMap), b = 0; b < a.length; b++) {
							var c = a[b];
							this.eventToCallbackMap[c] = null
						}
					},
					_showTooltip: function() {
						this.options.tooltip_split === !1 ? this._addClass(this.tooltip, "in") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in")), this.over = !0
					},
					_hideTooltip: function() {
						this.inDrag === !1 && this.alwaysShowTooltip !== !0 && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this.over = !1
					},
					_layout: function() {
						var a;
						if(a = this.options.reversed ? [100 - this.percentage[0], this.percentage[1]] : [this.percentage[0], this.percentage[1]], this.handle1.style[this.stylePos] = a[0] + "%", this.handle2.style[this.stylePos] = a[1] + "%", "vertical" === this.options.orientation) this.trackSelection.style.top = Math.min(a[0], a[1]) + "%", this.trackSelection.style.height = Math.abs(a[0] - a[1]) + "%";
						else {
							this.trackSelection.style.left = Math.min(a[0], a[1]) + "%", this.trackSelection.style.width = Math.abs(a[0] - a[1]) + "%";
							var b = this.tooltip_min.getBoundingClientRect(),
								c = this.tooltip_max.getBoundingClientRect();
							b.right > c.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = "-30px")
						}
						var d;
						if(this.options.range) {
							d = this.options.formatter(this.options.value), this._setText(this.tooltipInner, d), this.tooltip.style[this.stylePos] = (a[1] + a[0]) / 2 + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px"), "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
							var e = this.options.formatter(this.options.value[0]);
							this._setText(this.tooltipInner_min, e);
							var f = this.options.formatter(this.options.value[1]);
							this._setText(this.tooltipInner_max, f), this.tooltip_min.style[this.stylePos] = a[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_min, "margin-top", -this.tooltip_min.offsetHeight / 2 + "px") : this._css(this.tooltip_min, "margin-left", -this.tooltip_min.offsetWidth / 2 + "px"), this.tooltip_max.style[this.stylePos] = a[1] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_max, "margin-top", -this.tooltip_max.offsetHeight / 2 + "px") : this._css(this.tooltip_max, "margin-left", -this.tooltip_max.offsetWidth / 2 + "px")
						} else d = this.options.formatter(this.options.value[0]), this._setText(this.tooltipInner, d), this.tooltip.style[this.stylePos] = a[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px")
					},
					_removeProperty: function(a, b) {
						a.style.removeProperty ? a.style.removeProperty(b) : a.style.removeAttribute(b)
					},
					_mousedown: function(a) {
						if(!this.options.enabled) return !1;
						this._triggerFocusOnHandle(), this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos];
						var b = this._getPercentage(a);
						if(this.options.range) {
							var c = Math.abs(this.percentage[0] - b),
								d = Math.abs(this.percentage[1] - b);
							this.dragged = d > c ? 0 : 1
						} else this.dragged = 0;
						this.percentage[this.dragged] = this.options.reversed ? 100 - b : b, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this.inDrag = !0;
						var e = this._calculateValue();
						return this._trigger("slideStart", e), this._setDataVal(e), this.setValue(e), this._pauseEvent(a), !0
					},
					_triggerFocusOnHandle: function(a) {
						0 === a && this.handle1.focus(), 1 === a && this.handle2.focus()
					},
					_keydown: function(a, b) {
						if(!this.options.enabled) return !1;
						var c;
						switch(b.keyCode) {
							case 37:
							case 40:
								c = -1;
								break;
							case 39:
							case 38:
								c = 1
						}
						if(c) {
							if(this.options.natural_arrow_keys) {
								var d = "vertical" === this.options.orientation && !this.options.reversed,
									e = "horizontal" === this.options.orientation && this.options.reversed;
								(d || e) && (c = -1 * c)
							}
							var f = c * this.percentage[2],
								g = this.percentage[a] + f;
							g > 100 ? g = 100 : 0 > g && (g = 0), this.dragged = a, this._adjustPercentageForRangeSliders(g), this.percentage[this.dragged] = g, this._layout();
							var h = this._calculateValue();
							return this._trigger("slideStart", h), this._setDataVal(h), this.setValue(h, !0), this._trigger("slideStop", h), this._setDataVal(h), this._pauseEvent(b), !1
						}
					},
					_pauseEvent: function(a) {
						a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.returnValue = !1
					},
					_mousemove: function(a) {
						if(!this.options.enabled) return !1;
						var b = this._getPercentage(a);
						this._adjustPercentageForRangeSliders(b), this.percentage[this.dragged] = this.options.reversed ? 100 - b : b, this._layout();
						var c = this._calculateValue();
						return this.setValue(c, !0), !1
					},
					_adjustPercentageForRangeSliders: function(a) {
						this.options.range && (0 === this.dragged && this.percentage[1] < a ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : 1 === this.dragged && this.percentage[0] > a && (this.percentage[1] = this.percentage[0], this.dragged = 0))
					},
					_mouseup: function() {
						if(!this.options.enabled) return !1;
						this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this.inDrag = !1, this.over === !1 && this._hideTooltip();
						var a = this._calculateValue();
						return this._layout(), this._setDataVal(a), this._trigger("slideStop", a), !1
					},
					_calculateValue: function() {
						var a;
						return this.options.range ? (a = [this.options.min, this.options.max], 0 !== this.percentage[0] && (a[0] = Math.max(this.options.min, this.options.min + Math.round(this.diff * this.percentage[0] / 100 / this.options.step) * this.options.step), a[0] = this._applyPrecision(a[0])), 100 !== this.percentage[1] && (a[1] = Math.min(this.options.max, this.options.min + Math.round(this.diff * this.percentage[1] / 100 / this.options.step) * this.options.step), a[1] = this._applyPrecision(a[1])), this.options.value = a) : (a = this.options.min + Math.round(this.diff * this.percentage[0] / 100 / this.options.step) * this.options.step, a < this.options.min ? a = this.options.min : a > this.options.max && (a = this.options.max), a = parseFloat(a), a = this._applyPrecision(a), this.options.value = [a, this.options.value[1]]), a
					},
					_applyPrecision: function(a) {
						var b = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
						return this._applyToFixedAndParseFloat(a, b)
					},
					_getNumDigitsAfterDecimalPlace: function(a) {
						var b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
						return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
					},
					_applyToFixedAndParseFloat: function(a, b) {
						var c = a.toFixed(b);
						return parseFloat(c)
					},
					_getPercentage: function(a) {
						!this.touchCapable || "touchstart" !== a.type && "touchmove" !== a.type || (a = a.touches[0]);
						var b = 100 * (a[this.mousePos] - this.offset[this.stylePos]) / this.size;
						return b = Math.round(b / this.percentage[2]) * this.percentage[2], Math.max(0, Math.min(100, b))
					},
					_validateInputValue: function(a) {
						if("number" == typeof a) return a;
						if(a instanceof Array) return this._validateArray(a), a;
						throw new Error(d.formatInvalidInputErrorMsg(a))
					},
					_validateArray: function(a) {
						for(var b = 0; b < a.length; b++) {
							var c = a[b];
							if("number" != typeof c) throw new Error(d.formatInvalidInputErrorMsg(c))
						}
					},
					_setDataVal: function(a) {
						var b = "value: '" + a + "'";
						this.element.setAttribute("data", b), this.element.setAttribute("value", a)
					},
					_trigger: function(b, c) {
						c = c || 0 === c ? c : void 0;
						var d = this.eventToCallbackMap[b];
						if(d && d.length)
							for(var e = 0; e < d.length; e++) {
								var f = d[e];
								f(c)
							}
						a && this._triggerJQueryEvent(b, c)
					},
					_triggerJQueryEvent: function(a, b) {
						var c = {
							type: a,
							value: b
						};
						this.$element.trigger(c), this.$sliderElem.trigger(c)
					},
					_unbindJQueryEventHandlers: function() {
						this.$element.off(), this.$sliderElem.off()
					},
					_setText: function(a, b) {
						"undefined" != typeof a.innerText ? a.innerText = b : "undefined" != typeof a.textContent && (a.textContent = b)
					},
					_removeClass: function(a, b) {
						for(var c = b.split(" "), d = a.className, e = 0; e < c.length; e++) {
							var f = c[e],
								g = new RegExp("(?:\\s|^)" + f + "(?:\\s|$)");
							d = d.replace(g, " ")
						}
						a.className = d.trim()
					},
					_addClass: function(a, b) {
						for(var c = b.split(" "), d = a.className, e = 0; e < c.length; e++) {
							var f = c[e],
								g = new RegExp("(?:\\s|^)" + f + "(?:\\s|$)"),
								h = g.test(d);
							h || (d += " " + f)
						}
						a.className = d.trim()
					},
					_offset: function(a) {
						var b = 0,
							c = 0;
						if(a.offsetParent)
							do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
						return {
							left: b,
							top: c
						}
					},
					_css: function(b, c, d) {
						if(a) a.style(b, c, d);
						else {
							var e = c.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(a, b) {
								return b.toUpperCase()
							});
							b.style[e] = d
						}
					}
				}, a) {
				var e = a.fn.slider ? "bootstrapSlider" : "slider";
				a.bridget(e, b)
			}
		}(a), b
});

! function(root, factory) {
	"function" == typeof define && define.amd ? define([], function() {
		return root.returnExportsGlobal = factory()
	}) : "object" == typeof exports ? module.exports = factory() : root.Chartist = factory()
}(this, function() {
	var Chartist = {
		version: "0.5.0"
	};
	return function(window, document, Chartist) {
			"use strict";
			Chartist.noop = function(n) {
				return n
			}, Chartist.alphaNumerate = function(n) {
				return String.fromCharCode(97 + n % 26)
			}, Chartist.extend = function(target) {
				target = target || {};
				var sources = Array.prototype.slice.call(arguments, 1);
				return sources.forEach(function(source) {
					for(var prop in source) target[prop] = "object" != typeof source[prop] || source[prop] instanceof Array ? source[prop] : Chartist.extend(target[prop], source[prop])
				}), target
			}, Chartist.stripUnit = function(value) {
				return "string" == typeof value && (value = value.replace(/[^0-9\+-\.]/g, "")), +value
			}, Chartist.ensureUnit = function(value, unit) {
				return "number" == typeof value && (value += unit), value
			}, Chartist.querySelector = function(query) {
				return query instanceof Node ? query : document.querySelector(query)
			}, Chartist.times = function(length) {
				return Array.apply(null, new Array(length))
			}, Chartist.sum = function(previous, current) {
				return previous + current
			}, Chartist.serialMap = function(arr, cb) {
				var result = [],
					length = Math.max.apply(null, arr.map(function(e) {
						return e.length
					}));
				return Chartist.times(length).forEach(function(e, index) {
					var args = arr.map(function(e) {
						return e[index]
					});
					result[index] = cb.apply(null, args)
				}), result
			}, Chartist.createSvg = function(container, width, height, className) {
				var svg;
				return width = width || "100%", height = height || "100%", svg = container.querySelector("svg"), svg && container.removeChild(svg), svg = new Chartist.Svg("svg").attr({
					width: width,
					height: height
				}).addClass(className).attr({
					style: "width: " + width + "; height: " + height + ";"
				}), container.appendChild(svg._node), svg
			}, Chartist.getDataArray = function(data) {
				for(var array = [], i = 0; i < data.series.length; i++) {
					array[i] = "object" == typeof data.series[i] && void 0 !== data.series[i].data ? data.series[i].data : data.series[i];
					for(var j = 0; j < array[i].length; j++) array[i][j] = +array[i][j]
				}
				return array
			}, Chartist.normalizeDataArray = function(dataArray, length) {
				for(var i = 0; i < dataArray.length; i++)
					if(dataArray[i].length !== length)
						for(var j = dataArray[i].length; length > j; j++) dataArray[i][j] = 0;
				return dataArray
			}, Chartist.orderOfMagnitude = function(value) {
				return Math.floor(Math.log(Math.abs(value)) / Math.LN10)
			}, Chartist.projectLength = function(svg, length, bounds, options) {
				var availableHeight = Chartist.getAvailableHeight(svg, options);
				return length / bounds.range * availableHeight
			}, Chartist.getAvailableHeight = function(svg, options) {
				return Math.max((Chartist.stripUnit(options.height) || svg.height()) - 2 * options.chartPadding - options.axisX.offset, 0)
			}, Chartist.getHighLow = function(dataArray) {
				var i, j, highLow = {
					high: -Number.MAX_VALUE,
					low: Number.MAX_VALUE
				};
				for(i = 0; i < dataArray.length; i++)
					for(j = 0; j < dataArray[i].length; j++) dataArray[i][j] > highLow.high && (highLow.high = dataArray[i][j]), dataArray[i][j] < highLow.low && (highLow.low = dataArray[i][j]);
				return highLow
			}, Chartist.getBounds = function(svg, highLow, options, referenceValue) {
				var i, newMin, newMax, bounds = {
					high: highLow.high,
					low: highLow.low
				};
				bounds.high = +options.high || (0 === options.high ? 0 : bounds.high), bounds.low = +options.low || (0 === options.low ? 0 : bounds.low), bounds.high === bounds.low && (0 === bounds.low ? bounds.high = 1 : bounds.low < 0 ? bounds.high = 0 : bounds.low = 0), (referenceValue || 0 === referenceValue) && (bounds.high = Math.max(referenceValue, bounds.high), bounds.low = Math.min(referenceValue, bounds.low)), bounds.valueRange = bounds.high - bounds.low, bounds.oom = Chartist.orderOfMagnitude(bounds.valueRange), bounds.min = Math.floor(bounds.low / Math.pow(10, bounds.oom)) * Math.pow(10, bounds.oom), bounds.max = Math.ceil(bounds.high / Math.pow(10, bounds.oom)) * Math.pow(10, bounds.oom), bounds.range = bounds.max - bounds.min, bounds.step = Math.pow(10, bounds.oom), bounds.numberOfSteps = Math.round(bounds.range / bounds.step);
				for(var length = Chartist.projectLength(svg, bounds.step, bounds, options), scaleUp = length < options.axisY.scaleMinSpace;;)
					if(scaleUp && Chartist.projectLength(svg, bounds.step, bounds, options) <= options.axisY.scaleMinSpace) bounds.step *= 2;
					else {
						if(scaleUp || !(Chartist.projectLength(svg, bounds.step / 2, bounds, options) >= options.axisY.scaleMinSpace)) break;
						bounds.step /= 2
					}
				for(newMin = bounds.min, newMax = bounds.max, i = bounds.min; i <= bounds.max; i += bounds.step) i + bounds.step < bounds.low && (newMin += bounds.step), i - bounds.step >= bounds.high && (newMax -= bounds.step);
				for(bounds.min = newMin, bounds.max = newMax, bounds.range = bounds.max - bounds.min, bounds.values = [], i = bounds.min; i <= bounds.max; i += bounds.step) bounds.values.push(i);
				return bounds
			}, Chartist.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
				var angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
				return {
					x: centerX + radius * Math.cos(angleInRadians),
					y: centerY + radius * Math.sin(angleInRadians)
				}
			}, Chartist.createChartRect = function(svg, options) {
				var yOffset = options.axisY ? options.axisY.offset : 0,
					xOffset = options.axisX ? options.axisX.offset : 0;
				return {
					x1: options.chartPadding + yOffset,
					y1: Math.max((Chartist.stripUnit(options.height) || svg.height()) - options.chartPadding - xOffset, options.chartPadding),
					x2: Math.max((Chartist.stripUnit(options.width) || svg.width()) - options.chartPadding, options.chartPadding + yOffset),
					y2: options.chartPadding,
					width: function() {
						return this.x2 - this.x1
					},
					height: function() {
						return this.y1 - this.y2
					}
				}
			}, Chartist.createLabel = function(parent, text, attributes, className, supportsForeignObject) {
				if(supportsForeignObject) {
					var content = '<span class="' + className + '">' + text + "</span>";
					return parent.foreignObject(content, attributes)
				}
				return parent.elem("text", attributes, className).text(text)
			}, Chartist.createXAxis = function(chartRect, data, grid, labels, options, eventEmitter, supportsForeignObject) {
				data.labels.forEach(function(value, index) {
					var interpolatedValue = options.axisX.labelInterpolationFnc(value, index),
						width = chartRect.width() / (data.labels.length - (options.fullWidth ? 1 : 0)),
						height = options.axisX.offset,
						pos = chartRect.x1 + width * index;
					if(interpolatedValue || 0 === interpolatedValue) {
						if(options.axisX.showGrid) {
							var gridElement = grid.elem("line", {
								x1: pos,
								y1: chartRect.y1,
								x2: pos,
								y2: chartRect.y2
							}, [options.classNames.grid, options.classNames.horizontal].join(" "));
							eventEmitter.emit("draw", {
								type: "grid",
								axis: "x",
								index: index,
								group: grid,
								element: gridElement,
								x1: pos,
								y1: chartRect.y1,
								x2: pos,
								y2: chartRect.y2
							})
						}
						if(options.axisX.showLabel) {
							var labelPosition = {
									x: pos + options.axisX.labelOffset.x,
									y: chartRect.y1 + options.axisX.labelOffset.y + (supportsForeignObject ? 5 : 20)
								},
								labelElement = Chartist.createLabel(labels, "" + interpolatedValue, {
									x: labelPosition.x,
									y: labelPosition.y,
									width: width,
									height: height,
									style: "overflow: visible;"
								}, [options.classNames.label, options.classNames.horizontal].join(" "), supportsForeignObject);
							eventEmitter.emit("draw", {
								type: "label",
								axis: "x",
								index: index,
								group: labels,
								element: labelElement,
								text: "" + interpolatedValue,
								x: labelPosition.x,
								y: labelPosition.y,
								width: width,
								height: height,
								get space() {
									return window.console.warn("EventEmitter: space is deprecated, use width or height instead."), this.width
								}
							})
						}
					}
				})
			}, Chartist.createYAxis = function(chartRect, bounds, grid, labels, options, eventEmitter, supportsForeignObject) {
				bounds.values.forEach(function(value, index) {
					var interpolatedValue = options.axisY.labelInterpolationFnc(value, index),
						width = options.axisY.offset,
						height = chartRect.height() / bounds.values.length,
						pos = chartRect.y1 - height * index;
					if(interpolatedValue || 0 === interpolatedValue) {
						if(options.axisY.showGrid) {
							var gridElement = grid.elem("line", {
								x1: chartRect.x1,
								y1: pos,
								x2: chartRect.x2,
								y2: pos
							}, [options.classNames.grid, options.classNames.vertical].join(" "));
							eventEmitter.emit("draw", {
								type: "grid",
								axis: "y",
								index: index,
								group: grid,
								element: gridElement,
								x1: chartRect.x1,
								y1: pos,
								x2: chartRect.x2,
								y2: pos
							})
						}
						if(options.axisY.showLabel) {
							var labelPosition = {
									x: options.chartPadding + options.axisY.labelOffset.x + (supportsForeignObject ? -10 : 0),
									y: pos + options.axisY.labelOffset.y + (supportsForeignObject ? -15 : 0)
								},
								labelElement = Chartist.createLabel(labels, "" + interpolatedValue, {
									x: labelPosition.x,
									y: labelPosition.y,
									width: width,
									height: height,
									style: "overflow: visible;"
								}, [options.classNames.label, options.classNames.vertical].join(" "), supportsForeignObject);
							eventEmitter.emit("draw", {
								type: "label",
								axis: "y",
								index: index,
								group: labels,
								element: labelElement,
								text: "" + interpolatedValue,
								x: labelPosition.x,
								y: labelPosition.y,
								width: width,
								height: height,
								get space() {
									return window.console.warn("EventEmitter: space is deprecated, use width or height instead."), this.height
								}
							})
						}
					}
				})
			}, Chartist.projectPoint = function(chartRect, bounds, data, index, options) {
				return {
					x: chartRect.x1 + chartRect.width() / (data.length - (data.length > 1 && options.fullWidth ? 1 : 0)) * index,
					y: chartRect.y1 - chartRect.height() * (data[index] - bounds.min) / (bounds.range + bounds.step)
				}
			}, Chartist.optionsProvider = function(options, responsiveOptions, eventEmitter) {
				function updateCurrentOptions() {
					var previousOptions = currentOptions;
					if(currentOptions = Chartist.extend({}, baseOptions), responsiveOptions)
						for(i = 0; i < responsiveOptions.length; i++) {
							var mql = window.matchMedia(responsiveOptions[i][0]);
							mql.matches && (currentOptions = Chartist.extend(currentOptions, responsiveOptions[i][1]))
						}
					eventEmitter && eventEmitter.emit("optionsChanged", {
						previousOptions: previousOptions,
						currentOptions: currentOptions
					})
				}

				function removeMediaQueryListeners() {
					mediaQueryListeners.forEach(function(mql) {
						mql.removeListener(updateCurrentOptions)
					})
				}
				var currentOptions, i, baseOptions = Chartist.extend({}, options),
					mediaQueryListeners = [];
				if(!window.matchMedia) throw "window.matchMedia not found! Make sure you're using a polyfill.";
				if(responsiveOptions)
					for(i = 0; i < responsiveOptions.length; i++) {
						var mql = window.matchMedia(responsiveOptions[i][0]);
						mql.addListener(updateCurrentOptions), mediaQueryListeners.push(mql)
					}
				return updateCurrentOptions(), {
					get currentOptions() {
						return Chartist.extend({}, currentOptions)
					},
					removeMediaQueryListeners: removeMediaQueryListeners
				}
			}, Chartist.catmullRom2bezier = function(crp, z) {
				for(var d = [], i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
					var p = [{
						x: +crp[i - 2],
						y: +crp[i - 1]
					}, {
						x: +crp[i],
						y: +crp[i + 1]
					}, {
						x: +crp[i + 2],
						y: +crp[i + 3]
					}, {
						x: +crp[i + 4],
						y: +crp[i + 5]
					}];
					z ? i ? iLen - 4 === i ? p[3] = {
						x: +crp[0],
						y: +crp[1]
					} : iLen - 2 === i && (p[2] = {
						x: +crp[0],
						y: +crp[1]
					}, p[3] = {
						x: +crp[2],
						y: +crp[3]
					}) : p[0] = {
						x: +crp[iLen - 2],
						y: +crp[iLen - 1]
					} : iLen - 4 === i ? p[3] = p[2] : i || (p[0] = {
						x: +crp[i],
						y: +crp[i + 1]
					}), d.push([(-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y])
				}
				return d
			}
		}(window, document, Chartist),
		function(window, document, Chartist) {
			"use strict";
			Chartist.EventEmitter = function() {
				function addEventHandler(event, handler) {
					handlers[event] = handlers[event] || [], handlers[event].push(handler)
				}

				function removeEventHandler(event, handler) {
					handlers[event] && (handler ? (handlers[event].splice(handlers[event].indexOf(handler), 1), 0 === handlers[event].length && delete handlers[event]) : delete handlers[event])
				}

				function emit(event, data) {
					handlers[event] && handlers[event].forEach(function(handler) {
						handler(data)
					}), handlers["*"] && handlers["*"].forEach(function(starHandler) {
						starHandler(event, data)
					})
				}
				var handlers = [];
				return {
					addEventHandler: addEventHandler,
					removeEventHandler: removeEventHandler,
					emit: emit
				}
			}
		}(window, document, Chartist),
		function(window, document, Chartist) {
			"use strict";

			function listToArray(list) {
				var arr = [];
				if(list.length)
					for(var i = 0; i < list.length; i++) arr.push(list[i]);
				return arr
			}

			function extend(properties, superProtoOverride) {
				var superProto = superProtoOverride || this.prototype || Chartist.Class,
					proto = Object.create(superProto);
				Chartist.Class.cloneDefinitions(proto, properties);
				var constr = function() {
					var instance, fn = proto.constructor || function() {};
					return instance = this === Chartist ? Object.create(proto) : this, fn.apply(instance, Array.prototype.slice.call(arguments, 0)), instance
				};
				return constr.prototype = proto, constr.super = superProto, constr.extend = this.extend, constr
			}

			function mix(mixProtoArr, properties) {
				if(this !== Chartist.Class) throw new Error("Chartist.Class.mix should only be called on the type and never on an instance!");
				var superPrototypes = [{}].concat(mixProtoArr).map(function(prototype) {
						return prototype instanceof Function ? prototype.prototype : prototype
					}),
					mixedSuperProto = Chartist.Class.cloneDefinitions.apply(void 0, superPrototypes);
				return delete mixedSuperProto.constructor, this.extend(properties, mixedSuperProto)
			}

			function cloneDefinitions() {
				var args = listToArray(arguments),
					target = args[0];
				return args.splice(1, args.length - 1).forEach(function(source) {
					Object.getOwnPropertyNames(source).forEach(function(propName) {
						delete target[propName], Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName))
					})
				}), target
			}
			Chartist.Class = {
				extend: extend,
				mix: mix,
				cloneDefinitions: cloneDefinitions
			}
		}(window, document, Chartist),
		function(window, document, Chartist) {
			"use strict";

			function update(data) {
				return this.data = data || this.data, this.createChart(this.optionsProvider.currentOptions), this
			}

			function detach() {
				return window.removeEventListener("resize", this.resizeListener), this.optionsProvider.removeMediaQueryListeners(), this
			}

			function on(event, handler) {
				return this.eventEmitter.addEventHandler(event, handler), this
			}

			function off(event, handler) {
				return this.eventEmitter.removeEventHandler(event, handler), this
			}

			function initialize() {
				window.addEventListener("resize", this.resizeListener), this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter), this.options.plugins && this.options.plugins.forEach(function(plugin) {
					plugin instanceof Array ? plugin[0](this, plugin[1]) : plugin(this)
				}.bind(this)), this.createChart(this.optionsProvider.currentOptions), this.initializeTimeoutId = void 0
			}

			function Base(query, data, options, responsiveOptions) {
				this.container = Chartist.querySelector(query), this.data = data, this.options = options, this.responsiveOptions = responsiveOptions, this.eventEmitter = Chartist.EventEmitter(), this.supportsForeignObject = Chartist.Svg.isSupported("Extensibility"), this.supportsAnimations = Chartist.Svg.isSupported("AnimationEventsAttribute"), this.resizeListener = function() {
					this.update()
				}.bind(this), this.container && (this.container.__chartist__ && (this.container.__chartist__.initializeTimeoutId ? window.clearTimeout(this.container.__chartist__.initializeTimeoutId) : this.container.__chartist__.detach()), this.container.__chartist__ = this), this.initializeTimeoutId = setTimeout(initialize.bind(this), 0)
			}
			Chartist.Base = Chartist.Class.extend({
				constructor: Base,
				optionsProvider: void 0,
				container: void 0,
				svg: void 0,
				eventEmitter: void 0,
				createChart: function() {
					throw new Error("Base chart type can't be instantiated!")
				},
				update: update,
				detach: detach,
				on: on,
				off: off,
				version: Chartist.version,
				supportsForeignObject: !1
			})
		}(window, document, Chartist),
		function(window, document, Chartist) {
			"use strict";

			function Svg(name, attributes, className, parent, insertFirst) {
				name instanceof SVGElement ? this._node = name : (this._node = document.createElementNS(svgNs, name), "svg" === name && this._node.setAttributeNS(xmlNs, Chartist.xmlNs.qualifiedName, Chartist.xmlNs.uri), attributes && this.attr(attributes), className && this.addClass(className), parent && (insertFirst && parent._node.firstChild ? parent._node.insertBefore(this._node, parent._node.firstChild) : parent._node.appendChild(this._node)))
			}

			function attr(attributes, ns) {
				return "string" == typeof attributes ? ns ? this._node.getAttributeNS(ns, attributes) : this._node.getAttribute(attributes) : (Object.keys(attributes).forEach(function(key) {
					void 0 !== attributes[key] && (ns ? this._node.setAttributeNS(ns, [Chartist.xmlNs.prefix, ":", key].join(""), attributes[key]) : this._node.setAttribute(key, attributes[key]))
				}.bind(this)), this)
			}

			function elem(name, attributes, className, insertFirst) {
				return new Chartist.Svg(name, attributes, className, this, insertFirst)
			}

			function parent() {
				return this._node.parentNode instanceof SVGElement ? new Chartist.Svg(this._node.parentNode) : null
			}

			function root() {
				for(var node = this._node;
					"svg" !== node.nodeName;) node = node.parentNode;
				return new Chartist.Svg(node)
			}

			function querySelector(selector) {
				var foundNode = this._node.querySelector(selector);
				return foundNode ? new Chartist.Svg(foundNode) : null
			}

			function querySelectorAll(selector) {
				var foundNodes = this._node.querySelectorAll(selector);
				return foundNodes.length ? new Chartist.Svg.List(foundNodes) : null
			}

			function foreignObject(content, attributes, className, insertFirst) {
				if("string" == typeof content) {
					var container = document.createElement("div");
					container.innerHTML = content, content = container.firstChild
				}
				content.setAttribute("xmlns", xhtmlNs);
				var fnObj = this.elem("foreignObject", attributes, className, insertFirst);
				return fnObj._node.appendChild(content), fnObj
			}

			function text(t) {
				return this._node.appendChild(document.createTextNode(t)), this
			}

			function empty() {
				for(; this._node.firstChild;) this._node.removeChild(this._node.firstChild);
				return this
			}

			function remove() {
				return this._node.parentNode.removeChild(this._node), this.parent()
			}

			function replace(newElement) {
				return this._node.parentNode.replaceChild(newElement._node, this._node), newElement
			}

			function append(element, insertFirst) {
				return insertFirst && this._node.firstChild ? this._node.insertBefore(element._node, this._node.firstChild) : this._node.appendChild(element._node), this
			}

			function classes() {
				return this._node.getAttribute("class") ? this._node.getAttribute("class").trim().split(/\s+/) : []
			}

			function addClass(names) {
				return this._node.setAttribute("class", this.classes(this._node).concat(names.trim().split(/\s+/)).filter(function(elem, pos, self) {
					return self.indexOf(elem) === pos
				}).join(" ")), this
			}

			function removeClass(names) {
				var removedClasses = names.trim().split(/\s+/);
				return this._node.setAttribute("class", this.classes(this._node).filter(function(name) {
					return -1 === removedClasses.indexOf(name)
				}).join(" ")), this
			}

			function removeAllClasses() {
				return this._node.setAttribute("class", ""), this
			}

			function height() {
				return this._node.clientHeight || Math.round(this._node.getBBox().height) || this._node.parentNode.clientHeight
			}

			function width() {
				return this._node.clientWidth || Math.round(this._node.getBBox().width) || this._node.parentNode.clientWidth
			}

			function animate(animations, guided, eventEmitter) {
				return void 0 === guided && (guided = !0), Object.keys(animations).forEach(function(attribute) {
					function createAnimate(animationDefinition, guided) {
						var animate, timeout, easing, attributeProperties = {};
						animationDefinition.easing && (easing = animationDefinition.easing instanceof Array ? animationDefinition.easing : Chartist.Svg.Easing[animationDefinition.easing], delete animationDefinition.easing), animationDefinition.begin = Chartist.ensureUnit(animationDefinition.begin, "ms"), animationDefinition.dur = Chartist.ensureUnit(animationDefinition.dur, "ms"), easing && (animationDefinition.calcMode = "spline", animationDefinition.keySplines = easing.join(" "), animationDefinition.keyTimes = "0;1"), guided && (animationDefinition.fill = "freeze", attributeProperties[attribute] = animationDefinition.from, this.attr(attributeProperties), timeout = Chartist.stripUnit(animationDefinition.begin || 0), animationDefinition.begin = "indefinite"), animate = this.elem("animate", Chartist.extend({
							attributeName: attribute
						}, animationDefinition)), guided && setTimeout(function() {
							try {
								animate._node.beginElement()
							} catch(err) {
								attributeProperties[attribute] = animationDefinition.to, this.attr(attributeProperties), animate.remove()
							}
						}.bind(this), timeout), eventEmitter && animate._node.addEventListener("beginEvent", function() {
							eventEmitter.emit("animationBegin", {
								element: this,
								animate: animate._node,
								params: animationDefinition
							})
						}.bind(this)), animate._node.addEventListener("endEvent", function() {
							eventEmitter && eventEmitter.emit("animationEnd", {
								element: this,
								animate: animate._node,
								params: animationDefinition
							}), guided && (attributeProperties[attribute] = animationDefinition.to, this.attr(attributeProperties), animate.remove())
						}.bind(this))
					}
					animations[attribute] instanceof Array ? animations[attribute].forEach(function(animationDefinition) {
						createAnimate.bind(this)(animationDefinition, !1)
					}.bind(this)) : createAnimate.bind(this)(animations[attribute], guided)
				}.bind(this)), this
			}

			function SvgList(nodeList) {
				var list = this;
				this.svgElements = [];
				for(var i = 0; i < nodeList.length; i++) this.svgElements.push(new Chartist.Svg(nodeList[i]));
				Object.keys(Chartist.Svg.prototype).filter(function(prototypeProperty) {
					return -1 === ["constructor", "parent", "querySelector", "querySelectorAll", "replace", "append", "classes", "height", "width"].indexOf(prototypeProperty)
				}).forEach(function(prototypeProperty) {
					list[prototypeProperty] = function() {
						var args = Array.prototype.slice.call(arguments, 0);
						return list.svgElements.forEach(function(element) {
							Chartist.Svg.prototype[prototypeProperty].apply(element, args)
						}), list
					}
				})
			}
			var svgNs = "http://www.w3.org/2000/svg",
				xmlNs = "http://www.w3.org/2000/xmlns/",
				xhtmlNs = "http://www.w3.org/1999/xhtml";
			Chartist.xmlNs = {
				qualifiedName: "xmlns:ct",
				prefix: "ct",
				uri: "http://gionkunz.github.com/chartist-js/ct"
			}, Chartist.Svg = Chartist.Class.extend({
				constructor: Svg,
				attr: attr,
				elem: elem,
				parent: parent,
				root: root,
				querySelector: querySelector,
				querySelectorAll: querySelectorAll,
				foreignObject: foreignObject,
				text: text,
				empty: empty,
				remove: remove,
				replace: replace,
				append: append,
				classes: classes,
				addClass: addClass,
				removeClass: removeClass,
				removeAllClasses: removeAllClasses,
				height: height,
				width: width,
				animate: animate
			}), Chartist.Svg.isSupported = function(feature) {
				return document.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#" + feature, "1.1")
			};
			var easingCubicBeziers = {
				easeInSine: [.47, 0, .745, .715],
				easeOutSine: [.39, .575, .565, 1],
				easeInOutSine: [.445, .05, .55, .95],
				easeInQuad: [.55, .085, .68, .53],
				easeOutQuad: [.25, .46, .45, .94],
				easeInOutQuad: [.455, .03, .515, .955],
				easeInCubic: [.55, .055, .675, .19],
				easeOutCubic: [.215, .61, .355, 1],
				easeInOutCubic: [.645, .045, .355, 1],
				easeInQuart: [.895, .03, .685, .22],
				easeOutQuart: [.165, .84, .44, 1],
				easeInOutQuart: [.77, 0, .175, 1],
				easeInQuint: [.755, .05, .855, .06],
				easeOutQuint: [.23, 1, .32, 1],
				easeInOutQuint: [.86, 0, .07, 1],
				easeInExpo: [.95, .05, .795, .035],
				easeOutExpo: [.19, 1, .22, 1],
				easeInOutExpo: [1, 0, 0, 1],
				easeInCirc: [.6, .04, .98, .335],
				easeOutCirc: [.075, .82, .165, 1],
				easeInOutCirc: [.785, .135, .15, .86],
				easeInBack: [.6, -.28, .735, .045],
				easeOutBack: [.175, .885, .32, 1.275],
				easeInOutBack: [.68, -.55, .265, 1.55]
			};
			Chartist.Svg.Easing = easingCubicBeziers, Chartist.Svg.List = Chartist.Class.extend({
				constructor: SvgList
			})
		}(window, document, Chartist),
		function(window, document, Chartist) {
			"use strict";

			function createChart(options) {
				var bounds, seriesGroups = [],
					normalizedData = Chartist.normalizeDataArray(Chartist.getDataArray(this.data), this.data.labels.length);
				this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart), bounds = Chartist.getBounds(this.svg, Chartist.getHighLow(normalizedData), options);
				var chartRect = Chartist.createChartRect(this.svg, options),
					labels = this.svg.elem("g").addClass(options.classNames.labelGroup),
					grid = this.svg.elem("g").addClass(options.classNames.gridGroup);
				Chartist.createXAxis(chartRect, this.data, grid, labels, options, this.eventEmitter, this.supportsForeignObject), Chartist.createYAxis(chartRect, bounds, grid, labels, options, this.eventEmitter, this.supportsForeignObject);
				for(var i = 0; i < this.data.series.length; i++) {
					seriesGroups[i] = this.svg.elem("g"), this.data.series[i].name && seriesGroups[i].attr({
						"series-name": this.data.series[i].name
					}, Chartist.xmlNs.uri), seriesGroups[i].addClass([options.classNames.series, this.data.series[i].className || options.classNames.series + "-" + Chartist.alphaNumerate(i)].join(" "));
					for(var p, point, pathCoordinates = [], j = 0; j < normalizedData[i].length; j++) p = Chartist.projectPoint(chartRect, bounds, normalizedData[i], j, options), pathCoordinates.push(p.x, p.y), options.showPoint && (point = seriesGroups[i].elem("line", {
						x1: p.x,
						y1: p.y,
						x2: p.x + .01,
						y2: p.y
					}, options.classNames.point).attr({
						value: normalizedData[i][j]
					}, Chartist.xmlNs.uri), this.eventEmitter.emit("draw", {
						type: "point",
						value: normalizedData[i][j],
						index: j,
						group: seriesGroups[i],
						element: point,
						x: p.x,
						y: p.y
					}));
					if(options.showLine || options.showArea) {
						var pathElements = ["M" + pathCoordinates[0] + "," + pathCoordinates[1]];
						if(options.lineSmooth && pathCoordinates.length > 4)
							for(var cr = Chartist.catmullRom2bezier(pathCoordinates), k = 0; k < cr.length; k++) pathElements.push("C" + cr[k].join());
						else
							for(var l = 3; l < pathCoordinates.length; l += 2) pathElements.push("L" + pathCoordinates[l - 1] + "," + pathCoordinates[l]);
						if(options.showArea) {
							var areaBase = Math.max(Math.min(options.areaBase, bounds.max), bounds.min),
								areaPathElements = pathElements.slice(),
								areaBaseProjected = Chartist.projectPoint(chartRect, bounds, [areaBase], 0, options);
							areaPathElements.splice(0, 0, "M" + areaBaseProjected.x + "," + areaBaseProjected.y), areaPathElements[1] = "L" + pathCoordinates[0] + "," + pathCoordinates[1], areaPathElements.push("L" + pathCoordinates[pathCoordinates.length - 2] + "," + areaBaseProjected.y);
							var area = seriesGroups[i].elem("path", {
								d: areaPathElements.join("")
							}, options.classNames.area, !0).attr({
								values: normalizedData[i]
							}, Chartist.xmlNs.uri);
							this.eventEmitter.emit("draw", {
								type: "area",
								values: normalizedData[i],
								index: i,
								group: seriesGroups[i],
								element: area
							})
						}
						if(options.showLine) {
							var line = seriesGroups[i].elem("path", {
								d: pathElements.join("")
							}, options.classNames.line, !0).attr({
								values: normalizedData[i]
							}, Chartist.xmlNs.uri);
							this.eventEmitter.emit("draw", {
								type: "line",
								values: normalizedData[i],
								index: i,
								group: seriesGroups[i],
								element: line
							})
						}
					}
				}
				this.eventEmitter.emit("created", {
					bounds: bounds,
					chartRect: chartRect,
					svg: this.svg,
					options: options
				})
			}

			function Line(query, data, options, responsiveOptions) {
				Chartist.Line.super.constructor.call(this, query, data, Chartist.extend({}, defaultOptions, options), responsiveOptions)
			}
			var defaultOptions = {
				axisX: {
					offset: 30,
					labelOffset: {
						x: 0,
						y: 0
					},
					showLabel: !0,
					showGrid: !0,
					labelInterpolationFnc: Chartist.noop
				},
				axisY: {
					offset: 40,
					labelOffset: {
						x: 0,
						y: 0
					},
					showLabel: !0,
					showGrid: !0,
					labelInterpolationFnc: Chartist.noop,
					scaleMinSpace: 20
				},
				width: void 0,
				height: void 0,
				showLine: !0,
				showPoint: !0,
				showArea: !1,
				areaBase: 0,
				lineSmooth: !0,
				low: void 0,
				high: void 0,
				chartPadding: 5,
				fullWidth: !1,
				classNames: {
					chart: "ct-chart-line",
					label: "ct-label",
					labelGroup: "ct-labels",
					series: "ct-series",
					line: "ct-line",
					point: "ct-point",
					area: "ct-area",
					grid: "ct-grid",
					gridGroup: "ct-grids",
					vertical: "ct-vertical",
					horizontal: "ct-horizontal"
				}
			};
			Chartist.Line = Chartist.Base.extend({
				constructor: Line,
				createChart: createChart
			})
		}(window, document, Chartist),
		function(window, document, Chartist) {
			"use strict";

			function createChart(options) {
				var bounds, highLow, seriesGroups = [],
					normalizedData = Chartist.normalizeDataArray(Chartist.getDataArray(this.data), this.data.labels.length);
				if(this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart), options.stackBars) {
					var serialSums = Chartist.serialMap(normalizedData, function() {
						return Array.prototype.slice.call(arguments).reduce(Chartist.sum, 0)
					});
					highLow = Chartist.getHighLow([serialSums])
				} else highLow = Chartist.getHighLow(normalizedData);
				bounds = Chartist.getBounds(this.svg, highLow, options, 0);
				var chartRect = Chartist.createChartRect(this.svg, options),
					labels = this.svg.elem("g").addClass(options.classNames.labelGroup),
					grid = this.svg.elem("g").addClass(options.classNames.gridGroup),
					zeroPoint = Chartist.projectPoint(chartRect, bounds, [0], 0, options),
					stackedBarValues = [];
				Chartist.createXAxis(chartRect, this.data, grid, labels, options, this.eventEmitter, this.supportsForeignObject), Chartist.createYAxis(chartRect, bounds, grid, labels, options, this.eventEmitter, this.supportsForeignObject);
				for(var i = 0; i < this.data.series.length; i++) {
					var biPol = i - (this.data.series.length - 1) / 2,
						periodHalfWidth = chartRect.width() / (normalizedData[i].length - (options.fullWidth ? 1 : 0)) / 2;
					seriesGroups[i] = this.svg.elem("g"), this.data.series[i].name && seriesGroups[i].attr({
						"series-name": this.data.series[i].name
					}, Chartist.xmlNs.uri), seriesGroups[i].addClass([options.classNames.series, this.data.series[i].className || options.classNames.series + "-" + Chartist.alphaNumerate(i)].join(" "));
					for(var j = 0; j < normalizedData[i].length; j++) {
						var bar, previousStack, y1, y2, p = Chartist.projectPoint(chartRect, bounds, normalizedData[i], j, options);
						p.x += options.centerBars ? periodHalfWidth : 0, p.x += options.stackBars ? 0 : biPol * options.seriesBarDistance, previousStack = stackedBarValues[j] || zeroPoint.y, stackedBarValues[j] = previousStack - (zeroPoint.y - p.y), y1 = options.stackBars ? previousStack : zeroPoint.y, y2 = options.stackBars ? stackedBarValues[j] : p.y, bar = seriesGroups[i].elem("line", {
							x1: p.x,
							y1: y1,
							x2: p.x,
							y2: y2
						}, options.classNames.bar).attr({
							value: normalizedData[i][j]
						}, Chartist.xmlNs.uri), this.eventEmitter.emit("draw", {
							type: "bar",
							value: normalizedData[i][j],
							index: j,
							group: seriesGroups[i],
							element: bar,
							x1: p.x,
							y1: y1,
							x2: p.x,
							y2: y2
						})
					}
				}
				this.eventEmitter.emit("created", {
					bounds: bounds,
					chartRect: chartRect,
					svg: this.svg,
					options: options
				})
			}

			function Bar(query, data, options, responsiveOptions) {
				Chartist.Bar.super.constructor.call(this, query, data, Chartist.extend({}, defaultOptions, options), responsiveOptions)
			}
			var defaultOptions = {
				axisX: {
					offset: 30,
					labelOffset: {
						x: 0,
						y: 0
					},
					showLabel: !0,
					showGrid: !0,
					labelInterpolationFnc: Chartist.noop
				},
				axisY: {
					offset: 40,
					labelOffset: {
						x: 0,
						y: 0
					},
					showLabel: !0,
					showGrid: !0,
					labelInterpolationFnc: Chartist.noop,
					scaleMinSpace: 20
				},
				width: void 0,
				height: void 0,
				high: void 0,
				low: void 0,
				chartPadding: 5,
				seriesBarDistance: 15,
				fullWidth: !1,
				centerBars: !0,
				stackBars: !1,
				classNames: {
					chart: "ct-chart-bar",
					label: "ct-label",
					labelGroup: "ct-labels",
					series: "ct-series",
					bar: "ct-bar",
					grid: "ct-grid",
					gridGroup: "ct-grids",
					vertical: "ct-vertical",
					horizontal: "ct-horizontal"
				}
			};
			Chartist.Bar = Chartist.Base.extend({
				constructor: Bar,
				createChart: createChart
			})
		}(window, document, Chartist),
		function(window, document, Chartist) {
			"use strict";

			function determineAnchorPosition(center, label, direction) {
				var toTheRight = label.x > center.x;
				return toTheRight && "explode" === direction || !toTheRight && "implode" === direction ? "start" : toTheRight && "implode" === direction || !toTheRight && "explode" === direction ? "end" : "middle"
			}

			function createChart(options) {
				var chartRect, radius, labelRadius, totalDataSum, seriesGroups = [],
					startAngle = options.startAngle,
					dataArray = Chartist.getDataArray(this.data);
				this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart), chartRect = Chartist.createChartRect(this.svg, options, 0, 0), radius = Math.min(chartRect.width() / 2, chartRect.height() / 2), totalDataSum = options.total || dataArray.reduce(function(previousValue, currentValue) {
					return previousValue + currentValue
				}, 0), radius -= options.donut ? options.donutWidth / 2 : 0, labelRadius = options.donut ? radius : radius / 2, labelRadius += options.labelOffset;
				for(var center = {
						x: chartRect.x1 + chartRect.width() / 2,
						y: chartRect.y2 + chartRect.height() / 2
					}, hasSingleValInSeries = 1 === this.data.series.filter(function(val) {
						return 0 !== val
					}).length, i = 0; i < this.data.series.length; i++) {
					seriesGroups[i] = this.svg.elem("g", null, null, !0), this.data.series[i].name && seriesGroups[i].attr({
						"series-name": this.data.series[i].name
					}, Chartist.xmlNs.uri), seriesGroups[i].addClass([options.classNames.series, this.data.series[i].className || options.classNames.series + "-" + Chartist.alphaNumerate(i)].join(" "));
					var endAngle = startAngle + dataArray[i] / totalDataSum * 360;
					endAngle - startAngle === 360 && (endAngle -= .01);
					var start = Chartist.polarToCartesian(center.x, center.y, radius, startAngle - (0 === i || hasSingleValInSeries ? 0 : .2)),
						end = Chartist.polarToCartesian(center.x, center.y, radius, endAngle),
						arcSweep = 180 >= endAngle - startAngle ? "0" : "1",
						d = ["M", end.x, end.y, "A", radius, radius, 0, arcSweep, 0, start.x, start.y];
					options.donut === !1 && d.push("L", center.x, center.y);
					var path = seriesGroups[i].elem("path", {
						d: d.join(" ")
					}, options.classNames.slice + (options.donut ? " " + options.classNames.donut : ""));
					if(path.attr({
							value: dataArray[i]
						}, Chartist.xmlNs.uri), options.donut === !0 && path.attr({
							style: "stroke-width: " + +options.donutWidth + "px"
						}), this.eventEmitter.emit("draw", {
							type: "slice",
							value: dataArray[i],
							totalDataSum: totalDataSum,
							index: i,
							group: seriesGroups[i],
							element: path,
							center: center,
							radius: radius,
							startAngle: startAngle,
							endAngle: endAngle
						}), options.showLabel) {
						var labelPosition = Chartist.polarToCartesian(center.x, center.y, labelRadius, startAngle + (endAngle - startAngle) / 2),
							interpolatedValue = options.labelInterpolationFnc(this.data.labels ? this.data.labels[i] : dataArray[i], i),
							labelElement = seriesGroups[i].elem("text", {
								dx: labelPosition.x,
								dy: labelPosition.y,
								"text-anchor": determineAnchorPosition(center, labelPosition, options.labelDirection)
							}, options.classNames.label).text("" + interpolatedValue);
						this.eventEmitter.emit("draw", {
							type: "label",
							index: i,
							group: seriesGroups[i],
							element: labelElement,
							text: "" + interpolatedValue,
							x: labelPosition.x,
							y: labelPosition.y
						})
					}
					startAngle = endAngle
				}
				this.eventEmitter.emit("created", {
					chartRect: chartRect,
					svg: this.svg,
					options: options
				})
			}

			function Pie(query, data, options, responsiveOptions) {
				Chartist.Pie.super.constructor.call(this, query, data, Chartist.extend({}, defaultOptions, options), responsiveOptions)
			}
			var defaultOptions = {
				width: void 0,
				height: void 0,
				chartPadding: 5,
				classNames: {
					chart: "ct-chart-pie",
					series: "ct-series",
					slice: "ct-slice",
					donut: "ct-donut",
					label: "ct-label"
				},
				startAngle: 0,
				total: void 0,
				donut: !1,
				donutWidth: 60,
				showLabel: !0,
				labelOffset: 0,
				labelInterpolationFnc: Chartist.noop,
				labelDirection: "neutral"
			};
			Chartist.Pie = Chartist.Base.extend({
				constructor: Pie,
				createChart: createChart,
				determineAnchorPosition: determineAnchorPosition
			})
		}(window, document, Chartist), Chartist
});

! function() {
	"use strict";
	angular.module("angular-loading-bar", ["cfp.loadingBarInterceptor"]), angular.module("chieffancypants.loadingBar", ["cfp.loadingBarInterceptor"]), angular.module("cfp.loadingBarInterceptor", ["cfp.loadingBar"]).config(["$httpProvider", function(a) {
		var b = ["$q", "$cacheFactory", "$timeout", "$rootScope", "cfpLoadingBar", function(b, c, d, e, f) {
			function g() {
				d.cancel(i), f.complete(), k = 0, j = 0
			}

			function h(b) {
				var d, e = c.get("$http"),
					f = a.defaults;
				!b.cache && !f.cache || b.cache === !1 || "GET" !== b.method && "JSONP" !== b.method || (d = angular.isObject(b.cache) ? b.cache : angular.isObject(f.cache) ? f.cache : e);
				var g = void 0 !== d ? void 0 !== d.get(b.url) : !1;
				return void 0 !== b.cached && g !== b.cached ? b.cached : (b.cached = g, g)
			}
			var i, j = 0,
				k = 0,
				l = f.latencyThreshold;
			return {
				request: function(a) {
					return a.ignoreLoadingBar || h(a) || (e.$broadcast("cfpLoadingBar:loading", {
						url: a.url
					}), 0 === j && (i = d(function() {
						f.start()
					}, l)), j++, f.set(k / j)), a
				},
				response: function(a) {
					return a.config.ignoreLoadingBar || h(a.config) || (k++, e.$broadcast("cfpLoadingBar:loaded", {
						url: a.config.url
					}), k >= j ? g() : f.set(k / j)), a
				},
				responseError: function(a) {
					return a.config.ignoreLoadingBar || h(a.config) || (k++, e.$broadcast("cfpLoadingBar:loaded", {
						url: a.config.url
					}), k >= j ? g() : f.set(k / j)), b.reject(a)
				}
			}
		}];
		a.interceptors.push(b)
	}]), angular.module("cfp.loadingBar", []).provider("cfpLoadingBar", function() {
		this.includeSpinner = !0, this.includeBar = !0, this.latencyThreshold = 100, this.startSize = .02, this.parentSelector = "body", this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>', this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>', this.$get = ["$injector", "$document", "$timeout", "$rootScope", function(a, b, c, d) {
			function e() {
				k || (k = a.get("$animate"));
				var e = b.find(n).eq(0);
				c.cancel(m), r || (d.$broadcast("cfpLoadingBar:started"), r = !0, u && k.enter(o, e), t && k.enter(q, e), f(v))
			}

			function f(a) {
				if(r) {
					var b = 100 * a + "%";
					p.css("width", b), s = a, c.cancel(l), l = c(function() {
						g()
					}, 250)
				}
			}

			function g() {
				if(!(h() >= 1)) {
					var a = 0,
						b = h();
					a = b >= 0 && .25 > b ? (3 * Math.random() + 3) / 100 : b >= .25 && .65 > b ? 3 * Math.random() / 100 : b >= .65 && .9 > b ? 2 * Math.random() / 100 : b >= .9 && .99 > b ? .005 : 0;
					var c = h() + a;
					f(c)
				}
			}

			function h() {
				return s
			}

			function i() {
				s = 0, r = !1
			}

			function j() {
				k || (k = a.get("$animate")), d.$broadcast("cfpLoadingBar:completed"), f(1), c.cancel(m), m = c(function() {
					var a = k.leave(o, i);
					a && a.then && a.then(i), k.leave(q)
				}, 500)
			}
			var k, l, m, n = this.parentSelector,
				o = angular.element(this.loadingBarTemplate),
				p = o.find("div").eq(0),
				q = angular.element(this.spinnerTemplate),
				r = !1,
				s = 0,
				t = this.includeSpinner,
				u = this.includeBar,
				v = this.startSize;
			return {
				start: e,
				set: f,
				status: h,
				inc: g,
				complete: j,
				includeSpinner: this.includeSpinner,
				latencyThreshold: this.latencyThreshold,
				parentSelector: this.parentSelector,
				startSize: this.startSize
			}
		}]
	})
}();

! function(e) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function(e) {
	"use strict";

	function t(e) {
		return "string" == typeof e ? parseInt(e, 10) : ~~e
	}
	var o = {
			wheelSpeed: 1,
			wheelPropagation: !1,
			swipePropagation: !0,
			minScrollbarLength: null,
			maxScrollbarLength: null,
			useBothWheelAxes: !1,
			useKeyboard: !0,
			suppressScrollX: !1,
			suppressScrollY: !1,
			scrollXMarginOffset: 0,
			scrollYMarginOffset: 0,
			includePadding: !1
		},
		n = 0,
		r = function() {
			var e = n++;
			return function(t) {
				var o = ".perfect-scrollbar-" + e;
				return void 0 === t ? o : t + o
			}
		},
		l = "WebkitAppearance" in document.documentElement.style;
	e.fn.perfectScrollbar = function(n, i) {
		return this.each(function() {
			function a(e, o) {
				var n = e + o,
					r = D - R;
				j = 0 > n ? 0 : n > r ? r : n;
				var l = t(j * (Y - D) / (D - R));
				M.scrollTop(l)
			}

			function s(e, o) {
				var n = e + o,
					r = E - k;
				W = 0 > n ? 0 : n > r ? r : n;
				var l = t(W * (C - E) / (E - k));
				M.scrollLeft(l)
			}

			function c(e) {
				return P.minScrollbarLength && (e = Math.max(e, P.minScrollbarLength)), P.maxScrollbarLength && (e = Math.min(e, P.maxScrollbarLength)), e
			}

			function u() {
				var e = {
					width: I
				};
				e.left = B ? M.scrollLeft() + E - C : M.scrollLeft(), N ? e.bottom = _ - M.scrollTop() : e.top = Q + M.scrollTop(), H.css(e);
				var t = {
					top: M.scrollTop(),
					height: A
				};
				Z ? t.right = B ? C - M.scrollLeft() - V - J.outerWidth() : V - M.scrollLeft() : t.left = B ? M.scrollLeft() + 2 * E - C - $ - J.outerWidth() : $ + M.scrollLeft(), G.css(t), U.css({
					left: W,
					width: k - z
				}), J.css({
					top: j,
					height: R - et
				})
			}

			function d() {
				M.removeClass("ps-active-x"), M.removeClass("ps-active-y"), E = P.includePadding ? M.innerWidth() : M.width(), D = P.includePadding ? M.innerHeight() : M.height(), C = M.prop("scrollWidth"), Y = M.prop("scrollHeight"), !P.suppressScrollX && C > E + P.scrollXMarginOffset ? (X = !0, I = E - F, k = c(t(I * E / C)), W = t(M.scrollLeft() * (I - k) / (C - E))) : (X = !1, k = 0, W = 0, M.scrollLeft(0)), !P.suppressScrollY && Y > D + P.scrollYMarginOffset ? (O = !0, A = D - tt, R = c(t(A * D / Y)), j = t(M.scrollTop() * (A - R) / (Y - D))) : (O = !1, R = 0, j = 0, M.scrollTop(0)), W >= I - k && (W = I - k), j >= A - R && (j = A - R), u(), X && M.addClass("ps-active-x"), O && M.addClass("ps-active-y")
			}

			function p() {
				var t, o, n = function(e) {
						s(t, e.pageX - o), d(), e.stopPropagation(), e.preventDefault()
					},
					r = function() {
						H.removeClass("in-scrolling"), e(q).unbind(K("mousemove"), n)
					};
				U.bind(K("mousedown"), function(l) {
					o = l.pageX, t = U.position().left, H.addClass("in-scrolling"), e(q).bind(K("mousemove"), n), e(q).one(K("mouseup"), r), l.stopPropagation(), l.preventDefault()
				}), t = o = null
			}

			function f() {
				var t, o, n = function(e) {
						a(t, e.pageY - o), d(), e.stopPropagation(), e.preventDefault()
					},
					r = function() {
						G.removeClass("in-scrolling"), e(q).unbind(K("mousemove"), n)
					};
				J.bind(K("mousedown"), function(l) {
					o = l.pageY, t = J.position().top, G.addClass("in-scrolling"), e(q).bind(K("mousemove"), n), e(q).one(K("mouseup"), r), l.stopPropagation(), l.preventDefault()
				}), t = o = null
			}

			function v(e, t) {
				var o = M.scrollTop();
				if(0 === e) {
					if(!O) return !1;
					if(0 === o && t > 0 || o >= Y - D && 0 > t) return !P.wheelPropagation
				}
				var n = M.scrollLeft();
				if(0 === t) {
					if(!X) return !1;
					if(0 === n && 0 > e || n >= C - E && e > 0) return !P.wheelPropagation
				}
				return !0
			}

			function g(e, t) {
				var o = M.scrollTop(),
					n = M.scrollLeft(),
					r = Math.abs(e),
					l = Math.abs(t);
				if(l > r) {
					if(0 > t && o === Y - D || t > 0 && 0 === o) return !P.swipePropagation
				} else if(r > l && (0 > e && n === C - E || e > 0 && 0 === n)) return !P.swipePropagation;
				return !0
			}

			function b() {
				function e(e) {
					var t = e.originalEvent.deltaX,
						o = -1 * e.originalEvent.deltaY;
					return(void 0 === t || void 0 === o) && (t = -1 * e.originalEvent.wheelDeltaX / 6, o = e.originalEvent.wheelDeltaY / 6), e.originalEvent.deltaMode && 1 === e.originalEvent.deltaMode && (t *= 10, o *= 10), t !== t && o !== o && (t = 0, o = e.originalEvent.wheelDelta), [t, o]
				}

				function t(t) {
					if(l || !(M.find("select:focus").length > 0)) {
						var n = e(t),
							r = n[0],
							i = n[1];
						o = !1, P.useBothWheelAxes ? O && !X ? (M.scrollTop(i ? M.scrollTop() - i * P.wheelSpeed : M.scrollTop() + r * P.wheelSpeed), o = !0) : X && !O && (M.scrollLeft(r ? M.scrollLeft() + r * P.wheelSpeed : M.scrollLeft() - i * P.wheelSpeed), o = !0) : (M.scrollTop(M.scrollTop() - i * P.wheelSpeed), M.scrollLeft(M.scrollLeft() + r * P.wheelSpeed)), d(), o = o || v(r, i), o && (t.stopPropagation(), t.preventDefault())
					}
				}
				var o = !1;
				void 0 !== window.onwheel ? M.bind(K("wheel"), t) : void 0 !== window.onmousewheel && M.bind(K("mousewheel"), t)
			}

			function h() {
				var t = !1;
				M.bind(K("mouseenter"), function() {
					t = !0
				}), M.bind(K("mouseleave"), function() {
					t = !1
				});
				var o = !1;
				e(q).bind(K("keydown"), function(n) {
					if((!n.isDefaultPrevented || !n.isDefaultPrevented()) && t) {
						for(var r = document.activeElement ? document.activeElement : q.activeElement; r.shadowRoot;) r = r.shadowRoot.activeElement;
						if(!e(r).is(":input,[contenteditable]")) {
							var l = 0,
								i = 0;
							switch(n.which) {
								case 37:
									l = -30;
									break;
								case 38:
									i = 30;
									break;
								case 39:
									l = 30;
									break;
								case 40:
									i = -30;
									break;
								case 33:
									i = 90;
									break;
								case 32:
								case 34:
									i = -90;
									break;
								case 35:
									i = n.ctrlKey ? -Y : -D;
									break;
								case 36:
									i = n.ctrlKey ? M.scrollTop() : D;
									break;
								default:
									return
							}
							M.scrollTop(M.scrollTop() - i), M.scrollLeft(M.scrollLeft() + l), o = v(l, i), o && n.preventDefault()
						}
					}
				})
			}

			function w() {
				function e(e) {
					e.stopPropagation()
				}
				J.bind(K("click"), e), G.bind(K("click"), function(e) {
					var o = t(R / 2),
						n = e.pageY - G.offset().top - o,
						r = D - R,
						l = n / r;
					0 > l ? l = 0 : l > 1 && (l = 1), M.scrollTop((Y - D) * l)
				}), U.bind(K("click"), e), H.bind(K("click"), function(e) {
					var o = t(k / 2),
						n = e.pageX - H.offset().left - o,
						r = E - k,
						l = n / r;
					0 > l ? l = 0 : l > 1 && (l = 1), M.scrollLeft((C - E) * l)
				})
			}

			function m() {
				function t() {
					var e = window.getSelection ? window.getSelection() : document.getSlection ? document.getSlection() : {
						rangeCount: 0
					};
					return 0 === e.rangeCount ? null : e.getRangeAt(0).commonAncestorContainer
				}

				function o() {
					r || (r = setInterval(function() {
						return x() ? (M.scrollTop(M.scrollTop() + l.top), M.scrollLeft(M.scrollLeft() + l.left), void d()) : void clearInterval(r)
					}, 50))
				}

				function n() {
					r && (clearInterval(r), r = null), H.removeClass("in-scrolling"), G.removeClass("in-scrolling")
				}
				var r = null,
					l = {
						top: 0,
						left: 0
					},
					i = !1;
				e(q).bind(K("selectionchange"), function() {
					e.contains(M[0], t()) ? i = !0 : (i = !1, n())
				}), e(window).bind(K("mouseup"), function() {
					i && (i = !1, n())
				}), e(window).bind(K("mousemove"), function(e) {
					if(i) {
						var t = {
								x: e.pageX,
								y: e.pageY
							},
							r = M.offset(),
							a = {
								left: r.left,
								right: r.left + M.outerWidth(),
								top: r.top,
								bottom: r.top + M.outerHeight()
							};
						t.x < a.left + 3 ? (l.left = -5, H.addClass("in-scrolling")) : t.x > a.right - 3 ? (l.left = 5, H.addClass("in-scrolling")) : l.left = 0, t.y < a.top + 3 ? (l.top = 5 > a.top + 3 - t.y ? -5 : -20, G.addClass("in-scrolling")) : t.y > a.bottom - 3 ? (l.top = 5 > t.y - a.bottom + 3 ? 5 : 20, G.addClass("in-scrolling")) : l.top = 0, 0 === l.top && 0 === l.left ? n() : o()
					}
				})
			}

			function T(t, o) {
				function n(e, t) {
					M.scrollTop(M.scrollTop() - t), M.scrollLeft(M.scrollLeft() - e), d()
				}

				function r() {
					h = !0
				}

				function l() {
					h = !1
				}

				function i(e) {
					return e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0] : e.originalEvent
				}

				function a(e) {
					var t = e.originalEvent;
					return t.targetTouches && 1 === t.targetTouches.length ? !0 : t.pointerType && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE ? !0 : !1
				}

				function s(e) {
					if(a(e)) {
						w = !0;
						var t = i(e);
						p.pageX = t.pageX, p.pageY = t.pageY, f = (new Date).getTime(), null !== b && clearInterval(b), e.stopPropagation()
					}
				}

				function c(e) {
					if(!h && w && a(e)) {
						var t = i(e),
							o = {
								pageX: t.pageX,
								pageY: t.pageY
							},
							r = o.pageX - p.pageX,
							l = o.pageY - p.pageY;
						n(r, l), p = o;
						var s = (new Date).getTime(),
							c = s - f;
						c > 0 && (v.x = r / c, v.y = l / c, f = s), g(r, l) && (e.stopPropagation(), e.preventDefault())
					}
				}

				function u() {
					!h && w && (w = !1, clearInterval(b), b = setInterval(function() {
						return x() ? .01 > Math.abs(v.x) && .01 > Math.abs(v.y) ? void clearInterval(b) : (n(30 * v.x, 30 * v.y), v.x *= .8, void(v.y *= .8)) : void clearInterval(b)
					}, 10))
				}
				var p = {},
					f = 0,
					v = {},
					b = null,
					h = !1,
					w = !1;
				t && (e(window).bind(K("touchstart"), r), e(window).bind(K("touchend"), l), M.bind(K("touchstart"), s), M.bind(K("touchmove"), c), M.bind(K("touchend"), u)), o && (window.PointerEvent ? (e(window).bind(K("pointerdown"), r), e(window).bind(K("pointerup"), l), M.bind(K("pointerdown"), s), M.bind(K("pointermove"), c), M.bind(K("pointerup"), u)) : window.MSPointerEvent && (e(window).bind(K("MSPointerDown"), r), e(window).bind(K("MSPointerUp"), l), M.bind(K("MSPointerDown"), s), M.bind(K("MSPointerMove"), c), M.bind(K("MSPointerUp"), u)))
			}

			function y() {
				M.bind(K("scroll"), function() {
					d()
				})
			}

			function L() {
				M.unbind(K()), e(window).unbind(K()), e(q).unbind(K()), M.data("perfect-scrollbar", null), M.data("perfect-scrollbar-update", null), M.data("perfect-scrollbar-destroy", null), U.remove(), J.remove(), H.remove(), G.remove(), M = H = G = U = J = X = O = E = D = C = Y = k = W = _ = N = Q = R = j = V = Z = $ = B = K = null
			}

			function S() {
				d(), y(), p(), f(), w(), m(), b(), (ot || nt) && T(ot, nt), P.useKeyboard && h(), M.data("perfect-scrollbar", M), M.data("perfect-scrollbar-update", d), M.data("perfect-scrollbar-destroy", L)
			}
			var P = e.extend(!0, {}, o),
				M = e(this),
				x = function() {
					return !!M
				};
			if("object" == typeof n ? e.extend(!0, P, n) : i = n, "update" === i) return M.data("perfect-scrollbar-update") && M.data("perfect-scrollbar-update")(), M;
			if("destroy" === i) return M.data("perfect-scrollbar-destroy") && M.data("perfect-scrollbar-destroy")(), M;
			if(M.data("perfect-scrollbar")) return M.data("perfect-scrollbar");
			M.addClass("ps-container");
			var E, D, C, Y, X, k, W, I, O, R, j, A, B = "rtl" === M.css("direction"),
				K = r(),
				q = this.ownerDocument || document,
				H = e("<div class='ps-scrollbar-x-rail'>").appendTo(M),
				U = e("<div class='ps-scrollbar-x'>").appendTo(H),
				_ = t(H.css("bottom")),
				N = _ === _,
				Q = N ? null : t(H.css("top")),
				z = t(H.css("borderLeftWidth")) + t(H.css("borderRightWidth")),
				F = t(H.css("marginLeft")) + t(H.css("marginRight")),
				G = e("<div class='ps-scrollbar-y-rail'>").appendTo(M),
				J = e("<div class='ps-scrollbar-y'>").appendTo(G),
				V = t(G.css("right")),
				Z = V === V,
				$ = Z ? null : t(G.css("left")),
				et = t(G.css("borderTopWidth")) + t(G.css("borderBottomWidth")),
				tt = t(G.css("marginTop")) + t(G.css("marginBottom")),
				ot = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
				nt = null !== window.navigator.msMaxTouchPoints;
			return S(), M
		})
	}
});

! function() {
	"use strict";
	var e = {
		TAB: 9,
		ENTER: 13,
		ESC: 27,
		SPACE: 32,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		HOME: 36,
		END: 35,
		BACKSPACE: 8,
		DELETE: 46,
		COMMAND: 91,
		MAP: {
			91: "COMMAND",
			8: "BACKSPACE",
			9: "TAB",
			13: "ENTER",
			16: "SHIFT",
			17: "CTRL",
			18: "ALT",
			19: "PAUSEBREAK",
			20: "CAPSLOCK",
			27: "ESC",
			32: "SPACE",
			33: "PAGE_UP",
			34: "PAGE_DOWN",
			35: "END",
			36: "HOME",
			37: "LEFT",
			38: "UP",
			39: "RIGHT",
			40: "DOWN",
			43: "+",
			44: "PRINTSCREEN",
			45: "INSERT",
			46: "DELETE",
			48: "0",
			49: "1",
			50: "2",
			51: "3",
			52: "4",
			53: "5",
			54: "6",
			55: "7",
			56: "8",
			57: "9",
			59: ";",
			61: "=",
			65: "A",
			66: "B",
			67: "C",
			68: "D",
			69: "E",
			70: "F",
			71: "G",
			72: "H",
			73: "I",
			74: "J",
			75: "K",
			76: "L",
			77: "M",
			78: "N",
			79: "O",
			80: "P",
			81: "Q",
			82: "R",
			83: "S",
			84: "T",
			85: "U",
			86: "V",
			87: "W",
			88: "X",
			89: "Y",
			90: "Z",
			96: "0",
			97: "1",
			98: "2",
			99: "3",
			100: "4",
			101: "5",
			102: "6",
			103: "7",
			104: "8",
			105: "9",
			106: "*",
			107: "+",
			109: "-",
			110: ".",
			111: "/",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NUMLOCK",
			145: "SCROLLLOCK",
			186: ";",
			187: "=",
			188: ",",
			189: "-",
			190: ".",
			191: "/",
			192: "`",
			219: "[",
			220: "\\",
			221: "]",
			222: "'"
		},
		isControl: function(t) {
			var c = t.which;
			switch(c) {
				case e.COMMAND:
				case e.SHIFT:
				case e.CTRL:
				case e.ALT:
					return !0
			}
			return t.metaKey ? !0 : !1
		},
		isFunctionKey: function(e) {
			return e = e.which ? e.which : e, e >= 112 && 123 >= e
		},
		isVerticalMovement: function(t) {
			return ~[e.UP, e.DOWN].indexOf(t)
		},
		isHorizontalMovement: function(t) {
			return ~[e.LEFT, e.RIGHT, e.BACKSPACE, e.DELETE].indexOf(t)
		}
	};
	void 0 === angular.element.prototype.querySelectorAll && (angular.element.prototype.querySelectorAll = function(e) {
		return angular.element(this[0].querySelectorAll(e))
	}), void 0 === angular.element.prototype.closest && (angular.element.prototype.closest = function(e) {
		for(var t = this[0], c = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector; t;) {
			if(c.bind(t)(e)) return t;
			t = t.parentElement
		}
		return !1
	}), angular.module("ui.select", []).constant("uiSelectConfig", {
		theme: "bootstrap",
		searchEnabled: !0,
		placeholder: "",
		refreshDelay: 1e3,
		closeOnSelect: !0
	}).service("uiSelectMinErr", function() {
		var e = angular.$$minErr("ui.select");
		return function() {
			var t = e.apply(this, arguments),
				c = t.message.replace(new RegExp("\nhttp://errors.angularjs.org/.*"), "");
			return new Error(c)
		}
	}).service("RepeatParser", ["uiSelectMinErr", "$parse", function(e, t) {
		var c = this;
		c.parse = function(c) {
			var l = c.match(/^\s*(?:([\s\S]+?)\s+as\s+)?([\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
			if(!l) throw e("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", c);
			return {
				itemName: l[2],
				source: t(l[3]),
				trackByExp: l[4],
				modelMapper: t(l[1] || l[2])
			}
		}, c.getGroupNgRepeatExpression = function() {
			return "$group in $select.groups"
		}, c.getNgRepeatExpression = function(e, t, c, l) {
			var i = e + " in " + (l ? "$group.items" : t);
			return c && (i += " track by " + c), i
		}
	}]).controller("uiSelectCtrl", ["$scope", "$element", "$timeout", "$filter", "RepeatParser", "uiSelectMinErr", "uiSelectConfig", function(t, c, l, i, s, n, a) {
		function r() {
			(f.resetSearchInput || void 0 === f.resetSearchInput && a.resetSearchInput) && (f.search = v, f.selected && f.items.length && !f.multiple && (f.activeIndex = f.items.indexOf(f.selected)))
		}

		function o(t) {
			var c = !0;
			switch(t) {
				case e.DOWN:
					!f.open && f.multiple ? f.activate(!1, !0) : f.activeIndex < f.items.length - 1 && f.activeIndex++;
					break;
				case e.UP:
					!f.open && f.multiple ? f.activate(!1, !0) : (f.activeIndex > 0 || 0 === f.search.length && f.tagging.isActivated) && f.activeIndex--;
					break;
				case e.TAB:
					(!f.multiple || f.open) && f.select(f.items[f.activeIndex], !0);
					break;
				case e.ENTER:
					f.open ? f.select(f.items[f.activeIndex]) : f.activate(!1, !0);
					break;
				case e.ESC:
					f.close();
					break;
				default:
					c = !1
			}
			return c
		}

		function u(t) {
			function c() {
				switch(t) {
					case e.LEFT:
						return ~f.activeMatchIndex ? o : n;
					case e.RIGHT:
						return ~f.activeMatchIndex && a !== n ? r : (f.activate(), !1);
					case e.BACKSPACE:
						return ~f.activeMatchIndex ? (f.removeChoice(a), o) : n;
					case e.DELETE:
						return ~f.activeMatchIndex ? (f.removeChoice(f.activeMatchIndex), a) : !1
				}
			}
			var l = h(m[0]),
				i = f.selected.length,
				s = 0,
				n = i - 1,
				a = f.activeMatchIndex,
				r = f.activeMatchIndex + 1,
				o = f.activeMatchIndex - 1,
				u = a;
			return l > 0 || f.search.length && t == e.RIGHT ? !1 : (f.close(), u = c(), f.activeMatchIndex = f.selected.length && u !== !1 ? Math.min(n, Math.max(s, u)) : -1, !0)
		}

		function d(e) {
			if(void 0 === e || void 0 === f.search) return !1;
			var t = e.filter(function(e) {
				return void 0 === f.search.toUpperCase() ? !1 : e.toUpperCase() === f.search.toUpperCase()
			}).length > 0;
			return t
		}

		function p(e, t) {
			for(var c = angular.copy(e), l = -1, i = 0; i < c.length; i++)
				if(void 0 === f.tagging.fct) c[i] + " " + f.taggingLabel === t && (l = i);
				else {
					var s = c[i];
					s.isTag = !0, angular.equals(s, t) && (l = i)
				}
			return l
		}

		function h(e) {
			return angular.isNumber(e.selectionStart) ? e.selectionStart : e.value.length
		}

		function g() {
			var e = c.querySelectorAll(".ui-select-choices-content"),
				t = e.querySelectorAll(".ui-select-choices-row");
			if(t.length < 1) throw n("choices", "Expected multiple .ui-select-choices-row but got '{0}'.", t.length);
			var l = t[f.activeIndex],
				i = l.offsetTop + l.clientHeight - e[0].scrollTop,
				s = e[0].offsetHeight;
			i > s ? e[0].scrollTop += i - s : i < l.clientHeight && (f.isGrouped && 0 === f.activeIndex ? e[0].scrollTop = 0 : e[0].scrollTop -= l.clientHeight - i)
		}
		var f = this,
			v = "";
		f.placeholder = void 0, f.search = v, f.activeIndex = 0, f.activeMatchIndex = -1, f.items = [], f.selected = void 0, f.open = !1, f.focus = !1, f.focusser = void 0, f.disabled = void 0, f.searchEnabled = void 0, f.resetSearchInput = void 0, f.refreshDelay = void 0, f.multiple = !1, f.disableChoiceExpression = void 0, f.tagging = {
			isActivated: !1,
			fct: void 0
		}, f.taggingTokens = {
			isActivated: !1,
			tokens: void 0
		}, f.lockChoiceExpression = void 0, f.closeOnSelect = !0, f.clickTriggeredSelect = !1, f.$filter = i, f.isEmpty = function() {
			return angular.isUndefined(f.selected) || null === f.selected || "" === f.selected
		};
		var m = c.querySelectorAll("input.ui-select-search");
		if(1 !== m.length) throw n("searchInput", "Expected 1 input.ui-select-search but got '{0}'.", m.length);
		f.activate = function(e, t) {
			f.disabled || f.open || (t || r(), f.focusser.prop("disabled", !0), f.open = !0, f.activeMatchIndex = -1, f.activeIndex = f.activeIndex >= f.items.length ? 0 : f.activeIndex, -1 === f.activeIndex && f.taggingLabel !== !1 && (f.activeIndex = 0), l(function() {
				f.search = e || f.search, m[0].focus()
			}))
		}, f.findGroupByName = function(e) {
			return f.groups && f.groups.filter(function(t) {
				return t.name === e
			})[0]
		}, f.parseRepeatAttr = function(e, c) {
			function l(e) {
				f.groups = [], angular.forEach(e, function(e) {
					var l = t.$eval(c),
						i = angular.isFunction(l) ? l(e) : e[l],
						s = f.findGroupByName(i);
					s ? s.items.push(e) : f.groups.push({
						name: i,
						items: [e]
					})
				}), f.items = [], f.groups.forEach(function(e) {
					f.items = f.items.concat(e.items)
				})
			}

			function i(e) {
				f.items = e
			}
			var a = c ? l : i;
			f.parserResult = s.parse(e), f.isGrouped = !!c, f.itemProperty = f.parserResult.itemName, t.$watchCollection(f.parserResult.source, function(e) {
				if(void 0 === e || null === e) f.items = [];
				else {
					if(!angular.isArray(e)) throw n("items", "Expected an array but got '{0}'.", e);
					if(f.multiple) {
						var t = e.filter(function(e) {
							return f.selected.indexOf(e) < 0
						});
						a(t)
					} else a(e);
					f.ngModel.$modelValue = null
				}
			}), f.multiple && t.$watchCollection("$select.selected", function(e) {
				var c = f.parserResult.source(t);
				if(e.length) {
					if(void 0 !== c) {
						var l = c.filter(function(t) {
							return e.indexOf(t) < 0
						});
						a(l)
					}
				} else a(c);
				f.sizeSearchInput()
			})
		};
		var $;
		f.refresh = function(e) {
			void 0 !== e && ($ && l.cancel($), $ = l(function() {
				t.$eval(e)
			}, f.refreshDelay))
		}, f.setActiveItem = function(e) {
			f.activeIndex = f.items.indexOf(e)
		}, f.isActive = function(e) {
			if(!f.open) return !1;
			var t = f.items.indexOf(e[f.itemProperty]),
				c = t === f.activeIndex;
			return !c || 0 > t && f.taggingLabel !== !1 || 0 > t && f.taggingLabel === !1 ? !1 : (c && !angular.isUndefined(f.onHighlightCallback) && e.$eval(f.onHighlightCallback), c)
		}, f.isDisabled = function(e) {
			if(f.open) {
				var t, c = f.items.indexOf(e[f.itemProperty]),
					l = !1;
				return c >= 0 && !angular.isUndefined(f.disableChoiceExpression) && (t = f.items[c], l = !!e.$eval(f.disableChoiceExpression), t._uiSelectChoiceDisabled = l), l
			}
		}, f.select = function(e, c, l) {
			if(void 0 === e || !e._uiSelectChoiceDisabled) {
				if(!f.items && !f.search) return;
				if(!e || !e._uiSelectChoiceDisabled) {
					if(f.tagging.isActivated) {
						if(f.taggingLabel === !1)
							if(f.activeIndex < 0) {
								if(e = void 0 !== f.tagging.fct ? f.tagging.fct(f.search) : f.search, angular.equals(f.items[0], e)) return
							} else e = f.items[f.activeIndex];
						else if(0 === f.activeIndex) {
							if(void 0 === e) return;
							void 0 !== f.tagging.fct && "string" == typeof e ? e = f.tagging.fct(f.search) : "string" == typeof e && (e = e.replace(f.taggingLabel, ""))
						}
						if(f.selected && f.selected.filter(function(t) {
								return angular.equals(t, e)
							}).length > 0) return void f.close(c)
					}
					var i = {};
					i[f.parserResult.itemName] = e, f.multiple ? (f.selected.push(e), f.sizeSearchInput()) : f.selected = e, f.onSelectCallback(t, {
						$item: e,
						$model: f.parserResult.modelMapper(t, i)
					}), (!f.multiple || f.closeOnSelect) && f.close(c), l && "click" === l.type && (f.clickTriggeredSelect = !0)
				}
			}
		}, f.close = function(e) {
			f.open && (r(), f.open = !1, f.multiple || l(function() {
				f.focusser.prop("disabled", !1), e || f.focusser[0].focus()
			}, 0, !1))
		}, f.toggle = function(e) {
			f.open ? (f.close(), e.preventDefault(), e.stopPropagation()) : f.activate()
		}, f.isLocked = function(e, t) {
			var c, l = f.selected[t];
			return l && !angular.isUndefined(f.lockChoiceExpression) && (c = !!e.$eval(f.lockChoiceExpression), l._uiSelectChoiceLocked = c), c
		}, f.removeChoice = function(e) {
			var c = f.selected[e];
			if(!c._uiSelectChoiceLocked) {
				var l = {};
				l[f.parserResult.itemName] = c, f.selected.splice(e, 1), f.activeMatchIndex = -1, f.sizeSearchInput(), f.onRemoveCallback(t, {
					$item: c,
					$model: f.parserResult.modelMapper(t, l)
				})
			}
		}, f.getPlaceholder = function() {
			return f.multiple && f.selected.length ? void 0 : f.placeholder
		};
		var b;
		f.sizeSearchInput = function() {
			var e = m[0],
				c = m.parent().parent()[0];
			m.css("width", "10px");
			var i = function() {
				var t = c.clientWidth - e.offsetLeft - 10;
				50 > t && (t = c.clientWidth), m.css("width", t + "px")
			};
			l(function() {
				0 !== c.clientWidth || b ? b || i() : b = t.$watch(function() {
					return c.clientWidth
				}, function(e) {
					0 !== e && (i(), b(), b = null)
				})
			}, 0, !1)
		}, m.on("keydown", function(c) {
			var i = c.which;
			t.$apply(function() {
				var t = !1,
					s = !1;
				if(f.multiple && e.isHorizontalMovement(i) && (t = u(i)), !t && (f.items.length > 0 || f.tagging.isActivated) && (t = o(i), f.taggingTokens.isActivated)) {
					for(var n = 0; n < f.taggingTokens.tokens.length; n++) f.taggingTokens.tokens[n] === e.MAP[c.keyCode] && f.search.length > 0 && (s = !0);
					s && l(function() {
						m.triggerHandler("tagged");
						var t = f.search.replace(e.MAP[c.keyCode], "").trim();
						f.tagging.fct && (t = f.tagging.fct(t)), f.select(t, !0)
					})
				}
				t && i != e.TAB && (c.preventDefault(), c.stopPropagation())
			}), e.isVerticalMovement(i) && f.items.length > 0 && g()
		}), m.on("keyup", function(c) {
			if(e.isVerticalMovement(c.which) || t.$evalAsync(function() {
					f.activeIndex = f.taggingLabel === !1 ? -1 : 0
				}), f.tagging.isActivated && f.search.length > 0) {
				if(c.which === e.TAB || e.isControl(c) || e.isFunctionKey(c) || c.which === e.ESC || e.isVerticalMovement(c.which)) return;
				if(f.activeIndex = f.taggingLabel === !1 ? -1 : 0, f.taggingLabel === !1) return;
				var l, i, s, n, a = angular.copy(f.items),
					r = angular.copy(f.items),
					o = !1,
					u = -1;
				if(void 0 !== f.tagging.fct) {
					if(s = f.$filter("filter")(a, {
							isTag: !0
						}), s.length > 0 && (n = s[0]), a.length > 0 && n && (o = !0, a = a.slice(1, a.length), r = r.slice(1, r.length)), l = f.tagging.fct(f.search), l.isTag = !0, r.filter(function(e) {
							return angular.equals(e, f.tagging.fct(f.search))
						}).length > 0) return
				} else {
					if(s = f.$filter("filter")(a, function(e) {
							return e.match(f.taggingLabel)
						}), s.length > 0 && (n = s[0]), i = a[0], void 0 !== i && a.length > 0 && n && (o = !0, a = a.slice(1, a.length), r = r.slice(1, r.length)), l = f.search + " " + f.taggingLabel, p(f.selected, f.search) > -1) return;
					if(d(r.concat(f.selected))) return void(o && (a = r, t.$evalAsync(function() {
						f.activeIndex = 0, f.items = a
					})));
					if(d(r)) return void(o && (f.items = r.slice(1, r.length)))
				}
				o && (u = p(f.selected, l)), u > -1 ? a = a.slice(u + 1, a.length - 1) : (a = [], a.push(l), a = a.concat(r)), t.$evalAsync(function() {
					f.activeIndex = 0, f.items = a
				})
			}
		}), m.on("tagged", function() {
			l(function() {
				r()
			})
		}), m.on("blur", function() {
			l(function() {
				f.activeMatchIndex = -1
			})
		}), t.$on("$destroy", function() {
			m.off("keyup keydown tagged blur")
		})
	}]).directive("uiSelect", ["$document", "uiSelectConfig", "uiSelectMinErr", "$compile", "$parse", function(t, c, l, i, s) {
		return {
			restrict: "EA",
			templateUrl: function(e, t) {
				var l = t.theme || c.theme;
				return l + (angular.isDefined(t.multiple) ? "/select-multiple.tpl.html" : "/select.tpl.html")
			},
			replace: !0,
			transclude: !0,
			require: ["uiSelect", "ngModel"],
			scope: !0,
			controller: "uiSelectCtrl",
			controllerAs: "$select",
			link: function(n, a, r, o, u) {
				function d(e) {
					var t = !1;
					t = window.jQuery ? window.jQuery.contains(a[0], e.target) : a[0].contains(e.target), t || p.clickTriggeredSelect || (p.close(angular.element(e.target).closest(".ui-select-container.open").length > 0), n.$digest()), p.clickTriggeredSelect = !1
				}
				var p = o[0],
					h = o[1],
					g = a.querySelectorAll("input.ui-select-search");
				p.multiple = angular.isDefined(r.multiple) && ("" === r.multiple || "multiple" === r.multiple.toLowerCase() || "true" === r.multiple.toLowerCase()), p.closeOnSelect = function() {
					return angular.isDefined(r.closeOnSelect) ? s(r.closeOnSelect)() : c.closeOnSelect
				}(), p.onSelectCallback = s(r.onSelect), p.onRemoveCallback = s(r.onRemove), h.$parsers.unshift(function(e) {
					var t, c = {};
					if(p.multiple) {
						for(var l = [], i = p.selected.length - 1; i >= 0; i--) c = {}, c[p.parserResult.itemName] = p.selected[i], t = p.parserResult.modelMapper(n, c), l.unshift(t);
						return l
					}
					return c = {}, c[p.parserResult.itemName] = e, t = p.parserResult.modelMapper(n, c)
				}), h.$formatters.unshift(function(e) {
					var t, c = p.parserResult.source(n, {
							$select: {
								search: ""
							}
						}),
						l = {};
					if(c) {
						if(p.multiple) {
							var i = [],
								s = function(e, c) {
									if(e && e.length) {
										for(var s = e.length - 1; s >= 0; s--)
											if(l[p.parserResult.itemName] = e[s], t = p.parserResult.modelMapper(n, l), t == c) return i.unshift(e[s]), !0;
										return !1
									}
								};
							if(!e) return i;
							for(var a = e.length - 1; a >= 0; a--) s(p.selected, e[a]) || s(c, e[a]);
							return i
						}
						var r = function(c) {
							return l[p.parserResult.itemName] = c, t = p.parserResult.modelMapper(n, l), t == e
						};
						if(p.selected && r(p.selected)) return p.selected;
						for(var o = c.length - 1; o >= 0; o--)
							if(r(c[o])) return c[o]
					}
					return e
				}), p.ngModel = h, p.choiceGrouped = function(e) {
					return p.isGrouped && e && e.name
				};
				var f = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' aria-haspopup='true' role='button' />");
				r.tabindex && r.$observe("tabindex", function(e) {
					p.multiple ? g.attr("tabindex", e) : f.attr("tabindex", e), a.removeAttr("tabindex")
				}), i(f)(n), p.focusser = f, p.multiple || (a.append(f), f.bind("focus", function() {
					n.$evalAsync(function() {
						p.focus = !0
					})
				}), f.bind("blur", function() {
					n.$evalAsync(function() {
						p.focus = !1
					})
				}), f.bind("keydown", function(t) {
					return t.which === e.BACKSPACE ? (t.preventDefault(), t.stopPropagation(), p.select(void 0), void n.$apply()) : void(t.which === e.TAB || e.isControl(t) || e.isFunctionKey(t) || t.which === e.ESC || ((t.which == e.DOWN || t.which == e.UP || t.which == e.ENTER || t.which == e.SPACE) && (t.preventDefault(), t.stopPropagation(), p.activate()), n.$digest()))
				}), f.bind("keyup input", function(t) {
					t.which === e.TAB || e.isControl(t) || e.isFunctionKey(t) || t.which === e.ESC || t.which == e.ENTER || t.which === e.BACKSPACE || (p.activate(f.val()), f.val(""), n.$digest())
				})), n.$watch("searchEnabled", function() {
					var e = n.$eval(r.searchEnabled);
					p.searchEnabled = void 0 !== e ? e : c.searchEnabled
				}), r.$observe("disabled", function() {
					p.disabled = void 0 !== r.disabled ? r.disabled : !1
				}), r.$observe("resetSearchInput", function() {
					var e = n.$eval(r.resetSearchInput);
					p.resetSearchInput = void 0 !== e ? e : !0
				}), r.$observe("tagging", function() {
					if(void 0 !== r.tagging) {
						var e = n.$eval(r.tagging);
						p.tagging = {
							isActivated: !0,
							fct: e !== !0 ? e : void 0
						}
					} else p.tagging = {
						isActivated: !1,
						fct: void 0
					}
				}), r.$observe("taggingLabel", function() {
					void 0 !== r.tagging && (p.taggingLabel = "false" === r.taggingLabel ? !1 : void 0 !== r.taggingLabel ? r.taggingLabel : "(new)")
				}), r.$observe("taggingTokens", function() {
					if(void 0 !== r.tagging) {
						var e = void 0 !== r.taggingTokens ? r.taggingTokens.split("|") : [",", "ENTER"];
						p.taggingTokens = {
							isActivated: !0,
							tokens: e
						}
					}
				}), p.multiple ? (n.$watchCollection(function() {
					return h.$modelValue
				}, function(e, t) {
					t != e && (h.$modelValue = null)
				}), n.$watchCollection("$select.selected", function() {
					h.$setViewValue(Date.now())
				}), f.prop("disabled", !0)) : n.$watch("$select.selected", function(e) {
					h.$viewValue !== e && h.$setViewValue(e)
				}), h.$render = function() {
					if(p.multiple && !angular.isArray(h.$viewValue)) {
						if(!angular.isUndefined(h.$viewValue) && null !== h.$viewValue) throw l("multiarr", "Expected model value to be array but got '{0}'", h.$viewValue);
						p.selected = []
					}
					p.selected = h.$viewValue
				}, t.on("click", d), n.$on("$destroy", function() {
					t.off("click", d)
				}), u(n, function(e) {
					var t = angular.element("<div>").append(e),
						c = t.querySelectorAll(".ui-select-match");
					if(c.removeAttr("ui-select-match"), 1 !== c.length) throw l("transcluded", "Expected 1 .ui-select-match but got '{0}'.", c.length);
					a.querySelectorAll(".ui-select-match").replaceWith(c);
					var i = t.querySelectorAll(".ui-select-choices");
					if(i.removeAttr("ui-select-choices"), 1 !== i.length) throw l("transcluded", "Expected 1 .ui-select-choices but got '{0}'.", i.length);
					a.querySelectorAll(".ui-select-choices").replaceWith(i)
				})
			}
		}
	}]).directive("uiSelectChoices", ["uiSelectConfig", "RepeatParser", "uiSelectMinErr", "$compile", function(e, t, c, l) {
		return {
			restrict: "EA",
			require: "^uiSelect",
			replace: !0,
			transclude: !0,
			templateUrl: function(t) {
				var c = t.parent().attr("theme") || e.theme;
				return c + "/choices.tpl.html"
			},
			compile: function(i, s) {
				if(!s.repeat) throw c("repeat", "Expected 'repeat' expression.");
				return function(i, s, n, a, r) {
					var o = n.groupBy;
					if(a.parseRepeatAttr(n.repeat, o), a.disableChoiceExpression = n.uiDisableChoice, a.onHighlightCallback = n.onHighlight, o) {
						var u = s.querySelectorAll(".ui-select-choices-group");
						if(1 !== u.length) throw c("rows", "Expected 1 .ui-select-choices-group but got '{0}'.", u.length);
						u.attr("ng-repeat", t.getGroupNgRepeatExpression())
					}
					var d = s.querySelectorAll(".ui-select-choices-row");
					if(1 !== d.length) throw c("rows", "Expected 1 .ui-select-choices-row but got '{0}'.", d.length);
					d.attr("ng-repeat", t.getNgRepeatExpression(a.parserResult.itemName, "$select.items", a.parserResult.trackByExp, o)).attr("ng-if", "$select.open").attr("ng-mouseenter", "$select.setActiveItem(" + a.parserResult.itemName + ")").attr("ng-click", "$select.select(" + a.parserResult.itemName + ",false,$event)");
					var p = s.querySelectorAll(".ui-select-choices-row-inner");
					if(1 !== p.length) throw c("rows", "Expected 1 .ui-select-choices-row-inner but got '{0}'.", p.length);
					p.attr("uis-transclude-append", ""), l(s, r)(i), i.$watch("$select.search", function(e) {
						e && !a.open && a.multiple && a.activate(!1, !0), a.activeIndex = a.tagging.isActivated ? -1 : 0, a.refresh(n.refresh)
					}), n.$observe("refreshDelay", function() {
						var t = i.$eval(n.refreshDelay);
						a.refreshDelay = void 0 !== t ? t : e.refreshDelay
					})
				}
			}
		}
	}]).directive("uisTranscludeAppend", function() {
		return {
			link: function(e, t, c, l, i) {
				i(e, function(e) {
					t.append(e)
				})
			}
		}
	}).directive("uiSelectMatch", ["uiSelectConfig", function(e) {
		return {
			restrict: "EA",
			require: "^uiSelect",
			replace: !0,
			transclude: !0,
			templateUrl: function(t) {
				var c = t.parent().attr("theme") || e.theme,
					l = t.parent().attr("multiple");
				return c + (l ? "/match-multiple.tpl.html" : "/match.tpl.html")
			},
			link: function(t, c, l, i) {
				i.lockChoiceExpression = l.uiLockChoice, l.$observe("placeholder", function(t) {
					i.placeholder = void 0 !== t ? t : e.placeholder
				}), i.allowClear = angular.isDefined(l.allowClear) ? "" === l.allowClear ? !0 : "true" === l.allowClear.toLowerCase() : !1, i.multiple && i.sizeSearchInput()
			}
		}
	}]).filter("highlight", function() {
		function e(e) {
			return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
		}
		return function(t, c) {
			return c && t ? t.replace(new RegExp(e(c), "gi"), '<span class="ui-select-highlight">$&</span>') : t
		}
	})
}(), angular.module("ui.select").run(["$templateCache", function(e) {
	e.put("bootstrap/choices.tpl.html", '<ul class="ui-select-choices ui-select-choices-content dropdown-menu" role="menu" aria-labelledby="dLabel" ng-show="$select.items.length > 0"><li class="ui-select-choices-group"><div class="divider" ng-show="$select.isGrouped && $index > 0"></div><div ng-show="$select.isGrouped" class="ui-select-choices-group-label dropdown-header" ng-bind-html="$group.name"></div><div class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><a href="javascript:void(0)" class="ui-select-choices-row-inner"></a></div></li></ul>'), e.put("bootstrap/match-multiple.tpl.html", '<span class="ui-select-match"><span ng-repeat="$item in $select.selected"><span style="margin-right: 3px;" class="ui-select-match-item btn btn-default btn-xs" tabindex="-1" type="button" ng-disabled="$select.disabled" ng-click="$select.activeMatchIndex = $index;" ng-class="{\'btn-primary\':$select.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}"><span class="close ui-select-match-close" ng-hide="$select.disabled" ng-click="$select.removeChoice($index)">&nbsp;&times;</span> <span uis-transclude-append=""></span></span></span></span>'), e.put("bootstrap/match.tpl.html", '<div class="btn-group ui-select-match btn-block" ng-hide="$select.open" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}"><button type="button" class="btn btn-default" ng-class="{\'col-sm-8 col-md-10\': $select.allowClear && !$select.isEmpty(),\'col-sm-10 col-md-11\': !$select.allowClear || $select.isEmpty()}" tabindex="-1" ;="" ng-click="$select.activate()"><span ng-show="$select.isEmpty()" class="text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" ng-transclude=""></span></button> <button class="btn btn-default col-sm-2 col-md-1" ng-if="$select.allowClear && !$select.isEmpty()" ng-click="$select.select(undefined)"><span class="glyphicon glyphicon-remove ui-select-toggle"></span></button> <button class="btn btn-default col-sm-2 col-md-1" ng-click="$select.activate()"><span class="caret ui-select-toggle" ng-click="$select.toggle($event)"></span></button></div>'), e.put("bootstrap/select-multiple.tpl.html", '<div class="ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}"><div><div class="ui-select-match"></div><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search input-xs" placeholder="{{$select.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-click="$select.activate()" ng-model="$select.search"></div><div class="ui-select-choices"></div></div>'), e.put("bootstrap/select.tpl.html", '<div class="ui-select-container ui-select-bootstrap dropdown" ng-class="{open: $select.open}"><div class="ui-select-match"></div><input type="text" autocomplete="off" tabindex="-1" class="form-control ui-select-search" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-show="$select.searchEnabled && $select.open"><div class="ui-select-choices"></div></div>'), e.put("select2/choices.tpl.html", '<ul class="ui-select-choices ui-select-choices-content select2-results"><li class="ui-select-choices-group" ng-class="{\'select2-result-with-children\': $select.choiceGrouped($group) }"><div ng-show="$select.choiceGrouped($group)" class="ui-select-choices-group-label select2-result-label" ng-bind-html="$group.name"></div><ul ng-class="{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }"><li class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}"><div class="select2-result-label ui-select-choices-row-inner"></div></li></ul></li></ul>'), e.put("select2/match-multiple.tpl.html", '<span class="ui-select-match"><li class="ui-select-match-item select2-search-choice" ng-repeat="$item in $select.selected" ng-class="{\'select2-search-choice-focus\':$select.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}"><span uis-transclude-append=""></span> <a href="javascript:;" class="ui-select-match-close select2-search-choice-close" ng-click="$select.removeChoice($index)" tabindex="-1"></a></li></span>'), e.put("select2/match.tpl.html", '<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.isEmpty()}" ng-click="$select.activate()"><span ng-show="$select.isEmpty()" class="select2-chosen">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="select2-chosen" ng-transclude=""></span> <abbr ng-if="$select.allowClear && !$select.isEmpty()" class="select2-search-choice-close" ng-click="$select.select(undefined)"></abbr> <span class="select2-arrow ui-select-toggle" ng-click="$select.toggle($event)"><b></b></span></a>'), e.put("select2/select-multiple.tpl.html", '<div class="ui-select-container ui-select-multiple select2 select2-container select2-container-multi" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open,\n                \'select2-container-disabled\': $select.disabled}"><ul class="select2-choices"><span class="ui-select-match"></span><li class="select2-search-field"><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="select2-input ui-select-search" placeholder="{{$select.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-model="$select.search" ng-click="$select.activate()" style="width: 34px;"></li></ul><div class="select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="ui-select-choices"></div></div></div>'), e.put("select2/select.tpl.html", '<div class="ui-select-container select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open,\n                \'select2-container-disabled\': $select.disabled,\n                \'select2-container-active\': $select.focus, \n                \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}"><div class="ui-select-match"></div><div class="select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="select2-search" ng-show="$select.searchEnabled"><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search select2-input" ng-model="$select.search"></div><div class="ui-select-choices"></div></div></div>'), e.put("selectize/choices.tpl.html", '<div ng-show="$select.open" class="ui-select-choices selectize-dropdown single"><div class="ui-select-choices-content selectize-dropdown-content"><div class="ui-select-choices-group optgroup"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label optgroup-header" ng-bind-html="$group.name"></div><div class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><div class="option ui-select-choices-row-inner" data-selectable=""></div></div></div></div></div>'), e.put("selectize/match.tpl.html", '<div ng-hide="($select.open || $select.isEmpty())" class="ui-select-match" ng-transclude=""></div>'), e.put("selectize/select.tpl.html", '<div class="ui-select-container selectize-control single" ng-class="{\'open\': $select.open}"><div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}" ng-click="$select.activate()"><div class="ui-select-match"></div><input type="text" autocomplete="off" tabindex="-1" class="ui-select-search ui-select-toggle" ng-click="$select.toggle($event)" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-hide="!$select.searchEnabled || ($select.selected && !$select.open)" ng-disabled="$select.disabled"></div><div class="ui-select-choices"></div></div>')
}]);

! function(a, b) {
	b["true"] = a, angular.module("textAngularSetup", []).value("taOptions", {
			toolbar: [
				["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "quote"],
				["bold", "italics", "underline", "ul", "ol", "redo", "undo", "clear"],
				["justifyLeft", "justifyCenter", "justifyRight", "indent", "outdent"],
				["html", "insertImage", "insertLink", "insertVideo"]
			],
			classes: {
				focussed: "focussed",
				toolbar: "btn-toolbar",
				toolbarGroup: "btn-group",
				toolbarButton: "btn btn-default",
				toolbarButtonActive: "active",
				disabled: "disabled",
				textEditor: "form-control",
				htmlEditor: "form-control"
			},
			setup: {
				textEditorSetup: function() {},
				htmlEditorSetup: function() {}
			},
			defaultFileDropHandler: function(a, b) {
				var c = new FileReader;
				return "image" === a.type.substring(0, 5) ? (c.onload = function() {
					"" !== c.result && b("insertImage", c.result, !0)
				}, c.readAsDataURL(a), !0) : !1
			}
		}).value("taSelectableElements", ["a", "img"]).value("taCustomRenderers", [{
			selector: "img",
			customAttribute: "ta-insert-video",
			renderLogic: function(a) {
				var b = angular.element("<iframe></iframe>"),
					c = a.prop("attributes");
				angular.forEach(c, function(a) {
					b.attr(a.name, a.value)
				}), b.attr("src", b.attr("ta-insert-video")), a.replaceWith(b)
			}
		}]).constant("taTranslations", {
			html: {
				buttontext: "Toggle HTML",
				tooltip: "Toggle html / Rich Text"
			},
			heading: {
				tooltip: "Heading "
			},
			p: {
				tooltip: "Paragraph"
			},
			pre: {
				tooltip: "Preformatted text"
			},
			ul: {
				tooltip: "Unordered List"
			},
			ol: {
				tooltip: "Ordered List"
			},
			quote: {
				tooltip: "Quote/unqoute selection or paragraph"
			},
			undo: {
				tooltip: "Undo"
			},
			redo: {
				tooltip: "Redo"
			},
			bold: {
				tooltip: "Bold"
			},
			italic: {
				tooltip: "Italic"
			},
			underline: {
				tooltip: "Underline"
			},
			justifyLeft: {
				tooltip: "Align text left"
			},
			justifyRight: {
				tooltip: "Align text right"
			},
			justifyCenter: {
				tooltip: "Center"
			},
			indent: {
				tooltip: "Increase indent"
			},
			outdent: {
				tooltip: "Decrease indent"
			},
			clear: {
				tooltip: "Clear formatting"
			},
			insertImage: {
				dialogPrompt: "Please enter an image URL to insert",
				tooltip: "Insert image",
				hotkey: "the - possibly language dependent hotkey ... for some future implementation"
			},
			insertVideo: {
				tooltip: "Insert video",
				dialogPrompt: "Please enter a youtube URL to embed"
			},
			insertLink: {
				tooltip: "Insert / edit link",
				dialogPrompt: "Please enter a URL to insert"
			}
		}).run(["taRegisterTool", "$window", "taTranslations", "taSelection", function(a, b, c, d) {
			a("html", {
				buttontext: c.html.buttontext,
				tooltiptext: c.html.tooltip,
				action: function() {
					this.$editor().switchView()
				},
				activeState: function() {
					return this.$editor().showHtml
				}
			});
			var e = function(a) {
					return function() {
						return this.$editor().queryFormatBlockState(a)
					}
				},
				f = function() {
					return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() + ">")
				};
			angular.forEach(["h1", "h2", "h3", "h4", "h5", "h6"], function(b) {
				a(b.toLowerCase(), {
					buttontext: b.toUpperCase(),
					tooltiptext: c.heading.tooltip + b.charAt(1),
					action: f,
					activeState: e(b.toLowerCase())
				})
			}), a("p", {
				buttontext: "P",
				tooltiptext: c.p.tooltip,
				action: function() {
					return this.$editor().wrapSelection("formatBlock", "<P>")
				},
				activeState: function() {
					return this.$editor().queryFormatBlockState("p")
				}
			}), a("pre", {
				buttontext: "pre",
				tooltiptext: c.pre.tooltip,
				action: function() {
					return this.$editor().wrapSelection("formatBlock", "<PRE>")
				},
				activeState: function() {
					return this.$editor().queryFormatBlockState("pre")
				}
			}), a("ul", {
				iconclass: "fa fa-list-ul",
				tooltiptext: c.ul.tooltip,
				action: function() {
					return this.$editor().wrapSelection("insertUnorderedList", null)
				},
				activeState: function() {
					return this.$editor().queryCommandState("insertUnorderedList")
				}
			}), a("ol", {
				iconclass: "fa fa-list-ol",
				tooltiptext: c.ol.tooltip,
				action: function() {
					return this.$editor().wrapSelection("insertOrderedList", null)
				},
				activeState: function() {
					return this.$editor().queryCommandState("insertOrderedList")
				}
			}), a("quote", {
				iconclass: "fa fa-quote-right",
				tooltiptext: c.quote.tooltip,
				action: function() {
					return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>")
				},
				activeState: function() {
					return this.$editor().queryFormatBlockState("blockquote")
				}
			}), a("undo", {
				iconclass: "fa fa-undo",
				tooltiptext: c.undo.tooltip,
				action: function() {
					return this.$editor().wrapSelection("undo", null)
				}
			}), a("redo", {
				iconclass: "fa fa-repeat",
				tooltiptext: c.redo.tooltip,
				action: function() {
					return this.$editor().wrapSelection("redo", null)
				}
			}), a("bold", {
				iconclass: "fa fa-bold",
				tooltiptext: c.bold.tooltip,
				action: function() {
					return this.$editor().wrapSelection("bold", null)
				},
				activeState: function() {
					return this.$editor().queryCommandState("bold")
				},
				commandKeyCode: 98
			}), a("justifyLeft", {
				iconclass: "fa fa-align-left",
				tooltiptext: c.justifyLeft.tooltip,
				action: function() {
					return this.$editor().wrapSelection("justifyLeft", null)
				},
				activeState: function(a) {
					var b = !1;
					return a && (b = "left" === a.css("text-align") || "left" === a.attr("align") || "right" !== a.css("text-align") && "center" !== a.css("text-align") && !this.$editor().queryCommandState("justifyRight") && !this.$editor().queryCommandState("justifyCenter")), b = b || this.$editor().queryCommandState("justifyLeft")
				}
			}), a("justifyRight", {
				iconclass: "fa fa-align-right",
				tooltiptext: c.justifyRight.tooltip,
				action: function() {
					return this.$editor().wrapSelection("justifyRight", null)
				},
				activeState: function(a) {
					var b = !1;
					return a && (b = "right" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyRight")
				}
			}), a("justifyCenter", {
				iconclass: "fa fa-align-center",
				tooltiptext: c.justifyCenter.tooltip,
				action: function() {
					return this.$editor().wrapSelection("justifyCenter", null)
				},
				activeState: function(a) {
					var b = !1;
					return a && (b = "center" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyCenter")
				}
			}), a("indent", {
				iconclass: "fa fa-indent",
				tooltiptext: c.indent.tooltip,
				action: function() {
					return this.$editor().wrapSelection("indent", null)
				},
				activeState: function() {
					return this.$editor().queryFormatBlockState("blockquote")
				}
			}), a("outdent", {
				iconclass: "fa fa-outdent",
				tooltiptext: c.outdent.tooltip,
				action: function() {
					return this.$editor().wrapSelection("outdent", null)
				},
				activeState: function() {
					return !1
				}
			}), a("italics", {
				iconclass: "fa fa-italic",
				tooltiptext: c.italic.tooltip,
				action: function() {
					return this.$editor().wrapSelection("italic", null)
				},
				activeState: function() {
					return this.$editor().queryCommandState("italic")
				},
				commandKeyCode: 105
			}), a("underline", {
				iconclass: "fa fa-underline",
				tooltiptext: c.underline.tooltip,
				action: function() {
					return this.$editor().wrapSelection("underline", null)
				},
				activeState: function() {
					return this.$editor().queryCommandState("underline")
				},
				commandKeyCode: 117
			}), a("clear", {
				iconclass: "fa fa-ban",
				tooltiptext: c.clear.tooltip,
				action: function(a, b) {
					this.$editor().wrapSelection("removeFormat", null);
					var c = angular.element(d.getSelectionElement()),
						e = function(a) {
							a = angular.element(a);
							var b = a;
							angular.forEach(a.children(), function(a) {
								var c = angular.element("<p></p>");
								c.html(angular.element(a).html()), b.after(c), b = c
							}), a.remove()
						};
					angular.forEach(c.find("ul"), e), angular.forEach(c.find("ol"), e);
					var f = this.$editor(),
						g = function(a) {
							a = angular.element(a), a[0] !== f.displayElements.text[0] && a.removeAttr("class"), angular.forEach(a.children(), g)
						};
					angular.forEach(c, g), "li" !== c[0].tagName.toLowerCase() && "ol" !== c[0].tagName.toLowerCase() && "ul" !== c[0].tagName.toLowerCase() && this.$editor().wrapSelection("formatBlock", "<p>"), b()
				}
			});
			var g = function(a, b, c) {
				var d = function() {
					c.updateTaBindtaTextElement(), c.hidePopover()
				};
				a.preventDefault(), c.displayElements.popover.css("width", "375px");
				var e = c.displayElements.popoverContainer;
				e.empty();
				var f = angular.element('<div class="btn-group" style="padding-right: 6px;">'),
					g = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
				g.on("click", function(a) {
					a.preventDefault(), b.css({
						width: "100%",
						height: ""
					}), d()
				});
				var h = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
				h.on("click", function(a) {
					a.preventDefault(), b.css({
						width: "50%",
						height: ""
					}), d()
				});
				var i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
				i.on("click", function(a) {
					a.preventDefault(), b.css({
						width: "25%",
						height: ""
					}), d()
				});
				var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
				j.on("click", function(a) {
					a.preventDefault(), b.css({
						width: "",
						height: ""
					}), d()
				}), f.append(g), f.append(h), f.append(i), f.append(j), e.append(f), f = angular.element('<div class="btn-group" style="padding-right: 6px;">');
				var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
				k.on("click", function(a) {
					a.preventDefault(), b.css("float", "left"), d()
				});
				var l = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
				l.on("click", function(a) {
					a.preventDefault(), b.css("float", "right"), d()
				});
				var m = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
				m.on("click", function(a) {
					a.preventDefault(), b.css("float", ""), d()
				}), f.append(k), f.append(m), f.append(l), e.append(f), f = angular.element('<div class="btn-group">');
				var n = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
				n.on("click", function(a) {
					a.preventDefault(), b.remove(), d()
				}), f.append(n), e.append(f), c.showPopover(b), c.showResizeOverlay(b)
			};
			a("insertImage", {
				iconclass: "fa fa-picture-o",
				tooltiptext: c.insertImage.tooltip,
				action: function() {
					var a;
					return a = b.prompt(c.insertImage.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("insertImage", a, !0) : void 0
				},
				onElementSelect: {
					element: "img",
					action: g
				}
			}), a("insertVideo", {
				iconclass: "fa fa-youtube-play",
				tooltiptext: c.insertVideo.tooltip,
				action: function() {
					var a;
					if(a = b.prompt(c.insertVideo.dialogPrompt, "http://"), a && "" !== a && "http://" !== a) {
						var d = a.match(/(\?|&)v=[^&]*/);
						if(d.length > 0) {
							var e = "http://www.youtube.com/embed/" + d[0].substring(3),
								f = '<img class="ta-insert-video" ta-insert-video="' + e + '" contenteditable="false" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/>';
							return this.$editor().wrapSelection("insertHTML", f, !0)
						}
					}
				},
				onElementSelect: {
					element: "img",
					onlyWithAttrs: ["ta-insert-video"],
					action: g
				}
			}), a("insertLink", {
				tooltiptext: c.insertLink.tooltip,
				iconclass: "fa fa-link",
				action: function() {
					var a;
					return a = b.prompt(c.insertLink.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("createLink", a, !0) : void 0
				},
				activeState: function(a) {
					return a ? "A" === a[0].tagName : !1
				},
				onElementSelect: {
					element: "a",
					action: function(a, d, e) {
						a.preventDefault(), e.displayElements.popover.css("width", "435px");
						var f = e.displayElements.popoverContainer;
						f.empty(), f.css("line-height", "28px");
						var g = angular.element('<a href="' + d.attr("href") + '" target="_blank">' + d.attr("href") + "</a>");
						g.css({
							display: "inline-block",
							"max-width": "200px",
							overflow: "hidden",
							"text-overflow": "ellipsis",
							"white-space": "nowrap",
							"vertical-align": "middle"
						}), f.append(g);
						var h = angular.element('<div class="btn-group pull-right">'),
							i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-edit icon-edit"></i></button>');
						i.on("click", function(a) {
							a.preventDefault();
							var f = b.prompt(c.insertLink.dialogPrompt, d.attr("href"));
							f && "" !== f && "http://" !== f && (d.attr("href", f), e.updateTaBindtaTextElement()), e.hidePopover()
						}), h.append(i);
						var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-unlink icon-unlink"></i></button>');
						j.on("click", function(a) {
							a.preventDefault(), d.replaceWith(d.contents()), e.updateTaBindtaTextElement(), e.hidePopover()
						}), h.append(j);
						var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">Open in New Window</button>');
						"_blank" === d.attr("target") && k.addClass("active"), k.on("click", function(a) {
							a.preventDefault(), d.attr("target", "_blank" === d.attr("target") ? "" : "_blank"), k.toggleClass("active"), e.updateTaBindtaTextElement()
						}), h.append(k), f.append(h), e.showPopover(d)
					}
				}
			})
		}]),
		function() {
			"Use Strict";

			function a(a) {
				try {
					return 0 !== angular.element(a).length
				} catch(b) {
					return !1
				}
			}

			function b(a, c) {
				var d = [],
					e = a.children();
				return e.length && angular.forEach(e, function(a) {
					d = d.concat(b(angular.element(a), c))
				}), void 0 !== a.attr(c) && d.push(a), d
			}

			function c(b, c) {
				if(!b || "" === b || n.hasOwnProperty(b)) throw "textAngular Error: A unique name is required for a Tool Definition";
				if(c.display && ("" === c.display || !a(c.display)) || !c.display && !c.buttontext && !c.iconclass) throw 'textAngular Error: Tool Definition for "' + b + '" does not have a valid display/iconclass/buttontext value';
				n[b] = c
			}
			var d = !1;
			/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (document.addEventListener("click", function() {
				var a = window.event.target;
				if(d && null !== a) {
					for(var b = !1, c = a; null !== c && "html" !== c.tagName.toLowerCase() && !b;) b = "true" === c.contentEditable, c = c.parentNode;
					b || (document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0, 0), a.focus())
				}
				d = !1
			}, !1), angular.element(document).ready(function() {
				angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000; left: -10000;" unselectable="on" tabIndex="-1">'))
			}));
			var e = function() {
				var a, b = -1,
					c = window.navigator.userAgent,
					d = c.indexOf("MSIE "),
					e = c.indexOf("Trident/");
				if(d > 0) b = parseInt(c.substring(d + 5, c.indexOf(".", d)), 10);
				else if(e > 0) {
					var f = c.indexOf("rv:");
					b = parseInt(c.substring(f + 3, c.indexOf(".", f)), 10)
				}
				return b > -1 ? b : a
			}();
			"function" != typeof String.prototype.trim && (String.prototype.trim = function() {
				return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
			});
			var f, g, h, i, j;
			if(e > 8 || void 0 === e) {
				var k = function() {
					var a = document.createElement("style");
					return /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && a.appendChild(document.createTextNode("")), document.head.insertBefore(a, document.head.firstChild), a.sheet
				}();
				f = function() {
					var a = document.createElement("style");
					return /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && a.appendChild(document.createTextNode("")), document.head.appendChild(a), a.sheet
				}(), g = function(a, b) {
					i(f, a, b)
				}, i = function(a, b, c) {
					var d;
					return a.rules ? d = Math.max(a.rules.length - 1, 0) : a.cssRules && (d = Math.max(a.cssRules.length - 1, 0)), a.insertRule ? a.insertRule(b + "{" + c + "}", d) : a.addRule(b, c, d), d
				}, h = function(a) {
					j(f, a)
				}, j = function(a, b) {
					a.removeRule ? a.removeRule(b) : a.deleteRule(b)
				}, i(k, ".ta-scroll-window.form-control", "height: auto; min-height: 300px; overflow: auto; font-family: inherit; font-size: 100%; position: relative; padding: 0;"), i(k, ".ta-root.focussed .ta-scroll-window.form-control", "border-color: #66afe9; outline: 0; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);"), i(k, ".ta-editor.ta-html", "min-height: 300px; height: auto; overflow: auto; font-family: inherit; font-size: 100%;"), i(k, ".ta-scroll-window > .ta-bind", "height: auto; min-height: 300px; padding: 6px 12px;"), i(k, ".ta-root .ta-resizer-handle-overlay", "z-index: 100; position: absolute; display: none;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-info", "position: absolute; bottom: 16px; right: 16px; border: 1px solid black; background-color: #FFF; padding: 0 4px; opacity: 0.7;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-background", "position: absolute; bottom: 5px; right: 5px; left: 5px; top: 5px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.2);"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner", "width: 10px; height: 10px; position: absolute;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tl", "top: 0; left: 0; border-left: 1px solid black; border-top: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tr", "top: 0; right: 0; border-right: 1px solid black; border-top: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-bl", "bottom: 0; left: 0; border-left: 1px solid black; border-bottom: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-br", "bottom: 0; right: 0; border: 1px solid black; cursor: se-resize; background-color: white;")
			}
			var l = !1,
				m = angular.module("textAngular", ["ngSanitize", "textAngularSetup"]),
				n = {};
			m.constant("taRegisterTool", c), m.value("taTools", n), m.config([function() {
				angular.forEach(n, function(a, b) {
					delete n[b]
				})
			}]), m.directive("textAngular", ["$compile", "$timeout", "taOptions", "taSelection", "taExecCommand", "textAngularManager", "$window", "$document", "$animate", "$log", function(a, b, c, d, e, f, g, h, i, j) {
				return {
					require: "?ngModel",
					scope: {},
					restrict: "EA",
					link: function(k, l, m, n) {
						var o, p, q, r, s, t, u, v, w, x = m.serial ? m.serial : Math.floor(1e16 * Math.random()),
							y = m.name ? m.name : "textAngularEditor" + x,
							z = function(a, c, d) {
								b(function() {
									var b = function() {
										a.off(c, b), d()
									};
									a.on(c, b)
								}, 100)
							};
						w = e(m.taDefaultWrap), angular.extend(k, angular.copy(c), {
							wrapSelection: function(a, b, c) {
								w(a, !1, b), c && k["reApplyOnSelectorHandlerstaTextElement" + x](), k.displayElements.text[0].focus()
							},
							showHtml: !1
						}), m.taFocussedClass && (k.classes.focussed = m.taFocussedClass), m.taTextEditorClass && (k.classes.textEditor = m.taTextEditorClass), m.taHtmlEditorClass && (k.classes.htmlEditor = m.taHtmlEditorClass), m.taTextEditorSetup && (k.setup.textEditorSetup = k.$parent.$eval(m.taTextEditorSetup)), m.taHtmlEditorSetup && (k.setup.htmlEditorSetup = k.$parent.$eval(m.taHtmlEditorSetup)), k.fileDropHandler = m.taFileDrop ? k.$parent.$eval(m.taFileDrop) : k.defaultFileDropHandler, u = l[0].innerHTML, l[0].innerHTML = "", k.displayElements = {
							forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
							html: angular.element("<textarea></textarea>"),
							text: angular.element("<div></div>"),
							scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
							popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),
							popoverArrow: angular.element('<div class="arrow"></div>'),
							popoverContainer: angular.element('<div class="popover-content"></div>'),
							resize: {
								overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
								background: angular.element('<div class="ta-resizer-handle-background"></div>'),
								anchors: [angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],
								info: angular.element('<div class="ta-resizer-handle-info"></div>')
							}
						}, k.displayElements.popover.append(k.displayElements.popoverArrow), k.displayElements.popover.append(k.displayElements.popoverContainer), k.displayElements.scrollWindow.append(k.displayElements.popover), k.displayElements.popover.on("mousedown", function(a, b) {
							return b && angular.extend(a, b), a.preventDefault(), !1
						}), k.showPopover = function(a) {
							k.displayElements.popover.css("display", "block"), k.reflowPopover(a), i.addClass(k.displayElements.popover, "in"), z(l, "click keyup", function() {
								k.hidePopover()
							})
						}, k.reflowPopover = function(a) {
							k.displayElements.text[0].offsetHeight - 51 > a[0].offsetTop ? (k.displayElements.popover.css("top", a[0].offsetTop + a[0].offsetHeight + "px"), k.displayElements.popover.removeClass("top").addClass("bottom")) : (k.displayElements.popover.css("top", a[0].offsetTop - 54 + "px"), k.displayElements.popover.removeClass("bottom").addClass("top"));
							var b = k.displayElements.text[0].offsetWidth - k.displayElements.popover[0].offsetWidth,
								c = a[0].offsetLeft + a[0].offsetWidth / 2 - k.displayElements.popover[0].offsetWidth / 2;
							k.displayElements.popover.css("left", Math.max(0, Math.min(b, c)) + "px"), k.displayElements.popoverArrow.css("margin-left", Math.min(c, Math.max(0, c - b)) - 11 + "px")
						}, k.hidePopover = function() {
							i.removeClass(k.displayElements.popover, "in", function() {
								k.displayElements.popover.css("display", ""), k.displayElements.popoverContainer.attr("style", ""), k.displayElements.popoverContainer.attr("class", "popover-content")
							})
						}, k.displayElements.resize.overlay.append(k.displayElements.resize.background), angular.forEach(k.displayElements.resize.anchors, function(a) {
							k.displayElements.resize.overlay.append(a)
						}), k.displayElements.resize.overlay.append(k.displayElements.resize.info), k.displayElements.scrollWindow.append(k.displayElements.resize.overlay), k.reflowResizeOverlay = function(a) {
							a = angular.element(a)[0], k.displayElements.resize.overlay.css({
								display: "block",
								left: a.offsetLeft - 5 + "px",
								top: a.offsetTop - 5 + "px",
								width: a.offsetWidth + 10 + "px",
								height: a.offsetHeight + 10 + "px"
							}), k.displayElements.resize.info.text(a.offsetWidth + " x " + a.offsetHeight)
						}, k.showResizeOverlay = function(a) {
							var b = function(b) {
								var c = {
									width: parseInt(a.attr("width")),
									height: parseInt(a.attr("height")),
									x: b.clientX,
									y: b.clientY
								};
								void 0 === c.width && (c.width = a[0].offsetWidth), void 0 === c.height && (c.height = a[0].offsetHeight), k.hidePopover();
								var d = c.height / c.width,
									e = function(b) {
										var e = {
												x: Math.max(0, c.width + (b.clientX - c.x)),
												y: Math.max(0, c.height + (b.clientY - c.y))
											},
											f = function(a, b) {
												a = angular.element(a), "img" === a[0].tagName.toLowerCase() && (b.height && (a.attr("height", b.height), delete b.height), b.width && (a.attr("width", b.width), delete b.width)), a.css(b)
											};
										if(b.shiftKey) {
											var g = e.y / e.x;
											f(a, {
												width: d > g ? e.x : e.y / d,
												height: d > g ? e.x * d : e.y
											})
										} else f(a, {
											width: e.x,
											height: e.y
										});
										k.reflowResizeOverlay(a)
									};
								h.find("body").on("mousemove", e), z(k.displayElements.resize.overlay, "mouseup", function() {
									h.find("body").off("mousemove", e), k.showPopover(a)
								}), b.stopPropagation(), b.preventDefault()
							};
							k.displayElements.resize.anchors[3].on("mousedown", b), k.reflowResizeOverlay(a), z(l, "click", function() {
								k.hideResizeOverlay()
							})
						}, k.hideResizeOverlay = function() {
							k.displayElements.resize.overlay.css("display", "")
						}, k.setup.htmlEditorSetup(k.displayElements.html), k.setup.textEditorSetup(k.displayElements.text), k.displayElements.html.attr({
							id: "taHtmlElement" + x,
							"ng-show": "showHtml",
							"ta-bind": "ta-bind",
							"ng-model": "html"
						}), k.displayElements.text.attr({
							id: "taTextElement" + x,
							contentEditable: "true",
							"ta-bind": "ta-bind",
							"ng-model": "html"
						}), k.displayElements.scrollWindow.attr({
							"ng-hide": "showHtml"
						}), m.taDefaultWrap && k.displayElements.text.attr("ta-default-wrap", m.taDefaultWrap), m.taUnsafeSanitizer && (k.displayElements.text.attr("ta-unsafe-sanitizer", m.taUnsafeSanitizer), k.displayElements.html.attr("ta-unsafe-sanitizer", m.taUnsafeSanitizer)), k.displayElements.scrollWindow.append(k.displayElements.text), l.append(k.displayElements.scrollWindow), l.append(k.displayElements.html), k.displayElements.forminput.attr("name", y), l.append(k.displayElements.forminput), m.tabindex && (l.removeAttr("tabindex"), k.displayElements.text.attr("tabindex", m.tabindex), k.displayElements.html.attr("tabindex", m.tabindex)), m.placeholder && (k.displayElements.text.attr("placeholder", m.placeholder), k.displayElements.html.attr("placeholder", m.placeholder)), m.taDisabled && (k.displayElements.text.attr("ta-readonly", "disabled"), k.displayElements.html.attr("ta-readonly", "disabled"), k.disabled = k.$parent.$eval(m.taDisabled), k.$parent.$watch(m.taDisabled, function(a) {
							k.disabled = a, k.disabled ? l.addClass(k.classes.disabled) : l.removeClass(k.classes.disabled)
						})), a(k.displayElements.scrollWindow)(k), a(k.displayElements.html)(k), k.updateTaBindtaTextElement = k["updateTaBindtaTextElement" + x], k.updateTaBindtaHtmlElement = k["updateTaBindtaHtmlElement" + x], l.addClass("ta-root"), k.displayElements.scrollWindow.addClass("ta-text ta-editor " + k.classes.textEditor), k.displayElements.html.addClass("ta-html ta-editor " + k.classes.htmlEditor), k._actionRunning = !1;
						var A = !1;
						if(k.startAction = function() {
								return k._actionRunning = !0, g.rangy && g.rangy.saveSelection ? (A = g.rangy.saveSelection(), function() {
									A && g.rangy.restoreSelection(A)
								}) : void 0
							}, k.endAction = function() {
								k._actionRunning = !1, A && g.rangy.removeMarkers(A), A = !1, k.updateSelectedStyles(), k.showHtml || k["updateTaBindtaTextElement" + x]()
							}, s = function() {
								l.addClass(k.classes.focussed), v.focus()
							}, k.displayElements.html.on("focus", s), k.displayElements.text.on("focus", s), t = function(a) {
								return k._actionRunning || h[0].activeElement === k.displayElements.html[0] || h[0].activeElement === k.displayElements.text[0] || (l.removeClass(k.classes.focussed), v.unfocus(), b(function() {
									l.triggerHandler("blur")
								}, 0)), a.preventDefault(), !1
							}, k.displayElements.html.on("blur", t), k.displayElements.text.on("blur", t), k.queryFormatBlockState = function(a) {
								return !k.showHtml && a.toLowerCase() === h[0].queryCommandValue("formatBlock").toLowerCase()
							}, k.queryCommandState = function(a) {
								return k.showHtml ? "" : h[0].queryCommandState(a)
							}, k.switchView = function() {
								k.showHtml = !k.showHtml, k.showHtml ? b(function() {
									return k.displayElements.html[0].focus()
								}, 100) : b(function() {
									return k.displayElements.text[0].focus()
								}, 100)
							}, m.ngModel) {
							var B = !0;
							n.$render = function() {
								if(B) {
									B = !1;
									var a = k.$parent.$eval(m.ngModel);
									void 0 !== a && null !== a || !u || "" === u || n.$setViewValue(u)
								}
								k.displayElements.forminput.val(n.$viewValue), k._elementSelectTriggered || h[0].activeElement === k.displayElements.html[0] || h[0].activeElement === k.displayElements.text[0] || (k.html = n.$viewValue || "")
							};
							var C = function(a) {
								return m.required && n.$setValidity("required", !(!a || "" === a.trim())), a
							};
							n.$parsers.push(C), n.$formatters.push(C)
						} else k.displayElements.forminput.val(u), k.html = u;
						if(k.$watch("html", function(a, b) {
								a !== b && (m.ngModel && n.$viewValue !== a && n.$setViewValue(a), k.displayElements.forminput.val(a))
							}), m.taTargetToolbars) v = f.registerEditor(y, k, m.taTargetToolbars.split(","));
						else {
							var D = angular.element('<div text-angular-toolbar name="textAngularToolbar' + x + '">');
							m.taToolbar && D.attr("ta-toolbar", m.taToolbar), m.taToolbarClass && D.attr("ta-toolbar-class", m.taToolbarClass), m.taToolbarGroupClass && D.attr("ta-toolbar-group-class", m.taToolbarGroupClass), m.taToolbarButtonClass && D.attr("ta-toolbar-button-class", m.taToolbarButtonClass), m.taToolbarActiveButtonClass && D.attr("ta-toolbar-active-button-class", m.taToolbarActiveButtonClass), m.taFocussedClass && D.attr("ta-focussed-class", m.taFocussedClass), l.prepend(D), a(D)(k.$parent), v = f.registerEditor(y, k, ["textAngularToolbar" + x])
						}
						k.$on("$destroy", function() {
							f.unregisterEditor(y)
						}), k.$on("ta-element-select", function(a, b) {
							v.triggerElementSelect(a, b)
						}), k.$on("ta-drop-event", function(a, b, c, d) {
							k.displayElements.text[0].focus(), d && d.files && d.files.length > 0 && (angular.forEach(d.files, function(a) {
								try {
									return k.fileDropHandler(a, k.wrapSelection) || k.fileDropHandler !== k.defaultFileDropHandler && k.defaultFileDropHandler(a, k.wrapSelection)
								} catch(b) {
									j.error(b)
								}
							}), c.preventDefault(), c.stopPropagation())
						}), k._bUpdateSelectedStyles = !1, k.updateSelectedStyles = function() {
							var a;
							void 0 !== (a = d.getSelectionElement()) && a.parentNode !== k.displayElements.text[0] ? v.updateSelectedStyles(angular.element(a)) : v.updateSelectedStyles(), k._bUpdateSelectedStyles && b(k.updateSelectedStyles, 200)
						}, o = function() {
							k._bUpdateSelectedStyles || (k._bUpdateSelectedStyles = !0, k.$apply(function() {
								k.updateSelectedStyles()
							}))
						}, k.displayElements.html.on("keydown", o), k.displayElements.text.on("keydown", o), p = function() {
							k._bUpdateSelectedStyles = !1
						}, k.displayElements.html.on("keyup", p), k.displayElements.text.on("keyup", p), q = function(a, b) {
							b && angular.extend(a, b), k.$apply(function() {
								return v.sendKeyCommand(a) ? (k._bUpdateSelectedStyles || k.updateSelectedStyles(), a.preventDefault(), !1) : void 0
							})
						}, k.displayElements.html.on("keypress", q), k.displayElements.text.on("keypress", q), r = function() {
							k._bUpdateSelectedStyles = !1, k.$apply(function() {
								k.updateSelectedStyles()
							})
						}, k.displayElements.html.on("mouseup", r), k.displayElements.text.on("mouseup", r)
					}
				}
			}]).factory("taBrowserTag", [function() {
				return function(a) {
					return a ? "" === a ? void 0 === e ? "div" : 8 >= e ? "P" : "p" : 8 >= e ? a.toUpperCase() : a : 8 >= e ? "P" : "p"
				}
			}]).factory("taExecCommand", ["taSelection", "taBrowserTag", "$document", function(a, b, c) {
				var d = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/gi,
					e = /^(ul|li|ol)$/gi,
					f = function(b, c) {
						var d, e, f = b.find("li");
						for(e = f.length - 1; e >= 0; e--) d = angular.element("<" + c + ">" + f[e].innerHTML + "</" + c + ">"), b.after(d);
						b.remove(), a.setSelectionToElementEnd(d[0])
					},
					g = function(b, c) {
						var d = angular.element("<" + c + ">" + b[0].innerHTML + "</" + c + ">");
						b.after(d), b.remove(), a.setSelectionToElementEnd(d.find("li")[0])
					},
					h = function(c, d, e) {
						for(var f = "", g = 0; g < c.length; g++) f += "<" + b("li") + ">" + c[g].innerHTML + "</" + b("li") + ">";
						var h = angular.element("<" + e + ">" + f + "</" + e + ">");
						d.after(h), d.remove(), a.setSelectionToElementEnd(h.find("li")[0])
					};
				return function(i) {
					return i = b(i),
						function(j, k, l) {
							var m, n, o, p, q, r = angular.element("<" + i + ">"),
								s = a.getSelectionElement(),
								t = angular.element(s);
							if(void 0 !== s) {
								var u = s.tagName.toLowerCase();
								if("insertorderedlist" === j.toLowerCase() || "insertunorderedlist" === j.toLowerCase()) {
									var v = b("insertorderedlist" === j.toLowerCase() ? "ol" : "ul");
									if(u === v) return f(t, i);
									if("li" === u && t.parent()[0].tagName.toLowerCase() === v && 1 === t.parent().children().length) return f(t.parent(), i);
									if("li" === u && t.parent()[0].tagName.toLowerCase() !== v && 1 === t.parent().children().length) return g(t.parent(), v);
									if(u.match(d) && !t.hasClass("ta-bind")) {
										if("ol" === u || "ul" === u) return g(t, v);
										var w = !1;
										return angular.forEach(t.children(), function(a) {
											a.tagName.match(d) && (w = !0)
										}), w ? h(t.children(), t, v) : h([angular.element("<div>" + s.innerHTML + "</div>")[0]], t, v)
									}
									if(u.match(d)) {
										if(p = a.getOnlySelectedElements(), 1 === p.length && ("ol" === p[0].tagName.toLowerCase() || "ul" === p[0].tagName.toLowerCase())) return p[0].tagName.toLowerCase() === v ? f(angular.element(p[0]), i) : g(angular.element(p[0]), v);
										o = "";
										var x = [];
										for(m = 0; m < p.length; m++)
											if(3 !== p[m].nodeType) {
												var y = angular.element(p[m]);
												o += "<" + b("li") + ">" + y[0].innerHTML + "</" + b("li") + ">", x.unshift(y)
											}
										return n = angular.element("<" + v + ">" + o + "</" + v + ">"), x.pop().replaceWith(n), angular.forEach(x, function(a) {
											a.remove()
										}), void a.setSelectionToElementEnd(n[0])
									}
								} else if("formatblock" === j.toLowerCase()) {
									var z = l.toLowerCase().replace(/[<>]/gi, "");
									for(n = "li" === u ? t.parent() : t; !n[0].tagName.match(d);) n = n.parent(), u = n[0].tagName.toLowerCase();
									if(u === z) {
										p = n.children();
										var A = !1;
										for(m = 0; m < p.length; m++) A = A || p[m].tagName.match(d);
										A ? (n.after(p), q = n.next(), n.remove(), n = q) : (r.append(n[0].childNodes), n.after(r), n.remove(), n = r)
									} else if(n.parent()[0].tagName.toLowerCase() !== z || n.parent().hasClass("ta-bind"))
										if(u.match(e)) n.wrap(l);
										else {
											p = a.getOnlySelectedElements(), 0 === p.length && (p = [n[0]]);
											var B = !1;
											if(angular.forEach(p, function(a) {
													3 !== a.nodeType && a.tagName.match(d) || (B = !0)
												}), B)
												for(; 3 === p[0].nodeType || !p[0].tagName.match(d);) p = [p[0].parentNode];
											if(angular.element(p[0]).hasClass("ta-bind")) n = angular.element(l), n[0].innerHTML = p[0].innerHTML, p[0].innerHTML = n[0].outerHTML;
											else if("blockquote" === z) {
												for(o = "", m = 0; m < p.length; m++) o += p[m].outerHTML;
												n = angular.element(l), n[0].innerHTML = o, p[0].parentNode.insertBefore(n[0], p[0]), angular.forEach(p, function(a) {
													a.parentNode.removeChild(a)
												})
											} else
												for(m = 0; m < p.length; m++) n = angular.element(l), n[0].innerHTML = p[m].innerHTML, p[m].parentNode.insertBefore(n[0], p[m]), p[m].parentNode.removeChild(p[m])
										}
									else {
										var C = n.parent(),
											D = C.contents();
										for(m = 0; m < D.length; m++) C.parent().hasClass("ta-bind") && 3 === D[m].nodeType && (r = angular.element("<" + i + ">"), r[0].innerHTML = D[m].outerHTML, D[m] = r[0]), C.parent()[0].insertBefore(D[m], C[0]);
										C.remove()
									}
									return void a.setSelectionToElementEnd(n[0])
								}
							}
							try {
								c[0].execCommand(j, k, l)
							} catch(E) {}
						}
				}
			}]).directive("taBind", ["taSanitize", "$timeout", "$window", "$document", "taFixChrome", "taBrowserTag", "taSelection", "taSelectableElements", "taApplyCustomRenderers", "taOptions", function(a, b, c, f, i, j, k, m, n, o) {
				return {
					require: "ngModel",
					scope: {},
					link: function(j, p, q, r) {
						var s, t, u = void 0 !== p.attr("contenteditable") && p.attr("contenteditable"),
							v = u || "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase(),
							w = !1,
							x = !1,
							y = q.taUnsafeSanitizer || o.disableSanitizer;
						void 0 === q.taDefaultWrap && (q.taDefaultWrap = "p"), "" === q.taDefaultWrap ? (s = "", t = void 0 === e ? "<div><br></div>" : e >= 11 ? "<p><br></p>" : 8 >= e ? "<P>&nbsp;</P>" : "<p>&nbsp;</p>") : (s = void 0 === e || e >= 11 ? "<" + q.taDefaultWrap + "><br></" + q.taDefaultWrap + ">" : 8 >= e ? "<" + q.taDefaultWrap.toUpperCase() + "></" + q.taDefaultWrap.toUpperCase() + ">" : "<" + q.taDefaultWrap + "></" + q.taDefaultWrap + ">", t = void 0 === e || e >= 11 ? "<" + q.taDefaultWrap + "><br></" + q.taDefaultWrap + ">" : 8 >= e ? "<" + q.taDefaultWrap.toUpperCase() + ">&nbsp;</" + q.taDefaultWrap.toUpperCase() + ">" : "<" + q.taDefaultWrap + ">&nbsp;</" + q.taDefaultWrap + ">"), p.addClass("ta-bind");
						var z = function() {
								if(u) return p[0].innerHTML;
								if(v) return p.val();
								throw "textAngular Error: attempting to update non-editable taBind"
							},
							A = function(a) {
								a || (a = z()), a === t ? "" !== r.$viewValue && r.$setViewValue("") : r.$viewValue !== a && r.$setViewValue(a)
							};
						if(j.$parent["updateTaBind" + (q.id || "")] = function() {
								w || A()
							}, v)
							if(u) {
								if(p.on("cut", function(a) {
										w ? a.preventDefault() : b(function() {
											A()
										}, 0)
									}), p.on("paste", function(a, b) {
										b && angular.extend(a, b);
										var d;
										if(a.clipboardData || a.originalEvent && a.originalEvent.clipboardData ? d = (a.originalEvent || a).clipboardData.getData("text/plain") : c.clipboardData && (d = c.clipboardData.getData("Text")), !d && !w) return !0;
										if(a.preventDefault(), !w) {
											var e = angular.element("<div></div>");
											if(e[0].innerHTML = d, d = e.text(), f[0].selection) {
												var g = f[0].selection.createRange();
												g.pasteHTML(d)
											} else f[0].execCommand("insertText", !1, d);
											A()
										}
									}), p.on("keyup", function(a, b) {
										if(b && angular.extend(a, b), !w) {
											if("" !== s && 13 === a.keyCode && !a.shiftKey) {
												var c = k.getSelectionElement();
												if(c.tagName.toLowerCase() !== q.taDefaultWrap && "li" !== c.tagName.toLowerCase() && ("" === c.innerHTML.trim() || "<br>" === c.innerHTML.trim())) {
													var d = angular.element(s);
													angular.element(c).replaceWith(d), k.setSelectionToElementStart(d[0])
												}
											}
											var e = z();
											"" !== s && "" === e.trim() && (p[0].innerHTML = s, k.setSelectionToElementStart(p.children()[0])), A(e)
										}
									}), p.on("blur", function() {
										x = !1, w || A(), r.$render()
									}), q.placeholder && (e > 8 || void 0 === e)) {
									var B;
									if(!q.id) throw "textAngular Error: An unique ID is required for placeholders to work";
									B = g("#" + q.id + ".placeholder-text:before", 'content: "' + q.placeholder + '"'), j.$on("$destroy", function() {
										h(B)
									})
								}
								p.on("focus", function() {
									x = !0, r.$render()
								}), p.on("mousedown", function(a, b) {
									b && angular.extend(a, b), a.stopPropagation()
								})
							} else p.on("paste cut", function() {
								w || b(function() {
									r.$setViewValue(z())
								}, 0)
							}), p.on("change blur", function() {
								w || r.$setViewValue(z())
							});
						var C = function(b) {
								return r.$oldViewValue = a(i(b), r.$oldViewValue, y)
							},
							D = function(a) {
								return q.required && r.$setValidity("required", !(!a || a.trim() === t || "" === a.trim())), a
							};
						r.$parsers.push(C), r.$parsers.push(D), r.$formatters.push(C), r.$formatters.push(D);
						var E = function(a) {
								return j.$emit("ta-element-select", this), a.preventDefault(), !1
							},
							F = function(a, c) {
								if(c && angular.extend(a, c), !l && !w) {
									l = !0;
									var d;
									d = a.originalEvent ? a.originalEvent.dataTransfer : a.dataTransfer, j.$emit("ta-drop-event", this, a, d), b(function() {
										l = !1
									}, 100)
								}
							};
						j.$parent["reApplyOnSelectorHandlers" + (q.id || "")] = function() {
							w || angular.forEach(m, function(a) {
								p.find(a).off("click", E).on("click", E)
							})
						};
						var G = function(a) {
							p[0].innerHTML = a
						};
						r.$render = function() {
							var a = r.$viewValue || "";
							f[0].activeElement !== p[0] ? u ? (q.placeholder ? "" === a ? (x ? p.removeClass("placeholder-text") : p.addClass("placeholder-text"), G(s)) : (p.removeClass("placeholder-text"), G(a)) : G("" === a ? s : a), w ? p.off("drop", F) : (angular.forEach(m, function(a) {
								p.find(a).on("click", E)
							}), p.on("drop", F))) : "textarea" !== p[0].tagName.toLowerCase() && "input" !== p[0].tagName.toLowerCase() ? G(n(a)) : p.val(a) : u && p.removeClass("placeholder-text")
						}, q.taReadonly && (w = j.$parent.$eval(q.taReadonly), w ? (p.addClass("ta-readonly"), ("textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase()) && p.attr("disabled", "disabled"), void 0 !== p.attr("contenteditable") && p.attr("contenteditable") && p.removeAttr("contenteditable")) : (p.removeClass("ta-readonly"), "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase() ? p.removeAttr("disabled") : u && p.attr("contenteditable", "true")), j.$parent.$watch(q.taReadonly, function(a, b) {
							b !== a && (a ? (p.addClass("ta-readonly"), ("textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase()) && p.attr("disabled", "disabled"), void 0 !== p.attr("contenteditable") && p.attr("contenteditable") && p.removeAttr("contenteditable"), angular.forEach(m, function(a) {
								p.find(a).on("click", E)
							}), p.off("drop", F)) : (p.removeClass("ta-readonly"), "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase() ? p.removeAttr("disabled") : u && p.attr("contenteditable", "true"), angular.forEach(m, function(a) {
								p.find(a).off("click", E)
							}), p.on("drop", F)), w = a)
						})), u && !w && (angular.forEach(m, function(a) {
							p.find(a).on("click", E)
						}), p.on("drop", F), p.on("blur", function() {
							/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (d = !0)
						}))
					}
				}
			}]).factory("taApplyCustomRenderers", ["taCustomRenderers", function(a) {
				return function(c) {
					var d = angular.element("<div></div>");
					return d[0].innerHTML = c, angular.forEach(a, function(a) {
						var c = [];
						a.selector && "" !== a.selector ? c = d.find(a.selector) : a.customAttribute && "" !== a.customAttribute && (c = b(d, a.customAttribute)), angular.forEach(c, function(b) {
							b = angular.element(b), a.selector && "" !== a.selector && a.customAttribute && "" !== a.customAttribute ? void 0 !== b.attr(a.customAttribute) && a.renderLogic(b) : a.renderLogic(b)
						})
					}), d[0].innerHTML
				}
			}]).directive("taMaxText", function() {
				return {
					restrict: "A",
					require: "ngModel",
					link: function(a, b, c, d) {
						function e(a) {
							var b = angular.element("<div/>");
							b.html(a);
							var c = b.text().length;
							return f >= c ? (d.$setValidity("taMaxText", !0), a) : void d.$setValidity("taMaxText", !1)
						}
						var f = parseInt(a.$eval(c.taMaxText));
						if(isNaN(f)) throw "Max text must be an integer";
						c.$observe("taMaxText", function(a) {
							if(f = parseInt(a), isNaN(f)) throw "Max text must be an integer";
							d.$dirty && d.$setViewValue(d.$viewValue)
						}), d.$parsers.unshift(e)
					}
				}
			}).directive("taMinText", function() {
				return {
					restrict: "A",
					require: "ngModel",
					link: function(a, b, c, d) {
						function e(a) {
							var b = angular.element("<div/>");
							b.html(a);
							var c = b.text().length;
							return !c || c >= f ? (d.$setValidity("taMinText", !0), a) : void d.$setValidity("taMinText", !1)
						}
						var f = parseInt(a.$eval(c.taMinText));
						if(isNaN(f)) throw "Min text must be an integer";
						c.$observe("taMinText", function(a) {
							if(f = parseInt(a), isNaN(f)) throw "Min text must be an integer";
							d.$dirty && d.$setViewValue(d.$viewValue)
						}), d.$parsers.unshift(e)
					}
				}
			}).factory("taFixChrome", function() {
				var a = function(a) {
					for(var b = angular.element("<div>" + a + "</div>"), c = angular.element(b).find("span"), d = 0; d < c.length; d++) {
						var e = angular.element(c[d]);
						e.attr("style") && e.attr("style").match(/line-height: 1.428571429;|color: inherit; line-height: 1.1;/i) && (e.attr("style", e.attr("style").replace(/( |)font-family: inherit;|( |)line-height: 1.428571429;|( |)line-height:1.1;|( |)color: inherit;/gi, "")), e.attr("style") && "" !== e.attr("style") || (e.next().length > 0 && "BR" === e.next()[0].tagName && e.next().remove(), e.replaceWith(e[0].innerHTML)))
					}
					var f = b[0].innerHTML.replace(/style="[^"]*?(line-height: 1.428571429;|color: inherit; line-height: 1.1;)[^"]*"/gi, "");
					return f !== b[0].innerHTML && (b[0].innerHTML = f), b[0].innerHTML
				};
				return a
			}).factory("taSanitize", ["$sanitize", function(a) {
				return function(c, d, e) {
					var f = angular.element("<div>" + c + "</div>");
					angular.forEach(b(f, "align"), function(a) {
						a.css("text-align", a.attr("align")), a.removeAttr("align")
					});
					var g;
					c = f[0].innerHTML;
					try {
						g = a(c), e && (g = c)
					} catch(h) {
						g = d || ""
					}
					return g
				}
			}]).directive("textAngularToolbar", ["$compile", "textAngularManager", "taOptions", "taTools", "taToolExecuteAction", "$window", function(a, b, c, d, e, f) {
				return {
					scope: {
						name: "@"
					},
					restrict: "EA",
					link: function(g, h, i) {
						if(!g.name || "" === g.name) throw "textAngular Error: A toolbar requires a name";
						angular.extend(g, angular.copy(c)), i.taToolbar && (g.toolbar = g.$parent.$eval(i.taToolbar)), i.taToolbarClass && (g.classes.toolbar = i.taToolbarClass), i.taToolbarGroupClass && (g.classes.toolbarGroup = i.taToolbarGroupClass), i.taToolbarButtonClass && (g.classes.toolbarButton = i.taToolbarButtonClass), i.taToolbarActiveButtonClass && (g.classes.toolbarButtonActive = i.taToolbarActiveButtonClass), i.taFocussedClass && (g.classes.focussed = i.taFocussedClass), g.disabled = !0, g.focussed = !1, g._$element = h, h[0].innerHTML = "", h.addClass("ta-toolbar " + g.classes.toolbar), g.$watch("focussed", function() {
							g.focussed ? h.addClass(g.classes.focussed) : h.removeClass(g.classes.focussed)
						});
						var j = function(b, c) {
							var d;
							if(d = angular.element(b && b.display ? b.display : "<button type='button'>"), d.addClass(g.classes.toolbarButton), d.attr("name", c.name), d.attr("unselectable", "on"), d.attr("ng-disabled", "isDisabled()"), d.attr("tabindex", "-1"), d.attr("ng-click", "executeAction()"), d.attr("ng-class", "displayActiveToolClass(active)"), b && b.tooltiptext && d.attr("title", b.tooltiptext), d.on("mousedown", function(a, b) {
									return b && angular.extend(a, b), a.preventDefault(), !1
								}), b && !b.display && !c._display && (d[0].innerHTML = "", b.buttontext && (d[0].innerHTML = b.buttontext), b.iconclass)) {
								var e = angular.element("<i>"),
									f = d[0].innerHTML;
								e.addClass(b.iconclass), d[0].innerHTML = "", d.append(e), f && "" !== f && d.append("&nbsp;" + f)
							}
							return c._lastToolDefinition = angular.copy(b), a(d)(c)
						};
						g.tools = {}, g._parent = {
							disabled: !0,
							showHtml: !1,
							queryFormatBlockState: function() {
								return !1
							},
							queryCommandState: function() {
								return !1
							}
						};
						var k = {
							$window: f,
							$editor: function() {
								return g._parent
							},
							isDisabled: function() {
								return this.$eval("disabled") || this.$eval("disabled()") || "html" !== this.name && this.$editor().showHtml || this.$parent.disabled || this.$editor().disabled
							},
							displayActiveToolClass: function(a) {
								return a ? g.classes.toolbarButtonActive : ""
							},
							executeAction: e
						};
						angular.forEach(g.toolbar, function(a) {
							var b = angular.element("<div>");
							b.addClass(g.classes.toolbarGroup), angular.forEach(a, function(a) {
								g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
									name: a
								}), g.tools[a].$element = j(d[a], g.tools[a]), b.append(g.tools[a].$element)
							}), h.append(b)
						}), g.updateToolDisplay = function(a, b, c) {
							var d = g.tools[a];
							if(d) {
								if(d._lastToolDefinition && !c && (b = angular.extend({}, d._lastToolDefinition, b)), null === b.buttontext && null === b.iconclass && null === b.display) throw 'textAngular Error: Tool Definition for updating "' + a + '" does not have a valid display/iconclass/buttontext value';
								null === b.buttontext && delete b.buttontext, null === b.iconclass && delete b.iconclass, null === b.display && delete b.display;
								var e = j(b, d);
								d.$element.replaceWith(e), d.$element = e
							}
						}, g.addTool = function(a, b, c, e) {
							g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
								name: a
							}), g.tools[a].$element = j(d[a], g.tools[a]);
							var f;
							void 0 === c && (c = g.toolbar.length - 1), f = angular.element(h.children()[c]), void 0 === e ? (f.append(g.tools[a].$element), g.toolbar[c][g.toolbar[c].length - 1] = a) : (f.children().eq(e).after(g.tools[a].$element), g.toolbar[c][e] = a)
						}, b.registerToolbar(g), g.$on("$destroy", function() {
							b.unregisterToolbar(g.name)
						})
					}
				}
			}]).service("taToolExecuteAction", ["$q", function(a) {
				return function(b) {
					void 0 !== b && (this.$editor = function() {
						return b
					});
					var c = a.defer(),
						d = c.promise,
						e = this.$editor();
					d["finally"](function() {
						e.endAction.call(e)
					});
					var f;
					try {
						f = this.action(c, e.startAction())
					} catch(g) {}(f || void 0 === f) && c.resolve()
				}
			}]).service("textAngularManager", ["taToolExecuteAction", "taTools", "taRegisterTool", function(a, b, c) {
				var d = {},
					e = {};
				return {
					registerEditor: function(c, f, g) {
						if(!c || "" === c) throw "textAngular Error: An editor requires a name";
						if(!f) throw "textAngular Error: An editor requires a scope";
						if(e[c]) throw 'textAngular Error: An Editor with name "' + c + '" already exists';
						var h = [];
						return angular.forEach(g, function(a) {
							d[a] && h.push(d[a])
						}), e[c] = {
							scope: f,
							toolbars: g,
							_registerToolbar: function(a) {
								this.toolbars.indexOf(a.name) >= 0 && h.push(a)
							},
							editorFunctions: {
								disable: function() {
									angular.forEach(h, function(a) {
										a.disabled = !0
									})
								},
								enable: function() {
									angular.forEach(h, function(a) {
										a.disabled = !1
									})
								},
								focus: function() {
									angular.forEach(h, function(a) {
										a._parent = f, a.disabled = !1, a.focussed = !0
									})
								},
								unfocus: function() {
									angular.forEach(h, function(a) {
										a.disabled = !0, a.focussed = !1
									})
								},
								updateSelectedStyles: function(a) {
									angular.forEach(h, function(b) {
										angular.forEach(b.tools, function(b) {
											b.activeState && (b.active = b.activeState(a))
										})
									})
								},
								sendKeyCommand: function(c) {
									var d = !1;
									return(c.ctrlKey || c.metaKey) && angular.forEach(b, function(b, e) {
										if(b.commandKeyCode && b.commandKeyCode === c.which)
											for(var g = 0; g < h.length; g++)
												if(void 0 !== h[g].tools[e]) {
													a.call(h[g].tools[e], f), d = !0;
													break
												}
									}), d
								},
								triggerElementSelect: function(a, c) {
									var d = function(a, b) {
											for(var c = !0, d = 0; d < b.length; d++) c = c && a.attr(b[d]);
											return c
										},
										e = [],
										g = {},
										i = !1;
									c = angular.element(c);
									var j = !1;
									if(angular.forEach(b, function(a, b) {
											a.onElementSelect && a.onElementSelect.element && a.onElementSelect.element.toLowerCase() === c[0].tagName.toLowerCase() && (!a.onElementSelect.filter || a.onElementSelect.filter(c)) && (j = j || angular.isArray(a.onElementSelect.onlyWithAttrs) && d(c, a.onElementSelect.onlyWithAttrs), (!a.onElementSelect.onlyWithAttrs || d(c, a.onElementSelect.onlyWithAttrs)) && (g[b] = a))
										}), j ? (angular.forEach(g, function(a, b) {
											a.onElementSelect.onlyWithAttrs && d(c, a.onElementSelect.onlyWithAttrs) && e.push({
												name: b,
												tool: a
											})
										}), e.sort(function(a, b) {
											return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length
										})) : angular.forEach(g, function(a, b) {
											e.push({
												name: b,
												tool: a
											})
										}), e.length > 0)
										for(var k = 0; k < e.length; k++) {
											for(var l = e[k].tool, m = e[k].name, n = 0; n < h.length; n++)
												if(void 0 !== h[n].tools[m]) {
													l.onElementSelect.action.call(h[n].tools[m], a, c, f), i = !0;
													break
												}
											if(i) break
										}
									return i
								}
							}
						}, e[c].editorFunctions
					},
					retrieveEditor: function(a) {
						return e[a]
					},
					unregisterEditor: function(a) {
						delete e[a]
					},
					registerToolbar: function(a) {
						if(!a) throw "textAngular Error: A toolbar requires a scope";
						if(!a.name || "" === a.name) throw "textAngular Error: A toolbar requires a name";
						if(d[a.name]) throw 'textAngular Error: A toolbar with name "' + a.name + '" already exists';
						d[a.name] = a, angular.forEach(e, function(b) {
							b._registerToolbar(a)
						})
					},
					retrieveToolbar: function(a) {
						return d[a]
					},
					retrieveToolbarsViaEditor: function(a) {
						var b = [],
							c = this;
						return angular.forEach(this.retrieveEditor(a).toolbars, function(a) {
							b.push(c.retrieveToolbar(a))
						}), b
					},
					unregisterToolbar: function(a) {
						delete d[a]
					},
					updateToolsDisplay: function(a) {
						var b = this;
						angular.forEach(a, function(a, c) {
							b.updateToolDisplay(c, a)
						})
					},
					resetToolsDisplay: function() {
						var a = this;
						angular.forEach(b, function(b, c) {
							a.resetToolDisplay(c)
						})
					},
					updateToolDisplay: function(a, b) {
						var c = this;
						angular.forEach(d, function(d, e) {
							c.updateToolbarToolDisplay(e, a, b)
						})
					},
					resetToolDisplay: function(a) {
						var b = this;
						angular.forEach(d, function(c, d) {
							b.resetToolbarToolDisplay(d, a)
						})
					},
					updateToolbarToolDisplay: function(a, b, c) {
						if(!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
						d[a].updateToolDisplay(b, c)
					},
					resetToolbarToolDisplay: function(a, c) {
						if(!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
						d[a].updateToolDisplay(c, b[c], !0)
					},
					removeTool: function(a) {
						delete b[a], angular.forEach(d, function(b) {
							delete b.tools[a];
							for(var c = 0; c < b.toolbar.length; c++) {
								for(var d, e = 0; e < b.toolbar[c].length; e++) {
									if(b.toolbar[c][e] === a) {
										d = {
											group: c,
											index: e
										};
										break
									}
									if(void 0 !== d) break
								}
								void 0 !== d && (b.toolbar[d.group].slice(d.index, 1), b._$element.children().eq(d.group).children().eq(d.index).remove())
							}
						})
					},
					addTool: function(a, b, e, f) {
						c(a, b), angular.forEach(d, function(c) {
							c.addTool(a, b, e, f)
						})
					},
					addToolToToolbar: function(a, b, e, f, g) {
						c(a, b), d[e].addTool(a, b, f, g)
					},
					refreshEditor: function(a) {
						if(!e[a]) throw 'textAngular Error: No Editor with name "' + a + '" exists';
						e[a].scope.updateTaBindtaTextElement(), e[a].scope.$$phase || e[a].scope.$digest()
					}
				}
			}]).service("taSelection", ["$window", "$document", function(a, b) {
				var c = b[0],
					d = function(a) {
						if(a.hasChildNodes()) return a.firstChild;
						for(; a && !a.nextSibling;) a = a.parentNode;
						return a ? a.nextSibling : null
					},
					e = function(a) {
						var b = a.startContainer,
							c = a.endContainer;
						if(b === c) return [b];
						for(var e = []; b && b !== c;) b = d(b), b.parentNode === a.commonAncestorContainer && e.push(b);
						for(b = a.startContainer; b && b !== a.commonAncestorContainer;) b.parentNode === a.commonAncestorContainer && e.unshift(b), b = b.parentNode;
						return e
					};
				return {
					getOnlySelectedElements: function() {
						if(window.getSelection) {
							var b = a.getSelection();
							if(!b.isCollapsed) return e(b.getRangeAt(0))
						}
						return []
					},
					getSelectionElement: function() {
						var b, d, e;
						return c.selection && c.selection.createRange ? (b = c.selection.createRange(), b.parentElement()) : a.getSelection && (d = a.getSelection(), d.getRangeAt ? d.rangeCount > 0 && (b = d.getRangeAt(0)) : (b = c.createRange(), b.setStart(d.anchorNode, d.anchorOffset), b.setEnd(d.focusNode, d.focusOffset), b.collapsed !== d.isCollapsed && (b.setStart(d.focusNode, d.focusOffset), b.setEnd(d.anchorNode, d.anchorOffset))), b) ? (e = b.commonAncestorContainer, 3 === e.nodeType ? e.parentNode : e) : void 0
					},
					setSelectionToElementStart: function(b) {
						if(c.createRange && a.getSelection) {
							var d = c.createRange();
							d.selectNodeContents(b), d.setStart(b, 0), d.setEnd(b, 0);
							var e = a.getSelection();
							e.removeAllRanges(), e.addRange(d)
						} else if(c.selection && c.body.createTextRange) {
							var f = c.body.createTextRange();
							f.moveToElementText(b), f.collapse(!0), f.moveEnd("character", 0), f.moveStart("character", 0), f.select()
						}
					},
					setSelectionToElementEnd: function(b) {
						if(c.createRange && a.getSelection) {
							var d = c.createRange();
							d.selectNodeContents(b), d.collapse(!1);
							var e = a.getSelection();
							e.removeAllRanges(), e.addRange(d)
						} else if(c.selection && c.body.createTextRange) {
							var f = c.body.createTextRange();
							f.moveToElementText(b), f.collapse(!1), f.select()
						}
					}
				}
			}])
		}()
}({}, function() {
	return this
}());

angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope", function(a, b, c) {
	function d(a) {
		for(var b in a)
			if(void 0 !== f.style[b]) return a[b]
	}
	var e = function(d, f, g) {
			g = g || {};
			var h = a.defer(),
				i = e[g.animation ? "animationEndEventName" : "transitionEndEventName"],
				j = function() {
					c.$apply(function() {
						d.unbind(i, j), h.resolve(d)
					})
				};
			return i && d.bind(i, j), b(function() {
				angular.isString(f) ? d.addClass(f) : angular.isFunction(f) ? f(d) : angular.isObject(f) && d.css(f), i || h.resolve(d)
			}), h.promise.cancel = function() {
				i && d.unbind(i, j), h.reject("Transition cancelled")
			}, h.promise
		},
		f = document.createElement("trans"),
		g = {
			WebkitTransition: "webkitTransitionEnd",
			MozTransition: "transitionend",
			OTransition: "oTransitionEnd",
			transition: "transitionend"
		},
		h = {
			WebkitTransition: "webkitAnimationEnd",
			MozTransition: "animationend",
			OTransition: "oAnimationEnd",
			transition: "animationend"
		};
	return e.transitionEndEventName = d(g), e.animationEndEventName = d(h), e
}]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition", function(a) {
	return {
		link: function(b, c, d) {
			function e(b) {
				function d() {
					j === e && (j = void 0)
				}
				var e = a(c, b);
				return j && j.cancel(), j = e, e.then(d, d), e
			}

			function f() {
				k ? (k = !1, g()) : (c.removeClass("collapse").addClass("collapsing"), e({
					height: c[0].scrollHeight + "px"
				}).then(g))
			}

			function g() {
				c.removeClass("collapsing"), c.addClass("collapse in"), c.css({
					height: "auto"
				})
			}

			function h() {
				k ? (k = !1, i(), c.css({
					height: 0
				})) : (c.css({
					height: c[0].scrollHeight + "px"
				}), c[0].offsetWidth, c.removeClass("collapse in").addClass("collapsing"), e({
					height: 0
				}).then(i))
			}

			function i() {
				c.removeClass("collapsing"), c.addClass("collapse")
			}
			var j, k = !0;
			b.$watch(d.collapse, function(a) {
				a ? h() : f()
			})
		}
	}
}]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {
	closeOthers: !0
}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function(a, b, c) {
	this.groups = [], this.closeOthers = function(d) {
		var e = angular.isDefined(b.closeOthers) ? a.$eval(b.closeOthers) : c.closeOthers;
		e && angular.forEach(this.groups, function(a) {
			a !== d && (a.isOpen = !1)
		})
	}, this.addGroup = function(a) {
		var b = this;
		this.groups.push(a), a.$on("$destroy", function() {
			b.removeGroup(a)
		})
	}, this.removeGroup = function(a) {
		var b = this.groups.indexOf(a); - 1 !== b && this.groups.splice(b, 1)
	}
}]).directive("accordion", function() {
	return {
		restrict: "EA",
		controller: "AccordionController",
		transclude: !0,
		replace: !1,
		templateUrl: "template/accordion/accordion.html"
	}
}).directive("accordionGroup", function() {
	return {
		require: "^accordion",
		restrict: "EA",
		transclude: !0,
		replace: !0,
		templateUrl: "template/accordion/accordion-group.html",
		scope: {
			heading: "@",
			isOpen: "=?",
			isDisabled: "=?"
		},
		controller: function() {
			this.setHeading = function(a) {
				this.heading = a
			}
		},
		link: function(a, b, c, d) {
			d.addGroup(a), a.$watch("isOpen", function(b) {
				b && d.closeOthers(a)
			}), a.toggleOpen = function() {
				a.isDisabled || (a.isOpen = !a.isOpen)
			}
		}
	}
}).directive("accordionHeading", function() {
	return {
		restrict: "EA",
		transclude: !0,
		template: "",
		replace: !0,
		require: "^accordionGroup",
		link: function(a, b, c, d, e) {
			d.setHeading(e(a, function() {}))
		}
	}
}).directive("accordionTransclude", function() {
	return {
		require: "^accordionGroup",
		link: function(a, b, c, d) {
			a.$watch(function() {
				return d[c.accordionTransclude]
			}, function(a) {
				a && (b.html(""), b.append(a))
			})
		}
	}
}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs", function(a, b) {
	a.closeable = "close" in b, this.close = a.close
}]).directive("alert", function() {
	return {
		restrict: "EA",
		controller: "AlertController",
		templateUrl: "template/alert/alert.html",
		transclude: !0,
		replace: !0,
		scope: {
			type: "@",
			close: "&"
		}
	}
}).directive("dismissOnTimeout", ["$timeout", function(a) {
	return {
		require: "alert",
		link: function(b, c, d, e) {
			a(function() {
				e.close()
			}, parseInt(d.dismissOnTimeout, 10))
		}
	}
}]), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function() {
	return function(a, b, c) {
		b.addClass("ng-binding").data("$binding", c.bindHtmlUnsafe), a.$watch(c.bindHtmlUnsafe, function(a) {
			b.html(a || "")
		})
	}
}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
	activeClass: "active",
	toggleEvent: "click"
}).controller("ButtonsController", ["buttonConfig", function(a) {
	this.activeClass = a.activeClass || "active", this.toggleEvent = a.toggleEvent || "click"
}]).directive("btnRadio", function() {
	return {
		require: ["btnRadio", "ngModel"],
		controller: "ButtonsController",
		link: function(a, b, c, d) {
			var e = d[0],
				f = d[1];
			f.$render = function() {
				b.toggleClass(e.activeClass, angular.equals(f.$modelValue, a.$eval(c.btnRadio)))
			}, b.bind(e.toggleEvent, function() {
				var d = b.hasClass(e.activeClass);
				(!d || angular.isDefined(c.uncheckable)) && a.$apply(function() {
					f.$setViewValue(d ? null : a.$eval(c.btnRadio)), f.$render()
				})
			})
		}
	}
}).directive("btnCheckbox", function() {
	return {
		require: ["btnCheckbox", "ngModel"],
		controller: "ButtonsController",
		link: function(a, b, c, d) {
			function e() {
				return g(c.btnCheckboxTrue, !0)
			}

			function f() {
				return g(c.btnCheckboxFalse, !1)
			}

			function g(b, c) {
				var d = a.$eval(b);
				return angular.isDefined(d) ? d : c
			}
			var h = d[0],
				i = d[1];
			i.$render = function() {
				b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()))
			}, b.bind(h.toggleEvent, function() {
				a.$apply(function() {
					i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()), i.$render()
				})
			})
		}
	}
}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$interval", "$transition", function(a, b, c, d) {
	function e() {
		f();
		var b = +a.interval;
		!isNaN(b) && b > 0 && (h = c(g, b))
	}

	function f() {
		h && (c.cancel(h), h = null)
	}

	function g() {
		var b = +a.interval;
		i && !isNaN(b) && b > 0 ? a.next() : a.pause()
	}
	var h, i, j = this,
		k = j.slides = a.slides = [],
		l = -1;
	j.currentSlide = null;
	var m = !1;
	j.select = a.select = function(c, f) {
		function g() {
			m || (j.currentSlide && angular.isString(f) && !a.noTransition && c.$element ? (c.$element.addClass(f), c.$element[0].offsetWidth, angular.forEach(k, function(a) {
				angular.extend(a, {
					direction: "",
					entering: !1,
					leaving: !1,
					active: !1
				})
			}), angular.extend(c, {
				direction: f,
				active: !0,
				entering: !0
			}), angular.extend(j.currentSlide || {}, {
				direction: f,
				leaving: !0
			}), a.$currentTransition = d(c.$element, {}), function(b, c) {
				a.$currentTransition.then(function() {
					h(b, c)
				}, function() {
					h(b, c)
				})
			}(c, j.currentSlide)) : h(c, j.currentSlide), j.currentSlide = c, l = i, e())
		}

		function h(b, c) {
			angular.extend(b, {
				direction: "",
				active: !0,
				leaving: !1,
				entering: !1
			}), angular.extend(c || {}, {
				direction: "",
				active: !1,
				leaving: !1,
				entering: !1
			}), a.$currentTransition = null
		}
		var i = k.indexOf(c);
		void 0 === f && (f = i > l ? "next" : "prev"), c && c !== j.currentSlide && (a.$currentTransition ? (a.$currentTransition.cancel(), b(g)) : g())
	}, a.$on("$destroy", function() {
		m = !0
	}), j.indexOfSlide = function(a) {
		return k.indexOf(a)
	}, a.next = function() {
		var b = (l + 1) % k.length;
		return a.$currentTransition ? void 0 : j.select(k[b], "next")
	}, a.prev = function() {
		var b = 0 > l - 1 ? k.length - 1 : l - 1;
		return a.$currentTransition ? void 0 : j.select(k[b], "prev")
	}, a.isActive = function(a) {
		return j.currentSlide === a
	}, a.$watch("interval", e), a.$on("$destroy", f), a.play = function() {
		i || (i = !0, e())
	}, a.pause = function() {
		a.noPause || (i = !1, f())
	}, j.addSlide = function(b, c) {
		b.$element = c, k.push(b), 1 === k.length || b.active ? (j.select(k[k.length - 1]), 1 == k.length && a.play()) : b.active = !1
	}, j.removeSlide = function(a) {
		var b = k.indexOf(a);
		k.splice(b, 1), k.length > 0 && a.active ? j.select(b >= k.length ? k[b - 1] : k[b]) : l > b && l--
	}
}]).directive("carousel", [function() {
	return {
		restrict: "EA",
		transclude: !0,
		replace: !0,
		controller: "CarouselController",
		require: "carousel",
		templateUrl: "template/carousel/carousel.html",
		scope: {
			interval: "=",
			noTransition: "=",
			noPause: "="
		}
	}
}]).directive("slide", function() {
	return {
		require: "^carousel",
		restrict: "EA",
		transclude: !0,
		replace: !0,
		templateUrl: "template/carousel/slide.html",
		scope: {
			active: "=?"
		},
		link: function(a, b, c, d) {
			d.addSlide(a, b), a.$on("$destroy", function() {
				d.removeSlide(a)
			}), a.$watch("active", function(b) {
				b && d.select(a)
			})
		}
	}
}), angular.module("ui.bootstrap.dateparser", []).service("dateParser", ["$locale", "orderByFilter", function(a, b) {
	function c(a) {
		var c = [],
			d = a.split("");
		return angular.forEach(e, function(b, e) {
			var f = a.indexOf(e);
			if(f > -1) {
				a = a.split(""), d[f] = "(" + b.regex + ")", a[f] = "$";
				for(var g = f + 1, h = f + e.length; h > g; g++) d[g] = "", a[g] = "$";
				a = a.join(""), c.push({
					index: f,
					apply: b.apply
				})
			}
		}), {
			regex: new RegExp("^" + d.join("") + "$"),
			map: b(c, "index")
		}
	}

	function d(a, b, c) {
		return 1 === b && c > 28 ? 29 === c && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) : 3 === b || 5 === b || 8 === b || 10 === b ? 31 > c : !0
	}
	this.parsers = {};
	var e = {
		yyyy: {
			regex: "\\d{4}",
			apply: function(a) {
				this.year = +a
			}
		},
		yy: {
			regex: "\\d{2}",
			apply: function(a) {
				this.year = +a + 2e3
			}
		},
		y: {
			regex: "\\d{1,4}",
			apply: function(a) {
				this.year = +a
			}
		},
		MMMM: {
			regex: a.DATETIME_FORMATS.MONTH.join("|"),
			apply: function(b) {
				this.month = a.DATETIME_FORMATS.MONTH.indexOf(b)
			}
		},
		MMM: {
			regex: a.DATETIME_FORMATS.SHORTMONTH.join("|"),
			apply: function(b) {
				this.month = a.DATETIME_FORMATS.SHORTMONTH.indexOf(b)
			}
		},
		MM: {
			regex: "0[1-9]|1[0-2]",
			apply: function(a) {
				this.month = a - 1
			}
		},
		M: {
			regex: "[1-9]|1[0-2]",
			apply: function(a) {
				this.month = a - 1
			}
		},
		dd: {
			regex: "[0-2][0-9]{1}|3[0-1]{1}",
			apply: function(a) {
				this.date = +a
			}
		},
		d: {
			regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
			apply: function(a) {
				this.date = +a
			}
		},
		EEEE: {
			regex: a.DATETIME_FORMATS.DAY.join("|")
		},
		EEE: {
			regex: a.DATETIME_FORMATS.SHORTDAY.join("|")
		}
	};
	this.parse = function(b, e) {
		if(!angular.isString(b) || !e) return b;
		e = a.DATETIME_FORMATS[e] || e, this.parsers[e] || (this.parsers[e] = c(e));
		var f = this.parsers[e],
			g = f.regex,
			h = f.map,
			i = b.match(g);
		if(i && i.length) {
			for(var j, k = {
					year: 1900,
					month: 0,
					date: 1,
					hours: 0
				}, l = 1, m = i.length; m > l; l++) {
				var n = h[l - 1];
				n.apply && n.apply.call(k, i[l])
			}
			return d(k.year, k.month, k.date) && (j = new Date(k.year, k.month, k.date, k.hours)), j
		}
	}
}]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function(a, b) {
	function c(a, c) {
		return a.currentStyle ? a.currentStyle[c] : b.getComputedStyle ? b.getComputedStyle(a)[c] : a.style[c]
	}

	function d(a) {
		return "static" === (c(a, "position") || "static")
	}
	var e = function(b) {
		for(var c = a[0], e = b.offsetParent || c; e && e !== c && d(e);) e = e.offsetParent;
		return e || c
	};
	return {
		position: function(b) {
			var c = this.offset(b),
				d = {
					top: 0,
					left: 0
				},
				f = e(b[0]);
			f != a[0] && (d = this.offset(angular.element(f)), d.top += f.clientTop - f.scrollTop, d.left += f.clientLeft - f.scrollLeft);
			var g = b[0].getBoundingClientRect();
			return {
				width: g.width || b.prop("offsetWidth"),
				height: g.height || b.prop("offsetHeight"),
				top: c.top - d.top,
				left: c.left - d.left
			}
		},
		offset: function(c) {
			var d = c[0].getBoundingClientRect();
			return {
				width: d.width || c.prop("offsetWidth"),
				height: d.height || c.prop("offsetHeight"),
				top: d.top + (b.pageYOffset || a[0].documentElement.scrollTop),
				left: d.left + (b.pageXOffset || a[0].documentElement.scrollLeft)
			}
		},
		positionElements: function(a, b, c, d) {
			var e, f, g, h, i = c.split("-"),
				j = i[0],
				k = i[1] || "center";
			e = d ? this.offset(a) : this.position(a), f = b.prop("offsetWidth"), g = b.prop("offsetHeight");
			var l = {
					center: function() {
						return e.left + e.width / 2 - f / 2
					},
					left: function() {
						return e.left
					},
					right: function() {
						return e.left + e.width
					}
				},
				m = {
					center: function() {
						return e.top + e.height / 2 - g / 2
					},
					top: function() {
						return e.top
					},
					bottom: function() {
						return e.top + e.height
					}
				};
			switch(j) {
				case "right":
					h = {
						top: m[k](),
						left: l[j]()
					};
					break;
				case "left":
					h = {
						top: m[k](),
						left: e.left - f
					};
					break;
				case "bottom":
					h = {
						top: m[j](),
						left: l[k]()
					};
					break;
				default:
					h = {
						top: e.top - g,
						left: l[k]()
					}
			}
			return h
		}
	}
}]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).constant("datepickerConfig", {
	formatDay: "dd",
	formatMonth: "MMMM",
	formatYear: "yyyy",
	formatDayHeader: "EEE",
	formatDayTitle: "MMMM yyyy",
	formatMonthTitle: "yyyy",
	datepickerMode: "day",
	minMode: "day",
	maxMode: "year",
	showWeeks: !0,
	startingDay: 0,
	yearRange: 20,
	minDate: null,
	maxDate: null
}).controller("DatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig", function(a, b, c, d, e, f, g, h) {
	var i = this,
		j = {
			$setViewValue: angular.noop
		};
	this.modes = ["day", "month", "year"], angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange"], function(c, e) {
		i[c] = angular.isDefined(b[c]) ? 8 > e ? d(b[c])(a.$parent) : a.$parent.$eval(b[c]) : h[c]
	}), angular.forEach(["minDate", "maxDate"], function(d) {
		b[d] ? a.$parent.$watch(c(b[d]), function(a) {
			i[d] = a ? new Date(a) : null, i.refreshView()
		}) : i[d] = h[d] ? new Date(h[d]) : null
	}), a.datepickerMode = a.datepickerMode || h.datepickerMode, a.uniqueId = "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random()), this.activeDate = angular.isDefined(b.initDate) ? a.$parent.$eval(b.initDate) : new Date, a.isActive = function(b) {
		return 0 === i.compare(b.date, i.activeDate) ? (a.activeDateId = b.uid, !0) : !1
	}, this.init = function(a) {
		j = a, j.$render = function() {
			i.render()
		}
	}, this.render = function() {
		if(j.$modelValue) {
			var a = new Date(j.$modelValue),
				b = !isNaN(a);
			b ? this.activeDate = a : f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), j.$setValidity("date", b)
		}
		this.refreshView()
	}, this.refreshView = function() {
		if(this.element) {
			this._refreshView();
			var a = j.$modelValue ? new Date(j.$modelValue) : null;
			j.$setValidity("date-disabled", !a || this.element && !this.isDisabled(a))
		}
	}, this.createDateObject = function(a, b) {
		var c = j.$modelValue ? new Date(j.$modelValue) : null;
		return {
			date: a,
			label: g(a, b),
			selected: c && 0 === this.compare(a, c),
			disabled: this.isDisabled(a),
			current: 0 === this.compare(a, new Date)
		}
	}, this.isDisabled = function(c) {
		return this.minDate && this.compare(c, this.minDate) < 0 || this.maxDate && this.compare(c, this.maxDate) > 0 || b.dateDisabled && a.dateDisabled({
			date: c,
			mode: a.datepickerMode
		})
	}, this.split = function(a, b) {
		for(var c = []; a.length > 0;) c.push(a.splice(0, b));
		return c
	}, a.select = function(b) {
		if(a.datepickerMode === i.minMode) {
			var c = j.$modelValue ? new Date(j.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
			c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()), j.$setViewValue(c), j.$render()
		} else i.activeDate = b, a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) - 1]
	}, a.move = function(a) {
		var b = i.activeDate.getFullYear() + a * (i.step.years || 0),
			c = i.activeDate.getMonth() + a * (i.step.months || 0);
		i.activeDate.setFullYear(b, c, 1), i.refreshView()
	}, a.toggleMode = function(b) {
		b = b || 1, a.datepickerMode === i.maxMode && 1 === b || a.datepickerMode === i.minMode && -1 === b || (a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) + b])
	}, a.keys = {
		13: "enter",
		32: "space",
		33: "pageup",
		34: "pagedown",
		35: "end",
		36: "home",
		37: "left",
		38: "up",
		39: "right",
		40: "down"
	};
	var k = function() {
		e(function() {
			i.element[0].focus()
		}, 0, !1)
	};
	a.$on("datepicker.focus", k), a.keydown = function(b) {
		var c = a.keys[b.which];
		if(c && !b.shiftKey && !b.altKey)
			if(b.preventDefault(), b.stopPropagation(), "enter" === c || "space" === c) {
				if(i.isDisabled(i.activeDate)) return;
				a.select(i.activeDate), k()
			} else !b.ctrlKey || "up" !== c && "down" !== c ? (i.handleKeyDown(c, b), i.refreshView()) : (a.toggleMode("up" === c ? 1 : -1), k())
	}
}]).directive("datepicker", function() {
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "template/datepicker/datepicker.html",
		scope: {
			datepickerMode: "=?",
			dateDisabled: "&"
		},
		require: ["datepicker", "?^ngModel"],
		controller: "DatepickerController",
		link: function(a, b, c, d) {
			var e = d[0],
				f = d[1];
			f && e.init(f)
		}
	}
}).directive("daypicker", ["dateFilter", function(a) {
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "template/datepicker/day.html",
		require: "^datepicker",
		link: function(b, c, d, e) {
			function f(a, b) {
				return 1 !== b || a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? i[b] : 29
			}

			function g(a, b) {
				var c = new Array(b),
					d = new Date(a),
					e = 0;
				for(d.setHours(12); b > e;) c[e++] = new Date(d), d.setDate(d.getDate() + 1);
				return c
			}

			function h(a) {
				var b = new Date(a);
				b.setDate(b.getDate() + 4 - (b.getDay() || 7));
				var c = b.getTime();
				return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1
			}
			b.showWeeks = e.showWeeks, e.step = {
				months: 1
			}, e.element = c;
			var i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			e._refreshView = function() {
				var c = e.activeDate.getFullYear(),
					d = e.activeDate.getMonth(),
					f = new Date(c, d, 1),
					i = e.startingDay - f.getDay(),
					j = i > 0 ? 7 - i : -i,
					k = new Date(f);
				j > 0 && k.setDate(-j + 1);
				for(var l = g(k, 42), m = 0; 42 > m; m++) l[m] = angular.extend(e.createDateObject(l[m], e.formatDay), {
					secondary: l[m].getMonth() !== d,
					uid: b.uniqueId + "-" + m
				});
				b.labels = new Array(7);
				for(var n = 0; 7 > n; n++) b.labels[n] = {
					abbr: a(l[n].date, e.formatDayHeader),
					full: a(l[n].date, "EEEE")
				};
				if(b.title = a(e.activeDate, e.formatDayTitle), b.rows = e.split(l, 7), b.showWeeks) {
					b.weekNumbers = [];
					for(var o = h(b.rows[0][0].date), p = b.rows.length; b.weekNumbers.push(o++) < p;);
				}
			}, e.compare = function(a, b) {
				return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate())
			}, e.handleKeyDown = function(a) {
				var b = e.activeDate.getDate();
				if("left" === a) b -= 1;
				else if("up" === a) b -= 7;
				else if("right" === a) b += 1;
				else if("down" === a) b += 7;
				else if("pageup" === a || "pagedown" === a) {
					var c = e.activeDate.getMonth() + ("pageup" === a ? -1 : 1);
					e.activeDate.setMonth(c, 1), b = Math.min(f(e.activeDate.getFullYear(), e.activeDate.getMonth()), b)
				} else "home" === a ? b = 1 : "end" === a && (b = f(e.activeDate.getFullYear(), e.activeDate.getMonth()));
				e.activeDate.setDate(b)
			}, e.refreshView()
		}
	}
}]).directive("monthpicker", ["dateFilter", function(a) {
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "template/datepicker/month.html",
		require: "^datepicker",
		link: function(b, c, d, e) {
			e.step = {
				years: 1
			}, e.element = c, e._refreshView = function() {
				for(var c = new Array(12), d = e.activeDate.getFullYear(), f = 0; 12 > f; f++) c[f] = angular.extend(e.createDateObject(new Date(d, f, 1), e.formatMonth), {
					uid: b.uniqueId + "-" + f
				});
				b.title = a(e.activeDate, e.formatMonthTitle), b.rows = e.split(c, 3)
			}, e.compare = function(a, b) {
				return new Date(a.getFullYear(), a.getMonth()) - new Date(b.getFullYear(), b.getMonth())
			}, e.handleKeyDown = function(a) {
				var b = e.activeDate.getMonth();
				if("left" === a) b -= 1;
				else if("up" === a) b -= 3;
				else if("right" === a) b += 1;
				else if("down" === a) b += 3;
				else if("pageup" === a || "pagedown" === a) {
					var c = e.activeDate.getFullYear() + ("pageup" === a ? -1 : 1);
					e.activeDate.setFullYear(c)
				} else "home" === a ? b = 0 : "end" === a && (b = 11);
				e.activeDate.setMonth(b)
			}, e.refreshView()
		}
	}
}]).directive("yearpicker", ["dateFilter", function() {
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "template/datepicker/year.html",
		require: "^datepicker",
		link: function(a, b, c, d) {
			function e(a) {
				return parseInt((a - 1) / f, 10) * f + 1
			}
			var f = d.yearRange;
			d.step = {
				years: f
			}, d.element = b, d._refreshView = function() {
				for(var b = new Array(f), c = 0, g = e(d.activeDate.getFullYear()); f > c; c++) b[c] = angular.extend(d.createDateObject(new Date(g + c, 0, 1), d.formatYear), {
					uid: a.uniqueId + "-" + c
				});
				a.title = [b[0].label, b[f - 1].label].join(" - "), a.rows = d.split(b, 5)
			}, d.compare = function(a, b) {
				return a.getFullYear() - b.getFullYear()
			}, d.handleKeyDown = function(a) {
				var b = d.activeDate.getFullYear();
				"left" === a ? b -= 1 : "up" === a ? b -= 5 : "right" === a ? b += 1 : "down" === a ? b += 5 : "pageup" === a || "pagedown" === a ? b += ("pageup" === a ? -1 : 1) * d.step.years : "home" === a ? b = e(d.activeDate.getFullYear()) : "end" === a && (b = e(d.activeDate.getFullYear()) + f - 1), d.activeDate.setFullYear(b)
			}, d.refreshView()
		}
	}
}]).constant("datepickerPopupConfig", {
	datepickerPopup: "yyyy-MM-dd",
	currentText: "Today",
	clearText: "Clear",
	closeText: "Done",
	closeOnDateSelection: !0,
	appendToBody: !1,
	showButtonBar: !0
}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig", function(a, b, c, d, e, f, g) {
	return {
		restrict: "EA",
		require: "ngModel",
		scope: {
			isOpen: "=?",
			currentText: "@",
			clearText: "@",
			closeText: "@",
			dateDisabled: "&"
		},
		link: function(h, i, j, k) {
			function l(a) {
				return a.replace(/([A-Z])/g, function(a) {
					return "-" + a.toLowerCase()
				})
			}

			function m(a) {
				if(a) {
					if(angular.isDate(a) && !isNaN(a)) return k.$setValidity("date", !0), a;
					if(angular.isString(a)) {
						var b = f.parse(a, n) || new Date(a);
						return isNaN(b) ? void k.$setValidity("date", !1) : (k.$setValidity("date", !0), b)
					}
					return void k.$setValidity("date", !1)
				}
				return k.$setValidity("date", !0), null
			}
			var n, o = angular.isDefined(j.closeOnDateSelection) ? h.$parent.$eval(j.closeOnDateSelection) : g.closeOnDateSelection,
				p = angular.isDefined(j.datepickerAppendToBody) ? h.$parent.$eval(j.datepickerAppendToBody) : g.appendToBody;
			h.showButtonBar = angular.isDefined(j.showButtonBar) ? h.$parent.$eval(j.showButtonBar) : g.showButtonBar, h.getText = function(a) {
				return h[a + "Text"] || g[a + "Text"]
			}, j.$observe("datepickerPopup", function(a) {
				n = a || g.datepickerPopup, k.$render()
			});
			var q = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
			q.attr({
				"ng-model": "date",
				"ng-change": "dateSelection()"
			});
			var r = angular.element(q.children()[0]);
			j.datepickerOptions && angular.forEach(h.$parent.$eval(j.datepickerOptions), function(a, b) {
				r.attr(l(b), a)
			}), h.watchData = {}, angular.forEach(["minDate", "maxDate", "datepickerMode"], function(a) {
				if(j[a]) {
					var c = b(j[a]);
					if(h.$parent.$watch(c, function(b) {
							h.watchData[a] = b
						}), r.attr(l(a), "watchData." + a), "datepickerMode" === a) {
						var d = c.assign;
						h.$watch("watchData." + a, function(a, b) {
							a !== b && d(h.$parent, a)
						})
					}
				}
			}), j.dateDisabled && r.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), k.$parsers.unshift(m), h.dateSelection = function(a) {
				angular.isDefined(a) && (h.date = a), k.$setViewValue(h.date), k.$render(), o && (h.isOpen = !1, i[0].focus())
			}, i.bind("input change keyup", function() {
				h.$apply(function() {
					h.date = k.$modelValue
				})
			}), k.$render = function() {
				var a = k.$viewValue ? e(k.$viewValue, n) : "";
				i.val(a), h.date = m(k.$modelValue)
			};
			var s = function(a) {
					h.isOpen && a.target !== i[0] && h.$apply(function() {
						h.isOpen = !1
					})
				},
				t = function(a) {
					h.keydown(a)
				};
			i.bind("keydown", t), h.keydown = function(a) {
				27 === a.which ? (a.preventDefault(), a.stopPropagation(), h.close()) : 40 !== a.which || h.isOpen || (h.isOpen = !0)
			}, h.$watch("isOpen", function(a) {
				a ? (h.$broadcast("datepicker.focus"), h.position = p ? d.offset(i) : d.position(i), h.position.top = h.position.top + i.prop("offsetHeight"), c.bind("click", s)) : c.unbind("click", s)
			}), h.select = function(a) {
				if("today" === a) {
					var b = new Date;
					angular.isDate(k.$modelValue) ? (a = new Date(k.$modelValue), a.setFullYear(b.getFullYear(), b.getMonth(), b.getDate())) : a = new Date(b.setHours(0, 0, 0, 0))
				}
				h.dateSelection(a)
			}, h.close = function() {
				h.isOpen = !1, i[0].focus()
			};
			var u = a(q)(h);
			q.remove(), p ? c.find("body").append(u) : i.after(u), h.$on("$destroy", function() {
				u.remove(), i.unbind("keydown", t), c.unbind("click", s)
			})
		}
	}
}]).directive("datepickerPopupWrap", function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		templateUrl: "template/datepicker/popup.html",
		link: function(a, b) {
			b.bind("click", function(a) {
				a.preventDefault(), a.stopPropagation()
			})
		}
	}
}), angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {
	openClass: "open"
}).service("dropdownService", ["$document", function(a) {
	var b = null;
	this.open = function(e) {
		b || (a.bind("click", c), a.bind("keydown", d)), b && b !== e && (b.isOpen = !1), b = e
	}, this.close = function(e) {
		b === e && (b = null, a.unbind("click", c), a.unbind("keydown", d))
	};
	var c = function(a) {
			if(b) {
				var c = b.getToggleElement();
				a && c && c[0].contains(a.target) || b.$apply(function() {
					b.isOpen = !1
				})
			}
		},
		d = function(a) {
			27 === a.which && (b.focusToggleElement(), c())
		}
}]).controller("DropdownController", ["$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate", function(a, b, c, d, e, f) {
	var g, h = this,
		i = a.$new(),
		j = d.openClass,
		k = angular.noop,
		l = b.onToggle ? c(b.onToggle) : angular.noop;
	this.init = function(d) {
		h.$element = d, b.isOpen && (g = c(b.isOpen), k = g.assign, a.$watch(g, function(a) {
			i.isOpen = !!a
		}))
	}, this.toggle = function(a) {
		return i.isOpen = arguments.length ? !!a : !i.isOpen
	}, this.isOpen = function() {
		return i.isOpen
	}, i.getToggleElement = function() {
		return h.toggleElement
	}, i.focusToggleElement = function() {
		h.toggleElement && h.toggleElement[0].focus()
	}, i.$watch("isOpen", function(b, c) {
		f[b ? "addClass" : "removeClass"](h.$element, j), b ? (i.focusToggleElement(), e.open(i)) : e.close(i), k(a, b), angular.isDefined(b) && b !== c && l(a, {
			open: !!b
		})
	}), a.$on("$locationChangeSuccess", function() {
		i.isOpen = !1
	}), a.$on("$destroy", function() {
		i.$destroy()
	})
}]).directive("dropdown", function() {
	return {
		controller: "DropdownController",
		link: function(a, b, c, d) {
			d.init(b)
		}
	}
}).directive("dropdownToggle", function() {
	return {
		require: "?^dropdown",
		link: function(a, b, c, d) {
			if(d) {
				d.toggleElement = b;
				var e = function(e) {
					e.preventDefault(), b.hasClass("disabled") || c.disabled || a.$apply(function() {
						d.toggle()
					})
				};
				b.bind("click", e), b.attr({
					"aria-haspopup": !0,
					"aria-expanded": !1
				}), a.$watch(d.isOpen, function(a) {
					b.attr("aria-expanded", !!a)
				}), a.$on("$destroy", function() {
					b.unbind("click", e)
				})
			}
		}
	}
}), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function() {
	return {
		createNew: function() {
			var a = [];
			return {
				add: function(b, c) {
					a.push({
						key: b,
						value: c
					})
				},
				get: function(b) {
					for(var c = 0; c < a.length; c++)
						if(b == a[c].key) return a[c]
				},
				keys: function() {
					for(var b = [], c = 0; c < a.length; c++) b.push(a[c].key);
					return b
				},
				top: function() {
					return a[a.length - 1]
				},
				remove: function(b) {
					for(var c = -1, d = 0; d < a.length; d++)
						if(b == a[d].key) {
							c = d;
							break
						}
					return a.splice(c, 1)[0]
				},
				removeTop: function() {
					return a.splice(a.length - 1, 1)[0]
				},
				length: function() {
					return a.length
				}
			}
		}
	}
}).directive("modalBackdrop", ["$timeout", function(a) {
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "template/modal/backdrop.html",
		link: function(b, c, d) {
			b.backdropClass = d.backdropClass || "", b.animate = !1, a(function() {
				b.animate = !0
			})
		}
	}
}]).directive("modalWindow", ["$modalStack", "$timeout", function(a, b) {
	return {
		restrict: "EA",
		scope: {
			index: "@",
			animate: "="
		},
		replace: !0,
		transclude: !0,
		templateUrl: function(a, b) {
			return b.templateUrl || "template/modal/window.html"
		},
		link: function(c, d, e) {
			d.addClass(e.windowClass || ""), c.size = e.size, b(function() {
				c.animate = !0, d[0].querySelectorAll("[autofocus]").length || d[0].focus()
			}), c.close = function(b) {
				var c = a.getTop();
				c && c.value.backdrop && "static" != c.value.backdrop && b.target === b.currentTarget && (b.preventDefault(), b.stopPropagation(), a.dismiss(c.key, "backdrop click"))
			}
		}
	}
}]).directive("modalTransclude", function() {
	return {
		link: function(a, b, c, d, e) {
			e(a.$parent, function(a) {
				b.empty(), b.append(a)
			})
		}
	}
}).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function(a, b, c, d, e, f) {
	function g() {
		for(var a = -1, b = n.keys(), c = 0; c < b.length; c++) n.get(b[c]).value.backdrop && (a = c);
		return a
	}

	function h(a) {
		var b = c.find("body").eq(0),
			d = n.get(a).value;
		n.remove(a), j(d.modalDomEl, d.modalScope, 300, function() {
			d.modalScope.$destroy(), b.toggleClass(m, n.length() > 0), i()
		})
	}

	function i() {
		if(k && -1 == g()) {
			var a = l;
			j(k, l, 150, function() {
				a.$destroy(), a = null
			}), k = void 0, l = void 0
		}
	}

	function j(c, d, e, f) {
		function g() {
			g.done || (g.done = !0, c.remove(), f && f())
		}
		d.animate = !1;
		var h = a.transitionEndEventName;
		if(h) {
			var i = b(g, e);
			c.bind(h, function() {
				b.cancel(i), g(), d.$apply()
			})
		} else b(g)
	}
	var k, l, m = "modal-open",
		n = f.createNew(),
		o = {};
	return e.$watch(g, function(a) {
		l && (l.index = a)
	}), c.bind("keydown", function(a) {
		var b;
		27 === a.which && (b = n.top(), b && b.value.keyboard && (a.preventDefault(), e.$apply(function() {
			o.dismiss(b.key, "escape key press")
		})))
	}), o.open = function(a, b) {
		n.add(a, {
			deferred: b.deferred,
			modalScope: b.scope,
			backdrop: b.backdrop,
			keyboard: b.keyboard
		});
		var f = c.find("body").eq(0),
			h = g();
		if(h >= 0 && !k) {
			l = e.$new(!0), l.index = h;
			var i = angular.element("<div modal-backdrop></div>");
			i.attr("backdrop-class", b.backdropClass), k = d(i)(l), f.append(k)
		}
		var j = angular.element("<div modal-window></div>");
		j.attr({
			"template-url": b.windowTemplateUrl,
			"window-class": b.windowClass,
			size: b.size,
			index: n.length() - 1,
			animate: "animate"
		}).html(b.content);
		var o = d(j)(b.scope);
		n.top().value.modalDomEl = o, f.append(o), f.addClass(m)
	}, o.close = function(a, b) {
		var c = n.get(a);
		c && (c.value.deferred.resolve(b), h(a))
	}, o.dismiss = function(a, b) {
		var c = n.get(a);
		c && (c.value.deferred.reject(b), h(a))
	}, o.dismissAll = function(a) {
		for(var b = this.getTop(); b;) this.dismiss(b.key, a), b = this.getTop()
	}, o.getTop = function() {
		return n.top()
	}, o
}]).provider("$modal", function() {
	var a = {
		options: {
			backdrop: !0,
			keyboard: !0
		},
		$get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function(b, c, d, e, f, g, h) {
			function i(a) {
				return a.template ? d.when(a.template) : e.get(angular.isFunction(a.templateUrl) ? a.templateUrl() : a.templateUrl, {
					cache: f
				}).then(function(a) {
					return a.data
				})
			}

			function j(a) {
				var c = [];
				return angular.forEach(a, function(a) {
					(angular.isFunction(a) || angular.isArray(a)) && c.push(d.when(b.invoke(a)))
				}), c
			}
			var k = {};
			return k.open = function(b) {
				var e = d.defer(),
					f = d.defer(),
					k = {
						result: e.promise,
						opened: f.promise,
						close: function(a) {
							h.close(k, a)
						},
						dismiss: function(a) {
							h.dismiss(k, a)
						}
					};
				if(b = angular.extend({}, a.options, b), b.resolve = b.resolve || {}, !b.template && !b.templateUrl) throw new Error("One of template or templateUrl options is required.");
				var l = d.all([i(b)].concat(j(b.resolve)));
				return l.then(function(a) {
					var d = (b.scope || c).$new();
					d.$close = k.close, d.$dismiss = k.dismiss;
					var f, i = {},
						j = 1;
					b.controller && (i.$scope = d, i.$modalInstance = k, angular.forEach(b.resolve, function(b, c) {
						i[c] = a[j++]
					}), f = g(b.controller, i), b.controllerAs && (d[b.controllerAs] = f)), h.open(k, {
						scope: d,
						deferred: e,
						content: a[0],
						backdrop: b.backdrop,
						keyboard: b.keyboard,
						backdropClass: b.backdropClass,
						windowClass: b.windowClass,
						windowTemplateUrl: b.windowTemplateUrl,
						size: b.size
					})
				}, function(a) {
					e.reject(a)
				}), l.then(function() {
					f.resolve(!0)
				}, function() {
					f.reject(!1)
				}), k
			}, k
		}]
	};
	return a
}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", function(a, b, c) {
	var d = this,
		e = {
			$setViewValue: angular.noop
		},
		f = b.numPages ? c(b.numPages).assign : angular.noop;
	this.init = function(f, g) {
		e = f, this.config = g, e.$render = function() {
			d.render()
		}, b.itemsPerPage ? a.$parent.$watch(c(b.itemsPerPage), function(b) {
			d.itemsPerPage = parseInt(b, 10), a.totalPages = d.calculateTotalPages()
		}) : this.itemsPerPage = g.itemsPerPage
	}, this.calculateTotalPages = function() {
		var b = this.itemsPerPage < 1 ? 1 : Math.ceil(a.totalItems / this.itemsPerPage);
		return Math.max(b || 0, 1)
	}, this.render = function() {
		a.page = parseInt(e.$viewValue, 10) || 1
	}, a.selectPage = function(b) {
		a.page !== b && b > 0 && b <= a.totalPages && (e.$setViewValue(b), e.$render())
	}, a.getText = function(b) {
		return a[b + "Text"] || d.config[b + "Text"]
	}, a.noPrevious = function() {
		return 1 === a.page
	}, a.noNext = function() {
		return a.page === a.totalPages
	}, a.$watch("totalItems", function() {
		a.totalPages = d.calculateTotalPages()
	}), a.$watch("totalPages", function(b) {
		f(a.$parent, b), a.page > b ? a.selectPage(b) : e.$render()
	})
}]).constant("paginationConfig", {
	itemsPerPage: 10,
	boundaryLinks: !1,
	directionLinks: !0,
	firstText: "First",
	previousText: "Previous",
	nextText: "Next",
	lastText: "Last",
	rotate: !0
}).directive("pagination", ["$parse", "paginationConfig", function(a, b) {
	return {
		restrict: "EA",
		scope: {
			totalItems: "=",
			firstText: "@",
			previousText: "@",
			nextText: "@",
			lastText: "@"
		},
		require: ["pagination", "?ngModel"],
		controller: "PaginationController",
		templateUrl: "template/pagination/pagination.html",
		replace: !0,
		link: function(c, d, e, f) {
			function g(a, b, c) {
				return {
					number: a,
					text: b,
					active: c
				}
			}

			function h(a, b) {
				var c = [],
					d = 1,
					e = b,
					f = angular.isDefined(k) && b > k;
				f && (l ? (d = Math.max(a - Math.floor(k / 2), 1), e = d + k - 1, e > b && (e = b, d = e - k + 1)) : (d = (Math.ceil(a / k) - 1) * k + 1, e = Math.min(d + k - 1, b)));
				for(var h = d; e >= h; h++) {
					var i = g(h, h, h === a);
					c.push(i)
				}
				if(f && !l) {
					if(d > 1) {
						var j = g(d - 1, "...", !1);
						c.unshift(j)
					}
					if(b > e) {
						var m = g(e + 1, "...", !1);
						c.push(m)
					}
				}
				return c
			}
			var i = f[0],
				j = f[1];
			if(j) {
				var k = angular.isDefined(e.maxSize) ? c.$parent.$eval(e.maxSize) : b.maxSize,
					l = angular.isDefined(e.rotate) ? c.$parent.$eval(e.rotate) : b.rotate;
				c.boundaryLinks = angular.isDefined(e.boundaryLinks) ? c.$parent.$eval(e.boundaryLinks) : b.boundaryLinks, c.directionLinks = angular.isDefined(e.directionLinks) ? c.$parent.$eval(e.directionLinks) : b.directionLinks, i.init(j, b), e.maxSize && c.$parent.$watch(a(e.maxSize), function(a) {
					k = parseInt(a, 10), i.render()
				});
				var m = i.render;
				i.render = function() {
					m(), c.page > 0 && c.page <= c.totalPages && (c.pages = h(c.page, c.totalPages))
				}
			}
		}
	}
}]).constant("pagerConfig", {
	itemsPerPage: 10,
	previousText: "« Previous",
	nextText: "Next »",
	align: !0
}).directive("pager", ["pagerConfig", function(a) {
	return {
		restrict: "EA",
		scope: {
			totalItems: "=",
			previousText: "@",
			nextText: "@"
		},
		require: ["pager", "?ngModel"],
		controller: "PaginationController",
		templateUrl: "template/pagination/pager.html",
		replace: !0,
		link: function(b, c, d, e) {
			var f = e[0],
				g = e[1];
			g && (b.align = angular.isDefined(d.align) ? b.$parent.$eval(d.align) : a.align, f.init(g, a))
		}
	}
}]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function() {
	function a(a) {
		var b = /[A-Z]/g,
			c = "-";
		return a.replace(b, function(a, b) {
			return(b ? c : "") + a.toLowerCase()
		})
	}
	var b = {
			placement: "top",
			animation: !0,
			popupDelay: 0
		},
		c = {
			mouseenter: "mouseleave",
			click: "click",
			focus: "blur"
		},
		d = {};
	this.options = function(a) {
		angular.extend(d, a)
	}, this.setTriggers = function(a) {
		angular.extend(c, a)
	}, this.$get = ["$window", "$compile", "$timeout", "$document", "$position", "$interpolate", function(e, f, g, h, i, j) {
		return function(e, k, l) {
			function m(a) {
				var b = a || n.trigger || l,
					d = c[b] || b;
				return {
					show: b,
					hide: d
				}
			}
			var n = angular.extend({}, b, d),
				o = a(e),
				p = j.startSymbol(),
				q = j.endSymbol(),
				r = "<div " + o + '-popup title="' + p + "title" + q + '" content="' + p + "content" + q + '" placement="' + p + "placement" + q + '" animation="animation" is-open="isOpen"></div>';
			return {
				restrict: "EA",
				compile: function() {
					var a = f(r);
					return function(b, c, d) {
						function f() {
							D.isOpen ? l() : j()
						}

						function j() {
							(!C || b.$eval(d[k + "Enable"])) && (s(), D.popupDelay ? z || (z = g(o, D.popupDelay, !1), z.then(function(a) {
								a()
							})) : o()())
						}

						function l() {
							b.$apply(function() {
								p()
							})
						}

						function o() {
							return z = null, y && (g.cancel(y), y = null), D.content ? (q(), w.css({
								top: 0,
								left: 0,
								display: "block"
							}), A ? h.find("body").append(w) : c.after(w), E(), D.isOpen = !0, D.$digest(), E) : angular.noop
						}

						function p() {
							D.isOpen = !1, g.cancel(z), z = null, D.animation ? y || (y = g(r, 500)) : r()
						}

						function q() {
							w && r(), x = D.$new(), w = a(x, angular.noop)
						}

						function r() {
							y = null, w && (w.remove(), w = null), x && (x.$destroy(), x = null)
						}

						function s() {
							t(), u()
						}

						function t() {
							var a = d[k + "Placement"];
							D.placement = angular.isDefined(a) ? a : n.placement
						}

						function u() {
							var a = d[k + "PopupDelay"],
								b = parseInt(a, 10);
							D.popupDelay = isNaN(b) ? n.popupDelay : b
						}

						function v() {
							var a = d[k + "Trigger"];
							F(), B = m(a), B.show === B.hide ? c.bind(B.show, f) : (c.bind(B.show, j), c.bind(B.hide, l))
						}
						var w, x, y, z, A = angular.isDefined(n.appendToBody) ? n.appendToBody : !1,
							B = m(void 0),
							C = angular.isDefined(d[k + "Enable"]),
							D = b.$new(!0),
							E = function() {
								var a = i.positionElements(c, w, D.placement, A);
								a.top += "px", a.left += "px", w.css(a)
							};
						D.isOpen = !1, d.$observe(e, function(a) {
							D.content = a, !a && D.isOpen && p()
						}), d.$observe(k + "Title", function(a) {
							D.title = a
						});
						var F = function() {
							c.unbind(B.show, j), c.unbind(B.hide, l)
						};
						v();
						var G = b.$eval(d[k + "Animation"]);
						D.animation = angular.isDefined(G) ? !!G : n.animation;
						var H = b.$eval(d[k + "AppendToBody"]);
						A = angular.isDefined(H) ? H : A, A && b.$on("$locationChangeSuccess", function() {
							D.isOpen && p()
						}), b.$on("$destroy", function() {
							g.cancel(y), g.cancel(z), F(), r(), D = null
						})
					}
				}
			}
		}
	}]
}).directive("tooltipPopup", function() {
	return {
		restrict: "EA",
		replace: !0,
		scope: {
			content: "@",
			placement: "@",
			animation: "&",
			isOpen: "&"
		},
		templateUrl: "template/tooltip/tooltip-popup.html"
	}
}).directive("tooltip", ["$tooltip", function(a) {
	return a("tooltip", "tooltip", "mouseenter")
}]).directive("tooltipHtmlUnsafePopup", function() {
	return {
		restrict: "EA",
		replace: !0,
		scope: {
			content: "@",
			placement: "@",
			animation: "&",
			isOpen: "&"
		},
		templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
	}
}).directive("tooltipHtmlUnsafe", ["$tooltip", function(a) {
	return a("tooltipHtmlUnsafe", "tooltip", "mouseenter")
}]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function() {
	return {
		restrict: "EA",
		replace: !0,
		scope: {
			title: "@",
			content: "@",
			placement: "@",
			animation: "&",
			isOpen: "&"
		},
		templateUrl: "template/popover/popover.html"
	}
}).directive("popover", ["$tooltip", function(a) {
	return a("popover", "popover", "click")
}]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
	animate: !0,
	max: 100
}).controller("ProgressController", ["$scope", "$attrs", "progressConfig", function(a, b, c) {
	var d = this,
		e = angular.isDefined(b.animate) ? a.$parent.$eval(b.animate) : c.animate;
	this.bars = [], a.max = angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max, this.addBar = function(b, c) {
		e || c.css({
			transition: "none"
		}), this.bars.push(b), b.$watch("value", function(c) {
			b.percent = +(100 * c / a.max).toFixed(2)
		}), b.$on("$destroy", function() {
			c = null, d.removeBar(b)
		})
	}, this.removeBar = function(a) {
		this.bars.splice(this.bars.indexOf(a), 1)
	}
}]).directive("progress", function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		controller: "ProgressController",
		require: "progress",
		scope: {},
		templateUrl: "template/progressbar/progress.html"
	}
}).directive("bar", function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		require: "^progress",
		scope: {
			value: "=",
			type: "@"
		},
		templateUrl: "template/progressbar/bar.html",
		link: function(a, b, c, d) {
			d.addBar(a, b)
		}
	}
}).directive("progressbar", function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		controller: "ProgressController",
		scope: {
			value: "=",
			type: "@"
		},
		templateUrl: "template/progressbar/progressbar.html",
		link: function(a, b, c, d) {
			d.addBar(a, angular.element(b.children()[0]))
		}
	}
}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
	max: 5,
	stateOn: null,
	stateOff: null
}).controller("RatingController", ["$scope", "$attrs", "ratingConfig", function(a, b, c) {
	var d = {
		$setViewValue: angular.noop
	};
	this.init = function(e) {
		d = e, d.$render = this.render, this.stateOn = angular.isDefined(b.stateOn) ? a.$parent.$eval(b.stateOn) : c.stateOn, this.stateOff = angular.isDefined(b.stateOff) ? a.$parent.$eval(b.stateOff) : c.stateOff;
		var f = angular.isDefined(b.ratingStates) ? a.$parent.$eval(b.ratingStates) : new Array(angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max);
		a.range = this.buildTemplateObjects(f)
	}, this.buildTemplateObjects = function(a) {
		for(var b = 0, c = a.length; c > b; b++) a[b] = angular.extend({
			index: b
		}, {
			stateOn: this.stateOn,
			stateOff: this.stateOff
		}, a[b]);
		return a
	}, a.rate = function(b) {
		!a.readonly && b >= 0 && b <= a.range.length && (d.$setViewValue(b), d.$render())
	}, a.enter = function(b) {
		a.readonly || (a.value = b), a.onHover({
			value: b
		})
	}, a.reset = function() {
		a.value = d.$viewValue, a.onLeave()
	}, a.onKeydown = function(b) {
		/(37|38|39|40)/.test(b.which) && (b.preventDefault(), b.stopPropagation(), a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)))
	}, this.render = function() {
		a.value = d.$viewValue
	}
}]).directive("rating", function() {
	return {
		restrict: "EA",
		require: ["rating", "ngModel"],
		scope: {
			readonly: "=?",
			onHover: "&",
			onLeave: "&"
		},
		controller: "RatingController",
		templateUrl: "template/rating/rating.html",
		replace: !0,
		link: function(a, b, c, d) {
			var e = d[0],
				f = d[1];
			f && e.init(f)
		}
	}
}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope", function(a) {
	var b = this,
		c = b.tabs = a.tabs = [];
	b.select = function(a) {
		angular.forEach(c, function(b) {
			b.active && b !== a && (b.active = !1, b.onDeselect())
		}), a.active = !0, a.onSelect()
	}, b.addTab = function(a) {
		c.push(a), 1 === c.length ? a.active = !0 : a.active && b.select(a)
	}, b.removeTab = function(a) {
		var e = c.indexOf(a);
		if(a.active && c.length > 1 && !d) {
			var f = e == c.length - 1 ? e - 1 : e + 1;
			b.select(c[f])
		}
		c.splice(e, 1)
	};
	var d;
	a.$on("$destroy", function() {
		d = !0
	})
}]).directive("tabset", function() {
	return {
		restrict: "EA",
		transclude: !0,
		replace: !0,
		scope: {
			type: "@"
		},
		controller: "TabsetController",
		templateUrl: "template/tabs/tabset.html",
		link: function(a, b, c) {
			a.vertical = angular.isDefined(c.vertical) ? a.$parent.$eval(c.vertical) : !1, a.justified = angular.isDefined(c.justified) ? a.$parent.$eval(c.justified) : !1
		}
	}
}).directive("tab", ["$parse", function(a) {
	return {
		require: "^tabset",
		restrict: "EA",
		replace: !0,
		templateUrl: "template/tabs/tab.html",
		transclude: !0,
		scope: {
			active: "=?",
			heading: "@",
			onSelect: "&select",
			onDeselect: "&deselect"
		},
		controller: function() {},
		compile: function(b, c, d) {
			return function(b, c, e, f) {
				b.$watch("active", function(a) {
					a && f.select(b)
				}), b.disabled = !1, e.disabled && b.$parent.$watch(a(e.disabled), function(a) {
					b.disabled = !!a
				}), b.select = function() {
					b.disabled || (b.active = !0)
				}, f.addTab(b), b.$on("$destroy", function() {
					f.removeTab(b)
				}), b.$transcludeFn = d
			}
		}
	}
}]).directive("tabHeadingTransclude", [function() {
	return {
		restrict: "A",
		require: "^tab",
		link: function(a, b) {
			a.$watch("headingElement", function(a) {
				a && (b.html(""), b.append(a))
			})
		}
	}
}]).directive("tabContentTransclude", function() {
	function a(a) {
		return a.tagName && (a.hasAttribute("tab-heading") || a.hasAttribute("data-tab-heading") || "tab-heading" === a.tagName.toLowerCase() || "data-tab-heading" === a.tagName.toLowerCase())
	}
	return {
		restrict: "A",
		require: "^tabset",
		link: function(b, c, d) {
			var e = b.$eval(d.tabContentTransclude);
			e.$transcludeFn(e.$parent, function(b) {
				angular.forEach(b, function(b) {
					a(b) ? e.headingElement = b : c.append(b)
				})
			})
		}
	}
}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
	hourStep: 1,
	minuteStep: 1,
	showMeridian: !0,
	meridians: null,
	readonlyInput: !1,
	mousewheel: !0
}).controller("TimepickerController", ["$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig", function(a, b, c, d, e, f) {
	function g() {
		var b = parseInt(a.hours, 10),
			c = a.showMeridian ? b > 0 && 13 > b : b >= 0 && 24 > b;
		return c ? (a.showMeridian && (12 === b && (b = 0), a.meridian === p[1] && (b += 12)), b) : void 0
	}

	function h() {
		var b = parseInt(a.minutes, 10);
		return b >= 0 && 60 > b ? b : void 0
	}

	function i(a) {
		return angular.isDefined(a) && a.toString().length < 2 ? "0" + a : a
	}

	function j(a) {
		k(), o.$setViewValue(new Date(n)), l(a)
	}

	function k() {
		o.$setValidity("time", !0), a.invalidHours = !1, a.invalidMinutes = !1
	}

	function l(b) {
		var c = n.getHours(),
			d = n.getMinutes();
		a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12), a.hours = "h" === b ? c : i(c), a.minutes = "m" === b ? d : i(d), a.meridian = n.getHours() < 12 ? p[0] : p[1]
	}

	function m(a) {
		var b = new Date(n.getTime() + 6e4 * a);
		n.setHours(b.getHours(), b.getMinutes()), j()
	}
	var n = new Date,
		o = {
			$setViewValue: angular.noop
		},
		p = angular.isDefined(b.meridians) ? a.$parent.$eval(b.meridians) : f.meridians || e.DATETIME_FORMATS.AMPMS;
	this.init = function(c, d) {
		o = c, o.$render = this.render;
		var e = d.eq(0),
			g = d.eq(1),
			h = angular.isDefined(b.mousewheel) ? a.$parent.$eval(b.mousewheel) : f.mousewheel;
		h && this.setupMousewheelEvents(e, g), a.readonlyInput = angular.isDefined(b.readonlyInput) ? a.$parent.$eval(b.readonlyInput) : f.readonlyInput, this.setupInputEvents(e, g)
	};
	var q = f.hourStep;
	b.hourStep && a.$parent.$watch(c(b.hourStep), function(a) {
		q = parseInt(a, 10)
	});
	var r = f.minuteStep;
	b.minuteStep && a.$parent.$watch(c(b.minuteStep), function(a) {
		r = parseInt(a, 10)
	}), a.showMeridian = f.showMeridian, b.showMeridian && a.$parent.$watch(c(b.showMeridian), function(b) {
		if(a.showMeridian = !!b, o.$error.time) {
			var c = g(),
				d = h();
			angular.isDefined(c) && angular.isDefined(d) && (n.setHours(c), j())
		} else l()
	}), this.setupMousewheelEvents = function(b, c) {
		var d = function(a) {
			a.originalEvent && (a = a.originalEvent);
			var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
			return a.detail || b > 0
		};
		b.bind("mousewheel wheel", function(b) {
			a.$apply(d(b) ? a.incrementHours() : a.decrementHours()), b.preventDefault()
		}), c.bind("mousewheel wheel", function(b) {
			a.$apply(d(b) ? a.incrementMinutes() : a.decrementMinutes()), b.preventDefault()
		})
	}, this.setupInputEvents = function(b, c) {
		if(a.readonlyInput) return a.updateHours = angular.noop, void(a.updateMinutes = angular.noop);
		var d = function(b, c) {
			o.$setViewValue(null), o.$setValidity("time", !1), angular.isDefined(b) && (a.invalidHours = b), angular.isDefined(c) && (a.invalidMinutes = c)
		};
		a.updateHours = function() {
			var a = g();
			angular.isDefined(a) ? (n.setHours(a), j("h")) : d(!0)
		}, b.bind("blur", function() {
			!a.invalidHours && a.hours < 10 && a.$apply(function() {
				a.hours = i(a.hours)
			})
		}), a.updateMinutes = function() {
			var a = h();
			angular.isDefined(a) ? (n.setMinutes(a), j("m")) : d(void 0, !0)
		}, c.bind("blur", function() {
			!a.invalidMinutes && a.minutes < 10 && a.$apply(function() {
				a.minutes = i(a.minutes)
			})
		})
	}, this.render = function() {
		var a = o.$modelValue ? new Date(o.$modelValue) : null;
		isNaN(a) ? (o.$setValidity("time", !1), d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (a && (n = a), k(), l())
	}, a.incrementHours = function() {
		m(60 * q)
	}, a.decrementHours = function() {
		m(60 * -q)
	}, a.incrementMinutes = function() {
		m(r)
	}, a.decrementMinutes = function() {
		m(-r)
	}, a.toggleMeridian = function() {
		m(720 * (n.getHours() < 12 ? 1 : -1))
	}
}]).directive("timepicker", function() {
	return {
		restrict: "EA",
		require: ["timepicker", "?^ngModel"],
		controller: "TimepickerController",
		replace: !0,
		scope: {},
		templateUrl: "template/timepicker/timepicker.html",
		link: function(a, b, c, d) {
			var e = d[0],
				f = d[1];
			f && e.init(f, b.find("input"))
		}
	}
}), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse", function(a) {
	var b = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
	return {
		parse: function(c) {
			var d = c.match(b);
			if(!d) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + c + '".');
			return {
				itemName: d[3],
				source: a(d[4]),
				viewMapper: a(d[2] || d[1]),
				modelMapper: a(d[1])
			}
		}
	}
}]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function(a, b, c, d, e, f, g) {
	var h = [9, 13, 27, 38, 40];
	return {
		require: "ngModel",
		link: function(i, j, k, l) {
			var m, n = i.$eval(k.typeaheadMinLength) || 1,
				o = i.$eval(k.typeaheadWaitMs) || 0,
				p = i.$eval(k.typeaheadEditable) !== !1,
				q = b(k.typeaheadLoading).assign || angular.noop,
				r = b(k.typeaheadOnSelect),
				s = k.typeaheadInputFormatter ? b(k.typeaheadInputFormatter) : void 0,
				t = k.typeaheadAppendToBody ? i.$eval(k.typeaheadAppendToBody) : !1,
				u = i.$eval(k.typeaheadFocusFirst) !== !1,
				v = b(k.ngModel).assign,
				w = g.parse(k.typeahead),
				x = i.$new();
			i.$on("$destroy", function() {
				x.$destroy()
			});
			var y = "typeahead-" + x.$id + "-" + Math.floor(1e4 * Math.random());
			j.attr({
				"aria-autocomplete": "list",
				"aria-expanded": !1,
				"aria-owns": y
			});
			var z = angular.element("<div typeahead-popup></div>");
			z.attr({
				id: y,
				matches: "matches",
				active: "activeIdx",
				select: "select(activeIdx)",
				query: "query",
				position: "position"
			}), angular.isDefined(k.typeaheadTemplateUrl) && z.attr("template-url", k.typeaheadTemplateUrl);
			var A = function() {
					x.matches = [], x.activeIdx = -1, j.attr("aria-expanded", !1)
				},
				B = function(a) {
					return y + "-option-" + a
				};
			x.$watch("activeIdx", function(a) {
				0 > a ? j.removeAttr("aria-activedescendant") : j.attr("aria-activedescendant", B(a))
			});
			var C = function(a) {
				var b = {
					$viewValue: a
				};
				q(i, !0), c.when(w.source(i, b)).then(function(c) {
					var d = a === l.$viewValue;
					if(d && m)
						if(c.length > 0) {
							x.activeIdx = u ? 0 : -1, x.matches.length = 0;
							for(var e = 0; e < c.length; e++) b[w.itemName] = c[e], x.matches.push({
								id: B(e),
								label: w.viewMapper(x, b),
								model: c[e]
							});
							x.query = a, x.position = t ? f.offset(j) : f.position(j), x.position.top = x.position.top + j.prop("offsetHeight"), j.attr("aria-expanded", !0)
						} else A();
					d && q(i, !1)
				}, function() {
					A(), q(i, !1)
				})
			};
			A(), x.query = void 0;
			var D, E = function(a) {
					D = d(function() {
						C(a)
					}, o)
				},
				F = function() {
					D && d.cancel(D)
				};
			l.$parsers.unshift(function(a) {
				return m = !0, a && a.length >= n ? o > 0 ? (F(), E(a)) : C(a) : (q(i, !1), F(), A()), p ? a : a ? void l.$setValidity("editable", !1) : (l.$setValidity("editable", !0), a)
			}), l.$formatters.push(function(a) {
				var b, c, d = {};
				return s ? (d.$model = a, s(i, d)) : (d[w.itemName] = a, b = w.viewMapper(i, d), d[w.itemName] = void 0, c = w.viewMapper(i, d), b !== c ? b : a)
			}), x.select = function(a) {
				var b, c, e = {};
				e[w.itemName] = c = x.matches[a].model, b = w.modelMapper(i, e), v(i, b), l.$setValidity("editable", !0), r(i, {
					$item: c,
					$model: b,
					$label: w.viewMapper(i, e)
				}), A(), d(function() {
					j[0].focus()
				}, 0, !1)
			}, j.bind("keydown", function(a) {
				0 !== x.matches.length && -1 !== h.indexOf(a.which) && (-1 != x.activeIdx || 13 !== a.which && 9 !== a.which) && (a.preventDefault(), 40 === a.which ? (x.activeIdx = (x.activeIdx + 1) % x.matches.length, x.$digest()) : 38 === a.which ? (x.activeIdx = (x.activeIdx > 0 ? x.activeIdx : x.matches.length) - 1, x.$digest()) : 13 === a.which || 9 === a.which ? x.$apply(function() {
					x.select(x.activeIdx)
				}) : 27 === a.which && (a.stopPropagation(), A(), x.$digest()))
			}), j.bind("blur", function() {
				m = !1
			});
			var G = function(a) {
				j[0] !== a.target && (A(), x.$digest())
			};
			e.bind("click", G), i.$on("$destroy", function() {
				e.unbind("click", G), t && H.remove()
			});
			var H = a(z)(x);
			t ? e.find("body").append(H) : j.after(H)
		}
	}
}]).directive("typeaheadPopup", function() {
	return {
		restrict: "EA",
		scope: {
			matches: "=",
			query: "=",
			active: "=",
			position: "=",
			select: "&"
		},
		replace: !0,
		templateUrl: "template/typeahead/typeahead-popup.html",
		link: function(a, b, c) {
			a.templateUrl = c.templateUrl, a.isOpen = function() {
				return a.matches.length > 0
			}, a.isActive = function(b) {
				return a.active == b
			}, a.selectActive = function(b) {
				a.active = b
			}, a.selectMatch = function(b) {
				a.select({
					activeIdx: b
				})
			}
		}
	}
}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse", function(a, b, c, d) {
	return {
		restrict: "EA",
		scope: {
			index: "=",
			match: "=",
			query: "="
		},
		link: function(e, f, g) {
			var h = d(g.templateUrl)(e.$parent) || "template/typeahead/typeahead-match.html";
			a.get(h, {
				cache: b
			}).success(function(a) {
				f.replaceWith(c(a.trim())(e))
			})
		}
	}
}]).filter("typeaheadHighlight", function() {
	function a(a) {
		return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
	}
	return function(b, c) {
		return c ? ("" + b).replace(new RegExp(a(c), "gi"), "<strong>$&</strong>") : b
	}
}), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function(a) {
	a.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')
}]), angular.module("template/accordion/accordion.html", []).run(["$templateCache", function(a) {
	a.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
}]), angular.module("template/alert/alert.html", []).run(["$templateCache", function(a) {
	a.put("template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
}]), angular.module("template/carousel/carousel.html", []).run(["$templateCache", function(a) {
	a.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')
}]), angular.module("template/carousel/slide.html", []).run(["$templateCache", function(a) {
	a.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")
}]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function(a) {
	a.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')
}]), angular.module("template/datepicker/day.html", []).run(["$templateCache", function(a) {
	a.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/month.html", []).run(["$templateCache", function(a) {
	a.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/popup.html", []).run(["$templateCache", function(a) {
	a.put("template/datepicker/popup.html", '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')
}]), angular.module("template/datepicker/year.html", []).run(["$templateCache", function(a) {
	a.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/modal/backdrop.html", []).run(["$templateCache", function(a) {
	a.put("template/modal/backdrop.html", '<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
}]), angular.module("template/modal/window.html", []).run(["$templateCache", function(a) {
	a.put("template/modal/window.html", '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>')
}]), angular.module("template/pagination/pager.html", []).run(["$templateCache", function(a) {
	a.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')
}]), angular.module("template/pagination/pagination.html", []).run(["$templateCache", function(a) {
	a.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')
}]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function(a) {
	a.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
}]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function(a) {
	a.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
}]), angular.module("template/popover/popover.html", []).run(["$templateCache", function(a) {
	a.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
}]), angular.module("template/progressbar/bar.html", []).run(["$templateCache", function(a) {
	a.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')
}]), angular.module("template/progressbar/progress.html", []).run(["$templateCache", function(a) {
	a.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
}]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function(a) {
	a.put("template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')
}]), angular.module("template/rating/rating.html", []).run(["$templateCache", function(a) {
	a.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')
}]), angular.module("template/tabs/tab.html", []).run(["$templateCache", function(a) {
	a.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
}]), angular.module("template/tabs/tabset.html", []).run(["$templateCache", function(a) {
	a.put("template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
}]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function(a) {
	a.put("template/timepicker/timepicker.html", '<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')
}]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function(a) {
	a.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
}]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function(a) {
	a.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
}]);