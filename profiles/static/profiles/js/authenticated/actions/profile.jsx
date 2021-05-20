import { checkHttpStatus, getAxios } from '../utils'
import { API_PROFILE_PREFIX } from '../utils/config'
import {
  // PROFILE_RECEIVE_ME,
  PROFILE_RECEIVE_PROFILE, PROFILE_FETCHING_PROFILE,
  PROFILE_RECEIVE_BADGES
} from '../constants'

// export profile.me action and reducer from main SPA
// + it will replace the root 'profile' reducer with removing data.

// export function receiveProfileMe (me) {
//   return {
//     type: PROFILE_RECEIVE_ME,
//     payload: {
//       me
//     }
//   }
// }

// export function fetchProfileMe () {
//   return (dispatch, state) => {
//     return getAxios().get(API_PROFILE_PREFIX + 'me')
//       .then(checkHttpStatus)
//       .then((response) => {
//         dispatch(receiveProfileMe(response.data))
//       })
//   }
// }

export function receiveProfile (profile) {
  return {
    type: PROFILE_RECEIVE_PROFILE,
    payload: {
      profile
    }
  }
}

export function fetchingProfile (state) {
  return {
    type: PROFILE_FETCHING_PROFILE,
    payload: {
      fetching: state
    }
  }
}

export function fetchProfile (id) {
  return (dispatch, state) => {
    dispatch(fetchingProfile(true))
    return getAxios().get(API_PROFILE_PREFIX + id + '/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveProfile(response.data))
        dispatch(fetchingProfile(false))
      })
  }
}

export function updateProfile (profileJson) {
  return (dispatch, state) => {
    return getAxios().patch(API_PROFILE_PREFIX + profileJson.id + '/', profileJson)
      .then(checkHttpStatus)
      .then((response) => {
        // dispatch(receiveProfile(response.data))
      })
  }
}

export function updateReloadProfile (profileJson) {
  return (dispatch, state) => {
    return dispatch(updateProfile(profileJson)).then(() => {
      dispatch(fetchProfile(profileJson.id))
    })
  }
}

export function receiveBadges (badges) {
  return {
    type: PROFILE_RECEIVE_BADGES,
    payload: {
      badges
    }
  }
}

export function fetchBadges (id) {
  return (dispatch, state) => {
    return getAxios().get(API_PROFILE_PREFIX + id + '/badges/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveBadges(response.data))
      })
  }
}
