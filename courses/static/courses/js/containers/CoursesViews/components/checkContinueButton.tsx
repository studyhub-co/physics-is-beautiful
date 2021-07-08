import React from 'react'

import Button from '@material-ui/core/Button'

import UserStateEnum from '../const'
// import { handleContinueClick } from '../postIframeMessages'
import {
  continueMessage,
  saveDataMessage,
  checkUserReactionMessage,
} from '../../../utils/iframe/postMessages'
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

  return (
    <div style={{ textAlign: 'center' }}>
      {currentMaterial && editMode ? (
        <Button
          style={checkSaveButtonStyle}
          variant="contained"
          color="primary"
          onClick={saveDataMessage}
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
              ? checkUserReactionMessage
              : continueMessage
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
