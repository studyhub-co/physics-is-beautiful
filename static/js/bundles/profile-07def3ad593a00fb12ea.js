/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"profile": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./profiles/static/profiles/js/authenticated/index.jsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/actions/notifications.jsx":
/*!*****************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/actions/notifications.jsx ***!
  \*****************************************************************************/
/*! exports provided: receiveNotifications, setCancelSource, fetchNotifications, markAsRead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveNotifications", function() { return receiveNotifications; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCancelSource", function() { return setCancelSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifications", function() { return fetchNotifications; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markAsRead", function() { return markAsRead; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./profiles/static/profiles/js/authenticated/utils/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/config */ "./profiles/static/profiles/js/authenticated/utils/config.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./profiles/static/profiles/js/authenticated/constants/index.jsx");
/* harmony import */ var _utils_urls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/urls */ "./profiles/static/profiles/js/authenticated/utils/urls.jsx");




function receiveNotifications(notifications) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["NOTIFICATIONS_RECEIVE_NOTIFICATIONS"],
    payload: {
      notifications: notifications
    }
  };
}
function setCancelSource(cancelSource) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["NOTIFICATIONS_SET_CANCEL_SOURCE"],
    payload: {
      cancelSource: cancelSource
    }
  };
}
function fetchNotifications(nextPageUrl, filters) {
  var url = _utils_config__WEBPACK_IMPORTED_MODULE_1__["API_NOTIFICATIONS_PREFIX"];

  if (nextPageUrl) {
    url = nextPageUrl;
  }

  if (filters) {
    url += '?' + Object(_utils_urls__WEBPACK_IMPORTED_MODULE_3__["dictToURI"])(filters);
  }

  return function (dispatch, state) {
    var CancelToken = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().CancelToken;
    var source = CancelToken.source();
    dispatch(setCancelSource(source));
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(url, {
      cancelToken: source.token
    }).then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveNotifications(response.data));
    }).catch(function (thrown) {
      if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().isCancel(thrown)) {// silent cancel
      } else {
        throw thrown;
      }
    });
  };
}
function markAsRead(notification, markState) {
  // markState = 'read, unread'
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().post(_utils_config__WEBPACK_IMPORTED_MODULE_1__["API_NOTIFICATIONS_PREFIX"] + notification.id + '/mark_as_' + markState + '/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {});
  };
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/actions/profile.jsx":
/*!***********************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/actions/profile.jsx ***!
  \***********************************************************************/
/*! exports provided: receiveProfileMe, fetchProfileMe, receiveProfile, fetchingProfile, fetchProfile, updateProfile, updateReloadProfile, receiveBadges, fetchBadges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveProfileMe", function() { return receiveProfileMe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProfileMe", function() { return fetchProfileMe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveProfile", function() { return receiveProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchingProfile", function() { return fetchingProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProfile", function() { return fetchProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProfile", function() { return updateProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateReloadProfile", function() { return updateReloadProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveBadges", function() { return receiveBadges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchBadges", function() { return fetchBadges; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./profiles/static/profiles/js/authenticated/utils/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/config */ "./profiles/static/profiles/js/authenticated/utils/config.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./profiles/static/profiles/js/authenticated/constants/index.jsx");



function receiveProfileMe(me) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["PROFILE_RECEIVE_ME"],
    payload: {
      me: me
    }
  };
}
function fetchProfileMe() {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_1__["API_PROFILE_PREFIX"] + 'me').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveProfileMe(response.data));
    });
  };
}
function receiveProfile(profile) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["PROFILE_RECEIVE_PROFILE"],
    payload: {
      profile: profile
    }
  };
}
function fetchingProfile(state) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["PROFILE_FETCHING_PROFILE"],
    payload: {
      fetching: state
    }
  };
}
function fetchProfile(id) {
  return function (dispatch, state) {
    dispatch(fetchingProfile(true));
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_1__["API_PROFILE_PREFIX"] + id + '/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveProfile(response.data));
      dispatch(fetchingProfile(false));
    });
  };
}
function updateProfile(profileJson) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().patch(_utils_config__WEBPACK_IMPORTED_MODULE_1__["API_PROFILE_PREFIX"] + profileJson.id + '/', profileJson).then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {// dispatch(receiveProfile(response.data))
    });
  };
}
function updateReloadProfile(profileJson) {
  return function (dispatch, state) {
    return dispatch(updateProfile(profileJson)).then(function () {
      dispatch(fetchProfile(profileJson.id));
    });
  };
}
function receiveBadges(badges) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["PROFILE_RECEIVE_BADGES"],
    payload: {
      badges: badges
    }
  };
}
function fetchBadges(id) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_1__["API_PROFILE_PREFIX"] + id + '/badges/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveBadges(response.data));
    });
  };
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/actions/tab.jsx":
/*!*******************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/actions/tab.jsx ***!
  \*******************************************************************/
/*! exports provided: changeSelectedTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeSelectedTab", function() { return changeSelectedTab; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./profiles/static/profiles/js/authenticated/constants/index.jsx");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../history */ "./profiles/static/profiles/js/authenticated/history.jsx");


function changeSelectedTab(selectedTab, tabNamespace, profileId) {
  var fromChildren = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var filter = arguments.length > 4 ? arguments[4] : undefined;

  if (!fromChildren) {
    if (selectedTab !== 'profile') {
      var url = '/' + profileId + '/' + selectedTab + '/';

      if (filter) {
        url += filter + '/';
      }

      _history__WEBPACK_IMPORTED_MODULE_1__["default"].push(url);
    } else {
      _history__WEBPACK_IMPORTED_MODULE_1__["default"].push('/' + profileId + '/'); // root url
    }
  }

  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["CHANGE_SELECTED_TAB"],
    tab: selectedTab,
    namespace: tabNamespace
  };
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/app.jsx":
/*!***********************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/app.jsx ***!
  \***********************************************************/
/*! exports provided: default, AppNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppNotConnected", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/esm/index.js");
/* harmony import */ var react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dnd-html5-backend */ "./node_modules/react-dnd-html5-backend/dist/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import DragDropContext from 'react-dnd/lib/cjs/DragDropContext.js'





var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "app"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.children));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

App.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape().isRequired // dispatch: PropTypes.func.isRequired,
  // location: PropTypes.shape({
  //   pathname: PropTypes.string
  // })

};
App.defaultProps = {
  location: undefined
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    location: state.router.location
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_dnd__WEBPACK_IMPORTED_MODULE_2__["DndProvider"])(react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(App)));
 // chrome 41 fix
// https://tc39.github.io/ecma262/#sec-array.prototype.find

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


      var thisArg = arguments[1]; // 5. Let k be 0.

      var k = 0; // 6. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];

        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        } // e. Increase k by 1.


        k++;
      } // 7. Return undefined.


      return undefined;
    },
    configurable: true,
    writable: true
  });
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/components/Badge.jsx":
/*!************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/components/Badge.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Badge; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../history */ "./profiles/static/profiles/js/authenticated/history.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Badge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Badge, _React$Component);

  function Badge() {
    _classCallCheck(this, Badge);

    return _possibleConstructorReturn(this, _getPrototypeOf(Badge).apply(this, arguments));
  }

  _createClass(Badge, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        // href={this.props.badge.url}
        style: {
          cursor: 'pointer'
        },
        onClick: function onClick() {
          _history__WEBPACK_IMPORTED_MODULE_2__["default"].push(_this.props.badge.url);
        } // TODO add badge histroty page
        ,
        title: this.props.badge.description,
        className: 'badge badge-dark profile-badge'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'badge-dot badge-dot-color-' + this.props.badge.level
      }), this.props.badge.title), this.props.badge.count > 1 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'item-multiplier'
      }, "x"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'item-multiplier-count'
      }, this.props.badge.count)) : null);
    }
  }]);

  return Badge;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


