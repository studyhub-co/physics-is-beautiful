import React, { useState, useEffect } from 'react'
import UserStateEnum from '../Apps/const'

// import { Material } from '../../models/'

import Button from '@material-ui/core/Button'
import { checkSaveButtonStyle, checkSaveButtonStyleDisabled } from './style'
// import history from '../../../history'
// import * as materialActionCreators from '../../redux/modules/material'
// import { QAData as IQAData } from '../qaChoices/IData/index'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface CheckContinueProps {
  currentMaterial: materialActionCreators.MaterialRedux;
  editMode: boolean;
  disabledCheck: boolean;
  // updateMaterial(material: Material): void;
  // moveToNextComponent(previousMaterialUuid: string): void;
  // checkUserMaterialReaction(material: Material): void;
  // componentData: IQAData | null; // Any component IData
  userReactionState: string; // todo enum?
}

const CheckContinueButton: React.FC<CheckContinueProps> = props => {
  const {
    currentMaterial,
    editMode,
    disabledCheck,
    // updateMaterial,
    // checkUserMaterialReaction,
    // componentData,
    userReactionResult,
    // moveToNextComponent
  } = props

  const handleSaveDataClick = () => {
    // TODO - we can get data from iframe and save in SPA, need to explore
    // send event to the iframe to save material
    document.getElementById('student_view_iframe').contentWindow.postMessage(
      {
        type: 'save_data'
      },
      '*'
    )
  }

  const handleCheckClick = () => {
    // send event to the iframe to check user reaction
    document.getElementById('student_view_iframe').contentWindow.postMessage(
      {
        type: 'check_user_reaction'
        // data: { }
      },
      '*'
    )
  }

  const handleContinueClick = () => {
    // send event to the iframe to movetothe next component
    // todo change current URL see redirect_to_material event from iframe for now
    document.getElementById('student_view_iframe').contentWindow.postMessage(
      {
        type: 'continue'
        // data: { }
      },
      '*'
    )
    // if (currentMaterial.uuid) {
    //   moveToNextComponent(currentMaterial.uuid)
    // }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {currentMaterial && editMode ? (
        <Button style={checkSaveButtonStyle} variant='contained' color='primary' onClick={handleSaveDataClick}>
          Save
        </Button>
      ) : (
        <Button
          disabled={disabledCheck}
          style={disabledCheck ? checkSaveButtonStyleDisabled : checkSaveButtonStyle}
          variant='contained'
          color='primary'
          onClick={userReactionResult.state === 'start' ? handleCheckClick : handleContinueClick}
        >
          {userReactionResult.state === UserStateEnum.start && 'Check'}
          {userReactionResult.state === UserStateEnum.checked && 'Continue'}
        </Button>
      )}
    </div>
  )
}

export default CheckContinueButton
