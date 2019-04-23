import { checkHttpStatus, getAxios } from '../utils'
import { API_REPUTATION_ACTIONS_PREFIX } from '../utils/config'
import {
  REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS, REPUTATION_ACTIONS_SET_CANCEL_SOURCE
} from '../constants'

import { dictToURI } from '../utils/urls'

export function receiveReputationActions (reputationActionsList) {
  return {
    type: REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS,
    payload: {
      reputationActionsList
    }
  }
}

export function setCancelSource (cancelSource) {
  return {
    type: REPUTATION_ACTIONS_SET_CANCEL_SOURCE,
    payload: {
      cancelSource
    }
  }
}

export function fetchReputationActions (nextPageUrl, filters) {
  var url = API_REPUTATION_ACTIONS_PREFIX

  if (nextPageUrl) {
    url = nextPageUrl
  }

  if (filters) {
    url += '?' + dictToURI(filters)
  }

  return (dispatch, state) => {
    const CancelToken = getAxios().CancelToken
    const source = CancelToken.source()

    dispatch(setCancelSource(source))

    return getAxios()
      .get(url,
        {
          cancelToken: source.token
        }
      )
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveReputationActions(response.data))
      }).catch(function (thrown) {
        if (getAxios().isCancel(thrown)) {
          // silent cancel
        } else {
          throw thrown
        }
      })
  }
}