Badge.propTypes = {
  badge: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/components/ChangePicturePopover.jsx":
/*!***************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/components/ChangePicturePopover.jsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChangePicturePopover; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ChangePicturePopover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChangePicturePopover, _React$Component);

  function ChangePicturePopover() {
    _classCallCheck(this, ChangePicturePopover);

    return _possibleConstructorReturn(this, _getPrototypeOf(ChangePicturePopover).apply(this, arguments));
  }

  _createClass(ChangePicturePopover, [{
    key: "render",
    value: function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        // className={className}
        style: {
          width: '30rem',
          textAlign: 'left',
          border: 'solid 1px #c8ccd0',
          boxShadow: '0 1px 5px rgba(12,13,14,0.3)',
          zIndex: '3000',
          // position: 'absolute',
          position: 'relative',
          padding: '1.5rem',
          backgroundColor: '#FFF',
          top: '0'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Change your picture"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
        fluid: true,
        style: {
          padding: 0
        }
      }, this.props.userAvatar ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
        className: 'pointer',
        onClick: function onClick() {
          _this.props.selectAvatar('u');
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 3,
        md: 3
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Image"], {
        fluid: true,
        rounded: true,
        src: this.props.userAvatar
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 7,
        md: 7,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Uploaded picture")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 1,
        md: 1
      }, this.props.selectedAvatar === 'u' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "glyphicon glyphicon-ok"
      }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)) : null, this.props.googleAvatarUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
        className: 'pointer',
        onClick: function onClick() {
          _this.props.selectAvatar('g');
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 3,
        md: 3
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Image"], {
        fluid: true,
        rounded: true,
        src: this.props.googleAvatarUrl
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 7,
        md: 7,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Google")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 1,
        md: 1
      }, this.props.selectedAvatar === 'g' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "glyphicon glyphicon-ok"
      }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)) : null, this.props.gravatarUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
        className: 'pointer',
        onClick: function onClick() {
          return _this.props.selectAvatar('a');
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 3,
        md: 3
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Image"], {
        fluid: true,
        rounded: true,
        src: this.props.gravatarUrl
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 7,
        md: 7,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Gravatar")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 1,
        md: 1
      }, this.props.selectedAvatar === 'a' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "glyphicon glyphicon-ok"
      }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)) : null));
    }
  }]);

  return ChangePicturePopover;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


ChangePicturePopover.propTypes = {
  gravatarUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  selectedAvatar: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  googleAvatarUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  userAvatar: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  selectAvatar: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired // userAvatar: PropTypes.oneOfType([null, PropTypes.string]).isRequired, # too old react version

};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/badge.jsx":
/*!***************************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/badge.jsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Badge; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Badge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Badge, _React$Component);

  function Badge() {
    _classCallCheck(this, Badge);

    return _possibleConstructorReturn(this, _getPrototypeOf(Badge).apply(this, arguments));
  }

  _createClass(Badge, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: this.props.user.get_absolute_url + 'activity/'
      }, this.props.badge.title, " badge"), " (", this.props.badge.description, ")");
    }
  }]);

  return Badge;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


Badge.propTypes = {
  badge: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  user: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/lesson.jsx":
/*!****************************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/lesson.jsx ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Lesson; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Lesson =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Lesson, _React$Component);

  function Lesson() {
    _classCallCheck(this, Lesson);

    return _possibleConstructorReturn(this, _getPrototypeOf(Lesson).apply(this, arguments));
  }

  _createClass(Lesson, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: '/curriculum/lessons/' + this.props.lesson.uuid
      }, this.props.lesson.name);
    }
  }]);

  return Lesson;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


Lesson.propTypes = {
  lesson: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/module.jsx":
/*!****************************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/module.jsx ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Module; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Module =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Module, _React$Component);

  function Module() {
    _classCallCheck(this, Module);

    return _possibleConstructorReturn(this, _getPrototypeOf(Module).apply(this, arguments));
  }

  _createClass(Module, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.module.name);
    }
  }]);

  return Module;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


Module.propTypes = {
  module: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/profile.jsx":
/*!*****************************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/profile.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Profile; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Profile =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile() {
    _classCallCheck(this, Profile);

    return _possibleConstructorReturn(this, _getPrototypeOf(Profile).apply(this, arguments));
  }

  _createClass(Profile, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: this.props.profile.get_absolute_url
      }, this.props.profile.display_name));
    }
  }]);

  return Profile;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


Profile.propTypes = {
  profile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/thread.jsx":
/*!****************************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/thread.jsx ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Thread; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Thread =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Thread, _React$Component);

  function Thread() {
    _classCallCheck(this, Thread);

    return _possibleConstructorReturn(this, _getPrototypeOf(Thread).apply(this, arguments));
  }

  _createClass(Thread, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: this.props.thread.url
      }, this.props.thread.title));
    }
  }]);

  return Thread;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


Thread.propTypes = {
  thread: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/components/Sheet.jsx":
/*!************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/components/Sheet.jsx ***!
  \************************************************************************/
/*! exports provided: Sheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sheet", function() { return Sheet; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
 // import {BackButton} from './../components/back_button'

function Sheet(props) {
  var className = 'container ' + (props.type || 'section') + '-sheet';
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className,
    style: {
      fontSize: '1.2rem'
    }
  }, props.children);
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/constants/index.jsx":
/*!***********************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/constants/index.jsx ***!
  \***********************************************************************/
/*! exports provided: PROFILE_RECEIVE_ME, PROFILE_RECEIVE_PROFILE, PROFILE_FETCHING_PROFILE, CHANGE_SELECTED_TAB, NOTIFICATIONS_RECEIVE_NOTIFICATIONS, NOTIFICATIONS_SET_CANCEL_SOURCE, PROFILE_RECEIVE_BADGES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE_RECEIVE_ME", function() { return PROFILE_RECEIVE_ME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE_RECEIVE_PROFILE", function() { return PROFILE_RECEIVE_PROFILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE_FETCHING_PROFILE", function() { return PROFILE_FETCHING_PROFILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_SELECTED_TAB", function() { return CHANGE_SELECTED_TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTIFICATIONS_RECEIVE_NOTIFICATIONS", function() { return NOTIFICATIONS_RECEIVE_NOTIFICATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTIFICATIONS_SET_CANCEL_SOURCE", function() { return NOTIFICATIONS_SET_CANCEL_SOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE_RECEIVE_BADGES", function() { return PROFILE_RECEIVE_BADGES; });
// profile
var PROFILE_RECEIVE_ME = 'PROFILE_RECEIVE_ME';
var PROFILE_RECEIVE_PROFILE = 'PROFILE_RECEIVE_PROFILE';
var PROFILE_FETCHING_PROFILE = 'PROFILE_FETCHING_PROFILE'; // tabs

var CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB'; // notifications

var NOTIFICATIONS_RECEIVE_NOTIFICATIONS = 'NOTIFICATIONS_RECEIVE_NOTIFICATIONS';
var NOTIFICATIONS_SET_CANCEL_SOURCE = 'NOTIFICATIONS_SET_CANCEL_SOURCE'; // badges

var PROFILE_RECEIVE_BADGES = 'PROFILE_RECEIVE_BADGES';

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/IndexView/activityTab.jsx":
/*!****************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/IndexView/activityTab.jsx ***!
  \****************************************************************************************/
/*! exports provided: default, ProfileTabViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileTabViewNotConnected", function() { return ActivityTabView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap/Row */ "./node_modules/react-bootstrap/Row.js");
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap/Col */ "./node_modules/react-bootstrap/Col.js");
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/tab */ "./profiles/static/profiles/js/authenticated/actions/tab.jsx");
/* harmony import */ var _actions_profile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/profile */ "./profiles/static/profiles/js/authenticated/actions/profile.jsx");
/* harmony import */ var _components_Badge__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Badge */ "./profiles/static/profiles/js/authenticated/components/Badge.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






 // import { Container, Row, Col, Button, Glyphicon, Overlay, Image, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
// import { RingLoader } from 'react-spinners'
// import Moment from 'react-moment'





