import history from '../history'

import { BASE_URL } from '../utils/config'

import { angleToVector, vectorToAngle
} from '../utils/vectors'
import { validateQuantityUnit, splitQuantityUnit
} from '../utils/units'

import request from '../utils/request'

const API_PREFIX = '/api/v1/studio/'
const API_PROFILE_PREFIX = '/api/v1/profiles/'


// TODO move constants to /constants

export const ActionTypes = Object.freeze({
  REQUEST_ADD_COURSE: 'REQUEST_ADD_COURSE',
  COURSES_LOADED: 'COURSES_LOADED',
  ALL_COURSES_LOADED: 'ALL_COURSES_LOADED',
  SEARCH_COURSES_LOADED: 'SEARCH_COURSES_LOADED',
  SEARCH_UNITS_LOADED: 'SEARCH_UNITS_LOADED',
  SEARCH_MODULES_LOADED: 'SEARCH_MODULES_LOADED',
  SEARCH_LESSONS_LOADED: 'SEARCH_LESSONS_LOADED',
  RECENT_COURSES_LOADED: 'RECENT_COURSES_LOADED',
  POPULAR_COURSES_LOADED: 'POPULAR_COURSES_LOADED',
  SEARCH_QUESTIONS_LOADED: 'SEARCH_QUESTIONS_LOADED',
  NEW_COURSES_LOADED: 'NEW_COURSES_LOADED',
  LOAD_COURSES: 'LOAD_COURSES',
  PUBLIC_COURSE_LOADED: 'PUBLIC_COURSE_LOADED',
  COURSE_LOADED: 'COURSE_LOADED',
  RENAME_COURSE: 'RENAME_COURSE',
  CHANGE_COURSE_IMAGE: 'CHANGE_COURSE_IMAGE',
  DELETE_COURSE: 'DELETE_COURSE',
  UNIT_LOADED: 'UNIT_LOADED',
  UNIT_ADDED: 'UNIT_ADDED',
  DELETE_UNIT: 'DELETE_UNIT',
  MODULE_ADDED: 'MODULE_ADDED',
  MODULE_LOADED: 'MODULE_LOADED',
  DELETE_MODULE: 'DELETE_MODULE',
  LESSON_LOADED: 'LESSON_LOADED',
  LESSON_AVAILABLE: 'LESSON_AVAILABLE',
  LESSON_ADDED: 'LESSON_ADDED',
  DELETE_LESSON: 'DELETE_LESSON',
  QUESTION_LOADED: 'QUESTION_LOADED',
  QUESTION_ADDED: 'QUESTION_ADDED',
  QUESTION_MOVED: 'QUESTION_MOVED',
  PRESERVE_ANSWERS: 'PRESERVE_ANSWERS',
  GOTO_QUESTION: 'GOTO_QUESTION',
  DELETE_QUESTION: 'DELETE_QUESTION',
  ANSWER_LOADED: 'ANSWER_LOADED',
  ANSWER_ADDED: 'ANSWER_ADDED',
  DELETE_ANSWER: 'DELETE_ANSWER',
  SET_ANSWER_EXCLUSIVELY_CORRECT: 'SET_ANSWER_EXCLUSIVELY_CORRECT',
  SET_ANSWER_IS_CORRECT: 'SET_ANSWER_IS_CORRECT',
  STUDIO_TAB_CHANGED: 'STUDIO_TAB_CHANGED',
  FOUND_USERS_LOADED: 'FOUND_USERS_LOADED',
  FOUND_USERS_REQUEST: 'FOUND_USERS_REQUEST',
  COURSE_NAVIGATION_COURSES_LOADED: 'COURSE_NAVIGATION_COURSES_LOADED',
  COURSE_NAVIGATION_UNITS_LOADED: 'COURSE_NAVIGATION_UNITS_LOADED',
  COURSE_NAVIGATION_MODULES_LOADED: 'COURSE_NAVIGATION_MODULES_LOADED',
  COURSE_NAVIGATION_LESSONS_LOADED: 'COURSE_NAVIGATION_LESSONS_LOADED'
})

export function courseAdded (course) {
  return {type: ActionTypes.COURSE_ADDED, course: course}
}

export function changeStudioSelectedTab (selectedTab, tabNamespace) {
  return {
    type: ActionTypes.STUDIO_TAB_CHANGED,
    tab: selectedTab,
    namespace: tabNamespace
  }
}

export function addCourseTag (uuid, tag) {
  return function (dispatch) {
    request(API_PREFIX + 'courses/' + uuid + '/tags/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ tag: tag.text })
    })
  }
}

export function deleteCourseTag (uuid, tag) {
  return function (dispatch) {
    request(API_PREFIX + 'courses/' + uuid + '/tags/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ tag: tag.text })
    })
  }
}

export function addUnitTag (uuid, tag) {
  return function (dispatch) {
    request(API_PREFIX + 'units/' + uuid + '/tags/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ tag: tag.text })
    })
  }
}

export function deleteUnitTag (uuid, tag) {
  return function (dispatch) {
    request(API_PREFIX + 'units/' + uuid + '/tags/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ tag: tag.text })
    })
  }
}

export function addModuleTag (uuid, tag) {
  return function (dispatch) {
    request(API_PREFIX + 'modules/' + uuid + '/tags/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ tag: tag.text })
    })
  }
}

export function deleteModuleTag (uuid, tag) {
  return function (dispatch) {
    request(API_PREFIX + 'modules/' + uuid + '/tags/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ tag: tag.text })
    })
  }
}

