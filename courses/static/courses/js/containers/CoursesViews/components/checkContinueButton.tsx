import React, { useState, useEffect } from 'react'

// import { Material } from '../../models/'

import Button from '@material-ui/core/Button'
import { checkSaveButtonStyle, checkSaveButtonStyleDisabled } from './style'
// import * as materialActionCreators from '../../redux/modules/material'
// import { QAData as IQAData } from '../qaChoices/IData/index'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface CheckContinueProps {
  // currentMaterial: materialActionCreators.MaterialRedux;
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
    userReactionState,
    moveToNextComponent
  } = props

  const handleSaveDataClick = () => {
    // todo send event to the iframe to save material
    // const material: Material = { uuid: currentMaterial.uuid, data: componentData }
    // updateMaterial(material)
    console.log('save data')
    document.getElementById('student_view_iframe').contentWindow.postMessage(
      {
        type: 'save_data'
      },
      '*'
    )
  }

  const handleCheckClick = () => {
    // todo send event to the iframe to check user reaction
    document.getElementById('student_view_iframe').contentWindow.postMessage(
      {
        type: 'check_user_reaction'
        // data: { }
      },
      '*'
    )
    // const material: Material = { uuid: currentMaterial.uuid, data: componentData }
    // checkUserMaterialReaction(material)
  }

  const handleContinueClick = () => {
    // todo send event to the iframe to movetothe next component
    // todo change current URL see redirect_to_material event from iframe for now
    // if (currentMaterial.uuid) {
    //   moveToNextComponent(currentMaterial.uuid)
    // }
  }

  console.log(userReactionState)

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
          onClick={userReactionState === 'start' ? handleCheckClick : handleContinueClick}
        >
          {userReactionState === 'start' && 'Check'}
          {userReactionState === 'reaction' && 'Continue'}
        </Button>
      )}
    </div>
  )
}

export default CheckContinueButton
