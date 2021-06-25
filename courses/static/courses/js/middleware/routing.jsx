import { ActionTypes as studioActions } from '../actions/studio'
import history from '../history'
import { MATERIAL_GOTO } from '../constants'

const routingMiddleware = store => next => action => {
  // studio editor routing
  if (
    action.type === studioActions.GOTO_MATERIAL ||
    action.type === studioActions.MATERIAL_ADDED
  ) {
    history.replace(
      '/studio/editor/lessons/' +
        action.lesson.uuid +
        '/materials/' +
        action.material.uuid,
    )
    return next(action)
  }
  if (action.type === studioActions.GOTO_LESSON) {
    history.replace('/studio/editor/lessons/' + action.lesson.uuid)
    return next(action)
  }
  // student view routing (move to the material)
  if (action.type === MATERIAL_GOTO) {
    // we need to save root lesson url
    history.push(
      '/courses/lessons/' +
        action.lesson.uuid +
        '/materials/' +
        action.material.uuid,
    )
    return next(action)
  }
  return next(action)
}

export default routingMiddleware
