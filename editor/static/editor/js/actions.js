import { history } from './history'

import {angleToVector, vectorToAngle, validateQuantityUnit, splitQuantityUnit} from './utils'

const API_PREFIX = '/api/v1/editor/'
const API_PROFILE_PREFIX = '/api/v1/profiles/'
const API_CURRICULA_PREFIX = '/api/v1/curricula/'

export const ActionTypes = Object.freeze({
  REQUEST_ADD_CURRICULUM: 'REQUEST_ADD_CURRICULUM',
  CURRICULA_LOADED: 'CURRICULA_LOADED',
  ALL_CURRICULA_LOADED: 'ALL_CURRICULA_LOADED',
  SEARCH_CURRICULA_LOADED: 'SEARCH_CURRICULA_LOADED',
  SEARCH_UNITS_LOADED: 'SEARCH_UNITS_LOADED',
  SEARCH_MODULES_LOADED: 'SEARCH_MODULES_LOADED',
  SEARCH_LESSONS_LOADED: 'SEARCH_LESSONS_LOADED',
  RECENT_CURRICULA_LOADED: 'RECENT_CURRICULA_LOADED',
  POPULAR_CURRICULA_LOADED: 'POPULAR_CURRICULA_LOADED',
  SEARCH_QUESTIONS_LOADED: 'SEARCH_QUESTIONS_LOADED',
  NEW_CURRICULA_LOADED: 'NEW_CURRICULA_LOADED',
  LOAD_CURRICULA: 'LOAD_CURRICULA',
  PUBLIC_CURRICULUM_LOADED: 'PUBLIC_CURRICULUM_LOADED',
  CURRICULUM_LOADED: 'CURRICULUM_LOADED',
  RENAME_CURRICULUM: 'RENAME_CURRICULUM',
  CHANGE_CURRICULUM_IMAGE: 'CHANGE_CURRICULUM_IMAGE',
  DELETE_CURRICULUM: 'DELETE_CURRICULUM',
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
  FOUND_USERS_REQUEST: 'FOUND_USERS_REQUEST'
})

/*
  export function requestAddCurriculum() {
  return { type : REQUEST_ADD_CURRICULUM }
  } */

export function curriculumAdded (curriculum) {
  return { type: ActionTypes.CURRICULUM_ADDED, curriculum: curriculum }
}

export function changeStudioSelectedTab (selectedTab, tabNamespace) {
  return {
    type: ActionTypes.STUDIO_TAB_CHANGED,
    tab: selectedTab,
    namespace: tabNamespace
  }
}

export function addCurriculum (prototype) {
  return function (dispatch) {
    //	dispatch(requestAddCurriculum());
    $.ajax({
      async: true,
      url: API_PREFIX + 'curricula/',
      method: 'POST',
      data: {
        name: 'New curriculum',
        prototype: prototype
      },
      success: function (data, status, jqXHR) {
        dispatch(curriculumLoaded(data))
        history.push('/studio/editor/curricula/' + data.uuid + '/')
      }
    })
  }
}

export function addCurriculumToDashboard (uuid) {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'public/curricula/' + uuid + '/add_to_dashboard/',
      method: 'POST',
      success: function (data, status, jqXHR) {
      }
    })
  }
}

export function removeCurriculumFromDashboard (uuid) {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'public/curricula/' + uuid + '/remove_from_dashboard/',
      method: 'POST',
      success: function (data, status, jqXHR) {
      }
    })
  }
}

export function curriculaLoaded(data) {
    var units = extractAll(data, 'units');
    var modules = extractAll(units, 'modules')
    
    return { type : ActionTypes.CURRICULA_LOADED,
	     curricula : data,
	     units : units,
	     modules : modules}
}

function extract(object, prop){
    var ret = object[prop];
    var ids = [];
    for (var k in object[prop]){
	ids.push(k);
    }
    Object.assign(object, {[prop] : ids});
    return ret;
}
function extractAll(object, prop){
    var ret = {}
    for (var k in object) {
	Object.assign(ret, extract(object[k], prop))
    }
    return ret
}

