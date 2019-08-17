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
/******/ 		"trophy_inbox": 0
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
/******/ 	deferredModules.push(["./user_reputation/static/trophy_inbox/js/index.jsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./user_reputation/static/trophy_inbox/js/actions/profile.jsx":
/*!********************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/actions/profile.jsx ***!
  \********************************************************************/
/*! exports provided: receiveProfileMe, fetchProfileMe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveProfileMe", function() { return receiveProfileMe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProfileMe", function() { return fetchProfileMe; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./user_reputation/static/trophy_inbox/js/utils/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/config */ "./user_reputation/static/trophy_inbox/js/utils/config.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./user_reputation/static/trophy_inbox/js/constants/index.jsx");



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

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/actions/reputation.jsx":
/*!***********************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/actions/reputation.jsx ***!
  \***********************************************************************/
/*! exports provided: receiveReputationActions, setCancelSource, fetchReputationActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveReputationActions", function() { return receiveReputationActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCancelSource", function() { return setCancelSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReputationActions", function() { return fetchReputationActions; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./user_reputation/static/trophy_inbox/js/utils/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/config */ "./user_reputation/static/trophy_inbox/js/utils/config.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./user_reputation/static/trophy_inbox/js/constants/index.jsx");
/* harmony import */ var _utils_urls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/urls */ "./user_reputation/static/trophy_inbox/js/utils/urls.jsx");




function receiveReputationActions(reputationActionsList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS"],
    payload: {
      reputationActionsList: reputationActionsList
    }
  };
}
function setCancelSource(cancelSource) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["REPUTATION_ACTIONS_SET_CANCEL_SOURCE"],
    payload: {
      cancelSource: cancelSource
    }
  };
}
function fetchReputationActions(nextPageUrl, filters) {
  var url = _utils_config__WEBPACK_IMPORTED_MODULE_1__["API_REPUTATION_ACTIONS_PREFIX"];

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
      dispatch(receiveReputationActions(response.data));
    }).catch(function (thrown) {
      if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().isCancel(thrown)) {// silent cancel
      } else {
        throw thrown;
      }
    });
  };
}

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/app.jsx":
/*!********************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/app.jsx ***!
  \********************************************************/
/*! exports provided: default, AppNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppNotConnected", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "app"
      }, this.props.children);
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

App.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape().isRequired // App.defaultProps = {
  //   location: undefined
  // }

};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(App));


/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/constants/index.jsx":
/*!********************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/constants/index.jsx ***!
  \********************************************************************/
/*! exports provided: REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS, REPUTATION_ACTIONS_SET_CANCEL_SOURCE, REPUTATION_ACTIONS_RECEIVE_UNREAD_COUNT, PROFILE_RECEIVE_ME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS", function() { return REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPUTATION_ACTIONS_SET_CANCEL_SOURCE", function() { return REPUTATION_ACTIONS_SET_CANCEL_SOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REPUTATION_ACTIONS_RECEIVE_UNREAD_COUNT", function() { return REPUTATION_ACTIONS_RECEIVE_UNREAD_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE_RECEIVE_ME", function() { return PROFILE_RECEIVE_ME; });
// reputation
var REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS = 'REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS';
var REPUTATION_ACTIONS_SET_CANCEL_SOURCE = 'REPUTATION_ACTIONS_SET_CANCEL_SOURCE';
var REPUTATION_ACTIONS_RECEIVE_UNREAD_COUNT = 'REPUTATION_ACTIONS_RECEIVE_UNREAD_COUNT'; // profile

var PROFILE_RECEIVE_ME = 'PROFILE_RECEIVE_ME';

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/containers/IndexView/index.jsx":
/*!*******************************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/containers/IndexView/index.jsx ***!
  \*******************************************************************************/
/*! exports provided: default, IndexViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexViewNotConnected", function() { return IndexView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Dropdown */ "./node_modules/react-bootstrap/Dropdown.js");
/* harmony import */ var react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _trophyList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./trophyList */ "./user_reputation/static/trophy_inbox/js/containers/IndexView/trophyList.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // import { bindActionCreators } from 'redux'




 // import Badge from 'react-bootstrap/Badge'

 // import * as reputationCreators from '../../actions/reputation'