export function addQuestionTag (uuid, tag) {
  return function (dispatch) {
    request(API_PREFIX + 'questions/' + uuid + '/tags/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ tag: tag.text })
    }).then((value) => {
      $.ajax({
        async: true,
        url: API_PREFIX + 'questions/' + uuid + '/',
        success: function (data, status, jqXHR) {
          dispatch(questionLoaded(data))
        }
      })
    }
    )
  }
}

export function deleteQuestionTag (uuid, tag) {
  return function (dispatch) {
    request(API_PREFIX + 'questions/' + uuid + '/tags/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ tag: tag.text })
    }).then((value) => {
      $.ajax({
        async: true,
        url: API_PREFIX + 'questions/' + uuid + '/',
        success: function (data, status, jqXHR) {
          dispatch(questionLoaded(data))
        }
      })
    })
  }
}

export function addCourse (prototype) {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'courses/',
      method: 'POST',
      data: {
        name: 'New course',
        prototype: prototype
      },
      success: function (data, status, jqXHR) {
        dispatch(courseLoaded(data))
        history.push(BASE_URL + 'studio/editor/courses/' + data.uuid + '/')
      },
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status === 403) {
          document.location.href = '/accounts/login/?next=/browse/'
        }
      }
    })
  }
}

export function addCourseToDashboard (uuid) {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'public/courses/' + uuid + '/add_to_dashboard/',
      method: 'POST',
      success: function (data, status, jqXHR) {
      },
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status === 403) {
          // TODO implement with pop up messages/alerts
          alert('Please login or sign up to use your dashboard')
        }
      }
    })
  }
}

export function removeCourseFromDashboard (uuid) {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'public/courses/' + uuid + '/remove_from_dashboard/',
      method: 'POST',
      success: function (data, status, jqXHR) {
      }
    })
  }
}

export function coursesLoaded (data) {
  var units = extractAll(data, 'units')
  var modules = extractAll(units, 'modules')

  return {
    type: ActionTypes.COURSES_LOADED,
    courses: data,
    units: units,
    modules: modules
  }
}

function extract (object, prop) {
  var ret = object[prop]
  var ids = []
  for (var k in object[prop]) {
    ids.push(k)
  }
  Object.assign(object, {[prop]: ids})
  return ret
}

function extractAll (object, prop) {
  var ret = {}
  for (var k in object) {
    Object.assign(ret, extract(object[k], prop))
  }
  return ret
}

export function allCoursesLoaded (data, filter, ordering) {
  var type = ActionTypes.ALL_COURSES_LOADED
  if (filter === 'recent') {
    type = ActionTypes.RECENT_COURSES_LOADED
  }
  if (ordering === '-created_on') {
    type = ActionTypes.NEW_COURSES_LOADED
  }
  if (ordering === '-number_of_learners_denormalized') {
    type = ActionTypes.POPULAR_COURSES_LOADED
  }
  return {
    type: type,
    courses: data
  }
}

export function loadMyCourses () {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'courses/',
      context: this,
      success: function (data, status, jqXHR) {
        dispatch((data) => {
          return {
            type: ActionTypes.COURSES_LOADED,
            courses: data
          }
        })
      }
    })
  }
}

export function loadAllCourses (url, filter, ordering) {
  return function (dispatch) {
    var GETParams = {}
    if (filter) {
      GETParams['filter'] = filter
    }
    if (ordering) {
      GETParams['ordering'] = ordering
    }

    var paramsString = ''

    if (Object.keys(GETParams).length !== 0) {
      paramsString = '?' + Object.entries(GETParams).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
    }
    $.ajax({
      async: true,
      url: url || API_PREFIX + 'public/courses/' + paramsString,
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(allCoursesLoaded(data, filter, ordering))
      }
    })
  }
}

// export function loadRecentCourses () {
//   return function (dispatch) {
//     $.ajax({
//       async: true,
//       url: API_PREFIX + 'courses/',
//       context: this,
//       success: function (data, status, jqXHR) {
//         dispatch(coursesLoaded(data))
//       }})
//   }
// }

export function loadCourses () {
  return function (dispatch) {
    dispatch(loadAllCourses())
    $.ajax({
      async: true,
      url: API_PREFIX + 'courses/',
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(coursesLoaded(data))
      }
    })
  }
}

function coursesSearchLoaded (data) {
  var type = ActionTypes.SEARCH_COURSES_LOADED
  return {
    type: type,
    coursesSearchList: data
  }
}

export function loadSearchCourses (searchString, nextPageUrl) {
  var url = API_PREFIX + 'public/courses/' // all units

  if (searchString) {
    url = API_PREFIX + 'public/courses/search/?query=' + searchString
  }

  if (nextPageUrl) {
    url = nextPageUrl
  }

  return function (dispatch) {
    $.ajax({
      async: true,
      url: url,
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(coursesSearchLoaded(data))
      }
    })
  }
}

function unitsSearchLoaded (data) {
  var type = ActionTypes.SEARCH_UNITS_LOADED
  return {
    type: type,
    untisSearchList: data
  }
}

export function loadSearchUnits (searchString, nextPageUrl) {
  var url = API_PREFIX + 'public/units/' // all units

  if (searchString) {
    url = API_PREFIX + 'public/units/search/?query=' + searchString
  }

  if (nextPageUrl) {
    url = nextPageUrl
  }

  return function (dispatch) {
    $.ajax({
      async: true,
      url: url,
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(unitsSearchLoaded(data))
      }
    })
  }
}

function modulesSearchLoaded (data) {
  var type = ActionTypes.SEARCH_MODULES_LOADED
  return {
    type: type,
    modulesSearchList: data
  }
}

