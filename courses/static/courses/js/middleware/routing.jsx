import { ActionTypes as studioActions } from '../actions/studio'
import history from '../history'

const routingMiddleware = store => next => action => {
  if (action.type === studioActions.GOTO_MATERIAL ||
      action.type === studioActions.MATERIAL_ADDED) {
    history.push('/studio/editor/lessons/' + action.lesson.uuid + '/materials/' + action.material.uuid)
    return next(action)
  }
  return next(action)
}

export default routingMiddleware
