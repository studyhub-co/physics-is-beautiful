import React, { useState, useEffect, useRef } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as materialsActionCreators from '../../../actions/materials'

import { Sheet } from '../../../components/Sheet'

import { RingLoader } from 'react-spinners'
import { StyledIframe } from './Styles'
import history from '../../../history'
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
    iframeUrl: null
  })

  useEffect(() => {
    // TODO catch lesson id?
    // TODO reset currentMaterial before fetch
    if (match.params.materialUuid !== state.materialUuid) {
      // reload new material
      fetchMaterial(state.lessonUuid, match.params.materialUuid)
    }
  }, [match])

  // see js/containers/StudioViews/EditorsViews/containers/LessonWorkSpace/index.jsx#mptEvalUrl
  const materialEvalUrl = (material) => {
    return `${window.location.origin}/evaluation/${material.material_problem_type}/${material.uuid}/${state.lessonUuid}/?standalone`
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
      // moved to match catching, see upper
      // 'load material that selected by uuid'
      fetchMaterial(state.lessonUuid, state.materialUuid)
    }

    window.addEventListener('message', ({ data }) => {
      if (data.hasOwnProperty('type')) {
        if (data.type === 'redirect_to_material') {
          // listener from iframe when continue button clicked
          const {lessonUuid, nextMaterialUuid} = data.data
          history.push(`/courses/lessons/${lessonUuid}/materials/${nextMaterialUuid}`)
        }
      }
    }, false)

    window.parent.postMessage({
      'message': 'canGoBack',
      'data': false
    }, '*')
  }, [])

  return (
    <div>
      {/* 1) Get lesson id via url, <br /> */}
      {/* 2) get next material API CALL, (we don't know materail.uuid at this stage that we need to use in url) <br /> */}
      {/* 3) redirect to courses/lessons/lessonUuid/materials/materialUuid ? we need to know lessonUuid to make getNextMaterialCall <br /> */}
      {/* TODO <br /> */}
      {/* 4) Should we use materials API direct from iframe? <br /> */}
      {/* 5) iframe execution<br/> */}
      {/* 6) Iframe execution navigation (move to the next material)<br/> */}
      {currentMaterial && currentMaterial.material_problem_type
        ? state.iframeUrl
          ? <StyledIframe
          // height='100%' width='100%'
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
          </div>
        : <Sheet><h2>
          {/* TODO not sure it's best solution, need to explore */}
          Material has no source code, please report current url to site administration.
        </h2></Sheet>
      }
    </div>
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