export function allCurriculaLoaded (data, filter, ordering) {
  var type = ActionTypes.ALL_CURRICULA_LOADED
  if (filter === 'recent') {
    type = ActionTypes.RECENT_CURRICULA_LOADED
  }
  if (ordering === '-created_on') {
    type = ActionTypes.NEW_CURRICULA_LOADED
  }
  if (ordering === '-number_of_learners_denormalized') {
    type = ActionTypes.POPULAR_CURRICULA_LOADED
  }
  return {
    type: type,
    curricula: data
  }
}

export function loadMyCurricula() {
    return function(dispatch) {
      $.ajax({
        async: true,
        url: API_PREFIX + 'curricula/',
        context: this,
        success: function (data, status, jqXHR) {
          dispatch((data) => {
            return { type: ActionTypes.CURRICULA_LOADED,
                     curricula: data,
            }
          })
        }
      });
    }
}

export function loadAllCurricula (url, filter, ordering) {
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
      url: url || API_PREFIX + 'public/curricula/' + paramsString,
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(allCurriculaLoaded(data, filter, ordering))
      }
    })
  }
}

// export function loadRecentCurricula () {
//   return function (dispatch) {
//     $.ajax({
//       async: true,
//       url: API_PREFIX + 'curricula/',
//       context: this,
//       success: function (data, status, jqXHR) {
//         dispatch(curriculaLoaded(data))
//       }})
//   }
// }

export function loadCurricula () {
  return function (dispatch) {
    dispatch(loadAllCurricula())
    $.ajax({
      async: true,
      url: API_PREFIX + 'curricula/',
      context: this,
      success: function (data, status, jqXHR) {
        dispatch(curriculaLoaded(data))
      }})
  }
}

function curriculaSearchLoaded (data) {
  var type = ActionTypes.SEARCH_CURRICULA_LOADED
  return {
    type: type,
    curriculaSearchList: data
  }
}

export function loadSearchCurricula (searchString, nextPageUrl) {

  var url = API_PREFIX + 'public/curricula/' // all units

  if (searchString) {
    url = API_PREFIX + 'public/curricula/search/?query=' + searchString
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
        dispatch(curriculaSearchLoaded(data))
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


export function curriculumLoaded(data) {
    var units = extract(data, 'units');
    var modules = extractAll(units, 'modules');
    return {type : ActionTypes.CURRICULUM_LOADED,
	    curriculum : data,
	    units : units,
	    modules : modules}
}

export function renameCurriculum(uuid, newName) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'curricula/'+uuid+'/',
		type:'PATCH',
		data:{name:newName},
		success: function(data,status, jqXHR){
		    dispatch(curriculumLoaded(data));
		}});
	
    }
}

export function saveCurriculumDescription (uuid, newText) {
  return function (dispatch) {
    $.ajax({url: API_PREFIX + 'curricula/' + uuid + '/',
      type: 'PATCH',
      data: {description: newText},
      success: function (data, status, jqXHR) {
        dispatch(curriculumLoaded(data))
      }})
  }
}

export function publicCurriculumLoaded (data) {
  return {
    type: ActionTypes.PUBLIC_CURRICULUM_LOADED,
    publicCurriculum: data
  }
}

export function loadPublicCurriculum (uuid) {
  return function (dispatch) {
    $.ajax({
      async: true,
      url: API_PREFIX + 'public/curricula/' + uuid + '/',
      success: function (data, status, jqXHR) {
        dispatch(publicCurriculumLoaded(data))
      }
    })
  }
}

function loadCurriculum (uuid, dispatch) {
  $.ajax({
    async: true,
    url: API_PREFIX + 'curricula/' + uuid + '/',
    success: function (data, status, jqXHR) {
      dispatch(curriculumLoaded(data))
    }
  })
}

