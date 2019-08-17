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
/******/ 		"classroom": 0
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
/******/ 	deferredModules.push(["./classroom/static/classroom/js/index.jsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./classroom/static/classroom/js/actions/assignment.jsx":
/*!**************************************************************!*\
  !*** ./classroom/static/classroom/js/actions/assignment.jsx ***!
  \**************************************************************/
/*! exports provided: receiveAssignment, assignmentFetchAssignment, receiveAssignmentsList, receiveAssignmentStudentsList, assignmentFetchStudentsList, assignmentFetchAssignmentList, assignmentCreationAssignmentSuccess, assignmentCreateAssignment, assignmentPartialUpdateSuccess, assignmentPartialUpdateAssignment, assignmentDeleteAssignment, receiveFirstUncompletedLesson, assignmentFetchFirstUncompletedLesson, receiveAssignmentStudentLessonsList, assignmentFetchStudentLessonsList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveAssignment", function() { return receiveAssignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentFetchAssignment", function() { return assignmentFetchAssignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveAssignmentsList", function() { return receiveAssignmentsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveAssignmentStudentsList", function() { return receiveAssignmentStudentsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentFetchStudentsList", function() { return assignmentFetchStudentsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentFetchAssignmentList", function() { return assignmentFetchAssignmentList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentCreationAssignmentSuccess", function() { return assignmentCreationAssignmentSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentCreateAssignment", function() { return assignmentCreateAssignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentPartialUpdateSuccess", function() { return assignmentPartialUpdateSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentPartialUpdateAssignment", function() { return assignmentPartialUpdateAssignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentDeleteAssignment", function() { return assignmentDeleteAssignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveFirstUncompletedLesson", function() { return receiveFirstUncompletedLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentFetchFirstUncompletedLesson", function() { return assignmentFetchFirstUncompletedLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveAssignmentStudentLessonsList", function() { return receiveAssignmentStudentLessonsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignmentFetchStudentLessonsList", function() { return assignmentFetchStudentLessonsList; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./classroom/static/classroom/js/utils/index.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");



function receiveAssignment(assignment) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS"],
    payload: {
      assignment: assignment
    }
  };
}
function assignmentFetchAssignment(classroomUuid, assignmentUuid) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"] + classroomUuid + '/assignment/' + assignmentUuid + '/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveAssignment(response.data));

      if (typeof callback === 'function') {
        callback();
      }
    });
  };
}
function receiveAssignmentsList(assignmentsList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST"],
    payload: {
      assignmentsList: assignmentsList
    }
  };
}
function receiveAssignmentStudentsList(assignmentStudentsList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST"],
    payload: {
      assignmentStudentsList: assignmentStudentsList
    }
  };
}
function assignmentFetchStudentsList(classroomUuid, assignmentUuid) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"] + classroomUuid + '/assignment/' + assignmentUuid + '/students/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveAssignmentStudentsList(response.data));

      if (typeof callback === 'function') {
        callback();
      }
    });
  };
}
function assignmentFetchAssignmentList(classroomUuid) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"] + classroomUuid + '/assignment/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveAssignmentsList(response.data));
    });
  };
}
function assignmentCreationAssignmentSuccess(assignment) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS"],
    payload: {
      assignment: assignment
    }
  };
}
function assignmentCreateAssignment(assignmentJson) {
  var refreshAssignmentsList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().post(_utils_config__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"] + assignmentJson.classroom_uuid + '/assignment/', assignmentJson).then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(assignmentCreationAssignmentSuccess(response.data));

      if (refreshAssignmentsList) {
        dispatch(assignmentFetchAssignmentList(assignmentJson.classroom_uuid));
      }
    });
  };
}
function assignmentPartialUpdateSuccess(assignment) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS"],
    payload: {
      assignment: assignment
    }
  };
}
function assignmentPartialUpdateAssignment(assignmentJson) {
  var refreshAssignmentsList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().patch(_utils_config__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"] + assignmentJson.classroom_uuid + '/assignment/' + assignmentJson.uuid + '/', assignmentJson).then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(assignmentPartialUpdateSuccess(response.data));

      if (refreshAssignmentsList) {
        dispatch(assignmentFetchAssignmentList(assignmentJson.classroom_uuid));
      }

      if (typeof callback === 'function') {
        callback();
      }
    });
  };
}
function assignmentDeleteAssignment(classroomUuid, assignmentUuid) {
  var refreshAssignmentsList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().delete(_utils_config__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"] + classroomUuid + '/assignment/' + assignmentUuid + '/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(assignmentPartialUpdateSuccess(undefined));

      if (refreshAssignmentsList) {
        dispatch(assignmentFetchAssignmentList(classroomUuid));
      }

      if (typeof callback === 'function') {
        callback();
      }
    });
  };
}
function receiveFirstUncompletedLesson(uncompletedLesson) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON"],
    payload: {
      uncompletedLesson: uncompletedLesson
    }
  };
}
function assignmentFetchFirstUncompletedLesson(classroomUuid, assignmentUuid) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"] + classroomUuid + '/assignment/' + assignmentUuid + '/first_uncompleted_lesson/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveFirstUncompletedLesson(response.data));

      if (typeof callback === 'function') {
        callback();
      }
    });
  };
}
function receiveAssignmentStudentLessonsList(assignmentStudentLessonsList, assignmentUuid) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST"],
    payload: {
      assignmentStudentLessonsList: assignmentStudentLessonsList,
      assignmentUuid: assignmentUuid
    }
  };
}
function assignmentFetchStudentLessonsList(classroomUuid, assignmentUuid) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"] + classroomUuid + '/assignment/' + assignmentUuid + '/lessons/').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveAssignmentStudentLessonsList(response.data, assignmentUuid));

      if (typeof callback === 'function') {
        callback();
      }
    });
  };
}

/***/ }),

/***/ "./classroom/static/classroom/js/actions/classroom.jsx":
/*!*************************************************************!*\
  !*** ./classroom/static/classroom/js/actions/classroom.jsx ***!
  \*************************************************************/
/*! exports provided: receiveTeacherClassroomsList, classroomFetchTeacherClassroomsList, receiveTeacherClassroomSuccess, classroomFetchTeacherClassroom, classroomCreationSuccess, classroomCreateClassroom, classroomEraseTeacherClassroom, classroomPartialUpdateSuccess, classroomPartialUpdateTeacherClassroom, classroomDeleteTeacherClassroom, joinClassroomSuccess, classroomJoinClassroom, receiveStudentClassroomsList, classroomFetchStudentClassroomsList, leaveStudentClassroomSuccess, classroomLeaveStudentClassroom, receiveStudentClassroomSuccess, classroomFetchStudentClassroom, bulkStudentsUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveTeacherClassroomsList", function() { return receiveTeacherClassroomsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomFetchTeacherClassroomsList", function() { return classroomFetchTeacherClassroomsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveTeacherClassroomSuccess", function() { return receiveTeacherClassroomSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomFetchTeacherClassroom", function() { return classroomFetchTeacherClassroom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomCreationSuccess", function() { return classroomCreationSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomCreateClassroom", function() { return classroomCreateClassroom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomEraseTeacherClassroom", function() { return classroomEraseTeacherClassroom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomPartialUpdateSuccess", function() { return classroomPartialUpdateSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomPartialUpdateTeacherClassroom", function() { return classroomPartialUpdateTeacherClassroom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomDeleteTeacherClassroom", function() { return classroomDeleteTeacherClassroom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinClassroomSuccess", function() { return joinClassroomSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomJoinClassroom", function() { return classroomJoinClassroom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveStudentClassroomsList", function() { return receiveStudentClassroomsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomFetchStudentClassroomsList", function() { return classroomFetchStudentClassroomsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leaveStudentClassroomSuccess", function() { return leaveStudentClassroomSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomLeaveStudentClassroom", function() { return classroomLeaveStudentClassroom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveStudentClassroomSuccess", function() { return receiveStudentClassroomSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomFetchStudentClassroom", function() { return classroomFetchStudentClassroom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bulkStudentsUpdate", function() { return bulkStudentsUpdate; });
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./classroom/static/classroom/js/utils/index.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");
/* harmony import */ var _actions_student__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/student */ "./classroom/static/classroom/js/actions/student.jsx");




 // ----------------------  TEACHER ACTIONS

function receiveTeacherClassroomsList(classroomList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST"],
    payload: {
      classroomList: classroomList
    }
  };
}
function classroomFetchTeacherClassroomsList() {
  return function (dispatch, state) {
    // dispatch(classroomFetchClassroomlistRequest()) // to the future
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + '?filter=as_teacher').then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveTeacherClassroomsList(response.data));
    });
  };
}
function receiveTeacherClassroomSuccess(classroomTeacher) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["CLASSROOM_RECEIVE_TEACHER_CLASSROOM"],
    payload: {
      classroomTeacher: classroomTeacher
    }
  };
}
function classroomFetchTeacherClassroom(classroomUuid) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + classroomUuid + '/').then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveTeacherClassroomSuccess(response.data));
    });
  };
}
function classroomCreationSuccess(classroomTeacher) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS"],
    payload: {
      classroomTeacher: classroomTeacher
    }
  };
}
function classroomCreateClassroom(classroomForm) {
  var redirectToClassroom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var refreshList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().post(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"], classroomForm).then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(classroomCreationSuccess(response.data)); // update classroomslist

      if (refreshList) {
        dispatch(classroomFetchTeacherClassroomsList());
      } //  move to edit page


      if (redirectToClassroom) {
        dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_0__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_3__["BASE_URL"] + 'teacher/' + response.data.uuid + '/'));
      }

      if (typeof callback === 'function') {
        callback(response.data);
      }
    });
  };
}
function classroomEraseTeacherClassroom() {
  return function (dispatch, state) {
    dispatch(classroomCreationSuccess(undefined));
  };
}
function classroomPartialUpdateSuccess(classroomTeacher) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS"],
    payload: {
      classroomTeacher: classroomTeacher
    }
  };
}
function classroomPartialUpdateTeacherClassroom(classroomJson) {
  var redirectToTeacher = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().patch(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + classroomJson.uuid + '/', classroomJson).then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(classroomPartialUpdateSuccess(response.data));

      if (redirectToTeacher) {
        dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_0__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_3__["BASE_URL"] + 'teacher/' + response.data.uuid + '/'));
      } // update classroomslist


      dispatch(classroomFetchTeacherClassroomsList());
    });
  };
}
function classroomDeleteTeacherClassroom(classroomUuid) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().delete(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + classroomUuid + '/').then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(classroomPartialUpdateSuccess(undefined));
      dispatch(classroomFetchTeacherClassroomsList());
      dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_0__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_3__["BASE_URL"] + 'teacher/'));
    });
  };
} // --------------------------- STUDENT ACTIONS

function joinClassroomSuccess(classroomStudent) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS"],
    payload: {
      classroomStudent: classroomStudent
    }
  };
}
function classroomJoinClassroom(classroomCode) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().post(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + 'join/', {
      code: classroomCode
    }).then(function (response) {
      dispatch(joinClassroomSuccess(response.data)); // filter classroom to list

      dispatch(classroomFetchStudentClassroomsList()); // move to classroom page

      dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_0__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_3__["BASE_URL"] + 'student/' + response.data['uuid'] + '/'));
    }).catch(function (error) {
      dispatch(joinClassroomSuccess(null)); // console.log(error.response)
    });
  };
}
function receiveStudentClassroomsList(classroomStudentList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST"],
    payload: {
      classroomStudentList: classroomStudentList
    }
  };
}
function classroomFetchStudentClassroomsList() {
  return function (dispatch, state) {
    // dispatch(classroomFetchClassroomlistRequest()) // to the future
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + '?filter=as_student').then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveStudentClassroomsList(response.data));
    });
  };
}
function leaveStudentClassroomSuccess(classroomStudent) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS"],
    payload: {
      classroomStudent: classroomStudent
    }
  };
}
function classroomLeaveStudentClassroom(classroom) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().post(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + 'leave/', {
      uuid: classroom.uuid
    }).then(function (response) {
      dispatch(leaveStudentClassroomSuccess(response.data)); // remove class room from classrooms list

      dispatch(classroomFetchStudentClassroomsList()); // move to clasrooms list page

      dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_0__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_3__["BASE_URL"]));
    });
  };
}
function receiveStudentClassroomSuccess(classroomStudent) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["CLASSROOM_RECEIVE_STUDENT_CLASSROOM"],
    payload: {
      classroomStudent: classroomStudent
    }
  };
}
function classroomFetchStudentClassroom(classroomUuid) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + classroomUuid + '/').then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveStudentClassroomSuccess(response.data));
    });
  };
}
function bulkStudentsUpdate(classroomUuid, studentsList, origin, refreshClassroomsStudentsList) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().post(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + classroomUuid + '/roster/', {
      students: studentsList,
      origin: origin
    }).then(function (response) {
      if (refreshClassroomsStudentsList) {
        dispatch(Object(_actions_student__WEBPACK_IMPORTED_MODULE_4__["classroomFetchStudentsClassroomList"])(classroomUuid));
      }

      dispatch(classroomFetchTeacherClassroomsList());
    });
  };
}

/***/ }),

/***/ "./classroom/static/classroom/js/actions/curricula.jsx":
/*!*************************************************************!*\
  !*** ./classroom/static/classroom/js/actions/curricula.jsx ***!
  \*************************************************************/
/*! exports provided: dataReceiveExpandedCurriculum, curriculaFetchExpandedCurriculum, dataReceiveCurriculaList, curriculaFetchCurriculaList, dataReceiveOtherCurriculaList, curriculaFetchOtherCurriculaList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataReceiveExpandedCurriculum", function() { return dataReceiveExpandedCurriculum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curriculaFetchExpandedCurriculum", function() { return curriculaFetchExpandedCurriculum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataReceiveCurriculaList", function() { return dataReceiveCurriculaList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curriculaFetchCurriculaList", function() { return curriculaFetchCurriculaList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataReceiveOtherCurriculaList", function() { return dataReceiveOtherCurriculaList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curriculaFetchOtherCurriculaList", function() { return curriculaFetchOtherCurriculaList; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./classroom/static/classroom/js/utils/index.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");

 // const API_PREFIX = '/editor/api/curricula/'

var API_PREFIX = '/api/v1/curricula/curricula/';
function dataReceiveExpandedCurriculum(curriculum) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["CURRICULA_RECEIVE_EXPANDED_CURRICULUM"],
    payload: {
      curriculum: curriculum
    }
  };
}
function curriculaFetchExpandedCurriculum(curriculumUuid) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(API_PREFIX + curriculumUuid + '?expand=units.modules.lessons').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(dataReceiveExpandedCurriculum(response.data));
    });
  };
}
function dataReceiveCurriculaList(curriculaList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["CURRICULA_RECEIVE_CURRICULA_LIST"],
    payload: {
      curriculaList: curriculaList
    }
  };
}
function curriculaFetchCurriculaList() {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(API_PREFIX + '?filter=my').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      // fix for editor wrong json using
      // convert { "uuid" : { curriculum}, "uuid" : { curriculum2 },  .. } to list [curriculum, curriculum2 ...]
      // var list = Object.keys(response.data).map(function(k) { return response.data[k] })
      // dispatch(dataReceiveCurriculaList(list))
      dispatch(dataReceiveCurriculaList(response.data));
    });
  };
}
function dataReceiveOtherCurriculaList(curriculaOtherList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__["CURRICULA_RECEIVE_OTHER_CURRICULA_LIST"],
    payload: {
      curriculaOtherList: curriculaOtherList
    }
  };
}
function curriculaFetchOtherCurriculaList() {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAxios"])().get(API_PREFIX + '?filter=default').then(_utils__WEBPACK_IMPORTED_MODULE_0__["checkHttpStatus"]).then(function (response) {
      dispatch(dataReceiveOtherCurriculaList(response.data));
    });
  };
}

/***/ }),

/***/ "./classroom/static/classroom/js/actions/google.jsx":
/*!**********************************************************!*\
  !*** ./classroom/static/classroom/js/actions/google.jsx ***!
  \**********************************************************/
/*! exports provided: googleInitStateChanged, gapiInitialize, receiveGoogleClassroomsList, googleFetchClassroomList, googleFetchAndSaveClassroomsStudents, googleSaveClassroomsWithStudents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "googleInitStateChanged", function() { return googleInitStateChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gapiInitialize", function() { return gapiInitialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveGoogleClassroomsList", function() { return receiveGoogleClassroomsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "googleFetchClassroomList", function() { return googleFetchClassroomList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "googleFetchAndSaveClassroomsStudents", function() { return googleFetchAndSaveClassroomsStudents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "googleSaveClassroomsWithStudents", function() { return googleSaveClassroomsWithStudents; });
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scriptjs */ "./node_modules/scriptjs/dist/script.js");
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scriptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./classroom/static/classroom/js/utils/index.jsx");
/* harmony import */ var _actions_classroom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/classroom */ "./classroom/static/classroom/js/actions/classroom.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");




 // TODO as Open Source we must replace this values with data from dev or AWS environment while webpack compiling bundle

var CLIENT_ID = '1090448644110-r8o52h1sqpbq7pp1j8ougcr1e35qicqg.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBNaX7xo_Vo08-myCDEzY4AKZkkfyJYIc8'; // Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.

var SCOPES = 'https://www.googleapis.com/auth/classroom.courses.readonly' + ' https://www.googleapis.com/auth/classroom.rosters.readonly' + ' https://www.googleapis.com/auth/classroom.profile.emails' + ' https://www.googleapis.com/auth/plus.me'; // var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest']

function googleInitStateChanged(gapiInitState) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_4__["GOOGLE_INIT_STATE_CHANGED"],
    payload: {
      gapiInitState: gapiInitState
    }
  };
}
function gapiInitialize() {
  return function (dispatch, state) {
    function handleClientLoad() {
      gapi.load('client:auth2', initGapiClient); // gapi.load('client:auth2', {'callback': initGapiClient})
    }

    function initGapiClient() {
      gapi.client.init({
        // discoveryDocs: DISCOVERY_DOCS,
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        gapi.client.load('classroom', 'v1', function () {
          dispatch(googleInitStateChanged(true));
        });
      }).catch(function (e) {
        console.log('error:', e);
      });
    }

    scriptjs__WEBPACK_IMPORTED_MODULE_1___default()('https://apis.google.com/js/api.js', function () {
      handleClientLoad();
    });
  };
}

function listCourses(callback, dispatch) {
  gapi.client.classroom.courses.list({
    teacherId: gapi.auth2.getAuthInstance().currentUser.get()['El']
  }).then(function (response) {
    dispatch(callback(response.result.courses));
  });
}

function receiveGoogleClassroomsList(googleClassroomsList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_4__["GOOGLE_RECEIVE_CLASSROOMS_LIST"],
    payload: {
      googleClassroomsList: googleClassroomsList
    }
  };
}
function googleFetchClassroomList() {
  return function (dispatch, state) {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().signIn().then(function () {
        listCourses(receiveGoogleClassroomsList, dispatch);
      });
    } else {
      listCourses(receiveGoogleClassroomsList, dispatch);
    }
  };
}

function processNextPage(pageToken, googleCourseID, googleCourseStudentsList, whenAllPagesProcessedCallback) {
  var batch = gapi.client.newBatch();

  var searchRequest = function searchRequest() {
    return gapi.client.classroom.courses.students.list({
      'courseId': googleCourseID,
      'pageSize': 30,
      'pageToken': pageToken
    });
  };

  var request = searchRequest();
  batch.add(request);
  batch.then(function (response) {
    for (var key in response.result) {
      // responses (courses)
      if ('students' in response.result[key].result) {
        for (var j = 0; j < response.result[key].result.students.length; j++) {
          // students
          var student = response.result[key].result.students[j];
          googleCourseStudentsList.push({
            'email': student['profile']['emailAddress'],
            'first_name': student['profile']['name']['givenName'],
            'last_name': student['profile']['name']['familyName']
          });
        }
      }

      if ('nextPageToken' in response.result[key].result) {
        processNextPage(response.result[key].result['nextPageToken'], googleCourseID, googleCourseStudentsList, whenAllPagesProcessedCallback);
      } else {
        // stop paginations and save students
        whenAllPagesProcessedCallback(googleCourseStudentsList);
      }
    }
  });
}

function listCoursesStudents(googleClassrooms, refreshClassroomsStudentsList) {
  /***
   * each classroom in googleClassrooms must contain pib_classroom_uuid key
   */
  return function (dispatch, state) {
    var batch = gapi.client.newBatch(); // save natchRequestKey/google_classroom_id map for use in response

    var requestsMap = [];

    for (var i = 0; i < googleClassrooms.length; i++) {
      var searchRequest = function searchRequest() {
        return gapi.client.classroom.courses.students.list({
          'courseId': googleClassrooms[i].id,
          'pageSize': 30
        });
      };

      var request = searchRequest();
      requestsMap[batch.add(request)] = googleClassrooms[i].id;
    }

    batch.then(function (response) {
      for (var key in response.result) {
        // responses (courses)
        var googleCourseID = requestsMap[key];
        var pibClassroomID = null;

        for (var i = 0; i < googleClassrooms.length; i++) {
          if (googleClassrooms[i]['id'] === googleCourseID) {
            pibClassroomID = googleClassrooms[i]['pib_classroom_uuid'];
          }
        }

        if ('students' in response.result[key].result) {
          var googleCourseStudentsList = []; // create googleCourseStudentsList with pib classroom id

          for (var j = 0; j < response.result[key].result.students.length; j++) {
            // students
            var student = response.result[key].result.students[j];
            googleCourseStudentsList.push({
              'email': student['profile']['emailAddress'],
              'first_name': student['profile']['name']['givenName'],
              'last_name': student['profile']['name']['familyName']
            });
          }
        } // if have next page then create a new query


        if ('nextPageToken' in response.result[key].result) {
          processNextPage(response.result[key].result['nextPageToken'], googleCourseID, googleCourseStudentsList, function (allpagesgoogleCourseStudentsList) {
            dispatch(Object(_actions_classroom__WEBPACK_IMPORTED_MODULE_3__["bulkStudentsUpdate"])(pibClassroomID, allpagesgoogleCourseStudentsList, 'google', refreshClassroomsStudentsList));
          });
        } else {
          if (pibClassroomID) {
            dispatch(Object(_actions_classroom__WEBPACK_IMPORTED_MODULE_3__["bulkStudentsUpdate"])(pibClassroomID, googleCourseStudentsList, 'google', refreshClassroomsStudentsList));
          } else {
            dispatch(Object(_actions_classroom__WEBPACK_IMPORTED_MODULE_3__["classroomFetchTeacherClassroomsList"])());
          }
        }
      }
    });
  };
}

function googleFetchAndSaveClassroomsStudents(classrooms, refreshClassroomsStudentsList) {
  return function (dispatch, state) {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().signIn().then(function () {
        dispatch(listCoursesStudents(classrooms, refreshClassroomsStudentsList));
      });
    } else {
      dispatch(listCoursesStudents(classrooms, refreshClassroomsStudentsList));
    }
  };
}
function googleSaveClassroomsWithStudents(googleClassrooms, googleCurriculumSelected) {
  return function (dispatch, state) {
    for (var i = 0; i < googleClassrooms.length; i++) {
      var googleClassRoom = googleClassrooms[i];
      var newClassroom = {};
      newClassroom['name'] = googleClassRoom['name'];
      newClassroom['curriculum_uuid'] = googleCurriculumSelected.uuid;
      newClassroom['external_classroom'] = {};
      newClassroom['external_classroom']['external_id'] = googleClassRoom['id'];
      newClassroom['external_classroom']['name'] = googleClassRoom['name'];
      newClassroom['external_classroom']['teacher_id'] = googleClassRoom['ownerId'];
      newClassroom['external_classroom']['code'] = googleClassRoom['enrollmentCode'];
      newClassroom['external_classroom']['alternate_link'] = googleClassRoom['alternateLink'];

      var getCallback = function getCallback(j) {
        return function (createdClassroom) {
          // add pib_classroom_uuid to each google classroom for students update
          googleClassrooms[j]['pib_classroom_uuid'] = createdClassroom.uuid;

          if (j === googleClassrooms.length - 1) {
            dispatch(googleFetchAndSaveClassroomsStudents(googleClassrooms));
          }
        };
      }; // create classroom


      dispatch(Object(_actions_classroom__WEBPACK_IMPORTED_MODULE_3__["classroomCreateClassroom"])(newClassroom, false, getCallback(i)));
    }
  };
}

/***/ }),

/***/ "./classroom/static/classroom/js/actions/student.jsx":
/*!***********************************************************!*\
  !*** ./classroom/static/classroom/js/actions/student.jsx ***!
  \***********************************************************/
/*! exports provided: receiveStudentClassroomAssignmentsList, classroomFetchStudentClassroomAssignmentsList, receiveStudentClassroomProfile, classroomFetchStudentClassroomProfile, receiveStudentsClassroomList, classroomFetchStudentsClassroomList, removeFromClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveStudentClassroomAssignmentsList", function() { return receiveStudentClassroomAssignmentsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomFetchStudentClassroomAssignmentsList", function() { return classroomFetchStudentClassroomAssignmentsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveStudentClassroomProfile", function() { return receiveStudentClassroomProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomFetchStudentClassroomProfile", function() { return classroomFetchStudentClassroomProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveStudentsClassroomList", function() { return receiveStudentsClassroomList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classroomFetchStudentsClassroomList", function() { return classroomFetchStudentsClassroomList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFromClass", function() { return removeFromClass; });
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./classroom/static/classroom/js/utils/index.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");



 // studentClassroomProfile

function receiveStudentClassroomAssignmentsList(studentClassroomAssignments) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS"],
    payload: {
      studentClassroomAssignments: studentClassroomAssignments
    }
  };
}
function classroomFetchStudentClassroomAssignmentsList(classroomUuid, userName) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + classroomUuid + '/students/' + userName + '/assignments/').then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveStudentClassroomAssignmentsList(response.data));
    });
  };
}
function receiveStudentClassroomProfile(studentClassroomProfile) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["STUDENT_RECEIVE_CLASSROOM_PROFILE"],
    payload: {
      studentClassroomProfile: studentClassroomProfile
    }
  };
}
function classroomFetchStudentClassroomProfile(classroomUuid, userName) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + classroomUuid + '/students/' + userName + '/profile/').then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveStudentClassroomProfile(response.data));
    });
  };
}
function receiveStudentsClassroomList(classroomStudentsList) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_2__["STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST"],
    payload: {
      classroomStudentsList: classroomStudentsList
    }
  };
}
function classroomFetchStudentsClassroomList(classroomUuid) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().get(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + classroomUuid + '/students/').then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(receiveStudentsClassroomList(response.data));
    });
  };
}
function removeFromClass(classroomUuid, userName) {
  return function (dispatch, state) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getAxios"])().delete(_utils_config__WEBPACK_IMPORTED_MODULE_3__["API_PREFIX"] + 'teacher/' + classroomUuid + '/students/' + userName).then(_utils__WEBPACK_IMPORTED_MODULE_1__["checkHttpStatus"]).then(function (response) {
      dispatch(classroomFetchStudentsClassroomList(classroomUuid));
      dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_0__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_3__["BASE_URL"] + 'teacher/' + classroomUuid + '/')); // todo check tabs
    });
  };
}

/***/ }),

/***/ "./classroom/static/classroom/js/actions/tab.jsx":
/*!*******************************************************!*\
  !*** ./classroom/static/classroom/js/actions/tab.jsx ***!
  \*******************************************************/
/*! exports provided: changeSelectedTab, changeTeacherClassroomSelectedTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeSelectedTab", function() { return changeSelectedTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeTeacherClassroomSelectedTab", function() { return changeTeacherClassroomSelectedTab; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../history */ "./classroom/static/classroom/js/history.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");



function changeSelectedTab(selectedTab, tabNamespace) {
  var fromChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!fromChildren) {
    _history__WEBPACK_IMPORTED_MODULE_1__["default"].push(_utils_config__WEBPACK_IMPORTED_MODULE_2__["BASE_URL"] + selectedTab + '/');
  }

  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["CHANGE_SELECTED_TAB"],
    tab: selectedTab,
    namespace: tabNamespace
  };
}
function changeTeacherClassroomSelectedTab(selectedTab, tabNamespace, match) {
  // TODO refactor this
  if (selectedTab === 'students') {
    if (match && match.path !== '/classroom/teacher/:uuid/students/' && match.path !== '/classroom/teacher/:uuid/students/:username') {
      _history__WEBPACK_IMPORTED_MODULE_1__["default"].push('/classroom/teacher/' + match.params['uuid'] + '/students/');
    }
  } else if (match && !match.params.hasOwnProperty('assigmentUuid') && !match.params.hasOwnProperty('username')) {
    // main teacher page
    _history__WEBPACK_IMPORTED_MODULE_1__["default"].push('/classroom/teacher/' + match.params['uuid'] + '/');
  } // if (match &&
  //     match.isExact === false &&
  //     !match.params.hasOwnProperty('assigmentUuid') &&
  //     !match.params.hasOwnProperty('username') &&
  //     match.path !== '/classroom/:uuid/teacher/students/' &&
  //     match.path !== '/classroom/:uuid/teacher/' &&
  // {
  //   history.push('/classroom/' + match.params['uuid'] + '/teacher/') // rewrite url to teacher tab url. fixme: seems it's need a better solution
  // }


  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["CHANGE_SELECTED_TAB_TEACHER_CLASSROOM"],
    teacherClassroomTab: selectedTab,
    namespace: tabNamespace
  };
}

/***/ }),

/***/ "./classroom/static/classroom/js/app.jsx":
/*!***********************************************!*\
  !*** ./classroom/static/classroom/js/app.jsx ***!
  \***********************************************/
/*! exports provided: default, AppNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppNotConnected", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import { push } from 'react-router-redux'

 // import classNames from 'classnames'



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
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape().isRequired,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
  location: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    pathname: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
  })
};
App.defaultProps = {
  location: undefined
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    location: state.router.location
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(App));


/***/ }),

/***/ "./classroom/static/classroom/js/components/AssignmentStudentRow.jsx":
/*!***************************************************************************!*\
  !*** ./classroom/static/classroom/js/components/AssignmentStudentRow.jsx ***!
  \***************************************************************************/
/*! exports provided: default, AssignmentStudentRowNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignmentStudentRowNotConnected", function() { return AssignmentStudentRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _actions_assignment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions/assignment */ "./classroom/static/classroom/js/actions/assignment.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var AssignmentStudentRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AssignmentStudentRow, _React$Component);

  function AssignmentStudentRow(props) {
    var _this;

    _classCallCheck(this, AssignmentStudentRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AssignmentStudentRow).call(this, props));
    _this.onLessonClick = _this.onLessonClick.bind(_assertThisInitialized(_this));
    _this.onShowLessonsClick = _this.onShowLessonsClick.bind(_assertThisInitialized(_this));
    _this.state = {
      hideLessons: false
    };
    return _this;
  }

  _createClass(AssignmentStudentRow, [{
    key: "onLessonClick",
    value: function onLessonClick(lesson) {
      if (lesson.lesson_type === 'GAME') {
        window.location.href = '/curriculum/games/' + lesson.uuid + '/' + lesson.game_slug;
      } else {
        window.location.href = '/curriculum/lessons/' + lesson.uuid;
      }
    }
  }, {
    key: "onShowLessonsClick",
    value: function onShowLessonsClick() {
      if (!this.props['assignmentStudentLessonsList' + this.props.assignment.uuid]) {
        this.props.assignmentActions.assignmentFetchStudentLessonsList(this.props.classrroom_uuid, this.props.assignment.uuid);
      } else {
        this.setState({
          hideLessons: !this.state.hideLessons
        });
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!this.props.assignment.completed_on && !this.props.assignment.delayed_on) {
        // load lessons list
        this.props.assignmentActions.assignmentFetchStudentLessonsList(this.props.classrroom_uuid, this.props.assignment.uuid);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var selectedAssignmentUuid = null;
      var assignmentStudentLessonsList = this.props['assignmentStudentLessonsList' + this.props.assignment.uuid];
      var className = 'student-classroom-row';

      if (window.location.hash) {
        selectedAssignmentUuid = window.location.hash.substr(1);

        if (selectedAssignmentUuid === this.props.assignment.uuid) {
          className += ' seletected-fade-out';
        }
      }

      var dueDateTime = null;
      var textColorClassName = 'green-text';

      if (!this.props.assignment.completed_on && !this.props.assignment.delayed_on) {
        if (new Date(this.props.assignment.due_on) < new Date()) {
          textColorClassName = 'red-text';
        } else {
          textColorClassName = 'gray-text';
        }
      } else if (this.props.assignment.delayed_on) {
        textColorClassName = 'yellow-text';
      }

      if (this.props.assignment.due_on) {
        dueDateTime = new Date(this.props.assignment.due_on).toLocaleDateString() + ' ' + new Date(this.props.assignment.due_on).toLocaleTimeString();
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        className: className,
        id: this.props.assignment.uuid
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 1,
        md: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text'
      }, this.props.assignment && this.props.assignment.image ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Image"], {
        style: {
          maxHeight: '4rem'
        },
        fluid: true,
        src: this.props.assignment.image,
        rounded: true
      }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 4,
        md: 4
      }, this.props.assignment.completed_on || this.props.assignment.delayed_on // TODO check start date
      ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'blue-title'
      }, this.props.assignment.name) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        title: 'Perfom the assignment',
        className: 'blue-title pointer',
        onClick: this.props.onTitleClick
      }, this.props.assignment.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text pointer',
        style: {
          borderBottom: '1px dotted #000',
          width: 'fit-content'
        },
        title: 'Show lessons',
        onClick: this.onShowLessonsClick
      }, this.props.assignment.count_lessons, " lesson", this.props.assignment.count_lessons > 1 ? 's' : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 4,
        md: 4,
        className: 'vcenter'
      }, this.props.assignment.completed_on && new Date(this.props.assignment.due_on) > new Date(this.props.assignment.completed_on) ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: textColorClassName
      }, "Completed") : null, this.props.assignment.delayed_on ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: textColorClassName
      }, "Completed late") : null, !this.props.assignment.completed_on && !this.props.assignment.delayed_on ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, new Date(this.props.assignment.due_on) > new Date() ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: textColorClassName
      }, "Due:\xA0", dueDateTime) : null, new Date(this.props.assignment.due_on) < new Date() ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: textColorClassName
      }, "Past due:\xA0", dueDateTime) : null) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: textColorClassName
      }, this.props.assignment.count_completed_lessons, " / ", this.props.assignment.count_lessons)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 1,
        md: 1,
        className: 'vcenter'
      }, textColorClassName === 'green-text' // ? <span className='glyphicon glyphicon-ok-sign' style={{color: 'green', fontSize: '3rem'}} /> : null }
      ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaCheckCircle"], {
        style: {
          color: 'green',
          fontSize: '3rem'
        }
      }) : null, textColorClassName === 'red-text' // ? <span className='glyphicon glyphicon-exclamation-sign' style={{color: 'red', fontSize: '3rem'}} /> : null }
      ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaExclamationCircle"], {
        style: {
          color: 'red',
          fontSize: '3rem'
        }
      }) : null, textColorClassName === 'yellow-text' // ? <span className='glyphicon glyphicon-time yellow-text' style={{fontSize: '3rem'}} /> : null }
      ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaClock"], {
        className: "yellow-text",
        style: {
          fontSize: '3rem'
        }
      }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], null, assignmentStudentLessonsList && !this.state.hideLessons ? assignmentStudentLessonsList.map(function (lesson, i) {
        var _this2 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: 'col-md-2 lesson-card' + (lesson.status === 'completed' ? ' module-completed' : ' module-accessible-block') // style={{width: '20rem', height: '15rem', cursor: 'pointer'}}
          ,
          onClick: function onClick() {
            _this2.onLessonClick(lesson);
          },
          key: i
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: 'thumbnail section-thumbnail'
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Image"], {
          fluid: true,
          src: lesson.image // width={'80%'}
          // rounded
          // style={{display: 'inline-block', top: '0', height: '80%'}}

        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, lesson.name, lesson.status === 'completed' // ? <span className='glyphicon glyphicon-ok' style={{paddingLeft: '0.3rem'}} />
        ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaCheck"], {
          style: {
            paddingLeft: '0.3rem'
          }
        }) : null));
      }, this) : null)))));
    }
  }]);

  return AssignmentStudentRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

AssignmentStudentRow.propTypes = {
  assignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  onTitleClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  // assignmentsStudentLessonsList: PropTypes.object,
  classrroom_uuid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  assignmentActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    assignmentFetchStudentLessonsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return _defineProperty({}, 'assignmentStudentLessonsList' + ownProps.assignment.uuid, state.assignment['assignmentStudentLessonsList' + ownProps.assignment.uuid]);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    assignmentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_assignment__WEBPACK_IMPORTED_MODULE_6__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(AssignmentStudentRow));


/***/ }),

/***/ "./classroom/static/classroom/js/components/AssignmentTeacherRow.jsx":
/*!***************************************************************************!*\
  !*** ./classroom/static/classroom/js/components/AssignmentTeacherRow.jsx ***!
  \***************************************************************************/
/*! exports provided: AssignmentTeacherRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignmentTeacherRow", function() { return AssignmentTeacherRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var AssignmentTeacherRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AssignmentTeacherRow, _React$Component);

  _createClass(AssignmentTeacherRow, [{
    key: "handleSettingsClick",
    value: function handleSettingsClick(e) {
      this.props.onSettingsMenuClick(e);
    }
  }]);

  function AssignmentTeacherRow(props) {
    var _this;

    _classCallCheck(this, AssignmentTeacherRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AssignmentTeacherRow).call(this, props));
    _this.handleSettingsClick = _this.handleSettingsClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AssignmentTeacherRow, [{
    key: "render",
    value: function render() {
      var className = 'student-classroom-row';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 1,
        md: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text'
      }, this.props.assignment && this.props.assignment.image ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Image"], {
        style: {
          maxHeight: '4rem'
        },
        fluid: true,
        src: this.props.assignment.image,
        rounded: true
      }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 4,
        md: 4
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.props.onAssignmentsClick,
        className: 'blue-title pointer'
      }, this.props.assignment.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text'
      }, this.props.assignment.count_lessons, " lesson", this.props.assignment.count_lessons > 1 ? 's' : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text'
      }, new Date(this.props.assignment.start_on).toLocaleDateString(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), new Date(this.props.assignment.start_on).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'gray-text small-text'
      }, new Date(this.props.assignment.due_on).toLocaleDateString(), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), new Date(this.props.assignment.due_on).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'green-completed-box'
      }, this.props.assignment ? this.props.assignment.count_students_completed_assingment : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'yellow-delayed-box'
      }, this.props.assignment ? this.props.assignment.count_students_delayed_assingment : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'red-missed-box'
      }, this.props.assignment ? this.props.assignment.count_students_missed_assingment : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 1,
        md: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Dropdown"], {
        onSelect: this.handleSettingsClick,
        id: 'dropdown-settings'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Dropdown"].Toggle, {
        className: 'classroom-common-button',
        style: {
          padding: '1rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaCog"], null), "\xA0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Dropdown"].Menu, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["DropdownItem"], {
        eventKey: "delete"
      }, "Delete assignment"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["DropdownItem"], {
        eventKey: "edit"
      }, "Edit assignment")))));
    }
  }]);

  return AssignmentTeacherRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
AssignmentTeacherRow.propTypes = {
  assignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onAssignmentsClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onSettingsMenuClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

/***/ }),

/***/ "./classroom/static/classroom/js/components/CurriculumRow.jsx":
/*!********************************************************************!*\
  !*** ./classroom/static/classroom/js/components/CurriculumRow.jsx ***!
  \********************************************************************/
/*! exports provided: CurriculumRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumRow", function() { return CurriculumRow; });
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



var CurriculumRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CurriculumRow, _React$Component);

  function CurriculumRow() {
    _classCallCheck(this, CurriculumRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(CurriculumRow).apply(this, arguments));
  }

  _createClass(CurriculumRow, [{
    key: "render",
    value: function render() {
      var className = 'curriculum-card';

      if (this.props.selectedUuid === this.props.curriculum.uuid) {
        className += ' selected-curriculum-card';
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        style: {
          maxHeight: '4rem',
          maxWidth: '10rem',
          paddingRight: '1rem'
        },
        src: this.props.curriculum.image
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          color: 'rgb(8, 209, 255)'
        }
      }, this.props.curriculum.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          color: 'rgb(121, 121, 121)'
        }
      }, " by ", this.props.curriculum.author.display_name));
    }
  }]);

  return CurriculumRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
CurriculumRow.propTypes = {
  curriculum: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  selectedUuid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};

/***/ }),

/***/ "./classroom/static/classroom/js/components/GoogleClassroomRow.jsx":
/*!*************************************************************************!*\
  !*** ./classroom/static/classroom/js/components/GoogleClassroomRow.jsx ***!
  \*************************************************************************/
/*! exports provided: GoogleClassroomRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleClassroomRow", function() { return GoogleClassroomRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var GoogleClassroomRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GoogleClassroomRow, _React$Component);

  function GoogleClassroomRow() {
    _classCallCheck(this, GoogleClassroomRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(GoogleClassroomRow).apply(this, arguments));
  }

  _createClass(GoogleClassroomRow, [{
    key: "handleChange",
    value: function handleChange(classroom) {
      this.props.onGoogleClassroomClick(this.props.classroom);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var disabled = false;

      for (var x = 0; x < this.props.existingClassroomsList.length; x++) {
        if (this.props.existingClassroomsList[x].external_classroom && this.props.existingClassroomsList[x].external_classroom.external_id === this.props.classroom.id) {
          disabled = true;
        }
      }

      var className = 'google-classroom-row';
      var opts = {};

      if (disabled) {
        opts['checked'] = 'checked';
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 1,
        md: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"].Checkbox, _extends({
        disabled: disabled,
        onChange: function onChange() {
          return _this.handleChange(_this.props.classroom);
        }
      }, opts))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 11,
        md: 11
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'blue-title'
      }, this.props.classroom.name, " ", this.props.classroom.section))));
    }
  }]);

  return GoogleClassroomRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
GoogleClassroomRow.propTypes = {
  onGoogleClassroomClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  existingClassroomsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  classroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired // google classrooom

};

/***/ }),

/***/ "./classroom/static/classroom/js/components/PopupWindow.jsx":
/*!******************************************************************!*\
  !*** ./classroom/static/classroom/js/components/PopupWindow.jsx ***!
  \******************************************************************/
/*! exports provided: PopupWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupWindow", function() { return PopupWindow; });
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



var PopupWindow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PopupWindow, _React$Component);

  function PopupWindow() {
    _classCallCheck(this, PopupWindow);

    return _possibleConstructorReturn(this, _getPrototypeOf(PopupWindow).apply(this, arguments));
  }

  _createClass(PopupWindow, [{
    key: "render",
    value: function render() {
      var _this = this;

      var className = 'pop-up-window';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "close",
        "aria-label": "Close",
        onClick: function onClick() {
          _this.props.goBack();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7")), this.props.children);
    }
  }]);

  return PopupWindow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
PopupWindow.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  goBack: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};

/***/ }),

/***/ "./classroom/static/classroom/js/components/SelectCurriculum.jsx":
/*!***********************************************************************!*\
  !*** ./classroom/static/classroom/js/components/SelectCurriculum.jsx ***!
  \***********************************************************************/
/*! exports provided: default, SelectCurriculumNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectCurriculumNotConnected", function() { return SelectCurriculum; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_CurriculumRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/CurriculumRow */ "./classroom/static/classroom/js/components/CurriculumRow.jsx");
/* harmony import */ var _actions_curricula__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions/curricula */ "./classroom/static/classroom/js/actions/curricula.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var SelectCurriculum =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectCurriculum, _React$Component);

  function SelectCurriculum() {
    _classCallCheck(this, SelectCurriculum);

    return _possibleConstructorReturn(this, _getPrototypeOf(SelectCurriculum).apply(this, arguments));
  }

  _createClass(SelectCurriculum, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // load curricula
      this.props.curriculaActions.curriculaFetchCurriculaList(); // load other curricula

      this.props.curriculaActions.curriculaFetchOtherCurriculaList();
    }
  }, {
    key: "selectCurriculumUuid",
    value: function selectCurriculumUuid(curriculum) {
      this.setState({
        selectedCurriculumUuid: curriculum.uuid
      });
      this.props.selectedCurriculumChanged(curriculum);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Select curriculum:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          color: 'rgb(8, 209, 255)'
        }
      }, "My curricula"), this.props.curriculaList ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.curriculaList.map(function (curriculum, i) {
        var _this = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: i,
          onClick: function onClick() {
            _this.selectCurriculumUuid(curriculum);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CurriculumRow__WEBPACK_IMPORTED_MODULE_4__["CurriculumRow"], {
          curriculum: curriculum,
          selectedUuid: this.props.selectedUuid
        }));
      }, this)) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'create-curriculum-button curriculum-card',
        onClick: function onClick() {
          window.open('/studio/editor/', '_blank');
        }
      }, "+ Create new curriculum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'blue-text'
      }, "Physics is Beautiful curricula:"), this.props.curriculaOtherList ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.curriculaOtherList.map(function (curriculum, i) {
        var _this2 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: i,
          onClick: function onClick() {
            _this2.selectCurriculumUuid(curriculum);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CurriculumRow__WEBPACK_IMPORTED_MODULE_4__["CurriculumRow"], {
          curriculum: curriculum,
          selectedUuid: this.props.selectedUuid
        }));
      }, this)) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text pointer',
        onClick: function onClick() {
          window.open('/editor/', '_blank');
        }
      }, "Browse other curricula"));
    }
  }]);

  return SelectCurriculum;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

SelectCurriculum.propTypes = {
  curriculaActions: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    curriculaFetchCurriculaList: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
    curriculaFetchOtherCurriculaList: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired
  }).isRequired,
  curriculaList: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array,
  curriculaOtherList: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.array,
  selectedCurriculumChanged: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  selectedUuid: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any
};
SelectCurriculum.defaultProps = {};

var mapStateToProps = function mapStateToProps(state) {
  return {
    curriculaList: state.curricula.curriculaList,
    curriculaOtherList: state.curricula.curriculaOtherList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    curriculaActions: Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])(_actions_curricula__WEBPACK_IMPORTED_MODULE_5__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(SelectCurriculum));


/***/ }),

/***/ "./classroom/static/classroom/js/components/Sheet.jsx":
/*!************************************************************!*\
  !*** ./classroom/static/classroom/js/components/Sheet.jsx ***!
  \************************************************************/
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
    className: className
  }, props.children);
}

/***/ }),

/***/ "./classroom/static/classroom/js/components/StudentClassroomRow.jsx":
/*!**************************************************************************!*\
  !*** ./classroom/static/classroom/js/components/StudentClassroomRow.jsx ***!
  \**************************************************************************/
/*! exports provided: StudentClassroomRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentClassroomRow", function() { return StudentClassroomRow; });
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




var StudentClassroomRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StudentClassroomRow, _React$Component);

  function StudentClassroomRow() {
    _classCallCheck(this, StudentClassroomRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(StudentClassroomRow).apply(this, arguments));
  }

  _createClass(StudentClassroomRow, [{
    key: "render",
    value: function render() {
      var _this = this;

      var className = 'student-classroom-row';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 10,
        md: 10
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: function onClick() {
          return _this.props.onAssignmentsClick(_this.props.baseUrl + '/' + _this.props.classroom.uuid + '/');
        },
        className: 'blue-title pointer'
      }, this.props.classroom.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: 2,
        md: 2
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: function onClick() {
          return _this.props.onAssignmentsClick(_this.props.baseUrl + '/' + _this.props.classroom.uuid + '/');
        },
        className: 'pib-link'
      }, "Assignments"))));
    }
  }]);

  return StudentClassroomRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
StudentClassroomRow.propTypes = {
  classroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  baseUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onAssignmentsClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

/***/ }),

/***/ "./classroom/static/classroom/js/components/TeacherAssigmentStudentRow.jsx":
/*!*********************************************************************************!*\
  !*** ./classroom/static/classroom/js/components/TeacherAssigmentStudentRow.jsx ***!
  \*********************************************************************************/
/*! exports provided: TeacherAssigmentStudentRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherAssigmentStudentRow", function() { return TeacherAssigmentStudentRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var TeacherAssigmentStudentRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeacherAssigmentStudentRow, _React$Component);

  function TeacherAssigmentStudentRow() {
    _classCallCheck(this, TeacherAssigmentStudentRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(TeacherAssigmentStudentRow).apply(this, arguments));
  }

  _createClass(TeacherAssigmentStudentRow, [{
    key: "render",
    // Row to show user inside assignment or user profile view
    value: function render() {
      var _this = this;

      var className = 'student-classroom-row pointer';
      var completedOnDate = null;
      var delayedOnDate = null;
      var statusText = 'Not started';
      var colorName = null;
      var boxName = '';
      var glyphicon = '';
      var faIcon = null;

      if (this.props.student.completed_on) {
        completedOnDate = new Date(this.props.student.completed_on).toLocaleDateString() + ' ' + new Date(this.props.student.completed_on).toLocaleTimeString();
        statusText = 'Completed';
        colorName = 'green';
        boxName = '-completed'; // glyphicon = 'ok-sign'

        faIcon = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaCheckCircle"], null);
      } else if (this.props.student.delayed_on) {
        delayedOnDate = new Date(this.props.student.delayed_on).toLocaleDateString() + ' ' + new Date(this.props.student.delayed_on).toLocaleTimeString();
        statusText = 'Completed late';
        colorName = 'yellow';
        boxName = '-delayed'; // glyphicon = 'time'

        faIcon = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaClock"], null);
      } else if (new Date(this.props.assignment.due_on) < new Date()) {
        statusText = 'Missed';
        colorName = 'red';
        boxName = '-missed'; // glyphicon = 'remove'

        faIcon = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaTimes"], null);
      } else if (this.props.student.start_on) {
        statusText = 'Started';
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className,
        onClick: function onClick() {
          return _this.props.onStudentClick();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 1,
        md: 1
      }, this.props.student && this.props.student.avatar_url ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Image"], {
        fluid: true,
        src: this.props.student.avatar_url,
        roundedCircle: true
      }) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 6,
        md: 6
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'blue-title pointer'
      }, this.props.student.display_name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, colorName ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: colorName + '-text'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: colorName + boxName + '-box'
      }, faIcon, "\xA0", statusText)) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, statusText)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, completedOnDate ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, completedOnDate) : null, delayedOnDate ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, delayedOnDate) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 1,
        md: 1
      })));
    }
  }]);

  return TeacherAssigmentStudentRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
TeacherAssigmentStudentRow.propTypes = {
  assignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  student: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onStudentClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

/***/ }),

/***/ "./classroom/static/classroom/js/components/TeacherClassroomCard.jsx":
/*!***************************************************************************!*\
  !*** ./classroom/static/classroom/js/components/TeacherClassroomCard.jsx ***!
  \***************************************************************************/
/*! exports provided: TeacherClassroomCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherClassroomCard", function() { return TeacherClassroomCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var TeacherClassroomCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeacherClassroomCard, _React$Component);

  function TeacherClassroomCard() {
    _classCallCheck(this, TeacherClassroomCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(TeacherClassroomCard).apply(this, arguments));
  }

  _createClass(TeacherClassroomCard, [{
    key: "render",
    value: function render() {
      var _this = this;

      var className = 'classroom-card';
      var studentsProfileUrlMask = this.props.baseUrl + '/' + this.props.classroom.uuid + '/students/';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: function onClick() {
          _this.props.onTitleClick(_this.props.baseUrl + '/' + _this.props.classroom.uuid + '/');
        }
      }, this.props.classroom.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.classroom.curriculum.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.classroom.less_students ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          textAlign: 'left',
          padding: '1.5rem'
        }
      }, this.props.classroom.less_students.map(function (student, i) {
        var _this2 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: i,
          style: {
            paddingRight: '1rem',
            paddingBottom: '1rem',
            display: 'inline-block',
            cursor: 'pointer'
          },
          onClick: function onClick() {
            _this2.props.onTitleClick(studentsProfileUrlMask + student.username);
          }
        }, student.avatar_url ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Image"], {
          src: student.avatar_url,
          title: student.display_name,
          style: {
            width: '4rem'
          },
          rounded: true
        }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          onClick: function onClick() {
            _this2.props.onTitleClick(studentsProfileUrlMask + student.username);
          },
          title: student.display_name,
          style: {
            width: '4rem'
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaUser"], {
          style: {
            fontSize: '3rem',
            lineHeight: '0',
            top: '1rem'
          }
        })));
      }, this)) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.classroom.count_students, " student", this.props.classroom.count_students === 1 ? null : 's'));
    }
  }]);

  return TeacherClassroomCard;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
TeacherClassroomCard.propTypes = {
  classroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  onTitleClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  baseUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
};

/***/ }),

/***/ "./classroom/static/classroom/js/components/TeacherStudentAssignmentRow.jsx":
/*!**********************************************************************************!*\
  !*** ./classroom/static/classroom/js/components/TeacherStudentAssignmentRow.jsx ***!
  \**********************************************************************************/
/*! exports provided: TeacherStudentAssignmentRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherStudentAssignmentRow", function() { return TeacherStudentAssignmentRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var TeacherStudentAssignmentRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeacherStudentAssignmentRow, _React$Component);

  function TeacherStudentAssignmentRow() {
    _classCallCheck(this, TeacherStudentAssignmentRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(TeacherStudentAssignmentRow).apply(this, arguments));
  }

  _createClass(TeacherStudentAssignmentRow, [{
    key: "render",
    value: function render() {
      var className = 'student-classroom-row';
      var textColorClassName = 'green-text'; // var dueDateTime = null
      // var startDateOn = null

      var assignedOnDate = null;
      var completedOnDate = null;

      if (!this.props.assignment.completed_on && !this.props.assignment.delayed_on) {
        if (new Date(this.props.assignment.due_on) < new Date()) {
          textColorClassName = 'red-text';
        } else {
          textColorClassName = 'gray-text';
        }
      } else if (this.props.assignment.delayed_on) {
        textColorClassName = 'yellow-text';
      } // dueDateTime = new Date(this.props.assignment.due_on).toLocaleDateString() + ' ' +
      //   new Date(this.props.assignment.due_on).toLocaleTimeString()


      if (this.props.assignment.assigned_on) {
        assignedOnDate = new Date(this.props.assignment.assigned_on).toLocaleDateString() + ' ' + new Date(this.props.assignment.assigned_on).toLocaleTimeString();
      }

      if (this.props.assignment.completed_on) {
        completedOnDate = new Date(this.props.assignment.completed_on).toLocaleDateString() + ' ' + new Date(this.props.assignment.completed_on).toLocaleTimeString();
      }

      if (this.props.assignment.delayed_on) {
        completedOnDate = new Date(this.props.assignment.delayed_on).toLocaleDateString() + ' ' + new Date(this.props.assignment.delayed_on).toLocaleTimeString();
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 1,
        md: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text'
      }, this.props.assignment && this.props.assignment.image ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Image"], {
        fluid: true,
        src: this.props.assignment.image,
        roundedCircle: true
      }) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 5,
        md: 5
      }, !this.props.isTeacher && textColorClassName !== 'gray-text' // TODO check start date
      ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'blue-title'
      }, this.props.assignment.name) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'blue-title pointer',
        onClick: this.props.onTitleClick
      }, this.props.assignment.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text'
      }, this.props.assignment.count_lessons, " lesson", this.props.assignment.count_lessons > 1 ? 's' : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, assignedOnDate ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, " ", assignedOnDate, " ") : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, this.props.assignment.completed_on ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: textColorClassName
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'green-completed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaCheckCircle"], null), " \xA0Completed")) : null, this.props.assignment.delayed_on && !this.props.assignment.completed_on ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: textColorClassName
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'yellow-delayed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaClock"], {
        title: 'Completed late'
      }), "\xA0Completed late")) : null, !this.props.assignment.completed_on && !this.props.assignment.delayed_on && new Date(this.props.assignment.due_on) < new Date() ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: textColorClassName
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'red-missed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaTimes"], {
        title: 'Missed'
      }), "\xA0Missed")) : null, !this.props.assignment.completed_on && new Date(this.props.assignment.due_on) > new Date() ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.assignment.start_on ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Started") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Not started")) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, completedOnDate ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, " ", completedOnDate, " ") : null));
    }
  }]);

  return TeacherStudentAssignmentRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
TeacherStudentAssignmentRow.propTypes = {
  assignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  onTitleClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isTeacher: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
};

/***/ }),

/***/ "./classroom/static/classroom/js/components/TeacherStudentCard.jsx":
/*!*************************************************************************!*\
  !*** ./classroom/static/classroom/js/components/TeacherStudentCard.jsx ***!
  \*************************************************************************/
/*! exports provided: TeacherStudentCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherStudentCard", function() { return TeacherStudentCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var TeacherStudentCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeacherStudentCard, _React$Component);

  function TeacherStudentCard() {
    _classCallCheck(this, TeacherStudentCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(TeacherStudentCard).apply(this, arguments));
  }

  _createClass(TeacherStudentCard, [{
    key: "render",
    // Card to show user in classroom students list
    // Card to swon user inside assignment view
    value: function render() {
      var _this = this;

      var className = 'student-card pointer vcenter';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Container"], {
        fluid: true,
        style: {
          float: 'left',
          padding: '0'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
        className: className,
        onClick: function onClick() {
          return _this.props.onStudentClick();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 2,
        md: 2
      }, this.props.student.avatar_url ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Image"], {
        fluid: true,
        src: this.props.student.avatar_url,
        roundedCircle: true
      }) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 4,
        md: 4
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'title'
      }, this.props.student.display_name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: 6,
        md: 6
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'green-completed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaCheck"], {
        title: 'Completed'
      }), "\xA0", this.props.student.counts.num_completed_assignments), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'yellow-delayed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaClock"], {
        title: 'Completed late'
      }), "\xA0", this.props.student.counts.num_delayed_assignments), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'red-missed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaTimes"], {
        title: 'Missed'
      }), "\xA0", this.props.student.counts.num_missed_assignments)))));
    }
  }]);

  return TeacherStudentCard;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
TeacherStudentCard.propTypes = {
  student: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onStudentClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

/***/ }),

/***/ "./classroom/static/classroom/js/constants/index.jsx":
/*!***********************************************************!*\
  !*** ./classroom/static/classroom/js/constants/index.jsx ***!
  \***********************************************************/
/*! exports provided: CHANGE_SELECTED_TAB, CHANGE_SELECTED_TAB_TEACHER_CLASSROOM, CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST, CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS, CURRICULA_RECEIVE_CURRICULA_LIST, CURRICULA_RECEIVE_OTHER_CURRICULA_LIST, CLASSROOM_RECEIVE_TEACHER_CLASSROOM, CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS, CURRICULA_RECEIVE_EXPANDED_CURRICULUM, CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST, CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_STUDENT_CLASSROOM, STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST, ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST, ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST, ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS, ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS, ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS, STUDENT_RECEIVE_CLASSROOM_PROFILE, STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS, ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON, ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST, GOOGLE_RECEIVE_CLASSROOMS_LIST, GOOGLE_INIT_STATE_CHANGED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_SELECTED_TAB", function() { return CHANGE_SELECTED_TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_SELECTED_TAB_TEACHER_CLASSROOM", function() { return CHANGE_SELECTED_TAB_TEACHER_CLASSROOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST", function() { return CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS", function() { return CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURRICULA_RECEIVE_CURRICULA_LIST", function() { return CURRICULA_RECEIVE_CURRICULA_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURRICULA_RECEIVE_OTHER_CURRICULA_LIST", function() { return CURRICULA_RECEIVE_OTHER_CURRICULA_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSROOM_RECEIVE_TEACHER_CLASSROOM", function() { return CLASSROOM_RECEIVE_TEACHER_CLASSROOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS", function() { return CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURRICULA_RECEIVE_EXPANDED_CURRICULUM", function() { return CURRICULA_RECEIVE_EXPANDED_CURRICULUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS", function() { return CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST", function() { return CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS", function() { return CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSROOM_RECEIVE_STUDENT_CLASSROOM", function() { return CLASSROOM_RECEIVE_STUDENT_CLASSROOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST", function() { return STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST", function() { return ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST", function() { return ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS", function() { return ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS", function() { return ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS", function() { return ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STUDENT_RECEIVE_CLASSROOM_PROFILE", function() { return STUDENT_RECEIVE_CLASSROOM_PROFILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS", function() { return STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON", function() { return ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST", function() { return ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GOOGLE_RECEIVE_CLASSROOMS_LIST", function() { return GOOGLE_RECEIVE_CLASSROOMS_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GOOGLE_INIT_STATE_CHANGED", function() { return GOOGLE_INIT_STATE_CHANGED; });
var CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB'; // TEACHERS

var CHANGE_SELECTED_TAB_TEACHER_CLASSROOM = 'CHANGE_SELECTED_TAB_TEACHER_CLASSROOM';
var CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST = 'CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST';
var CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS = 'CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS';
var CURRICULA_RECEIVE_CURRICULA_LIST = 'CURRICULA_RECEIVE_CURRICULA_LIST';
var CURRICULA_RECEIVE_OTHER_CURRICULA_LIST = 'CURRICULA_RECEIVE_OTHER_CURRICULA_LIST';
var CLASSROOM_RECEIVE_TEACHER_CLASSROOM = 'CLASSROOM_RECEIVE_TEACHER_CLASSROOM';
var CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS = 'CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS';
var CURRICULA_RECEIVE_EXPANDED_CURRICULUM = 'CURRICULA_RECEIVE_EXPANDED_CURRICULUM'; // STUDENTS

var CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS = 'CLASSROOM_JOIN_CLASSROOM_SUCCESS';
var CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST = 'CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST';
var CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS = 'CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS';
var CLASSROOM_RECEIVE_STUDENT_CLASSROOM = 'CLASSROOM_RECEIVE_STUDENT_CLASSROOM';
var STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST = 'STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST';
var ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST = 'ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST'; // ASSIGNMENTS

var ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST = 'ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST';
var ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS = 'ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS';
var ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS = 'ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS';
var ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS = 'ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS';
var STUDENT_RECEIVE_CLASSROOM_PROFILE = 'STUDENT_RECEIVE_CLASSROOM_PROFILE';
var STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS = 'STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS';
var ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON = 'ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON';
var ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST = 'ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST'; // GOOGLE

var GOOGLE_RECEIVE_CLASSROOMS_LIST = 'GOOGLE_RECEIVE_CLASSROOM_LIST';
var GOOGLE_INIT_STATE_CHANGED = 'GOOGLE_INIT_STATE_CHANGED'; // export const GOOGLE_RECEIVE_STUDENTS_CLASSROOMS_LIST = 'GOOGLE_RECEIVE_STUDENTS_CLASSROOMS_LIST'

/***/ }),

/***/ "./classroom/static/classroom/js/containers/ClassroomViews/create.jsx":
/*!****************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/ClassroomViews/create.jsx ***!
  \****************************************************************************/
/*! exports provided: default, CreateClassroomViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateClassroomViewNotConnected", function() { return CreateClassroomView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../history */ "./classroom/static/classroom/js/history.jsx");
/* harmony import */ var _components_PopupWindow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/PopupWindow */ "./classroom/static/classroom/js/components/PopupWindow.jsx");
/* harmony import */ var _components_SelectCurriculum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/SelectCurriculum */ "./classroom/static/classroom/js/components/SelectCurriculum.jsx");
/* harmony import */ var _actions_classroom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/classroom */ "./classroom/static/classroom/js/actions/classroom.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/tab */ "./classroom/static/classroom/js/actions/tab.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var CreateClassroomView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CreateClassroomView, _React$Component);

  function CreateClassroomView(props) {
    var _this;

    _classCallCheck(this, CreateClassroomView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CreateClassroomView).call(this, props));
    _this.state = {
      classroomFormValues: {
        name: '',
        curriculum_uuid: ''
      },
      classroomFormIsValid: false
    };
    _this.handleClassroomFormChange = _this.handleClassroomFormChange.bind(_assertThisInitialized(_this));
    _this.selectedCurriculumChanged = _this.selectedCurriculumChanged.bind(_assertThisInitialized(_this));
    _this.saveClassroom = _this.saveClassroom.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CreateClassroomView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // select teacher tab by default
      this.props.tabActions.changeSelectedTab('teacher', 'tab', true);

      if (this.props.match.params && this.props.match.params['uuid']) {
        // load classroom if unavailable
        if (!this.props.classroomTeacher) {
          this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid']);
        }
      } else {
        // new class room
        this.props.classroomActions.classroomEraseTeacherClassroom();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.classroomTeacher) {
        this.setState({
          classroomFormValues: {
            name: props.classroomTeacher.name,
            curriculum_uuid: props.classroomTeacher.curriculum.uuid
          }
        }, this.validateClassroomForm);
      }
    }
  }, {
    key: "handleClassroomFormChange",
    value: function handleClassroomFormChange(e) {
      var classroomFormValues = Object.assign({}, this.state.classroomFormValues);
      classroomFormValues[e.target.name] = e.target.value;
      this.setState({
        classroomFormValues: classroomFormValues
      }, this.validateClassroomForm);
    }
  }, {
    key: "selectedCurriculumChanged",
    value: function selectedCurriculumChanged(curriculum) {
      var classroomFormValues = Object.assign({}, this.state.classroomFormValues);
      classroomFormValues['curriculum_uuid'] = curriculum.uuid;
      this.setState({
        classroomFormValues: classroomFormValues
      }, this.validateClassroomForm);
    }
  }, {
    key: "validateClassroomForm",
    value: function validateClassroomForm() {
      if (this.state.classroomFormValues && this.state.classroomFormValues.name && this.state.classroomFormValues.curriculum_uuid) {
        this.setState({
          'classroomFormIsValid': true
        });
      } else {
        this.setState({
          'classroomFormIsValid': false
        });
      }
    }
  }, {
    key: "saveClassroom",
    value: function saveClassroom(e) {
      e.preventDefault();

      if (this.state.classroomFormIsValid) {
        if (!this.props.classroomTeacher) {
          // save
          this.props.classroomActions.classroomCreateClassroom(this.state.classroomFormValues, true, null, true);
        } else {
          // update
          this.props.classroomActions.classroomPartialUpdateTeacherClassroom(Object.assign({}, this.state.classroomFormValues, {
            uuid: this.props.classroomTeacher.uuid
          }), true);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PopupWindow__WEBPACK_IMPORTED_MODULE_5__["PopupWindow"], {
        goBack: _history__WEBPACK_IMPORTED_MODULE_4__["default"].goBack
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: this.saveClassroom
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          paddingTop: '2rem'
        }
      }, "Name of your classroom:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        name: "name",
        className: 'form-control',
        value: this.state.classroomFormValues ? this.state.classroomFormValues.name : '',
        onChange: this.handleClassroomFormChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SelectCurriculum__WEBPACK_IMPORTED_MODULE_6__["default"], {
        selectedCurriculumChanged: this.selectedCurriculumChanged,
        selectedUuid: this.state.classroomFormValues.curriculum_uuid
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: !this.state.classroomFormIsValid,
        className: 'classroom-common-button float-right' + (this.state.classroomFormIsValid ? '' : ' disabled-button'),
        type: "submit"
      }, this.props.classroomTeacher ? 'Save classroom' : 'Create classroom'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          'clear': 'both'
        }
      })));
    }
  }]);

  return CreateClassroomView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

CreateClassroomView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired
  }).isRequired,
  classroomActions: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    classroomCreateClassroom: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
    classroomFetchTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
    classroomEraseTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
    classroomPartialUpdateTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired
  }).isRequired,
  classroomTeacher: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
};
CreateClassroomView.defaultProps = {};

var mapStateToProps = function mapStateToProps(state) {
  return {
    classroomTeacher: state.classroom.classroomTeacherClassroom
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    classroomActions: Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])(_actions_classroom__WEBPACK_IMPORTED_MODULE_7__, dispatch),
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_8__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CreateClassroomView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/ClassroomViews/join.jsx":
/*!**************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/ClassroomViews/join.jsx ***!
  \**************************************************************************/
/*! exports provided: default, JoinClassroomViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoinClassroomViewNotConnected", function() { return JoinClassroomView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../history */ "./classroom/static/classroom/js/history.jsx");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_classroom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/classroom */ "./classroom/static/classroom/js/actions/classroom.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var JoinClassroomView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JoinClassroomView, _React$Component);

  function JoinClassroomView(props) {
    var _this;

    _classCallCheck(this, JoinClassroomView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JoinClassroomView).call(this, props));
    _this.state = {
      code: '',
      codeIsValid: false
    };
    _this.handleCodeChange = _this.handleCodeChange.bind(_assertThisInitialized(_this));
    _this.joinClassroom = _this.joinClassroom.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JoinClassroomView, [{
    key: "joinClassroom",
    value: function joinClassroom(e) {
      e.preventDefault();

      if (this.state.codeIsValid) {
        this.props.classroomActions.classroomJoinClassroom(this.state.code);
      }
    }
  }, {
    key: "validateCode",
    value: function validateCode() {
      if (this.state.code && this.state.code.length === 6) {
        this.setState({
          'codeIsValid': true
        });
      } else {
        this.setState({
          'codeIsValid': false
        });
      }
    }
  }, {
    key: "handleCodeChange",
    value: function handleCodeChange(e) {
      this.setState({
        'code': e.target.value
      }, this.validateCode);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pop-up-window"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "close",
        "aria-label": "Close",
        onClick: function onClick() {
          _history__WEBPACK_IMPORTED_MODULE_2__["default"].goBack();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'text-align-center'
      }, "Enter your teacher's classroom code below:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'justify-content-center row'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: "form",
        onSubmit: this.joinClassroom
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        maxLength: '6',
        type: "text",
        name: "name",
        className: 'form-control',
        onChange: this.handleCodeChange
      }), this.props.classroomStudent === null ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'red-text'
      }, "This code does not match any classroom.", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Please double check what you typed") : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: !this.state.codeIsValid,
        className: 'classroom-common-button' + (this.state.codeIsValid ? '' : ' disabled-button'),
        type: "submit"
      }, "Join classroom")))));
    }
  }]);

  return JoinClassroomView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

JoinClassroomView.propTypes = {
  classroomActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomJoinClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  classroomStudent: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape()
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    classroomStudent: state.classroom.classroomStudentClassroom
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    classroomActions: Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions_classroom__WEBPACK_IMPORTED_MODULE_4__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(JoinClassroomView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/ClassroomViews/student.jsx":
/*!*****************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/ClassroomViews/student.jsx ***!
  \*****************************************************************************/
/*! exports provided: default, StudentViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentViewNotConnected", function() { return StudentClassroomView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_AssignmentStudentRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/AssignmentStudentRow */ "./classroom/static/classroom/js/components/AssignmentStudentRow.jsx");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");
/* harmony import */ var _actions_classroom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/classroom */ "./classroom/static/classroom/js/actions/classroom.jsx");
/* harmony import */ var _actions_assignment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/assignment */ "./classroom/static/classroom/js/actions/assignment.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var StudentClassroomView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StudentClassroomView, _React$Component);

  function StudentClassroomView(props) {
    var _this;

    _classCallCheck(this, StudentClassroomView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StudentClassroomView).call(this, props));
    _this.handleLeaveClassromModal = _this.handleLeaveClassromModal.bind(_assertThisInitialized(_this));
    _this.leaveClassroom = _this.leaveClassroom.bind(_assertThisInitialized(_this));
    _this.state = {
      showLeaveClassroomModal: false
    };
    return _this;
  }

  _createClass(StudentClassroomView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.classroomActions.classroomFetchStudentClassroom(this.props.match.params['uuid']);
      this.props.assignmentActions.assignmentFetchAssignmentList(this.props.match.params['uuid']);
    }
  }, {
    key: "onAssignmentTitleClick",
    value: function onAssignmentTitleClick(assignment) {
      // redirect to first uncompleted lesson
      this.props.assignmentActions.assignmentFetchFirstUncompletedLesson(this.props.match.params['uuid'], assignment.uuid);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (!this.props.uncompletedLesson && props.uncompletedLesson) {
        if (props.uncompletedLesson.lesson_type === 'GAME') {
          window.location.href = '/curriculum/games/' + props.uncompletedLesson.uuid + '/' + props.uncompletedLesson.game_slug;
        } else {
          window.location.href = '/curriculum/lessons/' + props.uncompletedLesson.uuid;
        }
      }
    }
  }, {
    key: "leaveClassroom",
    value: function leaveClassroom() {
      this.props.classroomActions.classroomLeaveStudentClassroom(this.props.classroomStudent);
    }
  }, {
    key: "handleLeaveClassromModal",
    value: function handleLeaveClassromModal() {
      this.setState({
        showLeaveClassroomModal: !this.state.showLeaveClassroomModal
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Container"], {
        fluid: true
      }, this.props.classroomStudent ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'student-classroom-row'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: 10,
        md: 10
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'blue-title'
      }, this.props.classroomStudent.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: 2,
        md: 2
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: function onClick() {
          return _this2.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_5__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_7__["BASE_URL"]));
        },
        className: 'gray-link blue-on-hover'
      }, "Assignments"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
        container: this,
        show: this.state.showLeaveClassroomModal,
        onHide: this.handleClose
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
        closeButton: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, null, "Confirm leaving")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, null, "Are you sure you want to permanently leave this classroom?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: 'classroom-common-button',
        onClick: this.leaveClassroom
      }, "Leave"), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        onClick: this.handleLeaveClassromModal
      }, "Close"))), this.props.assignmentsList ? this.props.assignmentsList.map(function (assignment, i) {
        var _this3 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AssignmentStudentRow__WEBPACK_IMPORTED_MODULE_4__["default"] // isTeacher={Boolean(false)}
        , {
          classrroom_uuid: this.props.match.params['uuid'],
          assignment: assignment,
          onTitleClick: function onTitleClick() {
            _this3.onAssignmentTitleClick(assignment);
          },
          key: i
        });
      }, this) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: 10,
        md: 10
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: 2,
        md: 2
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: this.handleLeaveClassromModal,
        className: 'gray-link'
      }, "Leave classroom")))) : null);
    }
  }]);

  return StudentClassroomView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

StudentClassroomView.propTypes = {
  classroomActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomFetchStudentClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomLeaveStudentClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  assignmentActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    assignmentFetchAssignmentList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    assignmentFetchFirstUncompletedLesson: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  // classroom: PropTypes.object,
  assignmentsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  uncompletedLesson: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    classroomStudent: state.classroom.classroomStudentClassroom,
    assignmentsList: state.assignment.assignmentsList,
    uncompletedLesson: state.assignment.uncompletedLesson
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    classroomActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_classroom__WEBPACK_IMPORTED_MODULE_8__, dispatch),
    assignmentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_assignment__WEBPACK_IMPORTED_MODULE_9__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(StudentClassroomView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/ClassroomViews/teacher.jsx":
/*!*****************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/ClassroomViews/teacher.jsx ***!
  \*****************************************************************************/
/*! exports provided: default, TeacherViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherViewNotConnected", function() { return TeacherClassroomView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_clipboard_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-clipboard.js */ "./node_modules/react-clipboard.js/dist/react-clipboard.js");
/* harmony import */ var react_clipboard_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_clipboard_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-tabs-redux */ "./node_modules/react-tabs-redux/lib/index.js");
/* harmony import */ var react_tabs_redux__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../history */ "./classroom/static/classroom/js/history.jsx");
/* harmony import */ var _utils_editableLabel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/editableLabel */ "./classroom/static/classroom/js/utils/editableLabel.jsx");
/* harmony import */ var _components_CurriculumRow__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/CurriculumRow */ "./classroom/static/classroom/js/components/CurriculumRow.jsx");
/* harmony import */ var _components_AssignmentTeacherRow__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/AssignmentTeacherRow */ "./classroom/static/classroom/js/components/AssignmentTeacherRow.jsx");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../index */ "./classroom/static/classroom/js/containers/index.jsx");
/* harmony import */ var _actions_assignment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../actions/assignment */ "./classroom/static/classroom/js/actions/assignment.jsx");
/* harmony import */ var _actions_classroom__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../actions/classroom */ "./classroom/static/classroom/js/actions/classroom.jsx");
/* harmony import */ var _actions_student__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../actions/student */ "./classroom/static/classroom/js/actions/student.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../actions/tab */ "./classroom/static/classroom/js/actions/tab.jsx");
/* harmony import */ var _actions_google__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../actions/google */ "./classroom/static/classroom/js/actions/google.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }























var TeacherClassroomView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeacherClassroomView, _React$Component);

  _createClass(TeacherClassroomView, [{
    key: "componentWillMount",
    // componentDidUpdate () { # TODO rewrite with
    value: function componentWillMount() {
      // tabs
      this.props.tabActions.changeSelectedTab('teacher', 'tab', true); // if (this.props.match) {
      //   this.props.tabActions.changeTeacherClassroomSelectedTab('settings', 'teacherClassroomTab', this.props.match)
      // }

      if (this.props.teacherClassroomTab === 'students') {
        this.props.tabActions.changeTeacherClassroomSelectedTab('students', 'teacherClassroomTab', this.props.match);
      } // data


      if (this.props.match.params['uuid'] !== 'create') {
        this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid']);
        this.props.studentActions.classroomFetchStudentsClassroomList(this.props.match.params['uuid']);
        this.props.assignmentActions.assignmentFetchAssignmentList(this.props.match.params['uuid']);
      }
    }
  }]);

  function TeacherClassroomView(props) {
    var _this;

    _classCallCheck(this, TeacherClassroomView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeacherClassroomView).call(this, props));
    _this.handleTitleChange = _this.handleTitleChange.bind(_assertThisInitialized(_this));
    _this.handleCreateAssigment = _this.handleCreateAssigment.bind(_assertThisInitialized(_this));
    _this.handleEditAssignmentModal = _this.handleEditAssignmentModal.bind(_assertThisInitialized(_this));
    _this.hideCopiedToolTip = _this.hideCopiedToolTip.bind(_assertThisInitialized(_this));
    _this.state = {
      showCreateAssigment: false,
      showAssingment: false,
      createNewAssigment: false
    };
    return _this;
  } // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps.match && nextProps.match.params) {
  //     if (nextProps.match.params.uuid === 'create') {
  //       return false
  //     }
  //   }
  //   return true
  // }


  _createClass(TeacherClassroomView, [{
    key: "handleCreateAssigment",
    value: function handleCreateAssigment() {
      this.setState({
        showCreateAssigment: !this.state.showCreateAssigment,
        createNewAssigment: !this.state.showCreateAssigment
      });
    }
  }, {
    key: "handleSettingsMenuClickAssignment",
    value: function handleSettingsMenuClickAssignment(assignment, e) {
      if (e === 'edit') {
        this.props.assignmentActions.assignmentFetchAssignment(this.props.match.params['uuid'], assignment.uuid, this.handleEditAssignmentModal);
      } else if (e === 'delete') {
        this.props.assignmentActions.assignmentDeleteAssignment(this.props.match.params['uuid'], // may be: this.props.classroomTeacher.uuid, ? fixme
        assignment.uuid, true, this.props.match.params['uuid']);
      }
    }
  }, {
    key: "handleEditAssignmentModal",
    value: function handleEditAssignmentModal(assignment) {
      this.setState({
        showCreateAssigment: !this.state.showCreateAssigment
      });
    }
  }, {
    key: "handleViewAssignment",
    value: function handleViewAssignment(assignment) {
      this.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_5__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_10__["BASE_URL"] + 'teacher/' + this.props.classroomTeacher.uuid + '/assignments/' + assignment.uuid));
    }
  }, {
    key: "handleTitleChange",
    value: function handleTitleChange(name) {
      var newClassroom = {};

      if (!name) {
        name = 'classroom';
      }

      newClassroom.name = name;
      newClassroom.uuid = this.props.classroomTeacher.uuid;
      this.props.classroomActions.classroomPartialUpdateTeacherClassroom(newClassroom);
    }
  }, {
    key: "hideCopiedToolTip",
    value: function hideCopiedToolTip() {
      if (this.refs.overlay1) {
        this.refs.overlay1.hide();
      }

      if (this.refs.overlay2) {
        this.refs.overlay2.hide();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var assignmentUrl = _utils_config__WEBPACK_IMPORTED_MODULE_10__["BASE_URL"] + 'teacher/:uuid/assignments/:assigmentUuid';
      var studentsListUrl = this.props.match.path + 'students/';
      var isExactUrl = this.props.match.isExact; // exact url for teacher view

      var studentsS = '';

      if (this.props.classroomTeacher && this.props.classroomTeacher.count_students > 1) {
        studentsS = 's';
      }

      var copiedTooltip = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Tooltip"], {
        id: "copiedTooltip"
      }, "Copied!");
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'pop-up-window'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Container"], {
        fluid: true
      }, " ", this.props.classroomTeacher ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: 12,
        md: 12,
        style: {
          padding: 0
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], {
        style: {
          padding: 0
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: 12,
        md: 12,
        style: {
          textAlign: 'left',
          padding: 0
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: 'back-button',
        onClick: function onClick() {
          _history__WEBPACK_IMPORTED_MODULE_11__["default"].push(_utils_config__WEBPACK_IMPORTED_MODULE_10__["BASE_URL"] + 'teacher/');
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaChevronLeft"], null), "All Classrooms"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: 12,
        md: 12,
        style: {
          textAlign: 'center',
          width: '100%'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'blue-title'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'editable-label'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_editableLabel__WEBPACK_IMPORTED_MODULE_12__["default"], {
        onFocusOut: this.handleTitleChange,
        labelClassName: 'pointer',
        text: this.props.classroomTeacher.name
      })), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaPencilAlt"], null))))) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__["Tabs"], {
        name: "teacherClassroomTab",
        className: "tabs",
        handleSelect: function handleSelect(tabname, tabspace) {
          _this2.props.tabActions.changeTeacherClassroomSelectedTab(tabname, tabspace, _this2.props.match);
        },
        selectedTab: this.props.teacherClassroomTab
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tab-links"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__["TabLink"], {
        to: "settings"
      }, "Settings"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__["TabLink"], {
        to: "students"
      }, "Students"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__["TabLink"], {
        to: "assignments"
      }, "Assignments")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__["TabContent"], {
        for: "settings"
      }, this.props.classroomTeacher ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.classroomTeacher.external_classroom ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'pop-up-window text-align-center'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text title',
        style: {
          fontSize: '2rem',
          color: '#676767',
          marginBottom: '1rem'
        }
      }, "Google Classroom Code"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text title'
      }, "Share google classroom code"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text'
      }, "Join url: ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        target: 'blank',
        href: "https://classroom.google.com/h"
      }, "https://classroom.google.com/h")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'blue-title',
        style: {
          letterSpacing: '0.5rem'
        }
      }, this.props.classroomTeacher.external_classroom.code), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'gray-text pointer'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["OverlayTrigger"], {
        delayShow: 300,
        ref: "overlay1",
        trigger: "click",
        placement: "top",
        overlay: copiedTooltip
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_clipboard_js__WEBPACK_IMPORTED_MODULE_7___default.a, {
        component: "i",
        "data-clipboard-text": this.props.classroomTeacher.external_classroom.code
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: function onClick() {
          setTimeout(_this2.hideCopiedToolTip, 3000);
        }
      }, "copy")))))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'pop-up-window text-align-center'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text title',
        style: {
          fontSize: '2rem',
          color: '#676767',
          marginBottom: '1rem'
        }
      }, "Classroom Code"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text title'
      }, "Share classroom code"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'blue-title',
        style: {
          letterSpacing: '0.5rem'
        }
      }, this.props.classroomTeacher.code), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'gray-text pointer'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["OverlayTrigger"], {
        delayShow: 300,
        ref: "overlay1",
        trigger: "click",
        placement: "top",
        overlay: copiedTooltip
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_clipboard_js__WEBPACK_IMPORTED_MODULE_7___default.a, {
        component: "i",
        "data-clipboard-text": this.props.classroomTeacher.code
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: function onClick() {
          setTimeout(_this2.hideCopiedToolTip, 3000);
        }
      }, "copy"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text title'
      }, "Or invite students with link:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["InputGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["FormControl"], {
        type: "text",
        readOnly: true,
        value: window.location.origin + _utils_config__WEBPACK_IMPORTED_MODULE_10__["BASE_URL"] + 'student/join/' + this.props.classroomTeacher.code + '/'
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "input-group-btn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_clipboard_js__WEBPACK_IMPORTED_MODULE_7___default.a, {
        className: 'btn btn-default',
        component: "button",
        "data-clipboard-text": window.location.origin + _utils_config__WEBPACK_IMPORTED_MODULE_10__["BASE_URL"] + 'student/join/' + this.props.classroomTeacher.code + '/'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["OverlayTrigger"], {
        delayShow: 300,
        trigger: "click",
        placement: "top",
        ref: "overlay2",
        overlay: copiedTooltip
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: function onClick() {
          setTimeout(_this2.hideCopiedToolTip, 3000);
        }
      }, "Copy")))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'pop-up-window text-align-center'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text title',
        style: {
          fontSize: '2rem',
          color: '#676767',
          marginBottom: '1rem'
        }
      }, "Curriculum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CurriculumRow__WEBPACK_IMPORTED_MODULE_13__["CurriculumRow"], {
        curriculum: this.props.classroomTeacher.curriculum
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text title pointer',
        onClick: function onClick() {
          _this2.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_5__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_10__["BASE_URL"] + 'teacher/' + _this2.props.classroomTeacher.uuid + '/edit/'));
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("u", null, "Change curriculum"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text title pointer text-align-center',
        onClick: function onClick() {
          _this2.props.classroomActions.classroomDeleteTeacherClassroom(_this2.props.classroomTeacher.uuid);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("u", null, "Delete this classroom"))) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__["TabContent"], {
        for: "students"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_4__["Route"], {
        path: studentsListUrl,
        component: _index__WEBPACK_IMPORTED_MODULE_15__["TeacherClassroomStudentsView"]
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_9__["TabContent"], {
        for: "assignments"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_4__["Route"], {
        path: assignmentUrl,
        component: _index__WEBPACK_IMPORTED_MODULE_15__["AssignmentView"]
      }), isExactUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'title'
      }, "Class Assignments\xA0") : null, this.props.classroomTeacher && isExactUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'gray-text'
      }, this.props.classroomTeacher.count_students + ' student' + studentsS) : null, this.props.assignmentsList && isExactUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], {
        style: {
          padding: '1rem 2rem',
          margin: '0'
        },
        className: 'small-text'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: 5,
        md: 5
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'gray-text'
      }, "Active assignments")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, "Start on"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, "Due on"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaCheck"], {
        title: 'Completed',
        style: {
          padding: '0 1rem'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaClock"], {
        title: 'Completed late',
        style: {
          padding: '0 1rem'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaTimes"], {
        title: 'Missed',
        style: {
          padding: '0 1rem'
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: 1,
        md: 1
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        style: {
          margin: '0'
        }
      }), this.props.assignmentsList.map(function (assignment, i) {
        var _this3 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AssignmentTeacherRow__WEBPACK_IMPORTED_MODULE_14__["AssignmentTeacherRow"], {
          assignment: assignment,
          onAssignmentsClick: function onAssignmentsClick() {
            return _this3.handleViewAssignment(assignment);
          },
          onSettingsMenuClick: function onSettingsMenuClick(e) {
            return _this3.handleSettingsMenuClickAssignment(assignment, e);
          },
          baseUrl: _utils_config__WEBPACK_IMPORTED_MODULE_10__["BASE_URL"],
          key: i
        });
      }, this)) : null, isExactUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'join-another-classroom',
        onClick: this.handleCreateAssigment
      }, "+ Create an assignment") : null, this.state.showCreateAssigment ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
        show: this.state.showCreateAssigment,
        onHide: this.handleCreateAssigment,
        container: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Header, {
        closeButton: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Title, null, this.state.createNewAssigment ? 'Create' : 'Edit', "  an assignment")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Body, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_index__WEBPACK_IMPORTED_MODULE_15__["AssignmentEdit"], {
        createNew: this.state.createNewAssigment,
        assignment: this.props.assignment,
        onSave: this.handleCreateAssigment
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Footer, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-link',
        onClick: this.handleCreateAssigment
      }, "Back"))) : null))));
    }
  }]);

  return TeacherClassroomView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

TeacherClassroomView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeTeacherClassroomSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  teacherClassroomTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  studentActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomFetchStudentsClassroomList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  classroomActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomFetchTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomPartialUpdateTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomDeleteTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  assignmentActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    assignmentFetchAssignmentList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    assignmentDeleteAssignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    assignmentFetchAssignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  classroomTeacher: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  assignmentsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  assignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object // teacherClassroomStudentsList: PropTypes.array,
  // gapiInitState: PropTypes.bool,
  // googleActions: PropTypes.shape({
  //   googleFetchAndSaveClassroomsStudents: PropTypes.func.isRequired
  // }).isRequired

};

var mapStateToProps = function mapStateToProps(state) {
  return {
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    teacherClassroomTab: state.tab.teacherClassroomTab,
    assignmentsList: state.assignment.assignmentsList,
    assignment: state.assignment.assignment,
    teacherClassroomStudentsList: state.student.classroomStudentsList,
    gapiInitState: state.google.gapiInitState
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_19__, dispatch),
    classroomActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_classroom__WEBPACK_IMPORTED_MODULE_17__, dispatch),
    assignmentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_assignment__WEBPACK_IMPORTED_MODULE_16__, dispatch),
    studentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_student__WEBPACK_IMPORTED_MODULE_18__, dispatch),
    googleActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_google__WEBPACK_IMPORTED_MODULE_20__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(TeacherClassroomView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/IndexView/index.jsx":
/*!**********************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/IndexView/index.jsx ***!
  \**********************************************************************/
/*! exports provided: default, IndexViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexViewNotConnected", function() { return IndexView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_tabs_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-tabs-redux */ "./node_modules/react-tabs-redux/lib/index.js");
/* harmony import */ var react_tabs_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_tabs_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _containers_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../containers/index */ "./classroom/static/classroom/js/containers/index.jsx");
/* harmony import */ var _components_Sheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Sheet */ "./classroom/static/classroom/js/components/Sheet.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/tab */ "./classroom/static/classroom/js/actions/tab.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var IndexView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IndexView, _React$Component);

  function IndexView() {
    _classCallCheck(this, IndexView);

    return _possibleConstructorReturn(this, _getPrototypeOf(IndexView).apply(this, arguments));
  }

  _createClass(IndexView, [{
    key: "render",
    value: function render() {
      var baseUrl = this.props.match.url.replace(/\/$/, '');
      var studentIndexUrl = baseUrl + '/student/';
      var teacherIndexUrl = baseUrl + '/teacher/';

      if (this.props.match.url === '/classroom/' && this.props.match.isExact) {
        this.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_2__["push"])(studentIndexUrl)); // redirect to student index page
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Sheet__WEBPACK_IMPORTED_MODULE_8__["Sheet"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_6__["Tabs"], {
        name: "tab",
        className: "tabs",
        handleSelect: this.props.tabActions.changeSelectedTab,
        selectedTab: this.props.tab
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tab-links"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_6__["TabLink"], {
        to: "student"
      }, "Student"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_6__["TabLink"], {
        to: "teacher"
      }, "Teacher")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_6__["TabContent"], {
        for: "student"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: studentIndexUrl,
        component: _containers_index__WEBPACK_IMPORTED_MODULE_7__["StudentIndexView"]
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs_redux__WEBPACK_IMPORTED_MODULE_6__["TabContent"], {
        for: "teacher"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: teacherIndexUrl,
        component: _containers_index__WEBPACK_IMPORTED_MODULE_7__["TeacherIndexView"]
      })))));
    }
  }]);

  return IndexView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

IndexView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.shape({
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func.isRequired
  }).isRequired,
  tab: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    tab: state.tab.tab,
    gapiInitState: state.google.gapiInitState
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_9__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(IndexView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/IndexView/studentIndex.jsx":
/*!*****************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/IndexView/studentIndex.jsx ***!
  \*****************************************************************************/
/*! exports provided: default, StudentIndexViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentIndexViewNotConnected", function() { return StudentIndexView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../index */ "./classroom/static/classroom/js/containers/index.jsx");
/* harmony import */ var _components_StudentClassroomRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/StudentClassroomRow */ "./classroom/static/classroom/js/components/StudentClassroomRow.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/tab */ "./classroom/static/classroom/js/actions/tab.jsx");
/* harmony import */ var _actions_classroom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../actions/classroom */ "./classroom/static/classroom/js/actions/classroom.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var StudentIndexView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StudentIndexView, _React$Component);

  function StudentIndexView() {
    _classCallCheck(this, StudentIndexView);

    return _possibleConstructorReturn(this, _getPrototypeOf(StudentIndexView).apply(this, arguments));
  }

  _createClass(StudentIndexView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.classroomActions.classroomFetchStudentClassroomsList();
      this.props.tabActions.changeSelectedTab('student', 'tab', true);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var baseUrl = this.props.match.url.replace(/\/$/, '');
      var studentClassroomUrl = baseUrl + '/:uuid/';
      var joinUrl = baseUrl + '/new/join';

      if (this.props.match.params && this.props.match.params.joinCode) {
        var joinCode = this.props.match.params.joinCode; // join to classroom and redirect to classroom student view

        if (joinCode) {
          this.props.classroomActions.classroomJoinClassroom(joinCode);
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.location.pathname === '/classroom/student/' && this.props.classroomStudentList ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Container"], {
        fluid: true
      }, this.props.classroomStudentList.map(function (classroom, i) {
        var _this = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_StudentClassroomRow__WEBPACK_IMPORTED_MODULE_8__["StudentClassroomRow"], {
          classroom: classroom,
          onAssignmentsClick: function onAssignmentsClick(url) {
            return _this.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_3__["push"])(url));
          },
          baseUrl: baseUrl,
          key: i
        });
      }, this)) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        exact: true,
        path: studentClassroomUrl,
        component: _index__WEBPACK_IMPORTED_MODULE_7__["StudentClassroomView"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: joinUrl,
        component: _index__WEBPACK_IMPORTED_MODULE_7__["JoinClassroomView"]
      }), this.props.classroomStudentList && this.props.classroomStudentList.length > 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.location.pathname.lastIndexOf('/classroom/', 0) === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'join-another-classroom',
        onClick: function onClick() {
          return _this2.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_3__["push"])(joinUrl));
        }
      }, "+ Join another classroom") : null) : null, this.props.classroomStudentList && this.props.classroomStudentList.length === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_index__WEBPACK_IMPORTED_MODULE_7__["JoinClassroomView"], null) : null);
    }
  }]);

  return StudentIndexView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

StudentIndexView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  classroomActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomCreateClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomFetchTeacherClassroomsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomFetchStudentClassroomsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomJoinClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  tab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  classroomStudentList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    tab: state.tab.tab,
    classroomStudentList: state.classroom.classroomStudentList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_9__, dispatch),
    classroomActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_classroom__WEBPACK_IMPORTED_MODULE_10__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(StudentIndexView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/IndexView/teacherIndex.jsx":
/*!*****************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/IndexView/teacherIndex.jsx ***!
  \*****************************************************************************/
/*! exports provided: default, TeacherIndexViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherIndexViewNotConnected", function() { return TeacherIndexView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/tab */ "./classroom/static/classroom/js/actions/tab.jsx");
/* harmony import */ var _actions_classroom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/classroom */ "./classroom/static/classroom/js/actions/classroom.jsx");
/* harmony import */ var _components_SelectCurriculum__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/SelectCurriculum */ "./classroom/static/classroom/js/components/SelectCurriculum.jsx");
/* harmony import */ var _components_TeacherClassroomCard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/TeacherClassroomCard */ "./classroom/static/classroom/js/components/TeacherClassroomCard.jsx");
/* harmony import */ var _components_GoogleClassroomRow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/GoogleClassroomRow */ "./classroom/static/classroom/js/components/GoogleClassroomRow.jsx");
/* harmony import */ var _containers_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../containers/index */ "./classroom/static/classroom/js/containers/index.jsx");
/* harmony import */ var _actions_google__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../actions/google */ "./classroom/static/classroom/js/actions/google.jsx");
/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/strings */ "./classroom/static/classroom/js/utils/strings.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










 // import GoooleClassromIcon from '../../../images/google-classroom-yellow-icon.png'








var TeacherIndexView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeacherIndexView, _React$Component);

  function TeacherIndexView(props) {
    var _this;

    _classCallCheck(this, TeacherIndexView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeacherIndexView).call(this, props));
    _this.getGoogleClassroomList = _this.getGoogleClassroomList.bind(_assertThisInitialized(_this));
    _this.handleImportGoogleClassroom = _this.handleImportGoogleClassroom.bind(_assertThisInitialized(_this));
    _this.onGoogleClassroomClick = _this.onGoogleClassroomClick.bind(_assertThisInitialized(_this));
    _this.nextStepGoogleImportClick = _this.nextStepGoogleImportClick.bind(_assertThisInitialized(_this));
    _this.prevStepGoogleImportClick = _this.prevStepGoogleImportClick.bind(_assertThisInitialized(_this));
    _this.selectedCurriculumGoogleImportChanged = _this.selectedCurriculumGoogleImportChanged.bind(_assertThisInitialized(_this));
    _this.state = {
      showSelectGoogleClassroom: false,
      googleClassroomsSelected: [],
      googleCurriculumSelected: null,
      googleClassroomsImportStep: 1
    };
    return _this;
  }

  _createClass(TeacherIndexView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.googleActions.gapiInitialize();
      this.props.classroomActions.classroomFetchTeacherClassroomsList();
      this.props.tabActions.changeSelectedTab('teacher', 'tab', true);
    } // ================ Google start

  }, {
    key: "getGoogleClassroomList",
    value: function getGoogleClassroomList() {
      this.props.googleActions.googleFetchClassroomList();
      this.handleImportGoogleClassroom();
    }
  }, {
    key: "onGoogleClassroomClick",
    value: function onGoogleClassroomClick(classroom) {
      // add classroom to googleSelected list, remove classroom from list if exist
      var classroomIdx = this.state.googleClassroomsSelected.indexOf(classroom);
      var newGoogleClassroomsSelected = this.state.googleClassroomsSelected;

      if (classroomIdx === -1) {
        newGoogleClassroomsSelected.push(classroom);
        this.setState({
          googleClassroomsSelected: newGoogleClassroomsSelected
        });
      } else {
        newGoogleClassroomsSelected.splice(classroomIdx, 1);
        this.setState({
          googleClassroomsSelected: newGoogleClassroomsSelected
        });
      }
    }
  }, {
    key: "prevStepGoogleImportClick",
    value: function prevStepGoogleImportClick() {
      this.setState({
        'googleClassroomsImportStep': this.state.googleClassroomsImportStep - 1
      });
    }
  }, {
    key: "nextStepGoogleImportClick",
    value: function nextStepGoogleImportClick() {
      if (this.state.googleClassroomsImportStep === 1) {
        this.setState({
          'googleClassroomsImportStep': this.state.googleClassroomsImportStep + 1
        });
      } else if (this.state.googleClassroomsImportStep === 2) {
        this.props.googleActions.googleSaveClassroomsWithStudents(this.state.googleClassroomsSelected, this.state.googleCurriculumSelected);
        this.setState({
          'googleClassroomsImportStep': 1,
          googleClassroomsSelected: [],
          googleCurriculumSelected: null
        });
        this.handleImportGoogleClassroom();
      }
    }
  }, {
    key: "selectedCurriculumGoogleImportChanged",
    value: function selectedCurriculumGoogleImportChanged(curriculum) {
      this.setState({
        googleCurriculumSelected: curriculum
      });
    }
  }, {
    key: "handleImportGoogleClassroom",
    value: function handleImportGoogleClassroom() {
      this.setState({
        'showSelectGoogleClassroom': !this.state.showSelectGoogleClassroom
      });
    } // ================ Google end

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var baseUrl = this.props.match.url.replace(/\/$/, '');
      var createUrl = baseUrl + '/create';
      var teacherUrl = baseUrl + '/:uuid/';
      var editUrl = baseUrl + '/:uuid/edit/';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.location.pathname === '/classroom/teacher/' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 6,
        md: 6
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "All classrooms")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: {
          span: 4,
          offset: 2
        },
        md: {
          span: 3,
          offset: 3
        },
        style: {
          marginTop: 10
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: !this.props.gapiInitState,
        onClick: this.getGoogleClassroomList,
        className: "google-button",
        type: "button"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "google-classroom-img"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Import from"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Google Classroom"))), this.state.showSelectGoogleClassroom ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Modal"], {
        show: this.state.showSelectGoogleClassroom,
        onHide: this.handleImportGoogleClassroom,
        container: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Modal"].Header, {
        closeButton: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Modal"].Title, null, "Please select the classes you want to import")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Modal"].Body, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Container"], {
        fluid: true
      }, this.props.googleClassroomsList ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.state.googleClassroomsImportStep === 1 ? this.props.googleClassroomsList.map(function (classroom, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_GoogleClassroomRow__WEBPACK_IMPORTED_MODULE_12__["GoogleClassroomRow"], {
          onGoogleClassroomClick: this.onGoogleClassroomClick,
          existingClassroomsList: this.props.classroomList,
          classroom: classroom,
          key: i
        });
      }, this) // step 2
      : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SelectCurriculum__WEBPACK_IMPORTED_MODULE_10__["default"], {
        selectedCurriculumChanged: this.selectedCurriculumGoogleImportChanged,
        selectedUuid: this.state.googleCurriculumSelected ? this.state.googleCurriculumSelected.uuid : ''
      }))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        style: {
          height: '10rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 12,
        md: 12
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sweet-loading"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_6__["RingLoader"], {
        color: '#1caff6',
        loading: this.state.loading
      })))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Modal"].Footer, null, this.state.googleClassroomsImportStep === 1 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: this.state.googleClassroomsSelected.length === 0,
        className: 'classroom-common-button' + (this.state.googleClassroomsSelected.length > 0 ? '' : ' disabled-button'),
        onClick: this.nextStepGoogleImportClick
      }, "Next step")) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: 'classroom-common-button',
        onClick: this.prevStepGoogleImportClick
      }, "Back"), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: !this.state.googleCurriculumSelected,
        className: 'classroom-common-button' + (this.state.googleCurriculumSelected ? '' : ' disabled-button'),
        onClick: this.nextStepGoogleImportClick
      }, "Import classes")))) : null)), this.props.classroomList ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, " ", this.props.classroomList.map(function (classroom, i) {
        var _this2 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TeacherClassroomCard__WEBPACK_IMPORTED_MODULE_11__["TeacherClassroomCard"], {
          classroom: classroom,
          onTitleClick: function onTitleClick(url) {
            return _this2.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_3__["push"])(url));
          },
          baseUrl: baseUrl,
          key: i
        });
      }, this), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          float: 'left'
        }
      }, this.props.location.pathname === '/classroom/teacher/' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'vcenter create-classroom-button',
        onClick: function onClick() {
          return _this3.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_3__["push"])(createUrl));
        }
      }, "+ Create another classroom") : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          'clear': 'both'
        }
      })) : null) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: createUrl,
        exact: true,
        component: _containers_index__WEBPACK_IMPORTED_MODULE_13__["CreateClassroomView"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: editUrl,
        exact: true,
        component: _containers_index__WEBPACK_IMPORTED_MODULE_13__["CreateClassroomView"]
      }), Object(_utils_strings__WEBPACK_IMPORTED_MODULE_15__["endsWith"])(window.location.pathname, 'teacher/create') || Object(_utils_strings__WEBPACK_IMPORTED_MODULE_15__["endsWith"])(window.location.pathname, '/edit/') ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: teacherUrl,
        component: _containers_index__WEBPACK_IMPORTED_MODULE_13__["TeacherClassroomView"]
      }));
    }
  }]);

  return TeacherIndexView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

TeacherIndexView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  googleActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    googleFetchClassroomList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    gapiInitialize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    googleSaveClassroomsWithStudents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  classroomActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomCreateClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomFetchTeacherClassroomsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomJoinClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  tab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  classroomList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  googleClassroomsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  gapiInitState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    tab: state.tab.tab,
    classroomList: state.classroom.classroomList,
    googleClassroomsList: state.google.googleClassroomsList,
    gapiInitState: state.google.gapiInitState
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_8__, dispatch),
    classroomActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_classroom__WEBPACK_IMPORTED_MODULE_9__, dispatch),
    googleActions: Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_google__WEBPACK_IMPORTED_MODULE_14__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(TeacherIndexView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/Root/DevTools.jsx":
/*!********************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/Root/DevTools.jsx ***!
  \********************************************************************/
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

/***/ "./classroom/static/classroom/js/containers/Root/Root.dev.jsx":
/*!********************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/Root/Root.dev.jsx ***!
  \********************************************************************/
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
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../routes */ "./classroom/static/classroom/js/routes.jsx");
/* harmony import */ var _DevTools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DevTools */ "./classroom/static/classroom/js/containers/Root/DevTools.jsx");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../app */ "./classroom/static/classroom/js/app.jsx");
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

/***/ "./classroom/static/classroom/js/containers/Root/Root.jsx":
/*!****************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/Root/Root.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(/*! ./Root.dev */ "./classroom/static/classroom/js/containers/Root/Root.dev.jsx"); // eslint-disable-line global-require
} else {}

/***/ }),

/***/ "./classroom/static/classroom/js/containers/StudentProfileView/StudentClassroomProfileView.jsx":
/*!*****************************************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/StudentProfileView/StudentClassroomProfileView.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: default, StudentClassroomProfileViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentClassroomProfileViewNotConnected", function() { return StudentClassroomProfileView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var _actions_student__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/student */ "./classroom/static/classroom/js/actions/student.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/tab */ "./classroom/static/classroom/js/actions/tab.jsx");
/* harmony import */ var _actions_assignment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/assignment */ "./classroom/static/classroom/js/actions/assignment.jsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _components_TeacherStudentAssignmentRow__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/TeacherStudentAssignmentRow */ "./classroom/static/classroom/js/components/TeacherStudentAssignmentRow.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }














var StudentClassroomProfileView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StudentClassroomProfileView, _React$Component);

  function StudentClassroomProfileView(props) {
    var _this;

    _classCallCheck(this, StudentClassroomProfileView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StudentClassroomProfileView).call(this, props));
    _this.handleSettingsClick = _this.handleSettingsClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(StudentClassroomProfileView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.tabActions.changeSelectedTab('teacher', 'tab', true);
      this.props.tabActions.changeTeacherClassroomSelectedTab('students', 'teacherClassroomTab', this.props.match);
      this.props.studentActions.classroomFetchStudentClassroomProfile(this.props.match.params['uuid'], this.props.match.params['username']);
      this.props.studentActions.classroomFetchStudentClassroomAssignmentsList(this.props.match.params['uuid'], this.props.match.params['username']);
    }
  }, {
    key: "handleSettingsClick",
    value: function handleSettingsClick(e) {
      if (e === 'remove') {
        this.props.studentActions.removeFromClass(this.props.classroomTeacher.uuid, this.props.studentClassroomProfile.username);
      }
    }
  }, {
    key: "onAssignmentTitleClick",
    value: function onAssignmentTitleClick(assignment) {
      this.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_5__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_4__["BASE_URL"] + 'teacher/' + this.props.classroomTeacher.uuid + '/assignments/' + assignment.uuid));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = 'assignment-teacher-card';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 6,
        md: 6,
        style: {
          textAlign: 'left',
          paddingTop: '1rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: 'back-button',
        onClick: function onClick() {
          _this2.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_5__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_4__["BASE_URL"] + 'teacher/' + _this2.props.classroomTeacher.uuid + '/students/'));
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaChevronLeft"], null), "All students")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 6,
        md: 6,
        className: 'text-right'
      }, this.props.classroomTeacher && !this.props.classroomTeacher.external_classroom ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Dropdown"], {
        onSelect: this.handleSettingsClick,
        id: "dropdown-settings"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Dropdown"].Toggle, {
        className: 'classroom-common-button'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaCog"], null), "\xA0 Manage student"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Dropdown"].Menu, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["DropdownItem"], {
        eventKey: "remove"
      }, "Remove from class"))) : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Row"], {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 1,
        md: 1
      }, this.props.studentClassroomProfile && this.props.studentClassroomProfile.avatar_url ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Image"], {
        fluid: true,
        src: this.props.studentClassroomProfile.avatar_url,
        roundedCircle: true
      }) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 8,
        md: 8
      }, this.props.studentClassroomProfile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'title'
      }, this.props.studentClassroomProfile.display_name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'deep-gray-text'
      }, this.props.studentClassroomProfile.username)) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 3,
        md: 3,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'green-completed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaCheck"], {
        title: 'Completed'
      }), " \xA0", this.props.studentClassroomProfile ? this.props.studentClassroomProfile.counts.num_completed_assignments : ''), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'yellow-delayed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaClock"], {
        title: 'Completed late'
      }), "\xA0", this.props.studentClassroomProfile ? this.props.studentClassroomProfile.counts.num_delayed_assignments : ''), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'red-missed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaTimes"], {
        title: 'Missed'
      }), "\xA0", this.props.studentClassroomProfile ? this.props.studentClassroomProfile.counts.num_missed_assignments : ''))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Row"], {
        style: {
          padding: '1rem 2rem',
          margin: '0'
        },
        className: 'small-text'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 6,
        md: 6
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'gray-text'
      }, "Assignment")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, "Assigned on"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, "Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, "Completed on"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        style: {
          margin: '0'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["Container"], {
        fluid: true
      }, this.props.studentAssignmentsList ? this.props.studentAssignmentsList.map(function (assignment, i) {
        var _this3 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TeacherStudentAssignmentRow__WEBPACK_IMPORTED_MODULE_11__["TeacherStudentAssignmentRow"], {
          isTeacher: Boolean(true),
          assignment: assignment,
          onTitleClick: function onTitleClick() {
            _this3.onAssignmentTitleClick(assignment);
          },
          key: i
        });
      }, this) : null));
    }
  }]);

  return StudentClassroomProfileView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

StudentClassroomProfileView.propTypes = {
  classroomTeacher: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  studentClassroomProfile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeTeacherClassroomSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  studentActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomFetchStudentClassroomAssignmentsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomFetchStudentClassroomProfile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    removeFromClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  studentAssignmentsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    // classroomStudent: state.classroom.classroomStudentClassroom,
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    studentClassroomProfile: state.student.studentClassroomProfile,
    studentAssignmentsList: state.student.studentClassroomAssignments
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    // assignmentActions: bindActionCreators(assignmentCreators, dispatch),
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_7__, dispatch),
    studentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_student__WEBPACK_IMPORTED_MODULE_6__, dispatch),
    assignmentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_assignment__WEBPACK_IMPORTED_MODULE_8__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(StudentClassroomProfileView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/TeacherViews/assignmentEdit.jsx":
/*!**********************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/TeacherViews/assignmentEdit.jsx ***!
  \**********************************************************************************/
/*! exports provided: default, EditAssigmentsViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditAssigmentsViewNotConnected", function() { return AssignmentEdit; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/es/index.js");
/* harmony import */ var react_dropdown_tree_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dropdown-tree-select */ "./node_modules/react-dropdown-tree-select/dist/react-dropdown-tree-select.js");
/* harmony import */ var react_dropdown_tree_select__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dropdown_tree_select__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _actions_assignment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/assignment */ "./classroom/static/classroom/js/actions/assignment.jsx");
/* harmony import */ var _actions_curricula__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/curricula */ "./classroom/static/classroom/js/actions/curricula.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





 // import { push } from 'connected-react-router'
// TODO not work witn bs4
// import DatePicker from 'react-bootstrap-date-picker'
// import TimePicker from 'react-bootstrap-time-picker'





 // import { BASE_URL } from '../../utils/config'

var DEFAULT_STATE = {
  lessonsTreeData: [],
  // data for multiselect
  selectedLessons: [],
  // data from multiselect
  startDate: null,
  _ispopulated: false,
  dueDate: null,
  startTime: null,
  dueTime: null,
  // startTime: 36000,
  // dueTime: 36000,
  sendEmail: false,
  assignmentIsValid: false,
  assignmentName: ''
};

var AssignmentEdit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AssignmentEdit, _React$Component);

  function AssignmentEdit(props) {
    var _this;

    _classCallCheck(this, AssignmentEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AssignmentEdit).call(this, props));
    _this.handleStartOn = _this.handleStartOn.bind(_assertThisInitialized(_this));
    _this.handleDueOn = _this.handleDueOn.bind(_assertThisInitialized(_this));
    _this.handleStartTimeChange = _this.handleStartTimeChange.bind(_assertThisInitialized(_this));
    _this.handleDueTimeChange = _this.handleDueTimeChange.bind(_assertThisInitialized(_this));
    _this.onLessonTreeChange = _this.onLessonTreeChange.bind(_assertThisInitialized(_this));
    _this.handleNameChange = _this.handleNameChange.bind(_assertThisInitialized(_this));
    _this.saveAssignment = _this.saveAssignment.bind(_assertThisInitialized(_this));
    _this.handleSendEmailChange = _this.handleSendEmailChange.bind(_assertThisInitialized(_this));
    _this.state = Object.assign({}, DEFAULT_STATE);
    return _this;
  }

  _createClass(AssignmentEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.curriculaActions.curriculaFetchExpandedCurriculum(this.props.classroomTeacher.curriculum.uuid);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        _ispopulated: false
      });
    }
  }, {
    key: "setIsPopulated",
    value: function setIsPopulated() {
      this.setState({
        _ispopulated: true
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var newLessonsTreeData = [];

      if (props.curriculumExpanded) {
        if (props.curriculumExpanded.units.length > 0 && this.state.lessonsTreeData.length === 0) {
          // populate with modulesTreeData
          newLessonsTreeData = this.addChildren(props.curriculumExpanded.units);
        }

        if (this.props.createNew) {
          this.setState(Object.assign({}, DEFAULT_STATE, {
            lessonsTreeData: newLessonsTreeData
          }), this.setIsPopulated); // reset tree selection
        } else {
          this.setState({
            lessonsTreeData: newLessonsTreeData
          }, this.reloadFromAssignment);
        }
      }
    }
  }, {
    key: "reloadFromAssignment",
    value: function reloadFromAssignment() {
      if (this.props.assignment && !this.props.createNew) {
        // Edit assignment
        var startDate = new Date(this.props.assignment.start_on);
        var dueDate = new Date(this.props.assignment.due_on);
        this.setState({
          // startDate: this.props.assignment.start_on,
          startDate: startDate,
          startTime: startDate,
          // startTime: startDate.getHours() * 60 * 60,
          // dueDate: this.props.assignment.due_on,
          dueTime: dueDate,
          dueDate: dueDate,
          sendEmail: this.props.assignment.send_email,
          // dueTime: dueDate.getHours() * 60 * 60,
          assignmentName: this.props.assignment.name
        }, this.copyNodesFromAssignmentValidate); // copy selected lessons from assignment
      }
    }
  }, {
    key: "handleStartOn",
    value: function handleStartOn(value) {
      this.setState({
        startDate: value
      }, this.validateAssignment);
    }
  }, {
    key: "handleDueOn",
    value: function handleDueOn(value) {
      this.setState({
        dueDate: value
      }, this.validateAssignment);
    }
  }, {
    key: "handleStartTimeChange",
    value: function handleStartTimeChange(value) {
      this.setState({
        startTime: value
      }, this.validateAssignment);
    }
  }, {
    key: "handleDueTimeChange",
    value: function handleDueTimeChange(value) {
      this.setState({
        dueTime: value
      }, this.validateAssignment);
    }
  }, {
    key: "handleSendEmailChange",
    value: function handleSendEmailChange(e) {
      this.setState({
        sendEmail: !this.state.sendEmail
      });
    }
  }, {
    key: "copyValidateTree",
    value: function copyValidateTree() {
      this.copyCheckStateNodesToTree(this.state.lessonsTreeData);
      this.validateAssignment();
    }
  }, {
    key: "handleNameChange",
    value: function handleNameChange(e) {
      this.setState({
        assignmentName: e.target.value
      }, this.validateAssignment);
    }
  }, {
    key: "onLessonTreeChange",
    value: function onLessonTreeChange(currentNode, selectedNodes) {
      this.setState({
        selectedLessons: selectedNodes
      }, this.copyValidateTree);
    }
    /**
     * copy selected nodes from selectedLessons (from multiselect) to lessonsTreeData
     * @param treeNodes
     */

  }, {
    key: "copyCheckStateNodesToTree",
    value: function copyCheckStateNodesToTree(treeNodes) {
      for (var x = 0; x < treeNodes.length; x++) {
        treeNodes[x].checked = false; // unchek by default

        for (var y = 0; y < this.state.selectedLessons.length; y++) {
          if (this.state.selectedLessons[y].value === treeNodes[x].value) {
            treeNodes[x].checked = this.state.selectedLessons[y].checked;
          }
        }

        if (treeNodes[x].hasOwnProperty('children')) {
          // walk on children
          this.copyCheckStateNodesToTree(treeNodes[x].children);
        }
      }
    }
    /**
     *  copy cheked nodes to selectedLessons
     */

  }, {
    key: "copyNodesFromAssignmentValidate",
    value: function copyNodesFromAssignmentValidate() {
      var _this2 = this;

      var selectedLessons = [];

      for (var x = 0; x < this.props.assignment.lessons.length; x++) {
        var checkedLesson = this.props.assignment.lessons[x];
        selectedLessons.push({
          label: checkedLesson.name,
          value: checkedLesson.uuid,
          checked: true,
          disabled: false
        });
      }

      this.setState({
        selectedLessons: selectedLessons
      }, function () {
        _this2.validateAssignment();

        _this2.setIsPopulated();
      });
    }
  }, {
    key: "validateAssignment",
    value: function validateAssignment() {
      if (!this.state.startDate || !this.state.dueDate || this.state.startTime == null || this.state.dueTime == null || !this.state.assignmentName || this.state.selectedLessons.length === 0 || this.state.startDate > this.state.dueDate || // if start date > due date
      new Date(this.state.dueDate) < new Date()) {
        // if due date < date now
        this.setState({
          assignmentIsValid: false
        });
      } else {
        this.setState({
          assignmentIsValid: true
        });
      }
    }
  }, {
    key: "saveAssignment",
    value: function saveAssignment() {
      var lessonsUuids = [];

      for (var x = 0; x < this.state.selectedLessons.length; x++) {
        lessonsUuids.push(this.state.selectedLessons[x].value);
      }

      var startDateTime = new Date(this.state.startDate);
      startDateTime.setHours(this.state.startTime.getHours(), this.state.startTime.getMinutes());
      var dueDateTime = new Date(this.state.dueDate);
      dueDateTime.setHours(this.state.dueTime.getHours(), this.state.dueTime.getMinutes());
      var assignmentJson = {
        name: this.state.assignmentName,
        start_on: startDateTime.toISOString(),
        due_on: dueDateTime.toISOString(),
        classroom_uuid: this.props.classroomTeacher.uuid,
        lessons_uuids: lessonsUuids,
        send_email: this.state.sendEmail
      };

      if (this.props.assignment && this.props.assignment.uuid && !this.props.createNew) {
        // update
        assignmentJson.uuid = this.props.assignment.uuid;
        this.props.assignmentActions.assignmentPartialUpdateAssignment(assignmentJson, true);
      } else {
        // save
        this.props.assignmentActions.assignmentCreateAssignment(assignmentJson, true);
      } // close Window


      if (typeof this.props.onSave === 'function') {
        this.props.onSave();
      }
    }
  }, {
    key: "addChildren",
    value: function addChildren(children) {
      var data = [];

      for (var i = 0; i < children.length; i++) {
        if (children[i].hasOwnProperty('modules') || children[i].hasOwnProperty('lessons')) {
          var childrenAttr;

          if (children[i].hasOwnProperty('modules')) {
            childrenAttr = 'modules';
          }

          if (children[i].hasOwnProperty('lessons')) {
            childrenAttr = 'lessons';
          }

          var newchildren = this.addChildren(children[i][childrenAttr]);
          data.push({
            label: children[i].name,
            value: children[i].uuid,
            children: newchildren,
            expanded: true,
            disabled: true
          });
        } else {
          // lesson
          var checked = false;

          if (this.props.assignment && this.props.assignment.uuid && !this.props.createNew) {
            for (var y = 0; y < this.props.assignment.lessons.length; y++) {
              if (this.props.assignment.lessons[y].uuid === children[i].uuid) {
                checked = true;
                break;
              }
            }
          }

          data.push({
            label: children[i].name,
            value: children[i].uuid,
            checked: checked,
            disabled: false
          });
        }
      }

      return data;
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.state._ispopulated ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 3,
        md: 3,
        className: 'text-right'
      }, "Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 9,
        md: 9
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["FormControl"], {
        type: "text",
        value: this.state.assignmentName,
        placeholder: "Enter name",
        onChange: this.handleNameChange
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 3,
        md: 3,
        className: 'text-right'
      }, "Assignment"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 9,
        md: 9
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dropdown_tree_select__WEBPACK_IMPORTED_MODULE_6___default.a, {
        onChange: this.onLessonTreeChange,
        data: this.state.lessonsTreeData,
        placeholderText: 'Pick a goal skill'
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 3,
        md: 3,
        className: 'text-right'
      }, "Start on"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 6,
        md: 6
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "form-control",
        onChange: this.handleStartOn,
        selected: this.state.startDate
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 3,
        md: 3
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "form-control",
        selected: this.state.startTime,
        onChange: this.handleStartTimeChange,
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 60,
        dateFormat: "HH:mm",
        timeFormat: "HH:mm",
        timeCaption: "Time"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 3,
        md: 3,
        className: 'text-right'
      }, "Due on"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 6,
        md: 6
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "form-control",
        onChange: this.handleDueOn,
        selected: this.state.dueDate
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 3,
        md: 3
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "form-control",
        selected: this.state.dueTime,
        onChange: this.handleDueTimeChange,
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 60,
        dateFormat: "HH:mm",
        timeFormat: "HH:mm",
        timeCaption: "Time"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 3,
        md: 3,
        className: 'text-right'
      }, "Email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 9,
        md: 9
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["FormCheck"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["FormCheck"].Input, {
        onClick: this.handleSendEmailChange,
        type: 'checkbox',
        defaultChecked: this.state.sendEmail
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["FormCheck"].Label, null, "Send email notification")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 12,
        md: 12,
        className: 'text-center'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: 'classroom-common-button' + (this.state.assignmentIsValid ? '' : ' disabled-button'),
        disabled: !this.state.assignmentIsValid,
        onClick: this.saveAssignment
      }, "Schedule assignment")))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Col"], {
        sm: 12,
        md: 12,
        style: {
          margin: '0 40% 0 40%'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_4__["RingLoader"], {
        color: '#1caff6',
        loading: this.state.loading
      })))));
    }
  }]);

  return AssignmentEdit;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

AssignmentEdit.propTypes = {
  curriculaActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    curriculaFetchExpandedCurriculum: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    dataReceiveExpandedCurriculum: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  curriculumExpanded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  classroomTeacher: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  assignmentActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    assignmentCreateAssignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    assignmentFetchAssignmentList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    assignmentPartialUpdateAssignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  onSave: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  assignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  createNew: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    // classroomStudent: state.classroom.classroomStudentClassroom
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    curriculumExpanded: state.curricula.curriculumExpanded
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    curriculaActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_curricula__WEBPACK_IMPORTED_MODULE_9__, dispatch),
    assignmentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_assignment__WEBPACK_IMPORTED_MODULE_8__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(AssignmentEdit));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/TeacherViews/assignmentView.jsx":
/*!**********************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/TeacherViews/assignmentView.jsx ***!
  \**********************************************************************************/
/*! exports provided: AssignmentView, default, AssignmentViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignmentView", function() { return AssignmentView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignmentViewNotConnected", function() { return AssignmentView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _actions_assignment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/assignment */ "./classroom/static/classroom/js/actions/assignment.jsx");
/* harmony import */ var _actions_student__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/student */ "./classroom/static/classroom/js/actions/student.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/tab */ "./classroom/static/classroom/js/actions/tab.jsx");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../index */ "./classroom/static/classroom/js/containers/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../history */ "./classroom/static/classroom/js/history.jsx");
/* harmony import */ var _components_TeacherAssigmentStudentRow__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/TeacherAssigmentStudentRow */ "./classroom/static/classroom/js/components/TeacherAssigmentStudentRow.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }















var AssignmentView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AssignmentView, _React$Component);

  function AssignmentView(props) {
    var _this;

    _classCallCheck(this, AssignmentView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AssignmentView).call(this, props));
    _this.handleEditAssignmentModal = _this.handleEditAssignmentModal.bind(_assertThisInitialized(_this));
    _this.handleSettingsClick = _this.handleSettingsClick.bind(_assertThisInitialized(_this));
    _this.state = {
      showEditAssigment: false
    };
    return _this;
  }

  _createClass(AssignmentView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.tabActions.changeSelectedTab('teacher', 'tab', true);
      this.props.tabActions.changeTeacherClassroomSelectedTab('assignments', 'teacherClassroomTab');
      this.props.assignmentActions.assignmentFetchAssignment(this.props.match.params['uuid'], this.props.match.params['assigmentUuid']);
      this.props.assignmentActions.assignmentFetchStudentsList(this.props.match.params['uuid'], this.props.match.params['assigmentUuid']);
    }
  }, {
    key: "handleEditAssignmentModal",
    value: function handleEditAssignmentModal() {
      this.setState({
        showEditAssigment: !this.state.showEditAssigment
      });
    }
  }, {
    key: "handleSettingsClick",
    value: function handleSettingsClick(e) {
      var _this2 = this;

      if (e === 'edit') {
        this.handleEditAssignmentModal();
      } else if (e === 'delete') {
        this.props.assignmentActions.assignmentDeleteAssignment(this.props.match.params['uuid'], this.props.match.params['assigmentUuid'], true, function () {
          _this2.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_4__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_11__["BASE_URL"] + 'teacher/' + _this2.props.match.params['uuid']));
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var className = 'assignment-teacher-card';
      var dateText = '';

      if (this.props.assignment) {
        dateText = 'Assigned on ' + new Date(this.props.assignment.start_on).toLocaleDateString() + ' at ' + new Date(this.props.assignment.start_on).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }) + ' and due on ' + new Date(this.props.assignment.due_on).toLocaleDateString() + ' at ' + new Date(this.props.assignment.due_on).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
      }

      var postOnGoogleUrl = null;

      if (this.props.classroomTeacher && this.props.assignment && this.props.classroomTeacher.external_classroom) {
        postOnGoogleUrl = this.props.classroomTeacher.external_classroom.alternate_link.replace('/c/', '/share/') + '/assignment?url=' + encodeURIComponent(window.location.origin + '/classroom/' + this.props.classroomTeacher.uuid + '/student/assignments/#' + this.props.assignment.uuid) + '&title=' + this.props.assignment.name + '&body=Only for ' + this.props.classroomTeacher.external_classroom.name + ' classroom'; // test
        // postOnGoogleUrl =
        //   this.props.classroomTeacher.external_classroom.alternate_link.replace('/c/', '/share/') +
        //   '/assignment?url=' + encodeURIComponent('https://www.physicsisbeautiful.com/curriculum') + '&title=' +
        //   this.props.assignment.name + '&body=Only for ' +
        //   this.props.classroomTeacher.external_classroom.name + ' classroom'
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        id: "all-assignments"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        md: 12,
        style: {
          padding: 0
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: 'back-button',
        onClick: function onClick() {
          _history__WEBPACK_IMPORTED_MODULE_12__["default"].push(_utils_config__WEBPACK_IMPORTED_MODULE_11__["BASE_URL"] + 'teacher/' + _this3.props.match.params['uuid'] + '/');
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaChevronLeft"], null), "All assignments"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        style: {
          padding: 0,
          marginTop: 10
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        md: 9
      }, postOnGoogleUrl ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        // onClick={this.getGoogleClassroomList}
        target: '_blank',
        href: postOnGoogleUrl,
        className: "google-button",
        type: "button"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "google-classroom-img"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Post on"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Google Classroom"))) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        md: 3,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Dropdown"], {
        onSelect: this.handleSettingsClick,
        id: "dropdown-settings"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Dropdown"].Toggle, {
        className: 'classroom-common-button',
        style: {
          marginTop: 0
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaCog"], null), "\xA0 Manage assignment"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Dropdown"].Menu, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["DropdownItem"], {
        eventKey: "delete"
      }, "Delete assignment"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["DropdownItem"], {
        eventKey: "edit"
      }, "Edit assignment")))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        className: className
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 1,
        md: 1,
        style: {
          maxWidth: '35%'
        }
      }, this.props.assignment && this.props.assignment.lessons.length > 0 && this.props.assignment.lessons[0].image ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Image"], {
        className: 'pointer',
        width: '100%',
        src: this.props.assignment.lessons[0].image
      }) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 6,
        md: 6
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'blue-title pointer'
      }, this.props.assignment ? this.props.assignment.name : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text'
      }, this.props.assignment ? this.props.assignment.lessons.length : null, "\xA0 lesson", this.props.assignment && this.props.assignment.lessons.length > 1 ? 's' : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 5,
        md: 5,
        className: 'text-right'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'green-completed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaCheck"], {
        title: 'Completed'
      }), "\xA0", this.props.assignment ? this.props.assignment.count_students_completed_assingment : null), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'yellow-delayed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaClock"], {
        title: 'Missed'
      }), "\xA0", this.props.assignment ? this.props.assignment.count_students_delayed_assingment : null), "\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'red-missed-box'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaTimes"], {
        title: 'Missed'
      }), "\xA0", this.props.assignment ? this.props.assignment.count_students_missed_assingment : null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-text small-text'
      }, dateText)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        style: {
          padding: '1rem 2rem',
          margin: '0'
        },
        className: 'small-text'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 7,
        md: 7
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'gray-text'
      }, "Student")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, "Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 2,
        md: 2,
        className: 'vcenter'
      }, "Completed on"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        style: {
          margin: '0'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Container"], {
        fluid: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        className: ''
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: 12,
        md: 12
      }, this.props.assignment && this.props.classroomTeacher && this.props.assignmentStudentsList ? this.props.assignmentStudentsList.map(function (student, i) {
        var _this4 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TeacherAssigmentStudentRow__WEBPACK_IMPORTED_MODULE_13__["TeacherAssigmentStudentRow"], {
          assignment: this.props.assignment,
          student: student,
          onStudentClick: function onStudentClick() {
            return _this4.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_4__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_11__["BASE_URL"] + 'teacher/' + _this4.props.classroomTeacher.uuid + '/students/' + student.username));
          },
          key: i
        });
      }, this) : null))), this.state.showEditAssigment ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"], {
        show: this.state.showEditAssigment,
        onHide: this.handleEditAssignmentModal,
        container: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Header, {
        closeButton: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Title, null, this.props.assignment ? 'Edit' : 'Create', "  an assignment")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Body, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_index__WEBPACK_IMPORTED_MODULE_10__["AssignmentEdit"], {
        createNew: false,
        assignment: this.props.assignment,
        onSave: this.handleEditAssignmentModal
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Footer, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-link',
        onClick: this.handleCreateAssigment
      }, "Back"))) : null);
    }
  }]);

  return AssignmentView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
AssignmentView.propTypes = {
  assignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  classroomTeacher: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeTeacherClassroomSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  assignmentActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    assignmentFetchAssignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    assignmentDeleteAssignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    assignmentFetchStudentsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    // classroomStudent: state.classroom.classroomStudentClassroom
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    teacherClassroomStudentsList: state.student.classroomStudentsList,
    assignment: state.assignment.assignment,
    assignmentStudentsList: state.assignment.assignmentStudentsList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    assignmentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_assignment__WEBPACK_IMPORTED_MODULE_7__, dispatch),
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_9__, dispatch),
    studentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_student__WEBPACK_IMPORTED_MODULE_8__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(AssignmentView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/TeacherViews/classroomStudents.jsx":
/*!*************************************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/TeacherViews/classroomStudents.jsx ***!
  \*************************************************************************************/
/*! exports provided: default, TeacherClassroomStudentsViewNotConnected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherClassroomStudentsViewNotConnected", function() { return TeacherClassroomStudentsView; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/config */ "./classroom/static/classroom/js/utils/config.jsx");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../index */ "./classroom/static/classroom/js/containers/index.jsx");
/* harmony import */ var _actions_tab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/tab */ "./classroom/static/classroom/js/actions/tab.jsx");
/* harmony import */ var _actions_classroom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/classroom */ "./classroom/static/classroom/js/actions/classroom.jsx");
/* harmony import */ var _actions_student__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/student */ "./classroom/static/classroom/js/actions/student.jsx");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _components_TeacherStudentCard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/TeacherStudentCard */ "./classroom/static/classroom/js/components/TeacherStudentCard.jsx");
/* harmony import */ var _actions_google__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../actions/google */ "./classroom/static/classroom/js/actions/google.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
















var TeacherClassroomStudentsView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeacherClassroomStudentsView, _React$Component);

  function TeacherClassroomStudentsView(props) {
    var _this;

    _classCallCheck(this, TeacherClassroomStudentsView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeacherClassroomStudentsView).call(this, props));
    _this.syncExternalStudents = _this.syncExternalStudents.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TeacherClassroomStudentsView, [{
    key: "syncExternalStudents",
    value: function syncExternalStudents() {
      var googleClassroomsList = [{
        id: this.props.classroomTeacher.external_classroom.external_id,
        pib_classroom_uuid: this.props.classroomTeacher.uuid
      }];
      this.props.googleActions.googleFetchAndSaveClassroomsStudents(googleClassroomsList, true);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!this.props.teacherClassroomStudentsList) {
        this.props.studentActions.classroomFetchStudentsClassroomList(this.props.match.params['uuid']);
      }

      if (!this.props.classroomTeacher) {
        this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid']);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isExactUrl = this.props.match.isExact; // exact url for teacher view

      var studentProfileUrl = this.props.match.path + ':username';

      if (isExactUrl) {
        if (this.props.teacherClassroomTab !== 'students') {
          this.props.tabActions.changeTeacherClassroomSelectedTab('students', 'teacherClassroomTab', this.props.match);
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, isExactUrl && this.props.classroomTeacher && this.props.classroomTeacher.external_classroom ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        sm: 7,
        md: 7,
        className: 'vcenter'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'gray-text'
      }, "Keep your Google Classroom in sync")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], {
        sm: 5,
        md: 5
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: !this.props.gapiInitState,
        className: 'classroom-common-button',
        onClick: this.syncExternalStudents
      }, "Sync students"))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_10__["Route"], {
        path: studentProfileUrl,
        component: _index__WEBPACK_IMPORTED_MODULE_6__["StudentClassroomProfileView"]
      }), isExactUrl && this.props.classroomTeacher ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.teacherClassroomStudentsList ? this.props.teacherClassroomStudentsList.map(function (student, i) {
        var _this2 = this;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TeacherStudentCard__WEBPACK_IMPORTED_MODULE_12__["TeacherStudentCard"], {
          student: student,
          onStudentClick: function onStudentClick() {
            return _this2.props.dispatch(Object(connected_react_router__WEBPACK_IMPORTED_MODULE_4__["push"])(_utils_config__WEBPACK_IMPORTED_MODULE_5__["BASE_URL"] + 'teacher/' + _this2.props.classroomTeacher.uuid + '/students/' + student.username));
          },
          key: i
        });
      }, this) : null, this.props.teacherClassroomStudentsList.length === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        style: {
          margin: '2rem'
        }
      }, "There are no students in the classroom") : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          clear: 'both'
        }
      })) : null, !isExactUrl && this.props.classroomTeacher && this.props.classroomTeacher.count_students === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'gray-background-info-panel'
      }, "No students have joined your classroom yet. ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Share the ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("u", null, "classroom code"), " with your students so they can join your classroom.") : null);
    }
  }]);

  return TeacherClassroomStudentsView;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

TeacherClassroomStudentsView.propTypes = {
  tabActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    changeTeacherClassroomSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    changeSelectedTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  teacherClassroomTab: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  studentActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomFetchStudentsClassroomList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  classroomActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    classroomFetchTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomPartialUpdateTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    classroomDeleteTeacherClassroom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired,
  classroomTeacher: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  teacherClassroomStudentsList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  googleActions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    googleFetchAndSaveClassroomsStudents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
  }).isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    teacherClassroomTab: state.tab.teacherClassroomTab,
    // assignmentsList: state.assignment.assignmentsList,
    // assignment: state.assignment.assignment,
    teacherClassroomStudentsList: state.student.classroomStudentsList,
    gapiInitState: state.google.gapiInitState
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    tabActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_tab__WEBPACK_IMPORTED_MODULE_7__, dispatch),
    classroomActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_classroom__WEBPACK_IMPORTED_MODULE_8__, dispatch),
    studentActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_student__WEBPACK_IMPORTED_MODULE_9__, dispatch),
    googleActions: Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_google__WEBPACK_IMPORTED_MODULE_13__, dispatch)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(TeacherClassroomStudentsView));


/***/ }),

/***/ "./classroom/static/classroom/js/containers/index.jsx":
/*!************************************************************!*\
  !*** ./classroom/static/classroom/js/containers/index.jsx ***!
  \************************************************************/
/*! exports provided: IndexView, StudentIndexView, TeacherIndexView, CreateClassroomView, JoinClassroomView, StudentClassroomView, TeacherClassroomView, AssignmentView, AssignmentEdit, StudentClassroomProfileView, TeacherClassroomStudentsView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexView_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexView/index */ "./classroom/static/classroom/js/containers/IndexView/index.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IndexView", function() { return _IndexView_index__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _IndexView_studentIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexView/studentIndex */ "./classroom/static/classroom/js/containers/IndexView/studentIndex.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StudentIndexView", function() { return _IndexView_studentIndex__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _IndexView_teacherIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IndexView/teacherIndex */ "./classroom/static/classroom/js/containers/IndexView/teacherIndex.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeacherIndexView", function() { return _IndexView_teacherIndex__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _ClassroomViews_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ClassroomViews/create */ "./classroom/static/classroom/js/containers/ClassroomViews/create.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateClassroomView", function() { return _ClassroomViews_create__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _ClassroomViews_join__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ClassroomViews/join */ "./classroom/static/classroom/js/containers/ClassroomViews/join.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JoinClassroomView", function() { return _ClassroomViews_join__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _ClassroomViews_student__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ClassroomViews/student */ "./classroom/static/classroom/js/containers/ClassroomViews/student.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StudentClassroomView", function() { return _ClassroomViews_student__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _ClassroomViews_teacher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ClassroomViews/teacher */ "./classroom/static/classroom/js/containers/ClassroomViews/teacher.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeacherClassroomView", function() { return _ClassroomViews_teacher__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _TeacherViews_assignmentView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TeacherViews/assignmentView */ "./classroom/static/classroom/js/containers/TeacherViews/assignmentView.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssignmentView", function() { return _TeacherViews_assignmentView__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _TeacherViews_assignmentEdit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TeacherViews/assignmentEdit */ "./classroom/static/classroom/js/containers/TeacherViews/assignmentEdit.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssignmentEdit", function() { return _TeacherViews_assignmentEdit__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _StudentProfileView_StudentClassroomProfileView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StudentProfileView/StudentClassroomProfileView */ "./classroom/static/classroom/js/containers/StudentProfileView/StudentClassroomProfileView.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StudentClassroomProfileView", function() { return _StudentProfileView_StudentClassroomProfileView__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _TeacherViews_classroomStudents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TeacherViews/classroomStudents */ "./classroom/static/classroom/js/containers/TeacherViews/classroomStudents.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeacherClassroomStudentsView", function() { return _TeacherViews_classroomStudents__WEBPACK_IMPORTED_MODULE_10__["default"]; });














/***/ }),

/***/ "./classroom/static/classroom/js/history.jsx":
/*!***************************************************!*\
  !*** ./classroom/static/classroom/js/history.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! history/createBrowserHistory */ "./node_modules/history/createBrowserHistory.js");
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0___default()()); // export default createHistory({basename: '/classrroom'}) TODO fix all urls with basename

/***/ }),

/***/ "./classroom/static/classroom/js/index.jsx":
/*!*************************************************!*\
  !*** ./classroom/static/classroom/js/index.jsx ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./history */ "./classroom/static/classroom/js/history.jsx");
/* harmony import */ var _containers_Root_Root__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/Root/Root */ "./classroom/static/classroom/js/containers/Root/Root.jsx");
/* harmony import */ var _containers_Root_Root__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_containers_Root_Root__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store/configureStore */ "./classroom/static/classroom/js/store/configureStore.jsx");
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_store_configureStore__WEBPACK_IMPORTED_MODULE_4__);

 // import createHistory from 'history/createBrowserHistory'




var initialState = {};
var target = document.getElementById('react-app'); // const history = createHistory()

var store = _store_configureStore__WEBPACK_IMPORTED_MODULE_4___default()(initialState, _history__WEBPACK_IMPORTED_MODULE_2__["default"]);
var node = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_Root_Root__WEBPACK_IMPORTED_MODULE_3___default.a, {
  store: store,
  history: _history__WEBPACK_IMPORTED_MODULE_2__["default"]
}); // const token = sessionStorage.getItem('token')
// let user = {}
// try {
//     user = JSON.parse(sessionStorage.getItem('user'))
// } catch (e) {
//     // Failed to parse
// }
//
// if (token !== null) {
//     store.dispatch(authLoginUserSuccess(token, user))
// }

react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(node, target);

/***/ }),

/***/ "./classroom/static/classroom/js/reducers/assignment.jsx":
/*!***************************************************************!*\
  !*** ./classroom/static/classroom/js/reducers/assignment.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return assignmentReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var initialState = {
  assignmentsList: null,
  assignmentsStudentLessonsList: {}
};
function assignmentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST"]:
      return Object.assign({}, state, {
        assignmentsList: action.payload.assignmentsList
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON"]:
      return Object.assign({}, state, {
        uncompletedLesson: action.payload.uncompletedLesson
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS"]:
    case _constants__WEBPACK_IMPORTED_MODULE_0__["ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS"]:
      return Object.assign({}, state, {
        assignment: action.payload.assignment
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST"]:
      return Object.assign({}, state, {
        assignmentStudentsList: action.payload.assignmentStudentsList
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST"]:
      var name = 'assignmentStudentLessonsList' + action.payload.assignmentUuid;
      return Object.assign({}, state, _defineProperty({}, name, action.payload.assignmentStudentLessonsList));

    default:
      return state;
  }
}

/***/ }),

/***/ "./classroom/static/classroom/js/reducers/classroom.jsx":
/*!**************************************************************!*\
  !*** ./classroom/static/classroom/js/reducers/classroom.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return classroomReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");

var initialState = {
  classroomList: null,
  classroomClassroom: undefined
};
function classroomReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST"]:
      return Object.assign({}, state, {
        classroomList: action.payload.classroomList
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CLASSROOM_RECEIVE_TEACHER_CLASSROOM"]:
      return Object.assign({}, state, {
        classroomTeacherClassroom: action.payload.classroomTeacher
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS"]:
      return Object.assign({}, state, {
        classroomTeacherClassroom: action.payload.classroomTeacher
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS"]:
      return Object.assign({}, state, {
        classroomTeacherClassroom: action.payload.classroomTeacher
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS"]:
      return Object.assign({}, state, {
        classroomStudentClassroom: action.payload.classroomStudent
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CLASSROOM_RECEIVE_STUDENT_CLASSROOM"]:
      return Object.assign({}, state, {
        classroomStudentClassroom: action.payload.classroomStudent
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS"]:
      return Object.assign({}, state, {
        classroomStudentClassroom: undefined
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST"]:
      return Object.assign({}, state, {
        classroomStudentList: action.payload.classroomStudentList
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./classroom/static/classroom/js/reducers/curricula.jsx":
/*!**************************************************************!*\
  !*** ./classroom/static/classroom/js/reducers/curricula.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return curriculaReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");

var initialState = {
  curriculaList: null,
  curriculaOtherList: null
};
function curriculaReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["CURRICULA_RECEIVE_CURRICULA_LIST"]:
      return Object.assign({}, state, {
        curriculaList: action.payload.curriculaList
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CURRICULA_RECEIVE_OTHER_CURRICULA_LIST"]:
      return Object.assign({}, state, {
        curriculaOtherList: action.payload.curriculaOtherList
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CURRICULA_RECEIVE_EXPANDED_CURRICULUM"]:
      return Object.assign({}, state, {
        curriculumExpanded: action.payload.curriculum
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./classroom/static/classroom/js/reducers/google.jsx":
/*!***********************************************************!*\
  !*** ./classroom/static/classroom/js/reducers/google.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return googleReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");

var initialState = {
  googleClassroomsList: null,
  googleInitState: false
};
function googleReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["GOOGLE_RECEIVE_CLASSROOMS_LIST"]:
      return Object.assign({}, state, {
        googleClassroomsList: action.payload.googleClassroomsList
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["GOOGLE_INIT_STATE_CHANGED"]:
      return Object.assign({}, state, {
        gapiInitState: action.payload.gapiInitState
      });
    // case GOOGLE_RECEIVE_CLASSROOMS_STUDENTS_LIST:
    //   return Object.assign({}, state, {
    //     googleClassroomsStudentsList: action.payload.googleClassroomsStudentsList
    //   })

    default:
      return state;
  }
}

/***/ }),

/***/ "./classroom/static/classroom/js/reducers/index.jsx":
/*!**********************************************************!*\
  !*** ./classroom/static/classroom/js/reducers/index.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab */ "./classroom/static/classroom/js/reducers/tab.jsx");
/* harmony import */ var _classroom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classroom */ "./classroom/static/classroom/js/reducers/classroom.jsx");
/* harmony import */ var _curricula__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curricula */ "./classroom/static/classroom/js/reducers/curricula.jsx");
/* harmony import */ var _assignment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assignment */ "./classroom/static/classroom/js/reducers/assignment.jsx");
/* harmony import */ var _student__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./student */ "./classroom/static/classroom/js/reducers/student.jsx");
/* harmony import */ var _google__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./google */ "./classroom/static/classroom/js/reducers/google.jsx");
// import { combineReducers } from 'redux'





 // export default combineReducers({
//   tab: tabReducer,
//   classroom: classroomReducer,
//   curricula: curriculaReducer,
//   assignment: assignmentReducer,
//   student: studentReducer,
//   google: googleReducer
// })

/* harmony default export */ __webpack_exports__["default"] = ({
  tab: _tab__WEBPACK_IMPORTED_MODULE_0__["default"],
  classroom: _classroom__WEBPACK_IMPORTED_MODULE_1__["default"],
  curricula: _curricula__WEBPACK_IMPORTED_MODULE_2__["default"],
  assignment: _assignment__WEBPACK_IMPORTED_MODULE_3__["default"],
  student: _student__WEBPACK_IMPORTED_MODULE_4__["default"],
  google: _google__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "./classroom/static/classroom/js/reducers/student.jsx":
/*!************************************************************!*\
  !*** ./classroom/static/classroom/js/reducers/student.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return assignmentReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");

var initialState = {
  studentClassroomAssignments: null,
  studentClassroomProfile: null
};
function assignmentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS"]:
      return Object.assign({}, state, {
        studentClassroomAssignments: action.payload.studentClassroomAssignments
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["STUDENT_RECEIVE_CLASSROOM_PROFILE"]:
      return Object.assign({}, state, {
        studentClassroomProfile: action.payload.studentClassroomProfile
      });

    case _constants__WEBPACK_IMPORTED_MODULE_0__["STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST"]:
      return Object.assign({}, state, {
        classroomStudentsList: action.payload.classroomStudentsList
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./classroom/static/classroom/js/reducers/tab.jsx":
/*!********************************************************!*\
  !*** ./classroom/static/classroom/js/reducers/tab.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tabsReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./classroom/static/classroom/js/constants/index.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var initialState = {
  tab: null,
  teacherClassroomTab: null
};
function tabsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["CHANGE_SELECTED_TAB"]:
      return Object.assign({}, state, _defineProperty({}, action.namespace, action.tab));

    case _constants__WEBPACK_IMPORTED_MODULE_0__["CHANGE_SELECTED_TAB_TEACHER_CLASSROOM"]:
      return Object.assign({}, state, _defineProperty({}, action.namespace, action.teacherClassroomTab));

    default:
      return state;
  }
}

/***/ }),

/***/ "./classroom/static/classroom/js/routes.jsx":
/*!**************************************************!*\
  !*** ./classroom/static/classroom/js/routes.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _containers_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/index */ "./classroom/static/classroom/js/containers/index.jsx");
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/config */ "./classroom/static/classroom/js/utils/config.jsx");




/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  path: _utils_config__WEBPACK_IMPORTED_MODULE_3__["BASE_URL"] + 'student/join/:joinCode/',
  component: _containers_index__WEBPACK_IMPORTED_MODULE_2__["StudentIndexView"]
}), "  ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  path: _utils_config__WEBPACK_IMPORTED_MODULE_3__["BASE_URL"],
  component: _containers_index__WEBPACK_IMPORTED_MODULE_2__["IndexView"]
})));

/***/ }),

/***/ "./classroom/static/classroom/js/store/configureStore.dev.jsx":
/*!********************************************************************!*\
  !*** ./classroom/static/classroom/js/store/configureStore.dev.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers */ "./classroom/static/classroom/js/reducers/index.jsx");
/* harmony import */ var _containers_Root_DevTools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/Root/DevTools */ "./classroom/static/classroom/js/containers/Root/DevTools.jsx");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  var reducers = Object(redux__WEBPACK_IMPORTED_MODULE_2__["combineReducers"])(_objectSpread({}, _reducers__WEBPACK_IMPORTED_MODULE_3__["default"], {
    router: Object(connected_react_router__WEBPACK_IMPORTED_MODULE_5__["connectRouter"])(history)
  })); // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating

  var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])( // rootReducer,
  // connectRouter(history)(rootReducer),
  reducers, initialState, middlewareWithDevTools // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(
  );

  if (false) {}

  return store;
}

/***/ }),

/***/ "./classroom/static/classroom/js/store/configureStore.jsx":
/*!****************************************************************!*\
  !*** ./classroom/static/classroom/js/store/configureStore.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(/*! ./configureStore.dev */ "./classroom/static/classroom/js/store/configureStore.dev.jsx"); // eslint-disable-line global-require
} else {}

/***/ }),

/***/ "./classroom/static/classroom/js/utils/config.jsx":
/*!********************************************************!*\
  !*** ./classroom/static/classroom/js/utils/config.jsx ***!
  \********************************************************/
/*! exports provided: BASE_URL, API_PREFIX, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_URL", function() { return BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_PREFIX", function() { return API_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BASE_URL; });
var BASE_URL = '/classroom/'; // TODO get from current domain path?

var API_PREFIX = '/api/v1/classroom/'; // config should use named export as there can be different exports,
// just need to export default also because of eslint rules



/***/ }),

/***/ "./classroom/static/classroom/js/utils/editableLabel.jsx":
/*!***************************************************************!*\
  !*** ./classroom/static/classroom/js/utils/editableLabel.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditableLabel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var EditableLabel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditableLabel, _React$Component);

  function EditableLabel(props) {
    var _this;

    _classCallCheck(this, EditableLabel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditableLabel).call(this, props));
    _this.state = {
      isEditing: _this.props.isEditing || false,
      text: _this.props.text || ""
    };
    _this._handleFocus = _this._handleFocus.bind(_assertThisInitialized(_this));
    _this._handleChange = _this._handleChange.bind(_assertThisInitialized(_this));
    _this.handleEnterPressed = _this.handleEnterPressed.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EditableLabel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.text !== this.props.text) {
        this.setState({
          text: nextProps.text
        });
      }
    }
  }, {
    key: "handleEnterPressed",
    value: function handleEnterPressed(e) {
      if (e.keyCode === 13) {
        this._handleFocus();
      }

      return false;
    }
  }, {
    key: "_handleFocus",
    value: function _handleFocus() {
      if (this.state.isEditing) {
        if (typeof this.props.onFocusOut === 'function') {
          this.props.onFocusOut(this.state.text);
        }
      } else {
        if (typeof this.props.onFocus === 'function') {
          this.props.onFocus(this.state.text);
        }
      }

      this.setState({
        isEditing: !this.state.isEditing
      });
    }
  }, {
    key: "_handleChange",
    value: function _handleChange() {
      this.setState({
        text: this.textInput.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.isEditing) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "text",
          className: this.props.inputClassName,
          ref: function ref(input) {
            _this2.textInput = input;
          },
          value: this.state.text,
          onChange: this._handleChange,
          onBlur: this._handleFocus,
          onKeyUp: this.handleEnterPressed,
          style: {
            width: this.props.inputWidth,
            height: this.props.inputHeight,
            fontSize: this.props.inputFontSize,
            fontWeight: this.props.inputFontWeight,
            borderWidth: this.props.inputBorderWidth
          },
          maxLength: this.props.inputMaxLength,
          placeholder: this.props.inputPlaceHolder,
          tabIndex: this.props.inputTabIndex,
          autoFocus: true
        }));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: this.props.labelClassName,
        onClick: this._handleFocus,
        style: {
          fontSize: this.props.labelFontSize,
          fontWeight: this.props.labelFontWeight
        }
      }, this.state.text));
    }
  }]);

  return EditableLabel;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


EditableLabel.propTypes = {
  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  isEditing: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  labelClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  labelFontSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  labelFontWeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inputMaxLength: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  inputPlaceHolder: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inputTabIndex: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  inputWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inputHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inputFontSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inputFontWeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inputClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inputBorderWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onFocusOut: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};

/***/ }),

/***/ "./classroom/static/classroom/js/utils/index.jsx":
/*!*******************************************************!*\
  !*** ./classroom/static/classroom/js/utils/index.jsx ***!
  \*******************************************************/
/*! exports provided: getAxios, checkHttpStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAxios", function() { return getAxios; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkHttpStatus", function() { return checkHttpStatus; });
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

/***/ }),

/***/ "./classroom/static/classroom/js/utils/strings.jsx":
/*!*********************************************************!*\
  !*** ./classroom/static/classroom/js/utils/strings.jsx ***!
  \*********************************************************/
/*! exports provided: endsWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endsWith", function() { return endsWith; });
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/***/ }),

/***/ "./node_modules/clipboard/dist/clipboard.js":
/*!**************************************************!*\
  !*** ./node_modules/clipboard/dist/clipboard.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clipboardAction = __webpack_require__(1);

var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

var _tinyEmitter = __webpack_require__(3);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _goodListener = __webpack_require__(4);

var _goodListener2 = _interopRequireDefault(_goodListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */
var Clipboard = function (_Emitter) {
    _inherits(Clipboard, _Emitter);

    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    function Clipboard(trigger, options) {
        _classCallCheck(this, Clipboard);

        var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

        _this.resolveOptions(options);
        _this.listenClick(trigger);
        return _this;
    }

    /**
     * Defines if attributes would be resolved using internal setter functions
     * or custom functions that were passed in the constructor.
     * @param {Object} options
     */


    _createClass(Clipboard, [{
        key: 'resolveOptions',
        value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            this.container = _typeof(options.container) === 'object' ? options.container : document.body;
        }

        /**
         * Adds a click event listener to the passed trigger.
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         */

    }, {
        key: 'listenClick',
        value: function listenClick(trigger) {
            var _this2 = this;

            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                return _this2.onClick(e);
            });
        }

        /**
         * Defines a new `ClipboardAction` on each click event.
         * @param {Event} e
         */

    }, {
        key: 'onClick',
        value: function onClick(e) {
            var trigger = e.delegateTarget || e.currentTarget;

            if (this.clipboardAction) {
                this.clipboardAction = null;
            }

            this.clipboardAction = new _clipboardAction2.default({
                action: this.action(trigger),
                target: this.target(trigger),
                text: this.text(trigger),
                container: this.container,
                trigger: trigger,
                emitter: this
            });
        }

        /**
         * Default `action` lookup function.
         * @param {Element} trigger
         */

    }, {
        key: 'defaultAction',
        value: function defaultAction(trigger) {
            return getAttributeValue('action', trigger);
        }

        /**
         * Default `target` lookup function.
         * @param {Element} trigger
         */

    }, {
        key: 'defaultTarget',
        value: function defaultTarget(trigger) {
            var selector = getAttributeValue('target', trigger);

            if (selector) {
                return document.querySelector(selector);
            }
        }

        /**
         * Returns the support of the given action, or all actions if no action is
         * given.
         * @param {String} [action]
         */

    }, {
        key: 'defaultText',


        /**
         * Default `text` lookup function.
         * @param {Element} trigger
         */
        value: function defaultText(trigger) {
            return getAttributeValue('text', trigger);
        }

        /**
         * Destroy lifecycle.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.listener.destroy();

            if (this.clipboardAction) {
                this.clipboardAction.destroy();
                this.clipboardAction = null;
            }
        }
    }], [{
        key: 'isSupported',
        value: function isSupported() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

            var actions = typeof action === 'string' ? [action] : action;
            var support = !!document.queryCommandSupported;

            actions.forEach(function (action) {
                support = support && !!document.queryCommandSupported(action);
            });

            return support;
        }
    }]);

    return Clipboard;
}(_tinyEmitter2.default);

/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */


function getAttributeValue(suffix, element) {
    var attribute = 'data-clipboard-' + suffix;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}

module.exports = Clipboard;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _select = __webpack_require__(2);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */
var ClipboardAction = function () {
    /**
     * @param {Object} options
     */
    function ClipboardAction(options) {
        _classCallCheck(this, ClipboardAction);

        this.resolveOptions(options);
        this.initSelection();
    }

    /**
     * Defines base properties passed from constructor.
     * @param {Object} options
     */


    _createClass(ClipboardAction, [{
        key: 'resolveOptions',
        value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.action = options.action;
            this.container = options.container;
            this.emitter = options.emitter;
            this.target = options.target;
            this.text = options.text;
            this.trigger = options.trigger;

            this.selectedText = '';
        }

        /**
         * Decides which selection strategy is going to be applied based
         * on the existence of `text` and `target` properties.
         */

    }, {
        key: 'initSelection',
        value: function initSelection() {
            if (this.text) {
                this.selectFake();
            } else if (this.target) {
                this.selectTarget();
            }
        }

        /**
         * Creates a fake textarea element, sets its value from `text` property,
         * and makes a selection on it.
         */

    }, {
        key: 'selectFake',
        value: function selectFake() {
            var _this = this;

            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

            this.removeFake();

            this.fakeHandlerCallback = function () {
                return _this.removeFake();
            };
            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

            this.fakeElem = document.createElement('textarea');
            // Prevent zooming on iOS
            this.fakeElem.style.fontSize = '12pt';
            // Reset box model
            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0';
            // Move element out of screen horizontally
            this.fakeElem.style.position = 'absolute';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
            // Move element to the same position vertically
            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
            this.fakeElem.style.top = yPosition + 'px';

            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = this.text;

            this.container.appendChild(this.fakeElem);

            this.selectedText = (0, _select2.default)(this.fakeElem);
            this.copyText();
        }

        /**
         * Only removes the fake element after another click event, that way
         * a user can hit `Ctrl+C` to copy because selection still exists.
         */

    }, {
        key: 'removeFake',
        value: function removeFake() {
            if (this.fakeHandler) {
                this.container.removeEventListener('click', this.fakeHandlerCallback);
                this.fakeHandler = null;
                this.fakeHandlerCallback = null;
            }

            if (this.fakeElem) {
                this.container.removeChild(this.fakeElem);
                this.fakeElem = null;
            }
        }

        /**
         * Selects the content from element passed on `target` property.
         */

    }, {
        key: 'selectTarget',
        value: function selectTarget() {
            this.selectedText = (0, _select2.default)(this.target);
            this.copyText();
        }

        /**
         * Executes the copy operation based on the current selection.
         */

    }, {
        key: 'copyText',
        value: function copyText() {
            var succeeded = void 0;

            try {
                succeeded = document.execCommand(this.action);
            } catch (err) {
                succeeded = false;
            }

            this.handleResult(succeeded);
        }

        /**
         * Fires an event based on the copy operation result.
         * @param {Boolean} succeeded
         */

    }, {
        key: 'handleResult',
        value: function handleResult(succeeded) {
            this.emitter.emit(succeeded ? 'success' : 'error', {
                action: this.action,
                text: this.selectedText,
                trigger: this.trigger,
                clearSelection: this.clearSelection.bind(this)
            });
        }

        /**
         * Moves focus away from `target` and back to the trigger, removes current selection.
         */

    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            if (this.trigger) {
                this.trigger.focus();
            }

            window.getSelection().removeAllRanges();
        }

        /**
         * Sets the `action` to be performed which can be either 'copy' or 'cut'.
         * @param {String} action
         */

    }, {
        key: 'destroy',


        /**
         * Destroy lifecycle.
         */
        value: function destroy() {
            this.removeFake();
        }
    }, {
        key: 'action',
        set: function set() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

            this._action = action;

            if (this._action !== 'copy' && this._action !== 'cut') {
                throw new Error('Invalid "action" value, use either "copy" or "cut"');
            }
        }

        /**
         * Gets the `action` property.
         * @return {String}
         */
        ,
        get: function get() {
            return this._action;
        }

        /**
         * Sets the `target` property using an element
         * that will be have its content copied.
         * @param {Element} target
         */

    }, {
        key: 'target',
        set: function set(target) {
            if (target !== undefined) {
                if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                    if (this.action === 'copy' && target.hasAttribute('disabled')) {
                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                    }

                    if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                    }

                    this._target = target;
                } else {
                    throw new Error('Invalid "target" value, use a valid Element');
                }
            }
        }

        /**
         * Gets the `target` property.
         * @return {String|HTMLElement}
         */
        ,
        get: function get() {
            return this._target;
        }
    }]);

    return ClipboardAction;
}();

module.exports = ClipboardAction;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(5);
var delegate = __webpack_require__(6);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(7);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ })
/******/ ]);
});

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addLeadingZeros; });
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : ''
  var output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return sign + output
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/assign/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/assign/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return assign; });
function assign(target, dirtyObject) {
  if (target == null) {
    throw new TypeError(
      'assign requires that input parameter not be null or undefined'
    )
  }

  dirtyObject = dirtyObject || {}

  for (var property in dirtyObject) {
    if (dirtyObject.hasOwnProperty(property)) {
      target[property] = dirtyObject[property]
    }
  }

  return target
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/formatters/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/formatters/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lightFormatters/index.js */ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js");
/* harmony import */ var _lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/getUTCDayOfYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js");
/* harmony import */ var _lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js");
/* harmony import */ var _lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js");
/* harmony import */ var _lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_lib/getUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js");
/* harmony import */ var _lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_lib/getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");








var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

var formatters = {
  // Era
  G: function(date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0
    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, { width: 'abbreviated' })
      // A, B
      case 'GGGGG':
        return localize.era(era, { width: 'narrow' })
      // Anno Domini, Before Christ
      case 'GGGG':
      default:
        return localize.era(era, { width: 'wide' })
    }
  },

  // Year
  y: function(date, token, localize) {
    // Ordinal number
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear()
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var year = signedYear > 0 ? signedYear : 1 - signedYear
      return localize.ordinalNumber(year, { unit: 'year' })
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].y(date, token)
  },

  // Local week-numbering year
  Y: function(date, token, localize, options) {
    var signedWeekYear = Object(_lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(date, options)
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear

    // Two digit year
    if (token === 'YY') {
      var twoDigitYear = weekYear % 100
      return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(twoDigitYear, 2)
    }

    // Ordinal number
    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, { unit: 'year' })
    }

    // Padding
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(weekYear, token.length)
  },

  // ISO week-numbering year
  R: function(date, token) {
    var isoWeekYear = Object(_lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date)

    // Padding
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(isoWeekYear, token.length)
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    var year = date.getUTCFullYear()
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(year, token.length)
  },

  // Quarter
  Q: function(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3)
    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter)
      // 01, 02, 03, 04
      case 'QQ':
        return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(quarter, 2)
      // 1st, 2nd, 3rd, 4th
      case 'Qo':
        return localize.ordinalNumber(quarter, { unit: 'quarter' })
      // Q1, Q2, Q3, Q4
      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        })
      // 1st quarter, 2nd quarter, ...
      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },

  // Stand-alone quarter
  q: function(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3)
    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter)
      // 01, 02, 03, 04
      case 'qq':
        return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(quarter, 2)
      // 1st, 2nd, 3rd, 4th
      case 'qo':
        return localize.ordinalNumber(quarter, { unit: 'quarter' })
      // Q1, Q2, Q3, Q4
      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        })
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        })
      // 1st quarter, 2nd quarter, ...
      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        })
    }
  },

  // Month
  M: function(date, token, localize) {
    var month = date.getUTCMonth()
    switch (token) {
      case 'M':
      case 'MM':
        return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].M(date, token)
      // 1st, 2nd, ..., 12th
      case 'Mo':
        return localize.ordinalNumber(month + 1, { unit: 'month' })
      // Jan, Feb, ..., Dec
      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // J, F, ..., D
      case 'MMMMM':
        return localize.month(month, { width: 'narrow', context: 'formatting' })
      // January, February, ..., December
      case 'MMMM':
      default:
        return localize.month(month, { width: 'wide', context: 'formatting' })
    }
  },

  // Stand-alone month
  L: function(date, token, localize) {
    var month = date.getUTCMonth()
    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1)
      // 01, 02, ..., 12
      case 'LL':
        return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(month + 1, 2)
      // 1st, 2nd, ..., 12th
      case 'Lo':
        return localize.ordinalNumber(month + 1, { unit: 'month' })
      // Jan, Feb, ..., Dec
      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        })
      // J, F, ..., D
      case 'LLLLL':
        return localize.month(month, { width: 'narrow', context: 'standalone' })
      // January, February, ..., December
      case 'LLLL':
      default:
        return localize.month(month, { width: 'wide', context: 'standalone' })
    }
  },

  // Local week of year
  w: function(date, token, localize, options) {
    var week = Object(_lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(date, options)

    if (token === 'wo') {
      return localize.ordinalNumber(week, { unit: 'week' })
    }

    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(week, token.length)
  },

  // ISO week of year
  I: function(date, token, localize) {
    var isoWeek = Object(_lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date)

    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, { unit: 'week' })
    }

    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(isoWeek, token.length)
  },

  // Day of the month
  d: function(date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), { unit: 'date' })
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].d(date, token)
  },

  // Day of year
  D: function(date, token, localize) {
    var dayOfYear = Object(_lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(date)

    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, { unit: 'dayOfYear' })
    }

    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dayOfYear, token.length)
  },

  // Day of week
  E: function(date, token, localize) {
    var dayOfWeek = date.getUTCDay()
    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // T
      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        })
      // Tu
      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        })
      // Tuesday
      case 'EEEE':
      default:
        return localize.day(dayOfWeek, { width: 'wide', context: 'formatting' })
    }
  },

  // Local day of week
  e: function(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay()
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek)
      // Padded numerical value
      case 'ee':
        return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(localDayOfWeek, 2)
      // 1st, 2nd, ..., 7th
      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, { unit: 'day' })
      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // T
      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        })
      // Tu
      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        })
      // Tuesday
      case 'eeee':
      default:
        return localize.day(dayOfWeek, { width: 'wide', context: 'formatting' })
    }
  },

  // Stand-alone local day of week
  c: function(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay()
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7
    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek)
      // Padded numerical value
      case 'cc':
        return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(localDayOfWeek, token.length)
      // 1st, 2nd, ..., 7th
      case 'co':
        return localize.ordinalNumber(localDayOfWeek, { unit: 'day' })
      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        })
      // T
      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        })
      // Tu
      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        })
      // Tuesday
      case 'cccc':
      default:
        return localize.day(dayOfWeek, { width: 'wide', context: 'standalone' })
    }
  },

  // ISO day of week
  i: function(date, token, localize) {
    var dayOfWeek = date.getUTCDay()
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek
    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek)
      // 02
      case 'ii':
        return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(isoDayOfWeek, token.length)
      // 2nd
      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, { unit: 'day' })
      // Tue
      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        })
      // T
      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        })
      // Tu
      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        })
      // Tuesday
      case 'iiii':
      default:
        return localize.day(dayOfWeek, { width: 'wide', context: 'formatting' })
    }
  },

  // AM or PM
  a: function(date, token, localize) {
    var hours = date.getUTCHours()
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am'

    switch (token) {
      case 'a':
      case 'aa':
      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        })
      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },

  // AM, PM, midnight, noon
  b: function(date, token, localize) {
    var hours = date.getUTCHours()
    var dayPeriodEnumValue
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am'
    }

    switch (token) {
      case 'b':
      case 'bb':
      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        })
      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize) {
    var hours = date.getUTCHours()
    var dayPeriodEnumValue
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night
    }

    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        })
      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        })
      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        })
    }
  },

  // Hour [1-12]
  h: function(date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12
      if (hours === 0) hours = 12
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].h(date, token)
  },

  // Hour [0-23]
  H: function(date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), { unit: 'hour' })
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].H(date, token)
  },

  // Hour [0-11]
  K: function(date, token, localize) {
    var hours = date.getUTCHours() % 12

    if (token === 'Ko') {
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }

    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(hours, token.length)
  },

  // Hour [1-24]
  k: function(date, token, localize) {
    var hours = date.getUTCHours()
    if (hours === 0) hours = 24

    if (token === 'ko') {
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }

    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(hours, token.length)
  },

  // Minute
  m: function(date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), { unit: 'minute' })
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].m(date, token)
  },

  // Second
  s: function(date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), { unit: 'second' })
    }

    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].s(date, token)
  },

  // Fraction of second
  S: function(date, token) {
    var numberOfDigits = token.length
    var milliseconds = date.getUTCMilliseconds()
    var fractionalSeconds = Math.floor(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    )
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(fractionalSeconds, numberOfDigits)
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize, options) {
    var originalDate = options._originalDate || date
    var timezoneOffset = originalDate.getTimezoneOffset()

    if (timezoneOffset === 0) {
      return 'Z'
    }

    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset)

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX': // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset)

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize, options) {
    var originalDate = options._originalDate || date
    var timezoneOffset = originalDate.getTimezoneOffset()

    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset)

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx': // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset)

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (GMT)
  O: function(date, token, _localize, options) {
    var originalDate = options._originalDate || date
    var timezoneOffset = originalDate.getTimezoneOffset()

    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':')
      // Long
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (specific non-location)
  z: function(date, token, _localize, options) {
    var originalDate = options._originalDate || date
    var timezoneOffset = originalDate.getTimezoneOffset()

    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':')
      // Long
      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':')
    }
  },

  // Seconds timestamp
  t: function(date, token, _localize, options) {
    var originalDate = options._originalDate || date
    var timestamp = Math.floor(originalDate.getTime() / 1000)
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(timestamp, token.length)
  },

  // Milliseconds timestamp
  T: function(date, token, _localize, options) {
    var originalDate = options._originalDate || date
    var timestamp = originalDate.getTime()
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(timestamp, token.length)
  }
}

function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? '-' : '+'
  var absOffset = Math.abs(offset)
  var hours = Math.floor(absOffset / 60)
  var minutes = absOffset % 60
  if (minutes === 0) {
    return sign + String(hours)
  }
  var delimiter = dirtyDelimiter || ''
  return sign + String(hours) + delimiter + Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(minutes, 2)
}

function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+'
    return sign + Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(Math.abs(offset) / 60, 2)
  }
  return formatTimezone(offset, dirtyDelimiter)
}

function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || ''
  var sign = offset > 0 ? '-' : '+'
  var absOffset = Math.abs(offset)
  var hours = Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(Math.floor(absOffset / 60), 2)
  var minutes = Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(absOffset % 60, 2)
  return sign + hours + delimiter + minutes
}

/* harmony default export */ __webpack_exports__["default"] = (formatters);


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");


/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

var formatters = {
  // Year
  y: function(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    var signedYear = date.getUTCFullYear()
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    var year = signedYear > 0 ? signedYear : 1 - signedYear
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(token === 'yy' ? year % 100 : year, token.length)
  },

  // Month
  M: function(date, token) {
    var month = date.getUTCMonth()
    return token === 'M' ? String(month + 1) : Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(month + 1, 2)
  },

  // Day of the month
  d: function(date, token) {
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCDate(), token.length)
  },

  // AM or PM
  a: function(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am'

    switch (token) {
      case 'a':
      case 'aa':
      case 'aaa':
        return dayPeriodEnumValue.toUpperCase()
      case 'aaaaa':
        return dayPeriodEnumValue[0]
      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.'
    }
  },

  // Hour [1-12]
  h: function(date, token) {
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCHours() % 12 || 12, token.length)
  },

  // Hour [0-23]
  H: function(date, token) {
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCHours(), token.length)
  },

  // Minute
  m: function(date, token) {
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCMinutes(), token.length)
  },

  // Second
  s: function(date, token) {
    return Object(_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCSeconds(), token.length)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (formatters);


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/longFormatters/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({ width: 'short' })
    case 'PP':
      return formatLong.date({ width: 'medium' })
    case 'PPP':
      return formatLong.date({ width: 'long' })
    case 'PPPP':
    default:
      return formatLong.date({ width: 'full' })
  }
}

function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({ width: 'short' })
    case 'pp':
      return formatLong.time({ width: 'medium' })
    case 'ppp':
      return formatLong.time({ width: 'long' })
    case 'pppp':
    default:
      return formatLong.time({ width: 'full' })
  }
}

function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/)
  var datePattern = matchResult[1]
  var timePattern = matchResult[2]

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong)
  }

  var dateTimeFormat

  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({ width: 'short' })
      break
    case 'PP':
      dateTimeFormat = formatLong.dateTime({ width: 'medium' })
      break
    case 'PPP':
      dateTimeFormat = formatLong.dateTime({ width: 'long' })
      break
    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({ width: 'full' })
      break
  }

  return dateTimeFormat
    .replace('{{date}}', dateLongFormatter(datePattern, formatLong))
    .replace('{{time}}', timeLongFormatter(timePattern, formatLong))
}

var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
}

/* harmony default export */ __webpack_exports__["default"] = (longFormatters);


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getTimezoneOffsetInMilliseconds; });
var MILLISECONDS_IN_MINUTE = 60000

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds (dirtyDate) {
  var date = new Date(dirtyDate.getTime())
  var baseTimezoneOffset = date.getTimezoneOffset()
  date.setSeconds(0, 0)
  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE

  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getUTCDayOfYear; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


var MILLISECONDS_IN_DAY = 86400000

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCDayOfYear(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var timestamp = date.getTime()
  date.setUTCMonth(0, 1)
  date.setUTCHours(0, 0, 0, 0)
  var startOfYearTimestamp = date.getTime()
  var difference = timestamp - startOfYearTimestamp
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getUTCISOWeek; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");
/* harmony import */ var _startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js");




var MILLISECONDS_IN_WEEK = 604800000

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeek(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var diff =
    Object(_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(date).getTime() - Object(_startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date).getTime()

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getUTCISOWeekYear; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");



// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeekYear(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var year = date.getUTCFullYear()

  var fourthOfJanuaryOfNextYear = new Date(0)
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4)
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0)
  var startOfNextYear = Object(_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fourthOfJanuaryOfNextYear)

  var fourthOfJanuaryOfThisYear = new Date(0)
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4)
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0)
  var startOfThisYear = Object(_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fourthOfJanuaryOfThisYear)

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeek/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getUTCWeek; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js");




var MILLISECONDS_IN_WEEK = 604800000

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCWeek(dirtyDate, options) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var diff =
    Object(_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(date, options).getTime() -
    Object(_startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date, options).getTime()

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getUTCWeekYear; });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");




// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCWeekYear (dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, dirtyOptions)
  var year = date.getUTCFullYear()

  var options = dirtyOptions || {}
  var locale = options.locale
  var localeFirstWeekContainsDate = locale &&
    locale.options &&
    locale.options.firstWeekContainsDate
  var defaultFirstWeekContainsDate =
    localeFirstWeekContainsDate == null
      ? 1
      : Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeFirstWeekContainsDate)
  var firstWeekContainsDate =
    options.firstWeekContainsDate == null
      ? defaultFirstWeekContainsDate
      : Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.firstWeekContainsDate)

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively')
  }

  var firstWeekOfNextYear = new Date(0)
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate)
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0)
  var startOfNextYear = Object(_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(firstWeekOfNextYear, dirtyOptions)

  var firstWeekOfThisYear = new Date(0)
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate)
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0)
  var startOfThisYear = Object(_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(firstWeekOfThisYear, dirtyOptions)

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/protectedTokens/index.js ***!
  \*****************************************************************/
/*! exports provided: protectedTokens, isProtectedToken, throwProtectedError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "protectedTokens", function() { return protectedTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProtectedToken", function() { return isProtectedToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwProtectedError", function() { return throwProtectedError; });
var protectedTokens = ['D', 'DD', 'YY', 'YYYY']

function isProtectedToken(token) {
  return protectedTokens.indexOf(token) !== -1
}

function throwProtectedError(token) {
  throw new RangeError(
    '`options.awareOfUnicodeTokens` must be set to `true` to use `' +
      token +
      '` token; see: https://git.io/fxCyr'
  )
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/setUTCDay/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/setUTCDay/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setUTCDay; });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var options = dirtyOptions || {}
  var locale = options.locale
  var localeWeekStartsOn =
    locale && locale.options && locale.options.weekStartsOn
  var defaultWeekStartsOn =
    localeWeekStartsOn == null ? 0 : Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeWeekStartsOn)
  var weekStartsOn =
    options.weekStartsOn == null
      ? defaultWeekStartsOn
      : Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.weekStartsOn)

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var day = Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDay)

  var currentDay = date.getUTCDay()

  var remainder = day % 7
  var dayIndex = (remainder + 7) % 7

  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay

  date.setUTCDate(date.getUTCDate() + diff)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/setUTCISODay/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/setUTCISODay/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setUTCISODay; });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISODay(dirtyDate, dirtyDay) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var day = Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDay)

  if (day % 7 === 0) {
    day = day - 7
  }

  var weekStartsOn = 1
  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var currentDay = date.getUTCDay()

  var remainder = day % 7
  var dayIndex = (remainder + 7) % 7

  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay

  date.setUTCDate(date.getUTCDate() + diff)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/setUTCISOWeek/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/setUTCISOWeek/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setUTCISOWeek; });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js");




// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var isoWeek = Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyISOWeek)
  var diff = Object(_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date) - isoWeek
  date.setUTCDate(date.getUTCDate() - diff * 7)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/setUTCWeek/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/setUTCWeek/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setUTCWeek; });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js");




// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var week = Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyWeek)
  var diff = Object(_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date, options) - week
  date.setUTCDate(date.getUTCDate() - diff * 7)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startOfUTCISOWeek; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeek(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var weekStartsOn = 1

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var day = date.getUTCDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setUTCDate(date.getUTCDate() - diff)
  date.setUTCHours(0, 0, 0, 0)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startOfUTCISOWeekYear; });
/* harmony import */ var _getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../getUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");



// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeekYear(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var year = Object(_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var fourthOfJanuary = new Date(0)
  fourthOfJanuary.setUTCFullYear(year, 0, 4)
  fourthOfJanuary.setUTCHours(0, 0, 0, 0)
  var date = Object(_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fourthOfJanuary)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startOfUTCWeek; });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCWeek(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var options = dirtyOptions || {}
  var locale = options.locale
  var localeWeekStartsOn =
    locale && locale.options && locale.options.weekStartsOn
  var defaultWeekStartsOn =
    localeWeekStartsOn == null ? 0 : Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeWeekStartsOn)
  var weekStartsOn =
    options.weekStartsOn == null
      ? defaultWeekStartsOn
      : Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.weekStartsOn)

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var day = date.getUTCDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setUTCDate(date.getUTCDate() - diff)
  date.setUTCHours(0, 0, 0, 0)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startOfUTCWeekYear; });
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");




// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCWeekYear (dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
  }

  var options = dirtyOptions || {}
  var locale = options.locale
  var localeFirstWeekContainsDate = locale &&
    locale.options &&
    locale.options.firstWeekContainsDate
  var defaultFirstWeekContainsDate =
    localeFirstWeekContainsDate == null
      ? 1
      : Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeFirstWeekContainsDate)
  var firstWeekContainsDate =
    options.firstWeekContainsDate == null
      ? defaultFirstWeekContainsDate
      : Object(_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.firstWeekContainsDate)

  var year = Object(_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, dirtyOptions)
  var firstWeek = new Date(0)
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate)
  firstWeek.setUTCHours(0, 0, 0, 0)
  var date = Object(_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(firstWeek, dirtyOptions)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toInteger; });
function toInteger (dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN
  }

  var number = Number(dirtyNumber)

  if (isNaN(number)) {
    return number
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/addDays/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/addDays/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addDays; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  date.setDate(date.getDate() + amount)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/addHours/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/addHours/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addHours; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addMilliseconds/index.js */ "./node_modules/date-fns/esm/addMilliseconds/index.js");



var MILLISECONDS_IN_HOUR = 3600000

/**
 * @name addHours
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be added
 * @returns {Date} the new date with the hours added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * var result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
function addHours(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, amount * MILLISECONDS_IN_HOUR)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/addMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/addMilliseconds/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addMilliseconds; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var timestamp = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate).getTime()
  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return new Date(timestamp + amount)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/addMinutes/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/addMinutes/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addMinutes; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addMilliseconds/index.js */ "./node_modules/date-fns/esm/addMilliseconds/index.js");



var MILLISECONDS_IN_MINUTE = 60000

/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added
 * @returns {Date} the new date with the minutes added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, amount * MILLISECONDS_IN_MINUTE)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/addMonths/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/addMonths/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addMonths; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _getDaysInMonth_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getDaysInMonth/index.js */ "./node_modules/date-fns/esm/getDaysInMonth/index.js");




/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  var desiredMonth = date.getMonth() + amount
  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = Object(_getDaysInMonth_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()))
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/addWeeks/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/addWeeks/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addWeeks; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addDays_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addDays/index.js */ "./node_modules/date-fns/esm/addDays/index.js");



/**
 * @name addWeeks
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added
 * @returns {Date} the new date with the weeks added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * var result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  var days = amount * 7
  return Object(_addDays_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, days)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/addYears/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/addYears/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addYears; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addMonths_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addMonths/index.js */ "./node_modules/date-fns/esm/addMonths/index.js");



/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @returns {Date} the new date with the years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addMonths_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, amount * 12)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/differenceInCalendarDays/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/differenceInCalendarDays/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return differenceInCalendarDays; });
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");



var MILLISECONDS_IN_DAY = 86400000

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * var result = differenceInCalendarDays(
 *   new Date(2011, 6, 2, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(
  dirtyDateLeft,
  dirtyDateRight
) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var startOfDayLeft = Object(_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft)
  var startOfDayRight = Object(_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight)

  var timestampLeft =
    startOfDayLeft.getTime() - Object(_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(startOfDayLeft)
  var timestampRight =
    startOfDayRight.getTime() - Object(_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(startOfDayRight)

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/differenceInCalendarMonths/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/differenceInCalendarMonths/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return differenceInCalendarMonths; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(
  dirtyDateLeft,
  dirtyDateRight
) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var dateLeft = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateLeft)
  var dateRight = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateRight)

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth()

  return yearDiff * 12 + monthDiff
}


/***/ }),

/***/ "./node_modules/date-fns/esm/differenceInCalendarWeeks/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/esm/differenceInCalendarWeeks/index.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return differenceInCalendarWeeks; });
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");



var MILLISECONDS_IN_WEEK = 604800000

/**
 * @name differenceInCalendarWeeks
 * @category Week Helpers
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {Number} the number of calendar weeks
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */
function differenceInCalendarWeeks(
  dirtyDateLeft,
  dirtyDateRight,
  dirtyOptions
) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var startOfWeekLeft = Object(_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft, dirtyOptions)
  var startOfWeekRight = Object(_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight, dirtyOptions)

  var timestampLeft =
    startOfWeekLeft.getTime() - Object(_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(startOfWeekLeft)
  var timestampRight =
    startOfWeekRight.getTime() -
    Object(_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(startOfWeekRight)

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/endOfMonth/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/endOfMonth/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return endOfMonth; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var month = date.getMonth()
  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(23, 59, 59, 999)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/endOfWeek/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/endOfWeek/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return endOfWeek; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {Date} the end of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var options = dirtyOptions || {}

  var locale = options.locale
  var localeWeekStartsOn =
    locale && locale.options && locale.options.weekStartsOn
  var defaultWeekStartsOn =
    localeWeekStartsOn == null ? 0 : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeWeekStartsOn)
  var weekStartsOn =
    options.weekStartsOn == null
      ? defaultWeekStartsOn
      : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.weekStartsOn)

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn)

  date.setDate(date.getDate() + diff)
  date.setHours(23, 59, 59, 999)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/format/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/format/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return format; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _isValid_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../isValid/index.js */ "./node_modules/date-fns/esm/isValid/index.js");
/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../locale/en-US/index.js */ "./node_modules/date-fns/esm/locale/en-US/index.js");
/* harmony import */ var _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_lib/format/formatters/index.js */ "./node_modules/date-fns/esm/_lib/format/formatters/index.js");
/* harmony import */ var _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_lib/format/longFormatters/index.js */ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js");
/* harmony import */ var _subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../subMilliseconds/index.js */ "./node_modules/date-fns/esm/subMilliseconds/index.js");
/* harmony import */ var _lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_lib/protectedTokens/index.js */ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js");










// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g

var escapedStringRegExp = /^'(.*?)'?$/
var doubleQuoteRegExp = /''/g

/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 8     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 8     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Su            | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | AM, PM                          | a..aaa  | AM, PM                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 1, 2, ..., 11, 0                  |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 0001, ..., 999               |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 05/29/1453                        | 7     |
 * |                                 | PP      | May 29, 1453                      | 7     |
 * |                                 | PPP     | May 29th, 1453                    | 7     |
 * |                                 | PPPP    | Sunday, May 29th, 1453            | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 05/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | May 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | May 29th, 1453 at ...             | 7     |
 * |                                 | PPPPpppp| Sunday, May 29th, 1453 at ...     | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. These tokens are often confused with others. See: https://git.io/fxCyr
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The second argument is now required for the sake of explicitness.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   format(new Date(2016, 0, 1))
 *
 *   // v2.0.0 onward
 *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
 *   ```
 *
 * - New format string API for `format` function
 *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
 *
 * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {Boolean} [options.awareOfUnicodeTokens=false] - if true, allows usage of Unicode tokens causes confusion:
 *   - Some of the day of year tokens (`D`, `DD`) that are confused with the day of month tokens (`d`, `dd`).
 *   - Some of the local week-numbering year tokens (`YY`, `YYYY`) that are confused with the calendar year tokens (`yy`, `yyyy`).
 *   See: https://git.io/fxCyr
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} `options.awareOfUnicodeTokens` must be set to `true` to use `XX` token; see: https://git.io/fxCyr
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var formatStr = String(dirtyFormatStr)
  var options = dirtyOptions || {}

  var locale = options.locale || _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]

  var localeFirstWeekContainsDate =
    locale.options && locale.options.firstWeekContainsDate
  var defaultFirstWeekContainsDate =
    localeFirstWeekContainsDate == null
      ? 1
      : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeFirstWeekContainsDate)
  var firstWeekContainsDate =
    options.firstWeekContainsDate == null
      ? defaultFirstWeekContainsDate
      : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.firstWeekContainsDate)

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError(
      'firstWeekContainsDate must be between 1 and 7 inclusively'
    )
  }

  var localeWeekStartsOn = locale.options && locale.options.weekStartsOn
  var defaultWeekStartsOn =
    localeWeekStartsOn == null ? 0 : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeWeekStartsOn)
  var weekStartsOn =
    options.weekStartsOn == null
      ? defaultWeekStartsOn
      : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.weekStartsOn)

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  if (!locale.localize) {
    throw new RangeError('locale must contain localize property')
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property')
  }

  var originalDate = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate)

  if (!Object(_isValid_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(originalDate)) {
    throw new RangeError('Invalid time value')
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
  var timezoneOffset = Object(_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(originalDate)
  var utcDate = Object(_subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__["default"])(originalDate, timezoneOffset)

  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale,
    _originalDate: originalDate
  }

  var result = formatStr
    .match(longFormattingTokensRegExp)
    .map(function(substring) {
      var firstCharacter = substring[0]
      if (firstCharacter === 'p' || firstCharacter === 'P') {
        var longFormatter = _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_6__["default"][firstCharacter]
        return longFormatter(substring, locale.formatLong, formatterOptions)
      }
      return substring
    })
    .join('')
    .match(formattingTokensRegExp)
    .map(function(substring) {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return "'"
      }

      var firstCharacter = substring[0]
      if (firstCharacter === "'") {
        return cleanEscapedString(substring)
      }

      var formatter = _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_5__["default"][firstCharacter]
      if (formatter) {
        if (!options.awareOfUnicodeTokens && Object(_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_8__["isProtectedToken"])(substring)) {
          Object(_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_8__["throwProtectedError"])(substring)
        }
        return formatter(utcDate, substring, locale.localize, formatterOptions)
      }

      return substring
    })
    .join('')

  return result
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'")
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getDate/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/getDate/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDate; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getDate
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * var result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var dayOfMonth = date.getDate()
  return dayOfMonth
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getDay/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/getDay/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDay; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * var result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var day = date.getDay()
  return day
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getDaysInMonth/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/getDaysInMonth/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDaysInMonth; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of days in a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var year = date.getFullYear()
  var monthIndex = date.getMonth()
  var lastDayOfMonth = new Date(0)
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0)
  lastDayOfMonth.setHours(0, 0, 0, 0)
  return lastDayOfMonth.getDate()
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getHours/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/getHours/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getHours; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getHours
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the hours
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * var result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var hours = date.getHours()
  return hours
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getMinutes/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/getMinutes/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMinutes; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getMinutes
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the minutes
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * var result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var minutes = date.getMinutes()
  return minutes
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getMonth/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/getMonth/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMonth; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getMonth
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which month is 29 February 2012?
 * var result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var month = date.getMonth()
  return month
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getSeconds/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/getSeconds/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getSeconds; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getSeconds
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the seconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * var result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var seconds = date.getSeconds()
  return seconds
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getTime/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/getTime/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getTime; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getTime
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the timestamp
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * var result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
function getTime(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var timestamp = date.getTime()
  return timestamp
}


/***/ }),

/***/ "./node_modules/date-fns/esm/getYear/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/getYear/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getYear; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name getYear
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which year is 2 July 2014?
 * var result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var year = date.getFullYear()
  return year
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isAfter/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isAfter/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isAfter; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be after the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter(dirtyDate, dirtyDateToCompare) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var dateToCompare = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateToCompare)
  return date.getTime() > dateToCompare.getTime()
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isBefore/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/isBefore/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isBefore; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be before the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(dirtyDate, dirtyDateToCompare) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var dateToCompare = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateToCompare)
  return date.getTime() < dateToCompare.getTime()
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/isDate/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isDate; });
/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {*} value - the value to check
 * @returns {boolean} true if the given value is a date
 * @throws {TypeError} 1 arguments required
 *
 * @example
 * // For a valid date:
 * var result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * var result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * var result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * var result = isDate({})
 * //=> false
 */
function isDate(value) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  return (
    value instanceof Date ||
    (typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Date]')
  )
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isEqual/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isEqual/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isEqual; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Boolean} the dates are equal
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * var result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual(dirtyLeftDate, dirtyRightDate) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var dateLeft = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyLeftDate)
  var dateRight = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyRightDate)
  return dateLeft.getTime() === dateRight.getTime()
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isSameDay/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameDay/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isSameDay; });
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 */
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var dateLeftStartOfDay = Object(_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateLeft)
  var dateRightStartOfDay = Object(_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateRight)

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isSameMonth/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameMonth/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isSameMonth; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameMonth(dirtyDateLeft, dirtyDateRight) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var dateLeft = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateLeft)
  var dateRight = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateRight)
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
  )
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isSameWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameWeek/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isSameWeek; });
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");


/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week?
 *
 * @description
 * Are the given dates in the same week?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {Boolean} the dates are in the same week
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 */
function isSameWeek(
  dirtyDateLeft,
  dirtyDateRight,
  dirtyOptions
) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var dateLeftStartOfWeek = Object(_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateLeft, dirtyOptions)
  var dateRightStartOfWeek = Object(_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateRight, dirtyOptions)

  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime()
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isSameYear/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameYear/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isSameYear; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameYear(dirtyDateLeft, dirtyDateRight) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var dateLeft = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateLeft)
  var dateRight = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear()
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isValid/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isValid/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValid; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Now `isValid` doesn't throw an exception
 *   if the first argument is not an instance of Date.
 *   Instead, argument is converted beforehand using `toDate`.
 *
 *   Examples:
 *
 *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
 *   |---------------------------|---------------|---------------|
 *   | `new Date()`              | `true`        | `true`        |
 *   | `new Date('2016-01-01')`  | `true`        | `true`        |
 *   | `new Date('')`            | `false`       | `false`       |
 *   | `new Date(1488370835081)` | `true`        | `true`        |
 *   | `new Date(NaN)`           | `false`       | `false`       |
 *   | `'2016-01-01'`            | `TypeError`   | `true`        |
 *   | `''`                      | `TypeError`   | `false`       |
 *   | `1488370835081`           | `TypeError`   | `true`        |
 *   | `NaN`                     | `TypeError`   | `false`       |
 *
 *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
 *   that try to coerce arguments to the expected type
 *   (which is also the case with other *date-fns* functions).
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * var result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  return !isNaN(date)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/isWithinInterval/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/esm/isWithinInterval/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isWithinInterval; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `isWithinRange` to `isWithinInterval`.
 *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
 *
 *   ```
 *   2.1.3
 *   time interval
 *   part of the time axis limited by two instants
 *   ```
 *
 *   Also, this function now accepts an object with `start` and `end` properties
 *   instead of two arguments as an interval.
 *   This function now throws `RangeError` if the start of the interval is after its end
 *   or if any date in the interval is `Invalid Date`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   isWithinRange(
 *     new Date(2014, 0, 3),
 *     new Date(2014, 0, 1), new Date(2014, 0, 7)
 *   )
 *
 *   // v2.0.0 onward
 *
 *   isWithinInterval(
 *     new Date(2014, 0, 3),
 *     { start: new Date(2014, 0, 1), end: new Date(2014, 0, 7) }
 *   )
 *   ```
 *
 * @param {Date|Number} date - the date to check
 * @param {Interval} interval - the interval to check
 * @returns {Boolean} the date is within the interval
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 */
function isWithinInterval(dirtyDate, dirtyInterval) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var interval = dirtyInterval || {}
  var time = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate).getTime()
  var startTime = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(interval.start).getTime()
  var endTime = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(interval.end).getTime()

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval')
  }

  return time >= startTime && time <= endTime
}


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return buildFormatLongFn; });
function buildFormatLongFn (args) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {}
    var width = options.width ? String(options.width) : args.defaultWidth
    var format = args.formats[width] || args.formats[args.defaultWidth]
    return format
  }
}


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return buildLocalizeFn; });
function buildLocalizeFn (args) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {}
    var width = options.width ? String(options.width) : args.defaultWidth
    var context = options.context ? String(options.context) : 'standalone'

    var valuesArray
    if (context === 'formatting' && args.formattingValues) {
      valuesArray = args.formattingValues[width] || args.formattingValues[args.defaultFormattingWidth]
    } else {
      valuesArray = args.values[width] || args.values[args.defaultWidth]
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex
    return valuesArray[index]
  }
}


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return buildMatchFn; });
function buildMatchFn (args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString)
    var options = dirtyOptions || {}
    var width = options.width

    var matchPattern = (width && args.matchPatterns[width]) || args.matchPatterns[args.defaultMatchWidth]
    var matchResult = string.match(matchPattern)

    if (!matchResult) {
      return null
    }
    var matchedString = matchResult[0]

    var parsePatterns = (width && args.parsePatterns[width]) || args.parsePatterns[args.defaultParseWidth]

    var value
    if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
      value = parsePatterns.findIndex(function (pattern) {
        return pattern.test(string)
      })
    } else {
      value = findKey(parsePatterns, function (pattern) {
        return pattern.test(string)
      })
    }

    value = args.valueCallback ? args.valueCallback(value) : value
    value = options.valueCallback ? options.valueCallback(value) : value

    return {
      value: value,
      rest: string.slice(matchedString.length)
    }
  }
}

function findKey (object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key
    }
  }
}


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return buildMatchPatternFn; });
function buildMatchPatternFn (args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString)
    var options = dirtyOptions || {}

    var matchResult = string.match(args.matchPattern)
    if (!matchResult) {
      return null
    }
    var matchedString = matchResult[0]

    var parseResult = string.match(args.parsePattern)
    if (!parseResult) {
      return null
    }
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0]
    value = options.valueCallback ? options.valueCallback(value) : value

    return {
      value: value,
      rest: string.slice(matchedString.length)
    }
  }
}


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatDistance; });
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },

  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },

  halfAMinute: 'half a minute',

  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },

  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },

  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },

  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },

  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },

  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },

  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
}

function formatDistance (token, count, options) {
  options = options || {}

  var result
  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token]
  } else if (count === 1) {
    result = formatDistanceLocale[token].one
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count)
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      return result + ' ago'
    }
  }

  return result
}


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildFormatLongFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js");


var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
}

var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
}

var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
}

var formatLong = {
  date: Object(_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateFormats,
    defaultWidth: 'full'
  }),

  time: Object(_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: timeFormats,
    defaultWidth: 'full'
  }),

  dateTime: Object(_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
}

/* harmony default export */ __webpack_exports__["default"] = (formatLong);


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatRelative; });
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
}

function formatRelative (token, date, baseDate, options) {
  return formatRelativeLocale[token]
}


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildLocalizeFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js");


var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
}

var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
}

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
}
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
}

function ordinalNumber (dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber)

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var rem100 = number % 100
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

var localize = {
  ordinalNumber: ordinalNumber,

  era: Object(_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: eraValues,
    defaultWidth: 'wide'
  }),

  quarter: Object(_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1
    }
  }),

  month: Object(_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: monthValues,
    defaultWidth: 'wide'
  }),

  day: Object(_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayValues,
    defaultWidth: 'wide'
  }),

  dayPeriod: Object(_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
}

/* harmony default export */ __webpack_exports__["default"] = (localize);


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildMatchPatternFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js");
/* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/buildMatchFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js");



var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i
var parseOrdinalNumberPattern = /\d+/i

var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
}

var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
}

var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}

var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}

var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}

var match = {
  ordinalNumber: Object(_lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10)
    }
  }),

  era: Object(_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),

  quarter: Object(_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1
    }
  }),

  month: Object(_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),

  day: Object(_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),

  dayPeriod: Object(_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
}

/* harmony default export */ __webpack_exports__["default"] = (match);


/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/formatDistance/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js");
/* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/formatLong/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js");
/* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/formatRelative/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js");
/* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/localize/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js");
/* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_lib/match/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js");






/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  formatDistance: _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  formatLong: _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  formatRelative: _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  localize: _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1
  }
}

/* harmony default export */ __webpack_exports__["default"] = (locale);


/***/ }),

/***/ "./node_modules/date-fns/esm/max/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/esm/max/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return max; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - `max` function now accepts an array of dates rather than spread arguments.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   var date1 = new Date(1989, 6, 10)
 *   var date2 = new Date(1987, 1, 11)
 *   var maxDate = max(date1, date2)
 *
 *   // v2.0.0 onward:
 *   var dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
 *   var maxDate = max(dates)
 *   ```
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} the latest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the latest?
 * var result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
function max(dirtyDatesArray) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var datesArray
  // `dirtyDatesArray` is undefined or null
  if (dirtyDatesArray == null) {
    datesArray = []

    // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  } else if (typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray

    // If `dirtyDatesArray` is Array-like Object, convert to Array. Otherwise, make it empty Array
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray)
  }

  var result
  datesArray.forEach(function(dirtyDate) {
    var currentDate = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)

    if (result === undefined || result < currentDate || isNaN(currentDate)) {
      result = currentDate
    }
  })

  return result
}


/***/ }),

/***/ "./node_modules/date-fns/esm/min/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/esm/min/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return min; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name min
 * @category Common Helpers
 * @summary Return the earliest of the given dates.
 *
 * @description
 * Return the earliest of the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - `min` function now accepts an array of dates rather than spread arguments.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   var date1 = new Date(1989, 6, 10)
 *   var date2 = new Date(1987, 1, 11)
 *   var minDate = min(date1, date2)
 *
 *   // v2.0.0 onward:
 *   var dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
 *   var minDate = min(dates)
 *   ```
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} the earliest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the earliest?
 * var result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
function min(dirtyDatesArray) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var datesArray
  // `dirtyDatesArray` is undefined or null
  if (dirtyDatesArray == null) {
    datesArray = []

    // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  } else if (typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray

    // If `dirtyDatesArray` is Array-like Object, convert to Array. Otherwise, make it empty Array
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray)
  }

  var result
  datesArray.forEach(function(dirtyDate) {
    var currentDate = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)

    if (result === undefined || result > currentDate || isNaN(currentDate)) {
      result = currentDate
    }
  })

  return result
}


/***/ }),

/***/ "./node_modules/date-fns/esm/parse/_lib/parsers/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/parse/_lib/parsers/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _lib_setUTCDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/setUTCDay/index.js */ "./node_modules/date-fns/esm/_lib/setUTCDay/index.js");
/* harmony import */ var _lib_setUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_lib/setUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/setUTCWeek/index.js");
/* harmony import */ var _lib_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_lib/startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _lib_setUTCISODay_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_lib/setUTCISODay/index.js */ "./node_modules/date-fns/esm/_lib/setUTCISODay/index.js");
/* harmony import */ var _lib_setUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_lib/setUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/setUTCISOWeek/index.js");
/* harmony import */ var _lib_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_lib/startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");








var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_SECOND = 1000

var numericPatterns = {
  month: /^(1[0-2]|0?\d)/, // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
  minute: /^[0-5]?\d/, // 0 to 59
  second: /^[0-5]?\d/, // 0 to 59

  singleDigit: /^\d/, // 0 to 9
  twoDigits: /^\d{1,2}/, // 0 to 99
  threeDigits: /^\d{1,3}/, // 0 to 999
  fourDigits: /^\d{1,4}/, // 0 to 9999

  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/ // 0 to 9999, -0 to -9999
}

var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
}

function parseNumericPattern(pattern, string, valueCallback) {
  var matchResult = string.match(pattern)

  if (!matchResult) {
    return null
  }

  var value = parseInt(matchResult[0], 10)

  return {
    value: valueCallback ? valueCallback(value) : value,
    rest: string.slice(matchResult[0].length)
  }
}

function parseTimezonePattern(pattern, string) {
  var matchResult = string.match(pattern)

  if (!matchResult) {
    return null
  }

  // Input is 'Z'
  if (matchResult[0] === 'Z') {
    return {
      value: 0,
      rest: string.slice(1)
    }
  }

  var sign = matchResult[1] === '+' ? 1 : -1
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0

  return {
    value:
      sign *
      (hours * MILLISECONDS_IN_HOUR +
        minutes * MILLISECONDS_IN_MINUTE +
        seconds * MILLISECONDS_IN_SECOND),
    rest: string.slice(matchResult[0].length)
  }
}

function parseAnyDigitsSigned(string, valueCallback) {
  return parseNumericPattern(
    numericPatterns.anyDigitsSigned,
    string,
    valueCallback
  )
}

function parseNDigits(n, string, valueCallback) {
  switch (n) {
    case 1:
      return parseNumericPattern(
        numericPatterns.singleDigit,
        string,
        valueCallback
      )
    case 2:
      return parseNumericPattern(
        numericPatterns.twoDigits,
        string,
        valueCallback
      )
    case 3:
      return parseNumericPattern(
        numericPatterns.threeDigits,
        string,
        valueCallback
      )
    case 4:
      return parseNumericPattern(
        numericPatterns.fourDigits,
        string,
        valueCallback
      )
    default:
      return parseNumericPattern(
        new RegExp('^\\d{1,' + n + '}'),
        string,
        valueCallback
      )
  }
}

function parseNDigitsSigned(n, string, valueCallback) {
  switch (n) {
    case 1:
      return parseNumericPattern(
        numericPatterns.singleDigitSigned,
        string,
        valueCallback
      )
    case 2:
      return parseNumericPattern(
        numericPatterns.twoDigitsSigned,
        string,
        valueCallback
      )
    case 3:
      return parseNumericPattern(
        numericPatterns.threeDigitsSigned,
        string,
        valueCallback
      )
    case 4:
      return parseNumericPattern(
        numericPatterns.fourDigitsSigned,
        string,
        valueCallback
      )
    default:
      return parseNumericPattern(
        new RegExp('^-?\\d{1,' + n + '}'),
        string,
        valueCallback
      )
  }
}

function dayPeriodEnumToHours(enumValue) {
  switch (enumValue) {
    case 'morning':
      return 4
    case 'evening':
      return 17
    case 'pm':
    case 'noon':
    case 'afternoon':
      return 12
    case 'am':
    case 'midnight':
    case 'night':
    default:
      return 0
  }
}

function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0
  // Absolute number of the current year:
  // 1 -> 1 AC
  // 0 -> 1 BC
  // -1 -> 2 BC
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear

  var result
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100
  } else {
    var rangeEnd = absCurrentYear + 50
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0)
  }

  return isCommonEra ? result : 1 - result
}

var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// User for validation
function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
 * |  p  |                                |  P  |                                |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 */
var parsers = {
  // Era
  G: {
    priority: 140,
    parse: function(string, token, match, options) {
      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return (
            match.era(string, { width: 'abbreviated' }) ||
            match.era(string, { width: 'narrow' })
          )
        // A, B
        case 'GGGGG':
          return match.era(string, { width: 'narrow' })
        // Anno Domini, Before Christ
        case 'GGGG':
        default:
          return (
            match.era(string, { width: 'wide' }) ||
            match.era(string, { width: 'abbreviated' }) ||
            match.era(string, { width: 'narrow' })
          )
      }
    },
    set: function(date, flags, value, options) {
      // Sets year 10 BC if BC, or 10 AC if AC
      date.setUTCFullYear(value === 1 ? 10 : -9, 0, 1)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Year
  y: {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    priority: 130,
    parse: function(string, token, match, options) {
      var valueCallback = function(year) {
        return {
          year: year,
          isTwoDigitYear: token === 'yy'
        }
      }

      switch (token) {
        case 'y':
          return parseNDigits(4, string, valueCallback)
        case 'yo':
          return match.ordinalNumber(string, {
            unit: 'year',
            valueCallback: valueCallback
          })
        default:
          return parseNDigits(token.length, string, valueCallback)
      }
    },
    validate: function(date, value, options) {
      return value.isTwoDigitYear || value.year > 0
    },
    set: function(date, flags, value, options) {
      var currentYear = Object(_lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date, options)

      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(
          value.year,
          currentYear
        )
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1)
        date.setUTCHours(0, 0, 0, 0)
        return date
      }

      var year = currentYear > 0 ? value.year : 1 - value.year
      date.setUTCFullYear(year, 0, 1)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Local week-numbering year
  Y: {
    priority: 130,
    parse: function(string, token, match, options) {
      var valueCallback = function(year) {
        return {
          year: year,
          isTwoDigitYear: token === 'YY'
        }
      }

      switch (token) {
        case 'Y':
          return parseNDigits(4, string, valueCallback)
        case 'Yo':
          return match.ordinalNumber(string, {
            unit: 'year',
            valueCallback: valueCallback
          })
        default:
          return parseNDigits(token.length, string, valueCallback)
      }
    },
    validate: function(date, value, options) {
      return value.isTwoDigitYear || value.year > 0
    },
    set: function(date, flags, value, options) {
      var currentYear = date.getUTCFullYear()

      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(
          value.year,
          currentYear
        )
        date.setUTCFullYear(
          normalizedTwoDigitYear,
          0,
          options.firstWeekContainsDate
        )
        date.setUTCHours(0, 0, 0, 0)
        return Object(_lib_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date, options)
      }

      var year = currentYear > 0 ? value.year : 1 - value.year
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate)
      date.setUTCHours(0, 0, 0, 0)
      return Object(_lib_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date, options)
    }
  },

  // ISO week-numbering year
  R: {
    priority: 130,
    parse: function(string, token, match, options) {
      if (token === 'R') {
        return parseNDigitsSigned(4, string)
      }

      return parseNDigitsSigned(token.length, string)
    },
    set: function(date, flags, value, options) {
      var firstWeekOfYear = new Date(0)
      firstWeekOfYear.setUTCFullYear(value, 0, 4)
      firstWeekOfYear.setUTCHours(0, 0, 0, 0)
      return Object(_lib_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(firstWeekOfYear)
    }
  },

  // Extended year
  u: {
    priority: 130,
    parse: function(string, token, match, options) {
      if (token === 'u') {
        return parseNDigitsSigned(4, string)
      }

      return parseNDigitsSigned(token.length, string)
    },
    set: function(date, flags, value, options) {
      date.setUTCFullYear(value, 0, 1)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Quarter
  Q: {
    priority: 120,
    parse: function(string, token, match, options) {
      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
        case 'QQ': // 01, 02, 03, 04
          return parseNDigits(token.length, string)
        // 1st, 2nd, 3rd, 4th
        case 'Qo':
          return match.ordinalNumber(string, { unit: 'quarter' })
        // Q1, Q2, Q3, Q4
        case 'QQQ':
          return (
            match.quarter(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.quarter(string, { width: 'narrow', context: 'formatting' })
          )
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'QQQQQ':
          return match.quarter(string, {
            width: 'narrow',
            context: 'formatting'
          })
        // 1st quarter, 2nd quarter, ...
        case 'QQQQ':
        default:
          return (
            match.quarter(string, { width: 'wide', context: 'formatting' }) ||
            match.quarter(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.quarter(string, { width: 'narrow', context: 'formatting' })
          )
      }
    },
    validate: function(date, value, options) {
      return value >= 1 && value <= 4
    },
    set: function(date, flags, value, options) {
      date.setUTCMonth((value - 1) * 3, 1)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Stand-alone quarter
  q: {
    priority: 120,
    parse: function(string, token, match, options) {
      switch (token) {
        // 1, 2, 3, 4
        case 'q':
        case 'qq': // 01, 02, 03, 04
          return parseNDigits(token.length, string)
        // 1st, 2nd, 3rd, 4th
        case 'qo':
          return match.ordinalNumber(string, { unit: 'quarter' })
        // Q1, Q2, Q3, Q4
        case 'qqq':
          return (
            match.quarter(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) ||
            match.quarter(string, { width: 'narrow', context: 'standalone' })
          )
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'qqqqq':
          return match.quarter(string, {
            width: 'narrow',
            context: 'standalone'
          })
        // 1st quarter, 2nd quarter, ...
        case 'qqqq':
        default:
          return (
            match.quarter(string, { width: 'wide', context: 'standalone' }) ||
            match.quarter(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) ||
            match.quarter(string, { width: 'narrow', context: 'standalone' })
          )
      }
    },
    validate: function(date, value, options) {
      return value >= 1 && value <= 4
    },
    set: function(date, flags, value, options) {
      date.setUTCMonth((value - 1) * 3, 1)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Month
  M: {
    priority: 110,
    parse: function(string, token, match, options) {
      var valueCallback = function(value) {
        return value - 1
      }

      switch (token) {
        // 1, 2, ..., 12
        case 'M':
          return parseNumericPattern(
            numericPatterns.month,
            string,
            valueCallback
          )
        // 01, 02, ..., 12
        case 'MM':
          return parseNDigits(2, string, valueCallback)
        // 1st, 2nd, ..., 12th
        case 'Mo':
          return match.ordinalNumber(string, {
            unit: 'month',
            valueCallback: valueCallback
          })
        // Jan, Feb, ..., Dec
        case 'MMM':
          return (
            match.month(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.month(string, { width: 'narrow', context: 'formatting' })
          )
        // J, F, ..., D
        case 'MMMMM':
          return match.month(string, { width: 'narrow', context: 'formatting' })
        // January, February, ..., December
        case 'MMMM':
        default:
          return (
            match.month(string, { width: 'wide', context: 'formatting' }) ||
            match.month(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.month(string, { width: 'narrow', context: 'formatting' })
          )
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 11
    },
    set: function(date, flags, value, options) {
      date.setUTCMonth(value, 1)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Stand-alone month
  L: {
    priority: 110,
    parse: function(string, token, match, options) {
      var valueCallback = function(value) {
        return value - 1
      }

      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return parseNumericPattern(
            numericPatterns.month,
            string,
            valueCallback
          )
        // 01, 02, ..., 12
        case 'LL':
          return parseNDigits(2, string, valueCallback)
        // 1st, 2nd, ..., 12th
        case 'Lo':
          return match.ordinalNumber(string, {
            unit: 'month',
            valueCallback: valueCallback
          })
        // Jan, Feb, ..., Dec
        case 'LLL':
          return (
            match.month(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) ||
            match.month(string, { width: 'narrow', context: 'standalone' })
          )
        // J, F, ..., D
        case 'LLLLL':
          return match.month(string, { width: 'narrow', context: 'standalone' })
        // January, February, ..., December
        case 'LLLL':
        default:
          return (
            match.month(string, { width: 'wide', context: 'standalone' }) ||
            match.month(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) ||
            match.month(string, { width: 'narrow', context: 'standalone' })
          )
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 11
    },
    set: function(date, flags, value, options) {
      date.setUTCMonth(value, 1)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Local week of year
  w: {
    priority: 100,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'w':
          return parseNumericPattern(numericPatterns.week, string)
        case 'wo':
          return match.ordinalNumber(string, { unit: 'week' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      return value >= 1 && value <= 53
    },
    set: function(date, flags, value, options) {
      return Object(_lib_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_lib_setUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date, value, options), options)
    }
  },

  // ISO week of year
  I: {
    priority: 100,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'I':
          return parseNumericPattern(numericPatterns.week, string)
        case 'Io':
          return match.ordinalNumber(string, { unit: 'week' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      return value >= 1 && value <= 53
    },
    set: function(date, flags, value, options) {
      return Object(_lib_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_lib_setUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(date, value, options), options)
    }
  },

  // Day of the month
  d: {
    priority: 90,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'd':
          return parseNumericPattern(numericPatterns.date, string)
        case 'do':
          return match.ordinalNumber(string, { unit: 'date' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      var year = date.getUTCFullYear()
      var isLeapYear = isLeapYearIndex(year)
      var month = date.getUTCMonth()
      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month]
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month]
      }
    },
    set: function(date, flags, value, options) {
      date.setUTCDate(value)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Day of year
  D: {
    priority: 90,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'D':
        case 'DD':
          return parseNumericPattern(numericPatterns.dayOfYear, string)
        case 'Do':
          return match.ordinalNumber(string, { unit: 'date' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      var year = date.getUTCFullYear()
      var isLeapYear = isLeapYearIndex(year)
      if (isLeapYear) {
        return value >= 1 && value <= 366
      } else {
        return value >= 1 && value <= 365
      }
    },
    set: function(date, flags, value, options) {
      date.setUTCMonth(0, value)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Day of week
  E: {
    priority: 90,
    parse: function(string, token, match, options) {
      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return (
            match.day(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.day(string, { width: 'short', context: 'formatting' }) ||
            match.day(string, { width: 'narrow', context: 'formatting' })
          )
        // T
        case 'EEEEE':
          return match.day(string, { width: 'narrow', context: 'formatting' })
        // Tu
        case 'EEEEEE':
          return (
            match.day(string, { width: 'short', context: 'formatting' }) ||
            match.day(string, { width: 'narrow', context: 'formatting' })
          )
        // Tuesday
        case 'EEEE':
        default:
          return (
            match.day(string, { width: 'wide', context: 'formatting' }) ||
            match.day(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.day(string, { width: 'short', context: 'formatting' }) ||
            match.day(string, { width: 'narrow', context: 'formatting' })
          )
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 6
    },
    set: function(date, flags, value, options) {
      date = Object(_lib_setUTCDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(date, value, options)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Local day of week
  e: {
    priority: 90,
    parse: function(string, token, match, options) {
      var valueCallback = function(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7
        return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays
      }

      switch (token) {
        // 3
        case 'e':
        case 'ee': // 03
          return parseNDigits(token.length, string, valueCallback)
        // 3rd
        case 'eo':
          return match.ordinalNumber(string, {
            unit: 'day',
            valueCallback: valueCallback
          })
        // Tue
        case 'eee':
          return (
            match.day(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.day(string, { width: 'short', context: 'formatting' }) ||
            match.day(string, { width: 'narrow', context: 'formatting' })
          )
        // T
        case 'eeeee':
          return match.day(string, { width: 'narrow', context: 'formatting' })
        // Tu
        case 'eeeeee':
          return (
            match.day(string, { width: 'short', context: 'formatting' }) ||
            match.day(string, { width: 'narrow', context: 'formatting' })
          )
        // Tuesday
        case 'eeee':
        default:
          return (
            match.day(string, { width: 'wide', context: 'formatting' }) ||
            match.day(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.day(string, { width: 'short', context: 'formatting' }) ||
            match.day(string, { width: 'narrow', context: 'formatting' })
          )
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 6
    },
    set: function(date, flags, value, options) {
      date = Object(_lib_setUTCDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(date, value, options)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // Stand-alone local day of week
  c: {
    priority: 90,
    parse: function(string, token, match, options) {
      var valueCallback = function(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7
        return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays
      }

      switch (token) {
        // 3
        case 'c':
        case 'cc': // 03
          return parseNDigits(token.length, string, valueCallback)
        // 3rd
        case 'co':
          return match.ordinalNumber(string, {
            unit: 'day',
            valueCallback: valueCallback
          })
        // Tue
        case 'ccc':
          return (
            match.day(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) ||
            match.day(string, { width: 'short', context: 'standalone' }) ||
            match.day(string, { width: 'narrow', context: 'standalone' })
          )
        // T
        case 'ccccc':
          return match.day(string, { width: 'narrow', context: 'standalone' })
        // Tu
        case 'cccccc':
          return (
            match.day(string, { width: 'short', context: 'standalone' }) ||
            match.day(string, { width: 'narrow', context: 'standalone' })
          )
        // Tuesday
        case 'cccc':
        default:
          return (
            match.day(string, { width: 'wide', context: 'standalone' }) ||
            match.day(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) ||
            match.day(string, { width: 'short', context: 'standalone' }) ||
            match.day(string, { width: 'narrow', context: 'standalone' })
          )
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 6
    },
    set: function(date, flags, value, options) {
      date = Object(_lib_setUTCDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(date, value, options)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // ISO day of week
  i: {
    priority: 90,
    parse: function(string, token, match, options) {
      var valueCallback = function(value) {
        if (value === 0) {
          return 7
        }
        return value
      }

      switch (token) {
        // 2
        case 'i':
        case 'ii': // 02
          return parseNDigits(token.length, string)
        // 2nd
        case 'io':
          return match.ordinalNumber(string, { unit: 'day' })
        // Tue
        case 'iii':
          return (
            match.day(string, {
              width: 'abbreviated',
              context: 'formatting',
              valueCallback: valueCallback
            }) ||
            match.day(string, {
              width: 'short',
              context: 'formatting',
              valueCallback: valueCallback
            }) ||
            match.day(string, {
              width: 'narrow',
              context: 'formatting',
              valueCallback: valueCallback
            })
          )
        // T
        case 'iiiii':
          return match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          })
        // Tu
        case 'iiiiii':
          return (
            match.day(string, {
              width: 'short',
              context: 'formatting',
              valueCallback: valueCallback
            }) ||
            match.day(string, {
              width: 'narrow',
              context: 'formatting',
              valueCallback: valueCallback
            })
          )
        // Tuesday
        case 'iiii':
        default:
          return (
            match.day(string, {
              width: 'wide',
              context: 'formatting',
              valueCallback: valueCallback
            }) ||
            match.day(string, {
              width: 'abbreviated',
              context: 'formatting',
              valueCallback: valueCallback
            }) ||
            match.day(string, {
              width: 'short',
              context: 'formatting',
              valueCallback: valueCallback
            }) ||
            match.day(string, {
              width: 'narrow',
              context: 'formatting',
              valueCallback: valueCallback
            })
          )
      }
    },
    validate: function(date, value, options) {
      return value >= 1 && value <= 7
    },
    set: function(date, flags, value, options) {
      date = Object(_lib_setUTCISODay_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(date, value, options)
      date.setUTCHours(0, 0, 0, 0)
      return date
    }
  },

  // AM or PM
  a: {
    priority: 80,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'a':
        case 'aa':
        case 'aaa':
          return (
            match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.dayPeriod(string, { width: 'narrow', context: 'formatting' })
          )
        case 'aaaaa':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          })
        case 'aaaa':
        default:
          return (
            match.dayPeriod(string, { width: 'wide', context: 'formatting' }) ||
            match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.dayPeriod(string, { width: 'narrow', context: 'formatting' })
          )
      }
    },
    set: function(date, flags, value, options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0)
      return date
    }
  },

  // AM, PM, midnight
  b: {
    priority: 80,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'b':
        case 'bb':
        case 'bbb':
          return (
            match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.dayPeriod(string, { width: 'narrow', context: 'formatting' })
          )
        case 'bbbbb':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          })
        case 'bbbb':
        default:
          return (
            match.dayPeriod(string, { width: 'wide', context: 'formatting' }) ||
            match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.dayPeriod(string, { width: 'narrow', context: 'formatting' })
          )
      }
    },
    set: function(date, flags, value, options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0)
      return date
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: {
    priority: 80,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return (
            match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.dayPeriod(string, { width: 'narrow', context: 'formatting' })
          )
        case 'BBBBB':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          })
        case 'BBBB':
        default:
          return (
            match.dayPeriod(string, { width: 'wide', context: 'formatting' }) ||
            match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) ||
            match.dayPeriod(string, { width: 'narrow', context: 'formatting' })
          )
      }
    },
    set: function(date, flags, value, options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0)
      return date
    }
  },

  // Hour [1-12]
  h: {
    priority: 70,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'h':
          return parseNumericPattern(numericPatterns.hour12h, string)
        case 'ho':
          return match.ordinalNumber(string, { unit: 'hour' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      return value >= 1 && value <= 12
    },
    set: function(date, flags, value, options) {
      var isPM = date.getUTCHours() >= 12
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0)
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0)
      } else {
        date.setUTCHours(value, 0, 0, 0)
      }
      return date
    }
  },

  // Hour [0-23]
  H: {
    priority: 70,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'H':
          return parseNumericPattern(numericPatterns.hour23h, string)
        case 'Ho':
          return match.ordinalNumber(string, { unit: 'hour' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 23
    },
    set: function(date, flags, value, options) {
      date.setUTCHours(value, 0, 0, 0)
      return date
    }
  },

  // Hour [0-11]
  K: {
    priority: 70,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'K':
          return parseNumericPattern(numericPatterns.hour11h, string)
        case 'Ko':
          return match.ordinalNumber(string, { unit: 'hour' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 11
    },
    set: function(date, flags, value, options) {
      var isPM = date.getUTCHours() >= 12
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0)
      } else {
        date.setUTCHours(value, 0, 0, 0)
      }
      return date
    }
  },

  // Hour [1-24]
  k: {
    priority: 70,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'k':
          return parseNumericPattern(numericPatterns.hour24h, string)
        case 'ko':
          return match.ordinalNumber(string, { unit: 'hour' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      return value >= 1 && value <= 24
    },
    set: function(date, flags, value, options) {
      var hours = value <= 24 ? value % 24 : value
      date.setUTCHours(hours, 0, 0, 0)
      return date
    }
  },

  // Minute
  m: {
    priority: 60,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'm':
          return parseNumericPattern(numericPatterns.minute, string)
        case 'mo':
          return match.ordinalNumber(string, { unit: 'minute' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 59
    },
    set: function(date, flags, value, options) {
      date.setUTCMinutes(value, 0, 0)
      return date
    }
  },

  // Second
  s: {
    priority: 50,
    parse: function(string, token, match, options) {
      switch (token) {
        case 's':
          return parseNumericPattern(numericPatterns.second, string)
        case 'so':
          return match.ordinalNumber(string, { unit: 'second' })
        default:
          return parseNDigits(token.length, string)
      }
    },
    validate: function(date, value, options) {
      return value >= 0 && value <= 59
    },
    set: function(date, flags, value, options) {
      date.setUTCSeconds(value, 0)
      return date
    }
  },

  // Fraction of second
  S: {
    priority: 30,
    parse: function(string, token, match, options) {
      var valueCallback = function(value) {
        return Math.floor(value * Math.pow(10, -token.length + 3))
      }
      return parseNDigits(token.length, string, valueCallback)
    },
    set: function(date, flags, value, options) {
      date.setUTCMilliseconds(value)
      return date
    }
  },

  // Timezone (ISO-8601. +00:00 is `'Z'`)
  X: {
    priority: 10,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'X':
          return parseTimezonePattern(
            timezonePatterns.basicOptionalMinutes,
            string
          )
        case 'XX':
          return parseTimezonePattern(timezonePatterns.basic, string)
        case 'XXXX':
          return parseTimezonePattern(
            timezonePatterns.basicOptionalSeconds,
            string
          )
        case 'XXXXX':
          return parseTimezonePattern(
            timezonePatterns.extendedOptionalSeconds,
            string
          )
        case 'XXX':
        default:
          return parseTimezonePattern(timezonePatterns.extended, string)
      }
    },
    set: function(date, flags, value, options) {
      if (flags.timestampIsSet) {
        return date
      }
      return new Date(date.getTime() - value)
    }
  },

  // Timezone (ISO-8601)
  x: {
    priority: 10,
    parse: function(string, token, match, options) {
      switch (token) {
        case 'x':
          return parseTimezonePattern(
            timezonePatterns.basicOptionalMinutes,
            string
          )
        case 'xx':
          return parseTimezonePattern(timezonePatterns.basic, string)
        case 'xxxx':
          return parseTimezonePattern(
            timezonePatterns.basicOptionalSeconds,
            string
          )
        case 'xxxxx':
          return parseTimezonePattern(
            timezonePatterns.extendedOptionalSeconds,
            string
          )
        case 'xxx':
        default:
          return parseTimezonePattern(timezonePatterns.extended, string)
      }
    },
    set: function(date, flags, value, options) {
      if (flags.timestampIsSet) {
        return date
      }
      return new Date(date.getTime() - value)
    }
  },

  // Seconds timestamp
  t: {
    priority: 40,
    parse: function(string, token, match, options) {
      return parseAnyDigitsSigned(string)
    },
    set: function(date, flags, value, options) {
      return [new Date(value * 1000), { timestampIsSet: true }]
    }
  },

  // Milliseconds timestamp
  T: {
    priority: 20,
    parse: function(string, token, match, options) {
      return parseAnyDigitsSigned(string)
    },
    set: function(date, flags, value, options) {
      return [new Date(value), { timestampIsSet: true }]
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (parsers);


/***/ }),

/***/ "./node_modules/date-fns/esm/parse/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/esm/parse/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parse; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_assign_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/assign/index.js */ "./node_modules/date-fns/esm/_lib/assign/index.js");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subMilliseconds/index.js */ "./node_modules/date-fns/esm/subMilliseconds/index.js");
/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../locale/en-US/index.js */ "./node_modules/date-fns/esm/locale/en-US/index.js");
/* harmony import */ var _lib_parsers_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_lib/parsers/index.js */ "./node_modules/date-fns/esm/parse/_lib/parsers/index.js");
/* harmony import */ var _lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_lib/protectedTokens/index.js */ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js");









var TIMEZONE_UNIT_PRIORITY = 10

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g

var escapedStringRegExp = /^'(.*?)'?$/
var doubleQuoteRegExp = /''/g

var notWhitespaceRegExp = /\S/

/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 6     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 6     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Su            | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 1, 2, ..., 11, 0                  |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `parse` will try to match both formatting and stand-alone units interchangably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `baseDate`:
 *
 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
 *
 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
 *
 *    while `uu` will just assign the year as is:
 *
 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
 *
 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
 *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *
 * 6. These tokens are often confused with others. See: https://git.io/fxCyr
 *
 * Values will be assigned to the date in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `baseDate` which works as a context of parsing.
 *
 * `baseDate` must be passed for correct work of the function.
 * If you're not sure which `baseDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `baseDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `baseDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Old `parse` was renamed to `toDate`.
 *   Now `parse` is a new function which parses a string using a provided format.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   toDate('2016-01-01')
 *   parse('2016-01-01', 'yyyy-MM-dd', new Date())
 *   ```
 *
 * @param {String} dateString - the string to parse
 * @param {String} formatString - the string of tokens
 * @param {Date|Number} baseDate - defines values missing from the parsed dateString
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @param {Boolean} [options.awareOfUnicodeTokens=false] - if true, allows usage of Unicode tokens causes confusion:
 *   - Some of the day of year tokens (`D`, `DD`) that are confused with the day of month tokens (`d`, `dd`).
 *   - Some of the local week-numbering year tokens (`YY`, `YYYY`) that are confused with the calendar year tokens (`yy`, `yyyy`).
 *   See: https://git.io/fxCyr
 * @returns {Date} the parsed date
 * @throws {TypeError} 3 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} `options.locale` must contain `match` property
 * @throws {RangeError} `options.awareOfUnicodeTokens` must be set to `true` to use `XX` token; see: https://git.io/fxCyr
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
 *   locale: eo
 * })
 * //=> Sun Feb 28 2010 00:00:00
 */
function parse(
  dirtyDateString,
  dirtyFormatString,
  dirtyBaseDate,
  dirtyOptions
) {
  if (arguments.length < 3) {
    throw new TypeError(
      '3 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var dateString = String(dirtyDateString)
  var formatString = String(dirtyFormatString)
  var options = dirtyOptions || {}

  var locale = options.locale || _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_5__["default"]

  if (!locale.match) {
    throw new RangeError('locale must contain match property')
  }

  var localeFirstWeekContainsDate =
    locale.options && locale.options.firstWeekContainsDate
  var defaultFirstWeekContainsDate =
    localeFirstWeekContainsDate == null
      ? 1
      : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeFirstWeekContainsDate)
  var firstWeekContainsDate =
    options.firstWeekContainsDate == null
      ? defaultFirstWeekContainsDate
      : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.firstWeekContainsDate)

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError(
      'firstWeekContainsDate must be between 1 and 7 inclusively'
    )
  }

  var localeWeekStartsOn = locale.options && locale.options.weekStartsOn
  var defaultWeekStartsOn =
    localeWeekStartsOn == null ? 0 : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeWeekStartsOn)
  var weekStartsOn =
    options.weekStartsOn == null
      ? defaultWeekStartsOn
      : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.weekStartsOn)

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  if (formatString === '') {
    if (dateString === '') {
      return Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyBaseDate)
    } else {
      return new Date(NaN)
    }
  }

  var subFnOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale
  }

  // If timezone isn't specified, it will be set to the system timezone
  var setters = [
    {
      priority: TIMEZONE_UNIT_PRIORITY,
      set: dateToSystemTimezone,
      index: 0
    }
  ]

  var i

  var tokens = formatString.match(formattingTokensRegExp)

  for (i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (!options.awareOfUnicodeTokens && Object(_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_7__["isProtectedToken"])(token)) {
      Object(_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_7__["throwProtectedError"])(token)
    }

    var firstCharacter = token[0]
    var parser = _lib_parsers_index_js__WEBPACK_IMPORTED_MODULE_6__["default"][firstCharacter]
    if (parser) {
      var parseResult = parser.parse(
        dateString,
        token,
        locale.match,
        subFnOptions
      )

      if (!parseResult) {
        return new Date(NaN)
      }

      setters.push({
        priority: parser.priority,
        set: parser.set,
        validate: parser.validate,
        value: parseResult.value,
        index: setters.length
      })

      dateString = parseResult.rest
    } else {
      // Replace two single quote characters with one single quote character
      if (token === "''") {
        token = "'"
      } else if (firstCharacter === "'") {
        token = cleanEscapedString(token)
      }

      // Cut token from string, or, if string doesn't match the token, return Invalid Date
      if (dateString.indexOf(token) === 0) {
        dateString = dateString.slice(token.length)
      } else {
        return new Date(NaN)
      }
    }
  }

  // Check if the remaining input contains something other than whitespace
  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return new Date(NaN)
  }

  var uniquePrioritySetters = setters
    .map(function(setter) {
      return setter.priority
    })
    .sort(function(a, b) {
      return b - a
    })
    .filter(function(priority, index, array) {
      return array.indexOf(priority) === index
    })
    .map(function(priority) {
      return setters
        .filter(function(setter) {
          return setter.priority === priority
        })
        .reverse()
    })
    .map(function(setterArray) {
      return setterArray[0]
    })

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyBaseDate)

  if (isNaN(date)) {
    return new Date(NaN)
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37
  var utcDate = Object(_subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(date, Object(_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date))

  var flags = {}
  for (i = 0; i < uniquePrioritySetters.length; i++) {
    var setter = uniquePrioritySetters[i]

    if (
      setter.validate &&
      !setter.validate(utcDate, setter.value, subFnOptions)
    ) {
      return new Date(NaN)
    }

    var result = setter.set(utcDate, flags, setter.value, subFnOptions)
    // Result is tuple (date, flags)
    if (result[0]) {
      utcDate = result[0]
      Object(_lib_assign_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(flags, result[1])
      // Result is date
    } else {
      utcDate = result
    }
  }

  return utcDate
}

function dateToSystemTimezone(date, flags) {
  if (flags.timestampIsSet) {
    return date
  }

  var convertedDate = new Date(0)
  convertedDate.setFullYear(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  )
  convertedDate.setHours(
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  )
  return convertedDate
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'")
}


/***/ }),

/***/ "./node_modules/date-fns/esm/setDayOfYear/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/setDayOfYear/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setDayOfYear; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name setDayOfYear
 * @category Day Helpers
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} dayOfYear - the day of the year of the new date
 * @returns {Date} the new date with the day of the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * var result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
function setDayOfYear(dirtyDate, dirtyDayOfYear) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var dayOfYear = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDayOfYear)
  date.setMonth(0)
  date.setDate(dayOfYear)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/setHours/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/setHours/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setHours; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name setHours
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} hours - the hours of the new date
 * @returns {Date} the new date with the hours set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours(dirtyDate, dirtyHours) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var hours = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyHours)
  date.setHours(hours)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/setMinutes/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/setMinutes/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setMinutes; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name setMinutes
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} minutes - the minutes of the new date
 * @returns {Date} the new date with the minutes set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * var result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes(dirtyDate, dirtyMinutes) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var minutes = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyMinutes)
  date.setMinutes(minutes)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/setMonth/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/setMonth/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setMonth; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _getDaysInMonth_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getDaysInMonth/index.js */ "./node_modules/date-fns/esm/getDaysInMonth/index.js");




/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set February to 1 September 2014:
 * var result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth(dirtyDate, dirtyMonth) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var month = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyMonth)
  var year = date.getFullYear()
  var day = date.getDate()

  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(year, month, 15)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = Object(_getDaysInMonth_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth))
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/setSeconds/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/setSeconds/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setSeconds; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name setSeconds
 * @category Second Helpers
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} seconds - the seconds of the new date
 * @returns {Date} the new date with the seconds set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * var result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds(dirtyDate, dirtySeconds) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var seconds = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtySeconds)
  date.setSeconds(seconds)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/setYear/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/setYear/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setYear; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * var result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear(dirtyDate, dirtyYear) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var year = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyYear)

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(date)) {
    return new Date(NaN)
  }

  date.setFullYear(year)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startOfDay; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  date.setHours(0, 0, 0, 0)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/startOfMonth/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfMonth/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startOfMonth; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startOfWeek; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");



/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var options = dirtyOptions || {}
  var locale = options.locale
  var localeWeekStartsOn =
    locale && locale.options && locale.options.weekStartsOn
  var defaultWeekStartsOn =
    localeWeekStartsOn == null ? 0 : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(localeWeekStartsOn)
  var weekStartsOn =
    options.weekStartsOn == null
      ? defaultWeekStartsOn
      : Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.weekStartsOn)

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  var date = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/startOfYear/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfYear/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return startOfYear; });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");


/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var cleanDate = Object(_toDate_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyDate)
  var date = new Date(0)
  date.setFullYear(cleanDate.getFullYear(), 0, 1)
  date.setHours(0, 0, 0, 0)
  return date
}


/***/ }),

/***/ "./node_modules/date-fns/esm/subDays/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/subDays/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return subDays; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addDays_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addDays/index.js */ "./node_modules/date-fns/esm/addDays/index.js");



/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * var result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addDays_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, -amount)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/subHours/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/subHours/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return subHours; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addHours_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addHours/index.js */ "./node_modules/date-fns/esm/addHours/index.js");



/**
 * @name subHours
 * @category Hour Helpers
 * @summary Subtract the specified number of hours from the given date.
 *
 * @description
 * Subtract the specified number of hours from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be subtracted
 * @returns {Date} the new date with the hours subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 2 hours from 11 July 2014 01:00:00:
 * var result = subHours(new Date(2014, 6, 11, 1, 0), 2)
 * //=> Thu Jul 10 2014 23:00:00
 */
function subHours(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addHours_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, -amount)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/subMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/subMilliseconds/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return subMilliseconds; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addMilliseconds/index.js */ "./node_modules/date-fns/esm/addMilliseconds/index.js");



/**
 * @name subMilliseconds
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted
 * @returns {Date} the new date with the milliseconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */
function subMilliseconds(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, -amount)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/subMinutes/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/subMinutes/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return subMinutes; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addMinutes_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addMinutes/index.js */ "./node_modules/date-fns/esm/addMinutes/index.js");



/**
 * @name subMinutes
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be subtracted
 * @returns {Date} the new date with the minutes subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addMinutes_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, -amount)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/subMonths/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/subMonths/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return subMonths; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addMonths_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addMonths/index.js */ "./node_modules/date-fns/esm/addMonths/index.js");



/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted
 * @returns {Date} the new date with the months subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * var result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addMonths_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, -amount)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/subWeeks/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/subWeeks/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return subWeeks; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addWeeks_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addWeeks/index.js */ "./node_modules/date-fns/esm/addWeeks/index.js");



/**
 * @name subWeeks
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be subtracted
 * @returns {Date} the new date with the weeks subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * var result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addWeeks_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, -amount)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/subYears/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/subYears/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return subYears; });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _addYears_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../addYears/index.js */ "./node_modules/date-fns/esm/addYears/index.js");



/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be subtracted
 * @returns {Date} the new date with the years subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * var result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears(dirtyDate, dirtyAmount) {
  if (arguments.length < 2) {
    throw new TypeError(
      '2 arguments required, but only ' + arguments.length + ' present'
    )
  }

  var amount = Object(_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dirtyAmount)
  return Object(_addYears_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, -amount)
}


/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toDate; });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * var result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * var result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  if (arguments.length < 1) {
    throw new TypeError(
      '1 argument required, but only ' + arguments.length + ' present'
    )
  }

  var argStr = Object.prototype.toString.call(argument)

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === 'object' && argStr === '[object Date]')
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument)
  } else {
    if (
      (typeof argument === 'string' || argStr === '[object String]') &&
      typeof console !== 'undefined'
    ) {
      console.warn(
        "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fpAk2"
      )
      console.warn(new Error().stack)
    }
    return new Date(NaN)
  }
}


/***/ }),

/***/ "./node_modules/react-clipboard.js/dist/react-clipboard.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-clipboard.js/dist/react-clipboard.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js"), __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"));
	else {}
})(this, function(__WEBPACK_EXTERNAL_MODULE_clipboard__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar ClipboardButton =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(ClipboardButton, _React$Component);\n\n  function ClipboardButton() {\n    _classCallCheck(this, ClipboardButton);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(ClipboardButton).apply(this, arguments));\n  }\n\n  _createClass(ClipboardButton, [{\n    key: \"propsWith\",\n    value: function propsWith(regexp) {\n      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n      var object = {};\n      Object.keys(this.props).forEach(function (key) {\n        if (key.search(regexp) !== -1) {\n          var objectKey = remove ? key.replace(regexp, '') : key;\n          object[objectKey] = this.props[key];\n        }\n      }, this);\n      return object;\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      this.clipboard && this.clipboard.destroy();\n    }\n  }, {\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      // Support old API by trying to assign this.props.options first;\n      var options = this.props.options || this.propsWith(/^option-/, true);\n      var element = react__WEBPACK_IMPORTED_MODULE_0___default.a.version.match(/0\\.13(.*)/) ? this.refs.element.getDOMNode() : this.element;\n\n      var Clipboard = __webpack_require__(/*! clipboard */ \"clipboard\");\n\n      this.clipboard = new Clipboard(element, options);\n      var callbacks = this.propsWith(/^on/, true);\n      Object.keys(callbacks).forEach(function (callback) {\n        this.clipboard.on(callback.toLowerCase(), this.props['on' + callback]);\n      }, this);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n\n      var attributes = _objectSpread({\n        title: this.props.title || '',\n        type: this.getType(),\n        className: this.props.className || '',\n        style: this.props.style || {},\n        ref: function ref(element) {\n          _this.element = element;\n        },\n        onClick: this.props.onClick\n      }, this.propsWith(/^data-/), this.propsWith(/^button-/, true));\n\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.getComponent(), attributes, this.props.children);\n    }\n  }, {\n    key: \"getType\",\n    value: function getType() {\n      if (this.getComponent() === 'button' || this.getComponent() === 'input') {\n        return this.props.type || 'button';\n      } else {\n        return undefined;\n      }\n    }\n  }, {\n    key: \"getComponent\",\n    value: function getComponent() {\n      return this.props.component || 'button';\n    }\n  }]);\n\n  return ClipboardButton;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n_defineProperty(ClipboardButton, \"propTypes\", {\n  options: function options(props, propName, componentName) {\n    var options = props[propName];\n\n    if (options && _typeof(options) !== 'object' || Array.isArray(options)) {\n      return new Error(\"Invalid props '\".concat(propName, \"' supplied to '\").concat(componentName, \"'. \") + \"'\".concat(propName, \"' is not an object.\"));\n    }\n\n    if (props['option-text'] !== undefined) {\n      var optionText = props['option-text'];\n\n      if (typeof optionText !== 'function') {\n        return new Error(\"Invalid props 'option-text' supplied to '\".concat(componentName, \"'. \") + \"'option-text' is not a function.\");\n      }\n    }\n  },\n  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  style: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,\n  component: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,\n  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object])\n});\n\n_defineProperty(ClipboardButton, \"defaultProps\", {\n  onClick: function onClick() {}\n  /* Returns a object with all props that fulfill a certain naming pattern\n   *\n   * @param {RegExp} regexp - Regular expression representing which pattern\n   *                          you'll be searching for.\n   * @param {Boolean} remove - Determines if the regular expression should be\n   *                           removed when transmitting the key from the props\n   *                           to the new object.\n   *\n   * e.g:\n   *\n   * // Considering:\n   * // this.props = {option-foo: 1, onBar: 2, data-foobar: 3 data-baz: 4};\n   *\n   * // *RegExps not using // so that this comment doesn't break up\n   * this.propsWith(option-*, true); // returns {foo: 1}\n   * this.propsWith(on*, true); // returns {Bar: 2}\n   * this.propsWith(data-*); // returns {data-foobar: 1, data-baz: 4}\n   */\n\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ClipboardButton);\n\n//# sourceURL=webpack://ReactClipboard/./index.js?");

/***/ }),

/***/ "clipboard":
/*!********************************************************************************************************!*\
  !*** external {"root":"ClipboardJS","amd":"clipboard","commonjs":"clipboard","commonjs2":"clipboard"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_clipboard__;\n\n//# sourceURL=webpack://ReactClipboard/external_%7B%22root%22:%22ClipboardJS%22,%22amd%22:%22clipboard%22,%22commonjs%22:%22clipboard%22,%22commonjs2%22:%22clipboard%22%7D?");

/***/ }),

/***/ "prop-types":
/*!*********************************************************************************************************!*\
  !*** external {"root":"PropTypes","amd":"prop-types","commonjs":"prop-types","commonjs2":"prop-types"} ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;\n\n//# sourceURL=webpack://ReactClipboard/external_%7B%22root%22:%22PropTypes%22,%22amd%22:%22prop-types%22,%22commonjs%22:%22prop-types%22,%22commonjs2%22:%22prop-types%22%7D?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","amd":"react","commonjs":"react","commonjs2":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://ReactClipboard/external_%7B%22root%22:%22React%22,%22amd%22:%22react%22,%22commonjs%22:%22react%22,%22commonjs2%22:%22react%22%7D?");

/***/ })

/******/ });
});

/***/ }),

/***/ "./node_modules/react-datepicker/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-datepicker/es/index.js ***!
  \***************************************************/
/*! exports provided: registerLocale, setDefaultLocale, getDefaultLocale, CalendarContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerLocale", function() { return registerLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultLocale", function() { return setDefaultLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultLocale", function() { return getDefaultLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarContainer", function() { return CalendarContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var date_fns_isDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns/isDate */ "./node_modules/date-fns/esm/isDate/index.js");
/* harmony import */ var date_fns_isValid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns/isValid */ "./node_modules/date-fns/esm/isValid/index.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns_addMinutes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns/addMinutes */ "./node_modules/date-fns/esm/addMinutes/index.js");
/* harmony import */ var date_fns_addHours__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns/addHours */ "./node_modules/date-fns/esm/addHours/index.js");
/* harmony import */ var date_fns_addDays__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns/addDays */ "./node_modules/date-fns/esm/addDays/index.js");
/* harmony import */ var date_fns_addWeeks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns/addWeeks */ "./node_modules/date-fns/esm/addWeeks/index.js");
/* harmony import */ var date_fns_addMonths__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! date-fns/addMonths */ "./node_modules/date-fns/esm/addMonths/index.js");
/* harmony import */ var date_fns_addYears__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns/addYears */ "./node_modules/date-fns/esm/addYears/index.js");
/* harmony import */ var date_fns_subMinutes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! date-fns/subMinutes */ "./node_modules/date-fns/esm/subMinutes/index.js");
/* harmony import */ var date_fns_subHours__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! date-fns/subHours */ "./node_modules/date-fns/esm/subHours/index.js");
/* harmony import */ var date_fns_subDays__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! date-fns/subDays */ "./node_modules/date-fns/esm/subDays/index.js");
/* harmony import */ var date_fns_subWeeks__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! date-fns/subWeeks */ "./node_modules/date-fns/esm/subWeeks/index.js");
/* harmony import */ var date_fns_subMonths__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! date-fns/subMonths */ "./node_modules/date-fns/esm/subMonths/index.js");
/* harmony import */ var date_fns_subYears__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! date-fns/subYears */ "./node_modules/date-fns/esm/subYears/index.js");
/* harmony import */ var date_fns_getSeconds__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! date-fns/getSeconds */ "./node_modules/date-fns/esm/getSeconds/index.js");
/* harmony import */ var date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! date-fns/getMinutes */ "./node_modules/date-fns/esm/getMinutes/index.js");
/* harmony import */ var date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! date-fns/getHours */ "./node_modules/date-fns/esm/getHours/index.js");
/* harmony import */ var date_fns_getDay__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! date-fns/getDay */ "./node_modules/date-fns/esm/getDay/index.js");
/* harmony import */ var date_fns_getDate__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! date-fns/getDate */ "./node_modules/date-fns/esm/getDate/index.js");
/* harmony import */ var date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! date-fns/getMonth */ "./node_modules/date-fns/esm/getMonth/index.js");
/* harmony import */ var date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! date-fns/getYear */ "./node_modules/date-fns/esm/getYear/index.js");
/* harmony import */ var date_fns_getTime__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! date-fns/getTime */ "./node_modules/date-fns/esm/getTime/index.js");
/* harmony import */ var date_fns_setSeconds__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! date-fns/setSeconds */ "./node_modules/date-fns/esm/setSeconds/index.js");
/* harmony import */ var date_fns_setMinutes__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! date-fns/setMinutes */ "./node_modules/date-fns/esm/setMinutes/index.js");
/* harmony import */ var date_fns_setHours__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! date-fns/setHours */ "./node_modules/date-fns/esm/setHours/index.js");
/* harmony import */ var date_fns_setMonth__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! date-fns/setMonth */ "./node_modules/date-fns/esm/setMonth/index.js");
/* harmony import */ var date_fns_setYear__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! date-fns/setYear */ "./node_modules/date-fns/esm/setYear/index.js");
/* harmony import */ var date_fns_min__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! date-fns/min */ "./node_modules/date-fns/esm/min/index.js");
/* harmony import */ var date_fns_max__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! date-fns/max */ "./node_modules/date-fns/esm/max/index.js");
/* harmony import */ var date_fns_differenceInCalendarDays__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! date-fns/differenceInCalendarDays */ "./node_modules/date-fns/esm/differenceInCalendarDays/index.js");
/* harmony import */ var date_fns_differenceInCalendarMonths__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! date-fns/differenceInCalendarMonths */ "./node_modules/date-fns/esm/differenceInCalendarMonths/index.js");
/* harmony import */ var date_fns_differenceInCalendarWeeks__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! date-fns/differenceInCalendarWeeks */ "./node_modules/date-fns/esm/differenceInCalendarWeeks/index.js");
/* harmony import */ var date_fns_setDayOfYear__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! date-fns/setDayOfYear */ "./node_modules/date-fns/esm/setDayOfYear/index.js");
/* harmony import */ var date_fns_startOfDay__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! date-fns/startOfDay */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var date_fns_startOfWeek__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var date_fns_startOfMonth__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! date-fns/startOfMonth */ "./node_modules/date-fns/esm/startOfMonth/index.js");
/* harmony import */ var date_fns_startOfYear__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! date-fns/startOfYear */ "./node_modules/date-fns/esm/startOfYear/index.js");
/* harmony import */ var date_fns_endOfWeek__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! date-fns/endOfWeek */ "./node_modules/date-fns/esm/endOfWeek/index.js");
/* harmony import */ var date_fns_endOfMonth__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! date-fns/endOfMonth */ "./node_modules/date-fns/esm/endOfMonth/index.js");
/* harmony import */ var date_fns_isEqual__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! date-fns/isEqual */ "./node_modules/date-fns/esm/isEqual/index.js");
/* harmony import */ var date_fns_isSameWeek__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! date-fns/isSameWeek */ "./node_modules/date-fns/esm/isSameWeek/index.js");
/* harmony import */ var date_fns_isSameDay__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! date-fns/isSameDay */ "./node_modules/date-fns/esm/isSameDay/index.js");
/* harmony import */ var date_fns_isSameMonth__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! date-fns/isSameMonth */ "./node_modules/date-fns/esm/isSameMonth/index.js");
/* harmony import */ var date_fns_isSameYear__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! date-fns/isSameYear */ "./node_modules/date-fns/esm/isSameYear/index.js");
/* harmony import */ var date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! date-fns/isAfter */ "./node_modules/date-fns/esm/isAfter/index.js");
/* harmony import */ var date_fns_isBefore__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! date-fns/isBefore */ "./node_modules/date-fns/esm/isBefore/index.js");
/* harmony import */ var date_fns_isWithinInterval__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! date-fns/isWithinInterval */ "./node_modules/date-fns/esm/isWithinInterval/index.js");
/* harmony import */ var date_fns_toDate__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! date-fns/toDate */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var date_fns_parse__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! date-fns/parse */ "./node_modules/date-fns/esm/parse/index.js");
/* harmony import */ var react_onclickoutside__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! react-onclickoutside */ "./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js");
/* harmony import */ var react_popper__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! react-popper */ "./node_modules/react-popper/lib/esm/index.js");
























































var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// ** Date Constructors **

function newDate(value) {
  var d = value ? Object(date_fns_toDate__WEBPACK_IMPORTED_MODULE_51__["default"])(value) : new Date();
  return isValid(d) ? d : null;
}

function parseDate(value, dateFormat, locale, strictParsing) {
  var parsedDate = null;
  var localeObject = getLocaleObject(locale);
  var strictParsingValueMatch = true;
  if (Array.isArray(dateFormat)) {
    dateFormat.forEach(function (df) {
      var tryParseDate = Object(date_fns_parse__WEBPACK_IMPORTED_MODULE_52__["default"])(value, df, new Date(), localeObject);
      if (strictParsing) {
        strictParsingValueMatch = isValid(tryParseDate) && value === Object(date_fns_format__WEBPACK_IMPORTED_MODULE_5__["default"])(tryParseDate, df, { awareOfUnicodeTokens: true });
      }
      if (isValid(tryParseDate) && strictParsingValueMatch) {
        parsedDate = tryParseDate;
      }
    });
    return parsedDate;
  }

  parsedDate = Object(date_fns_parse__WEBPACK_IMPORTED_MODULE_52__["default"])(value, dateFormat, new Date(), localeObject);

  if (strictParsing) {
    strictParsingValueMatch = isValid(parsedDate) && value === Object(date_fns_format__WEBPACK_IMPORTED_MODULE_5__["default"])(parsedDate, dateFormat, { awareOfUnicodeTokens: true });
  } else if (!isValid(parsedDate)) {
    parsedDate = new Date(value);
  }

  return isValid(parsedDate) && strictParsingValueMatch ? parsedDate : null;
}

function isValid(date) {
  return Object(date_fns_isValid__WEBPACK_IMPORTED_MODULE_4__["default"])(date) && Object(date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__["default"])(date, new Date("1/1/1000"));
}

// ** Date Formatting **

function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return Object(date_fns_format__WEBPACK_IMPORTED_MODULE_5__["default"])(date, formatStr, { awareOfUnicodeTokens: true });
  }
  var localeObj = getLocaleObject(locale);
  if (locale && !localeObj) {
    console.warn("A locale object was not found for the provided string [\"" + locale + "\"].");
  }
  if (!localeObj && !!getDefaultLocale() && !!getLocaleObject(getDefaultLocale())) {
    localeObj = getLocaleObject(getDefaultLocale());
  }
  return Object(date_fns_format__WEBPACK_IMPORTED_MODULE_5__["default"])(date, formatStr, {
    locale: localeObj ? localeObj : null,
    awareOfUnicodeTokens: true
  });
}

function safeDateFormat(date, _ref) {
  var dateFormat = _ref.dateFormat,
      locale = _ref.locale;

  return date && formatDate(date, Array.isArray(dateFormat) ? dateFormat[0] : dateFormat, locale) || "";
}

// ** Date Setters **

function setTime(date, _ref2) {
  var _ref2$hour = _ref2.hour,
      hour = _ref2$hour === undefined ? 0 : _ref2$hour,
      _ref2$minute = _ref2.minute,
      minute = _ref2$minute === undefined ? 0 : _ref2$minute,
      _ref2$second = _ref2.second,
      second = _ref2$second === undefined ? 0 : _ref2$second;

  return Object(date_fns_setHours__WEBPACK_IMPORTED_MODULE_28__["default"])(Object(date_fns_setMinutes__WEBPACK_IMPORTED_MODULE_27__["default"])(Object(date_fns_setSeconds__WEBPACK_IMPORTED_MODULE_26__["default"])(date, second), minute), hour);
}

function getWeek(date) {
  var firstDayOfYear = Object(date_fns_setDayOfYear__WEBPACK_IMPORTED_MODULE_36__["default"])(date, 1);
  if (!isSameYear(Object(date_fns_endOfWeek__WEBPACK_IMPORTED_MODULE_41__["default"])(date), date)) {
    return 1;
  }
  return Object(date_fns_differenceInCalendarWeeks__WEBPACK_IMPORTED_MODULE_35__["default"])(date, Object(date_fns_startOfYear__WEBPACK_IMPORTED_MODULE_40__["default"])(date)) + 1;
}

function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", locale);
}

// *** Start of ***

function getStartOfDay(date) {
  return Object(date_fns_startOfDay__WEBPACK_IMPORTED_MODULE_37__["default"])(date);
}

function getStartOfWeek(date, locale) {
  var localeObj = locale ? getLocaleObject(locale) : getLocaleObject(getDefaultLocale());
  return Object(date_fns_startOfWeek__WEBPACK_IMPORTED_MODULE_38__["default"])(date, { locale: localeObj });
}

function getStartOfMonth(date) {
  return Object(date_fns_startOfMonth__WEBPACK_IMPORTED_MODULE_39__["default"])(date);
}

function getStartOfToday() {
  return Object(date_fns_startOfDay__WEBPACK_IMPORTED_MODULE_37__["default"])(newDate());
}

// *** End of ***





function isSameYear(date1, date2) {
  if (date1 && date2) {
    return Object(date_fns_isSameYear__WEBPACK_IMPORTED_MODULE_47__["default"])(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return Object(date_fns_isSameMonth__WEBPACK_IMPORTED_MODULE_46__["default"])(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

function isSameDay(date1, date2) {
  if (date1 && date2) {
    return Object(date_fns_isSameDay__WEBPACK_IMPORTED_MODULE_45__["default"])(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

function isDayInRange(day, startDate, endDate) {
  var valid = void 0;
  try {
    valid = Object(date_fns_isWithinInterval__WEBPACK_IMPORTED_MODULE_50__["default"])(day, { start: startDate, end: endDate });
  } catch (err) {
    valid = false;
  }
  return valid;
}

// *** Diffing ***



// ** Date Localization **

function registerLocale(localeName, localeData) {
  if (!window.__localeData__) {
    window.__localeData__ = {};
  }
  window.__localeData__[localeName] = localeData;
}

function setDefaultLocale(localeName) {
  window.__localeId__ = localeName;
}

function getDefaultLocale() {
  return window.__localeId__;
}

function getLocaleObject(localeSpec) {
  if (typeof localeSpec === "string") {
    // Treat it as a locale name registered by registerLocale
    return window.__localeData__ ? window.__localeData__[localeSpec] : null;
  } else {
    // Treat it as a raw date-fns locale object
    return localeSpec;
  }
}

function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "EEEE", locale));
}

function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "EEEEEE", locale);
}

function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "EEE", locale);
}

function getMonthInLocale(month, locale) {
  return formatDate(Object(date_fns_setMonth__WEBPACK_IMPORTED_MODULE_29__["default"])(newDate(), month), "LLLL", locale);
}

function getMonthShortInLocale(month, locale) {
  return formatDate(Object(date_fns_setMonth__WEBPACK_IMPORTED_MODULE_29__["default"])(newDate(), month), "LLL", locale);
}

// ** Utils for some components **

function isDayDisabled(day) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref3.minDate,
      maxDate = _ref3.maxDate,
      excludeDates = _ref3.excludeDates,
      includeDates = _ref3.includeDates,
      filterDate = _ref3.filterDate;

  return isOutOfBounds(day, { minDate: minDate, maxDate: maxDate }) || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameDay(day, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameDay(day, includeDate);
  }) || filterDate && !filterDate(newDate(day)) || false;
}

function isMonthinRange(startDate, endDate, m, day) {
  var startDateYear = Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(startDate);
  var startDateMonth = Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(startDate);
  var endDateYear = Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(endDate);
  var endDateMonth = Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(endDate);
  var dayYear = Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateMonth <= m && m <= endDateMonth;
  } else if (startDateYear < endDateYear) {
    return dayYear === startDateYear && (startDateMonth <= m || endDateMonth < m) || dayYear === endDateYear && (startDateMonth > m || endDateMonth >= m) || dayYear < endDateYear && dayYear > startDateYear;
  }
}

function isOutOfBounds(day) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref4.minDate,
      maxDate = _ref4.maxDate;

  return minDate && Object(date_fns_differenceInCalendarDays__WEBPACK_IMPORTED_MODULE_33__["default"])(day, minDate) < 0 || maxDate && Object(date_fns_differenceInCalendarDays__WEBPACK_IMPORTED_MODULE_33__["default"])(day, maxDate) > 0;
}

function isTimeDisabled(time, disabledTimes) {
  var l = disabledTimes.length;
  for (var i = 0; i < l; i++) {
    if (Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(disabledTimes[i]) === Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(time) && Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(disabledTimes[i]) === Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(time)) {
      return true;
    }
  }

  return false;
}

function isTimeInDisabledRange(time, _ref5) {
  var minTime = _ref5.minTime,
      maxTime = _ref5.maxTime;

  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }
  var base = newDate();
  var baseTime = Object(date_fns_setHours__WEBPACK_IMPORTED_MODULE_28__["default"])(Object(date_fns_setMinutes__WEBPACK_IMPORTED_MODULE_27__["default"])(base, Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(time)), Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(time));
  var min$$1 = Object(date_fns_setHours__WEBPACK_IMPORTED_MODULE_28__["default"])(Object(date_fns_setMinutes__WEBPACK_IMPORTED_MODULE_27__["default"])(base, Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(minTime)), Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(minTime));
  var max$$1 = Object(date_fns_setHours__WEBPACK_IMPORTED_MODULE_28__["default"])(Object(date_fns_setMinutes__WEBPACK_IMPORTED_MODULE_27__["default"])(base, Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(maxTime)), Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(maxTime));

  var valid = void 0;
  try {
    valid = !Object(date_fns_isWithinInterval__WEBPACK_IMPORTED_MODULE_50__["default"])(baseTime, { start: min$$1, end: max$$1 });
  } catch (err) {
    valid = false;
  }
  return valid;
}

function monthDisabledBefore(day) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref6.minDate,
      includeDates = _ref6.includeDates;

  var previousMonth = Object(date_fns_subMonths__WEBPACK_IMPORTED_MODULE_16__["default"])(day, 1);
  return minDate && Object(date_fns_differenceInCalendarMonths__WEBPACK_IMPORTED_MODULE_34__["default"])(minDate, previousMonth) > 0 || includeDates && includeDates.every(function (includeDate) {
    return Object(date_fns_differenceInCalendarMonths__WEBPACK_IMPORTED_MODULE_34__["default"])(includeDate, previousMonth) > 0;
  }) || false;
}

function monthDisabledAfter(day) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref7.maxDate,
      includeDates = _ref7.includeDates;

  var nextMonth = Object(date_fns_addMonths__WEBPACK_IMPORTED_MODULE_10__["default"])(day, 1);
  return maxDate && Object(date_fns_differenceInCalendarMonths__WEBPACK_IMPORTED_MODULE_34__["default"])(nextMonth, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
    return Object(date_fns_differenceInCalendarMonths__WEBPACK_IMPORTED_MODULE_34__["default"])(nextMonth, includeDate) > 0;
  }) || false;
}

function getEffectiveMinDate(_ref8) {
  var minDate = _ref8.minDate,
      includeDates = _ref8.includeDates;

  if (includeDates && minDate) {
    var minDates = includeDates.filter(function (includeDate) {
      return Object(date_fns_differenceInCalendarDays__WEBPACK_IMPORTED_MODULE_33__["default"])(includeDate, minDate) >= 0;
    });
    return Object(date_fns_min__WEBPACK_IMPORTED_MODULE_31__["default"])(minDates);
  } else if (includeDates) {
    return Object(date_fns_min__WEBPACK_IMPORTED_MODULE_31__["default"])(includeDates);
  } else {
    return minDate;
  }
}

function getEffectiveMaxDate(_ref9) {
  var maxDate = _ref9.maxDate,
      includeDates = _ref9.includeDates;

  if (includeDates && maxDate) {
    var maxDates = includeDates.filter(function (includeDate) {
      return Object(date_fns_differenceInCalendarDays__WEBPACK_IMPORTED_MODULE_33__["default"])(includeDate, maxDate) <= 0;
    });
    return Object(date_fns_max__WEBPACK_IMPORTED_MODULE_32__["default"])(maxDates);
  } else if (includeDates) {
    return Object(date_fns_max__WEBPACK_IMPORTED_MODULE_32__["default"])(includeDates);
  } else {
    return maxDate;
  }
}

function getHightLightDaysMap() {
  var highlightDates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defaultClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "react-datepicker__day--highlighted";

  var dateClasses = new Map();
  for (var i = 0, len = highlightDates.length; i < len; i++) {
    var obj = highlightDates[i];
    if (Object(date_fns_isDate__WEBPACK_IMPORTED_MODULE_3__["default"])(obj)) {
      var key = formatDate(obj, "MM.dd.yyyy");
      var classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
      var keys = Object.keys(obj);
      var className = keys[0];
      var arrOfDates = obj[keys[0]];
      if (typeof className === "string" && arrOfDates.constructor === Array) {
        for (var k = 0, _len = arrOfDates.length; k < _len; k++) {
          var _key = formatDate(arrOfDates[k], "MM.dd.yyyy");
          var _classNamesArr = dateClasses.get(_key) || [];
          if (!_classNamesArr.includes(className)) {
            _classNamesArr.push(className);
            dateClasses.set(_key, _classNamesArr);
          }
        }
      }
    }
  }

  return dateClasses;
}

function timesToInjectAfter(startOfDay$$1, currentTime, currentMultiplier, intervals, injectedTimes) {
  var l = injectedTimes.length;
  var times = [];
  for (var i = 0; i < l; i++) {
    var injectedTime = Object(date_fns_addMinutes__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(date_fns_addHours__WEBPACK_IMPORTED_MODULE_7__["default"])(startOfDay$$1, Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(injectedTimes[i])), Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(injectedTimes[i]));
    var nextTime = Object(date_fns_addMinutes__WEBPACK_IMPORTED_MODULE_6__["default"])(startOfDay$$1, (currentMultiplier + 1) * intervals);

    if (Object(date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__["default"])(injectedTime, currentTime) && Object(date_fns_isBefore__WEBPACK_IMPORTED_MODULE_49__["default"])(injectedTime, nextTime)) {
      times.push(injectedTimes[i]);
    }
  }

  return times;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    var newYear = year + noOfYear - i;
    var isInRange = true;

    if (minDate) {
      isInRange = Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(minDate) <= newYear;
    }

    if (maxDate && isInRange) {
      isInRange = Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(maxDate) >= newYear;
    }

    if (isInRange) {
      list.push(newYear);
    }
  }

  return list;
}

var YearDropdownOptions = function (_React$Component) {
  inherits(YearDropdownOptions, _React$Component);

  function YearDropdownOptions(props) {
    classCallCheck(this, YearDropdownOptions);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.renderOptions = function () {
      var selectedYear = _this.props.year;
      var options = _this.state.yearsList.map(function (year) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          {
            className: selectedYear === year ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option",
            key: year,
            ref: year,
            onClick: _this.onChange.bind(_this, year)
          },
          selectedYear === year ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "span",
            { className: "react-datepicker__year-option--selected" },
            "\u2713"
          ) : "",
          year
        );
      });

      var minYear = _this.props.minDate ? Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(_this.props.minDate) : null;
      var maxYear = _this.props.maxDate ? Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(_this.props.maxDate) : null;

      if (!maxYear || !_this.state.yearsList.find(function (year) {
        return year === maxYear;
      })) {
        options.unshift(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          {
            className: "react-datepicker__year-option",
            ref: "upcoming",
            key: "upcoming",
            onClick: _this.incrementYears
          },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" })
        ));
      }

      if (!minYear || !_this.state.yearsList.find(function (year) {
        return year === minYear;
      })) {
        options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          {
            className: "react-datepicker__year-option",
            ref: "previous",
            key: "previous",
            onClick: _this.decrementYears
          },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" })
        ));
      }

      return options;
    };

    _this.onChange = function (year) {
      _this.props.onChange(year);
    };

    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };

    _this.shiftYears = function (amount) {
      var years = _this.state.yearsList.map(function (year) {
        return year + amount;
      });

      _this.setState({
        yearsList: years
      });
    };

    _this.incrementYears = function () {
      return _this.shiftYears(1);
    };

    _this.decrementYears = function () {
      return _this.shiftYears(-1);
    };

    var yearDropdownItemNumber = props.yearDropdownItemNumber,
        scrollableYearDropdown = props.scrollableYearDropdown;

    var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);

    _this.state = {
      yearsList: generateYears(_this.props.year, noOfYear, _this.props.minDate, _this.props.maxDate)
    };
    return _this;
  }

  YearDropdownOptions.prototype.render = function render() {
    var dropdownClass = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
      "react-datepicker__year-dropdown": true,
      "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown
    });

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      { className: dropdownClass },
      this.renderOptions()
    );
  };

  return YearDropdownOptions;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var WrappedYearDropdownOptions = Object(react_onclickoutside__WEBPACK_IMPORTED_MODULE_53__["default"])(YearDropdownOptions);

var YearDropdown = function (_React$Component) {
  inherits(YearDropdown, _React$Component);

  function YearDropdown() {
    var _temp, _this, _ret;

    classCallCheck(this, YearDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      dropdownVisible: false
    }, _this.renderSelectOptions = function () {
      var minYear = _this.props.minDate ? Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(_this.props.minDate) : 1900;
      var maxYear = _this.props.maxDate ? Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(_this.props.maxDate) : 2100;

      var options = [];
      for (var i = minYear; i <= maxYear; i++) {
        options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "option",
          { key: i, value: i },
          i
        ));
      }
      return options;
    }, _this.onSelectChange = function (e) {
      _this.onChange(e.target.value);
    }, _this.renderSelectMode = function () {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "select",
        {
          value: _this.props.year,
          className: "react-datepicker__year-select",
          onChange: _this.onSelectChange
        },
        _this.renderSelectOptions()
      );
    }, _this.renderReadView = function (visible) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__year-read-view",
          onClick: function onClick(event) {
            return _this.toggleDropdown(event);
          }
        },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "react-datepicker__year-read-view--down-arrow" }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "span",
          { className: "react-datepicker__year-read-view--selected-year" },
          _this.props.year
        )
      );
    }, _this.renderDropdown = function () {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedYearDropdownOptions, {
        key: "dropdown",
        ref: "options",
        year: _this.props.year,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        scrollableYearDropdown: _this.props.scrollableYearDropdown,
        yearDropdownItemNumber: _this.props.yearDropdownItemNumber
      });
    }, _this.renderScrollMode = function () {
      var dropdownVisible = _this.state.dropdownVisible;

      var result = [_this.renderReadView(!dropdownVisible)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }
      return result;
    }, _this.onChange = function (year) {
      _this.toggleDropdown();
      if (year === _this.props.year) return;
      _this.props.onChange(year);
    }, _this.toggleDropdown = function (event) {
      _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      }, function () {
        if (_this.props.adjustDateOnChange) {
          _this.handleYearChange(_this.props.date, event);
        }
      });
    }, _this.handleYearChange = function (date, event) {
      _this.onSelect(date, event);
      _this.setOpen();
    }, _this.onSelect = function (date, event) {
      if (_this.props.onSelect) {
        _this.props.onSelect(date, event);
      }
    }, _this.setOpen = function () {
      if (_this.props.setOpen) {
        _this.props.setOpen(true);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  YearDropdown.prototype.render = function render() {
    var renderedDropdown = void 0;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      {
        className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--" + this.props.dropdownMode
      },
      renderedDropdown
    );
  };

  return YearDropdown;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var MonthDropdownOptions = function (_React$Component) {
  inherits(MonthDropdownOptions, _React$Component);

  function MonthDropdownOptions() {
    var _temp, _this, _ret;

    classCallCheck(this, MonthDropdownOptions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderOptions = function () {
      return _this.props.monthNames.map(function (month, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          {
            className: _this.props.month === i ? "react-datepicker__month-option --selected_month" : "react-datepicker__month-option",
            key: month,
            ref: month,
            onClick: _this.onChange.bind(_this, i)
          },
          _this.props.month === i ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "span",
            { className: "react-datepicker__month-option--selected" },
            "\u2713"
          ) : "",
          month
        );
      });
    }, _this.onChange = function (month) {
      return _this.props.onChange(month);
    }, _this.handleClickOutside = function () {
      return _this.props.onCancel();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  MonthDropdownOptions.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      { className: "react-datepicker__month-dropdown" },
      this.renderOptions()
    );
  };

  return MonthDropdownOptions;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var WrappedMonthDropdownOptions = Object(react_onclickoutside__WEBPACK_IMPORTED_MODULE_53__["default"])(MonthDropdownOptions);

var MonthDropdown = function (_React$Component) {
  inherits(MonthDropdown, _React$Component);

  function MonthDropdown() {
    var _temp, _this, _ret;

    classCallCheck(this, MonthDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      dropdownVisible: false
    }, _this.renderSelectOptions = function (monthNames) {
      return monthNames.map(function (M, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "option",
          { key: i, value: i },
          M
        );
      });
    }, _this.renderSelectMode = function (monthNames) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "select",
        {
          value: _this.props.month,
          className: "react-datepicker__month-select",
          onChange: function onChange(e) {
            return _this.onChange(e.target.value);
          }
        },
        _this.renderSelectOptions(monthNames)
      );
    }, _this.renderReadView = function (visible, monthNames) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-read-view",
          onClick: _this.toggleDropdown
        },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "react-datepicker__month-read-view--down-arrow" }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "span",
          { className: "react-datepicker__month-read-view--selected-month" },
          monthNames[_this.props.month]
        )
      );
    }, _this.renderDropdown = function (monthNames) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedMonthDropdownOptions, {
        key: "dropdown",
        ref: "options",
        month: _this.props.month,
        monthNames: monthNames,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown
      });
    }, _this.renderScrollMode = function (monthNames) {
      var dropdownVisible = _this.state.dropdownVisible;

      var result = [_this.renderReadView(!dropdownVisible, monthNames)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown(monthNames));
      }
      return result;
    }, _this.onChange = function (month) {
      _this.toggleDropdown();
      if (month !== _this.props.month) {
        _this.props.onChange(month);
      }
    }, _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  MonthDropdown.prototype.render = function render() {
    var _this2 = this;

    var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown ? function (M) {
      return getMonthShortInLocale(M, _this2.props.locale);
    } : function (M) {
      return getMonthInLocale(M, _this2.props.locale);
    });

    var renderedDropdown = void 0;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode(monthNames);
        break;
      case "select":
        renderedDropdown = this.renderSelectMode(monthNames);
        break;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      {
        className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--" + this.props.dropdownMode
      },
      renderedDropdown
    );
  };

  return MonthDropdown;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function generateMonthYears(minDate, maxDate) {
  var list = [];

  var currDate = getStartOfMonth(minDate);
  var lastDate = getStartOfMonth(maxDate);

  while (!Object(date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__["default"])(currDate, lastDate)) {
    list.push(newDate(currDate));

    currDate = Object(date_fns_addMonths__WEBPACK_IMPORTED_MODULE_10__["default"])(currDate, 1);
  }
  return list;
}

var MonthYearDropdownOptions = function (_React$Component) {
  inherits(MonthYearDropdownOptions, _React$Component);

  function MonthYearDropdownOptions(props) {
    classCallCheck(this, MonthYearDropdownOptions);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.renderOptions = function () {
      return _this.state.monthYearsList.map(function (monthYear) {
        var monthYearPoint = Object(date_fns_getTime__WEBPACK_IMPORTED_MODULE_25__["default"])(monthYear);
        var isSameMonthYear = isSameYear(_this.props.date, monthYear) && isSameMonth(_this.props.date, monthYear);

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          {
            className: isSameMonthYear ? "react-datepicker__month-year-option --selected_month-year" : "react-datepicker__month-year-option",
            key: monthYearPoint,
            ref: monthYearPoint,
            onClick: _this.onChange.bind(_this, monthYearPoint)
          },
          isSameMonthYear ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "span",
            { className: "react-datepicker__month-year-option--selected" },
            "\u2713"
          ) : "",
          formatDate(monthYear, _this.props.dateFormat)
        );
      });
    };

    _this.onChange = function (monthYear) {
      return _this.props.onChange(monthYear);
    };

    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };

    _this.state = {
      monthYearsList: generateMonthYears(_this.props.minDate, _this.props.maxDate)
    };
    return _this;
  }

  MonthYearDropdownOptions.prototype.render = function render() {
    var dropdownClass = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
      "react-datepicker__month-year-dropdown": true,
      "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown
    });

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      { className: dropdownClass },
      this.renderOptions()
    );
  };

  return MonthYearDropdownOptions;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var WrappedMonthYearDropdownOptions = Object(react_onclickoutside__WEBPACK_IMPORTED_MODULE_53__["default"])(MonthYearDropdownOptions);

var MonthYearDropdown = function (_React$Component) {
  inherits(MonthYearDropdown, _React$Component);

  function MonthYearDropdown() {
    var _temp, _this, _ret;

    classCallCheck(this, MonthYearDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      dropdownVisible: false
    }, _this.renderSelectOptions = function () {
      var currDate = getStartOfMonth(_this.props.minDate);
      var lastDate = getStartOfMonth(_this.props.maxDate);
      var options = [];

      while (!Object(date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__["default"])(currDate, lastDate)) {
        var timepoint = Object(date_fns_getTime__WEBPACK_IMPORTED_MODULE_25__["default"])(currDate);
        options.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "option",
          { key: timepoint, value: timepoint },
          formatDate(currDate, _this.props.dateFormat, _this.props.locale)
        ));

        currDate = Object(date_fns_addMonths__WEBPACK_IMPORTED_MODULE_10__["default"])(currDate, 1);
      }

      return options;
    }, _this.onSelectChange = function (e) {
      _this.onChange(e.target.value);
    }, _this.renderSelectMode = function () {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "select",
        {
          value: Object(date_fns_getTime__WEBPACK_IMPORTED_MODULE_25__["default"])(getStartOfMonth(_this.props.date)),
          className: "react-datepicker__month-year-select",
          onChange: _this.onSelectChange
        },
        _this.renderSelectOptions()
      );
    }, _this.renderReadView = function (visible) {
      var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-year-read-view",
          onClick: function onClick(event) {
            return _this.toggleDropdown(event);
          }
        },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "span",
          { className: "react-datepicker__month-year-read-view--selected-month-year" },
          yearMonth
        )
      );
    }, _this.renderDropdown = function () {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedMonthYearDropdownOptions, {
        key: "dropdown",
        ref: "options",
        date: _this.props.date,
        dateFormat: _this.props.dateFormat,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown
      });
    }, _this.renderScrollMode = function () {
      var dropdownVisible = _this.state.dropdownVisible;

      var result = [_this.renderReadView(!dropdownVisible)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }
      return result;
    }, _this.onChange = function (monthYearPoint) {
      _this.toggleDropdown();

      var changedDate = newDate(parseInt(monthYearPoint));

      if (isSameYear(_this.props.date, changedDate) && isSameMonth(_this.props.date, changedDate)) {
        return;
      }

      _this.props.onChange(changedDate);
    }, _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  MonthYearDropdown.prototype.render = function render() {
    var renderedDropdown = void 0;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      {
        className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--" + this.props.dropdownMode
      },
      renderedDropdown
    );
  };

  return MonthYearDropdown;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var Day = function (_React$Component) {
  inherits(Day, _React$Component);

  function Day() {
    var _temp, _this, _ret;

    classCallCheck(this, Day);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (!_this.isDisabled() && _this.props.onClick) {
        _this.props.onClick(event);
      }
    }, _this.handleMouseEnter = function (event) {
      if (!_this.isDisabled() && _this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    }, _this.isSameDay = function (other) {
      return isSameDay(_this.props.day, other);
    }, _this.isKeyboardSelected = function () {
      return !_this.props.disabledKeyboardNavigation && !_this.props.inline && !_this.isSameDay(_this.props.selected) && _this.isSameDay(_this.props.preSelection);
    }, _this.isDisabled = function () {
      return isDayDisabled(_this.props.day, _this.props);
    }, _this.getHighLightedClass = function (defaultClassName) {
      var _this$props = _this.props,
          day = _this$props.day,
          highlightDates = _this$props.highlightDates;


      if (!highlightDates) {
        return false;
      }

      // Looking for className in the Map of {'day string, 'className'}
      var dayStr = formatDate(day, "MM.dd.yyyy");
      return highlightDates.get(dayStr);
    }, _this.isInRange = function () {
      var _this$props2 = _this.props,
          day = _this$props2.day,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate;

      if (!startDate || !endDate) {
        return false;
      }
      return isDayInRange(day, startDate, endDate);
    }, _this.isInSelectingRange = function () {
      var _this$props3 = _this.props,
          day = _this$props3.day,
          selectsStart = _this$props3.selectsStart,
          selectsEnd = _this$props3.selectsEnd,
          selectingDate = _this$props3.selectingDate,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate;


      if (!(selectsStart || selectsEnd) || !selectingDate || _this.isDisabled()) {
        return false;
      }

      if (selectsStart && endDate && (Object(date_fns_isBefore__WEBPACK_IMPORTED_MODULE_49__["default"])(selectingDate, endDate) || Object(date_fns_isEqual__WEBPACK_IMPORTED_MODULE_43__["default"])(selectingDate, endDate))) {
        return isDayInRange(day, selectingDate, endDate);
      }

      if (selectsEnd && startDate && (Object(date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__["default"])(selectingDate, startDate) || Object(date_fns_isEqual__WEBPACK_IMPORTED_MODULE_43__["default"])(selectingDate, startDate))) {
        return isDayInRange(day, startDate, selectingDate);
      }

      return false;
    }, _this.isSelectingRangeStart = function () {
      if (!_this.isInSelectingRange()) {
        return false;
      }

      var _this$props4 = _this.props,
          day = _this$props4.day,
          selectingDate = _this$props4.selectingDate,
          startDate = _this$props4.startDate,
          selectsStart = _this$props4.selectsStart;


      if (selectsStart) {
        return isSameDay(day, selectingDate);
      } else {
        return isSameDay(day, startDate);
      }
    }, _this.isSelectingRangeEnd = function () {
      if (!_this.isInSelectingRange()) {
        return false;
      }

      var _this$props5 = _this.props,
          day = _this$props5.day,
          selectingDate = _this$props5.selectingDate,
          endDate = _this$props5.endDate,
          selectsEnd = _this$props5.selectsEnd;


      if (selectsEnd) {
        return isSameDay(day, selectingDate);
      } else {
        return isSameDay(day, endDate);
      }
    }, _this.isRangeStart = function () {
      var _this$props6 = _this.props,
          day = _this$props6.day,
          startDate = _this$props6.startDate,
          endDate = _this$props6.endDate;

      if (!startDate || !endDate) {
        return false;
      }
      return isSameDay(startDate, day);
    }, _this.isRangeEnd = function () {
      var _this$props7 = _this.props,
          day = _this$props7.day,
          startDate = _this$props7.startDate,
          endDate = _this$props7.endDate;

      if (!startDate || !endDate) {
        return false;
      }
      return isSameDay(endDate, day);
    }, _this.isWeekend = function () {
      var weekday = Object(date_fns_getDay__WEBPACK_IMPORTED_MODULE_21__["default"])(_this.props.day);
      return weekday === 0 || weekday === 6;
    }, _this.isOutsideMonth = function () {
      return _this.props.month !== undefined && _this.props.month !== Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(_this.props.day);
    }, _this.getClassNames = function (date) {
      var dayClassName = _this.props.dayClassName ? _this.props.dayClassName(date) : undefined;
      return classnames__WEBPACK_IMPORTED_MODULE_2___default()("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
        "react-datepicker__day--disabled": _this.isDisabled(),
        "react-datepicker__day--selected": _this.isSameDay(_this.props.selected),
        "react-datepicker__day--keyboard-selected": _this.isKeyboardSelected(),
        "react-datepicker__day--range-start": _this.isRangeStart(),
        "react-datepicker__day--range-end": _this.isRangeEnd(),
        "react-datepicker__day--in-range": _this.isInRange(),
        "react-datepicker__day--in-selecting-range": _this.isInSelectingRange(),
        "react-datepicker__day--selecting-range-start": _this.isSelectingRangeStart(),
        "react-datepicker__day--selecting-range-end": _this.isSelectingRangeEnd(),
        "react-datepicker__day--today": _this.isSameDay(newDate()),
        "react-datepicker__day--weekend": _this.isWeekend(),
        "react-datepicker__day--outside-month": _this.isOutsideMonth()
      }, _this.getHighLightedClass("react-datepicker__day--highlighted"));
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Day.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      {
        className: this.getClassNames(this.props.day),
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        "aria-label": "day-" + Object(date_fns_getDate__WEBPACK_IMPORTED_MODULE_22__["default"])(this.props.day),
        role: "option"
      },
      this.props.renderDayContents ? this.props.renderDayContents(Object(date_fns_getDate__WEBPACK_IMPORTED_MODULE_22__["default"])(this.props.day), this.props.day) : Object(date_fns_getDate__WEBPACK_IMPORTED_MODULE_22__["default"])(this.props.day)
    );
  };

  return Day;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var WeekNumber = function (_React$Component) {
  inherits(WeekNumber, _React$Component);

  function WeekNumber() {
    var _temp, _this, _ret;

    classCallCheck(this, WeekNumber);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  WeekNumber.prototype.render = function render() {
    var weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!this.props.onClick
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(weekNumberClasses),
        "aria-label": "week-" + this.props.weekNumber,
        onClick: this.handleClick
      },
      this.props.weekNumber
    );
  };

  return WeekNumber;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var Week = function (_React$Component) {
  inherits(Week, _React$Component);

  function Week() {
    var _temp, _this, _ret;

    classCallCheck(this, Week);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleDayClick = function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    }, _this.handleDayMouseEnter = function (day) {
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    }, _this.handleWeekClick = function (day, weekNumber, event) {
      if (typeof _this.props.onWeekSelect === "function") {
        _this.props.onWeekSelect(day, weekNumber, event);
      }
      if (_this.props.shouldCloseOnSelect) {
        _this.props.setOpen(false);
      }
    }, _this.formatWeekNumber = function (date) {
      if (_this.props.formatWeekNumber) {
        return _this.props.formatWeekNumber(date);
      }
      return getWeek(date);
    }, _this.renderDays = function () {
      var startOfWeek$$1 = getStartOfWeek(_this.props.day, _this.props.locale);
      var days = [];
      var weekNumber = _this.formatWeekNumber(startOfWeek$$1);
      if (_this.props.showWeekNumber) {
        var onClickAction = _this.props.onWeekSelect ? _this.handleWeekClick.bind(_this, startOfWeek$$1, weekNumber) : undefined;
        days.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WeekNumber, { key: "W", weekNumber: weekNumber, onClick: onClickAction }));
      }
      return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = Object(date_fns_addDays__WEBPACK_IMPORTED_MODULE_8__["default"])(startOfWeek$$1, offset);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Day, {
          key: offset,
          day: day,
          month: _this.props.month,
          onClick: _this.handleDayClick.bind(_this, day),
          onMouseEnter: _this.handleDayMouseEnter.bind(_this, day),
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          inline: _this.props.inline,
          highlightDates: _this.props.highlightDates,
          selectingDate: _this.props.selectingDate,
          filterDate: _this.props.filterDate,
          preSelection: _this.props.preSelection,
          selected: _this.props.selected,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          dayClassName: _this.props.dayClassName,
          renderDayContents: _this.props.renderDayContents,
          disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation
        });
      }));
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Week.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      { className: "react-datepicker__week" },
      this.renderDays()
    );
  };

  createClass(Week, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        shouldCloseOnSelect: true
      };
    }
  }]);
  return Week;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;

var Month = function (_React$Component) {
  inherits(Month, _React$Component);

  function Month() {
    var _temp, _this, _ret;

    classCallCheck(this, Month);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleDayClick = function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event, _this.props.orderInDisplay);
      }
    }, _this.handleDayMouseEnter = function (day) {
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    }, _this.handleMouseLeave = function () {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave();
      }
    }, _this.isWeekInMonth = function (startOfWeek$$1) {
      var day = _this.props.day;
      var endOfWeek$$1 = Object(date_fns_addDays__WEBPACK_IMPORTED_MODULE_8__["default"])(startOfWeek$$1, 6);
      return isSameMonth(startOfWeek$$1, day) || isSameMonth(endOfWeek$$1, day);
    }, _this.renderWeeks = function () {
      var weeks = [];
      var isFixedHeight = _this.props.fixedHeight;
      var currentWeekStart = getStartOfWeek(getStartOfMonth(_this.props.day), _this.props.locale);
      var i = 0;
      var breakAfterNextPush = false;

      while (true) {
        weeks.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Week, {
          key: i,
          day: currentWeekStart,
          month: Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(_this.props.day),
          onDayClick: _this.handleDayClick,
          onDayMouseEnter: _this.handleDayMouseEnter,
          onWeekSelect: _this.props.onWeekSelect,
          formatWeekNumber: _this.props.formatWeekNumber,
          locale: _this.props.locale,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          inline: _this.props.inline,
          highlightDates: _this.props.highlightDates,
          selectingDate: _this.props.selectingDate,
          filterDate: _this.props.filterDate,
          preSelection: _this.props.preSelection,
          selected: _this.props.selected,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          showWeekNumber: _this.props.showWeekNumbers,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          dayClassName: _this.props.dayClassName,
          setOpen: _this.props.setOpen,
          shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
          disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
          renderDayContents: _this.props.renderDayContents
        }));

        if (breakAfterNextPush) break;

        i++;
        currentWeekStart = Object(date_fns_addWeeks__WEBPACK_IMPORTED_MODULE_9__["default"])(currentWeekStart, 1);

        // If one of these conditions is true, we will either break on this week
        // or break on the next week
        var isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
        var isNonFixedAndOutOfMonth = !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);

        if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
          if (_this.props.peekNextMonth) {
            breakAfterNextPush = true;
          } else {
            break;
          }
        }
      }

      return weeks;
    }, _this.onMonthClick = function (e, m) {
      _this.handleDayClick(getStartOfMonth(Object(date_fns_setMonth__WEBPACK_IMPORTED_MODULE_29__["default"])(_this.props.day, m), e));
    }, _this.getMonthClassNames = function (m) {
      var _this$props = _this.props,
          day = _this$props.day,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate,
          selected = _this$props.selected,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate;


      return classnames__WEBPACK_IMPORTED_MODULE_2___default()("react-datepicker__month-text", "react-datepicker__month-" + m, {
        "react-datepicker__month--disabled": minDate && maxDate && !isMonthinRange(minDate, maxDate, m, day),
        "react-datepicker__month--selected": Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(day) === m && Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(day) === Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(selected),
        "react-datepicker__month--in-range": isMonthinRange(startDate, endDate, m, day)
      });
    }, _this.renderMonths = function () {
      var months = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];
      return months.map(function (month, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { className: "react-datepicker__month-wrapper", key: i },
          month.map(function (m, j) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              "div",
              {
                key: j,
                onClick: function onClick(ev) {
                  _this.onMonthClick(ev.target, m);
                },
                className: _this.getMonthClassNames(m)
              },
              getMonthShortInLocale(m, _this.props.locale)
            );
          })
        );
      });
    }, _this.getClassNames = function () {
      var _this$props2 = _this.props,
          selectingDate = _this$props2.selectingDate,
          selectsStart = _this$props2.selectsStart,
          selectsEnd = _this$props2.selectsEnd,
          showMonthYearPicker = _this$props2.showMonthYearPicker;

      return classnames__WEBPACK_IMPORTED_MODULE_2___default()("react-datepicker__month", {
        "react-datepicker__month--selecting-range": selectingDate && (selectsStart || selectsEnd)
      }, { "react-datepicker__monthPicker": showMonthYearPicker });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Month.prototype.render = function render() {
    var showMonthYearPicker = this.props.showMonthYearPicker;

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      {
        className: this.getClassNames(),
        onMouseLeave: this.handleMouseLeave,
        role: "listbox",
        "aria-label": "month-" + formatDate(this.props.day, "YYYY-MM")
      },
      showMonthYearPicker ? this.renderMonths() : this.renderWeeks()
    );
  };

  return Month;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var Time = function (_React$Component) {
  inherits(Time, _React$Component);

  function Time() {
    var _temp, _this, _ret;

    classCallCheck(this, Time);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (time) {
      if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || _this.props.excludeTimes && isTimeDisabled(time, _this.props.excludeTimes) || _this.props.includeTimes && !isTimeDisabled(time, _this.props.includeTimes)) {
        return;
      }
      _this.props.onChange(time);
    }, _this.liClasses = function (time, currH, currM) {
      var classes = ["react-datepicker__time-list-item"];

      if (currH === Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(time) && currM === Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(time)) {
        classes.push("react-datepicker__time-list-item--selected");
      }
      if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || _this.props.excludeTimes && isTimeDisabled(time, _this.props.excludeTimes) || _this.props.includeTimes && !isTimeDisabled(time, _this.props.includeTimes)) {
        classes.push("react-datepicker__time-list-item--disabled");
      }
      if (_this.props.injectTimes && (Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(time) * 60 + Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(time)) % _this.props.intervals !== 0) {
        classes.push("react-datepicker__time-list-item--injected");
      }

      return classes.join(" ");
    }, _this.renderTimes = function () {
      var times = [];
      var format$$1 = _this.props.format ? _this.props.format : "p";
      var intervals = _this.props.intervals;
      var activeTime = _this.props.selected ? _this.props.selected : newDate();
      var currH = Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(activeTime);
      var currM = Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(activeTime);
      var base = getStartOfDay(newDate());
      var multiplier = 1440 / intervals;
      var sortedInjectTimes = _this.props.injectTimes && _this.props.injectTimes.sort(function (a, b) {
        return a - b;
      });
      for (var i = 0; i < multiplier; i++) {
        var currentTime = Object(date_fns_addMinutes__WEBPACK_IMPORTED_MODULE_6__["default"])(base, i * intervals);
        times.push(currentTime);

        if (sortedInjectTimes) {
          var timesToInject = timesToInjectAfter(base, currentTime, i, intervals, sortedInjectTimes);
          times = times.concat(timesToInject);
        }
      }

      return times.map(function (time, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "li",
          {
            key: i,
            onClick: _this.handleClick.bind(_this, time),
            className: _this.liClasses(time, currH, currM),
            ref: function ref(li) {
              if (currH === Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(time) && currM === Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(time) || currH === Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(time) && !_this.centerLi) {
                _this.centerLi = li;
              }
            }
          },
          formatDate(time, format$$1)
        );
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Time.prototype.componentDidMount = function componentDidMount() {
    // code to ensure selected time will always be in focus within time window when it first appears
    this.list.scrollTop = Time.calcCenterPosition(this.props.monthRef ? this.props.monthRef.clientHeight - this.header.clientHeight : this.list.clientHeight, this.centerLi);
  };

  Time.prototype.render = function render() {
    var _this2 = this;

    var height = null;
    if (this.props.monthRef && this.header) {
      height = this.props.monthRef.clientHeight - this.header.clientHeight;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      {
        className: "react-datepicker__time-container " + (this.props.todayButton ? "react-datepicker__time-container--with-today-button" : "")
      },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        {
          className: "react-datepicker__header react-datepicker__header--time",
          ref: function ref(header) {
            _this2.header = header;
          }
        },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { className: "react-datepicker-time__header" },
          this.props.timeCaption
        )
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: "react-datepicker__time" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { className: "react-datepicker__time-box" },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "ul",
            {
              className: "react-datepicker__time-list",
              ref: function ref(list) {
                _this2.list = list;
              },
              style: height ? { height: height } : {}
            },
            this.renderTimes.bind(this)()
          )
        )
      )
    );
  };

  createClass(Time, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        intervals: 30,
        onTimeChange: function onTimeChange() {},
        todayButton: null,
        timeCaption: "Time"
      };
    }
  }]);
  return Time;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Time.calcCenterPosition = function (listHeight, centerLiRef) {
  return centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2);
};

var inputTime = function (_React$Component) {
  inherits(inputTime, _React$Component);

  function inputTime(props) {
    classCallCheck(this, inputTime);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onTimeChange = function (time) {
      _this.setState({ time: time });
      var date = new Date();
      date.setHours(time.split(":")[0]);
      date.setMinutes(time.split(":")[1]);
      _this.props.onChange(date);
    };

    _this.state = {
      time: _this.props.timeString
    };
    return _this;
  }

  inputTime.prototype.render = function render() {
    var _this2 = this;

    var time = this.state.time;
    var timeString = this.props.timeString;

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "div",
      { className: "react-datepicker__input-time-container" },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: "react-datepicker-time__caption" },
        this.props.timeInputLabel
      ),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: "react-datepicker-time__input-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { className: "react-datepicker-time__input" },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "time",
            className: "react-datepicker-time__input",
            placeholder: "Time",
            name: "time-input",
            required: true,
            value: time,
            onChange: function onChange(ev) {
              _this2.onTimeChange(ev.target.value || timeString);
            }
          })
        )
      )
    );
  };

  return inputTime;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function CalendarContainer(_ref) {
  var className = _ref.className,
      children = _ref.children,
      _ref$arrowProps = _ref.arrowProps,
      arrowProps = _ref$arrowProps === undefined ? {} : _ref$arrowProps;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    "div",
    { className: className },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({ className: "react-datepicker__triangle" }, arrowProps)),
    children
  );
}

var DROPDOWN_FOCUS_CLASSNAMES = ["react-datepicker__year-select", "react-datepicker__month-select", "react-datepicker__month-year-select"];

var isDropdownSelect = function isDropdownSelect() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};

var Calendar = function (_React$Component) {
  inherits(Calendar, _React$Component);
  createClass(Calendar, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        onDropdownFocus: function onDropdownFocus() {},
        monthsShown: 1,
        monthSelectedIn: 0,
        forceShowMonthNavigation: false,
        timeCaption: "Time",
        previousYearButtonLabel: "Previous Year",
        nextYearButtonLabel: "Next Year",
        previousMonthButtonLabel: "Previous Month",
        nextMonthButtonLabel: "Next Month"
      };
    }
  }]);

  function Calendar(props) {
    classCallCheck(this, Calendar);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleClickOutside = function (event) {
      _this.props.onClickOutside(event);
    };

    _this.handleDropdownFocus = function (event) {
      if (isDropdownSelect(event.target)) {
        _this.props.onDropdownFocus();
      }
    };

    _this.getDateInView = function () {
      var _this$props = _this.props,
          preSelection = _this$props.preSelection,
          selected = _this$props.selected,
          openToDate = _this$props.openToDate;

      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var current = newDate();
      var initialDate = openToDate || selected || preSelection;
      if (initialDate) {
        return initialDate;
      } else {
        if (minDate && Object(date_fns_isBefore__WEBPACK_IMPORTED_MODULE_49__["default"])(current, minDate)) {
          return minDate;
        } else if (maxDate && Object(date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__["default"])(current, maxDate)) {
          return maxDate;
        }
      }
      return current;
    };

    _this.increaseMonth = function () {
      _this.setState({
        date: Object(date_fns_addMonths__WEBPACK_IMPORTED_MODULE_10__["default"])(_this.state.date, 1)
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.decreaseMonth = function () {
      _this.setState({
        date: Object(date_fns_subMonths__WEBPACK_IMPORTED_MODULE_16__["default"])(_this.state.date, 1)
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.handleDayClick = function (day, event, monthSelectedIn) {
      return _this.props.onSelect(day, event, monthSelectedIn);
    };

    _this.handleDayMouseEnter = function (day) {
      _this.setState({ selectingDate: day });
      _this.props.onDayMouseEnter && _this.props.onDayMouseEnter(day);
    };

    _this.handleMonthMouseLeave = function () {
      _this.setState({ selectingDate: null });
      _this.props.onMonthMouseLeave && _this.props.onMonthMouseLeave();
    };

    _this.handleYearChange = function (date) {
      if (_this.props.onYearChange) {
        _this.props.onYearChange(date);
      }
    };

    _this.handleMonthChange = function (date) {
      if (_this.props.onMonthChange) {
        _this.props.onMonthChange(date);
      }
      if (_this.props.adjustDateOnChange) {
        if (_this.props.onSelect) {
          _this.props.onSelect(date);
        }
        if (_this.props.setOpen) {
          _this.props.setOpen(true);
        }
      }
    };

    _this.handleMonthYearChange = function (date) {
      _this.handleYearChange(date);
      _this.handleMonthChange(date);
    };

    _this.changeYear = function (year) {
      _this.setState({
        date: Object(date_fns_setYear__WEBPACK_IMPORTED_MODULE_30__["default"])(_this.state.date, year)
      }, function () {
        return _this.handleYearChange(_this.state.date);
      });
    };

    _this.changeMonth = function (month) {
      _this.setState({
        date: Object(date_fns_setMonth__WEBPACK_IMPORTED_MODULE_29__["default"])(_this.state.date, month)
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.changeMonthYear = function (monthYear) {
      _this.setState({
        date: Object(date_fns_setYear__WEBPACK_IMPORTED_MODULE_30__["default"])(Object(date_fns_setMonth__WEBPACK_IMPORTED_MODULE_29__["default"])(_this.state.date, Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(monthYear)), Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(monthYear))
      }, function () {
        return _this.handleMonthYearChange(_this.state.date);
      });
    };

    _this.header = function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

      var startOfWeek$$1 = getStartOfWeek(date, _this.props.locale);
      var dayNames = [];
      if (_this.props.showWeekNumbers) {
        dayNames.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { key: "W", className: "react-datepicker__day-name" },
          _this.props.weekLabel || "#"
        ));
      }
      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = Object(date_fns_addDays__WEBPACK_IMPORTED_MODULE_8__["default"])(startOfWeek$$1, offset);
        var weekDayName = _this.formatWeekday(day, _this.props.locale);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { key: offset, className: "react-datepicker__day-name" },
          weekDayName
        );
      }));
    };

    _this.formatWeekday = function (day, locale) {
      if (_this.props.formatWeekDay) {
        return getFormattedWeekdayInLocale(day, _this.props.formatWeekDay, locale);
      }
      return _this.props.useWeekdaysShort ? getWeekdayShortInLocale(day, locale) : getWeekdayMinInLocale(day, locale);
    };

    _this.decreaseYear = function () {
      _this.setState({
        date: Object(date_fns_subYears__WEBPACK_IMPORTED_MODULE_17__["default"])(_this.state.date, 1)
      }, function () {
        return _this.handleYearChange(_this.state.date);
      });
    };

    _this.renderPreviousButton = function () {
      if (_this.props.renderCustomHeader) {
        return;
      }

      var allPrevDaysDisabled = monthDisabledBefore(_this.state.date, _this.props);

      if (!_this.props.forceShowMonthNavigation && !_this.props.showDisabledMonthNavigation && allPrevDaysDisabled || _this.props.showTimeSelectOnly) {
        return;
      }

      var classes = ["react-datepicker__navigation", "react-datepicker__navigation--previous"];

      var clickHandler = _this.decreaseMonth;

      if (_this.props.showMonthYearPicker) {
        clickHandler = _this.decreaseYear;
      }

      if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--previous--disabled");
        clickHandler = null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler
        },
        _this.props.showMonthYearPicker ? _this.props.previousYearButtonLabel : _this.props.previousMonthButtonLabel
      );
    };

    _this.increaseYear = function () {
      _this.setState({
        date: Object(date_fns_addYears__WEBPACK_IMPORTED_MODULE_11__["default"])(_this.state.date, 1)
      }, function () {
        return _this.handleYearChange(_this.state.date);
      });
    };

    _this.renderNextButton = function () {
      if (_this.props.renderCustomHeader) {
        return;
      }

      var allNextDaysDisabled = monthDisabledAfter(_this.state.date, _this.props);

      if (!_this.props.forceShowMonthNavigation && !_this.props.showDisabledMonthNavigation && allNextDaysDisabled || _this.props.showTimeSelectOnly) {
        return;
      }

      var classes = ["react-datepicker__navigation", "react-datepicker__navigation--next"];
      if (_this.props.showTimeSelect) {
        classes.push("react-datepicker__navigation--next--with-time");
      }
      if (_this.props.todayButton) {
        classes.push("react-datepicker__navigation--next--with-today-button");
      }

      var clickHandler = _this.increaseMonth;

      if (_this.props.showMonthYearPicker) {
        clickHandler = _this.increaseYear;
      }

      if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--next--disabled");
        clickHandler = null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler
        },
        _this.props.showMonthYearPicker ? _this.props.nextYearButtonLabel : _this.props.nextMonthButtonLabel
      );
    };

    _this.renderCurrentMonth = function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

      var classes = ["react-datepicker__current-month"];

      if (_this.props.showYearDropdown) {
        classes.push("react-datepicker__current-month--hasYearDropdown");
      }
      if (_this.props.showMonthDropdown) {
        classes.push("react-datepicker__current-month--hasMonthDropdown");
      }
      if (_this.props.showMonthYearDropdown) {
        classes.push("react-datepicker__current-month--hasMonthYearDropdown");
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: classes.join(" ") },
        formatDate(date, _this.props.dateFormat, _this.props.locale)
      );
    };

    _this.renderYearDropdown = function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showYearDropdown || overrideHide) {
        return;
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(YearDropdown, {
        adjustDateOnChange: _this.props.adjustDateOnChange,
        date: _this.state.date,
        onSelect: _this.props.onSelect,
        setOpen: _this.props.setOpen,
        dropdownMode: _this.props.dropdownMode,
        onChange: _this.changeYear,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        year: Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(_this.state.date),
        scrollableYearDropdown: _this.props.scrollableYearDropdown,
        yearDropdownItemNumber: _this.props.yearDropdownItemNumber
      });
    };

    _this.renderMonthDropdown = function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showMonthDropdown || overrideHide) {
        return;
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MonthDropdown, {
        dropdownMode: _this.props.dropdownMode,
        locale: _this.props.locale,
        onChange: _this.changeMonth,
        month: Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(_this.state.date),
        useShortMonthInDropdown: _this.props.useShortMonthInDropdown
      });
    };

    _this.renderMonthYearDropdown = function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showMonthYearDropdown || overrideHide) {
        return;
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MonthYearDropdown, {
        dropdownMode: _this.props.dropdownMode,
        locale: _this.props.locale,
        dateFormat: _this.props.dateFormat,
        onChange: _this.changeMonthYear,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        date: _this.state.date,
        scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown
      });
    };

    _this.renderTodayButton = function () {
      if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
        return;
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        {
          className: "react-datepicker__today-button",
          onClick: function onClick(e) {
            return _this.props.onSelect(getStartOfToday(), e);
          }
        },
        _this.props.todayButton
      );
    };

    _this.renderDefaultHeader = function (_ref) {
      var monthDate = _ref.monthDate,
          i = _ref.i;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: "react-datepicker__header" },
        _this.renderCurrentMonth(monthDate),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          {
            className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--" + _this.props.dropdownMode,
            onFocus: _this.handleDropdownFocus
          },
          _this.renderMonthDropdown(i !== 0),
          _this.renderMonthYearDropdown(i !== 0),
          _this.renderYearDropdown(i !== 0)
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { className: "react-datepicker__day-names" },
          _this.header(monthDate)
        )
      );
    };

    _this.renderCustomHeader = function (_ref2) {
      var monthDate = _ref2.monthDate,
          i = _ref2.i;

      if (i !== 0) {
        return null;
      }

      var prevMonthButtonDisabled = monthDisabledBefore(_this.state.date, _this.props);

      var nextMonthButtonDisabled = monthDisabledAfter(_this.state.date, _this.props);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        {
          className: "react-datepicker__header react-datepicker__header--custom",
          onFocus: _this.props.onDropdownFocus
        },
        _this.props.renderCustomHeader(_extends({}, _this.state, {
          changeMonth: _this.changeMonth,
          changeYear: _this.changeYear,
          decreaseMonth: _this.decreaseMonth,
          increaseMonth: _this.increaseMonth,
          prevMonthButtonDisabled: prevMonthButtonDisabled,
          nextMonthButtonDisabled: nextMonthButtonDisabled
        })),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { className: "react-datepicker__day-names" },
          _this.header(monthDate)
        )
      );
    };

    _this.renderYearHeader = function () {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: "react-datepicker__header react-datepicker-year-header" },
        Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(_this.state.date)
      );
    };

    _this.renderMonths = function () {
      if (_this.props.showTimeSelectOnly) {
        return;
      }

      var monthList = [];
      for (var i = 0; i < _this.props.monthsShown; ++i) {
        var monthsToAdd = i - _this.props.monthSelectedIn;
        var monthDate = Object(date_fns_addMonths__WEBPACK_IMPORTED_MODULE_10__["default"])(_this.state.date, monthsToAdd);
        var monthKey = "month-" + i;
        monthList.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          {
            key: monthKey,
            ref: function ref(div) {
              _this.monthContainer = div;
            },
            className: "react-datepicker__month-container"
          },
          !_this.props.showMonthYearPicker ? _this.props.renderCustomHeader ? _this.renderCustomHeader({ monthDate: monthDate, i: i }) : _this.renderDefaultHeader({ monthDate: monthDate, i: i }) : _this.renderYearHeader({ monthDate: monthDate, i: i }),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Month, {
            onChange: _this.changeMonthYear,
            day: monthDate,
            dayClassName: _this.props.dayClassName,
            onDayClick: _this.handleDayClick,
            onDayMouseEnter: _this.handleDayMouseEnter,
            onMouseLeave: _this.handleMonthMouseLeave,
            onWeekSelect: _this.props.onWeekSelect,
            orderInDisplay: i,
            formatWeekNumber: _this.props.formatWeekNumber,
            locale: _this.props.locale,
            minDate: _this.props.minDate,
            maxDate: _this.props.maxDate,
            excludeDates: _this.props.excludeDates,
            highlightDates: _this.props.highlightDates,
            selectingDate: _this.state.selectingDate,
            includeDates: _this.props.includeDates,
            inline: _this.props.inline,
            fixedHeight: _this.props.fixedHeight,
            filterDate: _this.props.filterDate,
            preSelection: _this.props.preSelection,
            selected: _this.props.selected,
            selectsStart: _this.props.selectsStart,
            selectsEnd: _this.props.selectsEnd,
            showWeekNumbers: _this.props.showWeekNumbers,
            startDate: _this.props.startDate,
            endDate: _this.props.endDate,
            peekNextMonth: _this.props.peekNextMonth,
            setOpen: _this.props.setOpen,
            shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
            renderDayContents: _this.props.renderDayContents,
            disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
            showMonthYearPicker: _this.props.showMonthYearPicker
          })
        ));
      }
      return monthList;
    };

    _this.renderTimeSection = function () {
      if (_this.props.showTimeSelect && (_this.state.monthContainer || _this.props.showTimeSelectOnly)) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Time, {
          selected: _this.props.selected,
          onChange: _this.props.onTimeChange,
          format: _this.props.timeFormat,
          includeTimes: _this.props.includeTimes,
          intervals: _this.props.timeIntervals,
          minTime: _this.props.minTime,
          maxTime: _this.props.maxTime,
          excludeTimes: _this.props.excludeTimes,
          timeCaption: _this.props.timeCaption,
          todayButton: _this.props.todayButton,
          showMonthDropdown: _this.props.showMonthDropdown,
          showMonthYearDropdown: _this.props.showMonthYearDropdown,
          showYearDropdown: _this.props.showYearDropdown,
          withPortal: _this.props.withPortal,
          monthRef: _this.state.monthContainer,
          injectTimes: _this.props.injectTimes
        });
      }
    };

    _this.renderInputTimeSection = function () {
      var time = new Date(_this.props.selected);
      var timeString = addZero(time.getHours()) + ":" + addZero(time.getMinutes());
      if (_this.props.showTimeInput) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(inputTime, {
          timeString: timeString,
          timeInputLabel: _this.props.timeInputLabel,
          onChange: _this.props.onTimeChange
        });
      }
    };

    _this.state = {
      date: _this.getDateInView(),
      selectingDate: null,
      monthContainer: null
    };
    return _this;
  }

  Calendar.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // monthContainer height is needed in time component
    // to determine the height for the ul in the time component
    // setState here so height is given after final component
    // layout is rendered
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = function () {
        _this2.setState({ monthContainer: _this2.monthContainer });
      }();
    }
  };

  Calendar.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.preSelection && !isSameDay(this.props.preSelection, prevProps.preSelection)) {
      this.setState({
        date: this.props.preSelection
      });
    } else if (this.props.openToDate && !isSameDay(this.props.openToDate, prevProps.openToDate)) {
      this.setState({
        date: this.props.openToDate
      });
    }
  };

  Calendar.prototype.render = function render() {
    var Container = this.props.container || CalendarContainer;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      Container,
      {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("react-datepicker", this.props.className, {
          "react-datepicker--time-only": this.props.showTimeSelectOnly
        })
      },
      this.renderPreviousButton(),
      this.renderNextButton(),
      this.renderMonths(),
      this.renderTodayButton(),
      this.renderTimeSection(),
      this.renderInputTimeSection(),
      this.props.children
    );
  };

  return Calendar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var PopperComponent = function (_React$Component) {
  inherits(PopperComponent, _React$Component);

  function PopperComponent() {
    classCallCheck(this, PopperComponent);
    return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PopperComponent.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        hidePopper = _props.hidePopper,
        popperComponent = _props.popperComponent,
        popperModifiers = _props.popperModifiers,
        popperPlacement = _props.popperPlacement,
        popperProps = _props.popperProps,
        targetComponent = _props.targetComponent;


    var popper = void 0;

    if (!hidePopper) {
      var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()("react-datepicker-popper", className);
      popper = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react_popper__WEBPACK_IMPORTED_MODULE_54__["Popper"],
        _extends({
          modifiers: popperModifiers,
          placement: popperPlacement
        }, popperProps),
        function (_ref) {
          var ref = _ref.ref,
              style = _ref.style,
              placement = _ref.placement,
              arrowProps = _ref.arrowProps;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "div",
            _extends({ ref: ref, style: style }, {
              className: classes,
              "data-placement": placement
            }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(popperComponent, { arrowProps: arrowProps })
          );
        }
      );
    }

    if (this.props.popperContainer) {
      popper = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(this.props.popperContainer, {}, popper);
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react_popper__WEBPACK_IMPORTED_MODULE_54__["Manager"],
      null,
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        react_popper__WEBPACK_IMPORTED_MODULE_54__["Reference"],
        null,
        function (_ref2) {
          var ref = _ref2.ref;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            "div",
            { ref: ref, className: "react-datepicker-wrapper" },
            targetComponent
          );
        }
      ),
      popper
    );
  };

  createClass(PopperComponent, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        hidePopper: true,
        popperModifiers: {
          preventOverflow: {
            enabled: true,
            escapeWithReference: true,
            boundariesElement: "viewport"
          }
        },
        popperProps: {},
        popperPlacement: "bottom-start"
      };
    }
  }]);
  return PopperComponent;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
var WrappedCalendar = Object(react_onclickoutside__WEBPACK_IMPORTED_MODULE_53__["default"])(Calendar);

// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(date1) !== Object(date_fns_getMonth__WEBPACK_IMPORTED_MODULE_23__["default"])(date2) || Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(date1) !== Object(date_fns_getYear__WEBPACK_IMPORTED_MODULE_24__["default"])(date2);
  }

  return date1 !== date2;
}

function hasSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return !Object(date_fns_isEqual__WEBPACK_IMPORTED_MODULE_43__["default"])(date1, date2);
  }

  return false;
}

/**
 * General datepicker component.
 */
var INPUT_ERR_1 = "Date input not valid.";

var DatePicker = function (_React$Component) {
  inherits(DatePicker, _React$Component);
  createClass(DatePicker, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        allowSameDay: false,
        dateFormat: "MM/dd/yyyy",
        dateFormatCalendar: "LLLL yyyy",
        onChange: function onChange() {},

        disabled: false,
        disabledKeyboardNavigation: false,
        dropdownMode: "scroll",
        onFocus: function onFocus() {},
        onBlur: function onBlur() {},
        onKeyDown: function onKeyDown() {},
        onInputClick: function onInputClick() {},
        onSelect: function onSelect() {},
        onClickOutside: function onClickOutside$$1() {},
        onMonthChange: function onMonthChange() {},

        preventOpenOnFocus: false,
        onYearChange: function onYearChange() {},
        onInputError: function onInputError() {},

        monthsShown: 1,
        readOnly: false,
        withPortal: false,
        shouldCloseOnSelect: true,
        showTimeSelect: false,
        showTimeInput: false,
        showMonthYearPicker: false,
        strictParsing: false,
        timeIntervals: 30,
        timeCaption: "Time",
        previousMonthButtonLabel: "Previous Month",
        nextMonthButtonLabel: "Next month",
        timeInputLabel: "Time",
        renderDayContents: function renderDayContents(date) {
          return date;
        },

        inlineFocusSelectedMonth: false
      };
    }
  }]);

  function DatePicker(props) {
    classCallCheck(this, DatePicker);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getPreSelection = function () {
      return _this.props.openToDate ? _this.props.openToDate : _this.props.selectsEnd && _this.props.startDate ? _this.props.startDate : _this.props.selectsStart && _this.props.endDate ? _this.props.endDate : newDate();
    };

    _this.calcInitialState = function () {
      var defaultPreSelection = _this.getPreSelection();
      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var boundedPreSelection = minDate && Object(date_fns_isBefore__WEBPACK_IMPORTED_MODULE_49__["default"])(defaultPreSelection, minDate) ? minDate : maxDate && Object(date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__["default"])(defaultPreSelection, maxDate) ? maxDate : defaultPreSelection;
      return {
        open: _this.props.startOpen || false,
        preventFocus: false,
        preSelection: _this.props.selected ? _this.props.selected : boundedPreSelection,
        // transforming highlighted days (perhaps nested array)
        // to flat Map for faster access in day.jsx
        highlightDates: getHightLightDaysMap(_this.props.highlightDates),
        focused: false
      };
    };

    _this.clearPreventFocusTimeout = function () {
      if (_this.preventFocusTimeout) {
        clearTimeout(_this.preventFocusTimeout);
      }
    };

    _this.setFocus = function () {
      if (_this.input && _this.input.focus) {
        _this.input.focus();
      }
    };

    _this.setBlur = function () {
      if (_this.input && _this.input.blur) {
        _this.input.blur();
      }

      _this.cancelFocusInput();
    };

    _this.setOpen = function (open) {
      var skipSetBlur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _this.setState({
        open: open,
        preSelection: open && _this.state.open ? _this.state.preSelection : _this.calcInitialState().preSelection,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
      }, function () {
        if (!open) {
          _this.setState(function (prev) {
            return {
              focused: skipSetBlur ? prev.focused : false
            };
          }, function () {
            !skipSetBlur && _this.setBlur();

            _this.setState({ inputValue: null });
          });
        }
      });
    };

    _this.inputOk = function () {
      return Object(date_fns_isDate__WEBPACK_IMPORTED_MODULE_3__["default"])(_this.state.preSelection);
    };

    _this.isCalendarOpen = function () {
      return _this.props.open === undefined ? _this.state.open && !_this.props.disabled && !_this.props.readOnly : _this.props.open;
    };

    _this.handleFocus = function (event) {
      if (!_this.state.preventFocus) {
        _this.props.onFocus(event);
        if (!_this.props.preventOpenOnFocus && !_this.props.readOnly) {
          _this.setOpen(true);
        }
      }
      _this.setState({ focused: true });
    };

    _this.cancelFocusInput = function () {
      clearTimeout(_this.inputFocusTimeout);
      _this.inputFocusTimeout = null;
    };

    _this.deferFocusInput = function () {
      _this.cancelFocusInput();
      _this.inputFocusTimeout = setTimeout(function () {
        return _this.setFocus();
      }, 1);
    };

    _this.handleDropdownFocus = function () {
      _this.cancelFocusInput();
    };

    _this.handleBlur = function (event) {
      if (_this.state.open && !_this.props.withPortal && !_this.props.showTimeInput) {
        _this.deferFocusInput();
      } else {
        _this.props.onBlur(event);
      }
      _this.setState({ focused: false });
    };

    _this.handleCalendarClickOutside = function (event) {
      if (!_this.props.inline) {
        _this.setOpen(false);
      }
      _this.props.onClickOutside(event);
      if (_this.props.withPortal) {
        event.preventDefault();
      }
    };

    _this.handleChange = function () {
      for (var _len = arguments.length, allArgs = Array(_len), _key = 0; _key < _len; _key++) {
        allArgs[_key] = arguments[_key];
      }

      var event = allArgs[0];
      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw.apply(_this, allArgs);
        if (typeof event.isDefaultPrevented !== "function" || event.isDefaultPrevented()) {
          return;
        }
      }
      _this.setState({
        inputValue: event.target.value,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT
      });
      var date = parseDate(event.target.value, _this.props.dateFormat, _this.props.locale, _this.props.strictParsing);
      if (date || !event.target.value) {
        _this.setSelected(date, event, true);
      }
    };

    _this.handleSelect = function (date, event, monthSelectedIn) {
      // Preventing onFocus event to fix issue
      // https://github.com/Hacker0x01/react-datepicker/issues/628
      _this.setState({ preventFocus: true }, function () {
        _this.preventFocusTimeout = setTimeout(function () {
          return _this.setState({ preventFocus: false });
        }, 50);
        return _this.preventFocusTimeout;
      });
      _this.setSelected(date, event, undefined, monthSelectedIn);
      if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
        _this.setPreSelection(date);
      } else if (!_this.props.inline) {
        _this.setOpen(false);
      }
    };

    _this.setSelected = function (date, event, keepInput, monthSelectedIn) {
      var changedDate = date;

      if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
        if (isOutOfBounds(changedDate, _this.props)) {
          _this.props.onChange(date, event);
          _this.props.onSelect(changedDate, event);
        }

        return;
      }

      if (!isSameDay(_this.props.selected, changedDate) || _this.props.allowSameDay) {
        if (changedDate !== null) {
          if (_this.props.selected) {
            var selected = _this.props.selected;
            if (keepInput) selected = newDate(changedDate);
            changedDate = setTime(changedDate, {
              hour: Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(selected),
              minute: Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(selected),
              second: Object(date_fns_getSeconds__WEBPACK_IMPORTED_MODULE_18__["default"])(selected)
            });
          }
          if (!_this.props.inline) {
            _this.setState({
              preSelection: changedDate
            });
          }
          if (_this.props.inline && _this.props.monthsShown > 1 && !_this.props.inlineFocusSelectedMonth) {
            _this.setState({ monthSelectedIn: monthSelectedIn });
          }
        }
        _this.props.onChange(changedDate, event);
      }

      _this.props.onSelect(changedDate, event);

      if (!keepInput) {
        _this.setState({ inputValue: null });
      }
    };

    _this.setPreSelection = function (date) {
      var hasMinDate = typeof _this.props.minDate !== "undefined";
      var hasMaxDate = typeof _this.props.maxDate !== "undefined";
      var isValidDateSelection = true;
      if (date) {
        if (hasMinDate && hasMaxDate) {
          isValidDateSelection = isDayInRange(date, _this.props.minDate, _this.props.maxDate);
        } else if (hasMinDate) {
          isValidDateSelection = Object(date_fns_isAfter__WEBPACK_IMPORTED_MODULE_48__["default"])(date, _this.props.minDate);
        } else if (hasMaxDate) {
          isValidDateSelection = Object(date_fns_isBefore__WEBPACK_IMPORTED_MODULE_49__["default"])(date, _this.props.maxDate);
        }
      }
      if (isValidDateSelection) {
        _this.setState({
          preSelection: date
        });
      }
    };

    _this.handleTimeChange = function (time) {
      var selected = _this.props.selected ? _this.props.selected : _this.getPreSelection();
      var changedDate = setTime(selected, {
        hour: Object(date_fns_getHours__WEBPACK_IMPORTED_MODULE_20__["default"])(time),
        minute: Object(date_fns_getMinutes__WEBPACK_IMPORTED_MODULE_19__["default"])(time)
      });

      _this.setState({
        preSelection: changedDate
      });

      _this.props.onChange(changedDate);
      if (_this.props.shouldCloseOnSelect) {
        _this.setOpen(false);
      }
      if (_this.props.showTimeInput) {
        _this.setOpen(true);
      }
      _this.setState({ inputValue: null });
    };

    _this.onInputClick = function () {
      if (!_this.props.disabled && !_this.props.readOnly) {
        _this.setOpen(true);
      }

      _this.props.onInputClick();
    };

    _this.onInputKeyDown = function (event) {
      _this.props.onKeyDown(event);
      var eventKey = event.key;
      if (!_this.state.open && !_this.props.inline && !_this.props.preventOpenOnFocus) {
        if (eventKey === "ArrowDown" || eventKey === "ArrowUp") {
          _this.onInputClick();
        }
        return;
      }
      var copy = newDate(_this.state.preSelection);
      if (eventKey === "Enter") {
        event.preventDefault();
        if (_this.inputOk() && _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE) {
          _this.handleSelect(copy, event);
          !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
        } else {
          _this.setOpen(false);
        }
      } else if (eventKey === "Escape") {
        event.preventDefault();

        _this.setOpen(false);
        if (!_this.inputOk()) {
          _this.props.onInputError({ code: 1, msg: INPUT_ERR_1 });
        }
      } else if (eventKey === "Tab") {
        _this.setOpen(false, true);
      } else if (!_this.props.disabledKeyboardNavigation) {
        var newSelection = void 0;
        switch (eventKey) {
          case "ArrowLeft":
            newSelection = Object(date_fns_subDays__WEBPACK_IMPORTED_MODULE_14__["default"])(copy, 1);
            break;
          case "ArrowRight":
            newSelection = Object(date_fns_addDays__WEBPACK_IMPORTED_MODULE_8__["default"])(copy, 1);
            break;
          case "ArrowUp":
            newSelection = Object(date_fns_subWeeks__WEBPACK_IMPORTED_MODULE_15__["default"])(copy, 1);
            break;
          case "ArrowDown":
            newSelection = Object(date_fns_addWeeks__WEBPACK_IMPORTED_MODULE_9__["default"])(copy, 1);
            break;
          case "PageUp":
            newSelection = Object(date_fns_subMonths__WEBPACK_IMPORTED_MODULE_16__["default"])(copy, 1);
            break;
          case "PageDown":
            newSelection = Object(date_fns_addMonths__WEBPACK_IMPORTED_MODULE_10__["default"])(copy, 1);
            break;
          case "Home":
            newSelection = Object(date_fns_subYears__WEBPACK_IMPORTED_MODULE_17__["default"])(copy, 1);
            break;
          case "End":
            newSelection = Object(date_fns_addYears__WEBPACK_IMPORTED_MODULE_11__["default"])(copy, 1);
            break;
        }
        if (!newSelection) {
          if (_this.props.onInputError) {
            _this.props.onInputError({ code: 1, msg: INPUT_ERR_1 });
          }
          return; // Let the input component handle this keydown
        }
        event.preventDefault();
        _this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
        if (_this.props.adjustDateOnChange) {
          _this.setSelected(newSelection);
        }
        _this.setPreSelection(newSelection);
      }
    };

    _this.onClearClick = function (event) {
      if (event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
      }
      _this.props.onChange(null, event);
      _this.setState({ inputValue: null });
    };

    _this.clear = function () {
      _this.onClearClick();
    };

    _this.renderCalendar = function () {
      if (!_this.props.inline && !_this.isCalendarOpen()) {
        return null;
      }
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        WrappedCalendar,
        {
          ref: function ref(elem) {
            _this.calendar = elem;
          },
          locale: _this.props.locale,
          adjustDateOnChange: _this.props.adjustDateOnChange,
          setOpen: _this.setOpen,
          shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
          dateFormat: _this.props.dateFormatCalendar,
          useWeekdaysShort: _this.props.useWeekdaysShort,
          formatWeekDay: _this.props.formatWeekDay,
          dropdownMode: _this.props.dropdownMode,
          selected: _this.props.selected,
          preSelection: _this.state.preSelection,
          onSelect: _this.handleSelect,
          onWeekSelect: _this.props.onWeekSelect,
          openToDate: _this.props.openToDate,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          excludeDates: _this.props.excludeDates,
          filterDate: _this.props.filterDate,
          onClickOutside: _this.handleCalendarClickOutside,
          formatWeekNumber: _this.props.formatWeekNumber,
          highlightDates: _this.state.highlightDates,
          includeDates: _this.props.includeDates,
          includeTimes: _this.props.includeTimes,
          injectTimes: _this.props.injectTimes,
          inline: _this.props.inline,
          peekNextMonth: _this.props.peekNextMonth,
          showMonthDropdown: _this.props.showMonthDropdown,
          useShortMonthInDropdown: _this.props.useShortMonthInDropdown,
          showMonthYearDropdown: _this.props.showMonthYearDropdown,
          showWeekNumbers: _this.props.showWeekNumbers,
          showYearDropdown: _this.props.showYearDropdown,
          withPortal: _this.props.withPortal,
          forceShowMonthNavigation: _this.props.forceShowMonthNavigation,
          showDisabledMonthNavigation: _this.props.showDisabledMonthNavigation,
          scrollableYearDropdown: _this.props.scrollableYearDropdown,
          scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown,
          todayButton: _this.props.todayButton,
          weekLabel: _this.props.weekLabel,
          outsideClickIgnoreClass: outsideClickIgnoreClass,
          fixedHeight: _this.props.fixedHeight,
          monthsShown: _this.props.monthsShown,
          monthSelectedIn: _this.state.monthSelectedIn,
          onDropdownFocus: _this.handleDropdownFocus,
          onMonthChange: _this.props.onMonthChange,
          onYearChange: _this.props.onYearChange,
          dayClassName: _this.props.dayClassName,
          showTimeSelect: _this.props.showTimeSelect,
          showTimeSelectOnly: _this.props.showTimeSelectOnly,
          onTimeChange: _this.handleTimeChange,
          timeFormat: _this.props.timeFormat,
          timeIntervals: _this.props.timeIntervals,
          minTime: _this.props.minTime,
          maxTime: _this.props.maxTime,
          excludeTimes: _this.props.excludeTimes,
          timeCaption: _this.props.timeCaption,
          className: _this.props.calendarClassName,
          container: _this.props.calendarContainer,
          yearDropdownItemNumber: _this.props.yearDropdownItemNumber,
          previousMonthButtonLabel: _this.props.previousMonthButtonLabel,
          nextMonthButtonLabel: _this.props.nextMonthButtonLabel,
          timeInputLabel: _this.props.timeInputLabel,
          disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
          renderCustomHeader: _this.props.renderCustomHeader,
          popperProps: _this.props.popperProps,
          renderDayContents: _this.props.renderDayContents,
          onDayMouseEnter: _this.props.onDayMouseEnter,
          onMonthMouseLeave: _this.props.onMonthMouseLeave,
          showTimeInput: _this.props.showTimeInput,
          showMonthYearPicker: _this.props.showMonthYearPicker
        },
        _this.props.children
      );
    };

    _this.renderDateInput = function () {
      var _classnames, _React$cloneElement;

      var className = classnames__WEBPACK_IMPORTED_MODULE_2___default()(_this.props.className, (_classnames = {}, _classnames[outsideClickIgnoreClass] = _this.state.open, _classnames));

      var customInput = _this.props.customInput || react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { type: "text" });
      var customInputRef = _this.props.customInputRef || "ref";
      var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : safeDateFormat(_this.props.selected, _this.props);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(customInput, (_React$cloneElement = {}, _React$cloneElement[customInputRef] = function (input) {
        _this.input = input;
      }, _React$cloneElement.value = inputValue, _React$cloneElement.onBlur = _this.handleBlur, _React$cloneElement.onChange = _this.handleChange, _React$cloneElement.onClick = _this.onInputClick, _React$cloneElement.onFocus = _this.handleFocus, _React$cloneElement.onKeyDown = _this.onInputKeyDown, _React$cloneElement.id = _this.props.id, _React$cloneElement.name = _this.props.name, _React$cloneElement.autoFocus = _this.props.autoFocus, _React$cloneElement.placeholder = _this.props.placeholderText, _React$cloneElement.disabled = _this.props.disabled, _React$cloneElement.autoComplete = _this.props.autoComplete, _React$cloneElement.className = className, _React$cloneElement.title = _this.props.title, _React$cloneElement.readOnly = _this.props.readOnly, _React$cloneElement.required = _this.props.required, _React$cloneElement.tabIndex = _this.props.tabIndex, _React$cloneElement));
    };

    _this.renderClearButton = function () {
      if (_this.props.isClearable && _this.props.selected != null) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          type: "button",
          className: "react-datepicker__close-icon",
          onClick: _this.onClearClick,
          title: _this.props.clearButtonTitle,
          tabIndex: -1
        });
      } else {
        return null;
      }
    };

    _this.state = _this.calcInitialState();
    return _this;
  }

  DatePicker.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.inline && hasPreSelectionChanged(prevProps.selected, this.props.selected)) {
      this.setPreSelection(this.props.selected);
    }
    if (this.state.monthSelectedIn !== undefined && prevProps.monthsShown !== this.props.monthsShown) {
      this.setState({ monthSelectedIn: 0 });
    }
    if (prevProps.highlightDates !== this.props.highlightDates) {
      this.setState({
        highlightDates: getHightLightDaysMap(this.props.highlightDates)
      });
    }
    if (!prevState.focused && hasSelectionChanged(prevProps.selected, this.props.selected)) {
      this.setState({ inputValue: null });
    }
  };

  DatePicker.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clearPreventFocusTimeout();
  };

  DatePicker.prototype.render = function render() {
    var calendar = this.renderCalendar();

    if (this.props.inline && !this.props.withPortal) {
      return calendar;
    }

    if (this.props.withPortal) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        null,
        !this.props.inline ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { className: "react-datepicker__input-container" },
          this.renderDateInput(),
          this.renderClearButton()
        ) : null,
        this.state.open || this.props.inline ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          "div",
          { className: "react-datepicker__portal" },
          calendar
        ) : null
      );
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PopperComponent, {
      className: this.props.popperClassName,
      hidePopper: !this.isCalendarOpen(),
      popperModifiers: this.props.popperModifiers,
      targetComponent: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        "div",
        { className: "react-datepicker__input-container" },
        this.renderDateInput(),
        this.renderClearButton()
      ),
      popperContainer: this.props.popperContainer,
      popperComponent: calendar,
      popperPlacement: this.props.popperPlacement,
      popperProps: this.props.popperProps
    });
  };

  return DatePicker;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";


/* harmony default export */ __webpack_exports__["default"] = (DatePicker);


/***/ }),

/***/ "./node_modules/react-dropdown-tree-select/dist/react-dropdown-tree-select.js":
/*!************************************************************************************!*\
  !*** ./node_modules/react-dropdown-tree-select/dist/react-dropdown-tree-select.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "./node_modules/react/index.js")):undefined}(this,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){e.exports=n(15)()},function(t,n){t.exports=e},function(e,t,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(this&&this[r]||r);else if(Array.isArray(r))e.push(o.apply(this,r));else if("object"===a)for(var i in r)n.call(r,i)&&r[i]&&e.push(this&&this[i]||i)}}return e.join(" ")}void 0!==e&&e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";e.exports=function(e,t){const n=e.filter(t);return 0!==n.length&&n.length!==e.length}},function(e,t,n){var r;r=function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}return n.m=e,n.c=t,n.p="",n(0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e,t,n){for(var r=!0;r;){var o=e,a=t,i=n;r=!1,null===o&&(o=Function.prototype);var l=Object.getOwnPropertyDescriptor(o,a);if(void 0!==l){if("value"in l)return l.value;var s=l.get;if(void 0===s)return;return s.call(i)}var c=Object.getPrototypeOf(o);if(null===c)return;e=c,t=a,n=i,r=!0,l=c=void 0}};function i(e){return e&&e.__esModule?e:{default:e}}var l=n(8),s=i(l),c=i(n(6)),u=i(n(2)),h=n(1),d=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.state={showLoader:!1,lastScrollTop:0,actionTriggered:!1,pullToRefreshThresholdBreached:!1},this.startY=0,this.currentY=0,this.dragging=!1,this.maxPullDownDistance=0,this.onScrollListener=this.onScrollListener.bind(this),this.throttledOnScrollListener=(0,u.default)(this.onScrollListener,150).bind(this),this.onStart=this.onStart.bind(this),this.onMove=this.onMove.bind(this),this.onEnd=this.onEnd.bind(this),this.getScrollableTarget=this.getScrollableTarget.bind(this)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),o(t,[{key:"componentDidMount",value:function(){if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"==typeof this.props.initialScrollY&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown.firstChild.getBoundingClientRect().height,this.forceUpdate(),"function"!=typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')}},{key:"componentWillUnmount",value:function(){this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd))}},{key:"componentWillReceiveProps",value:function(e){this.props.dataLength!==e.dataLength&&this.setState({showLoader:!1,actionTriggered:!1,pullToRefreshThresholdBreached:!1})}},{key:"getScrollableTarget",value:function(){return this.props.scrollableTarget instanceof HTMLElement?this.props.scrollableTarget:"string"==typeof this.props.scrollableTarget?document.getElementById(this.props.scrollableTarget):(null===this.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)}},{key:"onStart",value:function(e){this.state.lastScrollTop||(this.dragging=!0,this.startY=e.pageY||e.touches[0].pageY,this.currentY=this.startY,this._infScroll.style.willChange="transform",this._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)")}},{key:"onMove",value:function(e){this.dragging&&(this.currentY=e.pageY||e.touches[0].pageY,this.currentY<this.startY||(this.currentY-this.startY>=this.props.pullDownToRefreshThreshold&&this.setState({pullToRefreshThresholdBreached:!0}),this.currentY-this.startY>1.5*this.maxPullDownDistance||(this._infScroll.style.overflow="visible",this._infScroll.style.transform="translate3d(0px, "+(this.currentY-this.startY)+"px, 0px)")))}},{key:"onEnd",value:function(e){var t=this;this.startY=0,this.currentY=0,this.dragging=!1,this.state.pullToRefreshThresholdBreached&&this.props.refreshFunction&&this.props.refreshFunction(),requestAnimationFrame(function(){t._infScroll.style.overflow="auto",t._infScroll.style.transform="none",t._infScroll.style.willChange="none"})}},{key:"isElementAtBottom",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?.8:arguments[1],n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=(0,h.parseThreshold)(t);return r.unit===h.ThresholdUnits.Pixel?e.scrollTop+n>=e.scrollHeight-r.value:e.scrollTop+n>=r.value/100*e.scrollHeight}},{key:"onScrollListener",value:function(e){var t=this;"function"==typeof this.props.onScroll&&setTimeout(function(){return t.props.onScroll(e)},0);var n=this.props.height||this._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;this.state.actionTriggered||(this.isElementAtBottom(n,this.props.scrollThreshold)&&this.props.hasMore&&(this.setState({actionTriggered:!0,showLoader:!0}),this.props.next()),this.setState({lastScrollTop:n.scrollTop}))}},{key:"render",value:function(){var e=this,t=r({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),n=this.props.hasChildren||!(!this.props.children||!this.props.children.length),o=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return s.default.createElement("div",{style:o},s.default.createElement("div",{className:"infinite-scroll-component",ref:function(t){return e._infScroll=t},style:t},this.props.pullDownToRefresh&&s.default.createElement("div",{style:{position:"relative"},ref:function(t){return e._pullDown=t}},s.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},!this.state.pullToRefreshThresholdBreached&&this.props.pullDownToRefreshContent,this.state.pullToRefreshThresholdBreached&&this.props.releaseToRefreshContent)),this.props.children,!this.state.showLoader&&!n&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))}}]),t}();t.default=d,d.defaultProps={pullDownToRefreshContent:s.default.createElement("h3",null,"Pull down to refresh"),releaseToRefreshContent:s.default.createElement("h3",null,"Release to refresh"),pullDownToRefreshThreshold:100,disableBrowserPullToRefresh:!0},d.propTypes={next:c.default.func,hasMore:c.default.bool,children:c.default.node,loader:c.default.node.isRequired,scrollThreshold:c.default.oneOfType([c.default.number,c.default.string]),endMessage:c.default.node,style:c.default.object,height:c.default.number,scrollableTarget:c.default.node,hasChildren:c.default.bool,pullDownToRefresh:c.default.bool,pullDownToRefreshContent:c.default.node,releaseToRefreshContent:c.default.node,pullDownToRefreshThreshold:c.default.number,refreshFunction:c.default.func,onScroll:c.default.func,dataLength:c.default.number.isRequired},e.exports=t.default},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.parseThreshold=function(e){if("number"==typeof e)return{unit:n.Percent,value:100*e};if("string"==typeof e)return e.match(/^(\d*(.\d+)?)px$/)?{unit:n.Pixel,value:parseFloat(e)}:e.match(/^(\d*(.\d+)?)%$/)?{unit:n.Percent,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),r);return console.warn("scrollThreshold should be string or number"),r};var n={Pixel:"Pixel",Percent:"Percent"};t.ThresholdUnits=n;var r={unit:n.Percent,value:.8}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var r,o;return t||(t=250),function(){var a=n||this,i=+new Date,l=arguments;r&&i<r+t?(clearTimeout(o),o=setTimeout(function(){r=i,e.apply(a,l)},t)):(r=i,e.apply(a,l))}},e.exports=t.default},function(e,t){"use strict";function n(e){return function(){return e}}var r=function(){};r.thatReturns=n,r.thatReturnsFalse=n(!1),r.thatReturnsTrue=n(!0),r.thatReturnsNull=n(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,n){"use strict";var r=function(e){};e.exports=function(e,t,n,o,a,i,l,s){if(r(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,o,a,i,l,s],h=0;(c=new Error(t.replace(/%s/g,function(){return u[h++]}))).name="Invariant Violation"}throw c.framesToPop=1,c}}},function(e,t,n){"use strict";var r=n(3),o=n(4),a=n(7);e.exports=function(){function e(e,t,n,r,i,l){l!==a&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return n.checkPropTypes=r,n.PropTypes=n,n}},function(e,t,n){e.exports=n(5)()},function(e,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,n){t.exports=e}])},e.exports=r(n(1))},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r,o,a,i=n(2),l=n.n(i),s=n(0),c=n.n(s),u=n(1),h=n.n(u),d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(e).reduce(function(t,n){var r;return t["data-"+(r=n,r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())]=e[n],t},{})},p=(function(){}(),function(e){return!e||Array.isArray(e)&&!e.length}),f=function(e,t){return e instanceof Event&&!function(e){if(e.path)return e.path;for(var t=e.target,n=[t];t.parentElement;)t=t.parentElement,n.unshift(t);return n}(e).some(function(e){return e===t})},g=function(e,t){var n=void 0;return function(){for(var r=arguments.length,o=Array(r),a=0;a<r;a++)o[a]=arguments[a];var i=!n;clearTimeout(n),n=setTimeout(function(){n=null,e.apply(void 0,o)},t),i&&e.apply(void 0,o)}},y=(r="rdts",o=1,a=new WeakMap,{get:function(e){return a.has(e)||a.set(e,o++),""+r+a.get(e)},reset:function(){a=new WeakMap,o=1}}),b=n(8),v=n.n(b),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function w(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var O=l.a.bind(v.a),k=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=r=w(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.handleClick=function(e){var t=r.props,n=t.id,o=t.onDelete;e.stopPropagation(),e.nativeEvent.stopImmediatePropagation(),o(n,void 0!==(e.key||e.keyCode))},r.onKeyDown=function(e){"Backspace"===e.key&&(r.handleClick(e),e.preventDefault())},r.onKeyUp=function(e){(32===e.keyCode||["Delete","Enter"].indexOf(e.key)>-1)&&(r.handleClick(e),e.preventDefault())},w(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),m(t,[{key:"render",value:function(){var e=this.props,t=e.id,n=e.label,r=e.labelRemove,o=void 0===r?"Remove":r,a=e.readOnly,i=e.disabled,l=t+"_tag",s=O("tag-remove",{readOnly:a},{disabled:i}),c=a||i,u=c?void 0:this.handleClick,d=c?void 0:this.onKeyDown,p=c?void 0:this.onKeyUp;return h.a.createElement("span",{className:O("tag"),id:l},n,h.a.createElement("button",{onClick:u,onKeyDown:d,onKeyUp:p,className:s,type:"button","aria-label":o,"aria-labelledby":l,"aria-disabled":c},"x"))}}]),t}();k.propTypes={id:c.a.string.isRequired,label:c.a.string.isRequired,onDelete:c.a.func,readOnly:c.a.bool,disabled:c.a.bool,labelRemove:c.a.string};var T=k,_=n(7),P=n.n(_);function S(e){if(e)return e&&"#"===e[0]?{"aria-labelledby":e.replace(/#/g,"")}:{"aria-label":e}}var C=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};var x=l.a.bind(P.a),N=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleInputChange=function(e){e.persist(),n.delayedCallback(e)},n.delayedCallback=g(function(e){return n.props.onInputChange(e.target.value)},300),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),C(t,[{key:"render",value:function(){var e=this.props,t=e.tags,n=e.onTagRemove,r=e.inputRef,o=e.placeholderText,a=void 0===o?"Choose...":o,i=e.onFocus,l=e.onBlur,s=e.disabled,c=e.readOnly,u=e.onKeyDown,p=e.activeDescendant,f=e.label,g=e.labelRemove;return h.a.createElement("ul",{className:x("tag-list")},function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1],n=arguments[2],r=arguments[3],o=arguments[4];return e.map(function(e){var a=e._id,i=e.label,l=e.tagClassName,s=e.dataset;return h.a.createElement("li",E({className:x("tag-item",l),key:"tag-item-"+a},d(s)),h.a.createElement(T,{label:i,id:a,onDelete:t,readOnly:n,disabled:r,labelRemove:o}))})}(t,n,c,s,g),h.a.createElement("li",{className:x("tag-item")},h.a.createElement("input",E({type:"text",disabled:s,ref:r,className:x("search"),placeholder:a,onKeyDown:u,onChange:this.handleInputChange,onFocus:i,onBlur:l,readOnly:c,"aria-activedescendant":p,"aria-autocomplete":u?"list":void 0},S(f)))))}}]),t}();N.propTypes={tags:c.a.array,placeholderText:c.a.string,onInputChange:c.a.func,onFocus:c.a.func,onBlur:c.a.func,onTagRemove:c.a.func,onKeyDown:c.a.func,inputRef:c.a.func,disabled:c.a.bool,readOnly:c.a.bool,activeDescendant:c.a.string,label:c.a.string,labelRemove:c.a.string};var j=N,D=n(4),R=n.n(D),I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},M=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function A(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var F=l.a.bind(R.a),L=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=r=A(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.getAriaAttributes=function(){var e=r.props,t=e.simpleSelect,n=e.label,o=e.showDropdown;return I({role:"button",tabIndex:0,"aria-haspopup":t?"listbox":"tree","aria-expanded":o?"true":"false"},S(n))},r.handleTrigger=function(e){e.key&&13!==e.keyCode&&32!==e.keyCode&&40!==e.keyCode||e.key&&r.triggerNode&&r.triggerNode!==document.activeElement||(r.props.showDropdown||32!==e.keyCode||e.preventDefault(),r.props.onTrigger(e))},A(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),M(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.disabled,r=t.readOnly,o=t.showDropdown,a=F({"dropdown-trigger":!0,arrow:!0,disabled:n,readOnly:r,top:o,bottom:!o});return h.a.createElement("a",I({ref:function(t){e.triggerNode=t},className:a,onClick:n?void 0:this.handleTrigger,onKeyDown:n?void 0:this.handleTrigger},this.getAriaAttributes()),this.props.children)}}]),t}();L.propTypes={onTrigger:c.a.func,disabled:c.a.bool,readOnly:c.a.bool,showDropdown:c.a.bool,label:c.a.string};var B=L,V=n(6),Y=n.n(V),K=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function q(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var H=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=r=q(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.handleClick=function(){r.props.onAction(r.props.actionData)},q(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),K(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.className,r=e.text,o=e.readOnly;return h.a.createElement("i",{title:t,className:n,onClick:o?void 0:this.handleClick},r)}}]),t}();H.propTypes={title:c.a.string,text:c.a.string,className:c.a.string,actionData:c.a.object,onAction:c.a.func,readOnly:c.a.bool},H.defaultProps={onAction:function(){}};var U=H,W=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},z=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var $=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),z(t,[{key:"render",value:function(){var e=this.props,t=e.actions,n=e.id,r=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["actions","id"]);return p(t)?null:t.map(function(e,t){var o=e.id||"action-"+t;return h.a.createElement(U,W({key:o},r,e,{actionData:{action:o,id:n}}))})}}]),t}();$.propTypes={id:c.a.string.isRequired,actions:c.a.array};var J=$,Z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},G=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var Q=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),G(t,[{key:"render",value:function(){var e=this.props,t=e.checked,n=e.indeterminate,r=void 0!==n&&n,o=e.onChange,a=e.disabled,i=e.readOnly,l=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["checked","indeterminate","onChange","disabled","readOnly"]),s=a||i;return h.a.createElement("input",Z({type:"checkbox",ref:function(e){var t=e.checked,n=e.indeterminate;return function(e){e&&(e.checked=t,e.indeterminate=n)}}({checked:t,indeterminate:r}),onChange:o,disabled:s},l))}}]),t}();Q.propTypes={checked:c.a.bool,indeterminate:c.a.bool,onChange:c.a.func,disabled:c.a.bool,readOnly:c.a.bool};var X=Q,ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},te=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var ne=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),te(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.checked,r=e.onChange,o=e.disabled,a=e.readOnly,i=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["name","checked","onChange","disabled","readOnly"]),l=o||a;return h.a.createElement("input",ee({type:"radio",name:t,ref:function(e){var t=e.checked;return function(e){e&&(e.checked=t)}}({checked:n}),onChange:r,disabled:l},i))}}]),t}();ne.propTypes={name:c.a.string.isRequired,checked:c.a.bool,onChange:c.a.func,disabled:c.a.bool,readOnly:c.a.bool};var re=ne,oe=n(3),ae=n.n(oe),ie=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},le=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function se(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var ce=l.a.bind(ae.a),ue=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=r=se(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.handleCheckboxChange=function(e){var t=r.props,n=t.simpleSelect,o=t.radioSelect,a=t.id,i=t.onCheckboxChange;n||o?i(a,!0):i(a,e.target.checked);e.stopPropagation(),e.nativeEvent.stopImmediatePropagation()},se(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),le(t,[{key:"render",value:function(){var e=this.props,t=e.simpleSelect,n=e.radioSelect,r=e.title,o=e.label,a=e.id,i=e.partial,l=e.checked,s=this.props,c=s.value,u=s.disabled,d=s.showPartiallySelected,p=s.readOnly,f=s.clientId,g={className:"node-label"};t&&!p&&!u&&(g.onClick=this.handleCheckboxChange);var y={id:a,value:c,checked:l,disabled:u,readOnly:p,tabIndex:-1};return h.a.createElement("label",{title:r||o,htmlFor:a},n?h.a.createElement(re,ie({name:f,className:"radio-item",onChange:this.handleCheckboxChange},y)):h.a.createElement(X,ie({name:a,className:ce("checkbox-item",{"simple-select":t}),indeterminate:d&&i,onChange:this.handleCheckboxChange},y)),h.a.createElement("span",g,o))}}]),t}();ue.propTypes={id:c.a.string.isRequired,actions:c.a.array,title:c.a.string,label:c.a.string.isRequired,value:c.a.string.isRequired,checked:c.a.bool,partial:c.a.bool,disabled:c.a.bool,dataset:c.a.object,simpleSelect:c.a.bool,radioSelect:c.a.bool,showPartiallySelected:c.a.bool,onCheckboxChange:c.a.func,readOnly:c.a.bool,clientId:c.a.string};var he=ue,de=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function pe(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var fe=l.a.bind(ae.a),ge=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=r=pe(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.onToggle=function(e){e.stopPropagation(),e.nativeEvent.stopImmediatePropagation(),r.props.onNodeToggle(r.props.id)},r.onKeyDown=function(e){"Enter"!==e.key&&32!==e.keyCode||(r.props.onNodeToggle(r.props.id),e.preventDefault())},pe(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),de(t,[{key:"render",value:function(){var e=this.props,t=e.expanded;if(e.isLeaf)return null;var n=fe("toggle",{expanded:t,collapsed:!t});return h.a.createElement("i",{role:"button",tabIndex:-1,className:n,onClick:this.onToggle,onKeyDown:this.onKeyDown,"aria-hidden":!0})}}]),t}();ge.propTypes={expanded:c.a.bool,isLeaf:c.a.bool,onNodeToggle:c.a.func,id:c.a.string};var ye=ge,be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ve=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function me(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var we=l.a.bind(ae.a),Oe=function(e){return p(e)},ke=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=r=me(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.getAriaAttributes=function(){var e=r.props,t=e._children,n=e._depth,o=e.checked,a=e.disabled,i=e.expanded,l=e.readOnly,s=e.simpleSelect,c=e.partial,u={};return u.role=s?"option":"treeitem",u["aria-disabled"]=a||l,u["aria-selected"]=o,s||(u["aria-checked"]=c?"mixed":o,u["aria-level"]=(n||0)+1,u["aria-expanded"]=t&&(i?"true":"false")),u},me(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["PureComponent"]),ve(t,[{key:"render",value:function(){var e=this.props,t=e.simpleSelect,n=e.radioSelect,r=e.keepTreeOnSearch,o=e._id,a=e._children,i=e.dataset,l=e._depth,s=e.expanded,c=e.title,u=e.label,p=e.partial,f=e.checked,g=e.value,y=e.disabled,b=e.actions,v=e.onAction,m=e.searchModeOn,w=e.onNodeToggle,O=e.onCheckboxChange,k=e.showPartiallySelected,T=e.readOnly,_=e.clientId,P=function(e){var t=e.keepTreeOnSearch,n=e.keepChildrenOnSearch,r=e._children,o=e.matchInChildren,a=e.matchInParent,i=e.disabled,l=e.partial,s=e.hide,c=e.className,u=e.showPartiallySelected,h=e.readOnly,d=e.checked,p=e._focused;return we("node",{leaf:Oe(r),tree:!Oe(r),disabled:i,hide:s,"match-in-children":t&&o,"match-in-parent":t&&n&&a,partial:u&&l,readOnly:h,checked:d,focused:p},c)}(this.props),S=r||!m?{paddingLeft:20*(l||0)+"px"}:{},C=o+"_li";return h.a.createElement("li",be({className:P,style:S,id:C},d(i),this.getAriaAttributes()),h.a.createElement(ye,{isLeaf:Oe(a),expanded:s,id:o,onNodeToggle:w}),h.a.createElement(he,{title:c,label:u,id:o,partial:p,checked:f,value:g,disabled:y,simpleSelect:t,radioSelect:n,onCheckboxChange:O,showPartiallySelected:k,readOnly:T,clientId:_}),h.a.createElement(J,{actions:b,onAction:v,id:o,readOnly:T}))}}]),t}();ke.propTypes={_id:c.a.string.isRequired,_depth:c.a.number,_children:c.a.array,actions:c.a.array,className:c.a.string,title:c.a.string,label:c.a.string.isRequired,value:c.a.string.isRequired,checked:c.a.bool,expanded:c.a.bool,disabled:c.a.bool,partial:c.a.bool,dataset:c.a.object,keepTreeOnSearch:c.a.bool,keepChildrenOnSearch:c.a.bool,searchModeOn:c.a.bool,onNodeToggle:c.a.func,onAction:c.a.func,onCheckboxChange:c.a.func,simpleSelect:c.a.bool,radioSelect:c.a.bool,showPartiallySelected:c.a.bool,readOnly:c.a.bool,clientId:c.a.string};var Te=ke,_e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Pe=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var Se=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return Ce.call(n),n.computeInstanceProps(e),n.state={items:n.allVisibleNodes.slice(0,n.props.pageSize)},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["Component"]),Pe(t,[{key:"render",value:function(){var e=this.props.searchModeOn;return h.a.createElement("ul",_e({className:"root "+(e?"searchModeOn":""),ref:this.setNodeRef},this.getAriaAttributes()),this.state.scrollableTarget&&h.a.createElement(Y.a,{dataLength:this.state.items.length,next:this.loadMore,hasMore:this.hasMore(),loader:h.a.createElement("span",{className:"searchLoader"},"Loading..."),scrollableTarget:this.state.scrollableTarget},this.state.items))}}]),t}();Se.propTypes={data:c.a.object,keepTreeOnSearch:c.a.bool,keepChildrenOnSearch:c.a.bool,searchModeOn:c.a.bool,onChange:c.a.func,onNodeToggle:c.a.func,onAction:c.a.func,onCheckboxChange:c.a.func,simpleSelect:c.a.bool,radioSelect:c.a.bool,showPartiallySelected:c.a.bool,pageSize:c.a.number,readOnly:c.a.bool,clientId:c.a.string,activeDescendant:c.a.string},Se.defaultProps={pageSize:100};var Ce=function(){var e=this;this.componentWillReceiveProps=function(t){e.computeInstanceProps(t),e.setState({items:e.allVisibleNodes.slice(0,e.currentPage*e.props.pageSize)},function(){var n=t.activeDescendant,r=e.state.scrollableTarget,o=n&&document&&document.getElementById(n);o&&r&&(r.scrollTop=o.offsetTop-(r.clientHeight-o.clientHeight)/2)})},this.componentDidMount=function(){e.setState({scrollableTarget:e.node.parentNode})},this.computeInstanceProps=function(t){if(e.allVisibleNodes=e.getNodes(t),e.totalPages=Math.ceil(e.allVisibleNodes.length/e.props.pageSize),t.activeDescendant){var n=t.activeDescendant.replace(/_li$/,""),r=e.allVisibleNodes.findIndex(function(e){return e.key===n})+1;e.currentPage=r>0?Math.ceil(r/e.props.pageSize):1}else e.currentPage=1},this.getNodes=function(e){var t=e.data,n=e.keepTreeOnSearch,r=e.keepChildrenOnSearch,o=e.searchModeOn,a=e.simpleSelect,i=e.radioSelect,l=e.showPartiallySelected,s=e.readOnly,c=e.onAction,u=e.onChange,d=e.onCheckboxChange,p=e.onNodeToggle,f=e.activeDescendant,g=e.clientId,y=[];return t.forEach(function(e){(function(e,t,n){if(t||e.expanded)return!0;var r=e._parent&&n.get(e._parent);return!r||r.expanded})(e,o,t)&&y.push(h.a.createElement(Te,_e({keepTreeOnSearch:n,keepChildrenOnSearch:r,key:e._id},e,{searchModeOn:o,onChange:u,onCheckboxChange:d,onNodeToggle:p,onAction:c,simpleSelect:a,radioSelect:i,showPartiallySelected:l,readOnly:s,clientId:g,activeDescendant:f})))}),y},this.hasMore=function(){return e.currentPage<e.totalPages},this.loadMore=function(){e.currentPage=e.currentPage+1;var t=e.allVisibleNodes.slice(0,e.currentPage*e.props.pageSize);e.setState({items:t})},this.setNodeRef=function(t){e.node=t},this.getAriaAttributes=function(){var t=e.props,n=t.readOnly,r=t.simpleSelect,o={};return o.role=r?"listbox":"tree",o["aria-multiselectable"]=r?"false":"true",o["aria-readonly"]=n?"true":"false",o}},Ee=Se,xe=n(5),Ne=n.n(xe),je=function(e){return e},De=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"children",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:je;return Ne()(e[t],function(e){return n(e).checked})||e[t].some(function(e){return n(e).partial})};var Re=function(e){var t=e.tree,n=e.simple,r=e.radio,o=e.showPartialState,a=e.hierarchical,i=e.rootPrefixId;return function e(t){var n=t.nodes,r=t.parent,o=t.depth,a=void 0===o?0:o,i=t.simple,l=t.radio,s=t.showPartialState,c=t.hierarchical,u=t.rootPrefixId,h=t._rv,d=void 0===h?{list:new Map,defaultValues:[],singleSelectedNode:null}:h,f=i||l;return n.forEach(function(t,n){t._depth=a,r?(t._id=t.id||r._id+"-"+n,t._parent=r._id,r._children.push(t._id)):t._id=t.id||""+(u?u+"-"+n:n),f&&t.checked&&(d.singleSelectedNode?t.checked=!1:d.singleSelectedNode=t),f&&t.isDefaultValue&&d.singleSelectedNode&&!d.singleSelectedNode.isDefaultValue&&(d.singleSelectedNode.checked=!1,d.singleSelectedNode=null),!t.isDefaultValue||f&&0!==d.defaultValues.length||(d.defaultValues.push(t._id),t.checked=!0,f&&(d.singleSelectedNode=t)),c&&!l||function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&!arguments[2]?["disabled"]:["checked","disabled"],r=0;r<n.length;r++){var o=n[r];void 0===e[o]&&void 0!==t[o]&&(e[o]=t[o])}}(t,r,!l),d.list.set(t._id,t),!i&&t.children&&(t._children=[],e({nodes:t.children,parent:t,depth:a+1,radio:l,showPartialState:s,hierarchical:c,_rv:d}),s&&!t.checked&&(t.partial=De(t),f||p(t.children)||!t.children.every(function(e){return e.checked})||(t.checked=!0)),t.children=void 0)}),d}({nodes:Array.isArray(t)?t:[t],simple:n,radio:r,showPartialState:o,hierarchical:a,rootPrefixId:i})},Ie=function e(t,n,r){n[t._id]=!0,p(t._children)||t._children.forEach(function(t){return e(r(t),n,r)})},Me=function(e,t){var n=[],r={};return e.forEach(function(e,o){r[o]||(t(e,o,r)&&n.push(e),r[o]=!0)}),n},Ae={getNodesMatching:Me,getVisibleNodes:function(e,t,n){return Me(e,function(e,r,o){return n&&e._children&&e._children.length&&!0!==e.expanded&&Ie(e,o,t),!e.hide})},markSubTreeVisited:Ie},Fe=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&l.return&&l.return()}finally{if(o)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),Le="ArrowUp",Be="ArrowDown",Ve="ArrowLeft",Ye="ArrowRight",Ke="Enter",qe="Home",He="PageUp",Ue="End",We="PageDown",ze={None:"None",FocusPrevious:"FocusPrevious",FocusNext:"FocusNext",FocusParent:"FocusParent",FocusFirst:"FocusFirst",FocusLast:"FocusLast",ToggleExpanded:"ToggleExpanded",ToggleChecked:"ToggleChecked"},$e=new Set([ze.FocusPrevious,ze.FocusNext,ze.FocusParent,ze.FocusFirst,ze.FocusLast]),Je=[Le,Be,qe,He,Ue,We],Ze=Je.concat([Ve,Ye,Ke]),Ge=function(e,t,n,r){return t.indexOf(e)>-1||!n&&e===r},Qe=function(e,t,n){if(!e||0===e.length)return t;var r=t;(function(e){return Ge(e,[ze.FocusFirst,ze.FocusLast],!0)})(n)?r=Fe(e,1)[0]:[ze.FocusPrevious,ze.FocusNext].indexOf(n)>-1&&(r=function(e,t){var n=e.indexOf(t)+1;return n%e.length==0?e[0]:e[n]}(e,t));return r},Xe={isValidKey:function(e,t){return(t?Ze:Je).indexOf(e)>-1},getAction:function(e,t){return t===Ve?function(e,t){return e&&t===Ve?!0===e.expanded?ze.ToggleExpanded:e._parent?ze.FocusParent:ze.None:ze.None}(e,t):t===Ye?function(e,t){return e&&e._children&&t===Ye?!0!==e.expanded?ze.ToggleExpanded:ze.FocusNext:ze.None}(e,t):function(e,t){return Ge(e,[qe,He],t,Be)}(t,e)?ze.FocusFirst:function(e,t){return Ge(e,[Ue,We],t,Le)}(t,e)?ze.FocusLast:function(e,t){if(!e)return ze.None;switch(t){case Le:return ze.FocusPrevious;case Be:return ze.FocusNext;case Ke:return ze.ToggleChecked;default:return ze.None}}(e,t)},getNextFocus:function(e,t,n,r,o){if(n===ze.FocusParent)return function(e,t){return e&&e._parent?t(e._parent):e}(t,r);if(!$e.has(n))return t;var a=Ae.getVisibleNodes(e,r,o);return function(e){return Ge(e,[ze.FocusPrevious,ze.FocusLast],!0)}(n)&&(a=a.reverse()),Qe(a,t,n)},getNextFocusAfterTagDelete:function(e,t,n,r){var o=t&&t.findIndex(function(t){return t._id===e});if(o<0||!n.length)return r;var a=n[o=n.length>o?o:n.length-1]._id,i=document.getElementById(a+"_tag");return i&&i.firstElementChild||r},handleFocusNavigationkey:function(e,t,n,r,o){var a=Xe.getNextFocus(e,n,t,r,o);return n&&a&&n._id!==a._id&&(n._focused=!1),a?(a._focused=!0,a._id):n&&n._id},handleToggleNavigationkey:function(e,t,n,r,o){return e!==ze.ToggleChecked||n||t.readOnly||t.disabled?e===ze.ToggleExpanded&&o(t._id):r(t._id,!0!==t.checked),t&&t._id}},et=Xe,tt=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var nt=function(){function e(t){var n=t.data,r=t.simpleSelect,o=t.radioSelect,a=t.showPartiallySelected,i=t.hierarchical,l=t.rootPrefixId;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._src=n;var s=Re({tree:JSON.parse(JSON.stringify(n)),simple:r,radio:o,showPartialState:a,hierarchical:i,rootPrefixId:l}),c=s.list,u=s.defaultValues,h=s.singleSelectedNode;this.tree=c,this.defaultValues=u,this.simpleSelect=r,this.radioSelect=o,this.showPartialState=!i&&a,this.searchMaps=new Map,this.hierarchical=i,(r||o)&&h&&(this.currentChecked=h._id)}return tt(e,[{key:"getNodeById",value:function(e){return this.tree.get(e)}},{key:"getMatches",value:function(e){var t=this;if(this.searchMaps.has(e))return this.searchMaps.get(e);var n=-1,r=e;this.searchMaps.forEach(function(t,o){e.startsWith(o)&&o.length>n&&(n=o.length,r=o)});var o=[],a=function(t){t.label.toLowerCase().indexOf(e)>=0&&o.push(t._id)};r!==e?this.searchMaps.get(r).forEach(function(e){return a(t.getNodeById(e))}):this.tree.forEach(a);return this.searchMaps.set(e,o),o}},{key:"addParentsToTree",value:function(e,t){if(void 0!==e){var n=this.getNodeById(e);this.addParentsToTree(n._parent,t),n.hide=!0,n.matchInChildren=!0,t.set(e,n)}}},{key:"addChildrenToTree",value:function(e,t,n){var r=this;void 0!==e&&e.forEach(function(e){if(!n||!n.includes(e)){var o=r.getNodeById(e);o.matchInParent=!0,t.set(e,o),r.addChildrenToTree(o._children,t)}})}},{key:"filterTree",value:function(e,t,n){var r=this,o=this.getMatches(e.toLowerCase()),a=new Map;o.forEach(function(e){var i=r.getNodeById(e);i.hide=!1,t&&r.addParentsToTree(i._parent,a),a.set(e,i),t&&n&&r.addChildrenToTree(i._children,a,o)});var i=0===o.length;return this.matchTree=a,{allNodesHidden:i,tree:a}}},{key:"restoreNodes",value:function(){return this.tree.forEach(function(e){e.hide=!1}),this.tree}},{key:"restoreDefaultValues",value:function(){var e=this;return this.defaultValues.forEach(function(t){e.setNodeCheckedState(t,!0)}),this.tree}},{key:"togglePreviousChecked",value:function(e,t){var n=this.currentChecked;n&&n!==e&&(this.getNodeById(n).checked=!1),this.currentChecked=t?e:null}},{key:"setNodeCheckedState",value:function(e,t){var n=this.getNodeById(e);n.checked=t,this.showPartialState&&(n.partial=!1),this.simpleSelect?this.togglePreviousChecked(e,t):this.radioSelect?(this.togglePreviousChecked(e,t),this.showPartialState&&this.partialCheckParents(n),t||this.unCheckParents(n)):(this.hierarchical||this.toggleChildren(e,t),this.showPartialState&&this.partialCheckParents(n),this.hierarchical||t||this.unCheckParents(n))}},{key:"unCheckParents",value:function(e){for(var t=e._parent;t;){var n=this.getNodeById(t);n.checked=!1,n.partial=De(n,"_children",this.getNodeById.bind(this)),t=n._parent}}},{key:"partialCheckParents",value:function(e){for(var t=this,n=e._parent;n;){var r=this.getNodeById(n);r.checked=r._children.every(function(e){return t.getNodeById(e).checked}),r.partial=De(r,"_children",this.getNodeById.bind(this)),n=r._parent}}},{key:"toggleChildren",value:function(e,t){var n=this,r=this.getNodeById(e);r.checked=t,this.showPartialState&&(r.partial=!1),p(r._children)||r._children.forEach(function(e){return n.toggleChildren(e,t)})}},{key:"toggleNodeExpandState",value:function(e){var t=this.getNodeById(e);return t.expanded=!t.expanded,t.expanded||this.collapseChildren(t),this.tree}},{key:"collapseChildren",value:function(e){var t=this;e.expanded=!1,p(e._children)||e._children.forEach(function(e){return t.collapseChildren(t.getNodeById(e))})}},{key:"getTreeAndTags",value:function(){return{tree:this.tree,tags:this.tags}}},{key:"handleNavigationKey",value:function(e,t,n,r,o,a,i){var l=this,s=e&&this.getNodeById(e),c=et.getAction(s,n);return $e.has(c)?et.handleFocusNavigationkey(t,c,s,function(e){return l.getNodeById(e)},o):s&&t.has(s._id)?et.handleToggleNavigationkey(c,s,r,a,i):e}},{key:"tags",get:function(){var e=this;return this.radioSelect||this.simpleSelect?this.currentChecked?[this.getNodeById(this.currentChecked)]:[]:Ae.getNodesMatching(this.tree,function(t,n,r){return t.checked&&!e.hierarchical&&Ae.markSubTreeVisited(t,r,function(t){return e.getNodeById(t)}),t.checked})}}]),e}(),rt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ot=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();
/*!
 * React Dropdown Tree Select
 * A lightweight, fast and highly customizable tree select component.
 * Hrusikesh Panda <hrusikesh.panda@dowjones.com>
 * Copyright (c) 2017 Dow Jones, Inc. <support@dowjones.com> (http://dowjones.com)
 * license MIT
 * see https://github.com/dowjones/react-dropdown-tree-select
 */
var at=l.a.bind(R.a),it=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.initNewProps=function(e){var t=e.data,r=e.simpleSelect,o=e.radioSelect,a=e.showPartiallySelected,i=e.hierarchical;n.treeManager=new nt({data:t,simpleSelect:r,radioSelect:o,showPartiallySelected:a,hierarchical:i,rootPrefixId:n.clientId});var l=n.state.currentFocus&&n.treeManager.getNodeById(n.state.currentFocus);l&&(l._focused=!0),n.setState(n.treeManager.getTreeAndTags())},n.resetSearchState=function(){return n.searchInput.value="",{tree:n.treeManager.restoreNodes(),searchModeOn:!1,allNodesHidden:!1}},n.handleClick=function(e,t){n.setState(function(e){var t=n.props.showDropdownAlways||n.keepDropdownActive||!e.showDropdown;return t!==e.showDropdown&&(t?document.addEventListener("click",n.handleOutsideClick,!1):document.removeEventListener("click",n.handleOutsideClick,!1)),t?n.props.onFocus():n.props.onBlur(),t?{showDropdown:t}:rt({showDropdown:t},n.resetSearchState())},t)},n.handleOutsideClick=function(e){!n.props.showDropdownAlways&&f(e,n.node)&&n.handleClick()},n.onInputChange=function(e){var t=n.treeManager.filterTree(e,n.props.keepTreeOnSearch,n.props.keepChildrenOnSearch),r=t.allNodesHidden,o=t.tree,a=e.length>0;n.setState({tree:o,searchModeOn:a,allNodesHidden:r})},n.onTagRemove=function(e,t){var r=n.state.tags;n.onCheckboxChange(e,!1,function(o){t&&et.getNextFocusAfterTagDelete(e,r,o,n.searchInput).focus()})},n.onNodeToggle=function(e){n.treeManager.toggleNodeExpandState(e);var t=n.state.searchModeOn?n.treeManager.matchTree:n.treeManager.tree;n.setState({tree:t}),"function"==typeof n.props.onNodeToggle&&n.props.onNodeToggle(n.treeManager.getNodeById(e))},n.onCheckboxChange=function(e,t,r){var o=n.props,a=o.simpleSelect,i=o.radioSelect,l=o.keepOpenOnSelect;n.treeManager.setNodeCheckedState(e,t);var s=n.treeManager.tags,c=a||i,u=!(c&&!l)&&n.state.showDropdown;s.length||(n.treeManager.restoreDefaultValues(),s=n.treeManager.tags);var h={tree:n.state.searchModeOn?n.treeManager.matchTree:n.treeManager.tree,tags:s,showDropdown:u};(c&&!u||n.props.clearSearchOnChange)&&Object.assign(h,n.resetSearchState()),c&&!u&&document.removeEventListener("click",n.handleOutsideClick,!1),n.setState(h,function(){r&&r(s)}),n.props.onChange(n.treeManager.getNodeById(e),s)},n.onAction=function(e,t){"function"==typeof n.props.onAction&&n.props.onAction(e,n.treeManager.getNodeById(t))},n.onInputFocus=function(){n.keepDropdownActive=!0},n.onInputBlur=function(){n.keepDropdownActive=!1},n.onTrigger=function(e){n.handleClick(e,function(){n.state.showDropdown&&n.searchInput.focus()})},n.onKeyboardKeyDown=function(e){var t=n.props,r=t.readOnly,o=t.simpleSelect,a=n.state,i=a.showDropdown,l=a.tags,s=a.searchModeOn,c=a.currentFocus,u=n.treeManager,h=s?u.matchTree:u.tree;if(i||!et.isValidKey(e.key,!1)&&!/^\w$/i.test(e.key))if(i&&et.isValidKey(e.key,!0)){var d=u.handleNavigationKey(c,h,e.key,r,!s,n.onCheckboxChange,n.onNodeToggle);d!==c&&n.setState({currentFocus:d})}else{if(i&&["Escape","Tab"].indexOf(e.key)>-1)return void(o&&h.has(c)?n.onCheckboxChange(c,!0):(n.keepDropdownActive=!1,n.handleClick()));if("Backspace"!==e.key||!l.length||0!==n.searchInput.value.length)return;var p=l.pop();n.onCheckboxChange(p._id,!1)}else if(e.persist(),n.handleClick(null,function(){return n.onKeyboardKeyDown(e)}),/\w/i.test(e.key))return;e.preventDefault()},n.state={showDropdown:n.props.showDropdown||n.props.showDropdownAlways||!1,searchModeOn:!1,currentFocus:void 0},n.clientId=e.id||y.get(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u["Component"]),ot(t,[{key:"componentWillMount",value:function(){var e=this.props,t=e.data,n=e.hierarchical;this.initNewProps(rt({data:t,hierarchical:n},this.props))}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this.handleOutsideClick,!1)}},{key:"componentWillReceiveProps",value:function(e){this.initNewProps(e)}},{key:"render",value:function(){var e=this,t=this.props,n=t.disabled,r=t.readOnly,o=t.simpleSelect,a=t.radioSelect,i=t.label,l=this.state.showDropdown,s={disabled:n,readOnly:r,activeDescendant:this.state.currentFocus?this.state.currentFocus+"_li":void 0,label:i,simpleSelect:o,radioSelect:a};return h.a.createElement("div",{id:this.clientId,className:at(this.props.className,"react-dropdown-tree-select"),ref:function(t){e.node=t}},h.a.createElement("div",{className:at("dropdown",{"simple-select":o},{"radio-select":a})},h.a.createElement(B,rt({onTrigger:this.onTrigger,showDropdown:l},s),h.a.createElement(j,rt({inputRef:function(t){e.searchInput=t},tags:this.state.tags,placeholderText:this.props.placeholderText,onInputChange:this.onInputChange,onFocus:this.onInputFocus,onBlur:this.onInputBlur,onTagRemove:this.onTagRemove,onKeyDown:this.onKeyboardKeyDown,labelRemove:this.props.labelRemove},s))),l&&h.a.createElement("div",{className:"dropdown-content"},this.state.allNodesHidden?h.a.createElement("span",{className:"no-matches"},this.props.noMatchesText||"No matches found"):h.a.createElement(Ee,rt({data:this.state.tree,keepTreeOnSearch:this.props.keepTreeOnSearch,keepChildrenOnSearch:this.props.keepChildrenOnSearch,searchModeOn:this.state.searchModeOn,onAction:this.onAction,onCheckboxChange:this.onCheckboxChange,onNodeToggle:this.onNodeToggle,showPartiallySelected:this.props.showPartiallySelected,clientId:this.clientId},s)))))}}]),t}();it.propTypes={data:c.a.oneOfType([c.a.object,c.a.array]).isRequired,clearSearchOnChange:c.a.bool,keepTreeOnSearch:c.a.bool,keepChildrenOnSearch:c.a.bool,keepOpenOnSelect:c.a.bool,placeholderText:c.a.string,showDropdown:c.a.bool,showDropdownAlways:c.a.bool,className:c.a.string,onChange:c.a.func,onAction:c.a.func,onNodeToggle:c.a.func,onFocus:c.a.func,onBlur:c.a.func,simpleSelect:c.a.bool,radioSelect:c.a.bool,noMatchesText:c.a.string,showPartiallySelected:c.a.bool,disabled:c.a.bool,readOnly:c.a.bool,hierarchical:c.a.bool,id:c.a.string,label:c.a.string,labelRemove:c.a.string},it.defaultProps={onFocus:function(){},onBlur:function(){},onChange:function(){}};t.default=it},,,,,function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";var r=n(14);function o(){}e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}}])});
//# sourceMappingURL=react-dropdown-tree-select.js.map

/***/ }),

/***/ "./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js ***!
  \***************************************************************************/
/*! exports provided: IGNORE_CLASS_NAME, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IGNORE_CLASS_NAME", function() { return IGNORE_CLASS_NAME; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);



function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/**
 * Check whether some DOM node is our Component's node.
 */
function isNodeFound(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  } // SVG <use/> elements do not technically reside in the rendered DOM, so
  // they do not have classList directly, but they offer a link to their
  // corresponding element, which can have classList. This extra check is for
  // that case.
  // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
  // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17


  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass);
  }

  return current.classList.contains(ignoreClass);
}
/**
 * Try to find our node in a hierarchy of nodes, returning the document
 * node as highest node if our node is not found in the path up.
 */

function findHighest(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  } // If source=local then this event came from 'somewhere'
  // inside and should be ignored. We could handle this with
  // a layered approach, too, but that requires going back to
  // thinking in terms of Dom node nesting, running counter
  // to React's 'you shouldn't care about the DOM' philosophy.


  while (current.parentNode) {
    if (isNodeFound(current, componentNode, ignoreClass)) {
      return true;
    }

    current = current.parentNode;
  }

  return current;
}
/**
 * Check if the browser scrollbar was clicked
 */

function clickedScrollbar(evt) {
  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
}

// ideally will get replaced with external dep
// when rafrex/detect-passive-events#4 and rafrex/detect-passive-events#5 get merged in
var testPassiveEventSupport = function testPassiveEventSupport() {
  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
    return;
  }

  var passive = false;
  var options = Object.defineProperty({}, 'passive', {
    get: function get() {
      passive = true;
    }
  });

  var noop = function noop() {};

  window.addEventListener('testPassiveEventSupport', noop, options);
  window.removeEventListener('testPassiveEventSupport', noop, options);
  return passive;
};

function autoInc(seed) {
  if (seed === void 0) {
    seed = 0;
  }

  return function () {
    return ++seed;
  };
}

var uid = autoInc();

var passiveEventSupport;
var handlersMap = {};
var enabledInstances = {};
var touchEvents = ['touchstart', 'touchmove'];
var IGNORE_CLASS_NAME = 'ignore-react-onclickoutside';
/**
 * Options for addEventHandler and removeEventHandler
 */

function getEventHandlerOptions(instance, eventName) {
  var handlerOptions = null;
  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;

  if (isTouchEvent && passiveEventSupport) {
    handlerOptions = {
      passive: !instance.props.preventDefault
    };
  }

  return handlerOptions;
}
/**
 * This function generates the HOC function that you'll use
 * in order to impart onOutsideClick listening to an
 * arbitrary component. It gets called at the end of the
 * bootstrapping code to yield an instance of the
 * onClickOutsideHOC function defined inside setupHOC().
 */


function onClickOutsideHOC(WrappedComponent, config) {
  var _class, _temp;

  var componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(onClickOutside, _Component);

    function onClickOutside(props) {
      var _this;

      _this = _Component.call(this, props) || this;

      _this.__outsideClickHandler = function (event) {
        if (typeof _this.__clickOutsideHandlerProp === 'function') {
          _this.__clickOutsideHandlerProp(event);

          return;
        }

        var instance = _this.getInstance();

        if (typeof instance.props.handleClickOutside === 'function') {
          instance.props.handleClickOutside(event);
          return;
        }

        if (typeof instance.handleClickOutside === 'function') {
          instance.handleClickOutside(event);
          return;
        }

        throw new Error("WrappedComponent: " + componentName + " lacks a handleClickOutside(event) function for processing outside click events.");
      };

      _this.enableOnClickOutside = function () {
        if (typeof document === 'undefined' || enabledInstances[_this._uid]) {
          return;
        }

        if (typeof passiveEventSupport === 'undefined') {
          passiveEventSupport = testPassiveEventSupport();
        }

        enabledInstances[_this._uid] = true;
        var events = _this.props.eventTypes;

        if (!events.forEach) {
          events = [events];
        }

        handlersMap[_this._uid] = function (event) {
          if (_this.componentNode === null) return;

          if (_this.props.preventDefault) {
            event.preventDefault();
          }

          if (_this.props.stopPropagation) {
            event.stopPropagation();
          }

          if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;
          var current = event.target;

          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
            return;
          }

          _this.__outsideClickHandler(event);
        };

        events.forEach(function (eventName) {
          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_this, eventName));
        });
      };

      _this.disableOnClickOutside = function () {
        delete enabledInstances[_this._uid];
        var fn = handlersMap[_this._uid];

        if (fn && typeof document !== 'undefined') {
          var events = _this.props.eventTypes;

          if (!events.forEach) {
            events = [events];
          }

          events.forEach(function (eventName) {
            return document.removeEventListener(eventName, fn, getEventHandlerOptions(_this, eventName));
          });
          delete handlersMap[_this._uid];
        }
      };

      _this.getRef = function (ref) {
        return _this.instanceRef = ref;
      };

      _this._uid = uid();
      return _this;
    }
    /**
     * Access the WrappedComponent's instance.
     */


    var _proto = onClickOutside.prototype;

    _proto.getInstance = function getInstance() {
      if (!WrappedComponent.prototype.isReactComponent) {
        return this;
      }

      var ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    };

    /**
     * Add click listeners to the current document,
     * linked to this component's state.
     */
    _proto.componentDidMount = function componentDidMount() {
      // If we are in an environment without a DOM such
      // as shallow rendering or snapshots then we exit
      // early to prevent any unhandled errors being thrown.
      if (typeof document === 'undefined' || !document.createElement) {
        return;
      }

      var instance = this.getInstance();

      if (config && typeof config.handleClickOutside === 'function') {
        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);

        if (typeof this.__clickOutsideHandlerProp !== 'function') {
          throw new Error("WrappedComponent: " + componentName + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
        }
      }

      this.componentNode = Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["findDOMNode"])(this.getInstance()); // return early so we dont initiate onClickOutside

      if (this.props.disableOnClickOutside) return;
      this.enableOnClickOutside();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      this.componentNode = Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["findDOMNode"])(this.getInstance());
    };
    /**
     * Remove all document's event listeners for this component
     */


    _proto.componentWillUnmount = function componentWillUnmount() {
      this.disableOnClickOutside();
    };
    /**
     * Can be called to explicitly enable event listening
     * for clicks and touches outside of this element.
     */


    /**
     * Pass-through render
     */
    _proto.render = function render() {
      // eslint-disable-next-line no-unused-vars
      var _props = this.props,
          excludeScrollbar = _props.excludeScrollbar,
          props = _objectWithoutProperties(_props, ["excludeScrollbar"]);

      if (WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef;
      } else {
        props.wrappedRef = this.getRef;
      }

      props.disableOnClickOutside = this.disableOnClickOutside;
      props.enableOnClickOutside = this.enableOnClickOutside;
      return Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(WrappedComponent, props);
    };

    return onClickOutside;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]), _class.displayName = "OnClickOutside(" + componentName + ")", _class.defaultProps = {
    eventTypes: ['mousedown', 'touchstart'],
    excludeScrollbar: config && config.excludeScrollbar || false,
    outsideClickIgnoreClass: IGNORE_CLASS_NAME,
    preventDefault: false,
    stopPropagation: false
  }, _class.getClass = function () {
    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
  }, _temp;
}


/* harmony default export */ __webpack_exports__["default"] = (onClickOutsideHOC);


/***/ })

/******/ });
//# sourceMappingURL=classroom-07def3ad593a00fb12ea.js.map