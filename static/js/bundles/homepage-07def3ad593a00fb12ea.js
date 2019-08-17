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
/******/ 		"homepage": 0
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
/******/ 	deferredModules.push(["./homepage/static/homepage/js/index.jsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./homepage/static/homepage/js/components/auth.jsx":
/*!*********************************************************!*\
  !*** ./homepage/static/homepage/js/components/auth.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AuthSignUp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_csrf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/csrf */ "./homepage/static/homepage/js/components/csrf.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // TODO use dynamically generated (i.e. django reverse) urls rather than hardcoded

var AuthSignUp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AuthSignUp, _React$Component);

  function AuthSignUp() {
    var _this;

    _classCallCheck(this, AuthSignUp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthSignUp).call(this));
    _this.state = {
      mode: 'signup'
    };
    return _this;
  }

  _createClass(AuthSignUp, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.mode === 'signup') {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "modal-content"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "modal-header"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
          className: "modal-title"
        }, "Sign Up")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "modal-body"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            display: 'table',
            margin: '0 auto'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          title: "Facebook",
          className: "socialaccount_provider facebook ",
          href: "/accounts/facebook/login/?process="
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "social-image",
          src: "https://assets.physicsisbeautiful.com/homepage/images/facebook_login.png",
          alt: "Facebook"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          title: "Google",
          className: "socialaccount_provider google ",
          href: "/accounts/google/login/?process="
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "social-image",
          src: "https://assets.physicsisbeautiful.com/homepage/images/google_login.png",
          alt: "Google"
        }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "hr-sect"
        }, "OR"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
          action: "/accounts/signup/",
          method: "post"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "hidden",
          name: "next",
          value: "/"
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_csrf__WEBPACK_IMPORTED_MODULE_1__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: "first_name",
          type: "text",
          className: "form-control",
          id: "id_firstname",
          placeholder: "First name"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: "last_name",
          type: "text",
          className: "form-control",
          id: "id_lastname",
          placeholder: "Last name"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: "email",
          type: "text",
          className: "form-control ",
          id: "id_email",
          placeholder: "Email address",
          required: ""
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: "password1",
          type: "password",
          className: "form-control ",
          id: "id_password1",
          placeholder: "Password",
          required: ""
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: "password2",
          type: "password",
          className: "form-control ",
          id: "id_password2",
          placeholder: "Password (again)",
          required: ""
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          className: "btn btn-primary primaryAction",
          type: "submit"
        }, "Sign Up")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "modal-footer"
        }, "Already have an account? \xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          onClick: function onClick() {
            _this2.setState({
              'mode': 'login'
            });
          }
        }, "Login \xBB")));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "modal-content"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "modal-header"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
          className: "modal-title"
        }, "Login")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "modal-body"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            display: 'table',
            margin: '0 auto'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          title: "Facebook",
          className: "socialaccount_provider facebook ",
          href: "/accounts/facebook/login/?process="
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "social-image",
          src: "https://assets.physicsisbeautiful.com/homepage/images/facebook_login.png",
          alt: "Facebook"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          title: "Google",
          className: "socialaccount_provider google ",
          href: "/accounts/google/login/?process="
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "social-image",
          src: "https://assets.physicsisbeautiful.com/homepage/images/google_login.png",
          alt: "Google"
        }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "hr-sect"
        }, "OR"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
          action: "/accounts/login/",
          method: "POST"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_csrf__WEBPACK_IMPORTED_MODULE_1__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "hidden",
          name: "next",
          value: "/"
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
          htmlFor: "id_login"
        }, "Email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: "login",
          type: "text",
          className: "form-control",
          id: "id_login",
          placeholder: "email",
          required: true
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
          htmlFor: "id_password"
        }, "Password"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "/accounts/password/reset",
          style: {
            float: 'right'
          }
        }, "Forgot Password?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: "password",
          type: "password",
          className: "form-control",
          id: "id_password",
          placeholder: "password",
          required: true
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "checkbox"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
          id: "label_remember"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "checkbox",
          className: "form-check form-check-remember",
          name: "remember"
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Remember me")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          className: "btn btn-primary primaryAction",
          type: "submit",
          value: "Login"
        })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "modal-footer"
        }, "Don't have an account? \xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          onClick: function onClick() {
            _this2.setState({
              'mode': 'signup'
            });
          }
        }, "Sign Up \xBB")));
      }
    }
  }]);

  return AuthSignUp;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./homepage/static/homepage/js/components/csrf.jsx":