var ActivityTabView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ActivityTabView, _React$Component);

  function ActivityTabView(props, context) {
    _classCallCheck(this, ActivityTabView);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActivityTabView).call(this, props, context));
  }

  _createClass(ActivityTabView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // if (!this.props.profile && !this.props.profile_fetching) {
      //   this.props.profileActions.fetchProfile(this.props.profileId)
      // }
      this.props.tabActions.changeSelectedTab('activity', 'profileTab', this.props.match.params.id, false);

      if (!this.props.badges) {
        this.props.profileActions.fetchBadges(this.props.match.params.id);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default.a, {
        style: {
          paddingTop: '2rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default.a, {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'blue-title'
      }, "Badges Awarded"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_4___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_5___default.a, {
        sm: 12,
        md: 12
      }, this.props.badges // TODO sort by level
      ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.badges.length === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "No badges") : null, this.props.badges.map(function (badge, i) {
        // TODO create badge component
        //   return <div key={badge.id}>{badge.title} {badge.count > 1 ? 'x ' + badge.count : null}</div>
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Badge__WEBPACK_IMPORTED_MODULE_8__["default"], {
          key: badge.id,
          badge: badge
        });
      })) : null)));
    }
  }]);

  return ActivityTabView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

ActivityTabView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  profileActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    // fetchProfile: PropTypes.func.isRequired,
    // updateReloadProfile: PropTypes.func.isRequired
    fetchBadges: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  // profile_fetching: PropTypes.bool,
  // profile: PropTypes.object,
  badges: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    // tab: tab: state.tabs.profileTab,
    // profile: state.profile.profile,
    // profile_fetching: state.profile.fetching
    badges: state.profile.badges
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_6__, dispatch),
    profileActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_profile__WEBPACK_IMPORTED_MODULE_7__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ActivityTabView));


/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/IndexView/index.jsx":
/*!**********************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/IndexView/index.jsx ***!
  \**********************************************************************************/
/*! exports provided: default, IndexViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexViewNotConnected", function() { return IndexView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-tabs-redux */ "./node_modules/react-tabs-redux/lib/index.js");
/* harmony import */ var react_tabs_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Sheet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Sheet */ "./profiles/static/profiles/js/authenticated/components/Sheet.jsx");
/* harmony import */ var _actions_profile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/profile */ "./profiles/static/profiles/js/authenticated/actions/profile.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/tab */ "./profiles/static/profiles/js/authenticated/actions/tab.jsx");
/* harmony import */ var _profileTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./profileTab */ "./profiles/static/profiles/js/authenticated/containers/IndexView/profileTab.jsx");
/* harmony import */ var _notificationsTab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./notificationsTab */ "./profiles/static/profiles/js/authenticated/containers/IndexView/notificationsTab.jsx");
/* harmony import */ var _settingsTab__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./settingsTab */ "./profiles/static/profiles/js/authenticated/containers/IndexView/settingsTab.jsx");
/* harmony import */ var _activityTab__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./activityTab */ "./profiles/static/profiles/js/authenticated/containers/IndexView/activityTab.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






 // import history from '../../history'









var IndexView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IndexView, _React$Component);

  function IndexView() {
    _classCallCheck(this, IndexView);

    return _possibleConstructorReturn(this, _getPrototypeOf(IndexView).apply(this, arguments));
  }

  _createClass(IndexView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!this.props.profile && !this.props.profile_fetching) {
        this.props.profileActions.fetchProfile(this.props.match.params.id);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var profileSettingsUrl = '/:id/settings/';
      var profileNotificationsUrl = '/:id/notifications/';
      var profileActivityUrl = '/:id/activity/';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Sheet__WEBPACK_IMPORTED_MODULE_6__["Sheet"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["Tabs"], {
        name: "profileTab",
        className: "tabs",
        handleSelect: function handleSelect(selectedTab, tabNamespace) {
          _this.props.tabActions.changeSelectedTab(selectedTab, tabNamespace, _this.props.match.params.id);
        },
        selectedTab: this.props.tab
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tab-links"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["TabLink"], {
        to: "profile"
      }, "Profile"), this.props.profile && this.props.profile.is_current_user_profile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["TabLink"], {
        to: "settings"
      }, "Settings") : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["TabLink"], {
        to: "activity"
      }, "Activity"), this.props.profile && this.props.profile.is_current_user_profile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["TabLink"], {
        to: "notifications"
      }, "Notifications") : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["TabContent"], {
        for: "profile"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_profileTab__WEBPACK_IMPORTED_MODULE_9__["default"], {
        profileId: this.props.match.params.id
      })), this.props.profile && this.props.profile.is_current_user_profile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["TabContent"], {
        for: "settings"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: profileSettingsUrl,
        component: _settingsTab__WEBPACK_IMPORTED_MODULE_11__["default"]
      })) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["TabContent"], {
        for: "activity"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: profileActivityUrl,
        component: _activityTab__WEBPACK_IMPORTED_MODULE_12__["default"]
      })), this.props.profile && this.props.profile.is_current_user_profile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_5__["TabContent"], {
        for: "notifications"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: profileNotificationsUrl,
        component: _notificationsTab__WEBPACK_IMPORTED_MODULE_10__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: profileNotificationsUrl + ':filter/',
        component: _notificationsTab__WEBPACK_IMPORTED_MODULE_10__["default"]
      })) : null)));
    }
  }]);

  return IndexView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

IndexView.propTypes = {
  // actions
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func.isRequired
  }).isRequired,
  profileActions: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    fetchProfile: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func.isRequired
  }).isRequired,
  // data
  tab: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  profile: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
  profile_fetching: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    tab: state.tabs.profileTab,
    profile: state.profile.profile,
    profile_fetching: state.profile.fetching
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    // profileActions: bindActionCreators(profileCreators, dispatch)
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_8__, dispatch),
    profileActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_profile__WEBPACK_IMPORTED_MODULE_7__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(IndexView));


/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/IndexView/notificationsTab.jsx":
/*!*********************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/IndexView/notificationsTab.jsx ***!
  \*********************************************************************************************/
/*! exports provided: default, NotificationsTabViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsTabViewNotConnected", function() { return NotificationsTabView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap/Col */ "./node_modules/react-bootstrap/Col.js");
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap/Container */ "./node_modules/react-bootstrap/Container.js");
/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap/Row */ "./node_modules/react-bootstrap/Row.js");
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_bootstrap_ListGroup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap/ListGroup */ "./node_modules/react-bootstrap/ListGroup.js");
/* harmony import */ var react_bootstrap_ListGroup__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_ListGroup__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_bootstrap_ListGroupItem__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap/ListGroupItem */ "./node_modules/react-bootstrap/ListGroupItem.js");
/* harmony import */ var react_bootstrap_ListGroupItem__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_ListGroupItem__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_infinite_scroller__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-infinite-scroller */ "./node_modules/react-infinite-scroller/index.js");
/* harmony import */ var react_infinite_scroller__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_infinite_scroller__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../history */ "./profiles/static/profiles/js/authenticated/history.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../actions/tab */ "./profiles/static/profiles/js/authenticated/actions/tab.jsx");
/* harmony import */ var _actions_notifications__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../actions/notifications */ "./profiles/static/profiles/js/authenticated/actions/notifications.jsx");
/* harmony import */ var _components_NotificationsDeserializers_profile__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../components/NotificationsDeserializers/profile */ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/profile.jsx");
/* harmony import */ var _components_NotificationsDeserializers_thread__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../components/NotificationsDeserializers/thread */ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/thread.jsx");
/* harmony import */ var _components_NotificationsDeserializers_badge__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../components/NotificationsDeserializers/badge */ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/badge.jsx");
/* harmony import */ var _components_NotificationsDeserializers_lesson__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../components/NotificationsDeserializers/lesson */ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/lesson.jsx");
/* harmony import */ var _components_NotificationsDeserializers_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../components/NotificationsDeserializers/module */ "./profiles/static/profiles/js/authenticated/components/NotificationsDeserializers/module.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









 // import Glyphicon from 'react-bootstrap/Glyphicon'





 // import Moment from 'react-moment'



 // import * as profileCreators from '../../actions/profile'