export function updateCurriculum (curriculum) {
  return function (dispatch) {
    $.ajax({url: API_PREFIX + 'curricula/' + curriculum.uuid + '/',
      dataType: 'json', // due https://github.com/encode/django-rest-framework/issues/5807
      contentType: 'application/json',
      type: 'PATCH',
      data: JSON.stringify(curriculum),
      success: function (data, status, jqXHR) {
        dispatch(curriculumLoaded(data))
      }})
  }
}

export function loadCurriculumIfNeeded (uuid) {
  return (dispatch, getState) => {
    if (!(uuid in getState().curricula)) {
      loadCurriculum(uuid, dispatch)
    }
  }
}

export function changeCurriculumImage(uuid, image) {
    return dispatch => {
	var formData = new FormData();
	formData.append('image', image);
	$.ajax({url:API_PREFIX + 'curricula/'+uuid+'/',
		type:'PATCH',
		processData: false,
		contentType: false,
		data:formData,
		success : function(data) {
		    dispatch(curriculumLoaded(data));
		}
               });
    }
}

export function changeCurriculumCoverPhoto (uuid, image) {
  return dispatch => {
    var formData = new FormData()
    formData.append('cover_photo', image, image.filename)
    $.ajax({url: API_PREFIX + 'curricula/' + uuid + '/',
      type: 'PATCH',
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        dispatch(curriculumLoaded(data))
      }
    })
  }
}

export function deleteCurriculum(uuid) {
    return dispatch => {
	dispatch({type : ActionTypes.DELETE_CURRICULUM,
		  uuid : uuid});
	$.ajax({
            async : true,
            url : API_PREFIX + 'curricula/'+uuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		history.push('/studio/');
		//TODO: reload all curricula
            }
	});
	
    }
}

export function unitAdded(curriculumUuid, data) {
    return {type : ActionTypes.UNIT_ADDED,
	    curriculumUuid : curriculumUuid,
	    unit : data,
	    modules : extract(data, 'modules')}
}

export function addUnit (curriculumUuid, unit) {
  var data = {name: 'New unit', curriculum: curriculumUuid}
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
        //dispatch(unitAdded(curriculumUuid, data))
        // reload expanded
        loadCurriculum(curriculumUuid, dispatch)
        history.push('/studio/editor/curricula/' + curriculumUuid + '/')
      }
    })
  }
}

export function addToNewCurriculum (type, value) {
  return dispatch => {
    $.ajax({ // create curriculum
      async: true,
      url: API_PREFIX + 'curricula/',
      method: 'POST',
      data: {
        name: 'New curriculum',
      },
      success: function (data, status, jqXHR) {
        var unitData = {name: 'New unit', curriculum: data.uuid}

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
              //dispatch(unitAdded(unitData.curriculum, data))
              loadCurriculum(unitData.curriculum, dispatch)
              history.push('/studio/editor/curricula/' + unitData.curriculum + '/')
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
                    loadCurriculum(unitData.curriculum, dispatch)
                    history.push('/studio/editor/modules/' + data.uuid + '/')
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
                          history.push('/studio/editor/lessons/' + data.uuid + '/')
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
                              history.push('/studio/editor/lessons/' + data.lesson + '/')
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
      }
    })
  }
}

export function deleteUnit(unitUuid) {
    return (dispatch, getState) => {
	dispatch({type : ActionTypes.DELETE_UNIT,
		  curriculumUuid : getState().units[unitUuid].curriculum,
		  uuid : unitUuid});
	$.ajax({
            async : true,
            url : API_PREFIX + 'units/'+unitUuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		// dispatch(unitDeleted(unitUuid))
	    }
	});	
    }
}


export function renameUnit(uuid, newName) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'units/'+uuid+'/',
		type:'PATCH',
		data:{name:newName},
		success: function(data,status, jqXHR){
		    dispatch(unitLoaded(data));
		}});
	
    }
}

export function unitLoaded(data) {
    return {type : ActionTypes.UNIT_LOADED,
	    unit : data,
	    modules : extract(data, 'modules')}
}