/*!*********************************************************!*\
  !*** ./homepage/static/homepage/js/components/csrf.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CSRFToken; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



function getCookie(name) {
  var cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

var CSRFToken =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CSRFToken, _React$Component);

  function CSRFToken() {
    _classCallCheck(this, CSRFToken);

    return _possibleConstructorReturn(this, _getPrototypeOf(CSRFToken).apply(this, arguments));
  }

  _createClass(CSRFToken, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "hidden",
        name: "csrfmiddlewaretoken",
        value: getCookie('csrftoken')
      });
    }
  }]);

  return CSRFToken;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./homepage/static/homepage/js/containers/sheet.jsx":
/*!**********************************************************!*\
  !*** ./homepage/static/homepage/js/containers/sheet.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sheet; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _components_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/auth */ "./homepage/static/homepage/js/components/auth.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Sheet =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Sheet, _React$Component);

  function Sheet() {
    _classCallCheck(this, Sheet);

    return _possibleConstructorReturn(this, _getPrototypeOf(Sheet).apply(this, arguments));
  }

  _createClass(Sheet, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-sheet",
        style: window.IS_MOBILE_APP ? {
          top: '2rem'
        } : {
          top: '0px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-featured-image-section"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-featured-image-section-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Welcome to Physics is Beautiful"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "A platform for all things physics."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "getStartedButton",
        className: "common-button btn btn-primary",
        onClick: function onClick() {
          window.location.href = '/curriculum/';
        }
      }, "Get Started"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-section-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-wrapper homepage-wrapper-white"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Features"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "list-group-item"
      }, "Free courses to learn physics"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "list-group-item"
      }, "Tools for teachers to provide practice for their students"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "list-group-item"
      }, "Create your own course, and fork existing courses"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "list-group-item"
      }, "Discuss physics on our forum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "list-group-item"
      }, "Resources and solutions to physics problems")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-section-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-wrapper homepage-wrapper-white"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Try it out"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
        className: "homepage-demo",
        src: "/curriculum/lessons/4nXkRtEGMqGnNvcpLDfXmV/?pib_mobile=true"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-section-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-wrapper homepage-wrapper-white"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_auth__WEBPACK_IMPORTED_MODULE_2__["default"], null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "homepage-section-footer"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
        className: "d-block mb-3 text-muted"
      }, "\xA92017-19 Physics is Beautiful"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-muted",
        href: "/about"
      }, "Our Team")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "\xB7"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-muted",
        href: "/privacy"
      }, "Privacy Policy")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "\xB7"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-muted",
        href: "/terms"
      }, "Terms of Service")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "\xB7"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-muted",
        href: "/contact"
      }, "Contact Us")))))));
    }
  }]);

  return Sheet;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
/*
           <div className='homepage-section-2'>
          <Row style={{width: '100%'}}>
            <Col md={6}>
              <div className='homepage-shadow-container modal-content'>
                <div className='blur-wrap'>
                  <p>What do we offer?</p>
                  <ul>
                    <li>Free courses to learn physics</li>
                    <li>Tools for teachers to provide practice for their students</li>
                    <li>Create your own course, and fork existing courses</li>
                    <li>Discuss physics on our forum</li>
                    <li>Resources and solutions to physics problems</li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <AuthSignUp />
            </Col>
          </Row>
        </div>
      </div>
       */




/***/ }),

/***/ "./homepage/static/homepage/js/index.jsx":
/*!***********************************************!*\
  !*** ./homepage/static/homepage/js/index.jsx ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _containers_sheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/sheet */ "./homepage/static/homepage/js/containers/sheet.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);




axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.xsrfCookieName = 'csrftoken';
axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.xsrfHeaderName = 'X-CSRFToken';
var target = document.getElementById('react-app');
var node = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_sheet__WEBPACK_IMPORTED_MODULE_2__["default"], null);
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(node, target);

/***/ })

/******/ });
//# sourceMappingURL=homepage-07def3ad593a00fb12ea.js.map