var NotificationsTabView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NotificationsTabView, _React$Component);

  function NotificationsTabView(props) {
    var _this;

    _classCallCheck(this, NotificationsTabView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NotificationsTabView).call(this, props));
    _this.state = {
      nextHref: null,
      notifications: []
    };
    _this.loadNextPage = _this.loadNextPage.bind(_assertThisInitialized(_this));
    _this.onFilterClick = _this.onFilterClick.bind(_assertThisInitialized(_this));
    _this.markAs = _this.markAs.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(NotificationsTabView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // if (!this.props.profile && !this.props.profile_fetching) {
      //   this.props.profileActions.fetchProfile(this.props.match.params.id)
      // }
      // var path = this.props.match.path
      // if (path.indexOf('/notifications/', path.length - '/notifications/'.length) !== -1) {
      if (!this.props.match.params.hasOwnProperty('filter') || this.props.match.params['filter'] !== 'read') {
        this.props.notificationsActions.fetchNotifications(null, {
          'filter': 'unread'
        });
        this.props.tabActions.changeSelectedTab('notifications', 'profileTab', this.props.match.params.id, false);
      } // console.log(this.props.match.params);
      // if (path.indexOf('/notifications/read/', path.length - '/notifications/read/'.length) !== -1) {


      if (this.props.match.params.hasOwnProperty('filter') && this.props.match.params['filter'] === 'read') {
        this.props.notificationsActions.fetchNotifications(null, {
          'filter': 'read'
        });
        this.props.tabActions.changeSelectedTab('notifications', 'profileTab', this.props.match.params.id, false, 'read');
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nexProps) {
      if (nexProps.notifications !== this.props.notifications) {
        var notifications = this.state.notifications.concat(nexProps.notifications['results']);
        this.setState({
          notifications: notifications,
          nextHref: nexProps.notifications['next']
        });
      }
    }
  }, {
    key: "loadNextPage",
    value: function loadNextPage() {
      var self = this;

      if (self.state.newNextPageUrl) {
        this.props.notificationsActions.fetchNotifications(self.state.newNextPageUrl);
      }
    }
  }, {
    key: "onFilterClick",
    value: function onFilterClick(filter) {
      if (this.props.cancelSource) {
        // cancel prev request
        this.props.cancelSource.cancel();
      }

      if (filter === 'unread') {
        if (this.props.match.params.hasOwnProperty('filter') && this.props.match.params['filter'] === 'read') {
          var unReadUrl = this.props.match.url.replace(/read\/$/, '');
          _history__WEBPACK_IMPORTED_MODULE_14__["default"].push(unReadUrl);
        }
      }

      if (filter === 'read') {
        if (!this.props.match.params.hasOwnProperty('filter') || this.props.match.params['filter'] !== 'read') {
          var readUrl = this.props.match.url + 'read/';
          _history__WEBPACK_IMPORTED_MODULE_14__["default"].push(readUrl);
        }
      }
    }
  }, {
    key: "markAs",
    value: function markAs(id) {
      // remove from this.state.notifications
      var notifications = this.state.notifications.filter(function (obj) {
        return obj.id !== id;
      });
      this.setState({
        notifications: notifications
      });

      if (this.props.match.params.hasOwnProperty('filter') && this.props.match.params['filter'] === 'read') {
        this.props.notificationsActions.markAsRead({
          id: id
        }, 'unread');
      } else {
        this.props.notificationsActions.markAsRead({
          id: id
        }, 'read');
      }
    }
  }, {
    key: "getNotificationStringFromOjbect",
    value: function getNotificationStringFromOjbect(notification, type) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, notification[type] && notification[type]['content_type'] === 'thread' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, type === 'target' ? 'on ' : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NotificationsDeserializers_thread__WEBPACK_IMPORTED_MODULE_18__["default"], {
        thread: notification[type]
      }), "\xA0") : null, notification[type] && notification[type]['content_type'] === 'badge' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, type === 'target' ? 'on ' : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NotificationsDeserializers_badge__WEBPACK_IMPORTED_MODULE_19__["default"], {
        badge: notification[type],
        user: notification['recipient']
      }), "\xA0") : null, notification[type] && notification[type]['content_type'] === 'lesson' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, type === 'target' ? 'on ' : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NotificationsDeserializers_lesson__WEBPACK_IMPORTED_MODULE_20__["default"], {
        lesson: notification[type]
      }), "\xA0") : null, notification[type] && notification[type]['content_type'] === 'module' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, type === 'target' ? 'on ' : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NotificationsDeserializers_module__WEBPACK_IMPORTED_MODULE_21__["default"], {
        module: notification[type]
      }), "\xA0") : null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var items = [];
      var markAsTitle = 'read';

      if (this.props.match.params.hasOwnProperty('filter') && this.props.match.params['filter'] === 'read') {
        markAsTitle = 'unread';
      }

      if (this.props.notifications) {
        var _loop = function _loop() {
          notification = _this2.state.notifications[i];
          var that = _this2;

          var getMarkAsFunc = function getMarkAsFunc(id) {
            return function () {
              that.markAs(id);
            };
          };

          actionString = _this2.getNotificationStringFromOjbect(notification, 'action_object');
          targetString = _this2.getNotificationStringFromOjbect(notification, 'target');
          items.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_8___default.a, {
            key: notification.id
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default.a, {
            sm: 2,
            md: 2
          }, notification['timesince']), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default.a, {
            sm: 8,
            md: 8
          }, notification['recipient'].id !== notification['actor'].id ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NotificationsDeserializers_profile__WEBPACK_IMPORTED_MODULE_17__["default"], {
            profile: notification['actor']
          }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "You've"), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, notification['verb']), "\xA0", actionString, targetString), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default.a, {
            sm: 2,
            md: 2
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaCheck"], {
            onClick: getMarkAsFunc(notification.id),
            title: 'Mark as ' + markAsTitle,
            style: {
              fontSize: '1.5rem',
              cursor: 'pointer'
            }
          }))));
        };

        for (var i = 0; i < this.state.notifications.length; i++) {
          var notification;
          var actionString;
          var targetString;

          _loop();
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_7___default.a, {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_8___default.a, {
        style: {
          padding: '2rem 0 0 0'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default.a, {
        sm: 2,
        md: 2
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_ListGroup__WEBPACK_IMPORTED_MODULE_10___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_ListGroupItem__WEBPACK_IMPORTED_MODULE_11___default.a, {
        onClick: function onClick() {
          return _this2.onFilterClick('unread');
        },
        action: true,
        style: {
          cursor: 'pointer',
          backgroundColor: markAsTitle === 'read' ? 'rgb(8, 209, 255)' : null
        }
      }, "Unread"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_ListGroupItem__WEBPACK_IMPORTED_MODULE_11___default.a, {
        onClick: function onClick() {
          return _this2.onFilterClick('read');
        },
        action: true,
        style: {
          cursor: 'pointer',
          backgroundColor: markAsTitle === 'unread' ? 'rgb(8, 209, 255)' : null
        }
      }, "Read"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default.a, {
        sm: 10,
        md: 10
      }, this.props.notifications ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_infinite_scroller__WEBPACK_IMPORTED_MODULE_13___default.a, {
        pageStart: 0,
        loadMore: this.loadNextPage,
        hasMore: this.state.hasMoreItems,
        loader: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: this.state.nextHref,
          style: {
            clear: 'both'
          }
        }) // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845

      }, items) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_8___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_6___default.a, {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          height: '10rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sweet-loading",
        style: {
          position: 'absolute'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_12__["RingLoader"], {
        color: '#1caff6',
        loading: Boolean(true)
      })))))))));
    }
  }]);

  return NotificationsTabView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

NotificationsTabView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  // profileActions: PropTypes.shape({
  //   fetchProfile: PropTypes.func.isRequired,
  //   updateReloadProfile: PropTypes.func.isRequired
  // }).isRequired,
  notificationsActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    fetchNotifications: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    markAsRead: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  // profile: PropTypes.object,
  // profile_fetching: PropTypes.bool,
  notifications: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  cancelSource: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object // dispatch: PropTypes.func.isRequired

};

var mapStateToProps = function mapStateToProps(state) {
  return {
    // profile: state.profile.profile,
    // profile_fetching: state.profile.fetching
    notifications: state.notifications.notifications,
    cancelSource: state.notifications.cancelSource
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_15__, dispatch),
    notificationsActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_notifications__WEBPACK_IMPORTED_MODULE_16__, dispatch) // profileActions: bindActionCreators(profileCreators, dispatch)

  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(NotificationsTabView));


