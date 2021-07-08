import React, { useState, useEffect, useRef, useCallback } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners'

import history from '../../../history'
import * as materialsActionCreators from '../../../actions/materials'
import { getUserProfileListener } from '../../../utils/iframe/messageListeners'

import { calculateProgress } from '../utils'
import Footer from '../components/footer'
import { StyledIframe } from './Styles'
import LessonComplete from '../components/LessonComplete'
import { Sheet } from '../../../components/Sheet'

const Lesson = props => {
  // const { match, fetchModule, currentModule } = props
  const { match, fetchMaterial, gotoMaterial, currentMaterial } = props

  let executionFrameRef = useRef(null)
  const setFrameRef = node =>
    (executionFrameRef = ((!node || !node.contentWindow) && null) || node) // we want a reference to an iframe

  const [state, setState] = useState({
    // lessonUuid: match.params.lessonUuid,
    // materialUuid: match.params.materialUuid || null,
    iframeUrl: null,
    // we got lesson_progress with material and with user reaction
    lesson_progress: currentMaterial.lesson_progress,
  })

  const [showLessonComplete, setShowLessonComplete] = useState(false)

  // TODO we have twice loaded material (in SPA and in the iframe)
  const [currentMaterialState, setCurrentMaterialState] = useState(
    currentMaterial,
  )
  const [showFooter, setShowFooter] = useState(true)

  // logic
  // 1) fetch currentMaterial from url in SPA
  // 2) generate iframe Uuid from currentMaterial data (we need mpt UUID in iframe)
  // 3) use old iframeUrl when currentMaterialState is changed
  // 4) until currentMaterialState.mpt_uuid === currentMaterialFomIframe.mpt_uuid

  // see messageListener in footer also courses/static/courses/js/containers/CoursesViews/components/footer.tsx
  const messageListener = useCallback(
    ({ data }) => {
      if (data.hasOwnProperty('type')) {
        if (data.type === 'redirect_to_material') {
          // listen iframe when continue button clicked
          if (state.lesson_progress >= 100) {
            // redirect to complete only if continue button checked
            setShowLessonComplete(true)
          } else {
            setShowLessonComplete(false)
          }
          const { lessonUuid, nextMaterialUuid } = data.data
          history.push(
            `/courses/lessons/${lessonUuid}/materials/${nextMaterialUuid}`,
          )
        }
        // user reaction state
        if (data.type === 'user_reaction_state') {
          // set lesson_progress after user react reaction
          if (data.data.userLessonScore) {
            setState({
              ...state,
              lesson_progress: calculateProgress(
                data.data.userLessonScore,
                currentMaterial.lesson?.complete_boundary,
              ),
            })
          } else {
            setState({
              ...state,
              lesson_progress: 0,
            })
          }
          // data: {
          //   state: 'checked',
          //   userLessonScore: 20,
          //   wasCorrect: true,
          // },
        }
        // current material was received from iframe
        if (data.type === 'current_material') {
          const nextMaterial = data.data
          setCurrentMaterialState({ ...nextMaterial })

          if (
            !(
              currentMaterialState.hasOwnProperty('material_problem_type') &&
              nextMaterial.hasOwnProperty('material_problem_type') &&
              currentMaterialState['material_problem_type'] ===
                nextMaterial['material_problem_type']
            )
          ) {
            // update only if material_problem_type has been changed
            setState({
              ...state,
              // materialUuid: currentMaterialState.uuid,
              iframeUrl: materialEvalUrl(nextMaterial),
            })
          }
        }
        if (data.type === 'material_problem_type_kind') {
          if (data.data === 'game') {
            setShowFooter(false)
          } else {
            // not sure that we need this
            setShowFooter(true)
          }
        }
        // }
      }
    },
    [currentMaterialState, state],
  )

  useEffect(() => {
    window.addEventListener('message', messageListener)
    window.addEventListener('message', getUserProfileListener)
    return () => {
      window.removeEventListener('message', messageListener)
      window.removeEventListener('message', getUserProfileListener)
    }
  }, [messageListener])

  // const initLoadMaterial = () => {
  //   if (!match.params.materialUuid) {
  //     // we don't have materialUuid at this stage
  //     // start lesson without material uuid in the URL
  //     fetchMaterial(match.params.lessonUuid)
  //   } else {
  //     // we have materialUuid in the url
  //     // we need material to get material type uuid for the run iframe:
  //     // /evaluation/33e9e96e-37a0-4bfd-a74d-c75460216059/fc704bf7-5b98-4668-9e68-70c7767b5489/ae38f620-b7b5-438c-90d4-65e8fac305c5/?standalone
  //     //              ^ material type uuid                 ^ material uuid (optional)          ^ lesson uuid (optional)
  //     fetchMaterial(match.params.lessonUuid, match.params.materialUuid)
  //   }
  // }

  // direct page load / SPA urls changes from iframe data, no need to reload material at the SPA side
  useEffect(() => {
    // we have materialUuid in the url
    if (match.params.materialUuid) {
      // we need material to get material type uuid for the run iframe:
      // /evaluation/33e9e96e-37a0-4bfd-a74d-c75460216059/fc704bf7-5b98-4668-9e68-70c7767b5489/ae38f620-b7b5-438c-90d4-65e8fac305c5/?standalone
      //              ^ material type uuid                 ^ material uuid (optional)          ^ lesson uuid (optional)
      fetchMaterial(match.params.lessonUuid, match.params.materialUuid)
    }
  }, [])

  useEffect(() => {
    // if match.params.materialUuid was reset (start lesson from start)
    if (!match.params.materialUuid) {
      // we don't have materialUuid at this stage
      // start lesson without material uuid in the URL
      fetchMaterial(match.params.lessonUuid)
    }
  }, [match.params.materialUuid])

  // watch for URL changes
  useEffect(() => {
    if (!match.params.materialUuid && showLessonComplete) {
      // lesson run from start
      setShowLessonComplete(false)
    }
    // setState({
    //   ...state,
    //   lessonUuid: match.params.lessonUuid,
    //   materialUuid: match.params.materialUuid || null,
    // })
  }, [match.params])

  useEffect(() => {
    setCurrentMaterialState(currentMaterial)

    if (
      currentMaterial &&
      !currentMaterial.isFetching &&
      currentMaterial.uuid
    ) {
      setState({
        ...state,
        // materialUuid: currentMaterial.uuid,
        iframeUrl: materialEvalUrl(currentMaterial),
      })
    }
  }, [currentMaterial])

  // see js/containers/StudioViews/EditorsViews/containers/LessonWorkSpace/index.jsx#mptEvalUrl
  const materialEvalUrl = material => {
    return `${window.location.origin}/evaluation/${material.material_problem_type}/${material.uuid}/${match.params.lessonUuid}/?standalone`
  }

  // console.log(currentMaterialState)

  return (
    <React.Fragment>
      {showLessonComplete ? (
        <LessonComplete />
      ) : (
        <div>
          {/* 1) Get lesson id via url, <br /> */}
          {/* 2) get next material API CALL, (we don't know material.uuid at this stage that we need to use in url) <br /> */}
          {/* 3) redirect to courses/lessons/lessonUuid/materials/materialUuid ? we need to know lessonUuid to make getNextMaterialCall <br /> */}
          {/* TODO <br /> */}
          {/* 4) Should we use materials API direct from iframe? <br /> */}
          {/* 5) iframe execution<br/> */}
          {/* 6) Iframe execution navigation (move to the next material)<br/> */}

          {/* material loading */}
          {!currentMaterialState || currentMaterialState.isFetching ? (
            <div className="sweet-loading">
              <RingLoader
                color={'#1caff6'}
                // loading={currentModule.isFetching}
              />
            </div>
          ) : null}

          {/* material loaded */}
          {currentMaterialState &&
            !currentMaterialState.isFetching &&
            currentMaterialState.material_problem_type &&
            state.iframeUrl && (
              <div style={{ paddingBottom: showFooter ? '20rem' : '0' }}>
                <StyledIframe
                  // height='100%' width='100%'
                  // style={{marginBottom: document.getElementById('student_view_iframe').style.height}}
                  id={'student_view_iframe'}
                  ref={setFrameRef}
                  src={state.iframeUrl}
                />
                {/* do not show footer if we have Game type material */}
                {showFooter && (
                  <Footer currentMaterial={currentMaterialState} />
                )}
              </div>
            )}
          {/* /!* material has no problem type *!/ */}
          {currentMaterialState &&
            !currentMaterialState.isFetching &&
            !currentMaterialState.material_problem_type && (
              <Sheet>
                {/* TODO not sure it's best solution, need to explore */}
                {/* TODO add skip button / send alert to lesson creator */}
                <h2>
                  Material has no source code, please report current url to site
                  administration.
                </h2>
              </Sheet>
            )}
        </div>
      )}
    </React.Fragment>
  )
}

Lesson.propTypes = {}

const mapStateToProps = function(store) {
  return {
    currentMaterial: store.materials.material,
  }
}

export default connect(mapStateToProps, dispatch => {
  return bindActionCreators(materialsActionCreators, dispatch)
})(Lesson)