export function changeUnitImage(uuid, image) {
    return dispatch => {
	var formData = new FormData();
	formData.append('image', image);
	$.ajax({url:API_PREFIX + 'units/'+uuid+'/',
		type:'PATCH',
		processData: false,
		contentType: false,
		data:formData,
		success : function(data) {
		    dispatch(unitLoaded(data));
		}
               });
    }
}


export function moveUnit(uuid, beforeUuid) {
    return (dispatch, getState) => {
	var state = getState()
	var newPosition
	if (beforeUuid) 
	    newPosition = state.units[beforeUuid].position;
	else {
	    var cur = state.curricula[state.units[uuid].curriculum]
	    newPosition = state.units[cur.units[cur.units.length - 1]].position + 1;
	}
	$.ajax({
	    async: true,
	    url: API_PREFIX + 'units/'+uuid+'/',
	    method : 'PATCH',
	    data : {position : newPosition},
	    success: function(data, status, jqXHR) {
		loadCurriculum(data.curriculum, dispatch)	    
	    }
	});    
    }
}


export function moduleAdded(data) {
    return {type : ActionTypes.MODULE_ADDED,	    
	    module : data,
	    lessons : extract(data, 'lessons')}

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
        history.push('/studio/editor/modules/' + data.uuid + '/')
      }
    })
  }
}

export function moduleLoaded(data){    
    return {type : ActionTypes.MODULE_LOADED,
	    module : data,
	    lessons : extract(data, 'lessons')}
}

export function renameModule(uuid, newName) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'modules/'+uuid+'/',
		type:'PATCH',
		data:{name:newName},
		success: function(data,status, jqXHR){
		    dispatch(moduleLoaded(data));
		}});
	
    }
}
export function changeModuleImage(uuid, image) {
    return dispatch => {
	var formData = new FormData();
	formData.append('image', image);
	$.ajax({url:API_PREFIX + 'modules/'+uuid+'/',
		type:'PATCH',
		processData: false,
		contentType: false,
		data:formData,
		success : function(data) {
		    dispatch(moduleLoaded(data));
		}
               });
    }
}

export function moveModule(uuid, toUnitUuid, beforeUuid) {
    return (dispatch, getState) => {
	var state = getState()
	var toUnit = state.units[toUnitUuid];
	var fromUnit = state.units[state.modules[uuid].unit];
	var newPosition
	if (beforeUuid) 
	    newPosition = state.modules[beforeUuid].position;
	else if (toUnit.modules.length > 0)
	    newPosition = state.modules[toUnit.modules[toUnit.modules.length-1]].position + 1;
	else
	    newPosition = 1;
	$.ajax({
	    async: true,
	    url: API_PREFIX + 'modules/'+uuid+'/',
	    method : 'PATCH',
	    data : {position : newPosition,
		    unit : toUnitUuid},
	    success: function(data, status, jqXHR) {
		$.ajax({
		    async: true,
		    url: API_PREFIX + 'units/'+toUnitUuid+'/',
		    method : 'GET',
		    success: function(data, status, jqXHR) {
			dispatch(unitLoaded(data));
		    }
		});
		if (toUnitUuid != fromUnit.uuid) {
		    $.ajax({
			async: true,
			url: API_PREFIX + 'units/'+fromUnit.uuid+'/',
			method : 'GET',
			success: function(data, status, jqXHR) {
			    dispatch(unitLoaded(data));
			}
		    });    
		    
		}
	    }
	});    
    }
}

export function deleteModule(moduleUuid) {
    return (dispatch, getState) => {
	var state = getState()
	var curriculum = state.modules[moduleUuid].curriculum
	dispatch({type : ActionTypes.DELETE_MODULE,
		  unitUuid : state.modules[moduleUuid].unit,
		  uuid : moduleUuid});
	$.ajax({
            async : true,
            url : API_PREFIX + 'modules/'+moduleUuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		history.push('/studio/editor/curricula/'+curriculum+'/');
	    }
	});	
    }
}