/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/IndexView/profileTab.jsx":
/*!***************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/IndexView/profileTab.jsx ***!
  \***************************************************************************************/
/*! exports provided: default, ProfileTabViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileTabViewNotConnected", function() { return ProfileTabView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-moment */ "./node_modules/react-moment/dist/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/tab */ "./profiles/static/profiles/js/authenticated/actions/tab.jsx");
/* harmony import */ var _actions_profile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/profile */ "./profiles/static/profiles/js/authenticated/actions/profile.jsx");
/* harmony import */ var _components_ChangePicturePopover__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/ChangePicturePopover */ "./profiles/static/profiles/js/authenticated/components/ChangePicturePopover.jsx");
/* harmony import */ var _utils_editableLabel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/editableLabel */ "./profiles/static/profiles/js/authenticated/utils/editableLabel.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import { Route } from 'react-router'
// import { push } from 'connected-react-router'












var ProfileTabView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProfileTabView, _React$Component);

  function ProfileTabView(props, context) {
    var _this;

    _classCallCheck(this, ProfileTabView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProfileTabView).call(this, props, context)); // TODO refactor this
    // editFirstNameClick => editClick['FirstName']
    // onTitleChanged => editClick['FirstName']
    // this.state.firstNameEditMode => this.state.EditModes['firstName']
    // etc...

    _this.onChangeAvatarClick = _this.onChangeAvatarClick.bind(_assertThisInitialized(_this));
    _this.selectAvatar = _this.selectAvatar.bind(_assertThisInitialized(_this));
    _this.onFirstNameChanged = _this.onFirstNameChanged.bind(_assertThisInitialized(_this));
    _this.onLastNameChanged = _this.onLastNameChanged.bind(_assertThisInitialized(_this));
    _this.onDisplayNameChanged = _this.onDisplayNameChanged.bind(_assertThisInitialized(_this));
    _this.editFirstNameClick = _this.editFirstNameClick.bind(_assertThisInitialized(_this));
    _this.editLastNameClick = _this.editLastNameClick.bind(_assertThisInitialized(_this));
    _this.editDisplayNameClick = _this.editDisplayNameClick.bind(_assertThisInitialized(_this));
    _this.onEditHover = _this.onEditHover.bind(_assertThisInitialized(_this));
    _this.state = {
      showChangeImagePanel: false,
      firstNameEditMode: false,
      lastNameEditMode: false,
      displayNameEditMode: false,
      hoverEditOn: null
    };
    return _this;
  }

  _createClass(ProfileTabView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!this.props.profile && !this.props.profile_fetching) {
        this.props.profileActions.fetchProfile(this.props.profileId);
      } // this.props.tabActions.changeSelectedTab('profile', 'profileTab', this.props.match.params.id, false)

    }
  }, {
    key: "selectAvatar",
    value: function selectAvatar(type) {
      this.setState({
        showChangeImagePanel: false
      });

      if (type === this.props.profile.selected_avatar) {
        return;
      }

      var profile = {
        id: this.props.profile.id,
        selected_avatar: type
      };
      this.props.profileActions.updateReloadProfile(profile);
    }
  }, {
    key: "onFirstNameChanged",
    value: function onFirstNameChanged(name) {
      this.setState({
        firstNameEditMode: false
      });

      if (name === this.props.profile.first_name) {
        return;
      }

      var profile = {
        id: this.props.profile.id,
        first_name: name
      };
      this.props.profileActions.updateReloadProfile(profile);
    }
  }, {
    key: "onLastNameChanged",
    value: function onLastNameChanged(name) {
      this.setState({
        lastNameEditMode: false
      });

      if (name === this.props.profile.last_name) {
        return;
      }

      var profile = {
        id: this.props.profile.id,
        last_name: name
      };
      this.props.profileActions.updateReloadProfile(profile);
    }
  }, {
    key: "onDisplayNameChanged",
    value: function onDisplayNameChanged(name) {
      this.setState({
        displayNameEditMode: false
      });

      if (name === this.props.profile.display_name) {
        return;
      }

      var profile = {
        id: this.props.profile.id,
        display_name: name
      };
      this.props.profileActions.updateReloadProfile(profile);
    }
  }, {
    key: "onChangeAvatarClick",
    value: function onChangeAvatarClick() {
      this.setState({
        showChangeImagePanel: !this.state.showChangeImagePanel
      });
    }
  }, {
    key: "editFirstNameClick",
    value: function editFirstNameClick() {
      this.setState({
        firstNameEditMode: true
      });
    }
  }, {
    key: "editLastNameClick",
    value: function editLastNameClick() {
      this.setState({
        lastNameEditMode: true
      });
    }
  }, {
    key: "editDisplayNameClick",
    value: function editDisplayNameClick() {
      this.setState({
        displayNameEditMode: true
      });
    }
  }, {
    key: "onEditHover",
    value: function onEditHover(item) {
      this.setState({
        hoverEditOn: item
      });

      if (!item) {
        // hide overlay avatar image panel
        this.setState({
          showChangeImagePanel: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.profile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        style: {
          paddingTop: '2rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 2,
        md: 2,
        onMouseOver: function onMouseOver() {
          return _this2.onEditHover('avatar');
        },
        onMouseLeave: function onMouseLeave() {
          return _this2.onEditHover(null);
        }
      }, this.props.profile.avatar_url ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Image"], {
        fluid: true,
        src: this.props.profile.avatar_url,
        rounded: true
      })) : null, this.props.profile.is_current_user_profile && this.state.hoverEditOn === 'avatar' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        title: 'Change avatar',
        className: 'base-circle-edit bottom-circle-edit',
        onClick: this.onChangeAvatarClick,
        ref: function ref(node) {
          _this2._changeImageButton = node;
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaPencilAlt"], {
        style: {
          fontSize: '1rem',
          position: 'relative'
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Overlay"], {
        rootClose: Boolean(true),
        show: this.state.showChangeImagePanel,
        onHide: function onHide() {
          return _this2.setState({
            showChangeImagePanel: false
          });
        },
        placement: "bottom",
        container: this._changeImageButton // target={() => ReactDOM.findDOMNode(this.refs.target)}

      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ChangePicturePopover__WEBPACK_IMPORTED_MODULE_10__["default"], {
        googleAvatarUrl: this.props.profile.google_avatar_url,
        selectedAvatar: this.props.profile.avatar_url,
        gravatarUrl: this.props.profile.gravatar_url,
        userAvatar: this.props.profile.user_avatar,
        selectAvatar: this.selectAvatar
      }))) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 5,
        md: 5
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 12,
        md: 12
      }, !this.props.profile.is_current_user_profile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, this.props.profile.display_name) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        onMouseOver: function onMouseOver() {
          return _this2.onEditHover('display_name');
        },
        onMouseLeave: function onMouseLeave() {
          return _this2.onEditHover(null);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_editableLabel__WEBPACK_IMPORTED_MODULE_11__["EditableExternalEventLabel"], {
        value: this.props.profile.display_name,
        onChange: this.onDisplayNameChanged,
        editMode: this.state.displayNameEditMode
      }), this.state.hoverEditOn === 'display_name' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          position: 'relative',
          paddingLeft: '1rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'base-circle-edit'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaPencilAlt"], {
        style: {
          fontSize: '1rem',
          position: 'relative',
          top: '-0.5rem'
        },
        onClick: this.editDisplayNameClick
      }))) : null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        style: {
          fontSize: '2rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 6,
        md: 6,
        xs: 12
      }, !this.props.profile.is_current_user_profile ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onMouseOver: function onMouseOver() {
          return _this2.onEditHover('first_name');
        },
        onMouseLeave: function onMouseLeave() {
          return _this2.onEditHover(null);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_editableLabel__WEBPACK_IMPORTED_MODULE_11__["EditableExternalEventLabel"], {
        value: this.props.profile.first_name,
        onChange: this.onFirstNameChanged,
        editMode: this.state.firstNameEditMode
      }), this.state.hoverEditOn === 'first_name' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          position: 'relative',
          paddingLeft: '1rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'base-circle-edit'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaPencilAlt"], {
        style: {
          fontSize: '1rem',
          position: 'relative',
          top: '-0.75rem'
        },
        onClick: this.editFirstNameClick
      }))) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 6,
        md: 6,
        xs: 12
      }, !this.props.profile.is_current_user_profile ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onMouseOver: function onMouseOver() {
          return _this2.onEditHover('last_name');
        },
        onMouseLeave: function onMouseLeave() {
          return _this2.onEditHover(null);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_editableLabel__WEBPACK_IMPORTED_MODULE_11__["EditableExternalEventLabel"], {
        value: this.props.profile.last_name,
        onChange: this.onLastNameChanged,
        editMode: this.state.lastNameEditMode
      }), this.state.hoverEditOn === 'last_name' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          position: 'relative',
          paddingLeft: '1rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'base-circle-edit'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaPencilAlt"], {
        style: {
          fontSize: '1rem',
          position: 'relative',
          top: '-0.75rem'
        },
        onClick: this.editLastNameClick
      }))) : null)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 4,
        md: 4
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaUser"], null), " Member for ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_moment__WEBPACK_IMPORTED_MODULE_7___default.a, {
        toNow: true
      }, this.props.profile.created_on))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaEye"], null), " ", this.props.profile.profile_views || 0, " profile views")), this.props.profile.last_activity ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaClock"], null), " Last seen ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_moment__WEBPACK_IMPORTED_MODULE_7___default.a, {
        fromNow: true
      }, this.props.profile.last_activity))) : null))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          height: '10rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sweet-loading",
        style: {
          position: 'absolute'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_6__["RingLoader"], {
        color: '#1caff6',
        loading: Boolean(true)
      })))))));
    }
  }]);

  return ProfileTabView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