export function loadSearchModules (searchString, nextPageUrl) {
  var url = API_PREFIX + 'public/modules/' // all units

  if (searchString) {
    url = API_PREFIX + 'public/modules/search/?query=' + searchString
  }

  if (nextPageUrl) {
    url = nextPageUrl
  }

  return function (dispatch) {
    $.ajax({
      async: true,
      url: url,
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(modulesSearchLoaded(data))
      }
    })
  }
}

function lessonsSearchLoaded (data) {
  var type = ActionTypes.SEARCH_LESSONS_LOADED
  return {
    type: type,
    lessonsSearchList: data
  }
}

export function loadSearchLessons (searchString, nextPageUrl) {
  var url = API_PREFIX + 'public/lessons/'

  if (searchString) {
    url = API_PREFIX + 'public/lessons/search/?query=' + searchString
  }

  if (nextPageUrl) {
    url = nextPageUrl
  }

  return function (dispatch) {
    $.ajax({
      async: true,
      url: url,
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(lessonsSearchLoaded(data))
      }
    })
  }
}

function questionsSearchLoaded (data) {
  var type = ActionTypes.SEARCH_QUESTIONS_LOADED
  return {
    type: type,
    questionsSearchList: data
  }
}

export function loadSearchQuestions (searchString, nextPageUrl) {
  var url = API_PREFIX + 'public/questions/'

  if (searchString) {
    url = API_PREFIX + 'public/questions/search/?query=' + searchString
  }

  if (nextPageUrl) {
    url = nextPageUrl
  }

  return function (dispatch) {
    $.ajax({
      async: true,
      url: url,
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(questionsSearchLoaded(data))
      }
    })
  }
}

export function courseLoaded (data) {
  var units = extract(data, 'units')
  var modules = extractAll(units, 'modules')
  return {
    type: ActionTypes.COURSE_LOADED,
    course: data,
    units: units,
    modules: modules
  }
}

export function renameCourse (uuid, newName) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'courses/' + uuid + '/',
      type: 'PATCH',
      data: {name: newName},
      success: function (data, status, jqXHR) {
        dispatch(courseLoaded(data))
      }
    })
  }
}

export function saveCourseDescription (uuid, newText) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'courses/' + uuid + '/',
      type: 'PATCH',
      data: {description: newText},
      success: function (data, status, jqXHR) {
        dispatch(courseLoaded(data))
      }
    })
  }
}

export function publicCourseLoaded (data) {
  return {
    type: ActionTypes.PUBLIC_COURSE_LOADED,
    publicCourse: data
  }
}

export function loadPublicCourse (uuid) {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'public/courses/' + uuid + '/',
      success: function (data, status, jqXHR) {
        dispatch(publicCourseLoaded(data))
      }
    })
  }
}

function loadCourse (uuid, dispatch) {
  $.ajax({
    async: true,
    url: API_PREFIX + 'courses/' + uuid + '/',
    success: function (data, status, jqXHR) {
      dispatch(courseLoaded(data))
    }
  })
}

export function updateCourse (course) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'courses/' + course.uuid + '/',
      dataType: 'json', // due https://github.com/encode/django-rest-framework/issues/5807
      contentType: 'application/json',
      type: 'PATCH',
      data: JSON.stringify(course),
      success: function (data, status, jqXHR) {
        dispatch(courseLoaded(data))
      }
    })
  }
}

export function loadCourseIfNeeded (uuid) {
  return (dispatch, getState) => {
    if (!(uuid in getState().courses)) {
      loadCourse(uuid, dispatch)
    }
  }
}

export function changeCourseImage (uuid, image) {
  return dispatch => {
    var formData = new FormData()
    formData.append('image', image)
    $.ajax({
      url: API_PREFIX + 'courses/' + uuid + '/',
      type: 'PATCH',
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        dispatch(courseLoaded(data))
      }
    })
  }
}

export function changeCourseCoverPhoto (uuid, image) {
  return dispatch => {
    var formData = new FormData()
    formData.append('cover_photo', image, image.filename)
    $.ajax({
      url: API_PREFIX + 'courses/' + uuid + '/',
      type: 'PATCH',
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        dispatch(courseLoaded(data))
      }
    })
  }
}

export function deleteCourse (uuid) {
  return dispatch => {
    dispatch({
      type: ActionTypes.DELETE_COURSE,
      uuid: uuid
    })
    $.ajax({
      async: true,
      url: API_PREFIX + 'courses/' + uuid + '/',
      method: 'DELETE',
      success: function (data, status, jqXHR) {
        history.push(BASE_URL + 'studio/')
        // TODO: reload all courses
      }
    })
  }
}

export function unitAdded (courseUuid, data) {
  return {
    type: ActionTypes.UNIT_ADDED,
    courseUuid: courseUuid,
    unit: data,
    modules: extract(data, 'modules')
  }
}

export function addUnit (courseUuid, unit) {
  var data = {name: 'New unit', course: courseUuid}
  if (unit) {
    data['prototype'] = unit.uuid
    data['name'] = unit.name
  }

  return dispatch => {
    $.ajax({
      async: true,
      url: API_PREFIX + 'units/',
      method: 'POST',
      data: data,
      success: function (data, status, jqXHR) {
        // dispatch(unitAdded(courseUuid, data))
        // reload expanded
        loadCourse(courseUuid, dispatch)
        history.push(BASE_URL + 'studio/editor/courses/' + courseUuid + '/')
      },
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status === 403) {
          document.location.href = '/accounts/login/?next=/browse/'
        }
      }
    })
  }
}

