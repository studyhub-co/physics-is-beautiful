import { checkHttpStatus, getAxios } from '../utils'
import { API_COURSES_PREFIX } from '../utils/config'
import { MODULE_FETCHING_SUCCESS, MODULE_FETCHING } from '../constants'

function fetchingModuleSuccess (module) {
  return {
    type: MODULE_FETCHING_SUCCESS,
    module
  }
}

const fetchingModule = () => {
  return {
    type: MODULE_FETCHING
  }
}

export function fetchModule (uuid) {
  return (dispatch, state) => {
    dispatch(fetchingModule())
    let moduleUuid = '00000000-0000-0000-0000-000000000000' // default
    if (uuid) {
      moduleUuid = uuid
    }
    const url = `${API_COURSES_PREFIX}modules/${moduleUuid}/?expand=lessons`
    return getAxios().get(url)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(fetchingModuleSuccess(response.data))
      })
  }
}