ProfileTabView.propTypes = {
  // tabActions: PropTypes.shape({
  //   changeSelectedTab: PropTypes.func.isRequired
  // }).isRequired,
  profileActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    fetchProfile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    updateReloadProfile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  // dispatch: PropTypes.func.isRequired,
  profile_fetching: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  profile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  profileId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    // tab: tab: state.tabs.profileTab,
    profile: state.profile.profile,
    profile_fetching: state.profile.fetching
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_8__, dispatch),
    profileActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_profile__WEBPACK_IMPORTED_MODULE_9__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ProfileTabView));


/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/IndexView/settingRow.jsx":
/*!***************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/IndexView/settingRow.jsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SettingRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 // TODO move to lib app

var SettingRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SettingRow, _React$Component);

  function SettingRow(props) {
    var _this;

    _classCallCheck(this, SettingRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SettingRow).call(this, props));

    if (_this.props.value) {
      _this.state = _defineProperty({}, props.uuid + 'checked', 'on');
    } else {
      _this.state = _defineProperty({}, props.uuid + 'checked', 'off');
    }

    _this.handleSettingsChange = _this.handleSettingsChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SettingRow, [{
    key: "handleSettingsChange",
    value: function handleSettingsChange(e, uuid) {
      var checked = 'on';

      if (this.state[uuid + 'checked'] === 'on') {
        checked = 'off';
      }

      this.setState(_defineProperty({}, uuid + 'checked', checked));

      if ('onChange' in this.props) {
        this.props.onChange(checked);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var style = {};
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 2,
        md: 2
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'pure-radiobutton'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: 'radio_on' + this.props.uuid,
        value: 'on',
        name: 'settings' + this.props.uuid,
        style: style,
        onChange: function onChange(e) {
          return _this2.handleSettingsChange(e, _this2.props.uuid);
        },
        type: "radio",
        checked: this.state[this.props.uuid + 'checked'] === 'on'
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: 'radio_on' + this.props.uuid
      }, 'On'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 2,
        md: 2
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'pure-radiobutton'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: 'radio_off' + this.props.uuid,
        value: 'off',
        name: 'settings' + this.props.uuid,
        style: style,
        onChange: function onChange(e) {
          return _this2.handleSettingsChange(e, _this2.props.uuid);
        },
        type: "radio",
        checked: this.state[this.props.uuid + 'checked'] === 'off'
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: 'radio_off' + this.props.uuid
      }, 'Off'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 8,
        md: 8
      }, this.props.text));
    }
  }]);

  return SettingRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


SettingRow.propTypes = {
  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  uuid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/IndexView/settingsTab.jsx":
/*!****************************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/IndexView/settingsTab.jsx ***!
  \****************************************************************************************/
/*! exports provided: default, SettingsTabViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsTabViewNotConnected", function() { return SettingsTabView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/tab */ "./profiles/static/profiles/js/authenticated/actions/tab.jsx");
/* harmony import */ var _actions_profile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/profile */ "./profiles/static/profiles/js/authenticated/actions/profile.jsx");
/* harmony import */ var _settingRow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./settingRow */ "./profiles/static/profiles/js/authenticated/containers/IndexView/settingRow.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var SettingsTabView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SettingsTabView, _React$Component);

  function SettingsTabView() {
    _classCallCheck(this, SettingsTabView);

    return _possibleConstructorReturn(this, _getPrototypeOf(SettingsTabView).apply(this, arguments));
  }

  _createClass(SettingsTabView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.tabActions.changeSelectedTab('settings', 'profileTab', this.props.match.params.id, false);

      if (!this.props.profile && !this.props.profile_fetching) {
        this.props.profileActions.fetchProfile(this.props.match.params.id);
      }
    }
  }, {
    key: "settingChanged",
    value: function settingChanged(name, value) {
      var profile = {
        id: this.props.profile.id
      };
      profile[name] = value;
      this.props.profileActions.updateReloadProfile(profile);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      // var baseUrl =  this.props.match.url.replace(/\/$/, '')
      // var studentClassroomUrl = baseUrl + '/:uuid/'
      //
      // var joinUrl = baseUrl + '/new/join'
      //
      // if (this.props.match.params && this.props.match.params.joinCode) {
      //   var joinCode = this.props.match.params.joinCode
      //   // join to classroom and redirect to classroom student view
      //   if (joinCode) {
      //     this.props.classroomActions.classroomJoinClassroom(joinCode)
      //   }
      // }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.profile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"], {
        style: {
          paddingTop: '2rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'blue-title'
      }, "Sounds settings"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_settingRow__WEBPACK_IMPORTED_MODULE_10__["default"], {
        value: this.props.profile.sound_enabled,
        onChange: function onChange(value) {
          _this.settingChanged('sound_enabled', value);
        },
        uuid: 'units',
        text: 'Sound effects'
      })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          height: '10rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sweet-loading",
        style: {
          position: 'absolute'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_7__["RingLoader"], {
        color: '#1caff6',
        loading: Boolean(true)
      })))))));
    }
  }]);

  return SettingsTabView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

SettingsTabView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  profileActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    fetchProfile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    updateReloadProfile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  profile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  profile_fetching: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    // tab: tab: state.tabs.profileTab,
    profile: state.profile.profile,
    profile_fetching: state.profile.fetching
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_8__, dispatch),
    profileActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_profile__WEBPACK_IMPORTED_MODULE_9__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(SettingsTabView));


/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/Root/DevTools.jsx":
/*!********************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/Root/DevTools.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_devtools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-devtools */ "./node_modules/redux-devtools/lib/index.js");
/* harmony import */ var redux_devtools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_devtools__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-devtools-log-monitor */ "./node_modules/redux-devtools-log-monitor/lib/index.js");
/* harmony import */ var redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-devtools-dock-monitor */ "./node_modules/redux-devtools-dock-monitor/lib/index.js");
/* harmony import */ var redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3__);
/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */

 // Monitors are separate packages, and you can make a custom one


 // createDevTools takes a monitor and produces a DevTools component

var DevTools = Object(redux_devtools__WEBPACK_IMPORTED_MODULE_1__["createDevTools"])( // Monitors are individually adjustable with props.
// Consult their repositories to learn about those props.
// Here, we put LogMonitor inside a DockMonitor.
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3___default.a, {
  toggleVisibilityKey: "ctrl-h",
  changePositionKey: "ctrl-q",
  defaultIsVisible: false
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2___default.a, {
  theme: "tomorrow"
})));
/* harmony default export */ __webpack_exports__["default"] = (DevTools);

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/Root/Root.dev.jsx":
/*!********************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/Root/Root.dev.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Root; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../routes */ "./profiles/static/profiles/js/authenticated/routes.jsx");
/* harmony import */ var _DevTools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DevTools */ "./profiles/static/profiles/js/authenticated/containers/Root/DevTools.jsx");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../app */ "./profiles/static/profiles/js/authenticated/app.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import { ConnectedRouter } from 'react-router-redux'