export function addToNewCourse (type, value) {
  return dispatch => {
    $.ajax({ // create course
      async: true,
      url: API_PREFIX + 'courses/',
      method: 'POST',
      data: {
        name: 'New course'
      },
      success: function (data, status, jqXHR) {
        var unitData = {name: 'New unit', course: data.uuid}

        if (type === 'unit') {
          unitData['prototype'] = value.uuid
          unitData['name'] = value.name
        }

        $.ajax({
          async: true,
          url: API_PREFIX + 'units/',
          method: 'POST',
          data: unitData,
          success: function (data, status, jqXHR) {
            if (type === 'unit') {
              // dispatch(unitAdded(unitData.course, data))
              loadCourse(unitData.course, dispatch)
              history.push(BASE_URL + 'studio/editor/courses/' + unitData.course + '/')
            } else {
              // create module
              var moduleData = {name: 'New module', unit: data.uuid}

              if (type === 'module') {
                moduleData['prototype'] = value.uuid
                moduleData['name'] = value.name
              }

              $.ajax({
                async: true,
                url: API_PREFIX + 'modules/',
                method: 'POST',
                data: moduleData,
                success: function (data, status, jqXHR) {
                  if (type === 'module') {
                    // dispatch(moduleAdded(data))
                    loadCourse(unitData.course, dispatch)
                    history.push(BASE_URL + 'studio/editor/modules/' + data.uuid + '/')
                  } else {
                    // create lesson
                    var lessonData = {name: 'New lesson', module: data.uuid}

                    if (type === 'lesson') {
                      // lesson prototype
                      lessonData['prototype'] = value.uuid
                      lessonData['name'] = value.name
                    }

                    // load created module
                    // dispatch(loadModuleIfNeeded(data.uuid))

                    $.ajax({
                      async: true,
                      url: API_PREFIX + 'lessons/',
                      method: 'POST',
                      data: lessonData,
                      success: function (data, status, jqXHR) {
                        if (type === 'lesson') {
                          // var questions = extract(data, 'questions')
                          // dispatch({
                          //   type: ActionTypes.LESSON_ADDED,
                          //   lesson: data,
                          //   questions: questions,
                          //   answers: extractAll(questions, 'answers')
                          // })
                          history.push(BASE_URL + 'studio/editor/lessons/' + data.uuid + '/')
                        } else {
                          // add question
                          var questionData = {text: 'New question', lesson: data.uuid}

                          if (type === 'question') {
                            // question prototype
                            questionData['prototype'] = value.uuid
                            questionData['text'] = value.text
                          }

                          $.ajax({
                            async: true,
                            method: 'POST',
                            url: API_PREFIX + 'questions/',
                            data: questionData,
                            success: function (data, status, jqXHR) {
                              history.push(BASE_URL + 'studio/editor/lessons/' + data.lesson + '/')
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      },
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status === 403) {
          document.location.href = '/accounts/login/?next=/browse/'
        }
      }
    })
  }
}

export function deleteUnit (unitUuid) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.DELETE_UNIT,
      courseUuid: getState().units[unitUuid].course,
      uuid: unitUuid
    })
    $.ajax({
      async: true,
      url: API_PREFIX + 'units/' + unitUuid + '/',
      method: 'DELETE',
      success: function (data, status, jqXHR) {
        // dispatch(unitDeleted(unitUuid))
      }
    })
  }
}

export function renameUnit (uuid, newName) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'units/' + uuid + '/',
      type: 'PATCH',
      data: {name: newName},
      success: function (data, status, jqXHR) {
        dispatch(unitLoaded(data))
      }
    })
  }
}

export function unitLoaded (data) {
  return {
    type: ActionTypes.UNIT_LOADED,
    unit: data,
    modules: extract(data, 'modules')
  }
}

export function changeUnitImage (uuid, image) {
  return dispatch => {
    var formData = new FormData()
    formData.append('image', image)
    $.ajax({
      url: API_PREFIX + 'units/' + uuid + '/',
      type: 'PATCH',
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        dispatch(unitLoaded(data))
      }
    })
  }
}

export function moveUnit (uuid, beforeUuid) {
  return (dispatch, getState) => {
    var state = getState()
    var newPosition
    if (beforeUuid) {
      newPosition = state.units[beforeUuid].position
    } else {
      var cur = state.courses[state.units[uuid].course]
      newPosition = state.units[cur.units[cur.units.length - 1]].position + 1
    }
    $.ajax({
      async: true,
      url: API_PREFIX + 'units/' + uuid + '/',
      method: 'PATCH',
      data: {position: newPosition},
      success: function (data, status, jqXHR) {
        loadCourse(data.course, dispatch)
      }
    })
  }
}

export function moduleAdded (data) {
  return {
    type: ActionTypes.MODULE_ADDED,
    module: data,
    lessons: extract(data, 'lessons')
  }
}

export function addModule (unitUuid, module) {
  var data = {name: 'New module', unit: unitUuid}
  if (module) {
    data['prototype'] = module.uuid
    data['name'] = module.name
  }

  return dispatch => {
    $.ajax({
      async: true,
      url: API_PREFIX + 'modules/',
      method: 'POST',
      data: data,
      success: function (data, status, jqXHR) {
        dispatch(moduleAdded(data))
        history.push(BASE_URL + 'studio/editor/modules/' + data.uuid + '/')
      }
    })
  }
}

export function moduleLoaded (data) {
  return {
    type: ActionTypes.MODULE_LOADED,
    module: data,
    lessons: extract(data, 'lessons')
  }
}

export function renameModule (uuid, newName) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'modules/' + uuid + '/',
      type: 'PATCH',
      data: {name: newName},
      success: function (data, status, jqXHR) {
        dispatch(moduleLoaded(data))
      }
    })
  }
}

