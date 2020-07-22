import React, { useState, useEffect, useRef } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as materialsActionCreators from '../../../actions/materials'

import { Sheet } from '../../../components/Sheet'

import { RingLoader } from 'react-spinners'
import { StyledIframe } from '../../StudioViews/EditorsViews/containers/LessonWorkSpace/Styles'
// import { SectionSheet } from '../SectionSheet'


const Lesson = props => {
  // const { match, fetchModule, currentModule } = props
  const { match, fetchMaterial, gotoMaterial, currentMaterial } = props

  // Todo, it seem wee need comminacte with iframe, e.g. for change current url
  let executionFrameRef = useRef(null)
  const setFrameRef = node =>
    (executionFrameRef =
        ((!node || !node.contentWindow) && null) ||
         node // we want a reference to an iframe
    )

  const [state, setState] = useState({
    lessonUuid: match.params.lessonUuid,
    materialUuid: match.params.materialUuid || null,
    iframeUrl: ''
  })

  // TODO make it reusable
  // see js/containers/StudioViews/EditorsViews/containers/LessonWorkSpace/index.jsx#mptEvalUrl
  const materialEvalUrl = (material) => {
    return `${window.location.origin}/evaluation/${material.material_problem_type}/${material.uuid}/?standalone`
  }

  useEffect(() => {
    if (currentMaterial && !currentMaterial.isFetching && currentMaterial.uuid) {
      setState({
        ...state,
        materialUuid: currentMaterial.uuid,
        iframeUrl: materialEvalUrl(currentMaterial)
      })
    }
  }, [currentMaterial])

  useEffect(() => {
    if (state.materialUuid == null) {
      // we don't have materialUuid at this stage
      fetchMaterial(state.lessonUuid)
    } else {
      // console.log('load material that selected by uuid')
      fetchMaterial(state.lessonUuid, state.materialUuid)
    }

    // if (state.materialUuid == null) {
    //   // we don't have materialUuid at this stage
    //   gotoMaterial(state.lessonUuid)
    // } else {
    //   gotoMaterial(state.lessonUuid, state.materialUuid)
    // }

    window.parent.postMessage({
      'message': 'canGoBack',
      'data': false
    }, '*')
  }, [])

  return (
    <Sheet>
      TODO <br />
      {/*1) Get lesson id via url, <br />*/}
      {/*2) get next material API CALL, (we don't know materail.uuid at this stage that we need to use in url) <br />*/}
      {/*3) redirect to courses/lessons/lessonUuid/materials/materialUuid ? we need to know lessonUuid to make getNextMaterialCall <br />*/}
      4) Should we use materials API direct from iframe? <br />
      5) iframe execution<br/>
      6) Iframe execution navigation (move to the next material)<br/>
      {state.iframeUrl
        ? <StyledIframe
          ref={setFrameRef}
          // onLoad={e => onLoadIframe(e,
          //   currentMaterial.material_problem_type,
          //   currentMaterial,
          //   onUpdateProblemTypeImage,
          //   onUpdateMaterialImage,
          //   executionFrameRef
          // )}
          src={state.iframeUrl}/>
        : <div className='sweet-loading'>
          <RingLoader
            color={'#1caff6'}
          // loading={currentModule.isFetching}
          />
        </div> }
    </Sheet>
  )
}

Lesson.propTypes = {}

const mapStateToProps = function (store) {
  // console.log(store);
  return {
    currentMaterial: store.materials.material
  }
}

export default connect(
  mapStateToProps,
  dispatch => {
    return bindActionCreators(materialsActionCreators, dispatch)
    // return {
    //   // deleteModule: (uuid) => dispatch(deleteModule(uuid))
    // }
  })(Lesson)
