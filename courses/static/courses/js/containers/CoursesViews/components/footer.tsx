import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'

// import { Material } from '../../models/'

// import { checkSaveButtonStyle, checkSaveButtonStyleDisabled } from './style';
// import * as materialActionCreators from '../../redux/modules/material'
// import { QAData as IQAData } from '../qaChoices/IData/index'
import CheckContinueButton from './checkContinueButton'
import Button from 'react-bootstrap/Button'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import history from '../../../history'
import UserStateEnum from '../const'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface FooterProps {
  // currentMaterial: materialActionCreators.MaterialRedux;
  editMode: boolean;
  disabledCheck: boolean;
  // updateMaterial(material: Material): void;
  // moveToNextComponent(previousMaterialUuid: string): void;
  // checkUserMaterialReaction(material: Material): void;
  // componentData: IQAData | null; // Any component IData
  userReactionState: string; // todo enum?
}

const Footer: React.FC<FooterProps> = props => {
  const {
    currentMaterial,
    editMode
    // disabledCheck,
    // updateMaterial,
    // checkUserMaterialReaction,
    // componentData,
    // userReactionState
    // moveToNextComponent
  } = props

  const [showCommentsModal, setShowCommentsModal] = useState(false)
  // todo userReactionStateHook + to make sure it's good place for init

  // data: {
  //   state: 'checked',
  //   user_lesson_score: 20,
  //   was_correct: true,
  // },
  const [userReactionResult, setUserReactionResult] = useState({
    state: UserStateEnum.start,
    userLessonScore: undefined,
    wasCorrect: undefined
  })

  const [disabledCheck, setDisabledCheck] = useState(true)

  const handleShowComments = (): void => {
    setShowCommentsModal(!showCommentsModal)
  }

  useEffect(() => {
    const messageListener = ({ data }) => {
      if (data.hasOwnProperty('type')) {
        // disabled_check_button received from iframe
        if (data.type === 'disabled_check_button') {
          setDisabledCheck(data.data)
        }
        // user reaction state
        if (data.type === 'user_reaction_state') {
          setUserReactionResult(data.data)

          // console.log(data.data)
          // console.log(calculateProgress(data.data.userLessonScore))

          setPercentCompleted(calculateProgress(data.data.userLessonScore))
        // data: {
        //   state: 'checked',
        //   userLessonScore: 20,
        //   wasCorrect: true,
        // },
        }
      }
    }

    window.addEventListener('message', messageListener, false)
    return () => window.removeEventListener('message', messageListener)
  }, [])

  // console.log(currentMaterial);

  const calculateProgress = (currentPercent: number) => {
    if (currentMaterial.lesson?.complete_boundary) {
      // shrink boundary to 100%
      return (currentPercent * 100 / currentMaterial.lesson.complete_boundary)
    } else {
      return currentPercent
    }
  }

  let backgroundColor = '#dbdbdb'
  let reactionResultIcon = <FaCheckCircle id='correct' className='pull-right' style={{fontSize: '35px'}} />
  let correctMessage = 'Correct'

  if (userReactionResult.wasCorrect === false) {
    reactionResultIcon = (<FaTimesCircle id='incorrect' className='pull-right' style={{ fontSize: '35px' }}/>)
    backgroundColor = '#ffd3d1'
    correctMessage = 'Incorrect'
  } else if (userReactionResult.wasCorrect === true) {
    backgroundColor = '#bff199'
  }

  // calculate with ratio
  const [percentCompleted, setPercentCompleted] = useState(calculateProgress(currentMaterial?.score || 0))

  // console.log(userReactionResult);

  return (
    <div id='footer' style={{
      backgroundColor: backgroundColor,
      padding: '1rem 0 0 0',
      // fixme do we need this?
      position: (window.IS_IOS && window.IS_MOBILE_APP) ? 'relative' : 'fixed'}}
    >
      <Container fluid>
        {userReactionResult.state === UserStateEnum.checked && <Row className='justify-content-md-center'>
          <Col md={{ span: '3', offset: 3 }} xs={{ span: '2', offset: 2 }}>
            {reactionResultIcon} {correctMessage}
          </Col>
          <Col md={{ span: '3', offset: 3 }} xs={{ span: '2', offset: 2 }}>
            <Button
              onClick={handleShowComments}
              style={{
                backgroundColor: '#8d33d9',
                borderColor: '#8d33d9',
                borderBottomColor: '#8d33d9',
                padding: '0.5rem 2rem',
                borderRadius: '12rem'
              }}
            >Comments</Button>
          </Col>
        </Row>
        }
        <Row>
          <Col md='12'>
            <CheckContinueButton
              // moveToNextComponent={moveToNextComponent}
              editMode={editMode}
              // componentData={componentData}
              // checkUserMaterialReaction={checkUserMaterialReaction}
              currentMaterial={currentMaterial}
              disabledCheck={disabledCheck}
              // updateMaterial={updateMaterial}
              userReactionResult={userReactionResult}
            />
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <ProgressBar
              style={{height: '2rem'}}
              now={percentCompleted}
              // label={`${percentCompleted}%`}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