export function changeModuleImage (uuid, image) {
  return dispatch => {
    var formData = new FormData()
    formData.append('image', image)
    $.ajax({
      url: API_PREFIX + 'modules/' + uuid + '/',
      type: 'PATCH',
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        dispatch(moduleLoaded(data))
      }
    })
  }
}

export function moveModule (uuid, toUnitUuid, beforeUuid) {
  return (dispatch, getState) => {
    var state = getState()
    var toUnit = state.units[toUnitUuid]
    var fromUnit = state.units[state.modules[uuid].unit]
    var newPosition
    if (beforeUuid) {
      newPosition = state.modules[beforeUuid].position
    } else if (toUnit.modules.length > 0) {
      newPosition = state.modules[toUnit.modules[toUnit.modules.length - 1]].position + 1
    } else {
      newPosition = 1
    }
    $.ajax({
      async: true,
      url: API_PREFIX + 'modules/' + uuid + '/',
      method: 'PATCH',
      data: {
        position: newPosition,
        unit: toUnitUuid
      },
      success: function (data, status, jqXHR) {
        $.ajax({
          async: true,
          url: API_PREFIX + 'units/' + toUnitUuid + '/',
          method: 'GET',
          success: function (data, status, jqXHR) {
            dispatch(unitLoaded(data))
          }
        })
        if (toUnitUuid != fromUnit.uuid) {
          $.ajax({
            async: true,
            url: API_PREFIX + 'units/' + fromUnit.uuid + '/',
            method: 'GET',
            success: function (data, status, jqXHR) {
              dispatch(unitLoaded(data))
            }
          })
        }
      }
    })
  }
}

export function deleteModule (moduleUuid) {
  return (dispatch, getState) => {
    var state = getState()
    var course = state.modules[moduleUuid].course
    dispatch({
      type: ActionTypes.DELETE_MODULE,
      unitUuid: state.modules[moduleUuid].unit,
      uuid: moduleUuid
    })
    $.ajax({
      async: true,
      url: API_PREFIX + 'modules/' + moduleUuid + '/',
      method: 'DELETE',
      success: function (data, status, jqXHR) {
        history.push(BASE_URL + 'studio/editor/courses/' + course + '/')
      }
    })
  }
}

export function loadModuleIfNeeded (uuid) {
  return (dispatch, getState) => {
    if (!(uuid in getState().modules) || !('lessons' in getState().modules[uuid])) {
      $.ajax({
        async: true,
        url: API_PREFIX + 'modules/' + uuid + '/',
        success: function (data, status, jqXHR) {
          dispatch(moduleLoaded(data))
        }
      })
    }
  }
}

export function addLesson (moduleUuid, lesson) {
  var data = {name: 'New lesson', module: moduleUuid}
  if (lesson) {
    data['prototype'] = lesson.uuid
    data['name'] = lesson.name
  }
  return dispatch => {
    if (lesson) {
      // load module
      dispatch(loadModuleIfNeeded(moduleUuid))
    }

    $.ajax({
      async: true,
      url: API_PREFIX + 'lessons/',
      method: 'POST',
      data: data,
      success: function (data, status, jqXHR) {
        var questions = extract(data, 'questions')
        dispatch({
          type: ActionTypes.LESSON_ADDED,
          lesson: data,
          questions: questions,
          answers: extractAll(questions, 'answers')
        })
        history.push(BASE_URL + 'studio/editor/lessons/' + data.uuid + '/')
      }
    })
  }
}

export function lessonLoaded (data) {
  var questions = extract(data, 'questions')
  return {
    type: ActionTypes.LESSON_LOADED,
    lesson: data,
    questions: questions,
    answers: extractAll(questions, 'answers')
  }
}

export function lessonAvailable (lesson) {
  return {
    type: ActionTypes.LESSON_AVAILABLE,
    lesson: lesson
  }
}

export function loadLessonIfNeeded (uuid) {
  return (dispatch, getState) => {
    if (!(uuid in getState().lessons) || !getState().lessons[uuid].questions) {
      $.ajax({
        async: true,
        url: API_PREFIX + 'lessons/' + uuid + '/',
        success: function (data, status, jqXHR) {
          dispatch(lessonLoaded(data))
          if (data.questions.length > 0) {
            dispatch(loadQuestionIfNeeded(data.questions[0])) // WHAT is this?
          }
        }
      })
    } else {
      dispatch(lessonAvailable(getState().lessons[uuid]))
    }
  }
}

export function loadLesson (uuid) {
  return (dispatch, getState) => {
    $.ajax({
      async: true,
      url: API_PREFIX + 'lessons/' + uuid + '/',
      success: function (data, status, jqXHR) {
        dispatch(lessonLoaded(data))
        if (data.questions.length > 0) {
          dispatch(loadQuestionIfNeeded(data.questions[0])) // WHAT is this?
        }
      }})
  }
}

export function renameLesson (uuid, newName) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'lessons/' + uuid + '/',
      type: 'PATCH',
      data: {name: newName},
      success: function (data, status, jqXHR) {
        dispatch(lessonLoaded(data))
      }
    })
  }
}

export function changeLessonImage (uuid, image) {
  return dispatch => {
    var formData = new FormData()
    formData.append('image', image)
    $.ajax({
      url: API_PREFIX + 'lessons/' + uuid + '/',
      type: 'PATCH',
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        dispatch(lessonLoaded(data))
      }
    })
  }
}

export function changeLessonType (uuid, newType) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'lessons/' + uuid + '/',
      type: 'PATCH',
      data: {lesson_type: newType},
      success: function (data, status, jqXHR) {
        dispatch(lessonLoaded(data))
      }
    })
  }
}