var CustomToggle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomToggle, _React$Component);

  function CustomToggle(props, context) {
    var _this;

    _classCallCheck(this, CustomToggle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomToggle).call(this, props, context));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomToggle, [{
    key: "handleClick",
    value: function handleClick(e) {
      e.preventDefault();
      this.props.onClick(e);
    }
  }, {
    key: "render",
    value: function render() {
      // let unReadCount = null
      // if (this.props.unReadCount && this.props.unReadCount['count']) {
      //   if (this.props.unReadCount['count'] > 99) {
      //     unReadCount = '99+'
      //   } else {
      //     unReadCount = '' + this.props.unReadCount['count']
      //   }
      // }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: this.handleClick,
        style: {
          padding: '1rem',
          cursor: 'pointer'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaTrophy"], {
        title: '',
        style: {
          fontSize: '2rem'
        }
      }));
    }
  }]);

  return CustomToggle;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

CustomToggle.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};

var IndexView =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(IndexView, _React$Component2);

  function IndexView() {
    _classCallCheck(this, IndexView);

    return _possibleConstructorReturn(this, _getPrototypeOf(IndexView).apply(this, arguments));
  }

  _createClass(IndexView, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3___default.a.Toggle, {
        as: CustomToggle,
        id: "dropdown-custom-components"
      }, "Custom toggle"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_3___default.a.Menu, {
        alignRight: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_trophyList__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
    }
  }]);

  return IndexView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

IndexView.propTypes = {// reputationActions: PropTypes.shape({
  //   fetchReputationActions: PropTypes.func.isRequired
  // }).isRequired,
  // unReadCount: PropTypes.object
};

var mapStateToProps = function mapStateToProps(state) {
  return {// unReadCount: state.trophy.unReadCount
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch // reputationActions: bindActionCreators(reputationCreators, dispatch)

  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(IndexView));


/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/containers/IndexView/trophyList.jsx":
/*!************************************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/containers/IndexView/trophyList.jsx ***!
  \************************************************************************************/
/*! exports provided: default, TrophyListViewListNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrophyListViewListNotConnected", function() { return TrophyListView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap/Container */ "./node_modules/react-bootstrap/Container.js");
/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap/Row */ "./node_modules/react-bootstrap/Row.js");
/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap/Col */ "./node_modules/react-bootstrap/Col.js");
/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _actions_reputation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/reputation */ "./user_reputation/static/trophy_inbox/js/actions/reputation.jsx");
/* harmony import */ var _actions_profile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/profile */ "./user_reputation/static/trophy_inbox/js/actions/profile.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





 // import { FaCheck, FaCheckCircle, FaExclamationCircle, FaClock } from 'react-icons/fa'







var TrophyListView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TrophyListView, _React$Component);

  function TrophyListView(props) {
    var _this;

    _classCallCheck(this, TrophyListView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TrophyListView).call(this, props));
    _this.onSellAllClick = _this.onSellAllClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TrophyListView, [{
    key: "onSellAllClick",
    value: function onSellAllClick() {
      if (this.props.profile) {
        window.location.href = '/profile/' + this.props.profile.id + '/activity/';
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.profileActions.fetchProfileMe();

      if (!this.props.reputationActionsList) {
        // load reputation_actions list
        this.props.reputationActions.fetchReputationActions(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_5___default.a, {
        style: {
          width: '30rem',
          maxWidth: '100vw'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_6___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_7___default.a, {
        sm: 12,
        md: 12
      }, this.props.reputationActionsList ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.reputationActionsList['results'].length === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "No trophies", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)) : null, this.props.reputationActionsList['results'].map(function (reputationAction, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: reputationAction.id
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            color: 'green'
          }
        }, "+ ", reputationAction['value']), reputationAction['content_object'] && (reputationAction['content_object']['content_type'] === 'module' || reputationAction['content_object']['content_type'] === 'lesson') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0", reputationAction['content_object'].name) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null));
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'text-center'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: this.onSellAllClick,
        style: {
          cursor: 'pointer',
          color: '#1caff6'
        }
      }, "See all items"))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          'margin': '0 auto',
          width: '60px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_2__["RingLoader"], {
        color: '#1caff6',
        loading: Boolean(true)
      })))));
    }
  }]);

  return TrophyListView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

