import { ActionTypes as studioActions } from '../actions/studio'
import history from '../history'
import { MATERIAL_GOTO } from '../constants'

const routingMiddleware = store => next => action => {
  // studio editor routings
  if (action.type === studioActions.GOTO_MATERIAL ||
      action.type === studioActions.MATERIAL_ADDED) {
    history.push('/studio/editor/lessons/' + action.lesson.uuid + '/materials/' + action.material.uuid)
    return next(action)
  }
  if (action.type === studioActions.GOTO_LESSON) {
    history.push('/studio/editor/lessons/' + action.lesson.uuid)
    return next(action)
  }
  // student view routings (move to the material)
  if (action.type === MATERIAL_GOTO) {
    history.push('/courses/lessons/' + action.lesson.uuid + '/materials/' + action.material.uuid)
    return next(action)
  }
  return next(action)
}

export default routingMiddleware