export function changeLessonGameType (uuid, newType) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'lessons/' + uuid + '/',
      type: 'PATCH',
      data: {game_type: newType},
      success: function (data, status, jqXHR) {
        dispatch(lessonLoaded(data))
      }
    })
  }
}

export function moveLesson (uuid, toModuleUuid, beforeLessonUuid) {
  return (dispatch, getState) => {
    var state = getState()
    var toModule = state.modules[toModuleUuid]
    var newPosition
    if (beforeLessonUuid) {
      newPosition = state.lessons[beforeLessonUuid].position
    } else if (toModule && toModule.lessons.length > 0) {
      newPosition = state.lessons[toModule.lessons[toModule.lessons.length - 1]].position + 1
    } else {
      newPosition = 1
    }
    $.ajax({
      async: true,
      url: API_PREFIX + 'lessons/' + uuid + '/',
      method: 'PATCH',
      data: {
        position: newPosition,
        module: toModuleUuid
      },
      success: function (data, status, jqXHR) {
        $.ajax({
          async: true,
          url: API_PREFIX + 'modules/' + toModuleUuid + '/',
          method: 'GET',
          success: function (data, status, jqXHR) {
            dispatch(moduleLoaded(data))
          }
        })
      }
    })
  }
}

export function deleteLesson (lessonUuid) {
  return (dispatch, getState) => {
    var state = getState()
    var moduleUuid = state.lessons[lessonUuid].module
    dispatch({
      type: ActionTypes.DELETE_LESSON,
      moduleUuid: moduleUuid,
      uuid: lessonUuid
    })
    $.ajax({
      async: true,
      url: API_PREFIX + 'lessons/' + lessonUuid + '/',
      method: 'DELETE',
      success: function (data, status, jqXHR) {
        history.push(BASE_URL + 'studio/editor/modules/' + moduleUuid + '/')
      }
    })
  }
}

export function questionLoaded (data) {
  return {
    type: ActionTypes.QUESTION_LOADED,
    question: data,
    answers: extract(data, 'answers')
  }
}

export function loadQuestionIfNeeded (uuid) {
  return (dispatch, getState) => {
    if (!(uuid in getState().questions)) {
      $.ajax({
        async: true,
        url: API_PREFIX + 'questions/' + uuid + '/',
        success: function (data, status, jqXHR) {
          dispatch(questionLoaded(data))
        }
      })
    }
  }
}

export function changeQuestionText (uuid, newText) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'questions/' + uuid + '/',
      type: 'PATCH',
      data: {text: newText},
      success: function (data, status, jqXHR) {
        dispatch(questionLoaded(data))
      }
    })
  }
}

export function changeQuestionSolutionText (uuid, newSolutionText) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'questions/' + uuid + '/',
      type: 'PATCH',
      data: {solution_text: newSolutionText},
      success: function (data, status, jqXHR) {
        dispatch(questionLoaded(data))
      }
    })
  }
}

export function preserveAnswers (questionUuid) {
  return {
    type: ActionTypes.PRESERVE_ANSWERS,
    question: questionUuid
  }
}

export function changeQuestionType (uuid, newType) {
  return function (dispatch, getState) {
    var state = getState()
    // var oldAnswerIds
    var data = {answer_type: newType}
    if (state.preservedAnswers[uuid]) {
      data['answers'] = JSON.stringify(state.preservedAnswers[uuid][newType])
    }

    dispatch(preserveAnswers(uuid))
    $.ajax({
      url: API_PREFIX + 'questions/' + uuid + '/',
      type: 'PATCH',
      data: data,
      success: function (data, status, jqXHR) {
        dispatch(questionLoaded(data))
      }
    })
  }
}

export function changeQuestionImage (uuid, image) {
  return dispatch => {
    var formData = new FormData()
    formData.append('image', image)
    $.ajax({
      url: API_PREFIX + 'questions/' + uuid + '/',
      type: 'PATCH',
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        dispatch(questionLoaded(data))
      }
    })
  }
}

export function changeQuestionHint (uuid, newHint) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'questions/' + uuid + '/',
      type: 'PATCH',
      data: {hint: newHint},
      success: function (data, status, jqXHR) {
        dispatch(questionLoaded(data))
      }
    })
  }
}

export function goToQuestion (uuid) {
  return dispatch => {
    dispatch({
      type: ActionTypes.GOTO_QUESTION,
      question: uuid
    })
    dispatch(loadQuestionIfNeeded(uuid))
  }
}

export function addQuestion (lesson, question) {
  var data = {text: 'New question', lesson: lesson}
  if (question) {
    data['prototype'] = question.uuid
  }

  return dispatch => {
    $.ajax({
      async: true,
      method: 'POST',
      url: API_PREFIX + 'questions/',
      data: data, // {lesson : lesson, text : 'New question'},
      success: function (data, status, jqXHR) {
        if (question) {
          history.push(BASE_URL + 'studio/editor/lessons/' + lesson + '/')
          // reload lesson
          dispatch(loadLesson(lesson))
        } else {
          dispatch(
            {
              type: ActionTypes.QUESTION_ADDED,
              question: data
            })
        }
      }
    })
  }
}

export function moveQuestion (uuid, beforeUuid) {
  return (dispatch, getState) => {
    var state = getState()
    var lessonUuid = state.questions[uuid].lesson
    var newPosition
    if (beforeUuid) {
      newPosition = state.questions[beforeUuid].position
    } else {
      var lesson = state.lessons[lessonUuid]
      newPosition = state.questions[lesson.questions[lesson.questions.length - 1]].position + 1
    }
    $.ajax({
      async: true,
      url: API_PREFIX + 'questions/' + uuid + '/',
      method: 'PATCH',
      data: {position: newPosition},
      success: function (data, status, jqXHR) {
        dispatch({
          type: ActionTypes.QUESTION_MOVED,
          uuid: uuid,
          beforeUuid: beforeUuid,
          lessonUuid: lessonUuid
        })
      }
    })
  }
}

