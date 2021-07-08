import store from '../../store/store'
import { userProfileMessage } from './postMessages'

// user_profile was requesting from iframe
export const getUserProfileListener = event => {
  const { data } = event
  if (Object.prototype.hasOwnProperty.call(data, 'type')) {
    if (data.type === 'get_user_profile') {
      const profile = store.getState().profile?.me
      console.log(profile)
      /* send userProfileMessage to the iframe */
      userProfileMessage(profile)
    }
  }
}
