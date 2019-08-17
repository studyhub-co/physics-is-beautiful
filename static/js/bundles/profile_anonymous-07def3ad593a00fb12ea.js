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
/******/ 		"profile_anonymous": 0
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
/******/ 	deferredModules.push(["./profiles/static/profiles/js/anonymous/profile_modal.jsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./profiles/static/profiles/js/anonymous/app.jsx":
/*!*******************************************************!*\
  !*** ./profiles/static/profiles/js/anonymous/app.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProfileModalApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _profile_logged_in_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile_logged_in_form */ "./profiles/static/profiles/js/anonymous/profile_logged_in_form.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var AnonymousForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AnonymousForm, _React$Component);

  function AnonymousForm() {
    _classCallCheck(this, AnonymousForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnonymousForm).apply(this, arguments));
  }

  _createClass(AnonymousForm, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormCheck"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Sound settings"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormCheck"].Input, {
        checked: this.props.soundEnabled,
        onChange: this.props.toggleSound,
        type: 'checkbox'
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormCheck"].Label, null, "Sound enabled"))));
    }
  }]);

  return AnonymousForm;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var ProfileControl =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ProfileControl, _React$Component2);

  function ProfileControl() {
    _classCallCheck(this, ProfileControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProfileControl).apply(this, arguments));
  }

  _createClass(ProfileControl, [{
    key: "render",
    value: function render() {
      var name, form;

      if (!this.props.isAnonymous) {
        if (!this.props.firstName && !this.props.lastName) {
          name = 'Profile';
        } else {
          name = this.props.firstName + ' ' + this.props.lastName;
        }

        form = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_profile_logged_in_form__WEBPACK_IMPORTED_MODULE_2__["default"], this.props);
      } else {
        name = 'Settings';
        form = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AnonymousForm, this.props);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "settings",
        onClick: this.props.open
      }, name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
        className: "settings-modal",
        show: this.props.show,
        onHide: this.props.close,
        "aria-labelledby": "ModalHeader"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
        closeButton: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, null, "Profile")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, form), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        onClick: this.props.save,
        disabled: this.props.hasErrors
      }, "Save changes"))));
    }
  }]);

  return ProfileControl;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var ProfileModalApp =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(ProfileModalApp, _React$Component3);

  function ProfileModalApp() {
    var _this;

    _classCallCheck(this, ProfileModalApp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProfileModalApp).call(this));
    _this.state = {
      soundEnabled: true,
      firstName: '',
      lastName: '',
      displayName: '',
      show: false,
      hasErrors: true
    };

    _this.fetchProfile();

    return _this;
  }

  _createClass(ProfileModalApp, [{
    key: "toggleSound",
    value: function toggleSound(event) {
      var newState = !this.state.soundEnabled;
      this.setState({
        soundEnabled: newState,
        hasErrors: false
      });
      SoundSingleton.soundEnabled = newState;

      if (SoundSingleton.soundEnabled) {
        unpauseBackgroundAudio();
      } else {
        pauseBackgroundAudio();
      }
    }
  }, {
    key: "modalOpen",
    value: function modalOpen(event) {
      this.preSaveSoundEnabled = this.state.soundEnabled;
      this.setState({
        show: true
      });
    }
  }, {
    key: "modalClose",
    value: function modalClose(event, saved) {
      var newState = {
        show: false
      };

      if (saved !== true) {
        newState['soundEnabled'] = this.preSaveSoundEnabled;
      }

      this.setState(newState);
      SoundSingleton.soundEnabled = this.preSaveSoundEnabled; // reload user profile, if it was chaned change, but not save

      this.fetchProfile();
    }
  }, {
    key: "modalSave",
    value: function modalSave(event) {
      this.updateProfile(event);
      this.modalClose(event, true);
    }
  }, {
    key: "firstNameChange",
    value: function firstNameChange(event) {
      var hasErrors = true;

      if (event.target.value) {
        hasErrors = false;
      }

      this.setState({
        firstName: event.target.value,
        hasErrors: hasErrors
      });
    }
  }, {
    key: "lastNameChange",
    value: function lastNameChange(event) {
      var hasErrors = true;

      if (event.target.value) {
        hasErrors = false;
      }

      this.setState({
        lastName: event.target.value,
        hasErrors: hasErrors
      });
    }
  }, {
    key: "displayNameChange",
    value: function displayNameChange(event) {
      var hasErrors = true;

      if (event.target.value) {
        hasErrors = false;
      }

      this.setState({
        displayName: event.target.value,
        hasErrors: hasErrors
      });
    }
  }, {
    key: "profileToState",
    value: function profileToState(profile) {
      this.setState({
        firstName: profile.first_name,
        lastName: profile.last_name,
        displayName: profile.display_name,
        soundEnabled: profile.sound_enabled,
        isAnonymous: profile.is_anonymous,
        selectedAvatar: profile.selected_avatar,
        googleAvatarUrl: profile.google_avatar_url,
        gravatarUrl: profile.gravatar_url,
        userAvatar: profile.user_avatar,
        avatarUrl: profile.avatar_url
      });
      SoundSingleton.soundEnabled = profile.sound_enabled;
    }
  }, {
    key: "fetchProfile",
    value: function fetchProfile(lookupId) {
      $.ajax({
        async: true,
        url: '/api/v1/profiles/me',
        context: this,
        success: function success(data, status, jqXHR) {
          this.profileToState(data);
        }
      });
    }
  }, {
    key: "updateProfile",
    value: function updateProfile(profileData) {
      var profile = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        display_name: this.state.displayName,
        sound_enabled: this.state.soundEnabled
      };
      $.ajax({
        type: 'PATCH',
        url: '/api/v1/profiles/me/',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(profile),
        context: this,
        success: function success(data, status, jqXHR) {
          this.profileToState(data);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ProfileControl, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        displayName: this.state.displayName,
        soundEnabled: this.state.soundEnabled,
        hasErrors: this.state.hasErrors,
        isAnonymous: this.state.isAnonymous,
        avatar_url: this.state.avatar_url,
        googleAvatarUrl: this.state.googleAvatarUrl,
        gravatarUrl: this.state.gravatarUrl,
        userAvatar: this.state.userAvatar,
        avatarUrl: this.state.avatarUrl,
        selectedAvatar: this.state.selectedAvatar,
        show: this.state.show,
        toggleSound: this.toggleSound.bind(this),
        open: this.modalOpen.bind(this),
        close: this.modalClose.bind(this),
        save: this.modalSave.bind(this),
        firstNameChange: this.firstNameChange.bind(this),
        lastNameChange: this.lastNameChange.bind(this),
        displayNameChange: this.displayNameChange.bind(this),
        updateProfile: this.updateProfile.bind(this),
        profileToState: this.profileToState.bind(this)
      });
    }
  }]);

  return ProfileModalApp;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./profiles/static/profiles/js/anonymous/profile_logged_in_form.jsx":
