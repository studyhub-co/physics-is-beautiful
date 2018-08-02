import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import { push } from 'connected-react-router'

import { Grid, Row, Col, Button } from 'react-bootstrap'

// import { Grid, Row, Col, InputGroup, FormControl, Modal, Button } from 'react-bootstrap'

// import * as classroomCreators from '../../actions/classroom'
import * as curriculaCreators from '../../actions/curricula'

// import { BASE_URL } from '../../utils/config'

class EditAssignmentView extends React.Component {
  componentWillMount () {
    this.props.curriculaActions.curriculaFetchExpandedCurriculum(this.props.classroomTeacher.curriculum.uuid)
  }
  render () {
    return (
      <Grid fluid>
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Assignment
          </Col>
          <Col sm={9} md={9}>
            <span>Pick a goal skill</span>
          </Col>
        </Row>
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Start on
          </Col>
          <Col sm={6} md={6}>
            Datepicker
          </Col>
          <Col sm={3} md={3}>
            Timepicker
          </Col>
        </Row>
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Due on
          </Col>
          <Col sm={6} md={6}>
            Datepicker
          </Col>
          <Col sm={3} md={3}>
            Timepicker
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} className={'text-center'}>
            <Button className={'classroom-common-button'}>Shedule assignment</Button>
          </Col>
        </Row>
      </Grid>)
  }
}

EditAssignmentView.propTypes = {
  curriculaActions: PropTypes.shape({
    curriculaFetchExpandedCurriculum: PropTypes.func.isRequired
  }).isRequired,
  classroomExpanded: PropTypes.object,
  classroomTeacher: PropTypes.object.isRequired
  // classroomActions: PropTypes.shape({
  //   classroomFetchStudentClassroom: PropTypes.func.isRequired,
  //   classroomLeaveStudentClassroom: PropTypes.func.isRequired
  // }).isRequired,
  // classroom: PropTypes.shape()
}

const mapStateToProps = (state) => {
  return {
    // classroomStudent: state.classroom.classroomStudentClassroom
    classroomTeacher: state.classroom.classroomTeacherClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    curriculaActions: bindActionCreators(curriculaCreators, dispatch)
    // classroomActions: bindActionCreators(classroomCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAssignmentView)
export { EditAssignmentView as EditAssigmentsViewNotConnected }
