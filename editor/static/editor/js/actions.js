import { history } from './history';

import {angleToVector, vectorToAngle, validateQuantityUnit, splitQuantityUnit} from './utils';


export const ActionTypes = Object.freeze({
    REQUEST_ADD_CURRICULUM : 'REQUEST_ADD_CURRICULUM',
    CURRICULA_LOADED : 'CURRICULA_LOADED',
    ALL_CURRICULA_LOADED : 'ALL_CURRICULA_LOADED',
    LOAD_CURRICULA : 'LOAD_CURRICULA',
    CURRICULUM_LOADED : 'CURRICULUM_LOADED',    
    RENAME_CURRICULUM : 'RENAME_CURRICULUM',
    CHANGE_CURRICULUM_IMAGE : 'CHANGE_CURRICULUM_IMAGE',
    DELETE_CURRICULUM : 'DELETE_CURRICULUM',
    UNIT_LOADED : 'UNIT_LOADED',
    UNIT_ADDED : 'UNIT_ADDED',
    DELETE_UNIT : 'DELETE_UNIT',
    MODULE_ADDED : 'MODULE_ADDED',
    MODULE_LOADED : 'MODULE_LOADED',
    DELETE_MODULE : 'DELETE_MODULE',
    LESSON_LOADED : 'LESSON_LOADED',
    LESSON_AVAILABLE : 'LESSON_AVAILABLE',
    LESSON_ADDED : 'LESSON_ADDED',
    DELETE_LESSON : 'DELETE_LESSON',
    QUESTION_LOADED : 'QUESTION_LOADED',
    QUESTION_ADDED : 'QUESTION_ADDED',
    QUESTION_MOVED : 'QUESTION_MOVED',
    PRESERVE_ANSWERS : 'PRESERVE_ANSWERS',
    GOTO_QUESTION : 'GOTO_QUESTION',
    DELETE_QUESTION : 'DELETE_QUESTION',
    ANSWER_LOADED : 'ANSWER_LOADED',
    ANSWER_ADDED : 'ANSWER_ADDED',
    DELETE_ANSWER : 'DELETE_ANSWER',
    SET_ANSWER_EXCLUSIVELY_CORRECT : 'SET_ANSWER_EXCLUSIVELY_CORRECT',
    SET_ANSWER_IS_CORRECT : 'SET_ANSWER_IS_CORRECT',
});

/*
  export function requestAddCurriculum() {
  return { type : REQUEST_ADD_CURRICULUM }
  } */

export function curriculumAdded(curriculum) {
    return { type : ActionTypes.CURRICULUM_ADDED,
	     curriculum: curriculum}
}