export function deleteQuestion (uuid) {
  return (dispatch, getState) => {
    var state = getState()
    var currentLesson = state.lessons[state.questions[uuid].lesson]
    var idx = currentLesson.questions.indexOf(uuid)
    var goToQuestion
    if (idx < currentLesson.questions.length - 1) {
      goToQuestion = currentLesson.questions[idx + 1]
    } else if (idx > 0) {
      goToQuestion = currentLesson.questions[idx - 1]
    } else {
      goToQuestion = null
    }

    $.ajax({
      async: true,
      url: API_PREFIX + 'questions/' + uuid + '/',
      method: 'DELETE',
      success: function (data, status, jqXHR) {
        dispatch({
          type: ActionTypes.DELETE_QUESTION,
          question: uuid,
          lesson: state.questions[uuid].lesson,
          goToQuestion: goToQuestion
        })
        dispatch(loadQuestionIfNeeded(goToQuestion))
      }
    })
  }
}

export function answerLoaded (data) {
  return {
    type: ActionTypes.ANSWER_LOADED,
    answer: data
  }
}

export function loadAnswer (uuid) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'answers/' + uuid + '/',
      type: 'GET',
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function changeAnswerText (uuid, newText) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'answers/' + uuid + '/',
      type: 'PATCH',
      data: {text: newText},
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function changeAnswerMYSQL (uuid, schemaSQL, querySQL) {
  return function (dispatch) {
    $.ajax({
      url: API_PREFIX + 'answers/' + uuid + '/',
      type: 'PATCH',
      data: {schema_SQL: schemaSQL, query_SQL: querySQL},
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      },
      error: function (data) {
        if (data.status === 400) {
          // TODO rewrite with embededd message
          let errorMessage = null
          if (data.responseJSON.hasOwnProperty('schema_SQL')) {
            errorMessage = data.responseJSON.schema_SQL
          } else if (data.responseJSON.hasOwnProperty('query_SQL')) {
            errorMessage = data.responseJSON.query_SQL
          }
          if (errorMessage) { alert(errorMessage) }
          // reload answer due validation error
          dispatch(loadAnswer(uuid))
        }
      }
    })
  }
}

export function changeAnswerImage (uuid, image) {
  return dispatch => {
    let formData
    if (image) {
      formData = new FormData()
      formData.append('image', image)

      $.ajax({
        url: API_PREFIX + 'answers/' + uuid + '/',
        type: 'PATCH',
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {
          dispatch(answerLoaded(data))
        }
      })
    } else {
      formData = {'image': image}
      $.ajax({
        url: API_PREFIX + 'answers/' + uuid + '/',
        type: 'PATCH',
        data: formData,
        success: function (data) {
          dispatch(answerLoaded(data))
        }
      })
    }
  }
}

export function answerAdded (answer) {
  return {
    type: ActionTypes.ANSWER_ADDED,
    answer: answer
  }
}

export function addAnswer (questionUuid) {
  return dispatch => {
    $.ajax({
      async: true,
      url: API_PREFIX + 'answers/',
      method: 'POST',
      data: {text: 'New answer', question: questionUuid},
      success: function (data, status, jqXHR) {
        dispatch(answerAdded(data))
      }
    })
  }
}

export function deleteAnswerChoice (answerUuid) {
  return (dispatch, getState) => {
    var state = getState()
    var questionUuid = state.answers[answerUuid].question
    dispatch({
      type: ActionTypes.DELETE_ANSWER,
      questionUuid: questionUuid,
      uuid: answerUuid
    })
    $.ajax({
      async: true,
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      method: 'DELETE',
      success: function (data, status, jqXHR) {
        //
      }
    })
  }
}

export function setAnswerIsCorrect (answer, is_correct, exclusive) {
  return dispatch => {
    $.ajax({
      async: true,
      url: API_PREFIX + 'answers/' + answer + '/',
      method: 'PATCH',
      data: {is_correct: is_correct},
      success: function (data, status, jqXHR) {
        if (exclusive) {
          dispatch({
            type: ActionTypes.SET_ANSWER_EXCLUSIVELY_CORRECT,
            answer: answer
          })
        } else {
          dispatch({
            type: ActionTypes.SET_ANSWER_IS_CORRECT,
            answer: answer,
            is_correct: is_correct
          })
        }
      }
    })
  }
}

