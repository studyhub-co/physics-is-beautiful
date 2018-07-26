import React from 'react'

import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import * as classroomCreators from '../../actions/classroom'

class SettingsClassroomView extends React.Component {

}

const mapStateToProps = (state) => {
  return {
    // classroom: state.classroom.classroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // tabActions: bindActionCreators(tabCreators, dispatch),
    // curriculaActions: bindActionCreators(curriculaCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsClassroomView)
export { SettingsClassroomView as EditClassroomViewNotConnected }