export function loadModuleIfNeeded(uuid) {
  return (dispatch, getState) => {
    if (!(uuid in getState().modules) || !('lessons' in getState().modules[uuid])) {
        $.ajax({
          async: true,
          url: API_PREFIX + 'modules/'+uuid +'/',
          success: function(data, status, jqXHR) {
              dispatch(moduleLoaded(data));
          }
        });
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
        dispatch({type: ActionTypes.LESSON_ADDED,
          lesson: data,
          questions: questions,
          answers: extractAll(questions, 'answers')
        })
        history.push('/studio/editor/lessons/' + data.uuid + '/')
      }
    })
  }
}

export function lessonLoaded(data) {
    var questions = extract(data, 'questions')
    return { type : ActionTypes.LESSON_LOADED,
	     lesson : data,
	     questions : questions,
	     answers : extractAll(questions, 'answers')}
}
export function lessonAvailable(lesson){
    return {type:ActionTypes.LESSON_AVAILABLE,
	    lesson:lesson}
}

export function loadLessonIfNeeded(uuid) {
    return (dispatch, getState) => {
	if (!(uuid in getState().lessons) || !getState().lessons[uuid].questions) {
	    $.ajax({
		async: true,
		url: API_PREFIX + 'lessons/'+uuid +'/',
		success: function(data, status, jqXHR) {
		    dispatch(lessonLoaded(data));
		    if (data.questions.length > 0)
			dispatch(loadQuestionIfNeeded(data.questions[0]));
		}
	    });
	} else {
	    dispatch(lessonAvailable(getState().lessons[uuid]));
	}
    }
}


export function renameLesson(uuid, newName) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'lessons/'+uuid+'/',
		type:'PATCH',
		data:{name:newName},
		success: function(data,status, jqXHR){
		    dispatch(lessonLoaded(data));
		}});
	
    }
}
export function changeLessonImage(uuid, image) {
    return dispatch => {
	var formData = new FormData();
	formData.append('image', image);
	$.ajax({url:API_PREFIX + 'lessons/'+uuid+'/',
		type:'PATCH',
		processData: false,
		contentType: false,
		data:formData,
		success : function(data) {
		    dispatch(lessonLoaded(data));
		}
               });
    }
}

export function changeLessonType(uuid, newType) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'lessons/'+uuid+'/',
		type:'PATCH',
		data:{lesson_type:newType},
		success: function(data,status, jqXHR){
		    dispatch(lessonLoaded(data));
		}});
	
    }
}
export function changeLessonGameType(uuid, newType) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'lessons/'+uuid+'/',
		type:'PATCH',
		data:{game_type:newType},
		success: function(data,status, jqXHR){
		    dispatch(lessonLoaded(data));
		}});
	
    }
}


export function moveLesson(uuid, toModuleUuid, beforeLessonUuid) {    
    return (dispatch, getState) => {
	var state = getState()
	var toModule = state.modules[toModuleUuid];
	var newPosition
	if (beforeLessonUuid) 
	    newPosition = state.lessons[beforeLessonUuid].position;
	else if (toModule && toModule.lessons.length > 0)
	    newPosition = state.lessons[toModule.lessons[toModule.lessons.length-1]].position + 1;
	else
	    newPosition = 1;
	$.ajax({
	    async: true,
	    url: API_PREFIX + 'lessons/'+uuid+'/',
	    method : 'PATCH',
	    data : {position : newPosition,
		    module : toModuleUuid},
	    success: function(data, status, jqXHR) {
		$.ajax({
		    async: true,
		    url: API_PREFIX + 'modules/'+toModuleUuid+'/',
		    method : 'GET',
		    success: function(data, status, jqXHR) {
			dispatch(moduleLoaded(data));
		    }
		});
	    }
	});    	
    }
}