export function addCurriculum(prototype) {
    return function(dispatch) {
	//	dispatch(requestAddCurriculum());
	$.ajax({
	    async: true,
	    url: '/editor/api/curricula/',
	    method : 'POST',
	    data : {name : 'New curriculum',
		    prototype : prototype},
	    success: function(data, status, jqXHR) {		
		dispatch(curriculumLoaded(data));
		history.push('/curricula/'+data.uuid+'/');
	    }
	});
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

export function allCurriculaLoaded(data) {
    return {type : ActionTypes.ALL_CURRICULA_LOADED,
	    curricula : data}
}

export function loadCurricula() {
    return function(dispatch) {
	$.ajax({
	    async: true,
	    url: '/editor/api/curricula/',
	    context: this,
	    success: function(data, status, jqXHR) {
		dispatch(curriculaLoaded(data))
	    }	
	});
	$.ajax({
	    async: true,
	    url: '/editor/api/curricula/all/',
	    context: this,
	    success: function(data, status, jqXHR) {
		dispatch(allCurriculaLoaded(data))
	    }	
	});
	
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
	$.ajax({url:'/editor/api/curricula/'+uuid+'/',
		type:'PATCH',
		data:{name:newName},
		success: function(data,status, jqXHR){
		    dispatch(curriculumLoaded(data));
		}});
	
    }
}

function loadCurriculum(uuid, dispatch) {
    $.ajax({
	async: true,
	url: '/editor/api/curricula/'+uuid +'/',
	success: function(data, status, jqXHR) {
	    dispatch(curriculumLoaded(data));
	}
    });    
}

export function loadCurriculumIfNeeded(uuid) {
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
	$.ajax({url:'/editor/api/curricula/'+uuid+'/',
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

export function deleteCurriculum(uuid) {
    return dispatch => {
	dispatch({type : ActionTypes.DELETE_CURRICULUM,
		  uuid : uuid});
	$.ajax({
            async : true,
            url : '/editor/api/curricula/'+uuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		history.push('/');
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

export function addUnit(curriculumUuid) {
    return dispatch => {
	$.ajax({
	    async: true,
	    url: '/editor/api/units/',
	    method : 'POST',
	    data : {name : 'New unit', curriculum:curriculumUuid},
	    success: function(data, status, jqXHR) {
		dispatch(unitAdded(curriculumUuid, data));
	    }
	});   
    }  
}

export function deleteUnit(unitUuid) {
    return (dispatch, getState) => {
	dispatch({type : ActionTypes.DELETE_UNIT,
		  curriculumUuid : getState().units[unitUuid].curriculum,
		  uuid : unitUuid});
	$.ajax({
            async : true,
            url : '/editor/api/units/'+unitUuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		// dispatch(unitDeleted(unitUuid))
	    }
	});	
    }
}


export function renameUnit(uuid, newName) {
    return function(dispatch) {
	$.ajax({url:'/editor/api/units/'+uuid+'/',
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
	$.ajax({url:'/editor/api/units/'+uuid+'/',
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
	    url: '/editor/api/units/'+uuid+'/',
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

export function addModule(unitUuid) {
    return dispatch => {
	$.ajax({
	    async: true,
	    url: '/editor/api/modules/',
	    method : 'POST',
	    data : {name : 'New module', unit : unitUuid},
	    success: function(data, status, jqXHR) {
		dispatch(moduleAdded(data));
		history.push('/modules/'+data.uuid+'/');
	    }
	});   
    }  
}


export function moduleLoaded(data){    
    return {type : ActionTypes.MODULE_LOADED,
	    module : data,
	    lessons : extract(data, 'lessons')}
}

export function renameModule(uuid, newName) {
    return function(dispatch) {
	$.ajax({url:'/editor/api/modules/'+uuid+'/',
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
	$.ajax({url:'/editor/api/modules/'+uuid+'/',
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
	    url: '/editor/api/modules/'+uuid+'/',
	    method : 'PATCH',
	    data : {position : newPosition,
		    unit : toUnitUuid},
	    success: function(data, status, jqXHR) {
		$.ajax({
		    async: true,
		    url: '/editor/api/units/'+toUnitUuid+'/',
		    method : 'GET',
		    success: function(data, status, jqXHR) {
			dispatch(unitLoaded(data));
		    }
		});
		if (toUnitUuid != fromUnit.uuid) {
		    $.ajax({
			async: true,
			url: '/editor/api/units/'+fromUnit.uuid+'/',
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
            url : '/editor/api/modules/'+moduleUuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		history.push('/curricula/'+curriculum+'/');
	    }
	});	
    }
}

export function loadModuleIfNeeded(uuid) {
    return (dispatch, getState) => {
	if (!(uuid in getState().modules) || !('lessons' in getState().modules[uuid])) {
	    $.ajax({
		async: true,
		url: '/editor/api/modules/'+uuid +'/',
		success: function(data, status, jqXHR) {
		    dispatch(moduleLoaded(data));
		}
	    });
	}
    }
}


export function addLesson(moduleUuid) {
    return dispatch => {
	$.ajax({
	    async: true,
	    url: '/editor/api/lessons/',
	    method : 'POST',
	    data : {name : 'New lesson', module : moduleUuid},
	    success: function(data, status, jqXHR) {
		var questions = extract(data, 'questions')		
		dispatch({type : ActionTypes.LESSON_ADDED,
			  lesson : data,
			  questions : questions,
			  answers : extractAll(questions, 'answers')
			 });
		history.push('/lessons/'+data.uuid+'/');
	    }
	});   
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
		url: '/editor/api/lessons/'+uuid +'/',
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
	$.ajax({url:'/editor/api/lessons/'+uuid+'/',
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
	$.ajax({url:'/editor/api/lessons/'+uuid+'/',
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
	$.ajax({url:'/editor/api/lessons/'+uuid+'/',
		type:'PATCH',
		data:{lesson_type:newType},
		success: function(data,status, jqXHR){
		    dispatch(lessonLoaded(data));
		}});
	
    }
}
export function changeLessonGameType(uuid, newType) {
    return function(dispatch) {
	$.ajax({url:'/editor/api/lessons/'+uuid+'/',
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
	    url: '/editor/api/lessons/'+uuid+'/',
	    method : 'PATCH',
	    data : {position : newPosition,
		    module : toModuleUuid},
	    success: function(data, status, jqXHR) {
		$.ajax({
		    async: true,
		    url: '/editor/api/modules/'+toModuleUuid+'/',
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
            url : '/editor/api/lessons/'+lessonUuid+'/',
            method : 'DELETE',
            success : function(data, status, jqXHR) {
		history.push('/modules/'+moduleUuid+'/');
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
		url: '/editor/api/questions/'+uuid +'/',
		success: function(data, status, jqXHR) {
		    dispatch(questionLoaded(data));
		}});	    
	}
    }
}

export function changeQuestionText(uuid, newText) {
    return function(dispatch) {
	$.ajax({url:'/editor/api/questions/'+uuid+'/',
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
	$.ajax({url:'/editor/api/questions/'+uuid+'/',
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
	$.ajax({url:'/editor/api/questions/'+uuid+'/',
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
	$.ajax({url:'/editor/api/questions/'+uuid+'/',
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

export function addQuestion(lesson){
     return dispatch => {
	 $.ajax({
	     async: true,
	     method : 'POST',
	     url: '/editor/api/questions/',
	     data : {lesson : lesson,
		     text : 'New question'},
	     success: function(data, status, jqXHR) {
		 dispatch({type : ActionTypes.QUESTION_ADDED,
			   question : data});
	     }});	    
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
	    url: '/editor/api/questions/'+uuid+'/',
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
            url : '/editor/api/questions/'+uuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+uuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+uuid+'/',
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
	    url: '/editor/api/answers/',
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
	    url: '/editor/api/answers/'+answerUuid+'/',
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
	    url: '/editor/api/answers/'+answer+'/',
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
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
		type:'PATCH',
		data:update,
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});
    }
}


export function updateUnitConversionType(answerUuid, newType){
    return dispatch => {
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
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
	$.ajax({url:'/editor/api/answers/'+answerUuid+'/',
		type:'PATCH',
		data:{'conversion_steps' : JSON.stringify(steps)},
		success: function(data,status, jqXHR){
		    dispatch(answerLoaded(data));
		}});	
    }

}

export function clearQuestionVectors(uuid){
    return dispatch => {
	$.ajax({url:'/editor/api/questions/'+uuid+'/',
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
	$.ajax({url:'/editor/api/questions/'+uuid+'/',
		type:'PATCH',
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		data:JSON.stringify({'vectors': vectors}),
		success: function(data,status, jqXHR){
		    dispatch(questionLoaded(data));
		}});
    }    
    
}
