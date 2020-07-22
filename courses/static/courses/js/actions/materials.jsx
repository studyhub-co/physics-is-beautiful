import { checkHttpStatus, getAxios } from '../utils'
import { API_COURSES_PREFIX } from '../utils/config'
import { MATERIAL_FETCHING_SUCCESS, MATERIAL_FETCHING, MATERIAL_GOTO } from '../constants'

function fetchingMaterialSuccess (material) {
  return {
    type: MATERIAL_FETCHING_SUCCESS,
    material
  }
}

const fetchingMaterial = () => {
  return {
    type: MATERIAL_FETCHING
  }
}

const redirect2Material = (lessonUuid, materialUuid) => {
  return {
    type: MATERIAL_GOTO,
    material: { uuid: materialUuid },
    lesson: { uuid: lessonUuid }
  }
}

export function fetchMaterial (lessonUuid, materialUuid, prevMaterialUuid) {
  return (dispatch, state) => {
    dispatch(fetchingMaterial())
    // const url = `${API_COURSES_PREFIX}lessons/${lessonUuid}/next-material/`
    let url = `${API_COURSES_PREFIX}lessons/${lessonUuid}/next-material/`
    if (materialUuid) {
      // get material with uuid
      url = `${url}?material_uuid=${materialUuid}`
    } else if (prevMaterialUuid) {
      // get material with by prev material uuid
      url = `${url}?previous_material=${prevMaterialUuid}`
    }

    console.log(materialUuid)

    return getAxios().get(url)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(fetchingMaterialSuccess(response.data))

        // if load 1st material in lesson redirect / see routingMiddleware for details
        if (!materialUuid && !prevMaterialUuid) {
          dispatch(redirect2Material(lessonUuid, response.data.uuid))
        }
      })
  }
}