export function deleteLesson(lessonUuid) {
    return (dispatch, getState) => {
	var state = getState()
	var moduleUuid = state.lessons[lessonUuid].module
	dispatch({type : ActionTypes.DELETE_LESSON,
		  moduleUuid : moduleUuid,
		  uuid : lessonUuid});
	$.ajax({
            async : true,
            url : API_PREFIX + 'lessons/'+lessonUuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		history.push('/studio/editor/modules/'+moduleUuid+'/');
	    }
	});	
    }
}


export function questionLoaded(data){
    return {type : ActionTypes.QUESTION_LOADED,
	    question : data,
	    answers : extract(data, 'answers')
	   }
}

export function loadQuestionIfNeeded(uuid){
    return (dispatch, getState) => {
	if (!(uuid in getState().questions)){
	    $.ajax({
		async: true,
		url: API_PREFIX + 'questions/'+uuid +'/',
		success: function(data, status, jqXHR) {
		    dispatch(questionLoaded(data));
		}});	    
	}
    }
}

export function changeQuestionText(uuid, newText) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'questions/'+uuid+'/',
		type:'PATCH',
		data:{text:newText},
		success: function(data,status, jqXHR){
		    dispatch(questionLoaded(data));
		}});
	
    }
    
}

export function preserveAnswers(questionUuid){
    return {type : ActionTypes.PRESERVE_ANSWERS,
	    question : questionUuid}
}

export function changeQuestionType(uuid, newType) {
    return function(dispatch, getState) {
	var state = getState()
	var oldAnswerIds;
	var data = {answer_type:newType};
	if (state.preservedAnswers[uuid])
	    data['answers'] = JSON.stringify(state.preservedAnswers[uuid][newType]);

	dispatch(preserveAnswers(uuid))
	$.ajax({url:API_PREFIX + 'questions/'+uuid+'/',
		type:'PATCH',
		data:data,
		success: function(data,status, jqXHR){
		    dispatch(questionLoaded(data));
		}});
    }    
}

export function changeQuestionImage(uuid, image) {
    return dispatch => {
	var formData = new FormData();
	formData.append('image', image);
	$.ajax({url:API_PREFIX + 'questions/'+uuid+'/',
		type:'PATCH',
		processData: false,
		contentType: false,
		data:formData,
		success : function(data) {
		    dispatch(questionLoaded(data));
		}
               });
    }
    
}

export function changeQuestionHint(uuid, newHint) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'questions/'+uuid+'/',
		type:'PATCH',
		data:{hint:newHint},
		success: function(data,status, jqXHR){
		    dispatch(questionLoaded(data));
		}});
	
    }
    
}


export function goToQuestion(uuid){
    return dispatch => {
	dispatch({type : ActionTypes.GOTO_QUESTION,
		  question:uuid});
	dispatch(loadQuestionIfNeeded(uuid));
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
          history.push('/studio/editor/lessons/' + lesson + '/')
        } else {
          dispatch(
            {type: ActionTypes.QUESTION_ADDED,
              question: data})
        }
      }})
  }
}

export function moveQuestion(uuid, beforeUuid) {    
    return (dispatch, getState) => {
	var state = getState()
	var lessonUuid = state.questions[uuid].lesson
	var newPosition
	if (beforeUuid) 
	    newPosition = state.questions[beforeUuid].position;
	else {
	    var lesson = state.lessons[lessonUuid]
	    newPosition = state.questions[lesson.questions[lesson.questions.length - 1]].position + 1;
	}
	$.ajax({
	    async: true,
	    url: API_PREFIX + 'questions/'+uuid+'/',
	    method : 'PATCH',
	    data : {position : newPosition},
	    success: function(data, status, jqXHR) {
		dispatch({type : ActionTypes.QUESTION_MOVED,
			  uuid : uuid,
			  beforeUuid : beforeUuid,
			  lessonUuid: lessonUuid})
	    }
	});    	
    }
}



