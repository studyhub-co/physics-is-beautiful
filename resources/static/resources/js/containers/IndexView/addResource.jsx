import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import { Route } from 'react-router'

class AddResourceView extends React.Component {

  render () {
    return (
      <div>
        addView
      </div>
    )
  }
}

AddResourceView.propTypes = {
  // tabActions: PropTypes.shape({
  //   changeSelectedTab: PropTypes.func.isRequired
  // }).isRequired,
  // googleActions: PropTypes.shape({
  //   googleFetchClassroomList: PropTypes.func.isRequired,
  //   gapiInitialize: PropTypes.func.isRequired,
  //   googleSaveClassroomsWithStudents: PropTypes.func.isRequired
  // }).isRequired,
  // classroomActions: PropTypes.shape({
  //   classroomCreateClassroom: PropTypes.func.isRequired,
  //   classroomFetchTeacherClassroomsList: PropTypes.func.isRequired,
  //   classroomFetchStudentClassroomsList: PropTypes.func.isRequired,
  //   classroomJoinClassroom: PropTypes.func.isRequired
  // }).isRequired,
  // tab: PropTypes.string,
  // classroomList: PropTypes.array,
  // classroomStudentList: PropTypes.array,
  // googleClassroomsList: PropTypes.array,
  // gapiInitState: PropTypes.bool,
  // dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    // tab: state.tab.tab,
    // classroomList: state.classroom.classroomList,
    // classroomStudentList: state.classroom.classroomStudentList,
    // googleClassroomsList: state.google.googleClassroomsList,
    // gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    //tabActions: bindActionCreators(tabsCreators, dispatch),
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // googleActions: bindActionCreators(googleCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddResourceView)
export { AddResourceView as AddResourceViewNotConnected }