export function changeAnswerRepresentation (answerUuid, newRepresentation) {
  return dispatch => {
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: {representation: newRepresentation},
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function updateVectorAnswerComponents (answerUuid, x_component, y_component) {
  return (dispatch, getState) => {
    var update
    var ans = getState().answers[answerUuid]
    if (ans.angle != null) {
      update = {
        angle: vectorToAngle(x_component, y_component),
        x_component: null,
        y_component: null
      }
    } else if (ans.magnitude != null) {
      update = {
        magnitude: Math.sqrt(x_component * x_component + y_component * y_component),
        angle: null,
        x_component: null,
        y_component: null
      }
    } else {
      update = {
        angle: null,
        x_component: x_component,
        y_component: y_component
      }
    }
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: update,
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function updateVectorCheckType (answerUuid, newType) {
  return (dispatch, getState) => {
    var update
    var ans = getState().answers[answerUuid]
    if (newType === 'angle') {
      update = {
        x_component: null,
        y_component: null,
        angle: ans.angle || vectorToAngle(ans.x_component, ans.y_component) || 0,
        magnitude: null
      }
    } else if (newType === 'full') {
      var x, y
      if (ans.angle != null) {
        [x, y] = angleToVector(ans.angle)
      } else {
        x = ans.magnitude
        y = 0
      }
      update = {
        x_component: ans.x_component || x,
        y_component: ans.y_component || y,
        angle: null,
        magnitude: null
      }
    } else if (newType === 'magnitude') {
      var magnitude = 1
      if (ans.x_component) {
        magnitude = Math.sqrt(ans.x_component * ans.x_component + ans.y_component * ans.y_component)
      }
      update = {
        x_component: null,
        y_component: null,
        angle: null,
        magnitude: magnitude
      }
    }
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: update,
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function updateUnitConversionType (answerUuid, newType) {
  return dispatch => {
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: {'unit_conversion_type': newType},
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function updateUnitConversionQuestionValue (answerUuid, newValue) {
  return dispatch => {
    if (!validateQuantityUnit(newValue)) {
      return
    }
    var quantity, unit;
    [quantity, unit] = splitQuantityUnit(newValue)
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: {
        'question_number': quantity,
        'question_unit': unit
      },
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function updateUnitConversionAnswerValue (answerUuid, newValue) {
  return dispatch => {
    if (!validateQuantityUnit(newValue)) {
      return
    }
    var quantity, unit;
    [quantity, unit] = splitQuantityUnit(newValue)
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: {
        'answer_number': quantity,
        'answer_unit': unit
      },
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function updateUnitConversionStep (answerUuid, stepIndex, update) {
  return (dispatch, getState) => {
    for (var k in update) {
      if (!validateQuantityUnit(update[k])) {
        return
      }
      update[k] = splitQuantityUnit(update[k]).join('\\ ')
    }
    var steps = getState().answers[answerUuid].conversion_steps.map(step => Object.assign({}, step))
    Object.assign(steps[stepIndex], update)
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: {'conversion_steps': JSON.stringify(steps)},
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function addConversionStep (answerUuid) {
  return (dispatch, getState) => {
    var steps = getState().answers[answerUuid].conversion_steps.map(step => Object.assign({}, step))
    steps.push({numerator: '', denominator: ''})
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: {'conversion_steps': JSON.stringify(steps)},
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function removeConversionStep (answerUuid) {
  return (dispatch, getState) => {
    var steps = getState().answers[answerUuid].conversion_steps.map(step => Object.assign({}, step))
    steps.pop()
    $.ajax({
      url: API_PREFIX + 'answers/' + answerUuid + '/',
      type: 'PATCH',
      data: {'conversion_steps': JSON.stringify(steps)},
      success: function (data, status, jqXHR) {
        dispatch(answerLoaded(data))
      }
    })
  }
}

export function clearQuestionVectors (uuid) {
  return dispatch => {
    $.ajax({
      url: API_PREFIX + 'questions/' + uuid + '/',
      type: 'PATCH',
      data: {'vectors': '[]'},
      success: function (data, status, jqXHR) {
        dispatch(questionLoaded(data))
      }
    })
  }
}

export function addQuestionVector (uuid, x_component, y_component) {
  return (dispatch, getState) => {
    var s = getState()
    var vectors = s.questions[uuid].vectors.slice()
    vectors.push({
      x_component: x_component,
      y_component: y_component
    })
    $.ajax({
      url: API_PREFIX + 'questions/' + uuid + '/',
      type: 'PATCH',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify({'vectors': vectors}),
      success: function (data, status, jqXHR) {
        dispatch(questionLoaded(data))
      }
    })
  }
}

export function foundUsersLoaded (data) {
  return {
    type: ActionTypes.FOUND_USERS_LOADED,
    foundUsers: data
  }
}

export function findUserRequest (data) {
  return {
    type: ActionTypes.FOUND_USERS_REQUEST,
    findUserRequest: data
  }
}

export function findUsers (searchString) {
  return (dispatch, getState) => {
    dispatch(findUserRequest(true))
    $.ajax({
      url: API_PROFILE_PREFIX + 'find?q=' + searchString,
      type: 'GET',
      success: function (data, status, jqXHR) {
        dispatch(foundUsersLoaded(data))
        dispatch(findUserRequest(false))
      }
    })
  }
}

export function coursesNavigationLoaded (data) {
  return {
    type: ActionTypes.COURSE_NAVIGATION_COURSES_LOADED,
    courses: data
  }
}

export function unitsNavigationLoaded (data) {
  return {
    type: ActionTypes.COURSE_NAVIGATION_UNITS_LOADED,
    units: data
  }
}

export function modulesNavigationLoaded (data) {
  return {
    type: ActionTypes.COURSE_NAVIGATION_MODULES_LOADED,
    modules: data
  }
}

export function moduleNavigationLoaded (data) {
  return {
    type: ActionTypes.COURSE_NAVIGATION_LESSONS_LOADED,
    lessons: extract(data, 'lessons')
  }
}

export function loadNavigationCourses () {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'courses/',
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(coursesNavigationLoaded(data))

        // extract all units from all courses, not so good.
        const units = extractAll(data, 'units')
        dispatch(unitsNavigationLoaded(units))

        // extract all modules from all units, not so good.
        var modules = extractAll(units, 'modules')
        dispatch(modulesNavigationLoaded(modules))
      }
    })
  }
}

export function loadNavigationModule (uuid) {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'modules/' + uuid + '/',
      success: function (data, status, jqXHR) {
        dispatch(moduleNavigationLoaded(data))
      }
    })
  }
}