export function deleteQuestion(uuid) {
    return (dispatch, getState) => {
	var state = getState()
	var currentLesson = state.lessons[state.questions[uuid].lesson]
	var idx = currentLesson.questions.indexOf(uuid)
	var goToQuestion
	if (idx < currentLesson.questions.length - 1)
	    goToQuestion = currentLesson.questions[idx + 1]
	else if (idx > 0)
	    goToQuestion = currentLesson.questions[idx - 1]
	else
	    goToQuestion = null
		 
	$.ajax({
            async : true,
            url : API_PREFIX + 'questions/'+uuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		dispatch({type : ActionTypes.DELETE_QUESTION,
			  question : uuid,
			  lesson : state.questions[uuid].lesson,
			  goToQuestion : goToQuestion });
		dispatch(loadQuestionIfNeeded(goToQuestion))
            }
	});
    }
    
}

export function answerLoaded(data){
    return { type : ActionTypes.ANSWER_LOADED,
	     answer : data }
}

export function changeAnswerText(uuid, newText) {
    return function(dispatch) {
	$.ajax({url:API_PREFIX + 'answers/'+uuid+'/',
		type:'PATCH',
		data:{text:newText},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});
	
    }

}

export function changeAnswerImage(uuid, image) {
    return dispatch => {
	var formData = new FormData();
	formData.append('image', image);
	$.ajax({url:API_PREFIX + 'answers/'+uuid+'/',
		type:'PATCH',
		processData: false,
		contentType: false,
		data:formData,
		success : function(data) {
		    dispatch(answerLoaded(data));
		}
               });
    }
}

export function answerAdded(answer) {
    return { type : ActionTypes.ANSWER_ADDED,
	     answer : answer }
}

export function addAnswer(questionUuid) {
    return dispatch => {
	$.ajax({
	    async: true,
	    url: API_PREFIX + 'answers/',
	    method : 'POST',
	    data : {text : 'New answer', question : questionUuid},
	    success: function(data, status, jqXHR) {
		dispatch(answerAdded(data));
	    }
	});   
    }  
}

export function deleteAnswerChoice(answerUuid) {
    return (dispatch, getState) => {
	var state = getState()
	var questionUuid = state.answers[answerUuid].question
	dispatch({type : ActionTypes.DELETE_ANSWER,
		  questionUuid : questionUuid,
		  uuid : answerUuid})
	$.ajax({
	    async: true,
	    url: API_PREFIX + 'answers/'+answerUuid+'/',
	    method : 'DELETE',
	    success: function(data, status, jqXHR) {
		//
	    }
	});   
    }  
}


export function setAnswerIsCorrect(answer, is_correct, exclusive) {
    return dispatch => {
	$.ajax({
	    async: true,
	    url: API_PREFIX + 'answers/'+answer+'/',
	    method : 'PATCH',
	    data : {is_correct:is_correct},
	    success: function(data, status, jqXHR) {
		if (exclusive) 
		    dispatch({type : ActionTypes.SET_ANSWER_EXCLUSIVELY_CORRECT,
			      answer : answer});
		else
		    dispatch({type : ActionTypes.SET_ANSWER_IS_CORRECT,
			     answer : answer,
			     is_correct : is_correct});
	    }
	});   
    }     
}

export function changeAnswerRepresentation(answerUuid, newRepresentation) {
    return dispatch => {
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:{representation:newRepresentation},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});
	
	
    }
}


export function updateVectorAnswerComponents(answerUuid, x_component, y_component) {
    return (dispatch, getState) => {
	var update;
	var ans = getState().answers[answerUuid]
	if (ans.angle != null)
	    update = {angle :vectorToAngle(x_component, y_component),
		      x_component : null,
		      y_component : null}
	else if(ans.magnitude != null) 
	    update = {magnitude : Math.sqrt(x_component*x_component + y_component*y_component),
		      angle : null, x_component : null, y_component:null}
	else   
	    update = {angle : null,
		      x_component : x_component,
		      y_component : y_component}
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:update,
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});
	
    }
}