TrophyListView.propTypes = {
  reputationActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    fetchReputationActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  profileActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    fetchProfileMe: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }),
  reputationActionsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  profile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    reputationActionsList: state.reputationActions.reputationActionsList,
    profile: state.profile.me
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    reputationActions: Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions_reputation__WEBPACK_IMPORTED_MODULE_8__, dispatch),
    profileActions: Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions_profile__WEBPACK_IMPORTED_MODULE_9__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(TrophyListView));


/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/containers/Root/DevTools.jsx":
/*!*****************************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/containers/Root/DevTools.jsx ***!
  \*****************************************************************************/
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

/***/ "./user_reputation/static/trophy_inbox/js/containers/Root/Root.dev.jsx":
/*!*****************************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/containers/Root/Root.dev.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Root; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DevTools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DevTools */ "./user_reputation/static/trophy_inbox/js/containers/Root/DevTools.jsx");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app */ "./user_reputation/static/trophy_inbox/js/app.jsx");
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers */ "./user_reputation/static/trophy_inbox/js/containers/index.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import { ConnectedRouter } from 'connected-react-router'

 // import routes from '../../routes'





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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers__WEBPACK_IMPORTED_MODULE_5__["IndexView"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DevTools__WEBPACK_IMPORTED_MODULE_3__["default"], null))));
    }
  }]);

  return Root;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


Root.propTypes = {
  store: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape().isRequired // history: PropTypes.shape().isRequired

};

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/containers/Root/Root.jsx":
/*!*************************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/containers/Root/Root.jsx ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(/*! ./Root.dev */ "./user_reputation/static/trophy_inbox/js/containers/Root/Root.dev.jsx"); // eslint-disable-line global-require
} else {}

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/containers/index.jsx":
/*!*********************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/containers/index.jsx ***!
  \*********************************************************************/
/*! exports provided: IndexView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexView_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexView/index */ "./user_reputation/static/trophy_inbox/js/containers/IndexView/index.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IndexView", function() { return _IndexView_index__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/index.jsx":
/*!**********************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/index.jsx ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _containers_Root_Root__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/Root/Root */ "./user_reputation/static/trophy_inbox/js/containers/Root/Root.jsx");
/* harmony import */ var _containers_Root_Root__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_containers_Root_Root__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/configureStore */ "./user_reputation/static/trophy_inbox/js/store/configureStore.jsx");
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_store_configureStore__WEBPACK_IMPORTED_MODULE_3__);

 // import history from './history'



var initialState = {};
var target = document.getElementById('trophy-inbox-app'); // const store = configureStore(initialState, history)

var store = _store_configureStore__WEBPACK_IMPORTED_MODULE_3___default()(initialState); // <Root store={store} history={history} />

var node = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_Root_Root__WEBPACK_IMPORTED_MODULE_2___default.a, {
  store: store
});
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(node, target);

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/reducers/index.jsx":
/*!*******************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/reducers/index.jsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _reputation_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reputation_actions */ "./user_reputation/static/trophy_inbox/js/reducers/reputation_actions.jsx");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile */ "./user_reputation/static/trophy_inbox/js/reducers/profile.jsx");