var Root =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root() {
    _classCallCheck(this, Root);

    return _possibleConstructorReturn(this, _getPrototypeOf(Root).apply(this, arguments));
  }

  _createClass(Root, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
        store: this.props.store
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app__WEBPACK_IMPORTED_MODULE_6__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(connected_react_router__WEBPACK_IMPORTED_MODULE_2__["ConnectedRouter"], {
        history: this.props.history
      }, _routes__WEBPACK_IMPORTED_MODULE_4__["default"])), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DevTools__WEBPACK_IMPORTED_MODULE_5__["default"], null))));
    }
  }]);

  return Root;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


Root.propTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape().isRequired,
  history: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape().isRequired
};

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/Root/Root.jsx":
/*!****************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/Root/Root.jsx ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(/*! ./Root.dev */ "./profiles/static/profiles/js/authenticated/containers/Root/Root.dev.jsx"); // eslint-disable-line global-require
} else {}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/containers/index.jsx":
/*!************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/containers/index.jsx ***!
  \************************************************************************/
/*! exports provided: IndexView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexView_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexView/index */ "./profiles/static/profiles/js/authenticated/containers/IndexView/index.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IndexView", function() { return _IndexView_index__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/history.jsx":
/*!***************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/history.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/config */ "./profiles/static/profiles/js/authenticated/utils/config.jsx");
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! history/createBrowserHistory */ "./node_modules/history/createBrowserHistory.js");
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_1___default()({
  basename: _utils_config__WEBPACK_IMPORTED_MODULE_0__["BASE_URL"]
}));

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/index.jsx":
/*!*************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/index.jsx ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./history */ "./profiles/static/profiles/js/authenticated/history.jsx");
/* harmony import */ var _containers_Root_Root__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/Root/Root */ "./profiles/static/profiles/js/authenticated/containers/Root/Root.jsx");
/* harmony import */ var _containers_Root_Root__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_containers_Root_Root__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store/configureStore */ "./profiles/static/profiles/js/authenticated/store/configureStore.jsx");
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_store_configureStore__WEBPACK_IMPORTED_MODULE_4__);





var initialState = {};
var target = document.getElementById('react-app');
var store = _store_configureStore__WEBPACK_IMPORTED_MODULE_4___default()(initialState, _history__WEBPACK_IMPORTED_MODULE_2__["default"]);
var node = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_Root_Root__WEBPACK_IMPORTED_MODULE_3___default.a, {
  store: store,
  history: _history__WEBPACK_IMPORTED_MODULE_2__["default"]
});
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(node, target);

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/reducers/index.jsx":
/*!**********************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/reducers/index.jsx ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile */ "./profiles/static/profiles/js/authenticated/reducers/profile.jsx");
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab */ "./profiles/static/profiles/js/authenticated/reducers/tab.jsx");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifications */ "./profiles/static/profiles/js/authenticated/reducers/notifications.jsx");




/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  profile: _profile__WEBPACK_IMPORTED_MODULE_1__["default"],
  tabs: _tab__WEBPACK_IMPORTED_MODULE_2__["default"],
  notifications: _notifications__WEBPACK_IMPORTED_MODULE_3__["default"]
}));

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/reducers/notifications.jsx":
/*!******************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/reducers/notifications.jsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return notificationsReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./profiles/static/profiles/js/authenticated/constants/index.jsx");

var initialState = {};
function notificationsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["NOTIFICATIONS_RECEIVE_NOTIFICATIONS"]:
      return Object.assign({}, state, {
        notifications: action.payload.notifications
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["NOTIFICATIONS_SET_CANCEL_SOURCE"]:
      return Object.assign({}, state, {
        cancelSource: action.payload.cancelSource
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/reducers/profile.jsx":
/*!************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/reducers/profile.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return profileReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./profiles/static/profiles/js/authenticated/constants/index.jsx");

var initialState = {};
function profileReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["PROFILE_RECEIVE_ME"]:
      return Object.assign({}, state, {
        me: action.payload.me
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["PROFILE_RECEIVE_PROFILE"]:
      return Object.assign({}, state, {
        profile: action.payload.profile
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["PROFILE_FETCHING_PROFILE"]:
      return Object.assign({}, state, {
        fetching: action.payload.fetching
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["PROFILE_RECEIVE_BADGES"]:
      return Object.assign({}, state, {
        badges: action.payload.badges
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/reducers/tab.jsx":
/*!********************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/reducers/tab.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tabsReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./profiles/static/profiles/js/authenticated/constants/index.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var initialState = {
  tab: null
};
function tabsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["CHANGE_SELECTED_TAB"]:
      return Object.assign({}, state, _defineProperty({}, action.namespace, action.tab));

    default:
      return state;
  }
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/routes.jsx":
/*!**************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/routes.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers */ "./profiles/static/profiles/js/authenticated/containers/index.jsx");



/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  path: '/:id/',
  component: _containers__WEBPACK_IMPORTED_MODULE_2__["IndexView"]
})));

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/store/configureStore.dev.jsx":
/*!********************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/store/configureStore.dev.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers */ "./profiles/static/profiles/js/authenticated/reducers/index.jsx");
/* harmony import */ var _containers_Root_DevTools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/Root/DevTools */ "./profiles/static/profiles/js/authenticated/containers/Root/DevTools.jsx");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */


 // import { routerMiddleware } from 'react-router-redux'




function configureStore(initialState, history) {
  var logger = Object(redux_logger__WEBPACK_IMPORTED_MODULE_1__["createLogger"])(); // Build the middleware for intercepting and dispatching navigation actions
  // const reduxRouterMiddleware = routerMiddleware(history)

  var middleware = Object(redux__WEBPACK_IMPORTED_MODULE_2__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_0__["default"], Object(connected_react_router__WEBPACK_IMPORTED_MODULE_5__["routerMiddleware"])(history), logger); // comment this for using inline dev tools, need comment compose below DevTools works only in one place

  var middlewareWithDevTools = Object(redux__WEBPACK_IMPORTED_MODULE_2__["compose"])(middleware, _containers_Root_DevTools__WEBPACK_IMPORTED_MODULE_4__["default"].instrument()); // use redux-devtools-extension (chrome)
  // uncomment this for using redux-devtools, need comment compose above DevTools works only in one place
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // const middlewareWithDevTools = composeEnhancers(
  //   middleware
  // )
  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating

  var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])( // rootReducer,
  Object(connected_react_router__WEBPACK_IMPORTED_MODULE_5__["connectRouter"])(history)(_reducers__WEBPACK_IMPORTED_MODULE_3__["default"]), initialState, middlewareWithDevTools // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(
  );

  if (false) {}

  return store;
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/store/configureStore.jsx":
/*!****************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/store/configureStore.jsx ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(/*! ./configureStore.dev */ "./profiles/static/profiles/js/authenticated/store/configureStore.dev.jsx"); // eslint-disable-line global-require
} else {}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/utils/config.jsx":
/*!********************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/utils/config.jsx ***!
  \********************************************************************/
/*! exports provided: BASE_URL, API_PROFILE_PREFIX, API_NOTIFICATIONS_PREFIX, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_URL", function() { return BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_PROFILE_PREFIX", function() { return API_PROFILE_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_NOTIFICATIONS_PREFIX", function() { return API_NOTIFICATIONS_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BASE_URL; });
var BASE_URL = '/profile';
var API_PROFILE_PREFIX = '/api/v1/profiles/';
var API_NOTIFICATIONS_PREFIX = '/api/v1/notifications/'; // config should use named export as there can be different exports,
// just need to export default also because of eslint rules



/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/utils/editableLabel.jsx":
/*!***************************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/utils/editableLabel.jsx ***!
  \***************************************************************************/
