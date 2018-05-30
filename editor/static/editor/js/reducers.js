import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


import {ActionTypes} from './actions'

function curricula(state={}, action){
    switch (action.type) {
    case ActionTypes.CURRICULA_LOADED:
	return action.curricula
    case ActionTypes.CURRICULUM_LOADED:
	return Object.assign({}, state, {[action.curriculum.uuid] : action.curriculum})
    case ActionTypes.DELETE_CURRICULUM:
	var ret = Object.assign({}, state)
	delete ret[action.uuid]
	return ret
    case ActionTypes.UNIT_ADDED:
	var ret = Object.assign({}, state)
	ret[action.curriculumUuid].units.push(action.unit.uuid)
	return ret
    case ActionTypes.DELETE_UNIT:
	var ret = Object.assign({}, state)
	ret[action.curriculumUuid].units.splice(ret[action.curriculumUuid].units.indexOf(action.uuid), 1)
	return ret
    default:
	return state
    }
}

function units(state={}, action){
    switch (action.type) {
    case ActionTypes.CURRICULA_LOADED:
	return action.units
    case ActionTypes.CURRICULUM_LOADED:
	return Object.assign({}, state, action.units)
    case ActionTypes.UNIT_ADDED:
    case ActionTypes.UNIT_LOADED:
	return Object.assign({}, state, {[action.unit.uuid] : action.unit})
    case ActionTypes.DELETE_UNIT:
	var ret = Object.assign({}, state)
	delete ret[action.uuid]
	return ret
    case ActionTypes.MODULE_ADDED:
	var ret = Object.assign({}, state)
	ret[action.module.unit].modules.push(action.module.uuid)
	return ret
    case ActionTypes.DELETE_MODULE:
	var ret = Object.assign({}, state)
	ret[action.unitUuid].modules.splice(ret[action.unitUuid].modules.indexOf(action.uuid), 1)
	return ret	
    default:
	return state
    }

}

function modules(state={}, action){
    switch (action.type) {
    case ActionTypes.UNIT_LOADED:
    case ActionTypes.UNIT_ADDED:
    case ActionTypes.CURRICULUM_LOADED:
    case ActionTypes.CURRICULA_LOADED:
	return Object.assign({}, state, action.modules)
    case ActionTypes.MODULE_ADDED:
    case ActionTypes.MODULE_LOADED:
	return Object.assign({}, state, {[action.module.uuid] : action.module})
    case ActionTypes.DELETE_MODULE:
	var ret = Object.assign({}, state)
	delete ret[action.uuid]
	return ret
    default:
	return state
    }
    
}


function lessons(state={}, action){
   switch (action.type) {
   case ActionTypes.MODULE_LOADED:
       return Object.assign({}, state, action.lessons)
   case ActionTypes.LESSON_LOADED:
       return Object.assign({}, state, {[action.lesson.uuid] : action.lesson})
   default:
       return state
   }
    
}

function questions(state={}, action){
   switch (action.type) {
   case ActionTypes.QUESTION_LOADED:
       return Object.assign({}, state, {[action.question.uuid] : action.question})
   case ActionTypes.ANSWER_ADDED:
       var ret = Object.assign({}, state)
       ret[action.answer.question].answers = ret[action.answer.question].answers.slice();
       ret[action.answer.question].answers.push(action.answer.uuid)
       return ret       
   default:
       return state
   }
    
}
function answers(state={}, action){
   switch (action.type) {
   case ActionTypes.QUESTION_LOADED:
       return Object.assign({}, state, action.answers)
   case ActionTypes.ANSWER_LOADED:
   case ActionTypes.ANSWER_ADDED:      
       return Object.assign({}, state, {[action.answer.uuid] : action.answer})
   case ActionTypes.SET_ANSWER_EXCLUSIVELY_CORRECT:
       var ret = Object.assign({}, state)
       for (var a in ret) {
	   if (ret[a].question === state[action.answer].question)
	       ret[a].is_correct = a === action.answer;
       }
       return ret
   case ActionTypes.SET_ANSWER_IS_CORRECT:
       var ret = Object.assign({}, state)
       ret[action.answer].is_correct = action.is_correct;
       return ret
       
   default:
       return state
   }
    
}


export const editor = combineReducers({curricula, units, modules, lessons, questions, answers, router : routerReducer});