/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  reputationActions: _reputation_actions__WEBPACK_IMPORTED_MODULE_1__["default"],
  profile: _profile__WEBPACK_IMPORTED_MODULE_2__["default"]
}));

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/reducers/profile.jsx":
/*!*********************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/reducers/profile.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return profileReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./user_reputation/static/trophy_inbox/js/constants/index.jsx");

var initialState = {};
function profileReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["PROFILE_RECEIVE_ME"]:
      return Object.assign({}, state, {
        me: action.payload.me
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/reducers/reputation_actions.jsx":
/*!********************************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/reducers/reputation_actions.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reputationActionsReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./user_reputation/static/trophy_inbox/js/constants/index.jsx");

var initialState = {};
function reputationActionsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS"]:
      return Object.assign({}, state, {
        reputationActionsList: action.payload.reputationActionsList
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["REPUTATION_ACTIONS_SET_CANCEL_SOURCE"]:
      return Object.assign({}, state, {
        cancelSource: action.payload.cancelSource
      });
    // case REPUTATION_ACTIONS_RECEIVE_UNREAD_COUNT:
    //   return Object.assign({}, state, {
    //     unReadCount: action.payload.unReadCount
    //   })

    default:
      return state;
  }
}

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/store/configureStore.dev.jsx":
/*!*****************************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/store/configureStore.dev.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers */ "./user_reputation/static/trophy_inbox/js/reducers/index.jsx");
/* harmony import */ var _containers_Root_DevTools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/Root/DevTools */ "./user_reputation/static/trophy_inbox/js/containers/Root/DevTools.jsx");
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */


 // import { routerMiddleware } from 'react-router-redux'


 // import { connectRouter, routerMiddleware } from 'connected-react-router'

function configureStore(initialState, history) {
  var logger = Object(redux_logger__WEBPACK_IMPORTED_MODULE_1__["createLogger"])(); // Build the middleware for intercepting and dispatching navigation actions
  // const reduxRouterMiddleware = routerMiddleware(history)
  // const middleware = applyMiddleware(thunk, routerMiddleware(history), logger)

  var middleware = Object(redux__WEBPACK_IMPORTED_MODULE_2__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_0__["default"], logger); // comment this for using inline dev tools, need comment compose below DevTools works only in one place

  var middlewareWithDevTools = Object(redux__WEBPACK_IMPORTED_MODULE_2__["compose"])(middleware, _containers_Root_DevTools__WEBPACK_IMPORTED_MODULE_4__["default"].instrument()); // use redux-devtools-extension (chrome)
  // uncomment this for using redux-devtools, need comment compose above DevTools works only in one place
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // const middlewareWithDevTools = composeEnhancers(
  //   middleware
  // )
  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating

  var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_3__["default"], // connectRouter(history)(rootReducer),
  initialState, middlewareWithDevTools // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(
  );

  if (false) {}

  return store;
}

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/store/configureStore.jsx":
/*!*************************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/store/configureStore.jsx ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(/*! ./configureStore.dev */ "./user_reputation/static/trophy_inbox/js/store/configureStore.dev.jsx"); // eslint-disable-line global-require
} else {}

/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/utils/config.jsx":
/*!*****************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/utils/config.jsx ***!
  \*****************************************************************/
/*! exports provided: BASE_URL, API_REPUTATION_ACTIONS_PREFIX, API_PROFILE_PREFIX, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_URL", function() { return BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_REPUTATION_ACTIONS_PREFIX", function() { return API_REPUTATION_ACTIONS_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_PROFILE_PREFIX", function() { return API_PROFILE_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BASE_URL; });
var BASE_URL = '/';
var API_REPUTATION_ACTIONS_PREFIX = '/api/v1/reputation/';
var API_PROFILE_PREFIX = '/api/v1/profiles/'; // config should use named export as there can be different exports,
// just need to export default also because of eslint rules



/***/ }),

/***/ "./user_reputation/static/trophy_inbox/js/utils/index.jsx":
/*!****************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/utils/index.jsx ***!
  \****************************************************************/
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

/***/ "./user_reputation/static/trophy_inbox/js/utils/urls.jsx":
/*!***************************************************************!*\
  !*** ./user_reputation/static/trophy_inbox/js/utils/urls.jsx ***!
  \***************************************************************/
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
//# sourceMappingURL=trophy_inbox-07def3ad593a00fb12ea.js.map