/*! exports provided: DEFAULT_MATHJAX_OPTIONS, EditableLabel, EditableExternalEventLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MATHJAX_OPTIONS", function() { return DEFAULT_MATHJAX_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditableLabel", function() { return EditableLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditableExternalEventLabel", function() { return EditableExternalEventLabel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // TODO Need to create lib js bundle and move EditableLabel into (it uses in classroom also).

var DEFAULT_MATHJAX_OPTIONS = {
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true
  },
  'HTML-CSS': {
    availableFonts: ['TeX']
  }
};
var EditableLabel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditableLabel, _React$Component);

  function EditableLabel(props) {
    var _this;

    _classCallCheck(this, EditableLabel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditableLabel).call(this, props));
    _this.state = {
      editing: false
    };
    _this.handleEditClick = _this.handleEditClick.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleInputBlur = _this.handleInputBlur.bind(_assertThisInitialized(_this));
    _this.handleFormSubmit = _this.handleFormSubmit.bind(_assertThisInitialized(_this));
    _this.handleInputKeyUp = _this.handleInputKeyUp.bind(_assertThisInitialized(_this));
    _this.setInputRef = _this.setInputRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditableLabel, [{
    key: "handleEditClick",
    value: function handleEditClick(e) {
      // edit by external event only
      if (this.props.hasOwnProperty('editableLabel') && this.props.editableLabel === false) {
        return;
      }

      var val = this.props.value;

      if (this.props.value === this.props.defaultValue) {
        val = '';
      }

      if (this._inputRef) {
        this.focus();
      }

      this.setState({
        editing: true,
        value: val
      });
    }
  }, {
    key: "setInputRef",
    value: function setInputRef(ref) {
      this._inputRef = ref;

      if (ref && this.state.editing) {
        this.focus();
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this._inputRef.focus();

      var v = this._inputRef.value;
      this._inputRef.value = '';
      this._inputRef.value = v;
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(e) {
      this.setState({
        'value': e.target.value
      });
    }
  }, {
    key: "handleInputBlur",
    value: function handleInputBlur(e) {
      this.save();
    }
  }, {
    key: "handleInputKeyUp",
    value: function handleInputKeyUp(e) {
      if (e.which === 27) {
        this.setState({
          editing: false
        });
      }
    }
  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(e) {
      e.preventDefault();
      this.save();
      return false;
    }
  }, {
    key: "save",
    value: function save() {
      this.setState({
        editing: false
      });
      this.props.onChange(this.state.value);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
      MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
      MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.editing) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
          onSubmit: this.handleFormSubmit,
          style: {
            display: 'inline'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "text",
          value: this.state.value,
          onChange: this.handleInputChange,
          onBlur: this.handleInputBlur,
          ref: this.setInputRef,
          onKeyUp: this.handleInputKeyUp
        }));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: 'editable-label' + (this.props.value && this.props.value.trim() || this.props.defaultValue ? '' : ' empty'),
          onClick: this.handleEditClick
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.value || this.props.defaultValue), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "glyphicon glyphicon-pencil"
        }));
      }
    }
  }]);

  return EditableLabel;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var EditableExternalEventLabel =
/*#__PURE__*/
function (_EditableLabel) {
  _inherits(EditableExternalEventLabel, _EditableLabel);

  function EditableExternalEventLabel() {
    _classCallCheck(this, EditableExternalEventLabel);

    return _possibleConstructorReturn(this, _getPrototypeOf(EditableExternalEventLabel).apply(this, arguments));
  }

  _createClass(EditableExternalEventLabel, [{
    key: "enableEditMode",
    value: function enableEditMode(editMode) {
      var val = this.props.value;

      if (editMode || this.props.editMode) {
        if (this.props.value === this.props.defaultValue) {
          val = '';
        }

        if (this._inputRef) {
          this.focus();
        }

        this.setState({
          editing: true,
          value: val
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.enableEditMode();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.editMode) {
        this.enableEditMode(props.editMode);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var inputParams = {
        type: 'text',
        value: this.state.value || '',
        onChange: this.handleInputChange,
        onBlur: this.handleInputBlur,
        ref: this.setInputRef,
        onKeyUp: this.handleInputKeyUp
      };
      var input = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", inputParams);

      if (this.props.textArea) {
        input = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", _extends({}, inputParams, {
          style: {
            'width': '90%'
          }
        }));
      }

      if (this.state.editing) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
          onSubmit: this.handleFormSubmit,
          style: {
            display: 'inline'
          }
        }, input);
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: 'editable-label' + (this.props.value && this.props.value.trim() || this.props.defaultValue ? '' : ' empty'),
          onClick: this.handleEditClick,
          style: {
            whiteSpace: 'pre-line'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.value || this.props.defaultValue));
      }
    }
  }]);

  return EditableExternalEventLabel;
}(EditableLabel);

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/utils/index.jsx":
/*!*******************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/utils/index.jsx ***!
  \*******************************************************************/
/*! exports provided: getAxios, checkHttpStatus, checkHttpError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAxios", function() { return getAxios; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkHttpStatus", function() { return checkHttpStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkHttpError", function() { return checkHttpError; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.xsrfHeaderName = 'X-CSRFToken';
axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.xsrfCookieName = 'csrftoken';
function getAxios() {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a;
}
function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function checkHttpError(error) {
  var response = error.response;

  if (response.status === 403) {
    // redirect to login page
    var url = '/accounts/login/?next=' + window.location.pathname;
    window.location.replace(url);
    throw new Error('redirecting...');
  }

  throw error;
}

/***/ }),

/***/ "./profiles/static/profiles/js/authenticated/utils/urls.jsx":
/*!******************************************************************!*\
  !*** ./profiles/static/profiles/js/authenticated/utils/urls.jsx ***!
  \******************************************************************/
/*! exports provided: slugify, dictToURI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slugify", function() { return slugify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dictToURI", function() { return dictToURI; });
function slugify(text, separator) {
  text = text.toString().toLowerCase().trim();
  var sets = [{
    to: 'a',
    from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]'
  }, {
    to: 'c',
    from: '[ÇĆĈČ]'
  }, {
    to: 'd',
    from: '[ÐĎĐÞ]'
  }, {
    to: 'e',
    from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]'
  }, {
    to: 'g',
    from: '[ĜĞĢǴ]'
  }, {
    to: 'h',
    from: '[ĤḦ]'
  }, {
    to: 'i',
    from: '[ÌÍÎÏĨĪĮİỈỊ]'
  }, {
    to: 'j',
    from: '[Ĵ]'
  }, {
    to: 'ij',
    from: '[Ĳ]'
  }, {
    to: 'k',
    from: '[Ķ]'
  }, {
    to: 'l',
    from: '[ĹĻĽŁ]'
  }, {
    to: 'm',
    from: '[Ḿ]'
  }, {
    to: 'n',
    from: '[ÑŃŅŇ]'
  }, {
    to: 'o',
    from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]'
  }, {
    to: 'oe',
    from: '[Œ]'
  }, {
    to: 'p',
    from: '[ṕ]'
  }, {
    to: 'r',
    from: '[ŔŖŘ]'
  }, {
    to: 's',
    from: '[ßŚŜŞŠ]'
  }, {
    to: 't',
    from: '[ŢŤ]'
  }, {
    to: 'u',
    from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]'
  }, {
    to: 'w',
    from: '[ẂŴẀẄ]'
  }, {
    to: 'x',
    from: '[ẍ]'
  }, {
    to: 'y',
    from: '[ÝŶŸỲỴỶỸ]'
  }, {
    to: 'z',
    from: '[ŹŻŽ]'
  }, {
    to: '-',
    from: '[·/_,:\']'
  }];
  sets.forEach(function (set) {
    text = text.replace(new RegExp(set.from, 'gi'), set.to);
  });
  text = text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/&/g, '-and-') // Replace & with 'and'
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\--+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text

  if (typeof separator !== 'undefined' && separator !== '-') {
    text = text.replace(/-/g, separator);
  }

  return text;
}
function dictToURI(dict) {
  var str = [];

  for (var p in dict) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(dict[p]));
  }

  return str.join('&');
}

/***/ })

/******/ });
//# sourceMappingURL=profile-07def3ad593a00fb12ea.js.map