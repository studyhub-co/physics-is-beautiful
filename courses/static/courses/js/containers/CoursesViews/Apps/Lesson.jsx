import React, { useState, useEffect, useRef, useCallback } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import UserStateEnum from './const'
import history from '../../../history'

import * as materialsActionCreators from '../../../actions/materials'

// import { Sheet } from '../../../components/Sheet'
import Footer from '../components/footer'

import { RingLoader } from 'react-spinners'
import { StyledIframe } from './Styles'

// import { SectionSheet } from '../SectionSheet'

const Lesson = props => {
  // const { match, fetchModule, currentModule } = props
  const { match, fetchMaterial, gotoMaterial, currentMaterial } = props

  let executionFrameRef = useRef(null)
  const setFrameRef = node =>
    (executionFrameRef =
        ((!node || !node.contentWindow) && null) ||
         node // we want a reference to an iframe
    )

  const [state, setState] = useState({
    lessonUuid: match.params.lessonUuid,
    materialUuid: match.params.materialUuid || null,
    iframeUrl: null
  })

  // TODO we have twice loaded material (in SPA and in the iframe)
  const [currentMaterialState, setCurrentMaterialState] = useState(currentMaterial)

  // logic
  // 1) fetch currentMaterial from url in SPA
  // 2) generate iframe Uuid from currentMaterial data (we need mpt UUID in iframe)
  // 3) use old iframeUrl when currentMaterialState is changed
  // 4) until currentMaterialState.mpt_uuid === currentMaterialFomIframe.mpt_uuid

  const messageListener = useCallback(({ data }) => {
    if (data.hasOwnProperty('type')) {
      if (data.hasOwnProperty('type')) {
        if (data.type === 'redirect_to_material') {
          // listen iframe when continue button clicked
          const {lessonUuid, nextMaterialUuid} = data.data
          history.push(`/courses/lessons/${lessonUuid}/materials/${nextMaterialUuid}`)
        }
        // current material was received from iframe
        if (data.type === 'current_material') {
          const nextMaterial = data.data
          setCurrentMaterialState({ ...nextMaterial })

          if (!(currentMaterialState.hasOwnProperty('material_problem_type') &&
      nextMaterial.hasOwnProperty('material_problem_type') &&
      currentMaterialState['material_problem_type'] === nextMaterial['material_problem_type']
          )) {
            // update only if material_problem_type has been changed
            setState({
              ...state,
              materialUuid: currentMaterialState.uuid,
              iframeUrl: materialEvalUrl(nextMaterial)
            })
          }
        }
      }
    }
  }, [currentMaterialState])

  useEffect(() => {
    window.addEventListener('message', messageListener)
    return () => window.removeEventListener('message', messageListener)
  }, [messageListener])

  useEffect(() => {
    if (state.materialUuid == null) {
      // we don't have materialUuid at this stage
      fetchMaterial(state.lessonUuid)
    } else {
      // fixme, do we really need material if we have materialUuid?
      // 'load material that selected by uuid'
      fetchMaterial(state.lessonUuid, state.materialUuid)
    }

    // not sure we need this, it's something related to mobile version
    window.parent.postMessage({
      'message': 'canGoBack',
      'data': false
    }, '*')
  }, [])

  useEffect(() => {
    setCurrentMaterialState(currentMaterial)

    if (currentMaterial && !currentMaterial.isFetching && currentMaterial.uuid) {
      setState({
        ...state,
        materialUuid: currentMaterial.uuid,
        iframeUrl: materialEvalUrl(currentMaterial)
      })
    }
  }, [currentMaterial])

  // useEffect(() => {
  //   // TODO catch lesson id?
  //   // TODO reset currentMaterial before fetch
  //   if (match.params.materialUuid !== state.materialUuid) {
  //     // reload new material
  //     fetchMaterial(state.lessonUuid, match.params.materialUuid)
  //   }
  // }, []) // let's disable reload material for now - this will be happen in the frame,
  // we only change url to able users load the material page from scretch
  //   }, [match])

  // see js/containers/StudioViews/EditorsViews/containers/LessonWorkSpace/index.jsx#mptEvalUrl
  const materialEvalUrl = (material) => {
    return `${window.location.origin}/evaluation/${material.material_problem_type}/${material.uuid}/${state.lessonUuid}/?standalone`
  }

  // useEffect(() => {
  //   /* it will reload iframe completely */
  //   console.log(currentMaterialState)
  //
  //   if (currentMaterialState && !currentMaterialState.isFetching && currentMaterialState.uuid) {
  //     setState({
  //       ...state,
  //       materialUuid: currentMaterialState.uuid,
  //       iframeUrl: currentMaterialState?.hasOwnProperty('updateIframeUrl') && materialEvalUrl(currentMaterialState)
  //     })
  //   }
  // }, [currentMaterialState])

  return (
    <div>
      {/* 1) Get lesson id via url, <br /> */}
      {/* 2) get next material API CALL, (we don't know materail.uuid at this stage that we need to use in url) <br /> */}
      {/* 3) redirect to courses/lessons/lessonUuid/materials/materialUuid ? we need to know lessonUuid to make getNextMaterialCall <br /> */}
      {/* TODO <br /> */}
      {/* 4) Should we use materials API direct from iframe? <br /> */}
      {/* 5) iframe execution<br/> */}
      {/* 6) Iframe execution navigation (move to the next material)<br/> */}

      {/* material loading */}
      {!currentMaterialState || currentMaterialState.isFetching ? <div className='sweet-loading'>
        <RingLoader
          color={'#1caff6'}
          // loading={currentModule.isFetching}
        />
      </div> : null
      }

      {/* material loaded */}
      {currentMaterialState &&
      !currentMaterialState.isFetching &&
      currentMaterialState.material_problem_type &&
      state.iframeUrl &&
        <div style={{paddingBottom: '20rem'}}>
          <StyledIframe
            // height='100%' width='100%'
            // style={{marginBottom: document.getElementById('student_view_iframe').style.height}}
            id={'student_view_iframe'}
            ref={setFrameRef}
            src={state.iframeUrl}/>
          <Footer currentMaterial={currentMaterialState}/>
        </div>
      }

      {/* /!* material has no problem type *!/ */}
      {/* toto move to lib */}
      {/* {currentMaterialState && */}
      {/*! currentMaterialState.isFetching && */}
      {/*! currentMaterialState.material_problem_type && */}
      {/* <Sheet> */}
      {/*  /!* TODO not sure it's best solution, need to explore *!/ */}
      {/*  <h2>Material has no source code, please report current url to site administration.</h2> */}
      {/* </Sheet> */}
    </div>
  )
}

Lesson.propTypes = {}

const mapStateToProps = function (store) {
  return {
    currentMaterial: store.materials.material
  }
}

export default connect(
  mapStateToProps,
  dispatch => {
    return bindActionCreators(materialsActionCreators, dispatch)
  })(Lesson)
