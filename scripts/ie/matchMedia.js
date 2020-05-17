window.matchMedia || (window.matchMedia = function() {
		"use strict";
		var styleMedia = window.styleMedia || window.media;
		if(!styleMedia) {
			var style = document.createElement("style"),
				script = document.getElementsByTagName("script")[0],
				info = null;
			style.type = "text/css", style.id = "matchmediajs-test", script.parentNode.insertBefore(style, script), info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle, styleMedia = {
				matchMedium: function(media) {
					var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
					return style.styleSheet ? style.styleSheet.cssText = text : style.textContent = text, "1px" === info.width
				}
			}
		}
		return function(media) {
			return {
				matches: styleMedia.matchMedium(media || "all"),
				media: media || "all"
			}
		}
	}()),
	function() {
		if(window.matchMedia && window.matchMedia("all").addListener) return !1;
		var localMatchMedia = window.matchMedia,
			hasMediaQueries = localMatchMedia("only all").matches,
			isListening = !1,
			timeoutID = 0,
			queries = [],
			handleChange = function() {
				clearTimeout(timeoutID), timeoutID = setTimeout(function() {
					for(var i = 0, il = queries.length; il > i; i++) {
						var mql = queries[i].mql,
							listeners = queries[i].listeners || [],
							matches = localMatchMedia(mql.media).matches;
						if(matches !== mql.matches) {
							mql.matches = matches;
							for(var j = 0, jl = listeners.length; jl > j; j++) listeners[j].call(window, mql)
						}
					}
				}, 30)
			};
		window.matchMedia = function(media) {
			var mql = localMatchMedia(media),
				listeners = [],
				index = 0;
			return mql.addListener = function(listener) {
				hasMediaQueries && (isListening || (isListening = !0, window.addEventListener("resize", handleChange, !0)), 0 === index && (index = queries.push({
					mql: mql,
					listeners: listeners
				})), listeners.push(listener))
			}, mql.removeListener = function(listener) {
				for(var i = 0, il = listeners.length; il > i; i++) listeners[i] === listener && listeners.splice(i, 1)
			}, mql
		}
	}();