export function updateVectorCheckType(answerUuid, newType){
    return (dispatch, getState) => {
	var update;
	var ans = getState().answers[answerUuid]
	if (newType === 'angle' )	    
	    update = {x_component:null, y_component:null,
		      angle:ans.angle ||  vectorToAngle(ans.x_component, ans.y_component) || 0,
		      magnitude : null,
		     }
	else if (newType === 'full') {
	    var x,y;
	    if (ans.angle != null)
		[x,y] = angleToVector(ans.angle)
	    else {
		x = ans.magnitude;
		y = 0;
	    }
	    update = {x_component:ans.x_component || x,
		      y_component:ans.y_component || y,
		      angle:null,
		      magnitude:null,
		     }
	} else if (newType === 'magnitude'){
	    var magnitude = 1;
	    if (ans.x_component)
		magnitude = Math.sqrt(ans.x_component*ans.x_component + ans.y_component*ans.y_component)
	    update = {x_component:null,
		      y_component:null,
		      angle:null,
		      magnitude:magnitude
		     }
	}
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:update,
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});
    }
}


export function updateUnitConversionType(answerUuid, newType){
    return dispatch => {
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:{'unit_conversion_type' : newType},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});
    }
}

export function updateUnitConversionQuestionValue(answerUuid, newValue){    
    return dispatch => {
	if (!validateQuantityUnit(newValue))
	    return;
	var quantity, unit;
	[quantity, unit] = splitQuantityUnit(newValue)
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:{'question_number' : quantity,
		      'question_unit' : unit},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});
    }
}

export function updateUnitConversionAnswerValue(answerUuid, newValue){    
    return dispatch => {
	if (!validateQuantityUnit(newValue))
	    return;
	var quantity, unit;
	[quantity, unit] = splitQuantityUnit(newValue)
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:{'answer_number' : quantity,
		      'answer_unit' : unit},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});
    }
}

export function updateUnitConversionStep(answerUuid, stepIndex, update){
    return (dispatch, getState) => {
	for (var k in update) {
	    if (!validateQuantityUnit(update[k]))
		return;
	    update[k] = splitQuantityUnit(update[k]).join('\\ ')
	}
	var steps = getState().answers[answerUuid].conversion_steps.map(step => Object.assign({}, step));
	Object.assign(steps[stepIndex], update);
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:{'conversion_steps' : JSON.stringify(steps)},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});	
    }
}


export function addConversionStep(answerUuid){
    return (dispatch, getState) => {
	var steps = getState().answers[answerUuid].conversion_steps.map(step => Object.assign({}, step));
	steps.push({numerator : '', denominator : ''})
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:{'conversion_steps' : JSON.stringify(steps)},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});	
    }
}
export function removeConversionStep(answerUuid){
    return (dispatch, getState) => {
	var steps = getState().answers[answerUuid].conversion_steps.map(step => Object.assign({}, step));
	steps.pop()
	$.ajax({url:API_PREFIX + 'answers/'+answerUuid+'/',
		type:'PATCH',
		data:{'conversion_steps' : JSON.stringify(steps)},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});	
    }

}

export function clearQuestionVectors(uuid){
    return dispatch => {
	$.ajax({url: API_PREFIX + 'questions/'+uuid+'/',
		type:'PATCH',
		data:{'vectors':'[]'},
		success: function(data,status, jqXHR){
		    dispatch(questionLoaded(data));
		}});
    }    
    
}
export function addQuestionVector(uuid, x_component, y_component){
    return (dispatch, getState) => {
	var s=getState();
	var vectors = s.questions[uuid].vectors.slice();
	vectors.push({x_component : x_component,		      
		      y_component : y_component})
	$.ajax({url:API_PREFIX + 'questions/'+uuid+'/',
		type:'PATCH',
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		data:JSON.stringify({'vectors': vectors}),
		success: function(data,status, jqXHR){
		    dispatch(questionLoaded(data));
		}});
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
