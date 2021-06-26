import React from 'react'

import Button from '@material-ui/core/Button'

import UserStateEnum from '../const'
import { handleContinueClick } from '../postIframeMessages'
import { checkSaveButtonStyle, checkSaveButtonStyleDisabled } from './style'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface CheckContinueProps {
  // currentMaterial: materialActionCreators.MaterialRedux
  currentMaterial: object
  editMode: boolean
  disabledCheck: boolean
  userReactionState: string // todo enum?
}

const CheckContinueButton: React.FC<CheckContinueProps> = props => {
  const { currentMaterial, editMode, disabledCheck, userReactionResult } = props

  const handleSaveDataClick = () => {
    // send event to the iframe to save material
    document.getElementById('student_view_iframe').contentWindow.postMessage(
      {
        type: 'save_data',
      },
      '*',
    )
  }

  const handleCheckClick = () => {
    // send event to the iframe to check user reaction
    document.getElementById('student_view_iframe').contentWindow.postMessage(
      {
        type: 'check_user_reaction',
        // data: { }
      },
      '*',
    )
  }

  // moved to postIframeMessages
  // const handleContinueClick = () => {
  //   // send event to the iframe to movetothe next component
  //   // todo change current URL see redirect_to_material event from iframe for now
  //   document.getElementById('student_view_iframe').contentWindow.postMessage(
  //     {
  //       type: 'continue',
  //       // data: { }
  //     },
  //     '*',
  //   )
  // }

  return (
    <div style={{ textAlign: 'center' }}>
      {currentMaterial && editMode ? (
        <Button
          style={checkSaveButtonStyle}
          variant="contained"
          color="primary"
          onClick={handleSaveDataClick}
        >
          Save
        </Button>
      ) : (
        <Button
          disabled={disabledCheck}
          style={
            disabledCheck ? checkSaveButtonStyleDisabled : checkSaveButtonStyle
          }
          variant="contained"
          color="primary"
          onClick={
            userReactionResult.state === 'start'
              ? handleCheckClick
              : handleContinueClick
          }
        >
          {userReactionResult.state === UserStateEnum.start && 'Check'}
          {userReactionResult.state === UserStateEnum.checked && 'Continue'}
        </Button>
      )}
    </div>
  )
}

export default CheckContinueButton
