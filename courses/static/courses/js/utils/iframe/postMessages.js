const iframeId = 'student_view_iframe'

// * send 'save_data' (save material data was clicked)
export const saveDataMessage = () => {
  // send event to the iframe to save material
  document.getElementById(iframeId).contentWindow.postMessage(
    {
      type: 'save_data',
    },
    '*',
  )
}

// * send 'continue' (continue button was clicked)
export const continueMessage = () => {
  // send event to the iframe to movetothe next component
  // todo change current URL, see redirect_to_material event from iframe for now
  document.getElementById(iframeId).contentWindow.postMessage(
    {
      type: 'continue',
      // data: { }
    },
    '*',
  )
}

// * send 'check_user_reaction' (check button was clicked)
export const checkUserReactionMessage = () => {
  // send event to the iframe to check user reaction
  document.getElementById(iframeId).contentWindow.postMessage(
    {
      type: 'check_user_reaction',
      // data: { }
    },
    '*',
  )
}

export const editModeMessage = data => {
  document.getElementById(iframeId).contentWindow.postMessage(
    {
      type: 'edit_mode',
      data: data,
    },
    '*',
  )
}

export const userProfileMessage = data => {
  document.getElementById(iframeId).contentWindow.postMessage(
    {
      type: 'user_profile',
      data: data,
    },
    '*',
  )
}
