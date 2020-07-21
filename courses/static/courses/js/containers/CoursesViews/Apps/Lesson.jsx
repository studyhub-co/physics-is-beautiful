import React, { useState, useEffect } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as materialsActionCreators from '../../../actions/materials'

import { Sheet } from '../../../components/Sheet'

import { RingLoader } from 'react-spinners'
// import { SectionSheet } from '../SectionSheet'

const Lesson = props => {
  // const { match, fetchModule, currentModule } = props
  const { match, fetchMaterial, gotoMaterial, currentMaterial } = props

  const [state, setState] = useState({
    lessonUuid: match.params.lessonUuid,
    materialUuid: match.params.lessonUuid | null
  })

  // TODO make it reusable
  // see js/containers/StudioViews/EditorsViews/containers/LessonWorkSpace/index.jsx#mptEvalUrl
  const materialEvalUrl = (mpt, material) => {
    if (mpt && mpt.hasOwnProperty('id')) {
      return `${window.location.origin}/evaluation/${mpt.id}/${material.uuid}`
    } else { return '' }
  }

  useEffect(() => {
    if (currentMaterial && !currentMaterial.isFetching && currentMaterial.uuid) {
      console.log(currentMaterial)
      setState({
        ...state,
        materialUuid: currentMaterial.uuid
      })
    }
  }, [currentMaterial])

  useEffect(() => {
    if (state.materialUuid == null) {
      // we don't have materialUuid at this stage
      fetchMaterial(state.lessonUuid)
    } else {
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
      1) Get lesson id via url, <br />
      2) get next material API CALL, (we don't know materail.uuid at this stage that we need to use in url) <br />
      3) redirect to courses/lessons/lessonUuid/materials/materialUuid ? we need to know lessonUuid to make getNextMaterialCall <br />
      4) Should we use materials API direct from iframe? <br />
      5) iframe execution<br/>
      6) Iframe execution navigation (move to the next material)<br/>
      {/* <div className='sweet-loading'> */}
      {/*  <RingLoader */}
      {/*    color={'#1caff6'} */}
      {/*    // loading={currentModule.isFetching} */}
      {/*  /> */}
      {/* </div> */}
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