/*!**************************************************************************!*\
  !*** ./profiles/static/profiles/js/anonymous/profile_logged_in_form.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoggedInForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./profiles/static/profiles/js/anonymous/utils.jsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




 // This code is deprecated

function ChangePicturePopover(props) {
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
  }, props.userAvatar ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: 'pointer',
    onClick: function onClick() {
      props.selectAvatar('u');
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 3,
    md: 3
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Image"], {
    responsive: true,
    rounded: true,
    src: props.userAvatar
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 7,
    md: 7,
    className: 'vcenter'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Uploaded picture")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 1,
    md: 1
  }, props.selectedAvatar === 'u' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "glyphicon glyphicon-ok"
  }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)) : null, props.googleAvatarUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: 'pointer',
    onClick: function onClick() {
      props.selectAvatar('g');
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 3,
    md: 3
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Image"], {
    responsive: true,
    rounded: true,
    src: props.googleAvatarUrl
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 7,
    md: 7,
    className: 'vcenter'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Google")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 1,
    md: 1
  }, props.selectedAvatar === 'g' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "glyphicon glyphicon-ok"
  }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)) : null, props.gravatarUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: 'pointer',
    onClick: function onClick() {
      return props.selectAvatar('a');
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 3,
    md: 3
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Image"], {
    responsive: true,
    rounded: true,
    src: props.gravatarUrl
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 7,
    md: 7,
    className: 'vcenter'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Gravatar")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: 1,
    md: 1
  }, props.selectedAvatar === 'a' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "glyphicon glyphicon-ok"
  }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)) : null));
}

var LoggedInForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoggedInForm, _React$Component);

  function LoggedInForm(props, context) {
    var _this;

    _classCallCheck(this, LoggedInForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoggedInForm).call(this, props, context));
    _this.onChangeAvatarClick = _this.onChangeAvatarClick.bind(_assertThisInitialized(_this));
    _this.selectAvatar = _this.selectAvatar.bind(_assertThisInitialized(_this));
    _this.state = {
      showChangeImagePanel: false
    };
    return _this;
  }

  _createClass(LoggedInForm, [{
    key: "selectAvatar",
    value: function selectAvatar(type) {
      var _this2 = this;

      Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getAxios"])().patch(_utils__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + 'me', {
        selected_avatar: type
      }).then(function (response) {
        // close overlay + reeload profile
        // this.setState({ showChangeImagePanel: false })
        _this2.props.profileToState(response.data);
      });
    }
  }, {
    key: "onChangeAvatarClick",
    value: function onChangeAvatarClick() {
      this.setState({
        showChangeImagePanel: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 3,
        md: 3
      }, this.props.avatarUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormGroup, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Image"], {
        responsive: true,
        src: this.props.avatarUrl,
        rounded: true
      })) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: function ref(node) {
          _this3._changeImageButton = node;
        },
        style: {
          fontSize: '1.3rem',
          textAlign: 'center',
          cursor: 'pointer'
        },
        onClick: this.onChangeAvatarClick
      }, "Change picture"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Overlay"], {
        rootClose: Boolean(true),
        show: this.state.showChangeImagePanel,
        onHide: function onHide() {
          return _this3.setState({
            showChangeImagePanel: false
          });
        },
        placement: "bottom",
        container: this._changeImageButton // target={() => ReactDOM.findDOMNode(this.refs.target)}

      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ChangePicturePopover, _extends({}, this.props, {
        selectAvatar: this.selectAvatar
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 9,
        md: 9
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, null, "First Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        type: "text",
        value: this.props.firstName,
        placeholder: "First",
        onChange: this.props.firstNameChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, null, "Last Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        type: "text",
        value: this.props.lastName,
        placeholder: "Last",
        onChange: this.props.lastNameChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, null, "Display Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        type: "text",
        value: this.props.displayName,
        placeholder: "Display",
        onChange: this.props.displayNameChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, null, "Sound Enabled"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Check, {
        checked: this.props.soundEnabled,
        onChange: this.props.toggleSound
      })))))));
    }
  }]);

  return LoggedInForm;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./profiles/static/profiles/js/anonymous/profile_modal.jsx":
/*!*****************************************************************!*\
  !*** ./profiles/static/profiles/js/anonymous/profile_modal.jsx ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./profiles/static/profiles/js/anonymous/app.jsx");



react_dom__WEBPACK_IMPORTED_MODULE_0___default.a.render(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_app__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('react-profile-modal'));

/***/ }),

/***/ "./profiles/static/profiles/js/anonymous/utils.jsx":
/*!*********************************************************!*\
  !*** ./profiles/static/profiles/js/anonymous/utils.jsx ***!
  \*********************************************************/
/*! exports provided: getAxios, API_PREFIX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAxios", function() { return getAxios; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_PREFIX", function() { return API_PREFIX; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.xsrfHeaderName = 'X-CSRFToken';
axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.xsrfCookieName = 'csrftoken';
function getAxios() {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a;
}
var API_PREFIX = '/api/v1/profiles/';

/***/ })

/******/ });
//# sourceMappingURL=profile_anonymous-07def3ad593a00fb12ea.js.map