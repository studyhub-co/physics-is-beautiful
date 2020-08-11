import React, { useState, useEffect } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as modulesActionCreators from '../../../actions/modules'

import { Sheet } from '../../../components/Sheet'

import { RingLoader } from 'react-spinners'
import { SectionSheet } from '../SectionSheet'

const Module = props => {
  const { match, fetchModule, currentModule } = props

  // currentId: obj.match.params.currentId || 'default',
  const [state, setState] = useState({
    moduleUuid: match.params.moduleUuid || '00000000-0000-0000-0000-000000000000', // todo add url param
    sections: []
  })

  useEffect(() => {
    fetchModule(state.moduleUuid)

    window.parent.postMessage({
      'message': 'canGoBack',
      'data': false
    }, '*')
  }, [])

  useEffect(() => {
    if (!currentModule.uuid) { return }
    var items = []
    for (var lessonIndex = 0; lessonIndex < currentModule.lessons.length; lessonIndex++) {
      var lesson = currentModule.lessons[lessonIndex]
      let href
      // if (lesson.lesson_type === 'GAME') {
      //   // href = '/games/' + lesson.game_slug;
      //   href = '/games/' + lesson.uuid + '/' + lesson.game_slug
      // } else {
      //   href = '/courses//lessons/' + lesson.uuid
      // }
      href = '/courses/lessons/' + lesson.uuid
      items.push({
        name: lesson.name + ' ',
        image: lesson.image,
        href: href,
        uuid: lesson.uuid,
        status: lesson.status
      })
    }
    var sections = [{
      name: currentModule.name,
      items: items,
      uuid: currentModule.uuid
    }]

    var backLink = '/'

    // If we are using the mobile app, make the query persist.
    // TODO do we need support this now?
    if (window.IS_MOBILE_APP) backLink += '?pib_mobile=true'

    if (window.IS_MOBILE_APP) {
      setState({
        ...state,
        sections: sections,
        question: null,
        progress: 0,
        answer: null
      })
    } else {
      setState({
        ...state,
        sections: sections,
        backLink: backLink,
        question: null,
        progress: 0,
        answer: null
      })
    }
  }, [
    currentModule
  ])

  return (
    <div>
      {currentModule && !currentModule.isFetching && currentModule.uuid
        ? <div>
          <SectionSheet
            sections={state.sections}
            backLink={state.backLink}
          /></div>
        : <div className='sweet-loading'>
          <RingLoader
            color={'#1caff6'}
            loading={currentModule.isFetching}
          />
        </div>
      }
    </div>
  )
}

Module.propTypes = {}

const mapStateToProps = function (store) {
  // console.log(store);
  return {
    currentModule: store.modules.module
  }
}

export default connect(
  mapStateToProps,
  dispatch => {
    return bindActionCreators(modulesActionCreators, dispatch)
    // return {
    //   // deleteModule: (uuid) => dispatch(deleteModule(uuid))
    // }
  })(Module)
