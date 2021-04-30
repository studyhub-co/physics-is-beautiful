import React from 'react'

import { connect } from 'react-redux'

import history from '../history'

import { Sheet } from '../components/Sheet'

const HomeIndex = props => {
  return (
    <Sheet>
      Homepage
      <div><a href={''} onClick={(e) => { e.preventDefault(); history.push('/courses/') }}>Student course view</a></div>
      <div><a href={''} onClick={(e) => { e.preventDefault(); history.push('/browse/') }}>Browse view</a></div>
      <div><a href={''} onClick={(e) => { e.preventDefault(); history.push('/studio/') }}>Editor view</a></div>
      <div><a href={''} onClick={(e) => { e.preventDefault(); history.push('/discussion/') }}>Discussion</a></div>
      <div><a href={''} onClick={(e) => { e.preventDefault(); history.push('/resources/') }}>Resources</a></div>
    </Sheet>
  )
}

HomeIndex.propTypes = {}

const mapStateToProps = function (store) {
  return {
    // tab: store.studio.tabs.tab
  }
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      // changeTab: (selectedTab, tabNamespace) => dispatch(changeStudioSelectedTab(selectedTab, tabNamespace)),
      // deleteCourse: (uuid) => dispatch(deleteCourse(uuid))
    }
  })(HomeIndex)
